import * as dotenv from "dotenv";
import express from "express";
const app: any = express(); // Casting to any
import cors from "cors";
import logger from "../src/config/logger";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { userResolvers } from "./graphql/resolvers/user.resolver";

dotenv.config();

const prisma = new PrismaClient();

async function startServer() {
  // -------------------
  // Global Middleware
  // -------------------
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    })
  );

  // -------------------
  // Connect to Prisma
  // -------------------
  try {
    logger.info("Connecting to database...");
    await prisma.$connect();
    logger.info("✅ Database connected successfully");
  } catch (err) {
    logger.error("❌ Database connection failed:", err);
    process.exit(1);
  }

  // -------------------
  // Apollo Server Setup
  // -------------------
  const server = new ApolloServer({
    typeDefs,
    resolvers: userResolvers,
    context: () => ({ prisma }),
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return process.env.NODE_ENV === "development"
        ? error
        : { message: "Internal Server Error" };
    },
    introspection: true,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

startServer();
