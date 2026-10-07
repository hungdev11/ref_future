import { describe, it, expect } from 'vitest';
import { REGISTERED_CONFLICTS, resolveConflict } from '../src/conflicts/index.js';

describe('Source Conflicts & Resolution Registry (Phase 4)', () => {
  it('registers documented multi-school conflicts with explicit resolutions', () => {
    expect(REGISTERED_CONFLICTS.length).toBeGreaterThanOrEqual(4);

    for (const conf of REGISTERED_CONFLICTS) {
      expect(conf.conflictId).toMatch(/^CONF_[A-Z0-9_]+$/);
      expect(conf.sources.length).toBeGreaterThanOrEqual(2);
      expect(conf.schoolA).not.toBe(conf.schoolB);
      expect(['keep_separate', 'school_specific', 'prefer_primary']).toContain(conf.resolution);
    }
  });

  it('correctly resolves conflict strategy for Tarot Lovers card', () => {
    const res = resolveConflict('CONF_TAROT_LOVERS_MEANING');
    expect(res).toBeDefined();
    expect(res?.resolution).toBe('school_specific');
    expect(res?.schoolA).toContain('Rider-Waite-Smith');
  });

  it('correctly handles Tử Vi Nam Phái vs Trung Châu Tứ Hóa conflict', () => {
    const res = resolveConflict('CONF_TUVI_CAN_CANH_TU_HOA');
    expect(res).toBeDefined();
    expect(res?.conflictType).toBe('different_school');
    expect(res?.resolution).toBe('keep_separate');
  });
});
