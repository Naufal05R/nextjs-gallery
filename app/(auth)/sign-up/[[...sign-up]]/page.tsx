import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormSignUpVariant } from "@/components/Form";

export default function Page() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new Account to get into Our Application and access all features.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormSignUpVariant />
      </CardContent>
    </Card>
  );
}
