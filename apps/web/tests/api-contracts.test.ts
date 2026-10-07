import { describe, it, expect } from 'vitest';
import { MysticosResultBuilder } from '@mystic/interpretation-engine';
import { POST as tarotDrawPost } from '../app/api/tarot/draw/route';
import { POST as astrologyChartPost } from '../app/api/astrology/chart/route';
import { POST as tuviChartPost } from '../app/api/tuvi/chart/route';
import { POST as numerologyReportPost } from '../app/api/numerology/report/route';
import { POST as compatibilityReportPost } from '../app/api/compatibility/report/route';

describe('API Route Contracts', () => {
  it('builds canonical result for tarot draw', () => {
    const res = MysticosResultBuilder.buildResult({
      domain: 'tarot',
      inputSummary: { cardCount: 1 },
      facts: [
        { key: 'cardCode', value: 'MAJOR_0', domain: 'tarot', source: 'draw' },
        { key: 'positionIndex', value: 0, domain: 'tarot', source: 'spread' },
        { key: 'isReversed', value: false, domain: 'tarot', source: 'draw' },
      ],
      school: 'Rider-Waite-Smith',
    });
    expect(res.domain).toBe('tarot');
    expect(res.interpretations.length).toBeGreaterThan(0);
  });

  it('tarot draw API returns canonical MysticosResult', async () => {
    const req = new Request('http://localhost:3000/api/tarot/draw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        spreadCode: 'SPREAD_1_DAILY',
        cardCode: 'MAJOR_0',
        positionIndex: 0,
        isReversed: false,
      }),
    });

    const response = await tarotDrawPost(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.domain).toBe('tarot');
    expect(json.data.interpretations.length).toBeGreaterThan(0);
    expect(json.data.signals.length).toBeGreaterThan(0);
    expect(json.data.patterns.length).toBeGreaterThan(0);
    expect(json.mysticosResult).toBeDefined();
  });

  it('astrology chart API returns canonical MysticosResult', async () => {
    const req = new Request('http://localhost:3000/api/astrology/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate: '1990-04-15',
        birthTime: '12:00',
        facts: [
          { key: 'planets.sun.sign', value: 'Aries', domain: 'astrology', source: 'ephemeris' },
          { key: 'planets.sun.houseNumber', value: 1, domain: 'astrology', source: 'ephemeris' },
        ],
      }),
    });

    const response = await astrologyChartPost(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.domain).toBe('astrology');
    expect(json.data.interpretations.length).toBeGreaterThan(0);
    expect(json.data.signals.length).toBeGreaterThan(0);
    expect(json.data.evidence.length).toBeGreaterThan(0);
  });

  it('tuvi chart API returns canonical MysticosResult', async () => {
    const req = new Request('http://localhost:3000/api/tuvi/chart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birthDate: '1990-04-15',
        birthTime: '12:00',
        gender: 'MALE',
        facts: [
          { key: 'palaceName', value: 'Mệnh', domain: 'tuvi', source: 'chart' },
          { key: 'starCode', value: 'TU_VI', domain: 'tuvi', source: 'chart' },
          { key: 'brightness', value: 'M', domain: 'tuvi', source: 'chart' },
        ],
      }),
    });

    const response = await tuviChartPost(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.domain).toBe('tuvi');
    expect(json.data.interpretations.length).toBeGreaterThan(0);
    expect(json.data.patterns.length).toBeGreaterThan(0);
  });

  it('numerology report API returns canonical MysticosResult', async () => {
    const req = new Request('http://localhost:3000/api/numerology/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Tran Thi Mai',
        birthDate: '1990-05-15',
        facts: [
          { key: 'results.lifePath.finalValue', value: 1, domain: 'numerology', source: 'calculation' },
        ],
      }),
    });

    const response = await numerologyReportPost(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.domain).toBe('numerology');
    expect(json.data.interpretations.length).toBeGreaterThan(0);
  });

  it('compatibility report API returns canonical MysticosResult', async () => {
    const req = new Request('http://localhost:3000/api/compatibility/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personA: { name: 'Nguyen Van A', birthDate: '1990-01-01' },
        personB: { name: 'Le Thi B', birthDate: '1992-05-10' },
        relationshipType: 'LOVE',
        facts: [
          { key: 'personA.dominantElement', value: 'EARTH', domain: 'compatibility', source: 'astrology' },
          { key: 'personB.dominantElement', value: 'WATER', domain: 'compatibility', source: 'astrology' },
        ],
      }),
    });

    const response = await compatibilityReportPost(req);
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(json.data.domain).toBe('compatibility');
    expect(json.data.interpretations.length).toBeGreaterThan(0);
    expect(json.report).toBeDefined();
  });
});
