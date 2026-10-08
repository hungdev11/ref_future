'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  AlertCircle,
  ArrowRight,
  Compass,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';
import { ConfirmationStep, ContextualLoading } from '@/components/primitives';
import { saveHistoryItem } from '@/lib/history-storage';

const SPREADS = [
  {
    code: 'SPREAD_1_SINGLE',
    title: '1 Lá — Điểm Tựa Hôm Nay',
    desc: 'Dành cho câu hỏi nhanh, tìm kiếm một lời nhắc nhở hoặc góc nhìn cô đọng ngay lúc này.',
    positions: ['Thông Điệp Trọng Tâm'],
  },
  {
    code: 'SPREAD_3_PPF',
    title: '3 Lá — Quá Khứ / Hiện Tại / Xu Hướng',
    desc: 'Khảo sát dòng chảy thời gian: nguồn gốc vấn đề, điểm tựa hiện thời và xu hướng tự nhiên mở ra.',
    positions: ['Quá Khứ (Cội Nguồn)', 'Hiện Tại (Thực Trạng)', 'Xu Hướng (Tương Lai)'],
  },
  {
    code: 'SPREAD_3_SITUATION',
    title: '3 Lá — Tình Huống / Thách Thức / Hướng Đi',
    desc: 'Phân tích cụ thể một nút thắt: bạn đang đối mặt điều gì, trở ngại cốt lõi ở đâu và nên hành xử thế nào.',
    positions: ['Bối Cảnh Tình Huống', 'Thách Thức Cốt Lõi', 'Hướng Ứng Xử'],
  },
  {
    code: 'SPREAD_5_DEEP',
    title: '5 Lá — Phân Tích Đa Chiều',
    desc: 'Đào sâu 5 khía cạnh: gốc rễ, ảnh hưởng bên ngoài, nỗi sợ ngầm, năng lượng tiềm ẩn và kết quả.',
    positions: ['Hiện Trạng', 'Trở Ngại', 'Tiềm Thức', 'Môi Trường Ngoài', 'Định Hướng'],
  },
  {
    code: 'SPREAD_10_CELTIC',
    title: '10 Lá — Celtic Cross Kinh Điển',
    desc: 'Bản đồ toàn cảnh theo chuẩn cổ điển Arthur Edward Waite: phân tích 10 bình diện phức tạp.',
    positions: ['Bản Thể', 'Thách Thức', 'Cội Rễ', 'Quá Khứ Gần', 'Mục Tiêu', 'Tương Lai Gần', 'Bản Thân', 'Môi Trường', 'Hy Vọng/Nỗi Sợ', 'Kết Quả'],
  },
];

const SUGGESTED_QUESTIONS = [
  'Tôi nên chú ý điều gì trong công việc và dự án hiện tại?',
  'Điều gì đang cản trở tôi đưa ra quyết định dứt khoát?',
  'Tôi cần nhìn lại và chuyển hóa điều gì trong mối quan hệ này?',
  'Làm thế nào để tôi cân bằng giữa trách nhiệm và sự tự do cá nhân?',
];

export default function TarotPage() {
  const [step, setStep] = useState<'INTRO' | 'QUESTION' | 'SPREAD' | 'CONFIRM' | 'LOADING' | 'RESULT'>('INTRO');
  const [question, setQuestion] = useState('');
  const [selectedSpreadCode, setSelectedSpreadCode] = useState('SPREAD_3_PPF');

  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedSpread = SPREADS.find((s) => s.code === selectedSpreadCode) || SPREADS[1];

  const handleDraw = async () => {
    setStep('LOADING');
    setError(null);
    setLoadingStepIdx(0);

    const timer1 = setTimeout(() => setLoadingStepIdx(1), 400);
    const timer2 = setTimeout(() => setLoadingStepIdx(2), 800);
    const timer3 = setTimeout(() => setLoadingStepIdx(3), 1200);

    const activeSeed = `seed_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const res = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim() || undefined,
          spreadCode: selectedSpreadCode,
          seed: activeSeed,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Rút bài thất bại');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);

      // Save to local history
      saveHistoryItem({
        id: `tarot_${Date.now()}`,
        timestamp: Date.now(),
        domain: 'tarot',
        title: question.trim() ? `Trải Bài: "${question.trim()}"` : `Trải Bài Tarot (${selectedSpread.title})`,
        mainTheme: canonicalResult.primaryResult || 'Thông điệp trải bài Tarot',
        resultPayload: canonicalResult as DeepMysticosResult,
      });

      setStep('RESULT');
    } catch (err: any) {
      setError(err.message);
      setStep('CONFIRM');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* 1. INTRO LANDING (Spec 44) */}
      {step === 'INTRO' && (
        <div className="space-y-12 max-w-4xl mx-auto py-2">
          <div className="border-b border-borderDark pb-8 space-y-4">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">04</span>
              <span>/</span>
              <span>Tarot Rider-Waite Cổ Điển</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal tracking-tight leading-tight">
              Khảo Cứu Tarot 78 Lá
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Đặt một câu hỏi và khám phá câu chuyện nổi lên từ trải bài.
              Không bói toán định mệnh hay hù dọa tâm lý. MYSTICOS phân tích tương tác biểu tượng để soi chiếu thực tại và gợi mở hướng hành động thực tiễn.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep('QUESTION')}
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Đặt câu hỏi &amp; Trải bài</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">01. Trọng Tâm Rõ Ràng</span>
              <p className="text-xs text-stone leading-relaxed">
                Tập trung vào điều bạn đang trăn trở. Câu hỏi càng cụ thể và hướng tới hành động, câu chuyện từ trải bài càng sáng tỏ.
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">02. Chuẩn Thư Tịch 1909</span>
              <p className="text-xs text-stone leading-relaxed">
                Nguyên bản 78 hình vẽ Rider-Waite-Smith. Phân tích tương quan giữa các lá (hỗ trợ, đối lập, chuyển tiếp) thay vì đọc nghĩa rời rạc.
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">03. Câu Hỏi Phản Tư</span>
              <p className="text-xs text-stone leading-relaxed">
                Mỗi kết quả đều kèm câu hỏi suy ngẫm sâu sắc và định hướng hành vi: việc nên duy trì vs điều cần tiết chế.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. QUESTION INPUT (Spec 44-45) */}
      {step === 'QUESTION' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 1 / 3: ĐẶT CÂU HỎI</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">
              Bạn Đang Muốn Tìm Hiểu Điều Gì?
            </h2>
            <p className="text-xs text-stone">
              Viết câu hỏi của bạn một cách chân thật, hoặc chọn một câu hỏi gợi ý bên dưới.
            </p>
          </div>

          <div className="space-y-4 bg-surface border border-borderDark p-6">
            <div>
              <textarea
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ví dụ: Tôi nên chú ý điều gì trong công việc hiện tại..."
                className="w-full p-4 bg-background border border-borderDark text-parchment text-sm font-sans focus:outline-none focus:border-accentGold leading-relaxed"
              />
            </div>

            {/* Suggested Questions (Spec 45) */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono text-stone uppercase tracking-wider block">
                GỢI Ý CÂU HỎI THỰC TIỄN (KHÔNG ĐỊNH MỆNH FATALISTIC):
              </span>
              <div className="space-y-1.5">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="w-full text-left p-2.5 bg-background/50 border border-borderDark hover:border-accentGold text-xs text-stone hover:text-parchment transition-colors font-sans"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-borderDark/60">
              <button
                type="button"
                onClick={() => setStep('INTRO')}
                className="px-4 py-2 border border-borderDark text-stone text-xs font-mono uppercase tracking-wider hover:text-parchment"
              >
                ← Quay lại
              </button>

              <button
                type="button"
                onClick={() => setStep('SPREAD')}
                className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors"
              >
                Chọn Kiểu Trải Bài →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. SPREAD SELECTION (Spec 46) */}
      {step === 'SPREAD' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 2 / 3: CHỌN KIỂU TRẢI</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">
              Chọn Kiểu Trải Bài
            </h2>
            <p className="text-xs text-stone">
              Mỗi kiểu trải bài phục vụ một nhu cầu phân tích với độ sâu và góc nhìn khác nhau.
            </p>
          </div>

          <div className="space-y-3">
            {SPREADS.map((s) => (
              <div
                key={s.code}
                onClick={() => setSelectedSpreadCode(s.code)}
                className={`p-5 border cursor-pointer transition-all space-y-2 ${
                  selectedSpreadCode === s.code
                    ? 'border-accentGold bg-surface shadow-sm'
                    : 'border-borderDark bg-surface/50 hover:border-borderLight'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-parchment font-medium">
                    {s.title}
                  </h3>
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center ${selectedSpreadCode === s.code ? 'border-accentGold bg-accentGold' : 'border-borderDark'}`}>
                    {selectedSpreadCode === s.code && <div className="w-1.5 h-1.5 bg-background" />}
                  </div>
                </div>
                <p className="text-xs text-stone leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {s.positions.map((pos, pIdx) => (
                    <span key={pIdx} className="px-2 py-0.5 bg-background border border-borderDark text-[10px] font-mono text-stone">
                      #{pIdx + 1}: {pos}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep('QUESTION')}
              className="px-4 py-2 border border-borderDark text-stone text-xs font-mono uppercase tracking-wider hover:text-parchment"
            >
              ← Quay lại câu hỏi
            </button>

            <button
              type="button"
              onClick={() => setStep('CONFIRM')}
              className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors"
            >
              Xác Nhận &amp; Rút Bài →
            </button>
          </div>
        </div>
      )}

      {/* 4. CONFIRM & DRAW (Spec 47) */}
      {step === 'CONFIRM' && (
        <div className="space-y-4">
          <ConfirmationStep
            title="Sẵn Sàng Rút Bài"
            subtitle="Tĩnh tâm, tập trung ý niệm vào câu hỏi trước khi hệ thống tráo và rút bài."
            items={[
              { label: 'Câu hỏi của bạn', value: question.trim() ? `"${question.trim()}"` : 'Trải bài tổng quan không đặt câu hỏi' },
              { label: 'Kiểu trải bài', value: selectedSpread.title },
              { label: 'Số lượng lá bài', value: `${selectedSpread.positions.length} lá bài Rider-Waite` },
            ]}
            onConfirm={handleDraw}
            onEdit={() => setStep('QUESTION')}
            confirmLabel="Rút bài ngay →"
          />

          {/* Hiển thị trước các vị trí lá bài (Spec 47) */}
          <div className="max-w-xl mx-auto border border-borderDark bg-surface p-5 space-y-3">
            <span className="font-mono text-[11px] text-accentGold uppercase tracking-wider block">
              SƠ ĐỒ CÁC VỊ TRÍ SẮP RÚT:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedSpread.positions.map((p, idx) => (
                <div key={idx} className="p-2.5 bg-background border border-borderDark flex items-center gap-2">
                  <span className="text-accentGold font-mono font-bold">0{idx + 1}.</span>
                  <span className="text-parchment">{p}</span>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="max-w-xl mx-auto p-3.5 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* 5. CONTEXTUAL LOADING */}
      {step === 'LOADING' && (
        <ContextualLoading
          title="Đang Trộn &amp; Trải Bài Tarot"
          steps={[
            'Đang trộn 78 lá bài Rider-Waite-Smith...',
            `Đang rút ${selectedSpread.positions.length} lá bài theo sơ đồ...`,
            'Đang đối chiếu ý nghĩa hình tượng và chiều xuôi/ngược...',
            'Đang phân tích tương tác và tổng hợp câu chuyện...',
          ]}
          currentStepIndex={loadingStepIdx}
        />
      )}

      {/* 6. RESULT VIEW */}
      {step === 'RESULT' && result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-borderDark pb-3">
            <button
              type="button"
              onClick={() => {
                setQuestion('');
                setStep('INTRO');
              }}
              className="text-xs font-mono text-stone hover:text-accentGold transition-colors flex items-center gap-1.5"
            >
              <span>← Đặt câu hỏi khác</span>
            </button>
          </div>

          <MysticosResultViewer result={result} />
        </div>
      )}
    </div>
  );
}
