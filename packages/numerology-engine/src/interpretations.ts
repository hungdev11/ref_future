/**
 * Numerology Interpretations & Extended Calculations Library
 * Based on authentic Pythagorean system (Dr. David Phillips / Hans Decoz).
 * Deterministic formulaic indicators & semantic profile projections.
 */

import { NUMEROLOGY_NUMBER_PROFILES } from './semantic-profiles.js';

// 1. LUẬN GIẢI 6 KHÍA CẠNH NĂM CÁ NHÂN (PERSONAL YEAR ASPECTS)
export interface PersonalYearAspects {
  yearNumber: number;
  theme: string;
  love: string;
  career: string;
  finance: string;
  social: string;
  learning: string;
  family: string;
  nextYearPreview: string;
  afterNextYearPreview: string;
}

export const PERSONAL_YEAR_ASPECTS: Record<number, PersonalYearAspects> = {
  1: {
    yearNumber: 1,
    theme: 'Khởi Đầu Mới, Gieo Mầm Ý Tưởng & Bứt Phá Cá Nhân',
    love: 'Độc lập, chủ động; duy trì sự bình đẳng và tôn trọng đối phương.',
    career: 'Thời điểm vàng để khởi nghiệp, chuyển đổi hoặc nhận vai trò dẫn dắt.',
    finance: 'Đầu tư phát triển kỹ năng và công cụ; lập kế hoạch chi tiêu rõ ràng.',
    social: 'Mở rộng mạng lưới đối tác có tư duy đổi mới và đồng điệu chí hướng.',
    learning: 'Tiếp thu kỹ năng lãnh đạo, tư duy chiến lược và tinh thần tự lập.',
    family: 'Làm điểm tựa vững chắc; chủ động sẻ chia để giữ hòa khí gia đình.',
    nextYearPreview: 'Năm số 2 tới: Lắng đọng, kiên nhẫn hợp tác và hòa giải.',
    afterNextYearPreview: 'Năm số 3 sau đó: Bùng nổ sáng tạo và mở rộng giao tế.',
  },
  2: {
    yearNumber: 2,
    theme: 'Hợp Tác, Hòa Giải, Lắng Đọng & Nuôi Dưỡng Trực Giác',
    love: 'Dịu dàng, thấu cảm, củng cố gắn kết và tháo gỡ khúc mắc tình cảm.',
    career: 'Ưu tiên cộng tác, hỗ trợ đồng đội và kết nối giá trị sau hậu trường.',
    finance: 'Tích lũy an toàn, quản lý ngân sách thận trọng; tránh mạo hiểm.',
    social: 'Tập trung mối quan hệ thân tình có chiều sâu thay vì xã giao dàn trải.',
    learning: 'Rèn luyện trí tuệ cảm xúc (EQ), kỹ năng ngoại giao và thương lượng.',
    family: 'Vun đắp tổ ấm thuận hòa, dành thời gian chăm sóc người thân.',
    nextYearPreview: 'Năm số 3 tới: Giải phóng năng lượng sáng tạo, bước ra sân khấu.',
    afterNextYearPreview: 'Năm số 4 sau đó: Tái cơ cấu nền tảng và kỷ luật thực tế.',
  },
  3: {
    yearNumber: 3,
    theme: 'Bùng Nổ Sáng Tạo, Lan Tỏa Năng Lượng & Mở Rộng Cơ Hội',
    love: 'Sôi nổi, thu hút; cần tỉnh táo tránh cảm xúc bốc đồng nhất thời.',
    career: 'Phát huy năng lực truyền thông, nghệ thuật, viết lách và quảng bá.',
    finance: 'Dòng tiền lưu chuyển tích cực; cần kiểm soát chi tiêu giải trí.',
    social: 'Vòng tròn quan hệ mở rộng; tích cực tham gia kết nối cộng đồng.',
    learning: 'Nâng cao kỹ năng diễn đạt, ngoại ngữ, nghệ thuật và sáng tạo.',
    family: 'Mang niềm vui và năng lượng tích cực về cho không gian gia đình.',
    nextYearPreview: 'Năm số 4 tới: Siết chặt kỷ luật, củng cố nền tảng thực tế.',
    afterNextYearPreview: 'Năm số 5 sau đó: Làn gió tự do và bước ngoặt đổi mới.',
  },
  4: {
    yearNumber: 4,
    theme: 'Kỷ Luật Thép, Củng Cố Nền Móng & Quản Trị Thực Tế',
    love: 'Chân thành, thực tế; thể hiện tình cảm qua trách nhiệm cụ thể.',
    career: 'Kiên trì hoàn thiện quy trình, củng cố vị trí và chuyên môn bền vững.',
    finance: 'Tiết kiệm, tái đầu tư an toàn; tuyệt đối tránh đầu cơ may rủi.',
    social: 'Duy trì quan hệ đối tác tin cậy, làm việc chuẩn mực và minh bạch.',
    learning: 'Học hỏi quản trị, chuyên môn sâu, kỹ năng tổ chức và vận hành.',
    family: 'Chăm sóc sức khỏe gia đình, sửa sang nhà cửa và xây dựng nền tảng vững.',
    nextYearPreview: 'Năm số 5 tới: Đổi mới, thích ứng với biến chuyển linh hoạt.',
    afterNextYearPreview: 'Năm số 6 sau đó: Trọng tâm yêu thương, tổ ấm và phụng sự.',
  },
  5: {
    yearNumber: 5,
    theme: 'Đổi Mới, Tự Do, Thích Ứng & Bước Ngoặt Bứt Phá',
    love: 'Nhiều trải nghiệm mới; cần giữ cam kết và tránh cảm xúc thất thường.',
    career: 'Linh hoạt nắm bắt cơ hội chuyển mình, mở rộng thị trường hoặc dự án mới.',
    finance: 'Thu nhập đa dạng; cẩn trọng chi tiêu bốc đồng trong các chuyến đi.',
    social: 'Giao lưu đối tác mới đa dạng, tiếp cận các xu hướng thị trường.',
    learning: 'Khám phá lĩnh vực mới, trau dồi ngoại ngữ và tư duy đổi mới.',
    family: 'Dành sự quan tâm chân thành giữa các lịch trình dịch chuyển bận rộn.',
    nextYearPreview: 'Năm số 6 tới: Quay về tổ ấm, gánh vác trách nhiệm gia đình.',
    afterNextYearPreview: 'Năm số 7 sau đó: Chiêm nghiệm, tĩnh tâm và nâng tầm nội lực.',
  },
  6: {
    yearNumber: 6,
    theme: 'Trách Nhiệm Gia Đình, Nuôi Dưỡng Tình Thương & Cống Hiến',
    love: 'Gắn kết bền chặt, sẵn sàng cam kết lâu dài và chăm lo cho tổ ấm.',
    career: 'Gánh vác vai trò quản lý, dẫn dắt đội ngũ bằng sự tận tâm và uy tín.',
    finance: 'Chi tiêu cho gia đình, nhà ở; quản lý tài chính an toàn, ổn định.',
    social: 'Giúp đỡ cộng đồng, xây dựng quan hệ dựa trên sự chân thành và tương trợ.',
    learning: 'Phát triển kỹ năng quản lý nhân sự, tư vấn, chăm sóc và thẩm mỹ.',
    family: 'Trọng tâm trọn vẹn dành cho tổ ấm, con cái và người thân.',
    nextYearPreview: 'Năm số 7 tới: Dành không gian tĩnh lặng nâng cao trí tuệ.',
    afterNextYearPreview: 'Năm số 8 sau đó: Gặt hái thành quả uy tín và tài chính.',
  },
  7: {
    yearNumber: 7,
    theme: 'Chiêm Nghiệm Nội Tâm, Nâng Cao Trí Tuệ & Tĩnh Lặng Chữa Lành',
    love: 'Cần không gian riêng tư; đối thoại chiều sâu về giá trị tinh thần.',
    career: 'Nghiên cứu chuyên sâu, hoàn thiện năng lực thay vì mở rộng ồ ạt.',
    finance: 'Quản lý an toàn, tránh đầu tư mạo hiểm; đầu tư cho học vấn.',
    social: 'Thu hẹp giao tế hình thức, giữ kết nối với tri kỷ và bậc tiền bối.',
    learning: 'Nghiên cứu triết học, chuyên môn học thuật, thiền định và nội tâm.',
    family: 'Lắng nghe, thấu hiểu và chia sẻ sự bình an tinh thần với người thân.',
    nextYearPreview: 'Năm số 8 tới: Bước ra gặt hái thành quả vật chất và vị thế.',
    afterNextYearPreview: 'Năm số 9 sau đó: Tổng kết, thanh lọc và bao dung.',
  },
  8: {
    yearNumber: 8,
    theme: 'Đỉnh Cao Tài Chính, Quyền Lực Điều Hành & Độc Lập Kinh Tế',
    love: 'Chủ động, rõ ràng; tránh để công việc và áp lực tài chính lấn át tình cảm.',
    career: 'Hiện thực hóa các mục tiêu lớn, khẳng định vị thế và uy tín lãnh đạo.',
    finance: 'Dòng tiền cực thịnh; quản trị rủi ro chặt chẽ và giữ gìn đạo đức.',
    social: 'Mở rộng mạng lưới lãnh đạo, doanh nhân và đối tác tầm cỡ.',
    learning: 'Nâng tầm tư duy tài chính, quản trị doanh nghiệp và chiến lược.',
    family: 'Đảm bảo đời sống vật chất sung túc; dành thời gian chất lượng cho người thân.',
    nextYearPreview: 'Năm số 9 tới: Khép lại chu kỳ, thanh lọc và tri ân.',
    afterNextYearPreview: 'Năm số 1 sau đó: Khởi đầu chu kỳ 9 năm hoàn toàn mới.',
  },
  9: {
    yearNumber: 9,
    theme: 'Tổng Kết Chu Kỳ, Buông Bỏ Điều Cũ & Phụng Sự Nhân Đạo',
    love: 'Bao dung, thứ tha; buông bỏ tổn thương cũ để đón nhận khởi đầu mới.',
    career: 'Hoàn tất các dự án tồn đọng, chuyển giao nhiệm vụ và thanh lọc mục tiêu.',
    finance: 'Đóng lại các khoản nợ cũ, cân đối ngân sách và trích quỹ thiện nguyện.',
    social: 'Tri ân người đồng hành, chia sẻ giá trị nhân văn tới cộng đồng.',
    learning: 'Đúc kết bài học sau 9 năm, rèn luyện tâm thái bao dung và buông bỏ.',
    family: 'Hàn gắn các khúc mắc gia đình, tổ chức sum họp ấm cúng.',
    nextYearPreview: 'Năm số 1 tới: Gieo mầm hạt giống mới cho chu kỳ 9 năm tiếp theo.',
    afterNextYearPreview: 'Năm số 2 sau đó: Nuôi dưỡng hạt mầm và hợp tác kiên nhẫn.',
  },
};

// 2. 9 NHÓM TÍNH CÁCH BẢN NGÃ (% DAO ĐỘNG)
export interface PersonalityGroup {
  id: number;
  name: string;
  percentage: number;
  description: string;
  advice: string;
}

export function calculatePersonalityGroups(fullName: string, birthDate: string): PersonalityGroup[] {
  // Normalize Vietnamese diacritics and combine all characters and digits
  const cleanName = (fullName || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
  const cleanDate = (birthDate || '').replace(/[^0-9]/g, '');

  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  // Letter to number Pythagoras map
  const letterMap: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  for (const ch of cleanName) {
    const val = letterMap[ch];
    if (val) counts[val] = (counts[val] || 0) + 1;
  }

  for (const digit of cleanDate) {
    const d = Number(digit);
    if (d >= 1 && d <= 9) counts[d] = (counts[d] || 0) + 2; // Date numbers carry double weight
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

  const groupTemplates = [
    { id: 1, name: 'Mạnh mẽ - Độc lập - Tự tin', description: 'Năng lực tiên phong, quyết đoán và làm chủ bản thân.' },
    { id: 2, name: 'Lắng nghe - Khéo léo - Nhạy cảm', description: 'Trực giác thấu cảm, khả năng hòa giải và kết nối con người.' },
    { id: 3, name: 'Sáng tạo - Hoạt bát - Lạc quan', description: 'Tư duy sắc bén, tài năng ngôn ngữ và truyền cảm hứng.' },
    { id: 4, name: 'Cẩn thận - Cầu toàn - Thực tế', description: 'Tính kỷ luật, tổ chức khoa học và quản trị chi tiết.' },
    { id: 5, name: 'Năng động - Linh hoạt - Tò mò', description: 'Khát vọng tự do, thích ứng nhanh và dám trải nghiệm cái mới.' },
    { id: 6, name: 'Quan tâm - Yêu thương - Trách nhiệm', description: 'Tình yêu gia đình, đức hy sinh và tinh thần bảo bọc.' },
    { id: 7, name: 'Thông thái - Khám phá - Triết học', description: 'Năng lực nghiên cứu, chiều sâu tư duy và tìm kiếm chân lý.' },
    { id: 8, name: 'Bản lĩnh - Điều hành - Thực tiễn', description: 'Tư duy kinh doanh, quản trị tài chính và nghị lực thép.' },
    { id: 9, name: 'Bao dung - Phụng sự - Hào phóng', description: 'Lý tưởng nhân đạo, tấm lòng vị tha và hoài bão lớn lao.' },
  ];

  return groupTemplates.map((g) => {
    const rawPct = Math.round(((counts[g.id] || 0) / total) * 100);
    const percentage = Math.max(0, Math.min(100, rawPct));
    let advice = 'Năng lượng đang ở mức hài hòa tự nhiên.';
    if (percentage > 20) advice = 'Năng lượng rất mạnh; cần học cách kiểm soát để tránh rơi vào thái cực cực đoan.';
    else if (percentage < 6) advice = 'Năng lượng còn khiêm tốn; nên chủ động rèn luyện thêm để đạt sự cân bằng toàn diện.';

    return {
      id: g.id,
      name: g.name,
      percentage,
      description: g.description,
      advice,
    };
  });
}

// 3. TỈ LỆ NHÓM NGÀNH NGHỀ PHÙ HỢP HOLLAND
export interface CareerMatchResult {
  groups: { code: string; nameVn: string; percentage: number; description: string }[];
  topGroups: string[];
  recommendedCareers: string[];
}

export function calculateHollandCareerMatch(
  lifePath: number,
  expression: number,
  soulUrge: number
): CareerMatchResult {
  const scores = {
    QUAN_LY: 20,
    KY_THUAT: 15,
    XA_HOI: 15,
    NGHIEP_VU: 15,
    NGHIEN_CUU: 15,
    NGHE_THUAT: 15,
  };

  const addScore = (num: number, weight: number) => {
    if ([1, 8, 22].includes(num)) scores.QUAN_LY += 15 * weight;
    if ([4, 7].includes(num)) scores.KY_THUAT += 12 * weight;
    if ([2, 6, 9, 33].includes(num)) scores.XA_HOI += 15 * weight;
    if ([4, 8].includes(num)) scores.NGHIEP_VU += 14 * weight;
    if ([7, 11, 5].includes(num)) scores.NGHIEN_CUU += 14 * weight;
    if ([3, 5, 6].includes(num)) scores.NGHE_THUAT += 15 * weight;
  };

  addScore(lifePath, 1.5);
  addScore(expression, 1.2);
  addScore(soulUrge, 1.0);

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const groupData = [
    { code: 'QUAN_LY', nameVn: 'Nhóm Quản Lý (Enterprising)', percentage: Math.round((scores.QUAN_LY / total) * 100), description: 'Lãnh đạo, khởi nghiệp, hoạch định chiến lược kinh doanh và điều hành tổ chức.' },
    { code: 'XA_HOI', nameVn: 'Nhóm Xã Hội (Social)', percentage: Math.round((scores.XA_HOI / total) * 100), description: 'Giáo dục, tư vấn tâm lý, đào tạo, y tế và hoạt động phụng sự cộng đồng.' },
    { code: 'NGHIEP_VU', nameVn: 'Nhóm Nghiệp Vụ (Conventional)', percentage: Math.round((scores.NGHIEP_VU / total) * 100), description: 'Quản trị tài chính, kế toán, ngân hàng, pháp lý và quản lý quy trình.' },
    { code: 'NGHIEN_CUU', nameVn: 'Nhóm Nghiên Cứu (Investigative)', percentage: Math.round((scores.NGHIEN_CUU / total) * 100), description: 'Khoa học công nghệ, phân tích dữ liệu, nghiên cứu học thuật và triết học.' },
    { code: 'NGHE_THUAT', nameVn: 'Nhóm Nghệ Thuật (Artistic)', percentage: Math.round((scores.NGHE_THUAT / total) * 100), description: 'Sáng tạo nội dung, thiết kế, truyền thông, viết lách và nghệ thuật biểu diễn.' },
    { code: 'KY_THUAT', nameVn: 'Nhóm Kỹ Thuật (Realistic)', percentage: Math.round((scores.KY_THUAT / total) * 100), description: 'Kỹ sư công nghệ, kiến trúc, xây dựng, sản xuất và vận hành máy móc.' },
  ].sort((a, b) => b.percentage - a.percentage);

  const topGroups = [groupData[0]!.nameVn, groupData[1]!.nameVn];

  const careerDict: Record<string, string[]> = {
    QUAN_LY: ['Giám đốc điều hành (CEO)', 'Chuyên gia hoạch định chiến lược', 'Nhà quản trị kinh doanh', 'Quản lý dự án cấp cao'],
    XA_HOI: ['Chuyên gia tâm lý / Coach', 'Giảng viên / Nhà giáo dục', 'Chuyên gia nhân sự & đào tạo', 'Quản lý tổ chức phi lợi nhuận'],
    NGHIEP_VU: ['Chuyên gia phân tích tài chính', 'Kiểm toán viên cao cấp', 'Chuyên viên quản trị dữ liệu', 'Luật sư doanh nghiệp'],
    NGHIEN_CUU: ['Kỹ sư AI & Khoa học dữ liệu', 'Nhà nghiên cứu khoa học', 'Chuyên gia phân tích thị trường', 'Bác sĩ / Dược sĩ nghiên cứu'],
    NGHE_THUAT: ['Giám đốc sáng tạo (Creative Director)', 'Nhà biên kịch / Nhà văn', 'Nhà thiết kế trải nghiệm người dùng (UX/UI)', 'Chuyên gia truyền thông đa phương tiện'],
    KY_THUAT: ['Kỹ sư phần mềm / Hệ thống', 'Kiến trúc sư công trình', 'Kỹ sư tự động hóa', 'Chuyên gia quản lý chuỗi cung ứng'],
  };

  const top1Careers = careerDict[groupData[0]!.code] || [];
  const top2Careers = careerDict[groupData[1]!.code] || [];
  const recommendedCareers = [...top1Careers, ...top2Careers.slice(0, 2)];

  return {
    groups: groupData,
    topGroups,
    recommendedCareers,
  };
}

// 4. DANH NHÂN & TƯƠNG THÍCH THEO SỐ CHỦ ĐẠO
export interface LifePathExtendedInfo {
  celebrities: string[];
  compatibleNumbers: { num: number; reason: string }[];
  incompatibleNumbers: { num: number; reason: string }[];
  loveStyle: string;
  cycle1Title: string;
  cycle1Meaning: string;
  cycle2Title: string;
  cycle2Meaning: string;
  cycle3Title: string;
  cycle3Meaning: string;
}

export const LIFE_PATH_EXTENDED_INFO: Record<number, LifePathExtendedInfo> = {
  1: {
    celebrities: ['Steve Jobs (Apple)', 'Walt Disney', 'Tom Hanks', 'Lady Gaga', 'Martin Luther King Jr.'],
    compatibleNumbers: [
      { num: 3, reason: 'Số 3 mang lại sự sáng tạo, niềm vui và sự lạc quan giúp số 1 bớt căng thẳng.' },
      { num: 5, reason: 'Số 5 năng động và yêu tự do, cùng số 1 dấn thân vào các dự án mạo hiểm thành công.' },
    ],
    incompatibleNumbers: [
      { num: 1, reason: 'Hai cái tôi độc lập dễ nảy sinh cạnh tranh và bất đồng trong việc ra quyết định.' },
      { num: 8, reason: 'Cả hai đều muốn nắm quyền kiểm soát, dễ xảy ra chiến tranh quyền lực nếu không nhường nhịn.' },
    ],
    loveStyle: 'Chủ động, dứt khoát và chung thủy nhưng cần đối phương tôn trọng không gian tự do riêng.',
    cycle1Title: 'Gieo Hạt Tự Lập',
    cycle1Meaning: 'Rèn luyện bản lĩnh vượt khó, tự đứng trên đôi chân mình từ rất sớm.',
    cycle2Title: 'Khẳng Định Vị Thế',
    cycle2Meaning: 'Nắm giữ vai trò lãnh đạo, tự tay mở lối sự nghiệp đỉnh cao.',
    cycle3Title: 'Viên Mãn Thu Hoạch',
    cycle3Meaning: 'Trở thành tấm gương tiên phong, truyền cảm hứng và dẫn dắt thế hệ trẻ.',
  },
  2: {
    celebrities: ['Barack Obama', 'Madonna', 'Kanye West', 'Meg Ryan', 'Tony Blair'],
    compatibleNumbers: [
      { num: 6, reason: 'Cả hai đều giàu lòng nhân ái, coi trọng tình thương gia đình và sự hòa thuận.' },
      { num: 8, reason: 'Số 8 đem lại sự che chở vững chắc về tài chính, số 2 hỗ trợ điểm tựa tinh thần ấm áp.' },
    ],
    incompatibleNumbers: [
      { num: 5, reason: 'Số 5 quá phiêu lưu và khó đoán, dễ làm tổn thương tâm hồn nhạy cảm của số 2.' },
      { num: 7, reason: 'Số 7 quá khép kín và lạnh lùng, khiến số 2 cảm thấy bị cô lập và thiếu tình cảm.' },
    ],
    loveStyle: 'Dịu dàng, nhạy cảm, luôn đặt hạnh phúc của đối phương lên trên và khát khao sự gắn kết trọn đời.',
    cycle1Title: 'Nuôi Dưỡng Lòng Trắc Ẩn',
    cycle1Meaning: 'Học cách lắng nghe, hòa nhập và bảo vệ ranh giới cảm xúc cá nhân.',
    cycle2Title: 'Xây Dựng Cầu Nối',
    cycle2Meaning: 'Gặt hái thành công từ ngoại giao, hợp tác và thấu hiểu lòng người.',
    cycle3Title: 'Thanh Thản Tâm Hồn',
    cycle3Meaning: 'Sống an yên, gia đạo hòa thuận và đón nhận sự yêu thương của con cháu.',
  },
  3: {
    celebrities: ['Hillary Clinton', 'Snoop Dogg', 'David Bowie', 'Celine Dion', 'John Travolta'],
    compatibleNumbers: [
      { num: 1, reason: 'Số 1 quyết đoán hỗ trợ số 3 hiện thực hóa các ý tưởng sáng tạo độc đáo.' },
      { num: 5, reason: 'Cả hai cùng yêu thích sự sôi động, tạo nên mối quan hệ ngập tràn niềm vui và tiếng cười.' },
    ],
    incompatibleNumbers: [
      { num: 4, reason: 'Số 4 quá quy củ và nghiêm khắc, dễ làm số 3 cảm thấy bị gò bó ngột ngạt.' },
      { num: 7, reason: 'Số 7 thích yên tĩnh một mình, trái ngược với tính cách hoạt ngôn sôi nổi của số 3.' },
    ],
    loveStyle: 'Lãng mạn, ngọt ngào, giàu cảm hứng nhưng cần sự kiên nhẫn khi tình cảm bước vào giai đoạn bình lặng.',
    cycle1Title: 'Khai Mở Năng Khiếu',
    cycle1Meaning: 'Phát hiện tài năng ngôn từ, nghệ thuật và xây dựng sự tự tin trước đám đông.',
    cycle2Title: 'Tỏa Sáng Danh Tiếng',
    cycle2Meaning: 'Đạt được sự công nhận từ xã hội qua các tác phẩm và ý tưởng sáng tạo xuất chúng.',
    cycle3Title: 'Truyền Cảm Hứng Vô Tận',
    cycle3Meaning: 'Mang lại tiếng cười, niềm lạc quan và triết lý sống tích cực cho cộng đồng.',
  },
  4: {
    celebrities: ['Bill Gates', 'Donald Trump', 'Keanu Reeves', 'Brad Pitt', 'Oprah Winfrey'],
    compatibleNumbers: [
      { num: 2, reason: 'Số 2 mang lại sự dịu dàng xoa dịu áp lực công việc cho số 4.' },
      { num: 8, reason: 'Cùng chung chí hướng xây dựng nền tảng tài chính kiên cố và kỷ luật thép.' },
    ],
    incompatibleNumbers: [
      { num: 3, reason: 'Số 3 dễ bị xao nhãng và tùy hứng, khiến số 4 cảm thấy thiếu an toàn.' },
      { num: 5, reason: 'Số 5 bốc đồng và yêu tự do, hoàn toàn đối lập với nhu cầu trật tự của số 4.' },
    ],
    loveStyle: 'Chân thành, đáng tin cậy, thể hiện tình yêu bằng trách nhiệm và sự lo toan chu đáo.',
    cycle1Title: 'Xây Đắp Nền Tảng',
    cycle1Meaning: 'Rèn giũa tính kỷ luật, học hỏi kiến thức thực tế và vượt qua áp lực ban đầu.',
    cycle2Title: 'Kiến Tạo Cơ Đồ',
    cycle2Meaning: 'Xây dựng sự nghiệp vững chắc, tích lũy tài sản và khẳng định uy tín nghề nghiệp.',
    cycle3Title: 'Vững Chãi Hậu Vận',
    cycle3Meaning: 'Hưởng an nhàn từ nền tảng vững vàng đã dày công kiến tạo suốt cuộc đời.',
  },
  5: {
    celebrities: ['Angelina Jolie', 'Mark Zuckerberg', 'Abraham Lincoln', 'Beyoncé', 'Mick Jagger'],
    compatibleNumbers: [
      { num: 1, reason: 'Cùng chung tinh thần dũng cảm, dám đương đầu với những bước ngoặt lớn.' },
      { num: 3, reason: 'Mối quan hệ đầy màu sắc, luôn tràn ngập những ý tưởng và chuyến đi mới mẻ.' },
    ],
    incompatibleNumbers: [
      { num: 4, reason: 'Sự cứng nhắc của số 4 sẽ kìm hãm đôi cánh tự do của số 5.' },
      { num: 2, reason: 'Số 2 quá nhạy cảm dễ bị tổn thương trước sự bất định của số 5.' },
    ],
    loveStyle: 'Nồng nhiệt, cuốn hút, ghét sự nhàm chán và luôn cần sự đổi mới trong tình cảm.',
    cycle1Title: 'Khám Phá Chân Trời',
    cycle1Meaning: 'Trải nghiệm nhiều môi trường sống, dũng cảm thử nghiệm cái mới để tìm ra đam mê.',
    cycle2Title: 'Bứt Phá Giới Hạn',
    cycle2Meaning: 'Nắm bắt các cơ hội đổi mới, chuyển mình linh hoạt để đạt thành tựu đột phá.',
    cycle3Title: 'Tự Do Tâm Thức',
    cycle3Meaning: 'Thanh thản, sở hữu vốn sống phong phú và thế giới quan rộng mở bao la.',
  },
  6: {
    celebrities: ['Albert Einstein', 'Michael Jackson', 'John Lennon', 'Robert De Niro', 'George W. Bush'],
    compatibleNumbers: [
      { num: 2, reason: 'Cùng chung nhịp đập yêu thương, chăm chút chu đáo cho gia đình hạnh phúc.' },
      { num: 9, reason: 'Cùng hướng đến lý tưởng nhân đạo, chia sẻ tấm lòng vị tha cao cả.' },
    ],
    incompatibleNumbers: [
      { num: 5, reason: 'Số 5 khó lòng đáp ứng nhu cầu gắn kết gia đình ổn định của số 6.' },
      { num: 1, reason: 'Sự độc đoán của số 1 dễ làm số 6 cảm thấy bị tổn thương lòng tốt.' },
    ],
    loveStyle: 'Bảo bọc, ấm áp, coi trọng mái ấm gia đình và luôn hết lòng vì người mình yêu.',
    cycle1Title: 'Gieo Mầm Yêu Thương',
    cycle1Meaning: 'Học cách dung hòa giữa việc chăm lo cho người khác và yêu thương chính mình.',
    cycle2Title: 'Vun Đắp Tổ Ấm',
    cycle2Meaning: 'Gặt hái thành công từ các ngành nghề phụng sự, gia đạo ấm êm con cái thành đạt.',
    cycle3Title: 'Hưởng Phúc Trường Cửu',
    cycle3Meaning: 'Được con cháu hiếu kính yêu thương, sống an lạc trong tình cảm gia đình viên mãn.',
  },
  7: {
    celebrities: ['Stephen Hawking', 'Elon Musk', 'Leonardo DiCaprio', 'Princess Diana', 'Al Pacino'],
    compatibleNumbers: [
      { num: 4, reason: 'Cùng tôn trọng sự thật, làm việc có phương pháp và logic sâu sắc.' },
      { num: 9, reason: 'Chia sẻ chiều sâu tư tưởng, cùng hướng đến những giá trị tinh thần cao quý.' },
    ],
    incompatibleNumbers: [
      { num: 2, reason: 'Sự lạnh lùng triết học của số 7 dễ khiến số 2 cảm thấy bị bỏ rơi.' },
      { num: 3, reason: 'Số 3 quá náo nhiệt ồn ào làm xáo trộn không gian tĩnh lặng của số 7.' },
    ],
    loveStyle: 'Sâu sắc, thầm kín, chỉ mở lòng với người thực sự thấu hiểu thế giới nội tâm của mình.',
    cycle1Title: 'Hành Trình Chiêm Nghiệm',
    cycle1Meaning: 'Trải qua thử thách để đúc kết bài học nhân sinh và khám phá cội nguồn tri thức.',
    cycle2Title: 'Khai Mở Trí Tuệ',
    cycle2Meaning: 'Trở thành chuyên gia xuất chúng trong lĩnh vực nghiên cứu, giảng dạy hoặc tâm linh.',
    cycle3Title: 'Thấu Suốt Chân Lý',
    cycle3Meaning: 'Đạt sự an lạc tinh thần tuyệt đối, trao truyền tri thức thông thái cho thế hệ sau.',
  },
  8: {
    celebrities: ['Nelson Mandela', 'Sandra Bullock', 'Matt Damon', 'Robin Williams', 'Gwyneth Paltrow'],
    compatibleNumbers: [
      { num: 2, reason: 'Số 2 mang lại sự dịu dàng cân bằng nguồn năng lượng quyết liệt của số 8.' },
      { num: 4, reason: 'Cùng chung chí hướng làm ăn thực tế, xây dựng cơ nghiệp tài chính trường tồn.' },
    ],
    incompatibleNumbers: [
      { num: 1, reason: 'Hai con số quyền lực dễ đối đầu trực diện nếu không có sự nhường nhịn.' },
      { num: 5, reason: 'Số 5 tiêu xài tùy hứng dễ làm số 8 cảm thấy thiếu an toàn tài chính.' },
    ],
    loveStyle: 'Chân thành, hào phóng, chu cấp đầy đủ vật chất nhưng cần học cách bày tỏ cảm xúc nhẹ nhàng.',
    cycle1Title: 'Rèn Luyện Bản Lĩnh',
    cycle1Meaning: 'Vượt qua những bài học tiền bạc đầu đời để tôi luyện tư duy kinh doanh nhạy bén.',
    cycle2Title: 'Chinh Phục Đỉnh Cao',
    cycle2Meaning: 'Đạt độc lập tài chính, thăng tiến vượt bậc và khẳng định vị thế lãnh đạo.',
    cycle3Title: 'Kiến Tạo Di Sản',
    cycle3Meaning: 'Dùng tài chính và quyền lực để tạo dựng các giá trị bền vững cho xã hội.',
  },
  9: {
    celebrities: ['Mahatma Gandhi', 'Mother Teresa', 'Jim Carrey', 'Morgan Freeman', 'Harrison Ford'],
    compatibleNumbers: [
      { num: 6, reason: 'Cùng chung trái tim ấm áp, sẵn sàng cống hiến vì hạnh phúc của số đông.' },
      { num: 3, reason: 'Số 3 giúp số 9 diễn đạt lý tưởng nhân đạo một cách sinh động, thu hút.' },
    ],
    incompatibleNumbers: [
      { num: 4, reason: 'Số 4 quá thực tế vi mô, trái ngược với tầm nhìn vĩ mô nhân đạo của số 9.' },
      { num: 8, reason: 'Số 8 chú trọng vật chất dễ xung đột với lý tưởng vô điều kiện của số 9.' },
    ],
    loveStyle: 'Bao dung, hy sinh, luôn muốn người mình yêu có cuộc sống tốt đẹp nhất.',
    cycle1Title: 'Nuôi Dưỡng Hoài Bão',
    cycle1Meaning: 'Phát triển lòng trắc ẩn và tinh thần trách nhiệm xã hội từ thời trẻ.',
    cycle2Title: 'Cống Hiến Phụng Sự',
    cycle2Meaning: 'Tạo dựng tầm ảnh hưởng lớn trong các hoạt động văn hóa, giáo dục và thiện nguyện.',
    cycle3Title: 'Viên Mãn Đại Thành',
    cycle3Meaning: 'Được muôn người kính trọng, để lại tiếng thơm và di sản nhân văn muôn đời.',
  },
  11: {
    celebrities: ['Barack Obama (Master 11 Expression)', 'Wolfgang Amadeus Mozart', 'Orlando Bloom', 'Michelle Obama'],
    compatibleNumbers: [
      { num: 2, reason: 'Cùng tần số trực giác nhạy cảm, thấu cảm sâu sắc lẫn nhau.' },
      { num: 6, reason: 'Mang lại sự an tâm, tình thương nuôi dưỡng bảo bọc.' },
    ],
    incompatibleNumbers: [
      { num: 5, reason: 'Sự bốc đồng của số 5 làm xáo trộn năng lượng tinh thần thanh tịnh của 11.' },
    ],
    loveStyle: 'Kết nối tâm hồn sâu sắc, trực giác thấu thị và tìm kiếm tình yêu thanh cao thiêng liêng.',
    cycle1Title: 'Thức Tỉnh Tâm Thức',
    cycle1Meaning: 'Nhận thức được độ nhạy cảm tâm linh và học cách cân bằng cảm xúc.',
    cycle2Title: 'Soi Sáng Dẫn Đường',
    cycle2Meaning: 'Truyền cảm hứng, thức tỉnh niềm tin và định hướng tinh thần cho người khác.',
    cycle3Title: 'Giác Ngộ Tinh Thần',
    cycle3Meaning: 'Sống an lạc, trở thành ngọn hải đăng tâm thức cho cộng đồng.',
  },
  22: {
    celebrities: ['Paul McCartney', 'Sir Richard Branson', 'Dean Martin', 'Dalai Lama XIV'],
    compatibleNumbers: [
      { num: 4, reason: 'Cùng chung năng lực tổ chức thực tế và kỷ luật vững vàng.' },
      { num: 8, reason: 'Sức mạnh kiến tạo kết hợp cùng bản lĩnh tài chính tạo nên kỳ tích.' },
    ],
    incompatibleNumbers: [
      { num: 3, reason: 'Thiếu sự kỷ luật của số 3 dễ làm chậm tiến độ các dự án vĩ mô của 22.' },
    ],
    loveStyle: 'Vững vàng, chung thủy, xây dựng mối quan hệ đồng hành bền vững cùng phát triển.',
    cycle1Title: 'Học Hỏi Nền Tảng',
    cycle1Meaning: 'Tích lũy kiến thức quản trị thực tế và nuôi dưỡng tầm nhìn chiến lược.',
    cycle2Title: 'Đại Kiến Tạo Cơ Đồ',
    cycle2Meaning: 'Hiện thực hóa các dự án quy mô lớn, xây dựng những công trình để đời.',
    cycle3Title: 'Di Sản Trường Tồn',
    cycle3Meaning: 'Những gì bạn gây dựng trở thành di sản phục vụ muôn người cho mai sau.',
  },
};

// 5. MA TRẬN 3X3 NGÀY SINH & CÁC MŨI TÊN CÁ TÍNH (ARROWS OF INDIVIDUALITY)
export interface ArrowOfIndividuality {
  name: string;
  numbers: number[];
  type: 'strength' | 'weakness';
  title: string;
  description: string;
  advice: string;
}

export interface BirthChartResult {
  matrixCounts: Record<number, number>; // counts of 1-9
  arrows: ArrowOfIndividuality[];
  planes: {
    physical: number; // sum of 1, 4, 7
    emotional: number; // sum of 2, 5, 8
    mental: number; // sum of 3, 6, 9
  };
}

export function calculateBirthChart(birthDate: string): BirthChartResult {
  const digits = birthDate.replace(/[^0-9]/g, '');
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (const ch of digits) {
    const d = Number(ch);
    if (d >= 1 && d <= 9) counts[d] = (counts[d] || 0) + 1;
  }

  const arrows: ArrowOfIndividuality[] = [];

  // Mũi tên Kế Hoạch 1-2-3
  if (counts[1] && counts[2] && counts[3]) {
    arrows.push({
      name: '1-2-3',
      numbers: [1, 2, 3],
      type: 'strength',
      title: 'Mũi Tên Kế Hoạch (Planning Arrow)',
      description: 'Bạn là người làm việc có phương pháp, trật tự và khả năng hoạch định chiến lược bài bản.',
      advice: 'Tránh sa vào việc lên kế hoạch quá chi tiết mà chậm trễ bắt tay vào hành động thực tế.',
    });
  } else if (!counts[1] && !counts[2] && !counts[3]) {
    arrows.push({
      name: '1-2-3-empty',
      numbers: [1, 2, 3],
      type: 'weakness',
      title: 'Mũi Tên Tùy Hứng / Thiếu Kế Hoạch',
      description: 'Làm việc theo cảm hứng nhất thời, dễ mất định hướng khi gặp khó khăn phức tạp.',
      advice: 'Tập thói quen ghi chú công việc ra sổ và đặt mục tiêu rõ ràng từng ngày.',
    });
  }

  // Mũi tên Ý Chí 4-5-6
  if (counts[4] && counts[5] && counts[6]) {
    arrows.push({
      name: '4-5-6',
      numbers: [4, 5, 6],
      type: 'strength',
      title: 'Mũi Tên Ý Chí (Willpower Arrow)',
      description: 'Nghị lực kiên cường phi thường, không bao giờ chịu khuất phục trước nghịch cảnh.',
      advice: 'Tránh tính cố chấp, bảo thủ; biết lắng nghe góc nhìn của người khác.',
    });
  } else if (!counts[4] && !counts[5] && !counts[6]) {
    arrows.push({
      name: '4-5-6-empty',
      numbers: [4, 5, 6],
      type: 'weakness',
      title: 'Mũi Tên Uất Giận / Thất Vọng',
      description: 'Dễ nản lòng và tích tụ cảm xúc bực bội khi kỳ vọng không đạt như ý muốn.',
      advice: 'Học cách buông xả, chấp nhận sự không hoàn hảo và kiên nhẫn hơn.',
    });
  }

  // Mũi tên Hoạt Động 7-8-9
  if (counts[7] && counts[8] && counts[9]) {
    arrows.push({
      name: '7-8-9',
      numbers: [7, 8, 9],
      type: 'strength',
      title: 'Mũi Tên Hoạt Động (Activity Arrow)',
      description: 'Năng động, giàu nhiệt huyết, thích đi đây đi đó và trải nghiệm cuộc sống thực tế.',
      advice: 'Tránh tiêu hao năng lượng quá mức; cần dành thời gian tĩnh lặng nghỉ ngơi.',
    });
  } else if (!counts[7] && !counts[8] && !counts[9]) {
    arrows.push({
      name: '7-8-9-empty',
      numbers: [7, 8, 9],
      type: 'weakness',
      title: 'Mũi Tên Thụ Động (Passivity)',
      description: 'Có xu hướng chần chừ, ngại thay đổi và lười vận động cơ thể.',
      advice: 'Tập thể dục thể thao hàng ngày và chủ động tham gia các hoạt động ngoại khóa.',
    });
  }

  // Mũi tên Thực Tế 1-4-7
  if (counts[1] && counts[4] && counts[7]) {
    arrows.push({
      name: '1-4-7',
      numbers: [1, 4, 7],
      type: 'strength',
      title: 'Mũi Tên Thực Tế (Practicality Arrow)',
      description: 'Khéo léo, thực tế, chỉ tin vào những gì mắt thấy tai nghe và có đôi tay lành nghề.',
      advice: 'Mở rộng tâm trí đón nhận các khía cạnh tinh thần và cảm xúc tinh tế.',
    });
  }

  // Mũi tên Cân Bằng Cảm Xúc 2-5-8
  if (counts[2] && counts[5] && counts[8]) {
    arrows.push({
      name: '2-5-8',
      numbers: [2, 5, 8],
      type: 'strength',
      title: 'Mũi Tên Cân Bằng Cảm Xúc (Emotional Balance Arrow)',
      description: 'Trực giác thấu cảm tuyệt vời, nội tâm vững vàng và biết làm chủ cảm xúc.',
      advice: 'Dùng sự thấu hiểu này để làm điểm tựa tinh thần và gắn kết mọi người.',
    });
  } else if (!counts[2] && !counts[5] && !counts[8]) {
    arrows.push({
      name: '2-5-8-empty',
      numbers: [2, 5, 8],
      type: 'weakness',
      title: 'Mũi Tên Nhạy Cảm Quá Mức',
      description: 'Dễ bị tổn thương tâm lý, nhạy cảm trước lời phán xét của người khác.',
      advice: 'Tập thiền định, tránh suy diễn tiêu cực và rèn luyện bản lĩnh tâm lý vững chãi.',
    });
  }

  // Mũi tên Trí Tuệ Sáng Suốt 3-6-9
  if (counts[3] && counts[6] && counts[9]) {
    arrows.push({
      name: '3-6-9',
      numbers: [3, 6, 9],
      type: 'strength',
      title: 'Mũi Tên Trí Tuệ Sáng Suốt (Intellect Arrow)',
      description: 'Trí nhớ xuất chúng, khả năng tư duy trừu tượng, logic và học rộng hiểu sâu.',
      advice: 'Đừng tự mãn với trí tuệ của mình; hãy dùng nó để phụng sự xã hội một cách khiêm nhường.',
    });
  } else if (!counts[3] && !counts[6] && !counts[9]) {
    arrows.push({
      name: '3-6-9-empty',
      numbers: [3, 6, 9],
      type: 'weakness',
      title: 'Mũi Tên Trí Nhớ Ngắn Hạn',
      description: 'Hay quên hoặc khó tập trung ghi nhớ các chi tiết trừu tượng kéo dài.',
      advice: 'Ghi chép công việc thường xuyên và rèn luyện trí nhớ qua đọc sách mỗi ngày.',
    });
  }

  // Mũi tên Quyết Tâm 1-5-9
  if (counts[1] && counts[5] && counts[9]) {
    arrows.push({
      name: '1-5-9',
      numbers: [1, 5, 9],
      type: 'strength',
      title: 'Mũi Tên Quyết Tâm (Determination Arrow)',
      description: 'Bền bỉ, kiên định theo đuổi mục tiêu đến cùng, không bao giờ bỏ cuộc nửa chừng.',
      advice: 'Cần linh hoạt biết dừng đúng lúc khi mục tiêu ban đầu không còn phù hợp.',
    });
  } else if (!counts[1] && !counts[5] && !counts[9]) {
    arrows.push({
      name: '1-5-9-empty',
      numbers: [1, 5, 9],
      type: 'weakness',
      title: 'Mũi Tên Trì Hoãn (Procrastination)',
      description: 'Hay do dự, chần chừ và dễ bỏ lỡ những thời cơ bứt phá quan trọng.',
      advice: 'Quy tắc 5 giây: đếm từ 1 đến 5 và bắt tay vào làm ngay lập tức.',
    });
  }

  // Mũi tên Tâm Linh 3-5-7
  if (counts[3] && counts[5] && counts[7]) {
    arrows.push({
      name: '3-5-7',
      numbers: [3, 5, 7],
      type: 'strength',
      title: 'Mũi Tên Tâm Linh / Giác Ngộ (Spirituality Arrow)',
      description: 'Trực giác tâm linh sâu sắc, thấu suốt các quy luật nhân quả và dòng chảy vũ trụ.',
      advice: 'Ứng dụng sự thấu suốt này vào đời sống thực tế để lan tỏa sự an lạc cho xung quanh.',
    });
  } else if (!counts[3] && !counts[5] && !counts[7]) {
    arrows.push({
      name: '3-5-7-empty',
      numbers: [3, 5, 7],
      type: 'weakness',
      title: 'Mũi Tên Hoài Nghi (Skepticism)',
      description: 'Hay đa nghi, chỉ tin khi đã tự mình nếm trải mất mát hoặc thất bại thực tế.',
      advice: 'Học cách tin tưởng vào những điều tốt đẹp và mở lòng học hỏi từ kinh nghiệm người đi trước.',
    });
  }

  const planes = {
    physical: (counts[1] || 0) + (counts[4] || 0) + (counts[7] || 0),
    emotional: (counts[2] || 0) + (counts[5] || 0) + (counts[8] || 0),
    mental: (counts[3] || 0) + (counts[6] || 0) + (counts[9] || 0),
  };

  return {
    matrixCounts: counts,
    arrows,
    planes,
  };
}

// 6. CHỈ SỐ NỢ NGHIỆP & BÀI HỌC LINH HỒN (KARMIC DEBTS & LESSONS)
export interface KarmicDebtInfo {
  code: string;
  name: string;
  meaning: string;
  advice: string;
}

export const KARMIC_DEBTS: Record<string, KarmicDebtInfo> = {
  '13/4': {
    code: '13/4',
    name: 'Nợ Nghiệp Lười Biếng / Trốn Tránh Trách Nhiệm',
    meaning: 'Bài học về sự chăm chỉ, kỷ luật và kiên trì. Trong kiếp này bạn thường phải nỗ lực gấp đôi người khác mới đạt kết quả, không có đường tắt.',
    advice: 'Làm việc cần mẫn, có trật tự, tôn trọng quy trình và không bao giờ đổ lỗi cho hoàn cảnh.',
  },
  '14/5': {
    code: '14/5',
    name: 'Nợ Nghiệp Lạm Dụng Tự Do / Buông Thả Giác Quan',
    meaning: 'Bài học về tính điều độ và cam kết. Bạn dễ bị cám dỗ bởi những thú vui nhất thời hoặc thay đổi liên tục khiến công việc dở dang.',
    advice: 'Học cách giữ lời hứa, quản lý bản thân nghiêm ngặt và duy trì lối sống lành mạnh.',
  },
  '16/7': {
    code: '16/7',
    name: 'Nợ Nghiệp Kiêu Ngạo / Đổ Vỡ Niềm Tin',
    meaning: 'Bài học thanh lọc bản ngã (Ego). Bạn có thể từng trải qua những sự sụp đổ bất ngờ trong tình cảm hoặc sự nghiệp để thức tỉnh tâm thức.',
    advice: 'Sống khiêm nhường, chân thành, xây dựng mối quan hệ dựa trên sự trung thực tuyệt đối.',
  },
  '19/1': {
    code: '19/1',
    name: 'Nợ Nghiệp Lạm Quyền / Độc Đoán Áp Đặt',
    meaning: 'Bài học về sự chia sẻ và hợp tác. Bạn có thể cảm thấy cô đơn hoặc bị người khác phản đối nếu hành xử quá độc tài, chỉ biết đến mình.',
    advice: 'Biết lắng nghe, san sẻ quyền lực và nâng đỡ đồng đội thay vì coi mình là trung tâm.',
  },
};

export function detectKarmicDebts(birthDate: string, lifePath: number): KarmicDebtInfo[] {
  const parts = birthDate.split('-');
  const day = Number(parts[2] || 0);
  const debts: KarmicDebtInfo[] = [];

  if (day === 13 || lifePath === 4) debts.push(KARMIC_DEBTS['13/4']!);
  if (day === 14 || lifePath === 5) debts.push(KARMIC_DEBTS['14/5']!);
  if (day === 16 || lifePath === 7) debts.push(KARMIC_DEBTS['16/7']!);
  if (day === 19 || lifePath === 1) debts.push(KARMIC_DEBTS['19/1']!);

  return debts;
}

export interface KarmicLessonInfo {
  number: number;
  name: string;
  missingTrait: string;
  solution: string;
}

export const KARMIC_LESSONS: Record<number, KarmicLessonInfo> = {
  1: { number: 1, name: 'Bài Học Tự Lập & Quyết Đoán', missingTrait: 'Thiếu sự tự tin, sợ đứng mũi chịu sào, hay do dự ỷ lại.', solution: 'Rèn luyện tính tự lập, tự mình ra quyết định và dám chịu trách nhiệm.' },
  2: { number: 2, name: 'Bài Học Lắng Nghe & Hợp Tác', missingTrait: 'Thiếu kiên nhẫn lắng nghe, khó hòa đồng hoặc ngại chia sẻ cảm xúc.', solution: 'Học cách thấu cảm, tinh tế trong giao tiếp và xây dựng tinh thần đồng đội.' },
  3: { number: 3, name: 'Bài Học Biểu Đạt & Sáng Tạo', missingTrait: 'Ngại nói trước đám đông, kìm nén cảm xúc và sợ bị phán xét.', solution: 'Thực hành nói trước gương, viết nhật ký và tự do sáng tạo nghệ thuật.' },
  4: { number: 4, name: 'Bài Học Kỷ Luật & Trật Tự', missingTrait: 'Sống tùy hứng, thiếu quy củ, quản lý tài chính lỏng lẻo.', solution: 'Thiết lập thời gian biểu khoa học, kiểm soát chi tiêu và hoàn thành việc đúng hẹn.' },
  5: { number: 5, name: 'Bài Học Linh Hoạt & Đổi Mới', missingTrait: 'Sợ rủi ro, ngại thay đổi môi trường sống, bảo thủ.', solution: 'Dũng cảm bước ra khỏi vùng an toàn, đi du lịch và thử nghiệm những điều mới lạ.' },
  6: { number: 6, name: 'Bài Học Tình Thương & Trách Nhiệm', missingTrait: 'Ít quan tâm đến gia đình, ngại gánh vác trách nhiệm chăm sóc người khác.', solution: 'Chủ động chăm sóc người thân, dành thời gian chất lượng cho tổ ấm.' },
  7: { number: 7, name: 'Bài Học Tri Thức & Chiêm Nghiệm', missingTrait: 'Nông nổi, chỉ tin vào bề nổi mà không tìm hiểu bản chất sâu xa.', solution: 'Đọc sách nhiều hơn, dành thời gian tĩnh tâm và nghiên cứu chuyên sâu.' },
  8: { number: 8, name: 'Bài Học Quản Trị & Tài Chính', missingTrait: 'Ngại bàn chuyện tiền bạc, thiếu năng lực điều hành thực tế.', solution: 'Học về quản lý tài chính cá nhân, đầu tư bài bản và rèn luyện tư duy thực tế.' },
  9: { number: 9, name: 'Bài Học Bao Dung & Vị Tha', missingTrait: 'Dễ hẹp hòi, hay để bụng, thiếu tinh thần vì cộng đồng.', solution: 'Thực hành tha thứ, tham gia các hoạt động thiện nguyện chia sẻ yêu thương.' },
};

export function detectMissingKarmicLessons(fullName: string): KarmicLessonInfo[] {
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
  const letterMap: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9,
  };

  const present = new Set<number>();
  for (const ch of cleanName) {
    const n = letterMap[ch];
    if (n) present.add(n);
  }

  const missing: KarmicLessonInfo[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!present.has(i) && KARMIC_LESSONS[i]) {
      missing.push(KARMIC_LESSONS[i]!);
    }
  }

  return missing;
}

// 7. CHỈ SỐ THÁI ĐỘ (ATTITUDE NUMBER)
export function calculateAttitudeNumber(birthDate: string): number {
  const parts = birthDate.split('-');
  const month = Number(parts[1] || 1);
  const day = Number(parts[2] || 1);

  const reduceNum = (n: number): number => {
    let sum = n;
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  };

  return reduceNum(reduceNum(month) + reduceNum(day));
}

export const ATTITUDE_INTERPRETATIONS: Record<number, { title: string; meaning: string; advice: string }> = {
  1: {
    title: 'Thái Độ Tiên Phong & Độc Lập',
    meaning: 'Trước mọi biến cố, bạn phản ứng nhanh chóng, dứt khoát và chủ động đứng ra giải quyết vấn đề mà không cần dựa dẫm vào ai.',
    advice: 'Tránh vội vã phán xét hay lấn át người khác; giữ thái độ bình tĩnh hợp tác.',
  },
  2: {
    title: 'Thái Độ Nhẹ Nhàng & Hòa Giải',
    meaning: 'Bạn phản ứng bằng sự bình tĩnh, lắng nghe và tìm cách hòa giải mâu thuẫn để giữ hòa khí cho tập thể.',
    advice: 'Tự tin bày tỏ quan điểm của mình, không nên nhượng bộ vô điều kiện.',
  },
  3: {
    title: 'Thái Độ Hài Hước & Lạc Quan',
    meaning: 'Bạn luôn nhìn vào mặt tích cực của vấn đề, dùng sự lạc quan và hài hước để xua tan không khí căng thẳng.',
    advice: 'Đối diện trực tiếp với khó khăn thay vì tìm cách né tránh bằng những trò đùa.',
  },
  4: {
    title: 'Thái Độ Kỷ Luật & Thực Tế',
    meaning: 'Bạn phản ứng rất điềm đạm, yêu cầu dữ liệu chính xác và tìm kiếm giải pháp có tính khả thi từng bước.',
    advice: 'Linh hoạt ứng biến trước những thay đổi đột xuất; không nên quá cứng nhắc.',
  },
  5: {
    title: 'Thái Độ Năng Động & Thích Ứng',
    meaning: 'Bạn rất nhanh nhạy, thích thú với những thách thức bất ngờ và sẵn sàng đổi hướng để nắm bắt cơ hội mới.',
    advice: 'Kiên trì theo đuổi giải pháp đã chọn thay vì thay đổi quá liên tục.',
  },
  6: {
    title: 'Thái Độ Chăm Sóc & Trách Nhiệm',
    meaning: 'Phản ứng đầu tiên của bạn là bảo bọc, lo lắng cho sự an nguy và cảm xúc của những người xung quanh.',
    advice: 'Hãy để người khác tự giải quyết bài học của họ; đừng ôm đồm mọi gánh nặng lên vai.',
  },
  7: {
    title: 'Thái Độ Điềm Tĩnh & Quan Sát',
    meaning: 'Bạn im lặng quan sát, phân tích cặn kẽ bản chất vấn đề trước khi đưa ra bất kỳ kết luận hay hành động nào.',
    advice: 'Mở lòng chia sẻ suy nghĩ với người thân để tránh bị hiểu lầm là xa cách, lạnh lùng.',
  },
  8: {
    title: 'Thái Độ Quyết Liệt & Làm Chủ',
    meaning: 'Bạn phản ứng đầy uy quyền, nhìn thấy cơ hội kinh doanh và tìm cách kiểm soát tình thế để biến khó khăn thành kết quả.',
    advice: 'Kết hợp sự quyết đoán với lòng trắc ẩn để thu phục lòng người trọn vẹn.',
  },
  9: {
    title: 'Thái Độ Bao Dung & Nhân Ái',
    meaning: 'Bạn nhìn nhận vấn đề dưới góc nhìn nhân văn, sẵn sàng tha thứ và tìm kiếm giải pháp mang lại lợi ích chung.',
    advice: 'Bảo vệ ranh giới cá nhân để không bị người xấu lợi dụng lòng tốt.',
  },
};

// 8. TƯƠNG QUAN ĐƯỜNG ĐỜI - SỨ MỆNH & ĐƯỜNG ĐỜI - LINH HỒN
export function evaluateLifePathExpressionHarmony(lifePath: number, expression: number): {
  type: 'harmony' | 'complementary' | 'conflict';
  title: string;
  description: string;
  advice: string;
} {
  if (lifePath === expression) {
    return {
      type: 'harmony',
      title: 'Đồng Điệu Tuyệt Đối (Trùng Khớp Năng Lượng)',
      description: `Cả con đường đời và công cụ thực hiện đều mang năng lượng số ${lifePath}. Bạn biết rất rõ mình là ai và con đường mình đi vô cùng nhất quán, dễ gặt hái thành tựu lớn.`,
      advice: 'Phát huy tối đa thế mạnh này nhưng chú ý bổ sung các bài học của những con số khác để không bị thiên lệch.',
    };
  }

  const even = [2, 4, 6, 8, 22];
  const odd = [1, 3, 5, 7, 9, 11, 33];
  const bothEven = even.includes(lifePath) && even.includes(expression);
  const bothOdd = odd.includes(lifePath) && odd.includes(expression);

  if (bothEven || bothOdd) {
    return {
      type: 'complementary',
      title: 'Cộng Hưởng Bổ Trợ Tương Sinh',
      description: `Đường đời số ${lifePath} và Sứ mệnh số ${expression} cùng chung hệ rung động (${bothEven ? 'Thực tế & Ổn định' : 'Năng động & Trí tuệ'}). Công cụ của bạn bổ trợ rất tốt cho mục tiêu dài hạn.`,
      advice: 'Tận dụng tài năng bẩm sinh của số Sứ mệnh để làm đòn bẩy vững chắc chinh phục đỉnh cao Đường đời.',
    };
  }

  return {
    type: 'conflict',
    title: 'Thách Thức Cân Bằng (Mâu Thuẫn Nội Tại)',
    description: `Đường đời số ${lifePath} và Sứ mệnh số ${expression} mang hai nguồn năng lượng khác biệt (một bên lý trí - một bên cảm xúc, hoặc một bên thích tự do - một bên thích an toàn). Đôi khi bạn cảm thấy việc mình làm hàng ngày chưa hoàn toàn ăn khớp với khát vọng đường đời.`,
    advice: 'Học cách dung hòa: coi sự khác biệt này là một kho tàng đa kỹ năng giúp bạn thích ứng trong mọi hoàn cảnh.',
  };
}

export function evaluateLifePathSoulHarmony(lifePath: number, soulUrge: number): {
  type: 'harmony' | 'complementary' | 'conflict';
  title: string;
  description: string;
  advice: string;
} {
  if (lifePath === soulUrge) {
    return {
      type: 'harmony',
      title: 'Nội Ngoại Tương Hợp Viên Mãn',
      description: `Điều trái tim bạn khát khao (Linh hồn ${soulUrge}) hoàn toàn trùng khớp với sứ mệnh con đường bạn đi (Đường đời ${lifePath}). Bạn luôn cảm thấy an vui và nhiệt huyết trong từng bước đi.`,
      advice: 'Giữ vững niềm tin và lan tỏa nguồn năng lượng hạnh phúc tự nhiên này cho những người xung quanh.',
    };
  }

  return {
    type: 'complementary',
    title: 'Bổ Trợ Chiều Sâu Nội Tâm',
    description: `Trái tim bạn khao khát giá trị của số ${soulUrge}, trong khi đường đời mời gọi bạn trải nghiệm bài học số ${lifePath}. Hai năng lượng này cùng bồi đắp cho một nhân cách phong phú, toàn diện.`,
    advice: 'Đừng quên chăm sóc nhu cầu tâm hồn của số Linh Hồn để duy trì nguồn năng lượng bền bỉ cho chặng đường dài.',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// HOLISTIC SYNTHESIS — cross-factor analysis
// ─────────────────────────────────────────────────────────────────────────────

export interface NumerologyHolisticSynthesis {
  coreTriangle: {
    lifePathVsExpression: { label: string; pattern: 'HARMONY' | 'TENSION' | 'NEUTRAL'; description: string };
    lifePathVsSoul: { label: string; pattern: 'HARMONY' | 'TENSION' | 'NEUTRAL'; description: string };
    overallDynamic: string;
  };
  temporalBlueprint: {
    currentPinnacleLabel: string;
    currentChallengeLabel: string;
    confluenceNote: string;
  };
  actionPlan: {
    priorities: string[];
    pitfalls: string[];
    motto: string;
  };
}

export function generateNumerologyHolisticSynthesis(
  lifePath: number,
  expression: number,
  soulUrge: number,
  personalYear: number,
  _birthDateStr: string,
  cyclesData?: { pinnacles?: Array<{ number: number; label: string }>; challenges?: Array<{ number: number; label: string }> }
): NumerologyHolisticSynthesis {
  // 1. Core Triangle — Life Path vs Expression
  function triAnalyze(a: number, b: number, labelA: string, labelB: string) {
    const diff = Math.abs(a - b);
    const sum = (a + b) % 9 || 9;
    let pattern: 'HARMONY' | 'TENSION' | 'NEUTRAL' = 'NEUTRAL';
    let description = '';

    if (a === b) {
      pattern = 'HARMONY';
      description = `${labelA} và ${labelB} cùng rung động ở tần số ${a}. Bạn sống rất nhất quán: mục tiêu, cách thể hiện và nhu cầu nội tâm chỉ về một hướng. Điều này tạo ra sức mạnh tập trung nhưng cũng cần tránh thiếu linh hoạt.`;
    } else if ([1,2,3,6,9].includes(a) && [1,2,3,6,9].includes(b)) {
      pattern = 'HARMONY';
      description = `${labelA} (${a}) và ${labelB} (${b}) thuộc nhóm tần số tương sinh. Năng lực bên ngoài và bên trong bổ trợ lẫn nhau, tạo điều kiện để bạn phát triển tự nhiên mà không cần gắng sức quá mức.`;
    } else if ([4,5,7,8].includes(a) && [4,5,7,8].includes(b)) {
      pattern = 'TENSION';
      description = `${labelA} (${a}) và ${labelB} (${b}) tạo ra sức căng nội tâm. Bạn thường thấy bản thân muốn làm một việc nhưng năng lực tự nhiên lại dẫn đến hướng khác. Đây không phải điểm yếu — mà là nguồn động lực tìm kiếm sự tổng hợp sâu hơn.`;
    } else if (diff <= 2 || sum === 9 || sum === 11) {
      pattern = 'NEUTRAL';
      description = `${labelA} (${a}) và ${labelB} (${b}) vận hành song song, không xung đột nhưng cũng không tự nhiên khuếch đại nhau. Bạn cần chủ động điều phối hai năng lượng này trong các quyết định quan trọng.`;
    } else {
      pattern = 'TENSION';
      description = `${labelA} (${a}) và ${labelB} (${b}) có biên độ rung động chênh lệch đáng kể. Bạn có thể cảm thấy chia rẽ giữa con đường số phận và cách bạn muốn thể hiện bản thân với thế giới bên ngoài.`;
    }
    return { label: `${labelA} ${a} × ${labelB} ${b}`, pattern, description };
  }

  const lpVsExpr = triAnalyze(lifePath, expression, 'Số Chủ Đạo', 'Số Sứ Mệnh');
  const lpVsSoul = triAnalyze(lifePath, soulUrge, 'Số Chủ Đạo', 'Số Linh Hồn');

  const tensionCount = [lpVsExpr.pattern, lpVsSoul.pattern].filter((p) => p === 'TENSION').length;
  const harmonyCount = [lpVsExpr.pattern, lpVsSoul.pattern].filter((p) => p === 'HARMONY').length;
  let overallDynamic = '';
  if (harmonyCount === 2) {
    overallDynamic = `Ba trục số cốt lõi của bạn hài hòa sâu sắc. Bạn có lợi thế lớn về tính nhất quán nội tâm — ít xung đột nội tâm hơn đa số người. Thách thức là duy trì sự mở rộng khi môi trường xung quanh thay đổi.`;
  } else if (tensionCount === 2) {
    overallDynamic = `Tam giác số của bạn mang nhiều sức căng. Điều này thường tạo ra những người có chiều sâu nội tâm lớn, hay đặt câu hỏi về bản sắc. Ưu điểm: bạn không dễ bị bão hòa; nhược điểm: cần nhiều thời gian hơn để ổn định.`;
  } else {
    overallDynamic = `Tam giác số của bạn pha trộn hài hòa và căng thẳng. Điều này tạo ra một nhân cách năng động, có khả năng thích nghi cao — bạn vừa có định hướng ổn định, vừa không ngại thay đổi khi cần thiết.`;
  }

  // 2. Temporal Blueprint
  const pinnacle = cyclesData?.pinnacles?.[0];
  const challenge = cyclesData?.challenges?.[0];
  const pinnacleLabel = pinnacle ? `Đỉnh Cao ${pinnacle.number} — ${pinnacle.label}` : `Đỉnh Cao Số Mệnh ${lifePath}`;
  const challengeLabel = challenge ? `Thử Thách ${challenge.number} — ${challenge.label}` : `Thử Thách Căn Cơ Số ${expression}`;

  const pyGroupA = [1, 5, 9]; // action years
  const pyGroupB = [2, 4, 6, 8]; // foundation years
  const pyGroupC = [3, 7, 11]; // introspection/expression years
  let confluenceNote = '';
  if (pyGroupA.includes(personalYear)) {
    confluenceNote = `Năm Cá Nhân ${personalYear} là năm hành động và khởi xướng. Đây là thời điểm tốt để kích hoạt tiềm năng của Đỉnh Cao hiện tại, đặc biệt trong lĩnh vực ${lpVsExpr.pattern === 'HARMONY' ? 'nghề nghiệp và quan hệ' : 'cá nhân và định hướng lại'}.`;
  } else if (pyGroupB.includes(personalYear)) {
    confluenceNote = `Năm Cá Nhân ${personalYear} là năm xây nền và củng cố. Tập trung hoàn thiện hệ thống, quan hệ và tài chính thay vì mở rộng quá nhiều mặt trận.`;
  } else if (pyGroupC.includes(personalYear)) {
    confluenceNote = `Năm Cá Nhân ${personalYear} là năm hướng vào nội tâm và biểu đạt sáng tạo. Thích hợp để học hỏi, viết lách, hoặc các hoạt động đòi hỏi tư duy sâu.`;
  } else {
    confluenceNote = `Năm Cá Nhân ${personalYear} là thời điểm chuyển tiếp, đòi hỏi bạn giữ sự định tĩnh và quan sát nhịp điệu tự nhiên của hoàn cảnh.`;
  }

  // 3. Action Plan
  const priorities: string[] = [];
  const pitfalls: string[] = [];

  if (lpVsExpr.pattern === 'TENSION') {
    priorities.push(`Chủ động điều phối giữa Số Chủ Đạo ${lifePath} và Số Sứ Mệnh ${expression}: chọn những vai trò và dự án cho phép cả hai trục cùng phát huy.`);
    pitfalls.push(`Tránh để Số Sứ Mệnh ${expression} che khuất hoàn toàn bài học thật sự của Số Chủ Đạo ${lifePath}.`);
  } else {
    priorities.push(`Phát huy sức mạnh cộng hưởng giữa Số Chủ Đạo ${lifePath} và Số Sứ Mệnh ${expression}: bạn có lợi thế tự nhiên khi cả con đường và tài năng cùng chỉ về một hướng.`);
  }

  if (lpVsSoul.pattern === 'TENSION') {
    priorities.push(`Lắng nghe nhu cầu thật của Số Linh Hồn ${soulUrge} — không phải lúc nào bạn cũng muốn những gì xã hội kỳ vọng ở bạn.`);
    pitfalls.push(`Không để khoảng cách giữa Số Chủ Đạo ${lifePath} và Số Linh Hồn ${soulUrge} trở thành nguồn gốc của sự kiệt sức cảm xúc mãn tính.`);
  } else {
    priorities.push(`Nuôi dưỡng cuộc sống nội tâm: Số Linh Hồn ${soulUrge} của bạn hài hòa với con đường đang đi, hãy tạo không gian để nó tái nạp năng lượng đều đặn.`);
  }

  priorities.push(`Trong Năm Cá Nhân ${personalYear}, ưu tiên: ${confluenceNote.split('.')[0]}.`);

  const mottos: Record<string, string> = {
    '1': 'Tự lãnh đạo bản thân trước khi dẫn dắt người khác.',
    '2': 'Sức mạnh thật sự nằm trong sự lắng nghe, không phải trong lời nói.',
    '3': 'Biểu đạt chân thật là con đường ngắn nhất đến sự kết nối.',
    '4': 'Kỷ luật không phải là gánh nặng — đó là bộ khung giữ giấc mơ đứng vững.',
    '5': 'Tự do thật sự bắt đầu từ sự cam kết có chọn lựa.',
    '6': 'Yêu thương người khác bắt đầu từ việc không bỏ rơi chính mình.',
    '7': 'Hiểu biết sâu nhất đến từ khoảng lặng, không phải từ dữ liệu.',
    '8': 'Quyền năng bền vững được xây từ tính chính trực, không phải từ vị trí.',
    '9': 'Cho đi không phải là mất — mà là con đường mở rộng bản thân.',
    '11': 'Trực giác là dữ liệu — hãy học cách đọc nó như đọc bản đồ.',
    '22': 'Tầm nhìn lớn cần bộ khung thực tiễn — hãy xây từng viên gạch.',
    '33': 'Phụng sự là đặc quyền, không phải nghĩa vụ.',
  };
  const motto = mottos[String(lifePath)] ?? `Sống đúng với tần số Số Chủ Đạo ${lifePath} là hành trình dài nhưng xứng đáng nhất bạn có thể chọn.`;

  return {
    coreTriangle: { lifePathVsExpression: lpVsExpr, lifePathVsSoul: lpVsSoul, overallDynamic },
    temporalBlueprint: { currentPinnacleLabel: pinnacleLabel, currentChallengeLabel: challengeLabel, confluenceNote },
    actionPlan: { priorities, pitfalls, motto },
  };
}

export const LIFE_PATH_INTERPRETATIONS: Record<
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
> = Object.fromEntries(
  Object.entries(NUMEROLOGY_NUMBER_PROFILES).map(([numStr, profile]) => {
    const num = Number(numStr);
    return [
      num,
      {
        title: profile.name,
        meaning: `Số ${num}: Trụ cột năng lượng xoay quanh ${profile.themes.join(", ")}.`,
        layman: `Bạn thể hiện phẩm chất ${profile.constructive.slice(0, 2).join(" và ")}. Động lực: ${profile.dynamics.join(", ")}.`,
        mechanism: `Mặt phẳng ${profile.plane} theo trường phái Pythagoras. Cơ chế vận hành: ${profile.dynamics.join(", ")}.`,
        advice: `Phát huy ${profile.constructive[0] || "nội lực"}, kiểm soát nguy cơ ${profile.shadow[0] || "cực đoan"}.`,
        strengths: profile.constructive.join(", "),
        challenges: profile.shadow.join(", "),
      },
    ];
  })
);

export const PERSONAL_YEAR_INTERPRETATIONS: Record<
  number,
  { theme: string; meaning: string; advice: string }
> = {
  1: {
    theme: 'Năm Khởi Đầu Mới & Tự Chủ',
    meaning: 'Bắt đầu chu kỳ 9 năm mới: Gieo hạt, khai phá các dự án mới và tự tin dẫn đầu.',
    advice: 'Chủ động hành động, học kỹ năng mới và bắt đầu một lối sống mới.',
  },
  2: {
    theme: 'Năm Hợp Tác, Chờ Đợi & Nuôi Dưỡng',
    meaning: 'Hạt giống năm 1 đang nảy mầm ngầm: Đòi hỏi sự kiên nhẫn, hòa giải và gắn kết đồng hành.',
    advice: 'Tập trung lắng nghe, kiểm soát cái tôi, vun đắp tình cảm và đối tác tin cậy.',
  },
  3: {
    theme: 'Năm Tỏa Sáng, Sáng Tạo & Mở Rộng Giao Tiếp',
    meaning: 'Mầm cây đón ánh mặt trời: Năng lượng bùng nổ về biểu đạt, học tập và sáng tạo.',
    advice: 'Tự tin xuất hiện trước công chúng, học tri thức mới, duy trì sự tập trung.',
  },
  4: {
    theme: 'Năm Củng Cố Nền Móng & Rèn Luyện Kỷ Luật',
    meaning: 'Nỗ lực làm việc bền bỉ, chỉnh đốn trật tự nội tại và quy trình ổn định.',
    advice: 'Quản lý tài chính chặt chẽ, hoàn thiện chi tiết công việc và rèn luyện thể chất.',
  },
  5: {
    theme: 'Năm Đổi Mới, Bứt Phá & Trải Nghiệm Tự Do',
    meaning: 'Trung tâm chu kỳ 9 năm: Thay đổi bất ngờ mở rộng tầm mắt, du lịch hoặc chuyển hướng.',
    advice: 'Linh hoạt đón nhận đổi mới, bước ra khỏi vùng an toàn nhưng giữ cái đầu lạnh.',
  },
  6: {
    theme: 'Năm Trách Nhiệm, Gia Đình & Vun Đắp Yêu Thương',
    meaning: 'Quay về tổ ấm, hòa giải quan hệ thân tộc, trang hoàng nhà cửa và chăm sóc người thân.',
    advice: 'Dành thời gian chất lượng cho gia đình, tạo không gian sống an yên, không ôm đồm.',
  },
  7: {
    theme: 'Năm Chiêm Nghiệm, Nâng Cao Trí Tuệ & Nội Lực',
    meaning: 'Lắng đọng tâm hồn: Thích hợp nghiên cứu chuyên sâu, học triết lý, thiền định.',
    advice: 'Dành không gian tĩnh lặng, đầu tư cho trí tuệ và sự bình an nội tại.',
  },
  8: {
    theme: 'Năm Thu Hoạch Thành Quả & Làm Chủ Tài Chính',
    meaning: 'Đỉnh cao thu hoạch: Nỗ lực trước đó đơm hoa kết trái thành uy tín, quyền lực và tài chính.',
    advice: 'Tập trung hiện thực hóa mục tiêu tài chính, quản trị hiệu quả, giữ đạo đức nghề nghiệp.',
  },
  9: {
    theme: 'Năm Tổng Kết, Bao Dung & Chuyển Giao Chu Kỳ',
    meaning: 'Khép lại chu kỳ 9 năm: Dọn dẹp điều cũ, thanh lọc quan hệ và chuẩn bị khởi đầu mới.',
    advice: 'Buông bỏ điều không còn phù hợp, tham gia thiện nguyện, tha thứ và biết ơn.',
  },
};

export const PINNACLE_INTERPRETATIONS: Record<
  number,
  {
    theme: string;
    layman: string;
    details: string;
    strengths: string;
    challenges: string;
    advice: string;
  }
> = Object.fromEntries(
  Object.entries(NUMEROLOGY_NUMBER_PROFILES)
    .filter(([n]) => Number(n) <= 9 || [11, 22].includes(Number(n)))
    .map(([numStr, profile]) => {
      const num = Number(numStr);
      return [
        num,
        {
          theme: `Đỉnh cao chặng số ${num}: ${profile.themes[0] || 'Phát triển'}`,
          layman: `Giai đoạn tập trung ${profile.constructive.slice(0, 2).join(' và ')}.`,
          details: `Năng lượng đỉnh cao vận hành theo cơ chế: ${profile.dynamics.join(', ')}.`,
          strengths: profile.constructive.join(', '),
          challenges: profile.shadow.join(', '),
          advice: `Phát huy ${profile.constructive[0] || 'thế mạnh'}, hóa giải ${profile.shadow[0] || 'thách thức'}.`,
        },
      ];
    })
);


