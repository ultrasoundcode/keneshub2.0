/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.warn("WARNING: DATABASE_URL is not set. This might cause issues during build or runtime.");
  }

  // Purely using datasources which is the standard override method.
  // Casting to any to avoid strict Prisma 7 type conflicts on Vercel.
  return new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  } as any);
}

export const prisma: PrismaClient = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
