import { MainStory, Pattern, Signal } from '@mystic/core';
import { QuestionFocus } from './question-reactive-engine.js';

export class MainStoryEngine {
  public static synthesizeStory(
    domain: string,
    patterns: Pattern[],
    signals: Signal[],
    focus: QuestionFocus
  ): MainStory {
    const primary = patterns[0];
    const topSignal = signals[0];

    const domainThemes: Record<string, string> = {
      tarot: `Khảo sát quẻ bài xoay quanh câu hỏi: "${focus.perspective}"`,
      astrology: 'Dấu ấn bản đồ sao phản ánh xung lực định hình bản thể và phương thức tương tác thế giới.',
      tuvi: 'Cấu trúc thiên bàn xác lập trục mệnh thân và quỹ đạo vận trình trọng tâm.',
      numerology: 'Sự hội tụ các con số biểu thị nhịp điệu phát triển và bài học trưởng thành.',
      compatibility: 'Động lực hai cá nhân tương tác hình thành dòng chảy kết nối và thử thách cần dung hòa.',
    };

    const headline = primary
      ? `${primary.headline} — ${focus.category === 'general' ? 'Điểm tựa chủ đạo' : `Trọng tâm ${focus.category}`}`
      : `Xu Hướng Vận Động ${domain.toUpperCase()}`;

    const narrative = primary
      ? `${domainThemes[domain] || ''} Trọng tâm nổi bật nhất nằm ở khuôn mẫu [${primary.headline}], nơi ${
          topSignal ? `tín hiệu "${topSignal.type}" đóng vai trò kích hoạt then chốt.` : 'các yếu tố hội tụ tạo nên bước chuyển dịch quan trọng.'
        } Không chỉ dừng lại ở bề mặt, cấu trúc này đòi hỏi sự thấu suốt về nguyên nhân sâu xa để điều chỉnh hướng đi.`
      : 'Hệ thống nhận diện sự cân bằng tự nhiên giữa các nguồn năng lượng, mở ra cơ hội chiêm nghiệm và tái định vị.';

    const challSignal = signals.find((s) => s.polarity === 'challenging');
    const suppSignal = signals.find((s) => s.polarity === 'supportive');

    let centralTension: string | undefined = undefined;
    if (challSignal) {
      if (patterns.length > 1 && patterns[0] && patterns[1]) {
        centralTension = `Khoảng giằng co giữa xu hướng [${patterns[0].headline}] và thách thức từ [${patterns[1].headline}]`;
      } else if (suppSignal) {
        centralTension = `Khoảng giằng co giữa thế chủ động (${suppSignal.type}) và đòi hỏi cẩn trọng (${challSignal.type})`;
      } else {
        centralTension = 'Khoảng giằng co giữa khát vọng bứt phá và đòi hỏi cẩn trọng thực tế';
      }
    }

    return {
      headline,
      narrative,
      centralTension,
      focalEntity: primary?.type,
    };
  }
}
