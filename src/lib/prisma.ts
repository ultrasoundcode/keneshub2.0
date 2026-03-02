// Prisma 7 + Neon Serverless — Build: 2026-03-02 v4
// In Prisma 7, PrismaClient must receive the datasourceUrl in the constructor.
// Do NOT put url in schema.prisma when using prisma.config.ts.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please set it in your .env file or Vercel environment variables."
    );
  }

  // In Prisma 7, pass the connection URL via datasourceUrl when using prisma.config.ts
  return new PrismaClient({
    datasourceUrl: connectionString,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
}

// Singleton pattern to avoid multiple instances in development hot-reload
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
