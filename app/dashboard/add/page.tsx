import { SelectFieldType } from "@/components/SelectField";
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
import { ImageIcon } from "lucide-react";

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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
              {["Category", "Gallery"].map((title) => (
                <SelectFieldType
                  key={title}
                  title={title}
                  fields={modelCategoryObject}
                />
              ))}
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="image"
                  className="grid aspect-square w-full cursor-pointer place-items-center rounded-md border"
                >
                  <Input id="image" type="file" hidden className="hidden" />
                  <ImageIcon
                    size={128}
                    strokeWidth={0.5}
                    className="text-slate-400"
                  />
                </Label>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" type="text" placeholder="Name of your image" />
              </div>
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
