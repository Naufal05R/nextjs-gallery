"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, generateId } from "@/lib/utils";
import { X } from "lucide-react";
import { VariantProps } from "class-variance-authority";

interface InputSeveralProps extends VariantProps<typeof Input> {
  title: string;
}

export const InputSeveral = ({ title, placeholder }: InputSeveralProps) => {
  const [several, setSeveral] = useState<Array<string>>([]);
  const [value, setValue] = useState("");

  const uniqueId = generateId(title);

  return (
    <div className="flex flex-col space-y-4">
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

      <ul
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-md border p-1.5",
          { hidden: !several?.length },
        )}
      >
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
};
