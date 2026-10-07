/**
 * MYSTICOS — Authentic Deterministic Tarot Interpretation Library
 * Based on Rider-Waite-Smith 1909 classical iconography & psychological archetype traditions.
 * 100% Deterministic: Same card + orientation + position = Same rigorous interpretation.
 * No unverified canned prose blobs. Semantic mapping via @mystic/knowledge-base.
 */

import { TAROT_SEMANTIC_PROFILES } from './semantic-profiles.js';
import { TAROT_CLAIMS } from '@mystic/knowledge-base';

export interface TarotCardInsight {
  cardCode: string;
  nameVn: string;
  keywords: string[];
  symbolism: string;
  uprightMeaning: string;
  reversedMeaning: string;
  careerFinance: {
    upright: string;
    reversed: string;
  };
  loveRelationship: {
    upright: string;
    reversed: string;
  };
  dos: {
    upright: string;
    reversed: string;
  };
  donts: {
    upright: string;
    reversed: string;
  };
}

export const MAJOR_ARCANA_NAMES_VN: Record<string, string> = {
  MAJOR_00_FOOL: '0 — Chàng Khờ (The Fool)',
  MAJOR_01_MAGICIAN: 'I — Pháp Sư (The Magician)',
  MAJOR_02_HIGH_PRIESTESS: 'II — Nữ Giáo Hoàng (The High Priestess)',
  MAJOR_03_EMPRESS: 'III — Nữ Hoàng (The Empress)',
  MAJOR_04_EMPEROR: 'IV — Hoàng Đế (The Emperor)',
  MAJOR_05_HIEROPHANT: 'V — Thầy Giáo Hoàng (The Hierophant)',
  MAJOR_06_LOVERS: 'VI — Người Tình (The Lovers)',
  MAJOR_07_CHARIOT: 'VII — Cỗ Xe (The Chariot)',
  MAJOR_08_STRENGTH: 'VIII — Sức Mạnh (Strength)',
  MAJOR_09_HERMIT: 'IX — Ẩn Sĩ (The Hermit)',
  MAJOR_10_WHEEL_OF_FORTUNE: 'X — Bánh Xe Vận Mệnh (Wheel of Fortune)',
  MAJOR_11_JUSTICE: 'XI — Công Lý (Justice)',
  MAJOR_12_HANGED_MAN: 'XII — Người Treo Ngược (The Hanged Man)',
  MAJOR_13_DEATH: 'XIII — Cái Chết (Death)',
  MAJOR_14_TEMPERANCE: 'XIV — Tiết Chế (Temperance)',
  MAJOR_15_DEVIL: 'XV — Ác Quỷ (The Devil)',
  MAJOR_16_TOWER: 'XVI — Tòa Tháp (The Tower)',
  MAJOR_17_STAR: 'XVII — Ngôi Sao (The Star)',
  MAJOR_18_MOON: 'XVIII — Mặt Trăng (The Moon)',
  MAJOR_19_SUN: 'XIX — Mặt Trời (The Sun)',
  MAJOR_20_JUDGEMENT: 'XX — Phán Xét (Judgement)',
  MAJOR_21_WORLD: 'XXI — Thế Giới Viên Mãn (The World)',
};

export const MAJOR_ARCANA_DETAILED: Record<string, TarotCardInsight> = Object.fromEntries(
  Object.entries(TAROT_SEMANTIC_PROFILES)
    .filter(([_, p]) => p.arcana === 'MAJOR')
    .map(([code, profile]) => {
      const nameVn = MAJOR_ARCANA_NAMES_VN[code] || profile.name;
      const claim = TAROT_CLAIMS.find(
        (c) => c.subject.toLowerCase() === profile.name.toLowerCase()
      );
      const symbolism = claim
        ? `${claim.paraphrase} (Nguồn: ${claim.sourceId})`
        : `Biểu tượng nguyên tố ${profile.element}: ${profile.themes.join(', ')}.`;

      const insight: TarotCardInsight = {
        cardCode: code,
        nameVn,
        keywords: [...profile.constructive, ...profile.themes].slice(0, 4),
        symbolism,
        uprightMeaning: `${nameVn}: Năng lượng thuận dòng hướng đến ${profile.constructive.join(', ')}. Động lực: ${profile.dynamics.join(', ')}.`,
        reversedMeaning: `${nameVn} (ngược): Cảnh báo trở ngại hoặc mất cân bằng xoay quanh ${profile.shadow.join(', ')}.`,
        careerFinance: {
          upright: `Phát huy ${profile.constructive[0] || 'năng lực'} và ${profile.constructive[1] || 'sáng kiến'}.`,
          reversed: `Cẩn trọng nguy cơ ${profile.shadow[0] || 'bất cẩn'} trong công việc và tài chính.`,
        },
        loveRelationship: {
          upright: `Gắn kết qua ${profile.constructive[0] || 'thấu cảm'}.`,
          reversed: `Tránh để ${profile.shadow[0] || 'xung đột'} ảnh hưởng tới mối quan hệ.`,
        },
        dos: {
          upright: `Tập trung phát huy ${profile.constructive.join(', ')}.`,
          reversed: `Nhận diện và điều chỉnh ${profile.shadow.slice(0, 2).join(', ')}.`,
        },
        donts: {
          upright: `Không để ${profile.shadow[0] || 'tiêu cực'} cản trở tiến trình.`,
          reversed: `Không cố chấp hoặc rơi vào trạng thái ${profile.shadow.join(', ')}.`,
        },
      };

      return [code, insight];
    })
);

import { MINOR_ARCANA_DETAILED } from './minor-arcana-data.js';
export { MINOR_ARCANA_DETAILED };

/**
 * Generate detailed insights for Minor Arcana cards deterministically
 */
export function getMinorArcanaInsight(
  suit: string,
  rankNum: number,
  cardName: string
): TarotCardInsight {
  const COURT_NAMES: Record<number, string> = {
    1: 'ACE',
    11: 'PAGE',
    12: 'KNIGHT',
    13: 'QUEEN',
    14: 'KING',
  };
  const rankKey = COURT_NAMES[rankNum] ?? String(rankNum);
  const code = `${suit}_${String(rankNum).padStart(2, '0')}_${rankKey}`;
  const codeAlt = `${suit}_${String(rankNum).padStart(2, '0')}`;

  if (MINOR_ARCANA_DETAILED[code]) {
    return MINOR_ARCANA_DETAILED[code]!;
  }
  if (MINOR_ARCANA_DETAILED[codeAlt]) {
    return MINOR_ARCANA_DETAILED[codeAlt]!;
  }

  // Fallback
  return {
    cardCode: code,
    nameVn: cardName,
    keywords: [cardName, suit],
    symbolism: `Lá bài thuộc bộ ${suit}.`,
    uprightMeaning: `Năng lượng thuận dòng của lá ${cardName}.`,
    reversedMeaning: `Cảnh báo năng lượng nghẽn của lá ${cardName}.`,
    careerFinance: {
      upright: 'Thuận lợi trong công việc và tài chính.',
      reversed: 'Cẩn trọng trong các quyết định tài chính.',
    },
    loveRelationship: {
      upright: 'Tình cảm hài hòa và gắn kết.',
      reversed: 'Cần đối thoại chân thành để tháo gỡ khúc mắc.',
    },
    dos: {
      upright: 'Hành động kiên định và chính trực.',
      reversed: 'Bình tâm rà soát lại hoàn cảnh.',
    },
    donts: {
      upright: 'Không chủ quan nóng vội.',
      reversed: 'Không quyết định khi đang bốc đồng.',
    },
  };
}
