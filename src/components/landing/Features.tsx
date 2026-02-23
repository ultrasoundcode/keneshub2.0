"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  FileSearch,
  MessageSquareText,
  ShieldCheck,
  FileOutput,
  BarChart3,
  Scale,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-анализ долга",
    description: "Интеллектуальный анализ вашей долговой ситуации с оценкой рисков и рекомендациями",
  },
  {
    icon: ShieldCheck,
    title: "Проверка законности",
    description: "Автоматическая проверка действий кредиторов на соответствие законодательству РК",
  },
  {
    icon: MessageSquareText,
    title: "AI-ассистент",
    description: "Чат с AI-юристом, который отвечает на ваши вопросы 24/7 на основе актуальных законов",
  },
  {
    icon: FileOutput,
    title: "Генерация документов",
    description: "Автоматическое составление заявлений, претензий и жалоб по шаблонам",
  },
  {
    icon: FileSearch,
    title: "Анализ договоров",
    description: "Загрузите договор — AI найдёт спорные пункты и нарушения ваших прав",
  },
  {
    icon: Scale,
    title: "Консультации юристов",
    description: "Запись на онлайн-консультацию к верифицированным юристам Казахстана",
  },
  {
    icon: BarChart3,
    title: "Трекинг кейсов",
    description: "Отслеживайте все ваши долговые дела и прогресс по каждому из них в одном месте",
  },
  {
    icon: Clock,
    title: "Реструктуризация",
    description: "AI помогает составить план реструктуризации и подготовить заявление в банк или МФО",
  },
];

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
            Возможности
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
            Всё для <span className="italic text-gray-900">защиты</span> ваших прав
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Полный набор инструментов для анализа и решения долговых вопросов
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className="group bg-white border border-gray-200 shadow-sm rounded-3xl p-6 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-accent-blue/20 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-gray-900" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
