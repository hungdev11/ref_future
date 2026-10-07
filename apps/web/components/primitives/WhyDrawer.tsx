'use client';

import React, { useState } from 'react';
import type { MysticosResult } from '@mystic/core';
import { WhyPanel } from '../WhyPanel';
import { ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export interface WhyDrawerProps {
  result: MysticosResult;
  defaultOpen?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

export function WhyDrawer({
  result,
  defaultOpen = false,
  label = 'Minh Bạch Suy Diễn & Thư Tịch Gốc (Why Panel)',
  description = '100% Deterministic Provenance Trace & S0/S1 Citations',
  className = '',
}: WhyDrawerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-borderDark bg-surface rounded-none ${className}`}>
      {/* Drawer Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="why-drawer-content"
        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-surfaceHover/60 transition-colors focus:outline-none"
      >
        <div className="flex items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-accentGold shrink-0 mt-0.5 sm:mt-0" />
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
              <span className="text-accentGold">TẦNG MINH BẠCH</span>
              <span className="text-borderLight">/</span>
              <span>AUDIT TRAIL</span>
            </div>
            <h4 className="text-base sm:text-lg font-serif text-parchment font-medium tracking-tight">
              {label}
            </h4>
            <p className="font-sans text-stone text-xs">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-stone font-mono text-xs shrink-0">
          <span className="hidden sm:inline uppercase">
            {isOpen ? '[THU GỌN]' : '[MỞ RỘNG]'}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-accentGold" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone" />
          )}
        </div>
      </button>

      {/* Disclosed WhyPanel */}
      {isOpen && (
        <div id="why-drawer-content" className="border-t border-borderDark">
          <WhyPanel result={result} className="border-none p-5 sm:p-7" />
        </div>
      )}
    </div>
  );
}
