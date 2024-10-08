import { prisma } from "@/lib/prisma";
import { handlingError } from "@/lib/utils";
import { User } from "@/types/user";
import { createClerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const clerkClient = createClerkClient({
  secretKey: CLERK_SECRET_KEY,
});

export async function POST(request: Request) {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const webhook = new Webhook(CLERK_WEBHOOK_SECRET);
  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook", error);
    return new Response("Error occured.", { status: 400 });
  }

  const { id } = event.data;
  const eventType = event.type;

  if (eventType === "user.created") {
    const { id, username, email_addresses, image_url, first_name, last_name } = event.data;

    const user: User = {
      id,
      username: username!,
      email: email_addresses[0].email_address,
      avatarUrl: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    try {
      const existUser = await prisma.user.findFirst({
        where: { OR: [{ email: user.email }, { username: user.username }] },
      });

      if (existUser) {
        return NextResponse.json({ message: `Email or Username has been used!` }, { status: 403 });
      }

      const newUser = await prisma.user.create({ data: user });

      const updatedUser = await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      });

      return NextResponse.json({ message: "OK", user: updatedUser }, { status: 201 });
    } catch (error) {
      handlingError(error);
    }
  }

  if (eventType === "user.updated") {
    const { id, username, email_addresses, image_url, first_name, last_name } = event.data;

    const user: User = {
      id,
      username: username!,
      email: email_addresses[0].email_address,
      avatarUrl: image_url,
      firstName: first_name,
      lastName: last_name,
    };

    try {
      const selectedUser = await prisma.user.findUnique({ where: { id, username: user.username, email: user.email } });

      if (!selectedUser) return NextResponse.json({ message: "User doesn't exist!", user: null }, { status: 404 });

      const updatedUser = await prisma.user.update({ where: { id: selectedUser.id }, data: user });

      return NextResponse.json({ message: "OK", user: updatedUser }, { status: 201 });
    } catch (error) {
      handlingError(error);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = event.data;

    try {
      const userToDelete = await prisma.user.findUnique({ where: { id } });

      if (userToDelete) return NextResponse.json({ message: "User doesn't exist!", user: null }, { status: 404 });

      const deletedUser = await prisma.user.delete({ where: { id } });

      return NextResponse.json({ message: "OK", user: deletedUser });
    } catch (error) {
      handlingError(error);
    }
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
