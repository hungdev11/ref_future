'use client';

import React, { useState } from 'react';
import type { DeepMysticosResult } from '@mystic/core';
import { PatternStory } from '../primitives/PatternStory';
import { InsightBlock } from '../primitives/InsightBlock';
import { ScenarioBlock } from '../primitives/ScenarioBlock';
import { NextQuestionBlock } from '../primitives/NextQuestionBlock';
import { WhyDrawer } from '../primitives/WhyDrawer';
import { TechnicalDetails } from '../result/TechnicalDetails';
import { ChevronDown, ChevronUp, Shield, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export interface TuViResultViewProps {
  result: DeepMysticosResult;
  className?: string;
}

const TU_VI_12_PALACES = [
  { id: 'menh', name: 'Mệnh', label: 'Cung Mệnh (Bản thể & cốt cách)' },
  { id: 'phu_mau', name: 'Phụ Mẫu', label: 'Cung Phụ Mẫu (Cha mẹ & xuất phát điểm)' },
  { id: 'phuc_duc', name: 'Phúc Đức', label: 'Cung Phúc Đức (Tổ tiên & phúc phần tinh thần)' },
  { id: 'dien_trach', name: 'Điền Trạch', label: 'Cung Điền Trạch (Bất động sản & gia đạo)' },
  { id: 'quan_loc', name: 'Quan Lộc', label: 'Cung Quan Lộc (Sự nghiệp & công danh)' },
  { id: 'no_boc', name: 'Nô Bộc', label: 'Cung Nô Bộc (Bạn bè & trợ thủ)' },
  { id: 'thien_di', name: 'Thiên Di', label: 'Cung Thiên Di (Đối ngoại & xuất hành)' },
  { id: 'tat_ach', name: 'Tật Ách', label: 'Cung Tật Ách (Sức khỏe & tai ách)' },
  { id: 'tai_bach', name: 'Tài Bạch', label: 'Cung Tài Bạch (Dòng tiền & sinh kế)' },
  { id: 'tu_tuc', name: 'Tử Tức', label: 'Cung Tử Tức (Con cái & hậu duệ)' },
  { id: 'phu_the', name: 'Phu Thê', label: 'Cung Phu Thê (Hôn nhân & tình duyên)' },
  { id: 'huynh_de', name: 'Huynh Đệ', label: 'Cung Huynh Đệ (Anh em & bằng hữu thân thiết)' },
];

export function TuViResultView({
  result,
  className = '',
}: TuViResultViewProps) {
  const [palacesOpen, setPalacesOpen] = useState(false);

  if (!result) return null;

  const school = result.metadata?.school || 'Tử Vi Đẩu Số Toàn Thư';

  // Extract Mệnh / Thân info from facts
  const menhFact = (result.facts || []).find(
    (f) =>
      f.key.toLowerCase().includes('menh') ||
      (f.key === 'palaceName' && String(f.value).includes('Mệnh'))
  );

  const thanFact = (result.facts || []).find(
    (f) =>
      f.key.toLowerCase().includes('than') ||
      (f.key === 'palaceName' && String(f.value).includes('Thân'))
  );

  const starFacts = (result.facts || []).filter(
    (f) =>
      f.key.toLowerCase().includes('star') ||
      f.key.toLowerCase().includes('chinh_tinh')
  );

  const interpretations = result.deepInterpretations || result.interpretations || [];
  const guidanceItems = result.guidance || [];
  const continueItems = guidanceItems.flatMap((g) => g.whatToContinue || []);
  const adjustItems = guidanceItems.flatMap((g) => g.whatToAdjustOrStop || []);

  return (
    <article className={`max-w-3xl mx-auto space-y-10 ${className}`}>
      {/* 1. Header & Tổng Quan Thiên Bàn */}
      <header className="border-b border-borderDark pb-6 space-y-5">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">02</span>
          <span>/</span>
          <span>Lá Số Tử Vi Đẩu Số</span>
          <span>/</span>
          <span className="text-stone">{school}</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif text-parchment font-medium tracking-tight">
            Tổng Quan Thiên Bàn &amp; Trục Mệnh Thân
          </h1>
          <p className="text-stone text-sm leading-relaxed">
            Khảo cứu cấu trúc tinh diệu thiên bàn theo trường phái truyền thống: tọa độ cung Mệnh, thế đứng Tam Phương Tứ Chính và sự kích hoạt của Tứ Hóa.
          </p>
        </div>

        {/* Mệnh - Thân Core Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="border border-borderDark bg-surface p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <Shield className="w-4 h-4 text-accentGold shrink-0" />
              <span>CUNG MỆNH (TIÊN THIÊN)</span>
            </div>
            <p className="text-parchment font-serif text-lg font-medium">
              {menhFact ? String(menhFact.value) : 'Cung Mệnh An Định'}
            </p>
            <p className="text-xs font-sans text-stone">
              Chủ về tính cách cốt tủy, tiềm năng căn bản và phong thái gốc rễ.
            </p>
          </div>

          <div className="border border-borderDark bg-surface p-5 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono text-stone uppercase tracking-wider">
              <Shield className="w-4 h-4 text-stone shrink-0" />
              <span>CUNG THÂN (HẬU THIÊN)</span>
            </div>
            <p className="text-parchment font-serif text-lg font-medium">
              {thanFact ? String(thanFact.value) : 'Thân Cư Tài / Quan / Di'}
            </p>
            <p className="text-xs font-sans text-stone">
              Chủ về hành động thực tế từ trung vận và khuynh hướng chuyển hóa đời sống.
            </p>
          </div>
        </div>
      </header>

      {/* 2. Main Story Callout */}
      {result.mainStory && (
        <section aria-label="Cốt Truyện Thiên Bàn">
          <PatternStory story={result.mainStory} />
        </section>
      )}

      {/* 3. Tam Phương Tứ Chính & Tứ Hóa Kích Hoạt */}
      <section aria-label="Tam Phương Tứ Chính" className="border border-borderDark bg-surface p-6 sm:p-7 space-y-4">
        <div className="border-b border-borderDark/60 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase">
            <span className="text-accentGold">03</span>
            <span className="text-borderLight">/</span>
            <span>TAM PHƯƠNG TỨ CHÍNH &amp; TỨ HÓA KÍCH HOẠT</span>
          </div>
          <span className="font-mono text-xs text-accentGold">[LIÊN CUNG HỘI CHIẾU]</span>
        </div>

        <h3 className="text-lg font-serif text-parchment font-medium">
          Trục Hội Chiếu: Mệnh — Tài — Quan — Di
        </h3>

        <p className="text-stone text-sm leading-relaxed">
          Tử Vi không xem xét một cung độc lập. Năng lượng của bản mệnh chịu sự chi phối chặt chẽ từ thế giằng co và hỗ trợ giữa cung Tài Bạch (sinh kế), cung Quan Lộc (sự nghiệp) và cung Thiên Di (môi trường đối ngoại).
        </p>

        {starFacts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {starFacts.map((s, idx) => (
              <div key={idx} className="border border-borderDark bg-background/50 p-2.5 text-center">
                <span className="font-mono text-[10px] text-stone block uppercase truncate">{s.key}</span>
                <span className="font-serif text-sm text-parchment block truncate">{String(s.value)}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Deep Interpretations */}
      {interpretations.length > 0 && (
        <section aria-label="Luận Giải Tinh Diệu Đa Tầng" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">04</span>
            <span className="text-borderLight">/</span>
            <span>LUẬN GIẢI TINH DIỆU &amp; CÁCH CỤC CHI TIẾT</span>
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

      {/* 5. Khám Phá 12 Cung Chức (Exploration Drawer) */}
      <section aria-label="Khám Phá 12 Cung" className="border border-borderDark bg-surface">
        <button
          type="button"
          onClick={() => setPalacesOpen(!palacesOpen)}
          aria-expanded={palacesOpen}
          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-surfaceHover/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-accentGold shrink-0" />
            <div className="space-y-0.5">
              <span className="font-mono text-xs text-stone tracking-widest uppercase block">
                KHÁM PHÁ CHI TIẾT (EXPLORATION LAYER)
              </span>
              <h4 className="font-serif text-lg text-parchment font-medium">
                Tra Cứu Cấu Trúc 12 Cung Chức Thiên Bàn
              </h4>
              <p className="font-sans text-xs text-stone">
                Mở rộng khám phá các cung: Tài, Quan, Phối, Tử, Phúc, Điền...
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone shrink-0">
            <span className="hidden sm:inline uppercase">
              {palacesOpen ? '[THU GỌN]' : '[MỞ RỘNG]'}
            </span>
            {palacesOpen ? (
              <ChevronUp className="w-4 h-4 text-accentGold" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone" />
            )}
          </div>
        </button>

        {palacesOpen && (
          <div className="border-t border-borderDark p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
            {TU_VI_12_PALACES.map((palace) => (
              <div
                key={palace.id}
                className="border border-borderDark bg-background/50 p-4 space-y-1 hover:border-accentGold/40 transition-colors"
              >
                <span className="font-mono text-[10px] uppercase text-accentGold tracking-wider block">
                  {palace.name}
                </span>
                <p className="font-serif text-sm text-parchment font-medium">
                  {palace.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Real-life Scenarios */}
      {result.scenarios && result.scenarios.length > 0 && (
        <section aria-label="Kịch Bản Vận Trình">
          <ScenarioBlock
            scenarios={result.scenarios}
            title="KỊCH BẢN VẬN TRÌNH THỰC TẾ"
          />
        </section>
      )}

      {/* 7. Actionable Guidance */}
      {(continueItems.length > 0 || adjustItems.length > 0) && (
        <section aria-label="Định Hướng Vận Mệnh" className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-stone tracking-widest uppercase pb-1">
            <span className="text-accentGold">06</span>
            <span className="text-borderLight">/</span>
            <span>ĐỊNH HƯỚNG DƯỠNG MỆNH &amp; HÓA GIẢI XUNG HẠN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueItems.length > 0 && (
              <div className="border border-borderDark bg-surface p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-accentGold tracking-wider uppercase border-b border-borderDark/60 pb-2">
                  <CheckCircle2 className="w-4 h-4 text-accentGold shrink-0" />
                  <span>CÁCH CỤC THUẬN LỢI NÊN NƯƠNG THEO</span>
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
                  <span>SÁT TINH &amp; ĐIỂM NGHẼN CẦN PHÒNG BỊ</span>
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

      {/* 8. Next Question Suggestions */}
      {result.nextQuestions && result.nextQuestions.length > 0 && (
        <section aria-label="Gợi Ý Khảo Cứu Tiếp Theo">
          <NextQuestionBlock questions={result.nextQuestions} />
        </section>
      )}

      {/* 9. Progressive Disclosure */}
      <section aria-label="Minh Bạch & Kỹ Thuật" className="space-y-6">
        <WhyDrawer
          result={result}
          label="Vì sao tôi nhận được kết quả này?"
          description="Truy vết tất định 100% qua quy tắc an sao Tử Vi Đẩu Số Toàn Thư và các chứng cứ thư tịch cổ."
        />
        <TechnicalDetails rawResult={result} />
      </section>
    </article>
  );
}
