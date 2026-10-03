import React from 'react';
import { Compass, Moon, Hash, BookOpen, HeartHandshake, Sparkles, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accentGold/10 border border-accentGold/30 text-accentGold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Thấu Hiểu Bản Thân • Định Hướng Tương Lai • Hoàn Toàn Miễn Phí</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Giải Mã Vận Mệnh Của Bạn Qua{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accentGold via-amber-300 to-amber-500">
            5 Phương Pháp Huyền Học
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Mỗi con người sinh ra đều mang theo một bản thiết kế tâm lý và vận trình riêng biệt. Khám phá bản đồ sao, lá số tử vi, các con số chủ đạo và thông điệp bài Tarot để có những góc nhìn sâu sắc, thực tế cho cuộc sống.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/numerology"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-600/20 hover:opacity-95 transition-all hover:scale-105"
          >
            <Hash className="w-4 h-4" />
            Tra Cứu Thần Số Học
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tu-vi"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-600/20 hover:opacity-95 transition-all hover:scale-105"
          >
            <Moon className="w-4 h-4" />
            Lập Lá Số Tử Vi
          </Link>
          <Link
            href="/astrology"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-accentGold to-amber-600 text-background font-bold shadow-lg shadow-accentGold/20 hover:opacity-95 transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4" />
            Bản Đồ Sao Chiêm Tinh
          </Link>
        </div>
      </section>

      {/* 5 Core Pillars Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Chọn Phương Pháp Bạn Muốn Khám Phá</h2>
          <p className="text-sm text-gray-400">Tất cả đều được thiết kế trực quan, dễ hiểu ngay cả khi bạn chưa từng tìm hiểu trước đây</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Thần Số Học */}
          <Link
            href="/numerology"
            className="p-6 rounded-2xl bg-surface/80 border border-borderDark/80 flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:-translate-y-1 shadow-lg group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Hash className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                Thần Số Học Pythagoras
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Khám phá Con Số Chủ Đạo, 4 Đỉnh Cao Cuộc Đời, Năm Cá Nhân và Biểu Đồ Ngày Sinh. Thấu hiểu tài năng tiềm ẩn, bài học cần vượt qua và giai đoạn hoàng kim của bạn.
              </p>
            </div>
            <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs text-emerald-400 font-semibold">
              <span>Xem Thần Số Học Của Bạn</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tử Vi Đẩu Số */}
          <Link
            href="/tu-vi"
            className="p-6 rounded-2xl bg-surface/80 border border-borderDark/80 flex flex-col justify-between hover:border-indigo-500/50 transition-all hover:-translate-y-1 shadow-lg group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                Tử Vi Đẩu Số
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                An bản đồ 12 cung chức (Mệnh, Tài Bạch, Quan Lộc, Phu Thê, Điền Trạch...) và các sao chiếu mệnh. Nhấn vào từng cung để đọc ý nghĩa chi tiết và lời khuyên thiết thực.
              </p>
            </div>
            <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs text-indigo-400 font-semibold">
              <span>An Lá Số Tử Vi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Chiêm Tinh Học Tây Phương */}
          <Link
            href="/astrology"
            className="p-6 rounded-2xl bg-surface/80 border border-borderDark/80 flex flex-col justify-between hover:border-amber-500/50 transition-all hover:-translate-y-1 shadow-lg group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                Bản Đồ Sao Chiêm Tinh
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Giải mã "Bộ Ba Quyền Lực" (Mặt Trời, Mặt Trăng, Cung Mọc) và vị trí các hành tinh trong 12 cung nhà. Khám phá sâu sắc cấu trúc tâm lý, nhu cầu cảm xúc và phong cách hành động.
              </p>
            </div>
            <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs text-amber-400 font-semibold">
              <span>Lập Bản Đồ Sao</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Bói Bài Tarot */}
          <Link
            href="/tarot"
            className="p-6 rounded-2xl bg-surface/80 border border-borderDark/80 flex flex-col justify-between hover:border-rose-500/50 transition-all hover:-translate-y-1 shadow-lg group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors">
                Bói Bài Tarot Trực Giác
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Bộ bài 78 lá chuẩn Rider-Waite với hình ảnh đẹp mắt. Rút bài theo ngày, trải 3 lá (Quá khứ - Hiện tại - Tương lai) hoặc Thập tự Celtic để nhận thông điệp chỉ dẫn công việc và tình cảm.
              </p>
            </div>
            <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs text-rose-400 font-semibold">
              <span>Rút Bài Tarot Ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tương Hợp Lứa Đôi */}
          <Link
            href="/compatibility"
            className="p-6 rounded-2xl bg-surface/80 border border-borderDark/80 flex flex-col justify-between hover:border-pink-500/50 transition-all hover:-translate-y-1 shadow-lg group md:col-span-2 lg:col-span-2"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">
                Xem Độ Hợp & Hòa Hợp Lứa Đôi
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Đối chiếu sự hòa hợp giữa 2 người qua nguyên tố Hoàng Đạo (Lửa, Đất, Khí, Nước) và cặp Số Chủ Đạo Thần Số Học. Nhận lời khuyên thấu hiểu, nuôi dưỡng tình cảm và hòa giải bất đồng.
              </p>
            </div>
            <div className="pt-6 border-t border-borderDark/60 flex items-center justify-between text-xs text-pink-400 font-semibold">
              <span>Kiểm Tra Độ Tương Hợp Của Hai Bạn</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Trust & Simplicity Value Section */}
      <section className="p-8 rounded-3xl bg-surface border border-borderDark space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-white">Tại Sao Bạn Nên Tra Cứu Tại Mysticos?</h2>
          <p className="text-xs text-gray-400">Trải nghiệm khác biệt hoàn toàn với những ứng dụng thông thường</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
            <span className="text-amber-400 font-bold text-sm block">✨ Dễ Hiểu & Thực Tế</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Toàn bộ thuật ngữ phức tạp đều được dịch nghĩa thành ngôn từ đời thường. Bạn không cần có kiến thức chuyên môn vẫn hiểu rõ lá số của mình.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
            <span className="text-emerald-400 font-bold text-sm block">🔒 Riêng Tư & Chuẩn Xác</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Mọi tính toán đều áp dụng quy chuẩn sách vở gốc, không đoán mò hay bịa đặt. Thông tin của bạn không bị lưu trữ hay chia sẻ cho bên thứ ba.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
            <span className="text-indigo-400 font-bold text-sm block">💡 Lời Khuyên Hành Động</span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Mỗi phần luận giải đều đi kèm những gợi ý ứng xử thiết thực, giúp bạn phát huy thế mạnh và khắc phục điểm yếu trong cuộc sống.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
