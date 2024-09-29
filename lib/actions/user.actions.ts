"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import { handleError } from "../utils";

export const createUser = async (user: User) => {
  try {
    const newUser = await prisma.user.create({ data: user });

    return newUser;
  } catch (error) {
    handleError(error);
  }
};
