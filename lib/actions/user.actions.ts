"use server";

import { User } from "@prisma/client";
import { prisma } from "../prisma";
import { handlingError } from "../utils";

export const createUser = async (user: User) => {
  try {
    const newUser = await prisma.user.create({ data: user });

    return newUser;
  } catch (error) {
    handlingError(error);
  }
};

export const getUserById = async () => {};

export const updateUser = async () => {}
