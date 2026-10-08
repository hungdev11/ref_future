'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Hash,
  Compass,
} from 'lucide-react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';
import { ConfirmationStep, ContextualLoading } from '@/components/primitives';
import { saveHistoryItem } from '@/lib/history-storage';

export default function NumerologyPage() {
  const [step, setStep] = useState<'INTRO' | 'FORM' | 'CONFIRM' | 'LOADING' | 'RESULT'>('INTRO');
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trimmedName = fullName.trim();
  const isNameValid = trimmedName.length >= 2;
  const isDateValid = Boolean(birthDate && /^\d{4}-\d{2}-\d{2}$/.test(birthDate));

  const handleCalculate = async () => {
    if (!isNameValid || !isDateValid) return;

    setStep('LOADING');
    setError(null);
    setLoadingStepIdx(0);

    const timer1 = setTimeout(() => setLoadingStepIdx(1), 400);
    const timer2 = setTimeout(() => setLoadingStepIdx(2), 800);
    const timer3 = setTimeout(() => setLoadingStepIdx(3), 1200);

    try {
      const res = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: trimmedName, birthDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khảo cứu thất bại');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);

      // Save to local history
      saveHistoryItem({
        id: `numerology_${Date.now()}`,
        timestamp: Date.now(),
        domain: 'numerology',
        title: `Hồ Sơ Số Học: ${trimmedName}`,
        mainTheme: canonicalResult.primaryResult || 'Chân dung năng lượng số học Pythagoras',
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
      {/* 1. INTRO LANDING (Spec 27) */}
      {step === 'INTRO' && (
        <div className="space-y-12 max-w-4xl mx-auto py-2">
          <div className="border-b border-borderDark pb-8 space-y-4">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">01</span>
              <span>/</span>
              <span>Thần Số Học Pythagoras</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal tracking-tight leading-tight">
              Thần Số Học Pythagoras
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Khám phá các mô hình nổi bật từ ngày sinh và tên khai sinh của bạn.
              Không gán ghép mê tín dị đoan. Hệ thống quy đổi họ tên theo bảng chữ cái Latin Pythagoras chuẩn tắc và tính toán các chu kỳ đời người tất định.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Bắt đầu phân tích</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">01. Con Số Cốt Lõi</span>
              <p className="text-xs text-stone leading-relaxed">
                Đường Đời (Life Path), Sứ Mệnh (Destiny), Linh Hồn (Soul Urge) và Tính Cách (Personality).
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">02. Tương Tác Giằng Co</span>
              <p className="text-xs text-stone leading-relaxed">
                Phân tích sự củng cố hoặc mâu thuẫn nội tâm giữa mong muốn sâu kín bên trong và cách thể hiện ra ngoài.
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">03. Năm Cá Nhân &amp; Chu Kỳ</span>
              <p className="text-xs text-stone leading-relaxed">
                Nhận diện năng lượng thời điểm hiện tại và định hướng hành vi tương ứng để phát huy tối đa tiềm năng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. FORM INPUT (Spec 27) */}
      {step === 'FORM' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 1 / 2: THÔNG TIN KHAI SINH</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">Họ Tên &amp; Ngày Sinh</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isNameValid && isDateValid) setStep('CONFIRM');
            }}
            className="space-y-4 bg-surface border border-borderDark p-6"
          >
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Họ và tên đầy đủ theo giấy khai sinh
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/70 block mt-1 font-mono">
                Tên được quy đổi theo trường phái Pythagoras (1–9). Nên nhập họ tên đầy đủ tiếng Việt có dấu.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày sinh dương lịch
              </label>
              <DateInput
                value={birthDate}
                onChange={setBirthDate}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('INTRO')}
                className="px-4 py-2 border border-borderDark text-stone text-xs font-mono uppercase tracking-wider hover:text-parchment"
              >
                ← Quay lại
              </button>

              <button
                type="submit"
                disabled={!isNameValid || !isDateValid}
                className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors disabled:opacity-50"
              >
                Xác Nhận Dữ Liệu →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. CONFIRMATION STEP */}
      {step === 'CONFIRM' && (
        <div className="space-y-4">
          <ConfirmationStep
            title="Xác Nhận Dữ Liệu Số Học"
            subtitle="Kiểm tra lại thông tin họ tên và ngày sinh để hệ thống chuẩn hóa tần số dao động."
            items={[
              { label: 'Họ và tên khai sinh', value: trimmedName },
              { label: 'Ngày sinh dương lịch', value: birthDate },
              { label: 'Trường phái tính toán', value: 'Pythagorean Numerology' },
            ]}
            onConfirm={handleCalculate}
            onEdit={() => setStep('FORM')}
            confirmLabel="Bắt đầu phân tích →"
          />

          {error && (
            <div className="max-w-xl mx-auto p-3.5 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* 4. CONTEXTUAL LOADING */}
      {step === 'LOADING' && (
        <ContextualLoading
          title="Đang Phân Tích Hồ Sơ Thần Số Học"
          steps={[
            'Đang chuẩn hóa họ tên và ngày sinh...',
            'Đang tính toán các chỉ số cốt lõi (Đường Đời, Sứ Mệnh, Linh Hồn)...',
            'Đang đối chiếu tương tác giằng co giữa các con số...',
            'Đang xác lập chu kỳ và năm cá nhân...',
          ]}
          currentStepIndex={loadingStepIdx}
        />
      )}

      {/* 5. RESULT VIEW */}
      {step === 'RESULT' && result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-borderDark pb-3">
            <button
              type="button"
              onClick={() => setStep('INTRO')}
              className="text-xs font-mono text-stone hover:text-accentGold transition-colors flex items-center gap-1.5"
            >
              <span>← Khảo cứu hồ sơ khác</span>
            </button>
          </div>

          <MysticosResultViewer result={result} />
        </div>
      )}
    </div>
  );
}
