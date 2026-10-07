import { KnowledgeStore } from './knowledge-store.js';
import { InterpretationRule, EvidenceLevel } from '../types/rule.js';
import { AtomicClaim } from '../types/claim.js';
import { SourceRecord } from '../types/source.js';

export interface TraceableProvenanceResult {
  ruleId: string;
  domain: string;
  school: string;
  evidenceLevel: EvidenceLevel;
  confidence: string;
  pattern?: string;
  rule: InterpretationRule;
  claims: AtomicClaim[];
  sources: SourceRecord[];
}

export class ProvenanceTracer {
  constructor(private store: KnowledgeStore = KnowledgeStore.getInstance()) {}

  public traceRule(ruleId: string): TraceableProvenanceResult | undefined {
    const rule = this.store.getRule(ruleId);
    if (!rule) return undefined;

    const claims: AtomicClaim[] = [];
    for (const cId of rule.claimIds) {
      const c = this.store.getClaim(cId);
      if (c) claims.push(c);
    }

    const sources: SourceRecord[] = [];
    for (const sId of rule.sourceIds) {
      const s = this.store.getSource(sId);
      if (s) sources.push(s);
    }

    return {
      ruleId: rule.ruleId,
      domain: rule.domain,
      school: rule.school,
      evidenceLevel: rule.evidenceLevel,
      confidence: rule.confidence,
      pattern: rule.pattern,
      rule,
      claims,
      sources,
    };
  }

  public formatFootnote(ruleId: string): string {
    const trace = this.traceRule(ruleId);
    if (!trace) return `[Provenance: Unknown rule ${ruleId}]`;

    const sourceCitations = trace.sources
      .map((s) => `${s.title} (${s.author || 'Cổ Thư'}${s.publicationYear ? `, ${s.publicationYear}` : ''})`)
      .join('; ');

    const locations = trace.claims
      .map((c) => {
        if (!c.location) return '';
        const parts = [c.location.chapter, c.location.section, c.location.page].filter(Boolean);
        return parts.join(', ');
      })
      .filter(Boolean)
      .join('; ');

    return `Rule: ${trace.ruleId} [Level ${trace.evidenceLevel}] | Nguồn: ${sourceCitations}${locations ? ` | Vị trí: ${locations}` : ''}`;
  }
}
