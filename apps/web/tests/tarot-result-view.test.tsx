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

  it('renders Individual Cards Grid, Story Progression, Draw Again warning and Technical Details (Spec 58, 62, 64)', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tarot',
      primaryResult: 'Thông điệp chuyển hóa thực chất.',
      summary: 'Trải bài gợi mở',
      confidenceScore: 0.9,
      facts: [
        { key: 'draw_0', value: 'MAJOR_0_FOOL' },
        { key: 'draw_0_reversed', value: false },
        { key: 'draw_1', value: 'MAJOR_01_MAGICIAN' },
        { key: 'draw_1_reversed', value: true },
        { key: 'draw_2', value: 'MAJOR_02_HIGH_PRIESTESS' },
        { key: 'draw_2_reversed', value: false },
      ],
      inputSummary: { question: 'Có nên bắt đầu dự án mới?' },
      metadata: { school: 'Rider-Waite-Smith' },
    } as any;

    const html = renderToStaticMarkup(<TarotResultView result={mockResult} />);
    // Spec 58-60: Clickable cards
    expect(html).toContain('CHI TIẾT TỪNG LÁ BÀI (CLICK ĐỂ MỞ BẢNG KHẢO CỨU)');
    expect(html).toContain('Xem lá bài này trong câu hỏi →');
    // Spec 62: Story progression
    expect(html).toContain('DIỄN TIẾN MẠCH TRUYỆN (STORY PROGRESSION)');
    expect(html).toContain('1. KHỞI NGUYÊN (START)');
    expect(html).toContain('3. ĐIỂM NGHẼN (TENSION)');
    expect(html).toContain('4. ĐỊNH HƯỚNG (DIRECTION)');
    // Spec 64: Draw again with warning
    expect(html).toContain('Rút trải mới');
    expect(html).toContain('Một trải bài mới nên phục vụ một câu hỏi hoặc góc nhìn khác');
    // Spec 56 item 9: Technical details
    expect(html).toContain('CHI TIẾT KỸ THUẬT BIỂU TƯỢNG (TECHNICAL EVIDENCE)');
  });
});
