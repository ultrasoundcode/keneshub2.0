"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, Users, BarChart3, Settings, UserCheck, CreditCard, LogOut, Menu, Activity,
} from "lucide-react";
import { motion } from "framer-motion";

const sidebarLinks = [
  { href: "/admin", label: "Обзор", icon: BarChart3 },
  { href: "/admin/users", label: "Пользователи", icon: Users },
  { href: "/admin/lawyers", label: "Юристы", icon: UserCheck },
  { href: "/admin/subscriptions", label: "Подписки", icon: CreditCard },
  { href: "/admin/analytics", label: "Аналитика", icon: Activity },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-min-h-screen flex bg-[#f9fafb]">
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-200 bg-[#ffffff]">
        <div className="px-6 py-5 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
              <Shield className="w-4 h-4 text-gray-900" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Kenesh<span className="text-gray-900">hub</span></span>
          </Link>
          <span className="mt-2 inline-block px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-xs">Админ</span>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${isActive ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`}>
                <link.icon className="w-4.5 h-4.5" />{link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-gray-200 px-6 py-4 flex items-center bg-white/80 backdrop-blur-lg sticky top-0 z-30">
          <button className="lg:hidden text-gray-500"><Menu className="w-5 h-5" /></button>
          <div className="flex-1" />
          <span className="text-xs text-red-400 bg-white border border-gray-200 shadow-sm rounded-2xl px-3 py-1.5 rounded-full border border-red-500/10">Администратор</span>
        </header>
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
