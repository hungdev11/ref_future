'use client';

import React, { useState } from 'react';
import { AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import type { MysticosResult } from '@mystic/core';
import { getTarotCardImageUrl } from '../../lib/tarot-images';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [rawDraws, setRawDraws] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const activeSeed = `seed_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadCode, seed: activeSeed }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Rút bài thất bại');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);
      setRawDraws(data.facts?.draws || []);
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
          <span className="text-accentGold">04</span>
          <span>/</span>
          <span>Bói Bài Tarot Cổ Điển</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bàn Trải Bài Tarot Rider-Waite 78 Lá
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Tĩnh tâm, tập trung vào điều bạn đang trăn trở và rút những lá bài chỉ đường.
          Kết quả được suy diễn tất định theo 17 tầng MysticosResult và chuẩn thư tịch RWS 1909.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Guide */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2">
            Chọn Kiểu Trải Bài
          </div>

          <form onSubmit={handleDraw} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Phương Thức Trải Bài
              </label>
              <select
                value={spreadCode}
                onChange={(e) => setSpreadCode(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="SPREAD_1_DAILY">1 Lá: Định Hướng Ngày</option>
                <option value="SPREAD_3_PPF">3 Lá: Quá Khứ – Hiện Tại – Tương Lai</option>
                <option value="SPREAD_3_SCA">3 Lá: Hoàn Cảnh – Thách Thức – Lời Khuyên</option>
                <option value="SPREAD_5_SCCA_OUTCOME">5 Lá: Đa Chiều (Hoàn Cảnh - Thách Thức - Căn Nguyên - Lời Khuyên - Kết Quả)</option>
                <option value="SPREAD_10_CELTIC_CROSS">10 Lá: Thập Tự Celtic (Chuyên Sâu)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Đang Xáo Bài...
                </>
              ) : (
                'Xáo & Rút Bài Ngay →'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick guide */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Nguyên Lý Khảo Luận</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Toàn bộ bài trải được phân tích qua hệ thống 5 tầng kiến trúc Mysticos:
              Dữ kiện quan sát ➔ Kết quả tính toán ➔ Khuôn mẫu tổng hợp ➔ Chỉ dẫn hành động ➔ Bảng minh bạch căn nguyên (Why Panel).
            </p>
          </div>
        </div>

        {/* Right Column: Visual Spread Board & Pure Result Viewer */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Bàn Trải Bài Đang Chờ</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Chọn kiểu trải bài phù hợp ở bên trái và bấm nút Rút Bài để khởi tạo các thông điệp chỉ dẫn.
              </p>
            </div>
          )}

          {/* Render visual cards if draws exist */}
          {rawDraws.length > 0 && (
            <div className="space-y-4">
              <div className="p-3 bg-surface border border-borderDark flex items-center justify-between text-xs font-mono">
                <span className="text-stone">
                  Bàn trải quan sát: <strong className="text-parchment">{rawDraws.length} lá bài</strong>
                </span>
                <span className="text-[11px] text-accentGold">
                  Trực quan hóa bài trải Rider-Waite
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {rawDraws.map((draw: any, idx: number) => {
                  const imageUrl = getTarotCardImageUrl(draw.card?.cardCode || draw.cardCode || '');
                  const isRev = Boolean(draw.isReversed);
                  const cardName = draw.card?.name || draw.cardCode || `Lá #${idx + 1}`;
                  const posName = draw.positionName || `Vị trí ${draw.positionIndex ?? idx + 1}`;

                  return (
                    <div
                      key={idx}
                      className="bg-surface border border-borderDark p-3 flex flex-col items-center justify-between text-center space-y-2"
                    >
                      <div className="text-[10px] font-mono text-stone truncate w-full">
                        {posName}
                      </div>

                      <div className="relative w-20 aspect-[2/3.4] overflow-hidden border border-borderDark bg-black shadow">
                        <img
                          src={imageUrl}
                          alt={cardName}
                          className={`w-full h-full object-cover ${isRev ? 'rotate-180' : ''}`}
                        />
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-serif text-xs text-parchment font-medium truncate max-w-[100px]">
                          {cardName}
                        </div>
                        <span
                          className={`text-[9px] px-1 py-0.2 border block font-mono ${
                            isRev ? 'border-cinnabar text-cinnabar' : 'border-borderLight text-stone'
                          }`}
                        >
                          {isRev ? 'Ngược' : 'Xuôi'}
                        </span>
                      </div>
                    </div>
                  );
                })}
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
