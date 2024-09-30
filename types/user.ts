import { User as UserType } from "@prisma/client";

export type User = Omit<UserType, "createdAt" | "updatedAt">;
export type UserId = Pick<UserType, "id">;
