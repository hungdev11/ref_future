'use client';

import React, { useState } from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { ResultFooter } from '../primitives/ResultFooter';
import { PalaceDetailSheet, type PalaceDetail } from '../primitives/PalaceDetailSheet';
import { ChevronDown, ChevronUp, Shield, CheckCircle2, AlertTriangle, Layers, ExternalLink } from 'lucide-react';

export interface TuViResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const TU_VI_12_PALACES = [
  { id: 'menh', name: 'Mệnh', label: 'Cung Mệnh (Bản thể & cốt cách)' },
  { id: 'phu_mau', name: 'Phụ Mẫu', label: 'Cung Phụ Mẫu (Cha mẹ & xuất phát điểm)' },
  { id: 'phuc_duc', name: 'Phúc Đức', label: 'Cung Phúc Đức (Tổ tiên & phúc phần tinh thần)' },
  { id: 'dien_trach', name: 'Điền Trạch', label: 'Cung Điền Trạch (Bất động sản & gia đạo)' },
  { id: 'quan_loc', name: 'Quan Lộc', label: 'Cung Quan Lộc (Sự nghiệp & công danh)' },
  { id: 'no_boc', name: 'Nô Bộc', label: 'Cung Nô Bộc (Bạn bè & trợ thủ)' },
  { id: 'thien_di', name: 'Thiên Di', label: 'Cung Thiên Di (Đối ngoại & xuất hành)' },
  { id: 'tat_ach', name: 'Tật Ách', label: 'Cung Tật Ách (Sức khỏe & tai ách)' },
  { id: 'tai_bach', name: 'Tài Bạch', label: 'Cung Tài Bạch (Dòng tiền & sinh kế)' },
  { id: 'tu_tuc', name: 'Tử Tức', label: 'Cung Tử Tức (Con cái & hậu duệ)' },
  { id: 'phu_the', name: 'Phu Thê', label: 'Cung Phu Thê (Hôn nhân & tình duyên)' },
  { id: 'huynh_de', name: 'Huynh Đệ', label: 'Cung Huynh Đệ (Anh em & bằng hữu thân thiết)' },
];

const TUVI_STAR_VN_MAP: Record<string, string> = {
  TU_VI: 'Tử Vi',
  THIEN_CO: 'Thiên Cơ',
  THAI_DUONG: 'Thái Dương',
  VU_KHUC: 'Vũ Khúc',
  THIEN_DONG: 'Thiên Đồng',
  LIEM_TRINH: 'Liêm Trinh',
  THAT_SAT: 'Thất Sát',
  PHA_QUAN: 'Phá Quân',
  THAM_LANG: 'Tham Lang',
  THIEN_PHU: 'Thiên Phủ',
  THIEN_LUONG: 'Thiên Lương',
  THIEN_TUONG: 'Thiên Tướng',
  CU_MON: 'Cự Môn',
  THAI_AM: 'Thái Âm',
  HOA_LOC: 'Hóa Lộc',
  HOA_QUYEN: 'Hóa Quyền',
  HOA_KHOA: 'Hóa Khoa',
  HOA_KY: 'Hóa Kỵ',
};

const TUVI_PALACE_VN_MAP: Record<string, string> = {
  PHU_THE: 'Thân Cư Phu Thê (Gia Đạo & Bạn Đời)',
  QUAN_LOC: 'Thân Cư Quan Lộc (Sự Nghiệp & Công Danh)',
  TAI_BACH: 'Thân Cư Tài Bạch (Dòng Tiền & Sinh Kế)',
  THIEN_DI: 'Thân Cư Thiên Di (Đối Ngoại & Xã Hội)',
  PHUC_DUC: 'Thân Cư Phúc Đức (Tâm Tính & Phúc Phần)',
  MENH: 'Thân Mệnh Đồng Cung (Bản Lĩnh Nhất Quán)',
  DIEN_TRACH: 'Thân Cư Điền Trạch (Cơ Nghiệp & Gia Sản)',
  NO_BOC: 'Thân Cư Nô Bộc (Bằng Hữu & Trợ Thủ)',
  TAT_ACH: 'Thân Cư Tật Ách (Sức Khỏe & Thể Trạng)',
  TU_TUC: 'Thân Cư Tử Tức (Hậu Duệ & Con Cái)',
  HUYNH_DE: 'Thân Cư Huynh Đệ (Anh Em & Tri Kỷ)',
  PHU_MAU: 'Thân Cư Phụ Mẫu (Xuất Thân & Nền Tảng)',
};

function formatTuViStar(val: unknown): string {
  if (!val) return '';
  const str = String(val).toUpperCase().trim();
  if (TUVI_STAR_VN_MAP[str]) return TUVI_STAR_VN_MAP[str];
  if (TUVI_PALACE_VN_MAP[str]) return TUVI_PALACE_VN_MAP[str];
  return String(val).replace(/_/g, ' ');
}

function formatTuViPalace(val: unknown): string {
  if (!val) return 'Thân Cư Tài / Quan / Di';
  const str = String(val).toUpperCase().trim();
  if (TUVI_PALACE_VN_MAP[str]) return TUVI_PALACE_VN_MAP[str];
  if (TUVI_STAR_VN_MAP[str]) return `Thân Cư ${TUVI_STAR_VN_MAP[str]}`;
  return String(val).replace(/_/g, ' ');
}

function formatTuViKey(key: string): string {
  const lower = key.toLowerCase();
  if (lower.includes('phu_the')) return 'Cung Phu Thê';
  if (lower.includes('quan_loc')) return 'Cung Quan Lộc';
  if (lower.includes('tai_bach')) return 'Cung Tài Bạch';
  if (lower.includes('thien_di')) return 'Cung Thiên Di';
  if (lower.includes('phuc_duc')) return 'Cung Phúc Đức';
  if (lower.includes('dien_trach')) return 'Cung Điền Trạch';
  if (lower.includes('menh')) return 'Cung Mệnh';
  if (lower.includes('tai')) return 'Cung Tài Bạch';
  if (lower.includes('quan')) return 'Cung Quan Lộc';
  if (lower.includes('di')) return 'Cung Thiên Di';
  if (lower.includes('phuc')) return 'Cung Phúc Đức';
  if (lower.includes('star')) return 'Chính Tinh';
  return key.replace(/_/g, ' ');
}

const DATA_COMPLETENESS_LABELS: Record<string, string> = {
  FULL: 'Đầy đủ',
  PARTIAL: 'Một phần',
  MINIMAL: 'Tối thiểu',
};

const CAN_CHI_BRANCH_VN: Record<string, string> = {
  TY_RAT: 'Tý', SUU_OX: 'Sửu', DAN_TIGER: 'Dần', MAO_CAT: 'Mão',
  THIN_DRAGON: 'Thìn', TY_SNAKE: 'Tỵ', NGO_HORSE: 'Ngọ', MUI_GOAT: 'Mùi',
  THAN_MONKEY: 'Thân', DAU_ROOSTER: 'Dậu', TUAT_DOG: 'Tuất', HOI_PIG: 'Hợi',
};

export function TuViResultView({
  result,
  className = '',
}: TuViResultViewProps) {
  const [palacesOpen, setPalacesOpen] = useState(false);
  const [selectedPalace, setSelectedPalace] = useState<PalaceDetail | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [techOpen, setTechOpen] = useState(false);

  const openPalaceDetail = (
    id: string,
    name: string,
    role: string,
    stars: string[],
    branch?: string,
    triad?: string[],
    interp?: string
  ) => {
    setSelectedPalace({
      id,
      name,
      role,
      stars: stars.filter(Boolean),
      branch,
      triadOpposition: triad,
      interpretation: interp,
    });
    setIsSheetOpen(true);
  };

  if (!result) return null;

  const school = result.metadata?.school || 'Tử Vi Đẩu Số Toàn Thư';

  // Extract Mệnh / Thân info from facts
  const menhBranchFact = (result.facts || []).find(
    (f) => typeof f.value === 'string' && CAN_CHI_BRANCH_VN[f.value.toUpperCase()] && f.key.includes('menh')
  );
  const thanBranchFact = (result.facts || []).find(
    (f) => typeof f.value === 'string' && CAN_CHI_BRANCH_VN[f.value.toUpperCase()] && f.key.includes('than')
  );
  const menhStarFact = (result.facts || []).find(
    (f) => (f.key === 'menhStar' || f.key === 'starCode' || f.key.includes('MENH')) &&
      typeof f.value === 'string' && f.value !== 'true' && f.value !== 'false' && f.value.length > 2
  );
  const thanPalaceRoleFact = (result.facts || []).find(
    (f) => f.key.includes('thanPalace') && typeof f.value === 'string' && f.value !== 'true'
  );

  const menhBranchVn = menhBranchFact
    ? CAN_CHI_BRANCH_VN[String(menhBranchFact.value).toUpperCase()]
    : 'Ngọ';
  const thanBranchVn = thanBranchFact
    ? CAN_CHI_BRANCH_VN[String(thanBranchFact.value).toUpperCase()]
    : 'Thìn';
  const menhStarVn = menhStarFact ? formatTuViStar(menhStarFact.value) : 'Phá Quân';
  const thanRoleVn = thanPalaceRoleFact ? formatTuViPalace(thanPalaceRoleFact.value) : 'Thân Cư Phúc Đức';

  // Extract Tam Phương stars dynamically from facts
  const getStarFromFacts = (key: string): string => {
    const fact = (result.facts || []).find((f) => f.key === key);
    return fact ? formatTuViStar(fact.value) : '';
  };
  const taiBachStarVn = getStarFromFacts('taiBachStar') || 'Vô Chính Diệu';
  const quanLocStarVn = getStarFromFacts('quanLocStar') || 'Vô Chính Diệu';
  const thienDiStarVn = getStarFromFacts('thienDiStar') || 'Vô Chính Diệu';

  // Data completeness badge
  const completenessKey = String(result.dataCompleteness || '').toUpperCase();
  const completenessLabel = DATA_COMPLETENESS_LABELS[completenessKey] || completenessKey;

  // Curated palaces: Mệnh, Quan, Tài, Di, Phúc
  const CURATED_PALACES = [
    { key: 'menhStar', label: 'Cung Mệnh', desc: 'Bản thể & Cốt cách' },
    { key: 'quanLocStar', label: 'Cung Quan Lộc', desc: 'Sự nghiệp & Công danh' },
    { key: 'taiBachStar', label: 'Cung Tài Bạch', desc: 'Dòng tiền & Sinh kế' },
    { key: 'thienDiStar', label: 'Cung Thiên Di', desc: 'Đối ngoại & Xã hội' },
    { key: 'phucDucStar', label: 'Cung Phúc Đức', desc: 'Tâm tính & Phúc phần' },
  ];

  // Timeline: Đại hạn / Tiểu hạn from facts
  const daiHanFact = (result.facts || []).find((f) => f.key === 'daiHan' || f.key.includes('daiHan'));
  const tieuHanFact = (result.facts || []).find((f) => f.key === 'tieuHan' || f.key.includes('tieuHan'));

  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Tổng Quan Thiên Bàn */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">02</span>
          <span>/</span>
          <span>Lá Số Tử Vi Đẩu Số</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
          {completenessLabel && (
            <span className={`ml-auto px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${completenessKey === 'FULL' ? 'border-accentGold/50 text-accentGold' : 'border-stone/50 text-stone'}`}>
              Độ đầy đủ: {completenessLabel}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Tổng Quan Thiên Bàn &amp; Trục Mệnh Thân
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Khảo cứu cấu trúc tinh diệu thiên bàn theo trường phái truyền thống: tọa độ cung Mệnh, thế đứng Tam Phương Tứ Chính và sự kích hoạt của Tứ Hóa.
          </p>
        </div>

        {/* Mệnh - Thân Core Display (Clickable for Detail Sheet) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'menh',
                'Mệnh',
                'Chủ về tính cách cốt tủy, tiềm năng căn bản và phong thái gốc rễ.',
                [menhStarVn],
                menhBranchVn,
                [
                  `Tài Bạch: ${taiBachStarVn}`,
                  `Quan Lộc: ${quanLocStarVn}`,
                  `Thiên Di: ${thienDiStarVn}`,
                ]
              )
            }
            className="border border-borderDark bg-surface p-5 space-y-1.5 text-left hover:border-accentGold transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
                <Shield className="w-4 h-4 text-accentGold shrink-0" />
                <span>CUNG MỆNH (TIÊN THIÊN)</span>
              </div>
              <span className="text-[10px] font-mono text-stone group-hover:text-accentGold uppercase">[XEM CẤU TRÚC]</span>
            </div>
            <p className="text-parchment font-serif text-lg font-medium">
              Cung {menhBranchVn} ({menhStarVn} Tọa Thủ)
            </p>
            <p className="text-xs font-sans text-stone">
              Chủ về tính cách cốt tủy, tiềm năng căn bản và phong thái gốc rễ.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'than',
                'Thân',
                'Chủ về hành động thực tế từ trung vận và khuynh hướng chuyển hóa đời sống.',
                [thanRoleVn],
                thanBranchVn
              )
            }
            className="border border-borderDark bg-surface p-5 space-y-1.5 text-left hover:border-accentGold transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-stone uppercase tracking-wider">
                <Shield className="w-4 h-4 text-stone shrink-0" />
                <span>CUNG THÂN (HẬU THIÊN)</span>
              </div>
              <span className="text-[10px] font-mono text-stone group-hover:text-accentGold uppercase">[XEM CẤU TRÚC]</span>
            </div>
            <p className="text-parchment font-serif text-lg font-medium">
              Cung {thanBranchVn} ({thanRoleVn})
            </p>
            <p className="text-xs font-sans text-stone">
              Chủ về hành động thực tế từ trung vận và khuynh hướng chuyển hóa đời sống.
            </p>
          </button>
        </div>
      </header>

      {/* 2. Main Story Callout */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Thiên Bàn">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 2.5. Mệnh ↔ Thân Interaction (Spec 24) */}
      <section aria-label="Tương Tác Mệnh Thân" className="border border-borderDark bg-surface p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase border-b border-borderDark/60 pb-3">
          <span className="text-accentGold">02b</span>
          <span className="text-borderLight">/</span>
          <span>TƯƠNG TÁC MỆNH ↔ THÂN (TIÊN THIÊN VÀ HẬU VẬN)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-4 bg-background/50 border border-borderDark space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">ĐIỂM TƯƠNG ĐỒNG</span>
            <p className="text-xs text-parchment leading-relaxed">
              Cung Mệnh tại {menhBranchVn} và Cung Thân tại {thanBranchVn} tương tác liên hoàn qua ngũ hành bản mệnh.
            </p>
          </div>
          <div className="p-4 bg-background/50 border border-borderDark space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">ĐIỂM BỔ TRỢ HẬU THIÊN</span>
            <p className="text-xs text-parchment leading-relaxed">
              Từ trung vận, vị trí {thanRoleVn} dần dẫn dắt hành động thực tiễn, chuyển hóa năng lượng khởi đầu.
            </p>
          </div>
          <div className="p-4 bg-background/50 border border-borderDark space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">ĐIỂM CÂN BẰNG NĂNG LƯỢNG</span>
            <p className="text-xs text-parchment leading-relaxed">
              Duy trì sự nhất quán giữa lý tưởng khởi xướng ({menhStarVn}) và môi trường ứng tác thực tế.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Tam Phương Tứ Chính & Tứ Hóa Kích Hoạt */}
      <section aria-label="Tam Phương Tứ Chính" className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4">
        <div className="border-b border-borderDark/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
            <span className="text-accentGold">03</span>
            <span className="text-borderLight">/</span>
            <span>TAM PHƯƠNG TỨ CHÍNH &amp; TỨ HÓA KÍCH HOẠT</span>
          </div>
          <span className="font-mono text-xs text-accentGold">[LIÊN CUNG HỘI CHIẾU]</span>
        </div>

        <h3 className="text-lg font-serif text-parchment font-medium">
          Trục Hội Chiếu Trọng Yếu: Mệnh — Tài — Quan — Di
        </h3>

        <p className="text-stone text-sm leading-relaxed">
          Tử Vi không xem xét một cung độc lập. Năng lượng của bản mệnh chịu sự chi phối chặt chẽ từ thế giằng co và hỗ trợ giữa cung Tài Bạch (sinh kế), cung Quan Lộc (sự nghiệp) và cung Thiên Di (môi trường đối ngoại).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'menh',
                'Mệnh',
                'Bản thể & Cốt cách tiên thiên.',
                [menhStarVn],
                menhBranchVn,
                [`Tài Bạch: ${taiBachStarVn}`, `Quan Lộc: ${quanLocStarVn}`, `Thiên Di: ${thienDiStarVn}`]
              )
            }
            className="border border-borderDark bg-background/60 p-4 space-y-1 text-center hover:border-accentGold transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block">CUNG MỆNH (Cung {menhBranchVn})</span>
            <span className="font-serif text-base text-parchment font-medium block">{menhStarVn}</span>
            <span className="font-mono text-[10px] text-stone block">Bản thể &amp; Cốt cách</span>
          </button>
          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'tai_bach',
                'Tài Bạch',
                'Dòng tiền & Sinh kế thực tế.',
                [taiBachStarVn],
                undefined,
                [`Mệnh: ${menhStarVn}`, `Quan Lộc: ${quanLocStarVn}`]
              )
            }
            className="border border-borderDark bg-background/60 p-4 space-y-1 text-center hover:border-accentGold transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">CUNG TÀI BẠCH</span>
            <span className="font-serif text-base text-parchment font-medium block">{taiBachStarVn}</span>
            <span className="font-mono text-[10px] text-stone block">Dòng tiền &amp; Sinh kế</span>
          </button>
          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'quan_loc',
                'Quan Lộc',
                'Sự nghiệp, công danh và năng lực thực thi.',
                [quanLocStarVn],
                undefined,
                [`Mệnh: ${menhStarVn}`, `Tài Bạch: ${taiBachStarVn}`]
              )
            }
            className="border border-borderDark bg-background/60 p-4 space-y-1 text-center hover:border-accentGold transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">CUNG QUAN LỘC</span>
            <span className="font-serif text-base text-parchment font-medium block">{quanLocStarVn}</span>
            <span className="font-mono text-[10px] text-stone block">Sự nghiệp &amp; Công danh</span>
          </button>
          <button
            type="button"
            onClick={() =>
              openPalaceDetail(
                'thien_di',
                'Thiên Di',
                'Môi trường đối ngoại, xuất hành và không gian xã hội.',
                [thienDiStarVn],
                undefined,
                [`Đối xung Cung Mệnh (${menhStarVn})`]
              )
            }
            className="border border-borderDark bg-background/60 p-4 space-y-1 text-center hover:border-accentGold transition-colors cursor-pointer"
          >
            <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">CUNG THIÊN DI</span>
            <span className="font-serif text-base text-parchment font-medium block">{thienDiStarVn}</span>
            <span className="font-mono text-[10px] text-stone block">Môi trường đối ngoại</span>
          </button>
        </div>
      </section>

      {/* 4. Deep Interpretations */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Tinh Diệu Đa Tầng" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI TINH DIỆU &amp; CÁCH CỤC CHI TIẾT</span>
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

      {/* 4.5. Các Cung Đáng Chú Ý (Curated Palaces) */}
      <section aria-label="Các Cung Đáng Chú Ý" className="border border-borderDark bg-surface p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase border-b border-borderDark/60 pb-3">
          <span className="text-accentGold">05</span>
          <span className="text-borderLight">/</span>
          <span>CÁC CUNG ĐÁNG CHÚ Ý</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CURATED_PALACES.map((palace) => {
            const starVn = getStarFromFacts(palace.key);
            return (
              <button
                key={palace.key}
                type="button"
                onClick={() =>
                  openPalaceDetail(
                    palace.key,
                    palace.label,
                    palace.desc,
                    [starVn || 'Vô Chính Diệu']
                  )
                }
                className="border border-borderDark bg-background/50 p-4 space-y-1 text-left hover:border-accentGold transition-colors cursor-pointer"
              >
                <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block">{palace.label}</span>
                <span className="font-serif text-sm text-parchment font-medium block">
                  {starVn || 'Vô Chính Diệu'}
                </span>
                <span className="font-mono text-[10px] text-stone block">{palace.desc}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4.7. Timeline Vận Trình (if available) */}
      {(daiHanFact || tieuHanFact) && (
        <section aria-label="Timeline Vận Trình" className="border border-borderDark bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase border-b border-borderDark/60 pb-3">
            <span className="text-accentGold">05b</span>
            <span className="text-borderLight">/</span>
            <span>TIMELINE VẬN TRÌNH</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {daiHanFact && (
              <div className="border border-borderDark bg-background/50 p-4 space-y-1">
                <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block">ĐẠI HẠN</span>
                <span className="font-serif text-sm text-parchment font-medium block">{String(daiHanFact.value)}</span>
              </div>
            )}
            {tieuHanFact && (
              <div className="border border-borderDark bg-background/50 p-4 space-y-1">
                <span className="font-mono text-[10px] text-stone uppercase tracking-wider block">TIỂU HẠN</span>
                <span className="font-serif text-sm text-parchment font-medium block">{String(tieuHanFact.value)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Khám Phá 12 Cung Chức (Exploration Drawer) */}
      <section aria-label="Khám Phá 12 Cung" className="border border-borderDark bg-surface">
        <button
          type="button"
          onClick={() => setPalacesOpen(!palacesOpen)}
          aria-expanded={palacesOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surfaceHover/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-accentGold shrink-0" />
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-stone tracking-widest uppercase block">
                KHÁM PHÁ CHI TIẾT (EXPLORATION LAYER)
              </span>
              <h4 className="font-serif text-lg text-parchment font-medium">
                Tra Cứu Cấu Trúc 12 Cung Chức Thiên Bàn
              </h4>
              <p className="font-sans text-xs text-stone">
                Mở rộng khám phá các cung: Tài, Quan, Phối, Tử, Phúc, Điền...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone shrink-0">
            <span className="hidden sm:inline uppercase">
              {palacesOpen ? '[THU GỌN]' : '[MỞ RỘNG]'}
            </span>
            {palacesOpen ? (
              <ChevronUp className="w-4 h-4 text-accentGold" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone" />
            )}
          </div>
        </button>

        {palacesOpen && (
          <div className="border-t border-borderDark p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
            {TU_VI_12_PALACES.map((palace) => (
              <button
                key={palace.id}
                type="button"
                onClick={() =>
                  openPalaceDetail(
                    palace.id,
                    palace.name,
                    palace.label,
                    [],
                    undefined,
                    undefined,
                    `Tra cứu vị trí và sự tác động của cung ${palace.name} trên thiên bàn 12 cung chức.`
                  )
                }
                className="border border-borderDark bg-background/50 p-4 space-y-1 text-left hover:border-accentGold transition-colors cursor-pointer"
              >
                <span className="font-mono text-[10px] uppercase text-accentGold tracking-wider block">
                  {palace.name}
                </span>
                <p className="font-serif text-sm text-parchment font-medium">
                  {palace.label}
                </p>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 6. Real-life Scenarios */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Vận Trình">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="KỊCH BẢN VẬN TRÌNH THỰC TẾ"
          />
        </section>
      )}

      {/* 7. Actionable Guidance */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Định Hướng Vận Mệnh" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>ĐỊNH HƯỚNG DƯỠNG MỆNH &amp; HÓA GIẢI XUNG HẠN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>CÁCH CỤC THUẬN LỢI NÊN NƯƠNG THEO</span>
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
                  <span>SÁT TINH &amp; ĐIỂM NGHẼN CẦN PHÒNG BỊ</span>
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
          description="Truy vết logic tất định 100% qua quy tắc an sao Tử Vi Đẩu Số Toàn Thư và các chứng cứ thư tịch cổ."
        />
      </section>

      {/* 8.5. Technical Details (Screen 11 - Spec 34) */}
      <section aria-label="Thông Số Kỹ Thuật" className="border border-borderDark bg-surface">
        <button
          type="button"
          onClick={() => setTechOpen(!techOpen)}
          aria-expanded={techOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surfaceHover/50 transition-colors"
        >
          <div className="space-y-0.5">
            <span className="font-mono text-xs text-stone tracking-widest uppercase block">
              CHI TIẾT KỸ THUẬT THIÊN BÀN (SCREEN 11)
            </span>
            <h4 className="font-serif text-base text-parchment font-medium">
              Thông Số Cổ Bản, Nạp Âm &amp; Quy Tắc An Sao
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
                <span>Tất Định 100%</span>
              </div>
              <div>
                <span className="text-parchment block">Độ Đầy Đủ:</span>
                <span>{completenessLabel}</span>
              </div>
              <div>
                <span className="text-parchment block">Quy Tắc:</span>
                <span>{result.technical?.rulesMatchedCount || 12} quy tắc khớp</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 8.7. End State Exploration & Actions (Spec 35) */}
      <section aria-label="Điều Hướng Sau Khảo Cứu" className="p-6 border border-borderDark bg-surface/80 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-accentGold uppercase tracking-widest block">
            BẠN VỪA KHÁM PHÁ
          </span>
          <p className="font-serif text-base text-parchment font-medium">
            {result.mainStory?.headline || result.primaryResult || 'Lá Số Tử Vi Đẩu Số Toàn Thư'}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('[aria-label="Timeline Vận Trình"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 border border-borderDark bg-background hover:border-accentGold text-parchment text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Khám phá vận hiện tại →
          </button>
          <button
            type="button"
            onClick={() => {
              setPalacesOpen(true);
              const el = document.querySelector('[aria-label="Khám Phá 12 Cung"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 border border-borderDark bg-background hover:border-accentGold text-parchment text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Xem 12 cung chức →
          </button>
          <button
            type="button"
            onClick={() => {
              const el = document.querySelector('[aria-label="Minh Bạch Suy Luận"]');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 border border-accentGold/60 bg-accentGold/10 hover:bg-accentGold hover:text-background text-accentGold text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Xem cơ sở luận giải ✦
          </button>
        </div>
      </section>

      {/* 9. Result Footer */}
      <ResultFooter
        topic="Lá Số Tử Vi Đẩu Số"
        exploreLinks={[
          { label: 'Khảo Cứu Chiêm Tinh Bản Đồ Sao', href: '/astrology' },
          { label: 'Khảo Cứu Thần Số Học Pythagoras', href: '/numerology' },
          { label: 'Khảo Cứu Bói Bài Tarot 78 Lá', href: '/tarot' },
        ]}
      />

      {/* Interactive Palace Detail Sheet (Spec 26) */}
      <PalaceDetailSheet
        isOpen={isSheetOpen}
        palace={selectedPalace}
        onClose={() => setIsSheetOpen(false)}
        onOpenWhy={() => {
          const el = document.querySelector('[aria-label="Minh Bạch Suy Luận"]');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </article>
  );
}
