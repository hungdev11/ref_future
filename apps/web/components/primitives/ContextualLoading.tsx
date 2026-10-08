'use client';

import React from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export interface ContextualLoadingProps {
  title?: string;
  steps: string[];
  currentStepIndex: number;
  className?: string;
}

export function ContextualLoading({
  title = 'Đang tiến hành khảo cứu',
  steps,
  currentStepIndex,
  className = '',
}: ContextualLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`border border-borderDark bg-surface p-8 sm:p-12 space-y-6 text-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 border border-accentGold/60 mx-auto flex items-center justify-center text-accentGold bg-background/50">
        <RefreshCw className="w-5 h-5 animate-spin" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-serif text-xl text-parchment font-medium tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-stone font-mono">
          Hệ thống đang đối chiếu tri thức và tổng hợp mô hình tất định...
        </p>
      </div>

      <div className="space-y-3 pt-2 text-left max-w-xs mx-auto border-t border-borderDark/60">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 text-xs transition-colors ${
                isDone
                  ? 'text-parchment'
                  : isCurrent
                  ? 'text-accentGold font-medium'
                  : 'text-stone/50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-accentGold shrink-0" />
              ) : isCurrent ? (
                <div className="w-3.5 h-3.5 border border-accentGold flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-accentGold animate-pulse" />
                </div>
              ) : (
                <div className="w-3.5 h-3.5 border border-borderDark shrink-0" />
              )}
              <span className="font-mono text-[11px]">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
