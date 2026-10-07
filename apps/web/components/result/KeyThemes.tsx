import React from 'react';
import type { UserFacingTheme } from '../../lib/result-adapter';

export function KeyThemes({ themes }: { themes: UserFacingTheme[] }) {
  if (!themes || themes.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accentGold">
        <span>✦</span>
        <span>Điểm Nổi Bật Đáng Chú Ý</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme, idx) => (
          <div
            key={theme.id || idx}
            className="bg-surface border border-borderDark p-5 space-y-2 relative"
          >
            <div className="text-xs font-mono text-stone">MẪU 0{idx + 1}</div>
            <h3 className="text-base font-serif text-parchment font-normal">
              {theme.title}
            </h3>
            <p className="text-xs text-stone leading-relaxed">
              {theme.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
