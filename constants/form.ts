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
