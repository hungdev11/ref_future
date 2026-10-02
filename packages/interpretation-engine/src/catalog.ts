import {
  ReadingDomain,
  RuleDefinition,
  RuleScope,
  RuleStatus,
  ConditionOperator,
} from '@mystic/core';

export interface InterpretationBlockTemplate {
  domain: ReadingDomain;
  title: string;
  template: string;
  variableKeys?: string[];
  explanation?: string;
  actionableAdvice?: string;
  laymanSummary?: string;
  sourceReference?: string;
}

export interface InterpretationDefinition {
  code: string;
  scope: RuleScope;
  category: string;
  themes: string[];
  sourceReference?: string;
  blocks: Partial<Record<ReadingDomain, InterpretationBlockTemplate>>;
}

export const KNOWLEDGE_CATALOG: Record<string, InterpretationDefinition> = {
  // =========================================================================
  // 1. CHIÊM TINH HỌC TÂY PHƯƠNG (WESTERN ASTROLOGY) - 12 CUNG HOÀNG ĐẠO
  // Nguồn tham chiếu: "Planets in Signs" - Robert Hand; "The Inner Sky" - Steven Forrest
  // =========================================================================

  INTERP_SUN_ARIES: {
    code: 'INTERP_SUN_ARIES',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['tiên phong', 'dũng cảm', 'nhiệt huyết', 'tự chủ', 'hành động nhanh'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 28-35; The Inner Sky (Steven Forrest)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Bạch Dương: Ngọn Lửa Khai Mở & Tinh Thần Dẫn Đầu',
        template: 'Chào {{fullName}}, Mặt Trời tọa lạc tại {{astrology.planets.sun.degree}}° Bạch Dương mang đến cho bạn dòng năng lượng nguyên bản mạnh mẽ, tinh thần quả cảm và lòng khao khát khẳng định cái tôi độc lập. Bạn là người mở đường bẩm sinh, luôn hào hứng trước những thử thách mới.',
        laymanSummary: 'Bạn là người tràn đầy năng lượng, thẳng thắn, nghĩ là làm ngay và không bao giờ chịu khuất phục trước khó khăn.',
        explanation: 'Bạch Dương là cung Tiên phong thuộc nguyên tố Lửa, được chủ quản bởi sao Hỏa. Bản chất của bạn là ngọn lửa thắp sáng đầu tiên, thích khởi xướng dự án nhưng đôi lúc thiếu kiên nhẫn khi phải hoàn thành chi tiết lặp lại.',
        actionableAdvice: 'Tập trung nuôi dưỡng tính kiên trì bền bỉ; học cách dừng lại một nhịp suy xét cảm xúc của người khác trước khi đưa ra quyết định quan trọng.',
        sourceReference: 'Planets in Signs (Robert Hand) - Phân tích vị thế Mặt Trời tại Bạch Dương',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Sự Nghiệp & Công Danh',
        template: 'Với năng lực quyết đoán và tư chất lãnh đạo tự nhiên của {{fullName}}, bạn phát huy rực rỡ nhất trong các môi trường cạnh tranh cao, khởi nghiệp, quản trị dự án đổi mới hoặc các ngành đòi hỏi phản xạ nhanh.',
        laymanSummary: 'Hợp làm chỉ huy, sáng lập, chủ động công việc; rất khó chịu khi bị quản lý quá vi mô hoặc gò bó.',
        actionableAdvice: 'Ủy thác các công việc hành chính vụn vặt cho người tỉ mỉ hơn để bạn tập trung toàn lực vào khâu mở rộng chiến lược.',
      },
      [ReadingDomain.LOVE]: {
        domain: ReadingDomain.LOVE,
        title: 'Tình Duyên & Các Mối Quan Hệ',
        template: 'Trong tình yêu, {{fullName}} luôn chân thành, nồng nhiệt và chủ động. Bạn thích sự rõ ràng, ghét sự mập mờ nhưng cần học cách kiềm chế tính nóng giận bộc phát.',
        laymanSummary: 'Yêu hết mình, thẳng thắn, muốn bảo vệ người mình yêu nhưng đôi khi cái tôi hơi lớn.',
        actionableAdvice: 'Lắng nghe trọn vẹn đối phương mà không ngắt lời; dành thời gian cùng nhau trải nghiệm những hoạt động phiêu lưu mới mẻ.',
      },
    },
  },

  INTERP_SUN_TAURUS: {
    code: 'INTERP_SUN_TAURUS',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['vững chãi', 'kiên định', 'thực tế', 'thẩm mỹ', 'tích lũy'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 36-44; Parker’s Astrology (Julia & Derek Parker)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Kim Ngưu: Trụ Cột Vững Vàng & Khát Vọng An Nhiên',
        template: 'Chào {{fullName}}, Mặt Trời tại {{astrology.planets.sun.degree}}° Kim Ngưu trao cho bạn tính cách điềm đạm, sự kiên trì phi thường và khả năng biến những ý tưởng trừu tượng thành giá trị vật chất hữu hình bền vững.',
        laymanSummary: 'Bạn là người thực tế, đáng tin cậy, làm việc cẩn trọng từng bước và rất coi trọng sự ổn định, an toàn tài chính.',
        explanation: 'Thuộc nguyên tố Đất Kiên định và cai quản bởi sao Kim, bạn có gu thưởng thức cuộc sống tinh tế, yêu chuộng cái đẹp và sở hữu nội lực tĩnh lặng, hiếm khi bị xao động bởi những cơn sốt nhất thời.',
        actionableAdvice: 'Mở rộng lòng đón nhận những thay đổi linh hoạt; đôi khi phá vỡ vùng an toàn một chút sẽ mang lại bước ngoặt thần kỳ.',
        sourceReference: 'Planets in Signs (Robert Hand) - Phân tích Mặt Trời cung Đất',
      },
      [ReadingDomain.FINANCE]: {
        domain: ReadingDomain.FINANCE,
        title: 'Tài Chính & Quản Trị Tài Sản',
        template: 'Khả năng quản lý dòng tiền và tích lũy tài sản của {{fullName}} thuộc hàng xuất sắc nhất trong 12 cung hoàng đạo. Bạn có trực giác nhạy bén về giá trị thực của bất động sản, đầu tư an toàn và tích sản dài hạn.',
        laymanSummary: 'Chi tiêu có tính toán, biết cách giữ tiền và nhân vốn chắc chắn, ít khi chịu rủi ro bốc đồng.',
        actionableAdvice: 'Đừng quá lo lắng về sự khan hiếm; hãy học cách tận hưởng thành quả lao động xứng đáng của bản thân.',
      },
    },
  },

  INTERP_SUN_GEMINI: {
    code: 'INTERP_SUN_GEMINI',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['linh hoạt', 'thông tuệ', 'giao tiếp', 'học hỏi đa ngành', 'thích ứng'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 45-53; The Inner Sky (Steven Forrest)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Song Tử: Trí Tuệ Khai Sáng & Sứ Giả Kết Nối',
        template: 'Chào {{fullName}}, Mặt Trời tại {{astrology.planets.sun.degree}}° Song Tử mang đến cho bạn trí tuệ nhanh nhạy, khả năng ngôn ngữ biểu đạt tài tình và sự hiếu kỳ vô tận trước thế giới tri thức đa dạng.',
        laymanSummary: 'Bạn học nhanh, nói chuyện duyên dáng, thích ứng cực tốt và luôn có nhiều ý tưởng sáng tạo cùng lúc.',
        explanation: 'Song Tử là cung Khí Biến đổi được bảo trợ bởi Thủy Tinh (Mercury). Bạn kết nối con người và thông tin một cách tự nhiên, là linh hồn của các cuộc đàm đạo văn minh.',
        actionableAdvice: 'Chọn 1 hoặc 2 mục tiêu cốt lõi để đào sâu nghiên cứu chuyên sâu, tránh phân tán năng lượng vào quá nhiều sở thích vụn vặt.',
        sourceReference: 'Planets in Signs (Robert Hand) - Vị thế Thủy Tinh & Mặt Trời Song Tử',
      },
    },
  },

  INTERP_SUN_CANCER: {
    code: 'INTERP_SUN_CANCER',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['trắc ẩn', 'bảo bọc', 'trực giác nhạy cảm', 'gia đình', 'nội tâm sâu'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 54-62; Astrology for Real Relationships (Jessica Lanyadoo)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Cự Giải: Trái Tim Bao Dung & Năng Lực Trực Giác',
        template: 'Chào {{fullName}}, Mặt Trời an tọa tại {{astrology.planets.sun.degree}}° Cự Giải trao cho bạn tâm hồn giàu lòng nhân ái, khả năng cảm nhận cảm xúc người khác cực kỳ tinh tế và sự gắn kết thiêng liêng với tổ ấm gia đình.',
        laymanSummary: 'Bạn sống tình cảm, thấu hiểu người khác, luôn quan tâm bảo bọc người thân yêu và có linh cảm rất nhạy.',
        explanation: 'Cự Giải thuộc nguyên tố Nước Tiên phong được cai quản bởi Mặt Trăng. Lớp vỏ bên ngoài có thể thận trọng, phòng thủ nhưng bên trong là dòng chảy yêu thương vô tận.',
        actionableAdvice: 'Thiết lập ranh giới cảm xúc lành mạnh để không vô tình ôm lấy năng lượng tiêu cực từ những người xung quanh.',
        sourceReference: 'Astrology for Real Relationships (Jessica Lanyadoo)',
      },
    },
  },

  INTERP_SUN_LEO: {
    code: 'INTERP_SUN_LEO',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['quang minh', 'tự tin', 'hào hiệp', 'lãnh đạo', 'sáng tạo rực rỡ'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 63-71; The Astrology of Personality (Dane Rudhyar)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Sư Tử: Khí Chất Hoàng Gia & Bản Lĩnh Tỏa Sáng',
        template: 'Chào {{fullName}}, Mặt Trời ngự trị tại vị trí vượng khí {{astrology.planets.sun.degree}}° Sư Tử ban cho bạn phong thái đường hoàng, trái tim hào sảng và khát vọng để lại di sản rạng rỡ cho đời.',
        laymanSummary: 'Bạn sinh ra để đứng đầu, luôn tự tin, trung thực, hào hiệp với bạn bè và có sức hút tự nhiên trước đám đông.',
        explanation: 'Được cai quản bởi chính Mặt Trời, bạn mang ngọn lửa ấm áp sưởi ấm mọi người. Bạn tự trọng cao và khát khao được ghi nhận bằng năng lực thực chất.',
        actionableAdvice: 'Lắng nghe những góp ý trái chiều với tâm thế cởi mở; sự khiêm nhường sẽ nâng tầm uy tín của bạn lên mức tuyệt đối.',
        sourceReference: 'Planets in Signs (Robert Hand) - Phân tích Mặt Trời chủ quản Sư Tử',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Sự Nghiệp & Tầm Ảnh Hưởng',
        template: 'Với khí chất tự tin bẩm sinh của {{fullName}}, bạn phát huy xuất sắc nhất ở các cương vị giám đốc điều hành, nhà kiến tạo thương hiệu, nghệ thuật hoặc người truyền cảm hứng đại chúng.',
        laymanSummary: 'Hợp công việc dẫn dắt, biểu diễn, tổ chức và quản trị cấp cao; làm việc tự chủ giúp bạn thăng hoa.',
        actionableAdvice: 'Trao quyền nhiều hơn cho đồng đội để tạo nên tập thể vững mạnh cùng tỏa sáng.',
      },
    },
  },

  INTERP_SUN_VIRGO: {
    code: 'INTERP_SUN_VIRGO',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['tinh chuẩn', 'tận tụy', 'phân tích sắc bén', 'hoàn thiện', 'phụng sự'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 72-80; The Inner Sky (Steven Forrest)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Xử Nữ: Bàn Tay Khéo Léo & Trí Tuệ Phân Tích Thực Tiễn',
        template: 'Chào {{fullName}}, Mặt Trời tại {{astrology.planets.sun.degree}}° Xử Nữ mang đến cho bạn đôi mắt quan sát sắc sảo, tinh thần trách nhiệm mẫu mực và khả năng sắp xếp tối ưu hóa mọi trật tự cuộc sống.',
        laymanSummary: 'Bạn tỉ mỉ, làm việc cực kỳ có tâm, có khả năng nhìn thấy những lỗi sai nhỏ mà người khác bỏ sót.',
        explanation: 'Cung Đất Biến đổi dưới sự điều phối của Thủy Tinh tạo nên bộ óc logic thượng thừa, luôn hướng đến sự hoàn hảo và sự hữu ích cho cộng đồng.',
        actionableAdvice: 'Học cách bao dung với những điều chưa trọn vẹn của chính mình và người khác; hoàn thành tốt hơn là cầu toàn tuyệt đối.',
        sourceReference: 'Planets in Signs (Robert Hand) - Chi tiết Mặt Trời tại Xử Nữ',
      },
    },
  },

  INTERP_SUN_LIBRA: {
    code: 'INTERP_SUN_LIBRA',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['công bằng', 'ngoại giao', 'thẩm mỹ tinh hoa', 'hài hòa', 'hợp tác'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 81-89; The Twelve Houses (Howard Sasportas)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Thiên Bình: Nghệ Thuật Ngoại Giao & Cân Bằng Hoàn Mỹ',
        template: 'Chào {{fullName}}, Mặt Trời tọa lạc tại {{astrology.planets.sun.degree}}° Thiên Bình ban tặng cho bạn nét duyên dáng bẩm sinh, gu thẩm mỹ tao nhã và khát vọng cháy bỏng về sự công lý, bình đẳng trong các mối quan hệ.',
        laymanSummary: 'Bạn lịch thiệp, dễ gần, có tài hòa giải xích mích và luôn muốn tạo ra bầu không khí vui vẻ, êm ấm.',
        explanation: 'Thuộc nguyên tố Khí Tiên phong do sao Kim chủ quản, bạn là chiếc cầu nối xóa tan bất đồng, luôn cân nhắc đa chiều trước khi kết luận.',
        actionableAdvice: 'Dũng cảm bày tỏ lập trường dứt khoát khi cần thiết; đừng ngại xung đột nếu điều đó bảo vệ sự thật.',
        sourceReference: 'The Twelve Houses (Howard Sasportas) & Planets in Signs (Robert Hand)',
      },
    },
  },

  INTERP_SUN_SCORPIO: {
    code: 'INTERP_SUN_SCORPIO',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['nội lực phi thường', 'thấu thị', 'chuyển hóa', 'trung thành sắt son'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 90-98; Astrology for the Soul (Jan Spiller)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Bọ Cạp: Chiều Sâu Tâm Thức & Sức Mạnh Tái Sinh',
        template: 'Chào {{fullName}}, Mặt Trời ngự tại {{astrology.planets.sun.degree}}° Bọ Cạp trao cho bạn ý chí thép, trực cảm xuyên thấu và khả năng vượt qua nghịch cảnh để tái sinh mạnh mẽ hơn bất kỳ ai.',
        laymanSummary: 'Bạn sâu sắc, có giác quan thứ 6 cực nhạy, yêu ghét rõ ràng và sở hữu nội lực tiềm ẩn khổng lồ.',
        explanation: 'Cung Nước Kiên định được đồng chủ quản bởi Hỏa Tinh và Diêm Vương Tinh (Pluto). Bạn nhìn thấu động cơ ẩn giấu sau vẻ bề ngoài và luôn bảo vệ tuyệt đối những người mình trân quý.',
        actionableAdvice: 'Học cách tha thứ và buông bỏ những oán hận trong quá khứ để tâm hồn được tự do và thanh thản đón nhận may mắn mới.',
        sourceReference: 'Planets in Signs (Robert Hand) - Diêm Vương Tinh & Bọ Cạp',
      },
    },
  },

  INTERP_SUN_SAGITTARIUS: {
    code: 'INTERP_SUN_SAGITTARIUS',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['khai phóng', 'lạc quan', 'tầm nhìn xa', 'triết lý sống', 'tự do'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 99-107; The Inner Sky (Steven Forrest)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Nhân Mã: Tinh Thần Khai Phóng & Khát Vọng Chân Trời Mới',
        template: 'Chào {{fullName}}, Mặt Trời tại {{astrology.planets.sun.degree}}° Nhân Mã mang lại cho bạn sự lạc quan thuần khiết, tầm nhìn chiến lược vĩ mô và niềm đam mê khám phá các nền văn hóa, triết học nhân loại.',
        laymanSummary: 'Bạn vui tính, thích du lịch, ghét sự gò bó, luôn nhìn đời bằng con mắt tích cực và giàu tinh thần nghĩa hiệp.',
        explanation: 'Nguyên tố Lửa Biến đổi được ban phước bởi Mộc Tinh (Jupiter). Bạn truyền cảm hứng sống hào sảng và mở rộng nhận thức cho cộng đồng.',
        actionableAdvice: 'Chú ý đến các chi tiết thực thi vi mô và cam kết thời gian để ý tưởng lớn được hiện thực hóa trọn vẹn.',
        sourceReference: 'Planets in Signs (Robert Hand) - Mộc Tinh & Nhân Mã',
      },
    },
  },

  INTERP_SUN_CAPRICORN: {
    code: 'INTERP_SUN_CAPRICORN',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['kiên định', 'kỷ luật thép', 'trách nhiệm', 'xây dựng thành trì', 'dài hạn'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 108-116; The Twelve Houses (Howard Sasportas)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Ma Kết: Bền Bỉ Kiến Tạo Thành Trì & Tầm Nhìn Thế Hệ',
        template: 'Chào {{fullName}}, Mặt Trời an tọa tại {{astrology.planets.sun.degree}}° Ma Kết{{#if astrology.planets.sun.house}} (Nhà {{astrology.planets.sun.house}}){{/if}} tôi rèn cho bạn tinh thần kỷ luật gang thép, sự kiên nhẫn vượt thời gian và khả năng gánh vác đại nghiệp bền vững.',
        laymanSummary: 'Bạn là người chững chạc, uy tín, làm việc có kế hoạch dài hạn, càng về hậu vận càng tích lũy được uy quyền và tài sản lớn.',
        explanation: 'Cung Đất Tiên phong dưới sự dẫn dắt của Thổ Tinh (Saturn). Bạn coi trọng danh dự, lời hứa và là điểm tựa đáng tin cậy nhất cho gia đình và tổ chức.',
        actionableAdvice: 'Cho phép bản thân được nghỉ ngơi, bộc lộ cảm xúc ấm áp; hạnh phúc nằm ở hành trình chứ không chỉ ở đích đến.',
        sourceReference: 'Planets in Signs (Robert Hand) - Khảo luận Thổ Tinh tại Ma Kết',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Sự Nghiệp & Định Hình Vị Thế',
        template: 'Với năng lực tổ chức quy chuẩn của {{fullName}}, bạn thích hợp với quản trị doanh nghiệp, tài chính vĩ mô, cơ quan nhà nước, kỹ thuật xây dựng và các dự án quy mô lớn đòi hỏi sự chuẩn xác cao.',
        laymanSummary: 'Có tố chất làm lãnh đạo cấp cao, kiên trì leo từng nấc thang danh vọng một cách vững chắc.',
        actionableAdvice: 'Tin tưởng và đào tạo cấp dưới để chia sẻ bớt gánh nặng trách nhiệm.',
      },
    },
  },

  INTERP_SUN_AQUARIUS: {
    code: 'INTERP_SUN_AQUARIUS',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['đổi mới', 'nhân đạo', 'độc lập tư duy', 'công nghệ', 'tương lai'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 117-125; The Astrology of Personality (Dane Rudhyar)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Bảo Bình: Tư Duy Đột Phá & Trí Tuệ Vượt Thời Đại',
        template: 'Chào {{fullName}}, Mặt Trời tại {{astrology.planets.sun.degree}}° Bảo Bình trao cho bạn góc nhìn khác biệt, niềm đam mê tiến bộ xã hội và tư duy cải cách độc đáo không bị trói buộc bởi định kiến.',
        laymanSummary: 'Bạn thông minh, có nhiều ý tưởng đi trước thời đại, yêu tự do bình đẳng và luôn bảo vệ lẽ phải.',
        explanation: 'Cung Khí Kiên định chủ quản bởi Thiên Vương Tinh (Uranus) và Thổ Tinh. Bạn quan tâm sâu sắc đến lợi ích cộng đồng và sự phát triển của khoa học kỹ thuật.',
        actionableAdvice: 'Kết nối sâu sắc hơn với cảm xúc cá nhân bên cạnh những lý tưởng xã hội bao la.',
        sourceReference: 'Planets in Signs (Robert Hand) - Thiên Vương Tinh & Bảo Bình',
      },
    },
  },

  INTERP_SUN_PISCES: {
    code: 'INTERP_SUN_PISCES',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_sun',
    themes: ['trực giác tâm linh', 'từ bi', 'nghệ thuật', 'đồng cảm vô biên', 'bao dung'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 126-134; The Inner Sky (Steven Forrest)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Song Ngư: Đại Dương Lòng Trắc Ẩn & Cảm Hứng Nghệ Thuật',
        template: 'Chào {{fullName}}, Mặt Trời tọa lạc tại {{astrology.planets.sun.degree}}° Song Ngư mang đến tâm hồn giàu chất thơ, trực giác thấu suốt chiều sâu tâm thức và trái tim đầy tình yêu thương vị tha.',
        laymanSummary: 'Bạn giàu lòng trắc ẩn, nhạy bén với nghệ thuật, sống tình cảm và có linh cảm tâm linh rất mạnh.',
        explanation: 'Cung Nước Biến đổi được soi sáng bởi Hải Vương Tinh (Neptune) và Mộc Tinh. Bạn thấu hiểu nỗi đau của nhân loại và có khả năng chữa lành cảm xúc kỳ diệu.',
        actionableAdvice: 'Giữ vững sự thực tế trong các quyết định tài chính và không để lòng tốt bị kẻ xấu lợi dụng.',
        sourceReference: 'Planets in Signs (Robert Hand) - Hải Vương Tinh & Song Ngư',
      },
    },
  },

  INTERP_MOON_PISCES: {
    code: 'INTERP_MOON_PISCES',
    scope: RuleScope.ASTROLOGY,
    category: 'zodiac_moon',
    themes: ['cảm xúc ẩn kín', 'trực cảm sâu sắc', 'thấu cảm', 'chữa lành'],
    sourceReference: 'Planets in Signs (Robert Hand), tr. 210-218; Astrology for Real Relationships',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trăng tại Song Ngư: Thế Giới Cảm Xúc Huyền Diệu & Trực Giác Tinh Tế',
        template: 'Chào {{fullName}}, vị trí Mặt Trăng tại Song Ngư cho thấy sâu thẳm nội tâm bạn là một ốc đảo yên bình, nơi dung chứa những rung cảm thiêng liêng và lòng trắc ẩn thầm lặng.',
        laymanSummary: 'Bạn rất nhạy cảm với tâm trạng của người bên cạnh, cần nơi chốn tĩnh lặng riêng để tái tạo năng lượng tinh thần.',
        explanation: 'Mặt Trăng biểu thị nhu cầu an toàn cảm xúc cốt lõi. Người có Mặt Trăng Song Ngư thường sở hữu năng khiếu nghệ thuật, tâm lý học và trực giác phi thường.',
        actionableAdvice: 'Dành thời gian gần gũi thiên nhiên, nghe nhạc hoặc thiền tịnh định kỳ để thanh lọc tâm trí.',
        sourceReference: 'Planets in Signs (Robert Hand) - Vị trí Mặt Trăng tại Song Ngư',
      },
    },
  },

  // =========================================================================
  // 2. THẦN SỐ HỌC PITAGO (PYTHAGOREAN NUMEROLOGY)
  // Nguồn tham chiếu: "The Complete Book of Numerology" - Dr. David A. Phillips;
  // "Thay Đổi Cuộc Sống Với Nhân Số Học" - Lê Đỗ Quỳnh Hương
  // =========================================================================

  INTERP_LIFEPATH_1: {
    code: 'INTERP_LIFEPATH_1',
    scope: RuleScope.NUMEROLOGY,
    category: 'lifepath',
    themes: ['tiên phong', 'tự chủ tuyệt đối', 'ý chí sắt đá', 'sáng lập', 'bản lĩnh độc lập'],
    sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), Chương 4: Life Path 1',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Chủ Đạo 1: Sứ Mệnh Người Tiên Phong & Nhà Sáng Lập Tự Thân',
        template: 'Chào {{fullName}}, với Con số Chủ đạo 1 (Life Path 1), sứ mệnh cuộc đời bạn là khai phá những lối đi mới, trở thành người thủ lĩnh độc lập và tự tay tạo dựng cơ đồ mà không phụ thuộc vào ai.',
        laymanSummary: 'Bạn sinh ra để đứng đầu: có chính kiến rất mạnh, thích tự quyết định số phận, không thích bị người khác can thiệp quá sâu vào việc của mình.',
        explanation: 'Theo trường phái Pythagoras do Tiến sĩ David A. Phillips đúc kết, số 1 là biểu tượng của bản thể duy nhất, ngọn nguồn của hành động và ý chí tự lực cánh sinh mãnh liệt.',
        actionableAdvice: 'Rèn luyện khả năng lắng nghe và hợp tác hài hòa; thủ lĩnh vĩ đại là người biết nâng đỡ đồng đội cùng tiến bước.',
        sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), tr. 55-64',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Định Hướng Công Danh & Tài Chính',
        template: 'Người mang số 1 như {{fullName}} phát triển rực rỡ nhất khi làm chủ doanh nghiệp, chuyên gia tư vấn độc lập, quản lý dự án cấp cao hoặc chính khách dám nghĩ dám làm.',
        laymanSummary: 'Hợp tự kinh doanh, lãnh đạo, làm chủ công việc; làm nhân viên rập khuôn sẽ khiến bạn cảm thấy bí bách.',
        actionableAdvice: 'Xây dựng kế hoạch tài chính có kỷ luật; sự tự tin kết hợp quản trị rủi ro chặt chẽ sẽ đưa bạn đến thành công lớn.',
      },
    },
  },

  INTERP_LIFEPATH_3: {
    code: 'INTERP_LIFEPATH_3',
    scope: RuleScope.NUMEROLOGY,
    category: 'lifepath',
    themes: ['truyền cảm hứng', 'hoạt ngôn', 'sáng tạo nghệ thuật', 'lạc quan', 'lan tỏa niềm vui'],
    sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), Chương 4: Life Path 3',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Chủ Đạo 3: Trí Tuệ Sáng Tạo & Sứ Giả Truyền Cảm Hứng',
        template: 'Chào {{fullName}}, sở hữu Con số Chủ đạo 3, món quà lớn nhất mà vũ trụ trao tặng bạn là khả năng ngôn ngữ biểu đạt xuất chúng, tư duy sáng tạo linh hoạt và nguồn năng lượng tích cực lan tỏa đến mọi người.',
        laymanSummary: 'Bạn vui vẻ, hài hước, giao tiếp khéo léo, nhiều ý tưởng độc đáo và có năng khiếu nói hoặc viết lách.',
        explanation: 'Số 3 nằm trên trục Thần trí (Mind Axis). Bạn tư duy nhanh như chớp, có khả năng biến những vấn đề phức tạp thành câu chuyện dễ hiểu, sinh động.',
        actionableAdvice: 'Rèn tính kiên định hoàn thành dự án đến cùng; tránh nói lời tổn thương người khác khi đang nóng giận.',
        sourceReference: 'Thay Đổi Cuộc Sống Với Nhân Số Học (Lê Đỗ Quỳnh Hương), tr. 82-95',
      },
    },
  },

  INTERP_LIFEPATH_7: {
    code: 'INTERP_LIFEPATH_7',
    scope: RuleScope.NUMEROLOGY,
    category: 'lifepath',
    themes: ['thông tuệ', 'chiêm nghiệm triết lý', 'trực giác học thức', 'độc lập tư duy'],
    sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), Chương 4: Life Path 7',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Chủ Đạo 7: Người Khai Mở Chân Lý & Trí Tuệ Chiêm Nghiệm Thực Tiễn',
        template: 'Chào {{fullName}}, Con số Chủ đạo 7 đưa bạn đến con đường của một nhà hiền triết: bạn học hỏi qua chính những trải nghiệm thực tế cuộc đời, luôn khao khát tìm hiểu bản chất sâu xa của vạn vật.',
        laymanSummary: 'Bạn sâu sắc, thích nghiên cứu, ghét sự hời hợt giả tạo, thích không gian tĩnh lặng và có năng lực phân tích tuyệt vời.',
        explanation: 'Số 7 là con số của sự thấu hiểu tâm linh và tri thức hàn lâm. Bạn không dễ tin vào điều gì nếu chưa tự mình kiểm chứng hoặc suy ngẫm thấu đáo.',
        actionableAdvice: 'Mở lòng chia sẻ tri thức quý báu của mình cho cộng đồng thay vì tự cô lập bản thân trong tháp ngà tư tưởng.',
        sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), tr. 102-114',
      },
    },
  },

  INTERP_LIFEPATH_8: {
    code: 'INTERP_LIFEPATH_8',
    scope: RuleScope.NUMEROLOGY,
    category: 'lifepath',
    themes: ['kiến tạo tài chính', 'quản trị vĩ mô', 'quyền lực', 'công bằng nhân quả', 'bản lĩnh kinh doanh'],
    sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), Chương 4: Life Path 8',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Chủ Đạo 8: Nhà Quản Trị Chiến Lược & Bản Lĩnh Thịnh Vượng Vật Chất',
        template: 'Chào {{fullName}}, Con số Chủ đạo 8 ban tặng cho bạn tư duy kinh doanh bẩm sinh, năng lực điều hành tài chính vĩ mô và sự thấu suốt về quy luật nguyên nhân - kết quả trong việc tạo dựng của cải.',
        laymanSummary: 'Bạn có duyên lớn với tiền bạc và quản lý, độc lập, quyết đoán, nhìn đâu cũng thấy cơ hội phát triển bền vững.',
        explanation: 'Số 8 đại diện cho sự cân bằng hoàn hảo giữa thế giới vật chất và tinh thần. Bạn sở hữu sức mạnh nội tại giúp phục hồi nhanh chóng sau mọi thăng trầm thương trường.',
        actionableAdvice: 'Luôn giữ tâm thế kinh doanh chính trực, phụng sự khách hàng; đạo đức vững vàng sẽ giữ cho tài sản của bạn trường tồn.',
        sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), tr. 115-126',
      },
    },
  },

  INTERP_LIFEPATH_11: {
    code: 'INTERP_LIFEPATH_11',
    scope: RuleScope.NUMEROLOGY,
    category: 'lifepath_master',
    themes: ['master number', 'khai sáng tâm thức', 'trực giác siêu phàm', 'người dẫn đường tinh thần'],
    sourceReference: 'The Complete Book of Numerology (Dr. David A. Phillips), Master Number 11',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Bậc Thầy 11/2: Ngọn Hải Đăng Khai Sáng & Trực Giác Bác Học',
        template: 'Chào {{fullName}}, bạn mang trong mình Master Number 11 - con số của người dẫn đường tâm thức. Bạn sở hữu trực cảm tinh vi vượt bậc, khả năng cảm nhận chiều sâu tâm lý và sứ mệnh đem lại sự tỉnh thức cho cộng đồng.',
        laymanSummary: 'Bạn có linh cảm chuẩn xác đến kinh ngạc, giàu lòng trắc ẩn, nhạy bén và thường có những giấc mơ hoặc dự cảm đúng sự thật.',
        explanation: 'Số 11 là sự thăng hoa của số 2 (sự hòa ái) trên một bậc thang nhận thức cao hơn. Bạn có năng lượng tinh thần rất mạnh nhưng cần học cách kiểm soát sự nhạy cảm thái quá.',
        actionableAdvice: 'Tập thiền định, khí công hoặc đi bộ giữa thiên nhiên để giữ vững sự định tĩnh; tránh để bản thân bị quá tải bởi suy nghĩ của người khác.',
        sourceReference: 'Thay Đổi Cuộc Sống Với Nhân Số Học (Lê Đỗ Quỳnh Hương), tr. 140-155',
      },
    },
  },

  // =========================================================================
  // 3. TỬ VI ĐẨU SỐ (EASTERN ASTROLOGY - TUVI METHOD V1)
  // Nguồn tham chiếu: "Tử Vi Đẩu Số Toàn Thư" - Hi Di Trần Đoàn; "Tử Vi Áo Bí" - Hà Uyên;
  // "Tử Vi Giảng Minh" - Vân Đằng Thái Thứ Lang
  // =========================================================================

  INTERP_TUVI_MENH_TU_VI: {
    code: 'INTERP_TUVI_MENH_TU_VI',
    scope: RuleScope.TUVI,
    category: 'tuvi_stars',
    themes: ['đế tinh vượng địa', 'trung hậu đường hoàng', 'tài lãnh đạo', 'phúc hậu trường thọ'],
    sourceReference: 'Tử Vi Đẩu Số Toàn Thư (Hi Di Trần Đoàn), Thiên Cung Bản Mệnh; Tử Vi Áo Bí (Hà Uyên)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Cung Mệnh Có Sao Tử Vi: Đế Tinh Miếu Vượng & Khí Chất Quân Vương',
        template: 'Chào {{fullName}}, Cung Mệnh của bạn có sao Tử Vi tọa thủ. Tử Vi là Nam Bắc Đẩu tôn tinh, chủ về uy quyền, phúc thọ và sự che chở cát tường. Bản mệnh toát lên khí chất đĩnh đạc, trọng danh dự và có tài quy tụ lòng người.',
        laymanSummary: 'Số bạn có phúc lớn, đi đâu cũng được người kính trọng, cốt cách đoan chính, có duyên làm lãnh đạo hoặc nắm giữ trọng trách.',
        explanation: 'Theo kinh điển Tử Vi Đẩu Số Toàn Thư: "Tử Vi thủ Mệnh, thân cư miếu địa, chung thân phúc thọ, phú quý song toàn". Bạn có đức độ bao dung, lời nói có trọng lượng và luôn được quý nhân phò trợ.',
        actionableAdvice: 'Tránh định kiến độc đoán; luôn giữ lòng từ bi và khiêm cung lắng nghe hiền tài để cơ nghiệp mãi vững bền.',
        sourceReference: 'Tử Vi Đẩu Số Toàn Thư (Trần Đoàn) - Khảo luận sao Tử Vi tọa Mệnh',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Công Danh & Quyền Bính',
        template: 'Với cách cục Tử Vi tọa thủ, {{fullName}} dễ công thành danh toại trong các lĩnh vực quản lý nhà nước, điều hành doanh nghiệp lớn, chính trị hoặc các tổ chức uy tín hàng đầu.',
        laymanSummary: 'Thích hợp với ngôi vị đứng đầu, hoạch định chính sách; khó chấp nhận làm phận tay sai tầm thường.',
        actionableAdvice: 'Không ngừng tu dưỡng học vấn và đạo đức kinh doanh để xứng tầm với thiên mệnh cao quý.',
      },
    },
  },

  INTERP_TUVI_HOA_LOC: {
    code: 'INTERP_TUVI_HOA_LOC',
    scope: RuleScope.TUVI,
    category: 'tuvi_tu_hoa',
    themes: ['thiên lộc dồi dào', 'duyên may tài chính', 'hoạt bát vui vẻ', 'kinh doanh hanh thông'],
    sourceReference: 'Tử Vi Giảng Minh (Thái Thứ Lang), Chương Tứ Hóa Bí Điển; Tử Vi Áo Bí (Hà Uyên)',
    blocks: {
      [ReadingDomain.FINANCE]: {
        domain: ReadingDomain.FINANCE,
        title: 'Mệnh Hóa Lộc: Nguồn Tài Nguyên Dồi Dào & Duyên Khởi Hanh Thông',
        template: 'Cung Mệnh của {{fullName}} có Hóa Lộc chiếu cố. Hóa Lộc là ngôi sao cát tường đệ nhất về tiền tài, tượng trưng cho lộc trời ban, cơ hội giao thương rộng mở và sự may mắn tự nhiên đưa tới.',
        laymanSummary: 'Bạn rất có duyên với tiền bạc, kinh doanh buôn bán hay làm việc gì cũng dễ gặp may mắn, đời sống vật chất ấm no.',
        explanation: 'Cổ nhân đúc kết: "Hóa Lộc tại Mệnh, tài quan song mỹ, y thực phong túc". Bạn có thái độ sống niềm nở, hào phóng và biết cách thu hút của cải qua sự tử tế.',
        actionableAdvice: 'Trích một phần tài lộc làm việc thiện, hồi hướng công đức cho gia đình và xã hội để phước lành trường cửu.',
        sourceReference: 'Tử Vi Giảng Minh (Thái Thứ Lang) - Luận giải Hóa Lộc tinh',
      },
    },
  },

  // =========================================================================
  // 4. TAROT RIDER-WAITE-SMITH (78 LÁ BÀI KINH ĐIỂN)
  // Nguồn tham chiếu: "The Pictorial Key to the Tarot" - Arthur Edward Waite (1910);
  // "Seventy-Eight Degrees of Wisdom" - Rachel Pollack
  // =========================================================================

  INTERP_TAROT_FOOL: {
    code: 'INTERP_TAROT_FOOL',
    scope: RuleScope.TAROT,
    category: 'tarot_major',
    themes: ['bước nhảy niềm tin', 'khởi đầu mới', 'tự do thuần khiết', 'dám ước mơ'],
    sourceReference: 'The Pictorial Key to the Tarot (A.E. Waite), Major Arcana 0: The Fool',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Lá Bài The Fool (Chàng Khờ): Bước Nhảy Niềm Tin & Khởi Đầu Rực Rỡ',
        template: 'Chào {{fullName}}, lá bài The Fool (vị trí {{tarot.spread.position_1.orientation}}) báo hiệu bạn đang đứng trước một khúc quanh quan trọng của cuộc đời: một hành trình mới mở ra đầy ắp tiềm năng, đòi hỏi sự trong sáng và lòng dũng cảm bước qua giới hạn cũ.',
        laymanSummary: 'Đây là thời điểm vàng để bạn bắt đầu một kế hoạch mới, một công việc mới hoặc một mối quan hệ mới mà không cần lo sợ quá khứ.',
        explanation: 'Theo nguyên tác của A.E. Waite: Chàng Khờ bước đi trên đỉnh núi với bông hoa hồng trắng biểu trưng cho sự thuần khiết. Chú chó nhỏ đồng hành nhắc nhở về trực giác bảo hộ tự nhiên.',
        actionableAdvice: 'Hãy tin tưởng vào sự dẫn dắt của trực giác; can đảm đón nhận cơ hội mới nhưng đừng quên quan sát thực tế dưới chân.',
        sourceReference: 'The Pictorial Key to the Tarot (A.E. Waite, 1910), Phần II: The Major Arcana',
      },
    },
  },

  // =========================================================================
  // 5. TỔNG HỢP ĐA HỆ THỐNG (CROSS-SYSTEM SYNTHESIS)
  // Kết hợp hài hòa Chiêm tinh, Thần số học, Tử vi và Tarot thành một thể thống nhất
  // =========================================================================

  INTERP_CROSS_MYSTIC_INTROVERT: {
    code: 'INTERP_CROSS_MYSTIC_INTROVERT',
    scope: RuleScope.CROSS_SYSTEM,
    category: 'synthesis',
    themes: ['trực giác thấu suốt', 'chiêm nghiệm hàn lâm', 'chiều sâu tâm thức', 'bác học'],
    sourceReference: 'Tổng hợp đối chiếu: Planets in Signs (R. Hand) + The Complete Book of Numerology (Dr. D. Phillips)',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Tổng Hợp Đa Chiều: Trí Tuệ Chiêm Nghiệm & Trực Cảm Sâu Sắc',
        template: 'Bản đồ số mệnh của {{fullName}} cho thấy sự cộng hưởng hiếm có: Năng lượng thấu cảm của Mặt Trăng Song Ngư (Chiêm tinh phương Tây) hòa quyện hoàn hảo với Trí tuệ chiêm nghiệm của Con số Chủ đạo {{numerology.core.life_path.value}} (Thần số học Pythagoras). Cấu trúc này kiến tạo nên một tâm hồn sâu sắc, có khả năng nhìn thấu bản chất vấn đề từ nhiều tầng nhận thức.',
        laymanSummary: 'Bạn vừa có giác quan thứ 6 tinh tế, vừa có tư duy nghiên cứu logic sâu sắc, hiểu người và hiểu đời vượt xa vẻ bề ngoài.',
        explanation: 'Sự hòa hợp này giúp bạn dung hòa giữa lý tính khoa học và linh cảm tâm linh, là mẫu người cố vấn thông thái, đáng tin cậy trong các tình huống hiểm nghèo.',
        actionableAdvice: 'Dành riêng khoảng thời gian tĩnh lặng mỗi ngày để ghi chép lại các chiêm nghiệm; viết lách hoặc nghiên cứu sẽ giúp bạn tỏa sáng.',
        sourceReference: 'Nghiên cứu tương thích Đa hệ thống (Comparative Esoteric Studies)',
      },
    },
  },

  INTERP_CROSS_LEO_LP1: {
    code: 'INTERP_CROSS_LEO_LP1',
    scope: RuleScope.CROSS_SYSTEM,
    category: 'synthesis',
    themes: ['song trùng tiên phong', 'khí chất vương giả', 'sáng lập vĩ đại', 'uy quyền'],
    sourceReference: 'Tổng hợp đối chiếu: Astrological Signs & Pythagorean Archetypes',
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Tổng Hợp Đa Chiều: Tố Chất Lãnh Đạo Xuất Chúng & Bản Lĩnh Khai Sơn Phá Thạch',
        template: 'Sự kết hợp giữa uy lực của Mặt Trời Sư Tử và sức mạnh mở đường của Con số Chủ đạo 1 trao cho {{fullName}} nguồn sinh lực vô tận, ý chí sắt đá và tư chất thủ lĩnh bẩm sinh, sinh ra để đứng ở vị trí dẫn đầu.',
        laymanSummary: 'Bạn sở hữu nguồn động lực tự thân phi thường, không ngại khó khăn và có khả năng truyền lửa mạnh mẽ cho cả tập thể.',
        explanation: 'Sự hội tụ năng lượng nguyên tố Lửa và số 1 đại diện cho mặt trời giữa ban trưa: rực rỡ, chính trực và không thỏa hiệp với sự tầm thường.',
        actionableAdvice: 'Tận dụng uy tín và tầm nhìn này để tập hợp những cộng sự tài đức cùng nhau xây dựng đại sự.',
      },
    },
  },
};

export const BASELINE_RULES: RuleDefinition[] = [
  // ------------------------------------------
  // 1. CHIÊM TINH HỌC TÂY PHƯƠNG (12 CUNG MẶT TRỜI)
  // ------------------------------------------
  {
    ruleCode: 'ASTRO-SUN-ARIES-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Bạch Dương',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'ARIES' },
    action: { targetInterpretationId: 'INTERP_SUN_ARIES', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'aries'],
  },
  {
    ruleCode: 'ASTRO-SUN-TAURUS-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Kim Ngưu',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'TAURUS' },
    action: { targetInterpretationId: 'INTERP_SUN_TAURUS', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'taurus'],
  },
  {
    ruleCode: 'ASTRO-SUN-GEMINI-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Song Tử',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'GEMINI' },
    action: { targetInterpretationId: 'INTERP_SUN_GEMINI', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'gemini'],
  },
  {
    ruleCode: 'ASTRO-SUN-CANCER-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Cự Giải',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'CANCER' },
    action: { targetInterpretationId: 'INTERP_SUN_CANCER', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'cancer'],
  },
  {
    ruleCode: 'ASTRO-SUN-LEO-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Sư Tử',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'LEO' },
    action: { targetInterpretationId: 'INTERP_SUN_LEO', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'leo'],
  },
  {
    ruleCode: 'ASTRO-SUN-VIRGO-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Xử Nữ',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'VIRGO' },
    action: { targetInterpretationId: 'INTERP_SUN_VIRGO', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'virgo'],
  },
  {
    ruleCode: 'ASTRO-SUN-LIBRA-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Thiên Bình',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'LIBRA' },
    action: { targetInterpretationId: 'INTERP_SUN_LIBRA', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'libra'],
  },
  {
    ruleCode: 'ASTRO-SUN-SCORPIO-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Bọ Cạp',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'SCORPIO' },
    action: { targetInterpretationId: 'INTERP_SUN_SCORPIO', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'scorpio'],
  },
  {
    ruleCode: 'ASTRO-SUN-SAG-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Nhân Mã',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'SAGITTARIUS' },
    action: { targetInterpretationId: 'INTERP_SUN_SAGITTARIUS', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'sagittarius'],
  },
  {
    ruleCode: 'ASTRO-SUN-CAP-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Ma Kết',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'CAPRICORN' },
    action: { targetInterpretationId: 'INTERP_SUN_CAPRICORN', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'capricorn'],
  },
  {
    ruleCode: 'ASTRO-SUN-AQUARIUS-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Bảo Bình',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'AQUARIUS' },
    action: { targetInterpretationId: 'INTERP_SUN_AQUARIUS', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'aquarius'],
  },
  {
    ruleCode: 'ASTRO-SUN-PISCES-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 40,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời tại Song Ngư',
    conditionAst: { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
    action: { targetInterpretationId: 'INTERP_SUN_PISCES', domain: 'OVERVIEW' },
    tags: ['astrology', 'sun', 'pisces'],
  },
  {
    ruleCode: 'ASTRO-MOON-PISCES-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 45,
    specificityScore: 12,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trăng tại Song Ngư',
    conditionAst: { field: 'astrology.planets.moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
    action: { targetInterpretationId: 'INTERP_MOON_PISCES', domain: 'OVERVIEW' },
    tags: ['astrology', 'moon', 'pisces'],
  },

  // ------------------------------------------
  // 2. THẦN SỐ HỌC (SỐ CHỦ ĐẠO & MASTER)
  // ------------------------------------------
  {
    ruleCode: 'NUM-LP-1-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Chủ Đạo 1',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 1 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_1', domain: 'OVERVIEW' },
    tags: ['numerology', 'lifepath_1'],
  },
  {
    ruleCode: 'NUM-LP-3-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Chủ Đạo 3',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 3 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_3', domain: 'OVERVIEW' },
    tags: ['numerology', 'lifepath_3'],
  },
  {
    ruleCode: 'NUM-LP-7-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Chủ Đạo 7',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 7 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_7', domain: 'OVERVIEW' },
    tags: ['numerology', 'lifepath_7'],
  },
  {
    ruleCode: 'NUM-LP-8-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Chủ Đạo 8',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 8 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_8', domain: 'OVERVIEW' },
    tags: ['numerology', 'lifepath_8'],
  },
  {
    ruleCode: 'NUM-LP-11-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 55,
    specificityScore: 15,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Chủ Đạo Master 11',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 11 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_11', domain: 'OVERVIEW' },
    tags: ['numerology', 'master_11'],
  },

  // ------------------------------------------
  // 3. TỬ VI ĐẨU SỐ (MỆNH TỬ VI & HÓA LỘC)
  // ------------------------------------------
  {
    ruleCode: 'TUVI-MENH-TUVI-001',
    ruleSetId: 'RULESET_TUVI_V1',
    scope: RuleScope.TUVI,
    priority: 70,
    specificityScore: 15,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mệnh có sao Tử Vi',
    conditionAst: { field: 'tuvi.palaces.menh.has_tu_vi', operator: ConditionOperator.EQUALS, value: true },
    action: { targetInterpretationId: 'INTERP_TUVI_MENH_TU_VI', domain: 'OVERVIEW' },
    tags: ['tuvi', 'menh', 'tu_vi'],
  },
  {
    ruleCode: 'TUVI-MENH-HOALOC-001',
    ruleSetId: 'RULESET_TUVI_V1',
    scope: RuleScope.TUVI,
    priority: 65,
    specificityScore: 15,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mệnh có Hóa Lộc',
    conditionAst: { field: 'tuvi.palaces.menh.has_hoa_loc', operator: ConditionOperator.EQUALS, value: true },
    action: { targetInterpretationId: 'INTERP_TUVI_HOA_LOC', domain: 'FINANCE' },
    tags: ['tuvi', 'hoa_loc'],
  },

  // ------------------------------------------
  // 4. TAROT RIDER-WAITE-SMITH
  // ------------------------------------------
  {
    ruleCode: 'TAROT-FOOL-POS1-001',
    ruleSetId: 'RULESET_TAROT_V1',
    scope: RuleScope.TAROT,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Lá The Fool ở vị trí 1',
    conditionAst: { field: 'tarot.spread.position_1.card', operator: ConditionOperator.EQUALS, value: 'MAJOR_00_FOOL' },
    action: { targetInterpretationId: 'INTERP_TAROT_FOOL', domain: 'OVERVIEW' },
    tags: ['tarot', 'the_fool'],
  },

  // ------------------------------------------
  // 5. TỔNG HỢP ĐA HỆ THỐNG (CROSS-SYSTEM)
  // ------------------------------------------
  {
    ruleCode: 'CROSS-MOON-PISCES-LP7-001',
    ruleSetId: 'RULESET_CROSS_V1',
    scope: RuleScope.CROSS_SYSTEM,
    priority: 95,
    specificityScore: 40,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trăng Song Ngư + Life Path 7',
    conditionAst: {
      combinator: 'AND',
      conditions: [
        { field: 'astrology.planets.moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
        { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 7 },
      ],
    },
    action: { targetInterpretationId: 'INTERP_CROSS_MYSTIC_INTROVERT', domain: 'OVERVIEW', overrideGeneral: true },
    tags: ['cross_system', 'synthesis', 'moon_pisces', 'lifepath_7'],
  },
  {
    ruleCode: 'CROSS-SUN-LEO-LP1-001',
    ruleSetId: 'RULESET_CROSS_V1',
    scope: RuleScope.CROSS_SYSTEM,
    priority: 95,
    specificityScore: 40,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trời Sư Tử + Life Path 1',
    conditionAst: {
      combinator: 'AND',
      conditions: [
        { field: 'astrology.planets.sun.sign', operator: ConditionOperator.EQUALS, value: 'LEO' },
        { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 1 },
      ],
    },
    action: { targetInterpretationId: 'INTERP_CROSS_LEO_LP1', domain: 'OVERVIEW', overrideGeneral: true },
    tags: ['cross_system', 'synthesis', 'sun_leo', 'lifepath_1'],
  },
];
