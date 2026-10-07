'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { CardInteractionBlock } from '../primitives/CardInteractionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { NextQuestionBlock } from '../primitives/NextQuestionBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { TechnicalDetails } from '../result/TechnicalDetails';
import { Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface TarotResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const TAROT_CARD_NAMES: Record<string, string> = {
  MAJOR_0: '0 — The Fool (Chàng Khờ)',
  MAJOR_00_FOOL: '0 — The Fool (Chàng Khờ)',
  MAJOR_1: 'I — The Magician (Pháp Sư)',
  MAJOR_01_MAGICIAN: 'I — The Magician (Pháp Sư)',
  MAJOR_2: 'II — The High Priestess (Nữ Giáo Hoàng)',
  MAJOR_02_HIGH_PRIESTESS: 'II — The High Priestess (Nữ Giáo Hoàng)',
  MAJOR_3: 'III — The Empress (Nữ Hoàng)',
  MAJOR_03_EMPRESS: 'III — The Empress (Nữ Hoàng)',
  MAJOR_4: 'IV — The Emperor (Hoàng Đế)',
  MAJOR_04_EMPEROR: 'IV — The Emperor (Hoàng Đế)',
  MAJOR_5: 'V — The Hierophant (Thầy Giáo Hoàng)',
  MAJOR_05_HIEROPHANT: 'V — The Hierophant (Thầy Giáo Hoàng)',
  MAJOR_6: 'VI — The Lovers (Người Tình)',
  MAJOR_06_LOVERS: 'VI — The Lovers (Người Tình)',
  MAJOR_7: 'VII — The Chariot (Cỗ Xe)',
  MAJOR_07_CHARIOT: 'VII — The Chariot (Cỗ Xe)',
  MAJOR_8: 'VIII — Strength (Sức Mạnh)',
  MAJOR_08_STRENGTH: 'VIII — Strength (Sức Mạnh)',
  MAJOR_9: 'IX — The Hermit (Ẩn Sĩ)',
  MAJOR_09_HERMIT: 'IX — The Hermit (Ẩn Sĩ)',
  MAJOR_16: 'XVI — The Tower (Tòa Tháp)',
  MAJOR_16_TOWER: 'XVI — The Tower (Tòa Tháp)',
  PENTACLES_7: '7 of Pentacles',
  MINOR_PENTACLES_7: '7 of Pentacles',
  CUPS_8: '8 of Cups',
  MINOR_CUPS_8: '8 of Cups',
  SWORDS_3: '3 of Swords',
  MINOR_SWORDS_3: '3 of Swords',
  WANDS_1: 'Ace of Wands',
  MINOR_WANDS_1: 'Ace of Wands',
};

function formatCard(val: unknown): string {
  if (typeof val !== 'string') return String(val);
  if (TAROT_CARD_NAMES[val]) return TAROT_CARD_NAMES[val];
  const normalized = val.replace(/^MINOR_/, '');
  if (TAROT_CARD_NAMES[normalized]) return TAROT_CARD_NAMES[normalized];
  return val
    .replace(/^MAJOR_/, 'Major Arcana ')
    .replace(/^MINOR_/, '')
    .replace(/_/g, ' ')
    .trim();
}

export function TarotResultView({
  result,
  className = '',
}: TarotResultViewProps) {
  if (!result) return null;

  const question =
    typeof result.inputSummary?.question === 'string'
      ? result.inputSummary.question
      : null;

  const school = result.metadata?.school || 'Rider-Waite-Smith';

  // Extract card sequence from facts
  const cardFacts = (result.facts || []).filter(
    (f) =>
      f.key === 'cardCode' ||
      f.key.startsWith('card') ||
      f.key.includes('cardName') ||
      f.key.includes('card_')
  );

  const cardSequence =
    cardFacts.length > 0
      ? cardFacts.map((f, idx) => ({
          name: formatCard(f.value),
          role: f.key === 'cardCode' ? `LÁ BÀI 0${idx + 1}` : f.key.toUpperCase(),
          tag: 'LÁ BÀI',
        }))
      : (result.primaryPatterns || []).map((p, idx) => ({
          name: p.headline,
          role: `TRỌNG TÂM 0${idx + 1}`,
          tag: 'HÌNH THÁI',
        }));

  // Map relationships to interactions
  const cardInteractions = (result.relationships || []).map((r) => ({
    source: r.sourceSignalId.replace(/^SIG_CTX_|^SIG_/i, '').replace(/_/g, ' '),
    target: r.targetSignalId.replace(/^SIG_CTX_|^SIG_/i, '').replace(/_/g, ' '),
    type: r.type,
    description: r.description,
    intensity: r.intensity,
  }));

  // Extract reflections / guidance
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  const interpretations = result.deepInterpretations || result.interpretations || [];

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Reading Focus */}
      <header className="border-b border-borderDark pb-6 space-y-4">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">04</span>
          <span>/</span>
          <span>Khảo Cứu Tarot Rider-Waite</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        {question ? (
          <div className="border border-borderDark bg-surface p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-widest">
              <Compass className="w-4 h-4 text-accentGold" />
              <span>TRỌNG TÂM CÂU HỎI &amp; BỐI CẢNH TRẢI BÀI</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-parchment font-medium leading-snug">
              &ldquo;{question}&rdquo;
            </h2>
            <p className="text-xs font-mono text-stone">
              Khảo cứu phân tích tương tác thực thể và diễn tiến mạch truyện dựa trên thư tịch Rider-Waite chuẩn.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
              Khảo Cứu Trọng Tâm Năng Lượng Tarot
            </h1>
            <p className="text-stone text-sm leading-relaxed">
              Phân tích cấu trúc trải bài, tương quan giữa các lá và diễn biến hành động thực tiễn.
            </p>
          </div>
        )}
      </header>

      {/* 2. Main Story Callout */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Trọng Tâm">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Cards in Context & Dynamic Interactions */}
      {(cardSequence.length > 0 || cardInteractions.length > 0) && (
        <section aria-label="Tiến Trình & Tương Tác Các Lá Bài">
          <CardInteractionBlock
            sequence={cardSequence}
            interactions={cardInteractions}
            title="Tiến Trình & Mối Tương Tác Giữa Các Lá Bài"
            subtitle="CHUỖI LIÊN KẾT ĐỘNG TRẢI BÀI"
          />
        </section>
      )}

      {/* 4. Deep Interpretations */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Đa Tầng" className="space-y-4">
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

      {/* 5. Real-life Scenarios */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Thực Tế">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="KỊCH BẢN ĐỜI SỐNG THỰC TẾ"
          />
        </section>
      )}

      {/* 6. Actionable Reflections: Continue vs Adjust */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Định Hướng Hành Động" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">05</span>
            <span className="text-borderLight">/</span>
            <span>ĐỊNH HƯỚNG HÀNH ĐỘNG &amp; THÍCH ỨNG THỰC TIỄN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Continue */}
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>ĐIỂM TỰA DUY TRÌ &amp; PHÁT HUY</span>
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

            {/* Adjust */}
            {adjustItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <AlertTriangle className="w-4 h-4 text-terracotta shrink-0" />
                  <span>ĐIỂM NGHẼN CẦN TIẾT CHẾ &amp; ĐIỀU CHỈNH</span>
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
          description="Truy vết tất định 100% qua 6 tầng lập luận logic và thư tịch cổ Rider-Waite."
        />
        <TechnicalDetails rawResult={result} />
      </section>
    </article>
  );
}
