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
  console.log("PRISMA PRODUCTION INIT: DATABASE_URL exists =", !!connectionString, "length =", connectionString?.length, "suffix =", connectionString?.slice(-4));
  
  if (!connectionString) {
    throw new Error("DATABASE_URL is required in production but was not found in process.env");
  }

  const pool = new Pool({ connectionString });
  // @ts-ignore
  const adapter = new PrismaNeon(pool);
  prismaInstance = new PrismaClient({
    adapter,
    log: ["error"],
  });
} else {
  console.log("PRISMA DEV INIT: DATABASE_URL exists =", !!connectionString);
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
