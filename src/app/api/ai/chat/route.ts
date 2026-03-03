import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/openai";
import { z } from "zod";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  conversationId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    const decoded = token ? verifyToken(token) : null;
    const userEmail = decoded?.email as string | undefined;

    const body = await req.json();
    const validation = chatSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Некорректный формат сообщений" },
        { status: 400 }
      );
    }

    const { messages, conversationId } = validation.data;
    const lastUserMessage = messages[messages.length - 1].content;

    let currentConversationId = conversationId;

    // Persist to database if logged in
    if (userEmail) {
      const user = await prisma.user.findUnique({ where: { email: userEmail } });
      if (user) {
        if (!currentConversationId) {
          const conv = await prisma.conversation.create({
            data: {
              userId: user.id,
              title: lastUserMessage.slice(0, 50) + "...",
            },
          });
          currentConversationId = conv.id;
        }

        // Save user message
        await prisma.message.create({
          data: {
            conversationId: currentConversationId,
            role: "user",
            content: lastUserMessage,
          },
        });
      }
    }

    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: true,
    });

    const encoder = new TextEncoder();
    let fullAiResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            fullAiResponse += content;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content, conversationId: currentConversationId })}\n\n`)
            );
          }
        }

        // Save AI response to DB at the end
        if (userEmail && currentConversationId) {
           await prisma.message.create({
            data: {
              conversationId: currentConversationId,
              role: "assistant",
              content: fullAiResponse,
            },
          });
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json(
      { error: "Ошибка AI. Попробуйте позже." },
      { status: 500 }
    );
  }
}
