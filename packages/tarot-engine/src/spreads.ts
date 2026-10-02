export interface SpreadPositionDef {
  index: number; // 1-indexed
  name: string;
  description: string;
}

export interface SpreadDefinition {
  code: string;
  name: string;
  cardCount: number;
  description: string;
  positions: SpreadPositionDef[];
}

export const STANDARD_SPREADS: Record<string, SpreadDefinition> = {
  SPREAD_1_DAILY: {
    code: 'SPREAD_1_DAILY',
    name: 'Daily Guidance',
    cardCount: 1,
    description: 'Một lá bài duy nhất định hướng thông điệp và trọng tâm cho ngày hôm nay.',
    positions: [
      { index: 1, name: 'Thông Điệp Trong Ngày', description: 'Trọng tâm năng lượng và bài học chủ đạo trong ngày' },
    ],
  },
  SPREAD_3_PPF: {
    code: 'SPREAD_3_PPF',
    name: 'Quá Khứ / Hiện Tại / Tương Lai',
    cardCount: 3,
    description: 'Trải bài 3 lá kinh điển khám phá dòng chảy thời gian của sự việc.',
    positions: [
      { index: 1, name: 'Quá Khứ', description: 'Nền tảng, nguồn gốc và ảnh hưởng từ quá khứ hình thành nên hiện trạng' },
      { index: 2, name: 'Hiện Tại', description: 'Động lực thực tế, trạng thái cảm xúc và hoàn cảnh tại thời điểm hiện tại' },
      { index: 3, name: 'Xu Hướng Tương Lai', description: 'Quỹ đạo phát triển và kết quả tiềm năng nếu duy trì hướng đi hiện tại' },
    ],
  },
  SPREAD_3_SCA: {
    code: 'SPREAD_3_SCA',
    name: 'Hoàn Cảnh / Thách Thức / Lời Khuyên',
    cardCount: 3,
    description: 'Trải bài giải quyết vấn đề thực tiễn, phân tích thách thức và đưa ra định hướng.',
    positions: [
      { index: 1, name: 'Hoàn Cảnh', description: 'Thực trạng cốt lõi của vấn đề' },
      { index: 2, name: 'Thách Thức', description: 'Chướng ngại hoặc bài học cần vượt qua' },
      { index: 3, name: 'Lời Khuyên', description: 'Hành động chiến lược cần thực hiện để chuyển hóa tình thế' },
    ],
  },
  SPREAD_5_SCCA_OUTCOME: {
    code: 'SPREAD_5_SCCA_OUTCOME',
    name: 'Phân Tích Chi Tiết 5 Lá',
    cardCount: 5,
    description: 'Đào sâu nguyên nhân gốc rễ, trở ngại tiềm ẩn và kết quả lâu dài.',
    positions: [
      { index: 1, name: 'Thực Trạng', description: 'Bối cảnh tổng quan' },
      { index: 2, name: 'Nguyên Nhân Gốc Rễ', description: 'Yếu tố sâu xa tạo nên hoàn cảnh' },
      { index: 3, name: 'Chướng Ngại Vật', description: 'Thử thách trực tiếp' },
      { index: 4, name: 'Định Hướng Hành Động', description: 'Giải pháp tối ưu' },
      { index: 5, name: 'Kết Quả Dự Phóng', description: 'Thành quả đạt được sau khi hành động' },
    ],
  },
  SPREAD_10_CELTIC_CROSS: {
    code: 'SPREAD_10_CELTIC_CROSS',
    name: 'Celtic Cross (Thập Tự Celtic)',
    cardCount: 10,
    description: 'Trải bài chuyên sâu toàn diện 10 vị trí theo Waite.',
    positions: [
      { index: 1, name: 'Bản Thân Hiện Tại', description: 'Trạng thái cốt lõi của người hỏi' },
      { index: 2, name: 'Yếu Tố Cản Trở / Hỗ Trợ', description: 'Năng lượng cắt ngang' },
      { index: 3, name: 'Tiềm Thức / Căn Nguyên', description: 'Động lực vô thức ẩn sâu' },
      { index: 4, name: 'Quá Khứ Gần', description: 'Sự kiện vừa qua tác động tới hiện tại' },
      { index: 5, name: 'Ý Thức / Mục Tiêu', description: 'Kỳ vọng và điều đang hướng tới' },
      { index: 6, name: 'Tương Lai Gần', description: 'Biến chuyển sắp diễn ra' },
      { index: 7, name: 'Thái Độ Bản Thân', description: 'Tâm thế người hỏi đối với vấn đề' },
      { index: 8, name: 'Môi Trường Xung Quanh', description: 'Tác động từ người khác và hoàn cảnh bên ngoài' },
      { index: 9, name: 'Hy Vọng & Nỗi Sợ', description: 'Kỳ vọng thầm kín và nỗi bất an' },
      { index: 10, name: 'Kết Quả Cuối Cùng', description: 'Cảnh giới tổng kết của toàn bộ hành trình' },
    ],
  },
};
