/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck - Prisma 7 strict types prevent valid runtime options
// Build: 2026-03-02 v6
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
      "Please set it in your Vercel environment variables."
    );
  }

  return new PrismaClient({
    datasourceUrl: connectionString,
  });
}

export const prisma: PrismaClient = globalForPrisma.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
