import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    redirectToSignIn();
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const galleries = await prisma.gallery.findMany({
    where: {
      authorId: userId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(galleries);
}
