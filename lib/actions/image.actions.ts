"use server";

import { imageFormFields } from "@/constants/form";
import { createObject } from "../service";
import { generateId, getExtension } from "../utils";

export const createImage = async (formData: FormData) => {
  const rawData = imageFormFields
    .map(({ title }) => {
      return {
        [title]: formData.get(title),
      };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  try {
    const file = rawData.image as File;
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const uniqueId = generateId("image");
    const fileName = `${uniqueId}.${getExtension(file.name)}`;

    // const params: Parameters<typeof createObject>[0] = {
    //   bucketName: "nextjs-gallery",
    //   objectName: fileName,
    //   objectStream: imageBuffer,
    //   objectMetaData: {
    //     name: rawData.name,
    //     category: rawData.category,
    //     gallery: rawData.gallery,
    //     tags: rawData.tags,
    //   },
    // };

    // const result = await createObject(params);

    // return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
