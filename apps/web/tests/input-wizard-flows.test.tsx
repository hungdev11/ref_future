import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import TuViPage from '../app/tu-vi/page';
import AstrologyPage from '../app/astrology/page';
import NumerologyPage from '../app/numerology/page';
import TarotPage from '../app/tarot/page';
import CompatibilityPage from '../app/compatibility/page';

describe('5 Domain Input Wizard Landing States', () => {
  it('renders Tu Vi initial landing state with CTA', () => {
    const html = renderToStaticMarkup(<TuViPage />);
    expect(html).toContain('Tử Vi Đẩu Số');
    expect(html).toContain('Lập lá số');
    expect(html).toContain('Bạn Sẽ Khám Phá');
  });

  it('renders Astrology initial landing state with CTA', () => {
    const html = renderToStaticMarkup(<AstrologyPage />);
    expect(html).toContain('Bản Đồ Sao Cá Nhân');
    expect(html).toContain('Lập bản đồ sao');
    expect(html).toContain('Bộ Ba Nhân Cách');
  });

  it('renders Numerology initial landing state with CTA', () => {
    const html = renderToStaticMarkup(<NumerologyPage />);
    expect(html).toContain('Thần Số Học Pythagoras');
    expect(html).toContain('Bắt đầu phân tích');
    expect(html).toContain('Con Số Cốt Lõi');
  });

  it('renders Tarot initial landing state with CTA', () => {
    const html = renderToStaticMarkup(<TarotPage />);
    expect(html).toContain('Khảo Cứu Tarot 78 Lá');
    expect(html).toContain('Đặt câu hỏi &amp; Trải bài');
    expect(html).toContain('Chuẩn Thư Tịch 1909');
  });

  it('renders Compatibility initial landing state with CTA', () => {
    const html = renderToStaticMarkup(<CompatibilityPage />);
    expect(html).toContain('Độ Tương Hợp');
    expect(html).toContain('Bắt đầu khảo cứu');
    expect(html).toContain('Trọng Số Theo Bối Cảnh');
  });
});
