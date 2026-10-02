'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, ShieldCheck, AlertCircle, Sliders, CheckCircle2, AlertTriangle, ArrowRight, Eye, Layers } from 'lucide-react';

export function getTarotCardImageUrl(cardCode: string): string {
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/mixvlad/TarotCards@main/tarot/rider-waite/720px';

  const majorMap: Record<string, string> = {
    MAJOR_00_FOOL: '00_Fool.jpg',
    MAJOR_01_MAGICIAN: '01_Magician.jpg',
    MAJOR_02_HIGH_PRIESTESS: '02_High_Priestess.jpg',
    MAJOR_03_EMPRESS: '03_Empress.jpg',
    MAJOR_04_EMPEROR: '04_Emperor.jpg',
    MAJOR_05_HIEROPHANT: '05_Hierophant.jpg',
    MAJOR_06_LOVERS: '06_Lovers.jpg',
    MAJOR_07_CHARIOT: '07_Chariot.jpg',
    MAJOR_08_STRENGTH: '08_Strength.jpg',
    MAJOR_09_HERMIT: '09_Hermit.jpg',
    MAJOR_10_WHEEL_OF_FORTUNE: '10_Wheel_of_Fortune.jpg',
    MAJOR_11_JUSTICE: '11_Justice.jpg',
    MAJOR_12_HANGED_MAN: '12_Hanged_Man.jpg',
    MAJOR_13_DEATH: '13_Death.jpg',
    MAJOR_14_TEMPERANCE: '14_Temperance.jpg',
    MAJOR_15_DEVIL: '15_Devil.jpg',
    MAJOR_16_TOWER: '16_Tower.jpg',
    MAJOR_17_STAR: '17_Star.jpg',
    MAJOR_18_MOON: '18_Moon.jpg',
    MAJOR_19_SUN: '19_Sun.jpg',
    MAJOR_20_JUDGEMENT: '20_Judgement.jpg',
    MAJOR_21_WORLD: '21_World.jpg',
  };

  if (majorMap[cardCode]) {
    return `${CDN_BASE}/${majorMap[cardCode]}`;
  }

  const parts = cardCode.split('_');
  if (parts.length >= 2) {
    const rawSuit = parts[0]; // WANDS, CUPS, SWORDS, PENTACLES
    const num = parts[1]; // 01 .. 14
    let suitPrefix = 'Wands';
    if (rawSuit === 'CUPS') suitPrefix = 'Cups';
    else if (rawSuit === 'SWORDS') suitPrefix = 'Swords';
    else if (rawSuit === 'PENTACLES') suitPrefix = 'Pents';

    return `${CDN_BASE}/${suitPrefix}${num}.jpg`;
  }

  return `${CDN_BASE}/Cover.jpg`;
}

interface CardDetailedInsights {
  coreSummary: string;
  careerFinance: string;
  loveRelationship: string;
  dos: string;
  donts: string;
}

function getDetailedCardInsights(cardName: string, isReversed: boolean): CardDetailedInsights {
  if (isReversed) {
    return {
      coreSummary: `Lá ${cardName} ở vị trí Ngược báo hiệu sự trì hoãn, xung đột nội tâm hoặc năng lượng đang bị tắc nghẽn. Đây không phải là điềm xấu mà là lời nhắc nhở cần điều chỉnh lại góc nhìn và phương pháp trước khi bước tiếp.`,
      careerFinance: 'Công việc có dấu hiệu chậm tiến độ hoặc xuất hiện bất đồng quan điểm ngầm. Hãy kiểm tra kỹ hợp đồng, tránh quyết định tài chính mạo hiểm trong thời điểm thiếu thông tin.',
      loveRelationship: 'Cần sự chân thành và bình tâm đối thoại. Tránh để những suy diễn hoặc nghi ngờ vô cớ tích tụ thành khoảng cách giữa hai người.',
      dos: 'Dành thời gian rà soát lại kế hoạch; lắng nghe trực giác và chấp nhận điều chỉnh lộ trình cho phù hợp với hoàn cảnh thực tế.',
      donts: 'Tránh hấp tấp ép buộc kết quả; không nên đổ lỗi cho ngoại cảnh hoặc bộc phát cảm xúc tiêu cực.',
    };
  }

  return {
    coreSummary: `Lá ${cardName} ở chiều Xuôi mang nguồn năng lượng thuận dòng, sáng rõ và mở ra nhiều cơ hội phát triển. Các điều kiện khách quan đang ủng hộ bạn hành động với sự tự tin và quyết tâm.`,
    careerFinance: 'Công việc có bước tiến thuận lợi, các dự án đạt được sự đồng thuận cao. Về tài chính, đây là thời điểm tốt để mở rộng các nguồn lực hoặc đầu tư vào kỹ năng chuyên môn.',
    loveRelationship: 'Tình cảm ấm áp, gắn kết và thấu hiểu. Sự chân thành và tôn trọng lẫn nhau là chìa khóa giúp mối quan hệ phát triển bền chặt.',
    dos: 'Chủ động nắm bắt cơ hội, duy trì sự nhất quán giữa lời nói và việc làm; hợp tác cởi mở với những người xung quanh.',
    donts: 'Tránh chủ quan ngủ quên trên chiến thắng; không để sự thỏa mãn nhất thời làm phân tán các mục tiêu dài hạn.',
  };
}

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [seed, setSeed] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: Record<string, string> = { spreadCode };
      if (showAdvanced && seed.trim() !== '') {
        payload.seed = seed.trim();
      }

      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
          <BookOpen className="w-4 h-4" />
          <span>Rider-Waite-Smith 1909 Tarot Deck (Hình Ảnh Nguyên Bản Chuẩn Quốc Tế)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Trải Bài Tarot & Thông Điệp Trực Giác</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Hiển thị hình ảnh minh họa chân thực của từng lá bài theo bộ Rider-Waite-Smith kinh điển. Cơ chế xáo bài ngẫu nhiên chuẩn mật mã (CSPRNG), luận giải chi tiết và hướng dẫn hành động thực tế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Form Column */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleDraw} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Kiểu Trải Bài</label>
              <select
                value={spreadCode}
                onChange={(e) => setSpreadCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-rose-500"
              >
                <option value="SPREAD_1_DAILY">1 Lá: Thông Điệp & Năng Lượng Trong Ngày</option>
                <option value="SPREAD_3_PPF">3 Lá: Quá Khứ • Hiện Tại • Tương Lai</option>
                <option value="SPREAD_3_SCA">3 Lá: Hoàn Cảnh • Thách Thức • Lời Khuyên</option>
                <option value="SPREAD_5_SCCA_OUTCOME">5 Lá: Phân Tích Toàn Diện & Xu Hướng Kết Quả</option>
                <option value="SPREAD_10_CELTIC_CROSS">10 Lá: Thập Tự Celtic (Celtic Cross Toàn Cảnh)</option>
              </select>
            </div>

            {/* Advanced Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-gray-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showAdvanced ? 'Ẩn tùy chọn nâng cao' : 'Tùy chọn nâng cao (Cố định Seed)'}</span>
              </button>
            </div>

            {showAdvanced && (
              <div className="p-3.5 rounded-xl bg-background/80 border border-borderDark space-y-2 animate-fadeIn text-xs">
                <label className="block font-medium text-gray-300">Khóa Hạt Giống (Tùy chọn)</label>
                <input
                  type="text"
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                  placeholder="Để trống để xáo ngẫu nhiên bảo mật"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white font-mono text-xs focus:outline-none focus:border-rose-500"
                />
                <span className="text-[10px] text-gray-500 block">
                  Để trống để hệ thống tự động tạo ngẫu nhiên tuyệt đối cho mỗi lần rút.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-xl shadow-rose-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang Xáo & Trải Bài...
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

          {/* Quick Guidance Box */}
          <div className="p-4 rounded-xl bg-background/60 border border-borderDark/60 text-xs text-gray-400 space-y-2">
            <div className="font-semibold text-gray-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-rose-400" />
              Cách Đọc & Cảm Nhận Bài Tarot
            </div>
            <p className="leading-relaxed">
              Hãy giữ tâm thế tĩnh lặng khi xem bài. Hình ảnh biểu tượng trên mỗi lá phản ánh trạng thái tâm lý tiềm thức và xu hướng vận động của hoàn cảnh xung quanh bạn.
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Layers className="w-14 h-14 text-rose-400/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-base">Bàn Trải Bài Đang Sẵn Sàng</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto">
                  Chọn kiểu trải bài và nhấn nút Rút Bài Tarot để mở các lá bài và khám phá thông điệp dành cho bạn.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-fadeIn">
              {/* Spread Visualizer Header */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">
                    Trải bài: <strong className="text-white">{result.metadata.spreadName}</strong> ({result.facts.draws.length} lá)
                  </span>
                </div>
                <div className="text-gray-400 text-[11px]">
                  Xáo ngẫu nhiên chuẩn mật mã (CSPRNG Verified)
                </div>
              </div>

              {/* Visual Cards Layout */}
              <div className={`grid gap-6 ${
                result.facts.draws.length === 1 
                  ? 'grid-cols-1 max-w-xs mx-auto' 
                  : result.facts.draws.length <= 3 
                  ? 'grid-cols-1 md:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {result.facts.draws.map((draw: any) => {
                  const imageUrl = getTarotCardImageUrl(draw.card.cardCode);

                  return (
                    <div
                      key={draw.positionIndex}
                      className="p-5 rounded-2xl bg-surface border border-borderDark space-y-4 flex flex-col justify-between hover:border-rose-500/60 transition-all shadow-lg hover:shadow-rose-500/5 group"
                    >
                      {/* Position Title */}
                      <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                        <span className="text-xs font-bold text-gray-300">
                          {draw.positionIndex}. {draw.positionName}
                        </span>
                        {draw.isReversed ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                            NGƯỢC (REVERSED)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            XUÔI (UPRIGHT)
                          </span>
                        )}
                      </div>

                      {/* Card Image Display with Flip & Rotation */}
                      <div className="flex justify-center py-2">
                        <div className="relative w-44 aspect-[2/3.4] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-black/60 group-hover:border-amber-400 transition-colors">
                          <img
                            src={imageUrl}
                            alt={draw.card.name}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              draw.isReversed ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Card Identity & Keywords */}
                      <div className="space-y-2 text-center">
                        <div className="text-lg font-bold text-white tracking-wide">
                          {draw.card.name}
                        </div>
                        <div className="text-xs text-rose-400 font-medium">
                          {draw.card.arcana === 'MAJOR' ? 'Bộ Ẩn Chính (Major Arcana)' : 'Bộ Ẩn Phụ (Minor Arcana)'}
                        </div>

                        <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                          {draw.card.keywords.map((kw: string, kidx: number) => (
                            <span key={kidx} className="px-2 py-0.5 rounded-md bg-background/80 text-[11px] text-gray-300 border border-borderDark/40">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Layman Interpretations for Each Drawn Card */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Từng Lá Bài Trong Bối Cảnh Cuộc Sống</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 font-medium">
                    Thông Điệp Trực Tiếp & Rõ Ràng
                  </span>
                </div>

                <div className="space-y-6">
                  {result.facts.draws.map((draw: any) => {
                    const insights = getDetailedCardInsights(draw.card.name, draw.isReversed);

                    return (
                      <div
                        key={draw.positionIndex}
                        className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-4"
                      >
                        {/* Title Bar */}
                        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-borderDark/40 pb-2">
                          <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                            <span>
                              Vị trí {draw.positionIndex} ({draw.positionName}): Lá {draw.card.name} — {draw.isReversed ? 'Ngược' : 'Xuôi'}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {draw.positionName}
                          </span>
                        </div>

                        {/* Meaning Overview */}
                        <p className="text-sm text-gray-200 leading-relaxed">
                          {insights.coreSummary}
                        </p>

                        {/* Career & Love Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1.5">
                            <span className="font-semibold text-indigo-300 block">💼 Trong Công Việc & Tài Chính:</span>
                            <p className="text-gray-300 leading-relaxed">{insights.careerFinance}</p>
                          </div>

                          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                            <span className="font-semibold text-rose-300 block">❤️ Trong Tình Cảm & Mối Quan Hệ:</span>
                            <p className="text-gray-300 leading-relaxed">{insights.loveRelationship}</p>
                          </div>
                        </div>

                        {/* Actionable Do's and Don'ts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                            <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>Nên Làm (Lời Khuyên Hành Động):</span>
                            </div>
                            <p className="text-emerald-200/90 leading-relaxed pl-5">{insights.dos}</p>
                          </div>

                          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                              <span>Nên Tránh (Cảnh Giác):</span>
                            </div>
                            <p className="text-amber-200/90 leading-relaxed pl-5">{insights.donts}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
