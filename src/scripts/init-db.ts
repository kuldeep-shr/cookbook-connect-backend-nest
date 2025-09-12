// src/prisma/initDB.ts
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Postgres via Prisma.");

    // Check if any table has rows to infer existence
    const usersCount = await prisma.user.count().catch(() => null);
    // const categoriesCount = await prisma.category.count().catch(() => null);
    // const promptsCount = await prisma.prompt.count().catch(() => null);

    const tablesExist = usersCount !== null;

    if (tablesExist) {
      console.log("✅ All tables already exist. Skipping creation.");
    } else {
      console.log("📦 Creating missing tables using Prisma...");

      // This will push your schema to the database without migrations
      execSync("npx prisma db push", { stdio: "inherit" });

      console.log("✅ Tables created or updated.");
    }
  } catch (err) {
    console.error("❌ Error during DB initialization:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

initDB();
