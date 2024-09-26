"use client";

import { useState } from "react";

import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Check } from "lucide-react";
import { ModelSelectFieldEnum } from "@/constants/enum";

type ModelSelectFieldType = Lowercase<keyof typeof ModelSelectFieldEnum> | "";

const frameworks = [
  {
    value: "nextjs",
    label: "Nextjs",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxtjs",
    label: "Nuxtjs",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const SelectField = ({
  id,
  title,
  type,
}: {
  id: string;
  title: string;
  type: ModelSelectFieldType;
}) => {
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

export const SelectFieldType = ({
  title,
  fields,
}: {
  title: string;
  fields: string[];
}) => {
  const [type, setType] = useState<ModelSelectFieldType>("");

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{title}</Label>
      <RadioGroup
        defaultValue=""
        className="flex items-center gap-x-4 py-2"
        onValueChange={(value: ModelSelectFieldType) => setType(value)}
      >
        {fields.map((field) => {
          return (
            <Label
              key={title + field}
              htmlFor={title + field}
              className="group flex h-10 flex-1 cursor-pointer items-center rounded-md border bg-transparent px-3 py-2.5 has-[:checked]:border-slate-400 has-[:checked]:text-slate-800"
            >
              <RadioGroupItem
                value={field.toLowerCase()}
                id={title + field}
                hidden
              />
              <span className="capitalize">Select {field}</span>
              <Check
                size={16}
                className="invisible ml-auto group-has-[:checked]:visible"
              />
            </Label>
          );
        })}
      </RadioGroup>

      <SelectField id={title.toLowerCase()} title={title} type={type} />
    </div>
  );
};
