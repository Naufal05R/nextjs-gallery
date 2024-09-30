import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "@/components/Form";

export default function Page() {
  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back! Please enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form.SignIn />
      </CardContent>
    </Card>
  );
}
