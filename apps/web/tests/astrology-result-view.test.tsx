import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { AstrologyResultView } from '../components/domain-results/AstrologyResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('AstrologyResultView Dynamic House and Big Three', () => {
  it('renders dynamic house description based on sun and moon houses', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'astrology',
      primaryResult: 'Bản đồ sao chú trọng sự tự do.',
      summary: 'Tổng quan chiêm tinh',
      confidenceScore: 0.9,
      facts: [
        { key: 'sun.sign', value: 'ARIES' },
        { key: 'moon.sign', value: 'TAURUS' },
        { key: 'ascendant', value: 'LEO' },
        { key: 'planets.sun.house', value: 4 },
        { key: 'planets.moon.house', value: 10 },
      ],
      metadata: { school: 'Modern Humanistic Astrology' },
    } as any;

    const html = renderToStaticMarkup(<AstrologyResultView result={mockResult} />);
    // House 4 should talk about root/family/home, NOT house 11 social goals
    expect(html).toContain('Nhà 4');
    expect(html).toContain('Cội Nguồn &amp; Gia Đạo');
    expect(html).toContain('Nhà 10');
    expect(html).toContain('Sự Nghiệp &amp; Công Danh');
    expect(html).not.toContain('hiện thực hóa mục tiêu xã hội');
  });

  it('renders Big Three dynamics and ResultFooter', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'astrology',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.9,
      facts: [
        { key: 'sun.sign', value: 'LEO' },
        { key: 'moon.sign', value: 'CANCER' },
      ],
      metadata: { school: 'Astrology' },
    } as any;

    const html = renderToStaticMarkup(<AstrologyResultView result={mockResult} />);
    expect(html).toContain('BIG THREE DYNAMICS');
    expect(html).toContain('Bạn vừa xem:');
    expect(html).toContain('Bản Đồ Sao Chiêm Tinh Học');
  });
});
