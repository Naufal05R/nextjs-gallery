"use client";

import React, { forwardRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { generateId } from "@/lib/utils";

const InputBase = forwardRef<
  HTMLInputElement,
  Required<Pick<React.InputHTMLAttributes<HTMLInputElement>, "title">> &
    React.InputHTMLAttributes<HTMLInputElement>
>(({ title }, ref) => {
  const uniqueId = generateId(title);

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor={uniqueId} required>
        {title}
      </Label>
      <Input
        placeholder="Name of your image"
        id={uniqueId}
        type="text"
        ref={ref}
      />
    </div>
  );
});

InputBase.displayName = "FieldBase";

export const Field = {
  Base: InputBase,
};
