import { ReadingSectionData } from '@mystic/core';

export interface QualityAuditResult {
  passed: boolean;
  qualityScore: number; // 0 to 100
  provenanceCoverage: number; // 0 to 100%
  genericPhrasesDetected: string[];
  repetitionWarnings: string[];
  auditNotes: string[];
}

const BARNUM_PATTERNS: RegExp[] = [
  /đôi khi bạn.*nhưng đôi khi lại/i,
  /bạn có nhiều tiềm năng chưa được khai phá/i,
  /sâu thẳm bên trong bạn là người rất tốt/i,
  /đôi khi bạn cảm thấy không ai hiểu mình/i,
  /bạn thích sự độc lập nhưng cũng muốn có người bên cạnh/i,
];

export class QualityControlFilter {
  public static audit(sections: ReadingSectionData[]): QualityAuditResult {
    const genericPhrasesDetected: string[] = [];
    const repetitionWarnings: string[] = [];
    const auditNotes: string[] = [];

    let sectionsWithProvenance = 0;
    const seenSentences = new Set<string>();

    for (const sec of sections) {
      const text = sec.renderedText;

      // 1. Provenance Integrity Check
      if (sec.provenanceTraces && sec.provenanceTraces.length > 0) {
        sectionsWithProvenance++;
      } else {
        auditNotes.push(`Mục ${sec.domain} (${sec.title}) thiếu dấu vết nguồn gốc (provenance).`);
      }

      // 2. Anti-Barnum / Generic Statement Check
      for (const pattern of BARNUM_PATTERNS) {
        if (pattern.test(text)) {
          genericPhrasesDetected.push(`Phát hiện câu từ mơ hồ chung chung trong phần [${sec.title}]: "${pattern.source}"`);
        }
      }

      // 3. Repetition Check
      const sentences = text
        .split(/[.?!]/)
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 25);

      for (const sent of sentences) {
        if (seenSentences.has(sent)) {
          repetitionWarnings.push(`Phát hiện câu bị lặp lại trong phần [${sec.title}]: "${sent.slice(0, 40)}..."`);
        } else {
          seenSentences.add(sent);
        }
      }
    }

    const totalSections = Math.max(1, sections.length);
    const provenanceCoverage = Math.round((sectionsWithProvenance / totalSections) * 100);

    // Calculate score
    let score = 100;
    score -= genericPhrasesDetected.length * 15;
    score -= repetitionWarnings.length * 10;
    if (provenanceCoverage < 100) {
      score -= (100 - provenanceCoverage) * 0.5;
    }

    const finalScore = Math.max(0, Math.min(100, Math.round(score)));
    const passed = finalScore >= 80 && provenanceCoverage === 100;

    return {
      passed,
      qualityScore: finalScore,
      provenanceCoverage,
      genericPhrasesDetected,
      repetitionWarnings,
      auditNotes,
    };
  }
}
