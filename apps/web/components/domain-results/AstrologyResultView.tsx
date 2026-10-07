'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { NextQuestionBlock } from '../primitives/NextQuestionBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { TechnicalDetails } from '../result/TechnicalDetails';
import { Sun, Moon, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface AstrologyResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

export function AstrologyResultView({
  result,
  className = '',
}: AstrologyResultViewProps) {
  if (!result) return null;

  const school = result.metadata?.school || 'Modern Humanistic Astrology';

  // Extract Big Three and key astrological factors from facts
  const sunSign = (result.facts || []).find(
    (f) => f.key.includes('sun.sign') || f.key === 'sun' || f.key === 'sunSign'
  )?.value;

  const moonSign = (result.facts || []).find(
    (f) => f.key.includes('moon.sign') || f.key === 'moon' || f.key === 'moonSign'
  )?.value;

  const ascendant = (result.facts || []).find(
    (f) =>
      (f.key.toLowerCase().includes('ascendant') ||
        f.key.toLowerCase().includes('rising') ||
        f.key.toLowerCase() === 'asc') &&
      (f.key.toLowerCase().includes('sign') || typeof f.value === 'string') &&
      typeof f.value !== 'number'
  )?.value;

  const hasBigThree = Boolean(sunSign || moonSign || ascendant);

  const aspectRelationships = (result.relationships || []).filter(
    (r) =>
      r.type === 'contrast' ||
      r.type === 'tension' ||
      r.type === 'reinforcement' ||
      r.type === 'amplification'
  );

  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Chart Signature */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">01</span>
          <span>/</span>
          <span>Bản Đồ Sao Chiêm Tinh Học</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Dấu Ấn Bản Đồ Sao &amp; Động Lực Chiêm Tinh
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Phân tích trường năng lượng thiên văn: cấu trúc bộ ba nhân cách, các góc chiếu trọng tâm và vùng đời sống được kích hoạt mạnh mẽ.
          </p>
        </div>

        {/* Big Three Badges */}
        {hasBigThree && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="border border-borderDark bg-surface p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-accentGold uppercase tracking-wider">
                <Sun className="w-3.5 h-3.5 text-accentGold shrink-0" />
                <span>MẶT TRỜI (SUN)</span>
              </div>
              <span className="font-serif text-lg sm:text-xl text-parchment block">
                {String(sunSign || 'Chưa xác định')}
              </span>
              <span className="font-mono text-[10px] text-stone block">Bản thể &amp; Ý chí</span>
            </div>

            <div className="border border-borderDark bg-surface p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-stone uppercase tracking-wider">
                <Moon className="w-3.5 h-3.5 text-stone shrink-0" />
                <span>MẶT TRĂNG (MOON)</span>
              </div>
              <span className="font-serif text-lg sm:text-xl text-parchment block">
                {String(moonSign || 'Chưa xác định')}
              </span>
              <span className="font-mono text-[10px] text-stone block">Nhu cầu cảm xúc</span>
            </div>

            <div className="border border-borderDark bg-surface p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono text-stone uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-stone shrink-0" />
                <span>CUNG MỌC (RISING)</span>
              </div>
              <span className="font-serif text-lg sm:text-xl text-parchment block">
                {String(ascendant || 'Chưa xác định')}
              </span>
              <span className="font-mono text-[10px] text-stone block">Phong thái &amp; Cửa ngõ</span>
            </div>
          </div>
        )}
      </header>

      {/* 2. Big Three Dynamics & Main Story */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Năng Lượng Chiêm Tinh">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Key Ranked Aspects & Energy Interplay */}
      {aspectRelationships.length > 0 && (
        <section aria-label="Góc Hợp & Tương Quan Chiếu Mệnh" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">03</span>
            <span className="text-borderLight">/</span>
            <span>CÁC GÓC HỢP TRỌNG YẾU (RANKED ASPECTS &amp; DYNAMICS)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aspectRelationships.map((r, idx) => (
              <div
                key={idx}
                className="border border-borderDark bg-surface p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono border-b border-borderDark/60 pb-2">
                  <span className="text-parchment">
                    {r.sourceSignalId.replace(/^SIG_CTX_|^SIG_/i, '').replace(/_/g, ' ')}
                  </span>
                  <span className="text-accentGold uppercase">[{r.type}]</span>
                </div>
                <p className="text-sm font-sans text-stone leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Deep Interpretations */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Chiêm Tinh Sâu Sắc" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI ĐA TẦNG CHI TIẾT (DEEP INTERPRETATIONS)</span>
          </div>

          <div className="space-y-4">
            {interpretations.map((interp, idx) => (
              <InsightBlock
                key={interp.interpretationId || idx}
                depth={('depth' in interp ? (interp as any).depth : 'DEPTH_3')}
                headline={interp.headline}
                statement={interp.statement}
                explanation={('explanation' in interp ? (interp as any).explanation : undefined)}
                constructiveExpression={('constructiveExpression' in interp ? (interp as any).constructiveExpression : undefined)}
                tension={('tension' in interp ? (interp as any).tension : undefined)}
                polarity={interp.polarity}
                dimension={interp.dimension}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Timing & Practical Implications (Scenarios) */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Hệ Quả Thực Tiễn">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="HỆ QUẢ ĐỜI THƯỜNG &amp; KHUNG THỜI GIAN KÍCH HOẠT"
          />
        </section>
      )}

      {/* 6. Guidance: Continue vs Adjust */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Định Hướng Chuyển Hóa" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>ĐỊNH HƯỚNG CÂN BẰNG NĂNG LƯỢNG BẢN ĐỒ SAO</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>DÒNG CHẢY HỖ TRỢ NÊN PHÁT HUY</span>
                </div>
                <ul className="space-y-2 text-sm text-parchment/90 font-sans list-none">
                  {continueItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accentGold select-none pt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {adjustItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <AlertTriangle className="w-4 h-4 text-terracotta shrink-0" />
                  <span>XUNG LỰC CẦN HÓA GIẢI &amp; CHUYỂN HÓA</span>
                </div>
                <ul className="space-y-2 text-sm text-parchment/90 font-sans list-none">
                  {adjustItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-terracotta select-none pt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Next Question Suggestions */}
      {result.nextQuestions && result.nextQuestions.length > 0 && (
        <section aria-label="Gợi Ý Khảo Cứu Tiếp Theo">
          <NextQuestionBlock questions={result.nextQuestions} />
        </section>
      )}

      {/* 8. Progressive Disclosure */}
      <section aria-label="Minh Bạch & Kỹ Thuật" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết tất định 100% qua tọa độ thiên văn ephemeris và thư tịch chiêm tinh học cổ điển."
        />
        <TechnicalDetails rawResult={result} />
      </section>
    </article>
  );
}
