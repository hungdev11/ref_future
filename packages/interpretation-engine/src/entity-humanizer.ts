/**
 * MYSTICOS — Entity Humanizer & Domain Concept Translator
 * Chuyển đổi toàn bộ mã code, tên biến thiên văn/bài/sao thành văn phong khảo cứu tiếng Việt thuần chất, trang nhã.
 * Tuyệt đối không để lộ mã code kỹ thuật ra người dùng cuối.
 */

// ════════════════════════════════════════════════════════════════════════════
// 1. TAROT ENTITIES (78 LÁ BÀI RWS)
// ════════════════════════════════════════════════════════════════════════════

export interface HumanizedEntity {
  code: string;
  nameVn: string;
  nameEn: string;
  title: string;
  coreMeaning: string;
  keywords: string[];
}

export const TAROT_CARD_HUMAN_MAP: Record<string, HumanizedEntity> = {
  // Major Arcana (22 lá)
  MAJOR_0: { code: 'MAJOR_0', nameVn: 'Chàng Khờ', nameEn: 'The Fool', title: '0 — Chàng Khờ (The Fool)', coreMeaning: 'Khởi đầu thuần khiết, bước nhảy vọt của niềm tin và tiềm năng vô hạn', keywords: ['khởi đầu mới', 'tự do', 'ngây thơ', 'tiềm năng'] },
  MAJOR_00_FOOL: { code: 'MAJOR_00_FOOL', nameVn: 'Chàng Khờ', nameEn: 'The Fool', title: '0 — Chàng Khờ (The Fool)', coreMeaning: 'Khởi đầu thuần khiết, bước nhảy vọt của niềm tin và tiềm năng vô hạn', keywords: ['khởi đầu mới', 'tự do', 'ngây thơ', 'tiềm năng'] },
  MAJOR_1: { code: 'MAJOR_1', nameVn: 'Pháp Sư', nameEn: 'The Magician', title: 'I — Pháp Sư (The Magician)', coreMeaning: 'Ý chí kiến tạo, năng lực hiện thực hóa ý niệm thành hành động cụ thể', keywords: ['ý chí', 'kỹ năng', 'kiến tạo', 'tập trung'] },
  MAJOR_01_MAGICIAN: { code: 'MAJOR_01_MAGICIAN', nameVn: 'Pháp Sư', nameEn: 'The Magician', title: 'I — Pháp Sư (The Magician)', coreMeaning: 'Ý chí kiến tạo, năng lực hiện thực hóa ý niệm thành hành động cụ thể', keywords: ['ý chí', 'kỹ năng', 'kiến tạo', 'tập trung'] },
  MAJOR_2: { code: 'MAJOR_2', nameVn: 'Nữ Giáo Hoàng', nameEn: 'The High Priestess', title: 'II — Nữ Giáo Hoàng (The High Priestess)', coreMeaning: 'Trực giác sâu thẳm, tĩnh lặng nội tâm và tri thức huyền bí', keywords: ['trực giác', 'bí ẩn', 'tĩnh lặng', 'nội tâm'] },
  MAJOR_02_HIGH_PRIESTESS: { code: 'MAJOR_02_HIGH_PRIESTESS', nameVn: 'Nữ Giáo Hoàng', nameEn: 'The High Priestess', title: 'II — Nữ Giáo Hoàng (The High Priestess)', coreMeaning: 'Trực giác sâu thẳm, tĩnh lặng nội tâm và tri thức huyền bí', keywords: ['trực giác', 'bí ẩn', 'tĩnh lặng', 'nội tâm'] },
  MAJOR_3: { code: 'MAJOR_3', nameVn: 'Nữ Hoàng', nameEn: 'The Empress', title: 'III — Nữ Hoàng (The Empress)', coreMeaning: 'Sự trù phú, nuôi dưỡng dịu dàng và năng lượng sáng tạo sinh sôi', keywords: ['trù phú', 'nuôi dưỡng', 'sinh sôi', 'tình thương'] },
  MAJOR_03_EMPRESS: { code: 'MAJOR_03_EMPRESS', nameVn: 'Nữ Hoàng', nameEn: 'The Empress', title: 'III — Nữ Hoàng (The Empress)', coreMeaning: 'Sự trù phú, nuôi dưỡng dịu dàng và năng lượng sáng tạo sinh sôi', keywords: ['trù phú', 'nuôi dưỡng', 'sinh sôi', 'tình thương'] },
  MAJOR_4: { code: 'MAJOR_4', nameVn: 'Hoàng Đế', nameEn: 'The Emperor', title: 'IV — Hoàng Đế (The Emperor)', coreMeaning: 'Cấu trúc vững chãi, uy quyền kỷ luật và khả năng thiết lập trật tự', keywords: ['kỷ luật', 'quyền uy', 'cấu trúc', 'ổn định'] },
  MAJOR_04_EMPEROR: { code: 'MAJOR_04_EMPEROR', nameVn: 'Hoàng Đế', nameEn: 'The Emperor', title: 'IV — Hoàng Đế (The Emperor)', coreMeaning: 'Cấu trúc vững chãi, uy quyền kỷ luật và khả năng thiết lập trật tự', keywords: ['kỷ luật', 'quyền uy', 'cấu trúc', 'ổn định'] },
  MAJOR_5: { code: 'MAJOR_5', nameVn: 'Thầy Giáo Hoàng', nameEn: 'The Hierophant', title: 'V — Thầy Giáo Hoàng (The Hierophant)', coreMeaning: 'Tri thức truyền thống, niềm tin đạo đức và người dẫn dắt tinh thần', keywords: ['truyền thống', 'đạo đức', 'dẫn dắt', 'học hỏi'] },
  MAJOR_05_HIEROPHANT: { code: 'MAJOR_05_HIEROPHANT', nameVn: 'Thầy Giáo Hoàng', nameEn: 'The Hierophant', title: 'V — Thầy Giáo Hoàng (The Hierophant)', coreMeaning: 'Tri thức truyền thống, niềm tin đạo đức và người dẫn dắt tinh thần', keywords: ['truyền thống', 'đạo đức', 'dẫn dắt', 'học hỏi'] },
  MAJOR_6: { code: 'MAJOR_6', nameVn: 'Người Tình', nameEn: 'The Lovers', title: 'VI — Người Tình (The Lovers)', coreMeaning: 'Sự hòa hợp tâm hồn, hôn phối thiêng liêng và lựa chọn giá trị sống', keywords: ['hòa hợp', 'lựa chọn', 'gắn kết', 'chân thành'] },
  MAJOR_06_LOVERS: { code: 'MAJOR_06_LOVERS', nameVn: 'Người Tình', nameEn: 'The Lovers', title: 'VI — Người Tình (The Lovers)', coreMeaning: 'Sự hòa hợp tâm hồn, hôn phối thiêng liêng và lựa chọn giá trị sống', keywords: ['hòa hợp', 'lựa chọn', 'gắn kết', 'chân thành'] },
  MAJOR_7: { code: 'MAJOR_7', nameVn: 'Cỗ Xe', nameEn: 'The Chariot', title: 'VII — Cỗ Xe (The Chariot)', coreMeaning: 'Ý chí kiên cường kiểm soát các nguồn lực đối lập để bứt phá tiến lên', keywords: ['ý chí', 'chiến thắng', 'kiểm soát', 'tiến bước'] },
  MAJOR_07_CHARIOT: { code: 'MAJOR_07_CHARIOT', nameVn: 'Cỗ Xe', nameEn: 'The Chariot', title: 'VII — Cỗ Xe (The Chariot)', coreMeaning: 'Ý chí kiên cường kiểm soát các nguồn lực đối lập để bứt phá tiến lên', keywords: ['ý chí', 'chiến thắng', 'kiểm soát', 'tiến bước'] },
  MAJOR_8: { code: 'MAJOR_8', nameVn: 'Sức Mạnh', nameEn: 'Strength', title: 'VIII — Sức Mạnh (Strength)', coreMeaning: 'Lòng trắc ẩn thuần phục bản năng, sức mạnh nội tại điềm đạm kiên nhẫn', keywords: ['nội lực', 'nhẫn nại', 'thuần phục', 'bao dung'] },
  MAJOR_08_STRENGTH: { code: 'MAJOR_08_STRENGTH', nameVn: 'Sức Mạnh', nameEn: 'Strength', title: 'VIII — Sức Mạnh (Strength)', coreMeaning: 'Lòng trắc ẩn thuần phục bản năng, sức mạnh nội tại điềm đạm kiên nhẫn', keywords: ['nội lực', 'nhẫn nại', 'thuần phục', 'bao dung'] },
  MAJOR_9: { code: 'MAJOR_9', nameVn: 'Ẩn Sĩ', nameEn: 'The Hermit', title: 'IX — Ẩn Sĩ (The Hermit)', coreMeaning: 'Khoảng lặng soi chiếu nội tâm, tìm kiếm chân lý trong sự tĩnh tại', keywords: ['chiêm nghiệm', 'soi sáng', 'tĩnh tại', 'chân lý'] },
  MAJOR_09_HERMIT: { code: 'MAJOR_09_HERMIT', nameVn: 'Ẩn Sĩ', nameEn: 'The Hermit', title: 'IX — Ẩn Sĩ (The Hermit)', coreMeaning: 'Khoảng lặng soi chiếu nội tâm, tìm kiếm chân lý trong sự tĩnh tại', keywords: ['chiêm nghiệm', 'soi sáng', 'tĩnh tại', 'chân lý'] },
  MAJOR_10: { code: 'MAJOR_10', nameVn: 'Bánh Xe Số Phận', nameEn: 'Wheel of Fortune', title: 'X — Bánh Xe Số Phận (Wheel of Fortune)', coreMeaning: 'Bước ngoặt vận mệnh, chu kỳ biến chuyển tất yếu và cơ hội đổi thay', keywords: ['chu kỳ', 'bước ngoặt', 'vận hội', 'thay đổi'] },
  MAJOR_10_WHEEL_OF_FORTUNE: { code: 'MAJOR_10_WHEEL_OF_FORTUNE', nameVn: 'Bánh Xe Số Phận', nameEn: 'Wheel of Fortune', title: 'X — Bánh Xe Số Phận (Wheel of Fortune)', coreMeaning: 'Bước ngoặt vận mệnh, chu kỳ biến chuyển tất yếu và cơ hội đổi thay', keywords: ['chu kỳ', 'bước ngoặt', 'vận hội', 'thay đổi'] },
  MAJOR_11: { code: 'MAJOR_11', nameVn: 'Công Lý', nameEn: 'Justice', title: 'XI — Công Lý (Justice)', coreMeaning: 'Sự thật khách quan, luật nhân quả rõ ràng và quyết định công bằng', keywords: ['công lý', 'sự thật', 'nhân quả', 'cân bằng'] },
  MAJOR_11_JUSTICE: { code: 'MAJOR_11_JUSTICE', nameVn: 'Công Lý', nameEn: 'Justice', title: 'XI — Công Lý (Justice)', coreMeaning: 'Sự thật khách quan, luật nhân quả rõ ràng và quyết định công bằng', keywords: ['công lý', 'sự thật', 'nhân quả', 'cân bằng'] },
  MAJOR_12: { code: 'MAJOR_12', nameVn: 'Người Treo Ngược', nameEn: 'The Hanged Man', title: 'XII — Người Treo Ngược (The Hanged Man)', coreMeaning: 'Góc nhìn hoán đổi, sự buông bỏ có chủ đích để ngộ ra chân giá trị', keywords: ['buông bỏ', 'góc nhìn mới', 'hy sinh', 'chiêm nghiệm'] },
  MAJOR_12_HANGED_MAN: { code: 'MAJOR_12_HANGED_MAN', nameVn: 'Người Treo Ngược', nameEn: 'The Hanged Man', title: 'XII — Người Treo Ngược (The Hanged Man)', coreMeaning: 'Góc nhìn hoán đổi, sự buông bỏ có chủ đích để ngộ ra chân giá trị', keywords: ['buông bỏ', 'góc nhìn mới', 'hy sinh', 'chiêm nghiệm'] },
  MAJOR_13: { code: 'MAJOR_13', nameVn: 'Cái Chết', nameEn: 'Death', title: 'XIII — Cái Chết (Death)', coreMeaning: 'Chấm dứt dứt khoát chu kỳ cũ để nhường chỗ cho tiến trình tái sinh', keywords: ['chuyển hóa', 'kết thúc', 'tái sinh', 'đổi mới'] },
  MAJOR_13_DEATH: { code: 'MAJOR_13_DEATH', nameVn: 'Cái Chết', nameEn: 'Death', title: 'XIII — Cái Chết (Death)', coreMeaning: 'Chấm dứt dứt khoát chu kỳ cũ để nhường chỗ cho tiến trình tái sinh', keywords: ['chuyển hóa', 'kết thúc', 'tái sinh', 'đổi mới'] },
  MAJOR_14: { code: 'MAJOR_14', nameVn: 'Tiết Chế', nameEn: 'Temperance', title: 'XIV — Tiết Chế (Temperance)', coreMeaning: 'Hòa giải xung khắc, dung hợp dị biệt và chữa lành bằng sự điều độ', keywords: ['hài hòa', 'tiết chế', 'dung hợp', 'chữa lành'] },
  MAJOR_14_TEMPERANCE: { code: 'MAJOR_14_TEMPERANCE', nameVn: 'Tiết Chế', nameEn: 'Temperance', title: 'XIV — Tiết Chế (Temperance)', coreMeaning: 'Hòa giải xung khắc, dung hợp dị biệt và chữa lành bằng sự điều độ', keywords: ['hài hòa', 'tiết chế', 'dung hợp', 'chữa lành'] },
  MAJOR_15: { code: 'MAJOR_15', nameVn: 'Ác Quỷ', nameEn: 'The Devil', title: 'XV — Ác Quỷ (The Devil)', coreMeaning: 'Ràng buộc vật chất, cám dỗ ảo tưởng và những nỗi sợ trói buộc nội tâm', keywords: ['ràng buộc', 'cám dỗ', 'ảo tưởng', 'thức tỉnh'] },
  MAJOR_15_DEVIL: { code: 'MAJOR_15_DEVIL', nameVn: 'Ác Quỷ', nameEn: 'The Devil', title: 'XV — Ác Quỷ (The Devil)', coreMeaning: 'Ràng buộc vật chất, cám dỗ ảo tưởng và những nỗi sợ trói buộc nội tâm', keywords: ['ràng buộc', 'cám dỗ', 'ảo tưởng', 'thức tỉnh'] },
  MAJOR_16: { code: 'MAJOR_16', nameVn: 'Tòa Tháp', nameEn: 'The Tower', title: 'XVI — Tòa Tháp (The Tower)', coreMeaning: 'Sụp đổ bất ngờ của ảo tưởng, sự thanh lọc quyết liệt để giải phóng sự thật', keywords: ['sụp đổ', 'thức tỉnh', 'giải phóng', 'đột biến'] },
  MAJOR_16_TOWER: { code: 'MAJOR_16_TOWER', nameVn: 'Tòa Tháp', nameEn: 'The Tower', title: 'XVI — Tòa Tháp (The Tower)', coreMeaning: 'Sụp đổ bất ngờ của ảo tưởng, sự thanh lọc quyết liệt để giải phóng sự thật', keywords: ['sụp đổ', 'thức tỉnh', 'giải phóng', 'đột biến'] },
  MAJOR_17: { code: 'MAJOR_17', nameVn: 'Ngôi Sao', nameEn: 'The Star', title: 'XVII — Ngôi Sao (The Star)', coreMeaning: 'Niềm hy vọng thanh khiết, sự chỉ dẫn tươi sáng và niềm tin chữa lành', keywords: ['hy vọng', 'niềm tin', 'thanh thản', 'nguồn cảm hứng'] },
  MAJOR_17_STAR: { code: 'MAJOR_17_STAR', nameVn: 'Ngôi Sao', nameEn: 'The Star', title: 'XVII — Ngôi Sao (The Star)', coreMeaning: 'Niềm hy vọng thanh khiết, sự chỉ dẫn tươi sáng và niềm tin chữa lành', keywords: ['hy vọng', 'niềm tin', 'thanh thản', 'nguồn cảm hứng'] },
  MAJOR_18: { code: 'MAJOR_18', nameVn: 'Mặt Trăng', nameEn: 'The Moon', title: 'XVIII — Mặt Trăng (The Moon)', coreMeaning: 'Ảo ảnh mơ hồ, bất an tiềm thức đòi hỏi sự lắng dịu để nhìn thấu', keywords: ['ảo ảnh', 'tiềm thức', 'bất an', 'trực giác sâu'] },
  MAJOR_18_MOON: { code: 'MAJOR_18_MOON', nameVn: 'Mặt Trăng', nameEn: 'The Moon', title: 'XVIII — Mặt Trăng (The Moon)', coreMeaning: 'Ảo ảnh mơ hồ, bất an tiềm thức đòi hỏi sự lắng dịu để nhìn thấu', keywords: ['ảo ảnh', 'tiềm thức', 'bất an', 'trực giác sâu'] },
  MAJOR_19: { code: 'MAJOR_19', nameVn: 'Mặt Trời', nameEn: 'The Sun', title: 'XIX — Mặt Trời (The Sun)', coreMeaning: 'Sức sống rực rỡ, niềm hân hoan thành công và sự minh bạch tỏ tường', keywords: ['rực rỡ', 'thành công', 'niềm vui', 'sức sống'] },
  MAJOR_19_SUN: { code: 'MAJOR_19_SUN', nameVn: 'Mặt Trời', nameEn: 'The Sun', title: 'XIX — Mặt Trời (The Sun)', coreMeaning: 'Sức sống rực rỡ, niềm hân hoan thành công và sự minh bạch tỏ tường', keywords: ['rực rỡ', 'thành công', 'niềm vui', 'sức sống'] },
  MAJOR_20: { code: 'MAJOR_20', nameVn: 'Phán Xét', nameEn: 'Judgement', title: 'XX — Phán Xét (Judgement)', coreMeaning: 'Tiếng gọi thức tỉnh, sự tha thứ bản thân và nâng tầm nhận thức', keywords: ['thức tỉnh', 'tiếng gọi', 'tái sinh', 'chuyển biến'] },
  MAJOR_20_JUDGEMENT: { code: 'MAJOR_20_JUDGEMENT', nameVn: 'Phán Xét', nameEn: 'Judgement', title: 'XX — Phán Xét (Judgement)', coreMeaning: 'Tiếng gọi thức tỉnh, sự tha thứ bản thân và nâng tầm nhận thức', keywords: ['thức tỉnh', 'tiếng gọi', 'tái sinh', 'chuyển biến'] },
  MAJOR_21: { code: 'MAJOR_21', nameVn: 'Thế Giới', nameEn: 'The World', title: 'XXI — Thế Giới (The World)', coreMeaning: 'Sự viên thành trọn vẹn, hoàn tất chu kỳ vẻ vang và hội nhập hài hòa', keywords: ['viên thành', 'trọn vẹn', 'thành tựu', 'chu kỳ mới'] },
  MAJOR_21_WORLD: { code: 'MAJOR_21_WORLD', nameVn: 'Thế Giới', nameEn: 'The World', title: 'XXI — Thế Giới (The World)', coreMeaning: 'Sự viên thành trọn vẹn, hoàn tất chu kỳ vẻ vang và hội nhập hài hòa', keywords: ['viên thành', 'trọn vẹn', 'thành tựu', 'chu kỳ mới'] },

  // Minor Arcana (Bộ Tiền - Pentacles)
  WANDS_01_ACE: { code: 'WANDS_01_ACE', nameVn: 'Ách Gậy', nameEn: 'Ace of Wands', title: 'Ách Gậy (Ace of Wands)', coreMeaning: 'Ngọn lửa nhiệt huyết nguyên bản, cảm hứng dấn thân khởi xướng', keywords: ['cảm hứng', 'hành động', 'khởi đầu', 'đam mê'] },
  WANDS_02_2: { code: 'WANDS_02_2', nameVn: 'Hai Gậy', nameEn: 'Two of Wands', title: 'Hai Gậy (2 of Wands)', coreMeaning: 'Hoạch định chiến lược tầm xa, sẵn sàng bước ra khỏi vùng an toàn', keywords: ['tầm nhìn', 'kế hoạch', 'lựa chọn', 'mở rộng'] },
  WANDS_03_3: { code: 'WANDS_03_3', nameVn: 'Ba Gậy', nameEn: 'Three of Wands', title: 'Ba Gậy (3 of Wands)', coreMeaning: 'Tầm nhìn vươn xa, đón nhận thành quả bước đầu và mở rộng hợp tác', keywords: ['vươn xa', 'cơ hội', 'hợp tác', 'tiến triển'] },
  WANDS_04_4: { code: 'WANDS_04_4', nameVn: 'Bốn Gậy', nameEn: 'Four of Wands', title: 'Bốn Gậy (4 of Wands)', coreMeaning: 'Sự ổn định vững chắc, niềm hân hoan ăn mừng thành tựu ban đầu', keywords: ['an cư', 'ổn định', 'ăn mừng', 'hòa thuận'] },
  WANDS_05_5: { code: 'WANDS_05_5', nameVn: 'Năm Gậy', nameEn: 'Five of Wands', title: 'Năm Gậy (5 of Wands)', coreMeaning: 'Cạnh tranh cọ xát, xung đột ý kiến và thử thách rèn luyện bản lĩnh', keywords: ['cạnh tranh', 'tranh luận', 'cọ xát', 'rèn luyện'] },
  WANDS_06_6: { code: 'WANDS_06_6', nameVn: 'Sáu Gậy', nameEn: 'Six of Wands', title: 'Sáu Gậy (6 of Wands)', coreMeaning: 'Chiến thắng vẻ vang, sự ghi nhận xứng đáng và vị thế dẫn đầu', keywords: ['thành công', 'vinh danh', 'dẫn đầu', 'tự tin'] },
  WANDS_07_7: { code: 'WANDS_07_7', nameVn: 'Bảy Gậy', nameEn: 'Seven of Wands', title: 'Bảy Gậy (7 of Wands)', coreMeaning: 'Kiên quyết giữ vững lập trường, bảo vệ thành quả trước áp lực', keywords: ['kiên định', 'bảo vệ', 'vượt khó', 'bản lĩnh'] },
  WANDS_08_8: { code: 'WANDS_08_8', nameVn: 'Tám Gậy', nameEn: 'Eight of Wands', title: 'Tám Gậy (8 of Wands)', coreMeaning: 'Tốc độ biến chuyển nhanh chóng, tin tức dồn dập và hành động mau lẹ', keywords: ['tốc độ', 'thông điệp', 'chuyển biến', 'dứt khoát'] },
  WANDS_09_9: { code: 'WANDS_09_9', nameVn: 'Chín Gậy', nameEn: 'Nine of Wands', title: 'Chín Gậy (9 of Wands)', coreMeaning: 'Sức bền bỉ kiên gan, phòng thủ cẩn trọng sau nhiều chặng thử thách', keywords: ['bền bỉ', 'phòng thủ', 'cảnh giác', 'vững tâm'] },
  WANDS_10_10: { code: 'WANDS_10_10', nameVn: 'Mười Gậy', nameEn: 'Ten of Wands', title: 'Mười Gậy (10 of Wands)', coreMeaning: 'Gánh nặng trách nhiệm quá tải, cần học cách phân bổ và buông bỏ bớt', keywords: ['quá tải', 'trách nhiệm', 'áp lực', 'san sẻ'] },
  WANDS_11_PAGE: { code: 'WANDS_11_PAGE', nameVn: 'Tiểu Đồng Gậy', nameEn: 'Page of Wands', title: 'Tiểu Đồng Gậy (Page of Wands)', coreMeaning: 'Người đưa tin nhiệt huyết, niềm háo hức khám phá lĩnh vực mới', keywords: ['háo hức', 'tin tức mới', 'nhiệt huyết', 'học hỏi'] },
  WANDS_12_KNIGHT: { code: 'WANDS_12_KNIGHT', nameVn: 'Hiệp Sĩ Gậy', nameEn: 'Knight of Wands', title: 'Hiệp Sĩ Gậy (Knight of Wands)', coreMeaning: 'Hành động quả cảm thần tốc, năng lượng phiêu lưu nhưng cần tránh bốc đồng', keywords: ['hành động nhanh', 'quả cảm', 'nhiệt thành', 'phiêu lưu'] },
  WANDS_13_QUEEN: { code: 'WANDS_13_QUEEN', nameVn: 'Hoàng Hậu Gậy', nameEn: 'Queen of Wands', title: 'Hoàng Hậu Gậy (Queen of Wands)', coreMeaning: 'Sự tự tin quyến rũ, lòng nhiệt thành ấm áp và năng lực truyền lửa', keywords: ['tự tin', 'quyến rũ', 'ấm áp', 'độc lập'] },
  WANDS_14_KING: { code: 'WANDS_14_KING', nameVn: 'Vua Gậy', nameEn: 'King of Wands', title: 'Vua Gậy (King of Wands)', coreMeaning: 'Nhà lãnh đạo có tầm nhìn xa, năng lực chỉ huy quyết đoán và truyền cảm hứng', keywords: ['lãnh đạo', 'tầm nhìn', 'uy quyền', 'kiến tạo'] },

  CUPS_01_ACE: { code: 'CUPS_01_ACE', nameVn: 'Ách Ly', nameEn: 'Ace of Cups', title: 'Ách Ly (Ace of Cups)', coreMeaning: 'Dòng chảy tình cảm thuần khiết tuôn trào, mở lòng đón nhận tình yêu', keywords: ['tình yêu', 'cảm xúc', 'chữa lành', 'mở lòng'] },
  CUPS_02_2: { code: 'CUPS_02_2', nameVn: 'Hai Ly', nameEn: 'Two of Cups', title: 'Hai Ly (2 of Cups)', coreMeaning: 'Sự đồng điệu gắn kết tri kỷ, thấu cảm và tôn trọng lẫn nhau', keywords: ['tri kỷ', 'gắn kết', 'đồng điệu', 'tương hỗ'] },
  CUPS_03_3: { code: 'CUPS_03_3', nameVn: 'Ba Ly', nameEn: 'Three of Cups', title: 'Ba Ly (3 of Cups)', coreMeaning: 'Tình bạn hòa hợp, niềm vui sẻ chia trong cộng đồng ấm áp', keywords: ['tình bạn', 'niềm vui', 'sẻ chia', 'đoàn tụ'] },
  CUPS_04_4: { code: 'CUPS_04_4', nameVn: 'Bốn Ly', nameEn: 'Four of Cups', title: 'Bốn Ly (4 of Cups)', coreMeaning: 'Tâm lý thờ ơ hờ hững, đóng chặt lòng trước những cơ hội mới mở ra', keywords: ['thờ ơ', 'lắng đọng', 'bỏ lỡ cơ hội', 'nội tâm'] },
  CUPS_05_5: { code: 'CUPS_05_5', nameVn: 'Năm Ly', nameEn: 'Five of Cups', title: 'Năm Ly (5 of Cups)', coreMeaning: 'Nỗi buồn tiếc nuối quá khứ, cần quay đầu nhìn nhận những giá trị còn lại', keywords: ['tiếc nuối', 'mất mát', 'chữa lành', 'chấp nhận'] },
  CUPS_06_6: { code: 'CUPS_06_6', nameVn: 'Sáu Ly', nameEn: 'Six of Cups', title: 'Sáu Ly (6 of Cups)', coreMeaning: 'Ký ức ngọt ngào xưa cũ, sự ngây thơ thiện lương và món quà hoài niệm', keywords: ['hoài niệm', 'ngây thơ', 'quà tặng', 'gắn bó'] },
  CUPS_07_7: { code: 'CUPS_07_7', nameVn: 'Bảy Ly', nameEn: 'Seven of Cups', title: 'Bảy Ly (7 of Cups)', coreMeaning: 'Ảo mộng phù hoa, đứng trước quá nhiều lựa chọn cần tỉnh táo phân định', keywords: ['ảo mộng', 'lựa chọn', 'tỉnh táo', 'phân định'] },
  CUPS_08_8: { code: 'CUPS_08_8', nameVn: 'Tám Ly', nameEn: 'Eight of Cups', title: 'Tám Ly (8 of Cups)', coreMeaning: 'Dũng cảm quay lưng bước đi khỏi điều không còn nuôi dưỡng tâm hồn', keywords: ['buông bỏ', 'lên đường', 'tìm kiếm chân lý', 'chuyển hướng'] },
  CUPS_09_9: { code: 'CUPS_09_9', nameVn: 'Chín Ly', nameEn: 'Nine of Cups', title: 'Chín Ly (9 of Cups)', coreMeaning: 'Sự thỏa mãn ước nguyện, niềm an vui tự tại về tinh thần lẫn vật chất', keywords: ['ước nguyện', 'thỏa mãn', 'an vui', 'hài lòng'] },
  CUPS_10_10: { code: 'CUPS_10_10', nameVn: 'Mười Ly', nameEn: 'Ten of Cups', title: 'Mười Ly (10 of Cups)', coreMeaning: 'Hạnh phúc viên mãn gia đình, tình yêu bền chặt và sự bình an trọn vẹn', keywords: ['viên mãn', 'gia đình', 'bình an', 'hạnh phúc'] },
  CUPS_11_PAGE: { code: 'CUPS_11_PAGE', nameVn: 'Tiểu Đồng Ly', nameEn: 'Page of Cups', title: 'Tiểu Đồng Ly (Page of Cups)', coreMeaning: 'Thông điệp cảm xúc bất ngờ, sự mộng mơ nhạy cảm và trực giác thuần hậu', keywords: ['thông điệp', 'trực giác', 'nhạy cảm', 'mộng mơ'] },
  CUPS_12_KNIGHT: { code: 'CUPS_12_KNIGHT', nameVn: 'Hiệp Sĩ Ly', nameEn: 'Knight of Cups', title: 'Hiệp Sĩ Ly (Knight of Cups)', coreMeaning: 'Sứ giả lãng mạn, lời mời gọi chân thành theo đuổi lý tưởng trái tim', keywords: ['lãng mạn', 'lời mời', 'chân thành', 'nghệ thuật'] },
  CUPS_13_QUEEN: { code: 'CUPS_13_QUEEN', nameVn: 'Hoàng Hậu Ly', nameEn: 'Queen of Cups', title: 'Hoàng Hậu Ly (Queen of Cups)', coreMeaning: 'Trái tim thấu cảm bao la, khả năng xoa dịu tổn thương và trực giác nhạy bén', keywords: ['thấu cảm', 'dịu dàng', 'chữa lành', 'trực giác'] },
  CUPS_14_KING: { code: 'CUPS_14_KING', nameVn: 'Vua Ly', nameEn: 'King of Cups', title: 'Vua Ly (King of Cups)', coreMeaning: 'Sự điềm tĩnh làm chủ cảm xúc, phong thái bao dung và trí tuệ thấu suốt', keywords: ['điềm tĩnh', 'làm chủ cảm xúc', 'bao dung', 'cân bằng'] },

  SWORDS_01_ACE: { code: 'SWORDS_01_ACE', nameVn: 'Ách Kiếm', nameEn: 'Ace of Swords', title: 'Ách Kiếm (Ace of Swords)', coreMeaning: 'Sự thật sắc bén tỏ tường, đột phá nhận thức và phán đoán dứt khoát', keywords: ['sự thật', 'minh bạch', 'đột phá', 'quyết đoán'] },
  SWORDS_02_2: { code: 'SWORDS_02_2', nameVn: 'Hai Kiếm', nameEn: 'Two of Swords', title: 'Hai Kiếm (2 of Swords)', coreMeaning: 'Tình thế bế tắc tiến thoái lưỡng nan, cần mở lòng dũng cảm đối diện sự thật', keywords: ['lưỡng lự', 'bế tắc', 'phòng thủ', 'đối diện sự thật'] },
  SWORDS_03_3: { code: 'SWORDS_03_3', nameVn: 'Ba Kiếm', nameEn: 'Three of Swords', title: 'Ba Kiếm (3 of Swords)', coreMeaning: 'Nỗi đau tan vỡ, sự thanh lọc đau đớn để rũ bỏ ảo tưởng và trưởng thành', keywords: ['tổn thương', 'thanh lọc', 'chấp nhận', 'vượt qua'] },
  SWORDS_04_4: { code: 'SWORDS_04_4', nameVn: 'Bốn Kiếm', nameEn: 'Four of Swords', title: 'Bốn Kiếm (4 of Swords)', coreMeaning: 'Giai đoạn tĩnh dưỡng phục hồi tinh thần, tạm ngưng tranh đấu để tái tạo sức lực', keywords: ['nghỉ ngơi', 'tĩnh dưỡng', 'phục hồi', 'tạm ngưng'] },
  SWORDS_05_5: { code: 'SWORDS_05_5', nameVn: 'Năm Kiếm', nameEn: 'Five of Swords', title: 'Năm Kiếm (5 of Swords)', coreMeaning: 'Chiến thắng cay đắng nhưng mất mát nhiều, cần học cách buông bỏ cái tôi', keywords: ['bất hòa', 'cái tôi', 'chiến thắng cay đắng', 'hòa giải'] },
  SWORDS_06_6: { code: 'SWORDS_06_6', nameVn: 'Sáu Kiếm', nameEn: 'Six of Swords', title: 'Sáu Kiếm (6 of Swords)', coreMeaning: 'Vượt qua sóng gió tìm về bến đỗ bình an, tiến trình chuyển biến tích cực', keywords: ['vượt khó', 'chuyển dịch', 'bình an', 'hồi phục'] },
  SWORDS_07_7: { code: 'SWORDS_07_7', nameVn: 'Bảy Kiếm', nameEn: 'Seven of Swords', title: 'Bảy Kiếm (7 of Swords)', coreMeaning: 'Chiến thuật khéo léo nhưng cần thận trọng tính minh bạch, tránh mờ ám', keywords: ['chiến thuật', 'thận trọng', 'minh bạch', 'ứng biến'] },
  SWORDS_08_8: { code: 'SWORDS_08_8', nameVn: 'Tám Kiếm', nameEn: 'Eight of Swords', title: 'Tám Kiếm (8 of Swords)', coreMeaning: 'Cảm giác bị trói buộc do chính suy nghĩ tự giới hạn, chiếc lồng tâm lý', keywords: ['tự giới hạn', 'ảo tưởng bế tắc', 'tháo gỡ', 'tự chủ'] },
  SWORDS_09_9: { code: 'SWORDS_09_9', nameVn: 'Chín Kiếm', nameEn: 'Nine of Swords', title: 'Chín Kiếm (9 of Swords)', coreMeaning: 'Nỗi lo âu dằn vặt đêm khuya, cần nhìn nhận vấn đề dưới ánh sáng khách quan', keywords: ['lo âu', 'mất ngủ', 'dằn vặt', 'giải tỏa'] },
  SWORDS_10_10: { code: 'SWORDS_10_10', nameVn: 'Mười Kiếm', nameEn: 'Ten of Swords', title: 'Mười Kiếm (10 of Swords)', coreMeaning: 'Đáy sâu của thử thách đã qua, bình minh mới chuẩn bị bắt đầu', keywords: ['kết thúc chu kỳ', 'chạm đáy', 'bình minh mới', 'tái thiết'] },
  SWORDS_11_PAGE: { code: 'SWORDS_11_PAGE', nameVn: 'Tiểu Đồng Kiếm', nameEn: 'Page of Swords', title: 'Tiểu Đồng Kiếm (Page of Swords)', coreMeaning: 'Tư duy sắc sảo, tò mò tìm hiểu sự thật và bảo vệ chính kiến', keywords: ['sắc sảo', 'tò mò', 'quan sát', 'ngay thẳng'] },
  SWORDS_12_KNIGHT: { code: 'SWORDS_12_KNIGHT', nameVn: 'Hiệp Sĩ Kiếm', nameEn: 'Knight of Swords', title: 'Hiệp Sĩ Kiếm (Knight of Swords)', coreMeaning: 'Tiến công quyết liệt thẳng thắn, trí tuệ sắc bén nhưng cần tránh khắc nghiệt', keywords: ['quyết liệt', 'thẳng thắn', 'sắc bén', 'tốc độ'] },
  SWORDS_13_QUEEN: { code: 'SWORDS_13_QUEEN', nameVn: 'Hoàng Hậu Kiếm', nameEn: 'Queen of Swords', title: 'Hoàng Hậu Kiếm (Queen of Swords)', coreMeaning: 'Trí tuệ minh triết độc lập, nhìn thấu bản chất vấn đề mà không vướng thiên kiến', keywords: ['minh triết', 'độc lập', 'công tâm', 'sắc sảo'] },
  SWORDS_14_KING: { code: 'SWORDS_14_KING', nameVn: 'Vua Kiếm', nameEn: 'King of Swords', title: 'Vua Kiếm (King of Swords)', coreMeaning: 'Phán quyết công bằng chuẩn mực, năng lực quản trị dựa trên luật lệ và chân lý', keywords: ['công bằng', 'chuẩn mực', 'chân lý', 'uy nghiêm'] },

  PENTACLES_01_ACE: { code: 'PENTACLES_01_ACE', nameVn: 'Ách Tiền', nameEn: 'Ace of Pentacles', title: 'Ách Tiền (Ace of Pentacles)', coreMeaning: 'Hạt giống cơ hội vật chất vững chắc, khởi đầu thuận lợi cho tài chính sự nghiệp', keywords: ['cơ hội tài chính', 'nền tảng', 'thực tiễn', 'thịnh vượng'] },
  PENTACLES_02_2: { code: 'PENTACLES_02_2', nameVn: 'Hai Tiền', nameEn: 'Two of Pentacles', title: 'Hai Tiền (2 of Pentacles)', coreMeaning: 'Nghệ thuật thích ứng linh hoạt, khéo léo cân bằng nhiều dòng chảy tài nguyên', keywords: ['thích ứng', 'cân bằng', 'linh hoạt', 'nhịp nhàng'] },
  PENTACLES_03_3: { code: 'PENTACLES_03_3', nameVn: 'Ba Tiền', nameEn: 'Three of Pentacles', title: 'Ba Tiền (3 of Pentacles)', coreMeaning: 'Hợp tác chuyên môn chuyên nghiệp, tay nghề vững vàng và xây dựng nền tảng', keywords: ['hợp tác', 'chuyên môn', 'kỹ năng', 'xây dựng'] },
  PENTACLES_04_4: { code: 'PENTACLES_04_4', nameVn: 'Bốn Tiền', nameEn: 'Four of Pentacles', title: 'Bốn Tiền (4 of Pentacles)', coreMeaning: 'Tích lũy bảo toàn an toàn tài chính, cần tránh tâm lý bo bo giữ của thái quá', keywords: ['tích lũy', 'bảo toàn', 'an toàn', 'thận trọng'] },
  PENTACLES_05_5: { code: 'PENTACLES_05_5', nameVn: 'Năm Tiền', nameEn: 'Five of Pentacles', title: 'Năm Tiền (5 of Pentacles)', coreMeaning: 'Giai đoạn khó khăn thiếu thốn vật chất, cần nhớ luôn có sự nâng đỡ ở gần bên', keywords: ['thử thách', 'thiếu thốn', 'tìm kiếm trợ lực', 'kiên trì'] },
  PENTACLES_06_6: { code: 'PENTACLES_06_6', nameVn: 'Sáu Tiền', nameEn: 'Six of Pentacles', title: 'Sáu Tiền (6 of Pentacles)', coreMeaning: 'Sự chia sẻ nguồn lực công bằng, trao đi và nhận lại trong dòng chảy thịnh vượng', keywords: ['hào phóng', 'chia sẻ', 'công bằng', 'tương trợ'] },
  PENTACLES_07_7: { code: 'PENTACLES_07_7', nameVn: 'Bảy Tiền', nameEn: 'Seven of Pentacles', title: 'Bảy Tiền (7 of Pentacles)', coreMeaning: 'Khoảng lặng thẩm định thành quả sau thời gian vun trồng kiên trì', keywords: ['thẩm định', 'vun trồng', 'kiên nhẫn', 'đánh giá'] },
  PENTACLES_08_8: { code: 'PENTACLES_08_8', nameVn: 'Tám Tiền', nameEn: 'Eight of Pentacles', title: 'Tám Tiền (8 of Pentacles)', coreMeaning: 'Sự mẫn cán tỉ mỉ tôi luyện kỹ năng, chuyên cần tạo dựng giá trị thực chất', keywords: ['chuyên cần', 'mẫn cán', 'tinh hoa', 'học nghề'] },
  PENTACLES_09_9: { code: 'PENTACLES_09_9', nameVn: 'Chín Tiền', nameEn: 'Nine of Pentacles', title: 'Chín Tiền (9 of Pentacles)', coreMeaning: 'Thành quả an nhàn tự chủ, thưởng ngoạn cuộc sống từ nỗ lực độc lập', keywords: ['tự chủ', 'thịnh vượng', 'an nhàn', 'thanh tao'] },
  PENTACLES_10_10: { code: 'PENTACLES_10_10', nameVn: 'Mười Tiền', nameEn: 'Ten of Pentacles', title: 'Mười Tiền (10 of Pentacles)', coreMeaning: 'Di sản vững bền truyền đời, thịnh vượng gia tộc và sự bảo đảm lâu dài', keywords: ['di sản', 'thịnh vượng', 'gia tộc', 'bền vững'] },
  PENTACLES_11_PAGE: { code: 'PENTACLES_11_PAGE', nameVn: 'Tiểu Đồng Tiền', nameEn: 'Page of Pentacles', title: 'Tiểu Đồng Tiền (Page of Pentacles)', coreMeaning: 'Khởi đầu học hỏi thực tiễn, thái độ nghiêm túc trước các cơ hội nghề nghiệp', keywords: ['học hỏi', 'cầu thị', 'thực tế', 'cơ hội mới'] },
  PENTACLES_12_KNIGHT: { code: 'PENTACLES_12_KNIGHT', nameVn: 'Hiệp Sĩ Tiền', nameEn: 'Knight of Pentacles', title: 'Hiệp Sĩ Tiền (Knight of Pentacles)', coreMeaning: 'Sự kiên định chuẩn mực, làm việc cẩn trọng từng bước với độ tin cậy tuyệt đối', keywords: ['chuẩn mực', 'cẩn trọng', 'đáng tin cậy', 'bền bỉ'] },
  PENTACLES_13_QUEEN: { code: 'PENTACLES_13_QUEEN', nameVn: 'Hoàng Hậu Tiền', nameEn: 'Queen of Pentacles', title: 'Hoàng Hậu Tiền (Queen of Pentacles)', coreMeaning: 'Bàn tay chăm sóc khéo léo, khả năng vun vén cuộc sống sung túc ấm cúng', keywords: ['vun vén', 'ấm cúng', 'thực tế', 'trù phú'] },
  PENTACLES_14_KING: { code: 'PENTACLES_14_KING', nameVn: 'Vua Tiền', nameEn: 'King of Pentacles', title: 'Vua Tiền (King of Pentacles)', coreMeaning: 'Bậc thầy quản trị tài chính, thành tựu vững như bàn thạch và phong thái đĩnh đạc', keywords: ['bậc thầy', 'thành tựu', 'thịnh vượng', 'vững vàng'] },
};

// ════════════════════════════════════════════════════════════════════════════
// 2. ASTROLOGY ENTITIES (CUNG HOÀNG ĐẠO & HÀNH TINH)
// ════════════════════════════════════════════════════════════════════════════

export const ZODIAC_VN_MAP: Record<string, string> = {
  ARIES: 'Bạch Dương',
  TAURUS: 'Kim Ngưu',
  GEMINI: 'Song Tử',
  CANCER: 'Cự Giải',
  LEO: 'Sư Tử',
  VIRGO: 'Xử Nữ',
  LIBRA: 'Thiên Bình',
  SCORPIO: 'Bọ Cạp',
  SAGITTARIUS: 'Nhân Mã',
  CAPRICORN: 'Ma Kết',
  AQUARIUS: 'Bảo Bình',
  PISCES: 'Song Ngư',
};

export const PLANET_VN_MAP: Record<string, string> = {
  sun: 'Mặt Trời',
  moon: 'Mặt Trăng',
  mercury: 'Thủy Tinh (Sao Thủy)',
  venus: 'Kim Tinh (Sao Kim)',
  mars: 'Hỏa Tinh (Sao Hỏa)',
  jupiter: 'Mộc Tinh (Sao Mộc)',
  saturn: 'Thổ Tinh (Sao Thổ)',
  uranus: 'Thiên Vương Tinh',
  neptune: 'Hải Vương Tinh',
  pluto: 'Diêm Vương Tinh',
  chiron: 'Chiron',
  northnode: 'La Hầu (North Node)',
  southnode: 'Kế Đô (South Node)',
  ascendant: 'Cung Mọc (Ascendant)',
  mc: 'Thiên Đỉnh (Midheaven)',
};

export const ASPECT_VN_MAP: Record<string, string> = {
  CONJUNCTION: 'Góc Trùng Tụ (0°)',
  OPPOSITION: 'Góc Đối Đỉnh (180°)',
  TRINE: 'Góc Tam Hợp (120° — Hài hòa)',
  SQUARE: 'Góc Vuông (90° — Căng thẳng)',
  SEXTILE: 'Góc Lục Hợp (60° — Thuận lợi)',
};

// ════════════════════════════════════════════════════════════════════════════
// 3. TỬ VI ENTITIES (SAO & CUNG CHỨC)
// ════════════════════════════════════════════════════════════════════════════

export const TUVI_STAR_VN_MAP: Record<string, string> = {
  TU_VI: 'Tử Vi (Đế Tòa)',
  THIEN_CO: 'Thiên Cơ (Mưu Lược)',
  THAI_DUONG: 'Thái Dương (Quang Minh)',
  VU_KHUC: 'Vũ Khúc (Tài Tinh)',
  THIEN_DONG: 'Thiên Đồng (Phúc Tinh)',
  LIEM_TRINH: 'Liêm Trinh (Tù Tinh)',
  THIEN_PHU: 'Thiên Phủ (Kho Lộc)',
  THAI_AM: 'Thái Âm (Nguyệt Lượng)',
  THAM_LANG: 'Tham Lang (Đào Hoa / Dục Vọng)',
  CU_MON: 'Cự Môn (Khẩu Thiệt)',
  THIEN_TUONG: 'Thiên Tướng (Ấn Tinh)',
  THIEN_LUONG: 'Thiên Lương (Ấm Tinh)',
  THAT_SAT: 'Thất Sát (Dũng Tinh)',
  PHA_QUAN: 'Phá Quân (Hao Tinh)',
  // Tứ Hóa
  HOA_LOC: 'Hóa Lộc (Tài Lộc & Hanh Thông)',
  HOA_QUYEN: 'Hóa Quyền (Quyền Lực & Uy Thế)',
  HOA_KHOA: 'Hóa Khoa (Danh Tiếng & Khoa Bảng)',
  HOA_KY: 'Hóa Kỵ (Nút Thắt & Thị Phi)',
  // Cát tinh & Sát tinh
  TA_PHU: 'Tả Phụ',
  HUU_BAT: 'Hữu Bật',
  VAN_XUONG: 'Văn Xương',
  VAN_KHUC: 'Văn Khúc',
  THIEN_KHOI: 'Thiên Khôi',
  THIEN_VIET: 'Thiên Việt',
  KINH_DUONG: 'Kình Dương',
  DA_LA: 'Đà La',
  HOA_TINH: 'Hỏa Tinh',
  LINH_TINH: 'Linh Tinh',
  DIA_KHONG: 'Địa Không',
  DIA_KIEP: 'Địa Kiếp',
};

export const TUVI_PALACE_VN_MAP: Record<string, string> = {
  MENH: 'Cung Mệnh (Bản Mệnh)',
  PHU_MAU: 'Cung Phụ Mẫu',
  PHUC_DUC: 'Cung Phúc Đức',
  DIEN_TRACH: 'Cung Điền Trạch',
  QUAN_LOC: 'Cung Quan Lộc (Sự Nghiệp)',
  NO_BOC: 'Cung Nô Bộc (Bạn Bè & Đồng Nghiệp)',
  THIEN_DI: 'Cung Thiên Di (Xuất Ngoại & Giao Tiếp)',
  TAT_ACH: 'Cung Tật Ách (Sức Khỏe & Tai Họa)',
  TAI_BACH: 'Cung Tài Bạch (Tiền Tài)',
  TU_TUC: 'Cung Tử Tức (Con Cái)',
  PHU_THE: 'Cung Phu Thê (Hôn Nhân)',
  HUYNH_DE: 'Cung Huynh Đệ (Anh Em)',
};

export const CAN_CHI_VN_MAP: Record<string, string> = {
  GIAP: 'Giáp', AT: 'Ất', BINH: 'Bính', DINH: 'Đinh', MAU: 'Mậu',
  KY: 'Kỷ', CANH: 'Canh', TAN: 'Tân', NHAM: 'Nhâm', QUY: 'Quý',
  TY_RAT: 'Tý', SUU_OX: 'Sửu', DAN_TIGER: 'Dần', MAO_CAT: 'Mão',
  THIN_DRAGON: 'Thìn', TY_SNAKE: 'Tỵ', NGO_HORSE: 'Ngọ', MUI_GOAT: 'Mùi',
  THAN_MONKEY: 'Thân', DAU_ROOSTER: 'Dậu', TUAT_DOG: 'Tuất', HOI_PIG: 'Hợi',
};

// ════════════════════════════════════════════════════════════════════════════
// 4. NUMEROLOGY ENTITIES
// ════════════════════════════════════════════════════════════════════════════

export const NUMEROLOGY_VN_MAP: Record<number, string> = {
  1: 'Số 1 — Người Khởi Xướng & Độc Lập Tiên Phong',
  2: 'Số 2 — Người Hòa Giải, Lắng Nghe & Thấu Cảm',
  3: 'Số 3 — Người Sáng Tạo, Ngôn Từ & Truyền Cảm Hứng',
  4: 'Số 4 — Người Xây Nền Móng, Trật Tự & Kỷ Luật',
  5: 'Số 5 — Người Tự Do, Khám Phá & Đột Phá Giới Hạn',
  6: 'Số 6 — Người Che Chở, Trách Nhiệm & Yêu Thương Gia Đình',
  7: 'Số 7 — Người Chiêm Nghiệm, Phân Tích & Đi Tìm Chân Lý',
  8: 'Số 8 — Người Điều Hành, Bản Lĩnh & Kiến Tạo Thịnh Vượng',
  9: 'Số 9 — Người Vị Tha, Nhân Ái & Hoàn Tất Chu Kỳ',
  11: 'Số Bậc Thầy 11 — Ngọn Hải Đăng Trực Giác & Soi Sáng',
  22: 'Số Bậc Thầy 22 — Kiến Trúc Sư Tầm Vóc Vĩ Đại',
  33: 'Số Bậc Thầy 33 — Tình Thương Thuần Khiết Nâng Tầm Nhân Thế',
};

// ════════════════════════════════════════════════════════════════════════════
// HELPER LOOKUP FUNCTIONS
// ════════════════════════════════════════════════════════════════════════════

export function humanizeCardCode(code: string): HumanizedEntity {
  const clean = code.toUpperCase().trim();
  if (TAROT_CARD_HUMAN_MAP[clean]) return TAROT_CARD_HUMAN_MAP[clean];

  // Try standard variants:
  // e.g. MINOR_PENTACLES_7 -> PENTACLES_07_7
  const stripped = clean.replace(/^(MINOR_|CARD_|MAJOR_)/, '');
  if (TAROT_CARD_HUMAN_MAP[stripped]) return TAROT_CARD_HUMAN_MAP[stripped];

  // Try matching with padded number (e.g. PENTACLES_7 -> PENTACLES_07)
  const suitMatch = clean.match(/(PENTACLES|CUPS|SWORDS|WANDS)_(\d+)/i);
  if (suitMatch && suitMatch[1] && suitMatch[2]) {
    const suit = suitMatch[1].toUpperCase();
    const num = parseInt(suitMatch[2], 10);
    const padded = String(num).padStart(2, '0');
    for (const [k, v] of Object.entries(TAROT_CARD_HUMAN_MAP)) {
      if (k.startsWith(suit) && (k.includes(`_${padded}_`) || (num === 1 && k.includes('_01_ACE')))) {
        return v;
      }
    }
  }

  // Major arcana numeric match (e.g. MAJOR_0, MAJOR_1)
  const majorMatch = clean.match(/^MAJOR_(\d+)$/i);
  if (majorMatch && majorMatch[1]) {
    const num = parseInt(majorMatch[1], 10);
    const padded = String(num).padStart(2, '0');
    for (const [k, v] of Object.entries(TAROT_CARD_HUMAN_MAP)) {
      if (k.startsWith('MAJOR_') && k.includes(`_${padded}_`)) {
        return v;
      }
    }
  }

  // Normalized lookup (stripping MINOR_ or card_ prefixes)
  for (const [k, v] of Object.entries(TAROT_CARD_HUMAN_MAP)) {
    if (k.includes(stripped) || stripped.includes(k.replace(/^(MINOR_|MAJOR_)/, ''))) {
      return v;
    }
  }

  // Fallback cleanly formatted
  return {
    code,
    nameVn: code.replace(/_/g, ' '),
    nameEn: code.replace(/_/g, ' '),
    title: code.replace(/_/g, ' '),
    coreMeaning: 'Nguồn năng lượng biểu trưng',
    keywords: ['thông điệp', 'vận trình'],
  };
}

export function humanizeZodiac(sign: string): string {
  const upper = sign.toUpperCase().trim();
  return ZODIAC_VN_MAP[upper] || sign;
}

export function humanizePlanet(planet: string): string {
  const lower = planet.toLowerCase().trim();
  return PLANET_VN_MAP[lower] || planet;
}

export function humanizeTuViStar(star: string): string {
  const upper = star.toUpperCase().trim();
  return TUVI_STAR_VN_MAP[upper] || star;
}

export function humanizeTuViPalace(palace: string): string {
  const upper = palace.toUpperCase().trim();
  return TUVI_PALACE_VN_MAP[upper] || palace;
}

export function humanizeNumerologyNumber(num: number): string {
  return NUMEROLOGY_VN_MAP[num] || `Con số ${num}`;
}

export interface DomainResolvedContext {
  headline: string;
  narrative: string;
  concepts: string[];
  manifestation: string;
  whatToContinue: string[];
  whatToAdjustOrStop: string[];
  rationale: string;
  centralTension?: string;
}

export function resolveDomainContextAndEntities(domain: string, facts: Array<{ key: string; value: unknown }>): DomainResolvedContext {
  const domainLower = domain.toLowerCase();

  // ──────────────────────────────────────────────────────────────────────────
  // 1. TAROT
  // ──────────────────────────────────────────────────────────────────────────
  if (domainLower === 'tarot') {
    const cardFacts = facts.filter(
      (f) => f.key === 'cardCode' || f.key.startsWith('card') || f.key.includes('.card')
    );
    const revFacts = facts.filter((f) => f.key === 'isReversed' || f.key.includes('is_reversed'));

    const cards: Array<{ entity: HumanizedEntity; isReversed: boolean; posName?: string }> = [];
    const seenCodes = new Set<string>();

    cardFacts.forEach((cf, idx) => {
      const codeStr = String(cf.value);
      if (seenCodes.has(codeStr) || typeof cf.value === 'number') return;
      seenCodes.add(codeStr);

      const entity = humanizeCardCode(codeStr);
      const isReversed = revFacts[idx] ? Boolean(revFacts[idx].value) : false;
      const posName = facts.find((f) => f.key.includes(`position_${idx + 1}.name`))?.value as string | undefined;

      cards.push({ entity, isReversed, posName });
    });

    if (cards.length > 0 && cards[0]) {
      const cardSummaries = cards.map(
        (c) => `${c.posName ? `${c.posName}: ` : ''}${c.entity.nameVn}${c.isReversed ? ' (Ngược)' : ''}`
      );
      const firstCard = cards[0];
      const secondCard = cards[1];
      const thirdCard = cards[2];

      const headline = `Hành Trình Trải Bài: ${cardSummaries.join(' ➔ ')}`;
      const narrative = `Quẻ bài hội tụ dòng năng lượng chuyển dịch từ ${firstCard.entity.nameVn}${
        firstCard.isReversed ? ' (chiều nghịch)' : ''
      }${
        secondCard
          ? ` qua điểm tựa hiện tại ${secondCard.entity.nameVn}${secondCard.isReversed ? ' (nghịch)' : ''}`
          : ''
      }${
        thirdCard
          ? ` hướng tới xu thế ${thirdCard.entity.nameVn}${thirdCard.isReversed ? ' (nghịch)' : ''}`
          : ''
      }. Mỗi lá bài là một mảnh ghép phản chiếu chân thực trạng thái nội tâm và bước chuyển dịch trong đời sống.`;

      const concepts = cards.flatMap((c) => c.entity.keywords).slice(0, 5);

      const manifestation = cards
        .map(
          (c) =>
            `• ${c.posName ? `[${c.posName}] ` : ''}${c.entity.title}${
              c.isReversed ? ' (chiều nghịch - năng lượng bị nghẽn hoặc cần nội quan)' : ' (chiều thuận)'
            }: Phản ánh ${c.entity.coreMeaning.toLowerCase()}.`
        )
        .join('\n');

      const whatToContinue = [
        `Phát huy thông điệp của ${firstCard.entity.nameVn}: ${firstCard.entity.keywords[0] || 'vững tâm bước tiếp'}.`,
        secondCard ? `Lấy tinh thần của ${secondCard.entity.nameVn} làm điểm tựa cân bằng nhịp điệu hành động.` : 'Duy trì sự tỉnh táo và lắng nghe trực giác trước các lựa chọn quan trọng.',
      ];

      const whatToAdjustOrStop = [
        firstCard.isReversed
          ? `Tiết chế sự bốc đồng hoặc né tránh đối diện với rào cản mà ${firstCard.entity.nameVn} cảnh báo.`
          : 'Tránh giữ mãi định kiến cũ; học cách nhìn nhận sự việc dưới lăng kính đa chiều.',
        thirdCard && thirdCard.isReversed
          ? `Cẩn trọng trước các dấu hiệu thiếu kiên nhẫn hoặc đốt cháy giai đoạn do ${thirdCard.entity.nameVn} phản ánh.`
          : 'Không để nỗi lo âu vô cớ cản trở tiến trình hiện thực hóa mục tiêu.',
      ];

      const rationale = `Sự phối hợp hài hòa giữa các lá bài cho thấy đây là thời điểm then chốt để chuyển hóa nhận thức thành hành động thực tế vững vàng.`;

      return {
        headline,
        narrative,
        concepts,
        manifestation,
        whatToContinue,
        whatToAdjustOrStop,
        rationale,
        centralTension: cards.some((c) => c.isReversed)
          ? `Sự giằng co giữa ý chí muốn bứt phá và những cản trở nội tâm chưa được giải tỏa`
          : undefined,
      };
    }

    return {
      headline: 'Khảo Cứu Năng Lượng Tarot',
      narrative: 'Bàn trải bài phản ánh sự luân chuyển tự nhiên giữa các nguồn năng lượng, mở ra cơ hội chiêm nghiệm và tái định vị.',
      concepts: ['năng lượng khởi sinh', 'tỉnh thức nội tâm', 'hướng đến cân bằng'],
      manifestation: 'Trải bài phản ánh tiến trình thích ứng trước các biến đổi thực tế.',
      whatToContinue: ['Giữ vững sự tĩnh tại và lắng nghe trực giác trước các lựa chọn quan trọng.'],
      whatToAdjustOrStop: ['Tránh đưa ra quyết định vội vàng khi tâm trí chưa an định.'],
      rationale: 'Sự tỉnh thức và kiên định là chìa khóa mở lối cho mọi khúc quanh.',
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. ASTROLOGY
  // ──────────────────────────────────────────────────────────────────────────
  if (domainLower === 'astrology') {
    const sunSign = facts.find((f) => f.key.includes('sun.sign') || f.key === 'sun' || f.key === 'sunSign')?.value;
    const moonSign = facts.find((f) => f.key.includes('moon.sign') || f.key === 'moon' || f.key === 'moonSign')?.value;
    const ascSign = facts.find(
      (f) =>
        (f.key.toLowerCase().includes('ascendant') || f.key.toLowerCase().includes('rising') || f.key === 'asc') &&
        (f.key.toLowerCase().includes('sign') || typeof f.value === 'string') &&
        typeof f.value !== 'number'
    )?.value;

    const sunHouse = facts.find((f) => (f.key.includes('sun') || f.key.includes('planets.sun')) && f.key.toLowerCase().includes('house'))?.value;
    const moonHouse = facts.find((f) => (f.key.includes('moon') || f.key.includes('planets.moon')) && f.key.toLowerCase().includes('house'))?.value;
    const houseSystem = (facts.find((f) => f.key.toLowerCase().includes('housesystem'))?.value as string) || 'Placidus';

    const sunVn = sunSign ? humanizeZodiac(String(sunSign)) : 'Bản thể';
    const moonVn = moonSign ? humanizeZodiac(String(moonSign)) : 'Tâm thức';
    const ascVn = ascSign ? humanizeZodiac(String(ascSign)) : null;

    const HOUSE_THEMES_VN: Record<number, string> = {
      1: 'Nhà 1 (Bản thể, diện mạo & phong thái cá nhân)',
      2: 'Nhà 2 (Tài chính, sinh kế & giá trị vật chất)',
      3: 'Nhà 3 (Giao tiếp, tư duy & học hỏi thực tế)',
      4: 'Nhà 4 (Gia đạo, cội nguồn & an toàn nội tâm)',
      5: 'Nhà 5 (Sáng tạo, biểu đạt bản ngã & niềm vui sống)',
      6: 'Nhà 6 (Kỷ luật công việc, thói quen & sức khỏe)',
      7: 'Nhà 7 (Hôn phối, đối tác & quan hệ song phương)',
      8: 'Nhà 8 (Chuyển hóa sâu sắc, nguồn lực chung & khủng hoảng)',
      9: 'Nhà 9 (Triết lý, viễn kiến & mở rộng tri thức)',
      10: 'Nhà 10 (Sự nghiệp, địa vị xã hội & danh tiếng)',
      11: 'Nhà 11 (Cộng đồng, mạng lưới & lý tưởng tương lai)',
      12: 'Nhà 12 (Tâm linh, trực giác sâu thẳm & giải phóng bản ngã)',
    };

    const sunHouseText = sunHouse ? `tọa lạc tại ${HOUSE_THEMES_VN[Number(sunHouse)] || `Nhà ${sunHouse}`}` : '';
    const moonHouseText = moonHouse ? `ngụ tại ${HOUSE_THEMES_VN[Number(moonHouse)] || `Nhà ${moonHouse}`}` : '';

    const headline = `Dấu Ấn Bản Đồ Sao: Mặt Trời ${sunVn}, Mặt Trăng ${moonVn}${ascVn ? `, Cung Mọc ${ascVn}` : ''}`;
    const narrative = `Bản đồ sao cá nhân (Hệ thống Cung Nhà ${houseSystem}) kiến tạo bức tranh tâm lý và trường hành động đa diện: Mặt Trời tọa lạc tại ${sunVn}${
      sunHouseText ? ` (${sunHouseText})` : ''
    } định hình ý chí nguyên bản, khát vọng tự khẳng định và vùng đời sống bạn muốn tỏa sáng nhất. Trong khi đó, Mặt Trăng ngụ tại ${moonVn}${
      moonHouseText ? ` (${moonHouseText})` : ''
    } phản ánh thế giới cảm xúc sâu kín, nhu cầu an toàn nội tâm và phản xạ phòng vệ bản năng.${
      ascVn ? ` Cung Mọc ${ascVn} đóng vai trò chiếc cổng giao tiếp (Đỉnh Nhà 1), biểu lộ phong thái tự nhiên khi tiếp xúc thế giới bên ngoài.` : ''
    }`;

    const concepts = [
      `bản thể ${sunVn}`,
      `cảm xúc ${moonVn}`,
      ascVn ? `phong thái ${ascVn}` : 'cân bằng năng lượng',
      sunHouse ? `vùng hoạt động Nhà ${sunHouse}` : 'trọng tâm hành động',
      'nội lực vững vàng',
    ];

    const manifestation = `• Mặt Trời ${sunVn}${sunHouse ? ` (Nhà ${sunHouse})` : ''}: Thể hiện qua ý chí độc lập, phong cách hành động trực diện và khát vọng hiện thực hóa mục tiêu trong vùng đời sống then chốt.\n• Mặt Trăng ${moonVn}${moonHouse ? ` (Nhà ${moonHouse})` : ''}: Chi phối đời sống nội tâm, cách nuôi dưỡng các mối quan hệ thân thiết và nhu cầu tái tạo năng lượng tinh thần.${
      ascVn ? `\n• Cung Mọc ${ascVn} (Đỉnh Nhà 1): Định hình ấn tượng ban đầu, bản lĩnh ngoại giao và phản xạ tự nhiên khi bước vào môi trường mới.` : ''
    }\n• Hệ Thống Cung Nhà ${houseSystem}: Phân định ranh giới 12 lãnh địa thực tiễn, xác lập cơ chế luân chuyển năng lượng từ nội tâm ra hành động xã hội.`;

    const whatToContinue = [
      `Phát huy tối đa phẩm chất tích cực của Mặt Trời ${sunVn}: giữ vững sự kiên định và phong thái đĩnh đạc.`,
      `Nuôi dưỡng và tôn trọng nhu cầu cảm xúc tự nhiên của Mặt Trăng ${moonVn} để duy trì sự bình an nội tại.`,
    ];

    const whatToAdjustOrStop = [
      `Nhận diện và tiết chế các xung lực tiêu cực có thể nảy sinh khi năng lượng của Mặt Trời ${sunVn} bị đẩy lên quá mức.`,
      `Không để những dao động cảm xúc bất an từ Mặt Trăng ${moonVn} làm ảnh hưởng đến các quyết định lý trí quan trọng.`,
    ];

    const rationale = `Sự tương tác mật thiết giữa Mặt Trời, Mặt Trăng và hệ thống Cung Nhà ${houseSystem} là chìa khóa mở ra tiềm năng tối thượng của bản đồ sao cá nhân.`;

    return {
      headline,
      narrative,
      concepts,
      manifestation,
      whatToContinue,
      whatToAdjustOrStop,
      rationale,
      centralTension: `Sự đối thoại giữa lý trí khát vọng (Mặt Trời ${sunVn}) và nhu cầu chở che an toàn (Mặt Trăng ${moonVn})`,
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. TỬ VI ĐẨU SỐ
  // ──────────────────────────────────────────────────────────────────────────
  if (domainLower === 'tuvi') {
    const validStarFacts = facts.filter(
      (f) =>
        typeof f.value === 'string' &&
        f.value !== 'true' &&
        f.value !== 'false' &&
        f.value !== 'NGO_HORSE' &&
        f.value !== 'THIN_DRAGON' &&
        f.value.length > 2
    );

    const menhStarCandidate =
      facts.find((f) => f.key === 'menhStar' && typeof f.value === 'string' && f.value !== 'true')?.value ||
      facts.find((f) => f.key === 'starCode' && typeof f.value === 'string' && f.value !== 'true' && f.value.length > 2)?.value ||
      validStarFacts.find((f) => f.key.includes('MENH') && f.key.includes('star'))?.value ||
      validStarFacts.find((f) => f.key.includes('star'))?.value;

    const yearStem = facts.find((f) => (f.key.includes('year_stem') || f.key.includes('yearStem')) && typeof f.value === 'string')?.value;
    const yearBranch = facts.find((f) => (f.key.includes('year_branch') || f.key.includes('yearBranch')) && typeof f.value === 'string')?.value;

    const cucRaw = facts.find((f) => f.key.includes('cuc') && typeof f.value === 'string')?.value as string | undefined;
    const cucMap: Record<string, string> = {
      MOC_TAM_CUC: 'Mộc Tam Cục',
      THUY_NHI_CUC: 'Thủy Nhị Cục',
      KIM_TU_CUC: 'Kim Tứ Cục',
      THO_NGU_CUC: 'Thổ Ngũ Cục',
      HOA_LUC_CUC: 'Hỏa Lục Cục',
    };
    const cucVn = cucRaw ? (cucMap[cucRaw.toUpperCase()] || cucRaw) : '';

    const starVn = menhStarCandidate ? humanizeTuViStar(String(menhStarCandidate)) : 'Phá Quân';
    const stemVn = yearStem ? (CAN_CHI_VN_MAP[String(yearStem).toUpperCase()] || String(yearStem)) : '';
    const branchVn = yearBranch ? (CAN_CHI_VN_MAP[String(yearBranch).toUpperCase()] || String(yearBranch)) : '';
    const canChiStr = stemVn && branchVn ? `Năm ${stemVn} ${branchVn}` : '';

    const headline = `Thiên Bàn Tử Vi: ${starVn} Tọa Thủ Cung Mệnh${canChiStr ? ` (${canChiStr})` : ''}`;
    const narrative = `Lá số Tử Vi xác lập cách cục độc bản: Cung Mệnh đắc địa dưới sự hội tụ của ${starVn}${
      cucVn ? `, an bài theo thế ${cucVn}` : ''
    }. Đây là cấu trúc chủ đạo biểu thị khí phách tiên thiên, nền tảng nhân cách và quỹ đạo công danh, tiền tài suốt cuộc đời. Sự phối chiếu của các cát tinh và hóa tinh trên thiên bàn tạo nên thế đứng vững chãi trước những biến động thời cuộc.`;

    const concepts = [
      `chủ tinh ${starVn}`,
      'cung mệnh vững vàng',
      'khí chất tiên thiên',
      'tam phương tứ chính',
      'vận trình hanh thông',
    ];

    const manifestation = `• Cung Mệnh hội tụ ${starVn}: Định hình phong thái đường hoàng, tài năng quản trị và ý chí tự lập tự cường trong sự nghiệp.\n• Tam Phương Tứ Chính: Tương tác qua lại giữa cung Quan Lộc, Tài Bạch và Thiên Di tạo đòn bẩy thăng tiến khi gặp thời vận.\n• Trục Mệnh - Thân: Hướng dẫn tiến trình hoàn thiện nhân cách từ tiên thiên sang giai đoạn trưởng thành hậu vận.`;

    const whatToContinue = [
      `Phát huy khí chất lãnh đạo và tư chất chính trực của ${starVn} trong các kế hoạch công danh lớn.`,
      `Gìn giữ uy tín cá nhân, trau dồi chuyên môn sâu để quy tụ được quý nhân nâng đỡ trên bước đường lập nghiệp.`,
    ];

    const whatToAdjustOrStop = [
      `Tránh tính khí chủ quan nóng nảy hoặc thái độ độc đoán khi nắm quyền lực trong tay.`,
      `Lưu tâm đến các cung xung chiếu và sát tinh đi kèm để phòng ngừa thị phi, rủi ro ngoài ý muốn.`,
    ];

    const rationale = `Mệnh sáng, Thân vững cùng sự trợ lực của cát tinh là bảo chứng cho sự hưng thịnh lâu dài trên bước đường vận mệnh.`;

    return {
      headline,
      narrative,
      concepts,
      manifestation,
      whatToContinue,
      whatToAdjustOrStop,
      rationale,
      centralTension: `Sự cân bằng giữa khát vọng vươn lên khẳng định vị thế và đức tính khiêm nhường giữ gìn phúc trạch`,
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4. THẦN SỐ HỌC
  // ──────────────────────────────────────────────────────────────────────────
  if (domainLower === 'numerology') {
    const lifePathFact = facts.find((f) => f.key.toLowerCase().includes('lifepath') && typeof f.value === 'number')?.value as number | undefined;
    const destinyFact = facts.find((f) => f.key.toLowerCase().includes('destiny') && typeof f.value === 'number')?.value as number | undefined;
    const soulFact = facts.find((f) => f.key.toLowerCase().includes('soul') && typeof f.value === 'number')?.value as number | undefined;
    const yearFact = facts.find((f) => f.key.toLowerCase().includes('personalyear') && typeof f.value === 'number')?.value as number | undefined;

    const lpNum = lifePathFact || 1;
    const lpTitle = humanizeNumerologyNumber(lpNum);
    const destinyTitle = destinyFact ? humanizeNumerologyNumber(destinyFact) : null;

    const headline = `Chân Dung Số Học: ${lpTitle}${destinyTitle ? ` ✕ ${destinyTitle}` : ''}`;
    const narrative = `Bản đồ số học Pythagoras khai mở tần số rung động cốt lõi của bạn: Con số Đường Đời ${lpNum} định hình con đường trải nghiệm và bài học tiến hóa tâm thức lớn nhất trong kiếp nhân sinh.${
      destinyFact ? ` Song hành cùng con số Sứ Mệnh ${destinyFact}, bạn được trao tặng những công cụ và tài năng đặc thù để phụng sự mục tiêu cuộc sống.` : ''
    }${yearFact ? ` Năm cá nhân số ${yearFact} đóng vai trò nhịp điệu kích hoạt, mở ra giai đoạn thích hợp để bứt phá và gặt hái.` : ''}`;

    const concepts = [
      `đường đời số ${lpNum}`,
      destinyFact ? `sứ mệnh số ${destinyFact}` : 'nội lực thức tỉnh',
      soulFact ? `linh hồn số ${soulFact}` : 'khát khao chân thật',
      'chuyển hóa tiềm năng',
      'phát triển toàn diện',
    ];

    const manifestation = `• Số Đường Đời ${lpNum}: Phản chiếu năng lực cốt lõi, phong cách ra quyết định và bài học kinh nghiệm sâu sắc nhất.\n• Số Sứ Mệnh${
      destinyFact ? ` ${destinyFact}` : ''
    }: Thể hiện mục đích sống, cách bạn cống hiến cho xã hội và tạo dựng di sản cá nhân.\n• Nhịp Điệu Chu Kỳ${
      yearFact ? ` (Năm ${yearFact})` : ''
    }: Xác định chiến lược hành động phù hợp — lúc nào nên tăng tốc khai phá, lúc nào nên củng cố nội lực.`;

    const whatToContinue = [
      `Sống đúng với phẩm chất cao nhất của số Đường Đời ${lpNum}: kiên định theo đuổi sứ mệnh độc bản.`,
      `Tận dụng thế mạnh tự nhiên để truyền cảm hứng và tạo dựng giá trị thực tế cho cộng đồng xung quanh.`,
    ];

    const whatToAdjustOrStop = [
      `Nhận diện và hóa giải những góc khuất tiêu cực (bóng tối) của con số ${lpNum} khi bị áp lực bủa vây.`,
      `Tránh sống ngược lại với trực giác và khát khao chân thực sâu thẳm trong tâm hồn.`,
    ];

    const rationale = `Sự thấu hiểu sâu sắc các con số là chìa khóa vàng giúp bạn làm chủ vận mệnh và đón đầu các chu kỳ hưng thịnh.`;

    return {
      headline,
      narrative,
      concepts,
      manifestation,
      whatToContinue,
      whatToAdjustOrStop,
      rationale,
      centralTension: destinyFact && destinyFact !== lpNum
        ? `Sự phối hợp giữa bài học đường đời số ${lpNum} và trọng trách sứ mệnh số ${destinyFact}`
        : undefined,
    };
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5. ĐỘ TƯƠNG HỢP / COMPATIBILITY
  // ──────────────────────────────────────────────────────────────────────────
  const relType = String(
    facts.find((f) => f.key.toLowerCase().includes('relationshiptype') || f.key === 'purpose')?.value || 'LOVE'
  ).toUpperCase();

  let headline = 'Khảo Luận Tương Hợp: Giao Thoa Năng Lượng & Nhịp Điệu Đôi Bên';
  let narrative = '';
  let concepts: string[] = [];
  let manifestation = '';
  let whatToContinue: string[] = [];
  let whatToAdjustOrStop: string[] = [];
  let rationale = '';
  let centralTension = '';

  if (relType === 'BUSINESS') {
    headline = 'Tương Tác Hợp Tác Sự Nghiệp & Khởi Sự Kinh Doanh';
    narrative = 'Khảo cứu sự phối hợp giữa hai đối tác dựa trên phong cách lãnh đạo, năng lực điều hành và phân định trách nhiệm. Mối liên kết kinh doanh bền vững đòi hỏi sự minh bạch tài chính, bổ trợ kỹ năng và cam kết nguyên tắc rõ ràng, chuyển hóa sự khác biệt trong tư duy thành đòn bẩy phát triển sự nghiệp.';
    concepts = ['phân định trách nhiệm', 'bổ trợ kỹ năng', 'minh bạch tài chính', 'quản trị rủi ro', 'cộng hưởng thành tựu'];
    manifestation = '• Phân Định Vai Trò: Xác lập ranh giới trách nhiệm và thế mạnh chuyên môn độc lập của từng bên để tránh chồng chéo quyền lực.\n• Quản Trị Rủi Ro: Đồng thuận cơ chế giải quyết tranh chấp và phân bổ nguồn lực công bằng ngay từ đầu.\n• Đòn Bẩy Tài Chính: Tận dụng sự khác biệt tư duy để tạo góc nhìn đa chiều trước các quyết định đầu tư lớn.';
    whatToContinue = [
      'Minh bạch hóa các điều khoản hợp tác, duy trì sổ sách và trao đổi công việc dựa trên số liệu thực tế.',
      'Tôn trọng không gian điều hành chuyên môn của đối phương, phát huy tối đa thế mạnh riêng biệt.',
    ];
    whatToAdjustOrStop = [
      'Tránh để cảm xúc cá nhân can thiệp vào các quyết định kinh doanh đòi hỏi sự tỉnh táo lý trí.',
      'Không trì hoãn giải quyết các bất đồng về quyền lợi hoặc trách nhiệm công việc.',
    ];
    rationale = 'Sự rõ ràng về trách nhiệm và minh bạch về quyền lợi là bảo chứng vững chắc nhất cho mối quan hệ đối tác lâu dài.';
    centralTension = 'Cân bằng giữa tốc độ bứt phá mạo hiểm và kỷ luật kiểm soát rủi ro tài chính';
  } else if (relType === 'FRIENDSHIP') {
    headline = 'Tương Tác Bằng Hữu & Đồng Hành Tri Kỷ';
    narrative = 'Khảo cứu nhịp điệu tương tác giữa hai người bạn dựa trên sự đồng điệu sở thích, không gian sẻ chia và mức độ tin cậy. Tình bạn chân thành là bến đỗ bình an nơi cả hai được tự do sống thật với chính mình mà không lo sợ phán xét.';
    concepts = ['chân thành sẻ chia', 'tôn trọng tự do', 'tin cậy hỗ trợ', 'đồng điệu tâm hồn', 'không phán xét'];
    manifestation = '• Gắn Kết Tự Nhiên: Dễ dàng tìm thấy niềm vui chung trong sinh hoạt và các cuộc trò chuyện thường nhật.\n• Tôn Trọng Ranh Giới: Hạ thấp kỳ vọng áp đặt, sẵn sàng lắng nghe khi đối phương cần điểm tựa.';
    whatToContinue = [
      'Duy trì sự cởi mở, chân thành và tinh thần sẻ chia không vụ lợi trong các tương tác.',
      'Tôn trọng cuộc sống riêng và các mục tiêu cá nhân của bạn bè.',
    ];
    whatToAdjustOrStop = [
      'Tránh can thiệp quá sâu vào các quyết định mang tính cá nhân của đối phương.',
      'Không để những hiểu lầm nhỏ không được giải tỏa kịp thời làm phai nhạt tình bạn.',
    ];
    rationale = 'Tình bạn bền lâu được nuôi dưỡng từ sự chân thành, lòng bao dung và sự tôn trọng không gian sống của nhau.';
    centralTension = 'Sự giằng co giữa mong muốn gắn kết thân mật và nhu cầu độc lập cá nhân';
  } else if (relType === 'FAMILY') {
    headline = 'Gắn Kết Gia Đạo & Nền Tảng Tương Hỗ';
    narrative = 'Khảo cứu sự tương tác giữa các thành viên gia đình dựa trên sự gắn kết cội nguồn, nghĩa vụ đạo lý và lòng thấu cảm. Mối quan hệ gia đạo đòi hỏi sự bao dung, hạ thấp cái tôi và lắng nghe để dung hòa các khác biệt thế hệ.';
    concepts = ['nền tảng gia đạo', 'thấu cảm thế hệ', 'bao dung nâng đỡ', 'hòa hợp huyết thống', 'yêu thương vô điều kiện'];
    manifestation = '• Cội Nguồn An Định: Tạo dựng cảm giác an toàn và sự chở che vững chãi trước sóng gió cuộc đời.\n• Hóa Giải Bất Đồng: Học cách chấp nhận sự khác biệt về quan điểm sống giữa các thế hệ.';
    whatToContinue = [
      'Gìn giữ truyền thống gia đình, tạo không gian gắn kết sum vầy thường xuyên.',
      'Lắng nghe và tôn trọng cảm xúc của nhau bằng sự kiên nhẫn và lòng bao dung.',
    ];
    whatToAdjustOrStop = [
      'Tránh áp đặt kỳ vọng cá nhân hoặc định kiến lên người thân.',
      'Không biến gia đình thành nơi trút bỏ những áp lực bực bội từ xã hội.',
    ];
    rationale = 'Gia hòa vạn sự hưng — sự thấu cảm và nhường nhịn là gốc rễ của phúc trạch gia đình bền vững.';
    centralTension = 'Dung hòa giữa bảo tồn nề nếp truyền thống và tôn trọng sự đổi mới tự do của từng thành viên';
  } else {
    headline = 'Tương Quan Hòa Hợp Tình Duyên & Hôn Nhân';
    narrative = 'Khảo cứu sự hòa hợp giữa hai cá thể độc bản dựa trên sự giao thoa của các trường năng lượng thiên văn và tần số số học. Mối quan hệ là một tiến trình sống động, nơi những điểm tương đồng tạo nên bến đỗ bình an và những khác biệt bản năng chính là mảnh đất màu mỡ để cả hai cùng thấu hiểu, trưởng thành.';
    concepts = ['tương sinh năng lượng', 'thấu hiểu dị biệt', 'gắn kết bền vững', 'chia sẻ chân thành', 'đồng hành phát triển'];
    manifestation = '• Điểm Tương Đồng: Tạo ra sự an tâm, tiếng nói chung trong sinh hoạt hàng ngày và sự nâng đỡ tinh thần tự nhiên.\n• Điểm Khác Biệt: Đòi hỏi sự nhẫn nại lắng nghe, tôn trọng không gian riêng và hạ thấp cái tôi cá nhân khi tranh luận.';
    whatToContinue = [
      'Duy trì sự giao tiếp chân thành, cởi mở chia sẻ cảm xúc và luôn đặt mình vào vị trí của đối phương.',
      'Tôn vinh và khuyến khích những thế mạnh riêng biệt của nhau thay vì cố gắng đồng hóa đối phương.',
    ];
    whatToAdjustOrStop = [
      'Tránh áp đặt quan điểm cá nhân hoặc giữ ấm ức trong lòng mà không thẳng thắn giải bày.',
      'Không để những bất đồng nhỏ nhặt tích tụ thành rào cản ngăn cách tình cảm đôi bên.',
    ];
    rationale = 'Sự chân thành, lòng bao dung và sự tôn trọng lẫn nhau là nền tảng vững chắc nhất cho một mối quan hệ trường cửu.';
    centralTension = 'Cân bằng giữa nhu cầu giữ gìn bản sắc tự chủ cá nhân và sự hòa nhập gắn kết trong mối quan hệ chung';
  }

  return {
    headline,
    narrative,
    concepts,
    manifestation,
    whatToContinue,
    whatToAdjustOrStop,
    rationale,
    centralTension,
  };
}
