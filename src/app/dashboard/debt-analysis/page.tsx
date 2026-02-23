"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, AlertTriangle, CheckCircle, FileText, TrendingUp, Plus, ChevronRight } from "lucide-react";

const cases = [
  {
    id: "1",
    title: "Потребительский кредит — Kaspi Bank",
    creditorType: "БВУ",
    totalDebt: "1,200,000 ₸",
    riskScore: 45,
    status: "В процессе",
    date: "15 фев 2026",
  },
  {
    id: "2",
    title: "Микрокредит — 4Finance",
    creditorType: "МФО",
    totalDebt: "500,000 ₸",
    riskScore: 78,
    status: "Открыт",
    date: "10 фев 2026",
  },
];

function getRiskColor(score: number) {
  if (score < 40) return { text: "text-green-400", bg: "bg-green-400" };
  if (score < 70) return { text: "text-amber-400", bg: "bg-amber-400" };
  return { text: "text-red-400", bg: "bg-red-400" };
}

export default function DebtAnalysisPage() {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-xl font-sans font-bold text-gray-900">Анализ долга</h1>
          <p className="text-sm text-gray-400">Управление и анализ ваших долговых дел</p>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новый кейс
        </button>
      </motion.div>

      {/* New case form */}
      {showNewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 border border-gray-200"
        >
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Новый долговой кейс</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Название</label>
              <input className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all" placeholder="Потребительский кредит" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Тип кредитора</label>
              <select className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all">
                <option value="BVU">БВУ (Банк)</option>
                <option value="MFO">МФО</option>
                <option value="COLLECTOR">Коллектор</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Сумма долга (₸)</label>
              <input type="number" className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all" placeholder="1000000" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Название кредитора</label>
              <input className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all" placeholder="Kaspi Bank" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-2">Описание ситуации</label>
            <textarea rows={3} className="w-full py-2.5 px-4 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm focus:outline-none focus:border-accent-blue/50 transition-all resize-none" placeholder="Опишите вашу ситуацию подробнее..." />
          </div>
          <div className="flex gap-3">
            <button className="btn-primary text-sm !py-2.5 !px-5 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Анализировать
            </button>
            <button onClick={() => setShowNewForm(false)} className="btn-secondary text-sm !py-2.5 !px-5">
              Отмена
            </button>
          </div>
        </motion.div>
      )}

      {/* Cases list */}
      <div className="space-y-4">
        {cases.map((caseItem, i) => {
          const riskColor = getRiskColor(caseItem.riskScore);
          return (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white border border-gray-200 shadow-sm rounded-2xl rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{caseItem.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-900 text-xs flex-shrink-0">
                      {caseItem.creditorType}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Долг: <span className="text-gray-900 font-medium">{caseItem.totalDebt}</span></span>
                    <span>Статус: <span className="text-gray-300">{caseItem.status}</span></span>
                    <span>{caseItem.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  {/* Risk score */}
                  <div className="text-center">
                    <div className="relative w-12 h-12">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <circle
                          cx="24" cy="24" r="20" fill="none"
                          stroke={caseItem.riskScore < 40 ? "#4ade80" : caseItem.riskScore < 70 ? "#fbbf24" : "#f87171"}
                          strokeWidth="3"
                          strokeDasharray={`${(caseItem.riskScore / 100) * 126} 126`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${riskColor.text}`}>
                        {caseItem.riskScore}
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 mt-1 block">Риск</span>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
