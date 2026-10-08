'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Trash2, CheckCircle2, Lock, Eye, Database } from 'lucide-react';
import { clearAllHistory } from '@/lib/history-storage';

export default function SettingsPage() {
  const [cleared, setCleared] = useState(false);

  const handleClearAllData = () => {
    if (window.confirm('Hành động này sẽ xóa toàn bộ lịch sử và dữ liệu cá nhân đã lưu trên trình duyệt của bạn. Bạn có muốn tiếp tục?')) {
      clearAllHistory();
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }
      setCleared(true);
      setTimeout(() => setCleared(false), 4000);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-3xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <Shield className="w-3.5 h-3.5 text-accentGold" />
          <span>Cấu Hình &amp; Quyền Riêng Tư Dữ Liệu</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Cài Đặt &amp; Minh Bạch Dữ Liệu
        </h1>
        <p className="text-xs sm:text-sm text-stone leading-relaxed">
          MYSTICOS cam kết bảo mật tuyệt đối. Chúng tôi không lưu trữ thông tin nhận dạng cá nhân trên bất kỳ máy chủ bên ngoài nào.
        </p>
      </div>

      {/* Privacy Policy Card */}
      <div className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark/60 pb-3">
          <Lock className="w-4 h-4 text-accentGold" />
          <span>CAM KẾT BẢO VỆ DỮ LIỆU CÁ NHÂN</span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-stone leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0 mt-0.5" />
            <div>
              <strong className="text-parchment">Lưu Trữ Cục Bộ (Client-side Only):</strong> Toàn bộ họ tên, ngày giờ sinh và câu hỏi tarot chỉ được lưu trong bộ nhớ trình duyệt (LocalStorage) của thiết bị bạn đang sử dụng.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0 mt-0.5" />
            <div>
              <strong className="text-parchment">Không Thu Thập Quảng Cáo:</strong> Không cài đặt tracker, pixel quảng cáo hay bán dữ liệu hành vi người dùng cho bất kỳ bên thứ ba nào.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0 mt-0.5" />
            <div>
              <strong className="text-parchment">Quyền Kiểm Soát Tuyệt Đối:</strong> Bạn có toàn quyền xóa bỏ vĩnh viễn mọi dữ liệu cá nhân bất cứ lúc nào chỉ với một thao tác bấm.
            </div>
          </div>
        </div>
      </div>

      {/* Data Inventory */}
      <div className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-stone uppercase tracking-wider border-b border-borderDark/60 pb-3">
          <Database className="w-4 h-4 text-stone" />
          <span>BẢNG KÊ THÔNG TIN LƯU TRỮ TRÊN THIẾT BỊ NÀY</span>
        </div>

        <div className="divide-y divide-borderDark/60 text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-parchment">Lịch sử các lần khảo cứu (Nhật ký)</span>
            <span className="font-mono text-stone">Bộ nhớ LocalStorage</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-parchment">Cài đặt hiển thị thuật ngữ cổ điển</span>
            <span className="font-mono text-stone">Cục bộ thiết bị</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-parchment">Dữ liệu tài khoản / Mật khẩu</span>
            <span className="font-mono text-accentGold">Không sử dụng</span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Clear Data */}
      <div className="border border-cinnabar/40 bg-surface p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cinnabar uppercase tracking-wider border-b border-borderDark/60 pb-3">
          <Trash2 className="w-4 h-4 text-cinnabar" />
          <span>QUẢN LÝ DỮ LIỆU CỤC BỘ</span>
        </div>

        <p className="text-xs text-stone leading-relaxed">
          Xóa toàn bộ các bản lưu lá số, trải bài tarot và hồ sơ tương hợp đang được lưu trên trình duyệt này.
        </p>

        {cleared && (
          <div className="p-3 bg-background border border-accentGold text-accentGold text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Đã xóa sạch toàn bộ dữ liệu lưu trữ cục bộ thành công!</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleClearAllData}
          className="px-5 py-2.5 bg-background border border-cinnabar text-cinnabar hover:bg-cinnabar hover:text-white transition-colors text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Xóa Toàn Bộ Dữ Liệu Của Tôi</span>
        </button>
      </div>
    </div>
  );
}
