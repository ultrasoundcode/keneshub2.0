"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Landmark, Phone, AlertTriangle, Scale, FileWarning } from "lucide-react";

const problems = [
  {
    icon: Landmark,
    category: "БВУ (Банки)",
    title: "Работа с банками",
    items: [
      "Реструктуризация кредита",
      "Оспаривание незаконных комиссий",
      "Защита от одностороннего изменения условий",
      "Заявление на рефинансирование",
    ],
    color: "blue",
  },
  {
    icon: Building2,
    category: "МФО",
    title: "Микрофинансовые организации",
    items: [
      "Снижение процентной ставки",
      "Остановка незаконного начисления",
      "Проверка лицензии МФО",
      "Составление претензии",
    ],
    color: "purple",
  },
  {
    icon: Phone,
    category: "Коллекторы",
    title: "Коллекторские агентства",
    items: [
      "Защита от незаконных методов взыскания",
      "Жалоба в АРРФР",
      "Ограничение звонков и контактов",
      "Запрос на проверку задолженности",
    ],
    color: "cyan",
  },
];

const colorMap = {
  blue: { bg: "bg-gray-100", text: "text-gray-900", border: "border-gray-200", glow: "group-hover:shadow-accent-blue/10" },
  purple: { bg: "bg-accent-purple/10", text: "text-gray-900", border: "border-accent-purple/20", glow: "group-hover:shadow-accent-purple/10" },
  cyan: { bg: "bg-accent-cyan/10", text: "text-gray-900", border: "border-accent-cyan/20", glow: "group-hover:shadow-accent-cyan/10" },
};

export default function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-gray-900 font-medium tracking-wider uppercase">
            Какие проблемы решаем
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4 mb-6 tracking-tight">
            Защита ваших <span className="italic text-gray-900">прав</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            Работаем со всеми типами кредиторов в Казахстане
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => {
            const colors = colorMap[problem.color as keyof typeof colorMap];
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 * i }}
                className={`group bg-white border border-gray-200 shadow-sm rounded-3xl p-8 hover:shadow-md hover:border-gray-300 transition-shadow transition-all duration-500 group-hover:shadow-2xl ${colors.glow}`}
              >
                {/* Category badge */}
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border mb-6`}>
                  <problem.icon className="w-3.5 h-3.5" />
                  {problem.category}
                </span>

                <h3 className="text-xl font-semibold text-gray-900 mb-5">{problem.title}</h3>

                <ul className="space-y-3">
                  {problem.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Scale className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                      <span className="text-gray-500 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 bg-white border border-gray-200 shadow-sm rounded-3xl p-6 flex flex-col md:flex-row items-center gap-4 border border-amber-500/10"
        >
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-gray-500 text-center md:text-left">
            <span className="text-amber-400 font-medium">Важно:</span>{" "}
            Незаконные действия коллекторов (угрозы, звонки на работу, контакт с родственниками)
            являются нарушением Закона РК. Мы поможем составить жалобу и защитить ваши права.
          </p>
          <FileWarning className="w-5 h-5 text-amber-400 flex-shrink-0 hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
}
