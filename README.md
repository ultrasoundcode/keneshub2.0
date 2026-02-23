# Keneshub — AI LegalTech Platform

AI-платформа для решения долговых вопросов и защиты прав заёмщиков в Казахстане.

## Стек технологий

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, Framer Motion
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL
- **AI:** OpenAI GPT-4o-mini
- **Платежи:** Stripe
- **Auth:** JWT, Google OAuth (NextAuth)

## Быстрый старт

```bash
# 1. Установить зависимости
npm install

# 2. Настроить переменные окружения
cp .env.example .env
# Заполните .env своими ключами

# 3. Инициализировать базу данных
npx prisma generate
npx prisma db push

# 4. Запустить dev-сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Структура проекта

```
src/
├── app/
│   ├── (auth)/          # Авторизация (login, register, forgot-password)
│   ├── admin/           # Панель администратора
│   ├── api/             # API routes (auth, ai, stripe)
│   ├── dashboard/       # Дашборд пользователя
│   ├── lawyer/          # Дашборд юриста
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Design system
├── components/
│   └── landing/         # Landing page components
└── lib/
    ├── auth.ts          # JWT, bcrypt utils
    ├── openai.ts        # OpenAI client + system prompt
    ├── prisma.ts        # Prisma client singleton
    ├── stripe.ts        # Stripe client + plans
    └── utils.ts         # Tailwind cn() utility
```

## Переменные окружения

| Переменная | Описание |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for JWT |
| `OPENAI_API_KEY` | OpenAI API key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |

## Deploy

### Vercel
```bash
npx vercel
```

### Docker
```bash
docker build -t keneshub .
docker run -p 3000:3000 --env-file .env keneshub
```

## Лицензия

Proprietary — все права защищены.
