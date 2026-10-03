/**
 * Numerology Interpretations & Extended Calculations Library
 * Based on authentic Pythagorean system (Dr. David Phillips / Hans Decoz).
 * 100% Free, Public, Unlocked.
 */

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
    love: 'Năm số 1 mang năng lượng độc lập. Bạn có xu hướng tập trung vào bản thân nhiều hơn. Nếu độc thân, bạn toát ra sức hút tự tin và có thể bắt đầu một mối quan hệ mới đầy bất ngờ. Nếu đã có đôi, hãy tránh tính áp đặt để giữ sự hòa hợp.',
    career: 'Thời điểm vàng để khởi nghiệp, chuyển đổi công việc hoặc nhận nhiệm vụ lãnh đạo mới. Mọi quyết định táo bạo trong năm này sẽ đặt nền móng cho cả chu kỳ 9 năm tiếp theo.',
    finance: 'Cần đầu tư cho bản thân, học hỏi kỹ năng mới hoặc mua sắm công cụ làm việc. Thu nhập có tiềm năng mở rộng nhưng cần kế hoạch chi tiêu rõ ràng cho các dự án mới.',
    social: 'Mở rộng mạng lưới quan hệ với những đối tác có tư duy tiến bộ. Bạn xuất hiện với phong thái người dẫn đường và thu hút sự chú ý của tập thể.',
    learning: 'Tiếp thu các kỹ năng lãnh đạo, tư duy chiến lược và tinh thần tự lập.',
    family: 'Gia đình cần bạn làm chỗ dựa vững chắc; chủ động sẻ chia để người thân không cảm thấy bạn quá bận rộn với công việc riêng.',
    nextYearPreview: 'Năm số 2 tới sẽ đòi hỏi sự lắng đọng, kiên nhẫn chăm sóc hạt mầm và hợp tác hòa giải.',
    afterNextYearPreview: 'Năm số 3 sau đó sẽ là năm bùng nổ sáng tạo và mở rộng giao tiếp xã hội.',
  },
  2: {
    yearNumber: 2,
    theme: 'Hợp Tác, Hòa Giải, Lắng Đọng & Nuôi Dưỡng Trực Giác',
    love: 'Tình duyên thăng hoa rực rỡ. Năng lượng số 2 giúp bạn dịu dàng, biết lắng nghe và thấu cảm sâu sắc. Đây là năm tuyệt vời để hàn gắn hiểu lầm hoặc tiến tới hôn nhân bền vững.',
    career: 'Không nên vội vã tấn công hay tranh chấp. Thành công trong năm này đến từ việc bắt tay hợp tác, hỗ trợ đồng đội và đóng vai trò người kết nối đắc lực phía sau hậu trường.',
    finance: 'Tài chính ổn định, phù hợp tích lũy an toàn và quản lý chi tiêu cẩn trọng. Tránh đầu tư mạo hiểm hoặc cho vay mượn thiếu giấy tờ minh bạch.',
    social: 'Tập trung vào những mối quan hệ thân tình có chiều sâu thay vì xã giao dàn trải. Bạn là người hòa giải được mọi người yêu mến.',
    learning: 'Rèn luyện trí tuệ cảm xúc (EQ), kỹ năng ngoại giao, thương lượng và trực giác tâm lý.',
    family: 'Gia đình ấm cúng, thuận hòa. Bạn dành nhiều thời gian chăm sóc tổ ấm và người thân yêu.',
    nextYearPreview: 'Năm số 3 tới sẽ giải phóng năng lượng sáng tạo, đưa bạn ra ánh đèn sân khấu.',
    afterNextYearPreview: 'Năm số 4 sau đó sẽ đòi hỏi sự kỷ luật, tái cơ cấu nền tảng thực tế.',
  },
  3: {
    yearNumber: 3,
    theme: 'Bùng Nổ Sáng Tạo, Lan Tỏa Năng Lượng & Mở Rộng Cơ Hội',
    love: 'Rực rỡ nhưng dễ cảm hứng nhất thời. Bạn trở nên quyến rũ, hoạt ngôn và thu hút nhiều đối tượng. Cần tỉnh táo để không bị cảm xúc bốc đồng chi phối dẫn đến những mối tình chóng vánh.',
    career: 'Cơ hội tuyệt vời cho các công việc liên quan đến truyền thông, marketing, nghệ thuật, viết lách và thuyết trình. Các ý tưởng độc đáo của bạn được đón nhận nồng nhiệt.',
    finance: 'Dòng tiền lưu chuyển tích cực, có nhiều nguồn thu phụ từ các dự án sáng tạo. Cần kiểm soát chi tiêu cho các thú vui giải trí, mua sắm nhất thời.',
    social: 'Vòng tròn bạn bè mở rộng nhanh chóng. Bạn tham gia nhiều sự kiện, tiệc tùng và là tâm điểm khuấy động không khí vui vẻ.',
    learning: 'Tham gia các khóa học nâng cao kỹ năng diễn đạt, ngoại ngữ, nghệ thuật hoặc sáng tạo nội dung.',
    family: 'Mang tiếng cười và niềm vui về cho gia đình; tổ chức các chuyến du lịch ngắn ngày cùng người thân.',
    nextYearPreview: 'Năm số 4 tới sẽ đòi hỏi bạn siết chặt kỷ luật, củng cố nền tảng thực tế sau một năm thăng hoa.',
    afterNextYearPreview: 'Năm số 5 sau đó sẽ đem lại những làn gió tự do và bước ngoặt thay đổi lớn.',
  },
  4: {
    yearNumber: 4,
    theme: 'Kỷ Luật Thép, Củng Cố Nền Móng & Quản Trị Thực Tế',
    love: 'Tình cảm hướng đến sự cam kết lâu dài và ổn định. Bạn tìm kiếm cảm giác an toàn, chung thủy thay vì những lời hứa hẹn hoa mỹ. Thời điểm thích hợp để bàn chuyện hôn nhân, xây dựng tổ ấm.',
    career: 'Đòi hỏi sự chăm chỉ, tỉ mỉ và tập trung cao độ. Đây là năm cày xới, xây dựng quy trình, củng cố chuyên môn và hoàn thiện các hệ thống làm việc kiên cố.',
    finance: 'Quản lý tài chính bài bản, thắt chặt chi tiêu lãng phí, tích lũy tiền bạc để mua sắm bất động sản hoặc đầu tư dài hạn an toàn.',
    social: 'Ít tụ tập xã giao hơn, chọn lọc những mối quan hệ đáng tin cậy và có chung chí hướng làm ăn bền vững.',
    learning: 'Học hỏi về quản trị tài chính, pháp lý, kỹ thuật chuyên môn sâu và rèn luyện thể lực.',
    family: 'Sửa sang nhà cửa, chăm sóc sức khỏe cho người lớn tuổi trong nhà và củng cố nền tảng gia đình.',
    nextYearPreview: 'Năm số 5 tới sẽ giải phóng bạn khỏi sự ngột ngạt với những chuyến đi xa và cơ hội đổi mới.',
    afterNextYearPreview: 'Năm số 6 sau đó sẽ quay về chăm sóc tình thương gia đình và trách nhiệm xã hội.',
  },
  5: {
    yearNumber: 5,
    theme: 'Bứt Phá Tự Do, Du Lịch Khám Phá & Đổi Mới Vận Trình',
    love: 'Đầy bất ngờ và xáo động cảm xúc. Bạn có cơ hội gặp gỡ những người thú vị trong các chuyến đi xa. Nếu đã kết hôn, hãy cùng bạn đời thử những trải nghiệm mới để hâm nóng tình cảm.',
    career: 'Nhiều thay đổi về vị trí công tác, dự án mới hoặc chuyển hướng lĩnh vực. Khả năng thích ứng của bạn đạt đỉnh, giúp bạn nhanh chóng nắm bắt các xu hướng thời đại.',
    finance: 'Dòng tiền biến động lớn; có cơ hội kiếm tiền nhanh nhưng cũng dễ tiêu xài cho các chuyến đi. Cần giữ một khoản dự phòng khẩn cấp.',
    social: 'Kết nối với nhiều tầng lớp xã hội mới lạ, tham gia các cộng đồng tiến bộ, mở rộng thế giới quan.',
    learning: 'Học hỏi qua trải nghiệm thực tế, du lịch văn hóa, kỹ năng thích ứng và công nghệ mới.',
    family: 'Dễ xảy ra khoảng cách nếu bạn quá mải mê bên ngoài; hãy chủ động chia sẻ những điều mới mẻ cùng người thân.',
    nextYearPreview: 'Năm số 6 tới sẽ đưa trọng tâm quay về với mái ấm gia đình, con cái và tình yêu thương.',
    afterNextYearPreview: 'Năm số 7 sau đó sẽ là năm của sự chiêm nghiệm, học vấn chuyên sâu và tĩnh lặng.',
  },
  6: {
    yearNumber: 6,
    theme: 'Trách Nhiệm Gia Đình, Nuôi Dưỡng Tình Thương & Cống Hiến',
    love: 'Mùa thu hoạch của tình yêu. Giai đoạn thuận lợi nhất để đính hôn, kết hôn, sinh con hoặc hàn gắn mọi rạn nứt tình cảm. Bạn cảm nhận sâu sắc ý nghĩa của sự chở che và gắn bó.',
    career: 'Phát triển mạnh trong các công việc liên quan đến giáo dục, chăm sóc sức khỏe, tư vấn tâm lý, thiết kế và cộng đồng. Được cấp trên và đồng nghiệp tin cậy nhờ sự tận tụy.',
    finance: 'Tài chính ổn định, nguồn tiền chủ yếu phục vụ việc mua sắm tiện nghi gia đình, chăm sóc người thân hoặc đầu tư cho con cái học hành.',
    social: 'Đóng vai trò người anh, người chị chia sẻ và nâng đỡ bạn bè; các mối quan hệ được xây dựng trên sự chân thành.',
    learning: 'Học về tâm lý học gia đình, nghệ thuật nuôi dạy con, thẩm mỹ và chăm sóc sức khỏe toàn diện.',
    family: 'Trọng tâm số một của năm. Tổ chức các buổi sum họp gia đình, trang hoàng nhà cửa ấm cúng.',
    nextYearPreview: 'Năm số 7 tới sẽ đưa bạn vào giai đoạn chiêm nghiệm sâu sắc, nâng cao chuyên môn và tĩnh tâm.',
    afterNextYearPreview: 'Năm số 8 sau đó sẽ là năm đại thắng về tài chính, quyền lực và vị thế điều hành.',
  },
  7: {
    yearNumber: 7,
    theme: 'Chiêm Nghiệm Nội Tâm, Nâng Cao Trí Tuệ & Tĩnh Lặng Chữa Lành',
    love: 'Cần không gian riêng tư cho bản thân. Tránh gây áp lực lên đối phương; đây là lúc cả hai học cách thấu hiểu chiều sâu tâm hồn của nhau thay vì đòi hỏi hình thức bề ngoài.',
    career: 'Không nên mở rộng quy mô ồ ạt hay đầu tư liều lĩnh. Tập trung nghiên cứu, cải tiến quy trình, nâng cao bằng cấp và rèn luyện kỹ năng chuyên môn cốt lõi.',
    finance: 'Bảo toàn vốn là ưu tiên hàng đầu. Tránh các dự án đầu cơ rủi ro; học cách chi tiêu tối giản để giải phóng tâm trí.',
    social: 'Thu hẹp các cuộc gặp gỡ vô bổ; chỉ giữ lại những người bạn tri kỷ có thể đàm đạo về nhân sinh và tri thức.',
    learning: 'Thời điểm tốt nhất trong chu kỳ 9 năm để đọc sách, thiền định, nghiên cứu chuyên sâu hoặc học lên cao.',
    family: 'Lắng nghe và thấu hiểu người thân trong tĩnh lặng; giữ hòa khí bằng sự bao dung và điềm đạm.',
    nextYearPreview: 'Năm số 8 tới sẽ là năm bùng nổ thành tựu vật chất, thu hoạch quả ngọt và độc lập tài chính.',
    afterNextYearPreview: 'Năm số 9 sau đó sẽ khép lại chu kỳ để dọn dẹp, buông bỏ và chuẩn bị hành trình mới.',
  },
  8: {
    yearNumber: 8,
    theme: 'Đỉnh Cao Tài Chính, Quyền Lực Điều Hành & Độc Lập Kinh Tế',
    love: 'Cần cân bằng giữa tham vọng công việc và sự dịu dàng với người yêu. Dùng sự thành đạt để đem lại cuộc sống tốt đẹp cho người bạn đời nhưng đừng mang tư duy kiểm soát về nhà.',
    career: 'Năm gặt hái thành quả lớn nhất chu kỳ. Thăng quan tiến chức, mở rộng doanh nghiệp, ký kết các hợp đồng thương mại lớn và khẳng định vị thế uy quyền trong ngành.',
    finance: 'Tài chính thăng hoa, cơ hội gia tăng tài sản đáng kể từ công sức tích lũy nhiều năm. Đầu tư thông minh và minh bạch sẽ mang lại nguồn lợi bền vững.',
    social: 'Gặp gỡ các nhà lãnh đạo, chuyên gia cấp cao và đối tác tầm cỡ. Tầm ảnh hưởng xã hội của bạn được nâng tầm.',
    learning: 'Rèn luyện năng lực quản trị vĩ mô, chiến lược tài chính, nghệ thuật lãnh đạo và đàm phán cấp cao.',
    family: 'Cung cấp nền tảng vật chất đủ đầy cho gia đình; cùng người thân tận hưởng những chuyến nghỉ dưỡng xứng đáng.',
    nextYearPreview: 'Năm số 9 tới sẽ khép lại chu kỳ 9 năm, là lúc tổng kết, buông bỏ cái cũ và tích đức phụng sự.',
    afterNextYearPreview: 'Năm số 1 sau đó sẽ mở ra một chu kỳ 9 năm hoàn toàn mới ở nấc thang cao hơn.',
  },
  9: {
    yearNumber: 9,
    theme: 'Tổng Kết Chu Kỳ, Buông Bỏ Điều Cũ & Phụng Sự Nhân Đạo',
    love: 'Thanh lọc những mối quan hệ độc hại đã làm bạn tổn thương. Những tình cảm chân thành sẽ được củng cố bền chặt hơn; học cách tha thứ để trái tim được thanh thản.',
    career: 'Hoàn thành nốt các dự án dở dang, nghiệm thu công việc và đóng gói thành quả. Chưa nên khởi công dự án mới quy mô lớn mà hãy chuẩn bị tinh thần và nguồn lực.',
    finance: 'Trích một phần tài chính làm việc thiện nguyện, giúp đỡ người có hoàn cảnh khó khăn để tích phúc đức cho chu kỳ mới.',
    social: 'Bao dung với mọi người, lan tỏa năng lượng tích cực và tham gia các hoạt động cộng đồng nhân văn.',
    learning: 'Tổng kết bài học của 9 năm qua, học về sự buông bỏ, lòng trắc ẩn và chuẩn bị tầm nhìn mới.',
    family: 'Hóa giải mọi bất hòa xưa cũ, tha thứ cho người thân và cùng nhau đón nhận vận hội tươi sáng phía trước.',
    nextYearPreview: 'Năm số 1 tới sẽ bắt đầu một vòng xoáy tiến hóa mới với những cơ hội khởi sắc vượt bậc.',
    afterNextYearPreview: 'Năm số 2 sau đó sẽ là năm của sự hợp tác và nuôi dưỡng những mối liên kết bền chặt.',
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

export const PERSONAL_YEAR_INTERPRETATIONS: Record<
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
> = {
  1: {
    theme: 'Đỉnh Cao Khởi Xướng & Độc Lập Tự Thân',
    layman: 'Giai đoạn bạn buộc phải đứng vững trên đôi chân của mình, tự quyết định hướng đi và không dựa dẫm vào người khác.',
    details: 'Rung động số 1 tôi luyện bản lĩnh người mở đường. Bạn được trao cơ hội đứng mũi chịu sào, khởi xướng các công trình hay con đường mới.',
    strengths: 'Ý chí độc lập, dũng cảm đối mặt nghịch cảnh, khả năng tự lực cánh sinh.',
    challenges: 'Dễ rơi vào thế cô đơn hoặc độc đoán nếu không biết lắng nghe đồng sự.',
    advice: 'Chủ động nắm bắt cơ hội, rèn luyện tính quyết đoán; áp dụng nguyên tắc hành động dứt khoát không trì hoãn.',
  },
  2: {
    theme: 'Đỉnh Cao Hợp Tác & Kiên Nhẫn Ngoại Giao',
    layman: 'Giai đoạn học cách hòa hợp, làm việc nhóm, xây dựng các liên minh bền chặt và rèn luyện sự khéo léo.',
    details: 'Rung động số 2 đòi hỏi sự nhạy cảm và thấu hiểu. Thành công lớn nhất trong giai đoạn này đến từ tài ngoại giao và liên kết lòng người.',
    strengths: 'Trực giác tinh tế, khả năng hòa giải mâu thuẫn, xây dựng lòng tin tập thể.',
    challenges: 'Dễ trở nên quá nhạy cảm trước lời phê bình hoặc thiếu quyết đoán khi phải tranh chấp.',
    advice: 'Tìm kiếm đối tác có chung hệ giá trị; học cách đặt ranh giới cá nhân rõ ràng trong mọi thỏa thuận hợp tác.',
  },
  3: {
    theme: 'Đỉnh Cao Sáng Tạo & Lan Tỏa Xã Hội',
    layman: 'Thời kỳ tài năng biểu đạt, nghệ thuật, giao tiếp và uy tín cá nhân của bạn nở rộ rực rỡ nhất.',
    details: 'Rung động số 3 kích hoạt ngọn lửa sáng tạo và khả năng kết nối đại chúng. Bạn có nhiều cơ hội xuất hiện trước đám đông.',
    strengths: 'Tư duy biểu đạt phong phú, khiếu thẩm mỹ, sự hoạt bát truyền cảm hứng.',
    challenges: 'Dễ bị phân tán vào quá nhiều dự án hào nhoáng bề nổi mà thiếu chiều sâu hoàn thiện.',
    advice: 'Chọn lọc một lĩnh vực chuyên môn cụ thể để đào sâu; chuyển hóa ý tưởng thành sản phẩm hoàn chỉnh.',
  },
  4: {
    theme: 'Đỉnh Cao Xây Nền Đắp Móng & Kỷ Luật Vững Vàng',
    layman: 'Giai đoạn lao động nghiêm túc để kiến tạo gia sản, tích lũy tài sản và đặt nền móng chắc chắn cho tương lai.',
    details: 'Rung động số 4 đại diện cho cấu trúc kim tự tháp vững chãi. Bạn cần sự tỉ mỉ, kiên nhẫn và tuân thủ chặt chẽ các quy trình chuẩn mực.',
    strengths: 'Kỷ luật thép, tư duy thực tế, tính tổ chức và năng lực tích lũy tài chính bài bản.',
    challenges: 'Áp lực công việc đè nặng dễ sinh bảo thủ, cứng nhắc hoặc kiệt sức.',
    advice: 'Lập kế hoạch tài chính và sự nghiệp 5 năm; kiên định thực thi từng tuần và bảo vệ sức khỏe thể chất.',
  },
  5: {
    theme: 'Đỉnh Cao Bứt Phá & Mở Rộng Trải Nghiệm',
    layman: 'Thời kỳ bạn thoát khỏi lối mòn cũ, thích ứng với nhiều biến động và mở rộng tầm nhìn cuộc sống.',
    details: 'Rung động số 5 mang đến những chuyến đi, sự đổi mới công việc hoặc mở rộng địa bàn hoạt động. Đây là lúc tư duy linh hoạt giúp bạn chiến thắng.',
    strengths: 'Khả năng thích ứng siêu việt, tư duy đổi mới, mở rộng mạng lưới giao lưu đa dạng.',
    challenges: 'Dễ bị cám dỗ bởi sự bốc đồng, thay đổi liên tục dẫn đến thiếu sự bền vững.',
    advice: 'Tận dụng sự đổi mới để bứt phá nhưng phải giữ vững các nguyên tắc đạo đức và an toàn tài chính cốt lõi.',
  },
  6: {
    theme: 'Đỉnh Cao Trách Nhiệm Gia Đình & Phụng Sự Xã Hội',
    layman: 'Thời kỳ năng lượng yêu thương, chăm sóc gia đình, cống hiến cho cộng đồng và gánh vác trách nhiệm lớn.',
    details: 'Rung động số 6 đưa trọng tâm về mái ấm, tổ chức và sự hàn gắn. Bạn trở thành chỗ dựa tinh thần và vật chất vững chắc cho người khác.',
    strengths: 'Lòng trắc ẩn bao dung, khiếu thẩm mỹ, khả năng quy tụ và bảo bọc tập thể.',
    challenges: 'Gánh nặng trách nhiệm người khác dễ gây áp lực tinh thần và mệt mỏi nội tâm.',
    advice: 'Chăm sóc bản thân trước khi gánh vác việc người khác; học cách nói không với những đòi hỏi vô lý.',
  },
  7: {
    theme: 'Đỉnh Cao Chiêm Nghiệm & Trí Tuệ Chiều Sâu',
    layman: 'Giai đoạn đúc kết kinh nghiệm sống, học hỏi tri thức sâu sắc và tìm kiếm ý nghĩa chân thực của bản thân.',
    details: 'Rung động số 7 của trục thể chất và tâm trí thúc đẩy bạn nhìn sâu vào bản chất sự vật. Đây là lúc nghiên cứu, chuyên môn hóa đỉnh cao.',
    strengths: 'Tư duy triết lý sâu sắc, trực giác bén nhạy, sự độc lập và năng lực tự học phi thường.',
    challenges: 'Xu hướng cô lập bản thân, hoài nghi quá mức hoặc xa rời thực tế đời thường.',
    advice: 'Dành không gian yên tĩnh để nâng cao chuyên môn; ghi chép nhật ký chiêm nghiệm và chia sẻ tri thức cho thế hệ sau.',
  },
  8: {
    theme: 'Đỉnh Cao Thành Tựu Vật Chất & Khẳng Định Vị Thế',
    layman: 'Thời kỳ thu hoạch tài chính lớn, nắm giữ quyền quản trị và khẳng định quyền lực thực tiễn trong xã hội.',
    details: 'Rung động số 8 đưa bạn lên vị trí điều hành, làm chủ dòng tiền và quy mô tổ chức. Thành quả đạt được tương xứng với nỗ lực bền bỉ trước đó.',
    strengths: 'Tư duy thương mại lớn, năng lực phán đoán thị trường, khả năng quản trị con người và tài sản.',
    challenges: 'Tham vọng quá mức dễ dẫn đến căng thẳng, bất đồng quyền lợi hoặc đánh đổi các giá trị tinh thần.',
    advice: 'Sử dụng uy tín và nguồn lực tài chính để kiến tạo giá trị nhân văn bền vững; giữ chữ tín làm kim chỉ nam.',
  },
  9: {
    theme: 'Đỉnh Cao Nhân Đạo & Hoàn Tất Sứ Mệnh Lớn',
    layman: 'Thời kỳ bao dung rộng lượng, cống hiến vì đại chúng, hoàn tất một giai đoạn lịch sử của đời bạn.',
    details: 'Rung động số 9 mang tầm vóc toàn cầu và lòng vị tha. Bạn được trao cơ hội lan tỏa giá trị tích cực đến số đông người trong xã hội.',
    strengths: 'Tầm nhìn bao quát, tâm thế phụng sự, uy tín đạo đức và lòng trắc ẩn không biên giới.',
    challenges: 'Khó khăn trong việc buông bỏ những kỳ vọng cũ hoặc người thân cận không cùng chí hướng.',
    advice: 'Sẵn sàng khép lại các chương cũ không còn phù hợp; tham gia các dự án vì cộng đồng với sự tỉnh táo.',
  },
  11: {
    theme: 'Đỉnh Cao Trực Giác Master & Khai Sáng Tâm Trí',
    layman: 'Giai đoạn thức tỉnh tiềm năng tâm lý, trực giác phi thường và truyền cảm hứng mạnh mẽ cho cộng đồng.',
    details: 'Số Master 11/2 khuếch đại sự nhạy bén và nhận thức tinh thần. Bạn trở thành ngọn đèn chỉ đường cho những người đang tìm kiếm hướng đi.',
    strengths: 'Trực giác thấu thị, tầm nhìn tâm lý sâu rộng, sức lan tỏa tinh thần tự nhiên.',
    challenges: 'Sự nhạy cảm thần kinh cao dễ gây căng thẳng, mất ngủ nếu môi trường xung quanh nhiều tiêu cực.',
    advice: 'Thực hành các phương pháp tĩnh tâm, rèn luyện thân thể vững chãi và giữ cho tâm trí luôn thanh tịnh.',
  },
  22: {
    theme: 'Đỉnh Cao Nhà Kiến Tạo Vĩ Mô (Master Builder)',
    layman: 'Giai đoạn bạn có đủ tầm nhìn lớn và bàn tay thực tế để xây dựng những công trình, tổ chức tầm cỡ để đời.',
    details: 'Số Master 22/4 kết tinh lý tưởng cao đẹp vào cấu trúc vật chất thực tiễn. Cơ hội để lại di sản dài hạn cho thế hệ mai sau.',
    strengths: 'Tầm nhìn chiến lược phi thường, khả năng biến ý tưởng trừu tượng thành công trình cụ thể vĩ đại.',
    challenges: 'Gánh nặng sứ mệnh và kỳ vọng cực lớn dễ khiến bạn kiệt quệ nếu ôm đồm một mình.',
    advice: 'Xây dựng đội ngũ kế thừa tài năng; phân quyền thông minh và kiên trì từng bước vững chắc.',
  },
};


