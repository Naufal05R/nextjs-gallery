"use client";

import { SelectFieldType } from "@/components/SelectField";
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
import { ModelSelectFieldEnum } from "@/constants/enum";
import { cn, getEnumObject } from "@/lib/utils";
import { ImageIcon, X } from "lucide-react";
import { useState } from "react";

const InputSeveral = () => {
  const [several, setSeveral] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor="tags">Tags</Label>
      <Input
        id="tags"
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
        placeholder="Add tags to image"
      />

      <ul
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-md border p-1.5",
          {
            hidden: !several?.length,
          },
        )}
      >
        {several?.map((tag) => (
          <li
            key={tag}
            className="relative -ml-px w-fit select-none rounded bg-slate-800 py-1 pl-2.5 pr-7 text-sm text-slate-100"
          >
            {tag}

            <X
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
          </li>
        ))}
      </ul>
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
              <div className="flex flex-col space-y-4">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
              {["Category", "Gallery"].map((title) => (
                <SelectFieldType
                  key={title}
                  title={title}
                  fields={modelCategoryObject}
                />
              ))}
              <div className="flex flex-col space-y-4">
                <Label
                  htmlFor="image"
                  className="grid aspect-square w-full cursor-pointer place-items-center rounded-md border"
                >
                  <Input id="image" type="file" hidden className="hidden" />
                  <ImageIcon
                    size={128}
                    strokeWidth={0.5}
                    className="text-slate-400"
                  />
                </Label>
              </div>

              <InputSeveral />
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
