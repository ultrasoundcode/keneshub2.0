"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { UserCheck, Calendar, Star, ArrowRight } from "lucide-react";

const lawyers = [
  {
    name: "Айгуль Сериковна",
    specialization: "Банковское право",
    rating: 4.9,
    reviews: 128,
    experience: "12 лет опыта",
  },
  {
    name: "Ержан Болатович",
    specialization: "Коллекторское право",
    rating: 4.8,
    reviews: 96,
    experience: "8 лет опыта",
  },
  {
    name: "Мадина Кайратовна",
    specialization: "Кредитное право",
    rating: 4.9,
    reviews: 154,
    experience: "15 лет опыта",
  },
];

export default function LawyerPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
              Юристы
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
              Верифицированные{" "}
              <span className="italic text-gray-900">юристы</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Каждый юрист на платформе проходит проверку лицензии и квалификации.
              Специализация на долговых вопросах и защите прав заёмщиков
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary flex items-center gap-2 justify-center">
                Записаться на консультацию
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Lawyer cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {lawyers.map((lawyer, i) => (
              <motion.div
                key={lawyer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + 0.15 * i }}
                className="bg-white border border-gray-200 shadow-sm rounded-3xl rounded-xl p-5 flex items-center gap-4 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300 group"
              >
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <UserCheck className="w-5 h-5 text-gray-900" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900">{lawyer.name}</h4>
                  <p className="text-xs text-gray-400">{lawyer.specialization} · {lawyer.experience}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                    <span className="text-sm text-gray-900 font-medium">{lawyer.rating}</span>
                    <span className="text-xs text-gray-400">({lawyer.reviews})</span>
                  </div>
                  <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900 hover:bg-accent-blue/20 transition-colors">
                    <Calendar className="w-3 h-3" />
                    Запись
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
