'use client';

import React, { useState } from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { ResultFooter } from '../primitives/ResultFooter';
import { AspectDetailSheet, type AspectDetail } from '../primitives/AspectDetailSheet';
import { Sun, Moon, Compass, CheckCircle2, AlertTriangle, Sparkles, Filter, ChevronDown, ChevronUp } from 'lucide-react';

export interface AstrologyResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const ZODIAC_VN: Record<string, string> = {
  ARIES: 'Bạch Dương (Aries)',
  TAURUS: 'Kim Ngưu (Taurus)',
  GEMINI: 'Song Tử (Gemini)',
  CANCER: 'Cự Giải (Cancer)',
  LEO: 'Sư Tử (Leo)',
  VIRGO: 'Xử Nữ (Virgo)',
  LIBRA: 'Thiên Bình (Libra)',
  SCORPIO: 'Bọ Cạp (Scorpio)',
  SAGITTARIUS: 'Nhân Mã (Sagittarius)',
  CAPRICORN: 'Ma Kết (Capricorn)',
  AQUARIUS: 'Bảo Bình (Aquarius)',
  PISCES: 'Song Ngư (Pisces)',
};

const HOUSE_THEMES: Record<number, { title: string; desc: string }> = {
  1: { title: 'Bản Thể & Diện Mạo', desc: 'Định hình phong thái, ý chí khởi xướng và cách bạn chủ động tiếp cận cuộc đời.' },
  2: { title: 'Tài Chính & Nguồn Lực', desc: 'Quản trị giá trị vật chất, năng lực sinh kế và cảm giác an toàn tài chính cá nhân.' },
  3: { title: 'Giao Tiếp & Học Hỏi', desc: 'Tư duy logic, cách kết nối ý tưởng và tương tác với môi trường sống xung quanh.' },
  4: { title: 'Cội Nguồn & Gia Đạo', desc: 'Nền tảng tâm lý nội tại, không gian gia đình và điểm tựa cảm xúc an trú.' },
  5: { title: 'Sáng Tạo & Tự Biểu Đạt', desc: 'Khai mở niềm vui sống, năng lượng đam mê, dự án cá nhân và sự bộc lộ chân thật.' },
  6: { title: 'Kỷ Luật & Sức Khỏe', desc: 'Thói quen thực tế mỗi ngày, tính trật tự trong công việc và việc chăm sóc thể trạng.' },
  7: { title: 'Quan Hệ & Đối Tác', desc: 'Cam kết song phương, sự hợp tác công bằng và các bài học từ tấm gương người khác.' },
  8: { title: 'Chiều Sâu & Chuyển Hóa', desc: 'Nội lực tái sinh sau khủng hoảng, nguồn lực chung và khả năng thấu suốt vô thức.' },
  9: { title: 'Tri Thức & Thế Giới Quan', desc: 'Khát vọng mở rộng biên giới tri thức, triết lý nhân sinh và hành trình trải nghiệm lớn.' },
  10: { title: 'Sự Nghiệp & Công Danh', desc: 'Khẳng định chỗ đứng xã hội, trách nhiệm dẫn dắt và mục tiêu cống hiến bền vững.' },
  11: { title: 'Cộng Đồng & Mục Tiêu', desc: 'Tầm nhìn tương lai, gắn kết mạng lưới đồng chí hướng và lý tưởng xã hội chung.' },
  12: { title: 'Tiềm Thức & Tâm Linh', desc: 'Vùng tĩnh lặng nội tâm, năng lực trực giác và sự buông bỏ để phục hồi sinh lực.' },
};

function getHouseDescription(houseNum: unknown): { title: string; desc: string } {
  const num = Number(houseNum);
  if (!num || !HOUSE_THEMES[num]) {
    return {
      title: 'Vùng Đời Sống Trọng Yếu',
      desc: 'Lĩnh vực trọng tâm hội tụ năng lượng thiên thể và phản ánh bài học cá nhân.',
    };
  }
  return HOUSE_THEMES[num];
}

const ASPECT_TYPE_VN: Record<string, string> = {
  contrast: 'ĐỐI LẬP (180°)',
  tension: 'VUÔNG GÓC (90°)',
  reinforcement: 'TAM HỢP (120°)',
  amplification: 'TRÙNG TỤ (0°)',
  harmonious: 'LỤC HỢP (60°)',
};

function formatZodiac(val: unknown): string {
  if (!val) return 'Chưa xác định';
  const str = String(val).toUpperCase().trim();
  return ZODIAC_VN[str] || String(val);
}

function formatAspectTitle(sig: string): string {
  const clean = sig.replace(/^SIG_CTX_|^SIG_/i, '').replace(/_/g, ' ').trim();
  const parts = clean.split(' ');
  const viParts = parts.map((p) => {
    const up = p.toUpperCase();
    if (ZODIAC_VN[up]) return ZODIAC_VN[up].split(' ')[0];
    if (up === 'SUN') return 'Mặt Trời';
    if (up === 'MOON') return 'Mặt Trăng';
    if (up === 'ASC' || up === 'ASCENDANT') return 'Cung Mọc';
    if (up === 'MARS') return 'Sao Hỏa';
    if (up === 'VENUS') return 'Sao Kim';
    if (up === 'MERCURY') return 'Sao Thủy';
    if (up === 'JUPITER') return 'Sao Mộc';
    if (up === 'SATURN') return 'Sao Thổ';
    if (up === 'URANUS') return 'Thiên Vương';
    if (up === 'NEPTUNE') return 'Hải Vương';
    if (up === 'PLUTO') return 'Diêm Vương';
    // Drop technical tokens
    if (['ASTROLOGY', 'PLANETS', 'SIGN', 'DEGREE', 'LONGITUDE', '0', '1', '2', '3', '4'].includes(up)) return '';
    return '';
  }).filter(Boolean);

  return viParts.length > 0 ? viParts.join(' ✕ ') : 'Góc Chiếu Năng Lượng';
}

export function AstrologyResultView({
  result,
  className = '',
}: AstrologyResultViewProps) {
  const [selectedLifeArea, setSelectedLifeArea] = useState<'ALL' | 'SELF' | 'LOVE' | 'CAREER' | 'SPIRIT'>('ALL');
  const [showAllAspects, setShowAllAspects] = useState(false);
  const [selectedAspect, setSelectedAspect] = useState<AspectDetail | null>(null);
  const [isAspectSheetOpen, setIsAspectSheetOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);

  if (!result) return null;

  const school = result.metadata?.school || 'Modern Humanistic Astrology';

  // Extract Big Three, House System and key factors
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

  const sunHouse = (result.facts || []).find(
    (f) => (f.key.includes('sun') || f.key.includes('planets.sun')) && f.key.toLowerCase().includes('house')
  )?.value;

  const moonHouse = (result.facts || []).find(
    (f) => (f.key.includes('moon') || f.key.includes('planets.moon')) && f.key.toLowerCase().includes('house')
  )?.value;

  const houseSystem =
    ((result.facts || []).find((f) => f.key.toLowerCase().includes('housesystem'))?.value as string) ||
    (result.inputSummary?.houseSystem as string) ||
    'Placidus (Tiêu Chuẩn)';

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

  const openAspect = (r: (typeof aspectRelationships)[0]) => {
    const title = formatAspectTitle(r.sourceSignalId);
    const parts = title.split(' ✕ ');
    setSelectedAspect({
      title,
      planetA: parts[0] || 'Hành Tinh 1',
      planetB: parts[1] || 'Hành Tinh 2',
      aspectType: ASPECT_TYPE_VN[r.type] || r.type,
      orb: 'Dưới 3° (chặt chẽ)',
      whyImportant: r.description,
      manifestation: `Tương tác ${ASPECT_TYPE_VN[r.type] || r.type} giữa ${title} kích hoạt dòng chảy năng lượng trong các tình huống thực tế.`,
      constructiveExpression:
        r.type === 'reinforcement' || r.type === 'complementarity'
          ? 'Dễ dàng chuyển hóa thành năng lực tự nhiên.'
          : undefined,
      tension:
        r.type === 'contrast' || r.type === 'tension'
          ? 'Cần nhận diện sớm để tránh mâu thuẫn nội tại.'
          : undefined,
    });
    setIsAspectSheetOpen(true);
  };

  const LIFE_AREAS = [
    { id: 'ALL', label: 'Tất Cả Lĩnh Vực' },
    { id: 'SELF', label: 'Bản Thể & Bản Năng' },
    { id: 'LOVE', label: 'Tình Cảm & Quan Hệ' },
    { id: 'CAREER', label: 'Sự Nghiệp & Mục Tiêu' },
    { id: 'SPIRIT', label: 'Tiềm Thức & Chiều Sâu' },
  ] as const;

  const filteredInterpretations = interpretations.filter((interp) => {
    if (selectedLifeArea === 'ALL') return true;
    const text = `${interp.headline} ${interp.statement} ${interp.dimension || ''}`.toLowerCase();
    if (selectedLifeArea === 'LOVE') {
      return text.includes('tình cảm') || text.includes('quan hệ') || text.includes('kết nối') || text.includes('cặp đôi') || text.includes('bạn đời');
    }
    if (selectedLifeArea === 'CAREER') {
      return text.includes('sự nghiệp') || text.includes('công danh') || text.includes('mục tiêu') || text.includes('xã hội') || text.includes('thực thi');
    }
    if (selectedLifeArea === 'SELF') {
      return text.includes('bản thể') || text.includes('nhân cách') || text.includes('ý chí') || text.includes('phong thái') || text.includes('cốt tủy');
    }
    if (selectedLifeArea === 'SPIRIT') {
      return text.includes('tiềm thức') || text.includes('tâm lý') || text.includes('cảm xúc') || text.includes('chiều sâu') || text.includes('tâm linh');
    }
    return true;
  });

  const displayInterpretations =
    filteredInterpretations.length > 0 ? filteredInterpretations : interpretations;

  const visibleAspects = showAllAspects ? aspectRelationships : aspectRelationships.slice(0, 5);

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
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-borderDark bg-surface p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accentGold uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5 text-accentGold shrink-0" />
                  <span>MẶT TRỜI (SUN)</span>
                </div>
                <span className="font-serif text-lg sm:text-xl text-parchment block">
                  {formatZodiac(sunSign)}
                </span>
                <span className="font-mono text-[10px] text-stone block">Bản thể &amp; Ý chí</span>
              </div>

              <div className="border border-borderDark bg-surface p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone uppercase tracking-wider">
                  <Moon className="w-3.5 h-3.5 text-stone shrink-0" />
                  <span>MẶT TRĂNG (MOON)</span>
                </div>
                <span className="font-serif text-lg sm:text-xl text-parchment block">
                  {formatZodiac(moonSign)}
                </span>
                <span className="font-mono text-[10px] text-stone block">Nhu cầu cảm xúc</span>
              </div>

              <div className="border border-borderDark bg-surface p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-stone shrink-0" />
                  <span>CUNG MỌC (RISING)</span>
                </div>
                <span className="font-serif text-lg sm:text-xl text-parchment block">
                  {formatZodiac(ascendant)}
                </span>
                <span className="font-mono text-[10px] text-stone block">Phong thái &amp; Cửa ngõ</span>
              </div>
            </div>

            {/* House System & Key Activation Areas */}
            <div className="border border-borderDark bg-surface/60 p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-borderDark/60 pb-2 text-xs font-mono">
                <span className="text-accentGold uppercase tracking-wider">
                  HỆ THỐNG CUNG NHÀ (HOUSE SYSTEM): {String(houseSystem).toUpperCase()}
                </span>
                <span className="text-stone text-[10px]">12 LÃNH ĐỊA CUỘC ĐỜI</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {sunHouse ? (
                  <div className="border border-borderDark bg-background/50 p-3 space-y-1">
                    <span className="font-mono text-[10px] text-accentGold uppercase block">
                      Mặt Trời ngụ tại Nhà {String(sunHouse)}: {getHouseDescription(sunHouse).title}
                    </span>
                    <p className="font-sans text-parchment/90 leading-relaxed text-xs">
                      {getHouseDescription(sunHouse).desc}
                    </p>
                  </div>
                ) : null}
                {moonHouse ? (
                  <div className="border border-borderDark bg-background/50 p-3 space-y-1">
                    <span className="font-mono text-[10px] text-stone uppercase block">
                      Mặt Trăng ngụ tại Nhà {String(moonHouse)}: {getHouseDescription(moonHouse).title}
                    </span>
                    <p className="font-sans text-parchment/90 leading-relaxed text-xs">
                      {getHouseDescription(moonHouse).desc}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Big Three Dynamics Interplay */}
            <div className="border border-borderDark bg-surface p-4 space-y-2">
              <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block">
                TƯƠNG TÁC BỘ BA NHÂN CÁCH (BIG THREE DYNAMICS)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone">
                <div className="space-y-1">
                  <span className="text-parchment font-medium block">Mặt Trời ↔ Mặt Trăng</span>
                  <p className="leading-relaxed text-[11px]">
                    Sự dung hòa giữa ý chí thức tỉnh và nhu cầu an toàn cảm xúc thầm kín bên trong.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-parchment font-medium block">Mặt Trời / Mặt Trăng ↔ Cung Mọc</span>
                  <p className="leading-relaxed text-[11px]">
                    Cầu nối giữa cốt tủy nội tâm và chiếc áo phong thái biểu hiện ra với thế giới bên ngoài.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 0. Chart Signature (Spec 45) */}
      <section aria-label="Bản Đồ Sao Nổi Bật Ở Điều Gì" className="border border-borderDark bg-surface p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-widest uppercase border-b border-borderDark/60 pb-2">
          <span>✦</span>
          <span>BẢN ĐỒ SAO NỔI BẬT Ở ĐIỀU GÌ? (CHART SIGNATURE)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif text-parchment font-medium">
          {result.mainStory?.headline || result.primaryResult || 'Dấu Ấn Thiên Văn Nổi Bật'}
        </h2>
        <p className="text-sm font-sans text-stone leading-relaxed">
          {result.mainStory?.narrative || result.summary || 'Trường năng lượng của bản đồ sao được định hình qua thế giằng co và hỗ trợ giữa các hành tinh chủ đạo.'}
        </p>
      </section>

      {/* 2. Big Three Dynamics & Main Story */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Năng Lượng Chiêm Tinh">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Key Ranked Aspects & Energy Interplay (Spec 47-48) */}
      {aspectRelationships.length > 0 && (
        <section aria-label="Góc Hợp & Tương Quan Chiếu Mệnh" className="space-y-4">
          <div className="flex items-center justify-between border-b border-borderDark/60 pb-2 text-xs font-mono text-stone uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-accentGold">03</span>
              <span className="text-borderLight">/</span>
              <span>CÁC GÓC HỢP TRỌNG YẾU (TOP ASPECTS)</span>
            </div>
            {aspectRelationships.length > 5 && (
              <button
                type="button"
                onClick={() => setShowAllAspects(!showAllAspects)}
                className="text-accentGold hover:underline text-[11px] font-mono cursor-pointer"
              >
                {showAllAspects ? '[Thu gọn top 5]' : `[Xem toàn bộ ${aspectRelationships.length} góc hợp]`}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleAspects.map((r, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => openAspect(r)}
                className="border border-borderDark bg-surface p-5 space-y-2 text-left hover:border-accentGold transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-mono border-b border-borderDark/60 pb-2">
                  <span className="text-parchment font-medium group-hover:text-accentGold transition-colors">
                    {formatAspectTitle(r.sourceSignalId)}
                  </span>
                  <span className="text-accentGold uppercase">
                    [{ASPECT_TYPE_VN[r.type] || r.type}]
                  </span>
                </div>
                <p className="text-sm font-sans text-stone leading-relaxed">
                  {r.description}
                </p>
                <div className="pt-1 flex items-center justify-end text-[10px] font-mono text-stone group-hover:text-accentGold">
                  <span>Xem chi tiết góc chiếu →</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 4. Life Areas & Deep Interpretations (Spec 49) */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Chiêm Tinh Sâu Sắc" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>VÙNG ĐỜI SỐNG KÍCH HOẠT &amp; LUẬN GIẢI CHI TIẾT</span>
          </div>

          {/* Life Area Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-1 pb-2">
            {LIFE_AREAS.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => setSelectedLifeArea(area.id)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors cursor-pointer ${
                  selectedLifeArea === area.id
                    ? 'border-accentGold bg-accentGold/10 text-accentGold font-bold'
                    : 'border-borderDark bg-surface text-stone hover:text-parchment'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {displayInterpretations.map((interp, idx) => (
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
            title="HỆ QUẢ ĐỜI THƯỜNG & KHUNG THỜI GIAN KÍCH HOẠT"
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

      {/* 7. Progressive Disclosure */}
      <section aria-label="Minh Bạch Suy Luận" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết logic tất định 100% qua tọa độ thiên văn đã xác lập và thư tịch chiêm tinh học kinh điển."
        />
      </section>

      {/* 7.5. Technical Details / Chart Explorer (Spec 50) */}
      <section aria-label="Bảng Thông Số Kỹ Thuật Chiêm Tinh" className="border border-borderDark bg-surface">
        <button
          type="button"
          onClick={() => setTechOpen(!techOpen)}
          aria-expanded={techOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surfaceHover/50 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-mono text-xs text-stone tracking-widest uppercase block">
              CHI TIẾT KỸ THUẬT THIÊN VĂN (CHART EXPLORER)
            </span>
            <h4 className="font-serif text-base text-parchment font-medium">
              Tọa Độ Hành Tinh, Cung Đỉnh Cung Nhà &amp; Độ Lệch Orb
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
                <span className="text-parchment block">Hệ Thống Nhà:</span>
                <span>{String(houseSystem)}</span>
              </div>
              <div>
                <span className="text-parchment block">Mặt Trời:</span>
                <span>{formatZodiac(sunSign)} {sunHouse ? `(Nhà ${sunHouse})` : ''}</span>
              </div>
              <div>
                <span className="text-parchment block">Mặt Trăng:</span>
                <span>{formatZodiac(moonSign)} {moonHouse ? `(Nhà ${moonHouse})` : ''}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 8. Result Footer */}
      <ResultFooter
        topic="Bản Đồ Sao Chiêm Tinh Học"
        exploreLinks={[
          { label: 'Khảo Cứu Tử Vi Đẩu Số 12 Cung', href: '/tu-vi' },
          { label: 'Khảo Cứu Thần Số Học Pythagoras', href: '/numerology' },
          { label: 'Khảo Cứu Bói Bài Tarot 78 Lá', href: '/tarot' },
        ]}
      />

      {/* Interactive Aspect Detail Sheet (Spec 48) */}
      <AspectDetailSheet
        isOpen={isAspectSheetOpen}
        aspect={selectedAspect}
        onClose={() => setIsAspectSheetOpen(false)}
        onOpenWhy={() => {
          const el = document.querySelector('[aria-label="Minh Bạch Suy Luận"]');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </article>
  );
}
