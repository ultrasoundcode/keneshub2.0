import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;
    
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const { name } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: decoded.email as string },
      data: {
        name: name || undefined,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Ошибка при обновлении настроек" }, { status: 500 });
  }
}
