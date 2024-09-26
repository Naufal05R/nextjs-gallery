"use client";

import { Input } from "@/components";
import { InputImage } from "@/components/client/InputImage";
import { InputSeveral } from "@/components/client/InputSeveral";
import { SelectField } from "@/components/client/SelectField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModelSelectFieldEnum } from "@/constants/enum";
import { getEnumObject } from "@/lib/utils";

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
              <Input.Base title="Name of your image" />
              {["Category", "Gallery"].map((title) => (
                <SelectField
                  key={title}
                  title={title}
                  fields={modelCategoryObject}
                />
              ))}
              <InputImage />

              <InputSeveral
                title="tags"
                placeholder="Add tags to image (separate it with comma)"
              />
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
