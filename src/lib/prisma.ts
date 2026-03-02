/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck - Prisma 7 strict types prevent valid runtime options
// Prisma 7 + Neon — Build: 2026-03-02 v7
// High-resilience initialization for Vercel Production
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("CRITICAL: DATABASE_URL is missing.");
    // Fallback for types or development
    return new PrismaClient();
  }

  try {
    // In Prisma 7, passing the connection string explicitly via several options
    // to ensure it's picked up regardless of internal engine state.
    // We use 'as any' because generated types sometimes mark these as 'never' 
    // when using prisma.config.ts, even though they work at runtime.
    return new PrismaClient({
      datasourceUrl: connectionString,
      datasources: {
        db: {
          url: connectionString,
        },
      },
    } as any);
  } catch (err) {
    console.error("Prisma initialization error:", err);
    return new PrismaClient();
  }
}

export const prisma: PrismaClient = globalForPrisma.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__prisma = prisma;
}
