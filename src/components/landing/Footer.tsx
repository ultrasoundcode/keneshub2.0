"use client";

import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";

const footerLinks = {
  Платформа: [
    { label: "Возможности", href: "#features" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Блог", href: "/blog" },
  ],
  Юридическое: [
    { label: "Работа с банками", href: "#" },
    { label: "Автоматизация", href: "#" },
    { label: "Реструктуризация", href: "#" },
  ],
  Ресурсы: [
    { label: "Документация", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "API", href: "#" },
  ],
  Компания: [
    { label: "О нас", href: "/about" },
    { label: "Карьера", href: "#" },
    { label: "Условия", href: "/terms" },
    { label: "Приватность", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-[#a1a1aa] py-16 px-6 md:px-12 border-t border-[#27272a]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-24">
          
          {/* Left Side: Big Slogan */}
          <div className="mb-16 lg:mb-0 lg:max-w-md xl:max-w-lg">
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-serif italic text-[#f4f4f5] leading-[1.1] tracking-tight">
              Меньше долгов,<br />
              больше свободы.
            </h2>
          </div>

          {/* Right Side: Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 lg:gap-16">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[15px] font-semibold text-[#f4f4f5] mb-5">{title}</h4>
                <ul className="space-y-3.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Socials & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#27272a]/80 gap-6">
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#f4f4f5] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-[#f4f4f5] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.196 3L14.73 11.238L22 21H16.32L11.874 15.111L6.791 21H2.404L9.27 12.222L2.404 3H8.225L12.25 8.35L16.897 3H21.196ZM17.1 19.281H19.5L7.4 4.636H4.856L17.1 19.281Z"/>
              </svg>
            </a>
            <a href="#" className="text-[#f4f4f5] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            <a href="#" className="text-[#f4f4f5] hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[14px] font-medium text-[#f4f4f5] hover:text-white transition-colors border border-[#404040] hover:border-[#71717a] rounded-lg px-3 py-1.5 bg-transparent">
              <Globe className="w-4 h-4" />
              English
              <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
            </button>
            <span className="text-[13px] text-[#71717a]">
              from <span className="text-[#f4f4f5] font-semibold">Keneshub</span> © {new Date().getFullYear()}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
