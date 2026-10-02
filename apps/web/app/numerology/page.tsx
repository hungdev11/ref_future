'use client';

import React, { useState } from 'react';
import {
  Hash,
  Sparkles,
  BookOpen,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  User,
  Lightbulb,
  Compass,
  Award,
  X,
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

const LIFE_PATH_INTERPRETATIONS: Record<
  number,
  {
    title: string;
    meaning: string;
    layman: string;
    mechanism: string;
    advice: string;
    strengths: string;
    challenges: string;
  }
> = {
  1: {
    title: 'Người Tiên Phong Độc Lập',
    meaning:
      'Số 1 là con số của sự khởi xướng, tinh thần tiên phong và năng lực tự lập mạnh mẽ. Bạn sinh ra để tự mở lối và làm chủ vận mệnh của mình.',
    layman:
      'Bạn có cá tính rất tự lập, quyết đoán và ghét sự ỷ lại. Bạn thích tự mình đưa ra quyết định và có tố chất đứng đầu trong mọi việc.',
    mechanism:
      'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Năng lượng biểu thị bản ngã cá nhân độc lập và sức mạnh hành động trực tiếp.',
    advice:
      'Học cách lắng nghe và phối hợp với tập thể; giảm bớt tính hiếu thắng để trở thành một nhà lãnh đạo có sức thuyết phục và thu phục nhân tâm.',
    strengths: 'Ý chí kiên cường, dám chịu trách nhiệm, tư duy đột phá, quyết tâm cao.',
    challenges: 'Dễ độc đoán, khó chấp nhận ý kiến trái chiều hoặc tự cô lập mình khi gặp áp lực.',
  },
  2: {
    title: 'Người Sứ Giả Hòa Bình & Trực Giác',
    meaning:
      'Số 2 đại diện cho sự hòa giải, độ nhạy cảm tinh tế, trực giác sâu sắc và khát khao gắn kết hòa thuận giữa con người với con người.',
    layman:
      'Bạn giàu lòng trắc ẩn, biết lắng nghe, khéo léo trong ứng xử và rất quan tâm đến cảm xúc của đối phương. Bạn tạo cảm giác an tâm cho mọi người.',
    mechanism:
      'Nằm trên Trục Tâm Hồn (2-5-8) Pythagoras. Năng lượng tiếp nhận, thấu cảm và nhạy bén với những dòng chảy tâm lý vi tế.',
    advice:
      'Tự tin khẳng định tiếng nói của bản thân; học cách từ chối những đòi hỏi vô lý để tránh bị người khác lợi dụng lòng tốt.',
    strengths: 'Trực giác nhạy bén, khả năng lắng nghe tuyệt vời, tinh tế, hòa nhã.',
    challenges: 'Dễ xúc động, hay phụ thuộc cảm xúc vào người khác, sợ đối đầu và thiếu quyết đoán.',
  },
  3: {
    title: 'Người Truyền Cảm Hứng & Trí Tuệ',
    meaning:
      'Số 3 là con số của tư duy sắc sảo, năng lượng hài hước, tài năng ngôn ngữ và khả năng truyền cảm hứng sáng tạo tuyệt vời.',
    layman:
      'Bạn thông minh, hoạt ngôn, vui vẻ và có khả năng khuấy động không khí. Bạn tư duy rất nhanh và luôn có nhiều ý tưởng sáng tạo thú vị.',
    mechanism:
      'Thuộc Trục Thần Trí (3-6-9) Pythagoras. Đại diện cho bán cầu não trái năng động, tư duy phản biện và năng khiếu biểu đạt ngôn từ.',
    advice:
      'Duy trì sự tập trung và tính kỷ luật; kiên trì theo đuổi mục tiêu đến cùng thay vì dễ chán nản khi công việc bước vào giai đoạn lặp lại.',
    strengths: 'Hoạt ngôn, sáng tạo không giới hạn, lạc quan, truyền cảm hứng mạnh mẽ.',
    challenges: 'Dễ lan man thiếu kỷ luật, cảm xúc thất thường, hay bỏ dở giữa chừng.',
  },
  4: {
    title: 'Người Kiến Tạo Nền Tảng Kỷ Luật',
    meaning:
      'Số 4 biểu thị sự ổn định, kỷ luật, tư duy thực tế và tinh thần trách nhiệm bền vững. Bạn là điểm tựa đáng tin cậy trong mọi tổ chức.',
    layman:
      'Bạn làm việc rất cẩn thận, bài bản, trọng chữ tín và luôn có kế hoạch rõ ràng. Mọi người luôn yên tâm khi giao việc quan trọng cho bạn.',
    mechanism:
      'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Tượng trưng cho chiếc bàn 4 chân vững chãi, tính quy củ và sự quản trị thực tiễn.',
    advice:
      'Mở rộng góc nhìn linh hoạt trước những biến đổi bất ngờ; dành thời gian thư giãn và chăm sóc đời sống tinh thần bên cạnh công việc.',
    strengths: 'Đáng tin cậy, tỉ mỉ, kiên nhẫn, tổ chức khoa học, khả năng quản trị tài chính tốt.',
    challenges: 'Bảo thủ, cứng nhắc, sợ rủi ro mới và hay bị căng thẳng vì tiểu tiết.',
  },
  5: {
    title: 'Nhà Thám Hiểm Yêu Tự Do',
    meaning:
      'Số 5 đại diện cho sự tự do, năng lượng phiêu lưu, khả năng thích ứng siêu việt và khao khát trải nghiệm cuộc sống đa sắc màu.',
    layman:
      'Bạn năng động, yêu tự do, thích đi đây đi đó và rất ghét sự gò bó, nhàm chán. Bạn hòa nhập môi trường mới cực kỳ nhanh chóng.',
    mechanism:
      'Nằm tại tâm điểm của Trục Tâm Hồn (2-5-8) Pythagoras. Cầu nối giữa các trục năng lượng, biểu thị sự giải phóng và đổi mới liên tục.',
    advice:
      'Rèn luyện tính kiên định và định hướng dài hạn; tránh phân tán nguồn lực vào quá nhiều thú vui nhất thời để gặt hái thành quả thực chất.',
    strengths: 'Linh hoạt, thích nghi phi thường, giàu sức sống, dũng cảm khám phá.',
    challenges: 'Thiếu kiên nhẫn, dễ chán nản, bốc đồng và khó duy trì các cam kết lâu dài.',
  },
  6: {
    title: 'Người Nuôi Dưỡng & Trách Nhiệm Vô Điều Kiện',
    meaning:
      'Số 6 là con số của tình yêu thương gia đình, tinh thần trách nhiệm bảo bọc, mắt thẩm mỹ nghệ thuật và lòng nhân ái bao la.',
    layman:
      'Bạn là người giàu tình cảm, luôn lo lắng chu đáo cho người thân và bạn bè. Bạn yêu cái đẹp, thích chăm chút cho tổ ấm của mình.',
    mechanism:
      'Nằm trên Trục Thần Trí (3-6-9) Pythagoras. Đại diện cho sự sáng tạo kết hợp tình thương vô điều kiện và trách nhiệm cộng đồng.',
    advice:
      'Học cách buông bớt âu lo và kiểm soát; cho phép người khác tự chịu trách nhiệm về cuộc đời họ thay vì gánh vác thay tất cả.',
    strengths: 'Ấm áp, tận tụy, có năng khiếu thẩm mỹ, biết chở che và vun đắp gia đình.',
    challenges: 'Hay lo lắng thái quá, dễ bị cảm xúc chi phối, có xu hướng ôm đồm hy sinh quá mức.',
  },
  7: {
    title: 'Nhà Thông Thái & Triết Gia Chiêm Nghiệm',
    meaning:
      'Số 7 đại diện cho khao khát tìm kiếm chân lý, tư duy triết học sâu sắc và bài học trưởng thành thông qua những trải nghiệm thực tế.',
    layman:
      'Bạn là người thích tìm hiểu cội nguồn vấn đề, có chiều sâu nội tâm và thích không gian yên tĩnh. Bạn chỉ tin vào những gì bản thân đã kiểm chứng.',
    mechanism:
      'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Trải nghiệm thử thách cuộc đời để chuyển hóa thành tri thức và sự thấu suốt tâm linh.',
    advice:
      'Mở lòng chia sẻ tri thức và cảm xúc với mọi người; tránh xu hướng thu mình quá mức vào thế giới riêng biệt.',
    strengths: 'Tư duy phân tích sắc bén, trực giác nghiên cứu sâu, độc lập, hiểu biết rộng.',
    challenges: 'Đa nghi, khó mở lòng, dễ rơi vào trạng thái cô độc hoặc bi quan khi thất bại.',
  },
  8: {
    title: 'Nhà Lãnh Đạo Tự Chủ & Độc Lập Tài Chính',
    meaning:
      'Số 8 là con số của năng lực điều hành thực tiễn, bản lĩnh tài chính vững vàng và khả năng phục hồi thần kỳ sau những thử thách lớn.',
    layman:
      'Bạn có tầm nhìn kinh doanh thực tế, độc lập, có chí tiến thủ cao và luôn muốn tự mình xây dựng sự nghiệp thịnh vượng vững vàng.',
    mechanism:
      'Đỉnh cao của Trục Tâm Hồn (2-5-8) Pythagoras. Khả năng biến các ý tưởng và cảm xúc thành sức mạnh vật chất và năng lực điều hành thực tế.',
    advice:
      'Cân bằng giữa mục tiêu tài chính và sự đồng cảm; thể hiện sự ấm áp với những người thân thiết để thành công trọn vẹn hơn.',
    strengths: 'Bản lĩnh kinh doanh, nhạy bén tài chính, khả năng phục hồi cao, quyết liệt.',
    challenges: 'Dễ coi trọng vật chất thái quá, lạnh lùng, khó bộc lộ cảm xúc yêu thương.',
  },
  9: {
    title: 'Nhà Nhân Đạo & Hoài Bão Lớn',
    meaning:
      'Số 9 đại diện cho lý tưởng nhân văn, lòng vị tha, tinh thần cống hiến vì xã hội và trách nhiệm với cộng đồng rộng lớn.',
    layman:
      'Bạn có tấm lòng rộng mở, sống bao dung, thích giúp đỡ người yếu thế và luôn trăn trở về những giá trị tốt đẹp cho mọi người.',
    mechanism:
      'Đỉnh cao của Trục Thần Trí (3-6-9) Pythagoras. Con số tích hợp toàn bộ các phẩm chất của các số trước, hướng đến sự toàn bích tinh thần.',
    advice:
      'Kết hợp lý tưởng cao cả với hành động thực tế khả thi; học cách chăm sóc tốt nhu cầu cá nhân trước khi lo cho thiên hạ.',
    strengths: 'Bao dung, trách nhiệm xã hội cao, tầm nhìn rộng mở, giàu lòng nhân ái.',
    challenges: 'Dễ mơ mộng xa rời thực tế, cả tin, hay thất vọng khi người khác không như ý mình.',
  },
  11: {
    title: 'Bậc Thầy Trực Giác (Master Number 11)',
    meaning:
      'Số 11 là Master Number mang năng lượng trực giác siêu phàm, nhạy cảm tâm linh vượt trội và sứ mệnh dẫn đường tinh thần cho người khác.',
    layman:
      'Bạn có giác quan thứ sáu cực nhạy, dễ cảm nhận trước sự việc và luôn mong muốn mang lại ánh sáng chân lý, sự tích cực cho người xung quanh.',
    mechanism:
      'Master Number kết hợp năng lượng nhân đôi của số 1 và tính hòa giải của số 2. Cầu nối giữa thế giới ý niệm và hiện thực.',
    advice:
      'Học cách quản lý năng lượng cảm xúc để không bị quá tải; giữ vững lối sống cân bằng, hòa hợp giữa đời sống vật chất và tinh thần.',
    strengths: 'Trực giác tâm linh xuất chúng, khả năng soi sáng và truyền cảm hứng tinh thần.',
    challenges: 'Nhạy cảm quá mức, dễ bị kiệt quệ tinh thần nếu sống trong môi trường tiêu cực.',
  },
  22: {
    title: 'Bậc Thầy Kiến Tạo (Master Number 22)',
    meaning:
      'Số 22/4 là con số quyền năng nhất trong bản đồ Pythagoras, kết hợp tầm nhìn vĩ đại của trực giác với năng lực thực thi thực tế kiệt xuất.',
    layman:
      'Bạn có khả năng biến những giấc mơ lớn thành hiện thực cụ thể. Bạn có tư duy chiến lược tầm cỡ và năng lực tổ chức phi thường.',
    mechanism:
      'Master Number kết hợp năng lượng của hai số 2 với sự vững chãi của số 4. Tượng trưng cho nhà kiến trúc sư của xã hội tương lai.',
    advice:
      'Giữ vững sự thanh bạch và phụng sự nhân loại; chia nhỏ các dự án quy mô lớn để không bị áp lực đè nặng lên tinh thần.',
    strengths: 'Tầm nhìn chiến lược vĩ mô, khả năng hiện thực hóa các dự án lớn, ý chí thép.',
    challenges: 'Áp lực tự thân quá lớn, cầu toàn cực độ, dễ rơi vào trạng thái kiệt sức.',
  },
  33: {
    title: 'Bậc Thầy Nâng Đỡ Tinh Thần (Master Number 33)',
    meaning:
      'Số 33/6 là con số của lòng từ bi vô lượng, sứ mệnh giáo dục, chữa lành và nâng đỡ tâm hồn con người bằng tình yêu chân thực.',
    layman:
      'Bạn có nguồn năng lượng chữa lành tự nhiên, luôn muốn xoa dịu nỗi đau của người khác và hướng mọi người đến lối sống cao đẹp.',
    mechanism:
      'Master Number tối cao kết hợp năng lượng sáng tạo của số 3 và tình yêu phổ quát của số 6. Biểu tượng của sự hy sinh và lòng nhân đạo.',
    advice:
      'Biết cách tự chữa lành và nạp lại năng lượng cho bản thân; không gánh vác toàn bộ gánh nặng của thế giới một mình.',
    strengths: 'Tình yêu thương vô điều kiện, khả năng chữa lành tâm hồn, tư cách người thầy.',
    challenges: 'Dễ gánh vác bi kịch của người khác, bỏ quên bản thân dẫn đến tổn thương nội tâm.',
  },
};

const PERSONAL_YEAR_INTERPRETATIONS: Record<
  number,
  {
    theme: string;
    meaning: string;
    advice: string;
  }
> = {
  1: {
    theme: 'Khởi Đầu Mới & Gieo Hạt',
    meaning:
      'Năm số 1 là điểm khởi đầu của chu kỳ 9 năm mới. Đây là thời điểm tuyệt vời để bạn bắt đầu các dự án ấp ủ, đổi mới bản thân và mở ra hướng đi mới.',
    advice:
      'Chủ động nắm bắt cơ hội, tự tin bước ra khỏi vùng an toàn và kiên quyết hành động theo định hướng đã vạch ra.',
  },
  2: {
    theme: 'Nuôi Dưỡng & Phát Triển Trực Giác',
    meaning:
      'Năm số 2 thiên về sự lắng đọng, kiên nhẫn chăm sóc những gì đã gieo trồng ở năm 1, và xây dựng các mối quan hệ hợp tác hòa hợp.',
    advice:
      'Lắng nghe trực giác, trau dồi các mối liên kết đồng đội thân tình; tránh nóng vội gặt hái kết quả quá sớm.',
  },
  3: {
    theme: 'Mở Rộng Tư Duy & Học Hỏi Sáng Tạo',
    meaning:
      'Năm số 3 kích hoạt năng lượng thần trí, học thêm nhiều kiến thức mới, giao lưu mở rộng vòng bạn bè và thể hiện tài năng cá nhân.',
    advice:
      'Đầu tư cho các khóa học nâng cao kỹ năng, duy trì tinh thần lạc quan và tích cực chia sẻ ý tưởng với cộng đồng.',
  },
  4: {
    theme: 'Củng Cố Nền Tảng & Kỷ Luật',
    meaning:
      'Năm số 4 là năm của sự tái cơ cấu, siết chặt kỷ luật, củng cố sức khỏe thể chất và quản trị tài chính an toàn.',
    advice:
      'Tập trung hoàn thiện hệ thống, làm việc có phương pháp; tránh các quyết định đầu tư mạo hiểm thiếu căn cứ.',
  },
  5: {
    theme: 'Bứt Phá & Trải Nghiệm Mới',
    meaning:
      'Năm số 5 mang đến những làn gió thay đổi bất ngờ, giải phóng năng lượng cũ và đem lại nhiều chuyến đi hoặc cơ hội nghề nghiệp mới.',
    advice:
      'Linh hoạt đón nhận đổi mới, dám thử nghiệm cái mới nhưng giữ vững chuẩn mực cốt lõi của bản thân.',
  },
  6: {
    theme: 'Gia Đình, Trách Nhiệm & Yêu Thương',
    meaning:
      'Năm số 6 đặt trọng tâm vào việc chăm sóc gia đình, tổ ấm, củng cố các mối quan hệ tình cảm và hoàn thành các nghĩa vụ đối với người thân.',
    advice:
      'Dành nhiều thời gian chất lượng cho người thân, trang hoàng không gian sống và giải quyết dứt điểm các hiểu lầm bằng tình thương.',
  },
  7: {
    theme: 'Chiêm Nghiệm, Nâng Cao Chuyên Môn & Tĩnh Lặng',
    meaning:
      'Năm số 7 là thời gian để quay về bên trong, đúc kết bài học sau những trải nghiệm, củng cố nội lực và nâng cao chiều sâu tri thức.',
    advice:
      'Đọc sách, thiền định hoặc nghiên cứu chuyên sâu; học cách bình tâm trước những biến động bên ngoài.',
  },
  8: {
    theme: 'Thu Hoạch Thành Quả & Độc Lập Tài Chính',
    meaning:
      'Năm số 8 là năm của sự gặt hái vật chất, thăng tiến sự nghiệp và khẳng định vị thế điều hành sau nhiều năm nỗ lực.',
    advice:
      'Quản lý tài chính bài bản, quyết đoán mở rộng quy mô kinh doanh hoặc đề xuất tăng lương, thăng chức.',
  },
  9: {
    theme: 'Tổng Kết, Buông Bỏ & Chuẩn Bị Chu Kỳ Mới',
    meaning:
      'Năm số 9 khép lại chu kỳ 9 năm. Đây là thời điểm dọn dẹp những điều không còn phù hợp (thói quen xấu, mối quan hệ độc hại) và chuẩn bị tâm thế cho khởi đầu mới.',
    advice:
      'Học cách tha thứ, buông bỏ quá khứ và mở lòng đón nhận những vận hội tươi sáng của chu kỳ tiếp theo.',
  },
};

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [birthDate, setBirthDate] = useState('1992-05-15');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  // Modal State for clicked number
  const [selectedItem, setSelectedItem] = useState<{
    category: string;
    title: string;
    value: any;
    beginnerGuide: string;
    details: string;
    advice: string;
    strengths?: string;
    challenges?: string;
  } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedItem(null);

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

  const lifePathVal = Number(result?.facts?.core?.LIFE_PATH?.value ?? 0);
  const expressionVal = Number(result?.facts?.core?.EXPRESSION?.value ?? 0);
  const soulUrgeVal = Number(result?.facts?.core?.SOUL_URGE?.value ?? 0);
  const personalityVal = Number(result?.facts?.core?.PERSONALITY?.value ?? 0);
  const maturityVal = Number(result?.facts?.core?.MATURITY?.value ?? 0);
  const personalYearVal = Number(result?.facts?.cycles?.PERSONAL_YEAR?.value ?? 0);

  const lifePathInterp = LIFE_PATH_INTERPRETATIONS[lifePathVal] ?? {
    title: `Con Số Chủ Đạo ${lifePathVal}`,
    meaning: 'Năng lượng đặc thù chi phối con đường phát triển cá nhân của bạn.',
    layman: 'Bạn có những tố chất độc đáo đang chờ được khai phá và phát huy đúng môi trường.',
    mechanism: 'Tính toán theo chuẩn rút gọn tổng ngày tháng năm sinh Pythagoras.',
    advice: 'Lắng nghe trực giác và kiên trì rèn luyện bản lĩnh mỗi ngày.',
    strengths: 'Độc lập, kiên định, linh hoạt.',
    challenges: 'Cần duy trì sự cân bằng giữa nội tâm và ngoại cảnh.',
  };

  const personalYearInterp = PERSONAL_YEAR_INTERPRETATIONS[personalYearVal] ?? {
    theme: `Năm Cá Nhân Số ${personalYearVal}`,
    meaning: 'Giai đoạn chuyển biến trong chu kỳ 9 năm phát triển tự nhiên.',
    advice: 'Thuận theo tự nhiên và tập trung hoàn thành các mục tiêu quan trọng.',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Hash className="w-4 h-4" />
          <span>Hệ Thống Thần Số Học Pythagoras Tất Định (NUMEROLOGY_METHOD_V1)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tra Cứu Bản Đồ Số Học Pythagoras</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Giải mã tần số rung động từ họ tên và ngày sinh theo chuẩn phương Tây cổ điển. 
          <strong> Nhấn vào bất kỳ con số, đỉnh cao hay mũi tên nào để mở cửa sổ luận giải chi tiết và dễ hiểu nhất cho bạn.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Họ và Tên Đầy Đủ (Có Dấu hoặc Không Dấu)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Họ tên xác định Số Vận Mệnh, Số Linh Hồn và Số Nhân Cách.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh (Dương Lịch)</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Ngày sinh xác định Số Chủ Đạo, 4 Đỉnh Cao và Năm Cá Nhân.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              {loading ? 'Đang Tính Toán...' : 'Khám Phá Các Con Số'}
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
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              Hướng Dẫn Cho Người Mới
            </div>
            <p className="leading-relaxed text-[11px]">
              Mỗi con số đại diện cho một tầng ý nghĩa tâm lý và vận trình khác nhau. 
              <strong> Bạn chỉ cần nhấp vào bất kỳ thẻ con số nào</strong> để xem giải thích từ A-Z một cách đơn giản, dễ áp dụng.
            </p>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Hash className="w-14 h-14 text-gray-600 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-300">Bản Đồ Số Học Đang Chờ Bạn</h3>
                <p className="text-gray-400 text-xs max-w-md mx-auto">
                  Nhập họ tên và ngày sinh để tính toán các chỉ số cốt lõi, ma trận 3x3 ngày sinh và chu kỳ năm cá nhân.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className="p-4 rounded-xl bg-surface border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">
                    Bản đồ của: <strong className="text-white">{result.facts.normalizedName}</strong>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">
                    👉 Nhấn vào số để mở luận giải Popup
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTechnical(!showTechnical)}
                  className="text-gray-400 hover:text-emerald-400 text-[11px] transition-colors underline"
                >
                  {showTechnical ? 'Ẩn thông số' : 'Thông số kỹ thuật'}
                </button>
              </div>

              {showTechnical && (
                <div className="p-3.5 rounded-xl bg-background/90 border border-borderDark text-[11px] font-mono text-gray-400 space-y-1">
                  <div>Thuật toán: Pythagorean Standard v{result.engineVersion}</div>
                  <div>Input Hash: <span className="text-emerald-400">{result.inputHash}</span></div>
                  <div>Công thức Số Chủ Đạo: {result.facts?.core?.LIFE_PATH?.rawCalculation}</div>
                </div>
              )}

              {/* Core Numbers Cards (Clickable to open Popup) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* 1. Life Path */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'SỐ CHỦ ĐẠO (LIFE PATH)',
                      title: `Số Chủ Đạo ${lifePathVal}: ${lifePathInterp.title}`,
                      value: lifePathVal,
                      beginnerGuide:
                        'Số Chủ Đạo là con số quan trọng nhất trong Thần Số Học (chiếm khoảng 60% năng lượng). Nó đại diện cho con đường đời bạn đi, bài học định mệnh và phẩm chất cốt lõi gắn liền với bạn từ khi sinh ra.',
                      details: lifePathInterp.layman,
                      advice: lifePathInterp.advice,
                      strengths: lifePathInterp.strengths,
                      challenges: lifePathInterp.challenges,
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-emerald-500/60 space-y-2 shadow-lg shadow-emerald-500/10 cursor-pointer hover:scale-[1.02] hover:border-accentGold transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-emerald-300">
                      Số Chủ Đạo (Life Path)
                    </span>
                    {result.facts.core.LIFE_PATH?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-emerald-400 group-hover:text-accentGold transition-colors">
                    {lifePathVal}
                  </div>
                  <p className="text-xs text-gray-200 font-medium line-clamp-1">
                    {lifePathInterp.title}
                  </p>
                  <span className="text-[10px] text-accentGold block pt-1">
                    🔍 Nhấn xem luận giải chi tiết →
                  </span>
                </div>

                {/* 2. Expression */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'SỐ SỨ MỆNH / VẬN MỆNH (EXPRESSION)',
                      title: `Số Vận Mệnh ${expressionVal}: Tiềm Năng & Năng Lực Bẩm Sinh`,
                      value: expressionVal,
                      beginnerGuide:
                        'Số Vận Mệnh được tính từ toàn bộ chữ cái trong họ tên của bạn. Nó biểu thị các công cụ, tài năng thiên bẩm và phương thức bạn thể hiện mình ra với thế giới để hoàn thành sứ mệnh.',
                      details: `Bạn sở hữu nguồn năng lượng số ${expressionVal}. Đây là chìa khóa giúp bạn gặt hái thành công trong nghề nghiệp khi biết khai thác tối đa sở trường độc đáo của mình.`,
                      advice:
                        'Hãy tự tin ứng dụng năng khiếu bẩm sinh vào công việc hàng ngày; đừng ngần ngại đón nhận các thử thách mới.',
                      strengths: 'Khả năng hành động, sự sáng tạo và năng khiếu chuyên môn tự nhiên.',
                      challenges: 'Cần tránh việc tự ti hoặc lãng phí năng khiếu vào những việc không có mục tiêu rõ ràng.',
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2 cursor-pointer hover:scale-[1.02] hover:border-emerald-400 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-200">
                      Số Vận Mệnh (Expression)
                    </span>
                    {result.facts.core.EXPRESSION?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {expressionVal}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">Năng lực & tiềm năng tự nhiên</p>
                  <span className="text-[10px] text-emerald-400 block pt-1">Xem giải nghĩa →</span>
                </div>

                {/* 3. Soul Urge */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'SỐ LINH HỒN (SOUL URGE)',
                      title: `Số Linh Hồn ${soulUrgeVal}: Tiếng Nói Nội Tâm Thầm Kín`,
                      value: soulUrgeVal,
                      beginnerGuide:
                        'Số Linh Hồn được tính từ các nguyên âm trong họ tên (A, E, I, O, U, Y). Nó đại diện cho khao khát sâu kín nhất trong trái tim bạn — điều thực sự khiến bạn cảm thấy hạnh phúc và bình yên.',
                      details: `Năng lượng số ${soulUrgeVal} trong linh hồn thôi thúc bạn tìm kiếm sự an lạc, tình yêu chân thật và sự thỏa mãn tinh thần cao đẹp vượt lên trên giá trị vật chất đơn thuần.`,
                      advice:
                        'Dành không gian riêng tư cho tâm hồn; làm những điều bạn thực sự say mê thay vì chỉ chạy theo kỳ vọng của xã hội.',
                      strengths: 'Trực giác cảm xúc sâu sắc, chân thành, giàu lòng trắc ẩn.',
                      challenges: 'Dễ bị tổn thương nếu đặt lòng tin nhầm chỗ hoặc kìm nén cảm xúc quá lâu.',
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2 cursor-pointer hover:scale-[1.02] hover:border-indigo-400 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-200">
                      Linh Hồn (Soul Urge)
                    </span>
                    {result.facts.core.SOUL_URGE?.isMasterNumber && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-background">
                        MASTER
                      </span>
                    )}
                  </div>
                  <div className="text-4xl font-extrabold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                    {soulUrgeVal}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">Khát khao nội tâm sâu thẳm</p>
                  <span className="text-[10px] text-indigo-400 block pt-1">Xem giải nghĩa →</span>
                </div>

                {/* 4. Personality */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'SỐ NHÂN CÁCH (PERSONALITY)',
                      title: `Số Nhân Cách ${personalityVal}: Ấn Tượng Thể Hiện Ra Bên Ngoài`,
                      value: personalityVal,
                      beginnerGuide:
                        'Số Nhân Cách được tính từ các phụ âm trong họ tên. Nó giống như chiếc áo choàng bạn khoác lên khi giao tiếp với người ngoài — ấn tượng đầu tiên mà người khác cảm nhận về bạn.',
                      details: `Với số nhân cách ${personalityVal}, mọi người nhìn nhận bạn là một người có phong thái riêng biệt, đáng tin cậy và thu hút sự chú ý theo cách tự nhiên.`,
                      advice:
                        'Giữ sự chân thực và hòa đồng; dùng ấn tượng tốt đẹp này để xây dựng mạng lưới quan hệ công việc lành mạnh.',
                      strengths: 'Khéo léo trong giao tiếp, tạo dựng uy tín ban đầu nhanh chóng.',
                      challenges: 'Tránh để vỏ bọc bên ngoài che lấp cảm xúc chân thật bên trong.',
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2 cursor-pointer hover:scale-[1.02] hover:border-amber-400 transition-all group"
                >
                  <span className="text-xs font-semibold text-gray-400 block">Nhân Cách (Personality)</span>
                  <div className="text-3xl font-bold text-amber-400">{personalityVal}</div>
                  <p className="text-xs text-gray-400">Ấn tượng thể hiện bên ngoài</p>
                  <span className="text-[10px] text-amber-400 block pt-1">Xem giải nghĩa →</span>
                </div>

                {/* 5. Maturity */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'SỐ TRƯỞNG THÀNH (MATURITY)',
                      title: `Số Trưởng Thành ${maturityVal}: Vận Trình Sau Tuổi 40`,
                      value: maturityVal,
                      beginnerGuide:
                        'Số Trưởng Thành (tổng của Số Chủ Đạo + Số Vận Mệnh) bắt đầu phát huy sức mạnh rõ nét nhất từ sau tuổi 40. Nó cho biết hướng đi và đích đến viên mãn của bạn trong nửa sau cuộc đời.',
                      details: `Càng nhiều tuổi, nguồn năng lượng số ${maturityVal} càng giúp bạn chín chắn, vững vàng và gặt hái những quả ngọt từ sự nỗ lực kiên trì của tuổi trẻ.`,
                      advice:
                        'Tích lũy kinh nghiệm và sống có trách nhiệm với gia đình và xã hội để hưởng hậu vận an nhàn, thịnh vượng.',
                      strengths: 'Bề dày kinh nghiệm, sự thông thái và khả năng dẫn dắt thế hệ trẻ.',
                      challenges: 'Tránh cảm giác thỏa mãn quá sớm hoặc buông xuôi khi gặp biến cố trung niên.',
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-borderDark space-y-2 cursor-pointer hover:scale-[1.02] hover:border-teal-400 transition-all group"
                >
                  <span className="text-xs font-semibold text-gray-400 block">Trưởng Thành (Maturity)</span>
                  <div className="text-3xl font-bold text-teal-400">{maturityVal}</div>
                  <p className="text-xs text-gray-400">Xu hướng năng lượng sau 40 tuổi</p>
                  <span className="text-[10px] text-teal-400 block pt-1">Xem giải nghĩa →</span>
                </div>

                {/* 6. Personal Year */}
                <div
                  onClick={() =>
                    setSelectedItem({
                      category: 'NĂM CÁ NHÂN (PERSONAL YEAR)',
                      title: `Năm Cá Nhân Số ${personalYearVal}: ${personalYearInterp.theme}`,
                      value: personalYearVal,
                      beginnerGuide:
                        'Năm Cá Nhân tính theo chu kỳ 9 năm của đời người (tổng ngày sinh + tháng sinh + năm hiện tại). Mỗi năm mang một bài học và tần số riêng để bạn biết khi nào nên tấn công, khi nào nên phòng thủ.',
                      details: personalYearInterp.meaning,
                      advice: personalYearInterp.advice,
                      strengths: 'Hiểu rõ thời vận để đi đúng nhịp điệu của cuộc sống.',
                      challenges: 'Không nên đi ngược lại năng lượng của năm (ví dụ năm 7 mà đầu tư mạo hiểm dễ thất bại).',
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-indigo-500/50 space-y-2 cursor-pointer hover:scale-[1.02] hover:border-indigo-400 transition-all group"
                >
                  <span className="text-xs font-semibold text-indigo-300 block">Năm Cá Nhân (Personal Year)</span>
                  <div className="text-3xl font-bold text-indigo-400">{personalYearVal}</div>
                  <p className="text-xs text-gray-300 font-medium">{personalYearInterp.theme}</p>
                  <span className="text-[10px] text-indigo-400 block pt-1">Xem giải nghĩa thời vận →</span>
                </div>
              </div>

              {/* 4 Pinnacles Timeline (Clickable) */}
              {result.facts.pinnacles && (
                <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      4 Giai Đoạn Đỉnh Cao Cuộc Đời (Pinnacles)
                    </h3>
                    <span className="text-[11px] text-emerald-400">Nhấn vào từng đỉnh để xem chi tiết</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {result.facts.pinnacles.map((p: any) => (
                      <div
                        key={p.pinnacleNumber}
                        onClick={() =>
                          setSelectedItem({
                            category: `ĐỈNH CAO SỐ ${p.pinnacleNumber}`,
                            title: `Giai Đoạn Đỉnh Cao ${p.pinnacleNumber}: Mang Năng Lượng Số ${p.value}`,
                            value: p.value,
                            beginnerGuide:
                              'Đỉnh cao đời người là 4 giai đoạn nở rộ thành tựu lớn nhất trong cuộc đời bạn. Mỗi đỉnh cao kéo dài khoảng 9 năm, mang lại những cơ hội và bài học đặc thù.',
                            details: `Trong độ tuổi từ ${p.startAge} đến ${p.endAge} tuổi, bạn đón nhận tần số rung động của số ${p.value}. Đây là cơ hội để bạn đạt được bước ngoặt lớn về sự nghiệp và tài chính.`,
                            advice:
                              'Tận dụng tối đa giai đoạn này để gieo trồng và thu hoạch; kiên trì theo đuổi các mục tiêu dài hạn.',
                          })
                        }
                        className="p-4 rounded-xl bg-background/60 border border-borderDark/60 text-center space-y-1 cursor-pointer hover:border-accentGold hover:scale-[1.02] transition-all"
                      >
                        <span className="text-[11px] text-gray-400">Đỉnh {p.pinnacleNumber}</span>
                        <div className="text-2xl font-bold text-emerald-400">{p.value}</div>
                        <span className="text-[11px] text-gray-300 block">
                          {p.startAge} - {p.endAge} tuổi
                        </span>
                        <span className="text-[10px] text-accentGold block">Chi tiết →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* POPUP / MODAL: COMPREHENSIVE NUMEROLOGY ITEM INTERPRETATION */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-emerald-500/50 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-2xl">
                  {selectedItem.value}
                </div>
                <div>
                  <span className="text-xs px-2 py-0.5 rounded bg-background border border-borderDark text-emerald-400 font-bold uppercase">
                    {selectedItem.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                    {selectedItem.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
                title="Đóng popup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              {/* Beginner Guide */}
              <div className="p-5 rounded-2xl bg-background/80 border border-borderDark space-y-2 text-xs">
                <div className="font-bold text-accentGold text-sm flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Giải Thích Thuật Ngữ Cho Người Mới Bắt Đầu:</span>
                </div>
                <p className="text-gray-200 leading-relaxed text-sm">
                  {selectedItem.beginnerGuide}
                </p>
              </div>

              {/* Core Details */}
              <div className="p-5 rounded-2xl bg-surface border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Ý Nghĩa Thực Tế Cho Cuộc Sống Của Bạn:</span>
                </div>
                <p className="text-gray-100 leading-relaxed text-sm">
                  {selectedItem.details}
                </p>
              </div>

              {/* Strengths & Challenges if present */}
              {(selectedItem.strengths || selectedItem.challenges) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {selectedItem.strengths && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                      <span className="font-semibold text-emerald-300 block">✨ Điểm Mạnh Vượt Trội:</span>
                      <p className="text-emerald-100 leading-relaxed">{selectedItem.strengths}</p>
                    </div>
                  )}

                  {selectedItem.challenges && (
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                      <span className="font-semibold text-amber-300 block">⚠️ Điểm Cần Cân Bằng / Khắc Phục:</span>
                      <p className="text-amber-100 leading-relaxed">{selectedItem.challenges}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Practical Advice */}
              <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2 text-xs">
                <div className="font-bold text-indigo-300 text-sm flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  <span>🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                </div>
                <p className="text-indigo-100 leading-relaxed text-sm">
                  {selectedItem.advice}
                </p>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-background font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Đã Hiểu & Đóng Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
