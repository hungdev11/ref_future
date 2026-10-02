'use client';

import React, { useState } from 'react';
import { Moon, AlertTriangle, ShieldCheck, Sparkles, User, Briefcase, DollarSign, Heart, Award } from 'lucide-react';

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

// Perimeter order of branches for classical 4x4 matrix
const MATRIX_GRID_CELLS: Array<{ branch: string; row: number; col: number }> = [
  // Row 0: Top (Tỵ -> Ngọ -> Mùi -> Thân)
  { branch: 'TY_SNAKE', row: 0, col: 0 },
  { branch: 'NGO_HORSE', row: 0, col: 1 },
  { branch: 'MUI_GOAT', row: 0, col: 2 },
  { branch: 'THAN_MONKEY', row: 0, col: 3 },

  // Right col: Row 1 & 2 (Dậu -> Tuất)
  { branch: 'DAU_ROOSTER', row: 1, col: 3 },
  { branch: 'TUAT_DOG', row: 2, col: 3 },

  // Row 3: Bottom (Hợi -> Tý -> Sửu -> Dần)
  { branch: 'HOI_PIG', row: 3, col: 3 },
  { branch: 'TY_RAT', row: 3, col: 2 },
  { branch: 'SUU_OX', row: 3, col: 1 },
  { branch: 'DAN_TIGER', row: 3, col: 0 },

  // Left col: Row 2 & 1 (Mão -> Thìn)
  { branch: 'MAO_CAT', row: 2, col: 0 },
  { branch: 'THIN_DRAGON', row: 1, col: 0 },
];

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

  // Helper to find palace by its branch
  const getPalaceByBranch = (branchKey: string) => {
    if (!result?.facts?.palaces) return null;
    for (const [pKey, pVal] of Object.entries(result.facts.palaces)) {
      if ((pVal as any).branch === branchKey) {
        return { pKey, ...(pVal as any) };
      }
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
          <Moon className="w-4 h-4" />
          <span>Tử Vi Đẩu Số (Bàn Cờ 12 Cung Truyền Thống & Thiên Bàn Trung Tâm)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">An Lá Số Tử Vi Đẩu Số Toàn Diện</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Lập bản đồ 12 cung chức theo chuẩn Nam Phái truyền thống trên kinh tuyến 105°E (GMT+7). Khảo sát Mệnh, Thân, Quan Lộc, Tài Bạch và Phu Thê với diễn giải đời thường dễ hiểu.
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
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Tử Vi bắt buộc phải có giờ sinh để an Mệnh, Thân và 12 cung chức.
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Moon className="w-4 h-4 animate-spin" />
                  Đang Khởi Bàn Tử Vi...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  An Lá Số Tử Vi
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Lá Số 12 Cung Bàn Cờ Truyền Thống */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Moon className="w-14 h-14 text-indigo-400/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-base">Thiên Bàn Đang Chờ Thiết Lập</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto">
                  Nhập ngày giờ sinh và giới tính để an bản đồ 12 cung chức Tử Vi Đẩu Số.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-fadeIn">
              {/* BẢN ĐỒ 12 CUNG TRUYỀN THỐNG CHUẨN THIÊN BÀN 4x4 */}
              <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Bản Đồ 12 Cung Tử Vi (Chuẩn Bàn Cờ Truyền Thống)</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium">
                    Kinh Tuyến 105°E (GMT+7)
                  </span>
                </div>

                {/* 4x4 Desktop Matrix / Mobile Adaptive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {MATRIX_GRID_CELLS.map((cell) => {
                    const palace = getPalaceByBranch(cell.branch);
                    if (!palace) return null;

                    const isMenh = palace.pKey === 'MENH';

                    return (
                      <div
                        key={cell.branch}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between min-h-[170px] transition-all hover:border-indigo-400/60 ${
                          isMenh
                            ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/5'
                            : palace.isThan
                            ? 'bg-indigo-950/30 border-indigo-500/50'
                            : 'bg-background/80 border-borderDark/80'
                        }`}
                      >
                        {/* Top Header of Palace */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between border-b border-borderDark/60 pb-1.5">
                            <div>
                              <span className="font-extrabold text-sm text-white block">
                                {PALACE_VN[palace.pKey] ?? palace.pKey}
                              </span>
                              <span className="text-[11px] text-gray-400 block">
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
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                                  TRIỆT
                                </span>
                              )}
                              {palace.isTuan && (
                                <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                                  TUẦN
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Stars in Palace */}
                          <div className="space-y-1 py-1 min-h-[70px]">
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
                                <span className="text-[10px] text-gray-500">{s.element}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Footer: Đại Hạn */}
                        <div className="pt-1.5 border-t border-borderDark/60 flex items-center justify-between text-[11px] text-gray-400">
                          <span>Đại hạn</span>
                          <span className="font-mono text-white font-medium">
                            {palace.daiHanStartAge} - {palace.daiHanEndAge} tuổi
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* THIÊN BÀN TỔNG HỢP (Tâm Bàn) */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[11px] text-gray-400 block uppercase">Năm Sinh Âm Lịch</span>
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

              {/* LUẬN GIẢI CHI TIẾT CÁC CUNG TRỌNG YẾU (Dành Cho Người Đọc, Không Clutter) */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Các Cung Trọng Yếu Trong Cuộc Sống</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                    Định Hướng Đời Sống Thực Tế
                  </span>
                </div>

                <div className="space-y-5">
                  {/* 1. Cung Mệnh Analysis */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>👑 Cung Mệnh Tọa Thủ ({BRANCH_VN[result.facts.menhBranch]}): Bản Sắc & Cốt Cách Căn Bản</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Cung Mệnh là gốc rễ của đời người, định hình cốt cách, tư chất và tiềm năng phát triển bẩm sinh. Bản mệnh thuộc {result.facts.amDuongNamNu}, ngự tại cung {BRANCH_VN[result.facts.menhBranch]}, kết hợp với {result.metadata.cucDetail} cho thấy đương số là người có thực tài, nội lực thâm hậu và khát vọng vươn lên rõ nét trong môi trường xã hội.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dễ Hiểu):</span>
                      <p className="text-gray-200 leading-relaxed">
                        Bạn có khí chất đĩnh đạc, được người xung quanh tin cậy và kính nể. Điểm mạnh lớn nhất là chữ tín, tinh thần trách nhiệm và khả năng định hình đại cuộc mà không bị dao động bởi tiểu tiết.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Giữ vững tâm đức và tầm nhìn dài hạn; không nên nóng vội gặt hái thành quả tức thời. Tích lũy tri thức chuyên môn sâu và mở rộng vòng kết nối những người cùng chí hướng.
                      </p>
                    </div>
                  </div>

                  {/* 2. Cung Quan Lộc (Sự nghiệp) */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span>💼 Cung Quan Lộc: Sự Nghiệp, Công Danh & Cơ Hội Thăng Tiến</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Cung Quan Lộc phản ánh môi trường làm việc phù hợp, con đường thăng tiến và khả năng đảm nhiệm trọng trách. Đương số có tư duy tổ chức tốt, phù hợp với các cương vị quản lý, chuyên môn kỹ thuật hoặc tự mình gầy dựng cơ nghiệp riêng.
                    </p>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">💡 Định Hướng Nghề Nghiệp:</span>
                      <p className="text-gray-300 leading-relaxed">
                        Thành công đến từ sự kiên trì và tích lũy uy tín qua từng dự án. Nên đặt trọng tâm vào chất lượng công việc thực chất hơn là tìm kiếm các đường tắt mạo hiểm.
                      </p>
                    </div>
                  </div>

                  {/* 3. Cung Tài Bạch (Tiền bạc) */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      <span>💰 Cung Tài Bạch: Dòng Tiền, Khả Năng Tích Lũy & Tài Lộc</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Cung Tài Bạch chi phối phương thức tụ tài và năng lực quản lý tài chính cá nhân. Tài lộc của đương số thiên về sự tích tụ dần dần theo thời gian, càng làm ăn minh bạch, chính trực thì nguồn tài lộc càng hanh thông và vững bền.
                    </p>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Quản Trị Dòng Tiền:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Thiết lập các quỹ dự phòng khẩn cấp, đa dạng hóa danh mục đầu tư an toàn và tuyệt đối tránh tâm lý tham lam lao vào các mô hình làm giàu chớp nhoáng thiếu kiểm chứng.
                      </p>
                    </div>
                  </div>

                  {/* 4. Cung Thân (Hậu vận) */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>🌱 Cung Thân Cư ({BRANCH_VN[result.facts.thanBranch]}): Xu Hướng Hậu Vận Sau Tuổi 30</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      Nếu Cung Mệnh chủ về tiền vận thì Cung Thân chủ về sự nghiệp thực tế và hậu vận khi đương số bước vào giai đoạn trưởng thành tự lập. Vị trí Thân cư thể hiện nơi đương số dốc trọn tâm huyết và thu hoạch trái ngọt trong nửa sau cuộc đời.
                    </p>

                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1">
                      <span className="font-semibold text-rose-300 block">💡 Tóm Tắt Dành Cho Bạn:</span>
                      <p className="text-gray-200 leading-relaxed">
                        Càng về trung vận và hậu vận, sự nghiệp và đời sống gia đình của bạn càng vững vàng nhờ bề dày kinh nghiệm và khả năng làm chủ số phận tự thân.
                      </p>
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
