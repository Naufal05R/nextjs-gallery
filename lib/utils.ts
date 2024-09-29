import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnumObject<E extends Enum<E>>(value: E) {
  return Object.values(value).slice(0, Object.values(value).length / 2);
}

export function generateId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function getExtension(filename: string) {
  return filename.split(".").pop();
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
