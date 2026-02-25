import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization to avoid module-scope crashes
let prismaInstance: PrismaClient;

// Final production initialization - 2026-02-25
const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "production") {
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing in production environment");
  }

  const pool = new Pool({ connectionString });
  // @ts-expect-error - PrismaNeon type mismatch in v7
  const adapter = new PrismaNeon(pool);
  
  prismaInstance = new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });
} else {
  if (!globalForPrisma.prisma) {
    if (connectionString) {
      const pool = new Pool({ connectionString });
      // @ts-expect-error - PrismaNeon type mismatch in v7
      const adapter = new PrismaNeon(pool);
      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log: ["query", "error", "warn"],
      });
    } else {
      globalForPrisma.prisma = new PrismaClient({
        log: ["query", "error", "warn"],
      });
    }
  }
  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
