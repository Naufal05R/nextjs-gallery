import { InputComponentProps } from "@/components/Input";
import { getEnumObject } from "@/lib/utils";
import { ModelSelectFieldEnum } from "./enum";

const modelEnumObject = getEnumObject(ModelSelectFieldEnum);

export const imageFormFields: Array<InputComponentProps> = [
  {
    model: "Base",
    title: "name",
    placeholder: "Name of your image",
  },
  {
    model: "Select",
    title: "category",
    fields: modelEnumObject,
  },
  {
    model: "Select",
    title: "gallery",
    fields: modelEnumObject,
  },
  {
    model: "Image",
    title: "image",
  },
  {
    model: "Several",
    title: "tags",
    placeholder: "Add tags to image (separate it with comma)",
  },
];

export const authFormFields: Array<InputComponentProps> = [
  {
    model: "Base",
    title: "username",
    placeholder: "first_user",
  },
  {
    model: "Base",
    title: "email",
    placeholder: "first_user+clerk_test@example.com",
  },
  {
    model: "Base",
    title: "first name",
    placeholder: "John",
  },
  {
    model: "Base",
    title: "first name",
    placeholder: "John Doe",
  },
];
