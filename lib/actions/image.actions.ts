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

    if (!userId) throw Error("User not authenticated");

    const author = await prisma.user.findUnique({ where: { id: userId! } });

    if (!author) throw Error("User not authorized");

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
        name,
        category,
        gallery,
        tags,
      },
    };

    const result = await createObject(objectParams);

    if (!result || !result.versionId) throw new Error("Image upload failed");

    const uploadedData = await prisma.$transaction(async (_prisma) => {
      const _gallery =
        (await _prisma.gallery.findFirst({
          where: {
            name: gallery,
            authorId: author.id,
          },
        })) ??
        (await _prisma.gallery.create({
          data: {
            id: generateId("gallery"),
            name: gallery,
            authorId: author.id,
          },
        }));

      const _category =
        (await _prisma.category.findFirst({
          where: {
            name: category,
            authorId: author.id,
            collectionId: _gallery.id,
          },
        })) ??
        (await _prisma.category.create({
          data: {
            id: generateId("category"),
            name: category,
            authorId: author.id,
            collectionId: _gallery.id,
          },
        }));

      if (tags?.length)
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

      const _image = await _prisma.image.create({
        data: {
          id: uniqueId,
          title: name,
          source: fileName,
          width: imageBuffer.length,
          height: imageBuffer.length,
          categoryId: _category.id,
          collectionId: _gallery.id,
        },
      });

      const tagsOnImage =
        tags &&
        (await _prisma.tagsOnImages.createManyAndReturn({
          data: tags.map((tag) => {
            return {
              imageId: _image.id,
              tagId: existingTags.find((t) => t.name === tag.toLowerCase())!.id,
            };
          }),
        }));

      const image =
        tagsOnImage &&
        (await _prisma.image.update({
          where: {
            id: _image.id,
          },
          data: {
            tags: {
              connectOrCreate: tagsOnImage.map(({ tagId, imageId }) => ({
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
          },
        }));

      return image ?? _image;
    });

    return uploadedData;
  } catch (error) {
    handlingError(error);
  }
};
