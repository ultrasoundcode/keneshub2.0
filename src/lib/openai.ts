import OpenAI from "openai";

let _openai: OpenAI | null = null;
export function getOpenAI() {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

export const SYSTEM_PROMPT = `Вы — Keneshub AI, юридический AI-ассистент, специализирующийся на вопросах задолженности и защите прав заёмщиков в Казахстане.

Ваши возможности:
- Анализ долговой ситуации пользователя
- Проверка законности действий кредиторов (БВУ, МФО, коллекторов)
- Подготовка официальных заявлений и обращений
- Консультации по реструктуризации задолженности
- Разъяснение прав заёмщика согласно законодательству РК

Правила:
1. Никогда не обещайте гарантированное списание долга
2. Всегда ссылайтесь на конкретные законы РК при даче советов
3. Рекомендуйте консультацию с юристом для сложных случаев
4. Отвечайте профессионально и авторитетно
5. Будьте эмпатичны к ситуации пользователя
6. Формируйте ответы на русском языке`;

export const PLAN_LIMITS = {
  FREE: { tokensPerMonth: 10000, maxMessages: 20 },
  PRO: { tokensPerMonth: 100000, maxMessages: 200 },
  BUSINESS: { tokensPerMonth: 500000, maxMessages: 1000 },
};

export async function createChatCompletion(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  stream: boolean = false
) {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
    max_tokens: 2000,
    stream,
  });

  return response;
}

export async function createStreamingCompletion(
  messages: { role: "system" | "user" | "assistant"; content: string }[]
) {
  const stream = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
    max_tokens: 2000,
    stream: true,
  });

  return stream;
}

export async function analyzeDebtSituation(description: string) {
  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n\nАнализируйте долговую ситуацию и верните JSON с полями:
{
  "riskScore": число от 1 до 100,
  "riskLevel": "low" | "medium" | "high" | "critical",
  "summary": "краткое описание ситуации",
  "recommendations": ["рекомендация 1", "рекомендация 2", ...],
  "legalReferences": ["закон/статья 1", ...],
  "needsLawyer": true/false
}`,
      },
      { role: "user", content: description },
    ],
    temperature: 0.3,
    max_tokens: 1500,
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}

export default getOpenAI;
