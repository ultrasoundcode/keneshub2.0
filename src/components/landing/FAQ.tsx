"use client";

import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Что такое Keneshub?",
    a: "Keneshub — это AI-платформа, которая помогает гражданам Казахстана разобраться с долговыми вопросами. Наш AI анализирует вашу ситуацию, проверяет законность действий кредиторов и помогает подготовить необходимые документы.",
  },
  {
    q: "Keneshub гарантирует списание долга?",
    a: "Нет, мы не обещаем и не гарантируем списание долга. Наша задача — помочь вам понять свои права, выявить возможные нарушения со стороны кредиторов и найти законный путь к решению ситуации: реструктуризация, рефинансирование или защита от незаконных действий.",
  },
  {
    q: "Как AI анализирует мою ситуацию?",
    a: "AI изучает вашу информацию о задолженности, тип кредитора и обстоятельства. Затем анализирует ситуацию на основе действующего законодательства РК, оценивает риски и предлагает конкретные шаги. При необходимости рекомендует консультацию с юристом.",
  },
  {
    q: "Безопасно ли предоставлять свои данные?",
    a: "Да. Мы используем шифрование данных, безопасное хранение и строго соблюдаем Закон РК «О персональных данных и их защите». Ваша информация не передаётся третьим лицам без вашего согласия.",
  },
  {
    q: "Кто юристы на платформе?",
    a: "Все юристы проходят верификацию — мы проверяем лицензию, квалификацию и опыт работы. На платформе представлены юристы, специализирующиеся на банковском, кредитном и коллекторском праве Казахстана.",
  },
  {
    q: "Могу ли я отменить подписку?",
    a: "Да, вы можете отменить подписку в любой момент из настроек аккаунта. После отмены вы продолжите пользоваться платными функциями до конца оплаченного периода.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
            Частые <span className="italic text-gray-900">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full bg-white border border-gray-200 shadow-sm rounded-3xl rounded-xl p-5 flex items-center justify-between gap-4 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300 text-left"
              >
                <span className="text-gray-900 font-medium text-sm md:text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 py-4 text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
