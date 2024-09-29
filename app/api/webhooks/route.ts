import { createClerkClient } from "@clerk/nextjs/server";

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

const clerkClient = createClerkClient({
  secretKey: CLERK_SECRET_KEY,
});

export async function POST(request: Request) {
  const WEBHOOK_SECRET_CLERK = process.env.WEBHOOK_SECRET_CLERK;

  if (!WEBHOOK_SECRET_CLERK) {
    throw new Error("Please add WEBHOOK_SECRET_CLERK from Clerk Dashboard to .env or .env.local");
  }
}
