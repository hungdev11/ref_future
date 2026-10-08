'use client';

import React, { useState } from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { TensionBlock } from '../primitives/TensionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { ResultFooter } from '../primitives/ResultFooter';
import { NumberDetailSheet, type NumberDetail } from '../primitives/NumberDetailSheet';
import { Sparkles, Calendar, CheckCircle2, AlertTriangle, Layers, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [selectedNumber, setSelectedNumber] = useState<NumberDetail | null>(null);
  const [isNumberSheetOpen, setIsNumberSheetOpen] = useState(false);
  const [selectedCyclePhase, setSelectedCyclePhase] = useState<number>(1);
  const [techOpen, setTechOpen] = useState(false);

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

  const openNumberDetail = (fact: (typeof coreNumberFacts)[0]) => {
    const labelInfo = getNumberLabel(fact.key);
    const num = Number(fact.value);
    const ROLES: Record<string, string> = {
      lifepath: 'Bài học tiến hóa cốt tủy, sứ mệnh xuyên suốt và con đường phát triển nhân cách căn bản.',
      destiny: 'Phương thức biểu đạt tiềm năng ra thế giới thực, công cụ hành động và mục đích cuộc đời.',
      soul: 'Động lực sâu kín nhất trong tâm khảm, khao khát nội tại thúc đẩy mọi lựa chọn quan trọng.',
      personality: 'Ấn tượng đầu tiên và phong cách tiếp cận người khác trong môi trường xã hội.',
      maturity: 'Năng lượng nở rộ từ trung niên, hướng cuộc đời về đích đến trưởng thành viên mãn.',
      personalyear: 'Nhịp điệu rung động chi phối 12 tháng hiện tại, mở ra cơ hội và thách thức cụ thể.',
    };
    const simplified = getSimplifiedKey(fact.key);
    setSelectedNumber({
      numberValue: fact.value as number,
      nameVn: labelInfo.vn,
      nameEn: labelInfo.en,
      role: ROLES[simplified] || 'Chỉ số định hình trường năng lượng cá nhân.',
      calculationMethod: `Rút gọn tổng các con số theo hệ số Pythagoras chuẩn tắc.`,
      profileMeaning: `Con số ${num} mang rung động đặc trưng, giữ vai trò quan trọng trong bản đồ rung động này.`,
    });
    setIsNumberSheetOpen(true);
  };

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

        {/* Core Numbers Badges Grid (Evidence Layer - Clickable for Detail Sheet) */}
        {coreNumberFacts.length > 0 && (
          <div className="space-y-2 pt-1">
            <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">
              CƠ SỞ CHỈ SỐ CỐT LÕI (CLICK ĐỂ XEM CHI TIẾT)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {coreNumberFacts.map((fact, idx) => {
                const labelInfo = getNumberLabel(fact.key);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => openNumberDetail(fact)}
                    className="border border-borderDark bg-surface p-4 text-center space-y-1.5 rounded-none hover:border-accentGold transition-colors flex flex-col justify-between cursor-pointer group text-left"
                  >
                    <div className="space-y-0.5 min-h-[34px] flex flex-col justify-center">
                      <span className="font-mono text-[10px] text-accentGold tracking-wider block font-medium leading-tight group-hover:underline">
                        {labelInfo.vn} ({labelInfo.en})
                      </span>
                    </div>
                    <span className="font-serif text-2xl sm:text-3xl text-parchment font-normal block pt-1 text-center">
                      {String(fact.value)}
                    </span>
                    <span className="text-[9px] font-mono text-stone group-hover:text-accentGold text-center block pt-1">
                      [Chi tiết →]
                    </span>
                  </button>
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

      {/* 2.5. Number Interactions Visual (Spec 40) */}
      <section aria-label="Trục Tương Tác Số Học" className="border border-borderDark bg-surface p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase border-b border-borderDark/60 pb-3">
          <span className="text-accentGold">02b</span>
          <span className="text-borderLight">/</span>
          <span>TRỤC TƯƠNG TÁC SỐ HỌC (NUMBER INTERACTIONS)</span>
        </div>
        <p className="text-xs text-stone leading-relaxed">
          Sự đối thoại giữa 3 trục rung động: Con đường thực tế (Life Path) ↕ Biểu đạt năng lực (Expression) ↕ Động lực sâu kín (Soul Urge).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 bg-background/50 border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">ĐƯỜNG ĐỜI (LIFE PATH)</span>
            <span className="font-serif text-2xl text-parchment block">
              {String(coreNumberFacts.find((f) => getSimplifiedKey(f.key) === 'lifepath')?.value || '—')}
            </span>
            <span className="text-[10px] font-mono text-stone block">Hướng đi &amp; Bài học</span>
          </div>
          <div className="p-4 bg-background/50 border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase block">SỨ MỆNH (EXPRESSION)</span>
            <span className="font-serif text-2xl text-parchment block">
              {String(coreNumberFacts.find((f) => getSimplifiedKey(f.key) === 'destiny')?.value || '—')}
            </span>
            <span className="text-[10px] font-mono text-stone block">Công cụ &amp; Hành động</span>
          </div>
          <div className="p-4 bg-background/50 border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase block">LINH HỒN (SOUL URGE)</span>
            <span className="font-serif text-2xl text-parchment block">
              {String(coreNumberFacts.find((f) => getSimplifiedKey(f.key) === 'soul')?.value || '—')}
            </span>
            <span className="text-[10px] font-mono text-stone block">Khát vọng nội tâm</span>
          </div>
        </div>
      </section>

      {/* 3. Number Interaction & Internal Polarization (Tensions) */}
      {tensions.length > 0 && (
        <section aria-label="Tương Tác Số Học & Phân Cực" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">03</span>
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

      {/* 4. Life Cycles Timeline (Spec 41) */}
      <section aria-label="Chu Kỳ Cuộc Đời" className="border border-borderDark bg-surface p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase border-b border-borderDark/60 pb-3">
          <span className="text-accentGold">04</span>
          <span className="text-borderLight">/</span>
          <span>4 GIAI ĐOẠN CHU KỲ CUỘC ĐỜI (LIFE CYCLES)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {[
            { phase: 1, name: 'Giai Đoạn 1', age: '0 — 27 tuổi', theme: 'Định hình nền tảng cá nhân' },
            { phase: 2, name: 'Giai Đoạn 2', age: '28 — 36 tuổi', theme: 'Bứt phá và kiến tạo bản lĩnh' },
            { phase: 3, name: 'Giai Đoạn 3', age: '37 — 45 tuổi', theme: 'Thu hoạch và tích lũy chiều sâu' },
            { phase: 4, name: 'Giai Đoạn 4', age: '46+ tuổi', theme: 'Trí tuệ viên mãn và cống hiến' },
          ].map((cycle) => (
            <button
              key={cycle.phase}
              type="button"
              onClick={() => setSelectedCyclePhase(cycle.phase)}
              className={`p-3 text-left border transition-colors cursor-pointer ${
                selectedCyclePhase === cycle.phase
                  ? 'border-accentGold bg-accentGold/10'
                  : 'border-borderDark bg-background/40 hover:border-accentGold/40'
              }`}
            >
              <span className="text-[10px] font-mono text-accentGold uppercase block">{cycle.name}</span>
              <span className="font-serif text-xs text-parchment font-medium block">{cycle.age}</span>
              <p className="text-[10px] text-stone mt-1">{cycle.theme}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Giai Đoạn Hiện Tại (Current Cycle - Spec 42) */}
      {cycleFact && (
        <section aria-label="Giai Đoạn Hiện Tại" className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4 border-l-2 border-l-accentGold">
          <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-widest uppercase">
            <Calendar className="w-4 h-4 text-accentGold" />
            <span>GIAI ĐOẠN HIỆN TẠI (CURRENT CYCLE CONTEXT)</span>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-stone block">Rung Động Năm Cá Nhân</span>
            <h3 className="text-xl sm:text-2xl font-serif text-parchment font-medium">
              Năm Số {String(cycleFact.value)}: Thời Điểm Tái Cấu Trúc &amp; Khởi Sắc
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-background/50 border border-borderDark space-y-1">
              <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">ĐIỀU THUẬN LỢI</span>
              <p className="text-xs text-parchment leading-relaxed">
                Tập trung củng cố nền tảng, hoàn thành các dự án dở dang và tái định hình mục tiêu.
              </p>
            </div>
            <div className="p-4 bg-background/50 border border-borderDark space-y-1">
              <span className="text-[10px] font-mono text-terracotta uppercase tracking-wider block">ĐIỀU NÊN QUAN SÁT</span>
              <p className="text-xs text-parchment leading-relaxed">
                Tránh hấp tấp bung sức ở các lĩnh vực thiếu chuẩn bị kỹ lưỡng về nguồn lực.
              </p>
            </div>
          </div>
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

      {/* 8.5. Technical Details (Calculation - Spec 37 item 9) */}
      <section aria-label="Chi Tiết Kỹ Thuật Số Học" className="border border-borderDark bg-surface">
        <button
          type="button"
          onClick={() => setTechOpen(!techOpen)}
          aria-expanded={techOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surfaceHover/50 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-mono text-xs text-stone tracking-widest uppercase block">
              CHI TIẾT KỸ THUẬT &amp; CÔNG THỨC (CALCULATION)
            </span>
            <h4 className="font-serif text-base text-parchment font-medium">
              Bảng Đối Chiếu Pythagoras &amp; Công Thức Rút Gọn
            </h4>
          </div>
          <span className="text-xs font-mono text-stone uppercase">
            {techOpen ? '[THU GỌN]' : '[MỞ RỘNG]'}
          </span>
        </button>

        {techOpen && (
          <div className="border-t border-borderDark p-5 text-xs font-mono space-y-3 bg-background/40">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone">
              <div>
                <span className="text-parchment block">Trường Phái:</span>
                <span>{school}</span>
              </div>
              <div>
                <span className="text-parchment block">Mô Hình:</span>
                <span>Pythagorean Reduction</span>
              </div>
              <div>
                <span className="text-parchment block">Số Lượng Chỉ Số:</span>
                <span>{coreNumberFacts.length} chỉ số cốt lõi</span>
              </div>
              <div>
                <span className="text-parchment block">Độ Tin Cậy:</span>
                <span>100% Tất Định</span>
              </div>
            </div>
          </div>
        )}
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

      {/* Interactive Number Detail Sheet (Spec 39) */}
      <NumberDetailSheet
        isOpen={isNumberSheetOpen}
        numberDetail={selectedNumber}
        onClose={() => setIsNumberSheetOpen(false)}
        onOpenWhy={() => {
          const el = document.querySelector('[aria-label="Minh Bạch Suy Luận"]');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </article>
  );
}
