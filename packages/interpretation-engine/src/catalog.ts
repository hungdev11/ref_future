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
}

export interface InterpretationDefinition {
  code: string;
  scope: RuleScope;
  category: string;
  themes: string[];
  blocks: Partial<Record<ReadingDomain, InterpretationBlockTemplate>>;
}

export const KNOWLEDGE_CATALOG: Record<string, InterpretationDefinition> = {
  // 1. Astrology Interpretations
  INTERP_SUN_LEO: {
    code: 'INTERP_SUN_LEO',
    scope: RuleScope.ASTROLOGY,
    category: 'personality',
    themes: ['tự tin', 'lãnh đạo', 'sáng tạo', 'hào hiệp'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời tại Sư Tử: Bản Sắc Rực Rỡ & Bản Lĩnh Tiên Phong',
        template: 'Với Mặt Trời tọa tại Sư Tử, năng lượng cốt lõi của bạn tỏa sáng như vầng thái dương. Bạn có nhu cầu sâu sắc về sự tự chủ, sáng tạo và mong muốn để lại dấu ấn riêng biệt trong cuộc đời.',
      },
      [ReadingDomain.STRENGTHS]: {
        domain: ReadingDomain.STRENGTHS,
        title: 'Điểm Mạnh Vượt Trội',
        template: 'Khí chất hào sảng, lòng can đảm đối diện thử thách và khả năng truyền lửa mạnh mẽ cho cộng đồng xung quanh.',
      },
      [ReadingDomain.CHALLENGES]: {
        domain: ReadingDomain.CHALLENGES,
        title: 'Thách Thức Cần Chuyển Hóa',
        template: 'Nguy cơ rơi vào cái tôi kiêu hãnh hoặc cảm giác tổn thương sâu sắc khi công sức của bản thân không được công nhận tương xứng.',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Định Hướng Sự Nghiệp',
        template: 'Thích hợp với các vị trí quản lý chiến lược, giám đốc sáng tạo, nghệ thuật biểu diễn và các công việc cho phép toàn quyền tự quyết.',
      },
      [ReadingDomain.REFLECTION]: {
        domain: ReadingDomain.REFLECTION,
        title: 'Lời Nhắc Tâm Thức',
        template: 'Sự vĩ đại chân chính không nằm ở việc nhận được bao nhiêu tràng pháo tay, mà ở việc bạn đã sưởi ấm được bao nhiêu trái tim.',
      },
    },
  },

  INTERP_SUN_CAPRICORN: {
    code: 'INTERP_SUN_CAPRICORN',
    scope: RuleScope.ASTROLOGY,
    category: 'personality',
    themes: ['kiên định', 'kỷ luật', 'trách nhiệm', 'thực tế'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trời Ma Kết: Bền Bỉ Kiến Tạo Thành Trì',
        template: 'Mặt Trời Ma Kết mang lại cho bạn sự kiên trì sắt đá, tầm nhìn dài hạn và tinh thần trách nhiệm cao độ trước mọi cam kết cuộc sống.',
      },
      [ReadingDomain.STRENGTHS]: {
        domain: ReadingDomain.STRENGTHS,
        title: 'Điểm Mạnh Vượt Trội',
        template: 'Tư duy chiến lược thực tế, khả năng tự kỷ luật phi thường và sự điềm tĩnh trước áp lực lớn.',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Định Hướng Sự Nghiệp',
        template: 'Thành công vượt trội trong các lĩnh vực quản trị doanh nghiệp, tài chính, kiến trúc, luật pháp và những dự án đòi hỏi thời gian xây đắp lâu dài.',
      },
    },
  },

  INTERP_MOON_PISCES: {
    code: 'INTERP_MOON_PISCES',
    scope: RuleScope.ASTROLOGY,
    category: 'emotion',
    themes: ['trực giác', 'thấu cảm', 'nhạy cảm', 'mơ mộng'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mặt Trăng Song Ngư: Chiều Sâu Trực Giác & Lòng Trắc Ẩn',
        template: 'Mặt Trăng Song Ngư trao cho bạn khả năng cảm nhận được tầng sóng ngầm cảm xúc của thế giới xung quanh trước khi bất kỳ ai lên tiếng.',
      },
      [ReadingDomain.REFLECTION]: {
        domain: ReadingDomain.REFLECTION,
        title: 'Cân Bằng Năng Lượng',
        template: 'Hãy thiết lập ranh giới cảm xúc rõ ràng để không bị hòa tan hoặc gánh vác năng lượng tiêu cực của người khác.',
      },
    },
  },

  // 2. Numerology Interpretations
  INTERP_LIFEPATH_7: {
    code: 'INTERP_LIFEPATH_7',
    scope: RuleScope.NUMEROLOGY,
    category: 'life_path',
    themes: ['tri thức', 'triết lý', 'nội tâm', 'khoa học'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Đạo Tự (Life Path) 7: Người Khai Sáng Tri Thức & Đi Tìm Sự Thật',
        template: 'Con đường số 7 là hành trình của nhà thông thái, nhà nghiên cứu và người quan sát sâu sắc. Bạn sinh ra để đào sâu bản chất vạn vật thay vì chấp nhận những bề nổi hời hợt.',
      },
      [ReadingDomain.STRENGTHS]: {
        domain: ReadingDomain.STRENGTHS,
        title: 'Năng Lực Bẩm Sinh',
        template: 'Khả năng phân tích sắc sảo, trực giác nhạy bén đối với chân lý và sự độc lập tuyệt đối trong tư duy.',
      },
      [ReadingDomain.CHALLENGES]: {
        domain: ReadingDomain.CHALLENGES,
        title: 'Thử Thách Tiến Hóa',
        template: 'Xu hướng cô lập bản thân, hoài nghi quá mức hoặc gặp khó khăn trong việc bộc lộ cảm xúc mộc mạc với người thân.',
      },
    },
  },

  INTERP_LIFEPATH_11: {
    code: 'INTERP_LIFEPATH_11',
    scope: RuleScope.NUMEROLOGY,
    category: 'master_number',
    themes: ['khai sáng', 'sứ giả', 'trực giác cao', 'truyền cảm hứng'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Số Đạo Tự Master 11: Cầu Nối Tâm Thức & Ngọn Đuốc Dẫn Đường',
        template: 'Là một con số Master, số 11 mang rung động kép của sự thấu hiểu trực cảm và khả năng truyền cảm hứng thức tỉnh cho tập thể.',
      },
    },
  },

  // 3. Tử Vi Đẩu Số Interpretations
  INTERP_TUVI_MENH_TU_VI: {
    code: 'INTERP_TUVI_MENH_TU_VI',
    scope: RuleScope.TUVI,
    category: 'menh',
    themes: ['đế tinh', 'uy quyền', 'lãnh đạo', 'khoan dung'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Mệnh Tọa Đế Tinh Tử Vi: Khí Chất Vương Giả & Đức Độ Bao Dung',
        template: 'Sao Tử Vi là tôn tinh đứng đầu 14 chính tinh, thuộc Thổ, chủ quản sự tôn quý, tài lộc và phúc thọ. Mệnh có Tử Vi là người có phong thái đĩnh đạc, được người khác tin cậy trao quyền.',
      },
      [ReadingDomain.CAREER]: {
        domain: ReadingDomain.CAREER,
        title: 'Phương Hướng Hoạt Động',
        template: 'Dễ đứng ở cương vị người đứng đầu, cố vấn cấp cao hoặc doanh chủ tự chủ xây dựng sự nghiệp vững bền.',
      },
    },
  },

  INTERP_TUVI_HOA_LOC: {
    code: 'INTERP_TUVI_HOA_LOC',
    scope: RuleScope.TUVI,
    category: 'tu_hoa',
    themes: ['tài lộc', 'cơ hội', 'vận may', 'nhân duyên'],
    blocks: {
      [ReadingDomain.FINANCE]: {
        domain: ReadingDomain.FINANCE,
        title: 'Hóa Lộc Chiếu Cung Mệnh: Cội Nguồn Tài Khí & Duyên Tiền Bạc',
        template: 'Hóa Lộc mang năng lượng cát lành của Mộc, chủ về nguồn tiền lưu thông dồi dào, cơ hội kết giao quý nhân và sự hanh thông trong buôn bán giao dịch.',
      },
    },
  },

  // 4. Tarot Interpretations
  INTERP_TAROT_FOOL: {
    code: 'INTERP_TAROT_FOOL',
    scope: RuleScope.TAROT,
    category: 'arcana',
    themes: ['khởi đầu mới', 'bước nhảy niềm tin', 'tự do'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Lá Bài The Fool: Bước Nhảy Của Niềm Tin Thuần Khiết',
        template: 'Vũ trụ mời gọi bạn bước vào một chương hoàn toàn mới mà không cần quá lo lắng về sự phán xét của quá khứ. Hãy giữ tâm hồn tươi mới như thuở ban đầu.',
      },
    },
  },

  // 5. Cross-System Synthesis Interpretations
  INTERP_CROSS_MYSTIC_INTROVERT: {
    code: 'INTERP_CROSS_MYSTIC_INTROVERT',
    scope: RuleScope.CROSS_SYSTEM,
    category: 'synthesis',
    themes: ['nội tâm sâu sắc', 'trực giác siêu việt', 'chiêm nghiệm'],
    blocks: {
      [ReadingDomain.OVERVIEW]: {
        domain: ReadingDomain.OVERVIEW,
        title: 'Tổng Hợp Đa Hệ Thống: Trực Giác Bác Học & Chiều Sâu Tâm Thức',
        template: 'Sự cộng hưởng giữa Mặt Trăng Song Ngư (Chiêm tinh phương Tây) và Con số Chủ đạo 7 (Thần số học) tạo nên một cấu trúc nội tâm vô cùng thâm trầm, sắc sảo và sở hữu trực cảm tinh vi vượt trội.',
      },
    },
  },
};

export const BASELINE_RULES: RuleDefinition[] = [
  // Astrology rules
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
    tags: ['sun', 'leo'],
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
    tags: ['sun', 'capricorn'],
  },
  {
    ruleCode: 'ASTRO-MOON-PISCES-001',
    ruleSetId: 'RULESET_ASTRO_V1',
    scope: RuleScope.ASTROLOGY,
    priority: 45,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Mặt Trăng tại Song Ngư',
    conditionAst: { field: 'astrology.planets.moon.sign', operator: ConditionOperator.EQUALS, value: 'PISCES' },
    action: { targetInterpretationId: 'INTERP_MOON_PISCES', domain: 'OVERVIEW' },
    tags: ['moon', 'pisces'],
  },

  // Numerology rules
  {
    ruleCode: 'NUM-LP-7-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 50,
    specificityScore: 10,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Đạo Tự 7',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 7 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_7', domain: 'OVERVIEW' },
    tags: ['numerology', 'lifepath_7'],
  },
  {
    ruleCode: 'NUM-LP-11-001',
    ruleSetId: 'RULESET_NUM_V1',
    scope: RuleScope.NUMEROLOGY,
    priority: 60,
    specificityScore: 15,
    status: RuleStatus.PUBLISHED,
    version: '1.0.0',
    description: 'Số Đạo Tự Master 11',
    conditionAst: { field: 'numerology.core.life_path.value', operator: ConditionOperator.EQUALS, value: 11 },
    action: { targetInterpretationId: 'INTERP_LIFEPATH_11', domain: 'OVERVIEW' },
    tags: ['numerology', 'master_11'],
  },

  // Tử Vi rules
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

  // Tarot rules
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

  // Cross-system rule
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
    tags: ['cross_system', 'synthesis'],
  },
];
