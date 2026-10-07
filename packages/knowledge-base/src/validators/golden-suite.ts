import { KnowledgeStore } from '../registry/knowledge-store.js';
import { ProvenanceTracer } from '../registry/provenance-tracer.js';

export interface GoldenSuiteResult {
  totalCasesRan: number;
  passedCases: number;
  failedCases: number;
  domainBreakdown: Record<string, number>;
}

export function runGoldenSuite(): GoldenSuiteResult {
  const store = KnowledgeStore.getInstance();
  const tracer = new ProvenanceTracer(store);
  const rules = store.getAllRules();

  const domainBreakdown: Record<string, number> = {};
  let totalCasesRan = 0;
  let passedCases = 0;
  let failedCases = 0;

  // Simulate 50 synthetic test runs across the rules
  for (let i = 0; i < 50; i++) {
    const targetRule = rules[i % rules.length];
    if (!targetRule) continue;
    const trace = tracer.traceRule(targetRule.ruleId);

    domainBreakdown[targetRule.domain] = (domainBreakdown[targetRule.domain] || 0) + 1;
    totalCasesRan++;

    if (trace && trace.claims.length > 0 && trace.sources.length > 0) {
      passedCases++;
    } else {
      failedCases++;
    }
  }

  return {
    totalCasesRan,
    passedCases,
    failedCases,
    domainBreakdown,
  };
}

export function generateMasterAuditReport(): string {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const sources = store.getAllSources();
  const conflicts = store.getAllConflicts();

  const top20Rules = rules
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 20)
    .map((r, i) => `${i + 1}. [${r.ruleId}] (${r.domain.toUpperCase()} - Level ${r.evidenceLevel}): ${r.notes || r.pattern}`)
    .join('\n');

  const top20Conflicts = conflicts
    .slice(0, 20)
    .map((c, i) => `${i + 1}. [${c.conflictId}] (${c.conflictType}): ${c.topic} → Giải quyết: ${c.resolution}`)
    .join('\n');

  const missingAreas = [
    '1. Tử Vi: Dị bản an sao Thái Tuế và Thiên La Địa Võng giữa Bắc Phái và Nam Phái',
    '2. Chiêm Tinh: Hệ thống Houses Whole Sign vs Placidus trong các lá số vĩ độ cực Bắc',
    '3. Tarot: Đối chiếu biểu tượng Minor Arcana giữa bộ Visconti-Sforza và RWS',
    '4. Thần Số Học: Chuẩn hóa hệ thống chữ cái tiếng Việt có dấu (Đ/Â/Ă/Ơ/Ư) đối chiếu âm học Pythagoras',
    '5. Tương Hợp: Thang điểm tương tác giữa sao Hóa Kỵ xung chiếu Mệnh bạn đời trong Tử Vi',
  ].join('\n');

  return `
========================================================================
MASTER AUDIT REPORT — MYSTICOS KNOWLEDGE BASE
========================================================================
DOMAIN OVERVIEW:
- Total Sources: ${sources.length} (S0: ${sources.filter((s) => s.sourceLevel === 'S0').length}, S1: ${sources.filter((s) => s.sourceLevel === 'S1').length}, S2: ${sources.filter((s) => s.sourceLevel === 'S2').length})
- Total Rules: ${rules.length} (Verified Level A/B: ${rules.filter((r) => ['A', 'B'].includes(r.evidenceLevel)).length}, Derived Level E: ${rules.filter((r) => r.evidenceLevel === 'E').length})
- Conflicted Rules Resolved: ${conflicts.length}

------------------------------------------------------------------------
TOP 20 MOST IMPORTANT RULES
------------------------------------------------------------------------
${top20Rules}

------------------------------------------------------------------------
TOP 20 CONFLICTS
------------------------------------------------------------------------
${top20Conflicts}

------------------------------------------------------------------------
TOP 20 MISSING KNOWLEDGE AREAS
------------------------------------------------------------------------
${missingAreas}
========================================================================
`;
}
