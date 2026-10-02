import * as crypto from 'crypto';
import {
  ReadingOutput,
  ReadingSectionData,
  ReadingDomain,
  RuleDefinition,
} from '@mystic/core';
import { DeterministicRuleResolver } from '@mystic/rule-engine';
import { SafeTemplateRenderer } from '@mystic/template-engine';
import { KNOWLEDGE_CATALOG, BASELINE_RULES, InterpretationDefinition } from './catalog.js';

export interface ComposeReadingRequest {
  readingType: string;
  dotNotatedFacts: Record<string, unknown>;
  inputSnapshot: Record<string, unknown>;
  rules?: RuleDefinition[];
  catalog?: Record<string, InterpretationDefinition>;
  isDegraded?: boolean;
  degradationWarnings?: string[];
  engineVersion?: string;
  configVersion?: string;
  rulesetVersion?: string;
}

const DOMAIN_ORDER: ReadingDomain[] = [
  ReadingDomain.OVERVIEW,
  ReadingDomain.STRENGTHS,
  ReadingDomain.CHALLENGES,
  ReadingDomain.CAREER,
  ReadingDomain.FINANCE,
  ReadingDomain.LOVE,
  ReadingDomain.SOCIAL,
  ReadingDomain.REFLECTION,
];

export class ReadingResultComposer {
  public static compose(request: ComposeReadingRequest): ReadingOutput {
    const rules = request.rules ?? BASELINE_RULES;
    const catalog = request.catalog ?? KNOWLEDGE_CATALOG;
    const facts = request.dotNotatedFacts;

    // 1. Evaluate Rule Engine
    const resolution = DeterministicRuleResolver.resolve(rules, facts);

    // 2. Assemble Sections
    const rawSections: ReadingSectionData[] = [];
    const seenDomainPerInterpretation = new Set<string>();

    for (const rule of resolution.matchedRules) {
      const interpId = rule.action.targetInterpretationId;
      const interp = catalog[interpId];
      if (!interp) continue;

      for (const domain of DOMAIN_ORDER) {
        const block = interp.blocks[domain];
        if (!block) continue;

        const dedupeKey = `${interpId}:${domain}`;
        if (seenDomainPerInterpretation.has(dedupeKey)) continue;
        seenDomainPerInterpretation.add(dedupeKey);

        const renderedText = SafeTemplateRenderer.render(block.template, { facts });

        rawSections.push({
          sectionOrder: 0, // Assigned after sorting
          domain,
          title: block.title,
          renderedText,
          sourceRuleCode: rule.ruleCode,
          interpretationId: interpId,
        });
      }
    }

    // 3. Sort sections strictly by canonical domain order
    rawSections.sort((a, b) => {
      const orderA = DOMAIN_ORDER.indexOf(a.domain);
      const orderB = DOMAIN_ORDER.indexOf(b.domain);
      return orderA - orderB;
    });

    // 4. Assign sequential 1-indexed sectionOrder
    const finalSections = rawSections.map((sec, idx) => ({
      ...sec,
      sectionOrder: idx + 1,
    }));

    const inputHash = crypto
      .createHash('sha256')
      .update(JSON.stringify(request.inputSnapshot))
      .digest('hex');

    const readingId = `reading_${crypto.randomUUID().slice(0, 8)}`;

    return {
      id: readingId,
      readingType: request.readingType,
      engineVersion: request.engineVersion ?? '1.0.0',
      configVersion: request.configVersion ?? 'V1',
      rulesetVersion: request.rulesetVersion ?? 'RULESET_V1',
      inputHash,
      isDegraded: request.isDegraded ?? false,
      degradationWarnings: request.degradationWarnings ?? [],
      sections: finalSections,
      ruleTraces: resolution.allTraces,
      createdAt: new Date().toISOString(),
    };
  }
}

