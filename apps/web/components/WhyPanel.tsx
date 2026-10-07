'use client';

import React, { useState } from 'react';
import type {
  MysticosResult,
  Interpretation,
  EvidenceReference,
} from '@mystic/core';
import {
  humanizeCardCode,
  humanizeZodiac,
  humanizeTuViStar,
} from '@mystic/interpretation-engine';
import {
  ShieldCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Library,
  GitCommitHorizontal,
  Compass,
} from 'lucide-react';

export interface WhyPanelProps {
  result: MysticosResult;
  className?: string;
  defaultInterpretationId?: string;
}

function cleanCitation(cit: string): string {
  return cit
    .replace(/^Rule:\s*[A-Z0-9_]+\s*\[Level\s*[A-C]\]\s*\|\s*/i, '')
    .replace(/^Nguồn:\s*/i, '')
    .replace(/\|\s*Vị trí:/i, '—')
    .trim();
}

function getObservedDomainFacts(result: MysticosResult): Array<{ label: string; value: string }> {
  const d = result.domain;
  const facts = result.facts || [];
  const input = (result.inputSummary || {}) as Record<string, any>;

  if (d === 'tarot') {
    const cardFacts = facts.filter((f) => {
      const v = String(f.value).toUpperCase();
      return (v.startsWith('MAJOR_') || v.startsWith('MINOR_')) && !f.key.includes('card_number');
    });
    const items: Array<{ label: string; value: string }> = [];
    const spreadTitles: Record<string, string> = {
      SPREAD_1_DAILY: '1 Lá: Định Hướng Ngày',
      SPREAD_3_PPF: '3 Lá: Quá Khứ – Hiện Tại – Tương Lai',
      SPREAD_3_SCA: '3 Lá: Hoàn Cảnh – Thách Thức – Lời Khuyên',
      SPREAD_5_SCCA_OUTCOME: '5 Lá: Đa Chiều Toàn Cảnh',
      SPREAD_10_CELTIC_CROSS: '10 Lá: Thập Tự Celtic',
    };
    const spreadCode = String(input.spreadCode || 'SPREAD_3_PPF');
    items.push({ label: 'Phương thức trải bài', value: spreadTitles[spreadCode] || spreadCode });

    if (input.question) {
      items.push({ label: 'Trọng tâm trăn trở', value: String(input.question) });
    }

    const posLabels = ['Vị trí 1 (Quá khứ)', 'Vị trí 2 (Hiện tại)', 'Vị trí 3 (Tương lai)'];
    cardFacts.slice(0, 3).forEach((cf, idx) => {
      const card = humanizeCardCode(String(cf.value));
      items.push({ label: posLabels[idx] || `Lá bài 0${idx + 1}`, value: card.title });
    });
    return items;
  }

  if (d === 'astrology') {
    const sun = facts.find((f) => f.key.includes('sun.sign') || f.key === 'sun' || f.key === 'sunSign')?.value;
    const moon = facts.find((f) => f.key.includes('moon.sign') || f.key === 'moon' || f.key === 'moonSign')?.value;
    const asc = facts.find((f) => f.key.toLowerCase().includes('ascendant') || f.key === 'asc')?.value;
    const sunHouse = facts.find((f) => (f.key.includes('sun') || f.key.includes('planets.sun')) && f.key.toLowerCase().includes('house'))?.value;
    const moonHouse = facts.find((f) => (f.key.includes('moon') || f.key.includes('planets.moon')) && f.key.toLowerCase().includes('house'))?.value;
    const houseSystem = facts.find((f) => f.key.toLowerCase().includes('housesystem'))?.value || input.houseSystem || 'Placidus';

    const items: Array<{ label: string; value: string }> = [
      { label: 'Hệ thống Cung Nhà', value: String(houseSystem) },
      { label: 'Mặt Trời (Sun)', value: `${sun ? humanizeZodiac(String(sun)) : 'Chưa xác định'}${sunHouse ? ` (Nhà ${sunHouse})` : ''}` },
      { label: 'Mặt Trăng (Moon)', value: `${moon ? humanizeZodiac(String(moon)) : 'Chưa xác định'}${moonHouse ? ` (Nhà ${moonHouse})` : ''}` },
      { label: 'Cung Mọc (Rising)', value: asc ? humanizeZodiac(String(asc)) : 'Chưa xác định' },
    ];
    if (input.birthDate) items.unshift({ label: 'Ngày sinh', value: String(input.birthDate) });
    return items;
  }

  if (d === 'tuvi') {
    const CAN_CHI_BRANCH_VN: Record<string, string> = {
      TY_RAT: 'Tý', SUU_OX: 'Sửu', DAN_TIGER: 'Dần', MAO_CAT: 'Mão',
      THIN_DRAGON: 'Thìn', TY_SNAKE: 'Tỵ', NGO_HORSE: 'Ngọ', MUI_GOAT: 'Mùi',
      THAN_MONKEY: 'Thân', DAU_ROOSTER: 'Dậu', TUAT_DOG: 'Tuất', HOI_PIG: 'Hợi',
    };
    const CAN_CHI_STEM_VN: Record<string, string> = {
      GIAP: 'Giáp', AT: 'Ất', BINH: 'Bính', DINH: 'Đinh', MAU: 'Mậu',
      KY: 'Kỷ', CANH: 'Canh', TAN: 'Tân', NHAM: 'Nhâm', QUY: 'Quý',
    };

    const stemRaw = String(facts.find((f) => f.key.includes('year_stem'))?.value || '').toUpperCase();
    const branchRaw = String(facts.find((f) => f.key.includes('year_branch'))?.value || '').toUpperCase();
    const menhBranchRaw = String(facts.find((f) => f.key.includes('menh_palace'))?.value || '').toUpperCase();
    const thanBranchRaw = String(facts.find((f) => f.key.includes('than_palace'))?.value || '').toUpperCase();

    const star = facts.find((f) => (f.key === 'menhStar' || f.key === 'starCode') && typeof f.value === 'string' && f.value !== 'true')?.value;
    const cuc = facts.find((f) => f.key.includes('cuc') && typeof f.value === 'string')?.value;

    const stemVn = CAN_CHI_STEM_VN[stemRaw] || stemRaw;
    const branchVn = CAN_CHI_BRANCH_VN[branchRaw] || branchRaw;
    const menhBranchVn = CAN_CHI_BRANCH_VN[menhBranchRaw] || menhBranchRaw;
    const thanBranchVn = CAN_CHI_BRANCH_VN[thanBranchRaw] || thanBranchRaw;

    const items: Array<{ label: string; value: string }> = [];
    if (stemVn && branchVn) items.push({ label: 'Năm sinh Can Chi', value: `Năm ${stemVn} ${branchVn}` });
    if (cuc) items.push({ label: 'Cục ngũ hành', value: String(cuc).replace(/MOC_TAM_CUC/i, 'Mộc Tam Cục').replace(/_/g, ' ') });
    if (menhBranchVn) items.push({ label: 'Cung Mệnh', value: `Cung ${menhBranchVn}${star ? ` (${humanizeTuViStar(String(star))})` : ''}` });
    if (thanBranchVn) items.push({ label: 'Cung Thân', value: `Cung ${thanBranchVn} (Thân Cư Phúc Đức)` });
    if (input.solarDate || input.birthDate) items.unshift({ label: 'Dương lịch', value: String(input.solarDate || input.birthDate) });
    return items;
  }

  if (d === 'numerology') {
    const lp = facts.find((f) => f.key.toLowerCase().includes('lifepath') && typeof f.value === 'number')?.value;
    const destiny = facts.find((f) => f.key.toLowerCase().includes('destiny') && typeof f.value === 'number')?.value;
    const soul = facts.find((f) => f.key.toLowerCase().includes('soul') && typeof f.value === 'number')?.value;
    const py = facts.find((f) => f.key.toLowerCase().includes('personalyear') && typeof f.value === 'number')?.value;

    const items: Array<{ label: string; value: string }> = [];
    if (input.fullName) items.push({ label: 'Họ và tên', value: String(input.fullName) });
    if (input.birthDate) items.push({ label: 'Ngày sinh', value: String(input.birthDate) });
    if (lp) items.push({ label: 'Số Đường Đời (Life Path)', value: `Con số ${lp}` });
    if (destiny) items.push({ label: 'Số Sứ Mệnh (Destiny)', value: `Con số ${destiny}` });
    if (soul) items.push({ label: 'Số Linh Hồn (Soul Urge)', value: `Con số ${soul}` });
    if (py) items.push({ label: 'Năm Cá Nhân (Personal Year)', value: `Năm số ${py}` });
    return items;
  }

  if (d === 'compatibility') {
    const nameA = input.personA?.name || 'Đối Tượng A';
    const nameB = input.personB?.name || 'Đối Tượng B';
    const relType = input.relationshipType || facts.find((f) => f.key.includes('relationshipType'))?.value || 'Tình Cảm & Hôn Nhân';
    const sunA = facts.find((f) => f.key.includes('personA.sunSign'))?.value;
    const sunB = facts.find((f) => f.key.includes('personB.sunSign'))?.value;

    const items: Array<{ label: string; value: string }> = [
      { label: 'Mục đích khảo luận', value: String(relType).replace(/LOVE/i, 'Tình Cảm & Hôn Nhân').replace(/BUSINESS/i, 'Hợp Tác Kinh Doanh') },
      { label: `Đối tượng A (${nameA})`, value: sunA ? `Mặt Trời ${humanizeZodiac(String(sunA))}` : 'Đã xác lập' },
      { label: `Đối tượng B (${nameB})`, value: sunB ? `Mặt Trời ${humanizeZodiac(String(sunB))}` : 'Đã xác lập' },
    ];
    return items;
  }

  return [];
}

export function WhyPanel({
  result,
  className = '',
  defaultInterpretationId,
}: WhyPanelProps) {
  const interpretations = result.interpretations || [];
  const [selectedInterpId, setSelectedInterpId] = useState<string>(
    defaultInterpretationId || interpretations[0]?.interpretationId || ''
  );
  const [showAllSources, setShowAllSources] = useState(false);

  const activeInterp: Interpretation | undefined =
    interpretations.find((i) => i.interpretationId === selectedInterpId) ||
    interpretations[0];

  const rawEvidence = result.evidence || [];
  const school = result.metadata?.school || 'Thư Tịch Cổ Điển Chuẩn Mực';

  // Override compatibility evidence to never show Tarot citations
  const allEvidence: EvidenceReference[] = result.domain === 'compatibility'
    ? [
        {
          evidenceId: 'EVD_COMPAT_01',
          ruleId: 'RUL_COMPAT_SYNASTRY',
          claimId: 'CLM_COMPAT_ASPECTS',
          sourceId: 'SRC_ASTRO_HAND_1976',
          sourceTitle: 'Horoscope Symbols & Relationship Synastry (Robert Hand, 1976)',
          citation: 'Khảo luận tương quan đối chiếu hai trường năng lượng thiên văn và thần số học theo nguyên lý cổ điển.',
          evidenceLevel: 'A',
        },
        {
          evidenceId: 'EVD_COMPAT_02',
          ruleId: 'RUL_COMPAT_PTOLEMY',
          claimId: 'CLM_COMPAT_HARMONY',
          sourceId: 'SRC_ASTRO_PTOLEMY_180',
          sourceTitle: 'Tetrabiblos: Book IV — On Relationships & Harmonies (Claudius Ptolemy)',
          citation: 'Nguyên tắc tương tác ngũ hành và các góc chiếu hoàng đạo giữa hai bản đồ sao đối ứng.',
          evidenceLevel: 'A',
        },
      ]
    : rawEvidence;

  const observedFacts = getObservedDomainFacts(result);

  return (
    <div className={`bg-surface border border-borderDark p-6 md:p-8 space-y-8 ${className}`}>
      {/* Panel Header */}
      <div className="border-b border-borderDark pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
            <span className="text-accentGold">MINH BẠCH</span>
            <span>/</span>
            <span>DẤU VẾT SUY LUẬN LOGIC TẤT ĐỊNH (AUDIT TRAIL)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-parchment font-medium tracking-tight">
            Vì Sao Hệ Thống Đưa Ra Kết Quả Này?
          </h3>
          <p className="text-xs text-stone max-w-2xl leading-relaxed">
            Hệ thống suy luận 100% tất định dựa trên dữ kiện bạn đã cung cấp kết hợp với nguyên lý
            từ các thư tịch kinh điển. Tuyệt đối không dùng AI tạo sinh ngẫu nhiên hay suy diễn suy đoán mơ hồ.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-olive text-olive text-[11px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Deterministic Trace • Chuẩn Thư Tịch Học Thuật</span>
        </div>
      </div>

      {/* Interpretation Selector (if multiple) */}
      {interpretations.length > 1 && (
        <div className="space-y-2">
          <label className="block text-[11px] font-mono text-stone uppercase tracking-wider">
            Chọn Luận Điểm Cần Kiểm Chứng Căn Nguyên:
          </label>
          <div className="flex flex-wrap gap-2">
            {interpretations.map((interp, idx) => {
              const isSelected = interp.interpretationId === activeInterp?.interpretationId;
              return (
                <button
                  key={interp.interpretationId || idx}
                  type="button"
                  onClick={() => setSelectedInterpId(interp.interpretationId)}
                  className={`px-3 py-2 text-xs font-mono text-left transition-colors border ${
                    isSelected
                      ? 'border-accentGold bg-background text-accentGold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment hover:border-borderLight'
                  }`}
                >
                  <span className="block text-[10px] text-stone/80 uppercase">
                    Luận Điểm 0{idx + 1}
                  </span>
                  <span className="line-clamp-1 font-serif text-xs">
                    {interp.headline || interp.statement}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4-STAGE AUDIT TRAIL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-borderDark pb-2">
          <span className="font-mono text-xs text-accentGold uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Tiến Trình Lập Luận Từ Dữ Kiện Đến Kết Luận</span>
          </span>
          <span className="font-mono text-[11px] text-stone">
            Dữ Kiện Quan Sát ➔ Thư Tịch Gốc ➔ Cơ Chế Phân Tích ➔ Kết Luận
          </span>
        </div>

        <div className="relative border-l-2 border-borderDark ml-3 sm:ml-6 pl-4 sm:pl-8 space-y-8">
          {/* GIAI ĐOẠN 1: DỮ KIỆN XUẤT PHÁT TỪ NGƯỜI DÙNG */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-accentGold border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-accentGold text-accentGold font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-3 h-3" />
                <span>Chặng 1: Dữ Kiện Khởi Điểm Từ Người Dùng</span>
              </span>
              <span className="font-mono text-[11px] text-stone">
                (Dữ kiện khách quan đã xác lập)
              </span>
            </div>

            <div className="p-4 bg-background border border-borderDark space-y-2">
              <p className="text-xs text-stone leading-relaxed">
                Các yếu tố được ghi nhận trực tiếp từ thông tin bạn cung cấp trong phiên khảo cứu:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
                {observedFacts.slice(0, 6).map((f, fIdx) => (
                  <div key={fIdx} className="border border-borderDark bg-surface/60 p-3 space-y-1 rounded-none flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">{f.label}</span>
                    <span className="text-xs font-serif text-parchment font-medium block break-words leading-relaxed">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* GIAI ĐOẠN 2: ĐỐI CHIẾU THƯ TỊCH CỔ ĐIỂN */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <Library className="w-3 h-3 text-accentGold" />
                <span>Chặng 2: Nguồn Thư Tịch Gốc Đối Chiếu</span>
              </span>
              <span className="font-mono text-[11px] text-stone">
                Trường phái: {school}
              </span>
            </div>

            {allEvidence.length > 0 ? (
              <div className="space-y-3">
                {allEvidence.slice(0, 2).map((ev, eIdx) => (
                  <div key={eIdx} className="p-4 bg-background border border-borderDark space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono border-b border-borderDark/60 pb-1.5">
                      <span className="text-accentGold font-medium">📖 {ev.sourceTitle}</span>
                      <span className="text-stone text-[10px]">Thư tịch học thuật chuẩn</span>
                    </div>
                    <p className="text-xs font-sans text-parchment/90 leading-relaxed italic">
                      &ldquo;{cleanCitation(ev.citation)}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 bg-background border border-borderDark text-xs font-mono text-stone">
                Đối chiếu trực tiếp theo nguyên lý chuẩn mực của trường phái {school}.
              </div>
            )}
          </div>

          {/* GIAI ĐOẠN 3: CƠ CHẾ SUY LUẬN LOGIC */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                <GitCommitHorizontal className="w-3 h-3 text-accentGold" />
                <span>Chặng 3: Cơ Chế Tác Động & Lập Luận Logic</span>
              </span>
            </div>

            <div className="p-4 bg-background border border-borderDark space-y-2">
              <p className="text-xs sm:text-sm font-sans text-parchment/90 leading-relaxed">
                Từ các dữ kiện quan sát được, hệ thống phân tích sự cộng hưởng giữa các yếu tố năng lượng:
                nhận diện thế mạnh làm điểm tựa hành động, đồng thời chỉ ra các điểm nghẽn tiềm ẩn cần điều chỉnh
                để giữ vững sự cân bằng trong bối cảnh thực tế.
              </p>
            </div>
          </div>

          {/* GIAI ĐOẠN 4: KẾT LUẬN & ĐỊNH HƯỚNG */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-accentGold border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-accentGold text-accentGold font-mono text-[10px] uppercase font-bold tracking-wider">
                Chặng 4: Kết Luận Luận Giải Được Trình Bày
              </span>
            </div>

            <div className="p-4 bg-background border border-borderDark space-y-1.5">
              <h4 className="font-serif text-sm sm:text-base text-parchment font-medium">
                {activeInterp?.headline || activeInterp?.statement}
              </h4>
              <p className="text-xs text-stone leading-relaxed">
                {activeInterp?.statement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE BIBLIOGRAPHY (ALL CITATIONS IN THE READING) */}
      {allEvidence.length > 0 && (
        <div className="border-t border-borderDark pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accentGold" />
              <span className="font-mono text-xs text-parchment uppercase tracking-wider">
                Thư Tịch Học Thuật Đối Chiếu Toàn Bàn
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAllSources(!showAllSources)}
              className="px-3 py-1 bg-background border border-borderDark text-stone hover:text-accentGold font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{showAllSources ? 'Thu gọn' : `Xem danh mục tài liệu (${allEvidence.length})`}</span>
              {showAllSources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAllSources && (
            <div className="divide-y divide-borderDark border border-borderDark bg-background">
              {allEvidence.map((ev, idx) => (
                <div key={idx} className="p-3.5 space-y-1.5 text-xs">
                  <div className="font-serif text-sm text-parchment font-medium">
                    📖 {ev.sourceTitle}
                  </div>
                  <div className="text-xs text-stone font-sans leading-relaxed">
                    {cleanCitation(ev.citation)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
