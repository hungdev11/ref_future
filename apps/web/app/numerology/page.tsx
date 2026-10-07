'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  RefreshCw,
  Compass,
} from 'lucide-react';
import type { MysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [rawCore, setRawCore] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, birthDate }),
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
          Toàn bộ kết quả được xử lý qua 17 tầng MysticosResult tất định và đối chiếu thư tịch S0/S1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Guide */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Thông Số Khảo Cứu</span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Họ và Tên Đầy Đủ
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: Nguyễn Văn Đức"
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/70 block mt-1 font-mono">
                Chuẩn chuyển đổi ký tự tiếng Việt có dấu sang hệ Latinh chuẩn Pythagoras.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={birthDate}
                onChange={setBirthDate}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
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
              Hệ thống Mysticos không phán đoán số phận tốt xấu tuyệt đối, mà phân tích cấu trúc hài hòa và điểm thử thách cần rèn giũa.
            </p>
          </div>
        </div>

        {/* Right Column: Results */}
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

          {/* Core Numbers Overview if present */}
          {rawCore && (
            <div className="p-4 bg-surface border border-borderDark space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-stone border-b border-borderDark pb-2">
                <span>Dữ kiện số học cốt lõi (Core Frequency Facts)</span>
                <span className="text-accentGold text-[11px]">Pythagorean Standard</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(rawCore).map(([k, v]: [string, any]) => (
                  <div key={k} className="p-3 bg-background border border-borderDark space-y-1">
                    <span className="text-[10px] font-mono text-stone block uppercase truncate">
                      {k}
                    </span>
                    <span className="text-lg font-serif text-accentGold font-bold">
                      {v?.value ?? String(v)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pure MysticosResultViewer */}
          {result && <MysticosResultViewer result={result} />}
        </div>
      </div>
    </div>
  );
}
