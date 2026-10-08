'use client';

import React from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { TensionBlock } from '../primitives/TensionBlock';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { Users, Heart, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface CompatibilityResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const DIMENSION_VN: Record<string, string> = {
  overview: 'TỔNG QUAN',
  emotional: 'CẢM XÚC & NỘI TÂM',
  communication: 'GIAO TIẾP & TƯ DUY',
  values: 'GIÁ TRỊ & ĐỊNH HƯỚNG',
  lifestyle: 'LỐI SỐNG & SINH HOẠT',
  career: 'CÔNG VIỆC & SỰ NGHIỆP',
};

function formatDimension(dim: string): string {
  const lower = dim.toLowerCase().trim();
  return DIMENSION_VN[lower] || dim.toUpperCase();
}

export function CompatibilityResultView({
  result,
  className = '',
}: CompatibilityResultViewProps) {
  if (!result) return null;

  const school = result.metadata?.school || 'Multi-System Synthesis';

  const tensions = result.tensions || [];
  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  // Dimensions summary
  const dimensionSet = Array.from(
    new Set(interpretations.map((i) => i.dimension || 'Tương Tác Chung'))
  );

  const relType = String(
    (result.facts || []).find((f) => f.key.toLowerCase().includes('relationshiptype') || f.key === 'purpose')?.value ||
    (result.inputSummary as any)?.relationshipType ||
    'LOVE'
  ).toUpperCase();

  const PURPOSE_VN: Record<string, string> = {
    LOVE: 'Tình Cảm & Hôn Nhân',
    BUSINESS: 'Hợp Tác Kinh Doanh / Sự Nghiệp',
    FRIENDSHIP: 'Bạn Bè & Đồng Hành Tri Kỷ',
    FAMILY: 'Gia Đình & Thân Tộc',
  };

  const nameA = (result.inputSummary as any)?.personA?.name || 'Đối Tượng A';
  const nameB = (result.inputSummary as any)?.personB?.name || 'Đối Tượng B';

  const sunA = (result.facts || []).find((f) => f.key === 'personA.sunSign')?.value;
  const sunB = (result.facts || []).find((f) => f.key === 'personB.sunSign')?.value;
  const lpA = (result.facts || []).find((f) => f.key === 'personA.lifePath')?.value;
  const lpB = (result.facts || []).find((f) => f.key === 'personB.lifePath')?.value;

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Relationship Overview */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span>/</span>
          <span>Độ Tương Hợp Đa Hệ Thống</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        <div className="space-y-2">
          <div className="inline-block border border-accentGold/60 bg-accentGold/10 px-3 py-1 text-xs font-mono text-accentGold uppercase tracking-wider">
            MỤC ĐÍCH KHẢO LUẬN: {PURPOSE_VN[relType] || 'Tình Cảm & Hôn Nhân'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Tương Quan Hòa Hợp: {nameA} ✕ {nameB}
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Phân tích tương tác đa chiều giữa hai trường năng lượng: điểm hút tự nhiên, khác biệt bản năng và cơ chế phối hợp trong mục đích {PURPOSE_VN[relType] || 'chung'}.
          </p>
        </div>

        {/* Profile Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="border border-borderDark bg-surface p-4 space-y-1">
            <span className="text-[10px] font-mono text-accentGold uppercase block">{nameA}</span>
            <span className="font-serif text-base text-parchment block">
              {sunA ? String(sunA) : 'Mặt Trời Khởi Sinh'} {lpA ? `• Đường Đời ${lpA}` : ''}
            </span>
          </div>
          <div className="border border-borderDark bg-surface p-4 space-y-1">
            <span className="text-[10px] font-mono text-stone uppercase block">{nameB}</span>
            <span className="font-serif text-base text-parchment block">
              {sunB ? String(sunB) : 'Mặt Trời Khởi Sinh'} {lpB ? `• Đường Đời ${lpB}` : ''}
            </span>
          </div>
        </div>

        {/* Dimension Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-stone mr-2">
            <Users className="w-3.5 h-3.5 text-accentGold" />
            <span>CHIỀU KÍCH:</span>
          </div>
          {dimensionSet.map((dim, idx) => (
            <span
              key={idx}
              className="border border-borderDark bg-surface px-3 py-1 text-xs font-mono text-parchment tracking-wide"
            >
              {formatDimension(dim)}
            </span>
          ))}
        </div>
      </header>

      {/* 2. Main Story: What Draws The Two Together */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Gắn Kết">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Areas of Natural Support vs Innate Differences (Tensions) */}
      {tensions.length > 0 && (
        <section aria-label="Xung Lực & Điểm Cân Bằng" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">03</span>
            <span className="text-borderLight">/</span>
            <span>ĐIỂM TƯƠNG HỖ TỰ NHIÊN &amp; ĐIỂM CÂN BẰNG</span>
          </div>

          <div className="space-y-4">
            {tensions.map((item, idx) => (
              <TensionBlock
                key={idx}
                tension={item}
                title={`Điểm Cân Bằng Trong Tương Tác #${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Deep Interpretations Across Dimensions */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Tương Hợp Chi Tiết" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI ĐA CHIỀU (EMOTIONAL, COMMUNICATION, VALUES)</span>
          </div>

          <div className="space-y-4">
            {interpretations.map((interp, idx) => (
              <InsightBlock
                key={interp.interpretationId || idx}
                depth={('depth' in interp ? (interp as any).depth : 'DEPTH_3')}
                headline={interp.headline}
                statement={interp.statement}
                explanation={('explanation' in interp ? (interp as any).explanation : undefined)}
                constructiveExpression={('constructiveExpression' in interp ? (interp as any).constructiveExpression : undefined)}
                tension={('tension' in interp ? (interp as any).tension : undefined)}
                polarity={interp.polarity}
                dimension={interp.dimension}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Real-life Scenarios: Arguments, Finances, Personal Space */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Tương Tác Đời Sống">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="KỊCH BẢN TƯƠNG TÁC ĐỜI SỐNG"
          />
        </section>
      )}

      {/* 6. Principles for Strengthening the Bond */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Nguyên Tắc Bồi Đắp Gắn Kết" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>NGUYÊN TẮC BỒI ĐẮP MỐI QUAN HỆ BỀN CHẶT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>ĐIỂM TỰA GẮN KẾT CẦN DUY TRÌ</span>
                </div>
                <ul className="space-y-2 text-sm text-parchment/90 font-sans list-none">
                  {continueItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accentGold select-none pt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {adjustItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-terracotta tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <AlertTriangle className="w-4 h-4 text-terracotta shrink-0" />
                  <span>KHÁC BIỆT CẦN THẤU HIỂU &amp; HÓA GIẢI</span>
                </div>
                <ul className="space-y-2 text-sm text-parchment/90 font-sans list-none">
                  {adjustItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-terracotta select-none pt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. Progressive Disclosure */}
      <section aria-label="Minh Bạch Suy Luận" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết logic tất định 100% qua mô hình đối chiếu chéo giữa hai trường năng lượng thực tế."
        />
      </section>
    </article>
  );
}
