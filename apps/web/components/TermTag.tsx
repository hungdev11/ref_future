'use client';

import React from 'react';
import { useTerminology, TERMINOLOGY_CATALOG } from '../lib/terminology-context';
import { HelpCircle, BookOpen } from 'lucide-react';

interface TermTagProps {
  termKey: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export function TermTag({
  termKey,
  children,
  className = '',
  showIcon = true,
}: TermTagProps) {
  const { explainTermsMode, openTermModal } = useTerminology();
  const term = TERMINOLOGY_CATALOG[termKey.toUpperCase()];

  if (!term) {
    return <span className={className}>{children}</span>;
  }

  const displayText = children || term.name;

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        openTermModal(termKey);
      }}
      title={`Nhấp để xem giải thích: "${term.name}"`}
      className={`inline-flex items-center gap-1 cursor-pointer transition-colors ${
        explainTermsMode
          ? 'underline decoration-dotted decoration-accentGold/80 text-parchment hover:text-accentGold'
          : 'text-inherit hover:underline'
      } ${className}`}
    >
      <span>{displayText}</span>
      {explainTermsMode && showIcon && (
        <span className="inline-flex items-center text-[10px] font-mono text-accentGold px-1 py-0.2 bg-background border border-accentGold/40 leading-none">
          ?
        </span>
      )}
    </span>
  );
}

export function GlobalTermToggle() {
  const { explainTermsMode, toggleExplainTermsMode } = useTerminology();

  return (
    <button
      type="button"
      onClick={toggleExplainTermsMode}
      title="Bật/Tắt chế độ chú giải thuật ngữ chi tiết trên toàn hệ thống"
      className={`px-2.5 py-1 text-[11px] font-mono border transition-all flex items-center gap-1.5 ${
        explainTermsMode
          ? 'border-accentGold text-accentGold bg-accentGold/10 font-medium'
          : 'border-borderDark text-stone hover:text-parchment'
      }`}
    >
      <BookOpen className="w-3.5 h-3.5" />
      <span>Chú Giải Thuật Ngữ: {explainTermsMode ? 'BẬT' : 'TẮT'}</span>
    </button>
  );
}
