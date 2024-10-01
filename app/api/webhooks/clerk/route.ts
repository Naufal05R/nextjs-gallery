import { deleteUser, updateUser } from "@/lib/actions/user.actions";
import { prisma } from "@/lib/prisma";
import { handlingError } from "@/lib/utils";
import { User } from "@/types/user";
import { auth, createClerkClient, WebhookEvent } from "@clerk/nextjs/server";
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
      const newUser = await prisma.user.create({ data: user });

      const updatedUser = await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser.id,
        },
      });

      return NextResponse.json({ message: "OK", user: updatedUser });
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

    let updatedUser: User | undefined = user;

    if (auth().userId) {
      updatedUser = await updateUser(id, user);
    }

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  if (eventType === "user.deleted") {
    const { id } = event.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: "OK", user: deletedUser });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  return new Response("", { status: 200 });
}
