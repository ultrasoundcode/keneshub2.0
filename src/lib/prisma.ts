// Prisma 7 + Neon — Build: 2026-03-02 v5
// Using type assertion to bypass strict Prisma 7 types for datasourceUrl
// datasourceUrl is a valid runtime option even when schema has no url property
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please set it in your Vercel environment variables."
    );
  }

  // Use Record<string, unknown> to bypass strict Prisma 7 constructor types
  // datasourceUrl IS a valid runtime option that Prisma 7 reads at runtime
  const prismaOptions: Record<string, unknown> = {
    datasourceUrl: connectionString,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  };

  return new PrismaClient(prismaOptions as ConstructorParameters<typeof PrismaClient>[0]);
}

// Singleton pattern to avoid multiple instances in development hot-reload
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
