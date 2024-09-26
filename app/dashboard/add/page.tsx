"use client";

import { InputImage } from "@/components/InputImage";
import { InputSeveral } from "@/components/InputSeveral";
import { SelectField } from "@/components/SelectField";
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
              <div className="flex flex-col space-y-4">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
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
