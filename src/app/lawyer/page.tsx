"use client";

import { motion } from "framer-motion";
import { Users, Calendar, DollarSign, TrendingUp, Star, Clock, ChevronRight } from "lucide-react";

const stats = [
  { label: "Активных клиентов", value: "12", icon: Users, trend: "+3 за месяц" },
  { label: "Консультаций", value: "8", icon: Calendar, trend: "На этой неделе" },
  { label: "Заработок", value: "340 000 ₸", icon: DollarSign, trend: "Февраль 2026" },
  { label: "Рейтинг", value: "4.9", icon: Star, trend: "128 отзывов" },
];

const pendingRequests = [
  { client: "Алексей М.", issue: "Долг в БВУ — 2,500,000 ₸", time: "1 час назад", urgent: true },
  { client: "Сауле К.", issue: "Коллекторы МФО", time: "3 часа назад", urgent: false },
  { client: "Бауыржан А.", issue: "Реструктуризация кредита", time: "Вчера", urgent: false },
];

export default function LawyerDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-sans font-bold text-gray-900 mb-2">Кабинет юриста</h1>
        <p className="text-gray-500 text-sm">Управление клиентами и консультациями</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-accent-purple/10 flex items-center justify-center mb-3">
              <stat.icon className="w-4.5 h-4.5 text-gray-900" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
            <p className="text-xs text-gray-600 mt-1">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Новые запросы</h2>
        <div className="space-y-3">
          {pendingRequests.map((req, i) => (
            <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-4 flex items-center gap-4 hover:shadow-md hover:border-gray-300 transition-shadow transition-all cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-gray-900" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900 font-medium">{req.client}</p>
                  {req.urgent && <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs">Срочно</span>}
                </div>
                <p className="text-xs text-gray-400">{req.issue}</p>
              </div>
              <span className="text-xs text-gray-600">{req.time}</span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
