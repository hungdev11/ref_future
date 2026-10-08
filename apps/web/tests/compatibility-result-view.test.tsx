import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { CompatibilityResultView } from '../components/domain-results/CompatibilityResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('CompatibilityResultView Structure', () => {
  it('renders connection and care sections clearly without numerical percentage', () => {
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
      metadata: { school: 'Multi-System Synthesis' },
    } as any;

    const html = renderToStaticMarkup(<CompatibilityResultView result={mockResult} />);
    expect(html).toContain('Mối Quan Hệ Này: Người A ✕ Người B');
    expect(html).toContain('ĐIỀU GIÚP HAI NGƯỜI KẾT NỐI');
    expect(html).toContain('ĐIỂM CẦN ĐƯỢC QUẢN LÝ');
    expect(html).toContain('Bạn vừa xem:');
    // No percentage score on top
    expect(html).not.toContain('85%');
  });
});
