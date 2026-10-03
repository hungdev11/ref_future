'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

export interface DateInputProps {
  value: string; // ISO format: "YYYY-MM-DD"
  onChange: (isoDate: string) => void;
  required?: boolean;
  id?: string;
  name?: string;
  disabled?: boolean;
  className?: string;
  min?: string; // "YYYY-MM-DD"
  max?: string; // "YYYY-MM-DD"
  placeholder?: string;
}

/**
 * Chuyển đổi YYYY-MM-DD sang DD/MM/YYYY
 */
function isoToDisplay(iso: string): string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${d}/${m}/${y}`;
}

/**
 * Chuyển đổi DD/MM/YYYY sang YYYY-MM-DD, kiểm tra tính hợp lệ
 */
function displayToIso(display: string): string | null {
  const parts = display.trim().split('/');
  if (parts.length !== 3) return null;
  const d = parseInt(parts[0] || '', 10);
  const m = parseInt(parts[1] || '', 10);
  const y = parseInt(parts[2] || '', 10);

  if (isNaN(d) || isNaN(m) || isNaN(y)) return null;
  if (y < 1850 || y > 2150) return null;
  if (m < 1 || m > 12) return null;

  // Tính số ngày tối đa trong tháng đó
  const daysInMonth = new Date(y, m, 0).getDate();
  if (d < 1 || d > daysInMonth) return null;

  const yStr = String(y).padStart(4, '0');
  const mStr = String(m).padStart(2, '0');
  const dStr = String(d).padStart(2, '0');
  return `${yStr}-${mStr}-${dStr}`;
}

/**
 * Tự động chèn dấu '/' khi người dùng gõ
 */
function formatMask(input: string): string {
  // Chỉ lấy chữ số
  const digits = input.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 4) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  required = false,
  id,
  name,
  disabled = false,
  className = '',
  min = '1900-01-01',
  max = '2099-12-31',
  placeholder = 'DD/MM/YYYY',
}) => {
  const [displayValue, setDisplayValue] = useState<string>(() => isoToDisplay(value));
  const [hasError, setHasError] = useState<boolean>(false);
  const hiddenDateRef = useRef<HTMLInputElement>(null);

  // Đồng bộ displayValue khi prop value thay đổi từ ngoài
  useEffect(() => {
    const formatted = isoToDisplay(value);
    setDisplayValue(formatted);
    if (formatted) {
      setHasError(false);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const input = e.currentTarget;
      const { selectionStart, selectionEnd, value: currentVal } = input;
      // Nếu không bôi đen văn bản và con trỏ ngay sau dấu '/'
      if (selectionStart === selectionEnd && selectionStart !== null && selectionStart > 0) {
        if (currentVal[selectionStart - 1] === '/') {
          e.preventDefault();
          // Xóa cả dấu '/' và chữ số đứng trước nó
          const newVal = currentVal.slice(0, selectionStart - 2) + currentVal.slice(selectionStart);
          const formatted = formatMask(newVal);
          setDisplayValue(formatted);
          const iso = displayToIso(formatted);
          if (iso) {
            onChange(iso);
            setHasError(false);
          } else {
            onChange('');
          }
          const newPos = Math.max(0, selectionStart - 2);
          setTimeout(() => {
            input.setSelectionRange(newPos, newPos);
          }, 0);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    
    // Nếu người dùng xóa hết
    if (!raw.trim()) {
      setDisplayValue('');
      onChange('');
      setHasError(false);
      return;
    }

    // Hỗ trợ trường hợp paste chuỗi ISO YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw.trim())) {
      const [y, m, d] = raw.trim().split('-');
      const formatted = `${d}/${m}/${y}`;
      setDisplayValue(formatted);
      const iso = displayToIso(formatted);
      if (iso) {
        onChange(iso);
        setHasError(false);
      } else {
        setHasError(true);
      }
      return;
    }

    // Áp dụng định dạng mask DD/MM/YYYY
    const formatted = formatMask(raw);
    setDisplayValue(formatted);

    // Nếu đã gõ đủ 10 ký tự DD/MM/YYYY, thử parse sang ISO
    if (formatted.length === 10) {
      const iso = displayToIso(formatted);
      if (iso) {
        onChange(iso);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } else {
      setHasError(false);
    }
  };

  const handleBlur = () => {
    if (!displayValue.trim()) {
      if (required) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      return;
    }

    const iso = displayToIso(displayValue);
    if (iso) {
      onChange(iso);
      setDisplayValue(isoToDisplay(iso));
      setHasError(false);
    } else {
      // Giữ nguyên chuỗi người dùng đã gõ để họ thấy và sửa, không âm thầm nhảy về giá trị cũ
      setHasError(true);
    }
  };

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIso = e.target.value;
    if (selectedIso) {
      onChange(selectedIso);
      setDisplayValue(isoToDisplay(selectedIso));
      setHasError(false);
    }
  };

  const openCalendar = () => {
    if (disabled) return;
    try {
      if (hiddenDateRef.current && typeof hiddenDateRef.current.showPicker === 'function') {
        hiddenDateRef.current.showPicker();
      } else {
        hiddenDateRef.current?.focus();
        hiddenDateRef.current?.click();
      }
    } catch {
      hiddenDateRef.current?.focus();
      hiddenDateRef.current?.click();
    }
  };

  return (
    <div className="space-y-1">
      <div
        className={`relative flex items-center bg-background border ${
          hasError
            ? 'border-cinnabar focus-within:border-cinnabar'
            : 'border-borderDark focus-within:border-accentGold'
        } text-parchment transition-colors ${className}`}
      >
        <input
          type="text"
          id={id}
          name={name}
          inputMode="numeric"
          placeholder={placeholder}
          value={displayValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={disabled}
          maxLength={10}
          className="w-full px-3 py-2 bg-transparent text-xs font-mono text-parchment placeholder-stone/40 focus:outline-none tracking-wider"
        />

        {/* Hidden native date input for picker support and HTML5 form validation */}
        <input
          ref={hiddenDateRef}
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          value={value || ''}
          min={min}
          max={max}
          required={required}
          onChange={handlePickerChange}
          className="sr-only pointer-events-none"
        />

        {/* Calendar toggle button */}
        <button
          type="button"
          onClick={openCalendar}
          disabled={disabled}
          tabIndex={-1}
          title="Chọn ngày từ lịch"
          className="px-2.5 py-2 text-stone/60 hover:text-accentGold transition-colors flex items-center justify-center border-l border-borderDark/40"
        >
          <Calendar className="w-3.5 h-3.5" />
        </button>
      </div>

      {hasError && (
        <div className="flex items-center gap-1 text-[11px] font-mono text-cinnabar animate-fadeIn">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>Ngày không hợp lệ (Định dạng: Ngày / Tháng / Năm, ví dụ: 25/08/1995)</span>
        </div>
      )}
    </div>
  );
};
