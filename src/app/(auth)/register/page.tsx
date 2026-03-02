"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, User, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Что-то пошло не так");
      }

      // Success - redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">
            Kenesh<span className="text-gray-900">hub</span>
          </span>
        </Link>
        <h1 className="text-2xl font-sans font-bold text-gray-900 mb-2">Создать аккаунт</h1>
        <p className="text-sm text-gray-500">Начните защищать свои права</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8">
        {/* Social Auth Buttons */}
        <div className="space-y-3 mb-6">
          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-300">
            <Chrome className="w-5 h-5 text-gray-900" />
            <span className="text-sm text-gray-900 font-medium">Регистрация через Google</span>
          </button>
          
          <Link 
            href="https://wa.me/77000000000?text=Здравствуйте%2C%20я%20хочу%20зарегистрироваться%20в%20Keneshub." 
            target="_blank"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-green-100 bg-green-50/50 hover:bg-green-50 hover:border-green-200 transition-all duration-300"
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">W</span>
            </div>
            <span className="text-sm text-green-800 font-medium">Регистрация через WhatsApp</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">или</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-red-600 text-sm animate-shake">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 font-medium">Имя</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ваше имя"
                style={{ paddingLeft: '3.5rem' }}
                className="w-full pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                style={{ paddingLeft: '3.5rem' }}
                className="w-full pr-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 font-medium">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Минимум 8 символов"
                style={{ paddingLeft: '3.5rem' }}
                className="w-full pr-12 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all shadow-sm"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 font-medium">Подтвердите пароль</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                style={{ paddingLeft: '3.5rem' }}
                className="w-full pr-12 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition-all shadow-sm"
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1 rounded border-gray-300 bg-gray-100 text-gray-900 focus:ring-accent-blue/50" />
            <span className="text-xs text-gray-400">
              Я согласен с{" "}
              <Link href="/terms" className="text-gray-900 hover:underline">условиями использования</Link>
              {" "}и{" "}
              <Link href="/privacy" className="text-gray-900 hover:underline">политикой конфиденциальности</Link>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary !rounded-xl flex items-center justify-center gap-2 !py-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Зарегистрироваться
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-gray-400 mt-6">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-gray-900 hover:text-gray-900/80 font-medium transition-colors">
          Войти
        </Link>
      </p>
    </motion.div>
  );
}
