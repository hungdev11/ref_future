'use client';

import React, { useState } from 'react';
import { Hash, Sparkles, BookOpen, AlertTriangle, ArrowRight } from 'lucide-react';

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
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
      if (!res.ok) throw new Error(data.error ?? 'Calculation failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Hash className="w-4 h-4" />
          <span>Pythagorean Numerology (Chuẩn Hóa Tiếng Việt & Master Numbers)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tra Cứu Thần Số Học Pythagorean Tất Định</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Phân tích họ tên tiếng Việt theo chuẩn NFD loại bỏ dấu thanh, thuật toán phân loại chữ Y chuẩn mực, bảo lưu Master Numbers (11, 22, 33) theo phương pháp rút gọn 3 thành phần.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Họ Và Tên (Tiếng Việt Đầy Đủ)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Ví dụ: Nguyễn Văn Đức"
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Tháng Năm Sinh</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-emerald-600/20"
            >
              {loading ? 'Đang Tính Toán...' : 'Tính Toán Thần Số Học'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Hash className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">Nhập họ tên và ngày sinh để tính toán các chỉ số cốt lõi và chu kỳ.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Name Normalization Banner */}
              <div className="p-4 rounded-xl bg-background/80 border border-borderDark flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400">Tên đã chuẩn hóa:</span>{' '}
                  <span className="font-bold text-white font-mono">{result.facts.normalizedName}</span>
                </div>
                <div className="text-gray-400">
                  <span>{result.metadata.vowelCount} Nguyên âm</span> • <span>{result.metadata.consonantCount} Phụ âm</span>
                </div>
              </div>

              {/* Core Numbers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Life Path */}
                <div className="p-5 rounded-2xl bg-surface border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Đạo Tự (Life Path)</span>
                    {result.facts.core.LIFE_PATH.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    {result.facts.core.LIFE_PATH.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {result.facts.core.LIFE_PATH.rawCalculation}
                  </p>
                </div>

                {/* Expression */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Vận Mệnh (Expression)</span>
                    {result.facts.core.EXPRESSION.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-white">
                    {result.facts.core.EXPRESSION.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.EXPRESSION.rawCalculation}
                  </p>
                </div>

                {/* Soul Urge */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Linh Hồn (Soul Urge)</span>
                    {result.facts.core.SOUL_URGE.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-indigo-400">
                    {result.facts.core.SOUL_URGE.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.SOUL_URGE.rawCalculation}
                  </p>
                </div>

                {/* Personality */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Nhân Cách (Personality)</span>
                  <div className="text-4xl font-extrabold text-white">
                    {result.facts.core.PERSONALITY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.PERSONALITY.rawCalculation}
                  </p>
                </div>

                {/* Birthday */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Ngày Sinh (Birthday)</span>
                  <div className="text-4xl font-extrabold text-amber-400">
                    {result.facts.core.BIRTHDAY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {result.facts.core.BIRTHDAY.rawCalculation}
                  </p>
                </div>

                {/* Maturity */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Trưởng Thành (Maturity)</span>
                  <div className="text-4xl font-extrabold text-purple-400">
                    {result.facts.core.MATURITY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.MATURITY.rawCalculation}
                  </p>
                </div>
              </div>

              {/* 4 Pinnacles Timeline */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
                <h3 className="text-sm font-bold text-white">4 Giai Đoạn Đỉnh Cao Cuộc Đời (Pinnacles)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {result.facts.pinnacles.map((p: any) => (
                    <div key={p.pinnacleNumber} className="p-4 rounded-xl bg-background/50 border border-borderDark/60 text-center space-y-1">
                      <span className="text-[11px] text-gray-400">Đỉnh {p.pinnacleNumber}</span>
                      <div className="text-2xl font-bold text-emerald-400">{p.value}</div>
                      <span className="text-[10px] text-gray-500 block">
                        {p.startAge} - {p.endAge} tuổi
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
