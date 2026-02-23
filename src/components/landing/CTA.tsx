"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white border border-gray-200 shadow-sm rounded-3xl p-12 md:p-16 relative overflow-hidden"
        >
          {/* Background glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm rounded-3xl mb-6">
              <Sparkles className="w-4 h-4 text-gray-900" />
              <span className="text-sm text-gray-600">Начните прямо сейчас</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight leading-tight">
              Готовы защитить свои права?
            </h2>

            <p className="text-gray-500 text-lg max-w-xl mx-auto mb-10">
              Присоединяйтесь к тысячам граждан Казахстана, которые уже используют Keneshub
              для решения долговых вопросов
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary text-base !py-3.5 !px-8 flex items-center gap-2">
                Начать бесплатно
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#pricing" className="btn-secondary text-base !py-3.5 !px-8">
                Посмотреть тарифы
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
