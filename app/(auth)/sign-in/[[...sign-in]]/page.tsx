import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/Form";

export default function Page() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Create a new Account to access all feature.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form.SignIn />
      </CardContent>
    </Card>
  );
}
