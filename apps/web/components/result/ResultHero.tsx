import React from 'react';
import type { UserFacingResult } from '../../lib/result-adapter';

export function ResultHero({ result }: { result: UserFacingResult }) {
  return (
    <section className="border-b border-borderDark pb-8 space-y-4">
      <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
        <span className="text-accentGold">{result.domainNumber}</span>
        <span>/</span>
        <span>{result.domainTitle}</span>
        <span>/</span>
        <span className="text-stone">{result.school}</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal leading-[1.25] tracking-tight">
          {result.headline}
        </h1>
        <p className="text-base sm:text-lg text-stone max-w-2xl leading-relaxed font-normal">
          {result.summary}
        </p>
      </div>
    </section>
  );
}
