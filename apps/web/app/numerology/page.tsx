'use client';

import React, { useState } from 'react';
import { Hash, Sparkles, BookOpen, AlertTriangle, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, birthDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Calculation failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Hash className="w-4 h-4" />
          <span>Pythagorean Numerology (Chuẩn Hóa Tiếng Việt & Master Numbers)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tra Cứu Thần Số Học Pythagorean Tất Định</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Phân tích họ tên tiếng Việt theo chuẩn NFD loại bỏ dấu thanh, thuật toán phân loại chữ Y chuẩn mực, bảo lưu Master Numbers (11, 22, 33) theo phương pháp rút gọn 3 thành phần.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Họ Và Tên (Tiếng Việt Đầy Đủ)</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Ví dụ: Nguyễn Văn Đức"
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Tháng Năm Sinh</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-emerald-600/20"
            >
              {loading ? 'Đang Tính Toán...' : 'Tính Toán Thần Số Học'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Hash className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">Nhập họ tên và ngày sinh để tính toán các chỉ số cốt lõi và chu kỳ.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Name Normalization Banner */}
              <div className="p-4 rounded-xl bg-background/80 border border-borderDark flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400">Tên đã chuẩn hóa:</span>{' '}
                  <span className="font-bold text-white font-mono">{result.facts.normalizedName}</span>
                </div>
                <div className="text-gray-400">
                  <span>{result.metadata.vowelCount} Nguyên âm</span> • <span>{result.metadata.consonantCount} Phụ âm</span>
                </div>
              </div>

              {/* Core Numbers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Life Path */}
                <div className="p-5 rounded-2xl bg-surface border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Đạo Tự (Life Path)</span>
                    {result.facts.core.LIFE_PATH.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    {result.facts.core.LIFE_PATH.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {result.facts.core.LIFE_PATH.rawCalculation}
                  </p>
                </div>

                {/* Expression */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Vận Mệnh (Expression)</span>
                    {result.facts.core.EXPRESSION.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-white">
                    {result.facts.core.EXPRESSION.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.EXPRESSION.rawCalculation}
                  </p>
                </div>

                {/* Soul Urge */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Linh Hồn (Soul Urge)</span>
                    {result.facts.core.SOUL_URGE.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-indigo-400">
                    {result.facts.core.SOUL_URGE.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.SOUL_URGE.rawCalculation}
                  </p>
                </div>

                {/* Personality */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Nhân Cách (Personality)</span>
                  <div className="text-4xl font-extrabold text-white">
                    {result.facts.core.PERSONALITY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.PERSONALITY.rawCalculation}
                  </p>
                </div>

                {/* Birthday */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Ngày Sinh (Birthday)</span>
                  <div className="text-4xl font-extrabold text-amber-400">
                    {result.facts.core.BIRTHDAY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono">
                    {result.facts.core.BIRTHDAY.rawCalculation}
                  </p>
                </div>

                {/* Maturity */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Trưởng Thành (Maturity)</span>
                  <div className="text-4xl font-extrabold text-purple-400">
                    {result.facts.core.MATURITY.value}
                  </div>
                  <p className="text-[11px] text-gray-400 font-mono truncate">
                    {result.facts.core.MATURITY.rawCalculation}
                  </p>
                </div>
              </div>

              {/* 4 Pinnacles Timeline */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
                <h3 className="text-sm font-bold text-white">4 Giai Đoạn Đỉnh Cao Cuộc Đời (Pinnacles)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {result.facts.pinnacles.map((p: any) => (
                    <div key={p.pinnacleNumber} className="p-4 rounded-xl bg-background/50 border border-borderDark/60 text-center space-y-1">
                      <span className="text-[11px] text-gray-400">Đỉnh {p.pinnacleNumber}</span>
                      <div className="text-2xl font-bold text-emerald-400">{p.value}</div>
                      <span className="text-[10px] text-gray-500 block">
                        {p.startAge} - {p.endAge} tuổi
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Luận Giải Toàn Diện Thần Số Học Dành Cho Độc Giả */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Bản Mệnh & Thời Vận</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                    Hệ Thống Pythagoras Chuẩn Xác
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Life Path Card */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <span>🌟 Con Số Chủ Đạo {result.facts.core.LIFE_PATH.value}: Sứ Mệnh Cuộc Đời & Năng Lực Cốt Lõi</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Con số Chủ đạo (Life Path) là chỉ số quan trọng nhất trong bản đồ Pythagoras, phản ánh bài học lớn nhất mà bạn đến với cuộc đời này để trải nghiệm và hoàn thiện. Với con số {result.facts.core.LIFE_PATH.value}, bạn mang năng lượng nguyên bản của một cá nhân sở hữu tư chất vượt trội, luôn tìm kiếm giá trị chân thực và có định hướng phát triển rõ ràng.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dành Cho Người Không Chuyên):</span>
                      <p className="text-gray-200 leading-relaxed">
                        Bạn là người có cá tính mạnh mẽ, tư duy thực tế và ghét sự nửa vời. Trong công việc cũng như đời sống, bạn luôn đặt chữ tín và hiệu quả lên hàng đầu, dễ trở thành điểm tựa đáng tin cậy cho gia đình và đồng đội.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">🔍 Cơ Chế Vận Hành (Trục Năng Lượng Pythagoras):</span>
                      <p className="text-gray-300 leading-relaxed">
                        Theo đúc kết của Tiến sĩ David A. Phillips: Con số này giúp kết nối hài hòa giữa trục Thần Trí (Mind), Tâm Hồn (Soul) và Thể Chất (Physical), mang lại cho bạn khả năng phục hồi nhanh chóng sau thử thách.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Tập trung rèn luyện tính kiên định và học cách dung hòa với quan điểm khác biệt; mở rộng lòng trắc ẩn sẽ giúp năng lực lãnh đạo tự nhiên của bạn đạt đến tầm cao mới.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">The Complete Book of Numerology (Dr. David A. Phillips)</strong> & <strong className="text-gray-200">Thay Đổi Cuộc Sống Với Nhân Số Học (Lê Đỗ Quỳnh Hương)</strong></span>
                    </div>
                  </div>

                  {/* Personal Year Card */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                      <span>📅 Năm Cá Nhân (Personal Year {result.facts.temporal.personalYear}): Chu Kỳ 9 Năm & Chiến Lược Hành Động</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Năm Cá Nhân thể hiện thời vận và nhịp điệu sinh học của bạn trong chu kỳ tiến hóa 9 năm Pythagoras. Năm số {result.facts.temporal.personalYear} là giai đoạn quan trọng để định hình lại các mục tiêu trọng tâm, chuẩn bị cho những bước bứt phá ngoạn mục tiếp theo.
                    </p>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Định Hướng Hành Động Cho Năm Nay:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Chủ động học hỏi thêm kỹ năng mới, củng cố nội lực tài chính và tránh các quyết định đầu tư rủi ro mạo hiểm không có căn cứ.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">The Complete Book of Numerology - Chương Chu Kỳ 9 Năm Cá Nhân</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
