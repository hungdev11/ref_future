import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Mysticos - Khám Phá Bản Thân & Vận Mệnh Toàn Diện',
  description:
    'Nền tảng tra cứu Chiêm Tinh Học, Tử Vi Đẩu Số, Thần Số Học và Tarot chuẩn mực, chuyên sâu, dễ hiểu và hoàn toàn miễn phí.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased selection:bg-accentGold/30 selection:text-white bg-background text-gray-100 min-h-screen flex flex-col justify-between">
        <div>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        </div>
        <footer className="mt-20 border-t border-borderDark/60 py-8 text-center text-xs text-gray-500 space-y-2">
          <p className="text-gray-400">© 2026 Mysticos. Nền tảng tra cứu & luận giải vận mệnh cá nhân hóa chuẩn xác.</p>
          <p className="text-gray-600 text-[11px]">
            Tất cả các phương pháp tra cứu đều miễn phí, bảo mật thông tin và phục vụ định hướng cuộc sống tích cực.
          </p>
        </footer>
      </body>
    </html>
  );
}
