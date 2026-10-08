'use client';

import React, { useState } from 'react';
import {
  Users,
  AlertTriangle,
  ArrowRight,
  Heart,
  Briefcase,
  UserCheck,
  Compass,
} from 'lucide-react';
import type { MysticosResult, DeepMysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';
import { ConfirmationStep, ContextualLoading } from '@/components/primitives';
import { saveHistoryItem } from '@/lib/history-storage';

const RELATIONSHIP_TYPES = [
  { id: 'LOVE', label: 'Tình Cảm & Hôn Nhân', desc: 'Tập trung vào sự thấu cảm, cảm xúc, gắn kết và giải quyết xung đột đời sống chung.' },
  { id: 'BUSINESS', label: 'Công Việc & Hợp Tác', desc: 'Tập trung vào cách ra quyết định, phân bổ nguồn lực, quản lý tiền bạc và phong cách tư duy.' },
  { id: 'FRIENDSHIP', label: 'Bạn Bè & Tri Kỷ', desc: 'Tập trung vào hệ giá trị tương đồng, sự chia sẻ nội tâm và tôn trọng không gian riêng.' },
  { id: 'FAMILY', label: 'Gia Đình & Thân Tộc', desc: 'Tập trung vào cơ chế thấu hiểu thế hệ và nếp sinh hoạt đời thường.' },
];

export default function CompatibilityPage() {
  const [step, setStep] = useState<'INTRO' | 'FORM' | 'CONFIRM' | 'LOADING' | 'RESULT'>('INTRO');
  const [activePersonTab, setActivePersonTab] = useState<'A' | 'B'>('A');

  // Person A
  const [nameA, setNameA] = useState('Nguyễn Văn An');
  const [dateA, setDateA] = useState('1992-05-15');
  const [genderA, setGenderA] = useState<'MALE' | 'FEMALE'>('MALE');
  const [timeA, setTimeA] = useState('08:00');
  const [cityA, setCityA] = useState('Hà Nội');

  // Person B
  const [nameB, setNameB] = useState('Trần Thị Bình');
  const [dateB, setDateB] = useState('1994-10-20');
  const [genderB, setGenderB] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [timeB, setTimeB] = useState('14:30');
  const [cityB, setCityB] = useState('Hà Nội');

  const [relationshipType, setRelationshipType] = useState('LOVE');

  const [loadingStepIdx, setLoadingStepIdx] = useState(0);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedRelType = RELATIONSHIP_TYPES.find((r) => r.id === relationshipType) || RELATIONSHIP_TYPES[0];

  const handleCompare = async () => {
    setStep('LOADING');
    setError(null);
    setLoadingStepIdx(0);

    const timer1 = setTimeout(() => setLoadingStepIdx(1), 400);
    const timer2 = setTimeout(() => setLoadingStepIdx(2), 800);
    const timer3 = setTimeout(() => setLoadingStepIdx(3), 1200);

    try {
      const response = await fetch('/api/compatibility/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personA: {
            name: nameA,
            birthDate: dateA,
            birthTime: timeA ? `${timeA}:00` : undefined,
            gender: genderA,
            city: cityA,
          },
          personB: {
            name: nameB,
            birthDate: dateB,
            birthTime: timeB ? `${timeB}:00` : undefined,
            gender: genderB,
            city: cityB,
          },
          relationshipType,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Khảo cứu tương hợp thất bại.');
      }

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);

      // Save to local history
      saveHistoryItem({
        id: `compat_${Date.now()}`,
        timestamp: Date.now(),
        domain: 'compatibility',
        title: `Tương Hợp: ${nameA} ✕ ${nameB}`,
        mainTheme: canonicalResult.primaryResult || `Tương quan trong mục đích ${selectedRelType.label}`,
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
      {/* 1. INTRO LANDING (Spec 55) */}
      {step === 'INTRO' && (
        <div className="space-y-12 max-w-4xl mx-auto py-2">
          <div className="border-b border-borderDark pb-8 space-y-4">
            <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
              <span className="text-accentGold">05</span>
              <span>/</span>
              <span>Khảo Cứu Tương Hợp Đa Hệ Thống</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-parchment font-normal tracking-tight leading-tight">
              Độ Tương Hợp
            </h1>

            <p className="text-sm sm:text-base text-stone max-w-2xl leading-relaxed">
              Khám phá cách hai người kết nối, hỗ trợ và tạo ra ma sát trong các lĩnh vực khác nhau.
              Không đánh giá bằng điểm số phần trăm cảm tính. Chúng tôi phân tích động lực thực tế: điểm hút tự nhiên, khác biệt bản năng và cơ chế dung hòa.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="px-6 py-3 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold inline-flex items-center gap-2"
              >
                <span>Bắt đầu khảo cứu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">01. Trọng Số Theo Bối Cảnh</span>
              <p className="text-xs text-stone leading-relaxed">
                Tương hợp trong công việc ưu tiên phong cách tư duy và tiền bạc; trong khi tình cảm ưu tiên sự an toàn tâm lý.
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">02. Động Lực Tương Tác</span>
              <p className="text-xs text-stone leading-relaxed">
                Người A có xu hướng gì? Người B phản xạ ra sao? Điểm kết nối ở đâu và khi kết hợp sẽ tạo nên quán tính gì?
              </p>
            </div>
            <div className="p-6 border border-borderDark bg-surface space-y-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-wider block">03. Kịch Bản Đời Thường</span>
              <p className="text-xs text-stone leading-relaxed">
                Mô phỏng phản ứng thực tế khi hai người tranh luận, cùng ra quyết định tài chính hoặc cần không gian riêng.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. FORM INPUT */}
      {step === 'FORM' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border-b border-borderDark pb-4 space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-accentGold uppercase tracking-wider">
              <span>BƯỚC 1 / 2: THÔNG TIN HAI BÊN &amp; NGỮ CẢNH</span>
            </div>
            <h2 className="text-2xl font-serif text-parchment font-medium">Nhập Dữ Liệu Tương Hợp</h2>
          </div>

          {/* Relationship Context Selection (Spec 56) */}
          <div className="bg-surface border border-borderDark p-5 space-y-3">
            <label className="block text-xs font-mono text-accentGold uppercase tracking-wider">
              Ngữ Cảnh Quan Hệ (Relationship Context)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RELATIONSHIP_TYPES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRelationshipType(r.id)}
                  className={`p-2.5 text-xs font-mono uppercase tracking-wider border text-center transition-all ${
                    relationshipType === r.id
                      ? 'border-accentGold bg-background text-accentGold font-bold'
                      : 'border-borderDark bg-surface text-stone hover:text-parchment'
                  }`}
                >
                  {r.label.split('&')[0]}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone/80 italic font-sans">{selectedRelType.desc}</p>
          </div>

          {/* Person A vs B Tabs */}
          <div className="bg-surface border border-borderDark p-6 space-y-5">
            <div className="flex border-b border-borderDark">
              <button
                type="button"
                onClick={() => setActivePersonTab('A')}
                className={`py-2 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
                  activePersonTab === 'A'
                    ? 'border-accentGold text-accentGold font-bold'
                    : 'border-transparent text-stone hover:text-parchment'
                }`}
              >
                Đối Tượng A: {nameA || 'Người A'}
              </button>
              <button
                type="button"
                onClick={() => setActivePersonTab('B')}
                className={`py-2 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
                  activePersonTab === 'B'
                    ? 'border-accentGold text-accentGold font-bold'
                    : 'border-transparent text-stone hover:text-parchment'
                }`}
              >
                Đối Tượng B: {nameB || 'Người B'}
              </button>
            </div>

            {activePersonTab === 'A' ? (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Họ và tên Đối tượng A
                  </label>
                  <input
                    type="text"
                    value={nameA}
                    onChange={(e) => setNameA(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Ngày sinh Đối tượng A
                  </label>
                  <DateInput value={dateA} onChange={setDateA} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                      Giờ sinh (Tùy chọn)
                    </label>
                    <input
                      type="time"
                      value={timeA}
                      onChange={(e) => setTimeA(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                      Giới tính
                    </label>
                    <select
                      value={genderA}
                      onChange={(e) => setGenderA(e.target.value as any)}
                      className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                    >
                      <option value="MALE">Nam</option>
                      <option value="FEMALE">Nữ</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Họ và tên Đối tượng B
                  </label>
                  <input
                    type="text"
                    value={nameB}
                    onChange={(e) => setNameB(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Ngày sinh Đối tượng B
                  </label>
                  <DateInput value={dateB} onChange={setDateB} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                      Giờ sinh (Tùy chọn)
                    </label>
                    <input
                      type="time"
                      value={timeB}
                      onChange={(e) => setTimeB(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                      Giới tính
                    </label>
                    <select
                      value={genderB}
                      onChange={(e) => setGenderB(e.target.value as any)}
                      className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                    >
                      <option value="FEMALE">Nữ</option>
                      <option value="MALE">Nam</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

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
                onClick={() => setStep('CONFIRM')}
                className="px-5 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest border border-accentGold hover:bg-parchment transition-colors"
              >
                Xác Nhận Dữ Liệu →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CONFIRMATION STEP */}
      {step === 'CONFIRM' && (
        <div className="space-y-4">
          <ConfirmationStep
            title="Xác Nhận Dữ Liệu Khảo Luận Tương Hợp"
            subtitle="Kiểm tra thông tin của cả hai đối tượng trước khi hệ thống kích hoạt tính toán đối chiếu chéo."
            items={[
              { label: 'Đối tượng A', value: `${nameA} (${dateA})` },
              { label: 'Đối tượng B', value: `${nameB} (${dateB})` },
              { label: 'Mục đích khảo luận', value: selectedRelType.label },
            ]}
            onConfirm={handleCompare}
            onEdit={() => setStep('FORM')}
            confirmLabel="Khảo Luận Tương Hợp →"
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
          title="Đang Phân Tích Độ Tương Hợp"
          steps={[
            `Đang thiết lập bản đồ sao và số học của ${nameA} và ${nameB}...`,
            `Đang áp dụng trọng số theo ngữ cảnh: ${selectedRelType.label}...`,
            'Đang đối chiếu các chiều kích (Cảm xúc, Giao tiếp, Giá trị)...',
            'Đang xây dựng kịch bản tương tác và điểm cân bằng...',
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
              <span>← Khảo cứu cặp đôi khác</span>
            </button>
          </div>

          <MysticosResultViewer result={result} />
        </div>
      )}
    </div>
  );
}
