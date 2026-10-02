'use client';

import React, { useState } from 'react';
import { Hash, Sparkles, AlertTriangle, ShieldCheck, Calendar, User, Lightbulb, Compass, Award, CheckCircle2, TrendingUp, Grid } from 'lucide-react';

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

// Compute 3x3 birth chart grid & arrows
function calculateBirthChartGrid(birthDate: string): {
  counts: Record<number, number>;
  activeArrows: Array<{ name: string; meaning: string; positive: boolean }>;
} {
  const digits = birthDate.replace(/[^1-9]/g, '').split('').map(Number);
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  for (const d of digits) {
    if (d >= 1 && d <= 9) counts[d]++;
  }

  const activeArrows: Array<{ name: string; meaning: string; positive: boolean }> = [];

  // 1-2-3 Arrow of Planning
  if (counts[1] > 0 && counts[2] > 0 && counts[3] > 0) {
    activeArrows.push({ name: 'Mũi Tên Kế Hoạch (1-2-3)', meaning: 'Tư duy có trật tự, làm việc bài bản, giỏi tổ chức và kiểm soát tiến độ.', positive: true });
  } else if (counts[1] === 0 && counts[2] === 0 && counts[3] === 0) {
    activeArrows.push({ name: 'Mũi Tên Trống Hỗn Loạn (Thiếu 1-2-3)', meaning: 'Dễ làm việc tùy hứng, cần rèn luyện thói quen lập kế hoạch trước khi hành động.', positive: false });
  }

  // 4-5-6 Arrow of Willpower
  if (counts[4] > 0 && counts[5] > 0 && counts[6] > 0) {
    activeArrows.push({ name: 'Mũi Tên Ý Chí (4-5-6)', meaning: 'Ý chí kiên định, bản lĩnh vững vàng, không chùn bước trước nghịch cảnh.', positive: true });
  }

  // 7-8-9 Arrow of Activity
  if (counts[7] > 0 && counts[8] > 0 && counts[9] > 0) {
    activeArrows.push({ name: 'Mũi Tên Hoạt Động (7-8-9)', meaning: 'Năng động, giàu năng lượng hành động, thích đi đây đi đó khám phá.', positive: true });
  }

  // 1-4-7 Arrow of Practicality
  if (counts[1] > 0 && counts[4] > 0 && counts[7] > 0) {
    activeArrows.push({ name: 'Mũi Tên Thực Tế (1-4-7)', meaning: 'Khéo léo, thực tế, chỉ tin vào những kết quả cụ thể có thể sờ thấy được.', positive: true });
  }

  // 2-5-8 Arrow of Emotional Balance
  if (counts[2] > 0 && counts[5] > 0 && counts[8] > 0) {
    activeArrows.push({ name: 'Mũi Tên Cân Bằng Cảm Xúc (2-5-8)', meaning: 'Trực giác nhạy bén, tâm lý vững vàng, biết thấu cảm và sẻ chia với người khác.', positive: true });
  }

  // 3-6-9 Arrow of Intellect
  if (counts[3] > 0 && counts[6] > 0 && counts[9] > 0) {
    activeArrows.push({ name: 'Mũi Tên Trí Tuệ (3-6-9)', meaning: 'Tư duy logic nhạy bén, trí nhớ tốt và khả năng tiếp thu tri thức nhanh chóng.', positive: true });
  }

  // 1-5-9 Arrow of Determination
  if (counts[1] > 0 && counts[5] > 0 && counts[9] > 0) {
    activeArrows.push({ name: 'Mũi Tên Quyết Tâm (1-5-9)', meaning: 'Kiên trì theo đuổi mục tiêu đến cùng; khi đã đặt ra đích đến sẽ nỗ lực vượt qua mọi rào cản.', positive: true });
  } else if (counts[1] > 0 && counts[5] === 0 && counts[9] > 0) {
    activeArrows.push({ name: 'Thiếu Số 5 Tâm Điểm', meaning: 'Cần rèn tính kiên định ở giai đoạn giữa chặng đường để không bị giảm nhiệt huyết.', positive: false });
  }

  // 3-5-7 Arrow of Spirituality
  if (counts[3] > 0 && counts[5] > 0 && counts[7] > 0) {
    activeArrows.push({ name: 'Mũi Tên Nhạy Cảm Tâm Linh (3-5-7)', meaning: 'Giác quan thứ 6 mạnh mẽ, có niềm tin tâm linh sâu sắc và giác ngộ sớm về các quy luật nhân quả.', positive: true });
  }

  return { counts, activeArrows };
}

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

  // Safe fact lookups
  const lifePathVal = Number(result?.facts?.core?.LIFE_PATH?.value ?? result?.facts?.core?.life_path?.value ?? 1);
  const expressionVal = Number(result?.facts?.core?.EXPRESSION?.value ?? result?.facts?.core?.expression?.value ?? 1);
  const soulUrgeVal = Number(result?.facts?.core?.SOUL_URGE?.value ?? result?.facts?.core?.soul_urge?.value ?? 1);
  const personalityVal = Number(result?.facts?.core?.PERSONALITY?.value ?? result?.facts?.core?.personality?.value ?? 1);
  const maturityVal = Number(result?.facts?.core?.MATURITY?.value ?? result?.facts?.core?.maturity?.value ?? 1);
  
  const personalYearVal = Number(
    result?.facts?.core?.PERSONAL_YEAR?.value ??
    result?.facts?.core?.personal_year?.value ??
    result?.dotNotatedFacts?.['numerology.cycles.personal_year.value'] ??
    1
  );

  const lifePathInterp = LIFE_PATH_INTERPRETATIONS[lifePathVal] ?? LIFE_PATH_INTERPRETATIONS[1];
  const personalYearInterp = PERSONAL_YEAR_INTERPRETATIONS[personalYearVal] ?? PERSONAL_YEAR_INTERPRETATIONS[1];

  const birthChart = result ? calculateBirthChartGrid(birthDate) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <Hash className="w-4 h-4" />
          <span>Pythagorean Numerology (Biểu Đồ Ngày Sinh 3x3 & 4 Kim Tự Tháp Đỉnh Cao)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Tra Cứu Thần Số Học Pythagoras Toàn Diện</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Giải mã trực quan biểu đồ ngày sinh 3x3, các mũi tên cá tính, chỉ số cốt lõi và 4 giai đoạn đỉnh cao cuộc đời. Toàn bộ tính toán dựa trên hệ thống Pythagoras chuẩn hóa tiếng Việt.
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 mt-4 shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Hash className="w-4 h-4 animate-spin" />
                  Đang Tính Toán Biểu Đồ...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Lập Biểu Đồ Thần Số Học
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

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-4">
              <Grid className="w-14 h-14 text-emerald-500/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-white font-semibold text-base">Sẵn Sàng Thiết Lập Bản Đồ Số Học</h3>
                <p className="text-gray-400 text-xs max-w-sm mx-auto">
                  Nhập họ tên và ngày sinh để khởi tạo biểu đồ 3x3, phát hiện mũi tên sức mạnh và dự đoán thời vận.
                </p>
              </div>
            </div>
          )}

          {result && birthChart && (
            <div className="space-y-8 animate-fadeIn">
              {/* Profile Bar */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-200">
                    Chủ mệnh: <strong className="text-white">{result.facts.normalizedName}</strong> ({result.birthDateIso})
                  </span>
                </div>
                <div className="text-emerald-400 font-medium text-xs">
                  Chuẩn hóa NFD • Rút gọn 3 thành phần
                </div>
              </div>

              {/* 1. VISUAL CHART: Biểu Đồ Ngày Sinh 3x3 Pythagoras */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-5">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Grid className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Biểu Đồ Ngày Sinh Pythagoras (3x3 Matrix)</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                    Birth Chart Grid
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* The 3x3 Grid Box */}
                  <div className="bg-background/80 p-4 rounded-2xl border border-borderDark/80 shadow-inner max-w-xs mx-auto w-full">
                    <div className="grid grid-cols-3 gap-2 text-center aspect-square">
                      {/* Row 1: 3 - 6 - 9 (Mind) */}
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Trí Não (3)</span>
                        <span className="text-lg font-bold text-emerald-300">
                          {birthChart.counts[3] > 0 ? Array(birthChart.counts[3]).fill('3').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Sáng Tạo (6)</span>
                        <span className="text-lg font-bold text-emerald-300">
                          {birthChart.counts[6] > 0 ? Array(birthChart.counts[6]).fill('6').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Hoài Bão (9)</span>
                        <span className="text-lg font-bold text-emerald-300">
                          {birthChart.counts[9] > 0 ? Array(birthChart.counts[9]).fill('9').join(' ') : '—'}
                        </span>
                      </div>

                      {/* Row 2: 2 - 5 - 8 (Soul) */}
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Trực Giác (2)</span>
                        <span className="text-lg font-bold text-indigo-300">
                          {birthChart.counts[2] > 0 ? Array(birthChart.counts[2]).fill('2').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Tự Do (5)</span>
                        <span className="text-lg font-bold text-indigo-300">
                          {birthChart.counts[5] > 0 ? Array(birthChart.counts[5]).fill('5').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Cảm Xúc (8)</span>
                        <span className="text-lg font-bold text-indigo-300">
                          {birthChart.counts[8] > 0 ? Array(birthChart.counts[8]).fill('8').join(' ') : '—'}
                        </span>
                      </div>

                      {/* Row 3: 1 - 4 - 7 (Body) */}
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Bản Ngã (1)</span>
                        <span className="text-lg font-bold text-amber-300">
                          {birthChart.counts[1] > 0 ? Array(birthChart.counts[1]).fill('1').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Thực Tế (4)</span>
                        <span className="text-lg font-bold text-amber-300">
                          {birthChart.counts[4] > 0 ? Array(birthChart.counts[4]).fill('4').join(' ') : '—'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-surface border border-borderDark">
                        <span className="text-[10px] text-gray-500 uppercase font-mono">Trải Nghiệm (7)</span>
                        <span className="text-lg font-bold text-amber-300">
                          {birthChart.counts[7] > 0 ? Array(birthChart.counts[7]).fill('7').join(' ') : '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Arrows Interpretation */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">
                      Các Mũi Tên Năng Lượng Đang Sở Hữu:
                    </span>
                    {birthChart.activeArrows.length === 0 ? (
                      <p className="text-xs text-gray-400">Các con số phân bổ cân đối, không hình thành các trục mũi tên tuyệt đối.</p>
                    ) : (
                      <div className="space-y-2">
                        {birthChart.activeArrows.map((arrow, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-xl border text-xs space-y-1 ${
                              arrow.positive
                                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                                : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                            }`}
                          >
                            <div className="font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{arrow.name}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-gray-300">{arrow.meaning}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. Core Numbers Overview */}
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
                    <span className="text-xs font-semibold text-gray-400">Số Sứ Mệnh (Expression)</span>
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
                  <p className="text-xs text-gray-400">Ấn tượng ngoại giao bên ngoài</p>
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

              {/* 3. VISUAL CHART: 4 Kim Tự Tháp Đỉnh Cao Cuộc Đời */}
              {result.facts.pinnacles && (
                <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-5">
                  <div className="flex items-center justify-between border-b border-borderDark pb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-base font-bold text-white">Biểu Đồ 4 Kim Tự Tháp Đỉnh Cao Cuộc Đời (Pinnacles Timeline)</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                      4 Giai Đoạn Vàng
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {result.facts.pinnacles.map((p: any) => (
                      <div key={p.pinnacleNumber} className="p-4 rounded-xl bg-background/70 border border-emerald-500/30 text-center space-y-2 relative overflow-hidden group hover:border-emerald-400 transition-colors">
                        <span className="text-[11px] font-bold text-gray-400 block uppercase">Đỉnh Cao {p.pinnacleNumber}</span>
                        <div className="text-3xl font-extrabold text-emerald-400 group-hover:scale-110 transition-transform">
                          {p.value}
                        </div>
                        <div className="text-xs text-white font-medium">
                          {p.startAge} - {p.endAge} tuổi
                        </div>
                        <span className="text-[10px] text-gray-400 block">
                          Thời kỳ rung động số {p.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Detailed Practical Interpretations (Layman First, Zero Academic Clutter) */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Bản Mệnh & Chiến Lược Cuộc Sống</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                    Ứng Dụng Thực Tiễn
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Life Path Card */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                      <Lightbulb className="w-4 h-4 text-emerald-400" />
                      <span>🌟 Con Số Chủ Đạo {lifePathVal}: {lifePathInterp.title} — Bản Sắc Cốt Lõi</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {lifePathInterp.meaning}
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dễ Hiểu):</span>
                      <p className="text-gray-200 leading-relaxed">
                        {lifePathInterp.layman}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">🔍 Bản Chất & Cơ Chế Vận Hành:</span>
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
                  </div>

                  {/* Personal Year Card */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span>📅 Năm Cá Nhân (Personal Year {personalYearVal}): {personalYearInterp.theme} — Thời Vận Trong Năm</span>
                    </div>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      {personalYearInterp.meaning}
                    </p>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Định Hướng Hành Động Cho Bạn Trong Năm Nay:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        {personalYearInterp.advice}
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
