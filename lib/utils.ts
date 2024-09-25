import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEnumObject<E extends Enum<E>>(value: E) {
  return Object.values(value).slice(0, Object.values(value).length / 2);
}
