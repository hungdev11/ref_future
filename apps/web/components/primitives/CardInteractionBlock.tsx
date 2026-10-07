import React from 'react';

export interface EntityStep {
  name: string;
  role?: string;
  tag?: string;
}

export interface EntityInteraction {
  source: string;
  target: string;
  type?: string;
  description: string;
  intensity?: number;
}

export interface CardInteractionBlockProps {
  sequence?: Array<EntityStep | string>;
  interactions?: EntityInteraction[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const INTERACTION_TYPE_VN: Record<string, string> = {
  reinforcement: 'TƯƠNG HỖ',
  tension: 'XUNG ĐỘT',
  contrast: 'TƯƠNG PHẢN',
  amplification: 'KHUẾCH ĐẠI',
  harmonious: 'HÒA HỢP',
};

export function CardInteractionBlock({
  sequence = [],
  interactions = [],
  title = 'Tiến Trình & Mối Tương Tác Giữa Các Thực Thể',
  subtitle = 'CHUỖI LIÊN KẾT ĐỘNG',
  className = '',
}: CardInteractionBlockProps) {
  if (sequence.length === 0 && interactions.length === 0) {
    return null;
  }

  const normalizedSequence: EntityStep[] = sequence.map((item) =>
    typeof item === 'string' ? { name: item } : item
  );

  return (
    <div
      className={`border border-borderDark bg-surface p-6 sm:p-7 space-y-6 rounded-none ${className}`}
    >
      {/* Editorial Header */}
      <div className="border-b border-borderDark/60 pb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
          <span className="text-accentGold">03</span>
          <span className="text-borderLight">/</span>
          <span>{subtitle}</span>
        </div>
        <span className="text-xs font-mono text-stone">
          {normalizedSequence.length} NÚT LIÊN KẾT
        </span>
      </div>

      <h4 className="text-lg sm:text-xl font-serif text-parchment font-medium tracking-tight">
        {title}
      </h4>

      {/* Visual Sequence Flow (A ➔ B ➔ C) */}
      {normalizedSequence.length > 0 && (
        <div className="flex items-center overflow-x-auto py-2 px-1 gap-2 sm:gap-3 scrollbar-thin">
          {normalizedSequence.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="shrink-0 border border-borderLight bg-surfaceHover/60 px-4 py-3 min-w-[130px] sm:min-w-[150px] space-y-1 text-center">
                <span className="font-mono text-[10px] uppercase text-stone tracking-widest block">
                  {step.role || `VỊ TRÍ 0${idx + 1}`}
                </span>
                <span className="font-serif text-parchment font-medium text-sm sm:text-base block tracking-tight">
                  {step.name}
                </span>
                {step.tag && (
                  <span className="font-mono text-[9px] text-accentGold uppercase block">
                    {step.tag}
                  </span>
                )}
              </div>

              {idx < normalizedSequence.length - 1 && (
                <div className="shrink-0 text-accentGold font-mono text-base sm:text-lg select-none px-1">
                  ➔
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Interactions Breakdown */}
      {interactions.length > 0 && (
        <div className="space-y-3 pt-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
            Ý NGHĨA TƯƠNG TÁC QUA LẠI
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interactions.map((inter, idx) => (
              <div
                key={idx}
                className="border border-borderDark bg-background/50 p-4 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono border-b border-borderDark/40 pb-2">
                  <div className="flex items-center gap-1.5 text-parchment">
                    <span>{inter.source}</span>
                    <span className="text-accentGold">➔</span>
                    <span>{inter.target}</span>
                  </div>
                  {inter.type && (
                    <span className="text-[10px] uppercase tracking-wider text-accentGold">
                      [{INTERACTION_TYPE_VN[inter.type.toLowerCase()] || inter.type}]
                    </span>
                  )}
                </div>
                <p className="font-sans text-parchment/90 text-xs sm:text-sm leading-relaxed">
                  {inter.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
