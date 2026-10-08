'use client';

import React, { useState } from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { Bookmark, Share2, ArrowUp, Check } from 'lucide-react';
import { saveHistoryItem } from '../../lib/history-storage';

export interface ResultStickyNavProps {
  domain: string;
  result?: DeepMysticosResult;
  className?: string;
}

export function ResultStickyNav({
  domain,
  result,
  className = '',
}: ResultStickyNavProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (selector: string, id: string) => {
    setActiveSection(id);
    if (id === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSave = () => {
    if (!result) return;
    saveHistoryItem({
      id: `${domain}_${Date.now()}`,
      timestamp: Date.now(),
      domain: domain as any,
      title: result.mainStory?.headline || result.primaryResult || `Kết quả ${domain}`,
      mainTheme: result.primaryResult || 'Khảo cứu cá nhân',
      resultPayload: result,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <aside
      aria-label="Thanh Điều Hướng Kết Quả"
      className={`sticky top-16 z-40 bg-[#161615]/95 backdrop-blur-xs border-b border-borderDark py-2.5 px-4 sm:px-6 mb-6 transition-all ${className}`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Desktop Quick Nav Links (Spec 8, 83) */}
        <nav aria-label="Phần mục kết quả" className="hidden sm:flex items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => scrollTo('#overview', 'overview')}
            className={`px-3 py-1 transition-colors cursor-pointer ${
              activeSection === 'overview'
                ? 'text-accentGold font-bold border-b border-accentGold'
                : 'text-stone hover:text-parchment'
            }`}
          >
            Tổng Quan
          </button>
          <button
            type="button"
            onClick={() =>
              scrollTo(
                '[aria-label*="Cốt Truyện"], [aria-label*="Trọng Tâm"], [aria-label*="Mô Hình"], [aria-label*="Bản Đồ Sao"]',
                'patterns'
              )
            }
            className={`px-3 py-1 transition-colors cursor-pointer ${
              activeSection === 'patterns'
                ? 'text-accentGold font-bold border-b border-accentGold'
                : 'text-stone hover:text-parchment'
            }`}
          >
            Chủ Đề
          </button>
          <button
            type="button"
            onClick={() =>
              scrollTo(
                '[aria-label*="Luận Giải"], [aria-label*="Cung"], [aria-label*="Chu Kỳ"], [aria-label*="Tiến Trình"]',
                'details'
              )
            }
            className={`px-3 py-1 transition-colors cursor-pointer ${
              activeSection === 'details'
                ? 'text-accentGold font-bold border-b border-accentGold'
                : 'text-stone hover:text-parchment'
            }`}
          >
            Chi Tiết
          </button>
          <button
            type="button"
            onClick={() =>
              scrollTo('[aria-label*="Minh Bạch"], [aria-label*="Cơ Sở"], [aria-label*="Kỹ Thuật"]', 'evidence')
            }
            className={`px-3 py-1 transition-colors cursor-pointer ${
              activeSection === 'evidence'
                ? 'text-accentGold font-bold border-b border-accentGold'
                : 'text-stone hover:text-parchment'
            }`}
          >
            Cơ Sở
          </button>
        </nav>

        {/* Mobile Section Selector (Spec 83) */}
        <div className="sm:hidden flex-1 max-w-[180px]">
          <select
            value={activeSection}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'overview') scrollTo('#overview', 'overview');
              if (val === 'patterns')
                scrollTo(
                  '[aria-label*="Cốt Truyện"], [aria-label*="Trọng Tâm"], [aria-label*="Mô Hình"], [aria-label*="Bản Đồ Sao"]',
                  'patterns'
                );
              if (val === 'details')
                scrollTo(
                  '[aria-label*="Luận Giải"], [aria-label*="Cung"], [aria-label*="Chu Kỳ"], [aria-label*="Tiến Trình"]',
                  'details'
                );
              if (val === 'evidence')
                scrollTo('[aria-label*="Minh Bạch"], [aria-label*="Cơ Sở"], [aria-label*="Kỹ Thuật"]', 'evidence');
            }}
            aria-label="Chọn phần mục"
            className="w-full px-2 py-1 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
          >
            <option value="overview">Tổng Quan</option>
            <option value="patterns">Chủ Đề &amp; Pattern</option>
            <option value="details">Chi Tiết Luận Giải</option>
            <option value="evidence">Cơ Sở &amp; Bằng Chứng</option>
          </select>
        </div>

        {/* Action Controls: Back to top / Save / Share (Spec 8, 11) */}
        <div className="flex items-center gap-2">
          {/* Back to top quick action (Spec 11) */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            title="Quay lại tổng quan"
            aria-label="Quay lại tổng quan"
            className="p-1.5 text-stone hover:text-parchment border border-borderDark hover:border-accentGold transition-colors text-xs font-mono flex items-center gap-1 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-accentGold" />
            <span className="hidden md:inline">Đầu trang</span>
          </button>

          {/* Save Action */}
          <button
            type="button"
            onClick={handleSave}
            title="Lưu kết quả này"
            aria-label="Lưu kết quả này"
            className={`px-2.5 py-1.5 border transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? 'border-accentGold bg-accentGold/10 text-accentGold font-bold'
                : 'border-borderDark hover:border-accentGold text-stone hover:text-parchment'
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5 text-accentGold" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Đã lưu' : 'Lưu'}</span>
          </button>

          {/* Share Action */}
          <button
            type="button"
            onClick={handleShare}
            title="Chia sẻ kết quả"
            aria-label="Chia sẻ kết quả"
            className={`px-2.5 py-1.5 border transition-colors text-xs font-mono flex items-center gap-1.5 cursor-pointer ${
              copied
                ? 'border-accentGold bg-accentGold/10 text-accentGold font-bold'
                : 'border-borderDark hover:border-accentGold text-stone hover:text-parchment'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-accentGold" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã chép' : 'Chia sẻ'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
