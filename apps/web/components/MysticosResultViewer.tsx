'use client';

import React from 'react';
import type { MysticosResult } from '@mystic/core';
import { adaptToUserFacingResult } from '../lib/result-adapter';
import {
  ResultHero,
  KeyThemes,
  HowItMayManifest,
  WatchFor,
  PracticalGuidance,
  WhyThisResult,
  TechnicalDetails,
} from './result';

export interface MysticosResultViewerProps {
  result: MysticosResult;
  className?: string;
}

export function MysticosResultViewer({
  result,
  className = '',
}: MysticosResultViewerProps) {
  if (!result) return null;

  const viewModel = adaptToUserFacingResult(result);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      <ResultHero result={viewModel} />
      <KeyThemes themes={viewModel.keyThemes} />
      <HowItMayManifest manifestations={viewModel.manifestations} />
      <WatchFor tensions={viewModel.tensions} />
      <PracticalGuidance guidance={viewModel.guidance} />
      <WhyThisResult rawResult={viewModel.rawResult} />
      <TechnicalDetails rawResult={viewModel.rawResult} />
    </article>
  );
}
