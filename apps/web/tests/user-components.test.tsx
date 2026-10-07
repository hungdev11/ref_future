import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResultHero } from '../components/result/ResultHero';
import { KeyThemes } from '../components/result/KeyThemes';
import { PracticalGuidance } from '../components/result/PracticalGuidance';
import { adaptToUserFacingResult } from '../lib/result-adapter';
import type { MysticosResult } from '@mystic/core';

// ponytail: lightweight render/screen test harness using react-dom/server to avoid adding @testing-library/react dependency
let lastMarkup = '';
const render = (ui: React.ReactElement) => {
  lastMarkup = renderToStaticMarkup(ui);
};

const screen = {
  getByText: (matcher: string | RegExp) => {
    if (typeof matcher === 'string') {
      if (!lastMarkup.includes(matcher)) {
        throw new Error(`Unable to find element with text: ${matcher}`);
      }
      return matcher;
    }
    if (!matcher.test(lastMarkup)) {
      throw new Error(`Unable to find element with regex: ${matcher}`);
    }
    return matcher;
  },
};

describe('User Needs Component Suite', () => {
  const dummyResult: MysticosResult = {
    resultId: 'TEST_1',
    domain: 'astrology',
    inputSummary: {},
    facts: [{ key: 'Sun', value: 'Aries', domain: 'astrology', source: 'chart' }],
    semantics: [],
    signals: [],
    relationships: [],
    patterns: [{ patternId: 'P1', type: 'CORE', headline: 'Bản Lĩnh Tiên Phong', signalIds: [], relationshipIds: [], dominance: 0.9, contextFit: 0.9 }],
    tensions: [],
    interpretations: [{
      interpretationId: 'I1',
      dimension: 'overview',
      statementId: 'S1',
      headline: 'Ý Chí Khởi Xướng Mạnh Mẽ',
      statement: 'Bạn sở hữu nguồn năng lượng mở đường dồi dào và trực diện.',
      polarity: 'supportive',
      strength: 0.9,
      confidence: 0.9,
      patternIds: ['P1'],
      signalIds: [],
      ruleIds: [],
      evidenceIds: [],
    }],
    implications: [],
    guidance: [{
      guidanceId: 'G1',
      implicationId: 'I1',
      actionPriority: 'IMMEDIATE',
      whatToContinue: ['Chủ động đề xuất phương án'],
      whatToAdjustOrStop: ['Không nóng vội bỏ qua chi tiết'],
      rationale: 'Hành động nhanh cần đi kèm kỷ luật.',
    }],
    evidence: [],
    conflicts: [],
    technical: { calculationTimeMs: 2, rulesEvaluatedCount: 5, rulesMatchedCount: 1 },
    metadata: { engineVersion: '3.0.0', knowledgeBaseVersion: '2026.10', rulesVersion: '2026.10', school: 'Classical', deterministic: true, calculatedAt: '2026-10-07' },
  };

  it('renders ResultHero answering what the result is', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<ResultHero result={vm} />);
    expect(screen.getByText('Ý Chí Khởi Xướng Mạnh Mẽ')).toBeDefined();
    expect(screen.getByText(/Bạn sở hữu nguồn năng lượng mở đường/)).toBeDefined();
  });

  it('renders KeyThemes displaying top patterns', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<KeyThemes themes={vm.keyThemes} />);
    expect(screen.getByText('Bản Lĩnh Tiên Phong')).toBeDefined();
  });

  it('renders PracticalGuidance displaying actionable items', () => {
    const vm = adaptToUserFacingResult(dummyResult);
    render(<PracticalGuidance guidance={vm.guidance} />);
    expect(screen.getByText('Chủ động đề xuất phương án')).toBeDefined();
    expect(screen.getByText('Không nóng vội bỏ qua chi tiết')).toBeDefined();
  });
});
