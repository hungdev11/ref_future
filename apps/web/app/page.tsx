import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const portals = [
    {
      code: '01',
      title: 'Thần Số Học Pythagoras',
      subtitle: 'Con Số Chủ Đạo & 4 Đỉnh Cao Đời Người',
      href: '/numerology',
      description:
        'Phân tích năng lượng từ họ tên và ngày sinh theo trường phái Pythagoras cổ điển. Khám phá bản đồ kim tự tháp 4 đỉnh cao, chu kỳ 9 năm và biểu đồ 9 nhóm tính cách.',
      badge: 'Bản Đồ Kim Tự Tháp',
    },
    {
      code: '02',
      title: 'Tử Vi Đẩu Số Phương Đông',
      subtitle: 'Bản Đồ 12 Cung Chức & Thiên Bàn',
      href: '/tu-vi',
      description:
        'An sao lập lá số theo giờ sinh và lịch thiên văn Việt Nam. Bấm trực tiếp vào từng cung trong ma trận 12 cung chức để giải nghĩa các chính tinh, phụ tinh và lời khuyên đời thường.',
      badge: 'Ma Trận 12 Cung',
    },
    {
      code: '03',
      title: 'Chiêm Tinh Học Tây Phương',
      subtitle: 'Bản Đồ Sao Cá Nhân (Natal Wheel)',
      href: '/astrology',
      description:
        'Tính toán tọa độ 10 thiên thể và 12 cung địa bàn theo hệ tọa độ Hoàng Đạo. Phân tích chi tiết Bộ Ba Quyền Lực (Mặt Trời, Mặt Trăng, Cung Mọc) và các góc hợp tương tác.',
      badge: 'Bánh Xe Hoàng Đạo',
    },
    {
      code: '04',
      title: 'Bói Bài Tarot Cổ Điển',
      subtitle: '78 Lá Rider-Waite & Trải Bài Trực Giác',
      href: '/tarot',
      description:
        'Lật mở các thông điệp chỉ dẫn qua hình ảnh nguyên bản Rider-Waite-Smith 1909. Rút 1 lá định hướng ngày, trải bài 3 lá thời gian, hoặc 5 lá đa chiều kèm lời khuyên hành động.',
      badge: 'Trực Họa 78 Lá',
    },
    {
      code: '05',
      title: 'Khảo Cứu Tương Hợp',
      subtitle: 'Hòa Hợp Bản Mệnh Giữa Hai Người',
      href: '/compatibility',
      description:
        'Đối chiếu và giải mã mức độ hòa hợp giữa hai người qua sự giao thoa của 4 nguyên tố Hoàng Đạo và cặp Số Chủ Đạo. Gợi ý phương pháp giao tiếp và hòa giải xung đột.',
      badge: 'Đối Chiếu Cặp Đôi',
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
              các trường phái dự đoán kinh điển thành một công cụ khảo cứu trực quan, dễ hiểu cho người mới bắt đầu, 
              không dùng thuật ngữ phô trương hay phán đoán mê tín.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/numerology"
                className="px-5 py-2.5 bg-accentGold text-background text-xs font-semibold tracking-wider uppercase hover:bg-parchment transition-colors border border-accentGold"
              >
                Tra Cứu Thần Số Học →
              </Link>
              <Link
                href="/tu-vi"
                className="px-5 py-2.5 bg-surface text-parchment text-xs font-semibold tracking-wider uppercase hover:border-accentGold transition-colors border border-borderLight"
              >
                Lập Lá Số Tử Vi →
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
                <span><strong>Không Mê Tín Dị Đoan:</strong> Mọi diễn giải đều hướng tới nhận thức bản thân và hoàn thiện đối nhân xử thế.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">02.</span>
                <span><strong>Ngôn Từ Giản Dị:</strong> Diễn giải chi tiết từng khái niệm cho người chưa từng có kiến thức nền tảng.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accentGold">03.</span>
                <span><strong>Tương Tác Trực Quan:</strong> Nhấp vào bất kỳ lá bài, con số hay cung vị nào để mở bảng giải nghĩa chi tiết.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5 Portals Index */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-borderDark pb-3 gap-2">
          <div>
            <h2 className="text-xl font-serif text-parchment">Các Bộ Môn Khảo Cứu</h2>
            <p className="text-xs text-stone mt-0.5">Chọn một phương pháp bạn muốn tra cứu chi tiết</p>
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
                <span>Khảo Cứu Ngay</span>
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
              Tất cả các thuật toán tính toán vị trí hành tinh, can chi và số học đều dựa trên các công thức thiên văn và thư tịch cổ chuẩn mực.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-borderLight pl-4">
            <h4 className="text-parchment font-serif text-sm">Coi Người Dùng Chưa Biết Gì</h4>
            <p className="leading-relaxed">
              Mọi biểu tượng, cung vị hay góc chiếu đều có phần giải thích bình dân ngay khi bạn nhấp vào.
            </p>
          </div>
          <div className="space-y-1.5 border-l-2 border-borderLight pl-4">
            <h4 className="text-parchment font-serif text-sm">Hoàn Toàn Miễn Phí</h4>
            <p className="leading-relaxed">
              Không ẩn giấu nội dung để đòi trả phí. Toàn bộ luận giải từ cơ bản đến chuyên sâu đều được hiển thị đầy đủ và công khai.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
