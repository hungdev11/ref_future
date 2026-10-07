import { Scenario, Pattern, Signal } from '@mystic/core';
import { QuestionFocus } from './question-reactive-engine.js';

export class ScenarioEngine {
  public static generateScenarios(
    domain: string,
    patterns: Pattern[],
    _signals: Signal[],
    focus: QuestionFocus
  ): Scenario[] {
    const scenarios: Scenario[] = [];
    const pat = patterns[0];
    const patId = pat ? pat.patternId : 'PAT_DEFAULT';

    const isCareer = focus.category === 'career' || (focus.category === 'general' && domain === 'tarot');
    const isLove = focus.category === 'love' || (focus.category === 'general' && domain === 'compatibility');
    const isFinance =
      focus.category === 'finance' ||
      (focus.category === 'general' && (domain === 'numerology' || domain === 'astrology'));

    if (isCareer) {
      scenarios.push({
        scenarioId: 'SCEN_CAREER_TRANSITION',
        title: 'Khi đứng trước bước ngoặt công việc hoặc dự án mới',
        trigger: 'Xuất hiện đề xuất đổi mới hoặc áp lực tái cấu trúc công việc',
        patternIds: [patId],
        likelyDynamic: 'Hào hứng dấn thân nhưng dễ bối rối trước chi tiết kỹ thuật hoặc quy trình cũ.',
        tension: 'Xung đột giữa tốc độ mong muốn và quy trình hiện hữu.',
        constructiveResponse: 'Giữ vững mục tiêu cốt lõi, nhưng chia nhỏ cột mốc đánh giá để kiểm soát rủi ro.',
        evidenceIds: [],
      });
    }

    if (isLove) {
      scenarios.push({
        scenarioId: 'SCEN_RELATIONSHIP_FRICTION',
        title: 'Khi xảy ra tranh luận hoặc bất đồng quan điểm',
        trigger: 'Một trong hai bên cảm thấy thiếu được thấu hiểu hoặc bị áp đặt',
        patternIds: [patId],
        likelyDynamic: 'Khuynh hướng phòng thủ hoặc im lặng rút lui để tự bảo vệ.',
        tension: 'Nhu cầu làm rõ vấn đề ngay lập tức đối đầu với nhu cầu cần không gian riêng.',
        constructiveResponse: 'Tạm dừng tranh luận trực diện; thống nhất thời điểm trao đổi lại khi cả hai đã tĩnh tâm.',
        evidenceIds: [],
      });
    }

    if (isFinance) {
      scenarios.push({
        scenarioId: 'SCEN_FINANCE_DECISION',
        title: 'Khi đối diện quyết định cam kết nguồn lực lâu dài',
        trigger: 'Phải lựa chọn giữa bảo toàn an toàn và đầu tư mở rộng',
        patternIds: [patId],
        likelyDynamic: 'Xu hướng cân nhắc kéo dài dẫn đến bỏ lỡ cơ hội hoặc ngược lại, mạo hiểm vội vã.',
        tension: 'Cân bằng giữa phòng vệ và tăng trưởng.',
        constructiveResponse: 'Thiết lập hạn mức chịu đựng tổn thất tối đa trước khi đưa ra quyết định cuối cùng.',
        evidenceIds: [],
      });
    }

    if (scenarios.length === 0) {
      scenarios.push({
        scenarioId: 'SCEN_GENERAL_REFLECT',
        title: 'Khi đối mặt áp lực thay đổi nhịp sống hàng ngày',
        trigger: 'Sự xuất hiện của các biến số nằm ngoài dự tính ban đầu',
        patternIds: [patId],
        likelyDynamic: 'Nội tâm dao động, tìm kiếm điểm tựa vững chắc để bám víu.',
        tension: 'Ý muốn kiểm soát đối đầu với thực tế biến chuyển.',
        constructiveResponse: 'Chấp nhận độ trễ tự nhiên, tập trung vào những việc nằm trong tầm kiểm soát trực tiếp.',
        evidenceIds: [],
      });
    }

    return scenarios;
  }
}
