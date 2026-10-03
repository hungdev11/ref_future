import { prisma } from '../client.js';
import { ReadingOutput } from '@mystic/core';

export interface SaveReadingParams {
  reading: ReadingOutput;
  inputSnapshot: Record<string, unknown>;
  factsSnapshot: Record<string, unknown>;
  userId?: string;
}

export class ReadingRepository {
  /**
   * Persists a deterministic reading along with all its sections and rule evaluation traces.
   */
  public static async saveReading(params: SaveReadingParams) {
    const { reading, inputSnapshot, factsSnapshot, userId } = params;

    const matchedRuleCodes = reading.ruleTraces
      .filter((t) => t.status === 'MATCHED')
      .map((t) => t.ruleCode);

    return prisma.reading.create({
      data: {
        id: reading.id,
        userId: userId ?? null,
        readingType: reading.readingType,
        engineVersion: reading.engineVersion,
        configVersion: reading.configVersion,
        rulesetVersion: reading.rulesetVersion,
        inputHash: reading.inputHash,
        inputSnapshot: JSON.stringify(inputSnapshot),
        factsSnapshot: JSON.stringify(factsSnapshot),
        matchedRuleCodes: JSON.stringify(matchedRuleCodes),
        qualityScore: reading.qualityScore ?? 100,
        isDegraded: reading.isDegraded,
        warnings: JSON.stringify(reading.degradationWarnings),
        sections: {
          create: reading.sections.map((sec, idx) => ({
            sectionOrder: sec.sectionOrder ?? idx,
            domain: sec.domain,
            title: sec.title,
            renderedText: sec.renderedText,
            sourceRuleCode: sec.sourceRuleCode,
            interpretationId: sec.interpretationId,
            themes: JSON.stringify(sec.themes ?? []),
            actionableAdvice: sec.actionableAdvice ?? null,
            explanation: sec.explanation ?? null,
            sourceReference: sec.sourceReference ?? null,
            laymanSummary: sec.laymanSummary ?? null,
            provenanceTraces: JSON.stringify(sec.provenanceTraces ?? []),
          })),
        },
        ruleTraces: {
          create: reading.ruleTraces.map((trace) => ({
            ruleCode: trace.ruleCode,
            status: trace.status,
            priority: trace.priority,
            specificity: trace.specificity,
            evaluatedConditions: JSON.stringify(trace.conditionsEvaluated ?? []),
            skipReason: trace.skipReason ?? null,
          })),
        },
      },
      include: {
        sections: true,
        ruleTraces: true,
      },
    });
  }

  /**
   * Fetches reading by its ID, rehydrating all JSON snapshots into typed objects.
   */
  public static async getReadingById(id: string): Promise<ReadingOutput | null> {
    const record = await prisma.reading.findUnique({
      where: { id },
      include: {
        sections: {
          orderBy: { sectionOrder: 'asc' },
        },
        ruleTraces: true,
      },
    });

    if (!record) return null;

    let warnings: string[] = [];
    try {
      warnings = record.warnings ? JSON.parse(record.warnings) : [];
    } catch {
      warnings = [];
    }

    return {
      id: record.id,
      readingType: record.readingType,
      engineVersion: record.engineVersion,
      configVersion: record.configVersion,
      rulesetVersion: record.rulesetVersion,
      inputHash: record.inputHash,
      isDegraded: record.isDegraded,
      degradationWarnings: warnings,
      qualityScore: record.qualityScore ?? undefined,
      createdAt: record.createdDate.toISOString(),
      sections: record.sections.map((s) => ({
        sectionOrder: s.sectionOrder,
        domain: s.domain as any,
        title: s.title,
        renderedText: s.renderedText,
        sourceRuleCode: s.sourceRuleCode,
        interpretationId: s.interpretationId,
        actionableAdvice: s.actionableAdvice ?? undefined,
        explanation: s.explanation ?? undefined,
        sourceReference: s.sourceReference ?? undefined,
        laymanSummary: s.laymanSummary ?? undefined,
        themes: s.themes ? JSON.parse(s.themes) : [],
        provenanceTraces: s.provenanceTraces ? JSON.parse(s.provenanceTraces) : [],
      })),
      ruleTraces: record.ruleTraces.map((t) => ({
        ruleCode: t.ruleCode,
        status: t.status as any,
        priority: t.priority,
        specificity: t.specificity,
        conditionsEvaluated: t.evaluatedConditions ? JSON.parse(t.evaluatedConditions) : [],
        skipReason: t.skipReason ?? undefined,
      })),
    };
  }

  /**
   * Lists recent readings
   */
  public static async listReadings(options?: { readingType?: string; limit?: number }) {
    const limit = options?.limit ?? 20;
    return prisma.reading.findMany({
      where: options?.readingType ? { readingType: options.readingType } : undefined,
      orderBy: { createdDate: 'desc' },
      take: limit,
      select: {
        id: true,
        readingType: true,
        createdDate: true,
        inputHash: true,
        qualityScore: true,
        isDegraded: true,
      },
    });
  }
}
