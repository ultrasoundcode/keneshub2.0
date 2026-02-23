"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
            <Shield className="w-5 h-5 text-gray-900" />
          </div>
          <span className="text-xl font-semibold text-gray-900">
            Kenesh<span className="text-gray-900">hub</span>
          </span>
        </Link>
        <h1 className="text-2xl font-sans font-bold text-gray-900 mb-2">Восстановление пароля</h1>
        <p className="text-sm text-gray-500">
          {isSent
            ? "Письмо отправлено на вашу почту"
            : "Введите email для восстановления"}
        </p>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 border border-gray-200">
        {isSent ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Мы отправили инструкции по восстановлению пароля на <span className="text-gray-900 font-medium">{email}</span>
            </p>
            <Link href="/login" className="btn-primary inline-flex items-center gap-2 !py-2.5">
              <ArrowLeft className="w-4 h-4" />
              Вернуться
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-gray-300 text-gray-900 text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent-blue/50 focus:bg-white/[0.05] transition-all"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary !rounded-xl flex items-center justify-center gap-2 !py-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Отправить
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        <Link href="/login" className="text-gray-900 hover:text-gray-900/80 font-medium transition-colors flex items-center justify-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Назад к входу
        </Link>
      </p>
    </motion.div>
  );
}
