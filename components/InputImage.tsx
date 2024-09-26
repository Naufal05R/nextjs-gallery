"use client";

import { ImageIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import Image from "next/image";

export const InputImage = () => {
  const [image, setImage] = useState<File>();
  return (
    <div className="flex flex-col space-y-4">
      <Label required>Image</Label>
      <Label
        htmlFor="image"
        className="relative grid aspect-video w-full cursor-pointer place-items-center overflow-hidden rounded-md border p-2.5"
      >
        <Input
          id="image"
          type="file"
          hidden
          accept="image/jpg, image/jpeg, image/png"
          className="hidden"
          onChange={(e) => {
            console.log(e.target.files?.[0]);
            setImage(e.target.files?.[0]);
          }}
        />
        {image ? (
          <figure className="relative h-full w-full overflow-hidden rounded">
            <Image
              src={URL.createObjectURL(image)}
              className="object-cover"
              alt="image"
              fill
            />
          </figure>
        ) : (
          <ImageIcon size={96} strokeWidth={0.3} className="text-slate-200" />
        )}
      </Label>
    </div>
  );
};
