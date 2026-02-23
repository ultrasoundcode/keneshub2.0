"use client";

import Link from "next/link";
import { Shield, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Shield className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" strokeWidth={2} />
          </div>
          <span className="text-xl md:text-[22px] font-bold font-serif text-zinc-900 tracking-tight leading-none mt-0.5 md:mt-1">
            keneshub
          </span>
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-primary">
            Войти
          </Link>
          <Link href="/register" className="btn-secondary hidden sm:inline-flex">
            Зарегистрироваться
          </Link>
          <button className="md:hidden text-zinc-900 p-2 ml-1">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
