"use client";

import { motion } from "framer-motion";
import { Users, UserCheck, CreditCard, Activity, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
  { label: "Всего пользователей", value: "1,247", icon: Users, change: "+12%", up: true },
  { label: "Юристов", value: "23", icon: UserCheck, change: "+3", up: true },
  { label: "Активных подписок", value: "342", icon: CreditCard, change: "+8%", up: true },
  { label: "Выручка (мес)", value: "3.2M ₸", icon: TrendingUp, change: "+15%", up: true },
];

const recentUsers = [
  { name: "Алексей Морозов", email: "alex@mail.kz", plan: "Pro", date: "Сегодня" },
  { name: "Сауле Камзаева", email: "saule@gmail.com", plan: "Free", date: "Вчера" },
  { name: "Бауыржан Ахметов", email: "baur@mail.kz", plan: "Business", date: "2 дня назад" },
  { name: "Дана Нурланова", email: "dana@inbox.kz", plan: "Pro", date: "3 дня назад" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-sans font-bold text-gray-900 mb-2">Панель управления</h1>
        <p className="text-gray-500 text-sm">Обзор платформы Keneshub</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <stat.icon className="w-4.5 h-4.5 text-gray-900" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs ${stat.up ? "text-green-400" : "text-red-400"}`}>
                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Последние пользователи</h2>
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">Имя</th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">Email</th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">План</th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-medium">Дата</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-sm text-gray-900">{user.name}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{user.email}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      user.plan === "Pro" ? "bg-gray-100 text-gray-900" :
                      user.plan === "Business" ? "bg-accent-purple/10 text-gray-900" :
                      "bg-gray-100 text-gray-500"
                    }`}>{user.plan}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
