import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { generateId } from "@/lib/utils";

interface InputBaseProps {
  title: string;
}

export const InputBase = ({ title }: InputBaseProps) => {
  const uniqueId = generateId(title);

  return (
    <div className="flex flex-col space-y-4">
      <Label htmlFor={uniqueId} required>
        {title}
      </Label>
      <Input id={uniqueId} type="text" placeholder="Name of your image" />
    </div>
  );
};

export default InputBase;
