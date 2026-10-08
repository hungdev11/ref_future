import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CompatibilityResultView } from '../components/domain-results/CompatibilityResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('CompatibilityResultView Structure', () => {
  it('renders connection and care sections clearly when guidance is present without numerical percentage', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'compatibility',
      primaryResult: 'Hai người có điểm kết nối mạnh ở tư duy nhưng cần chú ý nhịp điệu sinh hoạt.',
      summary: 'Tổng quan tương hợp',
      confidenceScore: 0.85,
      facts: [
        { key: 'personA.sunSign', value: 'KIM_NGUU' },
        { key: 'personB.sunSign', value: 'XU_NU' },
      ],
      inputSummary: {
        personA: { name: 'Người A' },
        personB: { name: 'Người B' },
        relationshipType: 'LOVE',
      },
      guidance: [
        {
          guidanceId: 'g1',
          implicationId: 'i1',
          actionPriority: 'STRATEGIC',
          whatToContinue: ['Duy trì trao đổi cởi mở'],
          whatToAdjustOrStop: ['Tránh phản xạ quy chụp'],
          rationale: 'Hỗ trợ kết nối',
        },
      ],
      metadata: { school: 'Multi-System Synthesis' },
    } as any;

    const html = renderToStaticMarkup(<CompatibilityResultView result={mockResult} />);
    expect(html).toContain('Mối Quan Hệ Này: Người A ✕ Người B');
    expect(html).toContain('ĐIỀU GIÚP HAI NGƯỜI KẾT NỐI');
    expect(html).toContain('Duy trì trao đổi cởi mở');
    expect(html).toContain('ĐIỂM CẦN ĐƯỢC QUẢN LÝ');
    expect(html).toContain('Tránh phản xạ quy chụp');
    expect(html).toContain('Bạn vừa xem:');
    // No percentage score on top
    expect(html).not.toContain('85%');
  });

  it('does not render guidance block when guidance is empty or absent', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'compatibility',
      primaryResult: 'Tổng quan không có lời khuyên tĩnh.',
      summary: 'Tổng quan',
      facts: [],
      guidance: [],
      inputSummary: {
        personA: { name: 'Người A' },
        personB: { name: 'Người B' },
      },
      metadata: { school: 'Multi-System Synthesis' },
    } as any;

    const html = renderToStaticMarkup(<CompatibilityResultView result={mockResult} />);
    expect(html).not.toContain('ĐIỀU GIÚP HAI NGƯỜI KẾT NỐI');
    expect(html).not.toContain('ĐIỂM CẦN ĐƯỢC QUẢN LÝ');
  });
});
