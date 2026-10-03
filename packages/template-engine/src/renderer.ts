export interface TemplateRenderContext {
  facts?: Record<string, unknown>;
  variables?: Record<string, unknown>;
  traits?: Record<string, number>;
  seed?: string | number;
  blockId?: string;
  intensity?: 'HIGH' | 'MODERATE' | 'LOW';
}

export class SafeTemplateRenderer {
  /**
   * Deterministic 32-bit integer hash from string
   */
  public static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Mulberry32 PRNG: Fast, 100% deterministic pseudo-random generator
   */
  public static createMulberry32(seed: number): () => number {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  public static render(template: string, context: TemplateRenderContext = {}): string {
    const combinedContext: Record<string, unknown> = {
      ...(context.facts ?? {}),
      ...(context.variables ?? {}),
      ...(context.traits ? { traits: context.traits } : {}),
      intensity: context.intensity ?? 'MODERATE',
    };

    // Prepare seed for deterministic choices
    const seedBase = String(context.seed ?? '1337') + ':' + String(context.blockId ?? 'default');
    const numericSeed = SafeTemplateRenderer.hashString(seedBase);
    const rng = SafeTemplateRenderer.createMulberry32(numericSeed);

    let processed = template;

    // 1. Process {{#intensity 'LEVEL'}}...{{/intensity}}
    processed = processed.replace(
      /\{\{#intensity\s+['"]?([A-Z_]+)['"]?\}\}([\s\S]*?)\{\{\/intensity\}\}/g,
      (_, requiredLevel, content) => {
        const currentIntensity = combinedContext.intensity;
        return currentIntensity === requiredLevel ? content : '';
      }
    );

    // 2. Process deterministic choices {{#choose}}option1|||option2|||option3{{/choose}}
    processed = processed.replace(
      /\{\{#choose\}\}([\s\S]*?)\{\{\/choose\}\}/g,
      (_, optionsContent) => {
        const options = optionsContent.split('|||').map((s: string) => s.trim()).filter(Boolean);
        if (options.length === 0) return '';
        const index = Math.floor(rng() * options.length);
        return options[index];
      }
    );

    // 3. Process numerical comparisons {{#gte key threshold}}...{{/gte}}
    processed = processed.replace(
      /\{\{#gte\s+([a-zA-Z0-9_.]+)\s+([0-9.]+)\}\}([\s\S]*?)\{\{\/gte\}\}/g,
      (_, key, thresholdStr, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        const threshold = parseFloat(thresholdStr);
        if (typeof val === 'number' && val >= threshold) {
          return content;
        }
        return '';
      }
    );

    // 4. Process numerical comparisons {{#lte key threshold}}...{{/lte}}
    processed = processed.replace(
      /\{\{#lte\s+([a-zA-Z0-9_.]+)\s+([0-9.]+)\}\}([\s\S]*?)\{\{\/lte\}\}/g,
      (_, key, thresholdStr, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        const threshold = parseFloat(thresholdStr);
        if (typeof val === 'number' && val <= threshold) {
          return content;
        }
        return '';
      }
    );

    // 5. Process standard boolean conditions {{#if key}}...{{/if}}
    processed = processed.replace(
      /\{\{#if\s+([a-zA-Z0-9_.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (_, key, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        return Boolean(val) ? content : '';
      }
    );

    // 6. Process inverted conditions {{#unless key}}...{{/unless}}
    processed = processed.replace(
      /\{\{#unless\s+([a-zA-Z0-9_.]+)\}\}([\s\S]*?)\{\{\/unless\}\}/g,
      (_, key, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        return !Boolean(val) ? content : '';
      }
    );

    // 7. Interpolate variables {{ key }}
    processed = processed.replace(/\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g, (_, key) => {
      const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
      if (val === undefined || val === null) {
        return `[Chưa xác định: ${key}]`;
      }
      return String(val);
    });

    return processed;
  }

  private static resolveKey(context: Record<string, unknown>, path: string): unknown {
    if (path in context) {
      return context[path];
    }

    const parts = path.split('.');
    let current: unknown = context;

    for (const part of parts) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[part];
    }

    return current;
  }
}

export class TransitionGenerator {
  private static TRANSITION_CONNECTORS: Record<string, string[]> = {
    DEFAULT: [
      'Song hành cùng phương diện này,',
      'Xét trên khía cạnh bổ trợ tiếp theo,',
      'Đi sâu hơn vào cấu trúc năng lượng,',
      'Ở một góc nhìn thực tiễn khác,',
      'Đồng thời, khi đối chiếu với hoàn cảnh thực tế,',
    ],
    STRENGTH_TO_CHALLENGE: [
      'Tuy nhiên, đằng sau những thế mạnh nổi bật đó luôn tiềm ẩn thử thách cần chú ý:',
      'Mặt khác, mặt trái của nguồn năng lượng mạnh mẽ này chính là:',
      'Dẫu vậy, để phát huy trọn vẹn ưu điểm trên, bạn cần nhận diện rào cản nội tâm:',
    ],
    CHALLENGE_TO_CAREER: [
      'Khi chuyển hóa những bài học trên vào môi trường công việc và sự nghiệp,',
      'Trong bức tranh công danh và định hướng phát triển chuyên môn,',
      'Vận dụng sự thấu hiểu bản thân vào chặng đường sự nghiệp cho thấy:',
    ],
    CAREER_TO_LOVE: [
      'Không chỉ trong công việc, ở phương diện tình cảm và các mối quan hệ sâu sắc,',
      'Bên cạnh sự nghiệp, thế giới cảm xúc và nhân duyên của bạn mang một màu sắc rất riêng:',
      'Xét sang khía cạnh tình duyên và sự gắn kết lứa đôi,',
    ],
    CONTRAST: [
      'Trái ngược với vẻ điềm đạm bên ngoài,',
      'Đan xen giữa lý trí và cảm xúc,',
      'Mặc dù có xu hướng độc lập rất cao,',
    ],
  };

  public static getTransition(type: string, seed: string | number): string {
    const defaultList = this.TRANSITION_CONNECTORS.DEFAULT || [];
    const list: string[] = this.TRANSITION_CONNECTORS[type] || defaultList;
    if (!list || list.length === 0) return '';
    const numSeed = typeof seed === 'number' ? seed : SafeTemplateRenderer.hashString(String(seed));
    const rng = SafeTemplateRenderer.createMulberry32(numSeed);
    const index = Math.floor(rng() * list.length);
    return list[index] || '';
  }
}
