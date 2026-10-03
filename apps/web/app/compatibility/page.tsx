'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  AlertTriangle,
  RefreshCw,
  User,
  Compass,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DateInput } from '@/components/DateInput';

const CITIES: Record<string, string> = {
  HN: 'Hà Nội',
  HCM: 'TP. Hồ Chí Minh',
  DN: 'Đà Nẵng',
  CT: 'Cần Thơ',
  HP: 'Hải Phòng',
  OTHER: 'Thành phố khác',
};

interface CompatibilityDimension {
  code: string;
  nameVn: string;
  status: 'SUPPORTING' | 'BALANCED' | 'TENSION';
  summary: string;
  mechanism: string;
  advice: string;
}

interface MultiSystemReport {
  precisionLevel: string;
  relationshipType: string;
  personA: {
    name: string;
    birthDate: string;
    sunSign: string;
    sunElement: string;
    lifePath: number;
    canChiYear: string;
    menhNguHanh: string;
  };
  personB: {
    name: string;
    birthDate: string;
    sunSign: string;
    sunElement: string;
    lifePath: number;
    canChiYear: string;
    menhNguHanh: string;
  };
  pairwiseFeatures: {
    astroElementPair: string;
    astroHarmonyLevel: string;
    numerologyMatch: string;
    tuviNguHanhMatch: string;
    batTrachMatch: string;
  };
  dimensions: CompatibilityDimension[];
  synthesis: {
    coreDynamic: string;
    primaryStrength: string;
    frictionZone: string;
    conflictResolutionMechanism: string;
  };
  guidance: {
    dos: string[];
    donts: string[];
    communicationBlueprint: string;
  };
}

function getDataCompleteness(timeA: string, timeB: string): { pct: number; label: string; note: string } {
  const hasTime = timeA.trim() !== '' && timeB.trim() !== '';
  if (hasTime) {
    return {
      pct: 100,
      label: 'Đầy Đủ (Đủ Giờ Sinh)',
      note: 'Phân tích đa hệ thống chuẩn xác bao gồm Can Chi, Nạp Âm Tử Vi, Cung Hoàng Đạo & Số Học Pythagoras.',
    };
  }
  return {
    pct: 75,
    label: 'Cơ Bản (Chỉ Ngày Sinh)',
    note: 'Thiếu giờ sinh: Khảo cứu dựa trên Can Chi năm, Cung Mặt Trời và Số Chủ Đạo Pythagoras.',
  };
}

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

  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<MultiSystemReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSec = (k: string) => setOpenSections((p) => ({ ...p, [k]: !p[k] }));

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOpenSections({});

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
          relationshipType: 'LOVE',
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setReport(data.report);
      // Auto open first two dimensions and synthesis
      setOpenSections({
        dim_0: true,
        dim_1: true,
        synthesis: true,
        guidance: true,
      });
    } catch (err: any) {
      setError(err.message || 'Khảo cứu tương hợp thất bại.');
    } finally {
      setLoading(false);
    }
  };

  const completeness = getDataCompleteness(timeA, timeB);

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">05</span>
          <span>/</span>
          <span>Khảo Cứu Độ Tương Hợp Đa Hệ Thống</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Hòa Hợp Bản Mệnh Lứa Đôi & Tri Kỷ
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Động cơ xác định (Deterministic Multi-System Engine) kết hợp nguyên lý 4 Nguyên Tố Hoàng Đạo,
          cặp Số Chủ Đạo Pythagoras và Nạp Âm Ngũ Hành Đông Phương. Không điểm số cảm tính, truy nguyên nguồn gốc
          rõ ràng.
        </p>
      </div>

      <form onSubmit={handleCompare} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person A */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Đối Tượng A</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Họ và Tên</label>
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
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={dateA}
                onChange={setDateA}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Giới Tính</label>
              <select
                value={genderA}
                onChange={(e) => setGenderA(e.target.value as any)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giờ Sinh <span className="text-stone/60 normal-case">(tùy chọn, tăng độ chính xác)</span>
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
                Nơi Sinh <span className="text-stone/60 normal-case">(tùy chọn)</span>
              </label>
              <select
                value={cityA}
                onChange={(e) => setCityA(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                {Object.entries(CITIES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Person B */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              <span>Đối Tượng B</span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Họ và Tên</label>
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
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={dateB}
                onChange={setDateB}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">Giới Tính</label>
              <select
                value={genderB}
                onChange={(e) => setGenderB(e.target.value as any)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                <option value="FEMALE">Nữ</option>
                <option value="MALE">Nam</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giờ Sinh <span className="text-stone/60 normal-case">(tùy chọn, tăng độ chính xác)</span>
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
                Nơi Sinh <span className="text-stone/60 normal-case">(tùy chọn)</span>
              </label>
              <select
                value={cityB}
                onChange={(e) => setCityB(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              >
                {Object.entries(CITIES).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Completeness Meter */}
        <div className="p-3 bg-surface border border-borderDark space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-stone uppercase tracking-wider">Độ Đầy Đủ Dữ Liệu Khảo Cứu</span>
            <span className={completeness.pct >= 90 ? 'text-emerald-400' : 'text-amber-400'}>
              {completeness.label} — {completeness.pct}%
            </span>
          </div>
          <div className="h-1 bg-background border border-borderDark">
            <div
              className={`h-full transition-all ${completeness.pct >= 90 ? 'bg-emerald-400' : 'bg-amber-400'}`}
              style={{ width: `${completeness.pct}%` }}
            />
          </div>
          <p className="text-stone text-[10px] leading-relaxed">{completeness.note}</p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-accentGold text-background font-mono text-xs font-bold uppercase tracking-widest hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Đang đối chiếu dữ liệu đa hệ thống...
              </>
            ) : (
              'Khảo Cứu Tương Hợp →'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {report && (
        <div className="space-y-6 pt-2 animate-fadeIn">
          {/* TẦNG 1: RAW DATA & TỌA ĐỘ BẢN MỆNH CÁ NHÂN */}
          <div className="p-5 bg-surface border border-borderDark space-y-4">
            <div className="flex items-center justify-between border-b border-borderDark pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accentGold text-xs uppercase tracking-widest">Tầng 1</span>
                <span className="text-stone text-xs">/</span>
                <h2 className="text-base font-serif text-parchment">Tọa Độ Bản Mệnh Đôi Bên</h2>
              </div>
              <span className="text-[10px] font-mono text-stone uppercase">Mức chính xác: {report.precisionLevel}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { person: report.personA, label: 'Đối Tượng A' },
                { person: report.personB, label: 'Đối Tượng B' },
              ].map(({ person, label }, idx) => (
                <div key={idx} className="p-4 bg-background border border-borderDark space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-borderDark/60 pb-1.5">
                    <span className="font-serif font-bold text-parchment text-sm">{person.name}</span>
                    <span className="text-accentGold text-[10px] uppercase">{label}</span>
                  </div>
                  <div className="space-y-1.5 text-stone pt-1">
                    <div className="flex justify-between border-b border-borderDark/40 pb-1">
                      <span>Cung Mặt Trời:</span>
                      <span className="text-parchment">{person.sunSign}</span>
                    </div>
                    <div className="flex justify-between border-b border-borderDark/40 pb-1">
                      <span>Nguyên Tố Hoàng Đạo:</span>
                      <span className="text-accentGold font-bold">{person.sunElement}</span>
                    </div>
                    <div className="flex justify-between border-b border-borderDark/40 pb-1">
                      <span>Số Chủ Đạo Pythagoras:</span>
                      <span className="text-accentGold font-bold">Số {person.lifePath}</span>
                    </div>
                    <div className="flex justify-between border-b border-borderDark/40 pb-1">
                      <span>Năm Can Chi:</span>
                      <span className="text-parchment">{person.canChiYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nạp Âm Ngũ Hành:</span>
                      <span className="text-parchment font-semibold">{person.menhNguHanh}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TẦNG 2: MỐI TƯƠNG QUAN ĐÔI BÊN (PAIRWISE FEATURES) */}
          <div className="p-5 bg-surface border border-borderDark space-y-3">
            <div className="flex items-center gap-2 border-b border-borderDark pb-2">
              <span className="font-mono text-accentGold text-xs uppercase tracking-widest">Tầng 2</span>
              <span className="text-stone text-xs">/</span>
              <h2 className="text-base font-serif text-parchment">Đặc Tính Cặp Đôi (Pairwise Correlations)</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="text-stone text-[10px] uppercase block">Nguyên Tố Hoàng Đạo</span>
                <span className="text-accentGold font-bold">{report.pairwiseFeatures.astroElementPair}</span>
                <p className="text-stone/80 text-[11px]">{report.pairwiseFeatures.astroHarmonyLevel}</p>
              </div>
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="text-stone text-[10px] uppercase block">Thần Số Học Pythagoras</span>
                <span className="text-parchment font-bold">Số {report.personA.lifePath} × Số {report.personB.lifePath}</span>
                <p className="text-stone/80 text-[11px] line-clamp-2">{report.pairwiseFeatures.numerologyMatch}</p>
              </div>
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="text-stone text-[10px] uppercase block">Nạp Âm Ngũ Hành</span>
                <span className="text-parchment font-bold">{report.pairwiseFeatures.tuviNguHanhMatch}</span>
                <p className="text-stone/80 text-[11px]">Tương sinh - tương khắc tự nhiên</p>
              </div>
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="text-stone text-[10px] uppercase block">Phong Thổ Bát Trạch</span>
                <span className="text-emerald-400 font-bold">Hòa Phối Khí Chất</span>
                <p className="text-stone/80 text-[11px]">{report.pairwiseFeatures.batTrachMatch}</p>
              </div>
            </div>
          </div>

          {/* TẦNG 3: 7 CHIỀU KHẢO CỨU CHI TIẾT (CANONICAL DIMENSIONS) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-borderDark pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-accentGold text-xs uppercase tracking-widest">Tầng 3</span>
                <span className="text-stone text-xs">/</span>
                <h2 className="text-base font-serif text-parchment">7 Chiều Khảo Cứu Tương Hợp Chi Tiết</h2>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allOpen: Record<string, boolean> = {};
                    report.dimensions.forEach((_, i) => { allOpen[`dim_${i}`] = true; });
                    allOpen.synthesis = true;
                    allOpen.guidance = true;
                    setOpenSections(allOpen);
                  }}
                  className="text-[10px] font-mono text-stone hover:text-parchment"
                >
                  Mở Tất Cả
                </button>
                <span className="text-stone/40">|</span>
                <button
                  type="button"
                  onClick={() => setOpenSections({})}
                  className="text-[10px] font-mono text-stone hover:text-parchment"
                >
                  Đóng Tất Cả
                </button>
              </div>
            </div>

            {report.dimensions.map((dim, idx) => {
              const isOpen = !!openSections[`dim_${idx}`];
              const statusColor =
                dim.status === 'SUPPORTING'
                  ? 'text-emerald-400 border-emerald-400/30'
                  : dim.status === 'TENSION'
                  ? 'text-cinnabar border-cinnabar/30'
                  : 'text-accentGold border-accentGold/30';

              const statusBadge =
                dim.status === 'SUPPORTING'
                  ? 'Tương Trợ Mạnh'
                  : dim.status === 'TENSION'
                  ? 'Ma Sát Cao'
                  : 'Cân Bằng Động';

              return (
                <div key={dim.code} className="bg-surface border border-borderDark">
                  <button
                    type="button"
                    onClick={() => toggleSec(`dim_${idx}`)}
                    className="w-full flex items-center justify-between p-4 hover:bg-background/60 transition-colors text-left"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-semibold text-parchment">{dim.nameVn}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border ${statusColor}`}>
                          {statusBadge}
                        </span>
                      </div>
                      <p className="text-xs text-stone line-clamp-1 font-sans">{dim.summary}</p>
                    </div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-accentGold" /> : <ChevronDown className="w-4 h-4 text-accentGold" />}
                  </button>

                  {isOpen && (
                    <div className="p-5 border-t border-borderDark space-y-4 bg-background">
                      {/* Mechanism */}
                      <div className="space-y-1 text-xs">
                        <span className="font-mono text-accentGold text-[10px] uppercase tracking-wider block">
                          Cơ Chế Tương Tác
                        </span>
                        <p className="text-stone leading-relaxed font-sans">{dim.mechanism}</p>
                      </div>

                      {/* Summary */}
                      <div className="space-y-1 text-xs p-3 bg-surface border border-borderDark">
                        <span className="font-mono text-stone text-[10px] uppercase tracking-wider block">
                          Biểu Hiện Thực Tế
                        </span>
                        <p className="text-parchment leading-relaxed font-sans">{dim.summary}</p>
                      </div>

                      {/* Actionable Advice */}
                      <div className="space-y-1 text-xs p-3 bg-surface border border-emerald-400/20">
                        <span className="font-mono text-emerald-400 text-[10px] uppercase tracking-wider block">
                          Lời Khuyên Điều Hòa
                        </span>
                        <p className="text-stone leading-relaxed font-sans">{dim.advice}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* TẦNG 4: TỔNG LUẬN TỔNG HỢP (HOLISTIC SYNTHESIS) */}
          <div className="border-2 border-accentGold/60 shadow-lg shadow-black/30">
            <button
              type="button"
              onClick={() => toggleSec('synthesis')}
              className="w-full flex items-center justify-between p-5 bg-surface hover:bg-background/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-accentGold" />
                <div className="text-left">
                  <span className="font-mono text-[10px] text-accentGold uppercase tracking-widest block">Tầng 4</span>
                  <span className="font-serif text-sm text-parchment">Tổng Luận Đa Hệ Thống & Động Lực Cốt Lõi</span>
                </div>
              </div>
              {openSections.synthesis ? <ChevronUp className="w-4 h-4 text-accentGold" /> : <ChevronDown className="w-4 h-4 text-accentGold" />}
            </button>

            {openSections.synthesis && (
              <div className="p-5 space-y-5 bg-background border-t border-accentGold/30">
                <div className="p-4 bg-surface border border-borderDark space-y-1.5">
                  <span className="font-mono text-accentGold text-[10px] uppercase tracking-wider block">Động Lực Trọng Tâm</span>
                  <p className="text-stone text-xs leading-relaxed font-sans">{report.synthesis.coreDynamic}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface border border-emerald-400/30 space-y-1.5">
                    <span className="font-mono text-emerald-400 text-[10px] uppercase tracking-wider block">Thế Mạnh Gắn Kết Nhất</span>
                    <p className="text-stone text-xs leading-relaxed font-sans">{report.synthesis.primaryStrength}</p>
                  </div>
                  <div className="p-4 bg-surface border border-cinnabar/30 space-y-1.5">
                    <span className="font-mono text-cinnabar text-[10px] uppercase tracking-wider block">Khu Vực Dễ Phát Sinh Ma Sát</span>
                    <p className="text-stone text-xs leading-relaxed font-sans">{report.synthesis.frictionZone}</p>
                  </div>
                </div>

                <div className="p-4 bg-surface border border-borderDark space-y-1.5">
                  <span className="font-mono text-parchment text-[10px] uppercase tracking-wider block">Cơ Chế Hóa Giải Xung Đột</span>
                  <p className="text-stone text-xs leading-relaxed font-sans">{report.synthesis.conflictResolutionMechanism}</p>
                </div>
              </div>
            )}
          </div>

          {/* TẦNG 5: HƯỚNG DẪN THỰC HÀNH ĐỜI THƯỜNG (PRACTICAL GUIDANCE) */}
          <div className="border border-borderDark bg-surface">
            <button
              type="button"
              onClick={() => toggleSec('guidance')}
              className="w-full flex items-center justify-between p-5 hover:bg-background/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <span className="font-mono text-[10px] text-accentGold uppercase tracking-widest block">Tầng 5</span>
                  <span className="font-serif text-sm text-parchment">Bộ Nguyên Tắc Thực Hành Đời Sống (Dos & Don'ts)</span>
                </div>
              </div>
              {openSections.guidance ? <ChevronUp className="w-4 h-4 text-accentGold" /> : <ChevronDown className="w-4 h-4 text-accentGold" />}
            </button>

            {openSections.guidance && (
              <div className="p-5 space-y-5 bg-background border-t border-borderDark">
                {/* Dos & Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface border border-emerald-400/30 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Nên Thực Hiện (Dos)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone font-sans">
                      {report.guidance.dos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-surface border border-cinnabar/30 space-y-2">
                    <div className="flex items-center gap-2 text-cinnabar text-xs font-mono font-bold uppercase">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cần Tránh (Don'ts)</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-stone font-sans">
                      {report.guidance.donts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cinnabar mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Communication Blueprint */}
                <div className="p-4 bg-surface border border-accentGold/30 space-y-1.5">
                  <span className="font-mono text-accentGold text-[10px] uppercase tracking-wider block">
                    Công Thức Đối Thoại An Toàn Khi Xảy Ra Bất Đồng
                  </span>
                  <p className="text-stone text-xs leading-relaxed font-sans italic">
                    "{report.guidance.communicationBlueprint}"
                  </p>
                </div>

                {/* Audit & Disclaimer */}
                <div className="p-3 bg-background border border-borderDark text-[10px] text-stone/70 space-y-1 font-mono">
                  <span className="text-accentGold uppercase tracking-wider block">Nguyên Tắc Kiểm Chứng Hệ Thống</span>
                  <p className="leading-relaxed">
                    Hệ thống Mysticos không tính điểm phần trăm cảm tính. Mọi kết luận tương hợp trên được đối chiếu
                    100% tất định từ dữ liệu tọa độ bản mệnh, quy luật tương sinh tương khắc ngũ hành và nhịp điệu số học.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
