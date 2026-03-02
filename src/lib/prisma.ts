/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  
  // High resilience constructor for Prisma 7
  return new PrismaClient({
    datasourceUrl: url,
    datasources: {
      db: {
        url: url
      }
    }
  } as any);
}

export const prisma: PrismaClient = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
