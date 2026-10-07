export interface QuestionFocus {
  category: 'career' | 'love' | 'finance' | 'growth' | 'general';
  semanticKeywords: string[];
  perspective: string;
}

export class QuestionReactiveEngine {
  public static resolveFocus(question?: string): QuestionFocus {
    if (!question || question.trim().length === 0) {
      return {
        category: 'general',
        semanticKeywords: ['tổng quan', 'vận trình', 'tiềm năng'],
        perspective: 'Định hướng tổng quát và nhận diện xu hướng vận động chính.',
      };
    }

    const q = question.toLowerCase();
    if (
      q.includes('việc') ||
      q.includes('công tác') ||
      q.includes('nghề') ||
      q.includes('dự án') ||
      q.includes('kinh doanh') ||
      q.includes('thăng tiến')
    ) {
      return {
        category: 'career',
        semanticKeywords: ['công việc', 'sự nghiệp', 'hành động chiến lược', 'tiến độ'],
        perspective: 'Tập trung vào hiệu suất, cơ hội chuyển biến và năng lực thực thi.',
      };
    }

    if (
      q.includes('yêu') ||
      q.includes('tình') ||
      q.includes('hôn nhân') ||
      q.includes('người ấy') ||
      q.includes('mối quan hệ') ||
      q.includes('chia tay')
    ) {
      return {
        category: 'love',
        semanticKeywords: ['tình cảm', 'gắn kết', 'chia sẻ cảm xúc', 'sự thấu cảm'],
        perspective: 'Tập trung vào động lực kết nối cảm xúc, sự an toàn và giải tỏa ma sát đôi bên.',
      };
    }

    if (
      q.includes('tiền') ||
      q.includes('tài chính') ||
      q.includes('đầu tư') ||
      q.includes('mua') ||
      q.includes('nợ') ||
      q.includes('tài sản')
    ) {
      return {
        category: 'finance',
        semanticKeywords: ['tài chính', 'dòng tiền', 'bảo toàn nguồn lực', 'đầu tư'],
        perspective: 'Tập trung vào quản trị rủi ro tài chính, đánh giá tính sinh lợi và cân nhắc chi phí.',
      };
    }

    return {
      category: 'growth',
      semanticKeywords: ['chuyển hóa', 'bài học', 'nhận thức', 'nội lực'],
      perspective: 'Tập trung vào sự thức tỉnh tâm trí, rèn luyện bản lĩnh và vượt qua điểm nghẽn.',
    };
  }
}
