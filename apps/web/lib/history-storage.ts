import type { DeepMysticosResult } from '@mystic/core';

export interface HistoryItem {
  id: string;
  timestamp: number;
  domain: 'tuvi' | 'astrology' | 'numerology' | 'tarot' | 'compatibility';
  title: string;
  mainTheme: string;
  resultPayload: DeepMysticosResult;
  isSaved?: boolean;
}

const STORAGE_KEY = 'mysticos_history_records';

let inMemoryStore: HistoryItem[] = [];

function getStorageList(): HistoryItem[] {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
  }
  return inMemoryStore;
}

function setStorageList(list: HistoryItem[]): void {
  inMemoryStore = list;
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }
}

export function getHistoryItems(domainFilter?: string): HistoryItem[] {
  const list = getStorageList();
  if (!domainFilter || domainFilter === 'all') return list;
  return list.filter((item) => item.domain === domainFilter);
}

export function saveHistoryItem(item: HistoryItem): void {
  const list = getStorageList();
  const filtered = list.filter((x) => x.id !== item.id);
  const updated = [item, ...filtered].slice(0, 50);
  setStorageList(updated);
}

export function toggleSaveItem(id: string): void {
  const list = getStorageList();
  const updated = list.map((item) =>
    item.id === id ? { ...item, isSaved: !item.isSaved } : item
  );
  setStorageList(updated);
}

export function deleteHistoryItem(id: string): void {
  const list = getStorageList();
  const updated = list.filter((item) => item.id !== id);
  setStorageList(updated);
}

export function clearAllHistory(): void {
  setStorageList([]);
}
