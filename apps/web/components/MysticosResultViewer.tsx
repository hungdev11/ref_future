'use client';

import React, { useState } from 'react';
import type {
  MysticosResult,
  Interpretation,
  Pattern,
  Relationship,
  Guidance,
  Fact,
} from '@mystic/core';
import {
  ShieldCheck,
  Cpu,
  Clock,
  Compass,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Target,
  Sparkles,
} from 'lucide-react';
import { WhyPanel } from './WhyPanel';

export interface MysticosResultViewerProps {
  result: MysticosResult;
  className?: string;
}

const DOMAIN_TITLES: Record<string, { label: string; number: string }> = {
  tarot: { label: 'Khảo Cứu Tarot Rider-Waite', number: '04' },
  astrology: { label: 'Bản Đồ Sao Chiêm Tinh Học', number: '01' },
  tuvi: { label: 'Thiên Bàn Tử Vi Đẩu Số', number: '02' },
  numerology: { label: 'Hệ Thống Thần Số Học Pythagoras', number: '03' },
  compatibility: { label: 'Khảo Luận Tương Hợp Đa Hệ Thống', number: '05' },
};

export function MysticosResultViewer({
  result,
  className = '',
}: MysticosResultViewerProps) {
  const [showAllFacts, setShowAllFacts] = useState(false);

  const domainMeta = DOMAIN_TITLES[result.domain] || {
    label: `Khảo Cứu ${result.domain.toUpperCase()}`,
    number: '00',
  };

  const facts: Fact[] = result.facts || [];
  const interpretations: Interpretation[] = result.interpretations || [];
  const patterns: Pattern[] = result.patterns || [];
  const relationships: Relationship[] = result.relationships || [];
  const guidance: Guidance[] = result.guidance || [];
  const tensions = result.tensions || [];
  const conflicts = result.conflicts || [];

  return (
    <div className={`space-y-10 ${className}`}>
      {/* ─── SYSTEM HEADER & CANONICAL METADATA ─── */}
      <div className="bg-surface border border-borderDark p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-borderDark pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">{domainMeta.number}</span>
              <span>/</span>
              <span>{domainMeta.label}</span>
              <span>/</span>
              <span>{result.metadata?.school || 'Canonical Standard'}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif text-parchment font-normal tracking-tight">
              Báo Cáo Khảo Luận Tất Định Mysticos
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-olive text-olive text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DETERMINISTIC 100%</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-borderDark text-stone text-xs font-mono">
              <Cpu className="w-3.5 h-3.5 text-accentGold" />
              <span>Engine v{result.metadata?.engineVersion || '3.0.0'}</span>
            </span>
          </div>
        </div>

        {/* Technical Registry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-2.5 bg-background border border-borderDark space-y-0.5">
            <span className="text-[10px] text-stone uppercase tracking-wider block">
              Thời Gian Tính Toán
            </span>
            <span className="text-parchment font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-accentGold" />
              {result.technical?.calculationTimeMs ?? 0} ms
            </span>
          </div>

          <div className="p-2.5 bg-background border border-borderDark space-y-0.5">
            <span className="text-[10px] text-stone uppercase tracking-wider block">
              Quy Tắc Đã Khảo Sát
            </span>
            <span className="text-parchment font-bold">
              {result.technical?.rulesEvaluatedCount ?? 0} rules
            </span>
          </div>

          <div className="p-2.5 bg-background border border-borderDark space-y-0.5">
            <span className="text-[10px] text-stone uppercase tracking-wider block">
              Quy Tắc Đã Khớp
            </span>
            <span className="text-accentGold font-bold">
              {result.technical?.rulesMatchedCount ?? 0} rules
            </span>
          </div>

          <div className="p-2.5 bg-background border border-borderDark space-y-0.5">
            <span className="text-[10px] text-stone uppercase tracking-wider block">
              Tri Thức / Quy Tắc
            </span>
            <span className="text-stone">
              v{result.metadata?.knowledgeBaseVersion || '2026.10'} / v{result.metadata?.rulesVersion || '2026.10'}
            </span>
          </div>
        </div>
      </div>

      {/* ─── TIER 1: RAW DATA (DỮ LIỆU ĐẦU VÀO & SỰ KIỆN QUAN SÁT) ─── */}
      <section className="bg-surface border border-borderDark p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-borderDark pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 text-stone text-[11px] font-mono uppercase tracking-widest">
              <span className="text-accentGold">TẦNG 1</span>
              <span>/</span>
              <span>DỮ LIỆU ĐẦU VÀO & SỰ KIỆN QUAN SÁT</span>
            </div>
            <h3 className="font-serif text-lg text-parchment font-medium">
              Sự Kiện Quan Sát & Tọa Độ Gốc (Observable Facts)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowAllFacts(!showAllFacts)}
            className="px-3 py-1 bg-background border border-borderDark text-stone hover:text-accentGold font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>{showAllFacts ? 'Thu gọn' : `Xem tất cả (${facts.length})`}</span>
            {showAllFacts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Input Summary Chips */}
        {result.inputSummary && Object.keys(result.inputSummary).length > 0 && (
          <div className="space-y-2">
            <span className="block text-[11px] font-mono text-stone uppercase tracking-wider">
              Dữ Liệu Khởi Tạo (Input Parameters):
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(result.inputSummary).map(([key, val]) => {
                if (typeof val === 'object' && val !== null) return null;
                return (
                  <div
                    key={key}
                    className="px-3 py-1 bg-background border border-borderDark text-xs font-mono"
                  >
                    <span className="text-stone">{key}: </span>
                    <strong className="text-parchment">{String(val)}</strong>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Facts Graticule Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono text-stone">
            <span>BẢNG DỮ KIỆN KỸ THUẬT ({showAllFacts ? facts.length : Math.min(facts.length, 6)} / {facts.length})</span>
            <span>Nguồn: Thiên văn & Thư tịch số hóa</span>
          </div>

          <div className="border border-borderDark overflow-x-auto bg-background">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface border-b border-borderDark text-stone text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="py-2 px-3 border-r border-borderDark">#</th>
                  <th className="py-2 px-3 border-r border-borderDark">Khóa Dữ Kiện (Key)</th>
                  <th className="py-2 px-3 border-r border-borderDark">Giá Trị Quan Sát (Value)</th>
                  <th className="py-2 px-3 border-r border-borderDark">Miền (Domain)</th>
                  <th className="py-2 px-3">Nguồn Gốc (Source)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderDark text-stone">
                {(showAllFacts ? facts : facts.slice(0, 6)).map((fact, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="py-1.5 px-3 border-r border-borderDark text-[11px] text-stone/70">
                      {idx + 1}
                    </td>
                    <td className="py-1.5 px-3 border-r border-borderDark text-parchment font-medium">
                      {fact.key}
                    </td>
                    <td className="py-1.5 px-3 border-r border-borderDark text-accentGold truncate max-w-xs">
                      {typeof fact.value === 'object' ? JSON.stringify(fact.value) : String(fact.value)}
                    </td>
                    <td className="py-1.5 px-3 border-r border-borderDark text-[11px]">
                      {fact.domain}
                    </td>
                    <td className="py-1.5 px-3 text-[11px] text-stone/80">
                      {fact.source}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── TIER 2: CALCULATED RESULT & CORE INSIGHTS (KẾT QUẢ PHÂN TÍCH) ─── */}
      <section className="bg-surface border border-borderDark p-6 space-y-6">
        <div className="border-b border-borderDark pb-3 space-y-0.5">
          <div className="flex items-center gap-2 text-stone text-[11px] font-mono uppercase tracking-widest">
            <span className="text-accentGold">TẦNG 2</span>
            <span>/</span>
            <span>KẾT QUẢ TÍNH TOÁN & LUẬN GIẢI</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-parchment font-medium">
            Luận Giải Cốt Lõi Tường Minh (Core Calculated Insights)
          </h3>
          <p className="text-xs text-stone leading-relaxed">
            Mỗi luận giải được hệ thống suy diễn từ quy tắc xác thực, gắn liền với mức độ tự tin và bình diện ảnh hưởng.
          </p>
        </div>

        <div className="space-y-4">
          {interpretations.map((interp, idx) => {
            const isSupportive = interp.polarity === 'supportive';
            const isChallenging = interp.polarity === 'challenging';

            return (
              <div
                key={interp.interpretationId || idx}
                className="p-5 bg-background border border-borderDark hover:border-accentGold transition-colors space-y-3"
              >
                {/* Interpretation Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-surface border border-borderDark text-accentGold text-[10px] uppercase font-bold tracking-wider">
                      {interp.dimension || 'TỔNG QUAN'}
                    </span>
                    <span
                      className={`px-2 py-0.5 border text-[10px] font-mono ${
                        isSupportive
                          ? 'border-olive text-olive'
                          : isChallenging
                          ? 'border-cinnabar text-cinnabar'
                          : 'border-borderDark text-stone'
                      }`}
                    >
                      {interp.polarity === 'supportive' ? 'Thuận Lợi' : interp.polarity === 'challenging' ? 'Thách Thức' : 'Trung Dung'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-stone text-[11px]">
                    <span>Cường độ: <strong className="text-parchment">{(interp.strength * 100).toFixed(0)}%</strong></span>
                    <span>•</span>
                    <span>Độ tin cậy: <strong className="text-accentGold">{((interp.confidence ?? 0.95) * 100).toFixed(0)}%</strong></span>
                  </div>
                </div>

                {/* Main Headline */}
                <h4 className="font-serif text-base sm:text-lg text-parchment font-medium leading-snug">
                  {interp.headline}
                </h4>

                {/* Statement Body */}
                <p className="text-xs sm:text-sm text-stone leading-relaxed">
                  {interp.statement}
                </p>

                {/* Practical Manifestation if matching implication exists */}
                {result.implications && (
                  (() => {
                    const matchedImp = result.implications.find(
                      (imp) => imp.interpretationId === interp.interpretationId
                    );
                    if (!matchedImp) return null;
                    return (
                      <div className="pt-2 border-t border-borderDark text-xs font-mono space-y-1 text-stone">
                        <span className="text-[10px] text-accentGold uppercase tracking-wider block">
                          Biểu hiện trong thực tế ({matchedImp.context}):
                        </span>
                        <p className="text-stone leading-relaxed">{matchedImp.manifestation}</p>
                      </div>
                    );
                  })()
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TIER 3: PATTERNS & RELATIONSHIPS (KHUÔN MẪU & TƯƠNG QUAN) ─── */}
      <section className="bg-surface border border-borderDark p-6 space-y-6">
        <div className="border-b border-borderDark pb-3 space-y-0.5">
          <div className="flex items-center gap-2 text-stone text-[11px] font-mono uppercase tracking-widest">
            <span className="text-accentGold">TẦNG 3</span>
            <span>/</span>
            <span>KHUÔN MẪU & MỐI TƯƠNG QUAN NĂNG LƯỢNG</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-parchment font-medium">
            Khuôn Mẫu Chi Phối & Tương Tác Tín Hiệu (Patterns & Dynamics)
          </h3>
          <p className="text-xs text-stone leading-relaxed">
            Các hình thái hợp lực, xung khắc, bổ trợ hoặc chuyển tiếp giữa các nguyên lý vận hành.
          </p>
        </div>

        {/* Patterns Grid */}
        {patterns.length > 0 && (
          <div className="space-y-3">
            <span className="block text-[11px] font-mono text-accentGold uppercase tracking-wider">
              Khuôn Mẫu Chi Phối Được Nhận Diện ({patterns.length}):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {patterns.map((pat) => (
                <div
                  key={pat.patternId}
                  className="p-4 bg-background border border-borderDark space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accentGold font-bold">{pat.patternId}</span>
                    <span className="text-[10px] px-1.5 py-0.5 border border-borderDark text-stone">
                      Khớp bối cảnh: {(pat.contextFit * 100).toFixed(0)}%
                    </span>
                  </div>

                  <p className="font-serif text-xs sm:text-sm text-parchment leading-snug">
                    {pat.headline}
                  </p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-stone">
                      <span>Mức độ chi phối (Dominance)</span>
                      <span className="text-accentGold">{(pat.dominance * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1 bg-surface border border-borderDark overflow-hidden">
                      <div
                        className="h-full bg-accentGold"
                        style={{ width: `${Math.min(100, pat.dominance * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Relationships Flow */}
        {relationships.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-borderDark">
            <span className="block text-[11px] font-mono text-accentGold uppercase tracking-wider">
              Mối Tương Tác Giữa Các Tín Hiệu ({relationships.length}):
            </span>
            <div className="divide-y divide-borderDark border border-borderDark bg-background">
              {relationships.map((rel) => (
                <div
                  key={rel.relationshipId}
                  className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.2 border border-borderLight text-parchment text-[10px] uppercase font-bold">
                        {rel.type}
                      </span>
                      <span className="text-stone text-[11px]">
                        {rel.sourceSignalId} ➔ {rel.targetSignalId}
                      </span>
                    </div>
                    <p className="text-stone text-xs font-sans">{rel.description}</p>
                  </div>

                  <div className="text-[10px] text-stone font-mono sm:text-right shrink-0">
                    Cường độ: <strong className="text-accentGold">{(rel.intensity * 100).toFixed(0)}%</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tensions & Conflicts if present */}
        {tensions.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-borderDark">
            <span className="block text-[11px] font-mono text-cinnabar uppercase tracking-wider">
              Điểm Xung Lực & Nghịch Lý Cần Hóa Giải ({tensions.length}):
            </span>
            <div className="space-y-2">
              {tensions.map((ten, idx) => (
                <div key={idx} className="p-3.5 bg-background border border-cinnabar/40 space-y-1 text-xs">
                  <div className="font-mono text-cinnabar text-[11px] font-bold">
                    {ten.traitA} ⟷ {ten.traitB}
                  </div>
                  <p className="text-stone">{ten.dynamics}</p>
                  <div className="pt-1 text-parchment font-mono text-[11px]">
                    ✦ Hóa giải: {ten.resolution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ─── TIER 4: PRACTICAL GUIDANCE (CHỈ DẪN HÀNH ĐỘNG THỰC TẾ) ─── */}
      <section className="bg-surface border border-borderDark p-6 space-y-6">
        <div className="border-b border-borderDark pb-3 space-y-0.5">
          <div className="flex items-center gap-2 text-stone text-[11px] font-mono uppercase tracking-widest">
            <span className="text-accentGold">TẦNG 4</span>
            <span>/</span>
            <span>CHỈ DẪN HÀNH ĐỘNG THỰC TẾ</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl text-parchment font-medium">
            Định Hướng Ứng Dụng Đời Thường (Actionable Guidance)
          </h3>
          <p className="text-xs text-stone leading-relaxed">
            Nguyên tắc cốt lõi: Không bói toán thụ động. Mọi luận giải đều chuyển hóa thành các việc nên làm và nên điều chỉnh trong cuộc sống.
          </p>
        </div>

        <div className="space-y-4">
          {guidance.map((gui, idx) => {
            const isImmediate = gui.actionPriority === 'IMMEDIATE';
            const isStrategic = gui.actionPriority === 'STRATEGIC';

            return (
              <div
                key={gui.guidanceId || idx}
                className="p-5 bg-background border border-borderDark space-y-4"
              >
                {/* Priority Badge */}
                <div className="flex items-center justify-between text-xs font-mono border-b border-borderDark pb-3">
                  <span
                    className={`px-2.5 py-1 border text-[10px] font-bold tracking-wider uppercase ${
                      isImmediate
                        ? 'border-cinnabar text-cinnabar'
                        : isStrategic
                        ? 'border-accentGold text-accentGold'
                        : 'border-stone text-stone'
                    }`}
                  >
                    {isImmediate
                      ? 'ƯU TIÊN: HÀNH ĐỘNG NGAY (IMMEDIATE)'
                      : isStrategic
                      ? 'ƯU TIÊN: ĐỊNH HƯỚNG CHIẾN LƯỢC (STRATEGIC)'
                      : 'ƯU TIÊN: CHIÊM NGHIỆM TÂM THỨC (REFLECTIVE)'}
                  </span>
                  <span className="text-stone text-[11px]">Mã chỉ dẫn: {gui.guidanceId}</span>
                </div>

                {/* 2-Column Actionable Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* What to continue */}
                  <div className="p-4 bg-surface border border-borderDark space-y-2">
                    <div className="flex items-center gap-2 text-olive font-mono text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Cần Tiếp Tục Duy Trì & Phát Huy:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-parchment">
                      {gui.whatToContinue.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2">
                          <span className="text-olive font-mono mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What to adjust or stop */}
                  <div className="p-4 bg-surface border border-borderDark space-y-2">
                    <div className="flex items-center gap-2 text-cinnabar font-mono text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Cần Điều Chỉnh Hoặc Kiềm Chế:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-parchment">
                      {gui.whatToAdjustOrStop.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-cinnabar font-mono mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Rationale */}
                {gui.rationale && (
                  <div className="p-3 bg-surface border-l-2 border-accentGold text-xs space-y-1">
                    <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider block">
                      Căn Nguyên Chỉ Dẫn:
                    </span>
                    <p className="text-stone leading-relaxed">{gui.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── TIER 5: WHY PANEL (MINH BẠCH SUY DIỄN & THƯ TỊCH) ─── */}
      <section>
        <WhyPanel result={result} />
      </section>
    </div>
  );
}
