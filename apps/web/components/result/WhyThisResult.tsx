'use client';

import React, { useState } from 'react';
import type { MysticosResult } from '@mystic/core';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WhyPanel } from '../WhyPanel';

export function WhyThisResult({ rawResult }: { rawResult: MysticosResult }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="border-t border-borderDark pt-8 space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-4 bg-surface border border-borderDark hover:border-accentGold/50 transition-colors text-left"
      >
        <div className="space-y-1">
          <div className="text-sm font-serif text-parchment flex items-center gap-2">
            <span className="text-accentGold">✦</span>
            <span>Vì sao tôi nhận được kết quả này?</span>
          </div>
          <p className="text-xs text-stone">
            Khám phá chuỗi lập luận logic, các quy tắc tất định và nguồn gốc thư tịch cổ.
          </p>
        </div>
        <div className="text-stone">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="pt-2 animate-in fade-in duration-200">
          <WhyPanel result={rawResult} />
        </div>
      )}
    </section>
  );
}
