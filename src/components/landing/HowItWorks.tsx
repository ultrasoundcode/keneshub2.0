"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Brain, FileText, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Опишите ситуацию",
    description:
      "Расскажите AI о вашей задолженности — сумму, тип кредитора, действия коллекторов. Загрузите договор для детального анализа.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI анализирует",
    description:
      "Наш AI анализирует ситуацию на основе законодательства РК, оценивает риски и находит возможные нарушения со стороны кредитора.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Получите решение",
    description:
      "Получите готовые заявления, рекомендации по реструктуризации и при необходимости запишитесь на консультацию к юристу.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
            Как это работает
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
            Три шага к <span className="italic text-gray-900">решению</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Простой и понятный процесс, который поможет вам разобраться с долговой ситуацией
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 * i }}
              className="relative group"
            >
              <div className="bg-white border border-gray-200 shadow-sm rounded-3xl p-8 h-full hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-500">
                {/* Step number */}
                <span className="text-6xl font-sans font-bold text-gray-900/[0.03] absolute top-4 right-6">
                  {item.step}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-accent-blue/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-gray-900" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-20 -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-gray-900/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
