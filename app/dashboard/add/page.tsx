"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, getEnumObject } from "@/lib/utils";
import { Check } from "lucide-react";
import { useState } from "react";

enum ModelSelectFieldEnum {
  Exist,
  Void,
}

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

const SelectFieldType = ({
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

export default function DashboardAddPage() {
  const modelCategoryObject = getEnumObject(ModelSelectFieldEnum);

  return (
    <main className="grid h-screen w-full place-items-center px-4 py-2 sm:px-8 sm:py-4 lg:px-16 lg:py-8">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Create Image</CardTitle>
          <CardDescription>Create your new Image.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
              {["Category", "Gallery"].map((title) => (
                <SelectFieldType
                  key={title}
                  title={title}
                  fields={modelCategoryObject}
                />
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
