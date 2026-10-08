import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { TarotResultView } from '../components/domain-results/TarotResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('TarotResultView Reflection and Position', () => {
  it('renders reflection section and main answer', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tarot',
      primaryResult: 'Đánh giá lại trước khi tiếp tục.',
      summary: 'Trải bài gợi mở',
      confidenceScore: 0.9,
      facts: [
        { key: 'draw_0', value: 'MAJOR_0_FOOL' },
        { key: 'draw_0_reversed', value: false },
      ],
      inputSummary: { question: 'Tôi nên chú ý gì trong công việc?' },
      metadata: { school: 'Rider-Waite-Smith' },
    } as any;

    const html = renderToStaticMarkup(<TarotResultView result={mockResult} />);
    expect(html).toContain('THÔNG ĐIỆP CHÍNH (CORE MESSAGE)');
    expect(html).toContain('Đánh giá lại trước khi tiếp tục.');
    expect(html).toContain('ĐIỀU ĐÁNG SUY NGẪM (REFLECTION)');
    expect(html).toContain('Bạn vừa xem:');
  });
});
