'use client';

import React from 'react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import {
  TarotResultView,
  AstrologyResultView,
  TuViResultView,
  NumerologyResultView,
  CompatibilityResultView,
} from './domain-results';
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

  const deepResult = result as DeepMysticosResult;

  switch (result.domain) {
    case 'tarot':
      return <TarotResultView result={deepResult} className={className} />;
    case 'astrology':
      return <AstrologyResultView result={deepResult} className={className} />;
    case 'tuvi':
      return <TuViResultView result={deepResult} className={className} />;
    case 'numerology':
      return <NumerologyResultView result={deepResult} className={className} />;
    case 'compatibility':
      return <CompatibilityResultView result={deepResult} className={className} />;
    default: {
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
  }
}
