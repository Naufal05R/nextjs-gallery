"use client";

import React, { forwardRef, useId, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Check, ImageIcon, X } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ModelSelectFieldEnum } from "@/constants/enum";
import { wrapper } from "@/lib/styles";

export interface CustomInputProps extends WithRequired<VariantProps<typeof Input>, "title"> {
  className?: string;
  fields?: Array<string>;
  entries?: Array<string>;
}

type ModelSelectFieldType = Lowercase<keyof typeof ModelSelectFieldEnum> | "";

// interface BaseVariantProps extends CustomInputProps {}

const BaseVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, className, ...props }, ref) => {
  const uniqueId = useId();

  return (
    <div className={cn(wrapper.input, className)} ref={ref}>
      <Label htmlFor={uniqueId} className="capitalize" required={props.required}>
        {title}
      </Label>
      <Input id={uniqueId} name={title} {...props} />
    </div>
  );
});

BaseVariant.displayName = "BaseVariant";

// interface SeveralVariantProps extends CustomInputProps {}

const SeveralVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, onChange, ...props }, ref) => {
  const [several, setSeveral] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const uniqueId = useId();

  return (
    <div className={cn(wrapper.input)} ref={ref}>
      <Label htmlFor={uniqueId} required={props.required} className="capitalize">
        {title}
      </Label>
      <Input name={title} type="hidden" value={several} onChange={onChange} />
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
        {...props}
      />

      <ul className={cn("flex flex-wrap items-center gap-1.5 rounded-md border p-1.5", { hidden: !several?.length })}>
        {several?.map((inputted) => (
          <li
            key={inputted}
            className="relative -ml-px w-fit select-none rounded bg-slate-800 py-1 pl-2.5 pr-7 text-sm text-slate-100"
          >
            {inputted}

            <X
              onClick={() => setSeveral(several.filter((i) => i !== inputted))}
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

const ImageVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, required }, ref) => {
  const [image, setImage] = useState<File>();

  const uniqueId = useId();
  return (
    <div className={cn(wrapper.input)} ref={ref}>
      <Label required={required} className="capitalize">
        {title}
      </Label>
      <Label
        htmlFor={uniqueId}
        className="relative grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-md border p-2.5"
      >
        <Input
          id={uniqueId}
          name={title}
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

const SelectFieldDropdown = ({
  id,
  title,
  type,
  entries,
}: {
  id: string;
  title: string;
  type: ModelSelectFieldType;
  entries?: Array<string>;
}) => {
  switch (type) {
    case "void":
      return <Input id={id} name={title} type="text" placeholder={`My New ${title}`} />;
    default:
      return (
        <Select name={title} disabled={!type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${title}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {entries?.length ? (
                entries.map((entry) => (
                  <SelectItem key={entry} value={entry} className="capitalize">
                    {entry}
                  </SelectItem>
                ))
              ) : (
                <div className="flex w-full items-center px-2 py-1.5 text-sm text-slate-500">
                  <p>
                    You don&apos;t have any existing <span className="capitalize">{title}</span>
                  </p>
                  <X className="ml-auto" size={16} />
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
  }
};

const SelectVariant = forwardRef<HTMLInputElement, CustomInputProps>(({ title, required, fields, entries }, ref) => {
  const [type, setType] = useState<ModelSelectFieldType>("");

  const uniqueId = useId();

  return (
    <div className={cn(wrapper.input)} ref={ref}>
      <Label htmlFor={uniqueId} required={required} className="capitalize">
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

      <SelectFieldDropdown id={title.toLowerCase()} title={title} type={type} entries={entries} />
    </div>
  );
});

SelectVariant.displayName = "SelectVariant";

const Variant = {
  Base: BaseVariant,
  Several: SeveralVariant,
  Image: ImageVariant,
  Select: SelectVariant,
};

export type InputVariantType = keyof typeof Variant;

export interface InputComponentProps extends CustomInputProps {
  model: InputVariantType;
  title: string;
}

const Component = ({ model, ...props }: InputComponentProps) => {
  const Rendered = Variant[model];

  return <Rendered {...props} />;
};

export default Component;
