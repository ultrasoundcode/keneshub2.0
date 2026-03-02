// Prisma client — Build: 2026-03-02-v3
// Using standard Prisma connection via DATABASE_URL (no Neon adapter complexity)
// Neon supports standard PostgreSQL connections — no special adapter needed for basic usage
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
