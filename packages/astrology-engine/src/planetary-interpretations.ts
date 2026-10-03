/**
 * MYSTICOS — Authentic Western Astrology Detailed Planetary & Aspect Library
 * Deterministic, Psychological & Relatable Readings for All Planets in 12 Signs & Major Aspects.
 */

export interface PlanetaryInsight {
  signKey: string;
  signNameVn: string;
  meaning: string;
  layman: string;
  strengths: string[];
  pitfalls: string[];
  advice: string;
}

export interface AspectInsight {
  aspectType: 'CONJUNCTION' | 'SEXTILE' | 'SQUARE' | 'TRINE' | 'OPPOSITION';
  aspectNameVn: string;
  isHarmonious: boolean;
  angle: number;
  symbol: string;
  headline: string;
  mechanism: string;
  lifeEffect: string;
  advice: string;
}

// ═════════════════════════════════════════════════════════════════════
// 1. CUNG MỌC (ASCENDANT / RISING SIGN) — 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const ASCENDANT_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Cung Mọc Bạch Dương: Phong thái tiên phong, năng động, dứt khoát và thẳng thắn. Bước đi nhanh nhẹn, gương mặt sắc sảo và luôn toát ra khí thế sẵn sàng hành động.',
    layman: 'Người khác ấn tượng với bạn ngay từ cái nhìn đầu tiên bởi sự dũng cảm, tự tin và thẳng tính. Bạn không thích sự chần chừ, luôn muốn tự mình mở đường và dẫn đầu.',
    strengths: ['Dũng cảm', 'Quyết đoán nhanh', 'Nhiệt huyết truyền cảm hứng', 'Chân thành'],
    pitfalls: ['Thiếu kiên nhẫn', 'Dễ bốc đồng', 'Đôi khi hơi hiếu thắng'],
    advice: 'Phát huy tinh thần tiên phong dũng cảm, đồng thời rèn luyện thêm sự điềm tĩnh và học cách lắng nghe trước khi phản ứng.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Cung Mọc Kim Ngưu: Phong thái điềm đạm, vững chãi, giọng nói trầm ấm và phong cách ăn mặc trang nhã. Toát lên cảm giác an tâm, tin cậy tuyệt đối.',
    layman: 'Bạn tạo ấn tượng là người vững vàng, bình thản và có gu thẩm mỹ tốt. Người khác cảm thấy rất yên tâm và thoải mái khi ở cạnh bạn.',
    strengths: ['Đáng tin cậy', 'Bình tĩnh trước biến cố', 'Gu thẩm mỹ tinh tế', 'Kiên trì'],
    pitfalls: ['Ngại thay đổi', 'Hơi cố chấp', 'Có xu hướng chậm chạp ban đầu'],
    advice: 'Giữ vững sự kiên định đáng quý, đồng thời mở lòng linh hoạt hơn trước những đổi mới khách quan của cuộc sống.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Cung Mọc Song Tử: Thần thái hoạt bát, đôi mắt lanh lợi, nụ cười tươi tắn và khả năng bắt chuyện tự nhiên. Tiếp cận thế giới bằng sự tò mò vô tận.',
    layman: 'Bạn trẻ trung hơn tuổi thật, nói chuyện duyên dáng và có khiếu hài hước. Người khác thấy bạn thông minh, nhanh nhẹn và dễ gần.',
    strengths: ['Nhanh trí', 'Giao tiếp lôi cuốn', 'Thích ứng hoàn cảnh tốt', 'Ham học hỏi'],
    pitfalls: ['Dễ phân tán tư tưởng', 'Mau chán', 'Đôi khi hời hợt'],
    advice: 'Tận dụng tài ăn nói khéo léo, đồng thời rèn luyện chiều sâu chuyên môn để tạo ra những thành tựu vững chắc dài lâu.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Cung Mọc Cự Giải: Ánh nhìn dịu dàng, kín đáo, mang lại cảm giác ấm áp như người thân trong gia đình. Cần thời gian quan sát trước khi hoàn toàn mở lòng.',
    layman: 'Ấn tượng đầu tiên về bạn là sự hiền hòa, chu đáo và biết lắng nghe. Bạn có trực giác nhạy bén, nhận biết ngay bầu không khí cảm xúc xung quanh.',
    strengths: ['Thấu cảm sâu sắc', 'Bảo bọc ân cần', 'Trực giác tinh tế', 'Chân thành'],
    pitfalls: ['Dễ bị tổn thương', 'Tâm trạng thất thường', 'Phòng thủ khép kín'],
    advice: 'Tự tin vào sự ấm áp tự nhiên của mình; thiết lập ranh giới lành mạnh để bảo vệ nguồn năng lượng cảm xúc của bản thân.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Cung Mọc Sư Tử: Phong thái kiêu hãnh, tự tin, mái tóc bồng bềnh nổi bật và nụ cười rạng rỡ. Xuất hiện ở đâu cũng tự nhiên trở thành tâm điểm chú ý.',
    layman: 'Bạn có hào quang của người dẫn đầu: phong độ đĩnh đạc, hào sảng và thích mang lại niềm vui cho đám đông. Người khác tự nhiên thấy bị cuốn hút.',
    strengths: ['Hào sảng', 'Tự tin đĩnh đạc', 'Truyền cảm hứng mạnh', 'Rộng lượng'],
    pitfalls: ['Cái tôi cao', 'Sợ bị mất mặt', 'Thích được tâng bốc'],
    advice: 'Tỏa sáng bằng sự khiêm nhường và năng lực thật; dùng sự ấm áp hào hiệp để che chở cho những người xung quanh.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Cung Mọc Xử Nữ: Tác phong chỉn chu, ngăn nắp, lịch thiệp, ánh mắt quan sát tỉ mỉ. Toát lên vẻ thông minh, sạch sẽ và có trách nhiệm cao.',
    layman: 'Người khác đánh giá bạn là người làm việc có phương pháp, đáng tin cậy và ăn nói chừng mực. Bạn luôn xuất hiện với vẻ ngoài tươm tất.',
    strengths: ['Tỉ mỉ', 'Có trách nhiệm cao', 'Tư duy thực tế sắc sảo', 'Tận tụy giúp đỡ'],
    pitfalls: ['Quá khắt khe cầu toàn', 'Dễ lo lắng vụn vặt', 'Tự phê bình nghiêm khắc'],
    advice: 'Bớt tạo áp lực hoàn hảo lên chính mình; ghi nhận những tiến bộ từng ngày và cho phép bản thân được thư giãn.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra)',
    meaning: 'Cung Mọc Thiên Bình: Ngoại hình cân đối, nụ cười duyên dáng, phong cách thời trang thanh lịch. Luôn cư xử nhã nhặn, biết cách dĩ hòa vi quý.',
    layman: 'Bạn gây thiện cảm ngay lập tức nhờ sự hòa nhã, lịch thiệp và tôn trọng đối phương. Bạn có tài năng ngoại giao và khiếu thẩm mỹ tuyệt vời.',
    strengths: ['Duyên dáng', 'Công bằng', 'Biết lắng nghe dung hòa', 'Gu thẩm mỹ cao'],
    pitfalls: ['Do dự khó quyết', 'Sợ xung đột đến mức né tránh', 'Phụ thuộc ý kiến người khác'],
    advice: 'Quyết đoán hơn trong các tình huống quan trọng; dám nói ra quan điểm thật của mình mà không sợ làm mất lòng người khác.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Cung Mọc Bọ Cạp: Ánh mắt sâu thẳm, cuốn hút đầy bí ẩn, ít nói nhưng toát ra uy lực thâm trầm. Khả năng nhìn thấu tâm can người đối diện.',
    layman: 'Bạn có sức hút từ trường mạnh mẽ khiến người khác vừa tò mò vừa có chút kiêng nể. Bạn kín tiếng, chỉ mở lòng với người thực sự tin cậy.',
    strengths: ['Trực giác thấu suốt', 'Bản lĩnh kiên cường', 'Trung thành tuyệt đối', 'Nội lực sâu sắc'],
    pitfalls: ['Đa nghi phòng thủ', 'Khó tin người', 'Ghi nhớ hận thù'],
    advice: 'Học cách bao dung và buông bỏ sự cảnh giác quá mức; sự chân thành cởi mở sẽ mang lại cho bạn những tình bạn tri kỷ đích thực.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Cung Mọc Nhân Mã: Thần thái phóng khoáng, nụ cười rộng mở, dáng vẻ yêu đời và thích vận động. Toát lên niềm lạc quan và khát khao tự do bất tận.',
    layman: 'Bạn mang lại nguồn năng lượng tươi vui, hài hước và chân thành cho mọi cuộc gặp gỡ. Bạn thích khám phá điều mới và ghét sự gò bó, khuôn phép.',
    strengths: ['Lạc quan', 'Chân thành thẳng thắn', 'Tầm nhìn rộng mở', 'Dễ mến'],
    pitfalls: ['Thiếu cẩn trọng chi tiết', 'Đôi khi nói năng quá bộc trực', 'Nhanh chán cam kết'],
    advice: 'Giữ vững niềm tin yêu đời, đồng thời rèn luyện tính kiên trì bám sát mục tiêu cụ thể để hiện thực hóa ước mơ.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn)',
    meaning: 'Cung Mọc Ma Kết: Vẻ ngoài chững chạc hơn tuổi, phong thái nghiêm túc, tác phong chuyên nghiệp. Toát lên sự từng trải, kiên định và bản lĩnh vượt khó.',
    layman: 'Người khác tôn trọng bạn vì sự nghiêm túc, lời nói có trọng lượng và thái độ làm việc bài bản. Càng trưởng thành bạn càng toát lên vẻ quyền uy đĩnh đạc.',
    strengths: ['Kỷ luật thép', 'Tầm nhìn dài hạn', 'Đáng tin cậy tuyệt đối', 'Bản lĩnh chịu áp lực'],
    pitfalls: ['Hơi nghiêm nghị khô khan', 'Dễ lo xa bi quan', 'Khó bộc lộ cảm xúc mềm mại'],
    advice: 'Cười nhiều hơn và chia sẻ áp lực với người thân; thành tựu vĩ đại nhất là khi bạn vừa thành công vừa có hạnh phúc trọn vẹn.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius)',
    meaning: 'Cung Mọc Bảo Bình: Phong cách độc đáo, khác biệt, tư duy cởi mở, không bị ràng buộc bởi định kiến. Thân thiện, hòa đồng và tôn trọng sự bình đẳng.',
    layman: 'Bạn toát lên nét cá tính riêng biệt, không đụng hàng. Người khác thấy bạn thú vị, thông minh và có những góc nhìn đột phá đi trước thời đại.',
    strengths: ['Tư duy độc lập', 'Nhân đạo cởi mở', 'Sáng tạo đột phá', 'Tôn trọng sự khác biệt'],
    pitfalls: ['Đôi khi xa cách lập dị', 'Hơi lạnh lùng lý trí', 'Cố chấp với quan điểm riêng'],
    advice: 'Kết hợp tư duy cách mạng với sự đồng cảm ấm áp giữa người với người; bày tỏ tình cảm gần gũi hơn với những người bên cạnh.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Cung Mọc Song Ngư: Đôi mắt mơ màng dịu êm, tâm hồn nghệ sĩ, phong thái nhẹ nhàng uyển chuyển. Toát lên vẻ thấu cảm và nhạy cảm tinh tế.',
    layman: 'Bạn tạo cảm giác hiền lành, dễ chịu và biết lắng nghe. Người khác dễ trút bầu tâm sự với bạn vì cảm nhận được sự thấu cảm không phán xét.',
    strengths: ['Thấu cảm bao la', 'Trực giác nghệ thuật', 'Tốt bụng vị tha', 'Mềm mại thích ứng'],
    pitfalls: ['Dễ bị người khác lợi dụng', 'Mơ mộng xa rời thực tế', 'Thiếu quyết đoán'],
    advice: 'Học cách thiết lập ranh giới rõ ràng và bảo vệ bản thân; đưa những ý tưởng nghệ thuật mộng mơ vào các sản phẩm thực tế.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 2. THỦY TINH (MERCURY) — TƯ DUY, GIAO TIẾP & LOGIC TRONG 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const MERCURY_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Thủy Tinh tại Bạch Dương: Tư duy nhanh như chớp, phát ngôn thẳng thắn, quyết đoán, ghét sự vòng vo tam quốc. Thích nảy ra ý tưởng và hành động ngay.',
    layman: 'Bạn tiếp thu vấn đề rất nhanh và nói thẳng suy nghĩ của mình. Trong công việc, bạn giỏi giải quyết sự cố cấp bách nhưng ghét các cuộc họp dài dòng vô bổ.',
    strengths: ['Nhanh trí', 'Nói năng dứt khoát', 'Tư duy độc lập', 'Quyết đoán'],
    pitfalls: ['Nóng vội phát ngôn', 'Thiếu kiên nhẫn nghe hết câu', 'Dễ tranh cãi'],
    advice: 'Đếm tới 3 trước khi phản hồi trong lúc tức giận; dành thời gian đào sâu chi tiết trước khi kết luận.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Thủy Tinh tại Kim Ngưu: Tư duy thực tế, suy nghĩ cẩn trọng trước khi nói, học chậm nhưng nhớ rất dai. Xuất sắc trong việc tính toán hiệu quả kinh tế.',
    layman: 'Bạn không thích nói suông mà luôn hỏi: "Kế hoạch này tốn bao nhiêu tiền và thu lại được gì?". Bạn cân nhắc kỹ lưỡng và chỉ phát ngôn khi đã chắc chắn.',
    strengths: ['Tư duy tài chính thực tế', 'Cẩn trọng', 'Khả năng tập trung cao', 'Điềm đạm'],
    pitfalls: ['Ngại tiếp thu cách làm mới', 'Hơi bảo thủ', 'Xử lý thông tin chậm hơn người khác'],
    advice: 'Mở rộng sự linh hoạt với công nghệ và phương pháp mới; không phải thay đổi nào cũng mang lại rủi ro.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Thủy Tinh tại Song Tử (Cung Vị Thống Lĩnh): Trí tuệ đa luồng cực nhanh, hoạt ngôn, xử lý lượng dữ liệu khổng lồ với tốc độ cao. Kết nối ý tưởng tài tình.',
    layman: 'Bạn thông minh, lanh lợi, học một biết mười và có thể làm nhiều việc cùng lúc. Bạn là bậc thầy trong việc viết lách, thuyết trình và giao tiếp kết nối.',
    strengths: ['Trí tuệ sắc bén', 'Hoạt ngôn duyên dáng', 'Đa nhiệm linh hoạt', 'Học hỏi siêu tốc'],
    pitfalls: ['Phân tán tư tưởng', 'Mau chán', 'Biết nhiều thứ nhưng ít khi đào sâu'],
    advice: 'Chọn lọc 1-2 lĩnh vực cốt lõi để đào sâu thành chuyên gia bậc thầy thay vì chỉ dừng ở mức biết rộng.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Thủy Tinh tại Cự Giải: Tư duy gắn liền với cảm xúc và trực giác, ghi nhớ bằng ký ức cảm giác. Cách nói chuyện ấm áp, lắng nghe thấu cảm và nhớ dai chuyện cũ.',
    layman: 'Bạn suy nghĩ bằng cả lý trí lẫn con tim. Bạn nhớ rõ từng kỷ niệm và cảm xúc của người khác, giao tiếp bằng sự chân thành và thấu cảm sâu sắc.',
    strengths: ['Trí nhớ cảm xúc tuyệt vời', 'Giao tiếp ấm áp', 'Trực giác nhạy bén', 'Thấu hiểu tâm lý'],
    pitfalls: ['Dễ để cảm xúc làm lệch phán đoán khách quan', 'Dễ tự ái', 'Khó phân tích logic khô khan'],
    advice: 'Tách bạch giữa sự thật khách quan và cảm xúc cá nhân khi đưa ra các quyết định công việc quan trọng.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Thủy Tinh tại Sư Tử: Tư duy tự tin, có tài hùng biện truyền cảm hứng, thích kịch tính hóa câu chuyện để thu hút sự chú ý. Tầm nhìn bao quát và ấm áp.',
    layman: 'Khi bạn nói, mọi người đều lắng nghe vì sự tự tin và lôi cuốn tự nhiên. Bạn giỏi thuyết trình trước đám đông và truyền lửa cho đội ngũ.',
    strengths: ['Hùng biện lôi cuốn', 'Tự tin thuyết trình', 'Tư duy tích cực', 'Khả năng lãnh đạo ý tưởng'],
    pitfalls: ['Cố chấp không chịu nhận sai', 'Thích áp đặt quan điểm', 'Đôi khi hơi kịch tính'],
    advice: 'Lắng nghe phản biện với tâm thế cầu thị; người có trí tuệ lớn nhất là người biết học hỏi từ cả những người bình thường.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Thủy Tinh tại Xử Nữ (Cung Vị Thống Lĩnh & Tôn Quý): Đỉnh cao của tư duy phân tích, logic chặt chẽ, phát hiện lỗi sai siêu phàm. Khả năng sắp xếp trật tự bài bản.',
    layman: 'Bạn có bộ não của một kiểm toán viên hoặc biên tập viên xuất sắc. Không chi tiết sai sót nào qua mắt được bạn. Lập kế hoạch có cấu trúc khoa học.',
    strengths: ['Phân tích sắc bén', 'Tỉ mỉ chuẩn xác', 'Tư duy logic hoàn hảo', 'Giải quyết vấn đề thực tế'],
    pitfalls: ['Quá soi mói chi tiết nhỏ mà quên bức tranh lớn', 'Hay lo lắng vụn vặt', 'Phê bình khắt khe'],
    advice: 'Nhìn bức tranh tổng thể trước khi soi xét chi tiết; dùng sự tỉ mỉ để hỗ trợ thay vì phán xét người khác.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra)',
    meaning: 'Thủy Tinh tại Thiên Bình: Tư duy ngoại giao, luôn cân nhắc đa chiều mọi khía cạnh trước khi phát ngôn. Lời nói nhã nhặn, có tài đàm phán và hòa giải bất đồng.',
    layman: 'Bạn nhìn thấy cái lý của cả hai bên trong mọi cuộc tranh cãi. Bạn ăn nói lịch thiệp, dễ thuyết phục người khác nhờ sự công tâm và văn minh.',
    strengths: ['Tư duy công bằng', 'Ngoại giao khéo léo', 'Hòa giải tranh chấp', 'Thẩm mỹ ngôn từ cao'],
    pitfalls: ['Do dự lấp lửng', 'Khó đưa ra quyết định dứt khoát', 'Sợ làm mất lòng nên nói nước đôi'],
    advice: 'Rèn luyện thói quen chốt quyết định dứt khoát; trong công việc, sự rõ ràng minh bạch quan trọng hơn sự dĩ hòa vi quý bề ngoài.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Thủy Tinh tại Bọ Cạp: Tư duy thám tử sắc bén, nhìn thấu động cơ ẩn sau từng câu nói, giữ bí mật tuyệt đối. Đam mê nghiên cứu các tầng sâu tâm lý và chân lý.',
    layman: 'Không ai có thể nói dối trước mặt bạn. Bạn nhìn ra ngay điểm mâu thuẫn và động cơ ngầm. Bạn nói ít nhưng câu nào cũng trúng tim đen.',
    strengths: ['Trực giác tâm lý thấu thị', 'Nghiên cứu chuyên sâu', 'Giữ bí mật tuyệt hảo', 'Nói năng có sức nặng'],
    pitfalls: ['Hay nghi ngờ thái quá', 'Lời nói đôi khi châm chọc cay độc', 'Ám ảnh suy nghĩ tiêu cực'],
    advice: 'Dùng trí tuệ thấu thị để thấu cảm và chữa lành; học cách tin tưởng và nhìn nhận những điều tốt đẹp xung quanh.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Thủy Tinh tại Nhân Mã: Tư duy triết học vĩ mô, nắm bắt ý tưởng lớn rất nhanh, thích tranh luận về lý tưởng và tự do. Thẳng thắn, chân thành và yêu chân lý.',
    layman: 'Bạn thích bàn về các chiến lược lớn, tương lai và triết lý sống. Bạn nói thẳng không kiêng nể, truyền năng lượng tích cực cho mọi người.',
    strengths: ['Tầm nhìn vĩ mô', 'Tư duy tự do cởi mở', 'Chân thành', 'Khả năng khái quát hóa cao'],
    pitfalls: ['Bỏ qua chi tiết quan trọng', 'Nói năng quá bộc trực gây mất lòng', 'Hứa nhiều làm ít'],
    advice: 'Kiểm tra kỹ các con số và điều khoản thực tế trước khi cam kết; uốn lưỡi trước khi nói sự thật với người nhạy cảm.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn)',
    meaning: 'Thủy Tinh tại Ma Kết: Tư duy chiến lược có cấu trúc, suy nghĩ có phương pháp, nói ít làm nhiều. Tôn trọng quy tắc, dữ liệu thực tế và tính khả thi dài hạn.',
    layman: 'Bạn nói năng chậm rãi, chắc chắn và có trọng lượng. Bạn ghét những lời hứa hão và chỉ tin vào kết quả thực tế. Tư duy quản lý doanh nghiệp rất tốt.',
    strengths: ['Tư duy chiến lược bài bản', 'Tổ chức quy củ', 'Lời nói uy tín', 'Khả năng tập trung bền bỉ'],
    pitfalls: ['Khô khan cứng nhắc', 'Hay bi quan lo xa', 'Thiếu sự linh hoạt'],
    advice: 'Thêm một chút hài hước vào các cuộc trò chuyện; mở lòng đón nhận những ý tưởng sáng tạo chưa từng có trong tiền lệ.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius)',
    meaning: 'Thủy Tinh tại Bảo Bình: Tư duy đột phá đi trước thời đại, nhiều ý tưởng phát minh độc đáo, khách quan khoa học. Thích thảo luận về công nghệ và tiến bộ xã hội.',
    layman: 'Bạn có những ý tưởng mà người khác phải mất vài năm sau mới hiểu được. Bạn nhìn vấn đề bằng con mắt khách quan, không bị chi phối bởi định kiến xưa cũ.',
    strengths: ['Sáng tạo đột phá', 'Tư duy khách quan', 'Nhìn xa trông rộng', 'Tôn trọng sự thật khoa học'],
    pitfalls: ['Đôi khi lập dị khó hiểu', 'Xa rời thực tế', 'Hơi bướng bỉnh trong tranh luận'],
    advice: 'Học cách diễn đạt ý tưởng lớn bằng ngôn ngữ đơn giản, dễ hiểu để mọi người cùng nắm bắt và đồng hành triển khai.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Thủy Tinh tại Song Ngư: Tư duy hình tượng và trực giác, tiếp thu thông tin bằng cảm thụ nghệ thuật, trí tưởng tượng phong phú. Khả năng thấu cảm ngôn từ vi tế.',
    layman: 'Bạn học qua hình ảnh, âm nhạc và cảm xúc tốt hơn là các con số khô khan. Bạn có năng khiếu viết văn, làm thơ, sáng tác nghệ thuật và thấu hiểu nỗi lòng người khác.',
    strengths: ['Trí tưởng tượng phong phú', 'Cảm thụ nghệ thuật cao', 'Thấu cảm ngôn từ', 'Trực giác chỉ đường'],
    pitfalls: ['Dễ mất tập trung mơ mộng', 'Khó diễn đạt ý nghĩ thành số liệu cụ thể', 'Dễ bị phân tâm'],
    advice: 'Ghi chép công việc ra giấy cụ thể; dùng các công cụ quản lý thời gian để biến những ý tưởng mộng mơ thành hiện thực.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 3. KIM TINH (VENUS) — TÌNH YÊU, THẨM MỸ & GIÁ TRỊ TRONG 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const VENUS_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Kim Tinh tại Bạch Dương: Tình yêu nồng nhiệt, chủ động theo đuổi, thích cảm giác chinh phục. Yêu thẳng thắn, ghét sự mập mờ, gu thời trang cá tính mạnh mẽ.',
    layman: 'Khi thích ai, bạn bày tỏ ngay chứ không giấu giếm. Bạn thích một tình yêu sôi nổi, tràn đầy năng lượng và cả hai cùng dũng cảm trải nghiệm.',
    strengths: ['Chủ động', 'Nồng nàn', 'Thẳng thắn', 'Không vụ lợi'],
    pitfalls: ['Nhanh chán khi đã chinh phục xong', 'Nóng tính', 'Đôi khi hơi ích kỷ trong tình cảm'],
    advice: 'Học cách nuôi dưỡng tình yêu dài lâu sau giai đoạn bùng nổ ban đầu; kiên nhẫn lắng nghe mong muốn của bạn đời.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Kim Tinh tại Kim Ngưu (Cung Vị Thống Lĩnh): Tình yêu bền vững, chung thủy tuyệt đối, ngôn ngữ tình cảm qua sự chăm sóc chu đáo và cử chỉ âu yếm. Gu thẩm mỹ sang trọng, quản lý tài chính an toàn.',
    layman: 'Bạn là mẫu người yêu lý tưởng: đằm thắm, đáng tin cậy, thích cùng người thương thưởng thức món ăn ngon và xây dựng tổ ấm sung túc vững bền.',
    strengths: ['Chung thủy', 'Ấm áp', 'Quản lý tài chính xuất sắc', 'Gu thẩm mỹ tinh tế'],
    pitfalls: ['Tính sở hữu cao', 'Hơi ghen ngầm', 'Ngại thay đổi thói quen'],
    advice: 'Tạo thêm những bất ngờ lãng mạn mới mẻ; tin tưởng bạn đời và cho nhau không gian riêng.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Kim Tinh tại Song Tử: Tình yêu bắt đầu từ sự hòa hợp trí tuệ và những cuộc trò chuyện dí dỏm. Cần sự tươi mới, tiếng cười và tự do kết nối trong mối quan hệ.',
    layman: 'Bạn bị thu hút bởi người thông minh, hài hước và biết lắng nghe. Bạn thích cùng người yêu đi du lịch, xem phim và bàn luận đủ thứ chuyện trên đời.',
    strengths: ['Dí dỏm', 'Giao tiếp ngọt ngào', 'Tươi trẻ', 'Không tạo áp lực'],
    pitfalls: ['Dễ xao nhãng', 'Sợ sự ràng buộc quá sớm', 'Đôi khi thiếu chiều sâu cảm xúc'],
    advice: 'Học cách cam kết sâu sắc; dành thời gian lắng nghe thế giới nội tâm của bạn đời thay vì chỉ dừng ở các câu chuyện vui bề nổi.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Kim Tinh tại Cự Giải: Tình yêu dịu dàng, chu đáo, tìm kiếm cảm giác an toàn và tổ ấm bình yên. Hết lòng chăm sóc, nấu ăn và bảo bọc người mình yêu thương.',
    layman: 'Bạn yêu sâu sắc, chân thành và coi người yêu như gia đình. Bạn là chỗ dựa tinh thần ấm áp nhất, luôn nhớ từng sở thích nhỏ của đối phương.',
    strengths: ['Chăm sóc ân cần', 'Chung thủy sâu sắc', 'Ấm áp gia đình', 'Trực giác thấu cảm'],
    pitfalls: ['Dễ tủi thân', 'Hay bám dính cảm xúc', 'Khó quên nỗi đau cũ'],
    advice: 'Bày tỏ nhu cầu của mình thẳng thắn thay vì im lặng dỗi hờn; tin tưởng vào tình cảm của đối phương.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Kim Tinh tại Sư Tử: Tình yêu hào phóng, lãng mạn như phim ảnh, thích thể hiện tình cảm công khai và tự hào về người bạn đời. Trái tim ấm áp, chung thủy và trung thành.',
    layman: 'Bạn yêu hết mình, chiều chuộng và tặng những món quà tuyệt vời nhất cho người yêu. Bạn muốn cả thế giới biết bạn đang hạnh phúc bên ai.',
    strengths: ['Hào phóng lãng mạn', 'Chung thủy trung thành', 'Ấm áp nhiệt thành', 'Tự hào về người yêu'],
    pitfalls: ['Đòi hỏi sự chú ý quá mức', 'Dễ tự ái khi bị lơ là', 'Thích phô trương'],
    advice: 'Trân trọng những cử chỉ quan tâm giản dị thầm lặng; tình yêu đẹp nhất là sự bình yên từ sâu bên trong trái tim.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Kim Tinh tại Xử Nữ: Tình yêu thể hiện qua những hành động chăm sóc cụ thể hàng ngày. Trung thành, tận tụy, chú trọng thói quen sống lành mạnh và tương lai vững chắc.',
    layman: 'Bạn không thích những lời hứa viển vông mà thể hiện tình yêu bằng việc chăm sóc sức khỏe, nhắc nhở ăn uống và giúp đỡ người yêu giải quyết việc thực tế.',
    strengths: ['Tận tụy chu đáo', 'Đáng tin cậy', 'Khiêm nhường', 'Đồng hành vượt khó'],
    pitfalls: ['Hay cằn nhằn soi xét', 'Khó bộc lộ sự lãng mạn bằng lời', 'Quá cầu toàn'],
    advice: 'Thả lỏng tiêu chuẩn; khen ngợi đối phương nhiều hơn thay vì chỉ nhìn vào những điểm chưa hoàn hảo.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra)',
    meaning: 'Kim Tinh tại Thiên Bình (Cung Vị Thống Lĩnh): Đỉnh cao của sự lãng mạn và hòa hợp. Coi trọng sự bình đẳng, chia sẻ, gu thẩm mỹ tinh tế và sự nhã nhặn trong ứng xử.',
    layman: 'Bạn sinh ra để yêu và được yêu. Bạn biến mối quan hệ thành một bức tranh đẹp: ngọt ngào, lãng mạn, tôn trọng lẫn nhau và luôn giữ thể diện cho người yêu.',
    strengths: ['Lãng mạn chuẩn mực', 'Duyên dáng ngọt ngào', 'Biết cách lắng nghe', 'Tạo sự hòa hợp tuyệt đối'],
    pitfalls: ['Sợ cô đơn', 'Khó từ chối người khác', 'Né tránh xung đột cần thiết'],
    advice: 'Dám đối diện với các bất đồng thực tế để tìm giải pháp dứt điểm; sự hòa hợp thật sự đến từ việc hiểu rõ cả điểm yếu của nhau.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Kim Tinh tại Bọ Cạp: Tình yêu sâu sắc, mãnh liệt và đam mê tột cùng. Đòi hỏi sự chung thủy tuyệt đối, gắn kết tâm hồn sâu sắc và vượt qua mọi bão giông.',
    layman: 'Với bạn, tình yêu là tất cả hoặc không là gì cả (All or Nothing). Bạn yêu sâu sắc, sẵn sàng hy sinh tất cả nhưng một khi đã bị phản bội thì không bao giờ tha thứ.',
    strengths: ['Chung thủy tuyệt đối', 'Đam mê mãnh liệt', 'Gắn kết tâm hồn sâu', 'Bảo vệ người yêu hết lòng'],
    pitfalls: ['Ghen tuông dữ dội', 'Tính kiểm soát cao', 'Nghi ngờ dằn vặt'],
    advice: 'Học cách tin tưởng và thả lỏng; tình yêu bền vững là khi hai tâm hồn tự nguyện gắn kết chứ không phải sự kiểm soát.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Kim Tinh tại Nhân Mã: Tình yêu tự do, vui vẻ, tìm kiếm người bạn đời cùng chung lý tưởng sống và cùng nhau đi du lịch khám phá thế giới. Rộng lượng và lạc quan.',
    layman: 'Bạn muốn người yêu đồng thời là người bạn đồng hành tuyệt vời nhất: cùng nhau cười, cùng nhau xách balo lên đường và chia sẻ những ước mơ lớn.',
    strengths: ['Lạc quan yêu đời', 'Chân thành phóng khoáng', 'Không ghen tuông vô cớ', 'Đồng hành khám phá'],
    pitfalls: ['Ngại cam kết gò bó', 'Đôi khi thiếu sự quan tâm tinh tế', 'Nhanh chán lối mòn'],
    advice: 'Hiểu rằng cam kết hôn nhân không có nghĩa là mất tự do, mà là cùng nhau xây dựng bệ phóng để cả hai cùng bay cao hơn.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn)',
    meaning: 'Kim Tinh tại Ma Kết: Nghiêm túc, thận trọng trong tình cảm, xây dựng mối quan hệ trên nền tảng cam kết dài hạn và trách nhiệm thực tế. Càng lâu càng mặn nồng.',
    layman: 'Bạn không dễ yêu nhưng khi đã chọn ai thì sẽ gắn bó trọn đời. Bạn thể hiện tình yêu bằng sự che chở vững chãi và chăm lo kinh tế chu toàn cho gia đình.',
    strengths: ['Chung thủy son sắt', 'Có trách nhiệm cao', 'Vững chãi kinh tế', 'Tình yêu bền vững theo năm tháng'],
    pitfalls: ['Khô khan ít nói lời ngọt ngào', 'Quá thực tế', 'Đặt sự nghiệp lên trên tình cảm'],
    advice: 'Bày tỏ tình cảm bằng lời nói yêu thương và cử chỉ âu yếm nhiều hơn; cuộc sống cần có cả sự lãng mạn ngọt ngào.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius)',
    meaning: 'Kim Tinh tại Bảo Bình: Tình yêu bắt đầu từ tình bạn tri kỷ, tôn trọng không gian riêng và sự độc lập của nhau. Không thích sự ghen tuông sở hữu gò bó.',
    layman: 'Bạn cần một người yêu hiểu được suy nghĩ của mình, tôn trọng các mối quan hệ bạn bè và cùng bạn chia sẻ những lý tưởng tiến bộ xã hội.',
    strengths: ['Tôn trọng tự do', 'Không ghen tuông mù quáng', 'Tình bạn gắn bó sâu', 'Trung thành với nguyên tắc'],
    pitfalls: ['Đôi khi lạnh lùng xa cách', 'Lý trí hóa cảm xúc', 'Khó bộc lộ sự nồng nàn'],
    advice: 'Cho phép mình được bày tỏ cảm xúc ấm áp một-một; sự gắn bó thân mật không hề làm mất đi sự độc lập của bạn.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Kim Tinh tại Song Ngư (Cung Vị Tôn Quý): Đỉnh cao của lòng vị tha và tình yêu lãng mạn không biên giới. Sẵn sàng tha thứ, thấu cảm và hy sinh vì người mình yêu.',
    layman: 'Bạn có một trái tim thiên thần: giàu lòng trắc ẩn, lãng mạn như truyện cổ tích và luôn nhìn thấy điều tốt đẹp nhất ở người yêu.',
    strengths: ['Vị tha vô điều kiện', 'Lãng mạn ngọt ngào', 'Trực giác thấu cảm kỳ diệu', 'Tận tụy yêu thương'],
    pitfalls: ['Dễ bị lừa dối lợi dụng', 'Lý tưởng hóa đối phương mù quáng', 'Khó dứt khoát buông bỏ'],
    advice: 'Mở mắt nhìn rõ con người thật của đối phương; học cách yêu thương và bảo vệ chính mình trước tiên.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 4. HỎA TINH (MARS) — HÀNH ĐỘNG, BẢN LĨNH & NỘI LỰC TRONG 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const MARS_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Hỏa Tinh tại Bạch Dương (Cung Vị Thống Lĩnh): Năng lượng hành động bùng nổ, dũng cảm tiên phong, quyết đoán và không sợ hãi bất kỳ đối thủ nào.',
    layman: 'Bạn là chiến binh dũng mãnh: muốn làm gì là bắt tay làm ngay, phản ứng trực diện và cực kỳ quyết liệt. Bạn luôn đi đầu trong các cuộc bứt phá.',
    strengths: ['Dũng cảm phi thường', 'Tốc độ hành động cao', 'Ý chí tiên phong', 'Không bao giờ lùi bước'],
    pitfalls: ['Nóng nảy mất kiểm soát', 'Thiếu kiên nhẫn', 'Dễ gây hấn'],
    advice: 'Học cách kiểm soát cơn giận; định hướng nguồn năng lượng dồi dào vào các mục tiêu thể thao hoặc công việc kinh doanh.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Hỏa Tinh tại Kim Ngưu: Hành động chậm rãi nhưng kiên trì vô địch. Một khi đã khởi động thì như cỗ xe tăng tiến về phía trước, không gì ngăn cản được.',
    layman: 'Bạn không thích vội vã nhưng có sức bền đáng kinh ngạc. Bạn làm việc chăm chỉ, bền bỉ từng ngày cho đến khi đạt được mục tiêu vật chất vững chắc.',
    strengths: ['Sức bền siêu phàm', 'Kiên định sắt đá', 'Hành động thực tế', 'Đáng tin cậy'],
    pitfalls: ['Khởi động chậm', 'Cố chấp bảo thủ', 'Một khi nổi giận thì rất đáng sợ'],
    advice: 'Tăng tốc độ thích ứng khi hoàn cảnh thay đổi; chủ động nắm bắt cơ hội trước khi nó trôi qua.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Hỏa Tinh tại Song Tử: Hành động đa nhiệm linh hoạt, năng lượng thể hiện qua lời nói, văn phong và các cuộc tranh luận sắc bén. Nhanh nhẹn và tháo vát.',
    layman: 'Bạn chiến đấu bằng trí tuệ và sự hoạt ngôn. Bạn xử lý nhiều dự án cùng lúc rất khéo, thích các công việc đòi hỏi sự di chuyển và giao tiếp liên tục.',
    strengths: ['Linh hoạt nhanh nhạy', 'Tranh biện sắc bén', 'Tháo vát đa nhiệm', 'Thích ứng tuyệt vời'],
    pitfalls: ['Phân tán năng lượng', 'Dễ bỏ dở giữa chừng', 'Lời nói đôi khi quá cay độc'],
    advice: 'Tập trung hoàn thành dứt điểm từng việc quan trọng; tránh để sự mau chán làm tiêu hao năng lượng quý giá.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Hỏa Tinh tại Cự Giải: Hành động được thúc đẩy bởi cảm xúc và khát vọng bảo vệ gia đình. Khi người thân bị đe dọa, bạn trở nên dũng cảm phi thường.',
    layman: 'Bạn không thích đối đầu trực diện ngoài xã hội nhưng sẵn sàng xù lông nhím để bảo vệ tổ ấm của mình. Hành động cẩn trọng và có trực giác phòng thủ tốt.',
    strengths: ['Bảo vệ kiên cường', 'Trực giác hành động nhạy', 'Tận tụy vì gia đình', 'Bền bỉ âm thầm'],
    pitfalls: ['Dễ hờn dỗi thụ động', 'Tránh né xung đột trực tiếp', 'Hành động theo tâm trạng'],
    advice: 'Nói thẳng quan điểm khi có điều bất như ý thay vì dồn nén cảm xúc; rèn luyện thói quen đối thoại văn minh.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Hỏa Tinh tại Sư Tử: Hành động với phong thái đĩnh đạc, tự tin, thích nhận các thử thách lớn để khẳng định bản lĩnh thủ lĩnh. Kiên định và hào sảng.',
    layman: 'Bạn làm việc gì cũng muốn đạt đỉnh cao và được mọi người tôn vinh. Bạn là người chỉ huy dám đứng mũi chịu sào và truyền lửa nhiệt huyết cho tập thể.',
    strengths: ['Bản lĩnh chỉ huy', 'Tự tin đĩnh đạc', 'Dám chịu trách nhiệm', 'Hào hiệp dũng cảm'],
    pitfalls: ['Tự ái cao khi bị chỉ trích', 'Độc đoán áp đặt', 'Hiếu thắng'],
    advice: 'Lắng nghe góp ý của đồng đội; sự vĩ đại đích thực của một thủ lĩnh nằm ở việc nâng đỡ người khác cùng tỏa sáng.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Hỏa Tinh tại Xử Nữ: Hành động có phương pháp, kỷ luật cao, tỉ mỉ và kiểm soát chất lượng chuẩn xác. Ghét sự cẩu thả, luôn hướng tới hiệu suất tối ưu.',
    layman: 'Bạn làm việc như một cỗ máy chính xác: có kế hoạch, có quy trình và kiểm tra kỹ lưỡng từng khâu. Bạn xuất sắc trong việc thực thi các dự án phức tạp.',
    strengths: ['Kỷ luật chuẩn xác', 'Hiệu suất làm việc cao', 'Tỉ mỉ thực tế', 'Khắc phục sự cố tuyệt vời'],
    pitfalls: ['Hay lo lắng căng thẳng', 'Quá bận tâm tiểu tiết', 'Tự vắt kiệt sức lao động'],
    advice: 'Học cách ủy quyền cho người khác; hiểu rằng hoàn thành công việc đúng tiến độ đôi khi quan trọng hơn việc đạt độ hoàn hảo 100%.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra)',
    meaning: 'Hỏa Tinh tại Thiên Bình: Tránh xung đột bạo lực, giải quyết tranh chấp bằng đàm phán ngoại giao khéo léo. Chiến đấu vì sự công bằng và bình đẳng xã hội.',
    layman: 'Bạn ghét sự cãi vã thô bạo. Khi có mâu thuẫn, bạn dùng sự bình tĩnh và lý lẽ công bằng để hòa giải. Bạn làm việc nhóm rất ăn ý.',
    strengths: ['Ngoại giao khéo léo', 'Chiến đấu vì công lý', 'Hợp tác ăn ý', 'Hóa giải xung đột'],
    pitfalls: ['Do dự không dám dứt khoát', 'Né tránh va chạm cần thiết', 'Bị động chờ người khác quyết'],
    advice: 'Quyết đoán hơn trong các tình huống cạnh tranh; dám đứng lên bảo vệ quyền lợi chính đáng của mình một cách thẳng thắn.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Hỏa Tinh tại Bọ Cạp (Cung Vị Thống Lĩnh Cổ Điển): Nội lực thâm sâu phi thường, kiên nhẫn phục kích, bản lĩnh vượt qua nghịch cảnh và tái sinh từ đống tro tàn.',
    layman: 'Bạn có sức mạnh ý chí vô song: càng gặp khó khăn bạn càng trở nên mạnh mẽ. Bạn làm việc âm thầm nhưng khi ra đòn thì chuẩn xác tuyệt đối.',
    strengths: ['Ý chí sắt đá', 'Nội lực phi thường', 'Tập trung cao độ', 'Bản lĩnh lội ngược dòng'],
    pitfalls: ['Khó tha thứ lỗi lầm', 'Hay dồn nén thù hận', 'Tính kiểm soát độc đoán'],
    advice: 'Dùng ý chí thép để kiến tạo giá trị tích cực; học cách tha thứ để giải phóng nguồn năng lượng mạnh mẽ của bản thân.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Hỏa Tinh tại Nhân Mã: Năng lượng dồi dào, thích phiêu lưu mạo hiểm, chiến đấu vì lý tưởng tự do và chính nghĩa. Luôn hướng về phía trước với sự lạc quan.',
    layman: 'Bạn không chịu ngồi yên một chỗ mà luôn tìm kiếm mục tiêu mới để chinh phục. Bạn thích thể thao, du lịch mạo hiểm và các dự án mở rộng quy mô lớn.',
    strengths: ['Nhiệt huyết dồi dào', 'Dũng cảm dấn thân', 'Lạc quan yêu đời', 'Chiến đấu vì lý tưởng'],
    pitfalls: ['Hành động thiếu kế hoạch', 'Cả thèm chóng chán', 'Đốt cháy giai đoạn'],
    advice: 'Lập kế hoạch chi tiết cho các ý tưởng lớn; kiên trì theo đuổi mục tiêu đến cùng trước khi chuyển sang dự án mới.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn)',
    meaning: 'Hỏa Tinh tại Ma Kết (Cung Vị Tôn Quý): Đỉnh cao của kỷ luật thép, hành động chiến lược có lộ trình dài hạn, sức chịu đựng áp lực công việc siêu việt.',
    layman: 'Bạn là bậc thầy của sự kiên định: làm việc miệt mài, không bao giờ bỏ cuộc và luôn leo lên đỉnh cao sự nghiệp bằng chính thực lực của mình.',
    strengths: ['Kỷ luật thép', 'Chiến lược dài hạn', 'Chịu áp lực cực tốt', 'Thành tựu vững bền'],
    pitfalls: ['Quá tham công tiếc việc', 'Lạnh lùng khắt khe', 'Coi thường người yếu đuối'],
    advice: 'Dành thời gian nghỉ ngơi tái tạo năng lượng; chia sẻ thành công và lắng nghe tâm tư của cấp dưới, người thân.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius)',
    meaning: 'Hỏa Tinh tại Bảo Bình: Hành động vì mục tiêu cộng đồng và tiến bộ xã hội. Phong cách làm việc độc lập, phá vỡ khuôn mẫu cũ kỹ bằng giải pháp công nghệ mới.',
    layman: 'Bạn thích làm việc theo cách riêng của mình, ghét bị ai chỉ tay năm ngón. Bạn có động lực mạnh mẽ khi được tham gia các dự án cải tiến và đổi mới.',
    strengths: ['Độc lập tự chủ', 'Tư duy đổi mới cách mạng', 'Hành động vì tập thể', 'Không ngại đi ngược đám đông'],
    pitfalls: ['Cố chấp bướng bỉnh', 'Khó hợp tác nếu bị ép buộc', 'Đôi khi nổi loạn vô cớ'],
    advice: 'Hợp tác linh hoạt với các quy trình sẵn có; biến tư duy đổi mới thành các giải pháp cụ thể mang lại lợi ích cho số đông.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Hỏa Tinh tại Song Ngư: Hành động mềm mại theo trực giác, dùng lòng nhân ái hóa giải bạo lực, dồn năng lượng vào sáng tạo nghệ thuật và phụng sự.',
    layman: 'Bạn không thích tranh giành quyền lực mà hành động vì tình thương và trực giác mách bảo. Bạn có sức sáng tạo nghệ thuật và khả năng thấu cảm phi thường.',
    strengths: ['Trực giác nhạy bén', 'Lòng nhân ái sâu sắc', 'Sáng tạo nghệ thuật', 'Hóa giải hận thù'],
    pitfalls: ['Thiếu quyết đoán trực diện', 'Dễ buông xuôi bỏ cuộc', 'Né tránh đối đầu'],
    advice: 'Rèn luyện tính quyết đoán và kỷ luật bản thân; dũng cảm bảo vệ ranh giới cá nhân khi bị người khác lấn lướt.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 5. MỘC TINH (JUPITER) — MAY MẮN, VẬN MỆNH & PHÁT TRIỂN TRONG 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const JUPITER_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Mộc Tinh tại Bạch Dương: May mắn mở ra khi bạn dũng cảm tiên phong, dám nghĩ dám làm và mở lối cho những dự án độc lập chưa ai từng thực hiện.',
    layman: 'Cơ hội lớn nhất của bạn đến từ việc tự mình khởi nghiệp hoặc chủ động dẫn dắt. Sự tự tin và tinh thần dám chịu trách nhiệm thu hút quý nhân nâng đỡ.',
    strengths: ['Cơ hội khởi nghiệp', 'Dũng cảm chớp thời cơ', 'Nhiệt huyết mở rộng', 'Tự tin'],
    pitfalls: ['Chủ quan quá mức', 'Hành động thiếu tính toán', 'Quá tự tin vào vận may'],
    advice: 'Kết hợp lòng can đảm với kế hoạch quản trị rủi ro; nắm bắt thời cơ nhưng phải có phương án dự phòng.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Mộc Tinh tại Kim Ngưu: May mắn đến từ sự kiên trì tích lũy tài sản, đầu tư vào các giá trị thực tế như bất động sản, nông nghiệp hoặc kinh doanh bền vững.',
    layman: 'Vận may tài chính của bạn nở rộ khi bạn kiên nhẫn xây dựng từng bước chắc chắn. Bạn có duyên với đất đai, tài sản hữu hình và các nguồn thu ổn định.',
    strengths: ['Vận may tài chính bền vững', 'Đầu tư an toàn', 'Kiên trì tích lũy', 'Sung túc vật chất'],
    pitfalls: ['Bảo thủ bỏ lỡ cơ hội mới', 'Quá chú trọng vật chất', 'Chậm chạp'],
    advice: 'Kiên trì với chiến lược đầu tư giá trị; tận hưởng thành quả sung túc và chia sẻ với những người kém may mắn hơn.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Mộc Tinh tại Song Tử: May mắn mở ra qua giao lưu mạng lưới quan hệ rộng, học hỏi đa lĩnh vực, truyền thông, viết lách và thương mại điện tử.',
    layman: 'Càng kết nối nhiều bạn bè và học hỏi điều mới, bạn càng gặp nhiều quý nhân và cơ hội kiếm tiền. Khả năng ăn nói mang lại tài lộc dồi dào.',
    strengths: ['Mạng lưới quan hệ rộng', 'May mắn qua giao tiếp', 'Học hỏi đa diện', 'Linh hoạt nắm bắt thông tin'],
    pitfalls: ['Phân tán nguồn lực', 'Cam kết quá nhiều thứ', 'Thiếu chiều sâu'],
    advice: 'Tập trung vào các mối quan hệ chất lượng; biến những thông tin thu thập được thành các sản phẩm kinh doanh cụ thể.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Mộc Tinh tại Cự Giải (Cung Vị Tôn Quý): Đỉnh cao của phúc khí gia đạo! May mắn đến từ gia đình, bất động sản, lòng trắc ẩn và sự bảo bọc người khác.',
    layman: 'Bạn được tổ tiên và gia đình nâng đỡ rất nhiều. Bạn có duyên với nhà đất, kinh doanh dịch vụ ăn uống, khách sạn hoặc chăm sóc sức khỏe.',
    strengths: ['Phúc khí gia đình lớn', 'Lộc bất động sản', 'Lòng từ bi thu hút quý nhân', 'Ấm no trọn vẹn'],
    pitfalls: ['Quá bao bọc sợ rủi ro', 'Chi tiêu cảm tính cho người nhà'],
    advice: 'Vun đắp tình cảm gia đình; tạo dựng không gian sống ấm cúng và kinh doanh các sản phẩm phục vụ đời sống gia đình.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Mộc Tinh tại Sư Tử: May mắn tỏa sáng rực rỡ khi bạn tự tin thể hiện tài năng lãnh đạo, nghệ thuật biểu diễn, sáng tạo và truyền cảm hứng.',
    layman: 'Bạn có quý nhân phù trợ ở vị trí cấp cao. Càng tự tin, hào sảng và rộng lượng, vận may và danh tiếng càng tự tìm đến với bạn.',
    strengths: ['Danh tiếng vang dội', 'Vận may lãnh đạo', 'Hào sảng thu phục lòng người', 'Sáng tạo thăng hoa'],
    pitfalls: ['Tự phụ kiêu ngạo', 'Tiêu xài xa xỉ', 'Chủ quan khinh địch'],
    advice: 'Giữ tâm thế khiêm nhường và bao dung; dùng sự may mắn của mình để tạo sân chơi cho người khác cùng phát triển.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Mộc Tinh tại Xử Nữ: May mắn đến từ sự tận tụy, tỉ mỉ, kỹ năng chuyên môn xuất sắc và thái độ phục vụ khách hàng chu đáo, chân thành.',
    layman: 'Bạn gặt hái thành công lớn nhờ sự uy tín, làm việc cẩn thận từng chi tiết nhỏ. Khách hàng tin tưởng và giới thiệu thêm nhiều mối làm ăn cho bạn.',
    strengths: ['Chuyên môn tinh hoa', 'May mắn qua sự tận tụy', 'Khả năng cải tiến quy trình', 'Được tin cậy'],
    pitfalls: ['Quá soi mói làm chậm tiến độ', 'Không dám mơ lớn', 'Lo lắng thừa thãi'],
    advice: 'Nâng tầm các kỹ năng chi tiết thành quy trình quản lý chuyên nghiệp; tự tin mở rộng quy mô dịch vụ.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra)',
    meaning: 'Mộc Tinh tại Thiên Bình: May mắn nở rộ qua các mối quan hệ đối tác kinh doanh, hôn nhân thuận hòa, sự công bằng và kỹ năng ngoại giao xuất sắc.',
    layman: 'Bạn làm việc chung với người khác luôn tốt hơn làm một mình. Hợp đồng kinh doanh và hôn nhân đều mang lại cho bạn sự thăng tiến vượt bậc.',
    strengths: ['Cơ hội qua đối tác', 'Hôn nhân mang lại tài lộc', 'Ngoại giao thành công', 'Công bằng uy tín'],
    pitfalls: ['Quá dựa dẫm vào đối phương', 'Thiếu lập trường độc lập', 'Do dự chốt hợp đồng'],
    advice: 'Chọn lựa đối tác có cùng giá trị đạo đức; minh bạch hóa các điều khoản hợp tác ngay từ đầu.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Mộc Tinh tại Bọ Cạp: May mắn lớn qua các kênh đầu tư tài chính chung (chứng khoán, vốn vay, thừa kế), trực giác tâm lý thấu thị và năng lực hồi sinh ngoạn mục.',
    layman: 'Bạn có duyên quản lý tiền bạc của người khác. Mỗi khi gặp khó khăn, bạn luôn tìm thấy nguồn lực bất ngờ để lật ngược tình thế ngoạn mục.',
    strengths: ['Lộc tài chính sâu', 'Trực giác đầu tư nhạy', 'Khả năng lội ngược dòng', 'Nắm bắt bản chất kinh doanh'],
    pitfalls: ['Đầu tư mạo hiểm thái quá', 'Nghi ngờ đối tác', 'Bí mật quá mức'],
    advice: 'Tuân thủ đạo đức tài chính minh bạch; kết hợp trực giác sâu sắc với dữ liệu kiểm toán chuẩn xác.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Mộc Tinh tại Nhân Mã (Cung Vị Thống Lĩnh): Phúc khí rực rỡ nhất! Vận may lớn qua con đường học vấn bậc cao, xuất ngoại, triết lý sống và du lịch quốc tế.',
    layman: 'Bạn như có ngôi sao may mắn chiếu mệnh: đi đâu cũng gặp người tốt giúp đỡ, tầm nhìn xa rộng và luôn tìm thấy cơ hội lớn ở những phương trời xa.',
    strengths: ['Vận may tối thượng', 'Tầm nhìn quốc tế', 'Lạc quan thu hút phước lành', 'Trí tuệ nhân sinh cao'],
    pitfalls: ['Chủ quan quá đà', 'Chi tiêu phung phí', 'Bỏ qua các rủi ro pháp lý'],
    advice: 'Không ngừng mở rộng tri thức và thế giới quan; chia sẻ triết lý sống tích cực để gieo hạt giống thiện lành.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn)',
    meaning: 'Mộc Tinh tại Ma Kết: May mắn đến từ sự kiên định, kỷ luật dài hạn, sự nghiệp bền vững và việc xây dựng cơ cấu tổ chức quy mô lớn.',
    layman: 'Vận may của bạn không đến từ trên trời rơi xuống mà đến từ việc bạn luôn chuẩn bị chu đáo nhất. Thành tựu lớn và địa vị xã hội vững bền sau tuổi 30.',
    strengths: ['Thành công vững chắc dài hạn', 'Địa vị xã hội cao', 'Quản trị doanh nghiệp xuất sắc', 'Kỷ luật mang lại tài lộc'],
    pitfalls: ['Quá thận trọng', 'Tiết kiệm quá mức', 'Khó tin vào những cơ hội nhanh'],
    advice: 'Kiên trì với mục tiêu lớn; mở rộng sự linh hoạt để đón nhận những cơ hội bứt phá khi thời cơ đến.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius)',
    meaning: 'Mộc Tinh tại Bảo Bình: May mắn mở ra qua các hoạt động cộng đồng, mạng xã hội, đổi mới công nghệ, bạn bè cùng chí hướng và lý tưởng nhân đạo.',
    layman: 'Bạn gặp nhiều cơ hội khi tham gia các hội nhóm, cộng đồng và các dự án công nghệ mới. Bạn bè là nguồn lực quý giá nhất giúp bạn hiện thực hóa ước mơ.',
    strengths: ['Quý nhân từ bạn bè', 'Thành công qua công nghệ', 'Lý tưởng cộng đồng lớn', 'Tư duy đổi mới'],
    pitfalls: ['Xa rời thực tế', 'Kế hoạch quá trừu tượng', 'Thiếu tính cam kết cá nhân'],
    advice: 'Kết nối những người cùng chí hướng; áp dụng công nghệ mới để giải quyết các bài toán thiết thực của xã hội.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Mộc Tinh tại Song Ngư (Cung Vị Thống Lĩnh Cổ Điển): Đại phước khí từ lòng từ bi! May mắn qua trực giác tâm linh, lòng vị tha, nghệ thuật và sự chữa lành.',
    layman: 'Bạn sống thiện lương nên luôn được ơn trên che chở. Càng cho đi và giúp đỡ người khác, bạn càng nhận lại nhiều phúc báo và sự bình an trong tâm hồn.',
    strengths: ['Phúc đức sâu dày', 'Trực giác tâm linh thấu suốt', 'Năng khiếu nghệ thuật', 'Bình an nội tại'],
    pitfalls: ['Dễ bị kẻ xấu lợi dụng lòng tốt', 'Trốn tránh trách nhiệm thực tế', 'Mơ mộng'],
    advice: 'Làm việc thiện có trí tuệ; bảo vệ bản thân để có thể tiếp tục lan tỏa nguồn năng lượng chữa lành cho cuộc đời.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 6. THỔ TINH (SATURN) — BÀI HỌC, KỶ LUẬT & TRƯỞNG THÀNH TRONG 12 CUNG
// ═════════════════════════════════════════════════════════════════════
export const SATURN_SIGN_INTERPRETATIONS: Record<string, PlanetaryInsight> = {
  ARIES: {
    signKey: 'ARIES',
    signNameVn: 'Bạch Dương (Aries)',
    meaning: 'Thổ Tinh tại Bạch Dương: Bài học lớn về sự kiên nhẫn; học cách kiểm soát tính bốc đồng và biến sự nóng vội thành ý chí bền bỉ sắt đá.',
    layman: 'Thử thách của bạn là không được nản lòng khi khởi đầu gặp trắc trở. Vũ trụ dạy bạn bài học kiên trì, đi từng bước chắc chắn thay vì nhảy cóc.',
    strengths: ['Rèn luyện ý chí thép', 'Trưởng thành qua thử thách', 'Bản lĩnh tự lập'],
    pitfalls: ['Ức chế bực bội khi bị cản trở', 'Nghi ngờ năng lực bản thân', 'Bốc đồng'],
    advice: 'Xem sự chậm trễ là cơ hội mài giũa bản lĩnh; kiên nhẫn làm việc có kế hoạch dài hạn.',
  },
  TAURUS: {
    signKey: 'TAURUS',
    signNameVn: 'Kim Ngưu (Taurus)',
    meaning: 'Thổ Tinh tại Kim Ngưu: Bài học lớn về quản lý tài chính; vượt qua nỗi sợ thiếu thốn vật chất để xây dựng sự an toàn kinh tế bền vững.',
    layman: 'Giai đoạn đầu đời bạn có thể phải lo lắng nhiều về tiền bạc. Nhưng chính thử thách này giúp bạn trở thành chuyên gia quản lý tài chính cẩn mật, giàu có sau tuổi 30.',
    strengths: ['Quản lý tài chính cẩn mật', 'Tích lũy bền vững', 'Coi trọng giá trị thực tế'],
    pitfalls: ['Nỗi sợ nghèo khó ám ảnh', 'Bủn xỉn keo kiệt', 'Quá bảo thủ'],
    advice: 'Học cách đầu tư thông minh thay vì chỉ giữ tiền; tin rằng năng lực của bạn đủ để tạo ra sự thịnh vượng vững bền.',
  },
  GEMINI: {
    signKey: 'GEMINI',
    signNameVn: 'Song Tử (Gemini)',
    meaning: 'Thổ Tinh tại Song Tử: Bài học về sự tập trung tư duy; nói đi đôi với làm, biến kiến thức đa dạng thành chuyên môn sâu sắc có cấu trúc.',
    layman: 'Bạn có thể từng cảm thấy tự ti về khả năng diễn đạt hoặc học hành lúc nhỏ. Khi trưởng thành, bạn rèn luyện được tư duy logic cực kỳ chặt chẽ và uy tín.',
    strengths: ['Tư duy logic chuẩn xác', 'Lời nói có trọng lượng', 'Kỷ luật học tập cao'],
    pitfalls: ['Hay lo lắng suy nghĩ nhiều', 'Khắt khe trong ngôn từ', 'Nghi ngờ kiến thức của mình'],
    advice: 'Tập trung vào một vài chủ đề trọng điểm; viết lách và diễn đạt một cách có cấu trúc rõ ràng.',
  },
  CANCER: {
    signKey: 'CANCER',
    signNameVn: 'Cự Giải (Cancer)',
    meaning: 'Thổ Tinh tại Cự Giải: Bài học về sự an toàn tâm lý; chữa lành những tổn thương tuổi thơ để tự làm điểm tựa cảm xúc vững chắc cho chính mình.',
    layman: 'Bạn có xu hướng giấu kín cảm xúc yếu đuối vì sợ bị tổn thương. Thử thách là học cách mở lòng đón nhận tình cảm và xây dựng một tổ ấm bình yên thật sự.',
    strengths: ['Bản lĩnh nội tâm kiên cường', 'Trách nhiệm cao với gia đình', 'Chín chắn'],
    pitfalls: ['Khép kín đóng chặt cửa lòng', 'Nỗi sợ bị bỏ rơi', 'Khó bộc lộ tình cảm'],
    advice: 'Học cách tha thứ cho quá khứ; mở lòng chia sẻ tâm tư với người thân yêu để tìm lại sự ấm áp.',
  },
  LEO: {
    signKey: 'LEO',
    signNameVn: 'Sư Tử (Leo)',
    meaning: 'Thổ Tinh tại Sư Tử: Bài học về lòng tự trọng chân thật; tìm thấy giá trị nội tại từ bên trong thay vì phụ thuộc vào sự vỗ tay khen ngợi từ bên ngoài.',
    layman: 'Bạn có thể từng cảm thấy tài năng của mình không được ghi nhận xứng đáng. Khi vượt qua bài học này, bạn trở thành người lãnh đạo thực chất và khiêm nhường.',
    strengths: ['Lãnh đạo thực chất', 'Tự tin từ bên trong', 'Sáng tạo có kỷ luật', 'Trách nhiệm cao'],
    pitfalls: ['Sợ bị chối bỏ', 'Cái tôi dễ tổn thương', 'Nghi ngờ tài năng của mình'],
    advice: 'Làm việc vì đam mê thực sự chứ không phải để chứng tỏ; sự công nhận bền vững nhất đến từ kết quả thực tế.',
  },
  VIRGO: {
    signKey: 'VIRGO',
    signNameVn: 'Xử Nữ (Virgo)',
    meaning: 'Thổ Tinh tại Xử Nữ: Bài học về sự buông bỏ cầu toàn; chấp nhận sự không hoàn hảo của cuộc đời và chăm sóc sức khỏe một cách khoa học, cân bằng.',
    layman: 'Bạn có xu hướng làm việc quá sức và tự trách bản thân khi có sai sót nhỏ. Bài học là học cách thư giãn, sống bao dung với chính mình và người khác.',
    strengths: ['Kỹ năng chuyên môn bậc thầy', 'Tỉ mỉ kỷ luật tuyệt hảo', 'Trách nhiệm cao với công việc'],
    pitfalls: ['Lo âu bệnh tật', 'Cầu toàn thái quá dẫn đến kiệt sức', 'Hay tự dằn vặt'],
    advice: 'Chấp nhận rằng "Hoàn thành tốt hơn Hoàn hảo"; thiết lập chế độ nghỉ ngơi khoa học để tái tạo năng lượng.',
  },
  LIBRA: {
    signKey: 'LIBRA',
    signNameVn: 'Thiên Bình (Libra) (Cung Vị Tôn Quý)',
    meaning: 'Thổ Tinh tại Thiên Bình: Đỉnh cao của sự công bằng và cam kết! Bài học về việc thiết lập các mối quan hệ đối tác và hôn nhân bền vững dựa trên sự bình đẳng.',
    layman: 'Bạn rất nghiêm túc trong tình cảm và hợp tác. Bạn không vội vàng kết hôn nhưng khi đã cam kết thì sẽ đồng hành vượt qua mọi sóng gió cuộc đời.',
    strengths: ['Cam kết bền vững', 'Công bằng liêm chính', 'Trách nhiệm trong hôn nhân', 'Ngoại giao chuẩn mực'],
    pitfalls: ['Khắt khe trong việc chọn bạn đời', 'Sợ thất bại hôn nhân', 'Quá lý trí trong tình cảm'],
    advice: 'Cân bằng giữa nguyên tắc và sự bao dung tình cảm; xây dựng mối quan hệ dựa trên sự sẻ chia chân thành.',
  },
  SCORPIO: {
    signKey: 'SCORPIO',
    signNameVn: 'Bọ Cạp (Scorpio)',
    meaning: 'Thổ Tinh tại Bọ Cạp: Bài học về sự buông bỏ kiểm soát; học cách tin tưởng và chuyển hóa nỗi sợ bị phản bội thành nội lực thâm sâu phi thường.',
    layman: 'Bạn từng trải qua những biến cố tâm lý sâu sắc khiến bạn rất cảnh giác. Nhưng chính điều đó giúp bạn có khả năng phục hồi thần kỳ và thấu hiểu lòng người.',
    strengths: ['Nội lực phục hồi phi thường', 'Bản lĩnh vượt qua nghịch cảnh', 'Thấu thị tâm lý', 'Kiên định'],
    pitfalls: ['Đa nghi phòng thủ cao', 'Nỗi sợ mất kiểm soát', 'Khó buông bỏ quá khứ'],
    advice: 'Học cách tin tưởng có chọn lọc; để quá khứ ngủ yên và tập trung năng lượng vào việc tái thiết tương lai.',
  },
  SAGITTARIUS: {
    signKey: 'SAGITTARIUS',
    signNameVn: 'Nhân Mã (Sagittarius)',
    meaning: 'Thổ Tinh tại Nhân Mã: Bài học về tính thực tế; đưa những lý tưởng triết lý cao xa vào áp dụng kỷ luật trong cuộc sống hàng ngày.',
    layman: 'Bạn có thể từng hoang mang về niềm tin và hướng đi cuộc đời. Thử thách là xây dựng một hệ thống triết lý sống vững chắc, nói đi đôi với làm.',
    strengths: ['Triết lý sống thực tế', 'Tầm nhìn có cấu trúc', 'Trách nhiệm với lý tưởng', 'Uy tín học thuật'],
    pitfalls: ['Bảo thủ giáo điều', 'Bi quan về tương lai', 'Khó tin vào những điều kỳ diệu'],
    advice: 'Kiểm chứng niềm tin bằng trải nghiệm thực tế; sống cởi mở và bao dung với các quan điểm khác biệt.',
  },
  CAPRICORN: {
    signKey: 'CAPRICORN',
    signNameVn: 'Ma Kết (Capricorn) (Cung Vị Thống Lĩnh)',
    meaning: 'Thổ Tinh tại Ma Kết: Vị trí quyền uy nhất của Thổ Tinh! Khả năng gánh vác trách nhiệm lớn lao, leo lên đỉnh cao sự nghiệp vững bền sau tuổi 30.',
    layman: 'Bạn là người kiến tạo đế chế bằng mồ hôi và nước mắt. Càng nhiều tuổi bạn càng có uy tín, địa vị xã hội vững chắc và sự nghiệp trường tồn.',
    strengths: ['Kỷ luật thép tối thượng', 'Khả năng lãnh đạo tầm cỡ', 'Trách nhiệm cao cả', 'Thành tựu đỉnh cao'],
    pitfalls: ['Khắt khe lạnh lùng', 'Quá tham công tiếc việc', 'Bỏ quên niềm vui cuộc sống'],
    advice: 'Cân bằng giữa sự nghiệp và gia đình; dành thời gian tận hưởng những thành quả mà bạn đã dày công gây dựng.',
  },
  AQUARIUS: {
    signKey: 'AQUARIUS',
    signNameVn: 'Bảo Bình (Aquarius) (Cung Vị Thống Lĩnh Cổ Điển)',
    meaning: 'Thổ Tinh tại Bảo Bình: Trách nhiệm với cộng đồng và xã hội; xây dựng các tổ chức, hội nhóm bền vững nhằm mang lại sự tiến bộ cho số đông.',
    layman: 'Bạn có tư duy tổ chức xã hội rất tốt. Bạn làm việc nghiêm túc vì những mục tiêu dài hạn của cộng đồng và luôn là chỗ dựa vững chãi cho bạn bè.',
    strengths: ['Tổ chức cộng đồng xuất sắc', 'Trách nhiệm xã hội cao', 'Tư duy khoa học bài bản', 'Trung thành với nguyên tắc'],
    pitfalls: ['Hơi giáo điều cứng nhắc', 'Khó gần gũi cá nhân', 'Bảo thủ với lý thuyết của mình'],
    advice: 'Kết nối lý tưởng lớn với tình cảm chân thành; lắng nghe tâm tư của từng cá nhân trong tập thể.',
  },
  PISCES: {
    signKey: 'PISCES',
    signNameVn: 'Song Ngư (Pisces)',
    meaning: 'Thổ Tinh tại Song Ngư: Bài học về ranh giới tâm lý; tránh đóng vai nạn nhân, phân biệt giữa lòng trắc ẩn lành mạnh và sự hy sinh mù quáng.',
    layman: 'Bạn có thể từng cảm thấy mất phương hướng hoặc gánh vác nỗi khổ của người khác. Bài học là học cách thiết lập ranh giới và đưa trực giác vào hiện thực hóa.',
    strengths: ['Lòng trắc ẩn có kỷ luật', 'Biến giấc mơ thành hiện thực', 'Trực giác có cấu trúc', 'Chữa lành sâu sắc'],
    pitfalls: ['Cảm giác bất an mơ hồ', 'Hay trốn tránh thực tại', 'Tự ti'],
    advice: 'Thực hành thiền định hoặc các bài tập kỷ luật tinh thần; học cách nói "Không" để bảo vệ bản thân.',
  },
};

// ═════════════════════════════════════════════════════════════════════
// 7. GÓC CHIẾU HÀNH TINH (MAJOR ASPECTS INTERPRETATION)
// ═════════════════════════════════════════════════════════════════════
export const MAJOR_ASPECT_DEFINITIONS: Record<string, {
  nameVn: string;
  symbol: string;
  isHarmonious: boolean;
  angle: number;
  orbDefault: number;
  beginnerGuide: string;
  psychologicalMechanism: string;
  advice: string;
}> = {
  CONJUNCTION: {
    nameVn: 'Trùng Tụ (Conjunction — 0°)',
    symbol: '☌',
    isHarmonious: true,
    angle: 0,
    orbDefault: 8.0,
    beginnerGuide: 'Hai hành tinh đứng cùng một vị trí trên bầu trời, năng lượng của chúng hòa quyện chặt chẽ làm một khối thống nhất.',
    psychologicalMechanism: 'Sự hợp nhất tối đa của hai chức năng tâm lý. Nét tính cách này thể hiện cực kỳ mạnh mẽ, trực diện và nổi bật trong con người bạn.',
    advice: 'Nhận biết điểm mạnh vượt trội này và hướng nó vào các mục tiêu cụ thể; tránh để một hành tinh lấn át hoàn toàn chức năng của hành tinh kia.',
  },
  SEXTILE: {
    nameVn: 'Lục Hợp (Sextile — 60°)',
    symbol: '⚹',
    isHarmonious: true,
    angle: 60,
    orbDefault: 5.0,
    beginnerGuide: 'Góc chiếu tương sinh nhẹ nhàng giữa hai nguyên tố hỗ trợ (Lửa - Khí hoặc Đất - Nước), mở ra những cơ hội thuận lợi trong cuộc sống.',
    psychologicalMechanism: 'Sự hòa hợp tiềm năng. Năng khiếu này không tự động biểu hiện mà đòi hỏi bạn phải chủ động nắm bắt cơ hội và hành động để gặt hái.',
    advice: 'Chủ động đón nhận cơ hội học hỏi và kết nối; tài năng sẽ nở rộ khi bạn bắt tay vào thực hiện.',
  },
  SQUARE: {
    nameVn: 'Vuông Góc (Square — 90°)',
    symbol: '□',
    isHarmonious: false,
    angle: 90,
    orbDefault: 7.0,
    beginnerGuide: 'Góc cọ xát căng thẳng giữa hai nguyên tố khác biệt. Tạo ra áp lực nội tâm và thử thách buộc bạn phải trưởng thành.',
    psychologicalMechanism: 'Xung đột giữa hai nhu cầu tâm lý trái ngược. Đây là "động cơ của sự vĩ đại": áp lực này thôi thúc bạn phải nỗ lực gấp đôi và đạt được những thành tựu phi thường.',
    advice: 'Đừng né tránh áp lực; xem đây là phòng tập thể lực cho tâm hồn; tìm kiếm giải pháp dung hòa thay vì cố chấp triệt tiêu một bên.',
  },
  TRINE: {
    nameVn: 'Tam Hợp (Trine — 120°)',
    symbol: '△',
    isHarmonious: true,
    angle: 120,
    orbDefault: 8.0,
    beginnerGuide: 'Góc chiếu thuận hòa hoàn hảo nhất! Hai hành tinh cùng thuộc một nguyên tố (cùng Lửa, Đất, Khí hoặc Nước), ban tặng tài năng thiên bẩm.',
    psychologicalMechanism: 'Dòng chảy năng lượng tương sinh tự nhiên, không gặp bất kỳ cản trở nội tâm nào. Bạn làm việc này dễ dàng và thành công mà không tốn nhiều công sức.',
    advice: 'Tránh chủ quan hoặc lười biếng ỷ lại vào năng khiếu; hãy rèn luyện thêm kỷ luật để biến tài năng thiên bẩm thành thành tựu đỉnh cao.',
  },
  OPPOSITION: {
    nameVn: 'Đối Đỉnh (Opposition — 180°)',
    symbol: '☍',
    isHarmonious: false,
    angle: 180,
    orbDefault: 8.0,
    beginnerGuide: 'Hai hành tinh đứng ở hai đầu đối diện của vòng hoàng đạo, như hai người kéo co ở hai thái cực.',
    psychologicalMechanism: 'Sự giằng co giữa hai cực: ví dụ giữa Tôi và Người khác, giữa Gia đình và Sự nghiệp. Bài học lớn về sự cân bằng và hòa giải.',
    advice: 'Học cách đi trên dây thăng bằng; không ngả hẳn về một cực mà học cách tích hợp cả hai phẩm chất để trở thành con người trọn vẹn.',
  },
};

/**
 * Helper to get authentic, individualized planet-in-sign insight
 */
export function getPlanetInSignInsight(
  planetKey: string,
  signKey: string,
  houseNumber?: number | null
): {
  headline: string;
  beginnerGuide: string;
  layman: string;
  advice: string;
  strengths: string[];
  pitfalls: string[];
} {
  const pKey = planetKey.toLowerCase();
  const sKey = signKey.toUpperCase();

  // Try Ascendant
  if (pKey === 'ascendant') {
    const item = ASCENDANT_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      return {
        headline: `Cung Mọc tại ${item.signNameVn}`,
        beginnerGuide: 'Cung Mọc (Ascendant) là chiếc mặt nạ bạn đeo khi tiếp xúc với thế giới bên ngoài, quyết định phong thái, ngoại hình và ấn tượng đầu tiên.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Try Mercury
  if (pKey === 'mercury') {
    const item = MERCURY_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      const houseText = houseNumber ? ` ngụ tại Nhà ${houseNumber}` : '';
      return {
        headline: `Thủy Tinh (Mercury) tại ${item.signNameVn}${houseText}`,
        beginnerGuide: 'Thủy Tinh chi phối tư duy, cách tiếp nhận và xử lý dữ liệu logic, kỹ năng nói năng, viết lách và giao tiếp kết nối.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Try Venus
  if (pKey === 'venus') {
    const item = VENUS_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      const houseText = houseNumber ? ` ngụ tại Nhà ${houseNumber}` : '';
      return {
        headline: `Kim Tinh (Venus) tại ${item.signNameVn}${houseText}`,
        beginnerGuide: 'Kim Tinh cai quản tình yêu, gu thẩm mỹ, cách bạn thể hiện sự lãng mạn và quan niệm về tiền bạc, giá trị tự thân.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Try Mars
  if (pKey === 'mars') {
    const item = MARS_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      const houseText = houseNumber ? ` ngụ tại Nhà ${houseNumber}` : '';
      return {
        headline: `Hỏa Tinh (Mars) tại ${item.signNameVn}${houseText}`,
        beginnerGuide: 'Hỏa Tinh là động lực hành động, năng lượng tranh đấu, sự quyết đoán, đam mê và cách bạn bảo vệ ranh giới cá nhân.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Try Jupiter
  if (pKey === 'jupiter') {
    const item = JUPITER_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      const houseText = houseNumber ? ` ngụ tại Nhà ${houseNumber}` : '';
      return {
        headline: `Mộc Tinh (Jupiter) tại ${item.signNameVn}${houseText}`,
        beginnerGuide: 'Mộc Tinh là hành tinh của vận may, sự mở rộng cơ hội, niềm tin lạc quan và sự phát triển tri thức, triết lý sống.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Try Saturn
  if (pKey === 'saturn') {
    const item = SATURN_SIGN_INTERPRETATIONS[sKey];
    if (item) {
      const houseText = houseNumber ? ` ngụ tại Nhà ${houseNumber}` : '';
      return {
        headline: `Thổ Tinh (Saturn) tại ${item.signNameVn}${houseText}`,
        beginnerGuide: 'Thổ Tinh đại diện cho bài học trách nhiệm, kỷ luật thép, sự kiên nhẫn vượt qua thử thách để xây dựng sự nghiệp bền vững.',
        layman: item.layman,
        advice: item.advice,
        strengths: item.strengths,
        pitfalls: item.pitfalls,
      };
    }
  }

  // Fallback for outer planets
  const outerNames: Record<string, string> = {
    uranus: 'Thiên Vương Tinh (Uranus) — Đột phá đổi mới',
    neptune: 'Hải Vương Tinh (Neptune) — Trực giác & Nghệ thuật',
    pluto: 'Diêm Vương Tinh (Pluto) — Tái sinh & Nội lực',
    northnode: 'La Hầu (North Node) — Hướng đi tiến hóa',
    southnode: 'Kế Đô (South Node) — Nghiệp quả quá khứ',
    chiron: 'Chiron — Vết thương chữa lành',
  };

  const name = outerNames[pKey] || planetKey;
  const houseText = houseNumber ? ` tại Nhà ${houseNumber}` : '';

  return {
    headline: `${name} tại cung ${signKey}${houseText}`,
    beginnerGuide: `Hành tinh này chi phối các năng lượng thế hệ và chiều sâu tâm lý đặc biệt trong lĩnh vực Nhà ${houseNumber ?? 1}.`,
    layman: `Vị trí này thể hiện sự chuyển hóa và khai phóng tiềm năng sâu kín của bạn trong các vấn đề liên quan đến cung ${signKey} và Nhà ${houseNumber ?? 1}.`,
    advice: 'Lắng nghe trực giác và kiên nhẫn tích lũy kinh nghiệm để chuyển hóa nguồn năng lượng này thành sức mạnh cá nhân.',
    strengths: ['Nội lực sâu kín', 'Khả năng chuyển hóa', 'Độc lập'],
    pitfalls: ['Áp lực ngầm', 'Cần thời gian kích hoạt'],
  };
}

// ══════════════════════════════════════════════════════════════════
// BẢNG LUẬN GIẢI CHUYÊN SÂU TỪNG CẶP HÀNH TINH (PAIRWISE ASPECT INSIGHTS)
// ══════════════════════════════════════════════════════════════════
export const PAIR_ASPECT_INSIGHTS: Record<
  string,
  {
    harmonious: { layman: string; advice: string };
    tension: { layman: string; advice: string };
    conjunction?: { layman: string; advice: string };
  }
> = {
  moon_sun: {
    harmonious: {
      layman:
        'Bản ngã lý trí (Mặt Trời) và nhu cầu cảm xúc (Mặt Trăng) đồng điệu sâu sắc. Bạn sở hữu sự tự tin nội tại, tính cách nhất quán, ít khi bị giằng xé giữa mong muốn cá nhân và sự yên ổn trong tâm hồn. Lời nói và cảm xúc đi cùng một hướng.',
      advice:
        'Phát huy sự vững vàng này để trở thành chỗ dựa đáng tin cậy cho gia đình và đồng đội; bạn có năng khiếu hòa giải và tạo dựng niềm tin tự nhiên.',
    },
    tension: {
      layman:
        'Trục cọ xát kinh điển giữa khát vọng tỏa sáng (Mặt Trời) và nhu cầu an toàn riêng tư (Mặt Trăng). Bạn thường cảm thấy xung đột sâu sắc giữa việc dấn thân cho sự nghiệp bên ngoài và việc vun vén đời sống nội tâm/gia đình, như thể hai con người đang kéo về hai ngả.',
      advice:
        'Phân định rõ ranh giới thời gian giữa công việc và đời tư; học cách lắng nghe cả tiếng nói lý trí lẫn tiếng thở dài của cảm xúc thay vì dằn vặt bản thân.',
    },
    conjunction: {
      layman:
        'Sinh vào kỳ Trăng Non (Tân Nguyệt). Bản ngã và cảm xúc hòa làm một thể duy nhất. Bạn tập trung cao độ, trực giác mãnh liệt, tràn đầy nhiệt huyết khởi xướng những chu kỳ cuộc đời mới.',
      advice:
        'Tránh tính chủ quan thái quá; đôi khi lùi lại một bước để quan sát góc nhìn của người khác sẽ giúp bạn đưa ra quyết định toàn diện hơn.',
    },
  },

  mercury_sun: {
    harmonious: {
      layman:
        'Tư duy logic (Thủy Tinh) kết nối mật thiết với bản sắc cá nhân (Mặt Trời). Bạn có khả năng diễn đạt lưu loát, quan điểm khúc chiết, trí nhớ sắc bén và khả năng truyền cảm hứng bằng lời nói rất tự nhiên.',
      advice:
        'Tận dụng tài năng ngôn ngữ trong viết lách, đàm phán thương mại và thuyết trình chiến lược. Luôn mở rộng tinh thần đón nhận các phản biện xây dựng.',
    },
    tension: {
      layman:
        'Tư duy gắn chặt với cái tôi cá nhân. Khi ý kiến của bạn bị phản đối hoặc chất vấn, bạn dễ cảm thấy như chính lòng tự trọng của mình đang bị công kích trực diện.',
      advice:
        'Tách rời ý kiến khỏi giá trị tự thân; học cách tiếp nhận các góc nhìn trái chiều như một cơ hội mở rộng hiểu biết thay vì một cuộc chiến thắng thua.',
    },
    conjunction: {
      layman:
        'Trí tuệ Cazimi rực sáng. Bộ não của bạn hoạt động như một cỗ máy xử lý dữ liệu thần tốc, tư duy nhanh nhạy, làm chủ ngôn từ và có khả năng định hình ý tưởng phức tạp một cách mạch lạc.',
      advice:
        'Dành thời gian cho não bộ nghỉ ngơi tĩnh lặng; tránh thói quen suy nghĩ quá dồn dập khiến hệ thần kinh bị căng thẳng kéo dài.',
    },
  },

  sun_venus: {
    harmonious: {
      layman:
        'Sức hút duyên dáng, phong thái lịch thiệp và gu thẩm mỹ thanh lịch bẩm sinh. Bạn toát ra nguồn năng lượng ấm áp, dễ mến và luôn hướng đến sự công bằng, hòa thuận trong các mối quan hệ xã hội.',
      advice:
        'Khai thác tối đa năng khiếu ngoại giao và cảm quan thẩm mỹ trong nghệ thuật, thiết kế, thương thuyết hoặc chăm sóc cộng đồng.',
    },
    tension: {
      layman:
        'Khuynh hướng tìm kiếm sự công nhận và ưa chuộng hòa bình đến mức ngại đối đầu, dễ chiều lòng người khác mà quên đi quyền lợi và ranh giới cá nhân.',
      advice:
        'Học cách từ chối khéo léo; giá trị đích thực của bạn không phụ thuộc vào việc phải làm hài lòng tất cả mọi người.',
    },
    conjunction: {
      layman:
        'Vẻ đẹp tâm hồn và phong thái tỏa sáng tự nhiên. Bạn có trái tim rộng mở, biết cách làm cho người đối diện cảm thấy được trân trọng và yêu quý.',
      advice:
        'Đầu tư vào việc phát triển thương hiệu cá nhân và môi trường sống duy mỹ; bạn sinh ra để lan tỏa niềm vui và sự hài hòa.',
    },
  },

  mars_sun: {
    harmonious: {
      layman:
        'Nguồn sinh lực dồi dào, lòng quả cảm và tinh thần tiên phong bất khuất. Bạn dám nghĩ dám làm, không e sợ gian khó và luôn chủ động dẫn đầu khi có thử thách mới xuất hiện.',
      advice:
        'Đặt ra các mục tiêu lớn đòi hỏi sự bứt phá; duy trì rèn luyện thể thao hàng ngày để khai thông nguồn năng lượng thể chất mạnh mẽ này.',
    },
    tension: {
      layman:
        'Sự thôi thúc hành động quá mãnh liệt dễ dẫn đến tính nóng nảy, thiếu kiên nhẫn hoặc thói quen ganh đua gay gắt khi kế hoạch bị cản trở.',
      advice:
        'Áp dụng quy tắc dừng 5 giây trước khi phản ứng; chuyển hóa cơn giận thành sự tập trung sắt đá vào mục tiêu thay vì tranh chấp hơn thua.',
    },
    conjunction: {
      layman:
        'Ngọn lửa chiến binh rực cháy. Ý chí và hành động hòa làm một: bạn là người hành động dứt khoát, ghét sự chần chừ và sẵn sàng đương đầu với mọi sóng gió.',
      advice:
        'Học cách điều tiết tốc độ; một chiến binh xuất sắc không chỉ biết tấn công mà còn phải biết khi nào nên tạm dừng để củng cố lực lượng.',
    },
  },

  jupiter_sun: {
    harmonious: {
      layman:
        'Tầm nhìn khoáng đạt, tinh thần lạc quan hào hiệp và vận may tự nhiên từ các cơ hội mở rộng. Bạn có niềm tin tích cực vào cuộc sống và luôn thu hút được quý nhân nâng đỡ.',
      advice:
        'Mạnh dạn mở rộng quy mô, học hỏi tri thức mới hoặc khám phá những lĩnh vực quốc tế; sự hào phóng và chân thành sẽ mở ra nhiều cánh cửa lớn.',
    },
    tension: {
      layman:
        'Dễ tự tin thái quá, ước tính quá cao khả năng thực tế hoặc hứa hẹn vượt quá nguồn lực, dẫn đến tình trạng bắt đầu hoành tráng nhưng đuối sức về sau.',
      advice:
        'Đặt ra các tiêu chí kiểm soát rủi ro chặt chẽ; chia nhỏ các kế hoạch vĩ mô thành các mốc khả thi cụ thể.',
    },
  },

  saturn_sun: {
    harmonious: {
      layman:
        'Kỷ luật thép, tinh thần trách nhiệm cao độ và sự kiên định bền bỉ như đá tảng. Thành công của bạn là kết tinh của sự tích lũy nghiêm túc theo năm tháng, càng về hậu vận càng vững chắc.',
      advice:
        'Kiên trì đi trên con đường đã chọn; thời gian chính là người bạn đồng hành tốt nhất giúp bạn xây dựng vị thế vững chắc không thể lung lay.',
    },
    tension: {
      layman:
        'Cảm giác gánh nặng trách nhiệm đè nặng lên vai, hay tự ti hoặc tự đặt ra những yêu cầu khắt khe đến ngột ngạt đối với bản thân từ thuở thiếu thời.',
      advice:
        'Ghi nhận và tự thưởng cho những nỗ lực hàng ngày của mình; bớt khắt khe với bản thân và tin rằng hoàn hảo là một hành trình chứ không phải đích đến tức thì.',
    },
  },

  sun_uranus: {
    harmonious: {
      layman:
        'Tư duy đổi mới đột phá, trực giác nhạy bén về xu hướng tương lai và phong cách độc lập không thể trộn lẫn. Bạn luôn tìm ra những lối đi sáng tạo mà người khác không ngờ tới.',
      advice:
        'Ứng dụng công nghệ mới và tự do phát triển các ý tưởng tiên phong; đừng ngại khác biệt vì đó chính là thương hiệu độc bản của bạn.',
    },
    tension: {
      layman:
        'Tính khí bướng bỉnh, thích nổi loạn chống lại các khuôn mẫu có sẵn một cách cực đoan hoặc dễ thay đổi định hướng đột ngột khiến người xung quanh khó theo kịp.',
      advice:
        'Học cách kiên trì với một mục tiêu trước khi chuyển sang dự án mới; sáng tạo cần đi đôi với sự hoàn thiện để tạo ra giá trị bền vững.',
    },
  },

  neptune_sun: {
    harmonious: {
      layman:
        'Trực giác tâm linh sâu sắc, tâm hồn duy mỹ giàu lòng trắc ẩn và cảm quan nghệ thuật tinh tế. Bạn dễ dàng cảm nhận được tâm trạng của tha nhân và vẻ đẹp tiềm ẩn của vạn vật.',
      advice:
        'Đưa cảm xúc và trí tưởng tượng phong phú vào nghệ thuật, âm nhạc, sáng tạo nội dung hoặc các hoạt động thiện nguyện chữa lành.',
    },
    tension: {
      layman:
        'Dễ mơ mộng xa rời thực tế, thiếu ranh giới bảo vệ bản thân trước những nguồn năng lượng tiêu cực xung quanh hoặc dễ vỡ mộng khi đối diện với thực tế trần trụi.',
      advice:
        'Thiết lập kỷ luật thực tiễn hàng ngày; tập trung vào những việc cụ thể có thể đo lường được để giữ cho đôi chân luôn đứng vững trên mặt đất.',
    },
  },

  pluto_sun: {
    harmonious: {
      layman:
        'Nội lực phi thường và khả năng tái sinh kỳ diệu sau mọi nghịch cảnh. Bạn sở hữu đôi mắt nhìn thấu bản chất vấn đề, bản lĩnh can trường và uy lực ngầm khiến người khác nể trọng.',
      advice:
        'Sử dụng quyền năng này để tạo ra sự chuyển hóa tích cực cho cộng đồng; bạn là người có khả năng dẫn dắt qua các giai đoạn khủng hoảng.',
    },
    tension: {
      layman:
        'Khuynh hướng muốn kiểm soát tuyệt đối hoàn cảnh và con người xung quanh; dễ rơi vào trạng thái nghi ngờ, giằng xé nội tâm hoặc phản ứng tiêu cực khi mất quyền chủ động.',
      advice:
        'Học bài học buông bỏ sự kiểm soát; tin tưởng vào dòng chảy tự nhiên và chuyển hóa nỗi sợ thành sự thấu suốt.',
    },
  },

  mercury_moon: {
    harmonious: {
      layman:
        'Sự kết hợp tinh tế giữa trí tuệ logic và độ nhạy cảm xúc. Bạn hiểu được tâm trạng của người khác qua từng cử chỉ và biết dùng lời nói ấm áp, thông thái để vỗ về lòng người.',
      advice:
        'Phát huy năng lực này trong các công việc tư vấn, giảng dạy, viết lách hoặc gắn kết đội ngũ; bạn là người lắng nghe xuất sắc.',
    },
    tension: {
      layman:
        'Tâm trí thường xuyên bị cảm xúc xáo trộn, dễ suy nghĩ quá mức (overthinking) về những lời nói vu vơ hoặc lo lắng viển vông gây mất ngủ và căng thẳng thần kinh.',
      advice:
        'Tập thói quen viết nhật ký để đưa các luồng suy nghĩ ra giấy; dành thời gian tĩnh lặng hoặc đi dạo trong thiên nhiên để làm dịu tâm trí.',
    },
  },

  moon_venus: {
    harmonious: {
      layman:
        'Tâm hồn ngọt ngào, tinh tế, giàu lòng trắc ẩn và yêu chuộng cuộc sống gia đình êm ấm. Bạn mang lại cảm giác bình yên, thoải mái và dễ chịu cho bất kỳ ai tiếp xúc.',
      advice:
        'Chăm chút cho không gian tổ ấm và duy trì những thói quen vun đắp tình cảm chân thành với người thân yêu.',
    },
    tension: {
      layman:
        'Nỗi sợ bị từ chối hoặc thói quen nuông chiều cảm xúc tiêu cực bằng sự buông thả bản thân; dễ thỏa hiệp mù quáng để giữ hòa khí dù bản thân chịu nhiều thiệt thòi.',
      advice:
        'Tìm kiếm niềm vui tự thân lành mạnh; đối thoại trực tiếp về nhu cầu tình cảm thay vì im lặng chịu đựng trong ấm ức.',
    },
  },

  mars_moon: {
    harmonious: {
      layman:
        'Cảm xúc nhiệt thành, phản xạ bảo vệ bản năng nhạy bén và sẵn sàng hành động dũng cảm vì những người thân yêu. Bạn có nguồn năng lượng sống dồi dào và chân thật.',
      advice:
        'Khai thác nhiệt huyết này trong các hoạt động bảo vệ đội nhóm hoặc các môn thể thao đòi hỏi sự nhanh nhẹn.',
    },
    tension: {
      layman:
        'Cảm xúc dễ bùng phát dữ dội như ngọn lửa; một lời nói bất cẩn cũng có thể kích hoạt phản ứng tự vệ gay gắt, dễ gây tổn thương những người thân thiết nhất.',
      advice:
        'Khi cảm thấy cơn giận dâng lên, hãy tạm thời rời khỏi cuộc tranh luận và vận động thể chất để giải tỏa năng lượng xung kích.',
    },
  },

  jupiter_moon: {
    harmonious: {
      layman:
        'Tâm hồn rộng mở, hào phóng, giàu lòng nhân ái và khả năng phục hồi cảm xúc kỳ diệu. Dù gặp nghịch cảnh, bạn vẫn luôn giữ được sự lạc quan và niềm tin vững chắc vào ngày mai.',
      advice:
        'Lan tỏa năng lượng tích cực này đến cộng đồng; bạn có năng khiếu tự nhiên trong việc truyền cảm hứng sống đẹp và nhân hậu.',
    },
    tension: {
      layman:
        'Dễ phóng đại cảm xúc, phóng khoáng quá đà hoặc tìm cách trốn tránh đối diện với các vấn đề gai góc bằng sự lạc quan hời hợt.',
      advice:
        'Nhìn nhận thẳng thắn cả những mặt hạn chế trong đời sống để có giải pháp xử lý triệt để, không né tránh.',
    },
  },

  moon_saturn: {
    harmonious: {
      layman:
        'Sự vững vàng về cảm xúc, khả năng tự chủ cao và sự chín chắn trước tuổi. Bạn là chỗ dựa thầm lặng nhưng cực kỳ kiên cố trong mọi cơn bão táp của cuộc đời.',
      advice:
        'Đảm nhận các vai trò quản lý hoặc tổ chức; mọi người luôn an tâm tuyệt đối khi có sự hiện diện của bạn.',
    },
    tension: {
      layman:
        'Nỗi cô đơn sâu kín, cảm giác bị cô lập hoặc khó mở lòng chia sẻ tâm tư với người khác vì sợ bị phán xét hay tổn thương; thường kìm nén cảm xúc cho đến khi kiệt sức.',
      advice:
        'Học cách tin tưởng và cho phép bản thân được yếu đuối trước những người thật sự trân quý bạn; cởi mở là liều thuốc giải phóng gánh nặng nội tâm.',
    },
  },

  mars_venus: {
    harmonious: {
      layman:
        'Sức hấp dẫn tự nhiên đầy lôi cuốn, hòa quyện giữa nét duyên dáng quyến rũ và ngọn lửa đam mê nhiệt huyết. Bạn tạo nên sự cân bằng đẹp đẽ trong tình yêu và các mối quan hệ đôi lứa.',
      advice:
        'Sáng tạo nghệ thuật hoặc theo đuổi các dự án mang tính thẩm mỹ và năng động cao; tình cảm luôn là nguồn cảm hứng dồi dào.',
    },
    tension: {
      layman:
        'Sự xung đột giữa nhu cầu được yêu thương nhẹ nhàng và tính chiếm hữu mãnh liệt; các mối quan hệ tình cảm dễ thăng trầm theo chu kỳ nồng nàn rồi tranh cãi gay gắt.',
      advice:
        'Tôn trọng không gian riêng của đối phương; học cách yêu thương trong sự thấu hiểu thay vì đòi hỏi kiểm soát lẫn nhau.',
    },
  },

  mars_mercury: {
    harmonious: {
      layman:
        'Đầu óc nhanh nhạy như điện xẹt, phản xạ ngôn từ sắc sảo và khả năng ra quyết định chớp nhoáng dưới áp lực lớn. Bạn là người dám nói sự thật và bảo vệ chính kiến đến cùng.',
      advice:
        'Thích hợp cho các công việc đòi hỏi xử lý khủng hoảng, thương lượng giá cả hoặc tranh luận học thuật.',
    },
    tension: {
      layman:
        'Khẩu khí sắc bén dễ biến thành lời châm chọc cay nghiệt, hiếu thắng trong mọi cuộc thảo luận và thiếu kiên nhẫn khi người khác giải thích chậm.',
      advice:
        'Uốn lưỡi bảy lần trước khi nói; sự thông minh đi kèm lòng trắc ẩn mới là trí tuệ đỉnh cao.',
    },
  },

  mars_saturn: {
    harmonious: {
      layman:
        'Sự kết hợp giữa động lực hành động dũng mãnh và sự kiên nhẫn sắt đá. Bạn làm việc có phương pháp, kiên trì đào từng tấc đất để xây nền móng vững chắc không gì lay chuyển nổi.',
      advice:
        'Tập trung vào các dự án đồ sộ đòi hỏi sự bền bỉ trường kỳ; không ai có thể làm việc bền bỉ hơn bạn.',
    },
    tension: {
      layman:
        'Cảm giác nội tâm như "vừa đạp ga vừa nhấn phanh". Bạn rất muốn hành động nhưng luôn bị sự thận trọng quá mức hoặc nỗi sợ thất bại kìm hãm lại, sinh ra cảm giác bực bội âm ỉ.',
      advice:
        'Bắt đầu từ những mục tiêu nhỏ có độ rủi ro thấp để tích lũy sự tự tin trước khi tăng tốc dứt khoát.',
    },
  },

  jupiter_saturn: {
    harmonious: {
      layman:
        'Sự cân bằng vàng giữa khát vọng mở rộng và kỷ luật bảo toàn vốn. Bạn biết chính xác khi nào nên đầu tư mở rộng và khi nào nên củng cố vị trí an toàn.',
      advice:
        'Xây dựng các kế hoạch tài chính và sự nghiệp dài hạn; bạn có tố chất của một nhà hoạch định chiến lược kinh doanh xuất sắc.',
    },
    tension: {
      layman:
        'Sự dao động thất thường giữa hưng phấn liều lĩnh và hoang mang thận trọng quá mức, dễ dẫn đến việc bỏ lỡ các thời cơ chiến lược then chốt.',
      advice:
        'Thiết lập bộ quy chuẩn đầu tư bằng văn bản và tuân thủ nghiêm ngặt, không để cảm xúc thị trường dẫn dắt.',
    },
  },
};

/**
 * Helper to get authentic Aspect Insight between two bodies with zero undefined errors
 */
export function getAspectInsight(
  planet1: string,
  planet2: string,
  aspectType: string,
  orb: number
): {
  headline: string;
  isHarmonious: boolean;
  beginnerGuide: string;
  layman: string;
  advice: string;
} {
  const p1 = (planet1 || '').toLowerCase().trim();
  const p2 = (planet2 || '').toLowerCase().trim();
  const typeUpper = (aspectType || '').toUpperCase().trim();
  const def = MAJOR_ASPECT_DEFINITIONS[typeUpper] ?? {
    nameVn: `Góc Chiếu ${aspectType}`,
    symbol: '●',
    isHarmonious: true,
    angle: 0,
    orbDefault: 5.0,
    beginnerGuide: 'Mối tương quan góc chiếu giữa hai thiên thể trên bản đồ sao.',
    psychologicalMechanism: 'Tương tác năng lượng giữa hai hành tinh.',
    advice: 'Cân bằng và tích hợp hai nguồn năng lượng này trong cuộc sống.',
  };

  const planetNamesVn: Record<string, string> = {
    sun: 'Mặt Trời (Bản ngã)',
    moon: 'Mặt Trăng (Cảm xúc)',
    mercury: 'Thủy Tinh (Tư duy)',
    venus: 'Kim Tinh (Tình yêu/Giá trị)',
    mars: 'Hỏa Tinh (Hành động/Ý chí)',
    jupiter: 'Mộc Tinh (May mắn/Tầm nhìn)',
    saturn: 'Thổ Tinh (Kỷ luật/Bài học)',
    uranus: 'Thiên Vương (Đột phá)',
    neptune: 'Hải Vương (Trực giác)',
    pluto: 'Diêm Vương (Tái sinh)',
    ascendant: 'Cung Mọc (Phong thái)',
    midheaven: 'Thiên Đỉnh (Sự nghiệp)',
  };

  const p1Name = planetNamesVn[p1] ?? (planet1 || 'Hành tinh 1');
  const p2Name = planetNamesVn[p2] ?? (planet2 || 'Hành tinh 2');

  const headline = `${p1Name} ${def.symbol} ${def.nameVn} ${p2Name}`;
  const orbText = `(Sai số góc: ${orb.toFixed(2)}°)`;

  const pairKey = [p1, p2].sort().join('_');
  const pairInsight = PAIR_ASPECT_INSIGHTS[pairKey];

  let layman = '';
  let advice = '';

  if (pairInsight) {
    if (typeUpper === 'CONJUNCTION' && pairInsight.conjunction) {
      layman = pairInsight.conjunction.layman;
      advice = pairInsight.conjunction.advice;
    } else if (def.isHarmonious) {
      layman = pairInsight.harmonious.layman;
      advice = pairInsight.harmonious.advice;
    } else {
      layman = pairInsight.tension.layman;
      advice = pairInsight.tension.advice;
    }
  } else {
    // Dynamic synthesis based on archetypes
    if (def.isHarmonious) {
      layman = `Đây là một liên kết tương sinh thuận hòa giữa ${p1Name} và ${p2Name}. Năng lượng của hai thiên thể hòa nhập tự nhiên, bổ trợ nhịp nhàng cho nhau mà không tạo ra cản trở hay xung đột nội tâm.`;
      advice = `Tận dụng tối đa sự liên kết này trong các dự án đòi hỏi sự phối hợp giữa bản lĩnh và nhận thức cá nhân.`;
    } else {
      layman = `Đây là một trục cọ xát thách thức giữa ${p1Name} và ${p2Name}. Bạn thường cảm nhận được sự giằng co: khi một bên thôi thúc hành động quyết liệt thì bên kia đòi hỏi sự an toàn hoặc ranh giới cảm xúc.`;
      advice = `Xem góc cọ xát này như lò luyện ý chí; học cách điều hòa và phân bổ thời gian hợp lý cho cả hai nhu cầu thay vì thiên lệch.`;
    }
  }

  return {
    headline: `${headline} ${orbText}`,
    isHarmonious: def.isHarmonious,
    beginnerGuide: def.beginnerGuide,
    layman,
    advice,
  };
}

/**
 * Generate comprehensive overall Natal Chart Synthesis
 */
export function synthesizeNatalChart(
  bodies: Record<string, any>,
  _houses: Array<any>,
  aspects: Array<any>
): {
  elementSummary: {
    dominant: string;
    dominantVn: string;
    deficient: string;
    deficientVn: string;
    counts: Record<string, number>;
    description: string;
    remedyAdvice: string;
  };
  modalitySummary: {
    dominant: string;
    dominantVn: string;
    counts: Record<string, number>;
    description: string;
  };
  corePatternStatement: string;
  majorAspectTensionCount: number;
  majorAspectHarmonyCount: number;
} {
  const ZODIAC_ELEMENT_MAP: Record<string, 'FIRE' | 'EARTH' | 'AIR' | 'WATER'> = {
    ARIES: 'FIRE', LEO: 'FIRE', SAGITTARIUS: 'FIRE',
    TAURUS: 'EARTH', VIRGO: 'EARTH', CAPRICORN: 'EARTH',
    GEMINI: 'AIR', LIBRA: 'AIR', AQUARIUS: 'AIR',
    CANCER: 'WATER', SCORPIO: 'WATER', PISCES: 'WATER',
  };

  const ZODIAC_MODALITY_MAP: Record<string, 'CARDINAL' | 'FIXED' | 'MUTABLE'> = {
    ARIES: 'CARDINAL', CANCER: 'CARDINAL', LIBRA: 'CARDINAL', CAPRICORN: 'CARDINAL',
    TAURUS: 'FIXED', LEO: 'FIXED', SCORPIO: 'FIXED', AQUARIUS: 'FIXED',
    GEMINI: 'MUTABLE', VIRGO: 'MUTABLE', SAGITTARIUS: 'MUTABLE', PISCES: 'MUTABLE',
  };

  const elemCounts: Record<'FIRE' | 'EARTH' | 'AIR' | 'WATER', number> = { FIRE: 0, EARTH: 0, AIR: 0, WATER: 0 };
  const modCounts: Record<'CARDINAL' | 'FIXED' | 'MUTABLE', number> = { CARDINAL: 0, FIXED: 0, MUTABLE: 0 };

  const corePlanets = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

  for (const pKey of corePlanets) {
    const pos = bodies[pKey] || bodies[pKey.toUpperCase()];
    if (pos && pos.sign) {
      const elem = ZODIAC_ELEMENT_MAP[pos.sign];
      const mod = ZODIAC_MODALITY_MAP[pos.sign];
      if (elem && elem in elemCounts) elemCounts[elem] = (elemCounts[elem] ?? 0) + 1;
      if (mod && mod in modCounts) modCounts[mod] = (modCounts[mod] ?? 0) + 1;
    }
  }

  // Sorted Elements
  const sortedElem = Object.entries(elemCounts).sort((a, b) => b[1] - a[1]);
  const dominantElem = sortedElem[0]?.[0] ?? 'FIRE';
  const deficientElem = sortedElem[sortedElem.length - 1]?.[0] ?? 'EARTH';

  const elemNamesVn: Record<string, string> = {
    FIRE: 'Lửa (Đam Mê, Hành Động, Nhiệt Huyết)',
    EARTH: 'Đất (Thực Tế, Tài Chính, Kỷ Luật Bền Vững)',
    AIR: 'Khí (Tư Duy, Giao Tiếp, Kết Nối Trí Tuệ)',
    WATER: 'Nước (Cảm Xúc, Trực Giác, Thấu Cảm Sâu Sắc)',
  };

  let elemDesc = '';
  let remedyAdvice = '';

  if (dominantElem === 'FIRE') {
    elemDesc = `Nguyên tố Lửa chiếm ưu thế (${elemCounts.FIRE} hành tinh): Bạn là người giàu nhiệt huyết, chủ động, thích dấn thân và hành động nhanh. Bạn truyền lửa mạnh mẽ cho xung quanh.`;
  } else if (dominantElem === 'EARTH') {
    elemDesc = `Nguyên tố Đất chiếm ưu thế (${elemCounts.EARTH} hành tinh): Bạn là người kiên định, thực tế, làm việc có phương pháp và rất có trách nhiệm. Bạn xuất sắc trong việc hiện thực hóa ý tưởng và quản trị tài chính.`;
  } else if (dominantElem === 'AIR') {
    elemDesc = `Nguyên tố Khí chiếm ưu thế (${elemCounts.AIR} hành tinh): Bạn có tư duy nhạy bén, hoạt ngôn, thích nghi nhanh và kết nối mạng lưới xuất sắc. Bạn tiếp cận cuộc sống bằng lăng kính khách quan.`;
  } else {
    elemDesc = `Nguyên tố Nước chiếm ưu thế (${elemCounts.WATER} hành tinh): Bạn có trực giác nhạy cảm phi thường, giàu lòng trắc ẩn, thấu cảm sâu sắc và luôn hướng về sự gắn kết tâm hồn chân thành.`;
  }

  if (deficientElem === 'EARTH') {
    remedyAdvice = 'Nguyên tố Đất thấp: Đôi khi bạn có nhiều ý tưởng bay bổng nhưng thiếu kiên nhẫn để hoàn thiện chi tiết. Cần rèn luyện thói quen ghi chép tài chính, lập thời gian biểu kỷ luật và đưa ra hạn chót cụ thể cho từng mục tiêu.';
  } else if (deficientElem === 'WATER') {
    remedyAdvice = 'Nguyên tố Nước thấp: Bạn có xu hướng lý trí hóa cảm xúc, đôi khi khó bộc lộ sự yếu mềm. Hãy cho phép mình được nghỉ ngơi, lắng nghe cảm xúc thật và kết nối ấm áp với người thân.';
  } else if (deficientElem === 'FIRE') {
    remedyAdvice = 'Nguyên tố Lửa thấp: Bạn có thể hơi thận trọng hoặc do dự trước cơ hội mới. Hãy rèn luyện thể thao thường xuyên, tập thói quen đưa ra quyết định nhanh hơn để kích hoạt nguồn năng lượng hành động.';
  } else {
    remedyAdvice = 'Nguyên tố Khí thấp: Đôi khi bạn hành động theo trực giác hoặc cảm xúc mà thiếu sự phân tích khách quan. Cần dừng lại thu thập thêm dữ liệu thực tế và lắng nghe góc nhìn phản biện trước khi kết luận.';
  }

  // Modality Summary
  const sortedMod = Object.entries(modCounts).sort((a, b) => b[1] - a[1]);
  const dominantMod = sortedMod[0]?.[0] ?? 'CARDINAL';
  const modNamesVn: Record<string, string> = {
    CARDINAL: 'Tiên Phong (Cardinal — Khởi Xướng & Mở Lối)',
    FIXED: 'Kiên Định (Fixed — Duy Trì & Bảo Vệ Thành Quả)',
    MUTABLE: 'Linh Hoạt (Mutable — Thích Ứng & Biến Chuyển Khéo Léo)',
  };

  let modDesc = '';
  if (dominantMod === 'CARDINAL') {
    modDesc = 'Tính chất Tiên Phong nổi trội: Bạn xuất sắc trong việc khởi xướng dự án mới, dám dấn thân mở đường và không thích ngồi chờ người khác giao việc.';
  } else if (dominantMod === 'FIXED') {
    modDesc = 'Tính chất Kiên Định nổi trội: Bạn có sức bền phi thường, trung thành tuyệt đối và kiên trì theo đuổi mục tiêu đến cùng, không gì có thể lay chuyển được.';
  } else {
    modDesc = 'Tính chất Linh Hoạt nổi trội: Bạn thích ứng hoàn cảnh cực nhanh, khéo léo dung hòa các luồng ý kiến và biết cách xoay xở uyển chuyển trong mọi tình huống.';
  }

  // Count Harmonious vs Tension Aspects
  let harmonyCount = 0;
  let tensionCount = 0;

  for (const asp of aspects) {
    const t = (asp.aspectType || asp.type || '').toUpperCase();
    if (['TRINE', 'SEXTILE', 'CONJUNCTION'].includes(t)) harmonyCount++;
    if (['SQUARE', 'OPPOSITION'].includes(t)) tensionCount++;
  }

  const dominantElemName = elemNamesVn[dominantElem] ?? 'Lửa';
  const dominantModName = modNamesVn[dominantMod] ?? 'Tiên Phong';
  const corePatternStatement = `Bản đồ sao của bạn có cấu trúc năng lượng độc đáo: Trụ cột dẫn dắt là ${dominantElemName.split(' (')[0]}, phong cách vận hành là ${dominantModName.split(' (')[0]}. Có ${harmonyCount} liên kết thuận hòa tạo thành tài năng thiên bẩm và ${tensionCount} trục cọ xát đóng vai trò là động lực bứt phá để trưởng thành.`;

  return {
    elementSummary: {
      dominant: dominantElem,
      dominantVn: elemNamesVn[dominantElem] ?? dominantElem,
      deficient: deficientElem,
      deficientVn: elemNamesVn[deficientElem] ?? deficientElem,
      counts: elemCounts,
      description: elemDesc,
      remedyAdvice,
    },
    modalitySummary: {
      dominant: dominantMod,
      dominantVn: modNamesVn[dominantMod] ?? dominantMod,
      counts: modCounts,
      description: modDesc,
    },
    corePatternStatement,
    majorAspectTensionCount: tensionCount,
    majorAspectHarmonyCount: harmonyCount,
  };
}
