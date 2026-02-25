"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Plus, ArrowUp, BriefcaseBusiness, FileText, Scale, Coins } from "lucide-react";

export default function Hero() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.max(160, Math.min(textareaRef.current.scrollHeight, 500));
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 flex flex-col items-center justify-center min-h-[85vh] px-4 md:px-8">
      
      {/* Meta announcement band equivalent (for Keneshub) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Link 
          href="/register" 
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-medium bg-zinc-200/50 hover:bg-zinc-200 px-4 py-1.5 rounded-full"
        >
          Платформа №1 для решения долговых споров <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl md:text-7xl lg:text-[90px] font-serif text-zinc-900 mb-10 md:mb-16 text-center leading-[1.1] tracking-tight"
      >
        Чем я могу помочь?
      </motion.h1>

      {/* Search/Chat Input Area (Manus style) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] min-h-[180px] md:min-h-[220px] relative pb-20 transition-all duration-300">
          <textarea 
            ref={textareaRef}
            onChange={handleInput}
            rows={1}
            placeholder="Опишите вашу долговую ситуацию или задайте вопрос..."
            className="w-full bg-transparent resize-none outline-none text-zinc-900 placeholder:text-zinc-400 text-xl px-8 pt-6 pb-32 md:px-12 md:pt-8 md:pb-40 min-h-[160px] max-h-[500px] overflow-y-auto leading-relaxed scrollbar-hide"
          />
          <div className="absolute bottom-6 left-0 w-full flex justify-between items-center px-6 md:px-8">
            <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <Link href="/register" className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-300 transition-colors">
              <ArrowUp className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link href="/register" className="chip">
            <BriefcaseBusiness className="w-4 h-4 text-zinc-500" />
            Проверить коллекторов
          </Link>
          <Link href="/register" className="chip">
            <FileText className="w-4 h-4 text-zinc-500" />
            Составить жалобу
          </Link>
          <Link href="/register" className="chip hidden sm:inline-flex">
            <Scale className="w-4 h-4 text-zinc-500" />
            Консультация юриста
          </Link>
          <Link href="/register" className="chip">
            <Coins className="w-4 h-4 text-zinc-500" />
            Реструктуризация
          </Link>
          <Link href="/register" className="chip">
            Больше
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
