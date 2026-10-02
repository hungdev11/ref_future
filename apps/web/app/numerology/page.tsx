'use client';

import React, { useState } from 'react';
import { Hash, Sparkles, BookOpen, AlertTriangle, ShieldCheck, Calendar, User, Lightbulb, Compass, Award } from 'lucide-react';

const LIFE_PATH_INTERPRETATIONS: Record<number, {
  title: string;
  meaning: string;
  layman: string;
  mechanism: string;
  advice: string;
}> = {
  1: {
    title: 'Người Tiên Phong Độc Lập',
    meaning: 'Số 1 là con số của sự khởi xướng, tinh thần tiên phong và năng lực tự lập mạnh mẽ. Bạn sinh ra để tự mở lối và làm chủ vận mệnh của mình.',
    layman: 'Bạn có cá tính rất tự lập, quyết đoán và ghét sự ỷ lại. Bạn thích tự mình đưa ra quyết định và có tố chất đứng đầu trong mọi việc.',
    mechanism: 'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Năng lượng biểu thị bản ngã cá nhân độc lập và sức mạnh hành động trực tiếp.',
    advice: 'Học cách lắng nghe và phối hợp với tập thể; giảm bớt tính hiếu thắng để trở thành một nhà lãnh đạo có sức thuyết phục và thu phục nhân tâm.',
  },
  2: {
    title: 'Người Sứ Giả Hòa Bình & Trực Giác',
    meaning: 'Số 2 đại diện cho sự hòa giải, độ nhạy cảm tinh tế, trực giác sâu sắc và khát khao gắn kết hòa thuận giữa con người với con người.',
    layman: 'Bạn giàu lòng trắc ẩn, biết lắng nghe, khéo léo trong ứng xử và rất quan tâm đến cảm xúc của đối phương. Bạn tạo cảm giác an tâm cho mọi người.',
    mechanism: 'Nằm trên Trục Tâm Hồn (2-5-8) Pythagoras. Năng lượng tiếp nhận, thấu cảm và nhạy bén với những dòng chảy tâm lý vi tế.',
    advice: 'Tự tin khẳng định tiếng nói của bản thân; học cách từ chối những đòi hỏi vô lý để tránh bị người khác lợi dụng lòng tốt.',
  },
  3: {
    title: 'Người Truyền Cảm Hứng & Trí Tuệ',
    meaning: 'Số 3 là con số của tư duy sắc sảo, năng lượng hài hước, tài năng ngôn ngữ và khả năng truyền cảm hứng sáng tạo tuyệt vời.',
    layman: 'Bạn thông minh, hoạt ngôn, vui vẻ và có khả năng khuấy động không khí. Bạn tư duy rất nhanh và luôn có nhiều ý tưởng sáng tạo thú vị.',
    mechanism: 'Thuộc Trục Thần Trí (3-6-9) Pythagoras. Đại diện cho bán cầu não trái năng động, tư duy phản biện và năng khiếu biểu đạt ngôn từ.',
    advice: 'Duy trì sự tập trung và tính kỷ luật; kiên trì theo đuổi mục tiêu đến cùng thay vì dễ chán nản khi công việc bước vào giai đoạn lặp lại.',
  },
  4: {
    title: 'Người Kiến Tạo Nền Tảng Kỷ Luật',
    meaning: 'Số 4 biểu thị sự ổn định, kỷ luật, tư duy thực tế và tinh thần trách nhiệm bền vững. Bạn là điểm tựa đáng tin cậy trong mọi tổ chức.',
    layman: 'Bạn làm việc rất cẩn thận, bài bản, trọng chữ tín và luôn có kế hoạch rõ ràng. Mọi người luôn yên tâm khi giao việc quan trọng cho bạn.',
    mechanism: 'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Tượng trưng cho chiếc bàn 4 chân vững chãi, tính quy củ và sự quản trị thực tiễn.',
    advice: 'Mở rộng góc nhìn linh hoạt trước những biến đổi bất ngờ; dành thời gian thư giãn và chăm sóc đời sống tinh thần bên cạnh công việc.',
  },
  5: {
    title: 'Nhà Thám Hiểm Yêu Tự Do',
    meaning: 'Số 5 đại diện cho sự tự do, năng lượng phiêu lưu, khả năng thích ứng siêu việt và khao khát trải nghiệm cuộc sống đa sắc màu.',
    layman: 'Bạn năng động, yêu tự do, thích đi đây đi đó và rất ghét sự gò bó, nhàm chán. Bạn hòa nhập môi trường mới cực kỳ nhanh chóng.',
    mechanism: 'Nằm tại tâm điểm của Trục Tâm Hồn (2-5-8) Pythagoras. Cầu nối giữa các trục năng lượng, biểu thị sự giải phóng và đổi mới liên tục.',
    advice: 'Rèn luyện tính kiên định và định hướng dài hạn; tránh phân tán nguồn lực vào quá nhiều thú vui nhất thời để gặt hái thành quả thực chất.',
  },
  6: {
    title: 'Người Nuôi Dưỡng & Trách Nhiệm Vô Điều Kiện',
    meaning: 'Số 6 là con số của tình yêu thương gia đình, tinh thần trách nhiệm bảo bọc, mắt thẩm mỹ nghệ thuật và lòng nhân ái bao la.',
    layman: 'Bạn là người giàu tình cảm, luôn lo lắng chu đáo cho người thân và bạn bè. Bạn yêu cái đẹp, thích chăm chút cho tổ ấm của mình.',
    mechanism: 'Nằm trên Trục Thần Trí (3-6-9) Pythagoras. Đại diện cho sự sáng tạo kết hợp tình thương vô điều kiện và trách nhiệm cộng đồng.',
    advice: 'Học cách buông bớt âu lo và kiểm soát; cho phép người khác tự chịu trách nhiệm về cuộc đời họ thay vì gánh vác thay tất cả.',
  },
  7: {
    title: 'Nhà Thông Thái & Triết Gia Chiêm Nghiệm',
    meaning: 'Số 7 đại diện cho khao khát tìm kiếm chân lý, tư duy triết học sâu sắc và bài học trưởng thành thông qua những trải nghiệm thực tế.',
    layman: 'Bạn là người thích tìm hiểu cội nguồn vấn đề, có chiều sâu nội tâm và thích không gian yên tĩnh. Bạn chỉ tin vào những gì bản thân đã kiểm chứng.',
    mechanism: 'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Trải nghiệm thử thách cuộc đời để chuyển hóa thành tri thức và sự thấu suốt tâm linh.',
    advice: 'Mở lòng chia sẻ tri thức và cảm xúc với mọi người; tránh xu hướng thu mình quá mức vào thế giới riêng biệt.',
  },
  8: {
    title: 'Nhà Lãnh Đạo Tự Chủ & Độc Lập Tài Chính',
    meaning: 'Số 8 là con số của năng lực điều hành thực tiễn, bản lĩnh tài chính vững vàng và khả năng phục hồi thần kỳ sau những thử thách lớn.',
    layman: 'Bạn có tầm nhìn kinh doanh thực tế, độc lập, có chí tiến thủ cao và luôn muốn tự mình xây dựng sự nghiệp thịnh vượng vững vàng.',
    mechanism: 'Đỉnh cao của Trục Tâm Hồn (2-5-8) Pythagoras. Khả năng biến các ý tưởng và cảm xúc thành sức mạnh vật chất và năng lực điều hành thực tế.',
    advice: 'Cân bằng giữa mục tiêu tài chính và sự đồng cảm; thể hiện sự ấm áp với những người thân thiết để thành công trọn vẹn hơn.',
  },
  9: {
    title: 'Nhà Nhân Đạo & Hoài Bão Lớn',
    meaning: 'Số 9 đại diện cho lý tưởng nhân văn, lòng vị tha, tinh thần cống hiến vì xã hội và trách nhiệm với cộng đồng rộng lớn.',
    layman: 'Bạn có tấm lòng rộng mở, sống bao dung, thích giúp đỡ người yếu thế và luôn trăn trở về những giá trị tốt đẹp cho mọi người.',
    mechanism: 'Đỉnh cao của Trục Thần Trí (3-6-9) Pythagoras. Con số tích hợp toàn bộ các phẩm chất của các số trước, hướng đến sự toàn bích tinh thần.',
    advice: 'Kết hợp lý tưởng cao cả với hành động thực tế khả thi; học cách chăm sóc tốt nhu cầu cá nhân trước khi lo cho thiên hạ.',
  },
  11: {
    title: 'Bậc Thầy Trực Giác (Master Number 11)',
    meaning: 'Số 11 là Master Number mang năng lượng trực giác siêu phàm, nhạy cảm tâm linh vượt trội và sứ mệnh dẫn đường tinh thần cho người khác.',
    layman: 'Bạn có giác quan thứ sáu cực nhạy, dễ cảm nhận trước sự việc và luôn mong muốn mang lại ánh sáng chân lý, sự tích cực cho người xung quanh.',
    mechanism: 'Master Number kết hợp năng lượng nhân đôi của số 1 và tính hòa giải của số 2. Cầu nối giữa thế giới ý niệm và hiện thực.',
    advice: 'Học cách quản lý năng lượng cảm xúc để không bị quá tải; giữ vững lối sống cân bằng, hòa hợp giữa đời sống vật chất và tinh thần.',
  },
  22: {
    title: 'Bậc Thầy Kiến Tạo (Master Number 22)',
    meaning: 'Số 22/4 là con số quyền năng nhất trong bản đồ Pythagoras, kết hợp tầm nhìn vĩ đại của trực giác với năng lực thực thi thực tế kiệt xuất.',
    layman: 'Bạn có khả năng biến những giấc mơ lớn thành hiện thực cụ thể. Bạn có tư duy chiến lược tầm cỡ và năng lực tổ chức phi thường.',
    mechanism: 'Master Number kết hợp năng lượng của hai số 2 với sự vững chãi của số 4. Tượng trưng cho nhà kiến trúc sư của xã hội tương lai.',
    advice: 'Giữ vững sự thanh bạch và phụng sự nhân loại; chia nhỏ các dự án quy mô lớn để không bị áp lực đè nặng lên tinh thần.',
  },
  33: {
    title: 'Bậc Thầy Nâng Đỡ Tinh Thần (Master Number 33)',
    meaning: 'Số 33/6 là con số của lòng từ bi vô lượng, sứ mệnh giáo dục, chữa lành và nâng đỡ tâm hồn con người bằng tình yêu chân thực.',
    layman: 'Bạn có nguồn năng lượng chữa lành tự nhiên, luôn muốn xoa dịu nỗi đau của người khác và hướng mọi người đến lối sống cao đẹp.',
    mechanism: 'Master Number tối cao kết hợp năng lượng sáng tạo của số 3 và tình yêu phổ quát của số 6. Biểu tượng của sự hy sinh và lòng nhân đạo.',
    advice: 'Biết cách tự chữa lành và nạp lại năng lượng cho bản thân; không gánh vác toàn bộ gánh nặng của thế giới một mình.',
  },
};

const PERSONAL_YEAR_INTERPRETATIONS: Record<number, {
  theme: string;
  meaning: string;
  advice: string;
}> = {
  1: {
    theme: 'Khởi Đầu Mới & Gieo Hạt',
    meaning: 'Năm số 1 là điểm khởi đầu của chu kỳ 9 năm mới. Đây là thời điểm tuyệt vời để bạn bắt đầu các dự án ấp ủ, đổi mới bản thân và mở ra hướng đi mới.',
    advice: 'Chủ động nắm bắt cơ hội, tự tin bước ra khỏi vùng an toàn và kiên quyết hành động theo định hướng đã vạch ra.',
  },
  2: {
    theme: 'Nuôi Dưỡng & Phát Triển Trực Giác',
    meaning: 'Năm số 2 thiên về sự lắng đọng, kiên nhẫn chăm sóc những gì đã gieo trồng ở năm 1, và xây dựng các mối quan hệ hợp tác hòa hợp.',
    advice: 'Lắng nghe trực giác, trau dồi các mối liên kết đồng đội thân tình; tránh nóng vội gặt hái kết quả quá sớm.',
  },
  3: {
    theme: 'Mở Rộng Tư Duy & Học Hỏi Sáng Tạo',
    meaning: 'Năm số 3 kích hoạt năng lượng thần trí, học thêm nhiều kiến thức mới, giao lưu mở rộng vòng bạn bè và thể hiện tài năng cá nhân.',
    advice: 'Đầu tư cho các khóa học nâng cao kỹ năng, duy trì tinh thần lạc quan và tích cực chia sẻ ý tưởng với cộng đồng.',
  },
  4: {
    theme: 'Củng Cố Nền Tảng & Kỷ Luật',
    meaning: 'Năm số 4 là năm của sự tái cơ cấu, siết chặt kỷ luật, củng cố sức khỏe thể chất và quản trị tài chính an toàn.',
    advice: 'Tập trung hoàn thiện hệ thống, làm việc có phương pháp; tránh các quyết định đầu tư mạo hiểm thiếu căn cứ.',
  },
  5: {
    theme: 'Bứt Phá & Trải Nghiệm Mới',
    meaning: 'Năm số 5 mang đến những làn gió thay đổi bất ngờ, giải phóng năng lượng cũ và đem lại nhiều chuyến đi hoặc cơ hội nghề nghiệp mới.',
    advice: 'Linh hoạt đón nhận đổi mới, dám thử nghiệm cái mới nhưng giữ vững chuẩn mực cốt lõi của bản thân.',
  },
  6: {
    theme: 'Gia Đình, Trách Nhiệm & Yêu Thương',
    meaning: 'Năm số 6 đặt trọng tâm vào việc chăm sóc gia đình, tổ ấm, củng cố các mối quan hệ tình cảm và hoàn thành các nghĩa vụ đối với người thân.',
    advice: 'Dành nhiều thời gian chất lượng cho người thân, trang hoàng không gian sống và giải quyết dứt điểm các hiểu lầm bằng tình thương.',
  },
  7: {
    theme: 'Chiêm Nghiệm, Nâng Cao Chuyên Môn & Tĩnh Lặng',
    meaning: 'Năm số 7 là thời gian để quay về bên trong, đúc kết bài học sau những trải nghiệm, củng cố nội lực và nâng cao chiều sâu tri thức.',
    advice: 'Đọc sách, thiền định hoặc nghiên cứu chuyên sâu; học cách bình tâm trước những biến động bên ngoài.',
  },
  8: {
    theme: 'Thu Hoạch Thành Quả & Độc Lập Tài Chính',
    meaning: 'Năm số 8 là năm của sự nở rộ về thành tựu vật chất, độc lập tài chính và sự khẳng định vị thế cá nhân sau nhiều năm nỗ lực.',
    advice: 'Quyết đoán trong các quyết định kinh doanh, quản trị dòng tiền hiệu quả và chia sẻ sự thịnh vượng với những người xứng đáng.',
  },
  9: {
    theme: 'Hoàn Tất Chu Kỳ, Thanh Lọc & Bao Dung',
    meaning: 'Năm số 9 là chặng cuối của chu kỳ tiến hóa 9 năm. Đây là thời điểm thanh lọc những điều đã lỗi thời để chuẩn bị tâm thế đón chào chu kỳ mới.',
    advice: 'Học cách buông bỏ những oán hận cũ, tham gia các hoạt động thiện nguyện xã hội và chuẩn bị tâm thế sẵn sàng cho chu kỳ mới rực rỡ.',
  },
};

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

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

  // Safe fact lookups
  const lifePathVal = Number(result?.facts?.core?.LIFE_PATH?.value ?? result?.facts?.core?.life_path?.value ?? 1);
  const expressionVal = Number(result?.facts?.core?.EXPRESSION?.value ?? result?.facts?.core?.expression?.value ?? 1);
  const soulUrgeVal = Number(result?.facts?.core?.SOUL_URGE?.value ?? result?.facts?.core?.soul_urge?.value ?? 1);
  const personalityVal = Number(result?.facts?.core?.PERSONALITY?.value ?? result?.facts?.core?.personality?.value ?? 1);
  const maturityVal = Number(result?.facts?.core?.MATURITY?.value ?? result?.facts?.core?.maturity?.value ?? 1);
  
  // Safe personal year lookup (handles core.PERSONAL_YEAR or fallback)
  const personalYearVal = Number(
    result?.facts?.core?.PERSONAL_YEAR?.value ??
    result?.facts?.core?.personal_year?.value ??
    result?.dotNotatedFacts?.['numerology.cycles.personal_year.value'] ??
    1
  );

  const lifePathInterp = LIFE_PATH_INTERPRETATIONS[lifePathVal] ?? LIFE_PATH_INTERPRETATIONS[1];
  const personalYearInterp = PERSONAL_YEAR_INTERPRETATIONS[personalYearVal] ?? PERSONAL_YEAR_INTERPRETATIONS[1];

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
              {/* Name & Verification Banner */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">
                    Họ tên: <strong className="text-white">{result.facts.normalizedName}</strong> ({result.metadata.vowelCount} nguyên âm, {result.metadata.consonantCount} phụ âm)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTechnical(!showTechnical)}
                  className="text-gray-400 hover:text-emerald-400 text-[11px] transition-colors underline"
                >
                  {showTechnical ? 'Ẩn thông số kỹ thuật' : 'Xem công thức & thông số'}
                </button>
              </div>

              {showTechnical && (
                <div className="p-3.5 rounded-xl bg-background/90 border border-borderDark text-[11px] font-mono text-gray-400 space-y-1">
                  <div>Engine: Pythagorean Numerology v{result.engineVersion}</div>
                  <div>Input Hash (SHA-256): <span className="text-emerald-400">{result.inputHash}</span></div>
                  <div>Công thức Số Chủ Đạo: {result.facts?.core?.LIFE_PATH?.rawCalculation}</div>
                </div>
              )}

              {/* Core Numbers Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Life Path */}
                <div className="p-5 rounded-2xl bg-surface border border-emerald-500/50 space-y-2 shadow-lg shadow-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Chủ Đạo (Life Path)</span>
                    {result.facts.core.LIFE_PATH?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400">
                    {lifePathVal}
                  </div>
                  <p className="text-xs text-gray-300 font-medium">
                    {lifePathInterp.title}
                  </p>
                </div>

                {/* Expression */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Số Vận Mệnh (Expression)</span>
                    {result.facts.core.EXPRESSION?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-white">
                    {expressionVal}
                  </div>
                  <p className="text-xs text-gray-400">
                    Năng lực & tiềm năng tự nhiên
                  </p>
                </div>

                {/* Soul Urge */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Linh Hồn (Soul Urge)</span>
                    {result.facts.core.SOUL_URGE?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-indigo-400">
                    {soulUrgeVal}
                  </div>
                  <p className="text-xs text-gray-400">
                    Khát khao nội tâm sâu thẳm
                  </p>
                </div>

                {/* Personality */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Nhân Cách (Personality)</span>
                  <div className="text-3xl font-bold text-amber-400">{personalityVal}</div>
                  <p className="text-xs text-gray-400">Ấn tượng thể hiện bên ngoài</p>
                </div>

                {/* Maturity */}
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2">
                  <span className="text-xs font-semibold text-gray-400 block">Trưởng Thành (Maturity)</span>
                  <div className="text-3xl font-bold text-teal-400">{maturityVal}</div>
                  <p className="text-xs text-gray-400">Xu hướng năng lượng sau 40 tuổi</p>
                </div>

                {/* Personal Year */}
                <div className="p-5 rounded-2xl bg-surface border border-indigo-500/40 space-y-2">
                  <span className="text-xs font-semibold text-indigo-300 block">Năm Cá Nhân (Personal Year)</span>
                  <div className="text-3xl font-bold text-indigo-400">{personalYearVal}</div>
                  <p className="text-xs text-gray-400">{personalYearInterp.theme}</p>
                </div>
              </div>

              {/* 4 Pinnacles Timeline */}
              {result.facts.pinnacles && (
                <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    4 Giai Đoạn Đỉnh Cao Cuộc Đời (Pinnacles)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {result.facts.pinnacles.map((p: any) => (
                      <div key={p.pinnacleNumber} className="p-4 rounded-xl bg-background/50 border border-borderDark/60 text-center space-y-1">
                        <span className="text-[11px] text-gray-400">Đỉnh {p.pinnacleNumber}</span>
                        <div className="text-2xl font-bold text-emerald-400">{p.value}</div>
                        <span className="text-[11px] text-gray-500 block">
                          {p.startAge} - {p.endAge} tuổi
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      <span>🌟 Con Số Chủ Đạo {lifePathVal}: {lifePathInterp.title} - Sứ Mệnh Cuộc Đời & Năng Lực Cốt Lõi</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {lifePathInterp.meaning}
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dành Cho Người Không Chuyên):</span>
                      <p className="text-gray-200 leading-relaxed">
                        {lifePathInterp.layman}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">🔍 Cơ Chế Vận Hành (Trục Năng Lượng Pythagoras):</span>
                      <p className="text-gray-300 leading-relaxed">
                        {lifePathInterp.mechanism}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        {lifePathInterp.advice}
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
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>📅 Năm Cá Nhân (Personal Year {personalYearVal}): {personalYearInterp.theme} - Chu Kỳ 9 Năm & Thời Vận</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {personalYearInterp.meaning}
                    </p>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Định Hướng Hành Động Cho Năm Nay:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        {personalYearInterp.advice}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">The Complete Book of Numerology - Chương Chu Kỳ 9 Năm Cá Nhân (Dr. David A. Phillips)</strong></span>
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
