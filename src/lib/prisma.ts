import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Lazy initialization to avoid module-scope crashes
let prismaInstance: PrismaClient;

// Forced clean build - 2026-02-25
const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === "production") {
  console.log(`PRISMA PROD: DB_URL present: ${!!connectionString}, len: ${connectionString?.length}`);
  
  if (!connectionString) {
    throw new Error("DATABASE_URL is missing in production environment");
  }

  // Neon Pool initialization
  const pool = new Pool({ connectionString: connectionString });
  // @ts-ignore
  const adapter = new PrismaNeon(pool);
  
  prismaInstance = new PrismaClient({
    adapter,
    log: ["error"],
  });
} else {
  // Development logic
  if (!globalForPrisma.prisma) {
    if (connectionString) {
      const pool = new Pool({ connectionString: connectionString });
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
