import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveHistoryItem,
  getHistoryItems,
  toggleSaveItem,
  deleteHistoryItem,
  clearAllHistory,
} from '../lib/history-storage';

describe('History Storage Utility', () => {
  beforeEach(() => {
    clearAllHistory();
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('saves and retrieves history items', () => {
    saveHistoryItem({
      id: 'test-1',
      timestamp: Date.now(),
      domain: 'tuvi',
      title: 'Lá Số Nguyễn Văn A',
      mainTheme: 'Nhu cầu ổn định và tự chủ',
      resultPayload: { domain: 'tuvi' } as any,
      isSaved: false,
    });

    const items = getHistoryItems('all');
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Lá Số Nguyễn Văn A');
  });

  it('filters history items by domain', () => {
    saveHistoryItem({
      id: '1', timestamp: Date.now(), domain: 'tuvi', title: 'Tử Vi', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });
    saveHistoryItem({
      id: '2', timestamp: Date.now(), domain: 'tarot', title: 'Tarot', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });

    expect(getHistoryItems('tuvi')).toHaveLength(1);
    expect(getHistoryItems('tarot')).toHaveLength(1);
    expect(getHistoryItems('astrology')).toHaveLength(0);
  });

  it('toggles saved status and deletes items', () => {
    saveHistoryItem({
      id: '1', timestamp: Date.now(), domain: 'tuvi', title: 'Tử Vi', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });
    toggleSaveItem('1');
    expect(getHistoryItems()[0].isSaved).toBe(true);

    deleteHistoryItem('1');
    expect(getHistoryItems()).toHaveLength(0);
  });
});
