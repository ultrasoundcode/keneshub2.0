"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History, MessageSquare, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ChatHistoryItem {
  id: string;
  title: string;
  createdAt: string;
  lastMessage: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/ai/history");
        const data = await res.json();
        if (data.history) {
          setHistory(data.history);
        }
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-sans font-bold text-gray-900 flex items-center gap-2">
          <History className="w-5 h-5" />
          История запросов
        </h1>
        <p className="text-sm text-gray-400">Все ваши диалоги с AI-ассистентом</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm px-6">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-gray-200" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">История пуста</h3>
          <p className="text-sm text-gray-400 mb-8">Задайте свой первый вопрос на главной странице дашборда</p>
          <Link href="/dashboard" className="bg-zinc-900 text-white px-8 py-3 rounded-full hover:bg-zinc-800 transition-all font-medium inline-block">
            Начать чат
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                href={`/dashboard/ai-assistant?id=${item.id}`}
                className="group flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-200 hover:border-zinc-900 transition-all shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-zinc-100 transition-colors">
                    <Clock className="w-5 h-5 text-gray-400 group-hover:text-zinc-900 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-zinc-900 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleDateString()} • {item.lastMessage}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-200 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
