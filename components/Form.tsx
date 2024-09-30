import { forwardRef } from "react";
import { Button } from "./ui/button";
import { signInFormFields, imageFormFields, signUpFormFields } from "@/constants/form";
import Input from "@/components/Input";
import Link from "next/link";
// import { createImage } from "@/lib/actions/image.actions";

const ImageVariant = forwardRef(() => {
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

ImageVariant.displayName = "ImageVariant";

const SignInVariant = forwardRef(() => {
  return (
    <form /* action={createImage} */>
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

SignInVariant.displayName = "SignInVariant";

const SignUpVariant = forwardRef(() => {
  return (
    <form /* action={createImage} */>
      {signUpFormFields.map(({ ...props }, i) => (
      <Input key={i} {...props} />
      ))}
      <Button className="mt-8 w-full">Sign Up</Button>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-500 underline-offset-2 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
});

SignUpVariant.displayName = "SignUpVariant";

const Component = {
  Image: ImageVariant,
  SignIn: SignInVariant,
  SignUp: SignUpVariant,
};

export default Component;
