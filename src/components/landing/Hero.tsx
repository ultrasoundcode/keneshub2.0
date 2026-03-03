"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Plus, ArrowUp, BriefcaseBusiness, FileText, Scale, Coins } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const placeholderText = "Опишите вашу долговую ситуацию или задайте вопрос...";

  const handleSend = () => {
    if (query.trim() && query !== placeholderText) {
      router.push(`/register?query=${encodeURIComponent(query)}`);
    } else {
      router.push("/register");
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
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] min-h-[140px] md:min-h-[180px] relative pb-16 transition-all duration-300 focus-within:shadow-[0_8px_48px_rgba(0,0,0,0.08)] focus-within:border-zinc-300 overflow-hidden group">
          <div 
            contentEditable
            onInput={(e) => {
              setQuery(e.currentTarget.innerText);
            }}
            onFocus={(e) => {
              if (isPlaceholder) {
                e.currentTarget.innerText = "";
                setIsPlaceholder(false);
              }
            }}
            onBlur={(e) => {
              if (e.currentTarget.innerText.trim() === "") {
                e.currentTarget.innerText = placeholderText;
                setIsPlaceholder(true);
              }
            }}
            suppressContentEditableWarning
            className={`w-full bg-transparent outline-none text-xl px-8 pt-8 pb-4 md:px-12 md:pt-10 md:pb-6 min-h-[120px] max-h-[400px] overflow-y-auto leading-relaxed scrollbar-hide ${
              isPlaceholder ? "text-zinc-400" : "text-zinc-900"
            }`}
          >
            {placeholderText}
          </div>
          <div className="absolute bottom-5 left-0 w-full flex justify-between items-center px-6 md:px-10 pointer-events-none">
            <div className="flex gap-2 pointer-events-auto">
              <button className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
              {/* WhatsApp Registration Fallback */}
              <Link 
                href="https://wa.me/77000000000?text=Здравствуйте%2C%20мне%20нужна%20помощь%20с%20долгами." 
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 text-sm text-zinc-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                WhatsApp
              </Link>
            </div>
            <button 
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-200 pointer-events-auto"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
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
