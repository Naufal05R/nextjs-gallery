"use server";

import { User, UserId } from "@/types/user";
import { prisma } from "../prisma";
import { handlingError } from "../utils";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export const createUser = async (user: User) => {
  try {
    const newUser = await prisma.user.create({ data: user });

    return newUser;
  } catch (error) {
    handlingError(error);
  }
};

export const getUserById = async (userId: UserId) => {
  try {
    const selectedUser = await prisma.user.findUnique({ where: { id: userId } });

    if (!selectedUser) throw new Error("User not found");

    return selectedUser;
  } catch (error) {
    handlingError(error);
  }
};

export const updateUser = async (userId: UserId, user: User) => {
  try {
    if (userId !== auth().userId) throw new Error("User update failed. Unauthorized!");

    const updatedUser = await prisma.user.update({ where: { id: userId }, data: user });

    return updatedUser;
  } catch (error) {
    handlingError(error);
  }
};

export const deleteUser = async (userId: UserId) => {
  try {
    const userToDelete = await prisma.user.findUnique({ where: { id: userId } });

    if (!userToDelete) throw new Error("User not found");
    if (!auth().userId || userToDelete?.id !== auth().userId) throw new Error("User update failed. Unauthorized!");

    const deletedUser = await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/");

    return deletedUser ? deletedUser : null;
  } catch (error) {
    handlingError(error);
  }
};
