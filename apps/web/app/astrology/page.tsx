'use client';

import React, { useState } from 'react';
import { Compass, AlertTriangle, ShieldCheck, RefreshCw, Sparkles, BookOpen, Sun, Moon } from 'lucide-react';

const ZODIAC_VN: Record<string, string> = {
  ARIES: 'Bạch Dương (Aries)',
  TAURUS: 'Kim Ngưu (Taurus)',
  GEMINI: 'Song Tử (Gemini)',
  CANCER: 'Cự Giải (Cancer)',
  LEO: 'Sư Tử (Leo)',
  VIRGO: 'Xử Nữ (Virgo)',
  LIBRA: 'Thiên Bình (Libra)',
  SCORPIO: 'Bọ Cạp (Scorpio)',
  SAGITTARIUS: 'Nhân Mã (Sagittarius)',
  CAPRICORN: 'Ma Kết (Capricorn)',
  AQUARIUS: 'Bảo Bình (Aquarius)',
  PISCES: 'Song Ngư (Pisces)',
};

const SUN_SIGN_INTERPRETATIONS: Record<string, {
  meaning: string;
  layman: string;
  mechanism: string;
  advice: string;
}> = {
  ARIES: {
    meaning: 'Mặt Trời tại Bạch Dương biểu trưng cho ngọn lửa tiên phong, tinh thần dấn thân quả cảm và ý chí hành động trực diện.',
    layman: 'Bạn là người có cá tính mạnh, quyết đoán và thích bắt tay vào việc ngay. Bạn ghét sự vòng vo, luôn muốn tự mình mở lối và dẫn đầu.',
    mechanism: 'Hỏa Tiên Phong (Cardinal Fire) do Hỏa Tinh cai quản. Nguồn sinh lực dồi dào thúc đẩy bản ngã luôn tìm kiếm những thử thách mới.',
    advice: 'Rèn luyện thêm tính kiên nhẫn; kết hợp ngọn lửa nhiệt huyết với kế hoạch cụ thể để duy trì thành quả dài lâu.',
  },
  TAURUS: {
    meaning: 'Mặt Trời tại Kim Ngưu biểu thị sức mạnh của sự bền bỉ, tính thực tiễn vững vàng và khát vọng xây dựng những giá trị lâu bền.',
    layman: 'Bạn điềm đạm, đáng tin cậy và có tư duy tài chính rất thực tế. Khi đã xác định mục tiêu, bạn kiên trì theo đuổi tới cùng.',
    mechanism: 'Thổ Kiên Định (Fixed Earth) do Kim Tinh cai quản. Tập trung vào sự bảo tồn năng lượng, tích lũy giá trị vật chất và thẩm mỹ.',
    advice: 'Mở rộng sự linh hoạt trước những thay đổi khách quan; đừng để sự thận trọng biến thành nỗi ngại đổi mới.',
  },
  GEMINI: {
    meaning: 'Mặt Trời tại Song Tử mang năng lượng trí tuệ nhạy bén, khả năng thích ứng linh hoạt và nhu cầu giao lưu, kết nối thông tin không ngừng.',
    layman: 'Bạn thông minh, hoạt ngôn, tiếp thu điều mới rất nhanh và có khả năng đa nhiệm. Bạn luôn tạo bầu không khí sinh động xung quanh.',
    mechanism: 'Khí Biến Đổi (Mutable Air) do Thủy Tinh cai quản. Tư duy đa luồng, xử lý dữ liệu và truyền tải ý niệm với tốc độ cao.',
    advice: 'Tập trung năng lượng vào một vài dự án trọng điểm thay vì phân tán quá nhiều việc cùng lúc để đạt hiệu quả tối ưu.',
  },
  CANCER: {
    meaning: 'Mặt Trời tại Cự Giải phản ánh chiều sâu cảm xúc, trực giác nhạy cảm và thiên hướng nuôi dưỡng, bảo bọc những người thân yêu.',
    layman: 'Bạn sống tình cảm, chu đáo, có trực giác rất nhạy và trân trọng gia đình. Bạn là chỗ dựa tinh thần ấm áp cho những người xung quanh.',
    mechanism: 'Thủy Tiên Phong (Cardinal Water) do Mặt Trăng cai quản. Bản ngã gắn liền với nhu cầu an toàn nội tâm và khả năng thấu cảm sâu sắc.',
    advice: 'Thiết lập ranh giới cảm xúc lành mạnh; học cách buông bỏ những âu lo quá mức về những điều chưa xảy ra.',
  },
  LEO: {
    meaning: 'Mặt Trời tại Sư Tử biểu trưng cho lòng tự tôn cao quý, tâm hồn hào sảng và khát vọng tỏa sáng, truyền cảm hứng cho cộng đồng.',
    layman: 'Bạn có phong thái tự tin, hào sảng, làm việc gì cũng muốn đạt đỉnh cao và luôn mong muốn được mọi người công nhận bằng thực lực.',
    mechanism: 'Hỏa Kiên Định (Fixed Fire) thuộc cung nhà của chính Mặt Trời. Năng lượng tỏa sáng tự nhiên, ấm áp và thu hút.',
    advice: 'Lắng nghe ý kiến đóng góp với tâm thế bao dung; sự khiêm nhường sẽ biến bạn thành người dẫn đường được muôn người kính trọng.',
  },
  VIRGO: {
    meaning: 'Mặt Trời tại Xử Nữ đại diện cho tư duy phân tích sắc bén, tinh thần phụng sự và chuẩn mực hoàn thiện đến từng chi tiết nhỏ.',
    layman: 'Bạn ngăn nắp, làm việc có phương pháp, chú trọng tính hiệu quả và luôn sẵn lòng giúp đỡ người khác giải quyết vấn đề thực tế.',
    mechanism: 'Thổ Biến Đổi (Mutable Earth) do Thủy Tinh cai quản. Tinh chỉnh, tối ưu hóa quy trình và quản trị trật tự vật chất.',
    advice: 'Đừng quá khắt khe với bản thân và người khác; hãy chấp nhận rằng sự hoàn hảo là một hành trình liên tục tiến bộ.',
  },
  LIBRA: {
    meaning: 'Mặt Trời tại Thiên Bình hướng đến sự công bằng, hài hòa, gu thẩm mỹ tinh tế và năng lực xây dựng các mối quan hệ đối tác bền vững.',
    layman: 'Bạn nhã nhặn, có tài ngoại giao, biết cách dung hòa các quan điểm đối lập và luôn tìm kiếm sự cân bằng trong cuộc sống.',
    mechanism: 'Khí Tiên Phong (Cardinal Air) do Kim Tinh cai quản. Ý thức bản ngã được hoàn thiện thông qua sự tương tác và phản chiếu từ người khác.',
    advice: 'Quyết đoán hơn trong các tình huống then chốt; tin tưởng vào trực giác và chính kiến của bản thân thay vì quá e ngại bất hòa.',
  },
  SCORPIO: {
    meaning: 'Mặt Trời tại Bọ Cạp phản ánh nội lực thâm trầm, trực giác nhìn thấu bản chất và năng lực chuyển hóa tâm lý, tái sinh mạnh mẽ.',
    layman: 'Bạn sâu sắc, bản lĩnh kiên cường, giữ bí mật rất tốt và luôn nhìn ra động cơ đằng sau hành vi của người khác. Bạn trung thành tuyệt đối.',
    mechanism: 'Thủy Kiên Định (Fixed Water) do Diêm Vương Tinh và Hỏa Tinh cai quản. Sức mạnh thấu thị, khả năng vượt qua nghịch cảnh vượt trội.',
    advice: 'Học cách tha thứ và buông bỏ sự đa nghi; mở lòng đón nhận tình cảm chân thành sẽ mang lại sự bình an nội tâm.',
  },
  SAGITTARIUS: {
    meaning: 'Mặt Trời tại Nhân Mã đại diện cho tinh thần tự do, niềm lạc quan vô tận và khát vọng khám phá các chân trời tri thức, triết học mới.',
    layman: 'Bạn phóng khoáng, chân thành, yêu tự do và thích khám phá thế giới. Bạn truyền năng lượng tích cực và niềm tin đến mọi người.',
    mechanism: 'Hỏa Biến Đổi (Mutable Fire) do Mộc Tinh cai quản. Khát khao mở rộng giới hạn không gian, tư tưởng và ý nghĩa nhân sinh.',
    advice: 'Chú ý đến các chi tiết thực tế trong kế hoạch; biến những ý tưởng vĩ đại thành các bước hành động cụ thể, có kỷ luật.',
  },
  CAPRICORN: {
    meaning: 'Mặt Trời tại Ma Kết biểu thị tính kỷ luật thép, tinh thần trách nhiệm kiên định và khát vọng xây dựng sự nghiệp bền vững đỉnh cao.',
    layman: 'Bạn nghiêm túc, có tầm nhìn dài hạn, làm việc có lộ trình và có bản lĩnh đối mặt với áp lực lớn để gặt hái thành công vững chắc.',
    mechanism: 'Thổ Tiên Phong (Cardinal Earth) do Thổ Tinh cai quản. Khả năng hoạch định cơ cấu tổ chức, hiện thực hóa mục tiêu tham vọng.',
    advice: 'Dành thêm thời gian nghỉ ngơi và chia sẻ cảm xúc với gia đình; đừng để công việc lấn át toàn bộ niềm vui cuộc sống thường nhật.',
  },
  AQUARIUS: {
    meaning: 'Mặt Trời tại Bảo Bình biểu trưng cho tư duy đổi mới, tính độc lập cao độ và lý tưởng nhân đạo hướng đến tiến bộ của xã hội.',
    layman: 'Bạn có tư duy độc đáo, không thích đi theo lối mòn, tôn trọng sự bình đẳng và luôn có những góc nhìn đột phá đi trước thời đại.',
    mechanism: 'Khí Kiên Định (Fixed Air) do Thiên Vương Tinh cai quản. Khả năng trừu tượng hóa, kết nối cộng đồng và đổi mới tư duy.',
    advice: 'Kết nối lý tưởng lớn với sự đồng cảm cá nhân; bày tỏ tình cảm gần gũi với những người thân thiết bên cạnh mình.',
  },
  PISCES: {
    meaning: 'Mặt Trời tại Song Ngư đại diện cho lòng trắc ẩn bao la, tâm hồn nghệ thuật phong phú và trực giác kết nối tinh thần nhạy cảm.',
    layman: 'Bạn thấu cảm, giàu trí tưởng tượng, tốt bụng và dễ rung động trước cái đẹp. Bạn lắng nghe chân thành và luôn sẻ chia với người khác.',
    mechanism: 'Thủy Biến Đổi (Mutable Water) do Hải Vương Tinh cai quản. Dòng chảy cảm xúc hòa nhập không biên giới, khả năng cảm thụ nghệ thuật.',
    advice: 'Giữ vững sự thực tế và bảo vệ nguồn năng lượng của bản thân; không nên gánh vác thay nỗi khổ của người khác đến mức kiệt sức.',
  },
};

const MOON_SIGN_INTERPRETATIONS: Record<string, {
  meaning: string;
  layman: string;
  advice: string;
}> = {
  ARIES: {
    meaning: 'Mặt Trăng Bạch Dương: Cảm xúc bộc phát nhanh, chân thực, nhu cầu khẳng định cái tôi bản năng mạnh mẽ.',
    layman: 'Khi gặp căng thẳng, bạn cần giải tỏa ngay bằng hành động hoặc nói thẳng suy nghĩ của mình chứ không thể giữ trong lòng.',
    advice: 'Hít thở sâu trước khi phản ứng cảm xúc; tìm các hoạt động thể thao lành mạnh để giải phóng năng lượng dư thừa.',
  },
  TAURUS: {
    meaning: 'Mặt Trăng Kim Ngưu: Trạng thái tôn quý (Exaltation), cảm xúc ổn định, cần sự an toàn vật chất và không gian bình yên.',
    layman: 'Bạn có nội tâm vững vàng, ít bị dao động. Sự êm ấm, món ăn ngon và không gian thoải mái là liều thuốc chữa lành tốt nhất cho bạn.',
    advice: 'Chia sẻ nỗi lòng khi gặp bế tắc thay vì khép kín chịu đựng một mình; tin tưởng vào sự giúp đỡ của bạn bè thân thiết.',
  },
  GEMINI: {
    meaning: 'Mặt Trăng Song Tử: Cảm xúc được xử lý qua lăng kính tư duy; cần trò chuyện, đọc sách và trao đổi để tìm sự an tâm.',
    layman: 'Mỗi khi lo lắng, bạn cảm thấy nhẹ nhõm nhất khi được nói chuyện với một người biết lắng nghe hoặc tìm hiểu rõ ngọn ngành vấn đề.',
    advice: 'Cho phép bản thân cảm nhận cảm xúc thuần túy mà không nhất thiết phải phân tích lý lẽ cho mọi thứ.',
  },
  CANCER: {
    meaning: 'Mặt Trăng Cự Giải: Cung vị thống lĩnh (Domicile), trực giác cực nhạy, thế giới nội tâm sâu sắc gắn liền với tổ ấm.',
    layman: 'Bạn có giác quan thứ sáu rất nhạy, dễ cảm nhận tâm trạng của người khác. Bạn cần một không gian ấm cúng để tái nạp năng lượng.',
    advice: 'Tạo cho mình một không gian tĩnh lặng định kỳ; chăm sóc bản thân chu đáo trước khi lo lắng cho người khác.',
  },
  LEO: {
    meaning: 'Mặt Trăng Sư Tử: Trái tim ấm áp, khao khát được công nhận, trân trọng và thể hiện tình cảm một cách nồng nhiệt.',
    layman: 'Bạn hào hiệp, thích mang lại niềm vui cho mọi người và cảm thấy được nạp năng lượng khi nhận được lời khen ngợi chân thành.',
    advice: 'Học cách tự công nhận giá trị bản thân từ bên trong mà không phụ thuộc quá mức vào sự tán dương bên ngoài.',
  },
  VIRGO: {
    meaning: 'Mặt Trăng Xử Nữ: Nhu cầu an tâm thông qua sự ngăn nắp, quy củ và cảm giác bản thân có ích cho cộng đồng.',
    layman: 'Khi căng thẳng, bạn thường dọn dẹp hoặc sắp xếp lại công việc. Bạn thể hiện sự quan tâm bằng những hành động chăm sóc cụ thể.',
    advice: 'Học cách thư giãn và chấp nhận rằng mọi thứ không cần phải hoàn hảo tuyệt đối mới mang lại hạnh phúc.',
  },
  LIBRA: {
    meaning: 'Mặt Trăng Thiên Bình: Tìm kiếm sự hòa hợp, bình yên trong các mối quan hệ và cảm giác được đồng hành sẻ chia.',
    layman: 'Bạn ghét sự xung đột gay gắt, luôn muốn dĩ hòa vi quý và cảm thấy an lòng nhất khi ở bên người bạn đời thấu hiểu.',
    advice: 'Học cách đối diện thẳng thắn với bất đồng cần thiết; sự rõ ràng chính là khởi đầu của sự hòa hợp thực chất.',
  },
  SCORPIO: {
    meaning: 'Mặt Trăng Bọ Cạp: Cảm xúc sâu sắc, mãnh liệt, cần sự tin tưởng tuyệt đối và khả năng nhìn thấu tâm can.',
    layman: 'Nội tâm bạn rất mạnh mẽ nhưng kín đáo. Bạn chỉ mở lòng với số ít người đã qua thử thách về sự trung thành.',
    advice: 'Tập buông bỏ kiểm soát và học cách tin tưởng; sự bao dung sẽ giúp dòng chảy cảm xúc của bạn trở nên êm ả.',
  },
  SAGITTARIUS: {
    meaning: 'Mặt Trăng Nhân Mã: Nhu cầu tự do cảm xúc, niềm tin lạc quan và cảm giác được mở rộng chân trời trải nghiệm.',
    layman: 'Khi mệt mỏi, một chuyến đi xa hoặc một cuốn sách hay sẽ giúp bạn lấy lại thăng bằng nhanh chóng.',
    advice: 'Học cách gắn bó sâu sắc với hiện tại; đừng dùng sự dịch chuyển để trốn tránh những vấn đề cảm xúc cần giải quyết.',
  },
  CAPRICORN: {
    meaning: 'Mặt Trăng Ma Kết: Cảm xúc tự chủ, thận trọng, thể hiện tình thương qua sự trách nhiệm và bảo bọc kinh tế.',
    layman: 'Bạn ít khi bộc lộ cảm xúc ra ngoài, có xu hướng tự mình gánh vác mọi áp lực để bảo vệ những người phụ thuộc vào mình.',
    advice: 'Cho phép bản thân được yếu lòng và nhờ cậy sự giúp đỡ; sự tổn thương được bộc lộ lành mạnh là dấu hiệu của sức mạnh thực sự.',
  },
  AQUARIUS: {
    meaning: 'Mặt Trăng Bảo Bình: Cảm xúc độc lập, khách quan, cần không gian tự do riêng tư và sự tôn trọng tính cá nhân.',
    layman: 'Bạn tiếp cận cảm xúc bằng lý trí, không thích sự kiểm soát hay phụ thuộc quá mức. Bạn là người bạn trung thành và công bằng.',
    advice: 'Tập kết nối với cảm xúc trực tiếp của cơ thể và trái tim thay vì chỉ đứng ở vị trí quan sát viên từ xa.',
  },
  PISCES: {
    meaning: 'Mặt Trăng Song Ngư: Thấu cảm không biên giới, tâm hồn nghệ sĩ giàu lòng trắc ẩn và trực giác huyền bí diệu kỳ.',
    layman: 'Bạn rất dễ đồng cảm với nỗi đau của người khác, yêu nghệ thuật, âm nhạc và cần thời gian yên tĩnh một mình để hồi phục.',
    advice: 'Tạo ranh giới bảo vệ tâm lý vững vàng; sử dụng năng khiếu nghệ thuật hoặc viết nhật ký để chuyển hóa cảm xúc thành sức mạnh.',
  },
};

export default function AstrologyPage() {
  const [birthDate, setBirthDate] = useState('1990-07-25');
  const [birthTime, setBirthTime] = useState('08:30:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [latitude, setLatitude] = useState(21.0285);
  const [longitude, setLongitude] = useState(105.8542);
  const [timezoneOffset, setTimezoneOffset] = useState(420);
  const [houseSystem, setHouseSystem] = useState('PLACIDUS');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAudit, setShowAudit] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        birthDate,
        birthTime: isTimeUnknown ? undefined : birthTime,
        timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
        latitude: isTimeUnknown ? undefined : Number(latitude),
        longitude: isTimeUnknown ? undefined : Number(longitude),
        timezoneOffsetMinutes: Number(timezoneOffset),
        houseSystem,
      };

      const res = await fetch('/api/astrology/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  // Safe body lookups (handles uppercase enum keys from calculation engine)
  const sunBody = result?.facts?.bodies?.SUN ?? result?.facts?.bodies?.sun;
  const moonBody = result?.facts?.bodies?.MOON ?? result?.facts?.bodies?.moon;
  const ascBody = result?.facts?.bodies?.ASCENDANT ?? result?.facts?.bodies?.ascendant;

  const sunSignKey = sunBody?.sign ?? 'LEO';
  const moonSignKey = moonBody?.sign ?? 'CANCER';

  const sunInterp = SUN_SIGN_INTERPRETATIONS[sunSignKey] ?? SUN_SIGN_INTERPRETATIONS.LEO;
  const moonInterp = MOON_SIGN_INTERPRETATIONS[moonSignKey] ?? MOON_SIGN_INTERPRETATIONS.CANCER;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
          <Compass className="w-4 h-4" />
          <span>Western Astrology Engine (VSOP87 / ELP2000)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Lập Lá Số Chiêm Tinh Học Tây Phương</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Tính toán tọa độ hành tinh chính xác đến từng cung vị, đỉnh cung nhà và các góc chiếu. Tự động chuyển đổi sang chế độ thoái hóa (Degraded Mode) an toàn nếu thiếu giờ sinh.
        </p>
      </div>

      {/* Main Grid: Form + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh (Dương Lịch)</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="unknownTime"
                checked={isTimeUnknown}
                onChange={(e) => setIsTimeUnknown(e.target.checked)}
                className="rounded border-borderDark text-accentGold focus:ring-accentGold"
              />
              <label htmlFor="unknownTime" className="text-xs text-gray-400 cursor-pointer select-none">
                Chưa rõ giờ sinh chính xác (Degraded Mode)
              </label>
            </div>

            {!isTimeUnknown && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Giờ Sinh (Giờ : Phút : Giây)</label>
                  <input
                    type="time"
                    step="1"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    required={!isTimeUnknown}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Vĩ Độ (Latitude)</label>
                    <input
                      type="number"
                      step="any"
                      value={latitude}
                      onChange={(e) => setLatitude(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Kinh Độ (Longitude)</label>
                    <input
                      type="number"
                      step="any"
                      value={longitude}
                      onChange={(e) => setLongitude(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Hệ Thống Nhà (House System)</label>
                  <select
                    value={houseSystem}
                    onChange={(e) => setHouseSystem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                  >
                    <option value="PLACIDUS">Placidus (Mặc định)</option>
                    <option value="WHOLE_SIGN">Whole Sign</option>
                    <option value="EQUAL">Equal</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Múi Giờ (Phút so với UTC)</label>
              <input
                type="number"
                value={timezoneOffset}
                onChange={(e) => setTimezoneOffset(Number(e.target.value))}
                placeholder="420 cho UTC+7"
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
              <span className="text-[11px] text-gray-500">420 phút = UTC+7 (Việt Nam)</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accentGold to-amber-600 text-background font-bold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang tính toán thiên văn...
                </>
              ) : (
                'Tính Toán Lá Số Chiêm Tinh'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Chart Results */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-3">
              <Compass className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-gray-400 font-medium">Chưa có kết quả</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Nhập thông tin ngày sinh và tọa độ để khởi chạy engine tính toán thiên văn VSOP87.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Degraded Alert if applicable */}
              {result.isDegraded && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    Chế độ thoái hóa an toàn (Degraded Mode) được kích hoạt
                  </div>
                  <ul className="list-disc list-inside text-amber-300/80 space-y-0.5 pl-1">
                    {result.degradationReasons?.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Clean verification badge with collapsible audit info */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200 font-medium">
                    Hệ thống tính toán thiên văn VSOP87 / ELP2000 (Tất Định & Tái Lập 100%)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAudit(!showAudit)}
                  className="text-gray-400 hover:text-accentGold text-[11px] transition-colors underline"
                >
                  {showAudit ? 'Ẩn thông số kỹ thuật' : 'Xem thông số kỹ thuật & Audit'}
                </button>
              </div>

              {showAudit && (
                <div className="p-3.5 rounded-xl bg-background/90 border border-borderDark/80 text-[11px] font-mono text-gray-400 space-y-1">
                  <div>Engine: WesternAstrology v{result.engineVersion} • House: {result.metadata?.houseSystem}</div>
                  <div>Config Version: {result.configVersion}</div>
                  <div>Input Hash (SHA-256): <span className="text-accentGold">{result.inputHash}</span></div>
                </div>
              )}

              {/* Planetary Positions */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Tọa Độ Hành Tinh & Thiên Thể</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    ({Object.keys(result.facts.bodies).length} thiên thể)
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Thiên Thể</th>
                        <th className="py-2.5 px-3">Cung Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Độ Cung</th>
                        <th className="py-2.5 px-3">Kinh Độ Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Nhà</th>
                        <th className="py-2.5 px-3">Nghịch Hành</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {Object.entries(result.facts.bodies).map(([bodyName, pos]: [string, any]) => (
                        <tr key={bodyName} className="hover:bg-surfaceHover/50">
                          <td className="py-2 px-3 font-semibold text-white capitalize">{bodyName}</td>
                          <td className="py-2 px-3 text-amber-300 font-medium">{ZODIAC_VN[pos.sign] ?? pos.sign}</td>
                          <td className="py-2 px-3 text-gray-300">{pos.signDegree?.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-400">{pos.longitude?.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-300">
                            {pos.houseNumber ? `Nhà ${pos.houseNumber}` : '—'}
                          </td>
                          <td className="py-2 px-3">
                            {pos.isRetrograde ? (
                              <span className="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30 text-[10px]">
                                Rx
                              </span>
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Houses (if available) */}
              {result.facts.houses && (
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Đỉnh 12 Cung Nhà ({result.metadata.houseSystem})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {result.facts.houses.map((h: any) => (
                      <div key={h.houseNumber} className="p-2.5 rounded-xl bg-background/60 border border-borderDark/60 text-xs">
                        <div className="text-gray-400 font-semibold">Nhà {h.houseNumber}</div>
                        <div className="text-amber-300 font-medium">{ZODIAC_VN[h.sign] ?? h.sign}</div>
                        <div className="text-[11px] text-gray-500">{h.cuspLongitude?.toFixed(2)}°</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Major Aspects */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Góc Chiếu Chính (Major Aspects)</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    {result.facts.aspects?.length ?? 0} góc chiếu
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Hành Tinh A</th>
                        <th className="py-2.5 px-3">Góc Chiếu</th>
                        <th className="py-2.5 px-3">Hành Tinh B</th>
                        <th className="py-2.5 px-3">Orb</th>
                        <th className="py-2.5 px-3">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {result.facts.aspects?.map((asp: any, idx: number) => (
                        <tr key={idx} className="hover:bg-surfaceHover/50">
                          <td className="py-2 px-3 font-semibold text-white capitalize">{asp.bodyA}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-accentGold font-medium">
                              {asp.aspectType}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-semibold text-white capitalize">{asp.bodyB}</td>
                          <td className="py-2 px-3 text-gray-300">{asp.orb?.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-400">
                            {asp.isApplying ? 'Applying' : 'Separating'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Luận Giải Chi Tiết Bản Đồ Sao Dành Cho Độc Giả */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accentGold" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Bản Mệnh & Năng Lượng Cốt Lõi</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accentGold/10 border border-accentGold/30 text-accentGold font-medium">
                    Hệ Thống Tropical Ephemeris
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Sun Sign Analysis */}
                  {sunBody && (
                    <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                          <Sun className="w-4 h-4 text-amber-400" />
                          <span>Mặt Trời tại {ZODIAC_VN[sunSignKey] ?? sunSignKey} ({sunBody.longitude?.toFixed(2)}°): Bản Sắc Ý Thức & Sứ Mệnh Cuộc Đời</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">Sun Sign</span>
                      </div>

                      <p className="text-sm text-gray-200 leading-relaxed">
                        {sunInterp.meaning}
                      </p>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                        <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dành Cho Người Không Chuyên):</span>
                        <p className="text-gray-200 leading-relaxed">
                          {sunInterp.layman}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                        <span className="font-semibold text-indigo-300 block">🔍 Cơ Chế Vận Hành (Nguyên Tố & Phẩm Chất):</span>
                        <p className="text-gray-300 leading-relaxed">
                          {sunInterp.mechanism}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                        <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                        <p className="text-emerald-200/90 leading-relaxed">
                          {sunInterp.advice}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                        <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                        <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Planets in Signs (Robert Hand)</strong> & <strong className="text-gray-200">The Inner Sky (Steven Forrest)</strong></span>
                      </div>
                    </div>
                  )}

                  {/* Moon Sign Analysis */}
                  {moonBody && (
                    <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                          <Moon className="w-4 h-4 text-indigo-400" />
                          <span>Mặt Trăng tại {ZODIAC_VN[moonSignKey] ?? moonSignKey} ({moonBody.longitude?.toFixed(2)}°): Thế Giới Tiềm Thức & Cảm Xúc Nội Tâm</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">Moon Sign</span>
                      </div>

                      <p className="text-sm text-gray-200 leading-relaxed">
                        {moonInterp.meaning}
                      </p>

                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                        <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn:</span>
                        <p className="text-gray-200 leading-relaxed">
                          {moonInterp.layman}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                        <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Cân Bằng Cảm Xúc:</span>
                        <p className="text-emerald-200/90 leading-relaxed">
                          {moonInterp.advice}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                        <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                        <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Planets in Signs - Luận Giải Vị Trí Mặt Trăng (Robert Hand)</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Guide for Users */}
      <section className="p-6 rounded-2xl bg-surface/70 border border-borderDark space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Cẩm Nang Giải Mã Các Thành Tố Trong Lá Số Chiêm Tinh Dành Cho Người Không Chuyên</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Mặt Trời, Mặt Trăng & Điểm Mọc</div>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Mặt Trời (Sun):</strong> Đại diện cho bản ngã cốt lõi, mục tiêu lý tưởng và nguồn sinh lực sống.
              <br />
              <strong className="text-white">Mặt Trăng (Moon):</strong> Phản ánh nhu cầu tiềm thức, cảm xúc sâu kín và thói quen bản năng.
              <br />
              <strong className="text-white">Điểm Mọc (Ascendant):</strong> Chiếc lăng kính qua đó bạn tiếp cận thế giới bên ngoài và ấn tượng đầu tiên bạn để lại cho người khác.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Hệ Thống 12 Cung Nhà (Houses)</div>
            <p className="text-gray-400 leading-relaxed">
              Mỗi cung nhà biểu thị một sân khấu cụ thể trong đời sống: Nhà 1 (Bản thân), Nhà 2 (Tài sản), Nhà 4 (Gia đình), Nhà 7 (Hôn nhân & Đối tác), Nhà 10 (Sự nghiệp & Danh vọng). Vị trí các hành tinh rơi vào nhà nào sẽ dồn năng lượng hoạt động vào lĩnh vực đó.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Ý Nghĩa Các Góc Chiếu (Aspects)</div>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Góc Hòa Hợp (Trine 120°, Sextile 60°):</strong> Dòng năng lượng trôi chảy thuận lợi, mang lại tài năng tự nhiên dễ phát huy.
              <br />
              <strong className="text-white">Góc Thử Thách (Square 90°, Opposition 180°):</strong> Tạo áp lực thúc đẩy sự trưởng thành và bài học rèn giũa ý chí kiên định.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
