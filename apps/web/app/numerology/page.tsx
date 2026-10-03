'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  X,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import {
  PERSONAL_YEAR_ASPECTS,
  calculatePersonalityGroups,
  calculateHollandCareerMatch,
  LIFE_PATH_EXTENDED_INFO,
  calculateBirthChart,
  detectKarmicDebts,
  detectMissingKarmicLessons,
  calculateAttitudeNumber,
  ATTITUDE_INTERPRETATIONS,
  evaluateLifePathExpressionHarmony,
  evaluateLifePathSoulHarmony,
} from '@/lib/numerology-interpretations';

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
      'Số 4 là con số của sự thực tế, kỷ luật, quy chuẩn và khả năng xây dựng nền móng bền vững cho công việc và gia đình.',
    layman:
      'Bạn sống rất thực tế, cẩn thận, có trách nhiệm và luôn làm việc theo kế hoạch rõ ràng. Bạn ghét sự mơ hồ và thiếu chắc chắn.',
    mechanism:
      'Thuộc Trục Thể Chất (1-4-7) Pythagoras. Biểu thị tính ổn định của đất, logic thực nghiệm và trật tự có tổ chức.',
    advice:
      'Học cách thả lỏng và linh hoạt trước những thay đổi bất ngờ; mở lòng đón nhận các góc nhìn mới mẻ ngoài khuôn khổ quen thuộc.',
    strengths: 'Tổ chức tỉ mỉ, đáng tin cậy tuyệt đối, kiên trì, trung thành.',
    challenges: 'Bảo thủ, cứng nhắc, khó thích nghi với đổi mới, dễ tạo áp lực cho người xung quanh.',
  },
  5: {
    title: 'Người Khám Phá Tự Do & Đổi Mới',
    meaning:
      'Số 5 tượng trưng cho tinh thần phiêu lưu, khát vọng tự do, tính linh hoạt và khả năng thích ứng tuyệt vời với mọi biến đổi.',
    layman:
      'Bạn yêu thích tự do, ghét sự gò bó đơn điệu và luôn tò mò khám phá những chân trời mới. Bạn thích trải nghiệm cuộc sống đa sắc màu.',
    mechanism:
      'Tọa lạc tại trung tâm Trục Tâm Hồn (2-5-8) Pythagoras. Tâm điểm cân bằng kết nối mọi trục năng lượng.',
    advice:
      'Rèn luyện tính tự giác và kiểm soát ham muốn tức thời; xác định mục tiêu trọng tâm để không lãng phí năng lượng vào những thú vui ngắn hạn.',
    strengths: 'Thích nghi nhanh, tư duy mở, giàu năng lượng sống, nhiều tài lẻ.',
    challenges: 'Cả thèm chóng chán, thiếu kiên nhẫn, dễ bị xao nhãng và bốc đồng.',
  },
  6: {
    title: 'Người Nuôi Dưỡng & Vun Đắp Yêu Thương',
    meaning:
      'Số 6 là con số của tình mẫu tử/phụ tử, lòng nhân ái, trách nhiệm gia đình và năng khiếu thẩm mỹ nghệ thuật.',
    layman:
      'Bạn là chỗ dựa ấm áp cho gia đình và người thân. Bạn chu đáo, thích chăm sóc người khác và luôn muốn kiến tạo một không gian bình an, thẩm mỹ.',
    mechanism:
      'Tâm điểm của Trục Thần Trí (3-6-9) Pythagoras. Đại diện cho não phải, tư duy hình tượng, lòng trắc ẩn và cảm quan cái đẹp.',
    advice:
      'Học cách buông bớt sự lo lắng thái quá; chấp nhận sự không hoàn hảo của người khác và dành thời gian yêu thương chính bản thân mình.',
    strengths: 'Tận tụy, giàu tình cảm, có khiếu thẩm mỹ, tinh thần trách nhiệm cao.',
    challenges: 'Hay ôm đồm, lo lắng thái quá, dễ can thiệp sâu vào cuộc sống của người khác.',
  },
  7: {
    title: 'Người Chiêm Nghiệm & Khai Sáng Tri Thức',
    meaning:
      'Số 7 là con số của triết học, tư duy chiều sâu, khả năng tự học tự chiêm nghiệm và khám phá những chân lý vũ trụ.',
    layman:
      'Bạn là người sâu sắc, thích suy nghĩ một mình và muốn hiểu bản chất gốc rễ của mọi sự việc. Bạn không dễ tin người khác nếu chưa tự mình kiểm chứng.',
    mechanism:
      'Đỉnh cao của Trục Thể Chất (1-4-7) Pythagoras. Tần số của sự đúc kết kinh nghiệm qua những trải nghiệm thực tế cá nhân.',
    advice:
      'Mở lòng chia sẻ hiểu biết của mình với cộng đồng; hòa mình vào cuộc sống đời thường thay vì tự khép kín trong tháp ngà tri thức.',
    strengths: 'Tư duy phân tích sắc bén, trực giác tâm linh nhạy bén, độc lập, uyên bác.',
    challenges: 'Khép kín, đa nghi, khó gần, dễ bi quan khi thất vọng về thực tại.',
  },
  8: {
    title: 'Người Điều Hành & Hiện Thực Hóa Tài Lộc',
    meaning:
      'Số 8 là biểu tượng của quyền lực, thành tựu tài chính, năng lực quản trị quy mô lớn và sự cân bằng giữa vật chất và tinh thần.',
    layman:
      'Bạn có tư duy kinh doanh nhạy bén, khát vọng thành công lớn và năng lực tổ chức điều hành xuất sắc. Bạn coi trọng hiệu quả công việc.',
    mechanism:
      'Đỉnh cao Trục Tâm Hồn (2-5-8) Pythagoras. Khả năng làm chủ và chuyển hóa năng lượng cảm xúc thành sức mạnh hành động thực tiễn.',
    advice:
      'Duy trì chữ tín và đạo đức làm gốc trong kinh doanh; sử dụng tài chính và quyền lực để phụng sự xã hội thay vì chỉ vì danh vọng cá nhân.',
    strengths: 'Ý chí mạnh mẽ, tầm nhìn chiến lược, quản trị tài chính giỏi, quyết đoán.',
    challenges: 'Thực dụng, dễ coi trọng vật chất, khó bày tỏ cảm xúc mềm mỏng.',
  },
  9: {
    title: 'Người Phụng Sự & Nhân Đạo Toàn Cầu',
    meaning:
      'Số 9 là con số hoàn thiện, biểu trưng cho lòng bao dung vô bờ, lý tưởng nhân đạo cao đẹp và sứ mệnh phụng sự cộng đồng.',
    layman:
      'Bạn sống nhân hậu, hào hiệp và luôn mong muốn xã hội tốt đẹp hơn. Bạn dễ đồng cảm với những người kém may mắn và có uy tín tự nhiên.',
    mechanism:
      'Đỉnh cao Trục Thần Trí (3-6-9) Pythagoras. Tần số tổng hòa tinh hoa của toàn bộ chu kỳ số học từ 1 đến 9.',
    advice:
      'Tập trung vào những hành động thực tế trong khả năng; học cách buông bỏ quá khứ và không để lòng trắc ẩn bị lợi dụng bởi người xấu.',
    strengths: 'Bao dung, trách nhiệm cao cả, tầm nhìn nhân văn, đáng kính trọng.',
    challenges: 'Mơ mộng viển vông, dễ thất vọng về lòng người, nặng gánh quá khứ.',
  },
  11: {
    title: 'Bậc Thầy Trực Giác & Soi Đường (Master Number 11/2)',
    meaning:
      'Con số Master 11 mang năng lượng tâm linh bậc cao, trực giác siêu việt và khả năng truyền cảm hứng thức tỉnh mạnh mẽ.',
    layman:
      'Bạn có linh cảm rất nhạy bén, có thể cảm nhận được suy nghĩ và cảm xúc của người khác. Bạn sinh ra để kết nối và nâng đỡ tinh thần cho cộng đồng.',
    mechanism:
      'Số Master tiềm ẩn: Mang sức mạnh gấp đôi của số 1 (tiên phong) và tổng hòa vào số 2 (hòa giải).',
    advice:
      'Học cách làm chủ hệ thần kinh nhạy cảm bằng thiền định hoặc lối sống lành mạnh; biến các linh cảm tinh tế thành hành động thực tế có ích.',
    strengths: 'Trực giác kỳ diệu, lý tưởng cao đẹp, khả năng soi sáng tâm hồn người khác.',
    challenges: 'Dễ căng thẳng thần kinh, nhạy cảm quá mức, hay rơi vào khủng hoảng lý tưởng.',
  },
  22: {
    title: 'Bậc Thầy Kiến Thiết Thế Giới (Master Number 22/4)',
    meaning:
      'Được mệnh danh là Master Builder, số 22 có năng lực biến những giấc mơ vĩ đại nhất thành công trình hiện thực bền vững.',
    layman:
      'Bạn vừa có tầm nhìn vĩ mô vượt thời đại, vừa có đôi bàn tay thực tế để biến những kế hoạch phức tạp nhất thành hiện thực. Tiềm năng thành tựu rất lớn.',
    mechanism:
      'Số Master đỉnh cao: Gấp đôi năng lượng hợp tác số 2 và kết tinh vào kỷ luật vững chãi của số 4.',
    advice:
      'Kiên trì bước từng bước một; không để sức ép từ trách nhiệm lớn làm bạn kiệt sức; luôn giữ vững sự chính trực trong mọi quyết định.',
    strengths: 'Năng lực tổ chức siêu việt, tầm nhìn thực tế phi thường, sức bền ý chí.',
    challenges: 'Áp lực tự thân quá lớn, độc đoán khi mất kiên nhẫn, tham vọng quá tầm kiểm soát.',
  },
  33: {
    title: 'Bậc Thầy Chữa Lành & Yêu Thương Vô Điều Kiện (Master Number 33/6)',
    meaning:
      'Con số Master hiếm hoi nhất, biểu thị cho tình yêu thương vô lượng, năng lực chữa lành nỗi đau tinh thần và lòng nhân từ bao la.',
    layman:
      'Bạn có tấm lòng Bồ Tát bao dung, luôn muốn xoa dịu nỗi đau của nhân gian. Sự hiện diện ấm áp của bạn tự nó đã mang lại sự an ủi lớn cho người khác.',
    mechanism:
      'Số Master từ bi: Gấp đôi năng lượng trí tuệ số 3 và hòa quyện vào tình yêu vô điều kiện số 6.',
    advice:
      'Thiết lập ranh giới bảo vệ năng lượng cá nhân; nhớ rằng bạn chỉ có thể chữa lành người khác khi chính bạn được bình an và khỏe mạnh.',
    strengths: 'Lòng từ bi sâu sắc, sự hiện diện bình an, năng lượng chữa lành tự nhiên.',
    challenges: 'Dễ hy sinh thân mình mù quáng, kiệt quệ năng lượng, mang gánh nặng của người khác.',
  },
};

const PERSONAL_YEAR_INTERPRETATIONS: Record<
  number,
  { theme: string; meaning: string; advice: string }
> = {
  1: {
    theme: 'Năm Khởi Đầu Mới & Tự Chủ',
    meaning:
      'Bắt đầu chu kỳ 9 năm mới. Năng lượng gieo hạt, khai phá các dự án mới và tự tin nắm lấy cơ hội dẫn đầu.',
    advice:
      'Hãy chủ động hành động, đừng chần chừ. Đây là năm tuyệt vời để khởi nghiệp, học kỹ năng mới hoặc bắt đầu một lối sống mới.',
  },
  2: {
    theme: 'Năm Hợp Tác, Chờ Đợi & Nuôi Dưỡng',
    meaning:
      'Hạt giống năm 1 đang nảy mầm ngầm dưới lòng đất. Năng lượng đòi hỏi sự kiên nhẫn, hòa giải và mở rộng các mối quan hệ đồng hành.',
    advice:
      'Tập trung lắng nghe, kiểm soát cái tôi; tránh nóng vội đốt cháy giai đoạn. Vun đắp tình cảm và tìm kiếm đối tác đáng tin cậy.',
  },
  3: {
    theme: 'Năm Tỏa Sáng, Sáng Tạo & Mở Rộng Giao Tiếp',
    meaning:
      'Mầm cây nhú lên đón ánh mặt trời. Năng lượng bùng nổ về mặt biểu đạt, học tập, giao tế xã hội và phát triển tư duy sáng tạo.',
    advice:
      'Tự tin xuất hiện trước công chúng; học thêm kiến thức mới; chú ý kiểm soát chi tiêu và duy trì sự tập trung vào mục tiêu trọng tâm.',
  },
  4: {
    theme: 'Năm Củng Cố Nền Móng & Rèn Luyện Kỷ Luật',
    meaning:
      'Năm của sự nỗ lực làm việc bền bỉ, chỉnh đốn trật tự nội tại, chăm sóc sức khỏe và xây dựng quy trình ổn định.',
    advice:
      'Hạn chế đầu tư mạo hiểm; quản lý tài chính chặt chẽ; kiên trì hoàn thiện từng chi tiết công việc và rèn luyện thể chất đều đặn.',
  },
  5: {
    theme: 'Năm Đổi Mới, Bứt Phá & Trải Nghiệm Tự Do',
    meaning:
      'Trung tâm của chu kỳ 9 năm. Những thay đổi bất ngờ mang lại cơ hội mở rộng tầm mắt, du lịch hoặc chuyển hướng công việc.',
    advice:
      'Linh hoạt đón nhận sự đổi mới; dũng cảm bước ra khỏi vùng an toàn nhưng cần giữ cái đầu lạnh trước những cám dỗ bốc đồng.',
  },
  6: {
    theme: 'Năm Trách Nhiệm, Gia Đình & Vun Đắp Yêu Thương',
    meaning:
      'Năng lượng quay về tổ ấm, hòa giải các mối quan hệ thân tộc, trang hoàng nhà cửa và gánh vác trách nhiệm chăm sóc người thân.',
    advice:
      'Dành thời gian chất lượng cho gia đình; học cách thứ tha và tạo dựng không gian sống an yên, thẩm mỹ; không nên ôm đồm quá sức.',
  },
  7: {
    theme: 'Năm Chiêm Nghiệm, Nâng Cao Trí Tuệ & Nội Lực',
    meaning:
      'Năm của sự lắng đọng tâm hồn. Thích hợp cho việc nghiên cứu chuyên sâu, học hỏi triết lý, thiền định và chữa lành tâm thức.',
    advice:
      'Dành không gian tĩnh lặng cho riêng mình; không nên mở rộng quy mô kinh doanh ồ ạt; đầu tư cho trí tuệ và sự bình an nội tại.',
  },
  8: {
    theme: 'Năm Thu Hoạch Thành Quả & Làm Chủ Tài Chính',
    meaning:
      'Đỉnh cao thu hoạch của chu kỳ 9 năm. Những nỗ lực từ các năm trước sẽ đơm hoa kết trái thành uy tín, quyền lực và tài chính.',
    advice:
      'Tập trung hiện thực hóa các mục tiêu tài chính; quản trị hiệu quả; đối nhân xử thế công bằng, giữ vững đạo đức nghề nghiệp.',
  },
  9: {
    theme: 'Năm Tổng Kết, Bao Dung & Chuyển Giao Chu Kỳ',
    meaning:
      'Khép lại chu kỳ 9 năm. Thời điểm dọn dẹp những điều cũ kỹ, thanh lọc các mối quan hệ độc hại và chuẩn bị tâm thế cho khởi đầu mới.',
    advice:
      'Học cách buông bỏ những điều không còn phục vụ sự phát triển của bạn; tham gia các hoạt động thiện nguyện; tha thứ và biết ơn.',
  },
};

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal State for clicked items
  const [selectedItem, setSelectedItem] = useState<{
    category: string;
    title: string;
    value: string | number;
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
      if (!res.ok) throw new Error(data.error ?? 'Khảo cứu thất bại');
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
  const personalMonthVal = Number(result?.facts?.cycles?.PERSONAL_MONTH?.value ?? 0);
  const personalDayVal = Number(result?.facts?.cycles?.PERSONAL_DAY?.value ?? 0);
  const birthdayVal = Number(result?.facts?.core?.BIRTHDAY?.value ?? 0);

  const birthDateStr = result?.facts?.birthDateIso || birthDate;
  const fullNameStr = result?.facts?.normalizedName || fullName;

  const personalityGroups = calculatePersonalityGroups(fullNameStr, birthDateStr);
  const birthChart = calculateBirthChart(birthDateStr);
  const karmicDebts = detectKarmicDebts(birthDateStr, lifePathVal);
  const karmicLessons = detectMissingKarmicLessons(fullNameStr);

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
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">01</span>
          <span>/</span>
          <span>Thần Số Học Pythagoras</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ Chỉ Số Cá Nhân & 4 Đỉnh Cao Đời Người
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Phân tích các rung động số học từ họ tên và ngày sinh theo quy chuẩn Pythagoras.
          <strong> Nhấp vào bất kỳ con số hoặc đỉnh cao nào dưới đây để mở bảng giải nghĩa chi tiết, bình dân và dễ hiểu nhất.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Guide */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2">
            Nhập Dữ Liệu Khảo Cứu
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Họ Và Tên Khai Sinh
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                placeholder="VD: Nguyễn Văn Đức"
              />
              <span className="text-[10px] text-stone/70 mt-1 block">
                Họ tên quyết định Số Sứ Mệnh, Linh Hồn và Bài Học Nghiệp Quả.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/70 mt-1 block">
                Ngày sinh quyết định Số Chủ Đạo và 4 Đỉnh Cao Kim Tự Tháp.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 mt-2"
            >
              {loading ? 'Đang Khảo Cứu...' : 'Khảo Cứu Thần Số Học →'}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick beginner guide */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quy Tắc Đọc Chỉ Số</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Mỗi con số mang một tần số rung động riêng. <strong>Bạn chỉ cần nhấp vào con số bất kỳ</strong> để xem lời giải thích đời thường, điểm mạnh, thách thức và lời khuyên hành động.
            </p>
          </div>
        </div>

        {/* Right Column: Dashboard Result */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Bản Đồ Đang Chờ Khởi Tạo</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập họ tên và ngày sinh ở bảng bên trái để tra cứu toàn bộ bản đồ Thần Số Học.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Ledger Banner */}
              <div className="p-4 bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accentGold" />
                  <span className="text-stone">
                    Khảo cứu cho: <strong className="text-parchment">{result.facts.normalizedName}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-accentGold underline">
                  Nhấp vào từng con số để xem luận giải chi tiết →
                </span>
              </div>

              {/* 1. Core Numbers Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-stone border-b border-borderDark pb-2">
                  <span className="text-parchment font-semibold">Bộ Sáu Chỉ Số Cốt Lõi</span>
                  <span className="text-accentGold text-[11px]">Nhấp xem chi tiết</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Life Path */}
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
                    className="p-4 bg-surface border border-accentGold/80 hover:border-parchment transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-stone">Số Chủ Đạo</span>
                        {result.facts.core.LIFE_PATH?.isMasterNumber && (
                          <span className="px-1.5 py-0.2 text-[9px] bg-accentGold text-background font-bold">
                            MASTER
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-serif font-bold text-accentGold group-hover:text-parchment transition-colors">
                        {lifePathVal}
                      </div>
                      <p className="text-xs font-serif text-parchment font-medium line-clamp-1">
                        {lifePathInterp.title}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Số Chủ Đạo →
                    </span>
                  </div>

                  {/* Expression */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ SỨ MỆNH (EXPRESSION)',
                        title: `Số Sứ Mệnh ${expressionVal}: Năng Lực Bẩm Sinh & Khát Vọng`,
                        value: expressionVal,
                        beginnerGuide:
                          'Số Sứ Mệnh được tính từ tất cả chữ cái trong họ và tên. Nó đại diện cho tài năng thiên bẩm, phương thức bạn hành động và những gì bạn có thể đóng góp cho đời.',
                        details: `Với số Sứ Mệnh ${expressionVal}, bạn mang năng lượng tự nhiên để hiện thực hóa các mục tiêu đời sống qua phong thái hành sự đặc thù.`,
                        advice: 'Hãy phát huy tối đa sở trường của mình vào các công việc bạn yêu thích thay vì chạy theo khuôn mẫu của người khác.',
                        strengths: 'Khả năng biểu đạt, sự kiên định, tài năng bẩm sinh.',
                        challenges: 'Cần tránh việc tự ti hoặc lãng phí năng lượng vào những việc không đúng chuyên môn.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Sứ Mệnh</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {expressionVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Tài năng & Năng lực hành động</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Sứ Mệnh →
                    </span>
                  </div>

                  {/* Soul Urge */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ LINH HỒN (SOUL URGE)',
                        title: `Số Linh Hồn ${soulUrgeVal}: Tiếng Nói Của Trái Tim`,
                        value: soulUrgeVal,
                        beginnerGuide:
                          'Số Linh Hồn được tính từ các nguyên âm trong tên của bạn. Nó phản ánh khao khát sâu kín nhất trong tâm can, điều khiến bạn thực sự cảm thấy hạnh phúc và mãn nguyện.',
                        details: `Trái tim bạn tìm thấy sự bình an và trọn vẹn nhất khi được sống đúng với giá trị của con số ${soulUrgeVal}.`,
                        advice: 'Đừng bỏ quên những nhu cầu cảm xúc chân thật bên trong bạn giữa những bận rộn cơm áo gạo tiền thường nhật.',
                        strengths: 'Động lực nội tâm thuần khiết, trực giác cảm xúc.',
                        challenges: 'Dễ cảm thấy trống rỗng nếu công việc hiện tại không đáp ứng được lý tưởng của linh hồn.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Linh Hồn</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {soulUrgeVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Khao khát nội tâm sâu kín</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Linh Hồn →
                    </span>
                  </div>

                  {/* Personality */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ NHÂN CÁCH (PERSONALITY)',
                        title: `Số Nhân Cách ${personalityVal}: Ấn Tượng Ngoại Cảnh`,
                        value: personalityVal,
                        beginnerGuide:
                          'Số Nhân Cách được tính từ các phụ âm trong họ tên. Nó phản ánh cách người khác nhìn nhận bạn trong lần gặp đầu tiên, phong thái bên ngoài và lớp áo xã hội của bạn.',
                        details: `Bạn tạo cho người đối diện cảm giác về một con người mang năng lượng số ${personalityVal}.`,
                        advice: 'Hãy giữ cho hình ảnh bên ngoài luôn đồng điệu và chân thành với giá trị nội tâm bên trong.',
                        strengths: 'Sức hút xã hội, phong thái chuyên nghiệp.',
                        challenges: 'Tránh việc cố gồng mình tạo vỏ bọc giả tạo khiến người khác cảm thấy xa cách.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Nhân Cách</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {personalityVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Phong thái & Ấn tượng ban đầu</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Nhân Cách →
                    </span>
                  </div>

                  {/* Maturity */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ TRƯỞNG THÀNH (MATURITY)',
                        title: `Số Trưởng Thành ${maturityVal}: Vận Trình Sau 40 Tuổi`,
                        value: maturityVal,
                        beginnerGuide:
                          'Số Trưởng Thành là tổng hòa của Số Chủ Đạo và Số Sứ Mệnh. Năng lượng này sẽ thức tỉnh mạnh mẽ nhất sau độ tuổi 35–40, dẫn dắt bạn đến đỉnh cao cống hiến cuộc đời.',
                        details: `Càng nhiều tuổi, bạn sẽ càng cảm nhận rõ rệt ảnh hưởng của số ${maturityVal} trong tư duy và hành động.`,
                        advice: 'Chuẩn bị nội lực và tri thức từ tuổi trẻ để đón nhận giai đoạn hoàng kim viên mãn ở tuổi trung niên.',
                        strengths: 'Sự chín chắn, tích lũy kinh nghiệm, chiều sâu tư duy.',
                        challenges: 'Cần kiên nhẫn vượt qua những bỡ ngỡ giai đoạn chuyển giao tuổi trung niên.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Trưởng Thành</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {maturityVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Hướng đi hậu vận sau 40 tuổi</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Trưởng Thành →
                    </span>
                  </div>

                  {/* Birthday */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ NGÀY SINH (BIRTHDAY)',
                        title: `Số Ngày Sinh ${birthdayVal}: Món Quà Thiên Phú`,
                        value: birthdayVal,
                        beginnerGuide:
                          'Số Ngày Sinh phản ánh món quà đặc biệt hoặc năng khiếu bổ trợ mà bạn được ban tặng ngay khi chào đời để hỗ trợ cho con đường đời.',
                        details: `Năng lượng số ${birthdayVal} cung cấp cho bạn những phản xạ nhạy bén và tài lẻ trong các tình huống thực tiễn.`,
                        advice: 'Tận dụng món quà này như một công cụ đắc lực khi bắt đầu các dự án hoặc công việc mới.',
                        strengths: 'Phản ứng nhanh, tài năng bổ trợ bẩm sinh.',
                        challenges: 'Không nên ỷ lại vào năng khiếu mà quên rèn luyện kỷ luật.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Ngày Sinh</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {birthdayVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Món quà năng khiếu bổ trợ</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Ngày Sinh →
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Four Pinnacles Pyramid Mountain */}
              {result.facts.cycles?.PINNACLES && (
                <div className="p-5 bg-surface border border-borderDark space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderDark pb-3 gap-2">
                    <div>
                      <h3 className="font-serif text-base text-parchment">
                        Bản Đồ 4 Đỉnh Cao Cuộc Đời (Kim Tự Tháp Pythagoras)
                      </h3>
                      <p className="text-xs text-stone">
                        4 cột mốc nở rộ thành tựu lớn nhất trong đời bạn. Nhấp vào đỉnh để xem chi tiết bài học.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-accentGold">Chu Kỳ 27 Năm</span>
                  </div>

                  {/* SVG Pyramid */}
                  <div className="bg-background border border-borderDark p-4 overflow-x-auto flex justify-center">
                    <svg viewBox="0 0 600 240" className="w-full max-w-xl h-auto">
                      <polygon points="120,200 240,110 360,200" fill="none" stroke="#282724" strokeWidth="1.5" />
                      <polygon points="240,200 360,110 480,200" fill="none" stroke="#282724" strokeWidth="1.5" />
                      <line x1="240" y1="110" x2="360" y2="50" stroke="#3D3B35" strokeWidth="1.5" />
                      <line x1="360" y1="110" x2="360" y2="50" stroke="#3D3B35" strokeWidth="1.5" />
                      <line x1="120" y1="200" x2="360" y2="10" stroke="#BFA15F" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="480" y1="200" x2="360" y2="10" stroke="#BFA15F" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Base nodes */}
                      <circle cx="120" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                      <text x="120" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                        {result.facts.cycles.PINNACLES.bases?.month ?? 11}
                      </text>

                      <circle cx="240" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                      <text x="240" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                        {result.facts.cycles.PINNACLES.bases?.day ?? 2}
                      </text>

                      <circle cx="360" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                      <text x="360" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                        {result.facts.cycles.PINNACLES.bases?.year ?? 1}
                      </text>

                      {/* Peak 1 */}
                      <circle cx="240" cy="110" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="1.5" />
                      <text x="240" y="115" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                        {result.facts.cycles.PINNACLES.pinnacle1?.value ?? 4}
                      </text>

                      {/* Peak 2 */}
                      <circle cx="360" cy="110" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="1.5" />
                      <text x="360" y="115" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                        {result.facts.cycles.PINNACLES.pinnacle2?.value ?? 3}
                      </text>

                      {/* Peak 3 */}
                      <circle cx="360" cy="50" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="2" />
                      <text x="360" y="55" textAnchor="middle" fill="#BFA15F" fontSize="13" fontWeight="bold" fontFamily="serif">
                        {result.facts.cycles.PINNACLES.pinnacle3?.value ?? 7}
                      </text>

                      {/* Peak 4 */}
                      <circle cx="360" cy="10" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="2" />
                      <text x="360" y="15" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                        {result.facts.cycles.PINNACLES.pinnacle4?.value ?? 3}
                      </text>
                    </svg>
                  </div>

                  {/* 4 Peak Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      result.facts.cycles.PINNACLES.pinnacle1,
                      result.facts.cycles.PINNACLES.pinnacle2,
                      result.facts.cycles.PINNACLES.pinnacle3,
                      result.facts.cycles.PINNACLES.pinnacle4,
                    ].map((p: any) => {
                      if (!p) return null;
                      const ageDesc =
                        p.endAge === 99
                          ? `${p.startAge}t trở đi`
                          : `${p.startAge} - ${p.endAge} tuổi`;

                      return (
                        <div
                          key={p.pinnacleNumber}
                          onClick={() =>
                            setSelectedItem({
                              category: `ĐỈNH CAO SỐ ${p.pinnacleNumber} (${ageDesc})`,
                              title: `Đỉnh Cao Số ${p.value}: Cột Mốc Thành Tựu`,
                              value: p.value,
                              beginnerGuide:
                                'Mỗi đỉnh cao kéo dài khoảng 9 năm, mang lại những cơ hội và bài học đặc thù để hoàn thiện nhân cách và tích lũy thành quả.',
                              details: `Trong giai đoạn này, bạn đón nhận tần số rung động của số ${p.value}. Đây là lúc vũ trụ tạo điều kiện cho bạn tỏa sáng ở lĩnh vực này.`,
                              advice: 'Kiên trì theo đuổi các mục tiêu dài hạn; tránh nôn nóng bỏ dở giữa chừng.',
                              strengths: 'Cơ hội thăng tiến, mở rộng tầm ảnh hưởng.',
                              challenges: 'Cần vượt qua sức ì tâm lý và các biến động ngoại cảnh.',
                            })
                          }
                          className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-accentGold">Đỉnh {p.pinnacleNumber}</span>
                            <span className="text-stone">{ageDesc}</span>
                          </div>
                          <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                            {p.value}
                          </div>
                          <span className="text-[10px] font-mono text-accentGold group-hover:underline block pt-1 border-t border-borderDark">
                            Xem luận giải →
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Time Cycles & 9-Year Wave */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderDark pb-3 gap-2">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      Chu Kỳ 9 Năm & Năm Cá Nhân Hiện Tại
                    </h3>
                    <p className="text-xs text-stone">
                      Năm 2026 của bạn mang năng lượng Số {personalYearVal} — {personalYearInterp.theme}.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Làn Sóng Phát Triển</span>
                </div>

                {/* 9-Year Cycle visual wave */}
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs font-mono">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((yr) => {
                    const isCurrent = yr === personalYearVal;
                    return (
                      <div
                        key={yr}
                        className={`p-2.5 border transition-colors ${
                          isCurrent
                            ? 'bg-surfaceHover border-accentGold text-parchment font-bold'
                            : 'bg-background border-borderDark text-stone'
                        }`}
                      >
                        <div className="text-[10px] text-stone">Năm {2026 + (yr - personalYearVal)}</div>
                        <div className={`text-xl font-serif font-bold my-0.5 ${isCurrent ? 'text-accentGold' : 'text-parchment'}`}>
                          {yr}
                        </div>
                        <div className="text-[9px] truncate">
                          {yr === 1 && 'Khởi Đầu'}
                          {yr === 2 && 'Hợp Tác'}
                          {yr === 3 && 'Sáng Tạo'}
                          {yr === 4 && 'Kỷ Luật'}
                          {yr === 5 && 'Bứt Phá'}
                          {yr === 6 && 'Gia Đình'}
                          {yr === 7 && 'Trí Tuệ'}
                          {yr === 8 && 'Thu Hoạch'}
                          {yr === 9 && 'Tổng Kết'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3 Time Cycle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'NĂM CÁ NHÂN (PERSONAL YEAR)',
                        title: personalYearInterp.theme,
                        value: personalYearVal,
                        beginnerGuide:
                          'Năm Cá Nhân cho biết chủ đề trọng tâm và thời cơ của bạn trong năm hiện tại để bạn chủ động đón lành tránh dữ.',
                        details: personalYearInterp.meaning,
                        advice: personalYearInterp.advice,
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Năm Cá Nhân 2026</span>
                    <span className="text-xl font-serif font-bold text-accentGold block">Số {personalYearVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết năm →</span>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'THÁNG CÁ NHÂN (PERSONAL MONTH)',
                        title: `Tháng Cá Nhân Số ${personalMonthVal}`,
                        value: personalMonthVal,
                        beginnerGuide:
                          'Tháng Cá Nhân giúp bạn cân nhắc nhịp độ làm việc, quyết định chi tiêu hoặc ký kết hợp đồng trong tháng này.',
                        details: `Năng lượng tháng này chịu sự chi phối của số ${personalMonthVal}, bổ trợ cho chủ đề của Năm Cá Nhân số ${personalYearVal}.`,
                        advice: 'Giữ nhịp điệu sinh hoạt điều độ và tập trung hoàn thành các cam kết ngắn hạn.',
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Tháng Cá Nhân Hiện Tại</span>
                    <span className="text-xl font-serif font-bold text-parchment block">Số {personalMonthVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết tháng →</span>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'NGÀY CÁ NHÂN (PERSONAL DAY)',
                        title: `Ngày Cá Nhân Số ${personalDayVal}`,
                        value: personalDayVal,
                        beginnerGuide:
                          'Ngày Cá Nhân phản ánh tâm trạng và xu hướng tương tác xã hội của bạn trong ngày hôm nay.',
                        details: `Hôm nay mang năng lượng số ${personalDayVal}. Thích hợp cho việc điều chỉnh tâm thế và sắp xếp thứ tự ưu tiên.`,
                        advice: 'Hành động cẩn trọng, giữ tâm thế thoải mái và tích cực.',
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Ngày Cá Nhân Hôm Nay</span>
                    <span className="text-xl font-serif font-bold text-parchment block">Số {personalDayVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết ngày →</span>
                  </div>
                </div>
              </div>

              {/* 4. Karmic Debts & Karmic Lessons */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <h3 className="font-serif text-base text-parchment">
                    Khảo Cứu Nợ Nghiệp & Bài Học Linh Hồn
                  </h3>
                  <span className="text-xs font-mono text-stone">Thanh Lọc Năng Lượng</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Karmic Debts */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-accentGold uppercase tracking-wider block">
                      Chỉ Số Nợ Nghiệp (Karmic Debt)
                    </span>
                    {karmicDebts.length === 0 ? (
                      <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                        ✓ Không mang chỉ số nợ nghiệp lớn (13/4, 14/5, 16/7, 19/1). Trường năng lượng tự do phát triển.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {karmicDebts.map((kd) => (
                          <div key={kd.code} className="p-3 bg-background border border-cinnabar/60 space-y-1">
                            <span className="font-serif font-bold text-parchment block">
                              Nợ Nghiệp {kd.code}: {kd.name}
                            </span>
                            <p className="text-stone leading-relaxed text-[11px]">{kd.meaning}</p>
                            <span className="text-[11px] text-accentGold block pt-1">
                              <strong>Cách hóa giải:</strong> {kd.advice}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Karmic Lessons */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-accentGold uppercase tracking-wider block">
                      Bài Học Cần Bổ Sung (Karmic Lessons)
                    </span>
                    {karmicLessons.length === 0 ? (
                      <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                        ✓ Họ tên chứa đầy đủ các chữ số từ 1 đến 9, thể hiện bộ công cụ trải nghiệm tương đối trọn vẹn.
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {karmicLessons.map((kl) => (
                          <div key={kl.number} className="p-2.5 bg-background border border-borderDark flex items-center justify-between text-[11px]">
                            <span className="font-mono text-parchment">
                              Số {kl.number}: {kl.name}
                            </span>
                            <span className="text-[10px] font-mono text-stone">Cần rèn luyện</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Birth Chart 3x3 Grid */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      Biểu Đồ Ngày Sinh (Ma Trận 3x3)
                    </h3>
                    <p className="text-xs text-stone">
                      Sự phân bố các con số trên 3 trục: Thần Trí (3-6-9), Tâm Hồn (2-5-8), Thể Chất (1-4-7).
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Cấu Trúc Tự Nhiên</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* 3x3 Visual Matrix */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="grid grid-cols-3 gap-2 w-56 h-56 p-2 bg-background border border-borderDark">
                      {[
                        { num: 3, label: '3 (Trí Tuệ)' },
                        { num: 6, label: '6 (Sáng Tạo)' },
                        { num: 9, label: '9 (Nhân Đạo)' },
                        { num: 2, label: '2 (Tâm Hồn)' },
                        { num: 5, label: '5 (Tự Do)' },
                        { num: 8, label: '8 (Trí Tuệ)' },
                        { num: 1, label: '1 (Bản Ngã)' },
                        { num: 4, label: '4 (Kỷ Luật)' },
                        { num: 7, label: '7 (Trải Nghiệm)' },
                      ].map((cell) => {
                        const count = birthChart.matrixCounts[cell.num] || 0;
                        const hasNumber = count > 0;
                        return (
                          <div
                            key={cell.num}
                            className={`border flex flex-col items-center justify-center font-mono ${
                              hasNumber
                                ? 'bg-surface border-accentGold/70 text-parchment'
                                : 'bg-background border-borderDark text-stone/40'
                            }`}
                          >
                            <span className="text-xs text-stone/60">{cell.num}</span>
                            <span className="text-base font-bold font-serif">
                              {hasNumber ? String(cell.num).repeat(count) : '-'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Matrix Arrows Analysis */}
                  <div className="md:col-span-7 space-y-2 text-xs">
                    <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                      Các Mũi Tên Tính Cách Được Kích Hoạt:
                    </span>
                    {birthChart.arrows.length === 0 ? (
                      <p className="text-stone text-[11px] leading-relaxed">
                        Bạn không có mũi tên đầy đủ 3 con số hoặc mũi tên trống hoàn toàn. Năng lượng các con số phân bố độc lập.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {birthChart.arrows.map((ar, i) => (
                          <div
                            key={i}
                            className={`p-2.5 border text-[11px] space-y-0.5 ${
                              ar.type === 'strength'
                                ? 'bg-background border-accentGold/60 text-parchment'
                                : 'bg-background border-borderDark text-stone'
                            }`}
                          >
                            <div className="font-serif font-bold text-parchment">
                              {ar.name} ({ar.numbers.join('-')})
                            </div>
                            <p className="text-stone leading-relaxed">{ar.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 6. 9 Personality Trait Groups */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      9 Nhóm Tính Cách Bẩm Sinh
                    </h3>
                    <p className="text-xs text-stone">
                      Tỷ trọng phân bố các phẩm chất trong tính cách tự nhiên của bạn.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Cân Bằng Nội Tại</span>
                </div>

                <div className="space-y-3">
                  {personalityGroups.map((pg) => (
                    <div key={pg.id} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-parchment font-serif">
                          Nhóm {pg.id}: {pg.name}
                        </span>
                        <span className="text-accentGold font-bold">{pg.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-background border border-borderDark overflow-hidden">
                        <div
                          className="h-full bg-accentGold transition-all duration-300"
                          style={{ width: `${Math.min(100, pg.percentage * 4)}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-stone leading-relaxed">{pg.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* POPUP / MODAL: DETAILED NUMEROLOGY INTERPRETATION */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-parchment">
                  {selectedItem.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-stone hover:text-parchment hover:bg-surfaceHover transition-colors border border-borderDark"
                title="Đóng popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-xs">
              {/* Beginner Guide */}
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Giải Thích Thuật Ngữ Bình Dân:</span>
                </div>
                <p className="text-stone leading-relaxed text-xs">
                  {selectedItem.beginnerGuide}
                </p>
              </div>

              {/* Core Details */}
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Luận Giải Tính Cách & Năng Lực:
                </span>
                <p className="text-stone leading-relaxed whitespace-pre-line text-xs">
                  {selectedItem.details}
                </p>
              </div>

              {/* Strengths & Challenges */}
              {(selectedItem.strengths || selectedItem.challenges) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedItem.strengths && (
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        Thế Mạnh Nổi Bật
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">{selectedItem.strengths}</p>
                    </div>
                  )}
                  {selectedItem.challenges && (
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                        Thách Thức Cần Vượt Qua
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">{selectedItem.challenges}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Actionable Advice */}
              <div className="p-4 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Lời Khuyên Hành Động Thực Tế:
                </span>
                <p className="text-stone leading-relaxed text-xs">
                  {selectedItem.advice}
                </p>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2 bg-accentGold text-background font-mono text-xs uppercase tracking-wider font-bold hover:bg-parchment transition-colors border border-accentGold"
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
