import { forwardRef } from "react";
import { Button } from "./ui/button";
import { imageFormFields } from "@/constants/form";
import Input from "@/components/Input";
import { createImage } from "@/lib/actions";

const ImageVariant = forwardRef(() => {
  return (
    <form action={createImage}>
      {imageFormFields.map(({ ...props }, i) => (
        <Input key={i} {...props} />
      ))}
      <div className="mt-8 flex items-center gap-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </div>
    </form>
  );
});

ImageVariant.displayName = "ImageVariant";

const Component = {
  Image: ImageVariant,
};

export default Component;
