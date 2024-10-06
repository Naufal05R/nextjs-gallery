"use client";

import { forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { signInFormFields, imageFormFields, signUpFormFields } from "@/constants/form";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { ClerkAPIError } from "@clerk/types";
import { getInitialFormFields, handlingError, replaceToCamelCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { createImage } from "@/lib/actions/image.actions";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import Input from "./Input";
import Link from "next/link";

export const FormImageVariant = forwardRef(() => {
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

FormImageVariant.displayName = "ImageVariant";

export const FormSignInVariant = forwardRef(() => {
  const initialFormFields = getInitialFormFields(signInFormFields);

  const { isLoaded, signIn, setActive } = useSignIn();
  const [values, setValues] = useState(initialFormFields);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors(undefined);

    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: values["email/username"],
        password: values.password,
      });

      if (signInAttempt.status !== "complete") {
        console.log(JSON.stringify(signInAttempt, null, 2));
      }

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        handlingError(signInAttempt);
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      handlingError(error);
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back! Please enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {signInFormFields.map(({ ...props }, i) => (
            <Input
              key={i}
              {...props}
              onChange={(ref) => {
                if (typeof ref === "string") {
                  setValues({ ...values, [props.title]: ref });
                } else {
                  setValues({ ...values, [props.title]: ref.target.value });
                }
              }}
            />
          ))}
          <Button className="mt-8 w-full">Sign In</Button>
          <p className="mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-500 underline-offset-2 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </CardContent>
      {errors && (
        <CardFooter>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            {errors.map((el, index) => (
              <AlertDescription key={index}>{el.longMessage}</AlertDescription>
            ))}
          </Alert>
        </CardFooter>
      )}
    </>
  );
});

FormSignInVariant.displayName = "SignInVariant";

export const FormSignUpVariant = forwardRef(() => {
  const initialFormFields = getInitialFormFields(signUpFormFields);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [values, setValues] = useState(initialFormFields);
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
        username: values.username,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (error) {
      handlingError(error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      handlingError(error);
    }
  };

  if (verifying) {
    return (
      <>
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Please check at {values.email || "your@email.com"} mailbox.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="flex flex-col">
            <Input
              datatype="string"
              model="Code"
              title="Code"
              value={code}
              length={6}
              onValueChange={(value) => setCode(value)}
              valueType="string"
            />
            <Button type="reset" variant="link" className="w-full text-blue-500 underline-offset-2">
              Didn&apos;t receive a code? Resend
            </Button>
            <Button type="submit">Verify</Button>
          </form>
        </CardContent>
      </>
    );
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Join Us! Create a new Account to get started and access all features.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-wrap justify-between">
          {signUpFormFields.map(({ ...props }, i) => (
            <Input
              key={i}
              {...props}
              value={values[replaceToCamelCase(props.title)]}
              onChange={(ref) => {
                if (typeof ref === "string") {
                  setValues({ ...values, [replaceToCamelCase(props.title)]: ref });
                } else {
                  setValues({ ...values, [replaceToCamelCase(props.title)]: ref.target.value });
                }
              }}
            />
          ))}
          <Button type="button" onClick={handleSubmit} className="mt-8 w-full">
            Sign Up
          </Button>
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 underline-offset-2 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </>
  );
});

FormSignUpVariant.displayName = "SignUpVariant";
