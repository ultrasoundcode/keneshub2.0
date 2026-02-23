import { NextRequest, NextResponse } from "next/server";
import { hashPassword, generateToken } from "@/lib/auth";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // In production, check for existing user via Prisma
    // const existingUser = await prisma.user.findUnique({ where: { email } });
    // if (existingUser) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const hashedPassword = await hashPassword(password);

    // In production, create user via Prisma
    // const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

    const token = generateToken({ email, name, role: "USER" });

    const response = NextResponse.json(
      { success: true, user: { name, email, role: "USER" } },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Ошибка при регистрации" },
      { status: 500 }
    );
  }
}
