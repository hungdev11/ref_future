'use client';

import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';

export interface NumberDetail {
  numberValue: number | string;
  nameVn: string;
  nameEn: string;
  role: string;
  calculationMethod: string;
  profileMeaning: string;
}

export interface NumberDetailSheetProps {
  isOpen: boolean;
  numberDetail: NumberDetail | null;
  onClose: () => void;
  onOpenWhy?: () => void;
}

export function NumberDetailSheet({
  isOpen,
  numberDetail,
  onClose,
  onOpenWhy,
}: NumberDetailSheetProps) {
  if (!isOpen || !numberDetail) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết chỉ số ${numberDetail.nameVn}`}
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
                CHỈ SỐ THẦN SỐ HỌC
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accentGold" />
                <span>{numberDetail.nameVn} ({numberDetail.nameEn})</span>
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

          {/* Giá trị con số */}
          <div className="p-5 border border-borderDark bg-background/50 text-center space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              RUNG ĐỘNG SỐ HỌC
            </span>
            <span className="font-serif text-4xl sm:text-5xl text-accentGold font-normal block">
              {String(numberDetail.numberValue)}
            </span>
          </div>

          {/* Vai trò */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              VAI TRÒ TRONG HỒ SƠ
            </span>
            <p className="font-serif text-sm text-parchment leading-relaxed">
              {numberDetail.role}
            </p>
          </div>

          {/* Cách tính */}
          <div className="space-y-2 bg-background/40 p-4 border border-borderDark">
            <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
              CƠ SỞ TÍNH TOÁN
            </span>
            <p className="text-xs text-stone font-mono leading-relaxed">
              {numberDetail.calculationMethod}
            </p>
          </div>

          {/* Ý nghĩa trong profile */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              Ý NGHĨA TRONG TRƯỜNG NĂNG LƯỢNG NÀY
            </span>
            <p className="text-xs text-parchment/90 font-sans leading-relaxed">
              {numberDetail.profileMeaning}
            </p>
          </div>
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
              <span>Xem cơ sở luận giải</span>
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
