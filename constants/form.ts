import { InputComponentProps } from "@/components/Input";
import { getEnumObject } from "@/lib/utils";
import { ModelSelectFieldEnum } from "./enum";

const modelEnumObject = getEnumObject(ModelSelectFieldEnum);

export const imageFormFields: Array<InputComponentProps> = [
  {
    model: "Base",
    title: "name",
    placeholder: "Name of your image",
    required: true,
  },
  {
    model: "Select",
    title: "category",
    fields: modelEnumObject,
    required: true,
  },
  {
    model: "Select",
    title: "gallery",
    fields: modelEnumObject,
    required: true,
  },
  {
    model: "Image",
    title: "image",
    required: true,
  },
  {
    model: "Several",
    title: "tags",
    placeholder: "Add tags to image (separate it with comma)",
  },
];

export const signInFormFields: Array<InputComponentProps> = [
  {
    model: "Base",
    title: "email/username",
    placeholder: "user_name / email+clerk_test@example.com",
    required: true,
  },
  {
    type: "password",
    model: "Base",
    title: "password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
  },
];

export const signUpFormFields: Array<InputComponentProps> = [
  {
    model: "Base",
    title: "first name",
    placeholder: "John",
    className: "w-[calc(50%-8px)]",
  },
  {
    model: "Base",
    title: "last name",
    placeholder: "Doe",
    className: "w-[calc(50%-8px)]",
  },
  {
    model: "Base",
    title: "email",
    placeholder: "email+clerk_test@example.com",
    required: true,
  },
  {
    model: "Base",
    title: "username",
    placeholder: "user_name",
    required: true,
  },
  {
    type: "password",
    model: "Base",
    title: "password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
  },
  {
    type: "password",
    model: "Base",
    title: "confirmation password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
  },
];
