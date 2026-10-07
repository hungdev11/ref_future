import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MysticosResultBuilder } from '@mystic/interpretation-engine';
import { WhyPanel } from '../components/WhyPanel';
import { MysticosResultViewer } from '../components/MysticosResultViewer';

describe('Frontend Pure Viewer Components', () => {
  const tarotResult = MysticosResultBuilder.buildResult({
    domain: 'tarot',
    inputSummary: { spreadCode: 'SPREAD_1_DAILY', cardCode: 'MAJOR_0' },
    facts: [
      { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
      { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
      { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
    ],
    school: 'Rider-Waite-Smith',
  });

  const astroResult = MysticosResultBuilder.buildResult({
    domain: 'astrology',
    inputSummary: { birthDate: '1990-04-15', birthTime: '12:00' },
    facts: [
      { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
      { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
    ],
    school: 'Modern Humanistic Astrology',
  });

  it('renders WhyPanel with 6-tier provenance trace', () => {
    const html = renderToStaticMarkup(<WhyPanel result={tarotResult} />);

    // Header & Badge
    expect(html).toContain('Vì Sao Hệ Thống Đưa Ra Kết Quả Này?');
    expect(html).toContain('100% Deterministic Trace');

    // 6 tiers in pipeline
    expect(html).toContain('Cấp 1: Luận Giải Suy Diễn (Interpretation)');
    expect(html).toContain('Cấp 2: Khuôn Mẫu Tổng Hợp (Synthesized Pattern)');
    expect(html).toContain('Cấp 3: Tín Hiệu Dẫn Xuất (Micro Signals)');
    expect(html).toContain('Cấp 4: Quy Tắc Logic Khớp (Deterministic Rules)');
    expect(html).toContain('Cấp 5: Mệnh Đề Chân Lý Nguyên Tử (Atomic Claims)');
    expect(html).toContain('Cấp 6: Thư Tịch Gốc &amp; Trích Dẫn Thư Viện (S0 / S1 Citations)');

    // Citations
    expect(html).toContain('The Pictorial Key to the Tarot');
  });

  it('renders MysticosResultViewer across focused editorial sections', () => {
    const html = renderToStaticMarkup(<MysticosResultViewer result={tarotResult} />);

    // Editorial container
    expect(html).toContain('max-w-3xl');

    // Hero Section
    expect(html).toContain('04');
    expect(html).toContain('Khảo Cứu Tarot Rider-Waite');
    expect(html).toContain('Rider-Waite-Smith');

    // Why This Result disclosure trigger
    expect(html).toContain('Vì sao tôi nhận được kết quả này?');

    // Technical Details disclosure trigger
    expect(html).toContain('Chi Tiết Kỹ Thuật &amp; Tọa Độ Gốc (3 Dữ Kiện)');
  });

  it('renders MysticosResultViewer for astrology domain without errors', () => {
    const html = renderToStaticMarkup(<MysticosResultViewer result={astroResult} />);
    expect(html).toContain('01');
    expect(html).toContain('Bản Đồ Sao Chiêm Tinh Học');
    expect(html).toContain('Modern Humanistic Astrology');
    expect(html).toContain('Chi Tiết Kỹ Thuật &amp; Tọa Độ Gốc (2 Dữ Kiện)');
  });
});
