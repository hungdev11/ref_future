import { prisma } from '../client.js';

export interface SaveCompatibilityReportParams {
  id?: string;
  creatorUserId?: string;
  personAProfileId?: string;
  personBProfileId?: string;
  personAName: string;
  personBName: string;
  precisionLevel: string;
  relationshipType: string;
  methodVersion?: string;
  rulesetVersion?: string;
  factsSnapshot: Record<string, unknown>;
  reportSections: unknown[];
  dimensions: unknown[];
  synthesis: Record<string, unknown>;
  guidance: unknown[];
}

export class CompatibilityRepository {
  public static async saveReport(params: SaveCompatibilityReportParams) {
    return prisma.compatibilityReport.create({
      data: {
        id: params.id,
        creatorUserId: params.creatorUserId ?? null,
        personAProfileId: params.personAProfileId ?? null,
        personBProfileId: params.personBProfileId ?? null,
        personAName: params.personAName,
        personBName: params.personBName,
        precisionLevel: params.precisionLevel,
        relationshipType: params.relationshipType,
        methodVersion: params.methodVersion ?? 'COMPATIBILITY_V1',
        rulesetVersion: params.rulesetVersion ?? 'COMPATIBILITY_V1',
        factsSnapshot: JSON.stringify(params.factsSnapshot),
        reportSections: JSON.stringify(params.reportSections),
        dimensions: JSON.stringify(params.dimensions),
        synthesis: JSON.stringify(params.synthesis),
        guidance: JSON.stringify(params.guidance),
      },
    });
  }

  public static async getReportById(id: string) {
    const report = await prisma.compatibilityReport.findUnique({
      where: { id },
    });

    if (!report) return null;

    return {
      ...report,
      factsSnapshot: JSON.parse(report.factsSnapshot),
      reportSections: JSON.parse(report.reportSections),
      dimensions: JSON.parse(report.dimensions),
      synthesis: JSON.parse(report.synthesis),
      guidance: JSON.parse(report.guidance),
    };
  }

  public static async listReports(limit = 20) {
    return prisma.compatibilityReport.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        personAName: true,
        personBName: true,
        relationshipType: true,
        precisionLevel: true,
        createdAt: true,
      },
    });
  }
}
