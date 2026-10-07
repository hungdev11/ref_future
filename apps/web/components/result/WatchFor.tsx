import React from 'react';
import type { UserFacingTension } from '../../lib/result-adapter';

export function WatchFor({ tensions }: { tensions: UserFacingTension[] }) {
  if (!tensions || tensions.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinnabar">
        <span>⚠</span>
        <span>Điểm Cần Lưu Ý & Cân Bằng</span>
      </div>

      <div className="space-y-3">
        {tensions.map((item, idx) => (
          <div
            key={idx}
            className="bg-surface border-l-2 border-l-cinnabar border border-borderDark p-4 space-y-2 text-sm"
          >
            <div className="text-parchment font-serif font-normal">{item.dynamic}</div>
            <p className="text-xs text-stone leading-relaxed">{item.resolution}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
