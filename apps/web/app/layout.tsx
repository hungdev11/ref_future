import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata: Metadata = {
  title: 'Mysticos - Deterministic Mystical Platform (Zero AI)',
  description:
    'Nền tảng phân tích và luận giải Western Astrology, Tử Vi Đẩu Số, Numerology và Tarot hoàn toàn tất định, dựa trên Calculation Engine và Rule Engine phiên bản hóa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <body className="antialiased selection:bg-accentGold/30 selection:text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
        <footer className="mt-20 border-t border-borderDark/60 py-8 text-center text-xs text-gray-500">
          <p>© 2026 Mysticos Platform. Toàn bộ kết quả được tạo bằng Deterministic Rule Engine & Calculation Engine. Không sử dụng Generative AI.</p>
        </footer>
      </body>
    </html>
  );
}
