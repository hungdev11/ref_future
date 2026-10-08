import { describe, it, expect } from 'vitest';
import { POST as tarotDrawPost } from '../app/api/tarot/draw/route';
import { POST as astrologyChartPost } from '../app/api/astrology/chart/route';
import { POST as tuviChartPost } from '../app/api/tuvi/chart/route';
import { POST as numerologyReportPost } from '../app/api/numerology/report/route';
import { POST as compatibilityReportPost } from '../app/api/compatibility/report/route';

function assertNoTechnicalLeakage(text: string) {
  expect(text).not.toMatch(/cardCode=/i);
  expect(text).not.toMatch(/sign=/i);
  expect(text).not.toMatch(/degree=/i);
  expect(text).not.toMatch(/Cấu Trúc Tự Nhiên/i);
  expect(text).not.toMatch(/Khuôn mẫu \[/i);
  expect(text).not.toMatch(/SIG_CTX_/i);
  expect(text).not.toMatch(/SIG_[A-Z0-9_]+/i);
  expect(text).not.toMatch(/RUL_[A-Z0-9_]+/i);
}

describe('Zero Technical Leaks Verification Across All 5 Domains', () => {
  it('verifies tarot output has zero variable or raw english leaks', async () => {
    const req = new Request('http://localhost:3000/api/tarot/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spreadCode: 'SPREAD_3_PPF',
        cardCode: 'MAJOR_01_MAGICIAN',
        positionIndex: 0,
        isReversed: false,
      }),
    });
    const res = await tarotDrawPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);

    const headline = json.data.patterns?.[0]?.headline || '';
    const narrative = json.data.mainStory?.narrative || '';
    const manifestation = json.data.implications?.[0]?.manifestation || '';
    const continueItems = (json.data.guidance?.[0]?.whatToContinue || []).join(' ');
    const adjustItems = (json.data.guidance?.[0]?.whatToAdjustOrStop || []).join(' ');

    assertNoTechnicalLeakage(headline);
    assertNoTechnicalLeakage(narrative);
    assertNoTechnicalLeakage(manifestation);
    assertNoTechnicalLeakage(continueItems);
    assertNoTechnicalLeakage(adjustItems);
  });

  it('verifies astrology output has zero variable or raw english leaks', async () => {
    const req = new Request('http://localhost:3000/api/astrology/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate: '1995-10-24',
        birthTime: '08:30',
        facts: [
          { key: 'planets.sun.sign', value: 'SCORPIO', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.moon.sign', value: 'PISCES', domain: 'astrology', source: 'ephemeris' },
          { key: 'ascendant.sign', value: 'SAGITTARIUS', domain: 'astrology', source: 'ephemeris' },
        ],
      }),
    });
    const res = await astrologyChartPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);

    const headline = json.data.patterns?.[0]?.headline || '';
    const narrative = json.data.mainStory?.narrative || '';
    const manifestation = json.data.implications?.[0]?.manifestation || '';
    const continueItems = (json.data.guidance?.[0]?.whatToContinue || []).join(' ');

    assertNoTechnicalLeakage(headline);
    assertNoTechnicalLeakage(narrative);
    assertNoTechnicalLeakage(manifestation);
    assertNoTechnicalLeakage(continueItems);
    expect(headline).toContain('Mặt Trời Bọ Cạp');
  });

  it('verifies tuvi output has zero variable or raw english leaks', async () => {
    const req = new Request('http://localhost:3000/api/tuvi/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate: '1992-08-16',
        birthTime: '14:30',
        gender: 'MALE',
        facts: [
          { key: 'palaces.MENH.main_star', value: 'TU_VI', domain: 'tuvi', source: 'tuvi_chart' },
          { key: 'year_stem', value: 'NHAM', domain: 'tuvi', source: 'tuvi_chart' },
          { key: 'year_branch', value: 'THAN', domain: 'tuvi', source: 'tuvi_chart' },
        ],
      }),
    });
    const res = await tuviChartPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);

    const headline = json.data.patterns?.[0]?.headline || '';
    const narrative = json.data.mainStory?.narrative || '';
    const manifestation = json.data.implications?.[0]?.manifestation || '';

    assertNoTechnicalLeakage(headline);
    assertNoTechnicalLeakage(narrative);
    assertNoTechnicalLeakage(manifestation);
  });

  it('verifies numerology output has zero variable or raw english leaks', async () => {
    const req = new Request('http://localhost:3000/api/numerology/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Nguyen Van A',
        birthDate: '1990-05-15',
        facts: [
          { key: 'lifePathNumber', value: 7, domain: 'numerology', source: 'calculation' },
          { key: 'destinyNumber', value: 3, domain: 'numerology', source: 'calculation' },
          { key: 'personalYear', value: 9, domain: 'numerology', source: 'calculation' },
        ],
      }),
    });
    const res = await numerologyReportPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);

    const headline = json.data.patterns?.[0]?.headline || '';
    const narrative = json.data.mainStory?.narrative || '';
    const manifestation = json.data.implications?.[0]?.manifestation || '';

    assertNoTechnicalLeakage(headline);
    assertNoTechnicalLeakage(narrative);
    assertNoTechnicalLeakage(manifestation);
    expect(headline).toContain('Chân Dung Số Học');
  });

  it('verifies compatibility output has zero variable or raw english leaks', async () => {
    const req = new Request('http://localhost:3000/api/compatibility/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personA: { name: 'A', birthDate: '1990-01-01' },
        personB: { name: 'B', birthDate: '1992-05-10' },
        facts: [
          { key: 'sunHarmony', value: 'TRINE', domain: 'compatibility', source: 'synastry' },
          { key: 'moonHarmony', value: 'SEXTILE', domain: 'compatibility', source: 'synastry' },
        ],
      }),
    });
    const res = await compatibilityReportPost(req);
    const json = await res.json();
    expect(json.success).toBe(true);

    const headline = json.data.patterns?.[0]?.headline || '';
    const narrative = json.data.mainStory?.narrative || '';
    const manifestation = json.data.implications?.[0]?.manifestation || '';

    assertNoTechnicalLeakage(headline);
    assertNoTechnicalLeakage(narrative);
    assertNoTechnicalLeakage(manifestation);
    expect(headline).toMatch(/Tương (Quan|Luận) Hòa Hợp|Khảo Luận Tương Hợp/);
  });

  it('verifies rendered UI HTML has zero technical IDs, no SCEN_, no PHU_THE, no SIG_CTX_', async () => {
    const React = await import('react');
    const { renderToStaticMarkup } = await import('react-dom/server');
    const { MysticosResultViewer } = await import('../components/MysticosResultViewer');
    const { MysticosResultBuilder } = await import('@mystic/interpretation-engine');

    // Test TuVi with Than cu Phu The
    const tuviResult = MysticosResultBuilder.buildResult({
      domain: 'tuvi',
      inputSummary: { birthDate: '1995-10-10' },
      facts: [
        { key: 'palaces.MENH.main_star', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
        { key: 'thanPalace', value: 'PHU_THE', domain: 'tuvi', source: 'chart' },
      ],
      school: 'Toàn Thư',
    });

    const tuviHtml = renderToStaticMarkup(React.createElement(MysticosResultViewer, { result: tuviResult }));
    expect(tuviHtml).not.toMatch(/\bPHU_THE\b/);
    expect(tuviHtml).toContain('Thân Cư Phu Thê');
    expect(tuviHtml).not.toContain('Chi Tiết Kỹ Thuật');
    expect(tuviHtml).not.toMatch(/SCEN_[A-Z0-9_]+/);
    expect(tuviHtml).not.toMatch(/SIG_CTX_[A-Z0-9_]+/);

    // Test Tarot with WhyPanel
    const tarotResult = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { spreadCode: 'SPREAD_1_DAILY' },
      facts: [
        { key: 'cardCode', value: 'MAJOR_05_HIEROPHANT', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 1, domain: 'tarot', source: 'spread' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
      school: 'RWS',
    });

    const tarotHtml = renderToStaticMarkup(React.createElement(MysticosResultViewer, { result: tarotResult }));
    expect(tarotHtml).not.toMatch(/SIG_CTX_CARDCODE_MAJOR_05_HIEROPHANT/);
    expect(tarotHtml).not.toMatch(/SIG_CTX_POSITIONINDEX_1/);
    expect(tarotHtml).not.toMatch(/SCEN_[A-Z0-9_]+/);
    expect(tarotHtml).not.toContain('Chi Tiết Kỹ Thuật');
    expect(tarotHtml).not.toContain('(MAIN STORY ARC)');
    expect(tarotHtml).not.toContain('(CENTRAL TENSION)');
    expect(tarotHtml).not.toContain('(TENSIONS)');
    expect(tarotHtml).not.toContain('(TRIGGER)');
    expect(tarotHtml).not.toContain('(DYNAMIC)');
  });
});
