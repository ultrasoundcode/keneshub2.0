import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization to avoid module-scope crashes
let prismaInstance: PrismaClient;

const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "production") {
  const pool = new Pool({ connectionString });
  // @ts-ignore
  const adapter = new PrismaNeon(pool);
  prismaInstance = new PrismaClient({
    adapter,
    log: ["error"],
  });
} else {
  if (!globalForPrisma.prisma) {
    const pool = new Pool({ connectionString });
    // @ts-ignore
    const adapter = new PrismaNeon(pool);
    globalForPrisma.prisma = new PrismaClient({
      adapter,
      log: ["query", "error", "warn"],
    });
  }
  prismaInstance = globalForPrisma.prisma;
}

export const prisma = prismaInstance;
