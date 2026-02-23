import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken } from "@/lib/auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // In production, find user via Prisma
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user || !user.password) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    // const isValid = await verifyPassword(password, user.password);
    // if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = generateToken({ email, role: "USER" });

    const response = NextResponse.json(
      { success: true, user: { email, role: "USER" } },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Ошибка при авторизации" },
      { status: 500 }
    );
  }
}
