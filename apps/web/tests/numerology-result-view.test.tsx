import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { NumerologyResultView } from '../components/domain-results/NumerologyResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('NumerologyResultView Grammar', () => {
  it('renders primary reading before core numbers evidence', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'numerology',
      primaryResult: 'Điểm nổi bật nhất: Năng lực dẫn dắt kết hợp nội tâm tìm kiếm sự bình an.',
      summary: 'Tổng quan số học',
      confidenceScore: 0.9,
      facts: [
        { key: 'lifepath', value: 7 },
        { key: 'destiny', value: 1 },
      ],
      metadata: { school: 'Pythagorean System' },
    } as any;

    const html = renderToStaticMarkup(<NumerologyResultView result={mockResult} />);
    expect(html).toContain('Hồ Sơ Thần Số Học Pythagoras');
    expect(html).toContain('ĐIỂM NỔI BẬT NHẤT');
    expect(html).toContain('CƠ SỞ CHỈ SỐ CỐT LÕI (EVIDENCE LAYER)');
    expect(html).toContain('Bạn vừa xem:');
  });
});
