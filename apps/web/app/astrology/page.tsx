'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  ArrowRight,
  Sun,
  Moon,
  Info,
} from 'lucide-react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';
import { ConfirmationStep, ContextualLoading } from '@/components/primitives';
import { saveHistoryItem } from '@/lib/history-storage';

const VIETNAM_CITIES: { name: string; lat: number; lng: number }[] = [
  { name: 'Hà Nội', lat: 21.0285, lng: 105.8542 },
  { name: 'TP. Hồ Chí Minh', lat: 10.8231, lng: 106.6297 },
  { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022 },
  { name: 'Hải Phòng', lat: 20.8449, lng: 106.6881 },
  { name: 'Cần Thơ', lat: 10.0452, lng: 105.7469 },
  { name: 'Nha Trang', lat: 12.2388, lng: 109.1967 },
  { name: 'Huế', lat: 16.4637, lng: 107.5909 },
  { name: 'Đà Lạt', lat: 11.9404, lng: 108.4583 },
  { name: 'Khác', lat: 0, lng: 0 },
];

export default function AstrologyPage() {
  const [step, setStep] = useState<'INTRO' | 'FORM' | 'CONFIRM' | 'LOADING' | 'RESULT'>('INTRO');
  const [fullName, setFullName] = useState('Trần Hoàng Nam');
  const [birthDate, setBirthDate] = useState('1990-07-25');
  const [birthTime, setBirthTime] = useState('08:30');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [latitude, setLatitude] = useState(21.0285);
  const [longitude, setLongitude] = useState(105.8542);
  const [timezoneOffset, setTimezoneOffset] = useState(420);
  const [houseSystem, setHouseSystem] = useState('PLACIDUS');

  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const city = VIETNAM_CITIES.find((c) => c.name === cityName);
    if (city && city.lat !== 0) {
      setLatitude(city.lat);
      setLongitude(city.lng);
    }
  };

  const handleCalculate = async () => {
    setStep('LOADING');
    setError(null);
    setLoadingStepIdx(0);

    const timer1 = setTimeout(() => setLoadingStepIdx(1), 400);
    const timer2 = setTimeout(() => setLoadingStepIdx(2), 800);
    const timer3 = setTimeout(() => setLoadingStepIdx(3), 1200);

    try {
      const payload: any = {
        birthDate,
        timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
        timezoneOffsetMinutes: Number(timezoneOffset),
      };

      if (!isTimeUnknown) {
        payload.birthTime = `${birthTime}:00`;
        payload.latitude = Number(latitude);
        payload.longitude = Number(longitude);
        payload.houseSystem = houseSystem;
      }

      const res = await fetch('/api/astrology/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Lỗi tính toán thiên văn');

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);

      // Save to local history
      saveHistoryItem({
        id: `astrology_${Date.now()}`,
        timestamp: Date.now(),
        domain: 'astrology',
        title: `Bản Đồ Sao: ${fullName}`,
        mainTheme: canonicalResult.primaryResult || 'Bản đồ sao cá nhân Natal Chart',
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
      {/* 1. INTRO LANDING (Spec 35) */}
      {step === 'INTRO' && (
        <div className="space-y-12 max-w-4xl mx-auto py-2">
          <div className="border-b border-borderDark pb-8 space-y-4">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">03</span>
              <span>/</span>
              <span>Chiêm Tinh Học Tây Phương</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal tracking-tight leading-tight">
              Bản Đồ Sao Cá Nhân
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Khám phá cấu trúc bản đồ sao và những tương tác nổi bật trong lá số của bạn.
              Định vị tọa độ 10 thiên thể và 12 cung nhà theo hệ tọa độ Hoàng Đạo chuẩn mực thiên văn học.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Lập bản đồ sao</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">01. Bộ Ba Nhân Cách</span>
              <p className="text-xs text-stone leading-relaxed">
                Mặt Trời (Ý chí &amp; Bản thể), Mặt Trăng (Nhu cầu cảm xúc) và Cung Mọc (Phong thái cửa ngõ).
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">02. Góc Hợp Trọng Yếu</span>
              <p className="text-xs text-stone leading-relaxed">
                Các góc chiếu năng lượng mạnh nhất: Tam Hợp, Đối Lập, Vuông Góc và Trùng Tụ.
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">03. 12 Cung Nhà</span>
              <p className="text-xs text-stone leading-relaxed">
                Vùng đời sống được kích hoạt nhiều nhất (tài chính, sự nghiệp, quan hệ hay nội tâm).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. FORM INPUT */}
      {step === 'FORM' && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 1 / 2: THÔNG TIN SINH THẦN</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">Nhập Dữ Liệu Bản Đồ Sao</h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep('CONFIRM');
            }}
            className="space-y-4 bg-surface border border-borderDark p-6"
          >
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
                value={birthDate}
                onChange={setBirthDate}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono text-stone uppercase tracking-wider">
                  Giờ sinh
                </label>
                <label className="flex items-center gap-1.5 text-xs font-mono text-stone cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="accent-accentGold"
                  />
                  <span>Không rõ giờ sinh</span>
                </label>
              </div>

              {!isTimeUnknown ? (
                <input
                  type="time"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                />
              ) : (
                <div className="p-3 bg-background border border-accentGold/40 text-stone text-xs font-mono leading-relaxed">
                  <span className="text-accentGold font-bold block mb-1">LƯU Ý GIỚI HẠN (SPEC 35):</span>
                  Bạn vẫn có thể xem được vị trí Mặt Trời, Mặt Trăng và các hành tinh trên Hoàng Đạo, nhưng Cung Mọc (Ascendant) và 12 Cung Nhà sẽ không thể xác định.
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Nơi sinh (Tỉnh / Thành phố)
              </label>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                {VIETNAM_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
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
            title="Xác Nhận Dữ Liệu Bản Đồ Sao"
            subtitle="Kiểm tra lại thông tin sinh thần để hệ thống tính toán tọa độ hành tinh chính xác."
            items={[
              { label: 'Họ và tên', value: fullName },
              { label: 'Ngày sinh dương lịch', value: birthDate },
              { label: 'Giờ sinh', value: isTimeUnknown ? 'Không rõ giờ sinh (Tính một phần)' : birthTime },
              { label: 'Nơi sinh', value: selectedCity },
              { label: 'Độ chính xác dữ liệu', value: isTimeUnknown ? 'Một phần (Không có Cung Mọc/Nhà)' : 'Đầy đủ (Định vị 12 Cung Nhà)' },
            ]}
            onConfirm={handleCalculate}
            onEdit={() => setStep('FORM')}
            confirmLabel="Lập bản đồ sao →"
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
          title="Đang Tính Toán Tọa Độ Bản Đồ Sao"
          steps={[
            'Đang tính toán tọa độ Mặt Trời, Mặt Trăng và các hành tinh...',
            'Đang xác định các góc hợp tương tác (Aspects)...',
            isTimeUnknown ? 'Bỏ qua Cung Mọc do thiếu giờ sinh...' : 'Đang thiết lập 12 cung nhà Placidus...',
            'Đang tổng hợp cấu trúc năng lượng nổi bật...',
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
              <span>← Lập bản đồ sao khác</span>
            </button>
          </div>

          <MysticosResultViewer result={result} />
        </div>
      )}
    </div>
  );
}
