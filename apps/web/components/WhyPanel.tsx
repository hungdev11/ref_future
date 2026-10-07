'use client';

import React, { useState } from 'react';
import type {
  MysticosResult,
  Interpretation,
  Pattern,
  Signal,
  EvidenceReference,
} from '@mystic/core';
import {
  FileText,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
  Search,
  ExternalLink,
  Cpu,
  Bookmark,
} from 'lucide-react';

export interface WhyPanelProps {
  result: MysticosResult;
  className?: string;
  defaultInterpretationId?: string;
}

export function WhyPanel({
  result,
  className = '',
  defaultInterpretationId,
}: WhyPanelProps) {
  const interpretations = result.interpretations || [];
  const [selectedInterpId, setSelectedInterpId] = useState<string>(
    defaultInterpretationId || interpretations[0]?.interpretationId || ''
  );
  const [showAllSources, setShowAllSources] = useState(false);

  const activeInterp: Interpretation | undefined =
    interpretations.find((i) => i.interpretationId === selectedInterpId) ||
    interpretations[0];

  // Derive linked nodes from the active interpretation
  const matchedPatterns: Pattern[] = (result.patterns || []).filter((p) =>
    activeInterp?.patternIds?.includes(p.patternId)
  );

  const matchedSignals: Signal[] = (result.signals || []).filter(
    (s) =>
      activeInterp?.signalIds?.includes(s.signalId) ||
      matchedPatterns.some((p) => p.signalIds?.includes(s.signalId))
  );

  const matchedRuleIds = Array.from(
    new Set([
      ...(activeInterp?.ruleIds || []),
      ...matchedSignals.flatMap((s) => s.ruleIds || []),
    ])
  );

  const matchedClaimIds = Array.from(
    new Set([
      ...matchedSignals.flatMap((s) => s.claimIds || []),
      ...(result.evidence || [])
        .filter(
          (e) =>
            matchedRuleIds.includes(e.ruleId) ||
            activeInterp?.evidenceIds?.includes(e.evidenceId)
        )
        .map((e) => e.claimId),
    ])
  );

  const matchedEvidence: EvidenceReference[] = (result.evidence || []).filter(
    (e) =>
      activeInterp?.evidenceIds?.includes(e.evidenceId) ||
      matchedRuleIds.includes(e.ruleId) ||
      matchedClaimIds.includes(e.claimId)
  );

  const allEvidence = result.evidence || [];

  return (
    <div
      className={`bg-surface border border-borderDark p-6 md:p-8 space-y-8 ${className}`}
    >
      {/* Panel Header */}
      <div className="border-b border-borderDark pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
            <span className="text-accentGold">TẦNG 5</span>
            <span>/</span>
            <span>MINH BẠCH SUY DIỄN & THƯ TỊCH (WHY PANEL)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-parchment font-medium tracking-tight">
            Vì Sao Hệ Thống Đưa Ra Kết Quả Này?
          </h3>
          <p className="text-xs text-stone max-w-2xl leading-relaxed">
            Hệ thống suy diễn tất định (Deterministic Engine). Tuyệt đối không dùng
            AI tạo sinh ngẫu nhiên hay suy diễn hộp đen. Mọi kết luận đều được
            truy nguyên qua chuỗi chứng cứ 6 cấp từ dữ kiện quan sát đến thư tịch
            kinh điển S0/S1.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-olive text-olive text-[11px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Deterministic Trace</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-borderDark text-stone text-[11px] font-mono">
            <Cpu className="w-3.5 h-3.5 text-accentGold" />
            <span>Rule Engine v{result.metadata?.rulesVersion || '1.0'}</span>
          </div>
        </div>
      </div>

      {/* Interpretation Picker (if multiple) */}
      {interpretations.length > 1 && (
        <div className="space-y-2">
          <label className="block text-[11px] font-mono text-stone uppercase tracking-wider">
            Chọn Luận Giải Cần Kiểm Chứng Căn Nguyên:
          </label>
          <div className="flex flex-wrap gap-2">
            {interpretations.map((interp, idx) => {
              const isSelected = interp.interpretationId === activeInterp?.interpretationId;
              return (
                <button
                  key={interp.interpretationId}
                  type="button"
                  onClick={() => setSelectedInterpId(interp.interpretationId)}
                  className={`px-3 py-2 text-xs font-mono text-left transition-colors border ${
                    isSelected
                      ? 'border-accentGold bg-background text-accentGold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment hover:border-borderLight'
                  }`}
                >
                  <span className="block text-[10px] text-stone/80 uppercase">
                    Mục {idx + 1} • {interp.dimension || 'Chung'}
                  </span>
                  <span className="line-clamp-1 font-serif text-xs">
                    {interp.headline || interp.statement}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 6-TIER PROVENANCE PIPELINE TRACE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-borderDark pb-2">
          <span className="font-mono text-xs text-accentGold uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Chuỗi Truy Nguyên Căn Nguyên (Provenance Pipeline Trace)</span>
          </span>
          <span className="font-mono text-[11px] text-stone">
            Interpretation ➔ Pattern ➔ Signal ➔ Rule ➔ Claim ➔ S0/S1 Citation
          </span>
        </div>

        <div className="relative border-l-2 border-borderDark ml-3 sm:ml-6 pl-4 sm:pl-8 space-y-8">
          {/* STEP 1: INTERPRETATION */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-accentGold border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-accentGold text-accentGold font-mono text-[10px] uppercase font-bold tracking-wider">
                Cấp 1: Luận Giải Suy Diễn (Interpretation)
              </span>
              <span className="font-mono text-[11px] text-stone">
                ID: {activeInterp?.interpretationId}
              </span>
              <span className="font-mono text-[11px] text-stone">
                Độ chuẩn xác: {((activeInterp?.confidence ?? 0.95) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="p-4 bg-background border border-borderDark space-y-1">
              <h4 className="font-serif text-sm sm:text-base text-parchment font-medium">
                {activeInterp?.headline || activeInterp?.statement}
              </h4>
              <p className="text-xs text-stone leading-relaxed">
                {activeInterp?.statement}
              </p>
            </div>
          </div>

          {/* STEP 2: PATTERN */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider">
                Cấp 2: Khuôn Mẫu Tổng Hợp (Synthesized Pattern)
              </span>
              <span className="font-mono text-[11px] text-stone">
                {matchedPatterns.length} khuôn mẫu khớp
              </span>
            </div>
            {matchedPatterns.length > 0 ? (
              <div className="space-y-2">
                {matchedPatterns.map((pat) => (
                  <div
                    key={pat.patternId}
                    className="p-3.5 bg-background border border-borderDark space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                      <span className="text-accentGold font-bold">{pat.patternId}</span>
                      <span className="text-stone">
                        Trọng số ưu tiên: {(pat.dominance * 100).toFixed(0)}% • Loại: {pat.type}
                      </span>
                    </div>
                    <p className="text-xs text-parchment font-serif">{pat.headline}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-background border border-borderDark text-xs font-mono text-stone italic">
                Khuôn mẫu trực tiếp từ các tín hiệu thành phần.
              </div>
            )}
          </div>

          {/* STEP 3: SIGNALS */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider">
                Cấp 3: Tín Hiệu Dẫn Xuất (Micro Signals)
              </span>
              <span className="font-mono text-[11px] text-stone">
                {matchedSignals.length} tín hiệu kích hoạt
              </span>
            </div>
            {matchedSignals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {matchedSignals.map((sig) => (
                  <div
                    key={sig.signalId}
                    className="p-3 bg-background border border-borderDark space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-accentGold font-bold truncate max-w-[150px]">
                        {sig.signalId}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 border ${
                          sig.polarity === 'supportive'
                            ? 'border-olive text-olive'
                            : sig.polarity === 'challenging'
                            ? 'border-cinnabar text-cinnabar'
                            : 'border-borderDark text-stone'
                        }`}
                      >
                        {sig.polarity}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone">
                      {sig.description || `Tín hiệu ${sig.type} thuộc bình diện ${sig.dimension}`}
                    </p>
                    <div className="text-[10px] font-mono text-stone/80">
                      Cường độ: {(sig.strength * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-background border border-borderDark text-xs font-mono text-stone italic">
                Tín hiệu gốc từ dữ kiện đầu vào.
              </div>
            )}
          </div>

          {/* STEP 4: DETERMINISTIC RULES */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider">
                Cấp 4: Quy Tắc Logic Khớp (Deterministic Rules)
              </span>
              <span className="font-mono text-[11px] text-stone">
                {matchedRuleIds.length} luật logic thỏa mãn
              </span>
            </div>
            {matchedRuleIds.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedRuleIds.map((rId) => (
                  <div
                    key={rId}
                    className="px-2.5 py-1.5 bg-background border border-borderDark text-xs font-mono flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-olive inline-block" />
                    <span className="text-parchment">{rId}</span>
                    <span className="text-[10px] text-stone">(MATCHED)</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-background border border-borderDark text-xs font-mono text-stone italic">
                Quy tắc tích hợp theo mô hình tiêu chuẩn.
              </div>
            )}
          </div>

          {/* STEP 5: ATOMIC CLAIMS */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-borderLight border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-borderLight text-parchment font-mono text-[10px] uppercase tracking-wider">
                Cấp 5: Mệnh Đề Chân Lý Nguyên Tử (Atomic Claims)
              </span>
              <span className="font-mono text-[11px] text-stone">
                {matchedClaimIds.length} mệnh đề ontology
              </span>
            </div>
            {matchedClaimIds.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {matchedClaimIds.map((cId) => (
                  <span
                    key={cId}
                    className="px-2 py-1 bg-background border border-borderDark text-accentGold font-mono text-[11px]"
                  >
                    {cId}
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-background border border-borderDark text-xs font-mono text-stone italic">
                Mệnh đề chuẩn tắc trong cơ sở tri thức.
              </div>
            )}
          </div>

          {/* STEP 6: S0/S1 SOURCE CITATIONS */}
          <div className="relative space-y-2">
            <div className="absolute -left-[23px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-none bg-accentGold border-2 border-background" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-background border border-accentGold text-accentGold font-mono text-[10px] uppercase font-bold tracking-wider">
                Cấp 6: Thư Tịch Gốc & Trích Dẫn Thư Viện (S0 / S1 Citations)
              </span>
              <span className="font-mono text-[11px] text-stone">
                {matchedEvidence.length} nguồn thư tịch đối chiếu
              </span>
            </div>
            {matchedEvidence.length > 0 ? (
              <div className="space-y-3">
                {matchedEvidence.map((ev, eIdx) => {
                  const isLevelA = ev.evidenceLevel === 'A';
                  return (
                    <div
                      key={ev.evidenceId || eIdx}
                      className="p-4 bg-background border border-borderDark space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 border text-[10px] font-bold ${
                              isLevelA
                                ? 'border-accentGold text-accentGold'
                                : 'border-stone text-stone'
                            }`}
                          >
                            CẤP {ev.evidenceLevel} — {isLevelA ? 'THƯ TỊCH GỐC S0' : 'BÌNH CHÚ CHUẨN S1'}
                          </span>
                          <span className="text-stone">[{ev.sourceId}]</span>
                        </div>
                        <span className="text-stone text-[11px]">Luật: {ev.ruleId}</span>
                      </div>

                      <div className="font-serif text-sm text-parchment">
                        📖 {ev.sourceTitle}
                      </div>

                      <div className="p-2.5 bg-surface border-l-2 border-accentGold text-[11px] font-mono text-stone leading-relaxed">
                        {ev.citation}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3.5 bg-background border border-borderDark text-xs font-mono text-stone space-y-1">
                <div>Trường phái: <strong className="text-parchment">{result.metadata?.school}</strong></div>
                <div className="text-[11px] text-stone/80">
                  Phiên bản cơ sở tri thức: {result.metadata?.knowledgeBaseVersion}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* COMPREHENSIVE BIBLIOGRAPHY (ALL CITATIONS IN THE READING) */}
      {allEvidence.length > 0 && (
        <div className="border-t border-borderDark pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accentGold" />
              <span className="font-mono text-xs text-parchment uppercase tracking-wider">
                Mục Lục Thư Tịch Gốc Toàn Bàn (Canonical Bibliography Registry)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAllSources(!showAllSources)}
              className="px-3 py-1 bg-background border border-borderDark text-stone hover:text-accentGold font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{showAllSources ? 'Thu gọn' : `Xem toàn bộ (${allEvidence.length})`}</span>
              {showAllSources ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAllSources && (
            <div className="divide-y divide-borderDark border border-borderDark bg-background">
              {allEvidence.map((ev, idx) => (
                <div key={idx} className="p-3.5 space-y-1 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px]">
                    <span className="text-accentGold">
                      [{ev.evidenceLevel}] {ev.sourceId} • {ev.ruleId}
                    </span>
                    <span className="text-stone">{ev.claimId}</span>
                  </div>
                  <div className="font-serif text-xs text-parchment">
                    {ev.sourceTitle}
                  </div>
                  <div className="text-[11px] text-stone font-mono leading-relaxed">
                    {ev.citation}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
