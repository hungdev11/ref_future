import { SourceRecord, DomainType } from '../types/source.js';
import { AtomicClaim } from '../types/claim.js';
import { InterpretationRule } from '../types/rule.js';
import { SourceConflict } from '../types/conflict.js';
import { ALL_SOURCES } from '../sources/index.js';
import { ALL_CLAIMS } from '../claims/index.js';
import { ALL_RULES } from '../rules/index.js';
import { REGISTERED_CONFLICTS } from '../conflicts/index.js';

export class KnowledgeStore {
  private static instance: KnowledgeStore;

  private sources = new Map<string, SourceRecord>();
  private claims = new Map<string, AtomicClaim>();
  private rules = new Map<string, InterpretationRule>();
  private conflicts = new Map<string, SourceConflict>();

  private constructor() {
    for (const s of ALL_SOURCES) this.sources.set(s.sourceId, s);
    for (const c of ALL_CLAIMS) this.claims.set(c.claimId, c);
    for (const r of ALL_RULES) this.rules.set(r.ruleId, r);
    for (const conf of REGISTERED_CONFLICTS) this.conflicts.set(conf.conflictId, conf);
  }

  public static getInstance(): KnowledgeStore {
    if (!KnowledgeStore.instance) {
      KnowledgeStore.instance = new KnowledgeStore();
    }
    return KnowledgeStore.instance;
  }

  public getSource(sourceId: string): SourceRecord | undefined {
    return this.sources.get(sourceId);
  }

  public getClaim(claimId: string): AtomicClaim | undefined {
    return this.claims.get(claimId);
  }

  public getRule(ruleId: string): InterpretationRule | undefined {
    return this.rules.get(ruleId);
  }

  public getConflict(conflictId: string): SourceConflict | undefined {
    return this.conflicts.get(conflictId);
  }

  public getRulesByDomain(domain: DomainType): InterpretationRule[] {
    return Array.from(this.rules.values()).filter((r) => r.domain === domain);
  }

  public getRulesBySchool(school: string): InterpretationRule[] {
    return Array.from(this.rules.values()).filter((r) => r.school === school);
  }

  public getAllSources(): SourceRecord[] {
    return Array.from(this.sources.values());
  }

  public getAllClaims(): AtomicClaim[] {
    return Array.from(this.claims.values());
  }

  public getAllRules(): InterpretationRule[] {
    return Array.from(this.rules.values());
  }

  public getAllConflicts(): SourceConflict[] {
    return Array.from(this.conflicts.values());
  }
}
