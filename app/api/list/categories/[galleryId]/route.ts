import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { galleryId: string } }) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    redirectToSignIn();
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const categories = await prisma.category.findMany({
    where: {
      authorId: userId,
      collectionId: params.galleryId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(categories);
}
