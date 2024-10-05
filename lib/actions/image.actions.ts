"use server";

import { imageFormFields } from "@/constants/form";
import { createObject } from "../service";
import { generateId, getExtension, extractFormData } from "../utils";
import { prisma } from "../prisma";
import { ImageFormSchema } from "../schema";
import { auth } from "@clerk/nextjs/server";

export const createImage = async (formData: FormData) => {
  const extractedData = extractFormData(imageFormFields, formData);

  const { name, category, gallery, image, tags } = ImageFormSchema.parse(extractedData);

  try {
    const userId = auth().userId;

    if (!userId) throw new Error("User not authenticated");

    const author = await prisma.user.findUnique({ where: { id: userId! } });

    if (!author) throw new Error("User not authorized");

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

    // const image = await prisma.image.create({});

    const uploadedData = await prisma.$transaction(async (prisma) => {
      const newCategory = await prisma.category.create({
        data: {
          id: generateId("category"),
          name: category,
        },
      });

      const newGallery = await prisma.gallery.create({
        data: {
          id: generateId("gallery"),
          name: gallery,
          authorId: author.id,
        },
      });

      // const newTags =
      //   tags &&
      //   (await prisma.tag.createMany({
      //     data: tags.map((tag) => {
      //       return {
      //         id: generateId("tag"),
      //         name: tag,
      //       };
      //     }),
      //   }));

      const image = await prisma.image.create({
        data: {
          id: uniqueId,
          title: name,
          source: fileName,
          width: imageBuffer.length,
          height: imageBuffer.length,
          // tags: { connect: newTags?.map((tag) => ({ id: tag.id })) },
          categoryId: newCategory.id,
          collectionId: newGallery.id,
        },
      });
    });

    // return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
