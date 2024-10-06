"use server";

import { imageFormFields } from "@/constants/form";
import { createObject } from "../service";
import { generateId, getExtension, extractFormData, handlingError } from "../utils";
import { prisma } from "../prisma";
import { ImageFormSchema } from "../schema";
import { auth } from "@clerk/nextjs/server";

export const createImage = async (formData: FormData) => {
  const extractedData = extractFormData(imageFormFields, formData);

  const { data, success, error } = ImageFormSchema.safeParse(extractedData);

  if (!success) {
    console.log(data);
    throw Error(error.message);
  }

  const { name, category, gallery, image, tags } = data;

  try {
    const userId = auth().userId;

    if (!userId) throw new Error("User not authenticated");

    const author = await prisma.user.findUnique({ where: { id: userId! } });

    if (!author) throw new Error("User not authorized");

    console.log(image);

    const file = image as File;
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const uniqueId = generateId("image");
    const fileName = `${uniqueId}.${getExtension(file.name)}`;

    const objectParams: Parameters<typeof createObject>[0] = {
      bucketName: "nextjs-gallery",
      objectName: fileName,
      objectStream: imageBuffer,
      objectMetaData: {
        name: name,
        category: category,
        gallery: gallery,
        tags: tags,
      },
    };

    const result = await createObject(objectParams);

    if (!result || !result.versionId) throw new Error("Image upload failed");

    const uploadedData = await prisma.$transaction(async (_prisma) => {
      const newCategory = await _prisma.category.create({
        data: {
          id: generateId("category"),
          name: category,
        },
      });

      const newGallery = await _prisma.gallery.create({
        data: {
          id: generateId("gallery"),
          name: gallery,
          authorId: author.id,
        },
      });

      if (tags)
        await _prisma.tag.createMany({
          data: tags.map((tag) => {
            return {
              id: generateId("tag"),
              name: tag.toLowerCase(),
            };
          }),
          skipDuplicates: true,
        });

      const existingTags = await _prisma.tag.findMany({
        where: {
          AND: {
            name: {
              in: tags,
              mode: "insensitive",
            },
            images: {
              every: {
                imageId: uniqueId,
              },
            },
          },
        },
      });

      const tagsOnImage =
        tags &&
        (await _prisma.tagsOnImages.createManyAndReturn({
          data: existingTags.map(({ id }) => ({
            tagId: id,
            imageId: uniqueId,
          })),
        }));

      const image = await _prisma.image.create({
        data: {
          id: uniqueId,
          title: name,
          source: fileName,
          width: imageBuffer.length,
          height: imageBuffer.length,
          tags: {
            connectOrCreate: tagsOnImage?.map(({ tagId, imageId }) => ({
              where: {
                tagId_imageId: {
                  tagId,
                  imageId,
                },
              },
              create: {
                tagId,
              },
            })),
          },
          categoryId: newCategory.id,
          collectionId: newGallery.id,
        },
      });

      return image;
    });

    return uploadedData;
  } catch (error) {
    handlingError(error);
  }
};
