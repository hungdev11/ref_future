import { KnowledgeStore } from '../registry/knowledge-store.js';

export interface ProvenanceAuditReport {
  totalRules: number;
  totalClaims: number;
  totalSources: number;
  orphanRulesCount: number;
  missingSourcesCount: number;
  passRate: number;
  errors: string[];
}

export function runProvenanceAudit(): ProvenanceAuditReport {
  const store = KnowledgeStore.getInstance();
  const rules = store.getAllRules();
  const claims = store.getAllClaims();
  const sources = store.getAllSources();

  const sourceIds = new Set(sources.map((s) => s.sourceId));
  const claimIds = new Set(claims.map((c) => c.claimId));

  const errors: string[] = [];
  let orphanRulesCount = 0;
  let missingSourcesCount = 0;

  for (const rule of rules) {
    let ruleHasError = false;

    if (!rule.claimIds || rule.claimIds.length === 0) {
      errors.push(`Rule ${rule.ruleId} has no linked claimIds`);
      orphanRulesCount++;
      ruleHasError = true;
    } else {
      for (const cId of rule.claimIds) {
        if (!claimIds.has(cId)) {
          errors.push(`Rule ${rule.ruleId} references missing claim ${cId}`);
          orphanRulesCount++;
          ruleHasError = true;
        }
      }
    }

    if (!rule.sourceIds || rule.sourceIds.length === 0) {
      errors.push(`Rule ${rule.ruleId} has no linked sourceIds`);
      missingSourcesCount++;
      ruleHasError = true;
    } else {
      for (const sId of rule.sourceIds) {
        if (!sourceIds.has(sId)) {
          errors.push(`Rule ${rule.ruleId} references missing source ${sId}`);
          missingSourcesCount++;
          ruleHasError = true;
        }
      }
    }
  }

  const validRulesCount = rules.filter((r) =>
    r.claimIds && r.claimIds.length > 0 && r.claimIds.every((c) => claimIds.has(c)) &&
    r.sourceIds && r.sourceIds.length > 0 && r.sourceIds.every((s) => sourceIds.has(s))
  ).length;

  const passRate = rules.length === 0 ? 0 : validRulesCount / rules.length;

  return {
    totalRules: rules.length,
    totalClaims: claims.length,
    totalSources: sources.length,
    orphanRulesCount,
    missingSourcesCount,
    passRate,
    errors,
  };
}
