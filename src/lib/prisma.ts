import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization to avoid module-scope crashes
let prismaInstance: PrismaClient;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("CRITICAL: DATABASE_URL is not defined in environment variables!");
}

if (process.env.NODE_ENV === "production") {
  if (!connectionString) {
    throw new Error("DATABASE_URL is required in production");
  }
  const pool = new Pool({ connectionString });
  // @ts-ignore
  const adapter = new PrismaNeon(pool);
  prismaInstance = new PrismaClient({
    adapter,
    log: ["error"],
  });
} else {
  if (!globalForPrisma.prisma) {
    if (connectionString) {
      const pool = new Pool({ connectionString });
      // @ts-ignore
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
