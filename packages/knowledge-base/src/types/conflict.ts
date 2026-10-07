export type ConflictType =
  | 'different_school'
  | 'different_era'
  | 'different_definition'
  | 'true_contradiction';

export type ConflictResolution =
  | 'keep_separate'
  | 'school_specific'
  | 'prefer_primary'
  | 'requires_user_choice'
  | 'exclude';

export interface SourceConflict {
  conflictId: string;
  topic: string;
  sources: string[];
  schoolA: string;
  schoolB: string;
  claimA: string;
  claimB: string;
  conflictType: ConflictType;
  resolution: ConflictResolution;
  notes?: string;
}
