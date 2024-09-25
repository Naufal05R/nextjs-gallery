"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";import { Input } from "@/components/ui/input";
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

const SelectField = ({ id, type }: { id: string; type: ModelSelectFieldType }) => {
  switch (type) {
    case "void":
      return <Input id={id} type="text" placeholder="My New Category" />;
    default:
      return (
        <Select disabled={!type}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
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

export default function DashboardAddPage() {
  const [type, setType] = useState<ModelSelectFieldType>("");

  const modelCategoryObject = getEnumObject(ModelSelectFieldEnum);

  return (
    <main className="grid h-screen w-full place-items-center px-4 py-2 sm:px-8 sm:py-4 lg:px-16 lg:py-8">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Create image</CardTitle>
          <CardDescription>Create your image.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <RadioGroup
                  defaultValue=""
                  className="flex items-center gap-x-4 py-2"
                  onValueChange={(value: ModelSelectFieldType) => setType(value)}
                >
                  {modelCategoryObject.map((category) => {
                    category = `${category}`.toLowerCase();
                    return (
                      <Label
                        key={category}
                        htmlFor={category}
                        className="group flex h-10 flex-1 cursor-pointer items-center rounded-md border bg-transparent px-3 py-2.5 has-[:checked]:border-slate-400 has-[:checked]:text-slate-800"
                      >
                        <RadioGroupItem value={category} id={category} hidden />
                        <span className="capitalize">Select {category}</span>
                        <Check
                          size={16}
                          className="invisible ml-auto group-has-[:checked]:visible"
                        />
                      </Label>
                    );
                  })}
                </RadioGroup>

                <SelectField id="category" type={type} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gallery">Gallery</Label>
                <Select>
                  <SelectTrigger id="gallery">
                    <SelectValue placeholder="Select Gallery" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Art</SelectItem>
                    <SelectItem value="sveltekit">Picture</SelectItem>
                    <SelectItem value="astro">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
