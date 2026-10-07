import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { InsightBlock } from '../components/primitives/InsightBlock';
import { PatternStory } from '../components/primitives/PatternStory';
import { CardInteractionBlock } from '../components/primitives/CardInteractionBlock';
import { ScenarioBlock } from '../components/primitives/ScenarioBlock';
import { TensionBlock } from '../components/primitives/TensionBlock';
import { NextQuestionBlock } from '../components/primitives/NextQuestionBlock';
import { WhyDrawer } from '../components/primitives/WhyDrawer';
import type { MysticosResult } from '@mystic/core';

// ponytail: lightweight render/screen test harness using react-dom/server to avoid adding @testing-library/react dependency
let lastMarkup = '';
const render = (ui: React.ReactElement) => {
  lastMarkup = renderToStaticMarkup(ui);
};

const screen = {
  getByText: (matcher: string | RegExp) => {
    if (typeof matcher === 'string') {
      if (!lastMarkup.includes(matcher)) {
        throw new Error(`Unable to find element with text: ${matcher}`);
      }
      return matcher;
    }
    if (!matcher.test(lastMarkup)) {
      throw new Error(`Unable to find element with regex: ${matcher}`);
    }
    return matcher;
  },
};

describe('Editorial UI Primitives', () => {
  it('renders InsightBlock with depth-based styling', () => {
    render(
      <InsightBlock
        depth="DEPTH_4"
        headline="Khởi Đầu Đột Phá"
        statement="Bạn có cơ hội mở đường mới."
        explanation="Năng lượng nguyên bản thúc đẩy hành động dũng cảm."
        tension="Rủi ro thiếu tính toán"
      />
    );
    expect(screen.getByText('Khởi Đầu Đột Phá')).toBeDefined();
    expect(screen.getByText(/Năng lượng nguyên bản thúc đẩy/)).toBeDefined();
    expect(screen.getByText(/Rủi ro thiếu tính toán/)).toBeDefined();
  });

  it('renders InsightBlock at DEPTH_1 concisely without explanation', () => {
    render(
      <InsightBlock
        depth="DEPTH_1"
        headline="Nhận Định Nhanh"
        statement="Tập trung vào mục tiêu ngắn hạn."
        explanation="Giải thích dài không nên hiển thị."
      />
    );
    expect(screen.getByText(/Nhận Định Nhanh/)).toBeDefined();
    expect(screen.getByText(/Tập trung vào mục tiêu ngắn hạn/)).toBeDefined();
    expect(lastMarkup).not.toContain('Giải thích dài không nên hiển thị.');
  });

  it('renders PatternStory narrative arc with gold hairline accent callout', () => {
    render(
      <PatternStory
        story={{
          headline: 'Hành Trình Chuyển Hóa',
          narrative: 'Từ hỗn độn ban đầu, trật tự mới dần định hình qua từng thử thách.',
          centralTension: 'Khát vọng bứt phá vs Trách nhiệm gia đình',
          focalEntity: 'The Fool',
        }}
      />
    );
    expect(screen.getByText('Hành Trình Chuyển Hóa')).toBeDefined();
    expect(screen.getByText(/Từ hỗn độn ban đầu/)).toBeDefined();
    expect(screen.getByText(/Khát vọng bứt phá vs Trách nhiệm gia đình/)).toBeDefined();
    expect(screen.getByText(/The Fool/)).toBeDefined();
    expect(lastMarkup).toContain('border-accentGold');
  });

  it('renders CardInteractionBlock with sequence flow and interactions', () => {
    render(
      <CardInteractionBlock
        sequence={[
          { name: 'The Fool', role: 'Khởi đầu' },
          { name: 'The Magician', role: 'Hiện thực hóa' },
          { name: 'The High Priestess', role: 'Trực giác' },
        ]}
        interactions={[
          {
            source: 'The Fool',
            target: 'The Magician',
            type: 'progression',
            description: 'Chuyển hóa tiềm năng thuần khiết thành năng lực điều hướng.',
          },
        ]}
      />
    );
    expect(screen.getByText('The Fool')).toBeDefined();
    expect(screen.getByText('The Magician')).toBeDefined();
    expect(screen.getByText(/Chuyển hóa tiềm năng thuần khiết/)).toBeDefined();
    expect(lastMarkup).toContain('➔');
  });

  it('renders ScenarioBlock correctly', () => {
    render(
      <ScenarioBlock
        scenario={{
          scenarioId: 'S1',
          title: 'Khi đối diện rủi ro',
          trigger: 'Thay đổi công việc',
          patternIds: [],
          likelyDynamic: 'Hào hứng nhưng bất an',
          constructiveResponse: 'Lập kế hoạch từng giai đoạn',
          evidenceIds: [],
        }}
      />
    );
    expect(screen.getByText('Khi đối diện rủi ro')).toBeDefined();
    expect(screen.getByText(/Thay đổi công việc/)).toBeDefined();
    expect(screen.getByText(/Hào hứng nhưng bất an/)).toBeDefined();
    expect(screen.getByText(/Lập kế hoạch từng giai đoạn/)).toBeDefined();
  });

  it('renders TensionBlock with polarization and balancing resolution', () => {
    render(
      <TensionBlock
        traitA="Khát vọng tự do"
        traitB="Nhu cầu an toàn"
        dynamics="Hai nhu cầu mâu thuẫn gây trì hoãn hành động."
        resolution="Phân bổ thời gian cố định cho trải nghiệm mới trong khuôn khổ an toàn."
      />
    );
    expect(screen.getByText(/Khát vọng tự do/)).toBeDefined();
    expect(screen.getByText(/Nhu cầu an toàn/)).toBeDefined();
    expect(screen.getByText(/Hai nhu cầu mâu thuẫn gây trì hoãn/)).toBeDefined();
    expect(screen.getByText(/Phân bổ thời gian cố định/)).toBeDefined();
  });

  it('renders NextQuestionBlock correctly', () => {
    render(
      <NextQuestionBlock
        questions={[{
          question: 'Tôi nên chuẩn bị gì trước?',
          context: 'Định hướng thực tiễn',
          targetDomain: 'tarot',
        }]}
      />
    );
    expect(screen.getByText('Tôi nên chuẩn bị gì trước?')).toBeDefined();
    expect(screen.getByText(/Định hướng thực tiễn/)).toBeDefined();
  });

  it('renders WhyDrawer with progressive disclosure toggle', () => {
    const mockResult: MysticosResult = {
      resultId: 'TEST_WHY',
      domain: 'tarot',
      inputSummary: {},
      facts: [],
      semantics: [],
      signals: [],
      relationships: [],
      patterns: [],
      tensions: [],
      interpretations: [],
      implications: [],
      guidance: [],
      evidence: [],
      conflicts: [],
      technical: { calculationTimeMs: 1, rulesEvaluatedCount: 0, rulesMatchedCount: 0 },
      metadata: { engineVersion: '1.0', knowledgeBaseVersion: '1.0', rulesVersion: '1.0', school: 'RWS', deterministic: true, calculatedAt: '2026-10-07' },
    };

    render(<WhyDrawer result={mockResult} defaultOpen={false} />);
    expect(lastMarkup).toContain('aria-expanded="false"');
    expect(screen.getByText(/Minh Bạch/)).toBeDefined();

    render(<WhyDrawer result={mockResult} defaultOpen={true} />);
    expect(lastMarkup).toContain('aria-expanded="true"');
    expect(lastMarkup).toContain('Vì Sao Hệ Thống Đưa Ra Kết Quả Này?');
  });
});
