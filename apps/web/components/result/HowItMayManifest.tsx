import React from 'react';
import type { UserFacingManifestation } from '../../lib/result-adapter';

export function HowItMayManifest({ manifestations }: { manifestations: UserFacingManifestation[] }) {
  if (!manifestations || manifestations.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="text-xs font-mono uppercase tracking-wider text-stone">
        Điều Này Có Thể Biểu Hiện Trong Thực Tế
      </div>

      <div className="space-y-3">
        {manifestations.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 bg-surface/50 border border-borderDark/60 p-4 text-sm"
          >
            <span className="text-accentGold font-mono text-xs mt-0.5">0{idx + 1}.</span>
            <div className="space-y-1">
              <span className="text-xs font-mono text-stone uppercase block">{item.context}</span>
              <p className="text-parchment leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
