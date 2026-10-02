'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  BookOpen,
  Sun,
  Moon,
  X,
  HelpCircle,
  Flame,
  Globe,
  Wind,
  Droplets,
  Layers,
  ArrowRight,
} from 'lucide-react';

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

const ZODIAC_ELEMENT: Record<string, 'FIRE' | 'EARTH' | 'AIR' | 'WATER'> = {
  ARIES: 'FIRE',
  TAURUS: 'EARTH',
  GEMINI: 'AIR',
  CANCER: 'WATER',
  LEO: 'FIRE',
  VIRGO: 'EARTH',
  LIBRA: 'AIR',
  SCORPIO: 'WATER',
  SAGITTARIUS: 'FIRE',
  CAPRICORN: 'EARTH',
  AQUARIUS: 'AIR',
  PISCES: 'WATER',
};

const PLANET_NAMES_VN: Record<string, string> = {
  sun: 'Mặt Trời (Sun)',
  moon: 'Mặt Trăng (Moon)',
  mercury: 'Thủy Tinh (Mercury)',
  venus: 'Kim Tinh (Venus)',
  mars: 'Hỏa Tinh (Mars)',
  jupiter: 'Mộc Tinh (Jupiter)',
  saturn: 'Thổ Tinh (Saturn)',
  uranus: 'Thiên Vương Tinh (Uranus)',
  neptune: 'Hải Vương Tinh (Neptune)',
  pluto: 'Diêm Vương Tinh (Pluto)',
  chiron: 'Chiron (Tiểu Hành Tinh)',
  northNode: 'La Hầu (North Node)',
  southNode: 'Kế Đô (South Node)',
};

const PLANET_BEGINNER_GUIDES: Record<string, string> = {
  sun: 'Mặt Trời là linh hồn của bản đồ sao, đại diện cho bản ngã cốt lõi, cá tính chủ đạo và cách bạn thể hiện ý chí sống ra thế giới.',
  moon: 'Mặt Trăng đại diện cho thế giới cảm xúc nội tâm sâu kín, cách bạn phản ứng khi ở một mình hoặc khi bị tổn thương, và điều gì mang lại cảm giác an toàn thực sự.',
  ascendant:
    'Cung Mọc (Ascendant / Rising Sign) là chiếc mặt nạ bạn đeo khi tiếp xúc với thế giới bên ngoài. Nó quyết định thần thái, ngoại hình và ấn tượng đầu tiên bạn để lại cho người khác.',
  mercury:
    'Thủy Tinh chi phối trí tuệ, cách bạn suy nghĩ, tiếp thu thông tin, diễn đạt ngôn từ và xử lý các vấn đề logic hàng ngày.',
  venus:
    'Kim Tinh cai quản tình yêu, gu thẩm mỹ, cách bạn thể hiện sự gắn bó lãng mạn và quan niệm về tiền bạc, sự hòa hợp.',
  mars: 'Hỏa Tinh là động lực hành động, năng lượng tranh đấu, sự quyết đoán, đam mê và cách bạn bảo vệ ranh giới cá nhân.',
  jupiter:
    'Mộc Tinh là hành tinh của vận may, sự mở rộng cơ hội, niềm tin lạc quan và sự phát triển tri thức, triết lý sống.',
  saturn:
    'Thổ Tinh đại diện cho bài học trách nhiệm, kỷ luật thép, sự kiên nhẫn vượt qua thử thách để xây dựng sự nghiệp bền vững.',
  uranus:
    'Thiên Vương Tinh biểu thị tư duy đột phá, trực giác nhạy bén, tinh thần độc lập và khả năng tạo ra những bước ngoặt bất ngờ.',
  neptune:
    'Hải Vương Tinh chi phối trí tưởng tượng, năng khiếu nghệ thuật, tâm linh và lòng trắc ẩn bao la.',
  pluto:
    'Diêm Vương Tinh là sức mạnh tái sinh từ nghịch cảnh, khả năng tự lột xác và chiều sâu tâm lý thâm trầm.',
};

const SUN_SIGN_INTERPRETATIONS: Record<
  string,
  {
    meaning: string;
    layman: string;
    mechanism: string;
    advice: string;
  }
> = {
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

const MOON_SIGN_INTERPRETATIONS: Record<
  string,
  {
    meaning: string;
    layman: string;
    advice: string;
  }
> = {
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
    meaning: 'Mặt Trăng Bọ Cạp: Cung vị đọa lạc (Fall), cảm xúc mãnh liệt, sâu sắc, khao khát kết nối tâm hồn chân thực tuyệt đối.',
    layman: 'Bạn cảm nhận mọi thứ rất sâu sắc, có giác quan nhìn thấu người khác và chỉ mở lòng với người bạn hoàn toàn tin tưởng.',
    advice: 'Học cách bao dung và buông xả những tổn thương cũ; giải phóng cảm xúc thay vì dồn nén trong lòng.',
  },
  SAGITTARIUS: {
    meaning: 'Mặt Trăng Nhân Mã: Nhu cầu tự do cảm xúc, lạc quan, hướng đến triết lý sống tích cực và sự giải phóng tinh thần.',
    layman: 'Mỗi khi mệt mỏi, một chuyến đi xa, một cuốn sách hay hoặc buổi trò chuyện triết lý sẽ giúp bạn lấy lại nguồn năng lượng dồi dào.',
    advice: 'Đối diện với những cảm xúc khó khăn thay vì tìm cách trốn chạy vào những trải nghiệm mới.',
  },
  CAPRICORN: {
    meaning: 'Mặt Trăng Ma Kết: Cung vị lưu đày (Detriment), kiểm soát cảm xúc chặt chẽ, nhu cầu tự chủ và trách nhiệm cao.',
    layman: 'Bạn ít khi bộc lộ sự yếu đuối ra ngoài, luôn tỏ ra kiên cường gánh vác mọi việc. Bạn thể hiện tình cảm bằng trách nhiệm thực tế.',
    advice: 'Cho phép mình được nghỉ ngơi và chia sẻ gánh nặng với người thân; việc bộc lộ cảm xúc không phải là sự yếu đuối.',
  },
  AQUARIUS: {
    meaning: 'Mặt Trăng Bảo Bình: Cảm xúc khách quan, độc lập, cần không gian tự do riêng và khao khát bình đẳng trong mối quan hệ.',
    layman: 'Bạn không thích sự sướt mướt hay bị kiểm soát. Bạn coi trọng tình bạn, sự tôn trọng lẫn nhau và không gian phát triển riêng.',
    advice: 'Học cách kết nối ấm áp bằng trái tim thay vì chỉ đứng ở góc độ người quan sát lý trí.',
  },
  PISCES: {
    meaning: 'Mặt Trăng Song Ngư: Trực giác tâm linh thấu suốt, lòng trắc ẩn bao la và sự hòa tan không biên giới với vạn vật.',
    layman: 'Bạn rất dễ xúc động, giàu lòng nhân ái, hiểu được nỗi đau của người khác và có năng khiếu nghệ thuật, cảm thụ tinh tế.',
    advice: 'Bảo vệ nguồn năng lượng của bản thân; thiết lập ranh giới rõ ràng để không bị năng lượng tiêu cực xung quanh làm xáo trộn.',
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

  // Modal State for clicked Astrology Item
  const [selectedAstroItem, setSelectedAstroItem] = useState<{
    category: string;
    title: string;
    sign: string;
    degree?: number;
    house?: number;
    beginnerGuide: string;
    layman: string;
    mechanism?: string;
    advice: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedAstroItem(null);

    try {
      const payload: any = {
        birthDate,
        timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
        timezoneOffsetMinutes: Number(timezoneOffset),
      };

      if (!isTimeUnknown) {
        payload.birthTime = birthTime;
        payload.latitude = Number(latitude);
        payload.longitude = Number(longitude);
        payload.houseSystem = houseSystem;
      }

      const res = await fetch('/api/astrology/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Lỗi tính toán thiên văn');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sunSignKey = result?.facts?.bodies?.sun?.sign ?? result?.facts?.bodies?.SUN?.sign ?? '';
  const moonSignKey = result?.facts?.bodies?.moon?.sign ?? result?.facts?.bodies?.MOON?.sign ?? '';
  const ascendantSignKey = result?.facts?.ascendant?.sign ?? '';

  const sunInterp = SUN_SIGN_INTERPRETATIONS[sunSignKey] ?? {
    meaning: 'Năng lượng bản ngã theo vị trí Mặt Trời.',
    layman: 'Cá tính tự nhiên của bạn đang tỏa sáng theo phong cách riêng.',
    mechanism: 'Hệ thống Hoàng Đạo Nhiệt Đới (Tropical Zodiac).',
    advice: 'Phát huy thế mạnh bản thân và kiên định với lý tưởng.',
  };

  const moonInterp = MOON_SIGN_INTERPRETATIONS[moonSignKey] ?? {
    meaning: 'Thế giới cảm xúc nội tâm theo vị trí Mặt Trăng.',
    layman: 'Nội tâm của bạn phản ứng tự nhiên với các biến động cảm xúc.',
    advice: 'Lắng nghe cảm xúc của chính mình và duy trì lối sống lành mạnh.',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accentGold font-semibold text-sm">
          <Compass className="w-4 h-4" />
          <span>Western Tropical Astrology Engine (VSOP87 / ELP2000-82B)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Lập Bản Đồ Sao Chiêm Tinh Học Tất Định</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Tính toán tọa độ thực thiên văn VSOP87. 
          <strong> Nhấn vào Mặt Trời, Mặt Trăng, Cung Mọc hay bất kỳ hành tinh nào để mở popup luận giải chi tiết, dễ hiểu nhất cho bạn.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Quick instructions for beginners */}
          <div className="p-4 rounded-xl bg-background/60 border border-borderDark text-xs text-gray-400 space-y-2">
            <div className="font-semibold text-gray-200 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-accentGold" />
              Hướng Dẫn Đọc Bản Đồ Sao
            </div>
            <p className="leading-relaxed text-[11px]">
              Bộ ba cốt lõi <strong>Mặt Trời, Mặt Trăng, Cung Mọc</strong> quyết định 70% bức tranh tính cách của bạn. 
              <strong> Nhấn vào từng thẻ</strong> để mở cửa sổ luận giải chi tiết và lời khuyên cân bằng năng lượng.
            </p>
          </div>
        </div>

        {/* Right Column: Chart Results */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-16 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-3">
              <Compass className="w-14 h-14 text-gray-600 mx-auto" />
              <h3 className="text-gray-300 font-bold">Bản Đồ Sao Đang Chờ Bạn</h3>
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
                    Hệ thống tính toán thiên văn VSOP87 / ELP2000 (Tất Định 100%)
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-accentGold/10 text-accentGold border border-accentGold/30 text-[10px]">
                    👉 Nhấn vào hành tinh để xem luận giải Popup
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAudit(!showAudit)}
                  className="text-gray-400 hover:text-accentGold text-[11px] transition-colors underline"
                >
                  {showAudit ? 'Ẩn thông số' : 'Thông số kỹ thuật'}
                </button>
              </div>

              {showAudit && (
                <div className="p-3.5 rounded-xl bg-background/90 border border-borderDark/80 text-[11px] font-mono text-gray-400 space-y-1">
                  <div>Engine: WesternAstrology v{result.engineVersion} • House: {result.metadata?.houseSystem}</div>
                  <div>Input Hash (SHA-256): <span className="text-accentGold">{result.inputHash}</span></div>
                </div>
              )}

              {/* THE BIG THREE SUMMARY CARDS (Clickable to open Popup) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Sun Sign */}
                <div
                  onClick={() =>
                    setSelectedAstroItem({
                      category: 'CUNG MẶT TRỜI (SUN SIGN)',
                      title: `Mặt Trời Tại ${ZODIAC_VN[sunSignKey] ?? sunSignKey}`,
                      sign: ZODIAC_VN[sunSignKey] ?? sunSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.sun,
                      layman: sunInterp.layman,
                      mechanism: sunInterp.mechanism,
                      advice: sunInterp.advice,
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-amber-500/60 space-y-2 cursor-pointer hover:scale-[1.02] hover:border-amber-400 transition-all shadow-lg shadow-amber-500/5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" />
                      Mặt Trời (Sun Sign)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Bản Ngã</span>
                  </div>
                  <div className="text-xl font-extrabold text-white group-hover:text-accentGold transition-colors">
                    {ZODIAC_VN[sunSignKey] ?? sunSignKey}
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-1">{sunInterp.layman}</p>
                  <span className="text-[10px] text-accentGold block pt-1">🔍 Nhấn xem giải mã chi tiết →</span>
                </div>

                {/* 2. Moon Sign */}
                <div
                  onClick={() =>
                    setSelectedAstroItem({
                      category: 'CUNG MẶT TRĂNG (MOON SIGN)',
                      title: `Mặt Trăng Tại ${ZODIAC_VN[moonSignKey] ?? moonSignKey}`,
                      sign: ZODIAC_VN[moonSignKey] ?? moonSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.moon,
                      layman: moonInterp.layman,
                      advice: moonInterp.advice,
                    })
                  }
                  className="p-5 rounded-2xl bg-surface border border-indigo-500/60 space-y-2 cursor-pointer hover:scale-[1.02] hover:border-indigo-400 transition-all shadow-lg shadow-indigo-500/5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                      <Moon className="w-3.5 h-3.5" />
                      Mặt Trăng (Moon Sign)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Cảm Xúc</span>
                  </div>
                  <div className="text-xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                    {ZODIAC_VN[moonSignKey] ?? moonSignKey}
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-1">{moonInterp.layman}</p>
                  <span className="text-[10px] text-indigo-400 block pt-1">🔍 Nhấn xem giải mã chi tiết →</span>
                </div>

                {/* 3. Ascendant */}
                <div
                  onClick={() => {
                    if (result.isDegraded || !ascendantSignKey) return;
                    setSelectedAstroItem({
                      category: 'CUNG MỌC (ASCENDANT / RISING)',
                      title: `Cung Mọc Tại ${ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey}`,
                      sign: ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.ascendant,
                      layman: `Cung Mọc ${ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey} định hình phong thái, ngoại hình và cách tiếp cận thế giới bên ngoài của bạn. Người khác thường ấn tượng với sự độc lập, tự tin và cách ứng xử đặc trưng của cung này khi mới tiếp xúc.`,
                      advice: 'Hãy sống đúng với thần thái tự nhiên của mình, đồng thời kết nối sâu với thế giới cảm xúc nội tâm bên trong.',
                    });
                  }}
                  className={`p-5 rounded-2xl bg-surface border space-y-2 transition-all ${
                    result.isDegraded
                      ? 'border-borderDark opacity-60'
                      : 'border-emerald-500/60 cursor-pointer hover:scale-[1.02] hover:border-emerald-400 shadow-lg shadow-emerald-500/5 group'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5" />
                      Cung Mọc (Ascendant)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Phong Thái</span>
                  </div>
                  <div className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                    {result.isDegraded ? 'Chưa rõ (Cần giờ sinh)' : ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey}
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {result.isDegraded ? 'Cần giờ sinh để xác định' : 'Ấn tượng ban đầu & ngoại hình'}
                  </p>
                  {!result.isDegraded && (
                    <span className="text-[10px] text-emerald-400 block pt-1">🔍 Nhấn xem giải mã chi tiết →</span>
                  )}
                </div>
              </div>

              {/* Planetary Positions Table (Each row is interactive) */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <div className="flex items-center justify-between border-b border-borderDark pb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>Bảng Tọa Độ Các Hành Tinh</span>
                    <span className="text-[11px] font-normal text-gray-400">
                      ({Object.keys(result.facts.bodies).length} thiên thể)
                    </span>
                  </h3>
                  <span className="text-[11px] text-accentGold">Nhấp vào dòng để xem chi tiết</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Thiên Thể</th>
                        <th className="py-2.5 px-3">Cung Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Độ Cung</th>
                        <th className="py-2.5 px-3">Nhà</th>
                        <th className="py-2.5 px-3 text-right">Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {Object.entries(result.facts.bodies).map(([bodyName, pos]: [string, any]) => (
                        <tr
                          key={bodyName}
                          onClick={() => {
                            const nameVn = PLANET_NAMES_VN[bodyName.toLowerCase()] ?? bodyName;
                            const guide = PLANET_BEGINNER_GUIDES[bodyName.toLowerCase()] ?? 'Thiên thể chi phối một khía cạnh năng lượng đặc thù trong bản đồ sao.';
                            const signVn = ZODIAC_VN[pos.sign] ?? pos.sign;

                            setSelectedAstroItem({
                              category: `HÀNH TINH: ${nameVn.toUpperCase()}`,
                              title: `${nameVn} Tại ${signVn}`,
                              sign: signVn,
                              degree: pos.signDegree,
                              house: pos.houseNumber,
                              beginnerGuide: guide,
                              layman: `Vị trí ${nameVn} ngự tại ${signVn} thể hiện bạn biểu đạt khía cạnh này một cách ${
                                ZODIAC_ELEMENT[pos.sign] === 'FIRE'
                                  ? 'nhiệt huyết, chủ động và đầy đam mê.'
                                  : ZODIAC_ELEMENT[pos.sign] === 'EARTH'
                                  ? 'thực tế, kiên nhẫn và trọng sự an toàn vững bền.'
                                  : ZODIAC_ELEMENT[pos.sign] === 'AIR'
                                  ? 'thông minh, linh hoạt và giàu tư duy kết nối.'
                                  : 'sâu lắng, trực giác nhạy bén và giàu tình cảm.'
                              }`,
                              advice: 'Khai thác tối đa phẩm chất tích cực của cung hoàng đạo này trong các hoạt động thực tế thường nhật.',
                            });
                          }}
                          className="hover:bg-surfaceHover/80 cursor-pointer transition-colors group"
                        >
                          <td className="py-2.5 px-3 font-semibold text-white capitalize group-hover:text-accentGold">
                            {PLANET_NAMES_VN[bodyName.toLowerCase()] ?? bodyName}
                          </td>
                          <td className="py-2.5 px-3 text-amber-300 font-medium">
                            {ZODIAC_VN[pos.sign] ?? pos.sign}
                          </td>
                          <td className="py-2.5 px-3 text-gray-300">{pos.signDegree?.toFixed(2)}°</td>
                          <td className="py-2.5 px-3 text-gray-300">
                            {pos.houseNumber ? `Nhà ${pos.houseNumber}` : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="text-[10px] text-accentGold group-hover:underline">
                              Xem giải mã →
                            </span>
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
            </div>
          )}
        </div>
      </div>

      {/* POPUP / MODAL: COMPREHENSIVE ASTROLOGY ITEM INTERPRETATION */}
      {selectedAstroItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-accentGold/50 shadow-2xl p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-accentGold/20 border border-accentGold/40 flex items-center justify-center text-accentGold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs px-2 py-0.5 rounded bg-background border border-borderDark text-accentGold font-bold uppercase">
                    {selectedAstroItem.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                    {selectedAstroItem.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setSelectedAstroItem(null)}
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
                  <span>Giải Thích Dành Cho Người Mới Bắt Đầu:</span>
                </div>
                <p className="text-gray-200 leading-relaxed text-sm">
                  {selectedAstroItem.beginnerGuide}
                </p>
                {selectedAstroItem.degree && (
                  <div className="pt-2 text-[11px] text-gray-400 border-t border-borderDark/40">
                    Tọa độ: <strong className="text-white">{selectedAstroItem.degree.toFixed(2)}°</strong>
                    {selectedAstroItem.house ? ` • Nằm tại Nhà ${selectedAstroItem.house}` : ''}
                  </div>
                )}
              </div>

              {/* Core Layman Meaning */}
              <div className="p-5 rounded-2xl bg-surface border border-accentGold/30 space-y-2">
                <div className="font-bold text-accentGold text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Ý Nghĩa Thực Tế Cho Tính Cách & Cuộc Sống Của Bạn:</span>
                </div>
                <p className="text-gray-100 leading-relaxed text-sm">
                  {selectedAstroItem.layman}
                </p>
              </div>

              {/* Actionable Advice */}
              <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs">
                <div className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>🎯 Lời Khuyên Ứng Dụng Năng Lượng Thực Tiễn:</span>
                </div>
                <p className="text-emerald-100 leading-relaxed text-sm">
                  {selectedAstroItem.advice}
                </p>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedAstroItem(null)}
                  className="px-6 py-2.5 rounded-xl bg-accentGold text-background font-bold text-xs hover:opacity-90 transition-opacity"
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
