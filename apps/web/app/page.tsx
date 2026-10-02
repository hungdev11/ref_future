import React from 'react';
import { Compass, Moon, Hash, BookOpen, ShieldCheck, CheckCircle2, ArrowRight, Zap, Code2, Database } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accentGold/10 border border-accentGold/30 text-accentGold text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          Nền Tảng Huyền Học Hoàn Toàn Tất Định • Không Sử Dụng AI
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Tính Toán & Luận Giải Chuẩn Xác Bằng{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentGold via-amber-300 to-amber-500">
            Deterministic Engine
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Loại bỏ hoàn toàn sự bịa đặt và ngẫu nhiên của LLM. Mọi kết quả từ Chiêm Tinh, Tử Vi, Thần Số Học đến Tarot
          đều được tính toán thuần toán học, áp dụng bộ quy tắc có trọng số và diễn giải minh bạch 100%.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="/astrology"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accentGold to-amber-600 text-background font-bold shadow-lg shadow-accentGold/20 hover:opacity-95 transition-opacity"
          >
            Lập Lá Số Chiêm Tinh
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/tu-vi"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-borderDark text-white font-medium hover:bg-surfaceHover transition-colors"
          >
            An Lá Số Tử Vi Đẩu Số
          </a>
          <a
            href="/admin/rules"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-medium hover:bg-purple-900/40 transition-colors"
          >
            Trình Giả Lập Quy Tắc (Simulator)
          </a>
        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Western Astrology */}
        <div className="p-6 rounded-2xl bg-surface/70 border border-borderDark/80 flex flex-col justify-between hover:border-amber-500/50 transition-colors group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Western Astrology</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tọa độ hành tinh theo lý thuyết VSOP87 & ELP2000. Hỗ trợ hệ thống nhà Placidus, Whole Sign, Equal. Orbs góc chiếu phiên bản hóa.
            </p>
          </div>
          <div className="pt-6">
            <a href="/astrology" className="text-sm font-semibold text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Khám phá Lá Số <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tử Vi Đẩu Số */}
        <div className="p-6 rounded-2xl bg-surface/70 border border-borderDark/80 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Tử Vi Đẩu Số</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Chuẩn hóa theo trường phái Nam phái truyền thống (TUVI_METHOD_V1). Lịch âm thiên văn kinh tuyến 105°E. An 12 cung, 14 chính tinh, Tứ Hóa và đại hạn.
            </p>
          </div>
          <div className="pt-6">
            <a href="/tu-vi" className="text-sm font-semibold text-indigo-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Lập Lá Số Tử Vi <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Numerology */}
        <div className="p-6 rounded-2xl bg-surface/70 border border-borderDark/80 flex flex-col justify-between hover:border-emerald-500/50 transition-colors group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Hash className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Pythagorean Numerology</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Chuẩn hóa tên tiếng Việt có dấu, thuật toán phân loại nguyên âm Y tất định, bảo lưu Master Numbers 11, 22, 33 và chu kỳ 4 đỉnh cao cuộc đời.
            </p>
          </div>
          <div className="pt-6">
            <a href="/numerology" className="text-sm font-semibold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Tính Thần Số Học <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Tarot */}
        <div className="p-6 rounded-2xl bg-surface/70 border border-borderDark/80 flex flex-col justify-between hover:border-rose-500/50 transition-colors group">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Rider-Waite Tarot</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              78 lá bài RWS xáo bài theo thuật toán Fisher-Yates bằng Seeded PRNG Mulberry32. Cho phép kiểm toán và tái lập (replay) chính xác 100%.
            </p>
          </div>
          <div className="pt-6">
            <a href="/tarot" className="text-sm font-semibold text-rose-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Rút Bài Tất Định <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* The Zero-AI Manifesto Section */}
      <section className="p-8 sm:p-10 rounded-3xl bg-surface/90 border border-borderDark space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderDark pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Nguyên Tắc Bất Di Bất Dịch: Không Sinh Chữ Ngẫu Nhiên
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Cam kết về tính minh bạch, nhất quán và có thể truy xuất nguồn gốc (Traceability).
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full">
              DETERMINISM: 100%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 p-5 rounded-xl bg-background/50 border border-borderDark/40">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <Code2 className="w-4 h-4" />
              Tách Biệt Tính Toán & Luận Giải
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Các module Calculation Engine chỉ tính toán tọa độ thiên văn và số học thuần túy. Toàn bộ câu luận do Rule Engine kết xuất theo phiên bản hóa.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-background/50 border border-borderDark/40">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
              <Zap className="w-4 h-4" />
              Cơ Chế Trọng Số & Specificity
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Quy tắc càng chi tiết (nhiều điều kiện, góc chiếu, kết hợp đa hệ thống) sẽ có Specificity Score cao hơn và ưu tiên ghi đè quy tắc tổng quát.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-background/50 border border-borderDark/40">
            <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm">
              <Database className="w-4 h-4" />
              Tính Năng "Why this result?"
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bất kỳ đoạn luận giải nào cũng cho phép người dùng click để xem toàn bộ chuỗi chứng minh: Dữ liệu đầu vào → Facts thiên văn → Quy tắc đã kích hoạt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
