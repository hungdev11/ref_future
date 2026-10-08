'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { humanizeCardCode } from '@mystic/interpretation-engine';
import { PatternStory } from '../primitives/PatternStory';
import { CardInteractionBlock } from '../primitives/CardInteractionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { ResultFooter } from '../primitives/ResultFooter';
import { Compass, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export interface TarotResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

function formatCard(val: unknown): string {
  if (typeof val !== 'string') return String(val);
  const humanized = humanizeCardCode(val);
  return humanized.title;
}

function formatInteractionName(sig: string): string {
  const clean = sig.replace(/^SIG_CTX_|^SIG_/i, '').replace(/_/g, ' ').trim();
  const cardMatch = sig.match(/(MAJOR_\d+|MINOR_[A-Z]+_\d+|[A-Z]+_\d+)/i);
  if (cardMatch) {
    const card = humanizeCardCode(cardMatch[1]);
    return card.nameVn;
  }
  return clean;
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

  // Extract clean card sequence from facts (exclude numeric card_number or meta keys)
  const seenCards = new Set<string>();
  const cardFacts = (result.facts || []).filter((f) => {
    if (typeof f.value !== 'string') return false;
    const str = f.value.toUpperCase();
    if (!str.startsWith('MAJOR_') && !str.startsWith('MINOR_') && !str.includes('_')) return false;
    if (f.key.includes('card_number') || f.key.includes('deck')) return false;
    if (seenCards.has(str)) return false;
    seenCards.add(str);
    return true;
  });

  const SPREAD_ROLES = ['QUÁ KHỨ (CỘI NGUỒN)', 'HIỆN TẠI (ĐIỂM TỰA)', 'XU HƯỚNG TƯƠNG LAI', 'CĂN NGUYÊN', 'KẾT QUẢ'];

  const isCardReversed = (idx: number, factKey: string) => {
    const revFact = (result.facts || []).find(
      (f) =>
        (f.key === `draw_${idx}_reversed` || f.key === `${factKey}_reversed` || f.key.includes(`rev_${idx}`)) &&
        (f.value === true || f.value === 'true')
    );
    return Boolean(revFact);
  };

  const cardSequence =
    cardFacts.length > 0
      ? cardFacts.map((f, idx) => {
          const rev = isCardReversed(idx, f.key);
          const orientationLabel = rev ? ' [Ngược]' : ' [Xuôi]';
          return {
            name: `${formatCard(f.value)}${orientationLabel}`,
            role: SPREAD_ROLES[idx] || `LÁ BÀI 0${idx + 1}`,
            tag: rev ? 'CHIỀU NGƯỢC' : 'CHIỀU XUÔI',
          };
        })
      : (result.primaryPatterns || []).map((p, idx) => ({
          name: p.headline,
          role: `TRỌNG TÂM 0${idx + 1}`,
          tag: 'HÌNH THÁI',
        }));

  // Map relationships to interactions using clear card labels
  const cardInteractions = (result.relationships || []).map((r, idx) => {
    const cardA = cardSequence[idx]?.name || 'Lá Bài Khởi Đầu';
    const cardB = cardSequence[idx + 1]?.name || 'Lá Bài Chuyển Tiếp';
    return {
      source: cardA.split('(')[0]?.trim() || cardA,
      target: cardB.split('(')[0]?.trim() || cardB,
      type: r.type,
      description: r.description,
      intensity: r.intensity,
    };
  });

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

        {/* Thông Điệp Chính (Main Answer / Message, Spec 49) */}
        {result.primaryResult && (
          <div className="border border-borderDark bg-surface p-5 sm:p-6 space-y-1.5 border-l-2 border-l-accentGold">
            <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block font-medium">
              THÔNG ĐIỆP CHÍNH (CORE MESSAGE)
            </span>
            <p className="font-serif text-base sm:text-lg text-parchment leading-relaxed font-normal">
              {result.primaryResult}
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

      {/* 6.5. Điều Đáng Suy Ngẫm (Reflection Questions, Spec 53) */}
      <section aria-label="Điều Đáng Suy Ngẫm" className="border border-borderDark bg-surface p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-widest uppercase border-b border-borderDark/60 pb-3">
          <HelpCircle className="w-4 h-4 text-accentGold" />
          <span>ĐIỀU ĐÁNG SUY NGẪM (REFLECTION)</span>
        </div>
        <div className="space-y-3">
          {(result.nextQuestions && result.nextQuestions.length > 0) ? (
            result.nextQuestions.map((q, idx) => {
              const qText = typeof q === 'string' ? q : (q as any)?.question || '';
              return (
                <div key={idx} className="border-l-2 border-borderLight pl-4 py-1">
                  <p className="font-serif text-base text-parchment/95 italic">
                    &ldquo;{qText}&rdquo;
                  </p>
                </div>
              );
            })
          ) : (
            <div className="border-l-2 border-borderLight pl-4 py-1">
              <p className="font-serif text-base text-parchment/95 italic">
                &ldquo;Bạn đang tiếp tục vì thực sự còn tiềm năng phát triển, hay chỉ vì quán tính của những nỗ lực đã đầu tư trước đây?&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 7. Progressive Disclosure */}
      <section aria-label="Minh Bạch Suy Luận" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết logic tất định 100% qua các lá bài thực tế và thư tịch kinh điển Rider-Waite 1911."
        />
      </section>

      {/* 8. Result Footer */}
      <ResultFooter
        topic="Khảo Cứu Bói Bài Tarot 78 Lá"
        exploreLinks={[
          { label: 'Khảo Cứu Tử Vi Đẩu Số 12 Cung', href: '/tu-vi' },
          { label: 'Khảo Cứu Chiêm Tinh Bản Đồ Sao', href: '/astrology' },
          { label: 'Khảo Cứu Thần Số Học Pythagoras', href: '/numerology' },
        ]}
      />
    </article>
  );
}
