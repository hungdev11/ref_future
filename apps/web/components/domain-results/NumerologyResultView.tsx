'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { TensionBlock } from '../primitives/TensionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { ResultFooter } from '../primitives/ResultFooter';
import { Sparkles, Calendar, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export interface NumerologyResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const NUMBER_LABELS: Record<string, { vn: string; en: string }> = {
  lifepath: { vn: 'SỐ ĐƯỜNG ĐỜI', en: 'LIFE PATH' },
  lifepathnumber: { vn: 'SỐ ĐƯỜNG ĐỜI', en: 'LIFE PATH' },
  destiny: { vn: 'SỐ SỨ MỆNH', en: 'DESTINY' },
  destinynumber: { vn: 'SỐ SỨ MỆNH', en: 'DESTINY' },
  soul: { vn: 'SỐ LINH HỒN', en: 'SOUL URGE' },
  soulnumber: { vn: 'SỐ LINH HỒN', en: 'SOUL URGE' },
  soulurge: { vn: 'SỐ LINH HỒN', en: 'SOUL URGE' },
  soulurgenumber: { vn: 'SỐ LINH HỒN', en: 'SOUL URGE' },
  personality: { vn: 'SỐ TÍNH CÁCH', en: 'PERSONALITY' },
  personalitynumber: { vn: 'SỐ TÍNH CÁCH', en: 'PERSONALITY' },
  maturity: { vn: 'SỐ TRƯỞNG THÀNH', en: 'MATURITY' },
  maturitynumber: { vn: 'SỐ TRƯỞNG THÀNH', en: 'MATURITY' },
  personalyear: { vn: 'NĂM CÁ NHÂN', en: 'PERSONAL YEAR' },
  attitude: { vn: 'SỐ THÁI ĐỘ', en: 'ATTITUDE' },
  birthday: { vn: 'SỐ NGÀY SINH', en: 'BIRTHDAY' },
};

const ALLOWED_CORE_KEYS = new Set([
  'lifepath', 'lifepathnumber', 'destiny', 'destinynumber',
  'soul', 'soulnumber', 'soulurge', 'soulurgenumber',
  'personality', 'personalitynumber', 'maturity', 'maturitynumber',
  'personalyear'
]);

function normalizeKey(key: string): string {
  return key
    .replace(/^(results|numerology)\./i, '')
    .replace(/^(core|cycles)\./i, '')
    .replace(/\.(finalValue|value)$/i, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

function getSimplifiedKey(rawKey: string): string {
  const norm = normalizeKey(rawKey);
  if (norm.startsWith('lifepath')) return 'lifepath';
  if (norm.startsWith('destiny')) return 'destiny';
  if (norm.startsWith('soul')) return 'soul';
  if (norm.startsWith('personality')) return 'personality';
  if (norm.startsWith('maturity')) return 'maturity';
  if (norm.startsWith('personalyear')) return 'personalyear';
  return norm;
}

function getNumberLabel(key: string): { vn: string; en: string } {
  const simplified = getSimplifiedKey(key);
  if (NUMBER_LABELS[simplified]) return NUMBER_LABELS[simplified];
  const norm = normalizeKey(key);
  if (NUMBER_LABELS[norm]) return NUMBER_LABELS[norm];
  return { vn: key.replace(/_/g, ' ').toUpperCase(), en: 'Core' };
}

export function NumerologyResultView({
  result,
  className = '',
}: NumerologyResultViewProps) {
  if (!result) return null;

  const school = result.metadata?.school || 'Pythagorean System';

  // Extract core numbers from facts and deduplicate by simplified key name
  const seenKeys = new Set<string>();
  const coreNumberFacts = (result.facts || []).filter((f) => {
    if (typeof f.value !== 'number') return false;
    const rawK = f.key.toLowerCase().replace(/[^a-z]/g, '');
    const normK = normalizeKey(f.key);
    if (!ALLOWED_CORE_KEYS.has(normK) && !ALLOWED_CORE_KEYS.has(rawK)) return false;
    const simplified = getSimplifiedKey(f.key);
    if (seenKeys.has(simplified)) return false;
    seenKeys.add(simplified);
    return true;
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
            Hồ Sơ Thần Số Học Pythagoras
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Khảo cứu cấu trúc rung động số học: sự giao thoa giữa bài học đường đời, động lực nội tâm và chu kỳ thời gian.
          </p>
        </div>

        {/* Điểm nổi bật nhất (Primary reading / Main theme) */}
        {result.primaryResult && (
          <div className="border border-borderDark bg-surface p-5 space-y-1.5 border-l-2 border-l-accentGold">
            <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block font-medium">
              ĐIỂM NỔI BẬT NHẤT (PRIMARY PROFILE READING)
            </span>
            <p className="font-serif text-base sm:text-lg text-parchment font-normal leading-relaxed">
              {result.primaryResult}
            </p>
          </div>
        )}

        {/* Core Numbers Badges Grid (Evidence Layer) */}
        {coreNumberFacts.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">
              CƠ SỞ CHỈ SỐ CỐT LÕI (EVIDENCE LAYER)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {coreNumberFacts.map((fact, idx) => {
                const labelInfo = getNumberLabel(fact.key);
                return (
                  <div
                    key={idx}
                    className="border border-borderDark bg-surface p-4 text-center space-y-1.5 rounded-none hover:border-accentGold/40 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-0.5 min-h-[34px] flex flex-col justify-center">
                      <span className="font-mono text-[10px] text-accentGold tracking-wider block font-medium leading-tight">
                        {labelInfo.vn} ({labelInfo.en})
                      </span>
                    </div>
                    <span className="font-serif text-2xl sm:text-3xl text-parchment font-normal block pt-1">
                      {String(fact.value)}
                    </span>
                  </div>
                );
              })}
            </div>
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
            <span>TƯƠNG TÁC SỐ HỌC &amp; SỰ GIẰNG CO NỘI TÂM</span>
          </div>

          <div className="space-y-4">
            {tensions.map((item, idx) => (
              <TensionBlock
                key={idx}
                tension={item}
                title={`Xung Lực & Điểm Cân Bằng Giữa Các Con Số #${idx + 1}`}
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
            title="ỨNG DỤNG THỰC TIỄN & KỊCH BẢN ĐỜI THƯỜNG"
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

      {/* 8. Progressive Disclosure */}
      <section aria-label="Minh Bạch Suy Luận" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết logic tất định 100% qua công thức số học Pythagoras và thư tịch nguyên bản."
        />
      </section>

      {/* 9. Result Footer */}
      <ResultFooter
        topic="Thần Số Học Pythagoras"
        exploreLinks={[
          { label: 'Khảo Cứu Tử Vi Đẩu Số 12 Cung', href: '/tu-vi' },
          { label: 'Khảo Cứu Chiêm Tinh Bản Đồ Sao', href: '/astrology' },
          { label: 'Khảo Cứu Bói Bài Tarot 78 Lá', href: '/tarot' },
        ]}
      />
    </article>
  );
}
