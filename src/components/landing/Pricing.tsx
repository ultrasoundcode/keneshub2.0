"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Check, Sparkles, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    nameRu: "Бесплатный",
    price: "0",
    currency: "₸",
    period: "навсегда",
    description: "Для быстрой проверки ситуации",
    features: [
      "20 AI-запросов в месяц",
      "Базовый анализ ситуации",
      "Проверка законности действий",
      "Ограниченная история чатов",
    ],
    cta: "Начать бесплатно",
    popular: false,
    color: "blue",
  },
  {
    name: "Pro",
    nameRu: "Профессионал",
    price: "4 990",
    currency: "₸",
    period: "/мес",
    description: "Полная защита ваших прав",
    features: [
      "200 AI-запросов в месяц",
      "Полный анализ задолженности",
      "Генерация документов",
      "Анализ договоров",
      "Запись к юристу",
      "Приоритетная поддержка",
    ],
    cta: "Выбрать Pro",
    popular: true,
    color: "purple",
  },
  {
    name: "Business",
    nameRu: "Бизнес",
    price: "14 990",
    currency: "₸",
    period: "/мес",
    description: "Для множественных кейсов",
    features: [
      "Неограниченные AI-запросы",
      "Множественные кейсы",
      "Приоритетная юр. поддержка",
      "Персональный менеджер",
      "API доступ",
      "Расширенная аналитика",
    ],
    cta: "Связаться с нами",
    popular: false,
    color: "cyan",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
            Тарифы
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
            Выберите свой <span className="italic text-gray-900">план</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Начните бесплатно. Переходите на Pro, когда будете готовы
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className={`relative group ${plan.popular ? "md:-mt-4 md:mb-[-16px]" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs font-medium shadow-md">
                    <Star className="w-3 h-3" fill="currentColor" />
                    Популярный
                  </span>
                </div>
              )}

              <div className={`bg-white border shadow-sm rounded-3xl p-8 h-full flex flex-col transition-all duration-500 ${
                plan.popular
                  ? "border-gray-900 ring-1 ring-gray-900"
                  : "border-gray-200 hover:shadow-md hover:border-gray-300 transition-shadow"
              }`}>
                <div className="mb-8">
                  <span className="text-sm text-gray-500">{plan.nameRu}</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-lg text-gray-500">{plan.currency}</span>
                    <span className="text-sm text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block text-center py-3 px-4 md:px-8 rounded-full text-sm font-medium transition-all duration-300 ${
                    plan.popular
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
