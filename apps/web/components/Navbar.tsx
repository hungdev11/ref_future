'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Compass, Moon, Hash, BookOpen, HeartHandshake, ShieldCheck, Cpu, FileText } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-surface/80 border-b border-borderDark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accentGold to-mysticPurple flex items-center justify-center shadow-lg shadow-accentGold/10">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-accentGold via-amber-200 to-white">
              MYSTICOS
            </span>
            <span className="text-[10px] text-gray-400 -mt-1 tracking-widest uppercase">
              Deterministic Analytics
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-300">
          <Link
            href="/astrology"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-surfaceHover transition-colors"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            Chiêm Tinh
          </Link>
          <Link
            href="/tu-vi"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-surfaceHover transition-colors"
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            Tử Vi
          </Link>
          <Link
            href="/numerology"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-surfaceHover transition-colors"
          >
            <Hash className="w-4 h-4 text-emerald-400" />
            Thần Số Học
          </Link>
          <Link
            href="/tarot"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-surfaceHover transition-colors"
          >
            <BookOpen className="w-4 h-4 text-rose-400" />
            Tarot
          </Link>
          <Link
            href="/compatibility"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:text-white hover:bg-surfaceHover transition-colors"
          >
            <HeartHandshake className="w-4 h-4 text-pink-400" />
            Tương Hợp
          </Link>
          <Link
            href="/reading"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accentGold/10 border border-accentGold/30 text-accentGold hover:bg-accentGold/20 transition-colors"
          >
            <FileText className="w-4 h-4 text-accentGold" />
            Báo Cáo Tổng Hợp
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Deterministic (Zero AI)</span>
          </div>
        </div>
      </div>
    </header>
  );
}
