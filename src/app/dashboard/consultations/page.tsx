"use client";

import { motion } from "framer-motion";
import { UserCheck, Star, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

const lawyers = [
  { name: "Айгуль Сериковна Нурланова", spec: "Банковское, кредитное право", rating: 4.9, reviews: 128, exp: "12 лет", rate: "15 000 ₸/час", available: true },
  { name: "Ержан Болатович Касымов", spec: "Коллекторское право, МФО", rating: 4.8, reviews: 96, exp: "8 лет", rate: "12 000 ₸/час", available: true },
  { name: "Мадина Кайратовна Алиева", spec: "Кредитное, потребительское право", rating: 4.9, reviews: 154, exp: "15 лет", rate: "18 000 ₸/час", available: false },
];

const upcoming = [
  { lawyer: "Ержан Болатович", date: "28 фев 2026", time: "14:00", status: "Подтверждено" },
];

export default function ConsultationsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-sans font-bold text-gray-900">Консультации</h1>
        <p className="text-sm text-gray-400">Запись к верифицированным юристам</p>
      </motion.div>

      {/* Upcoming consultations */}
      {upcoming.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Предстоящие</h2>
          {upcoming.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5 border border-gray-200 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 font-medium">{item.lawyer}</p>
                <p className="text-xs text-gray-400">{item.date} · {item.time}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">{item.status}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Lawyer list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Доступные юристы</h2>
        <div className="space-y-4">
          {lawyers.map((lawyer, i) => (
            <motion.div
              key={lawyer.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <UserCheck className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">{lawyer.name}</h3>
                    <span className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <UserCheck className="w-2.5 h-2.5 text-green-400" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{lawyer.spec}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" fill="currentColor" />
                      {lawyer.rating} ({lawyer.reviews} отзывов)
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lawyer.exp}
                    </span>
                    <span className="text-gray-900 font-medium">{lawyer.rate}</span>
                  </div>
                </div>
                <button
                  disabled={!lawyer.available}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    lawyer.available
                      ? "bg-gray-100 text-gray-900 hover:bg-accent-blue/20"
                      : "bg-gray-100 text-gray-600 cursor-not-allowed"
                  }`}
                >
                  {lawyer.available ? (
                    <>
                      <Calendar className="w-3.5 h-3.5" />
                      Записаться
                    </>
                  ) : (
                    "Нет слотов"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
