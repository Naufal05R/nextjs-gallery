"use client";

import Link from "next/link";
import Input from "@/components/Input";
import { forwardRef, useState } from "react";
import { Button } from "./ui/button";
import { signInFormFields, imageFormFields, signUpFormFields } from "@/constants/form";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { ClerkAPIError } from "@clerk/types";
import { getInitialFormFields, replaceToCamelCase } from "@/lib/utils";
// import { createImage } from "@/lib/actions/image.actions";

export const FormImageVariant = forwardRef(() => {
  return (
    <form /* action={createImage} */>
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
  const {} = useSignIn();

  const handleSubmit = async () => {};

  return (
    <form onSubmit={handleSubmit}>
      {signInFormFields.map(({ ...props }, i) => (
        <Input key={i} {...props} />
      ))}
      <Button className="mt-8 w-full">Sign In</Button>
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-500 underline-offset-2 hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
});

FormSignInVariant.displayName = "SignInVariant";

export const FormSignUpVariant = forwardRef(() => {
  const initialFormFields = getInitialFormFields(signUpFormFields);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [values, setValues] = useState(initialFormFields);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp?.create({
        emailAddress: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-wrap justify-between">
      {signUpFormFields.map(({ ...props }, i) => (
        <Input
          key={i}
          {...props}
          value={values[replaceToCamelCase(props.title)]}
          onChange={(ref) => {
            if (typeof ref === "string") {
              setValues({ ...values, [props.title.replace(/\s+/g, "_").toLowerCase()]: ref });
            } else {
              setValues({ ...values, [props.title.replace(/\s+/g, "_").toLowerCase()]: ref.target.value });
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
  );
});

FormSignUpVariant.displayName = "SignUpVariant";
