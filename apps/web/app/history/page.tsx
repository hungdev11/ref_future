'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  History,
  Bookmark,
  Trash2,
  ExternalLink,
  RotateCcw,
  Compass,
} from 'lucide-react';
import {
  getHistoryItems,
  toggleSaveItem,
  deleteHistoryItem,
  clearAllHistory,
  type HistoryItem,
} from '@/lib/history-storage';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

const DOMAIN_FILTERS = [
  { id: 'all', label: 'Tất Cả' },
  { id: 'tuvi', label: 'Tử Vi' },
  { id: 'astrology', label: 'Chiêm Tinh' },
  { id: 'numerology', label: 'Thần Số Học' },
  { id: 'tarot', label: 'Tarot' },
  { id: 'compatibility', label: 'Tương Hợp' },
];

const DOMAIN_LABELS: Record<string, string> = {
  tuvi: 'Tử Vi Đẩu Số',
  astrology: 'Chiêm Tinh Học',
  numerology: 'Thần Số Học',
  tarot: 'Bói Bài Tarot',
  compatibility: 'Độ Tương Hợp',
};

export default function HistoryPage() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [activeItem, setActiveItem] = useState<HistoryItem | null>(null);

  const loadData = () => {
    setItems(getHistoryItems(filter));
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handleToggleBookmark = (id: string) => {
    toggleSaveItem(id);
    loadData();
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    if (activeItem?.id === id) setActiveItem(null);
    loadData();
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử khảo cứu?')) {
      clearAllHistory();
      setActiveItem(null);
      loadData();
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <History className="w-3.5 h-3.5 text-accentGold" />
          <span>Lưu Trữ Văn Khố / Nhật Ký Khảo Cứu</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
            Lịch Sử &amp; Kết Quả Đã Khảo Cứu
          </h1>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-mono text-stone hover:text-cinnabar transition-colors border border-borderDark px-3 py-1.5 self-start sm:self-auto flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa Toàn Bộ Lịch Sử</span>
            </button>
          )}
        </div>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Xem lại các bản phân tích đã lập. Dữ liệu được lưu trữ an toàn ngay trên trình duyệt của bạn mà không chuyển tải qua máy chủ bên thứ ba.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-borderDark pb-3">
        {DOMAIN_FILTERS.map((df) => (
          <button
            key={df.id}
            type="button"
            onClick={() => {
              setFilter(df.id);
              setActiveItem(null);
            }}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors border ${
              filter === df.id
                ? 'bg-accentGold text-background border-accentGold font-bold'
                : 'bg-surface text-stone border-borderDark hover:text-parchment hover:border-stone'
            }`}
          >
            {df.label}
          </button>
        ))}
      </div>

      {/* Active Modal / Inline Result Viewer */}
      {activeItem && (
        <div className="border-2 border-accentGold/60 bg-surface p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-borderDark pb-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-accentGold uppercase tracking-wider block">
                {DOMAIN_LABELS[activeItem.domain] || activeItem.domain}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl text-parchment font-medium">
                {activeItem.title}
              </h2>
              <span className="font-mono text-[11px] text-stone block">
                Khởi tạo vào: {new Date(activeItem.timestamp).toLocaleString('vi-VN')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="px-3 py-1 text-xs font-mono text-stone hover:text-parchment border border-borderDark"
            >
              [Đóng Xem Lại ✕]
            </button>
          </div>

          <MysticosResultViewer result={activeItem.resultPayload} />
        </div>
      )}

      {/* List of records */}
      {items.length === 0 ? (
        <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
          <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
            ✦
          </div>
          <h3 className="text-sm font-serif text-parchment">Chưa Có Bản Ghi Nào</h3>
          <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
            Bạn chưa thực hiện khảo cứu nào trong mục này. Hãy chọn một bộ môn từ Trang Chủ để bắt đầu.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="px-4 py-2 bg-surface border border-accentGold text-accentGold hover:bg-accentGold hover:text-background transition-colors text-xs font-mono uppercase tracking-wider inline-block"
            >
              Về Trang Chủ →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-5 bg-surface border transition-all space-y-3 flex flex-col justify-between group ${
                activeItem?.id === item.id
                  ? 'border-accentGold bg-surfaceHover/30'
                  : 'border-borderDark hover:border-accentGold/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accentGold font-medium uppercase tracking-wider">
                    {DOMAIN_LABELS[item.domain] || item.domain}
                  </span>
                  <span className="text-[11px] text-stone">
                    {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <h3 className="font-serif text-lg text-parchment font-medium group-hover:text-accentGold transition-colors">
                  {item.title}
                </h3>

                {item.mainTheme && (
                  <p className="text-xs text-stone/90 line-clamp-2 leading-relaxed">
                    {item.mainTheme}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-borderDark/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleBookmark(item.id)}
                    className={`p-1.5 transition-colors ${
                      item.isSaved
                        ? 'text-accentGold'
                        : 'text-stone hover:text-parchment'
                    }`}
                    title={item.isSaved ? 'Bỏ lưu' : 'Lưu lại'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-stone hover:text-cinnabar transition-colors"
                    title="Xóa bản ghi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveItem(item)}
                  className="px-3 py-1 border border-borderDark group-hover:border-accentGold text-accentGold transition-colors flex items-center gap-1.5"
                >
                  <span>Mở Kết Quả</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
