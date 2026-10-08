import React from 'react';
import type { Scenario } from '@mystic/core';

export interface ScenarioBlockProps {
  scenario?: Scenario;
  scenarios?: Scenario[];
  title?: string;
  className?: string;
}

export function ScenarioBlock({
  scenario,
  scenarios,
  title,
  className = '',
}: ScenarioBlockProps) {
  const list = scenarios || (scenario ? [scenario] : []);

  if (list.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
          <span className="text-accentGold">04</span>
          <span className="text-borderLight">/</span>
          <span>{title}</span>
        </div>
      )}

      {list.map((item, idx) => (
        <div
          key={item.scenarioId || idx}
          className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4 rounded-none"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderDark/60 pb-3">
            <span className="font-mono text-xs text-stone tracking-wider uppercase">
              KỊCH BẢN ĐỜI SỐNG 0{idx + 1}
            </span>
            <span className="font-mono text-[10px] text-accentGold uppercase">
              TÌNH HUỐNG ỨNG DỤNG
            </span>
          </div>

          <h4 className="text-lg sm:text-xl font-serif text-parchment font-medium tracking-tight">
            {item.title}
          </h4>

          {/* Trigger & Dynamic */}
          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
                BỐI CẢNH KÍCH HOẠT
              </span>
              <p className="font-sans text-parchment/90 text-sm leading-relaxed">
                {item.trigger}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
                DIỄN BIẾN TÂM LÝ &amp; PHẢN ỨNG TỰ NHIÊN
              </span>
              <p className="font-sans text-parchment/90 text-sm leading-relaxed">
                {item.likelyDynamic}
              </p>
            </div>

            {item.tension && (
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-terracotta block">
                  ĐIỂM NGHẼN CẦN LƯU TÂM
                </span>
                <p className="font-sans text-parchment/90 text-sm leading-relaxed">
                  {item.tension}
                </p>
              </div>
            )}
          </div>

          {/* Constructive Response */}
          <div className="border-l-2 border-accentGold bg-background/50 p-4 space-y-1.5 mt-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-accentGold block">
              PHẢN ỨNG KIẾN TẠO / HƯỚNG XỬ LÝ
            </span>
            <p className="font-sans text-parchment text-sm leading-relaxed font-medium">
              {item.constructiveResponse}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
