import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;
    
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email as string },
      include: {
        conversations: {
          orderBy: { createdAt: "desc" },
          include: {
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
            }
          }
        }
      }
    });

    if (!user) return NextResponse.json({ conversations: [] });

    const history = user.conversations.map(conv => ({
      id: conv.id,
      title: conv.title || "Диалог",
      createdAt: conv.createdAt,
      lastMessage: conv.messages[0]?.content || "",
    }));

    return NextResponse.json({ history });
  } catch (error) {
    console.error("History fetch error:", error);
    return NextResponse.json({ error: "Ошибка при получении истории" }, { status: 500 });
  }
}
