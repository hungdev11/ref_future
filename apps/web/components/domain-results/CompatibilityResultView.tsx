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
import { Users, Heart, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface CompatibilityResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

export function CompatibilityResultView({
  result,
  className = '',
}: CompatibilityResultViewProps) {
  if (!result) return null;

  const school = result.metadata?.school || 'Multi-System Synthesis';

  const tensions = result.tensions || [];
  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  // Dimensions summary
  const dimensionSet = Array.from(
    new Set(interpretations.map((i) => i.dimension || 'Tương Tác Chung'))
  );

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Relationship Overview */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span>/</span>
          <span>Độ Tương Hợp Đa Hệ Thống</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Tương Quan Hòa Hợp &amp; Động Lực Gắn Kết
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Phân tích tương tác đa chiều giữa hai trường năng lượng: điểm hút tự nhiên, khác biệt bản năng và các kịch bản phối hợp thực tế.
          </p>
        </div>

        {/* Dimension Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-stone mr-2">
            <Users className="w-3.5 h-3.5 text-accentGold" />
            <span>CHIỀU KÍCH:</span>
          </div>
          {dimensionSet.map((dim, idx) => (
            <span
              key={idx}
              className="border border-borderDark bg-surface px-3 py-1 text-xs font-mono text-parchment tracking-wide"
            >
              {dim.toUpperCase()}
            </span>
          ))}
        </div>
      </header>

      {/* 2. Main Story: What Draws The Two Together */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Gắn Kết">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Areas of Natural Support vs Innate Differences (Tensions) */}
      {tensions.length > 0 && (
        <section aria-label="Xung Lực & Điểm Cân Bằng" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">03</span>
            <span className="text-borderLight">/</span>
            <span>ĐIỂM TƯƠNG HỖ TỰ NHIÊN VS MA SÁT BẢN NĂNG (TENSIONS)</span>
          </div>

          <div className="space-y-4">
            {tensions.map((item, idx) => (
              <TensionBlock
                key={idx}
                tension={item}
                title={`Điểm Cân Bằng Trong Tương Tác #${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Deep Interpretations Across Dimensions */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Tương Hợp Chi Tiết" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI ĐA CHIỀU (EMOTIONAL, COMMUNICATION, VALUES)</span>
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

      {/* 5. Real-life Scenarios: Arguments, Finances, Personal Space */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Tương Tác Đời Sống">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="KỊCH BẢN TƯƠNG TÁC ĐỜI SỐNG"
          />
        </section>
      )}

      {/* 6. Principles for Strengthening the Bond */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Nguyên Tắc Bồi Đắp Gắn Kết" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>NGUYÊN TẮC BỒI ĐẮP MỐI QUAN HỆ BỀN CHẶT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>ĐIỂM TỰA GẮN KẾT CẦN DUY TRÌ</span>
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
                  <span>KHÁC BIỆT CẦN THẤU HIỂU &amp; HÓA GIẢI</span>
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
          description="Truy vết tất định 100% qua mô hình đối chiếu chéo các hệ thống chiêm tinh và số học."
        />
        <TechnicalDetails rawResult={result} />
      </section>
    </article>
  );
}
