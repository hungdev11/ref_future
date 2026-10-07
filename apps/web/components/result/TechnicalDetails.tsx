'use client';

import React, { useState } from 'react';
import type { MysticosResult } from '@mystic/core';

export function TechnicalDetails({ rawResult }: { rawResult: MysticosResult }) {
  const [isOpen, setIsOpen] = useState(false);
  const facts = rawResult.facts || [];

  return (
    <section className="border-t border-borderDark/60 pt-6 space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-xs font-mono text-stone hover:text-parchment flex items-center gap-1.5 transition-colors uppercase tracking-wider"
      >
        <span>{isOpen ? '[-]' : '[+]'}</span>
        <span>Chi Tiết Kỹ Thuật & Tọa Độ Gốc ({facts.length} Dữ Kiện)</span>
      </button>

      {isOpen && (
        <div className="bg-surface/30 border border-borderDark p-4 space-y-3 text-xs font-mono animate-in fade-in duration-200">
          <div className="text-stone border-b border-borderDark pb-2 flex justify-between">
            <span>Engine: {rawResult.metadata?.engineVersion}</span>
            <span>Rules: {rawResult.metadata?.rulesVersion}</span>
            <span>Time: {rawResult.technical?.calculationTimeMs}ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone">
            {facts.map((fact, idx) => (
              <div key={idx} className="truncate">
                <span className="text-accentGold/80">{fact.key}:</span>{' '}
                <span className="text-parchment">{String(fact.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
