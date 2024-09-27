import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />

        <Link href={"/dashboard"}>Dashboard</Link>
      </SignedIn>
    </div>
  );
};

export default Header;
