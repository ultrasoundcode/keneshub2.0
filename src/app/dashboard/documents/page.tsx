"use client";

import { motion } from "framer-motion";
import { FileText, Upload, Download, Eye, Plus, File, FileWarning } from "lucide-react";

const documents = [
  { name: "Заявление на реструктуризацию.pdf", type: "Заявление", size: "245 KB", date: "15 фев 2026", status: "Готов" },
  { name: "Кредитный договор Kaspi.pdf", type: "Договор", size: "1.2 MB", date: "10 фев 2026", status: "Проанализирован" },
  { name: "Жалоба в АРРФР.pdf", type: "Жалоба", size: "180 KB", date: "8 фев 2026", status: "Черновик" },
];

const templates = [
  { name: "Заявление на реструктуризацию", icon: FileText },
  { name: "Жалоба на коллекторов", icon: FileWarning },
  { name: "Запрос выписки по кредиту", icon: File },
];

export default function DocumentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-sans font-bold text-gray-900">Документы</h1>
        <p className="text-sm text-gray-400">Загрузка договоров и генерация документов</p>
      </motion.div>

      {/* Upload zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 border-2 border-dashed border-gray-300 hover:border-accent-blue/30 transition-colors text-center cursor-pointer"
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
        <p className="text-sm text-gray-500 mb-1">Перетащите файл или нажмите для загрузки</p>
        <p className="text-xs text-gray-600">PDF, DOC, DOCX до 10 MB</p>
      </motion.div>

      {/* Templates */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Шаблоны документов</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {templates.map((tmpl) => (
            <button key={tmpl.name} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300 text-left group">
              <tmpl.icon className="w-6 h-6 text-gray-500 mb-4 group-hover:text-gray-900 transition-colors" />
              <p className="text-sm text-gray-900 font-medium leading-snug pr-2">{tmpl.name}</p>
              <p className="text-xs text-gray-400 mt-1">Создать с AI</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Documents list */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Мои документы</h2>
        <div className="space-y-3">
          {documents.map((doc, i) => (
            <div key={i} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-300">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-900" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{doc.type} · {doc.size} · {doc.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4 pl-14 sm:pl-0 mt-2 sm:mt-0">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  doc.status === "Готов" ? "bg-green-500/10 text-green-600" :
                  doc.status === "Проанализирован" ? "bg-gray-100 text-gray-900" :
                  "bg-amber-500/10 text-amber-600"
                }`}>
                  {doc.status}
                </span>
                <div className="flex gap-1.5 ml-auto sm:ml-0 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all" title="Смотреть">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all" title="Скачать">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
