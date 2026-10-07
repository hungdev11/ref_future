import { MainStory, Pattern, Signal } from '@mystic/core';
import { QuestionFocus } from './question-reactive-engine.js';

export const CATEGORY_VN: Record<string, string> = {
  career: 'sự nghiệp và công việc',
  love: 'chuyện tình cảm',
  finance: 'tài chính và nguồn lực',
  growth: 'nội lực và nhận thức',
  general: 'vận trình hiện tại',
};

export class MainStoryEngine {
  public static synthesizeStory(
    domain: string,
    patterns: Pattern[],
    signals: Signal[],
    focus: QuestionFocus
  ): MainStory {
    const primary = patterns[0];

    const domainThemes: Record<string, string> = {
      tarot: `Khảo sát quẻ bài xoay quanh câu hỏi: "${focus.perspective}"`,
      astrology: 'Dấu ấn bản đồ sao phản ánh xung lực định hình bản thể và phương thức tương tác thế giới.',
      tuvi: 'Cấu trúc thiên bàn xác lập trục mệnh thân và quỹ đạo vận trình trọng tâm.',
      numerology: 'Sự hội tụ các con số biểu thị nhịp điệu phát triển và bài học trưởng thành.',
      compatibility: 'Động lực hai cá nhân tương tác hình thành dòng chảy kết nối và thử thách cần dung hòa.',
    };

    const headline = primary
      ? `${primary.headline} — ${focus.category === 'general' ? 'Điểm tựa chủ đạo' : `Trọng tâm ${CATEGORY_VN[focus.category] || focus.category}`}`
      : `Xu Hướng Vận Động ${domain.toUpperCase()}`;

    const narrative = primary
      ? `${domainThemes[domain] || ''} Trọng tâm nổi bật nhất nằm ở cấu trúc: "${primary.headline}". Không chỉ dừng lại ở bề mặt, các dấu chỉ liên kết chặt chẽ đòi hỏi sự thấu suốt về nguyên nhân sâu xa để điều chỉnh hướng đi vững vàng và hài hòa.`
      : 'Hệ thống nhận diện sự cân bằng tự nhiên giữa các nguồn năng lượng, mở ra cơ hội chiêm nghiệm và tái định vị.';

    const challSignal = signals.find((s) => s.polarity === 'challenging');

    let centralTension: string | undefined = undefined;
    if (challSignal) {
      if (patterns.length > 1 && patterns[0] && patterns[1]) {
        centralTension = `Khoảng giằng co giữa xu thế [${patterns[0].headline}] và thách thức từ [${patterns[1].headline}]`;
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
