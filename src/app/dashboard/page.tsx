"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FileText,
  Scale,
  Plus,
  ArrowUp,
  BriefcaseBusiness,
  Coins
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const placeholderText = "Опишите вашу долговую ситуацию или задайте вопрос...";

  const handleSend = () => {
    if (query.trim() && !isPlaceholder) {
      router.push(`/dashboard/ai-assistant?q=${encodeURIComponent(query)}`);
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
        <div className="bg-white rounded-[32px] border border-zinc-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)] min-h-[160px] sm:min-h-[220px] relative pb-20 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-shadow overflow-hidden group">
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
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            suppressContentEditableWarning
            className={`w-full bg-transparent outline-none text-lg sm:text-xl px-6 py-6 sm:px-8 sm:py-8 min-h-[120px] max-h-[300px] overflow-y-auto leading-relaxed scrollbar-hide ${
              isPlaceholder ? "text-zinc-400" : "text-zinc-900"
            }`}
          >
            {placeholderText}
          </div>
          <div className="absolute bottom-6 left-0 w-full flex justify-between items-center px-6 sm:px-8 pointer-events-none">
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors pointer-events-auto">
              <Plus className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors pointer-events-auto ${
                query.trim() && !isPlaceholder ? "bg-zinc-900 text-white hover:bg-zinc-800 shadow-lg shadow-zinc-200" : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {[
            { icon: BriefcaseBusiness, label: "Проверить коллекторов" },
            { icon: FileText, label: "Составить жалобу" },
            { icon: Scale, label: "Консультация", hideOnMobile: true },
            { icon: Coins, label: "Реструктуризация" },
          ].map((chip, i) => (
            <button 
              key={i} 
              onClick={() => {
                const q = chip.label;
                router.push(`/dashboard/ai-assistant?q=${encodeURIComponent(q)}`);
              }}
              className={`chip ${chip.hideOnMobile ? "hidden sm:inline-flex" : ""}`}
            >
              <chip.icon className="w-4 h-4 text-zinc-500" />
              {chip.label}
            </button>
          ))}
          <button className="chip">
            Ещё
          </button>
        </div>
      </motion.div>
    </div>
  );
}
