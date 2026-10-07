import { ResultDepth } from '@mystic/core';

export class ResultDepthEngine {
  public static calculateDepth(importance: number, contextFit: number): ResultDepth {
    const score = importance * 0.6 + contextFit * 0.4;
    if (score >= 0.88) return 'DEPTH_5';
    if (score >= 0.77) return 'DEPTH_4';
    if (score >= 0.60) return 'DEPTH_3';
    if (score >= 0.45) return 'DEPTH_2';
    return 'DEPTH_1';
  }
}
