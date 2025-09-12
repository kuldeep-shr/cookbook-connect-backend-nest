import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { sanitizeUser } from "../utilities/ApiUtilities";
import { generateHash, verifyHash } from "../utilities/encryptionUtils";
import { createToken } from "../middlewares/authenticate";
import type { Prisma } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<any> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("❌ Error fetching user by email:", error);
    return null;
  }
};

export const createUser = async (
  email: string,
  password: string,
  name: string = ""
) => {
  try {
    const hashedPassword = await generateHash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = createToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    return sanitizeUser({
      ...newUser,
      token,
      token_validity: "1day",
    });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return null;
  }
};

export const updateUser = async (userId: number, updateData: Partial<any>) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: updateData, // safer than passing full User object
    });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return null;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) return null;

    const isValid = await verifyHash(password, user.password);
    if (!isValid) return null;

    const token = createToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {},
    });

    return sanitizeUser({
      ...updatedUser,
      token,
      token_validity: "1day",
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return null;
  }
};

export default {
  createUser,
  loginUser,
  getUserByEmail,
  updateUser,
};
