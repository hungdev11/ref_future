'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  X,
  Eye,
  Layers,
  HelpCircle,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { getTarotCardImageUrl } from '../../lib/tarot-images';

interface CardDetailedInsights {
  beginnerGuide: string;
  arcanaMeaning: string;
  orientationGuide: string;
  coreSummary: string;
  careerFinance: string;
  loveRelationship: string;
  dos: string;
  donts: string;
}

function getDetailedCardInsights(
  cardName: string,
  arcana: string,
  positionName: string,
  isReversed: boolean
): CardDetailedInsights {
  const isMajor = arcana === 'MAJOR';

  const arcanaMeaning = isMajor
    ? 'Bộ Ẩn Chính (Major Arcana) phản ánh các bài học định mệnh lớn, bước ngoặt tâm lý quan trọng và những quy luật tinh thần chi phối đường đời của bạn.'
    : 'Bộ Ẩn Phụ (Minor Arcana) phản ánh các sự kiện đời thường, hoạt động công việc, cảm xúc cụ thể và những tương tác hàng ngày.';

  const orientationGuide = isReversed
    ? 'Lá bài ở chiều NGƯỢC (Reversed): Trong Tarot, lá bài ngược KHÔNG PHẢI là điềm xấu. Nó chỉ ra rằng nguồn năng lượng của lá bài này đang bị cản trở, bị phóng đại quá mức, hoặc đang diễn ra âm thầm trong nội tâm bạn mà bên ngoài chưa thấy rõ.'
    : 'Lá bài ở chiều XUÔI (Upright): Nguồn năng lượng biểu đạt tự nhiên, thuận dòng và rõ ràng nhất. Các yếu tố khách quan đang tương thích tốt với hướng đi hiện tại của bạn.';

  const beginnerGuide = `Tại vị trí "${positionName}": Vị trí này đóng vai trò như một chiếc gương soi chiếu chính xác hoàn cảnh, cảm xúc hoặc động lực thúc đẩy của bạn tại thời điểm này.`;

  if (isReversed) {
    return {
      beginnerGuide,
      arcanaMeaning,
      orientationGuide,
      coreSummary: `Lá ${cardName} xuất hiện ở vị trí Ngược nhắc nhở bạn rằng đang có một sự tắc nghẽn hoặc do dự trong hành động. Bạn có thể đang quá cầu toàn, lo sợ thất bại hoặc chưa chịu buông bỏ định kiến cũ. Đây là lúc tạm dừng lại 1 nhịp để cân chỉnh lại năng lượng nội tại trước khi đưa ra các quyết định hệ trọng.`,
      careerFinance: `Trong công việc, tiến độ có thể bị chậm lại do thiếu thông tin hoặc chưa có tiếng nói chung với đồng nghiệp. Về tài chính, tránh tâm lý nôn nóng hoặc đầu tư vào những kế hoạch chưa được kiểm chứng rõ ràng. Hãy kiểm soát chi tiêu và hoàn thiện các chi tiết nhỏ.`,
      loveRelationship: `Có thể xuất hiện cảm giác xa cách hoặc hiểu lầm do đôi bên ngại chia sẻ thẳng thắn suy nghĩ thật của mình. Hãy dẹp bỏ cái tôi, chủ động lắng nghe với sự bao dung và không vội vàng phán xét đối phương.`,
      dos: 'Dành thời gian tĩnh tâm tự nhìn nhận lại bản thân; kiên nhẫn lắng nghe lời khuyên từ người có kinh nghiệm; rà soát lại kế hoạch từng bước một.',
      donts: 'Tránh hấp tấp ép buộc người khác phải làm theo ý mình; không nên đưa ra quyết định tài chính quan trọng trong trạng thái lo âu.',
    };
  }

  return {
    beginnerGuide,
    arcanaMeaning,
    orientationGuide,
    coreSummary: `Lá ${cardName} ở chiều Xuôi mở ra nguồn năng lượng tích cực, sự hanh thông và cơ hội chuyển mình rõ rệt. Lá bài này khích lệ bạn tiến bước với lòng tin son sắt, phát huy trọn vẹn sự tự chủ và sự chủ động để hiện thực hóa các mong muốn.`,
    careerFinance: `Công việc đang ở chu kỳ thuận lợi để triển khai sáng kiến mới, mở rộng quan hệ hợp tác hoặc đề xuất nâng cao trách nhiệm. Về tài chính, đây là thời điểm tốt để tích lũy hoặc đầu tư nâng cấp kỹ năng chuyên môn dài hạn.`,
    loveRelationship: `Tình cảm hài hòa, ấm áp và có sự đồng điệu sâu sắc về tư tưởng. Nếu đang độc thân, bạn toát ra sức hút tự nhiên rất lớn; nếu đã có đôi, hai bạn cùng nhau xây đắp những mục tiêu tương lai chung vững chắc.`,
    dos: 'Nắm bắt thời cơ khi cơ hội xuất hiện; giữ vững sự chính trực và phong thái tự tin; kết nối cởi mở và chân thành với mọi người.',
    donts: 'Tránh chủ quan ngủ quên trên kết quả ban đầu; không nên vì quá hăng say mà bỏ bê việc chăm sóc sức khỏe và giấc ngủ.',
  };
}

export default function TarotPage() {
  const [spreadCode, setSpreadCode] = useState('SPREAD_3_PPF');
  const [seed, setSeed] = useState(() => `seed_${Math.random().toString(36).substring(2, 10)}`);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal State for clicked card
  const [selectedDraw, setSelectedDraw] = useState<any | null>(null);

  const handleDraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedDraw(null);

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
          <span>Bói Bài Tarot Rider-Waite 78 Lá</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Trải Bài Tarot & Thông Điệp Trực Giác</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Tĩnh tâm, tập trung vào điều bạn đang trăn trở và rút những lá bài chỉ đường. 
          <strong> Nhấn vào từng lá bài để mở lời luận giải chi tiết về công việc, tiền bạc, tình cảm và lời khuyên hành động.</strong>
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
                <option value="SPREAD_1_DAILY">1 Lá: Thông Điệp Trong Ngày</option>
                <option value="SPREAD_3_PPF">3 Lá: Quá Khứ / Hiện Tại / Tương Lai</option>
                <option value="SPREAD_3_SCA">3 Lá: Hoàn Cảnh / Thách Thức / Lời Khuyên</option>
                <option value="SPREAD_5_SCCA_OUTCOME">5 Lá: Phân Tích Toàn Diện 5 Chiều</option>
                <option value="SPREAD_10_CELTIC_CROSS">10 Lá: Thập Tự Celtic (Chuyên Sâu)</option>
              </select>
            </div>

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
                  Rút Bài Tarot Ngay
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

          {/* Quick instructions for beginners */}
          <div className="p-4 rounded-xl bg-background/60 border border-borderDark text-xs text-gray-400 space-y-2">
            <div className="font-semibold text-gray-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
              Hướng Dẫn Người Mới
            </div>
            <p className="leading-relaxed text-[11px]">
              Sau khi nhấn <strong>Rút Bài</strong>, hệ thống sẽ trải các lá bài lên bàn cờ. 
              <strong> Nhấn trực tiếp vào bất kỳ lá bài nào</strong> để mở popup luận giải chi tiết từ việc làm, tài chính cho đến tình cảm.
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <BookOpen className="w-14 h-14 text-gray-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-300">Bàn Trải Bài Đang Chờ Bạn</h3>
                <p className="text-gray-400 text-xs max-w-md mx-auto">
                  Chọn kiểu trải bài phù hợp ở bên trái (1 lá, 3 lá, 5 lá hoặc 10 lá) và nhấn nút Rút Bài để khám phá thông điệp của ngày hôm nay.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Clean verification banner & Layman guide */}
              <div className="p-4 rounded-xl bg-surface border border-rose-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accentGold" />
                  <span className="text-gray-200">
                    Trải bài: <strong className="text-white">{result.metadata.spreadName}</strong> ({result.facts.draws.length} lá)
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px]">
                    👉 Nhấn vào lá bài để mở luận giải Popup
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Bộ bài 78 lá đã sẵn sàng</span>
                </div>
              </div>

              {/* Spread Interactive Cards Grid */}
              <div
                className={`grid gap-5 ${
                  result.facts.draws.length === 1
                    ? 'grid-cols-1 max-w-xs mx-auto'
                    : result.facts.draws.length <= 3
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {result.facts.draws.map((draw: any) => {
                  const imageUrl = getTarotCardImageUrl(draw.card.cardCode);

                  return (
                    <div
                      key={draw.positionIndex}
                      onClick={() => setSelectedDraw(draw)}
                      className="p-5 rounded-2xl bg-surface border border-borderDark space-y-4 flex flex-col justify-between hover:border-accentGold/80 transition-all shadow-lg hover:shadow-accentGold/10 cursor-pointer group hover:-translate-y-1"
                    >
                      {/* Position Title */}
                      <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                        <span className="text-xs font-bold text-gray-300 group-hover:text-accentGold transition-colors">
                          {draw.positionIndex}. {draw.positionName}
                        </span>
                        {draw.isReversed ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                            NGƯỢC
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            XUÔI
                          </span>
                        )}
                      </div>

                      {/* Card Image Display with Flip & Rotation */}
                      <div className="flex justify-center py-2">
                        <div className="relative w-44 aspect-[2/3.4] rounded-xl overflow-hidden border-2 border-amber-500/40 shadow-xl bg-black/60 group-hover:border-accentGold transition-all">
                          <img
                            src={imageUrl}
                            alt={draw.card.name}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                              draw.isReversed ? 'rotate-180' : ''
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                            <span className="text-xs font-bold text-white bg-accentGold/90 text-background px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <Eye className="w-3.5 h-3.5" /> Xem Luận Giải
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Identity & Action Button */}
                      <div className="space-y-2 text-center">
                        <div className="text-lg font-bold text-white group-hover:text-accentGold transition-colors">
                          {draw.card.name}
                        </div>
                        <div className="text-xs text-rose-400 font-medium">
                          {draw.card.arcana === 'MAJOR' ? 'Bộ Ẩn Chính (Major Arcana)' : 'Bộ Ẩn Phụ (Minor Arcana)'}
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDraw(draw);
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-surfaceHover border border-borderDark group-hover:border-accentGold/50 text-xs font-semibold text-gray-200 group-hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-accentGold" />
                            <span>Mở Luận Giải Chi Tiết</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Informative Guidance Footer */}
              <div className="p-4 rounded-xl bg-surfaceHover/50 border border-borderDark flex items-center justify-between text-xs text-gray-400">
                <span>
                  💡 Bạn có thể nhấp vào bất kỳ lá bài nào ở trên để mở bảng phân tích chuyên sâu đa chiều.
                </span>
                <span className="font-mono text-[11px] text-gray-500">
                  {result.facts.draws.length} lá đã kích hoạt
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POPUP / MODAL: COMPREHENSIVE LAYMAN TAROT CARD READING */}
      {selectedDraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-accentGold/50 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accentGold/20 border border-accentGold/40 flex items-center justify-center text-accentGold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-background border border-borderDark text-accentGold font-bold">
                      Vị trí {selectedDraw.positionIndex}: {selectedDraw.positionName}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-bold ${
                        selectedDraw.isReversed
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {selectedDraw.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                    {selectedDraw.card.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedDraw(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
                title="Đóng popup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            {(() => {
              const insights = getDetailedCardInsights(
                selectedDraw.card.name,
                selectedDraw.card.arcana,
                selectedDraw.positionName,
                selectedDraw.isReversed
              );
              const imageUrl = getTarotCardImageUrl(selectedDraw.card.cardCode);

              return (
                <div className="space-y-6">
                  {/* Top Overview: Card Image + Layman Beginners Explanations */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 rounded-2xl bg-background/80 border border-borderDark">
                    <div className="relative w-36 shrink-0 aspect-[2/3.4] rounded-xl overflow-hidden border-2 border-accentGold/50 shadow-2xl bg-black">
                      <img
                        src={imageUrl}
                        alt={selectedDraw.card.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          selectedDraw.isReversed ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div className="space-y-3 flex-1 text-xs">
                      <div className="font-bold text-accentGold text-sm flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        <span>Giải Thích Cho Người Mới Bắt Đầu:</span>
                      </div>

                      <div className="space-y-2 text-gray-300 leading-relaxed">
                        <p>
                          🔹 <strong>Ý nghĩa vị trí:</strong> {insights.beginnerGuide}
                        </p>
                        <p>
                          🔹 <strong>Phân loại bộ bài:</strong> {insights.arcanaMeaning}
                        </p>
                        <p>
                          🔹 <strong>Chiều xuôi / ngược:</strong> {insights.orientationGuide}
                        </p>
                      </div>

                      {/* Keywords Pill List */}
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {selectedDraw.card.keywords.map((kw: string, kidx: number) => (
                          <span
                            key={kidx}
                            className="px-2.5 py-1 rounded-md bg-surface border border-borderDark text-[11px] text-gray-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 1. Core Summary */}
                  <div className="p-5 rounded-2xl bg-surface border border-accentGold/30 space-y-2">
                    <div className="flex items-center gap-2 text-accentGold font-bold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Thông Điệp Cốt Lõi Của Lá Bài Cho Bạn</span>
                    </div>
                    <p className="text-sm text-gray-100 leading-relaxed font-normal">
                      {insights.coreSummary}
                    </p>
                  </div>

                  {/* 2. Career & Love Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
                      <span className="font-bold text-indigo-300 text-sm block">
                        💼 Trong Công Việc, Học Tập & Tài Chính
                      </span>
                      <p className="text-gray-200 leading-relaxed">
                        {insights.careerFinance}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                      <span className="font-bold text-rose-300 text-sm block">
                        ❤️ Trong Tình Cảm & Các Mối Quan Hệ
                      </span>
                      <p className="text-gray-200 leading-relaxed">
                        {insights.loveRelationship}
                      </p>
                    </div>
                  </div>

                  {/* 3. Actionable Do's and Don'ts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                      <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Nên Làm (Lời Khuyên Hành Động)</span>
                      </div>
                      <p className="text-emerald-100 leading-relaxed pl-5">
                        {insights.dos}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                      <div className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Nên Tránh (Cảnh Giác Phòng Ngừa)</span>
                      </div>
                      <p className="text-amber-100 leading-relaxed pl-5">
                        {insights.donts}
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer Close Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedDraw(null)}
                      className="px-6 py-2.5 rounded-xl bg-accentGold text-background font-bold text-xs hover:opacity-90 transition-opacity"
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
