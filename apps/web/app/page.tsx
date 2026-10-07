import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const portals = [
    {
      code: '01',
      title: 'Chiêm Tinh Học Tây Phương',
      subtitle: 'Bản Đồ Sao Cá Nhân (Natal Wheel)',
      href: '/astrology',
      description:
        'Tính toán tọa độ 10 thiên thể và 12 cung địa bàn theo hệ tọa độ Hoàng Đạo. Phân tích chi tiết bộ ba Mặt Trời, Mặt Trăng, Cung Mọc và các góc hợp tương tác.',
      badge: 'Bánh Xe Hoàng Đạo',
      cta: 'Lập Bản Đồ Sao →',
    },
    {
      code: '02',
      title: 'Tử Vi Đẩu Số Phương Đông',
      subtitle: 'Bản Đồ 12 Cung Chức & Thiên Bàn',
      href: '/tu-vi',
      description:
        'An sao lập lá số theo giờ sinh và lịch thiên văn Việt Nam. Giải nghĩa các chính tinh, phụ tinh và các cung chức trọng yếu trong đời sống.',
      badge: 'Ma Trận 12 Cung',
      cta: 'Lập Lá Số Tử Vi →',
    },
    {
      code: '03',
      title: 'Thần Số Học Pythagoras',
      subtitle: 'Con Số Chủ Đạo & Chu Kỳ Vận Số',
      href: '/numerology',
      description:
        'Phân tích tần số dao động từ họ tên và ngày sinh theo trường phái Pythagoras cổ điển. Khám phá con số chủ đạo, sứ mệnh và 4 đỉnh cao cuộc đời.',
      badge: 'Bản Đồ Kim Tự Tháp',
      cta: 'Khảo Cứu Số Học →',
    },
    {
      code: '04',
      title: 'Bói Bài Tarot Cổ Điển',
      subtitle: '78 Lá Rider-Waite & Trải Bài Trực Giác',
      href: '/tarot',
      description:
        'Lật mở các thông điệp chỉ dẫn qua hình ảnh nguyên bản Rider-Waite-Smith 1909. Trải bài từ 1 đến 10 lá kèm lời khuyên hành động đời thường.',
      badge: 'Trực Họa 78 Lá',
      cta: 'Rút Bài Tarot →',
    },
    {
      code: '05',
      title: 'Khảo Cứu Tương Hợp',
      subtitle: 'Hòa Hợp Bản Mệnh Giữa Hai Người',
      href: '/compatibility',
      description:
        'Đối chiếu mức độ hòa hợp giữa hai người qua sự giao thoa nguyên tố Hoàng Đạo, cặp số chủ đạo và Can Chi. Không dùng điểm số cảm tính.',
      badge: 'Đối Chiếu Cặp Đôi',
      cta: 'Khảo Luận Tương Hợp →',
    },
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Editorial Hero Section */}
      <section className="border-b border-borderDark pb-12 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-3 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">✦</span>
              <span>Lưu Trữ Văn Khố Thiên Văn & Số Học Cổ Điển</span>
              <span className="text-borderLight">/</span>
              <span>100% Miễn Phí</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal leading-[1.2] tracking-tight">
              Khảo Cứu Vận Trình <br />
              <span className="italic text-accentGold font-normal">
                Bằng Tri Thức Cổ Điển & Minh Bạch
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Mỗi con người khi chào đời đều mang một tọa độ nhân sinh độc bản. Mysticos hệ thống hóa
              các trường phái dự đoán kinh điển thành công cụ khảo cứu tất định, trực quan và dễ tiếp cận,
              không dùng thuật ngữ phô trương hay phán đoán mê tín dị đoan.
            </p>

            <div className="pt-2">
              <Link
                href="/astrology"
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                Bắt Đầu Khảo Cứu Vận Trình →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 border border-borderDark bg-surface p-5 space-y-4 text-xs font-mono">
            <div className="text-accentGold uppercase tracking-wider text-[11px] pb-2 border-b border-borderDark">
              Nguyên Lý Thiết Kế
            </div>
            <ul className="space-y-3 text-stone text-[12px] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-accentGold">01.</span>
                <span><strong>Không Mê Tín Dị Đoan:</strong> Mọi diễn giải hướng tới thấu hiểu bản thân và hành xử thực tế.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">02.</span>
                <span><strong>Ngôn Từ Giản Dị:</strong> Diễn giải rõ ràng, dễ hiểu cho người chưa từng có kiến thức nền tảng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">03.</span>
                <span><strong>Minh Bạch Nguồn Gốc:</strong> Mỗi kết quả đều truy nguyên được công thức và thư tịch chuẩn tắc.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Portals Index */}
      <section className="space-y-6" id="modules">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-borderDark pb-3 gap-2">
          <div>
            <h2 className="text-xl font-serif text-parchment">Các Bộ Môn Khảo Cứu</h2>
            <p className="text-xs text-stone mt-0.5">Chọn một bộ môn để bắt đầu tra cứu</p>
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
        </div>
      </section>

      {/* Ephemeris Principles */}
      <section className="border border-borderDark p-8 bg-surface space-y-4">
        <div className="text-xs font-mono text-accentGold uppercase tracking-widest">
          Quy Chuẩn Hoạt Động
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone">
          <div className="space-y-1.5 border-l-2 border-borderLight pl-4">
            <h4 className="text-parchment font-serif text-sm">Minh Bạch Tuyệt Đối</h4>
            <p className="leading-relaxed">
              Mọi thuật toán tính toán vị trí thiên thể, can chi và số học đều dựa trên công thức thiên văn và thư tịch cổ điển chuẩn mực.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-borderLight pl-4">
            <h4 className="text-parchment font-serif text-sm">Dễ Hiểu & Thực Tế</h4>
            <p className="leading-relaxed">
              Kết quả trả lời trực tiếp điều người dùng quan tâm, kèm gợi ý ứng biến cụ thể trong đời sống hàng ngày.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-borderLight pl-4">
            <h4 className="text-parchment font-serif text-sm">Hoàn Toàn Miễn Phí</h4>
            <p className="leading-relaxed">
              Không ẩn giấu nội dung hay yêu cầu trả phí. Toàn bộ luận giải từ cơ bản đến chuyên sâu đều được hiển thị đầy đủ và công khai.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
