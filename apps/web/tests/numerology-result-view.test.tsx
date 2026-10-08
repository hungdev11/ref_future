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
    expect(html).toContain('CƠ SỞ CHỈ SỐ CỐT LÕI (CLICK ĐỂ XEM CHI TIẾT)');
    expect(html).toContain('Bạn vừa xem:');
  });

  it('renders Number Interactions visual, Life Cycles timeline and Current Cycle hero (Spec 40, 41, 42)', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'numerology',
      primaryResult: 'Điểm nổi bật nhất: Năng lực dẫn dắt kết hợp nội tâm tìm kiếm sự bình an.',
      summary: 'Tổng quan số học',
      confidenceScore: 0.9,
      facts: [
        { key: 'lifepath', value: 7 },
        { key: 'destiny', value: 1 },
        { key: 'soul', value: 3 },
        { key: 'personalYear', value: 5 },
      ],
      metadata: { school: 'Pythagorean System' },
    } as any;

    const html = renderToStaticMarkup(<NumerologyResultView result={mockResult} />);
    // Spec 40: Number interactions visual
    expect(html).toContain('TRỤC TƯƠNG TÁC SỐ HỌC (NUMBER INTERACTIONS)');
    expect(html).toContain('ĐƯỜNG ĐỜI (LIFE PATH)');
    expect(html).toContain('SỨ MỆNH (EXPRESSION)');
    expect(html).toContain('LINH HỒN (SOUL URGE)');
    // Spec 41: Life cycles
    expect(html).toContain('4 GIAI ĐOẠN CHU KỲ CUỘC ĐỜI (LIFE CYCLES)');
    expect(html).toContain('Giai Đoạn 1');
    expect(html).toContain('Giai Đoạn 4');
    // Spec 42: Current cycle
    expect(html).toContain('GIAI ĐOẠN HIỆN TẠI (CURRENT CYCLE CONTEXT)');
    expect(html).toContain('Năm Số 5: Thời Điểm Tái Cấu Trúc &amp; Khởi Sắc');
    // Spec 37 item 9: Technical calculation
    expect(html).toContain('CHI TIẾT KỸ THUẬT &amp; CÔNG THỨC (CALCULATION)');
  });
});
