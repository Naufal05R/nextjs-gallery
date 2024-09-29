"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";

export const createUser = async (user: User) => {
  try {
    const newUser = await prisma.user.create({ data: user });

    return newUser;
  } catch (error) {}
};
