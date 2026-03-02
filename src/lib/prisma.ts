// Prisma 7 + Neon Serverless — Build: 2026-03-02 v2
// Correct usage: Create Pool with connectionString, pass to PrismaNeon adapter.
// Do NOT use datasources or datasourceUrl in the PrismaClient constructor.
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

  // Create Neon connection pool with the connection string
  const pool = new Pool({ connectionString });
  
  // Create the Prisma adapter for Neon
  // The @ts-expect-error is needed because the Prisma 7 types for the adapter
  // are not fully aligned with the @prisma/adapter-neon package yet
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({ adapter });
}

// Singleton pattern to avoid multiple instances in development hot-reload
export const prisma = global.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
