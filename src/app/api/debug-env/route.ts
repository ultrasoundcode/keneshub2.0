import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  let prismaStatus = "not-tested";
  let userCount = 0;
  let prismaError = null;

  try {
    userCount = await prisma.user.count();
    prismaStatus = "success";
  } catch (err: any) {
    prismaStatus = "error";
    prismaError = err.message || JSON.stringify(err);
  }

  return NextResponse.json({
    DATABASE_URL_DEFINED: !!process.env.DATABASE_URL,
    DATABASE_URL_VAL: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.slice(0, 15)}...${process.env.DATABASE_URL.slice(-5)}` : "missing",
    PRISMA_STATUS: prismaStatus,
    USER_COUNT: userCount,
    PRISMA_ERROR: prismaError,
    NODE_ENV: process.env.NODE_ENV,
  });
}
