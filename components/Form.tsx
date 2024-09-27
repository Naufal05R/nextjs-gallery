"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageFormData, imageFormSchema } from "@/lib/schema";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { imageFormFields } from "@/constants/form";
import Input from "@/components/Input";

type ImageFormDataKey = keyof ImageFormData;

const ImageVariant = forwardRef(() => {
  const form = useForm<ImageFormData>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      name: "",
      category: "",
      gallery: "",
      image: "",
      tags: [""],
    },
  });

  const onSubmit = (values: ImageFormData) => {
    console.log(values);
  };

  const renderedFields = Object.keys(form.watch()) as Array<ImageFormDataKey>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {imageFormFields.map(({ ...props }, i) => (
          <FormField
            key={i}
            control={form.control}
            name={renderedFields[i]}
            render={() => (
              <FormItem className="mt-4">
                <FormControl>
                  <Input {...props} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="mt-8 flex items-center gap-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </div>
      </form>
    </Form>
  );
});

ImageVariant.displayName = "ImageVariant";

const Component = {
  Image: ImageVariant,
};

export default Component;
