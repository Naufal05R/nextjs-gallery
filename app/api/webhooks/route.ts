import { createClerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const clerkClient = createClerkClient({
  secretKey: CLERK_SECRET_KEY,
});

export async function POST(request: Request) {
  const WEBHOOK_SECRET_CLERK = process.env.WEBHOOK_SECRET_CLERK;

  if (!WEBHOOK_SECRET_CLERK) {
    throw new Error("Please add WEBHOOK_SECRET_CLERK from Clerk Dashboard to .env or .env.local");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }
}
