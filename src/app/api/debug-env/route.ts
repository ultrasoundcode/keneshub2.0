import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    DATABASE_URL_DEFINED: !!process.env.DATABASE_URL,
    DATABASE_URL_LENGTH: process.env.DATABASE_URL?.length || 0,
    NODE_ENV: process.env.NODE_ENV,
    PRISMA_GENERATE_ENV: !!process.env.PRISMA_GENERATE_DATABASES,
  });
}
