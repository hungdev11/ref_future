export interface TemplateRenderContext {
  facts?: Record<string, unknown>;
  variables?: Record<string, unknown>;
}

export class SafeTemplateRenderer {
  public static render(template: string, context: TemplateRenderContext): string {
    const combinedContext: Record<string, unknown> = {
      ...(context.facts ?? {}),
      ...(context.variables ?? {}),
    };

    let processed = template.replace(
      /\{\{#if\s+([a-zA-Z0-9_.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
      (_, key, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        return Boolean(val) ? content : '';
      }
    );

    processed = processed.replace(
      /\{\{#unless\s+([a-zA-Z0-9_.]+)\}\}([\s\S]*?)\{\{\/unless\}\}/g,
      (_, key, content) => {
        const val = SafeTemplateRenderer.resolveKey(combinedContext, key);
        return !Boolean(val) ? content : '';
      }
    );

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

