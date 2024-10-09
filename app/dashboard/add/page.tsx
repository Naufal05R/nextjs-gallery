import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormImageVariant } from "@/components/Form";

export default function DashboardAddPage() {
  return (
    <main className="grid h-screen w-full place-items-center px-4 py-2 sm:px-8 sm:py-4 lg:px-16 lg:py-8">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Create Image</CardTitle>
          <CardDescription>Create your new Image.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormImageVariant />
        </CardContent>
      </Card>
    </main>
  );
}
