'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export interface ResultFooterProps {
  topic: string;
  exploreLinks?: { label: string; href: string }[];
  className?: string;
}

export function ResultFooter({
  topic,
  exploreLinks = [],
  className = '',
}: ResultFooterProps) {
  return (
    <footer
      aria-label="Khám Phá Tiếp Theo"
      className={`border-t border-borderDark pt-8 pb-4 space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone font-mono">
          <Compass className="w-4 h-4 text-accentGold shrink-0" />
          <span>Bạn vừa xem:</span>
          <span className="text-parchment font-medium">{topic}</span>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-stone hover:text-accentGold font-mono text-[11px] transition-colors self-start sm:self-auto"
        >
          ↑ Quay lại đầu trang
        </button>
      </div>

      {exploreLinks.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="font-mono text-[11px] text-stone uppercase tracking-wider block">
            Khám phá tiếp
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {exploreLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="p-3 bg-surface border border-borderDark hover:border-accentGold transition-colors text-xs flex items-center justify-between group"
              >
                <span className="text-parchment group-hover:text-accentGold transition-colors">
                  {link.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone group-hover:text-accentGold group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}
