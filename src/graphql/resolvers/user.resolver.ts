import { prisma } from "../../../prisma/client";
import { hash, compare } from "bcrypt";
import { generateAccessToken } from "../../utilities/ApiUtilities";
import { GraphQLError } from "graphql";

export const userResolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    user: async (_: any, { id }: { id: string }) => {
      return await prisma.user.findUnique({ where: { id } });
    },
  },
  Mutation: {
    signup: async (
      _: any,
      {
        name,
        email,
        password,
      }: { name: string; email: string; password: string }
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new GraphQLError("User with this email already exists", {
          extensions: { code: "USER_ALREADY_EXISTS", http: { status: 400 } },
        });
      }

      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      const token = generateAccessToken(user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
        valid: true,
      };
    },

    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "INVALID_CREDENTIALS", http: { status: 400 } },
        });
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "INVALID_CREDENTIALS", http: { status: 400 } },
        });
      }

      const token = generateAccessToken(user.id);
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
        valid: true,
      };
    },
  },
};
