import { KnowledgeStore } from '../registry/knowledge-store.js';

const GENERIC_PLATITUDES = [
  'hãy kiên nhẫn',
  'hãy tin vào bản thân',
  'hãy cân bằng',
  'hãy giao tiếp',
  'bạn đang ở giai đoạn',
  'đây là thời điểm',
];

export interface AntiGenericAuditResult {
  totalRulesChecked: number;
  collisionRate: number;
  detectedPlatitudesCount: number;
  platitudesFound: string[];
  isPassed: boolean;
}

export function runAntiGenericAudit(): AntiGenericAuditResult {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const platitudesFound: string[] = [];

  const patterns = new Set<string>();
  let patternCollisions = 0;

  for (const rule of rules) {
    if (rule.pattern) {
      if (patterns.has(rule.pattern)) {
        patternCollisions++;
      } else {
        patterns.add(rule.pattern);
      }
    }

    const note = (rule.notes || '').toLowerCase();
    for (const plat of GENERIC_PLATITUDES) {
      if (note.includes(plat)) {
        platitudesFound.push(`Rule ${rule.ruleId} contains platitude: "${plat}"`);
      }
    }
  }

  const collisionRate = rules.length > 0 ? patternCollisions / rules.length : 0;
  const isPassed = collisionRate <= 0.15 && platitudesFound.length === 0;

  return {
    totalRulesChecked: rules.length,
    collisionRate,
    detectedPlatitudesCount: platitudesFound.length,
    platitudesFound,
    isPassed,
  };
}
