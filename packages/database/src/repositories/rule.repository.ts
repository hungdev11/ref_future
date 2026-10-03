import { prisma } from '../client.js';

export class RuleRepository {
  public static async getPublishedRules(scope?: string) {
    return prisma.rule.findMany({
      where: {
        status: 'PUBLISHED',
        scope: scope ? scope : undefined,
      },
      include: {
        interpretation: {
          include: {
            blocks: true,
          },
        },
      },
      orderBy: { priority: 'desc' },
    });
  }

  public static async getAllRules() {
    return prisma.rule.findMany({
      include: {
        ruleSet: true,
        interpretation: true,
      },
      orderBy: { priority: 'desc' },
    });
  }
}
