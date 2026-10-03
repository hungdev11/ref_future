'use client';

import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, User, Info, BookOpen, Flame, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';

const ZODIAC_VN: Record<string, { name: string; element: 'FIRE' | 'EARTH' | 'AIR' | 'WATER'; elementVn: string }> = {
  ARIES: { name: 'Bạch Dương (Aries)', element: 'FIRE', elementVn: 'Hỏa' },
  TAURUS: { name: 'Kim Ngưu (Taurus)', element: 'EARTH', elementVn: 'Thổ' },
  GEMINI: { name: 'Song Tử (Gemini)', element: 'AIR', elementVn: 'Khí' },
  CANCER: { name: 'Cự Giải (Cancer)', element: 'WATER', elementVn: 'Thủy' },
  LEO: { name: 'Sư Tử (Leo)', element: 'FIRE', elementVn: 'Hỏa' },
  VIRGO: { name: 'Xử Nữ (Virgo)', element: 'EARTH', elementVn: 'Thổ' },
  LIBRA: { name: 'Thiên Bình (Libra)', element: 'AIR', elementVn: 'Khí' },
  SCORPIO: { name: 'Bọ Cạp (Scorpio)', element: 'WATER', elementVn: 'Thủy' },
  SAGITTARIUS: { name: 'Nhân Mã (Sagittarius)', element: 'FIRE', elementVn: 'Hỏa' },
  CAPRICORN: { name: 'Ma Kết (Capricorn)', element: 'EARTH', elementVn: 'Thổ' },
  AQUARIUS: { name: 'Bảo Bình (Aquarius)', element: 'AIR', elementVn: 'Khí' },
  PISCES: { name: 'Song Ngư (Pisces)', element: 'WATER', elementVn: 'Thủy' },
};

function getElementPairAnalysis(elemA: string, elemB: string): {
  harmonyLevel: string;
  synergy: string;
  layman: string;
  challenges: string;
  advice: string;
} {
  const pair = [elemA, elemB].sort().join('_');

  switch (pair) {
    case 'FIRE_FIRE':
      return {
        harmonyLevel: 'Nhiệt Huyết & Bùng Nổ Đam Mê',
        synergy: 'Hai ngọn lửa hội tụ tạo nên nguồn năng lượng dồi dào, sự hào hứng và nhiệt huyết phi thường trong mọi việc cùng làm.',
        layman: 'Hai bạn rất nhanh chóng đồng điệu về sở thích, nói chuyện hào hứng và luôn cùng nhau hướng về phía trước. Điểm cần lưu ý là cả hai đều có cái tôi khá lớn.',
        challenges: 'Dễ xảy ra tranh cãi nảy lửa khi bất đồng chính kiến do không ai muốn nhận phần thua.',
        advice: 'Học cách thay phiên nhau làm người lắng nghe; khi một bên đang nóng giận, bên kia hãy chủ động hạ giọng hoặc tạo khoảng lặng ngắn.',
      };
    case 'AIR_FIRE':
      return {
        harmonyLevel: 'Tương Sinh Tự Nhiên & Truyền Cảm Hứng (Khí - Hỏa)',
        synergy: 'Gió thổi bùng ngọn lửa; sự thông tuệ của nguyên tố Khí kích thích trí tưởng tượng và ngọn lửa đam mê của nguyên tố Hỏa.',
        layman: 'Mối quan hệ đầy ắp tiếng cười, sự hứng khởi và các kế hoạch sáng tạo. Bạn Khí mang lại góc nhìn sắc sảo, bạn Hỏa biến chúng thành hành động thực tế.',
        challenges: 'Đôi khi quá mải mê với những ý tưởng bay bổng mà thiếu sự quản trị tài chính và kế hoạch thực tiễn.',
        advice: 'Cùng nhau thiết lập các mốc thời gian thực hiện cụ thể và duy trì sự cam kết ổn định thay vì chỉ dựa vào cảm hứng ban đầu.',
      };
    case 'EARTH_FIRE':
      return {
        harmonyLevel: 'Tương Trợ Thực Tiễn & Kiến Tạo (Thổ - Hỏa)',
        synergy: 'Thổ tạo bệ đỡ vững vàng, giữ ấm cho Hỏa; Hỏa mang lại sự sôi động, thúc đẩy sự an tĩnh của Thổ chuyển hóa thành bước tiến.',
        layman: 'Một người là ngọn lửa đam mê dẫn đường, một người là điểm tựa thực tế vững chắc bảo vệ gia đình và tài chính. Cực kỳ bù trừ cho nhau.',
        challenges: 'Người Hỏa có thể thấy người Thổ quá chậm chạp hoặc thận trọng; người Thổ có thể thấy người Hỏa bốc đồng.',
        advice: 'Trân trọng sự khác biệt của nhau: Hãy nhìn nhận sự thận trọng của Thổ là chiếc phanh an toàn, và sự dấn thân của Hỏa là động cơ tiến bước.',
      };
    case 'FIRE_WATER':
      return {
        harmonyLevel: 'Hấp Dẫn Mãnh Liệt & Chuyển Hóa Cảm Xúc (Hỏa - Thủy)',
        synergy: 'Nước làm dịu đi cái nóng của Lửa; Lửa hâm nóng dòng nước lạnh; sự hấp dẫn sâu sắc xuất phát từ hai thái cực đối lập nhau.',
        layman: 'Sức hút ban đầu rất mãnh liệt. Một bên nồng nhiệt quyết đoán, một bên nhạy cảm sâu lắng. Đây là mối quan hệ giúp cả hai trưởng thành vượt bậc về mặt tâm lý.',
        challenges: 'Lời nói trực diện vô tình của người Hỏa dễ làm tổn thương tâm hồn nhạy cảm của người Thủy; sự im lặng của người Thủy lại khiến người Hỏa sốt ruột.',
        advice: 'Người Hỏa cần học cách nói năng dịu dàng, tinh tế hơn; người Thủy cần học cách giãi bày cảm xúc thẳng thắn thay vì giận hờn ngấm ngầm.',
      };
    case 'EARTH_EARTH':
      return {
        harmonyLevel: 'Bền Vững Bất Biến & An Toàn Tuyệt Đối (Thổ - Thổ)',
        synergy: 'Cùng chung nhịp đập thực tiễn, coi trọng gia đình, sự nghiệp và sự tích lũy tài chính lâu bền. Độ ổn định cao nhất trong các cặp.',
        layman: 'Hai bạn luôn đồng lòng về cách chi tiêu, định hướng tương lai và việc chăm sóc tổ ấm. Ít khi có sóng gió lớn xảy ra.',
        challenges: 'Đời sống dễ rơi vào lối mòn, thiếu sự bất ngờ và lãng mạn sau một thời gian gắn bó.',
        advice: 'Chủ động lên kế hoạch cho các chuyến du lịch đổi gió hoặc cùng nhau thử nghiệm những trải nghiệm mới để làm mới tình cảm.',
      };
    case 'EARTH_WATER':
      return {
        harmonyLevel: 'Tương Sinh Nuôi Dưỡng Kinh Điển (Thổ - Thủy)',
        synergy: 'Nước tưới mát cho Đất đơm hoa kết trái; Đất tạo bờ bao vững chãi cho Nước khỏi tràn bờ. Sự nâng đỡ dịu dàng và bền bỉ tự nhiên.',
        layman: 'Hai bạn sinh ra để chăm sóc và bảo bọc lẫn nhau. Người Thổ mang lại cảm giác an toàn vững chãi; người Thủy mang lại sự ấm áp và tình yêu thương dịu dàng.',
        challenges: 'Khi gặp trắc trở, cả hai có xu hướng cùng thu mình vào sự an toàn cũ thay vì dám đột phá ra ngoài.',
        advice: 'Cùng nhau động viên bước qua các giới hạn mới; giữ gìn sự kết nối chân thành thường nhật.',
      };
    case 'AIR_EARTH':
      return {
        harmonyLevel: 'Hợp Tác Trí Tuệ & Hiện Thực Hóa (Khí - Thổ)',
        synergy: 'Tư duy chiến lược, phân tích logic của Khí kết hợp với năng lực quản trị, tổ chức bài bản của Thổ tạo nên một liên minh rất hiệu quả.',
        layman: 'Hai bạn đối thoại rất văn minh, lý trí. Trong công việc cũng như đời sống, hai bạn luôn biết cách phân công trách nhiệm hợp lý và rõ ràng.',
        challenges: 'Có thể hơi thiếu những biểu lộ cảm xúc nồng nàn do cả hai đều thiên về tư duy lý trí.',
        advice: 'Dành thêm những cử chỉ âu yếm, lắng nghe bằng trái tim nhiều hơn là phân tích đúng - sai trên bàn đối thoại.',
      };
    case 'AIR_AIR':
      return {
        harmonyLevel: 'Đồng Điệu Tư Duy & Tự Do Hòa Nhã (Khí - Khí)',
        synergy: 'Hai tâm hồn thông thái gặp nhau; không bao giờ cạn đề tài để trao đổi, tôn trọng tuyệt đối không gian cá nhân và sự tự do của nhau.',
        layman: 'Hai bạn vừa là người yêu, vừa là tri kỷ thấu hiểu nhau. Hai bạn có thể nói chuyện thâu đêm suốt sáng về đủ mọi chủ đề trên đời.',
        challenges: 'Dễ né tránh đối diện với những góc khuất cảm xúc nặng nề hoặc trốn tránh những trách nhiệm thực tế.',
        advice: 'Học cách neo đậu vào đời sống thực tế: biến các cuộc đối thoại thú vị thành những cam kết và hành động thiết thực cho tương lai.',
      };
    case 'AIR_WATER':
      return {
        harmonyLevel: 'Giao Thoa Trí Tuệ & Chiều Sâu Nội Tâm (Khí - Thủy)',
        synergy: 'Làn gió mát lành lướt trên mặt nước hồ; Khí đem lại sự sáng suốt khách quan, Thủy mang lại sự rung cảm thi ca và lòng trắc ẩn.',
        layman: 'Người Khí giúp người Thủy bớt u uất, suy nghĩ thoáng hơn; người Thủy giúp người Khí chạm tới những tầng sâu cảm xúc mà lý trí không giải thích được.',
        challenges: 'Người Khí muốn phân tích mọi thứ bằng lý luận, trong khi người Thủy cần sự cảm thông không cần lý do.',
        advice: 'Người Khí hãy ôm lấy người Thủy thay vì tìm cách tranh luận đúng - sai; người Thủy hãy nói rõ nhu cầu của mình một cách cụ thể.',
      };
    case 'WATER_WATER':
      return {
        harmonyLevel: 'Giao Cảm Tâm Hồn & Trực Giác Kỳ Diệu (Thủy - Thủy)',
        synergy: 'Hai dòng sông hòa làm một biển lớn; sự thấu hiểu không lời, trực giác kết nối linh thiêng và tình cảm vô điều kiện.',
        layman: 'Chỉ cần một ánh mắt là hai bạn đã biết đối phương đang nghĩ gì. Sự gắn kết tình cảm cực kỳ sâu sắc và ấm cúng.',
        challenges: 'Khi một bên buồn bã hay lo lắng, tâm trạng đó rất dễ lây lan sang người kia khiến cả hai cùng rơi vào trạng thái tiêu cực.',
        advice: 'Học cách giữ ranh giới cảm xúc; rèn luyện tư duy thực tế và xây dựng đời sống bên ngoài phong phú để cân bằng lại thế giới nội tâm.',
      };
    default:
      return {
        harmonyLevel: 'Dung Hòa & Bổ Trợ Tương Hỗ',
        synergy: 'Sự kết hợp giữa hai trường năng lượng khác nhau tạo nên sự bù trừ phong phú cho đời sống lứa đôi.',
        layman: 'Mỗi người một vẻ, mang lại những góc nhìn mới mẻ giúp đối phương mở rộng trải nghiệm sống.',
        challenges: 'Cần thời gian làm quen với cách biểu đạt và nhịp sinh hoạt khác biệt của nhau.',
        advice: 'Tôn trọng bản sắc riêng và kiên nhẫn đối thoại với thiện chí cùng tiến bộ.',
      };
  }
}

function getNumerologySynergy(lpA: number, lpB: number): {
  synergyTitle: string;
  dynamic: string;
  advice: string;
} {
  const isMasterA = lpA === 11 || lpA === 22 || lpA === 33;
  const isMasterB = lpB === 11 || lpB === 22 || lpB === 33;

  if (lpA === lpB) {
    return {
      synergyTitle: `Cùng Số Chủ Đạo ${lpA}: Tấm Gương Phản Chiếu Hoàn Hảo`,
      dynamic: 'Hai bạn có bài học cuộc đời và sứ mệnh tương đồng. Bạn nhìn thấy rõ ưu điểm cũng như khuyết điểm của chính mình thông qua đối phương.',
      advice: 'Cổ vũ thế mạnh chung và bao dung với những điểm yếu mà cả hai cùng gặp phải.',
    };
  }

  return {
    synergyTitle: `Số ${lpA} & Số ${lpB}: Nhịp Điệu Hài Hòa Của Hai Dòng Năng Lượng`,
    dynamic: `Sự kết hợp giữa số ${lpA} và số ${lpB} tạo nên thế kiềng ba chân vững chãi giữa năng lực hành động và chiều sâu cảm nhận, giúp đôi bên vừa tiến xa trong sự nghiệp vừa giữ ấm hạnh phúc lứa đôi.`,
    advice: `Lấy sự tôn trọng làm kim chỉ nam: Hãy để người số ${lpA} phát huy đúng sở trường và luôn tạo không gian an tâm cho người số ${lpB} tỏa sáng.`,
  };
}

export default function CompatibilityPage() {
  // Person A
  const [nameA, setNameA] = useState('Nguyễn Văn An');
  const [dateA, setDateA] = useState('1992-05-15');
  const [genderA, setGenderA] = useState<'MALE' | 'FEMALE'>('MALE');

  // Person B
  const [nameB, setNameB] = useState('Trần Thị Bình');
  const [dateB, setDateB] = useState('1994-10-20');
  const [genderB, setGenderB] = useState<'MALE' | 'FEMALE'>('FEMALE');

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Calculate Astro & Numerology for Person A and B
      const [resAstroA, resNumA, resAstroB, resNumB] = await Promise.all([
        fetch('/api/astrology/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthDate: dateA, timeAccuracy: 'UNKNOWN' }),
        }).then((r) => r.json()),
        fetch('/api/numerology/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: nameA, birthDate: dateA }),
        }).then((r) => r.json()),
        fetch('/api/astrology/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthDate: dateB, timeAccuracy: 'UNKNOWN' }),
        }).then((r) => r.json()),
        fetch('/api/numerology/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: nameB, birthDate: dateB }),
        }).then((r) => r.json()),
      ]);

      if (resAstroA.error || resNumA.error || resAstroB.error || resNumB.error) {
        throw new Error('Tính toán tương hợp thất bại. Vui lòng kiểm tra lại thông tin ngày sinh.');
      }

      // Safe body and core number lookups (handling uppercase enum keys)
      const sunA = resAstroA.facts?.bodies?.SUN?.sign ?? resAstroA.facts?.bodies?.sun?.sign ?? 'TAURUS';
      const moonA = resAstroA.facts?.bodies?.MOON?.sign ?? resAstroA.facts?.bodies?.moon?.sign ?? 'SCORPIO';
      const lpA = Number(resNumA.facts?.core?.LIFE_PATH?.value ?? resNumA.facts?.core?.life_path?.value ?? 5);
      const exprA = Number(resNumA.facts?.core?.EXPRESSION?.value ?? resNumA.facts?.core?.expression?.value ?? 1);

      const sunB = resAstroB.facts?.bodies?.SUN?.sign ?? resAstroB.facts?.bodies?.sun?.sign ?? 'LIBRA';
      const moonB = resAstroB.facts?.bodies?.MOON?.sign ?? resAstroB.facts?.bodies?.moon?.sign ?? 'TAURUS';
      const lpB = Number(resNumB.facts?.core?.LIFE_PATH?.value ?? resNumB.facts?.core?.life_path?.value ?? 8);
      const exprB = Number(resNumB.facts?.core?.EXPRESSION?.value ?? resNumB.facts?.core?.expression?.value ?? 3);

      const elemA = ZODIAC_VN[sunA]?.element ?? 'EARTH';
      const elemB = ZODIAC_VN[sunB]?.element ?? 'AIR';

      const elementAnalysis = getElementPairAnalysis(elemA, elemB);
      const numAnalysis = getNumerologySynergy(lpA, lpB);

      setAnalysis({
        personA: { name: nameA, sun: sunA, moon: moonA, lifePath: lpA, expression: exprA, element: elemA },
        personB: { name: nameB, sun: sunB, moon: moonB, lifePath: lpB, expression: exprB, element: elemB },
        elementAnalysis,
        numAnalysis,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span>/</span>
          <span>Khảo Cứu Độ Tương Hợp</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Hòa Hợp Bản Mệnh Lứa Đôi & Tri Kỷ
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Đối chiếu sự hòa hợp dựa trên nguyên lý tương tác 4 nguyên tố Hoàng Đạo và cặp Số Chủ Đạo Pythagoras. 
          Nhận diện điểm tương đồng, nguy cơ xung đột và lời khuyên đối thoại chân thành.
        </p>
      </div>

      <form onSubmit={handleCompare} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person A */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Đối Tượng A</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Họ và Tên</label>
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Ngày Sinh Dương Lịch</label>
              <input
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Giới Tính</label>
              <select
                value={genderA}
                onChange={(e) => setGenderA(e.target.value as any)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </div>
          </div>

          {/* Person B */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Đối Tượng B</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Họ và Tên</label>
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Ngày Sinh Dương Lịch</label>
              <input
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Giới Tính</label>
              <select
                value={genderB}
                onChange={(e) => setGenderB(e.target.value as any)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="FEMALE">Nữ</option>
                <option value="MALE">Nam</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Đang đối chiếu dữ liệu...
              </>
            ) : (
              'Khảo Cứu Tương Hợp →'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {analysis && (
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* Side by side profile summary */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <h2 className="text-base font-serif text-parchment border-b border-borderDark pb-2">
              Đối Chiếu Tọa Độ Hai Cá Nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background border border-borderDark space-y-2 text-xs font-mono">
                <div className="font-serif font-bold text-parchment text-sm">{analysis.personA.name}</div>
                <div className="space-y-1 text-stone">
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Mặt Trời (Sun Sign):</span>
                    <span className="text-parchment">{ZODIAC_VN[analysis.personA.sun]?.name ?? analysis.personA.sun}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Nguyên Tố Cốt Lõi:</span>
                    <span className="text-accentGold">Nguyên tố {ZODIAC_VN[analysis.personA.sun]?.elementVn ?? 'Thổ'}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Mặt Trăng (Moon Sign):</span>
                    <span className="text-parchment">{ZODIAC_VN[analysis.personA.moon]?.name ?? analysis.personA.moon}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Số Chủ Đạo:</span>
                    <span className="text-accentGold font-bold">Số {analysis.personA.lifePath}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số Sứ Mệnh:</span>
                    <span className="text-parchment">Số {analysis.personA.expression}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background border border-borderDark space-y-2 text-xs font-mono">
                <div className="font-serif font-bold text-parchment text-sm">{analysis.personB.name}</div>
                <div className="space-y-1 text-stone">
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Mặt Trời (Sun Sign):</span>
                    <span className="text-parchment">{ZODIAC_VN[analysis.personB.sun]?.name ?? analysis.personB.sun}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Nguyên Tố Cốt Lõi:</span>
                    <span className="text-accentGold">Nguyên tố {ZODIAC_VN[analysis.personB.sun]?.elementVn ?? 'Khí'}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Mặt Trăng (Moon Sign):</span>
                    <span className="text-parchment">{ZODIAC_VN[analysis.personB.moon]?.name ?? analysis.personB.moon}</span>
                  </div>
                  <div className="flex justify-between border-b border-borderDark/40 pb-1">
                    <span>Số Chủ Đạo:</span>
                    <span className="text-accentGold font-bold">Số {analysis.personB.lifePath}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số Sứ Mệnh:</span>
                    <span className="text-parchment">Số {analysis.personB.expression}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Astrology Element Harmony Breakdown */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="flex items-center justify-between border-b border-borderDark pb-2 text-xs font-mono">
              <h3 className="font-serif text-sm text-parchment">
                1. Tương Hợp 4 Nguyên Tố: {analysis.elementAnalysis.harmonyLevel}
              </h3>
              <span className="text-accentGold text-[11px]">Giao Thoa Bản Mệnh</span>
            </div>

            <p className="text-stone leading-relaxed text-xs">
              {analysis.elementAnalysis.synergy}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Điểm Chung & Gắn Kết
                </span>
                <p className="text-stone leading-relaxed text-[11px]">
                  {analysis.elementAnalysis.layman}
                </p>
              </div>

              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                  Nguy Cơ Bất Đồng
                </span>
                <p className="text-stone leading-relaxed text-[11px]">
                  {analysis.elementAnalysis.challenges}
                </p>
              </div>

              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Bí Quyết Hòa Hợp
                </span>
                <p className="text-stone leading-relaxed text-[11px]">
                  {analysis.elementAnalysis.advice}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Numerology Synergy Breakdown */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="flex items-center justify-between border-b border-borderDark pb-2 text-xs font-mono">
              <h3 className="font-serif text-sm text-parchment">
                2. Nhịp Điệu Thần Số Học: {analysis.numAnalysis.synergyTitle}
              </h3>
              <span className="text-accentGold text-[11px]">Tần Số Rung Động</span>
            </div>

            <p className="text-stone leading-relaxed text-xs">
              {analysis.numAnalysis.dynamic}
            </p>

            <div className="p-3.5 bg-background border border-borderDark space-y-1 text-xs">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                🎯 Lời Khuyên Gắn Kết Số Học:
              </span>
              <p className="text-stone leading-relaxed text-xs">
                {analysis.numAnalysis.advice}
              </p>
            </div>
          </div>

          {/* Transparent explanation */}
          <div className="p-4 bg-background border border-borderDark space-y-1 text-xs text-stone">
            <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
              Nguyên Tắc Đánh Giá Tương Hợp
            </span>
            <p className="leading-relaxed text-[11px]">
              Hệ thống xác định tương thích thông qua nguyên tắc tương sinh tương khắc giữa các nguyên tố và nhịp điệu chu kỳ số học. Chúng tôi không đưa ra những con số phần trăm may rủi vô nghĩa, mà tập trung chỉ ra cách hai bạn có thể thấu cảm, nhường nhịn và đồng hành cùng nhau trên chặng đường dài.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
