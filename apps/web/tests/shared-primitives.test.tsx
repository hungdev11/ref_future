import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ResultFooter } from '../components/primitives/ResultFooter';
import { ContextualLoading } from '../components/primitives/ContextualLoading';
import { ConfirmationStep } from '../components/primitives/ConfirmationStep';

describe('Shared UX Primitives', () => {
  it('renders ResultFooter with topic and explore links', () => {
    const html = renderToStaticMarkup(
      <ResultFooter
        topic="Khảo Cứu Tử Vi"
        exploreLinks={[{ label: 'Xem Vận Trình Hiện Tại', href: '#timeline' }]}
      />
    );
    expect(html).toContain('Bạn vừa xem:');
    expect(html).toContain('Khảo Cứu Tử Vi');
    expect(html).toContain('Xem Vận Trình Hiện Tại');
  });

  it('renders ContextualLoading step messages', () => {
    const html = renderToStaticMarkup(
      <ContextualLoading
        title="Đang lập lá số"
        steps={['Xác định lịch pháp', 'Dựng 12 cung', 'Tổng hợp pattern']}
        currentStepIndex={1}
      />
    );
    expect(html).toContain('Đang lập lá số');
    expect(html).toContain('Xác định lịch pháp');
    expect(html).toContain('Dựng 12 cung');
  });

  it('renders ConfirmationStep with items', () => {
    const html = renderToStaticMarkup(
      <ConfirmationStep
        title="Xác nhận dữ liệu khởi bàn"
        items={[
          { label: 'Họ tên', value: 'Nguyễn Văn A' },
          { label: 'Ngày sinh', value: '12/03/1995' },
        ]}
        onConfirm={() => {}}
        onEdit={() => {}}
      />
    );
    expect(html).toContain('Xác nhận dữ liệu khởi bàn');
    expect(html).toContain('Nguyễn Văn A');
    expect(html).toContain('12/03/1995');
    expect(html).toContain('Chỉnh sửa');
  });
});
