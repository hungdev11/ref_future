import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Navbar } from '../components/Navbar';
import HomePage from '../app/page';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Global Navigation and Home Page', () => {
  it('renders navbar links according to Spec 03 including History', () => {
    const html = renderToStaticMarkup(<Navbar />);
    expect(html).toContain('Tử Vi');
    expect(html).toContain('Tarot');
    expect(html).toContain('Lịch Sử');
    expect(html).toContain('/history');
  });

  it('renders home page positioning and 5 modules according to Spec 05-06', () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toContain('Khảo Cứu Vận Mệnh');
    expect(html).toContain('Bắt đầu khám phá');
    expect(html).toContain('Tìm hiểu MYSTICOS');
    expect(html).toContain('Đặt một câu hỏi và khám phá câu chuyện nổi lên từ trải bài.');
  });
});
