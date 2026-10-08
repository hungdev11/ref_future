import React from 'react';
import type { ResultDepth } from '@mystic/core';

export interface InsightBlockProps {
  depth?: ResultDepth | string;
  headline: string;
  statement: string;
  explanation?: string;
  constructiveExpression?: string;
  tension?: string;
  polarity?: 'supportive' | 'challenging' | 'mixed' | 'context_dependent' | string;
  dimension?: string;
  className?: string;
}

export function InsightBlock({
  depth = 'DEPTH_3',
  headline,
  statement,
  explanation,
  constructiveExpression,
  tension,
  polarity,
  dimension,
  className = '',
}: InsightBlockProps) {
  const isDepth1 = depth === 'DEPTH_1';
  const isDepth2 = depth === 'DEPTH_2';
  const showExplanation = !isDepth1 && !isDepth2 && Boolean(explanation);
  const showDeepNuances = (depth === 'DEPTH_4' || depth === 'DEPTH_5');

  // Deduplicate headline and statement
  let displayTitle = headline ? headline.trim() : '';
  let displayStatement = statement ? statement.trim() : '';

  if (displayStatement && displayTitle === displayStatement) {
    if (displayTitle.includes(': ')) {
      const colonIdx = displayTitle.indexOf(': ');
      displayStatement = displayTitle.slice(colonIdx + 2).trim();
      displayTitle = displayTitle.slice(0, colonIdx).trim();
    } else {
      displayStatement = '';
    }
  } else if (displayTitle && displayStatement && displayStatement.startsWith(displayTitle)) {
    const stripped = displayStatement.slice(displayTitle.length).replace(/^[:\s-]+/, '').trim();
    if (stripped) {
      displayStatement = stripped;
    }
  }

  // Deduplicate explanation if it repeats headline or statement
  let cleanExplanation = explanation ? explanation.trim() : '';
  if (cleanExplanation) {
    if (displayStatement && cleanExplanation.startsWith(displayStatement)) {
      cleanExplanation = cleanExplanation.slice(displayStatement.length).replace(/^[:\s.-]+/, '').trim();
    } else if (headline && cleanExplanation.startsWith(headline.trim())) {
      cleanExplanation = cleanExplanation.slice(headline.trim().length).replace(/^[:\s.-]+/, '').trim();
    }
    // Capitalize first letter of clean explanation if needed
    if (cleanExplanation.length > 0) {
      cleanExplanation = cleanExplanation.charAt(0).toUpperCase() + cleanExplanation.slice(1);
    }
  }

  if (isDepth1) {
    return (
      <div
        className={`border border-borderDark bg-surface/60 px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-2 ${className}`}
      >
        <span className="font-serif text-parchment font-medium text-sm tracking-tight shrink-0">
          {displayTitle}{displayStatement ? ':' : ''}
        </span>
        {displayStatement ? (
          <span className="font-sans text-stone text-sm leading-relaxed">
            {displayStatement}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`border border-borderDark bg-surface p-5 sm:p-6 space-y-4 rounded-none ${className}`}
    >
      {/* Editorial Header & Metadata */}
      <div className="flex items-center justify-between gap-3 text-xs font-mono text-stone border-b border-borderDark/60 pb-3">
        <div className="flex items-center gap-2 tracking-wider uppercase">
          <span className="text-accentGold">
            {depth === 'DEPTH_5'
              ? 'ĐỘ SÂU TOÀN DIỆN'
              : depth === 'DEPTH_4'
              ? 'ĐỘ SÂU ĐA CHIỀU'
              : depth === 'DEPTH_3'
              ? 'ĐỘ SÂU TIÊU CHUẨN'
              : 'ĐỘ SÂU TỔNG QUAN'}
          </span>
          {dimension && (
            <>
              <span className="text-borderLight">/</span>
              <span>{dimension}</span>
            </>
          )}
        </div>
        {polarity && (
          <span className="text-[11px] uppercase tracking-widest text-stone">
            {polarity === 'supportive'
              ? '[TÍCH CỰC]'
              : polarity === 'challenging'
              ? '[THỬ THÁCH]'
              : polarity === 'mixed'
              ? '[LƯỠNG PHÂN]'
              : '[TÙY BỐI CẢNH]'}
          </span>
        )}
      </div>

      {/* Main Core Assertion */}
      <div className="space-y-2">
        <h4 className="text-lg sm:text-xl font-serif text-parchment font-medium tracking-tight leading-snug">
          {displayTitle}
        </h4>
        {displayStatement ? (
          <p className="font-sans text-parchment/90 text-sm sm:text-base leading-relaxed">
            {displayStatement}
          </p>
        ) : null}
      </div>

      {/* Depth 3+ Explanation */}
      {showExplanation && cleanExplanation && (
        <div className="border-t border-borderDark/50 pt-3 space-y-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-stone block">
            CƠ CHẾ TÁC ĐỘNG &amp; SUY LUẬN
          </span>
          <p className="font-sans text-stone text-sm leading-relaxed">
            {cleanExplanation}
          </p>
        </div>
      )}

      {/* Depth 4/5 Nuances: Constructive Expression & Tension */}
      {showDeepNuances && (constructiveExpression || tension) && (
        <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {constructiveExpression && (
            <div className="border-l-2 border-accentGold bg-background/40 p-3 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accentGold block">
                HƯỚNG PHÁT TRIỂN KIẾN TẠO
              </span>
              <p className="font-sans text-parchment/90 text-xs sm:text-sm leading-relaxed">
                {constructiveExpression}
              </p>
            </div>
          )}
          {tension && (
            <div className="border-l-2 border-terracotta bg-background/40 p-3 space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-terracotta block">
                ĐIỂM NGHẼN &amp; RỦI RO LƯU TÂM
              </span>
              <p className="font-sans text-parchment/90 text-xs sm:text-sm leading-relaxed">
                {tension}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
