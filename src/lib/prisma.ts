// Prisma 7 + Neon Serverless
// When using an adapter, the connection is managed entirely by the Pool.
// Do NOT pass datasourceUrl or datasources to the constructor.
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please set it in your .env file or Vercel environment variables."
    );
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    // @ts-expect-error - Prisma 7 adapter type — works at runtime
    adapter,
    log: process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
  });
}

// Singleton pattern to avoid multiple instances in development hot-reload
export const prisma = global.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
