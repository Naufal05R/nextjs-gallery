import { container } from "@/lib/styles";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header
      className={cn(
        container.paddingX,
        "fixed top-0 z-10 flex h-20 w-full items-center justify-between border-b bg-background",
      )}
    >
      <h1 className="text-2xl font-semibold text-slate-800">nanomage</h1>
      <SignedIn>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="border border-blue-100 bg-blue-500 text-slate-100 hover:bg-blue-600"
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <fieldset className="flex items-center gap-x-2">
          <Button asChild variant="secondary" size="sm" className="border text-slate-800">
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="border border-blue-200 bg-blue-500 text-slate-100 hover:bg-blue-600"
          >
            <Link href={"/dashboard"}>Create Image</Link>
          </Button>
        </fieldset>
      </SignedOut>
    </header>
  );
};

export default Header;
