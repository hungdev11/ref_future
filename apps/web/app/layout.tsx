import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { TerminologyProvider } from '@/lib/terminology-context';

export const metadata: Metadata = {
  title: 'Mysticos — Khảo Cứu Vận Mệnh Cổ Điển & Đương Đại',
  description:
    'Hệ thống tra cứu Thần Số Học, Tử Vi Đẩu Số, Chiêm Tinh Học và Tarot cổ điển. Chuẩn xác, minh bạch, dễ hiểu và hoàn toàn miễn phí cho tất cả mọi người.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased selection:bg-accentGold/20 selection:text-parchment bg-background text-parchment min-h-screen flex flex-col justify-between font-sans">
        <TerminologyProvider>
          <div>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
          </div>
          <footer className="mt-20 border-t border-borderDark py-10 text-center text-xs text-stone space-y-2">
          <div className="flex items-center justify-center gap-4 text-[11px] font-mono tracking-widest uppercase text-stone/80">
            <span>Thần Số Học</span>
            <span>•</span>
            <span>Tử Vi Đẩu Số</span>
            <span>•</span>
            <span>Chiêm Tinh Học</span>
            <span>•</span>
            <span>Tarot Cổ Điển</span>
          </div>
          <p className="text-stone">
            © 2026 Mysticos. Tôn trọng và cổ điển.
          </p>
        </footer>
        </TerminologyProvider>
      </body>
    </html>
  );
}
