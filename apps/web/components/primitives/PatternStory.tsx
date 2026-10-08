import React from 'react';
import type { MainStory } from '@mystic/core';

export interface PatternStoryProps {
  story?: MainStory;
  headline?: string;
  narrative?: string;
  centralTension?: string;
  focalEntity?: string;
  className?: string;
}

export function PatternStory({
  story,
  headline,
  narrative,
  centralTension,
  focalEntity,
  className = '',
}: PatternStoryProps) {
  const activeHeadline = story?.headline || headline || '';
  const activeNarrative = story?.narrative || narrative || '';
  const activeTension = story?.centralTension || centralTension;
  const activeEntity = story?.focalEntity || focalEntity;

  if (!activeHeadline && !activeNarrative) {
    return null;
  }

  return (
    <div
      className={`border-l-2 border-accentGold border-y border-r border-borderDark bg-surface p-6 sm:p-8 space-y-5 rounded-none ${className}`}
    >
      {/* Archival Label & Focal Entity */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderDark/60 pb-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-accentGold tracking-widest uppercase">
          <span>02</span>
          <span className="text-borderLight">/</span>
          <span>CỐT TRUYỆN DIỄN TIẾN TRỌNG TÂM</span>
        </div>
        {activeEntity && !activeEntity.startsWith('CONTEXTUAL_') && !activeEntity.startsWith('PAT_') ? (
          <span className="text-stone tracking-wide">
            TRỌNG TÂM: <span className="text-parchment font-mono">{activeEntity}</span>
          </span>
        ) : (
          <span className="text-accentGold tracking-wider font-mono text-[11px] uppercase">
            [MẠCH CHUYỂN BIẾN CHỦ ĐẠO]
          </span>
        )}
      </div>

      {/* Narrative Headline */}
      <h3 className="text-xl sm:text-2xl font-serif text-parchment font-medium tracking-tight leading-snug">
        {activeHeadline}
      </h3>

      {/* Main Narrative Body */}
      <p className="font-sans text-parchment/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        {activeNarrative}
      </p>

      {/* Central Tension Callout if present */}
      {activeTension && (
        <div className="border border-borderDark bg-background/60 p-4 space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accentGold block">
            ĐIỂM NGHẼN GIẰNG CO TRỌNG TÂM
          </span>
          <p className="font-sans text-parchment/90 text-xs sm:text-sm leading-relaxed">
            {activeTension}
          </p>
        </div>
      )}
    </div>
  );
}
