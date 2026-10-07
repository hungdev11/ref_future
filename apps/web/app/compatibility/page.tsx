'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  AlertTriangle,
  RefreshCw,
  User,
  Compass,
  HelpCircle,
} from 'lucide-react';
import type { MysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

const CITIES: Record<string, string> = {
  HN: 'Hà Nội',
  HCM: 'TP. Hồ Chí Minh',
  DN: 'Đà Nẵng',
  CT: 'Cần Thơ',
  HP: 'Hải Phòng',
  OTHER: 'Thành phố khác',
};

export default function CompatibilityPage() {
  // Person A
  const [nameA, setNameA] = useState('Nguyễn Văn An');
  const [dateA, setDateA] = useState('1992-05-15');
  const [genderA, setGenderA] = useState<'MALE' | 'FEMALE'>('MALE');
  const [timeA, setTimeA] = useState('');
  const [cityA, setCityA] = useState('HN');

  // Person B
  const [nameB, setNameB] = useState('Trần Thị Bình');
  const [dateB, setDateB] = useState('1994-10-20');
  const [genderB, setGenderB] = useState<'MALE' | 'FEMALE'>('FEMALE');
  const [timeB, setTimeB] = useState('');
  const [cityB, setCityB] = useState('HN');

  const [relationshipType, setRelationshipType] = useState('LOVE');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/compatibility/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personA: {
            name: nameA,
            birthDate: dateA,
            birthTime: timeA || undefined,
            gender: genderA,
            city: CITIES[cityA] || cityA,
          },
          personB: {
            name: nameB,
            birthDate: dateB,
            birthTime: timeB || undefined,
            gender: genderB,
            city: CITIES[cityB] || cityB,
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
    } catch (err: any) {
      setError(err.message || 'Khảo cứu tương hợp thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span>/</span>
          <span>Độ Tương Hợp Đa Hệ Thống</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Khảo Luận Tương Tác & Hòa Hợp Năng Lượng
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Tổng hợp đa trường phái: Chiêm Tinh Học Tây Phương, Thần Số Học Pythagoras, và Can Chi Tử Vi Đông Phương.
          Không dùng điểm số cảm tính vô nghĩa, mọi đánh giá đều tuân thủ 17 tầng MysticosResult.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form */}
        <div className="lg:col-span-5 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Thông Số Đối Tượng Khảo Luận</span>
          </div>

          <form onSubmit={handleCompare} className="space-y-6">
            {/* Person A */}
            <div className="p-4 bg-background border border-borderDark space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-parchment border-b border-borderDark pb-2">
                <User className="w-3.5 h-3.5 text-accentGold" />
                <span className="font-bold uppercase tracking-wider">Đối Tượng A</span>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone mb-1 uppercase">Họ và Tên</label>
                <input
                  type="text"
                  value={nameA}
                  onChange={(e) => setNameA(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone mb-1 uppercase">
                  Ngày Sinh <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
                </label>
                <DateInput value={dateA} onChange={setDateA} required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Giờ Sinh (Tùy chọn)</label>
                  <input
                    type="time"
                    value={timeA}
                    onChange={(e) => setTimeA(e.target.value)}
                    className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Giới Tính</label>
                  <select
                    value={genderA}
                    onChange={(e) => setGenderA(e.target.value as any)}
                    className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Person B */}
            <div className="p-4 bg-background border border-borderDark space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-parchment border-b border-borderDark pb-2">
                <User className="w-3.5 h-3.5 text-accentGold" />
                <span className="font-bold uppercase tracking-wider">Đối Tượng B</span>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone mb-1 uppercase">Họ và Tên</label>
                <input
                  type="text"
                  value={nameB}
                  onChange={(e) => setNameB(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-stone mb-1 uppercase">
                  Ngày Sinh <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
                </label>
                <DateInput value={dateB} onChange={setDateB} required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Giờ Sinh (Tùy chọn)</label>
                  <input
                    type="time"
                    value={timeB}
                    onChange={(e) => setTimeB(e.target.value)}
                    className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Giới Tính</label>
                  <select
                    value={genderB}
                    onChange={(e) => setGenderB(e.target.value as any)}
                    className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  >
                    <option value="MALE">Nam</option>
                    <option value="FEMALE">Nữ</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Relationship Type */}
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Mục Đích Khảo Luận Tương Quan
              </label>
              <select
                value={relationshipType}
                onChange={(e) => setRelationshipType(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="LOVE">Tình Cảm & Hôn Nhân</option>
                <option value="BUSINESS">Hợp Tác Kinh Doanh / Sự Nghiệp</option>
                <option value="FRIENDSHIP">Bạn Bè & Đồng Hành</option>
                <option value="FAMILY">Gia Đình & Thân Tộc</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Đang Khảo Luận Tương Quan...
                </>
              ) : (
                'Khảo Luận Tương Hợp →'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Guide Note */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Nguyên Tắc Không Dùng Điểm Ảo</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Mysticos không đưa ra con số 70/100 hay 85% tương hợp vô căn cứ.
              Hệ thống phân tích cơ chế cộng hưởng, điểm va chạm tự nhiên và chỉ dẫn cụ thể để xây dựng mối quan hệ bền vững.
            </p>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Hồ Sơ Đang Chờ Khảo Cứu</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập thông tin hai đối tượng bên trái để tiến hành khảo luận tương quan đa hệ thống.
              </p>
            </div>
          )}

          {/* Pure MysticosResultViewer */}
          {result && <MysticosResultViewer result={result} />}
        </div>
      </div>
    </div>
  );
}
