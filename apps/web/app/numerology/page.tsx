'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { MysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

const CORE_FACT_LABELS: Record<string, string> = {
  life_path: 'Số Đường Đời (Life Path)',
  destiny: 'Số Sứ Mệnh (Destiny)',
  expression: 'Số Biểu Đạt (Expression)',
  soul_urge: 'Số Linh Hồn (Soul Urge)',
  personality: 'Số Tính Cách (Personality)',
  maturity: 'Số Trưởng Thành (Maturity)',
  birthday: 'Số Ngày Sinh (Birthday)',
  current_year: 'Năm Hiện Tại',
  personal_year: 'Năm Cá Nhân (Personal Year)',
  karmic_debts: 'Nợ Nghiệp (Karmic Debts)',
  master_numbers: 'Số Bậc Thầy (Master Numbers)',
  attitude: 'Số Thái Độ (Attitude)',
};

function formatCoreFactValue(val: any): string {
  if (Array.isArray(val)) {
    return val.length > 0 ? val.join(', ') : 'Không có';
  }
  if (typeof val === 'object' && val !== null) {
    return String(val.value ?? val.finalValue ?? JSON.stringify(val));
  }
  return String(val);
}

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [rawCore, setRawCore] = useState<Record<string, any> | null>(null);
  const [showCoreFacts, setShowCoreFacts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Instant feedback calculations
  const trimmedName = fullName.trim();
  const wordCount = trimmedName ? trimmedName.split(/\s+/).length : 0;
  const isNameValid = trimmedName.length >= 2;
  const isDateValid = Boolean(birthDate && /^\d{4}-\d{2}-\d{2}$/.test(birthDate));

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid || !isDateValid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: trimmedName, birthDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khảo cứu thất bại');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);
      setRawCore(data.facts?.core || null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">03</span>
          <span>/</span>
          <span>Thần Số Học Pythagoras Cổ Điển</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Hệ Thống Số Học & Chu Kỳ Tiến Hóa Bản Ngã
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Giải mã tần số dao động của danh xưng và ngày sinh theo chuẩn Pythagoras.
          Toàn bộ kết quả được xử lý qua 17 tầng mô hình tất định và đối chiếu thư tịch cổ S0/S1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1: Input Form */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Thông Số Khảo Cứu</span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-stone uppercase tracking-wider">
                  Họ và Tên Đầy Đủ
                </label>
                {isNameValid && (
                  <span className="text-[10px] font-mono text-accentGold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-olive" />
                    <span>{wordCount} từ ({trimmedName.length} ký tự)</span>
                  </span>
                )}
              </div>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: Nguyễn Văn Đức"
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/60 block mt-1 font-mono">
                Tự động chuẩn hóa dấu tiếng Việt sang bảng số Pythagoras (A-Z).
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono text-stone uppercase tracking-wider">
                  Ngày Sinh Dương Lịch
                </label>
                {isDateValid && (
                  <span className="text-[10px] font-mono text-stone">
                    Định dạng YYYY-MM-DD
                  </span>
                )}
              </div>
              <DateInput
                value={birthDate}
                onChange={setBirthDate}
                required
              />
            </div>

            {/* Instant Input Feedback Preview */}
            <div className="p-3 bg-background border border-borderDark space-y-2 text-xs font-mono">
              <div className="text-[10px] text-stone uppercase tracking-wider flex items-center justify-between border-b border-borderDark pb-1.5">
                <span>Trạng Thái Khảo Cứu:</span>
                <span className={isNameValid && isDateValid ? 'text-olive' : 'text-stone/60'}>
                  {isNameValid && isDateValid ? '● Đã Sẵn Sàng' : '○ Đang Chờ Dữ Liệu'}
                </span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="text-stone truncate">
                  Danh xưng: <strong className="text-parchment">{trimmedName || '—'}</strong>
                </div>
                <div className="text-stone">
                  Ngày sinh: <strong className="text-parchment">{birthDate || '—'}</strong>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isNameValid || !isDateValid}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Đang Khảo Cứu Tần Số...
                </>
              ) : (
                'Khảo Cứu Số Học →'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Guide */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Nguyên Lý Số Học Pythagoras</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Mỗi con số biểu thị một mức độ rung động năng lượng tự nhiên.
              Hệ thống Mysticos không phán đoán số phận tốt xấu, mà phân tích cấu trúc tiềm năng và thử thách để phát triển bản thân.
            </p>
          </div>
        </div>

        {/* Step 2: Editorial Result View */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Biểu Đồ Đang Chờ Khảo Cứu</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập họ tên và ngày sinh bên trái để khởi tạo bản phân tích tần số số học chi tiết.
              </p>
            </div>
          )}

          {/* Clean Editorial Result Front-and-Center */}
          {result && <MysticosResultViewer result={result} />}

          {/* Optional Progressive Disclosure: Core Numbers Grid */}
          {result && rawCore && (
            <div className="border border-borderDark bg-surface p-4 space-y-3">
              <button
                type="button"
                onClick={() => setShowCoreFacts(!showCoreFacts)}
                className="w-full flex items-center justify-between text-xs font-mono text-stone hover:text-parchment transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-accentGold">✦</span>
                  <span className="text-parchment font-medium uppercase tracking-wider">
                    Dữ Kiện Tần Số Cốt Lõi (Core Frequency Numbers)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-accentGold text-xs font-mono">
                  <span>{showCoreFacts ? 'Thu gọn' : 'Xem các chỉ số'}</span>
                  {showCoreFacts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {showCoreFacts && (
                <div className="pt-3 border-t border-borderDark space-y-3 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {Object.entries(rawCore).map(([k, v]: [string, any]) => {
                      const label = CORE_FACT_LABELS[k.toLowerCase()] || k.replace(/_/g, ' ').toUpperCase();
                      const displayVal = formatCoreFactValue(v);
                      return (
                        <div key={k} className="p-3 bg-background border border-borderDark space-y-1">
                          <span className="text-[10px] font-mono text-stone block uppercase break-words leading-tight">
                            {label}
                          </span>
                          <span className="text-lg font-serif text-accentGold font-bold block pt-0.5">
                            {displayVal}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
