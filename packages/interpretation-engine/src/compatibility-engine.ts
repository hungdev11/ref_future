import { ZODIAC_ELEMENT, ZODIAC_VN } from '@mystic/astrology-engine';
import { PythagoreanNumerologyEngine, PYTHAGOREAN_CONFIG_V1 } from '@mystic/numerology-engine';
import { TuViEngine, TUVI_METHOD_V1_CONFIG, NAP_AM_TABLE } from '@mystic/tuvi-engine';

export interface PersonInput {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:mm
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export type PrecisionLevel = 'BASIC' | 'NUMEROLOGY' | 'SUN_CHART' | 'FULL_NATAL';

export interface CompatibilityDimension {
  code: string;
  nameVn: string;
  status: 'SUPPORTING' | 'BALANCED' | 'TENSION';
  summary: string;
  mechanism: string;
  advice: string;
}

export interface MultiSystemCompatibilityReport {
  precisionLevel: PrecisionLevel;
  relationshipType: string;
  personA: {
    name: string;
    birthDate: string;
    sunSign: string;
    sunElement: string;
    lifePath: number;
    canChiYear: string;
    menhNguHanh: string;
  };
  personB: {
    name: string;
    birthDate: string;
    sunSign: string;
    sunElement: string;
    lifePath: number;
    canChiYear: string;
    menhNguHanh: string;
  };
  pairwiseFeatures: {
    astroElementPair: string;
    astroHarmonyLevel: string;
    numerologyMatch: string;
    tuviNguHanhMatch: string;
    batTrachMatch: string;
  };
  dimensions: CompatibilityDimension[];
  synthesis: {
    coreDynamic: string;
    primaryStrength: string;
    frictionZone: string;
    conflictResolutionMechanism: string;
  };
  guidance: {
    dos: string[];
    donts: string[];
    communicationBlueprint: string;
  };
}

// Helpers for Western Sun Sign calculation by date
function getSunSignFromDate(dateStr: string): string {
  const parts = dateStr.split('-');
  const month = parseInt(parts[1] || '1', 10);
  const day = parseInt(parts[2] || '1', 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'ARIES';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'TAURUS';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'GEMINI';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'CANCER';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'LEO';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'VIRGO';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'LIBRA';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'SCORPIO';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'SAGITTARIUS';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'CAPRICORN';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'AQUARIUS';
  return 'PISCES';
}

// Element pairings
function getElementPairAnalysis(elemA: string, elemB: string) {
  const pair = [elemA, elemB].sort().join('_');
  switch (pair) {
    case 'FIRE_FIRE':
      return {
        level: 'Nhiệt Huyết & Bùng Nổ Đam Mê',
        status: 'BALANCED' as const,
        synergy: 'Hai ngọn lửa hội tụ tạo nên nguồn năng lượng dồi dào, sự hào hứng và nhiệt huyết phi thường.',
        mechanism: 'Nguyên tố Lửa - Lửa: Cùng chung nhịp độ hành động nhanh, trung thực trực diện, nhưng dễ va chạm cái tôi lớn.',
        advice: 'Thay phiên nhau làm người lắng nghe; khi một bên nổi nóng, bên kia chủ động tạo khoảng lặng ngắn.',
      };
    case 'AIR_FIRE':
      return {
        level: 'Tương Sinh Tự Nhiên & Truyền Cảm Hứng (Khí - Hỏa)',
        status: 'SUPPORTING' as const,
        synergy: 'Gió thổi bùng ngọn lửa; sự thông tuệ của Khí kích thích trí tưởng tượng và ngọn lửa đam mê của Hỏa.',
        mechanism: 'Nguyên tố Khí - Hỏa: Dương tính tương trợ, mở rộng ý tưởng và hiện thực hóa mục tiêu sáng tạo.',
        advice: 'Thiết lập các mốc thời gian thực hiện cụ thể để biến ý tưởng dồi dào thành cam kết lâu dài.',
      };
    case 'EARTH_FIRE':
      return {
        level: 'Tương Trợ Thực Tiễn & Kiến Tạo (Thổ - Hỏa)',
        status: 'BALANCED' as const,
        synergy: 'Thổ tạo bệ đỡ vững vàng, giữ ấm cho Hỏa; Hỏa mang lại sự sôi động, thúc đẩy Thổ tiến bước.',
        mechanism: 'Nguyên tố Thổ - Hỏa: Bù trừ giữa năng lượng kiến tạo bền bỉ và động lực bứt phá.',
        advice: 'Trân trọng sự thận trọng của Thổ như chiếc phanh an toàn và sự dấn thân của Hỏa như động cơ phát triển.',
      };
    case 'FIRE_WATER':
      return {
        level: 'Hấp Dẫn Mãnh Liệt & Chuyển Hóa Cảm Xúc (Hỏa - Thủy)',
        status: 'TENSION' as const,
        synergy: 'Nước làm dịu đi cái nóng của Lửa; Lửa hâm nóng dòng nước lạnh; sức hút xuất phát từ hai thái cực đối lập.',
        mechanism: 'Nguyên tố Hỏa - Thủy: Cảm xúc sâu sắc nhưng khác biệt căn bản về cách biểu đạt nội tâm.',
        advice: 'Người Hỏa học cách nói năng dịu dàng, tinh tế hơn; người Thủy chia sẻ thẳng thắn thay vì giận hờn ngấm ngầm.',
      };
    case 'EARTH_EARTH':
      return {
        level: 'Bền Vững Bất Biến & An Toàn Tuyệt Đối (Thổ - Thổ)',
        status: 'SUPPORTING' as const,
        synergy: 'Cùng chung nhịp đập thực tiễn, coi trọng gia đình, sự nghiệp và sự tích lũy tài chính lâu bền.',
        mechanism: 'Nguyên tố Thổ - Thổ: Mức độ cam kết và kỷ luật tài chính cao nhất trong các cặp.',
        advice: 'Chủ động lên kế hoạch du lịch hoặc trải nghiệm mới lạ để đời sống không rơi vào lối mòn tẻ nhạt.',
      };
    case 'EARTH_WATER':
      return {
        level: 'Tương Sinh Nuôi Dưỡng Kinh Điển (Thổ - Thủy)',
        status: 'SUPPORTING' as const,
        synergy: 'Nước tưới mát cho Đất đơm hoa kết trái; Đất tạo bờ bao vững chãi cho Nước khỏi tràn bờ.',
        mechanism: 'Nguyên tố Thổ - Thủy: Âm tính tương sinh, đem lại cảm giác bình an, che chở và gắn bó tự nhiên.',
        advice: 'Động viên nhau bước ra khỏi vùng an toàn để cùng nắm bắt các cơ hội thăng tiến mới.',
      };
    case 'AIR_EARTH':
      return {
        level: 'Hợp Tác Trí Tuệ & Hiện Thực Hóa (Khí - Thổ)',
        status: 'BALANCED' as const,
        synergy: 'Tư duy chiến lược, phân tích logic của Khí kết hợp với năng lực quản trị, tổ chức bài bản của Thổ.',
        mechanism: 'Nguyên tố Khí - Thổ: Liên minh thực tế và duy lý cao độ, phân công trách nhiệm rõ ràng.',
        advice: 'Dành thêm những cử chỉ âu yếm, lắng nghe bằng trái tim thay vì chỉ phân tích lý lẽ đúng sai.',
      };
    case 'AIR_AIR':
      return {
        level: 'Đồng Điệu Tư Duy & Tự Do Hòa Nhã (Khí - Khí)',
        status: 'SUPPORTING' as const,
        synergy: 'Hai tâm hồn thông thái gặp nhau; đề tài trao đổi bất tận, tôn trọng tuyệt đối sự tự do của nhau.',
        mechanism: 'Nguyên tố Khí - Khí: Cộng hưởng trí tuệ cao, giao tiếp cởi mở và linh hoạt.',
        advice: 'Cùng nhau neo đậu vào thực tế: biến các cuộc đối thoại thú vị thành kế hoạch tài chính cụ thể.',
      };
    case 'AIR_WATER':
      return {
        level: 'Giao Thoa Trí Tuệ & Chiều Sâu Nội Tâm (Khí - Thủy)',
        status: 'BALANCED' as const,
        synergy: 'Khí đem lại sự sáng suốt khách quan, Thủy mang lại sự rung cảm thi ca và lòng trắc ẩn bao la.',
        mechanism: 'Nguyên tố Khí - Thủy: Sự giao thoa giữa tư duy lý tính và linh cảm trực giác.',
        advice: 'Người Khí lắng nghe cảm xúc không phán xét; người Thủy giải thích nhu cầu bản thân một cách rõ ràng.',
      };
    case 'WATER_WATER':
      return {
        level: 'Hòa Hợp Tâm Giao & Thấu Cảm Không Lời (Thủy - Thủy)',
        status: 'SUPPORTING' as const,
        synergy: 'Chỉ cần một ánh mắt là hiểu đối phương đang nghĩ gì; sự hòa hợp cảm xúc và trực giác sâu sắc.',
        mechanism: 'Nguyên tố Thủy - Thủy: Biển cảm xúc bao la, giàu lòng vị tha và tình cảm bền chặt.',
        advice: 'Xây dựng điểm tựa lý trí vững vàng để không bị cuốn vào những cơn sóng tâm trạng tiêu cực chung.',
      };
    default:
      return {
        level: 'Hòa Hợp Căn Bản',
        status: 'BALANCED' as const,
        synergy: 'Sự kết hợp giữa hai nguyên tố bổ trợ cho nhau qua nỗ lực thấu hiểu.',
        mechanism: 'Tương tác đa diện cần sự điều chỉnh linh hoạt giữa đôi bên.',
        advice: 'Duy trì đối thoại thường xuyên và tôn trọng sự khác biệt của đối phương.',
      };
  }
}

// Numerology Life Path compatibility
function getNumerologyMatch(lpA: number, lpB: number) {
  const naturalMatches: Record<number, number[]> = {
    1: [1, 5, 7],
    2: [2, 4, 8],
    3: [3, 6, 9],
    4: [2, 4, 8],
    5: [1, 5, 7],
    6: [3, 6, 9],
    7: [1, 5, 7],
    8: [2, 4, 8],
    9: [3, 6, 9],
    11: [2, 6, 11],
    22: [4, 8, 22],
  };

  const isNatural = naturalMatches[lpA]?.includes(lpB) || naturalMatches[lpB]?.includes(lpA);
  if (isNatural) {
    return {
      status: 'SUPPORTING' as const,
      desc: `Số Chủ Đạo ${lpA} và ${lpB} thuộc nhóm tự nhiên hòa hợp (Natural Resonance). Cùng chung tần số tư duy và hướng tiếp cận cuộc sống.`,
    };
  }
  if (Math.abs(lpA - lpB) === 1 || (lpA === 1 && lpB === 8) || (lpA === 4 && lpB === 7)) {
    return {
      status: 'BALANCED' as const,
      desc: `Số Chủ Đạo ${lpA} và ${lpB} mang tính chất bổ khuyết, tương hỗ mạnh mẽ. Đòi hỏi sự tôn trọng ranh giới để phát huy tối đa thế mạnh của nhau.`,
    };
  }
  return {
    status: 'TENSION' as const,
    desc: `Số Chủ Đạo ${lpA} và ${lpB} đối lập về phong cách hành động. Đây là mối quan hệ giúp cả hai học hỏi bài học kiên nhẫn và chuyển hóa bản ngã.`,
  };
}

export class MultiSystemCompatibilityEngine {
  public static async analyze(
    personAInput: PersonInput,
    personBInput: PersonInput,
    relationshipType: string = 'LOVE'
  ): Promise<MultiSystemCompatibilityReport> {
    // 1. Detect precision level
    let precisionLevel: PrecisionLevel = 'BASIC';
    if (personAInput.birthTime && personBInput.birthTime) {
      precisionLevel = 'FULL_NATAL';
    } else if (personAInput.name && personBInput.name) {
      precisionLevel = 'NUMEROLOGY';
    } else {
      precisionLevel = 'SUN_CHART';
    }

    // 2. Engine calculations
    const numerologyEngine = new PythagoreanNumerologyEngine();
    const numA = await numerologyEngine.calculate(
      { fullName: personAInput.name || 'Người A', birthDate: personAInput.birthDate },
      PYTHAGOREAN_CONFIG_V1
    );
    const numB = await numerologyEngine.calculate(
      { fullName: personBInput.name || 'Người B', birthDate: personBInput.birthDate },
      PYTHAGOREAN_CONFIG_V1
    );

    const tuviEngine = new TuViEngine();
    const tuviA = await tuviEngine.calculate(
      {
        gender: personAInput.gender === 'FEMALE' ? 'FEMALE' : 'MALE',
        solarDate: personAInput.birthDate,
        birthTime: personAInput.birthTime || '12:00',
        timezoneOffsetMinutes: 420,
      },
      TUVI_METHOD_V1_CONFIG
    );
    const tuviB = await tuviEngine.calculate(
      {
        gender: personBInput.gender === 'MALE' ? 'MALE' : 'FEMALE',
        solarDate: personBInput.birthDate,
        birthTime: personBInput.birthTime || '12:00',
        timezoneOffsetMinutes: 420,
      },
      TUVI_METHOD_V1_CONFIG
    );

    // 3. Extract core features
    const sunSignA = getSunSignFromDate(personAInput.birthDate);
    const sunSignB = getSunSignFromDate(personBInput.birthDate);
    const elemA = ZODIAC_ELEMENT[sunSignA] || 'FIRE';
    const elemB = ZODIAC_ELEMENT[sunSignB] || 'WATER';

    const lpA = numA.facts.core.LIFE_PATH.value;
    const lpB = numB.facts.core.LIFE_PATH.value;

    const napAmA = (NAP_AM_TABLE as Record<string, any>)[`${tuviA.facts.yearStem}_${tuviA.facts.yearBranch}`] || {
      menh: 'Lộ Bàng Thổ',
      elementVn: 'Thổ',
    };
    const napAmB = (NAP_AM_TABLE as Record<string, any>)[`${tuviB.facts.yearStem}_${tuviB.facts.yearBranch}`] || {
      menh: 'Giản Hạ Thủy',
      elementVn: 'Thủy',
    };

    const elementAnalysis = getElementPairAnalysis(elemA, elemB);
    const numAnalysis = getNumerologyMatch(lpA, lpB);

    // 4. Construct 7 Canonical Dimensions
    const dimensions: CompatibilityDimension[] = [
      {
        code: 'EMOTIONAL_CONNECTION',
        nameVn: '1. Kết Nối Cảm Xúc & Tâm Hồn',
        status: elementAnalysis.status,
        summary: `Tương tác giữa ${ZODIAC_VN[sunSignA]} (${elemA}) và ${ZODIAC_VN[sunSignB]} (${elemB}): ${elementAnalysis.synergy}`,
        mechanism: elementAnalysis.mechanism,
        advice: elementAnalysis.advice,
      },
      {
        code: 'COMMUNICATION',
        nameVn: '2. Giao Tiếp & Tư Duy Trí Tuệ',
        status: numAnalysis.status,
        summary: `Số Chủ Đạo ${lpA} và ${lpB}: ${numAnalysis.desc}`,
        mechanism: 'Theo quy luật dao động số học Pythagoras, phong cách tư duy và cách tiếp cận chân lý của hai bên có sự giao thoa rõ rệt.',
        advice: 'Thiết lập các buổi đối thoại định kỳ trên tinh thần tôn trọng sự khác biệt về góc nhìn.',
      },
      {
        code: 'ATTRACTION_PASSION',
        nameVn: '3. Sức Hút & Nhiệt Huyết Gắn Kết',
        status: elemA === elemB ? 'SUPPORTING' : 'BALANCED',
        summary: `Cường độ gắn kết tự nhiên: Sự thu hút giữa hai bản ngã ${elemA} và ${elemB}.`,
        mechanism: 'Sức hấp dẫn giữa hai cực năng lượng thúc đẩy sự chủ động bày tỏ tình cảm và chia sẻ đam mê.',
        advice: 'Thường xuyên làm mới các trải nghiệm chung và dành cho nhau những cử chỉ quan tâm chân thành.',
      },
      {
        code: 'VALUES_PURPOSE',
        nameVn: '4. Hệ Giá Trị & Định Hướng Cuộc Đời',
        status: 'SUPPORTING',
        summary: 'Cả hai đều chia sẻ mục tiêu xây dựng một nền tảng vững chắc và cuộc sống có ý nghĩa.',
        mechanism: 'Sự đồng quy trong hoài bão dài hạn giúp vượt qua những khác biệt về cá tính vụn vặt thường nhật.',
        advice: 'Thống nhất các mục tiêu ưu tiên trong 3-5 năm tới để cùng đồng lòng tiến bước.',
      },
      {
        code: 'PRACTICAL_FINANCE',
        nameVn: '5. Thực Tiễn & Quản Trị Tài Chính',
        status: elemA === 'EARTH' || elemB === 'EARTH' ? 'SUPPORTING' : 'BALANCED',
        summary: 'Kế hoạch tài chính và sự ổn định tổ ấm được coi trọng cao.',
        mechanism: 'Yếu tố thực tiễn chi phối khả năng tích lũy tài sản và phân bổ ngân sách gia đình hợp lý.',
        advice: 'Minh bạch về thu chi và thiết lập quỹ dự phòng khẩn cấp chung cho tương lai.',
      },
      {
        code: 'FRICTION_MANAGEMENT',
        nameVn: '6. Xung Đột & Điểm Cọ Xát Bản Ngã',
        status: elementAnalysis.status === 'TENSION' ? 'TENSION' : 'BALANCED',
        summary: 'Các tình huống bất đồng thường bắt nguồn từ sự khác biệt trong tốc độ phản ứng và cái tôi cá nhân.',
        mechanism: 'Cơ chế kích hoạt cảm xúc tự động khi một bên cảm thấy không được lắng nghe hoặc bị áp đặt.',
        advice: 'Quy tắc 24 giờ: Tạm hoãn tranh luận khi cảm xúc đang lên cao; chỉ đối thoại khi cả hai đã lấy lại bình tĩnh.',
      },
      {
        code: 'LONG_TERM_GROWTH',
        nameVn: '7. Tiềm Năng Phát Triển Dài Hạn',
        status: 'SUPPORTING',
        summary: 'Mối quan hệ mang lại bài học trưởng thành sâu sắc cho cả hai cá nhân.',
        mechanism: 'Quy luật bù trừ tương sinh giúp mỗi người hoàn thiện những phần tính cách còn thiếu hụt.',
        advice: 'Xem mối quan hệ như một trường học rèn luyện lòng bao dung và sự trưởng thành nội tâm.',
      },
    ];

    // 5. Synthesis & Guidance
    const synthesis = {
      coreDynamic: `${elementAnalysis.level} kết hợp tương tác Số học ${lpA}-${lpB}. Mối quan hệ dựa trên sự bù đắp tự nhiên và tiềm năng gắn bó sâu sắc.`,
      primaryStrength: `Khả năng truyền cảm hứng và sự chân thành: ${elementAnalysis.synergy}`,
      frictionZone: `Sự khác biệt trong việc quản lý cái tôi và nhịp điệu cảm xúc: ${elementAnalysis.advice}`,
      conflictResolutionMechanism: 'Giải quyết xung đột bằng sự minh bạch và nguyên tắc tôn trọng ranh giới cá nhân.',
    };

    const guidance = {
      dos: [
        'Lắng nghe đối phương chia sẻ trọn vẹn trước khi đưa ra nhận định cá nhân.',
        'Trân trọng và ghi nhận những đóng góp thầm lặng của người kia.',
        'Duy trì không gian riêng tư để mỗi người tự tái tạo năng lượng.',
      ],
      donts: [
        'Tránh dùng những từ ngữ tuyệt đối hóa như "luôn luôn" hoặc "không bao giờ" khi tranh luận.',
        'Không so sánh mối quan hệ của mình với người khác.',
        'Tránh giữ ấm ức trong lòng quá lâu mà không giãi bày thẳng thắn.',
      ],
      communicationBlueprint: `Khi bất đồng quan điểm, hãy bắt đầu bằng: "Anh/Em hiểu góc nhìn của đối phương, nhưng cảm xúc của Anh/Em đang là..." để tạo không gian đối thoại an toàn và xây dựng.`,
    };

    return {
      precisionLevel,
      relationshipType,
      personA: {
        name: personAInput.name || 'Người A',
        birthDate: personAInput.birthDate,
        sunSign: ZODIAC_VN[sunSignA] || sunSignA,
        sunElement: elemA,
        lifePath: lpA,
        canChiYear: `${tuviA.facts.yearStem} ${tuviA.facts.yearBranch}`,
        menhNguHanh: napAmA.menh,
      },
      personB: {
        name: personBInput.name || 'Người B',
        birthDate: personBInput.birthDate,
        sunSign: ZODIAC_VN[sunSignB] || sunSignB,
        sunElement: elemB,
        lifePath: lpB,
        canChiYear: `${tuviB.facts.yearStem} ${tuviB.facts.yearBranch}`,
        menhNguHanh: napAmB.menh,
      },
      pairwiseFeatures: {
        astroElementPair: `${elemA} × ${elemB}`,
        astroHarmonyLevel: elementAnalysis.level,
        numerologyMatch: numAnalysis.desc,
        tuviNguHanhMatch: `${napAmA.menh} (${napAmA.elementVn}) & ${napAmB.menh} (${napAmB.elementVn})`,
        batTrachMatch: 'Tương hợp cung mạng Nam - Nữ theo nguyên lý Lạc Thư Bát Trạch',
      },
      dimensions,
      synthesis,
      guidance,
    };
  }
}
