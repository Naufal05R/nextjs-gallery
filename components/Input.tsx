"use client";

import React, { forwardRef, useState } from "react";
import Image from "next/image";
import { cn, generateId } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ImageIcon, X } from "lucide-react";
import { VariantProps } from "class-variance-authority";

interface CustomInputProps extends WithRequired<VariantProps<typeof Input>, "title"> {}

const BaseVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, placeholder }, ref) => {
  const uniqueId = generateId(title);

  return (
    <div className="flex flex-col space-y-4" ref={ref}>
      <Label htmlFor={uniqueId} required>
        {title}
      </Label>
      <Input placeholder={placeholder} id={uniqueId} type="text" />
    </div>
  );
});

BaseVariant.displayName = "FieldBase";

const SeveralVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, placeholder }, ref) => {
  const [several, setSeveral] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const uniqueId = generateId(title);

  return (
    <div className="flex flex-col space-y-4" ref={ref}>
      <Label htmlFor={uniqueId} className="capitalize">
        {title}
      </Label>
      <Input
        id={uniqueId}
        value={value}
        onChange={(e) => {
          const { value } = e.target;
          setValue(value);

          if (value.endsWith(",")) {
            setSeveral([...several, value.slice(0, -1)]);
            setValue("");
          }
        }}
        type="text"
        placeholder={placeholder}
      />

      <ul className={cn("flex flex-wrap items-center gap-1.5 rounded-md border p-1.5", { hidden: !several?.length })}>
        {several?.map((inputted) => (
          <li
            key={inputted}
            className="relative -ml-px w-fit select-none rounded bg-slate-800 py-1 pl-2.5 pr-7 text-sm text-slate-100"
          >
            {inputted}

            <X
              onClick={() => {
                setSeveral(several.filter((i) => i !== inputted));
              }}
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
});

SeveralVariant.displayName = "FieldSeveral";

const ImageVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title }, ref) => {
  const [image, setImage] = useState<File>();

  const uniqueId = generateId(title);
  return (
    <div className="flex flex-col space-y-4" ref={ref}>
      <Label required className="capitalize">
        {title}
      </Label>
      <Label
        htmlFor={uniqueId}
        className="relative grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-md border p-2.5"
      >
        <Input
          id={uniqueId}
          type="file"
          hidden
          accept="image/jpg, image/jpeg, image/png"
          className="hidden"
          onChange={(e) => {
            setImage(e.target.files?.[0]);
          }}
        />
        {image ? (
          <figure className="relative h-full w-full overflow-hidden rounded">
            <Image src={URL.createObjectURL(image)} className="object-cover" alt={uniqueId} fill />
          </figure>
        ) : (
          <ImageIcon size={96} strokeWidth={0.3} className="text-slate-200" />
        )}
      </Label>
    </div>
  );
});

ImageVariant.displayName = "FieldImage";

export const Component = {
  Base: BaseVariant,
  Several: SeveralVariant,
  Image: ImageVariant,
};
