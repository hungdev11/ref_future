'use client';

import React, { useState } from 'react';
import {
  Moon,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  User,
  X,
  HelpCircle,
  Award,
  Briefcase,
  DollarSign,
  Heart,
  Compass,
  Layers,
  ArrowRight,
} from 'lucide-react';

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

const PALACE_INFO: Record<
  string,
  {
    meaning: string;
    beginnerGuide: string;
    coreAdvice: string;
    challenges: string;
  }
> = {
  MENH: {
    meaning: 'Cốt cách, bản tính, tư chất và vận mệnh tổng quan cả đời',
    beginnerGuide:
      'Cung Mệnh là cung quan trọng nhất trong lá số Tử Vi, ví như gốc rễ của một cái cây. Nó quyết định diện mạo, tính khí bẩm sinh, tài năng và khả năng vượt qua nghịch cảnh của bạn.',
    coreAdvice:
      'Bạn sở hữu nội lực thâm hậu, chữ tín cao và khả năng dẫn dắt tốt. Hãy kiên định với mục tiêu dài hạn và luôn trau dồi tri thức.',
    challenges: 'Đôi khi quá nguyên tắc hoặc tự tạo áp lực lớn cho bản thân.',
  },
  PHU_MAU: {
    meaning: 'Tình cảm với cha mẹ, phúc ấm gia đình và sự nâng đỡ của bậc tiền bối',
    beginnerGuide:
      'Cung Phụ Mẫu phản ánh sự gắn kết giữa bạn và đấng sinh thành, mức độ thừa hưởng phúc đức, giáo dục gia đình và sự trợ giúp của cấp trên.',
    coreAdvice:
      'Hiếu kính với cha mẹ và luôn lắng nghe lời chỉ dạy từ những người đi trước giàu kinh nghiệm để tránh vấp ngã.',
    challenges: 'Khoảng cách thế hệ đôi lúc gây bất đồng quan điểm, cần kiên nhẫn đối thoại.',
  },
  PHUC_DUC: {
    meaning: 'Phúc phận tổ tiên, đời sống tinh thần và sự an lạc tâm hồn',
    beginnerGuide:
      'Cung Phúc Đức là linh hồn của lá số, quyết định bạn có được an vui, may mắn lúc hoạn nạn hay không. Phúc Đức tốt có thể hóa giải nhiều tai ương.',
    coreAdvice:
      'Tích đức hành thiện, giữ tâm hồn thanh thản, chăm sóc gia tiên và nuôi dưỡng đời sống nội tâm phong phú.',
    challenges: 'Dễ suy nghĩ nhiều hoặc lo âu viển vông khi gặp nghịch cảnh.',
  },
  DIEN_TRACH: {
    meaning: 'Nhà cửa, đất đai, bất động sản và môi trường an cư',
    beginnerGuide:
      'Cung Điền Trạch cho biết khả năng tự mua nhà, tích lũy đất đai, nơi ăn chốn ở và phong thủy không gian sống của bạn.',
    coreAdvice:
      'Tích lũy tài sản an toàn, hướng đến việc sở hữu bất động sản dài hạn thay vì lướt sóng mạo hiểm.',
    challenges: 'Tránh tranh chấp giấy tờ pháp lý liên quan đến đất đai và tài sản gia đình.',
  },
  QUAN_LOC: {
    meaning: 'Công danh, sự nghiệp, học vấn và vị thế công việc',
    beginnerGuide:
      'Cung Quan Lộc xem đường học tập, thi cử, việc làm, cơ hội thăng tiến và phong cách làm việc chuyên môn của bạn.',
    coreAdvice:
      'Phát huy thế mạnh chuyên môn, kiên trì theo đuổi 1-2 lĩnh vực mũi nhọn để đạt vị trí vững chắc trong xã hội.',
    challenges: 'Tránh nôn nóng muốn thành công nhanh hoặc đứng núi này trông núi nọ.',
  },
  NO_BOC: {
    meaning: 'Bạn bè, đồng nghiệp, cấp dưới và các mối quan hệ xã giao',
    beginnerGuide:
      'Cung Nô Bộc (còn gọi là Cung Giao Hữu) phản ánh bạn bè xung quanh, thuộc cấp dưới quyền và những người bạn tiếp xúc thường nhật.',
    coreAdvice:
      'Chọn bạn mà chơi, đối đãi với cấp dưới và đồng nghiệp bằng sự công tâm, chân thành và tôn trọng.',
    challenges: 'Cẩn trọng với những lời tâng bốc và tránh cho vay mượn tiền bạc không minh bạch.',
  },
  THIEN_DI: {
    meaning: 'Giao tiếp xã hội bên ngoài, đi lại, xuất ngoại và cơ hội phương xa',
    beginnerGuide:
      'Cung Thiên Di đối chiếu trực tiếp với Cung Mệnh, phản ánh bạn khi bước chân ra xã hội: có được quý nhân giúp đỡ, có hợp xuất ngoại hay lập nghiệp phương xa.',
    coreAdvice:
      'Mạnh dạn bước ra thế giới, thích nghi linh hoạt với môi trường mới và mở rộng quan hệ đối ngoại.',
    challenges: 'Chú ý an toàn khi đi xa và cẩn thận trong việc ký kết các thỏa thuận bên ngoài.',
  },
  TAT_ACH: {
    meaning: 'Sức khỏe, thể trạng thể chất và các bệnh lý cần phòng ngừa',
    beginnerGuide:
      'Cung Tật Ách cho biết những cơ quan nội tạng dễ yếu ớt trong cơ thể và các rủi ro sức khỏe bạn cần chủ động phòng tránh.',
    coreAdvice:
      'Duy trì lối sống điều độ, khám sức khỏe định kỳ và rèn luyện thể dục thể thao mỗi ngày.',
    challenges: 'Tránh làm việc kiệt sức hoặc bỏ qua những dấu hiệu cảnh báo sớm của cơ thể.',
  },
  TAI_BACH: {
    meaning: 'Tiền tài, dòng tiền, cách kiếm tiền và khả năng tích lũy của cải',
    beginnerGuide:
      'Cung Tài Bạch xem nguồn tài lộc đến từ đâu, cách bạn chi tiêu và khả năng giữ tiền. Tiền bạc ở đây là tiền thực tế bạn làm ra.',
    coreAdvice:
      'Chi tiêu có kế hoạch, đa dạng hóa các nguồn thu nhập chính đáng và đầu tư dài hạn an toàn.',
    challenges: 'Tránh tâm lý ham giàu nhanh vào các canh bạc đầu cơ rủi ro cao.',
  },
  TU_TUC: {
    meaning: 'Con cái, đường sinh nở và sự thành đạt của thế hệ sau',
    beginnerGuide:
      'Cung Tử Tức phản ánh đường con cái, mức độ hiếu thảo, tính cách con trẻ và niềm vui bạn nhận được từ thế hệ tương lai.',
    coreAdvice:
      'Lắng nghe và làm bạn cùng con, đầu tư vào giáo dục nhân cách thay vì chỉ nuông chiều vật chất.',
    challenges: 'Không nên áp đặt kỳ vọng của cha mẹ lên ước mơ của con cái.',
  },
  PHU_THE: {
    meaning: 'Hôn nhân, tình cảm vợ chồng và phẩm hạnh người bạn đời',
    beginnerGuide:
      'Cung Phu Thê xem duyên nợ lứa đôi, tính cách và hoàn cảnh của người bạn đời, mức độ hòa thuận trong đời sống gia đình.',
    coreAdvice:
      'Tôn trọng sự khác biệt, bao dung với khuyết điểm của đối phương và duy trì sự đối thoại chân thành mỗi ngày.',
    challenges: 'Cái tôi quá lớn dễ dẫn đến tranh cãi vặt, cần người này nóng thì người kia nên nhịn.',
  },
  HUYNH_DE: {
    meaning: 'Anh chị em ruột thịt và tình cảm ruột thịt trong gia đình',
    beginnerGuide:
      'Cung Huynh Đệ phản ánh mối quan hệ giữa bạn và anh chị em ruột, mức độ nương tựa hỗ trợ lẫn nhau trong lúc khó khăn.',
    coreAdvice:
      'Gìn giữ tình cảm anh em hòa thuận, hỗ trợ lẫn nhau với tinh thần "lá lành đùm lá rách".',
    challenges: 'Phân định rạch ròi giữa tình cảm gia đình và lợi ích tiền bạc để tránh bất hòa.',
  },
};

import {
  NAP_AM_TABLE,
  CHU_MENH_MAP,
  CHU_THAN_MAP,
  THAN_CU_DETAILS,
  calculateCanLuong,
  evaluateMenhCucRelation,
  calculatePalaceScore,
  STAR_DETAILED_READINGS,
} from '@/lib/tuvi-interpretations';

export default function TuViPage() {
  const [solarDate, setSolarDate] = useState('1990-11-29');
  const [birthTime, setBirthTime] = useState('09:30:00');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'matrix' (4x4 chart) or 'fullReport' (comprehensive VIP-unlocked report)
  const [viewMode, setViewMode] = useState<'matrix' | 'fullReport'>('matrix');

  // Modal State for clicked palace & Thien Ban
  const [selectedPalaceKey, setSelectedPalaceKey] = useState<string | null>(null);
  const [showThienBanModal, setShowThienBanModal] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedPalaceKey(null);

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
          <span>Tử Vi Đẩu Số Truyền Thống</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Lập & Giải Mã Lá Số Tử Vi Trọn Đời</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          An bản đồ 12 cung chức, định Cục, an 14 chính tinh và các sao chiếu mệnh của bạn. 
          <strong> Nhấn vào bất kỳ Cung chức nào để mở cửa sổ luận giải chi tiết, rõ ràng và dễ hiểu nhất.</strong>
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
                Tử Vi Đẩu Số cần có giờ sinh để an Mệnh/Thân và Cục chính xác.
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
              {loading ? 'Đang Khởi Bàn...' : 'An Lá Số Tử Vi Của Tôi'}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick instructions for beginners */}
          <div className="p-4 rounded-xl bg-background/60 border border-borderDark text-xs text-gray-400 space-y-2">
            <div className="font-semibold text-gray-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              Hướng Dẫn Đọc Lá Số
            </div>
            <p className="leading-relaxed text-[11px]">
              Lá số được chia thành 12 cung chức đại diện cho các mặt của đời sống (Mệnh, Tiền tài, Công danh, Vợ chồng...). 
              <strong> Bạn chỉ cần nhấp chuột vào ô bất kỳ</strong> để xem giải thích tường tận từng cung và lời khuyên ứng xử.
            </p>
          </div>
        </div>

        {/* Right Column: Lá Số 12 Cung */}
        <div className="lg:col-span-3 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Moon className="w-14 h-14 text-gray-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-300">Bản Đồ Tử Vi Đang Chờ Khởi Tạo</h3>
                <p className="text-gray-400 text-xs max-w-md mx-auto">
                  Vui lòng nhập ngày, giờ sinh và giới tính ở bảng bên trái để an bản đồ 12 cung Tử Vi và xem luận giải chi tiết.
                </p>
              </div>
            </div>
          )}

          {result && (() => {
            const yearStemKey = result.facts.yearStem;
            const yearBranchKey = result.facts.yearBranch;
            const napAmKey = `${yearStemKey}_${yearBranchKey}`;
            const napAm = NAP_AM_TABLE[napAmKey] || {
              menh: 'Lộ Bàng Thổ',
              element: 'THO' as const,
              elementVn: 'Thổ (Đất ven đường)',
              description: 'Chân thành, cần cù, kiên nhẫn, lập nghiệp tự thân.',
            };

            const chuMenh = CHU_MENH_MAP[yearBranchKey] || 'Tham Lang';
            const chuThan = CHU_THAN_MAP[yearBranchKey] || 'Hỏa Tinh';
            const thanCu = THAN_CU_DETAILS[result.facts.hourBranch] || THAN_CU_DETAILS['TY_RAT'];

            const canLuong = calculateCanLuong(
              yearStemKey,
              yearBranchKey,
              result.metadata.lunarMonth,
              result.metadata.lunarDay,
              result.facts.hourBranch
            );

            const menhCuc = evaluateMenhCucRelation(napAm.element, result.metadata.cucDetail);

            const laiNhanEntry = Object.entries(result.facts.palaces).find(
              ([_, p]: [string, any]) => p.stem === yearStemKey
            );
            const laiNhanKey = laiNhanEntry ? laiNhanEntry[0] : 'MENH';
            const laiNhanName = PALACE_VN[laiNhanKey] || laiNhanKey;

            return (
              <div className="space-y-6">
                {/* View Mode Switcher */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl bg-surface border border-indigo-500/30">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setViewMode('matrix')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        viewMode === 'matrix'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Bản Đồ 12 Cung & Thiên Bàn</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('fullReport')}
                      className={`flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        viewMode === 'fullReport'
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-background shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span>Báo Cáo Toàn Diện (Miễn Phí 100%)</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    ✨ Toàn bộ luận giải mở khóa miễn phí
                  </span>
                </div>

                {/* Four Pillars Banner: Clickable to view Thien Ban detail */}
                <div
                  onClick={() => setShowThienBanModal(true)}
                  className="p-5 rounded-2xl bg-surface border border-indigo-500/40 hover:border-accentGold/80 transition-all cursor-pointer shadow-lg hover:shadow-indigo-500/10 grid grid-cols-2 sm:grid-cols-4 gap-4 group"
                >
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase">Năm Sinh (Âm Lịch)</span>
                    <span className="text-base font-bold text-amber-400 group-hover:text-accentGold transition-colors">
                      {STEM_VN[result.facts.yearStem]} {BRANCH_VN[result.facts.yearBranch]}
                    </span>
                    <span className="text-[11px] text-gray-500 block">Năm {result.metadata.lunarYear}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase">Bản Mệnh Nạp Âm</span>
                    <span className="text-base font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                      {napAm.menh}
                    </span>
                    <span className="text-[11px] text-gray-500 block">{result.facts.amDuongNamNu}</span>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase">Cục Mệnh</span>
                    <span className="text-base font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                      {result.metadata.cucDetail}
                    </span>
                    <span className="text-[10px] text-emerald-400 block font-medium truncate">
                      {menhCuc.title.split('—')[0]}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase">Mệnh & Thân Cư</span>
                      <span className="text-base font-bold text-rose-400 group-hover:text-rose-300 transition-colors">
                        Mệnh {BRANCH_VN[result.facts.menhBranch]} • {thanCu.cung}
                      </span>
                      <span className="text-[11px] text-gray-500 block">Giờ {BRANCH_VN[result.facts.hourBranch]} ({canLuong.totalText})</span>
                    </div>
                    <span className="text-[10px] text-accentGold font-medium flex items-center gap-1 mt-1">
                      🔍 Xem chi tiết Thiên Bàn →
                    </span>
                  </div>
                </div>

                {/* VIEW 1: MATRIX VIEW (4x4 PALACES GRID) */}
                {viewMode === 'matrix' && (
                  <div className="space-y-6">
                    {/* Guidance Ribbon */}
                    <div className="p-3.5 rounded-xl bg-surface border border-borderDark flex items-center justify-between text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accentGold" />
                        <span>
                          Bản đồ 12 Cung Chức: <strong>Nhấp vào bất kỳ ô nào bên dưới</strong> để xem điểm số và luận giải chi tiết từng sao.
                        </span>
                      </div>
                      <span className="text-emerald-400 font-mono text-[11px] hidden sm:inline-block">
                        12 Cung Khởi Toàn Diện
                      </span>
                    </div>

                    {/* 12 Palaces Grid (Interactive Clickable) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Object.keys(result.facts.palaces).map((pKey) => {
                        const palace = result.facts.palaces[pKey];
                        const isMenh = pKey === 'MENH';
                        const scoreData = calculatePalaceScore(pKey, palace);

                        return (
                          <div
                            key={pKey}
                            onClick={() => setSelectedPalaceKey(pKey)}
                            className={`p-4 rounded-xl border flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.02] shadow-md group ${
                              isMenh
                                ? 'bg-amber-950/25 border-amber-500/70 shadow-amber-500/10 hover:border-amber-400'
                                : palace.isThan
                                ? 'bg-indigo-950/25 border-indigo-500/60 hover:border-indigo-400'
                                : 'bg-surface/90 border-borderDark hover:border-accentGold/60'
                            }`}
                          >
                            {/* Top Header of Palace */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-extrabold text-sm text-white group-hover:text-accentGold transition-colors">
                                      {PALACE_VN[pKey] ?? pKey}
                                    </span>
                                    <span className={`text-[10px] font-bold ${scoreData.rankColor}`}>
                                      {scoreData.score}đ
                                    </span>
                                  </div>
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
                                    <span className="text-[10px] text-gray-500">{s.element}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Bottom Footer: Đại Hạn & Score */}
                            <div className="pt-2 border-t border-borderDark/60 flex items-center justify-between text-[11px] text-gray-400">
                              <span>
                                Đ.Hạn: <strong className="text-white font-mono">{palace.daiHanStartAge}-{palace.daiHanEndAge}t</strong>
                              </span>
                              <span className="text-[10px] text-accentGold font-medium group-hover:underline">
                                Xem luận giải →
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Jump Bar for Core Life Areas */}
                    <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        🌟 Các Cung Trọng Yếu Bạn Nên Xem Trước:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { key: 'MENH', label: '👑 Cung Mệnh (Bản Thân & Cốt Cách)' },
                          { key: 'QUAN_LOC', label: '💼 Cung Quan Lộc (Công Danh & Sự Nghiệp)' },
                          { key: 'TAI_BACH', label: '💰 Cung Tài Bạch (Tiền Tài & Tài Lộc)' },
                          { key: 'PHU_THE', label: '❤️ Cung Phu Thê (Tình Duyên & Hôn Nhân)' },
                          { key: 'PHUC_DUC', label: '🕊️ Cung Phúc Đức (Tâm Hồn & May Mắn)' },
                          { key: 'DIEN_TRACH', label: '🏡 Cung Điền Trạch (Nhà Cửa & Đất Đai)' },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setSelectedPalaceKey(item.key)}
                            className="px-3.5 py-2 rounded-xl bg-background border border-borderDark hover:border-accentGold text-xs font-semibold text-gray-200 hover:text-white transition-colors"
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 2: FULL COMPREHENSIVE REPORT (100% UNLOCKED - FREE VIP) */}
                {viewMode === 'fullReport' && (
                  <div className="p-6 md:p-8 rounded-3xl bg-surface border border-amber-500/40 space-y-8 shadow-2xl">
                    {/* Report Header */}
                    <div className="text-center space-y-2 border-b border-borderDark pb-6">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-accentGold border border-accentGold/40 text-xs font-extrabold uppercase tracking-widest inline-block">
                        BÁO CÁO TỬ VI CHUYÊN SÂU TOÀN DIỆN (MIỄN PHÍ 100%)
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                        LÁ SỐ TỬ VI ĐẨU SỐ CỦA BẠN
                      </h2>
                      <p className="text-xs text-gray-400 max-w-xl mx-auto">
                        Toàn bộ 14 mục luận giải được mở khóa công khai vĩnh viễn, mô phỏng chuẩn xác các trường phái Nam Phái chính thống.
                      </p>
                    </div>

                    {/* MỤC 1: LUẬN GIẢI TỔNG QUAN THIÊN BÀN */}
                    <div className="p-6 rounded-2xl bg-background/80 border border-borderDark space-y-4">
                      <div className="flex items-center gap-2 text-accentGold font-bold text-base border-b border-borderDark/60 pb-2">
                        <Award className="w-5 h-5 text-accentGold" />
                        <span>1. LUẬN GIẢI TỔNG QUAN THIÊN BÀN CỦA BẠN</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Phần này luận giải cấu trúc thiên bàn, bản mệnh ngũ hành, tương quan cục số, chủ mệnh, chủ thân và phép cân xương tính số đời người.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Bản Mệnh Của Bạn:</span>
                          <span className="text-base font-bold text-emerald-400">{napAm.menh} ({napAm.elementVn})</span>
                          <p className="text-gray-300 leading-relaxed">{napAm.description}</p>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Cục Mệnh & Tương Quan:</span>
                          <span className="text-base font-bold text-indigo-400">{result.metadata.cucDetail} ({menhCuc.relationVn})</span>
                          <p className="text-gray-300 leading-relaxed">{menhCuc.description}</p>
                          <span className="text-[11px] text-accentGold block pt-1">🎯 Lời khuyên: {menhCuc.advice}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Sao Chủ Mệnh & Sao Chủ Thân:</span>
                          <div className="text-sm font-bold text-white">
                            Chủ Mệnh: <span className="text-amber-400">{chuMenh}</span> • Chủ Thân: <span className="text-rose-400">{chuThan}</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">
                            Sao Chủ Mệnh cai quản tư chất tiên thiên; sao Chủ Thân chi phối phúc lộc và năng lực thích ứng hậu vận.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Thân Cư:</span>
                          <span className="text-base font-bold text-rose-400">{thanCu.cung} — {thanCu.title}</span>
                          <p className="text-gray-300 leading-relaxed">{thanCu.layman}</p>
                          <span className="text-[11px] text-accentGold block pt-1">🎯 Lời khuyên: {thanCu.advice}</span>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Lai Nhân Cung:</span>
                          <span className="text-base font-bold text-amber-300">Cung {laiNhanName} (Mang Can {STEM_VN[yearStemKey]})</span>
                          <p className="text-gray-300 leading-relaxed">
                            Lai Nhân Cung là nơi khởi phát nhân duyên và nghiệp quả lớn nhất đời người, biểu thị lĩnh vực bạn dồn nhiều tâm huyết và gắn bó mật thiết nhất.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark/80 space-y-1">
                          <span className="text-gray-400 block font-semibold">🔹 Cân Lượng Chỉ Tử Vi (Viên Thiên Cương):</span>
                          <span className="text-base font-bold text-accentGold">{canLuong.totalText}</span>
                          <blockquote className="italic text-amber-200/90 border-l-2 border-accentGold pl-2 my-1">
                            "{canLuong.poem}"
                          </blockquote>
                          <p className="text-gray-300 leading-relaxed">{canLuong.meaning}</p>
                        </div>
                      </div>
                    </div>

                    {/* MỤC 2 ĐẾN 13: LUẬN GIẢI CHI TIẾT 12 CUNG CHỨC */}
                    {[
                      { index: 2, key: 'MENH', title: 'Luận về cung Mệnh', domain: 'Cốt cách, dung mạo, tài năng & thăng trầm cuộc đời' },
                      { index: 3, key: 'QUAN_LOC', title: 'Luận về Công danh, sự nghiệp', domain: 'Đường học tập, thi cử, cơ hội thăng tiến & ngành nghề' },
                      { index: 4, key: 'TAI_BACH', title: 'Luận về Tiền tài', domain: 'Dòng tiền, năng lực kiếm tiền, quản trị tài sản & phương vị cầu tài' },
                      { index: 5, key: 'PHU_THE', title: 'Luận về Tình duyên, hôn nhân', domain: 'Hôn nhân, bạn đời, thời điểm kết hôn & sự hòa hợp lứa đôi' },
                      { index: 6, key: 'PHU_MAU', title: 'Luận về Cha mẹ', domain: 'Tình cảm gia đình, phúc ấm cha mẹ & sự nâng đỡ của bề trên' },
                      { index: 7, key: 'HUYNH_DE', title: 'Luận về Anh/Chị/Em', domain: 'Tình cảm ruột thịt, sự hòa thuận & tương trợ lúc khó khăn' },
                      { index: 8, key: 'TU_TUC', title: 'Luận về Con cái', domain: 'Đường sinh nở, tính tình con cái, mức độ thành đạt của hậu duệ' },
                      { index: 9, key: 'TAT_ACH', title: 'Luận về Sức khỏe', domain: 'Căn nguyên bệnh tật, cơ quan yếu nhược & phương pháp tích phúc cải mệnh' },
                      { index: 10, key: 'DIEN_TRACH', title: 'Luận về Nhà cửa, đất đai', domain: 'Nhà ở, bất động sản, gia sản tổ nghiệp & khả năng an cư lập nghiệp' },
                      { index: 11, key: 'NO_BOC', title: 'Luận về Bạn bè, đồng nghiệp', domain: 'Quan hệ xã giao, quý nhân hay tiểu nhân, đối tác cộng sự' },
                      { index: 12, key: 'PHUC_DUC', title: 'Luận về Dòng họ, tổ tiên', domain: 'Phúc đức tổ tiên, mồ mả gia tiên & đời sống an lạc tâm hồn' },
                      { index: 13, key: 'THIEN_DI', title: 'Luận về Di chuyển, xuất ngoại', domain: 'Đi lại, xuất ngoại, cơ hội phát triển xa quê & quan hệ đối ngoại' },
                    ].map((item) => {
                      const palace = result.facts.palaces[item.key];
                      if (!palace) return null;
                      const scoreData = calculatePalaceScore(item.key, palace);
                      const palaceInfo = PALACE_INFO[item.key];
                      const mainStars = palace.stars.filter((s: any) => s.isMain);
                      const subStars = palace.stars.filter((s: any) => !s.isMain);

                      return (
                        <div key={item.key} className="p-6 rounded-2xl bg-background/80 border border-borderDark space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-borderDark/60 pb-3">
                            <div>
                              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="text-accentGold">{item.index}.</span>
                                <span>{item.title} ({PALACE_VN[item.key]})</span>
                              </h3>
                              <span className="text-xs text-gray-400">
                                Cung {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]}) • Đại hạn: {palace.daiHanStartAge}-{palace.daiHanEndAge} tuổi
                              </span>
                            </div>

                            {/* Score badge */}
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className="text-2xl font-black text-accentGold">{scoreData.score}</span>
                                <span className="text-[10px] text-gray-400 block">/100 điểm</span>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${scoreData.rankColor} bg-surface border-borderDark`}>
                                {scoreData.rank}
                              </span>
                            </div>
                          </div>

                          {/* Palace Intro */}
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {palaceInfo?.beginnerGuide ?? 'Cung vị phản ánh những biến chuyển quan trọng trong đời sống của bạn.'}
                          </p>

                          {/* Score assessment summary */}
                          <div className="p-3.5 rounded-xl bg-surface/80 border border-borderDark/80 text-xs flex items-center gap-2 text-gray-200">
                            <span className="font-bold text-accentGold">Đánh giá chung:</span>
                            <span>{scoreData.summary}</span>
                          </div>

                          {/* Main Stars Breakdown */}
                          <div className="space-y-3 pt-2">
                            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                              ★ Các Sao Chính Tinh Tọa Thủ:
                            </span>

                            {mainStars.length === 0 ? (
                              <div className="p-4 rounded-xl bg-surface border border-dashed border-borderDark text-xs text-gray-400 space-y-1">
                                <strong className="text-white block">Cung Vô Chính Diệu (Không có sao chính tinh tọa thủ)</strong>
                                <p className="leading-relaxed">
                                  Trong Tử Vi, cung Vô Chính Diệu mượn năng lượng từ cung xung chiếu để luận giải. Tính cách linh hoạt, dễ thích nghi với thời cuộc nhưng cần giữ vững lập trường để không bị hoàn cảnh bên ngoài chi phối.
                                </p>
                              </div>
                            ) : (
                              mainStars.map((ms: any, msIdx: number) => {
                                const starDetail = STAR_DETAILED_READINGS[ms.code.toUpperCase()] || {
                                  title: `Sao ${ms.name}`,
                                  nature: `${ms.element} Tinh`,
                                  layman: `Sao ${ms.name} mang lại nguồn năng lượng đặc thù cho cung vị này.`,
                                  strengths: 'Thời vận thuận lợi, tư chất thông minh.',
                                  cautions: 'Cần tránh nóng vội, làm việc có kế hoạch.',
                                };

                                return (
                                  <div key={msIdx} className="p-4 rounded-xl bg-surface border border-amber-500/20 space-y-2 text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-amber-400 text-sm">{starDetail.title}</span>
                                      <span className="text-[10px] text-gray-400">{starDetail.nature}</span>
                                    </div>
                                    <p className="text-gray-200 leading-relaxed">{starDetail.layman}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                                      <div className="text-emerald-300">
                                        <strong>✨ Điểm mạnh:</strong> {starDetail.strengths}
                                      </div>
                                      <div className="text-amber-200">
                                        <strong>⚠️ Lưu ý:</strong> {starDetail.cautions}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* Sub Stars Breakdown */}
                          {subStars.length > 0 && (
                            <div className="space-y-2 pt-2">
                              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                                ✦ Các Sao Phụ Tinh & Cát Hung Tinh:
                              </span>
                              <div className="flex flex-wrap gap-2 text-xs">
                                {subStars.map((ss: any, ssIdx: number) => (
                                  <span
                                    key={ssIdx}
                                    className={`px-2.5 py-1 rounded-lg border text-[11px] ${
                                      ss.code.startsWith('HOA_') || ['LOC_TON', 'THIEN_KHOI', 'THIEN_VIET'].includes(ss.code)
                                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 font-semibold'
                                        : ['DIA_KHONG', 'DIA_KIEP', 'KINH_DUONG', 'DA_LA', 'HOA_TINH', 'LINH_TINH'].includes(ss.code)
                                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                                        : 'bg-surface border-borderDark text-gray-300'
                                    }`}
                                  >
                                    {ss.name} ({ss.element})
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tuần / Triệt Notice */}
                          {(palace.isTuan || palace.isTriet) && (
                            <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200 text-xs space-y-1">
                              <strong>Lưu ý Tuần / Triệt:</strong>
                              <p className="text-[11px] leading-relaxed">
                                {palace.isTriet && '• Cung gặp Triệt Không: Ảnh hưởng mạnh từ thuở nhỏ đến trước 30 tuổi, tôi luyện bản lĩnh vượt khó khăn lúc tiền vận.'}
                                {palace.isTuan && ' • Cung gặp Tuần Không: Giữ trạng thái ổn định lâu dài, giảm nhẹ cả hung tinh lẫn cát tinh.'}
                              </p>
                            </div>
                          )}

                          {/* Practical Advice & Tích phúc cải mệnh */}
                          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1.5 text-xs">
                            <span className="font-bold text-emerald-300 block">🎯 Lời Khuyên Hành Động & Tích Phúc Cải Mệnh:</span>
                            <p className="text-emerald-100 leading-relaxed">
                              {palaceInfo?.coreAdvice ?? 'Hành động cẩn trọng và kiên định với mục tiêu lương thiện.'}
                            </p>
                            <span className="text-[11px] text-amber-200 block pt-1">
                              <strong>⚠️ Điểm cần phòng ngừa:</strong> {palaceInfo?.challenges ?? 'Tránh nôn nóng hoặc tự tạo áp lực quá lớn.'}
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* MỤC 14: LUẬN VẬN HẠN NĂM 2026 VÀ THÁNG HIỆN TẠI */}
                    <div className="p-6 rounded-2xl bg-background/80 border border-borderDark space-y-4">
                      <div className="flex items-center gap-2 text-accentGold font-bold text-base border-b border-borderDark/60 pb-2">
                        <Moon className="w-5 h-5 text-accentGold" />
                        <span>14. LUẬN VẬN HẠN NĂM 2026 (BÍNH NGỌ) VÀ THÁNG HIỆN TẠI</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        Năm 2026 Bính Ngọ mang nạp âm Thiên Hà Thủy. Trong lá số của bạn, vận hạn năm nay mang lại những cơ hội bứt phá nhưng đòi hỏi sự cẩn trọng trong các quyết định tài chính và quan hệ đối ngoại.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                        <div className="p-4 rounded-xl bg-surface border border-borderDark space-y-2">
                          <span className="font-bold text-emerald-300 block">✨ Những Việc Nên Làm Trong Năm 2026:</span>
                          <ul className="list-disc list-inside space-y-1 text-gray-300 leading-relaxed">
                            <li>Tập trung củng cố kiến thức chuyên môn cốt lõi và mở rộng liên minh làm việc.</li>
                            <li>Duy trì lối sống lành mạnh, rèn luyện thể thao và tích đức thiện tâm.</li>
                            <li>Tận dụng các cơ hội công tác hoặc giao tế bên ngoài để nâng cao uy tín.</li>
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-surface border border-borderDark space-y-2">
                          <span className="font-bold text-rose-300 block">⚠️ Những Việc Cần Tránh Trong Năm 2026:</span>
                          <ul className="list-disc list-inside space-y-1 text-gray-300 leading-relaxed">
                            <li>Tránh tham gia các canh bạc đầu tư rủi ro thiếu kiểm chứng thông tin.</li>
                            <li>Kiềm chế tính nóng giận, cẩn thận lời ăn tiếng nói trong các buổi tranh luận.</li>
                            <li>Không nên cho vay mượn tiền bạc không có cam kết rõ ràng.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* POPUP / MODAL: COMPREHENSIVE PALACE INTERPRETATION */}
      {selectedPalaceKey && result?.facts?.palaces?.[selectedPalaceKey] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-indigo-500/50 shadow-2xl p-6 md:p-8 space-y-6">
            {(() => {
              const palace = result.facts.palaces[selectedPalaceKey];
              const info = PALACE_INFO[selectedPalaceKey] ?? {
                meaning: 'Vận trình tương ứng của đời sống',
                beginnerGuide: 'Cung này phản ánh những khía cạnh quan trọng chi phối dòng chảy số mệnh của bạn.',
                coreAdvice: 'Hành động cẩn trọng và giữ vững sự chính trực.',
                challenges: 'Cần duy trì tinh thần tỉnh táo trước những biến động bên ngoài.',
              };
              const isMenh = selectedPalaceKey === 'MENH';

              return (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-borderDark pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-background border border-borderDark text-accentGold font-bold">
                            Cung {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]})
                          </span>
                          {isMenh && (
                            <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-500 text-background">
                              MỆNH CHỦ
                            </span>
                          )}
                          {palace.isThan && (
                            <span className="text-xs px-2 py-0.5 rounded font-bold bg-indigo-500 text-white">
                              THÂN CƯ
                            </span>
                          )}
                          {palace.isTriet && (
                            <span className="text-xs px-2 py-0.5 rounded font-bold bg-rose-950 text-rose-300 border border-rose-500/40">
                              TRIỆT
                            </span>
                          )}
                          {palace.isTuan && (
                            <span className="text-xs px-2 py-0.5 rounded font-bold bg-purple-950 text-purple-300 border border-purple-500/40">
                              TUẦN
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                          Cung {PALACE_VN[selectedPalaceKey]} — {info.meaning}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPalaceKey(null)}
                      className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
                      title="Đóng popup"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="space-y-6">
                    {/* 1. Beginner Explanation Guide */}
                    <div className="p-5 rounded-2xl bg-background/80 border border-borderDark space-y-3 text-xs">
                      <div className="font-bold text-accentGold text-sm flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" />
                        <span>Ý Nghĩa Cung {PALACE_VN[selectedPalaceKey]} Dành Cho Người Không Chuyên:</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed text-sm">
                        {info.beginnerGuide}
                      </p>

                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-borderDark/50 text-[11px] text-gray-300">
                        <div>
                          🔹 <strong>Đại Hạn Tuổi:</strong> Từ {palace.daiHanStartAge} đến {palace.daiHanEndAge} tuổi (khoảng thời gian 10 năm chuyển biến mạnh mẽ).
                        </div>
                        <div>
                          🔹 <strong>Địa Chi Tọa Cung:</strong> Cung {BRANCH_VN[palace.branch]} ({palace.element ?? 'Ngũ Hành tương hợp'}).
                        </div>
                      </div>
                    </div>

                    {/* 2. Stars in this palace */}
                    <div className="p-5 rounded-2xl bg-surface border border-indigo-500/30 space-y-3">
                      <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                        <span className="font-bold text-white text-sm">Các Tinh Tú Tọa Thủ Trong Cung Này:</span>
                        <span className="text-xs text-indigo-300">{palace.stars.length} ngôi sao hội tụ</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {palace.stars.map((s: any, sidx: number) => (
                          <div
                            key={sidx}
                            className={`p-3 rounded-xl border flex items-center justify-between ${
                              s.isMain
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200 font-bold'
                                : s.code.startsWith('HOA_')
                                ? 'bg-rose-500/10 border-rose-500/30 text-rose-200 font-semibold'
                                : 'bg-background/60 border-borderDark text-gray-300'
                            }`}
                          >
                            <span>
                              {s.name} {s.isMain && '★ (Chính Tinh)'}
                            </span>
                            <span className="text-[10px] opacity-75">{s.element}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Layman Actionable Advice */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                        <span className="font-bold text-emerald-300 text-sm block">
                          🎯 Lời Khuyên Hành Động Thực Tế:
                        </span>
                        <p className="text-emerald-100 leading-relaxed">
                          {info.coreAdvice}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                        <span className="font-bold text-amber-300 text-sm block">
                          ⚠️ Nguy Cơ & Thách Thức Cần Đề Phòng:
                        </span>
                        <p className="text-amber-100 leading-relaxed">
                          {info.challenges}
                        </p>
                      </div>
                    </div>

                    {/* Close button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedPalaceKey(null)}
                        className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:opacity-90 transition-opacity"
                      >
                        Đã Hiểu & Đóng Lại
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* POPUP / MODAL: THIÊN BÀN & BÁT TỰ GIẢI NGHĨA */}
      {showThienBanModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-accentGold/50 shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accentGold/20 border border-accentGold/40 flex items-center justify-center text-accentGold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">Giải Nghĩa Thiên Bàn & Bát Tự</h2>
                  <p className="text-xs text-gray-400">Khám phá cấu trúc năng lượng nguyên bản khi bạn sinh ra</p>
                </div>
              </div>
              <button
                onClick={() => setShowThienBanModal(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-background/80 border border-borderDark space-y-2">
                <span className="font-bold text-amber-400 text-sm block">1. Cục Số ({result.metadata.cucDetail}):</span>
                <p className="text-gray-300 leading-relaxed">
                  Trong Tử Vi, "Cục" tượng trưng cho hoàn cảnh xã hội bên ngoài dung dưỡng bản mệnh của bạn. Khi Cục sinh Mệnh hoặc tương hòa, bạn dễ gặp quý nhân nâng đỡ và thuận lợi trong việc hòa nhập xã hội.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/80 border border-borderDark space-y-2">
                <span className="font-bold text-indigo-400 text-sm block">2. Âm Dương ({result.facts.amDuongNamNu}):</span>
                <p className="text-gray-300 leading-relaxed">
                  Xác định chiều tính Đại hạn (thuận chiều kim đồng hồ hay nghịch chiều kim đồng hồ) và mức độ thuận lý giữa khí chất âm dương và giới tính thực tế.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/80 border border-borderDark space-y-2">
                <span className="font-bold text-rose-400 text-sm block">3. Mệnh Cư & Thân Cư:</span>
                <p className="text-gray-300 leading-relaxed">
                  Mệnh ngự tại cung {BRANCH_VN[result.facts.menhBranch]} chi phối tiền vận (trước 30 tuổi); Thân ngự tại cung {BRANCH_VN[result.facts.thanBranch]} chi phối hậu vận sau khi lập gia đình và tự chủ sự nghiệp.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowThienBanModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-accentGold text-background font-bold text-xs hover:opacity-90"
                >
                  Đã Rõ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
