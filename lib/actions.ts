"use server";

import { imageFormFields } from "@/constants/form";

export const createImage = async (formData: FormData) => {
  const rawData = imageFormFields
    .map(({ title }) => {
      return {
        [title]: formData.get(title),
      };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});

  console.log(rawData);
};
