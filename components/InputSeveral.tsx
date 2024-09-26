"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const InputSeveral = () => {
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
