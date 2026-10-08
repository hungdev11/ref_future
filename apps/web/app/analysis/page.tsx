'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Compass, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { getHistoryItems, type HistoryItem } from '@/lib/history-storage';

export default function AnalysisPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistoryItems('all'));
  }, []);

  // Filter latest records for each domain
  const tuviItem = history.find((h) => h.domain === 'tuvi');
  const astroItem = history.find((h) => h.domain === 'astrology');
  const numItem = history.find((h) => h.domain === 'numerology');
  const tarotItem = history.find((h) => h.domain === 'tarot');

  const activeDomainsCount = [tuviItem, astroItem, numItem, tarotItem].filter(Boolean).length;

  return (
    <div className="space-y-10 py-4 max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <Layers className="w-3.5 h-3.5 text-accentGold" />
          <span>Khảo Cứu Đa Chiều / Đối Chiếu Chéo</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Đối Chiếu Chéo Đa Hệ Thống
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Tổng hợp và đối chiếu các tín hiệu giữa Thần Số Học, Chiêm Tinh, Tử Vi và Tarot.
          Khám phá sự giao thoa khách quan mà không gượng ép hòa lẫn mâu thuẫn.
        </p>
      </div>

      {activeDomainsCount < 2 ? (
        <div className="p-12 sm:p-16 border border-borderDark bg-surface text-center space-y-4">
          <div className="w-12 h-12 border border-borderLight mx-auto flex items-center justify-center text-accentGold font-serif text-xl">
            ✦
          </div>
          <h3 className="text-lg font-serif text-parchment">Cần Dữ Liệu Từ Ít Nhất 2 Bộ Môn</h3>
          <p className="text-stone text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Hiện bạn mới có kết quả từ {activeDomainsCount} bộ môn. Hãy thực hiện thêm khảo cứu từ các bộ môn khác để hệ thống có thể đối chiếu các chủ đề chung và sự khác biệt.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tu-vi"
              className="px-4 py-2 border border-borderDark hover:border-accentGold text-parchment text-xs font-mono uppercase tracking-wider"
            >
              Lập Tử Vi →
            </Link>
            <Link
              href="/astrology"
              className="px-4 py-2 border border-borderDark hover:border-accentGold text-parchment text-xs font-mono uppercase tracking-wider"
            >
              Lập Chiêm Tinh →
            </Link>
            <Link
              href="/numerology"
              className="px-4 py-2 border border-borderDark hover:border-accentGold text-parchment text-xs font-mono uppercase tracking-wider"
            >
              Khảo Cứu Số Học →
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Domains Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-4 border ${tuviItem ? 'border-accentGold/60 bg-surface' : 'border-borderDark/40 bg-surface/30 opacity-50'}`}>
              <span className="font-mono text-[10px] text-accentGold uppercase block">TỬ VI ĐẨU SỐ</span>
              <p className="font-serif text-sm text-parchment mt-1">
                {tuviItem ? tuviItem.title : 'Chưa có dữ liệu'}
              </p>
            </div>
            <div className={`p-4 border ${astroItem ? 'border-accentGold/60 bg-surface' : 'border-borderDark/40 bg-surface/30 opacity-50'}`}>
              <span className="font-mono text-[10px] text-accentGold uppercase block">CHIÊM TINH HỌC</span>
              <p className="font-serif text-sm text-parchment mt-1">
                {astroItem ? astroItem.title : 'Chưa có dữ liệu'}
              </p>
            </div>
            <div className={`p-4 border ${numItem ? 'border-accentGold/60 bg-surface' : 'border-borderDark/40 bg-surface/30 opacity-50'}`}>
              <span className="font-mono text-[10px] text-accentGold uppercase block">THẦN SỐ HỌC</span>
              <p className="font-serif text-sm text-parchment mt-1">
                {numItem ? numItem.title : 'Chưa có dữ liệu'}
              </p>
            </div>
            <div className={`p-4 border ${tarotItem ? 'border-accentGold/60 bg-surface' : 'border-borderDark/40 bg-surface/30 opacity-50'}`}>
              <span className="font-mono text-[10px] text-accentGold uppercase block">TAROT CỔ ĐIỂN</span>
              <p className="font-serif text-sm text-parchment mt-1">
                {tarotItem ? tarotItem.title : 'Chưa có dữ liệu'}
              </p>
            </div>
          </div>

          {/* Section 1: Shared Themes (Spec 65) */}
          <section className="border border-borderDark bg-surface p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark/60 pb-3">
              <Sparkles className="w-4 h-4 text-accentGold" />
              <span>CHỦ ĐỀ CHUNG XUẤT HIỆN Ở NHIỀU HỆ THỐNG (SHARED THEMES)</span>
            </div>

            <p className="text-stone text-xs leading-relaxed">
              Các hệ quy chiếu độc lập cùng chỉ ra một chủ đề tương tự trong hành trình phát triển cá nhân. (Lưu ý: Sự đồng quy này phản ánh mô hình tương đồng, không dùng để khẳng định niềm tin tuyệt đối hay số mệnh đóng khung).
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-background/60 border border-borderDark space-y-1.5 border-l-2 border-l-accentGold">
                <span className="font-mono text-[10px] text-accentGold uppercase block">
                  CHỦ ĐỀ 01: SỰ CÂN BẰNG GIỮA AN TOÀN VÀ ĐỘT PHÁ
                </span>
                <p className="font-serif text-base text-parchment leading-relaxed">
                  Cả cấu trúc cung Mệnh (Tử Vi) và vị trí Mặt Trời / Mặt Trăng (Chiêm Tinh) đều nhấn mạnh động lực bảo vệ nền tảng hiện tại song hành cùng khát khao tự chủ trong hành động.
                </p>
              </div>

              <div className="p-4 bg-background/60 border border-borderDark space-y-1.5 border-l-2 border-l-borderLight">
                <span className="font-mono text-[10px] text-stone uppercase block">
                  CHỦ ĐỀ 02: BÀI HỌC VỀ KỶ LUẬT THỰC THI
                </span>
                <p className="font-serif text-base text-parchment leading-relaxed">
                  Con số chủ đạo (Thần Số Học) và sự hội chiếu cung Quan Lộc (Tử Vi) cùng gợi mở nhu cầu rèn luyện tính kiên định thay vì tìm kiếm thành tựu ngắn hạn bộc phát.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Divergence (Spec 66) */}
          <section className="border border-borderDark bg-surface p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-terracotta uppercase tracking-wider border-b border-borderDark/60 pb-3">
              <AlertCircle className="w-4 h-4 text-terracotta" />
              <span>CÁC GÓC NHÌN KHÁC BIỆT &amp; ĐA CHIỀU (DIVERGENCE)</span>
            </div>

            <p className="text-stone text-xs leading-relaxed">
              Mỗi bộ môn quan sát con người từ một lăng kính thiên văn hoặc số học khác nhau. MYSTICOS giữ nguyên sự khác biệt khách quan thay vì gượng ép xóa bỏ mâu thuẫn để tạo một câu chuyện hư cấu.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-background/60 border border-borderDark space-y-2">
                <span className="font-mono text-parchment font-medium uppercase block">
                  Trọng Tâm Theo Thời Gian
                </span>
                <p className="text-stone leading-relaxed">
                  Tử Vi tập trung vào vận trình tuần hoàn theo năm/tháng của Can Chi, trong khi Chiêm Tinh nhấn mạnh dòng chảy chuyển dịch của các hành tinh ngoài hệ Mặt Trời.
                </p>
              </div>

              <div className="p-4 bg-background/60 border border-borderDark space-y-2">
                <span className="font-mono text-parchment font-medium uppercase block">
                  Động Lực Nội Tâm vs Hoàn Cảnh
                </span>
                <p className="text-stone leading-relaxed">
                  Thần Số Học phản ánh thôi thúc linh hồn và bài học đường đời, trong khi trải bài Tarot chiếu rọi trực tiếp vào thách thức tâm lý ở lát cắt hiện tại.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
