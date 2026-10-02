export interface NumerologyConfig {
  configVersion: string;
  preserveMasterNumbers: boolean; // default true
  masterNumbers: number[]; // [11, 22, 33]
  lifePathMethod: 'REDUCE_COMPONENTS_FIRST' | 'SUM_ALL_DIGITS';
}

export const PYTHAGOREAN_CONFIG_V1: NumerologyConfig = {
  configVersion: 'PYTHAGOREAN_V1',
  preserveMasterNumbers: true,
  masterNumbers: [11, 22, 33],
  lifePathMethod: 'REDUCE_COMPONENTS_FIRST',
};

export const PYTHAGOREAN_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export const STANDARD_VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
