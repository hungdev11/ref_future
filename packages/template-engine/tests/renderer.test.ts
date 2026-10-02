import { describe, it, expect } from 'vitest';
import { SafeTemplateRenderer } from '../src/index.js';

describe('SafeTemplateRenderer', () => {
  it('interpolates single and nested tokens', () => {
    const template = 'Bạn có Mặt Trời tại {{sign}} với đặc tính {{traits.primary}}.';
    const context = {
      variables: {
        sign: 'Sư Tử',
        traits: { primary: 'sáng tạo và hào hiệp' },
      },
    };

    const result = SafeTemplateRenderer.render(template, context);
    expect(result).toBe('Bạn có Mặt Trời tại Sư Tử với đặc tính sáng tạo và hào hiệp.');
  });

  it('handles conditional blocks {{#if}} correctly', () => {
    const template = 'Năng lượng mạnh mẽ.{{#if isRetrograde}} Bạn đang có chu kỳ nghịch hành.{{/if}}';

    const resultTrue = SafeTemplateRenderer.render(template, {
      variables: { isRetrograde: true },
    });
    expect(resultTrue).toBe('Năng lượng mạnh mẽ. Bạn đang có chu kỳ nghịch hành.');

    const resultFalse = SafeTemplateRenderer.render(template, {
      variables: { isRetrograde: false },
    });
    expect(resultFalse).toBe('Năng lượng mạnh mẽ.');
  });

  it('renders clear fallback placeholder when variable is missing', () => {
    const template = 'Mệnh của bạn là {{missing_var}}.';
    const result = SafeTemplateRenderer.render(template, { variables: {} });
    expect(result).toBe('Mệnh của bạn là [Chưa xác định: missing_var].');
  });
});
