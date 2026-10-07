import React from 'react';
import type { UserFacingGuidance } from '../../lib/result-adapter';

export function PracticalGuidance({ guidance }: { guidance: UserFacingGuidance[] }) {
  if (!guidance || guidance.length === 0) return null;

  return (
    <section className="space-y-4 border-t border-borderDark pt-8">
      <div className="text-xs font-mono uppercase tracking-wider text-accentGold">
        Gợi Ý Thực Tế & Định Hướng Hành Động
      </div>

      <div className="space-y-4">
        {guidance.map((item, idx) => (
          <div key={idx} className="bg-surface border border-borderDark p-5 space-y-4">
            {item.rationale && (
              <p className="text-xs text-stone italic border-b border-borderDark pb-3">
                &ldquo;{item.rationale}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {item.continueItems && item.continueItems.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-accentGold uppercase">Nên tiếp tục phát huy:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-parchment">
                    {item.continueItems.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {item.adjustOrStopItems && item.adjustOrStopItems.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono text-stone uppercase">Cần điều chỉnh hoặc lưu tâm:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-stone">
                    {item.adjustOrStopItems.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
