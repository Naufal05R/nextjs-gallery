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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardAddPage() {
  return (
    <main className="grid place-items-center h-screen w-full px-4 sm:px-8 lg:px-16 py-2 sm:py-4 lg:py-8">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Create image</CardTitle>
          <CardDescription>Create your image.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Name of your image" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <div className="flex items-center">
                  <Input id="_" type="text" placeholder="Name of your image" />
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Nature</SelectItem>
                      <SelectItem value="sveltekit">Modern</SelectItem>
                      <SelectItem value="astro">Abstract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="gallery">Gallery</Label>
                <Select>
                  <SelectTrigger id="gallery">
                    <SelectValue placeholder="Select Gallery" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Art</SelectItem>
                    <SelectItem value="sveltekit">Picture</SelectItem>
                    <SelectItem value="astro">AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
