import React from 'react';
import type { NextSuggestedQuestion } from '@mystic/core';

export interface NextQuestionBlockProps {
  questions?: Array<NextSuggestedQuestion | {
    question: string;
    context?: string;
    targetDomain?: string;
  }>;
  onSelectQuestion?: (question: NextSuggestedQuestion) => void;
  title?: string;
  className?: string;
}

const DOMAIN_LABEL_VN: Record<string, string> = {
  tuvi: 'Góc nhìn Tử Vi',
  astrology: 'Chiêm Tinh Học',
  tarot: 'Chiêm Nghiệm Tarot',
  numerology: 'Thần Số Học',
  compatibility: 'Độ Tương Hợp',
};

export function NextQuestionBlock({
  questions = [],
  onSelectQuestion,
  title = 'Gợi Ý Khảo Cứu & Đào Sâu Tiếp Theo',
  className = '',
}: NextQuestionBlockProps) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div
      className={`border border-borderDark bg-surface p-6 sm:p-7 space-y-5 rounded-none ${className}`}
    >
      {/* Header */}
      <div className="border-b border-borderDark/60 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
          <span className="text-accentGold">06</span>
          <span className="text-borderLight">/</span>
          <span>DẪN DẮT TỰ NHIÊN</span>
        </div>
        <span className="text-xs font-mono text-stone">
          {questions.length} CÂU HỎI
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-lg sm:text-xl font-serif text-parchment font-medium tracking-tight">
          {title}
        </h4>
        <p className="font-sans text-stone text-xs sm:text-sm">
          Các hướng mở rộng giúp làm sáng tỏ điểm nút của phiên khảo cứu.
        </p>
      </div>

      {/* Questions list */}
      <div className="space-y-2.5 pt-1">
        {questions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectQuestion?.(q as NextSuggestedQuestion)}
            className="w-full text-left border border-borderDark hover:border-accentGold/60 bg-background/50 hover:bg-surfaceHover/80 p-4 transition-colors group flex items-start justify-between gap-4 rounded-none"
          >
            <div className="space-y-1">
              {q.context && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-accentGold block">
                  {q.context}
                </span>
              )}
              <span className="font-serif text-parchment group-hover:text-accentGold text-sm sm:text-base font-normal transition-colors block">
                {q.question}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 pt-1">
              {q.targetDomain && (
                <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider hidden sm:inline-block border border-borderDark px-2 py-0.5">
                  {DOMAIN_LABEL_VN[q.targetDomain.toLowerCase()] || q.targetDomain}
                </span>
              )}
              <span className="font-mono text-accentGold text-sm select-none">
                ➔
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
