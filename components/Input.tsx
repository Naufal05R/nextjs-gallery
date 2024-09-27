"use client";

import React, { forwardRef, useId, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check, ImageIcon, X } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { frameworks } from "@/constants/framework";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ModelSelectFieldEnum } from "@/constants/enum";

export interface CustomInputProps extends WithRequired<VariantProps<typeof Input>, "title"> {
  fields?: Array<string>;
}

type ModelSelectFieldType = Lowercase<keyof typeof ModelSelectFieldEnum> | "";

// interface BaseVariantProps extends CustomInputProps {}

const BaseVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, placeholder }, ref) => {
  const uniqueId = useId();

  return (
    <div className="flex flex-col space-y-4" ref={ref}>
      <Label htmlFor={uniqueId} required className="capitalize">
        {title}
      </Label>
      <Input placeholder={placeholder} id={uniqueId} type="text" />
    </div>
  );
});

BaseVariant.displayName = "BaseVariant";

// interface SeveralVariantProps extends CustomInputProps {}

const SeveralVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, placeholder }, ref) => {
  const [several, setSeveral] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const uniqueId = useId();

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

SeveralVariant.displayName = "SeveralVariant";

// interface ImageVariantProps extends CustomInputProps {}

const ImageVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title }, ref) => {
  const [image, setImage] = useState<File>();

  const uniqueId = useId();
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

ImageVariant.displayName = "ImageVariant";

// interface SelectVariantProps extends CustomInputProps {}

const SelectVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, fields }, ref) => {
  const [type, setType] = useState<ModelSelectFieldType>("");

  const SelectFieldDropdown = ({ id, title, type }: { id: string; title: string; type: ModelSelectFieldType }) => {
    switch (type) {
      case "void":
        return <Input id={id} type="text" placeholder={`My New ${title}`} />;
      default:
        return (
          <Select disabled={!type}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Select ${title}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {frameworks.map((framework) => (
                  <SelectItem key={framework.value} value={framework.value}>
                    {framework.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
    }
  };

  return (
    <div className="flex flex-col space-y-4" ref={ref}>
      <Label required className="capitalize">
        {title}
      </Label>
      <RadioGroup
        defaultValue=""
        className="flex items-center gap-x-4"
        onValueChange={(value: ModelSelectFieldType) => setType(value)}
      >
        {fields?.map((field) => {
          return (
            <Label
              key={title + field}
              htmlFor={title + field}
              className="group flex h-10 flex-1 cursor-pointer items-center rounded-md border bg-transparent px-3 py-2.5 has-[:checked]:border-slate-400 has-[:checked]:text-slate-800"
            >
              <RadioGroupItem value={field.toLowerCase()} id={title + field} hidden />
              <span className="capitalize">Select {field}</span>
              <Check size={16} className="invisible ml-auto group-has-[:checked]:visible" />
            </Label>
          );
        })}
      </RadioGroup>

      <SelectFieldDropdown id={title.toLowerCase()} title={title} type={type} />
    </div>
  );
});

SelectVariant.displayName = "SelectVariant";

const Component = {
  Base: BaseVariant,
  Several: SeveralVariant,
  Image: ImageVariant,
  Select: SelectVariant,
};

export default Component;
