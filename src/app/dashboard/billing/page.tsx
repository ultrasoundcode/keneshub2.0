"use client";

import { motion } from "framer-motion";
import { CreditCard, Check, Star, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const currentPlan = "FREE";

const plans = [
  { key: "FREE", name: "Бесплатный", price: "0 ₸", period: "", features: ["20 AI-запросов/мес", "Базовый анализ", "Проверка законности"] },
  { key: "PRO", name: "Профессионал", price: "4 990 ₸", period: "/мес", features: ["200 AI-запросов/мес", "Генерация документов", "Анализ договоров", "Запись к юристу", "Приоритетная поддержка"], popular: true },
  { key: "BUSINESS", name: "Бизнес", price: "14 990 ₸", period: "/мес", features: ["Безлимитные AI-запросы", "Множественные кейсы", "Персональный менеджер", "API доступ"] },
];

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-sans font-bold text-gray-900">Оплата и подписка</h1>
        <p className="text-sm text-gray-400">Управление вашим тарифным планом</p>
      </motion.div>

      {/* Current plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5 border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium">Текущий план: Бесплатный</p>
              <p className="text-xs text-gray-400">14 из 20 AI-запросов использовано</p>
            </div>
          </div>
          <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div className="w-[70%] h-full bg-gray-900 text-white rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className={`relative bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-6 flex flex-col transition-all duration-300 ${
              plan.popular ? "border border-accent-purple/30 " : "hover:shadow-md hover:border-gray-300 transition-shadow"
            } ${currentPlan === plan.key ? "ring-1 ring-accent-blue/30" : ""}`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gray-900 text-white text-gray-900 text-xs font-medium flex items-center gap-1">
                <Star className="w-3 h-3" fill="currentColor" />
                Популярный
              </span>
            )}
            <p className="text-xs text-gray-500 mb-1">{plan.name}</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
              {plan.price}<span className="text-sm text-gray-400">{plan.period}</span>
            </p>
            <ul className="space-y-2 flex-1 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-300">
                  <Check className="w-3.5 h-3.5 text-gray-900" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-full text-sm font-medium transition-all ${
              currentPlan === plan.key
                ? "bg-gray-100 text-gray-500 cursor-default"
                : plan.popular
                  ? "btn-primary"
                  : "btn-secondary"
            }`}>
              {currentPlan === plan.key ? "Текущий план" : "Выбрать"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
