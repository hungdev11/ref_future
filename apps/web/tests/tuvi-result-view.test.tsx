import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { TuViResultView } from '../components/domain-results/TuViResultView';
import type { DeepMysticosResult } from '@mystic/core';

// ponytail: lightweight render/screen using react-dom/server, avoids @testing-library/react dep
let lastMarkup = '';
const render = (ui: React.ReactElement) => {
  lastMarkup = renderToStaticMarkup(ui);
  return { container: { innerHTML: lastMarkup } };
};
const screen = {
  getByText: (matcher: string | RegExp) => {
    if (typeof matcher === 'string') {
      if (!lastMarkup.includes(matcher)) throw new Error(`Unable to find text: ${matcher}`);
      return matcher;
    }
    if (!matcher.test(lastMarkup)) throw new Error(`Unable to find regex: ${matcher}`);
    return matcher;
  },
};

describe('TuViResultView Dynamic Data', () => {
  it('does not render hardcoded Tham Lang or That Sat when chart does not have them', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Lá số có xu hướng phát triển bền vững.',
      summary: 'Tổng quan lá số',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [
        { key: 'menhBranch', value: 'NGO_HORSE' },
        { key: 'menhStar', value: 'TU_VI' },
        { key: 'thanBranch', value: 'THIN_DRAGON' },
        { key: 'thanPalaceRole', value: 'PHUC_DUC' },
        { key: 'taiBachStar', value: 'THIEN_PHU' },
        { key: 'quanLocStar', value: 'THIEN_TUONG' },
        { key: 'thienDiStar', value: 'THAI_DUONG' },
      ],
      interpretations: [],
      metadata: { school: 'Tử Vi Đẩu Số Toàn Thư' },
    } as any;

    const { container } = render(<TuViResultView result={mockResult} />);
    const html = container.innerHTML;
    // Should render dynamic stars from facts
    expect(screen.getByText(/Thiên Phủ/i)).toBeDefined();
    expect(screen.getByText(/Thiên Tướng/i)).toBeDefined();
    // Should NOT render hardcoded old stars
    expect(html).not.toContain('Tham Lang');
    expect(html).not.toContain('Thất Sát');
  });

  it('renders data completeness badge FULL properly', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [],
      interpretations: [],
      metadata: { school: 'Tử Vi' },
    } as any;

    render(<TuViResultView result={mockResult} />);
    expect(screen.getByText(/Đầy đủ/i)).toBeDefined();
  });

  it('renders data completeness badge PARTIAL properly', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.8,
      dataCompleteness: 'PARTIAL',
      facts: [],
      interpretations: [],
      metadata: { school: 'Tử Vi' },
    } as any;

    render(<TuViResultView result={mockResult} />);
    expect(screen.getByText(/Một phần/i)).toBeDefined();
  });

  it('renders curated palaces section', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [
        { key: 'menhStar', value: 'TU_VI' },
        { key: 'quanLocStar', value: 'THIEN_TUONG' },
      ],
      interpretations: [],
      metadata: { school: 'Tử Vi' },
    } as any;

    render(<TuViResultView result={mockResult} />);
    expect(screen.getByText(/Các Cung Đáng Chú Ý/i)).toBeDefined();
  });

  it('renders dynamic Tam Phuong from facts not hardcode', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [
        { key: 'menhBranch', value: 'NGO_HORSE' },
        { key: 'menhStar', value: 'THIEN_CO' },
        { key: 'taiBachStar', value: 'VU_KHUC' },
        { key: 'quanLocStar', value: 'THIEN_DONG' },
        { key: 'thienDiStar', value: 'LIEM_TRINH' },
      ],
      interpretations: [],
      metadata: { school: 'Tử Vi' },
    } as any;

    const { container } = render(<TuViResultView result={mockResult} />);
    const html = container.innerHTML;
    expect(html).toContain('Thiên Cơ'); // menhStar
    expect(html).toContain('Vũ Khúc');  // taiBachStar
    expect(html).toContain('Thiên Đồng'); // quanLocStar
    expect(html).not.toContain('Tham Lang');
    expect(html).not.toContain('Thất Sát');
  });

  it('renders Menh-Than interaction, Technical details and End state exploration', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Cốt cách vững vàng',
      summary: 'Test',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [
        { key: 'menhBranch', value: 'NGO_HORSE' },
        { key: 'menhStar', value: 'TU_VI' },
        { key: 'thanBranch', value: 'THIN_DRAGON' },
        { key: 'thanPalaceRole', value: 'PHUC_DUC' },
      ],
      interpretations: [],
      metadata: { school: 'Tử Vi Đẩu Số Toàn Thư' },
    } as any;

    const { container } = render(<TuViResultView result={mockResult} />);
    const html = container.innerHTML;
    // Spec 24: Menh-Than interaction
    expect(html).toContain('TƯƠNG TÁC MỆNH ↔ THÂN');
    expect(html).toContain('ĐIỂM TƯƠNG ĐỒNG');
    expect(html).toContain('ĐIỂM BỔ TRỢ HẬU THIÊN');
    // Spec 34: Technical details
    expect(html).toContain('CHI TIẾT KỸ THUẬT THIÊN BÀN');
    // Spec 35: End state actions
    expect(html).toContain('BẠN VỪA KHÁM PHÁ');
    expect(html).toContain('Khám phá vận hiện tại →');
    expect(html).toContain('Xem 12 cung chức →');
    expect(html).toContain('Xem cơ sở luận giải ✦');
  });
});
