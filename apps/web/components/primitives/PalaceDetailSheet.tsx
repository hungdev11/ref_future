'use client';

import React from 'react';
import { X, Shield, ExternalLink } from 'lucide-react';

export interface PalaceDetail {
  id: string;
  name: string;
  branch?: string;
  role: string;
  stars: string[];
  triadOpposition?: string[];
  interpretation?: string;
}

export interface PalaceDetailSheetProps {
  isOpen: boolean;
  palace: PalaceDetail | null;
  onClose: () => void;
  onOpenWhy?: () => void;
}

export function PalaceDetailSheet({
  isOpen,
  palace,
  onClose,
  onOpenWhy,
}: PalaceDetailSheetProps) {
  if (!isOpen || !palace) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết ${palace.name}`}
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
                KHẢO SÁT CUNG CHỨC
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium flex items-center gap-2">
                <Shield className="w-5 h-5 text-accentGold" />
                <span>Cung {palace.name} {palace.branch ? `(${palace.branch})` : ''}</span>
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

          {/* Vai trò */}
          <div className="space-y-2 bg-background/50 p-4 border border-borderDark">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              VAI TRÒ &amp; CỐT TỦY
            </span>
            <p className="font-serif text-sm text-parchment leading-relaxed">
              {palace.role}
            </p>
          </div>

          {/* Sao tọa thủ */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
              TINH DIỆU TỌA THỦ
            </span>
            <div className="flex flex-wrap gap-2">
              {palace.stars.length > 0 ? (
                palace.stars.map((star, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-serif border border-accentGold/40 bg-accentGold/5 text-parchment"
                  >
                    {star}
                  </span>
                ))
              ) : (
                <span className="text-xs text-stone italic">Cung Vô Chính Diệu (mượn tinh diệu đối cung)</span>
              )}
            </div>
          </div>

          {/* Tam phương xung chiếu */}
          {palace.triadOpposition && palace.triadOpposition.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                TAM PHƯƠNG TỨ CHÍNH HỘI CHIẾU
              </span>
              <div className="grid grid-cols-1 gap-2">
                {palace.triadOpposition.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 border border-borderDark bg-background/30 text-xs text-parchment font-mono flex items-center justify-between"
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Diễn giải cụ thể */}
          {palace.interpretation && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                Ý NGHĨA TRONG LÁ SỐ
              </span>
              <p className="text-xs text-stone font-sans leading-relaxed">
                {palace.interpretation}
              </p>
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
