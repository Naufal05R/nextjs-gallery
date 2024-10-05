import * as z from "zod";
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

export const ImageFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(32, { message: "Name is too long" }),
  category: z.string().min(1, { message: "Category is required" }).max(32, { message: "Category is too long" }),
  gallery: z.string().min(1, { message: "Gallery is required" }).max(32, { message: "Gallery is too long" }),
  image: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  tags: z.string().array().max(5).optional(),
});

export type ImageFormData = z.infer<typeof ImageFormSchema>;
