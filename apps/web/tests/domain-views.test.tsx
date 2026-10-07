import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MysticosResultViewer } from '../components/MysticosResultViewer';
import { MysticosResultBuilder } from '@mystic/interpretation-engine';

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

describe('Domain-Specific Result Views', () => {
  it('renders TarotResultView with story arc and question focus', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { question: 'Có nên đổi việc?' },
      facts: [{ key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' }],
      school: 'RWS',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Khảo Cứu Tarot/i)).toBeDefined();
    expect(screen.getByText(/Trọng tâm/i)).toBeDefined();
    expect(screen.getByText(/Có nên đổi việc\?/i)).toBeDefined();
  });

  it('renders AstrologyResultView with chart signature and dynamics', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'astrology',
      inputSummary: {},
      facts: [{ key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'calc' }],
      school: 'Classical',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Chiêm Tinh/i)).toBeDefined();
    expect(screen.getByText(/Bản Đồ Sao/i)).toBeDefined();
  });

  it('renders TuViResultView with mệnh thân and palace patterns', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'tuvi',
      inputSummary: {},
      facts: [{ key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'calc' }],
      school: 'Toàn Thư',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Tử Vi/i)).toBeDefined();
    expect(screen.getByText(/Thiên Bàn/i)).toBeDefined();
  });

  it('renders NumerologyResultView with core profile and numbers', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'numerology',
      inputSummary: {},
      facts: [{ key: 'lifePathNumber', value: 7, domain: 'numerology', source: 'calc' }],
      school: 'Pythagorean',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Thần Số Học/i)).toBeDefined();
  });

  it('renders CompatibilityResultView with relationship dynamics and dimensions', () => {
    const result = MysticosResultBuilder.buildResult({
      domain: 'compatibility',
      inputSummary: {},
      facts: [{ key: 'sunA', value: 'Aries', domain: 'compatibility', source: 'input' }],
      school: 'Multi-System',
    });
    render(<MysticosResultViewer result={result} />);
    expect(screen.getByText(/Tương Hợp/i)).toBeDefined();
  });
});
