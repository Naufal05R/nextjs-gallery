import { getEnumObject } from "@/lib/utils";
import { ModelSelectFieldEnum } from "./enum";
import { InputComponentProps } from "@/types/input";

export type ExtractFieldType<T extends Array<{ title: string }>> = T[number]["title"];

const modelEnumObject = getEnumObject(ModelSelectFieldEnum);

const defineFormFields = <T extends Array<InputComponentProps>>(fields: T): T => {
  return fields;
};

export type FormFieldsType = ReturnType<typeof defineFormFields>;

export const imageFormFields = defineFormFields([
  {
    model: "Base",
    title: "name",
    placeholder: "Name of your image",
    required: true,
    datatype: "string",
  },
  {
    model: "Select",
    title: "category",
    fields: modelEnumObject,
    required: true,
    datatype: "string",
  },
  {
    model: "Select",
    title: "gallery",
    fields: modelEnumObject,
    required: true,
    datatype: "string",
  },
  {
    model: "Image",
    title: "image",
    required: true,
    datatype: "object",
  },
  {
    model: "Several",
    title: "tags",
    placeholder: "Add tags to image (separate it with comma)",
    datatype: "array",
  },
] as const);

export const signInFormFields = defineFormFields([
  {
    model: "Base",
    title: "email/username",
    placeholder: "user_name / email+clerk_test@example.com",
    required: true,
    datatype: "string",
  },
  {
    type: "password",
    model: "Base",
    title: "password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
    datatype: "string",
  },
] as const);

export const signUpFormFields = defineFormFields([
  {
    model: "Base",
    title: "first name",
    placeholder: "John",
    className: "w-[calc(50%-8px)]",
    datatype: "string",
  },
  {
    model: "Base",
    title: "last name",
    placeholder: "Doe",
    className: "w-[calc(50%-8px)]",
    datatype: "string",
  },
  {
    model: "Base",
    title: "email",
    placeholder: "email+clerk_test@example.com",
    required: true,
    datatype: "string",
  },
  {
    model: "Base",
    title: "username",
    placeholder: "user_name",
    required: true,
    datatype: "string",
  },
  {
    type: "password",
    model: "Base",
    title: "password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
    datatype: "string",
  },
  {
    type: "password",
    model: "Base",
    title: "confirmation password",
    placeholder: `(fNZPx)w_@"E4-cgAAt>1_:$`,
    required: true,
    datatype: "string",
  },
] as const);
