'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GlobalTermToggle } from './TermTag';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/numerology', label: 'Thần Số Học', code: '01' },
    { href: '/tu-vi', label: 'Tử Vi Đẩu Số', code: '02' },
    { href: '/astrology', label: 'Chiêm Tinh', code: '03' },
    { href: '/tarot', label: 'Bói Bài Tarot', code: '04' },
    { href: '/compatibility', label: 'Độ Tương Hợp', code: '05' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#111110] border-b border-borderDark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 border border-accentGold/60 flex items-center justify-center text-accentGold text-xs font-serif font-bold">
            ✦
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base tracking-[0.2em] uppercase text-parchment group-hover:text-accentGold transition-colors font-semibold">
              MYSTICOS
            </span>
            <span className="text-[10px] text-stone tracking-[0.15em] uppercase -mt-0.5">
              Khảo Cứu Vận Mệnh
            </span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-wide">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-1 flex items-baseline gap-1.5 transition-colors border-b ${
                  isActive
                    ? 'border-accentGold text-parchment font-semibold'
                    : 'border-transparent text-stone hover:text-parchment'
                }`}
              >
                <span className="text-[10px] font-mono text-accentGold/70">{item.code}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right tools*/}
        <div className="flex items-center gap-3">
          <GlobalTermToggle />
        </div>
      </div>
    </header>
  );
}
