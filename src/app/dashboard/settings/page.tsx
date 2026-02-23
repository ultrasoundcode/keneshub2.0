"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Bell, Shield, Save } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "Пользователь",
    email: "user@example.com",
    notifications: true,
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-sans font-bold text-gray-900">Настройки</h1>
        <p className="text-sm text-gray-400">Управление профилем и настройками</p>
      </motion.div>

      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-6"
      >
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-900" />
          Профиль
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Имя</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2">Email</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-6"
      >
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-900" />
          Безопасность
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Текущий пароль</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2">Новый пароль</label>
            <input
              type="password"
              placeholder="Минимум 8 символов"
              className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-6"
      >
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-900" />
          Уведомления
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-900">Email уведомления</p>
            <p className="text-xs text-gray-400">Получать уведомления о статусе кейсов</p>
          </div>
          <button
            onClick={() => setFormData({ ...formData, notifications: !formData.notifications })}
            className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
              formData.notifications ? "bg-accent-blue" : "bg-gray-200"
            }`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
              formData.notifications ? "left-6" : "left-1"
            }`} />
          </button>
        </div>
      </motion.div>

      {/* Save */}
      <button className="btn-primary flex items-center gap-2">
        <Save className="w-4 h-4" />
        Сохранить изменения
      </button>
    </div>
  );
}
