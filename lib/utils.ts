import { InputComponentProps } from "@/types/input";
import { ExtractFieldType, FormFieldsType } from "@/constants/form";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function getServerUrl({
  protocol = "http",
  host = "localhost",
  port = "3000",
}: {
  protocol?: "http" | "https";
  host?: string;
  port?: string;
}) {
  return `${protocol}://${host}:${port}`;
}

export function getEnumObject<E extends Enum<E>>(value: E) {
  return Object.values(value).slice(0, Object.values(value).length / 2);
}

export function getExtension(filename: string) {
  return filename.split(".").pop();
}

export function extractFormData(formFields: FormFieldsType, formData: FormData) {
  const extractHandler = <T extends keyof FormFieldsType[number]>(
    datatype: FormFieldsType[number]["datatype"],
    identifier: (typeof formFields)[number][T],
  ) => {
    switch (datatype) {
      case "string":
        return formData.get(identifier);
      case "array":
        return (formData.get(identifier) as string).split(",");
      default:
        return formData.get(identifier);
    }
  };

  return formFields
    .map(({ title, datatype }) => {
      return {
        [title]: extractHandler(datatype, title),
      };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
}

export function getInitialFormFields<
  T extends InputComponentProps,
  AT extends Array<T>,
  FT extends CamelCase<ExtractFieldType<AT>>,
>(formFields: AT): Record<FT, string> {
  const initialFields: Record<FT, string> | Record<string, string> = {};

  formFields.forEach((item) => {
    const key = replaceToCamelCase(item.title);

    initialFields[key] = "";
  });

  return initialFields;
}

export function handlingError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === "string") {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
}

export function replaceToCamelCase<T extends string>(str: T): CamelCase<T> {
  return str
    .split(" ")
    .map((word, index) => (index ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.toLowerCase()))
    .join("") as CamelCase<T>;
}

export function mergeAndRemoveDuplicates<T>(...arrays: Array<Array<T>>): Array<T> {
  const combinedArray: Array<T> = arrays.reduce((prev, curr) => [...prev, ...curr], []);
  const uniqueObjectsMap = new Map<string, T>();

  combinedArray.forEach((obj) => {
    const key: string = JSON.stringify(obj);
    if (!uniqueObjectsMap.has(key)) {
      uniqueObjectsMap.set(key, obj);
    }
  });

  return Array.from(uniqueObjectsMap.values());
}
