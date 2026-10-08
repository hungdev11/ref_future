'use client';

import React from 'react';
import { X, ExternalLink, HelpCircle } from 'lucide-react';
import { getTarotCardImage } from '../../lib/tarot-images';

export interface CardDetail {
  code: string;
  name: string;
  nameVn: string;
  position: string;
  isReversed: boolean;
  reversedModifier?: string;
  role: string;
  questionContext?: string;
  semantics: string[];
  manifestation?: string;
  tension?: string;
}

export interface CardDetailSheetProps {
  isOpen: boolean;
  card: CardDetail | null;
  onClose: () => void;
  onOpenWhy?: () => void;
}

export function CardDetailSheet({
  isOpen,
  card,
  onClose,
  onOpenWhy,
}: CardDetailSheetProps) {
  if (!isOpen || !card) return null;

  const imageUrl = getTarotCardImage(card.code);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Chi tiết lá bài ${card.nameVn}`}
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
                VỊ TRÍ TRẢI BÀI: {card.position}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium">
                {card.nameVn}
              </h3>
              <p className="text-xs text-stone font-mono">
                {card.name} · {card.isReversed ? 'CHIỀU NGƯỢC' : 'CHIỀU XUÔI'}
              </p>
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

          {/* Hình ảnh và modifier */}
          <div className="flex gap-4 items-start bg-background/50 p-4 border border-borderDark">
            {imageUrl && (
              <div className="w-20 shrink-0 border border-borderDark bg-black overflow-hidden">
                <img
                  src={imageUrl}
                  alt={card.nameVn}
                  className={`w-full h-auto object-cover ${card.isReversed ? 'rotate-180' : ''}`}
                />
              </div>
            )}
            <div className="space-y-2 flex-1">
              <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
                {card.isReversed ? 'BIẾN THỂ CHIỀU NGƯỢC (REVERSED MODIFIER)' : 'Ý NGHĨA TRỰC HỌA TIÊU CHUẨN'}
              </span>
              <p className="font-serif text-sm text-parchment leading-relaxed">
                {card.reversedModifier || card.role}
              </p>
            </div>
          </div>

          {/* Ngữ cảnh câu hỏi */}
          {card.questionContext && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                VAI TRÒ TRONG CÂU HỎI CỦA BẠN
              </span>
              <p className="text-xs text-stone font-sans leading-relaxed bg-background/30 p-3 border border-borderDark">
                &ldquo;{card.questionContext}&rdquo;
              </p>
            </div>
          )}

          {/* Semantic Concepts */}
          {card.semantics.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                NGỮ NGHĨA BIỂU TƯỢNG (KNOWLEDGE BASE)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {card.semantics.map((sem, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono border border-borderDark bg-surface text-stone"
                  >
                    {sem}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cách thức biểu hiện & Điểm nghẽn */}
          {(card.manifestation || card.tension) && (
            <div className="space-y-3 pt-1">
              {card.manifestation && (
                <div className="p-3.5 border border-accentGold/30 bg-accentGold/5 space-y-1">
                  <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
                    BIỂU HIỆN ĐỜI THƯỜNG
                  </span>
                  <p className="text-xs text-parchment leading-relaxed">
                    {card.manifestation}
                  </p>
                </div>
              )}
              {card.tension && (
                <div className="p-3.5 border border-terracotta/30 bg-terracotta/5 space-y-1">
                  <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block">
                    THÁCH THỨC CẦN LƯU TÂM
                  </span>
                  <p className="text-xs text-parchment leading-relaxed">
                    {card.tension}
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
