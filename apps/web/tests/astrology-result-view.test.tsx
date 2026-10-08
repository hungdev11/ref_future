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

  it('renders Chart Signature, Top Aspects and Life Areas filter (Spec 45, 47, 49, 50)', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'astrology',
      primaryResult: 'Bản đồ sao kích hoạt trục ý chí và cảm xúc.',
      summary: 'Tổng quan chiêm tinh',
      mainStory: {
        headline: 'Trục Năng Lượng Đột Phá Giữa Lửa & Nước',
        narrative: 'Sự kết hợp giữa Mặt Trời Bạch Dương và Mặt Trăng Cự Giải tạo nên xung lực mạnh mẽ.',
      },
      confidenceScore: 0.95,
      facts: [
        { key: 'sun.sign', value: 'ARIES' },
        { key: 'moon.sign', value: 'CANCER' },
      ],
      relationships: [
        {
          relationshipId: 'rel_1',
          type: 'tension',
          sourceSignalId: 'SIG_SUN_ARIES',
          targetSignalId: 'SIG_MOON_CANCER',
          description: 'Góc vuông góc (Square) 90 độ giữa Mặt Trời và Mặt Trăng.',
          intensity: 0.9,
        },
      ],
      deepInterpretations: [
        {
          interpretationId: 'interp_1',
          dimension: 'Tình cảm',
          statementId: 'stmt_1',
          headline: 'Giằng co giữa nhu cầu tự lập và khát khao chở che',
          statement: 'Bạn cần học cách dung hòa bản năng khởi xướng cá nhân với sự gắn kết thân mật.',
          depth: 'DEPTH_3',
          polarity: 'mixed',
          strength: 0.85,
          confidence: 0.9,
          patternIds: [],
          signalIds: [],
          ruleIds: [],
          evidenceIds: [],
          explanation: 'Chi tiết phân tích',
          contextFitScore: 0.9,
        },
      ],
      metadata: { school: 'Modern Humanistic Astrology' },
    } as any;

    const html = renderToStaticMarkup(<AstrologyResultView result={mockResult} />);
    // Spec 45: Chart signature
    expect(html).toContain('BẢN ĐỒ SAO NỔI BẬT Ở ĐIỀU GÌ?');
    expect(html).toContain('Trục Năng Lượng Đột Phá Giữa Lửa &amp; Nước');
    // Spec 47-48: Top aspects
    expect(html).toContain('CÁC GÓC HỢP TRỌNG YẾU (TOP ASPECTS)');
    expect(html).toContain('VUÔNG GÓC (90°)');
    expect(html).toContain('Xem chi tiết góc chiếu →');
    // Spec 49: Life areas tabs
    expect(html).toContain('VÙNG ĐỜI SỐNG KÍCH HOẠT &amp; LUẬN GIẢI CHI TIẾT');
    expect(html).toContain('Tình Cảm &amp; Quan Hệ');
    expect(html).toContain('Sự Nghiệp &amp; Mục Tiêu');
    // Spec 50: Technical details
    expect(html).toContain('CHI TIẾT KỸ THUẬT THIÊN VĂN (CHART EXPLORER)');
  });
});
