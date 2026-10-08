'use client';

import React from 'react';
import { CheckCircle2, Edit3, ArrowRight } from 'lucide-react';

export interface ConfirmationItem {
  label: string;
  value: string;
}

export interface ConfirmationStepProps {
  title?: string;
  subtitle?: string;
  items: ConfirmationItem[];
  onConfirm: () => void;
  onEdit: () => void;
  isSubmitting?: boolean;
  confirmLabel?: string;
  className?: string;
}

export function ConfirmationStep({
  title = 'Xác Nhận Dữ Liệu Khởi Bàn',
  subtitle = 'Vui lòng kiểm tra lại thông tin trước khi hệ thống kích hoạt tính toán.',
  items,
  onConfirm,
  onEdit,
  isSubmitting = false,
  confirmLabel = 'Xác Nhận & Khởi Tạo →',
  className = '',
}: ConfirmationStepProps) {
  return (
    <div
      className={`border border-borderDark bg-surface p-6 sm:p-8 space-y-6 max-w-xl mx-auto ${className}`}
    >
      <div className="border-b border-borderDark pb-4 space-y-1">
        <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-accentGold" />
          <span>BƯỚC XÁC NHẬN</span>
        </div>
        <h3 className="font-serif text-xl text-parchment font-medium tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-stone leading-relaxed">{subtitle}</p>
      </div>

      <div className="divide-y divide-borderDark/60 bg-background/50 border border-borderDark">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 flex items-center justify-between text-xs"
          >
            <span className="font-mono text-stone text-[11px] uppercase tracking-wider">
              {item.label}
            </span>
            <span className="font-serif text-parchment text-sm font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSubmitting}
          className="w-full sm:w-1/3 py-2.5 px-4 bg-transparent border border-borderDark text-stone hover:text-parchment hover:border-stone transition-colors text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Chỉnh sửa</span>
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isSubmitting}
          className="w-full sm:w-2/3 py-2.5 px-4 bg-accentGold text-background hover:bg-parchment transition-colors text-xs font-mono font-bold uppercase tracking-widest border border-accentGold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{confirmLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
