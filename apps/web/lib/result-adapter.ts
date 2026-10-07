import type { MysticosResult } from '@mystic/core';

export interface UserFacingTheme {
  id: string;
  title: string;
  description: string;
  relevance: 'primary' | 'secondary';
}

export interface UserFacingManifestation {
  context: string;
  detail: string;
}

export interface UserFacingTension {
  dynamic: string;
  resolution: string;
}

export interface UserFacingGuidance {
  priority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  continueItems: string[];
  adjustOrStopItems: string[];
  rationale: string;
}

export interface UserFacingResult {
  domain: string;
  domainTitle: string;
  domainNumber: string;
  school: string;
  headline: string;
  summary: string;
  keyThemes: UserFacingTheme[];
  manifestations: UserFacingManifestation[];
  tensions: UserFacingTension[];
  guidance: UserFacingGuidance[];
  whyCount: number;
  evidenceCount: number;
  rawResult: MysticosResult;
}

const DOMAIN_MAP: Record<string, { label: string; number: string }> = {
  tarot: { label: 'Khảo Cứu Tarot Rider-Waite', number: '04' },
  astrology: { label: 'Bản Đồ Sao Chiêm Tinh Học', number: '01' },
  tuvi: { label: 'Thiên Bàn Tử Vi Đẩu Số', number: '02' },
  numerology: { label: 'Hệ Thống Thần Số Học Pythagoras', number: '03' },
  compatibility: { label: 'Khảo Luận Tương Hợp Bản Mệnh', number: '05' },
};

export function adaptToUserFacingResult(result: MysticosResult): UserFacingResult {
  const meta = DOMAIN_MAP[result.domain] || {
    label: `Khảo Cứu ${result.domain?.toUpperCase() || 'Vận Mệnh'}`,
    number: '00',
  };

  const primaryInterp = result.interpretations?.[0];
  const headline = primaryInterp?.headline || 'Tổng Quan Khảo Cứu';
  const summary = primaryInterp?.statement ||
    'Các dấu chỉ thiên văn và biểu tượng cho thấy những xu hướng vận động quan trọng trong giai đoạn hiện tại.';

  // Select top 3 primary themes (Editorial judgment: maximum 3)
  const keyThemes: UserFacingTheme[] = (result.patterns || [])
    .slice(0, 3)
    .map((pat, idx) => ({
      id: pat.patternId || `theme_${idx}`,
      title: pat.headline || `Chủ Đề ${idx + 1}`,
      description: (result.interpretations?.[idx]?.statement || pat.headline),
      relevance: idx === 0 ? 'primary' : 'secondary',
    }));

  // Collect manifestations
  const manifestations: UserFacingManifestation[] = (result.implications || []).map((imp) => ({
    context: imp.context || 'Đời sống thường nhật',
    detail: imp.manifestation,
  }));

  // Collect tensions & risks
  const tensions: UserFacingTension[] = (result.tensions || []).map((t) => ({
    dynamic: t.dynamics || `${t.traitA} giao thoa cùng ${t.traitB}`,
    resolution: t.resolution || 'Cân bằng giữa các nhu cầu nội tại để giữ vững sự ổn định.',
  }));

  // Collect actionable guidance
  const guidance: UserFacingGuidance[] = (result.guidance || []).map((g) => ({
    priority: g.actionPriority || 'STRATEGIC',
    continueItems: g.whatToContinue || [],
    adjustOrStopItems: g.whatToAdjustOrStop || [],
    rationale: g.rationale || '',
  }));

  return {
    domain: result.domain,
    domainTitle: meta.label,
    domainNumber: meta.number,
    school: result.metadata?.school || 'Truyền Thống Chuẩn Xác',
    headline,
    summary,
    keyThemes,
    manifestations,
    tensions,
    guidance,
    whyCount: (result.signals?.length || 0) + (result.patterns?.length || 0),
    evidenceCount: result.evidence?.length || 0,
    rawResult: result,
  };
}
