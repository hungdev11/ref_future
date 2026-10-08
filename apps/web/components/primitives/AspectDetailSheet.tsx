'use client';

import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';

export interface AspectDetail {
  title: string;
  planetA: string;
  planetB: string;
  aspectType: string;
  orb?: string;
  whyImportant: string;
  manifestation?: string;
  constructiveExpression?: string;
  tension?: string;
}

export interface AspectDetailSheetProps {
  isOpen: boolean;
  aspect: AspectDetail | null;
  onClose: () => void;
  onOpenWhy?: () => void;
}

export function AspectDetailSheet({
  isOpen,
  aspect,
  onClose,
  onOpenWhy,
}: AspectDetailSheetProps) {
  if (!isOpen || !aspect) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết góc hợp ${aspect.title}`}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
    >
      <div
        className="w-full sm:max-w-md h-[85vh] sm:h-full bg-surface border-t sm:border-l border-borderDark p-6 sm:p-7 flex flex-col justify-between overflow-y-auto shadow-2xl space-y-6"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-borderDark pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-accentGold uppercase tracking-widest block">
                GÓC CHIẾU CHIÊM TINH HỌC
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accentGold" />
                <span>{aspect.title}</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng bảng chi tiết"
              className="p-1.5 text-stone hover:text-parchment border border-borderDark hover:border-accentGold transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dữ liệu góc chiếu */}
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-background/50 p-3.5 border border-borderDark">
            <div>
              <span className="text-stone block text-[10px] uppercase">Loại Góc Hợp:</span>
              <span className="text-accentGold font-bold">{aspect.aspectType}</span>
            </div>
            {aspect.orb && (
              <div>
                <span className="text-stone block text-[10px] uppercase">Độ Lệch (Orb):</span>
                <span className="text-parchment">{aspect.orb}</span>
              </div>
            )}
          </div>

          {/* Vì sao quan trọng */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              VÌ SAO GÓC CHIẾU NÀY QUAN TRỌNG?
            </span>
            <p className="font-serif text-sm text-parchment leading-relaxed">
              {aspect.whyImportant}
            </p>
          </div>

          {/* Cách thức biểu hiện */}
          {aspect.manifestation && (
            <div className="space-y-2 bg-background/40 p-4 border border-borderDark">
              <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
                CÁCH THỨC BIỂU HIỆN NGOÀI ĐỜI
              </span>
              <p className="text-xs text-stone font-sans leading-relaxed">
                {aspect.manifestation}
              </p>
            </div>
          )}

          {/* Biểu hiện tích cực vs Điểm nghẽn */}
          {(aspect.constructiveExpression || aspect.tension) && (
            <div className="space-y-3 pt-1">
              {aspect.constructiveExpression && (
                <div className="p-3.5 border border-accentGold/30 bg-accentGold/5 space-y-1">
                  <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
                    BIỂU HIỆN TÍCH CỰC (CONSTRUCTIVE)
                  </span>
                  <p className="text-xs text-parchment leading-relaxed">
                    {aspect.constructiveExpression}
                  </p>
                </div>
              )}
              {aspect.tension && (
                <div className="p-3.5 border border-terracotta/30 bg-terracotta/5 space-y-1">
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block">
                    ĐIỂM NGHẼN CẦN LƯU Ý (TENSION)
                  </span>
                  <p className="text-xs text-parchment leading-relaxed">
                    {aspect.tension}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="border-t border-borderDark pt-4 flex items-center justify-between gap-3">
          {onOpenWhy && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWhy();
              }}
              className="text-xs font-mono text-accentGold hover:underline flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Xem cơ sở chuyên môn</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-borderDark text-stone text-xs font-mono uppercase tracking-wider hover:text-parchment hover:border-accentGold transition-colors ml-auto"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
