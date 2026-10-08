'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';
import { ConfirmationStep, ContextualLoading } from '@/components/primitives';
import { saveHistoryItem } from '@/lib/history-storage';

const CITIES = [
  'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
  'Huế', 'Nha Trang', 'Đà Lạt', 'Vinh', 'Quy Nhơn', 'Khác'
];

export default function TuViPage() {
  const [step, setStep] = useState<'INTRO' | 'FORM_1' | 'FORM_2' | 'CONFIRM' | 'LOADING' | 'RESULT'>('INTRO');
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [solarDate, setSolarDate] = useState('1990-11-29');
  const [birthTime, setBirthTime] = useState('09:30');
  const [birthPlace, setBirthPlace] = useState('Hà Nội');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [rawPalaces, setRawPalaces] = useState<Record<string, any> | null>(null);
  const [showPalaceGrid, setShowPalaceGrid] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartForm = () => {
    setStep('FORM_1');
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('FORM_2');
  };

  const handleNextToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('CONFIRM');
  };

  const executeCalculation = async () => {
    setStep('LOADING');
    setError(null);
    setLoadingStepIdx(0);

    const timer1 = setTimeout(() => setLoadingStepIdx(1), 400);
    const timer2 = setTimeout(() => setLoadingStepIdx(2), 800);
    const timer3 = setTimeout(() => setLoadingStepIdx(3), 1200);

    try {
      const res = await fetch('/api/tuvi/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solarDate,
          birthTime: `${birthTime}:00`,
          gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khởi tạo lá số thất bại');

      const canonicalResult = (data.data || data.mysticosResult) as DeepMysticosResult;
      setResult(canonicalResult);
      setRawPalaces(data.facts?.palaces || null);

      // Save to local history
      saveHistoryItem({
        id: `tuvi_${Date.now()}`,
        timestamp: Date.now(),
        domain: 'tuvi',
        title: `Lá Số Tử Vi: ${fullName}`,
        mainTheme: canonicalResult.mainStory?.headline || 'Lá số Tử Vi Đẩu Số',
        resultPayload: canonicalResult,
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
      {/* 1. INTRO LANDING STATE (Spec 10, 11) */}
      {step === 'INTRO' && (
        <div className="space-y-12 max-w-4xl mx-auto py-2">
          <div className="border-b border-borderDark pb-8 space-y-4">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">02</span>
              <span>/</span>
              <span>Tử Vi Đẩu Số Cổ Điển</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal tracking-tight leading-tight">
              Tử Vi Đẩu Số
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Khảo sát cấu trúc lá số và những chủ đề nổi bật trong hành trình của bạn.
              Toàn bộ quá trình an sao và luận giải tuân thủ chặt chẽ mô hình tất định theo chuẩn Tử Vi Đẩu Số Toàn Thư.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartForm}
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Lập lá số</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bạn sẽ khám phá (Spec 11) */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono text-accentGold uppercase tracking-widest">
              Bạn Sẽ Khám Phá
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Mệnh &amp; Thân</span>
                <p className="text-xs text-stone leading-relaxed">
                  Cốt cách tiên thiên và khuynh hướng chuyển hóa thực tế trong hậu vận.
                </p>
              </div>
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Các Cung Trọng Yếu</span>
                <p className="text-xs text-stone leading-relaxed">
                  Lọc ra các cung chức có năng lượng nổi bật: Quan Lộc, Tài Bạch, Phúc Đức, Phu Thê.
                </p>
              </div>
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Tam Phương Tứ Chính</span>
                <p className="text-xs text-stone leading-relaxed">
                  Thế hội chiếu giữa 4 cung chủ chốt tác động đa chiều tới quyết định đời sống.
                </p>
              </div>
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Tứ Hóa Biến Động</span>
                <p className="text-xs text-stone leading-relaxed">
                  Điểm kích hoạt chuyển động năng lượng qua Hóa Lộc, Quyền, Khoa, Kỵ theo năm sinh.
                </p>
              </div>
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Vận Trình Thời Gian</span>
                <p className="text-xs text-stone leading-relaxed">
                  Đại hạn 10 năm và tiểu hạn năm hiện tại, điểm thuận lợi và điều nên lưu tâm.
                </p>
              </div>
              <div className="p-5 border border-borderDark bg-surface space-y-1.5">
                <span className="font-serif text-base text-parchment block">Khám Phá 12 Cung</span>
                <p className="text-xs text-stone leading-relaxed">
                  Tra cứu chi tiết từng cung chức thiên bàn khi có nhu cầu tìm hiểu sâu.
                </p>
              </div>
            </div>
          </div>

          {/* Dữ liệu yêu cầu */}
          <div className="p-6 border border-borderDark bg-surface/60 space-y-2 text-xs">
            <span className="font-mono text-stone uppercase tracking-wider block text-[11px]">
              THÔNG TIN CẦN THIẾT
            </span>
            <p className="text-parchment/90 leading-relaxed">
              Bạn cần cung cấp: Họ và tên, Ngày sinh, Giờ sinh chính xác, Nơi sinh và Giới tính. Nếu không rõ giờ sinh chính xác, một số cung chức và nạp âm Cục sẽ không thể định vị trọn vẹn.
            </p>
          </div>
        </div>
      )}

      {/* 2. FORM STEP 1: Name + Date of Birth (Spec 12) */}
      {step === 'FORM_1' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 1 / 3: THÔNG TIN CƠ BẢN</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">Họ Tên &amp; Ngày Sinh</h2>
          </div>

          <form onSubmit={handleNextToStep2} className="space-y-5 bg-surface border border-borderDark p-6">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Họ và tên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày sinh dương lịch
              </label>
              <DateInput
                value={solarDate}
                onChange={setSolarDate}
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
                className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors"
              >
                Tiếp Tục →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. FORM STEP 2: Time + Location + Gender (Spec 12) */}
      {step === 'FORM_2' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 2 / 3: TỌA ĐỘ THỜI GIAN &amp; KHÔNG GIAN</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">Giờ Sinh &amp; Nơi Sinh</h2>
          </div>

          <form onSubmit={handleNextToConfirm} className="space-y-5 bg-surface border border-borderDark p-6">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giờ sinh chính xác
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/70 block mt-1 font-mono">
                Giờ sinh xác định vị trí an Mệnh, Thân và 12 cung chức.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Nơi sinh (Tỉnh / Thành phố)
              </label>
              <select
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giới tính
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('MALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'MALE'
                      ? 'border-accentGold bg-background text-accentGold font-bold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment'
                  }`}
                >
                  Nam Mệnh
                </button>
                <button
                  type="button"
                  onClick={() => setGender('FEMALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'FEMALE'
                      ? 'border-accentGold bg-background text-accentGold font-bold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment'
                  }`}
                >
                  Nữ Mệnh
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep('FORM_1')}
                className="px-4 py-2 border border-borderDark text-stone text-xs font-mono uppercase tracking-wider hover:text-parchment"
              >
                ← Quay lại
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors"
              >
                Xác Nhận Thông Tin →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. CONFIRMATION STEP (Spec 13) */}
      {step === 'CONFIRM' && (
        <div className="space-y-4">
          <ConfirmationStep
            title="Xác Nhận Dữ Liệu Khởi Bàn Tử Vi"
            subtitle="Kiểm tra kỹ thông tin trước khi hệ thống kích hoạt thuật toán an sao."
            items={[
              { label: 'Họ và tên', value: fullName },
              { label: 'Ngày sinh dương lịch', value: solarDate },
              { label: 'Giờ sinh', value: birthTime },
              { label: 'Nơi sinh', value: birthPlace },
              { label: 'Giới tính', value: gender === 'MALE' ? 'Nam Mệnh' : 'Nữ Mệnh' },
            ]}
            onConfirm={executeCalculation}
            onEdit={() => setStep('FORM_2')}
            confirmLabel="Lập lá số →"
          />

          {error && (
            <div className="max-w-xl mx-auto p-3.5 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      {/* 5. CONTEXTUAL LOADING (Spec 14) */}
      {step === 'LOADING' && (
        <ContextualLoading
          title="Đang Lập Lá Số Tử Vi Đẩu Số"
          steps={[
            'Đang xác định các yếu tố lịch pháp...',
            'Đang dựng cấu trúc 12 cung...',
            'Đang kiểm tra các mối liên hệ Tam Phương Tứ Chính...',
            'Đang tổng hợp những chủ đề nổi bật...',
          ]}
          currentStepIndex={loadingStepIdx}
        />
      )}

      {/* 6. EDITORIAL RESULT VIEW (Spec 15–26) */}
      {step === 'RESULT' && result && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-borderDark pb-3">
            <button
              type="button"
              onClick={() => setStep('INTRO')}
              className="text-xs font-mono text-stone hover:text-accentGold transition-colors flex items-center gap-1.5"
            >
              <span>← Lập lá số khác</span>
            </button>
          </div>

          <MysticosResultViewer result={result} />
        </div>
      )}
    </div>
  );
}
