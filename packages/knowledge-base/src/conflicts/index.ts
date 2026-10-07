import { SourceConflict } from '../types/conflict.js';
import { REGISTERED_CONFLICTS } from './source-conflicts.js';

export * from './source-conflicts.js';

export function resolveConflict(conflictId: string): SourceConflict | undefined {
  return REGISTERED_CONFLICTS.find((c) => c.conflictId === conflictId);
}
