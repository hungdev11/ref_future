import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, Sparkles, BookOpen } from 'lucide-react';

export default function HomePage() {
  const portals = [
    {
      code: '01',
      title: 'Thần Số Học',
      subtitle: 'Pythagoras Cổ Điển',
      href: '/numerology',
      description: 'Khám phá các mô hình nổi bật từ ngày sinh và tên.',
      badge: 'Con Số Cốt Lõi',
      cta: 'Khám phá Thần Số Học',
    },
    {
      code: '02',
      title: 'Tử Vi Đẩu Số',
      subtitle: 'Toàn Thư Cổ Bản',
      href: '/tu-vi',
      description: 'Khảo sát cấu trúc lá số, các cung trọng yếu và vận trình theo thời gian.',
      badge: '12 Cung Chức',
      cta: 'Khảo sát Tử Vi',
    },
    {
      code: '03',
      title: 'Chiêm Tinh',
      subtitle: 'Bản Đồ Sao Thiên Văn',
      href: '/astrology',
      description: 'Khám phá cấu trúc bản đồ sao và những tương tác nổi bật giữa các yếu tố.',
      badge: 'Bánh Xe Hoàng Đạo',
      cta: 'Khám phá Chiêm Tinh',
    },
    {
      code: '04',
      title: 'Tarot',
      subtitle: 'Rider-Waite 78 Lá',
      href: '/tarot',
      description: 'Đặt một câu hỏi và khám phá câu chuyện nổi lên từ trải bài.',
      badge: 'Trực Họa Biểu Tượng',
      cta: 'Trải Bài Tarot',
    },
    {
      code: '05',
      title: 'Độ Tương Hợp',
      subtitle: 'Khảo Cứu Đa Chiều',
      href: '/compatibility',
      description: 'Khảo sát cách hai người kết nối, hỗ trợ và tạo ra ma sát trong các lĩnh vực khác nhau.',
      badge: 'Đối Chiếu Cặp Đôi',
      cta: 'Khảo sát Tương Hợp',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Editorial Hero Section (Spec 05) */}
      <section className="border-b border-borderDark pb-14 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">✦</span>
              <span>MYSTICOS</span>
              <span className="text-borderLight">/</span>
              <span>Khảo Cứu Vận Mệnh</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal leading-[1.2] tracking-tight">
              Khảo Cứu Vận Mệnh <br />
              <span className="italic text-accentGold font-normal">
                Minh Bạch, Tất Định &amp; Thực Tiễn
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Khám phá các mô hình và xu hướng trong ngày sinh, lá số, bản đồ sao và trải bài của bạn.
              Không dùng thuật ngữ mê tín hay phán đoán định mệnh đóng khung.
            </p>

            {/* CTAs (Spec 05) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#modules"
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Bắt đầu khám phá</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#methodology"
                className="px-6 py-3 bg-transparent text-parchment text-xs font-mono uppercase tracking-widest hover:border-accentGold transition-colors border border-borderDark inline-flex items-center gap-2"
              >
                <span>Tìm hiểu MYSTICOS</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 border border-borderDark bg-surface p-5 space-y-4 text-xs font-mono">
            <div className="text-accentGold uppercase tracking-wider text-[11px] pb-2 border-b border-borderDark">
              Nguyên Tắc Cốt Lõi
            </div>
            <ul className="space-y-3 text-stone text-[12px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-accentGold">01.</span>
                <span><strong>Không Phán Quyết Mê Tín:</strong> Mọi diễn giải hướng tới thấu hiểu bản thân và hành động thực tế.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">02.</span>
                <span><strong>Ngôn Từ Giản Dị:</strong> Diễn giải rõ ràng, mạch lạc cho người chưa từng có kiến thức nền tảng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">03.</span>
                <span><strong>Truy Nguyên Thư Tịch:</strong> Mỗi kết quả đều truy vết được nguồn gốc quy tắc cổ điển chuẩn tắc.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Modules Selection (Spec 06) */}
      <section className="space-y-6" id="modules">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-borderDark pb-3 gap-2">
          <div>
            <h2 className="text-xl font-serif text-parchment">5 Phương Pháp Khảo Cứu</h2>
            <p className="text-xs text-stone mt-0.5">Chọn một phương pháp phù hợp với câu hỏi của bạn</p>
          </div>
          <span className="text-xs font-mono text-stone">Mục Lục 01 — 05</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portals.map((p) => (
            <Link
              key={p.code}
              href={p.href}
              className="p-6 bg-surface border border-borderDark hover:border-accentGold transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accentGold font-bold tracking-widest">{p.code}</span>
                  <span className="text-[10px] text-stone tracking-wider uppercase border border-borderDark px-2 py-0.5">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-serif text-parchment group-hover:text-accentGold transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-stone font-medium">{p.subtitle}</p>
                <p className="text-xs text-stone/80 leading-relaxed">{p.description}</p>
              </div>

              <div className="pt-4 border-t border-borderDark flex items-center justify-between text-xs font-mono text-accentGold group-hover:translate-x-0.5 transition-transform">
                <span>{p.cta}</span>
                <span>→</span>
              </div>
            </Link>
          ))}

          {/* Bonus Cross-System Card */}
          <Link
            href="/analysis"
            className="p-6 bg-surface/50 border border-dashed border-borderDark hover:border-accentGold transition-colors flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-accentGold font-bold tracking-widest">06</span>
                <span className="text-[10px] text-accentGold tracking-wider uppercase border border-accentGold/40 px-2 py-0.5">
                  ĐA HỆ THỐNG
                </span>
              </div>
              <h3 className="text-lg font-serif text-parchment group-hover:text-accentGold transition-colors">
                Đối Chiếu Chéo
              </h3>
              <p className="text-xs text-stone font-medium">Khảo Luận Tổng Hợp</p>
              <p className="text-xs text-stone/80 leading-relaxed">
                Đối chiếu các chủ đề chung và sự khác biệt giữa các hệ quy chiếu khi bạn đã có kết quả.
              </p>
            </div>

            <div className="pt-4 border-t border-borderDark flex items-center justify-between text-xs font-mono text-accentGold group-hover:translate-x-0.5 transition-transform">
              <span>Xem Đối Chiếu Chéo</span>
              <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Trust & Methodology Pipeline (Spec 08) */}
      <section id="methodology" className="border border-borderDark p-8 bg-surface space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono text-accentGold uppercase tracking-widest">
            PHƯƠNG PHÁP LUẬN TẤT ĐỊNH
          </div>
          <p className="font-serif text-lg text-parchment leading-relaxed max-w-3xl">
            &ldquo;MYSTICOS không chỉ hiển thị ý nghĩa của từng yếu tố. Hệ thống phân tích mối liên hệ giữa các yếu tố và trình bày những pattern nổi bật trong ngữ cảnh cụ thể.&rdquo;
          </p>
        </div>

        {/* 5-step Pipeline Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
          <div className="p-3.5 bg-background border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">BƯỚC 01</span>
            <span className="font-serif text-sm text-parchment block">Dữ Liệu</span>
            <span className="font-mono text-[10px] text-stone block">Ngày giờ sinh, câu hỏi</span>
          </div>
          <div className="p-3.5 bg-background border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">BƯỚC 02</span>
            <span className="font-serif text-sm text-parchment block">Tính Toán</span>
            <span className="font-mono text-[10px] text-stone block">Thiên văn, Can Chi, số học</span>
          </div>
          <div className="p-3.5 bg-background border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">BƯỚC 03</span>
            <span className="font-serif text-sm text-parchment block">Đối Chiếu Tri Thức</span>
            <span className="font-mono text-[10px] text-stone block">Thư tịch cổ điển chuẩn tắc</span>
          </div>
          <div className="p-3.5 bg-background border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">BƯỚC 04</span>
            <span className="font-serif text-sm text-parchment block">Phân Tích Pattern</span>
            <span className="font-mono text-[10px] text-stone block">Tương tác, hỗ trợ &amp; ma sát</span>
          </div>
          <div className="p-3.5 bg-background border border-borderDark text-center space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">BƯỚC 05</span>
            <span className="font-serif text-sm text-parchment block">Diễn Giải</span>
            <span className="font-mono text-[10px] text-stone block">Hành động đời sống thực tế</span>
          </div>
        </div>
      </section>
    </div>
  );
}
