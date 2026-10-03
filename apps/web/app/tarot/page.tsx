'use client';

import React, { useState } from 'react';
import {
  AlertCircle,
  X,
  HelpCircle,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
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
    ? 'Lá bài ở chiều NGƯỢC (Reversed): Trong Tarot, lá bài ngược không phải là điềm xấu. Nó chỉ ra rằng nguồn năng lượng của lá bài này đang bị cản trở, bị phóng đại quá mức, hoặc đang diễn ra âm thầm trong nội tâm bạn mà bên ngoài chưa thấy rõ.'
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
            // Suit distribution
            const suitCount: Record<string, number> = { MAJOR: 0, WANDS: 0, CUPS: 0, SWORDS: 0, PENTACLES: 0 };
            draws.forEach((d: any) => {
              const suit = d.card.arcana === 'MAJOR' ? 'MAJOR' : (d.card.suit ?? 'WANDS');
              suitCount[suit] = (suitCount[suit] ?? 0) + 1;
            });
            const reversedCount = draws.filter((d: any) => d.isReversed).length;
            const total = draws.length;
            // Dominant energy
            const sortedSuits = Object.entries(suitCount)
              .filter(([, v]) => v > 0)
              .sort(([, a], [, b]) => b - a);
            const dominant = sortedSuits[0]?.[0] ?? 'MAJOR';
            const suitNames: Record<string, string> = {
              MAJOR: 'Bộ Ẩn Chính (Arcana Lớn)',
              WANDS: 'Gậy — Hành Động & Đam Mê',
              CUPS: 'Chén — Cảm Xúc & Quan Hệ',
              SWORDS: 'Kiếm — Tư Duy & Xung Đột',
              PENTACLES: 'Đồng Tiền — Tài Chính & Vật Chất',
            };
            const dominantLabel = suitNames[dominant] ?? dominant;
            const suitColors: Record<string, string> = {
              MAJOR: 'text-accentGold',
              WANDS: 'text-orange-400',
              CUPS: 'text-blue-400',
              SWORDS: 'text-stone',
              PENTACLES: 'text-emerald-400',
            };
            // Narrative thread
            const positions = draws.map((d: any) => d.position?.name ?? '').filter(Boolean);
            const cardNames = draws.map((d: any) => d.card.namePrimary ?? d.card.name ?? '');
            const reversedRatio = reversedCount / total;
            let narrativeTone = '';
            if (reversedRatio >= 0.6) {
              narrativeTone = 'Tỷ lệ lá ngược cao cho thấy năng lượng đang bị chặn hoặc trì hoãn. Đây không phải điềm xấu — mà là tín hiệu để dừng lại, nhìn vào và điều chỉnh hướng đi trước khi tiến thêm.';
            } else if (reversedRatio <= 0.2) {
              narrativeTone = 'Phần lớn lá bài xuôi, năng lượng đang chảy thông suốt. Đây là thời điểm thuận lợi để hành động theo những thông điệp mà bộ bài đang chỉ ra.';
            } else {
              narrativeTone = 'Sự pha trộn giữa lá xuôi và lá ngược phản ánh một tình huống đang chuyển đổi — có những cánh cửa đang mở, có những phần vẫn cần thêm công sức để giải phóng.';
            }
            const energyDiagnosis = dominant === 'MAJOR'
              ? 'Bộ Ẩn Chính chiếm ưu thế: tình huống của bạn đang bị tác động bởi những lực lượng lớn hơn — giai đoạn biến đổi căn bản về nhân sinh và số phận, không chỉ là vấn đề hàng ngày.'
              : dominant === 'CUPS'
              ? 'Bộ Chén chiếm ưu thế: lõi của tình huống này là cảm xúc, quan hệ và thế giới nội tâm. Câu trả lời cần được tìm kiếm ở cấp độ cảm giác, không chỉ hành động.'
              : dominant === 'WANDS'
              ? 'Bộ Gậy chiếm ưu thế: năng lượng hành động và đam mê đang mạnh. Bạn đang trong giai đoạn khởi xướng — hãy để cảm hứng dẫn đường nhưng đừng để nó vượt quá kiểm soát.'
              : dominant === 'SWORDS'
              ? 'Bộ Kiếm chiếm ưu thế: tư duy, xung đột và quyết định đang ở trung tâm. Câu hỏi quan trọng là: bạn đang chiến đấu với hoàn cảnh bên ngoài, hay với chính mình?'
              : 'Bộ Đồng Tiền chiếm ưu thế: tài chính, sức khỏe và các nhu cầu vật chất đang là trọng tâm. Đây là lúc nhìn vào những gì cụ thể và hữu hình trong cuộc sống.';

            return (
              <div className="p-5 space-y-6 bg-background border-t border-accentGold/30">
                {/* Suit Distribution */}
                <div className="space-y-3">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Phân Bổ Năng Lượng
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
                  <p className="text-stone text-[11px] leading-relaxed">{energyDiagnosis}</p>
                </div>

                {/* Narrative Thread */}
                <div className="space-y-3">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Mạch Câu Chuyện Xuyên Suốt
                  </span>
                  <div className="p-3 bg-surface border border-borderDark">
                    <p className="text-stone text-[11px] leading-relaxed">{narrativeTone}</p>
                  </div>
                  <div className="p-3 bg-surface border border-accentGold/20 space-y-1">
                    <span className="font-mono text-accentGold text-[10px] uppercase tracking-wider block">Năng Lượng Chủ Đạo</span>
                    <p className={`text-[11px] font-mono ${suitColors[dominant] ?? 'text-stone'}`}>{dominantLabel}</p>
                  </div>
                </div>

                {/* Strategy */}
                <div className="space-y-2">
                  <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                    Thông Điệp Hành Động
                  </span>
                  <div className="p-3.5 bg-surface border border-borderDark">
                    <p className="text-stone text-[11px] leading-relaxed">
                      Bộ bài này không cho bạn câu trả lời — nó giúp bạn nhìn thấy những gì đang thực sự xảy ra bên trong
                      và bên ngoài mình. Các lá bài {positions.length > 0 ? `ở vị trí ${positions.slice(0, 3).join(', ')}` : 'trong trải bài này'} đang
                      phác thảo một bức tranh nhất quán: hãy chú ý đến lá bài mà bạn phản ứng mạnh nhất — đó thường là
                      nơi câu trả lời thật sự đang ẩn.
                    </p>
                  </div>
                  <div className="p-3 bg-surface border border-accentGold/40 text-center">
                    <p className="text-parchment text-[11px] italic">
                      "Tarot không tiên đoán tương lai — nó chiếu sáng những gì bạn đang mang trong mình."
                    </p>
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
              const insights = getDetailedCardInsights(
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
