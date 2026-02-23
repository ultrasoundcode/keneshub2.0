"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Menu,
  X,
  Bell,
  Sparkles,
  LogOut,
  ChevronDown
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfb]">
      {/* Top Navigation - Manus style */}
      <header className="px-4 md:px-8 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 group cursor-pointer text-zinc-900 hidden sm:flex">
            <span className="font-medium text-[15px]">Keneshub Lite</span>
            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          </div>
        </div>

        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
           {/* Plan Badge */}
           <div className="hidden sm:flex items-center gap-3 bg-zinc-100/80 hover:bg-zinc-200/80 transition-colors px-1.5 py-1.5 rounded-full text-sm">
             <span className="text-zinc-600 font-medium pl-3">Ознакомительный план</span>
             <div className="w-px h-3 bg-zinc-300"></div>
             <Link href="/pricing" className="text-[#06b6d4] font-medium pr-3">Оформить подписку</Link>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors">
            <Bell className="w-4.5 h-4.5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-zinc-50 transition-colors">
            <Sparkles className="w-4.5 h-4.5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center text-sm font-medium cursor-pointer">
            A
          </div>
        </div>
      </header>

      {/* Mobile/Hidden sidebar menu overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-zinc-900/20 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-[300px] z-50 flex flex-col bg-[#fbfbfb] shadow-2xl"
            >
              <div className="px-6 py-6 flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex items-center justify-center">
                    <Shield className="w-6 h-6 text-zinc-900" strokeWidth={2} />
                  </div>
                  <span className="text-xl font-bold font-serif text-zinc-900 tracking-tight leading-none mt-1">
                    keneshub
                  </span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="text-zinc-500 hover:text-zinc-900">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex-1 px-4 space-y-1">
                <Link href="/dashboard" className="block px-4 py-3 rounded-xl text-zinc-900 font-medium bg-zinc-100/80">
                  Новый запрос
                </Link>
                <Link href="/dashboard/history" className="block px-4 py-3 rounded-xl text-zinc-500 font-medium hover:bg-zinc-100/50 transition-colors">
                  История дел
                </Link>
                <Link href="/dashboard/settings" className="block px-4 py-3 rounded-xl text-zinc-500 font-medium hover:bg-zinc-100/50 transition-colors">
                  Настройки
                </Link>
              </nav>

              <div className="p-4 border-t border-zinc-200">
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-zinc-500 font-medium hover:bg-zinc-100/50 transition-colors">
                  <LogOut className="w-4.5 h-4.5" />
                  Выйти
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <main className="flex-1 flex flex-col relative">
        {children}
      </main>
    </div>
  );
}
