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

export const getUserById = async (userId: string) => {
  try {
    const selectedUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!selectedUser) throw new Error("User not found");

    return selectedUser;
  } catch (error) {
    handlingError(error);
  }
};

export const updateUser = async (userId: string, user: User) => {
  try {
    const updatedUser = await prisma.user.update({ where: { id: userId }, data: user });

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    handlingError(error);
  }
};

export const deleteUser = async () => {};
