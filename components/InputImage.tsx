import { ImageIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const InputImage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <Label required>Image</Label>
      <Label
        htmlFor="image"
        className="grid aspect-video w-full cursor-pointer place-items-center rounded-md border"
      >
        <Input id="image" type="file" hidden className="hidden" />
        <ImageIcon size={96} strokeWidth={0.3} className="text-slate-200" />
      </Label>
    </div>
  );
};
