import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keneshub — Путь к договорённости начинается здесь",
  description:
    "Keneshub — AI-платформа для решения долговых вопросов в Казахстане. Анализ задолженности, защита прав заёмщиков, консультации юристов.",
  keywords: [
    "долги",
    "юрист",
    "Казахстан",
    "AI",
    "заёмщик",
    "реструктуризация",
    "коллекторы",
    "МФО",
    "банк",
  ],
  openGraph: {
    title: "Keneshub — AI-платформа решения долговых вопросов",
    description:
      "Анализ задолженности, защита прав и консультации юристов для граждан Казахстана.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className="min-min-h-screen bg-[#f9fafb] antialiased">{children}</body>
    </html>
  );
}
