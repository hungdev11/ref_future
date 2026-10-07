'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { TensionBlock } from '../primitives/TensionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { NextQuestionBlock } from '../primitives/NextQuestionBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { TechnicalDetails } from '../result/TechnicalDetails';
import { Sparkles, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface NumerologyResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const NUMBER_LABELS: Record<string, string> = {
  lifePathNumber: 'SỐ ĐƯỜNG ĐỜI (LIFE PATH)',
  lifePath: 'SỐ ĐƯỜNG ĐỜI (LIFE PATH)',
  destinyNumber: 'SỐ SỨ MỆNH (DESTINY)',
  destiny: 'SỐ SỨ MỆNH (DESTINY)',
  soulUrgeNumber: 'SỐ LINH HỒN (SOUL URGE)',
  soulNumber: 'SỐ LINH HỒN (SOUL URGE)',
  soul: 'SỐ LINH HỒN (SOUL URGE)',
  personalityNumber: 'SỐ TÍNH CÁCH (PERSONALITY)',
  personality: 'SỐ TÍNH CÁCH (PERSONALITY)',
  attitudeNumber: 'SỐ THÁI ĐỘ (ATTITUDE)',
  birthDayNumber: 'SỐ NGÀY SINH (BIRTHDAY)',
  maturityNumber: 'SỐ TRƯỞNG THÀNH (MATURITY)',
  personalYear: 'NĂM CÁ NHÂN (PERSONAL YEAR)',
  currentYear: 'NĂM HIỆN TẠI',
};

export function NumerologyResultView({
  result,
  className = '',
}: NumerologyResultViewProps) {
  if (!result) return null;

  const school = result.metadata?.school || 'Pythagorean System';

  // Extract core numbers from facts
  const coreNumberFacts = (result.facts || []).filter((f) => {
    const k = f.key.toLowerCase();
    return (
      k.includes('number') ||
      k.includes('lifepath') ||
      k.includes('destiny') ||
      k.includes('soul') ||
      k.includes('year') ||
      typeof f.value === 'number'
    );
  });

  const cycleFact = (result.facts || []).find((f) =>
    f.key.toLowerCase().includes('year') || f.key.toLowerCase().includes('cycle')
  );

  const tensions = result.tensions || [];
  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Core Profile */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">03</span>
          <span>/</span>
          <span>Thần Số Học Pythagoras</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Chân Dung Năng Lượng &amp; Các Con Số Chủ Đạo
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Khảo cứu cấu trúc rung động số học Pythagoras: sự giao thoa giữa bài học đường đời, động lực nội tâm và chu kỳ thời gian.
          </p>
        </div>

        {/* Core Numbers Badges Grid */}
        {coreNumberFacts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
            {coreNumberFacts.map((fact, idx) => (
              <div
                key={idx}
                className="border border-borderDark bg-surface p-4 text-center space-y-1 rounded-none hover:border-accentGold/40 transition-colors"
              >
                <span className="font-mono text-[10px] text-stone tracking-wider block truncate">
                  {NUMBER_LABELS[fact.key] || fact.key.toUpperCase()}
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-accentGold font-normal block">
                  {String(fact.value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* 2. Main Story Callout */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Năng Lượng">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Number Interaction & Internal Polarization (Tensions) */}
      {tensions.length > 0 && (
        <section aria-label="Tương Tác Số Học & Phân Cực" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">02</span>
            <span className="text-borderLight">/</span>
            <span>TƯƠNG TÁC SỐ HỌC &amp; SỰ GIẰNG CO NỘI TÂM (TENSIONS)</span>
          </div>

          <div className="space-y-4">
            {tensions.map((item, idx) => (
              <TensionBlock
                key={idx}
                tension={item}
                title={`Xung Lực &amp; Điểm Cân Bằng Giữa Các Con Số #${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Current Cycle & Period Context */}
      {cycleFact && (
        <section aria-label="Chu Kỳ & Thời Điểm" className="border border-borderDark bg-surface p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-widest uppercase">
            <Calendar className="w-4 h-4 text-accentGold" />
            <span>CHU KỲ VẬN THỜI &amp; BỐI CẢNH HIỆN TẠI</span>
          </div>
          <h3 className="text-lg font-serif text-parchment font-medium">
            Thời Điểm Kích Hoạt Năng Lượng: {String(cycleFact.value)}
          </h3>
          <p className="text-stone text-sm leading-relaxed">
            Thời điểm này đòi hỏi sự định hướng hành vi tương ứng với nhịp điệu của chu kỳ, tránh đối đầu trực diện với quán tính năng lượng đương thời.
          </p>
        </section>
      )}

      {/* 5. Deep Interpretations */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Số Học Chi Tiết" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI CHUYÊN SÂU THEO TẦNG ĐỘ SÂU</span>
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

      {/* 6. Real-life Application & Scenarios */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Thực Tiễn">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="ỨNG DỤNG THỰC TIỄN &amp; KỊCH BẢN ĐỜI THƯỜNG"
          />
        </section>
      )}

      {/* 7. Actionable Guidance */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Định Hướng Phát Triển" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>ĐỊNH HƯỚNG TỐI ƯU HÓA TIỀM NĂNG</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>TIẾP TỤC BỒI ĐẮP &amp; PHÁT HUY</span>
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
                  <span>BÀI HỌC CẦN TIẾT CHẾ &amp; CHUYỂN HÓA</span>
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

      {/* 8. Next Question Suggestions */}
      {result.nextQuestions && result.nextQuestions.length > 0 && (
        <section aria-label="Gợi Ý Khảo Cứu Tiếp Theo">
          <NextQuestionBlock questions={result.nextQuestions} />
        </section>
      )}

      {/* 9. Progressive Disclosure */}
      <section aria-label="Minh Bạch & Kỹ Thuật" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết tất định 100% qua công thức số học Pythagoras và thư tịch chuẩn."
        />
        <TechnicalDetails rawResult={result} />
      </section>
    </article>
  );
}
