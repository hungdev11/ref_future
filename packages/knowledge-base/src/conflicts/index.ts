import { SourceConflict } from '../types/conflict.js';
import { REGISTERED_CONFLICTS } from './source-conflicts.js';

export * from './source-conflicts.js';

const CONFLICTS_BY_ID = new Map<string, SourceConflict>(
  REGISTERED_CONFLICTS.map((c) => [c.conflictId, c])
);

export function resolveConflict(conflictId: string): SourceConflict | undefined {
  return CONFLICTS_BY_ID.get(conflictId);
}
