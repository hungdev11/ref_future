import React from 'react';

export interface TensionItem {
  traitA: string;
  traitB: string;
  dynamics: string;
  resolution: string;
}

export interface TensionBlockProps {
  tension?: TensionItem;
  traitA?: string;
  traitB?: string;
  dynamics?: string;
  resolution?: string;
  title?: string;
  className?: string;
}

function formatTrait(trait: string): string {
  if (!trait) return '';
  if (trait.startsWith('SIG_') || trait.startsWith('PAT_') || trait.includes('_')) {
    const clean = trait.replace(/^SIG_CTX_|^SIG_|^PAT_/i, '').replace(/_/g, ' ').trim();
    const TRAIT_MAP: Record<string, string> = {
      'REASSESSMENT FATIGUE': 'Áp Lực Đánh Giá Lại',
      'RESISTING COLLAPSE': 'Kháng Cự Biến Động Đổ Vỡ',
      'LEAP OF FAITH': 'Bước Nhảy Liều Lĩnh',
      'ANALYTICAL RIGOR': 'Kỷ Luật Phân Tích',
      'INTUITIVE LEAP': 'Trực Giác Bộc Phát',
      'DISCIPLINED ACTION': 'Hành Động Kỷ Luật',
      'FREEDOM SPONTANEITY': 'Tự Do Phóng Khoáng',
      'STABILITY SECURITY': 'Ổn Định An Toàn',
    };
    if (TRAIT_MAP[clean.toUpperCase()]) {
      return TRAIT_MAP[clean.toUpperCase()];
    }
    return clean
      .toLowerCase()
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return trait;
}

export function TensionBlock({
  tension,
  traitA,
  traitB,
  dynamics,
  resolution,
  title = 'Giằng Co Đối Kháng & Hóa Giải',
  className = '',
}: TensionBlockProps) {
  const activeTraitA = tension?.traitA || traitA || '';
  const activeTraitB = tension?.traitB || traitB || '';
  const activeDynamics = tension?.dynamics || dynamics || '';
  const activeResolution = tension?.resolution || resolution || '';

  if (!activeTraitA && !activeTraitB && !activeResolution) {
    return null;
  }

  return (
    <div
      className={`border border-borderDark bg-surface p-6 sm:p-7 space-y-6 rounded-none ${className}`}
    >
      {/* Header */}
      <div className="border-b border-borderDark/60 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span className="text-borderLight">/</span>
          <span>PHÂN CỰC &amp; ĐIỂM CÂN BẰNG</span>
        </div>
        <span className="text-xs font-mono text-terracotta">
          [LỰC ĐỐI KHÁNG]
        </span>
      </div>

      <h4 className="text-lg sm:text-xl font-serif text-parchment font-medium tracking-tight">
        {title}
      </h4>

      {/* Opposing Forces Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
        <div className="border border-borderDark bg-background/50 p-4 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
            CỰC TÍNH A
          </span>
          <p className="font-serif text-parchment text-base font-medium">
            {formatTrait(activeTraitA)}
          </p>
        </div>

        <div className="border border-borderDark bg-background/50 p-4 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
            CỰC TÍNH B
          </span>
          <p className="font-serif text-parchment text-base font-medium">
            {formatTrait(activeTraitB)}
          </p>
        </div>
      </div>

      {/* Underlying Dynamics */}
      {activeDynamics && (
        <div className="space-y-1 pt-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
            DIỄN BIẾN MA SÁT &amp; ÁP LỰC
          </span>
          <p className="font-sans text-parchment/90 text-sm leading-relaxed">
            {activeDynamics}
          </p>
        </div>
      )}

      {/* Balancing Resolution */}
      {activeResolution && (
        <div className="border border-borderLight bg-surfaceHover/50 p-4 sm:p-5 space-y-2 border-t-2 border-t-accentGold">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accentGold block">
            ĐIỂM CÂN BẰNG &amp; PHƯƠNG ÁN HÓA GIẢI
          </span>
          <p className="font-sans text-parchment text-sm leading-relaxed font-medium">
            {activeResolution}
          </p>
        </div>
      )}
    </div>
  );
}
