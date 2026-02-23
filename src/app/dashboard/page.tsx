"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Scale,
  Plus,
  ArrowUp,
  BriefcaseBusiness,
  Coins
} from "lucide-react";

export default function DashboardPage() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl sm:text-5xl lg:text-[64px] font-serif text-zinc-900 mb-8 sm:mb-12 text-center leading-[1.1] tracking-tight"
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
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] min-h-[160px] sm:min-h-[220px] relative pb-20 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-shadow">
          <textarea 
            ref={textareaRef}
            onChange={handleInput}
            rows={1}
            placeholder="Опишите вашу долговую ситуацию или задайте вопрос..."
            className="w-full bg-transparent resize-none outline-none text-zinc-900 placeholder:text-zinc-400 text-lg sm:text-xl px-6 py-6 sm:px-8 sm:py-8 max-h-[300px] overflow-y-auto"
          />
          <div className="absolute bottom-6 left-0 w-full flex justify-between items-center px-6 sm:px-8">
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-300 transition-colors">
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          <button className="chip">
            <BriefcaseBusiness className="w-4 h-4 text-zinc-500" />
            Проверить коллекторов
          </button>
          <button className="chip">
            <FileText className="w-4 h-4 text-zinc-500" />
            Составить жалобу
          </button>
          <button className="chip hidden sm:inline-flex">
            <Scale className="w-4 h-4 text-zinc-500" />
            Консультация
          </button>
          <button className="chip">
            <Coins className="w-4 h-4 text-zinc-500" />
            Реструктуризация
          </button>
          <button className="chip">
            Ещё
          </button>
        </div>
      </motion.div>
    </div>
  );
}
