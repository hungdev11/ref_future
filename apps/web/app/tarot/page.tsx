'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, ShieldCheck, AlertCircle, Sliders } from 'lucide-react';

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [seed, setSeed] = useState(() => `seed_${Math.random().toString(36).substring(2, 10)}`);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // If user hasn't specified an explicit seed in advanced mode, generate fresh seed
    const activeSeed = showAdvanced ? seed : `seed_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
    setSeed(activeSeed);

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spreadCode, seed: activeSeed }),
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
          <span>Rider-Waite-Smith 78 Cards (Tất Định & Tái Lập Tuyệt Đối)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Trải Bài Tarot & Thông Điệp Trực Giác</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Rút bài khách quan theo thuật toán Fisher-Yates chuẩn xác. Diễn giải dựa trên biểu tượng học kinh điển Rider-Waite-Smith 1910, mang lại lời khuyên thực tế cho cuộc sống.
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

            {/* Advanced Seed Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showAdvanced ? 'Ẩn tùy chọn nâng cao' : 'Tùy chọn nâng cao (Seed)'}</span>
              </button>
            </div>

            {showAdvanced && (
              <div className="p-3.5 rounded-xl bg-background/80 border border-borderDark space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
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
                  className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
                <span className="text-[10px] text-gray-500 block">
                  Cố định seed để tái lập chính xác lần rút bài này.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang Xáo Bài...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Rút Bài Tarot
                </>
              )}
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
              {/* Clean verification banner */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">
                    Trải bài: <strong className="text-white">{result.metadata.spreadName}</strong> ({result.facts.draws.length} lá)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-gray-400 hover:text-rose-400 text-[11px] transition-colors underline"
                >
                  {showAdvanced ? 'Ẩn thông số Seed' : 'Xem thông số Seed & Audit'}
                </button>
              </div>

              {showAdvanced && (
                <div className="p-3.5 rounded-xl bg-background/90 border border-borderDark text-[11px] font-mono text-gray-400 space-y-1">
                  <div>Thuật toán xáo bài: PRNG Mulberry32 • Fisher-Yates</div>
                  <div>Khóa hạt giống (Seed): <span className="text-rose-400 font-bold">{result.facts.seed}</span></div>
                </div>
              )}

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

                    {showAdvanced && (
                      <div className="pt-2 border-t border-borderDark/40 text-[10px] font-mono text-gray-500">
                        Code: {draw.card.cardCode}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Luận Giải Toàn Diện Tarot Dành Cho Độc Giả */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Từng Lá Bài & Thông Điệp</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium">
                    Chuẩn Rider-Waite-Smith 1910
                  </span>
                </div>

                <div className="space-y-5">
                  {result.facts.draws.map((draw: any) => (
                    <div
                      key={draw.positionIndex}
                      className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                          <span>
                            {draw.positionIndex}. {draw.positionName}: Lá {draw.card.name} ({draw.isReversed ? 'Ngược - Reversed' : 'Xuôi - Upright'})
                          </span>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-surface border border-borderDark text-gray-300 font-mono">
                          {draw.card.arcana}
                        </span>
                      </div>

                      <p className="text-sm text-gray-200 leading-relaxed">
                        Tại vị trí {draw.positionName}, lá bài {draw.card.name} xuất hiện dưới chiều {draw.isReversed ? 'ngược' : 'xuôi'}. {draw.isReversed ? draw.card.reversedMeaning : draw.card.uprightMeaning}
                      </p>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                        <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dễ Hiểu):</span>
                        <p className="text-gray-200 leading-relaxed">
                          {draw.isReversed
                            ? `Bạn đang cảm thấy có sự ngập ngừng, trì hoãn hoặc cần cẩn trọng xem xét lại các rào cản tâm lý bên trong trước khi đưa ra hành động lớn.`
                            : `Năng lượng đang rất thuận lợi để bạn tiến lên phía trước. Hãy tin tưởng vào bước đi của mình và chủ động nắm bắt cơ hội.`}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                        <span className="font-semibold text-indigo-300 block">🔍 Biểu Tượng Học & Chiều Sâu Tâm Thức:</span>
                        <p className="text-gray-300 leading-relaxed">
                          Theo nguyên tác của Arthur Edward Waite (1910): Hình tượng lá bài phản ánh những quy luật tâm lý vô thức. Chiều {draw.isReversed ? 'ngược' : 'xuôi'} nhắc nhở về sự cân bằng giữa nội lực bên trong và hoàn cảnh bên ngoài.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                        <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                        <p className="text-emerald-200/90 leading-relaxed">
                          {draw.isReversed
                            ? 'Dành thời gian chiêm nghiệm lại bản thân, giải phóng những nghi ngờ vô cớ và chuẩn bị chu đáo trước khi cam kết mới.'
                            : 'Hành động với tâm thế tự tin, quang minh chính đại; duy trì sự nhất quán giữa lời nói và việc làm.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                        <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                        <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">The Pictorial Key to the Tarot (Arthur Edward Waite, 1910)</strong> & <strong className="text-gray-200">Seventy-Eight Degrees of Wisdom (Rachel Pollack)</strong></span>
                      </div>
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
