'use client';

import React, { useState } from 'react';
import { Moon, AlertTriangle, ShieldCheck, Sparkles, User, BookOpen } from 'lucide-react';

const BRANCH_VN: Record<string, string> = {
  TY_RAT: 'Tý',
  SUU_OX: 'Sửu',
  DAN_TIGER: 'Dần',
  MAO_CAT: 'Mão',
  THIN_DRAGON: 'Thìn',
  TY_SNAKE: 'Tỵ',
  NGO_HORSE: 'Ngọ',
  MUI_GOAT: 'Mùi',
  THAN_MONKEY: 'Thân',
  DAU_ROOSTER: 'Dậu',
  TUAT_DOG: 'Tuất',
  HOI_PIG: 'Hợi',
};

const STEM_VN: Record<string, string> = {
  GIAP: 'Giáp',
  AT: 'Ất',
  BINH: 'Bính',
  DINH: 'Đinh',
  MAU: 'Mậu',
  KY: 'Kỷ',
  CANH: 'Canh',
  TAN: 'Tân',
  NHAM: 'Nhâm',
  QUY: 'Quý',
};

const PALACE_VN: Record<string, string> = {
  MENH: 'MỆNH',
  PHU_MAU: 'PHỤ MẪU',
  PHUC_DUC: 'PHÚC ĐỨC',
  DIEN_TRACH: 'ĐIỀN TRẠCH',
  QUAN_LOC: 'QUAN LỘC',
  NO_BOC: 'NÔ BỘC',
  THIEN_DI: 'THIÊN DI',
  TAT_ACH: 'TẬT ÁCH',
  TAI_BACH: 'TÀI BẠCH',
  TU_TUC: 'TỬ TỨC',
  PHU_THE: 'PHU THÊ',
  HUYNH_DE: 'HUYNH ĐỆ',
};

export default function TuViPage() {
  const [solarDate, setSolarDate] = useState('1990-11-29');
  const [birthTime, setBirthTime] = useState('09:30:00');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/tuvi/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solarDate,
          birthTime,
          gender,
        }),
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
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <Moon className="w-4 h-4" />
          <span>Tử Vi Đẩu Số (Nam Phái Truyền Thống - TUVI_METHOD_V1)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">An Lá Số Tử Vi Đẩu Số Tất Định</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Tính toán lịch âm thiên văn chuẩn kinh tuyến 105°E (GMT+7). An 12 cung chức, định Cục, an 14 chính tinh và phụ tinh. Tuyệt đối không tự suy diễn nếu thiếu giờ sinh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Column: Form */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh Dương Lịch</label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Giờ Sinh (Bắt Buộc)</label>
              <input
                type="time"
                step="1"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Tử Vi Đẩu Số bắt buộc phải có giờ sinh để an Mệnh/Thân và Cục.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Giới Tính</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('MALE')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    gender === 'MALE'
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-background border-borderDark text-gray-400'
                  }`}
                >
                  Nam Mệnh
                </button>
                <button
                  type="button"
                  onClick={() => setGender('FEMALE')}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    gender === 'FEMALE'
                      ? 'bg-pink-600/30 border-pink-500 text-white'
                      : 'bg-background border-borderDark text-gray-400'
                  }`}
                >
                  Nữ Mệnh
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-indigo-600/20"
            >
              {loading ? 'Đang Khởi Bàn...' : 'Lập Lá Số Tất Định'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Lá Số 12 Cung */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Moon className="w-12 h-12 text-gray-600 mx-auto" />
              <p className="text-gray-400 text-sm">Vui lòng nhập ngày giờ sinh và giới tính để an bản đồ 12 cung Tử Vi.</p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Four Pillars Banner */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[11px] text-gray-400 block uppercase">Năm Sinh (Âm Lịch)</span>
                  <span className="text-base font-bold text-amber-400">
                    {STEM_VN[result.facts.yearStem]} {BRANCH_VN[result.facts.yearBranch]}
                  </span>
                  <span className="text-[11px] text-gray-500 block">Năm {result.metadata.lunarYear}</span>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block uppercase">Tháng & Ngày Âm</span>
                  <span className="text-base font-bold text-indigo-400">
                    Tháng {result.metadata.lunarMonth}, Ngày {result.metadata.lunarDay}
                  </span>
                  <span className="text-[11px] text-gray-500 block">
                    {STEM_VN[result.facts.monthStem]} {BRANCH_VN[result.facts.monthBranch]}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block uppercase">Bản Mệnh & Cục</span>
                  <span className="text-base font-bold text-emerald-400">{result.metadata.cucDetail}</span>
                  <span className="text-[11px] text-gray-500 block">{result.facts.amDuongNamNu}</span>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 block uppercase">Mệnh / Thân Cư</span>
                  <span className="text-base font-bold text-rose-400">
                    Mệnh {BRANCH_VN[result.facts.menhBranch]} • Thân {BRANCH_VN[result.facts.thanBranch]}
                  </span>
                  <span className="text-[11px] text-gray-500 block">Giờ {BRANCH_VN[result.facts.hourBranch]}</span>
                </div>
              </div>

              {/* 12 Palaces Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(result.facts.palaces).map((pKey) => {
                  const palace = result.facts.palaces[pKey];
                  const isMenh = pKey === 'MENH';

                  return (
                    <div
                      key={pKey}
                      className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                        isMenh
                          ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-500/5'
                          : palace.isThan
                          ? 'bg-indigo-950/20 border-indigo-500/50'
                          : 'bg-surface/80 border-borderDark'
                      }`}
                    >
                      {/* Top Header of Palace */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                          <div>
                            <span className="font-extrabold text-sm text-white">
                              {PALACE_VN[pKey] ?? pKey}
                            </span>
                            <span className="text-xs text-gray-400 block">
                              Cung {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]})
                            </span>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            {isMenh && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                                MỆNH
                              </span>
                            )}
                            {palace.isThan && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white">
                                THÂN
                              </span>
                            )}
                            {palace.isTriet && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                                TRIỆT
                              </span>
                            )}
                            {palace.isTuan && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                                TUẦN
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stars in Palace */}
                        <div className="space-y-1.5 min-h-[90px] py-1">
                          {palace.stars.map((s: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span
                                className={
                                  s.isMain
                                    ? 'font-bold text-amber-300'
                                    : s.code.startsWith('HOA_')
                                    ? 'font-semibold text-rose-400'
                                    : 'text-gray-300'
                                }
                              >
                                {s.name}
                              </span>
                              <span className="text-[10px] text-gray-500">
                                {s.element}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Footer: Đại Hạn */}
                      <div className="pt-2 border-t border-borderDark/60 flex items-center justify-between text-[11px] text-gray-400">
                        <span>Đại hạn</span>
                        <span className="font-mono text-white font-medium">
                          {palace.daiHanStartAge} - {palace.daiHanEndAge} tuổi
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Luận Giải Bản Mệnh Dành Cho Người Không Chuyên */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Bản Mệnh & Thời Vận Căn Bản</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                    Trường phái Nam Phái TUVI_METHOD_V1
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Cung Mệnh Analysis */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <span>👑 Cung Mệnh Tọa Thủ ({BRANCH_VN[result.facts.menhBranch]}): Bản Sắc & Cốt Cách Căn Bản</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Cung Mệnh là gốc rễ của đời người, định hình cốt cách, tư chất và tiềm năng phát triển bẩm sinh. Bản mệnh thuộc {result.facts.amDuongNamNu}, ngự tại cung {BRANCH_VN[result.facts.menhBranch]}, kết hợp với {result.metadata.cucDetail} cho thấy đương số là người có thực tài, nội lực thâm hậu và khát vọng vươn lên rõ nét trong môi trường xã hội.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Tóm Tắt Dành Cho Bạn (Dễ Hiểu):</span>
                      <p className="text-gray-200 leading-relaxed">
                        Bạn có khí chất đĩnh đạc, được người xung quanh tin cậy và kính nể. Điểm mạnh lớn nhất là chữ tín, tinh thần trách nhiệm và khả năng định hình đại cuộc mà không bị dao động bởi tiểu tiết.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">🔍 Cơ Chế Vận Hành (Ngũ Hành Mệnh - Cục):</span>
                      <p className="text-gray-300 leading-relaxed">
                        Theo nguyên lý Tử Vi kinh điển, Cục số tượng trưng cho môi trường xã hội dung dưỡng bản Mệnh. Khi Cục sinh Mệnh hoặc tương hòa, đương số dễ gặp thời cơ thuận lợi, được quý nhân nâng đỡ trong các bước ngoặt sự nghiệp.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Giữ vững tâm đức và tầm nhìn dài hạn; không nên nóng vội gặt hái thành quả tức thời. Tích lũy tri thức chuyên môn sâu và mở rộng vòng kết nối những người cùng chí hướng.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Tử Vi Đẩu Số Toàn Thư (Hi Di Trần Đoàn)</strong> & <strong className="text-gray-200">Tử Vi Giảng Minh (Vân Đằng Thái Thứ Lang)</strong></span>
                    </div>
                  </div>

                  {/* Cung Thân Analysis */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                      <span>🌱 Cung Thân Cư ({BRANCH_VN[result.facts.thanBranch]}): Xu Hướng Hậu Vận & Hành Động Trưởng Thành</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Nếu Cung Mệnh chủ về tiền vận (trước 30 tuổi) thì Cung Thân chủ về hậu vận và sự nghiệp thực tế khi đương số bước vào giai đoạn trưởng thành tự lập. Vị trí Thân cư thể hiện nơi đương số dốc trọn tâm huyết và thời gian nhiều nhất của cuộc đời.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Tóm Tắt Dành Cho Bạn:</span>
                      <p className="text-gray-200 leading-relaxed">
                        Càng về trung vận và hậu vận, sự nghiệp của bạn càng vững vàng nhờ bề dày kinh nghiệm và khả năng làm chủ số phận tự thân.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Tử Vi Áo Bí (Hà Uyên) - Thiên Luận Mệnh Thân Tương Phối</strong></span>
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
