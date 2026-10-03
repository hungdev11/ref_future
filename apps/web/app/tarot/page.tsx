'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  X,
  HelpCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Layers,
} from 'lucide-react';
import { getTarotCardImageUrl } from '../../lib/tarot-images';
import {
  getAuthenticTarotCardInsights,
  synthesizeSpreadNarrative,
} from '@mystic/tarot-engine';

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal State for clicked card
  const [selectedDraw, setSelectedDraw] = useState<any | null>(null);
  const [showSynthesis, setShowSynthesis] = useState(false);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedDraw(null);
    setShowSynthesis(false);

    const activeSeed = `seed_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadCode, seed: activeSeed }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Rút bài thất bại');
      setResult(data);
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
          <strong> Nhấn vào từng lá bài để mở lời luận giải chi tiết về công việc, tiền tài, tình cảm và lời khuyên hành động.</strong>
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
              <span>Hướng Dẫn Người Mới</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Sau khi nhấn <strong>Rút Bài</strong>, các lá bài sẽ hiện lên trên bàn cờ. 
              <strong> Bạn chỉ cần nhấp trực tiếp vào bất kỳ lá bài nào</strong> để mở bảng giải thích chi tiết, không cần học trước bất kỳ biểu tượng Tarot nào.
            </p>
          </div>
        </div>

        {/* Right Column: Tarot Board */}
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

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Banner */}
              <div className="p-4 bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="text-stone">
                  Trải bài: <strong className="text-parchment">{result.metadata.spreadName}</strong> ({result.facts.draws.length} lá)
                </div>
                <span className="text-[11px] text-accentGold underline">
                  Nhấp vào từng lá bài để xem giải nghĩa đa chiều →
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {result.facts.draws.map((draw: any, idx: number) => {
                  const imageUrl = getTarotCardImageUrl(draw.card.cardCode);
                  const isRev = draw.isReversed;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDraw(draw)}
                      className="bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group flex flex-col justify-between"
                    >
                      {/* Position Header */}
                      <div className="p-3 border-b border-borderDark flex items-center justify-between text-xs font-mono">
                        <span className="text-stone text-[11px]">
                          Vị trí {draw.positionIndex}: {draw.positionName}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 border ${
                            isRev
                              ? 'border-cinnabar text-cinnabar'
                              : 'border-borderLight text-parchment'
                          }`}
                        >
                          {isRev ? 'Ngược' : 'Xuôi'}
                        </span>
                      </div>

                      {/* Card Image */}
                      <div className="p-4 flex flex-col items-center bg-background/50">
                        <div className="relative w-36 aspect-[2/3.4] overflow-hidden border border-borderDark group-hover:border-accentGold transition-colors bg-black shadow-md">
                          <img
                            src={imageUrl}
                            alt={draw.card.name}
                            className={`w-full h-full object-cover transition-transform duration-300 ${
                              isRev ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        <h4 className="mt-3 font-serif font-bold text-sm text-parchment group-hover:text-accentGold transition-colors text-center">
                          {draw.card.name}
                        </h4>
                        <span className="text-[10px] font-mono text-stone">
                          {draw.card.arcana === 'MAJOR' ? 'Bộ Ẩn Chính' : 'Bộ Ẩn Phụ'}
                        </span>
                      </div>

                      {/* Card Footer */}
                      <div className="p-3 border-t border-borderDark flex items-center justify-between text-[11px] font-mono text-stone">
                        <span className="text-[10px] text-stone/80 truncate max-w-[130px]">
                          {draw.card.keywords.slice(0, 2).join(' • ')}
                        </span>
                        <span className="text-accentGold group-hover:underline">
                          Chi tiết →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative Guidance Footer */}
              <div className="p-3.5 bg-surface border border-borderDark flex items-center justify-between text-xs font-mono text-stone">
                <span>
                  💡 Nhấp vào bất kỳ lá bài nào ở trên để mở bảng phân tích chi tiết về công việc, tiền bạc và tình cảm.
                </span>
                <span>{result.facts.draws.length} lá đã trải</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── HOLISTIC STORY SYNTHESIS ─── */}
      {result && result.facts.draws.length > 1 && (
        <div className="border-2 border-accentGold/60 shadow-lg shadow-black/30">
          <button
            type="button"
            onClick={() => setShowSynthesis(!showSynthesis)}
            className="w-full flex items-center justify-between p-5 bg-surface hover:bg-background/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4 text-accentGold" />
              <div className="text-left">
                <span className="font-mono text-[10px] text-accentGold uppercase tracking-widest block">
                  Tổng Luận Toàn Trải Bài
                </span>
                <span className="font-serif text-sm text-parchment">
                  Câu Chuyện Giữa Các Lá Bài & Thông Điệp Hành Động
                </span>
              </div>
            </div>
            {showSynthesis ? (
              <ChevronUp className="w-4 h-4 text-accentGold flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-accentGold flex-shrink-0" />
            )}
          </button>
          {showSynthesis && (() => {
            const draws = result.facts.draws;
            const synthesis = result.facts.synthesis || synthesizeSpreadNarrative(draws, result.facts.spreadCode);
            const suitCount = synthesis.elementBalance;
            const reversedCount = draws.filter((d: any) => d.isReversed).length;
            const total = draws.length || 1;

            const sortedSuits = Object.entries(suitCount as Record<string, number>)
              .filter(([, v]) => v > 0)
              .sort(([, a], [, b]) => b - a);

            const suitColors: Record<string, string> = {
              MAJOR: 'text-accentGold',
              WANDS: 'text-orange-400',
              CUPS: 'text-blue-400',
              SWORDS: 'text-stone',
              PENTACLES: 'text-emerald-400',
            };

            const suitNames: Record<string, string> = {
              MAJOR: 'Bộ Ẩn Chính (Arcana Lớn)',
              WANDS: 'Gậy (Lửa & Hành Động)',
              CUPS: 'Chén (Nước & Cảm Xúc)',
              SWORDS: 'Kiếm (Khí & Lý Trí)',
              PENTACLES: 'Đồng Tiền (Đất & Vật Chất)',
            };

            return (
              <div className="p-5 space-y-6 bg-background border-t border-accentGold/30">
                {/* Suit & Element Distribution */}
                <div className="space-y-3">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Cân Bằng Nguyên Tố & Bộ Ẩn
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sortedSuits.map(([suit, count]) => (
                      <span key={suit} className={`px-2.5 py-1 border border-borderDark text-[10px] font-mono ${suitColors[suit] ?? 'text-stone'}`}>
                        {suitNames[suit] ?? suit} × {count}
                      </span>
                    ))}
                    {reversedCount > 0 && (
                      <span className="px-2.5 py-1 border border-borderDark text-[10px] font-mono text-cinnabar">
                        Lá Ngược × {reversedCount}/{total}
                      </span>
                    )}
                  </div>
                  <div className="p-3 bg-surface border border-accentGold/20 space-y-1">
                    <span className="font-mono text-accentGold text-[10px] uppercase tracking-wider block">Năng Lượng Trọng Tâm</span>
                    <p className={`text-[11px] font-mono ${suitColors[synthesis.dominantSuit] ?? 'text-stone'}`}>{synthesis.dominantSuitLabel}</p>
                  </div>
                </div>

                {/* Narrative Arc */}
                <div className="space-y-3">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Tiến Trình Tự Sự & Dòng Chảy Năng Lượng
                  </span>
                  <div className="p-3 bg-surface border border-borderDark space-y-2">
                    <p className="text-stone text-[11px] leading-relaxed">{synthesis.narrativeArc}</p>
                    <p className="text-parchment text-[11px] leading-relaxed pt-2 border-t border-borderDark">
                      <strong>Xung lực & Thách thức:</strong> {synthesis.tensionAnalysis}
                    </p>
                  </div>
                </div>

                {/* Core Progression */}
                <div className="space-y-3">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Trọng Tâm Chuyển Hóa
                  </span>
                  <div className="p-3 bg-surface border border-borderDark">
                    <p className="text-stone text-[11px] leading-relaxed">{synthesis.coreProgression}</p>
                  </div>
                </div>

                {/* Actionable Guidance (No Fortune-telling, Concrete Experiment) */}
                <div className="space-y-2">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Chỉ Dẫn Hành Động Thực Tế (Actionable Guidance)
                  </span>
                  <div className="p-3.5 bg-surface border border-accentGold/40 space-y-2">
                    <p className="text-parchment text-[11px] leading-relaxed">
                      {synthesis.actionableGuidance}
                    </p>
                    <div className="pt-2 border-t border-borderDark text-stone text-[10px] italic">
                      Quy tắc Mysticos: Tarot không phải là lời tiên tri bất di bất dịch, mà là tấm gương phản chiếu tâm lý giúp bạn đưa ra lựa chọn sáng suốt và có trách nhiệm.
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* POPUP / MODAL: DETAILED TAROT CARD READING */}
      {selectedDraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-accentGold">
                    Vị trí {selectedDraw.positionIndex}: {selectedDraw.positionName}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 border ${
                      selectedDraw.isReversed
                        ? 'border-cinnabar text-cinnabar'
                        : 'border-borderLight text-parchment'
                    }`}
                  >
                    {selectedDraw.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif text-parchment">
                  {selectedDraw.card.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedDraw(null)}
                className="p-1.5 text-stone hover:text-parchment hover:bg-surfaceHover transition-colors border border-borderDark"
                title="Đóng popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {(() => {
              const insights = getAuthenticTarotCardInsights(
                selectedDraw.card.cardCode,
                selectedDraw.card.name,
                selectedDraw.card.arcana,
                selectedDraw.positionName,
                selectedDraw.isReversed
              );
              const imageUrl = getTarotCardImageUrl(selectedDraw.card.cardCode);

              return (
                <div className="space-y-5 text-xs">
                  {/* Top Overview: Card Image + Layman Beginners Explanations */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-4 bg-background border border-borderDark">
                    <div className="relative w-32 shrink-0 aspect-[2/3.4] overflow-hidden border border-borderDark bg-black shadow-md">
                      <img
                        src={imageUrl}
                        alt={selectedDraw.card.name}
                        className={`w-full h-full object-cover ${
                          selectedDraw.isReversed ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div className="space-y-2.5 flex-1">
                      <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Ý Nghĩa Lá Bài & Vị Trí Trải:</span>
                      </div>

                      <div className="space-y-1.5 text-stone leading-relaxed text-xs">
                        <p>
                          <strong className="text-parchment">Ý nghĩa vị trí:</strong> {insights.beginnerGuide}
                        </p>
                        <p>
                          <strong className="text-parchment">Phân loại bộ bài:</strong> {insights.arcanaMeaning}
                        </p>
                        <p>
                          <strong className="text-parchment">Chiều xuôi / ngược:</strong> {insights.orientationGuide}
                        </p>
                        {insights.symbolism && (
                          <p>
                            <strong className="text-accentGold">Biểu tượng & Cổ mẫu:</strong> {insights.symbolism}
                          </p>
                        )}
                      </div>

                      {/* Keywords */}
                      <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                        {selectedDraw.card.keywords.map((kw: string, kidx: number) => (
                          <span
                            key={kidx}
                            className="px-2 py-0.5 bg-surface border border-borderDark text-stone"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Core Summary */}
                  <div className="p-4 bg-background border border-borderDark space-y-1.5">
                    <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                      Thông Điệp Cốt Lõi Cho Bạn
                    </span>
                    <p className="text-parchment leading-relaxed text-xs font-normal">
                      {insights.coreSummary}
                    </p>
                  </div>

                  {/* Career & Love Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        💼 Công Việc, Học Tập & Tài Chính
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">
                        {insights.careerFinance}
                      </p>
                    </div>

                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        ❤️ Tình Cảm & Các Mối Quan Hệ
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">
                        {insights.loveRelationship}
                      </p>
                    </div>
                  </div>

                  {/* Actionable Do's and Don'ts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        ✨ Những Việc Nên Làm (Do's)
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">
                        {insights.dos}
                      </p>
                    </div>

                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                        ⚠️ Những Việc Cần Tránh (Don'ts)
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">
                        {insights.donts}
                      </p>
                    </div>
                  </div>

                  {/* Close button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedDraw(null)}
                      className="px-5 py-2 bg-accentGold text-background font-mono text-xs uppercase tracking-wider font-bold hover:bg-parchment transition-colors border border-accentGold"
                    >
                      Đã Hiểu & Đóng Lại
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
