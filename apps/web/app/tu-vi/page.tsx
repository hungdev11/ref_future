'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  Compass,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  STEM_VN,
  BRANCH_VN,
  PALACE_VN,
} from '@mystic/tuvi-engine';
import type { MysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

export default function TuViPage() {
  const [solarDate, setSolarDate] = useState('1990-11-29');
  const [birthTime, setBirthTime] = useState('09:30:00');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [rawPalaces, setRawPalaces] = useState<Record<string, any> | null>(null);
  const [showPalaceGrid, setShowPalaceGrid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tuvi/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solarDate,
          birthTime,
          gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khởi tạo lá số thất bại');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);
      setRawPalaces(data.facts?.palaces || null);
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
          <span className="text-accentGold">02</span>
          <span>/</span>
          <span>Tử Vi Đẩu Số Cổ Điển</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ 12 Cung Chức & Thiên Bàn Tử Vi
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          An sao lập lá số theo giờ sinh và lịch thiên văn Việt Nam.
          Toàn bộ luận giải được kiến trúc qua mô hình tất định, đối chiếu thư tịch cổ Hi Di Trần Đoàn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1: Input Form */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Nhập Dữ Liệu Khởi Bàn</span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={solarDate}
                onChange={setSolarDate}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giờ Sinh <span className="text-stone/60 normal-case">(Chính xác theo giờ đồng hồ)</span>
              </label>
              <input
                type="time"
                step="1"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/60 block mt-1 font-mono">
                Giờ sinh chính xác quyết định việc an Mệnh, Thân và nạp âm Cục ngũ hành.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giới Tính
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('MALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'MALE'
                      ? 'border-accentGold bg-background text-accentGold font-bold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment'
                  }`}
                >
                  Nam Mệnh
                </button>
                <button
                  type="button"
                  onClick={() => setGender('FEMALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'FEMALE'
                      ? 'border-accentGold bg-background text-accentGold font-bold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment'
                  }`}
                >
                  Nữ Mệnh
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Đang An Sao Lập Bàn...
                </>
              ) : (
                'An Sao Lập Lá Số →'
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
              <span>Trường Phái Chuẩn Tắc</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Thuật toán an sao tuân theo chuẩn Tử Vi Đẩu Số Toàn Thư.
              Các tinh tú được định vị theo Can Chi năm tháng ngày giờ và Cục ngũ hành mà không pha tạp mê tín.
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
              <h3 className="text-sm font-serif text-parchment">Thiên Bàn Đang Chờ Khởi Tạo</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập ngày giờ sinh và giới tính bên trái để an sao và khởi tạo bản phân tích luận giải Tử Vi.
              </p>
            </div>
          )}

          {/* Clean Editorial Result Front-and-Center */}
          {result && <MysticosResultViewer result={result} />}

          {/* Optional Progressive Disclosure: 12 Palace Grid */}
          {result && rawPalaces && (
            <div className="border border-borderDark bg-surface p-4 space-y-3">
              <button
                type="button"
                onClick={() => setShowPalaceGrid(!showPalaceGrid)}
                className="w-full flex items-center justify-between text-xs font-mono text-stone hover:text-parchment transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="text-accentGold">✦</span>
                  <span className="text-parchment font-medium uppercase tracking-wider">
                    Đồ Hình Thiên Bàn 12 Cung Chức
                  </span>
                  <span className="text-stone text-[11px]">
                    ({Object.keys(rawPalaces).length} Cung Vị Chi Tiết)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-accentGold text-xs font-mono">
                  <span>{showPalaceGrid ? 'Thu gọn' : 'Xem ma trận sao'}</span>
                  {showPalaceGrid ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {showPalaceGrid && (
                <div className="pt-3 border-t border-borderDark space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone">
                    <span>Trực quan hóa ma trận Thập Nhị Cung</span>
                    <span className="text-accentGold">Mệnh - Thân - Tam Hợp</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {Object.keys(rawPalaces).map((pKey) => {
                      const palace = rawPalaces[pKey];
                      const isMenh = pKey === 'MENH';

                      return (
                        <div
                          key={pKey}
                          className={`p-3 border flex flex-col justify-between ${
                            isMenh
                              ? 'bg-background border-accentGold'
                              : palace.isThan
                              ? 'bg-background border-stone/60'
                              : 'bg-background border-borderDark'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between border-b border-borderDark pb-1.5">
                              <span className="font-serif font-bold text-xs text-parchment">
                                {PALACE_VN[pKey] ?? pKey}
                              </span>
                              <div className="flex gap-1 text-[9px] font-mono">
                                {isMenh && (
                                  <span className="px-1 py-0.2 bg-accentGold text-background font-bold">
                                    MỆNH
                                  </span>
                                )}
                                {palace.isThan && (
                                  <span className="px-1 py-0.2 border border-borderLight text-parchment">
                                    THÂN
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="text-[10px] font-mono text-stone">
                              {BRANCH_VN[palace.branch] || palace.branch} ({STEM_VN[palace.stem] || palace.stem})
                            </div>

                            {palace.stars && palace.stars.length > 0 && (
                              <div className="space-y-0.5 text-[10px]">
                                {palace.stars.slice(0, 3).map((s: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-stone truncate">
                                    <span className={s.isMain ? 'text-parchment font-medium' : ''}>
                                      {s.name}
                                    </span>
                                    <span className="text-stone/60 font-mono text-[9px]">{s.brightness || ''}</span>
                                  </div>
                                ))}
                                {palace.stars.length > 3 && (
                                  <span className="text-[9px] text-stone/50 block font-mono">
                                    +{palace.stars.length - 3} sao khác
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
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
