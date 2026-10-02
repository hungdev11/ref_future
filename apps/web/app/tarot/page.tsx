'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [seed, setSeed] = useState('mystic_seed_2026');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadCode, seed }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Draw failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomSeed = () => {
    const randomHex = Math.random().toString(36).substring(2, 10);
    setSeed(`seed_${randomHex}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Rider-Waite-Smith 78 Cards (Seeded PRNG Mulberry32)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Trải Bài Tarot Tất Định & Tái Lập Được</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Quá trình xáo bài không chọn theo nội dung câu hỏi. Thuật toán Fisher-Yates kết hợp Seed bảo đảm tính khách quan, tái lập chính xác 100% khi tra cứu lịch sử.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Form Column */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleDraw} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Kiểu Trải Bài (Spread)</label>
              <select
                value={spreadCode}
                onChange={(e) => setSpreadCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-rose-500"
              >
                <option value="SPREAD_1_DAILY">1 Lá: Thông Điệp Trong Ngày</option>
                <option value="SPREAD_3_PPF">3 Lá: Quá Khứ / Hiện Tại / Tương Lai</option>
                <option value="SPREAD_3_SCA">3 Lá: Hoàn Cảnh / Thách Thức / Lời Khuyên</option>
                <option value="SPREAD_5_SCCA_OUTCOME">5 Lá: Phân Tích Toàn Diện</option>
                <option value="SPREAD_10_CELTIC_CROSS">10 Lá: Celtic Cross</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-gray-300">Khóa Hạt Giống (Seed)</label>
                <button
                  type="button"
                  onClick={handleRandomSeed}
                  className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Đổi Seed
                </button>
              </div>
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white font-mono text-sm focus:outline-none focus:border-rose-500"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Cùng 1 Seed sẽ luôn rút ra đúng các lá bài này.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-rose-600/20"
            >
              {loading ? 'Đang Xáo Bài...' : 'Rút Bài Tất Định'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">Chọn kiểu trải bài và nhấn nút Rút Bài để xem kết quả.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Seed Trace Banner */}
              <div className="p-4 rounded-xl bg-background/80 border border-borderDark flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Trải bài:</span>{' '}
                  <span className="font-bold text-white">{result.metadata.spreadName}</span>
                </div>
                <div className="font-mono text-gray-400">
                  Seed: <span className="text-rose-400 font-bold">{result.facts.seed}</span>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {result.facts.draws.map((draw: any) => (
                  <div
                    key={draw.positionIndex}
                    className="p-5 rounded-2xl bg-surface border border-borderDark space-y-4 flex flex-col justify-between hover:border-rose-500/50 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Position Title */}
                      <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                        <span className="text-xs font-bold text-gray-400">
                          Vị trí {draw.positionIndex}: {draw.positionName}
                        </span>
                        {draw.isReversed ? (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                            NGƯỢC
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            XUÔI
                          </span>
                        )}
                      </div>

                      {/* Card Identity */}
                      <div className="space-y-1">
                        <div className="text-xl font-extrabold text-white">
                          {draw.card.name}
                        </div>
                        <div className="text-xs text-rose-400 font-medium">
                          {draw.card.arcana === 'MAJOR' ? 'Major Arcana (Ẩn Chính)' : 'Minor Arcana (Ẩn Phụ)'}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {draw.card.keywords.map((kw: string, kidx: number) => (
                          <span key={kidx} className="px-2 py-0.5 rounded-full bg-background text-[11px] text-gray-300">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-borderDark/40 text-[10px] font-mono text-gray-500">
                      Code: {draw.card.cardCode}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
