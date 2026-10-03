'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  X,
  Compass,
  Layers,
  FileText,
} from 'lucide-react';
import {
  STEM_VN,
  BRANCH_VN,
  PALACE_VN,
  PALACE_INFO,
  NAP_AM_TABLE,
  CHU_MENH_MAP,
  CHU_THAN_MAP,
  THAN_CU_DETAILS,
  calculateCanLuong,
  calculatePalaceScore,
  evaluateMenhCucRelation,
  STAR_DETAILED_READINGS,
} from '@/lib/tuvi-interpretations';
import { TuViFullReport } from './TuViFullReport';
import { TermTag } from '@/components/TermTag';

export default function TuViPage() {
  const [solarDate, setSolarDate] = useState('1990-11-29');
  const [birthTime, setBirthTime] = useState('09:30:00');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // View Mode: 'matrix' (interactive 4x4 chart) or 'fullReport' (comprehensive 14-section report)
  const [viewMode, setViewMode] = useState<'matrix' | 'fullReport'>('matrix');

  // Modal State for clicked palace & Thien Ban
  const [selectedPalaceKey, setSelectedPalaceKey] = useState<string | null>(null);
  const [showThienBanModal, setShowThienBanModal] = useState(false);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedPalaceKey(null);

    try {
      const res = await fetch('/api/tuvi/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solarDate,
          birthTime,
          gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khởi tạo lá số thất bại');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">02</span>
          <span>/</span>
          <span>Tử Vi Đẩu Số Cổ Điển</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ 12 Cung Chức & Thiên Bàn Tử Vi
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          An sao lập lá số theo giờ sinh và lịch thiên văn Việt Nam. 
          <strong> Nhấp vào bất kỳ Cung chức nào để mở bảng giải nghĩa chi tiết các sao tọa thủ, điểm số cung vị và lời khuyên đối nhân xử thế.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Guide */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2">
            Nhập Dữ Liệu Khởi Bàn
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch
              </label>
              <input
                type="date"
                value={solarDate}
                onChange={(e) => setSolarDate(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giờ Sinh (Bắt Buộc)
              </label>
              <input
                type="time"
                step="1"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
              />
              <span className="text-[10px] text-stone/70 mt-1 block">
                Cần có giờ sinh chính xác để định Cục và an Mệnh/Thân.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Giới Tính
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('MALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'MALE'
                      ? 'bg-surfaceHover border-accentGold text-parchment font-semibold'
                      : 'bg-background border-borderDark text-stone hover:text-parchment'
                  }`}
                >
                  Nam Mệnh
                </button>
                <button
                  type="button"
                  onClick={() => setGender('FEMALE')}
                  className={`py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                    gender === 'FEMALE'
                      ? 'bg-surfaceHover border-accentGold text-parchment font-semibold'
                      : 'bg-background border-borderDark text-stone hover:text-parchment'
                  }`}
                >
                  Nữ Mệnh
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 mt-2"
            >
              {loading ? 'Đang Khởi Bàn...' : 'An Lá Số Tử Vi →'}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick beginner guide */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hướng Dẫn Cho Người Mới</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Lá số hiển thị 12 cung chức. Bạn <strong>chỉ cần nhấp chuột vào ô bất kỳ</strong> để xem giải thích tường tận từng cung và lời khuyên ứng xử cho cuộc sống.
            </p>
          </div>
        </div>

        {/* Right Column: Lá Số 12 Cung & Thiên Bàn */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Lá Số Đang Chờ Khởi Tạo</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập ngày, giờ sinh và giới tính ở bảng bên trái để khởi tạo ma trận 12 cung Tử Vi.
              </p>
            </div>
          )}

          {result && (() => {
            const yearStemKey = result.facts.yearStem;
            const yearBranchKey = result.facts.yearBranch;
            const napAmKey = `${yearStemKey}_${yearBranchKey}`;
            const napAm = NAP_AM_TABLE[napAmKey] || {
              menh: 'Lộ Bàng Thổ',
              element: 'THO' as const,
              elementVn: 'Thổ (Đất ven đường)',
              description: 'Chân thành, cần cù, kiên nhẫn, lập nghiệp tự thân.',
            };

            const thanCu = THAN_CU_DETAILS[result.facts.hourBranch] || THAN_CU_DETAILS['TY_RAT'];

            const canLuong = calculateCanLuong(
              yearStemKey,
              yearBranchKey,
              result.metadata.lunarMonth,
              result.metadata.lunarDay,
              result.facts.hourBranch
            );

            const menhCuc = evaluateMenhCucRelation(napAm.element, result.metadata.cucDetail);

            return (
              <div className="space-y-6 animate-fadeIn">
                {/* Four Pillars Banner: Clickable to view Thien Ban detail */}
                <div
                  onClick={() => setShowThienBanModal(true)}
                  className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer grid grid-cols-2 sm:grid-cols-4 gap-4 group"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                      Năm Sinh Âm Lịch
                    </span>
                    <span className="text-sm font-serif font-bold text-parchment group-hover:text-accentGold transition-colors block">
                      {STEM_VN[result.facts.yearStem]} {BRANCH_VN[result.facts.yearBranch]}
                    </span>
                    <span className="text-[10px] text-stone font-mono block">Năm {result.metadata.lunarYear}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                      Bản Mệnh Nạp Âm
                    </span>
                    <span className="text-sm font-serif font-bold text-accentGold block">
                      {napAm.menh}
                    </span>
                    <span className="text-[10px] text-stone block font-mono">{result.facts.amDuongNamNu}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                      Cục Mệnh
                    </span>
                    <span className="text-sm font-serif font-bold text-parchment block">
                      {result.metadata.cucDetail}
                    </span>
                    <span className="text-[10px] text-stone block truncate font-mono">
                      {menhCuc.title.split('—')[0]}
                    </span>
                  </div>

                  <div className="space-y-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">
                        Mệnh & Thân Cư
                      </span>
                      <span className="text-sm font-serif font-bold text-parchment block">
                        Mệnh {BRANCH_VN[result.facts.menhBranch]} • {thanCu.cung}
                      </span>
                      <span className="text-[10px] text-stone block font-mono">
                        Giờ {BRANCH_VN[result.facts.hourBranch]} ({canLuong.totalText})
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold underline block mt-1">
                      Chi tiết Thiên Bàn →
                    </span>
                  </div>
                </div>

                {/* View Mode Switcher */}
                <div className="flex flex-wrap items-center gap-2 border-b border-borderDark pb-3">
                  <button
                    type="button"
                    onClick={() => setViewMode('matrix')}
                    className={`px-3.5 py-1.5 text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                      viewMode === 'matrix'
                        ? 'bg-accentGold text-background font-bold border-accentGold'
                        : 'bg-surface text-stone border-borderDark hover:text-parchment'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Bản Đồ 12 Cung & Thiên Bàn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('fullReport')}
                    className={`px-3.5 py-1.5 text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                      viewMode === 'fullReport'
                        ? 'bg-accentGold text-background font-bold border-accentGold'
                        : 'bg-surface text-stone border-borderDark hover:text-parchment'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Báo Cáo Luận Giải Toàn Diện (14 Mục Chuyên Sâu)</span>
                  </button>
                </div>

                {viewMode === 'fullReport' ? (
                  <TuViFullReport
                    result={result}
                    onSelectPalace={(pKey) => setSelectedPalaceKey(pKey)}
                    onOpenThienBan={() => setShowThienBanModal(true)}
                  />
                ) : (
                  <>
                    {/* 12 Palaces Matrix */}
                    <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-stone border-b border-borderDark pb-2">
                    <span className="text-parchment font-semibold">Ma Trận 12 Cung Chức</span>
                    <span className="text-accentGold text-[11px]">Nhấp vào cung để mở luận giải</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {Object.keys(result.facts.palaces).map((pKey) => {
                      const palace = result.facts.palaces[pKey];
                      const isMenh = pKey === 'MENH';
                      const scoreData = calculatePalaceScore(pKey, palace);

                      return (
                        <div
                          key={pKey}
                          onClick={() => setSelectedPalaceKey(pKey)}
                          className={`p-3.5 border transition-colors cursor-pointer group flex flex-col justify-between ${
                            isMenh
                              ? 'bg-surface border-accentGold/80'
                              : palace.isThan
                              ? 'bg-surface border-stone/50 hover:border-accentGold'
                              : 'bg-surface border-borderDark hover:border-accentGold'
                          }`}
                        >
                          {/* Header of Palace Card */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between border-b border-borderDark pb-2">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-serif font-bold text-sm text-parchment group-hover:text-accentGold transition-colors">
                                    {PALACE_VN[pKey] ?? pKey}
                                  </span>
                                  <span className="text-[10px] font-mono text-accentGold font-bold">
                                    {scoreData.score}đ
                                  </span>
                                </div>
                                <span className="text-[11px] font-mono text-stone/80 block">
                                  {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]})
                                </span>
                                <div className="w-20 h-1 bg-background border border-borderDark/40 overflow-hidden my-1">
                                  <div
                                    className="h-full bg-accentGold transition-all duration-300"
                                    style={{ width: `${Math.min(100, Math.max(0, scoreData.score))}%` }}
                                  />
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-0.5">
                                {isMenh && (
                                  <span className="px-1 py-0.2 text-[9px] font-mono uppercase bg-accentGold text-background font-bold">
                                    MỆNH
                                  </span>
                                )}
                                {palace.isThan && (
                                  <span className="px-1 py-0.2 text-[9px] font-mono uppercase border border-borderLight text-parchment">
                                    THÂN
                                  </span>
                                )}
                                {palace.isTriet && (
                                  <span className="px-1 py-0.2 text-[9px] font-mono uppercase border border-cinnabar text-cinnabar">
                                    TRIỆT
                                  </span>
                                )}
                                {palace.isTuan && (
                                  <span className="px-1 py-0.2 text-[9px] font-mono uppercase border border-stone text-stone">
                                    TUẦN
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Stars List */}
                            <div className="space-y-1 min-h-[72px] py-1 text-xs">
                              {palace.stars.slice(0, 5).map((s: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-[11px]">
                                  <span
                                    className={
                                      s.isMain
                                        ? 'font-serif font-bold text-parchment'
                                        : s.code.startsWith('HOA_')
                                        ? 'font-medium text-cinnabar'
                                        : 'text-stone'
                                    }
                                  >
                                    {s.name}
                                  </span>
                                  <span className="text-[9px] font-mono text-stone/60">{s.element}</span>
                                </div>
                              ))}
                              {palace.stars.length > 5 && (
                                <div className="text-[10px] font-mono text-stone/60 pt-0.5">
                                  +{palace.stars.length - 5} sao phụ...
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="pt-2 border-t border-borderDark flex items-center justify-between text-[10px] font-mono text-stone">
                            <span>
                              Đ.Hạn: <strong className="text-parchment">{palace.daiHanStartAge}-{palace.daiHanEndAge}t</strong>
                            </span>
                            <span className="text-accentGold group-hover:underline">
                              Chi tiết →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Jump Bar */}
                <div className="p-4 bg-surface border border-borderDark space-y-2">
                  <span className="text-[11px] font-mono text-accentGold uppercase tracking-wider block">
                    Khảo Cứu Nhanh Các Cung Trọng Yếu:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-mono">
                    {[
                      { key: 'MENH', label: 'Cung Mệnh (Bản Thân & Cốt Cách)' },
                      { key: 'QUAN_LOC', label: 'Cung Quan Lộc (Sự Nghiệp & Công Danh)' },
                      { key: 'TAI_BACH', label: 'Cung Tài Bạch (Tiền Tài & Nguồn Lộc)' },
                      { key: 'PHU_THE', label: 'Cung Phu Thê (Tình Duyên & Bạn Đời)' },
                      { key: 'PHUC_DUC', label: 'Cung Phúc Đức (Tâm Hồn & May Mắn)' },
                      { key: 'DIEN_TRACH', label: 'Cung Điền Trạch (Nhà Cửa & Đất Đai)' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setSelectedPalaceKey(item.key)}
                        className="px-2.5 py-1 bg-background border border-borderDark hover:border-accentGold text-stone hover:text-parchment transition-colors text-[11px]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
            );
          })()}
        </div>
      </div>

      {/* POPUP / MODAL: PALACE INTERPRETATION */}
      {selectedPalaceKey && result?.facts?.palaces?.[selectedPalaceKey] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            {(() => {
              const palace = result.facts.palaces[selectedPalaceKey];
              const info = PALACE_INFO[selectedPalaceKey] ?? {
                meaning: 'Vận trình tương ứng của đời sống',
                beginnerGuide: 'Cung này phản ánh những khía cạnh quan trọng chi phối dòng chảy số mệnh của bạn.',
                coreAdvice: 'Hành động cẩn trọng và giữ vững sự chính trực.',
                challenges: 'Cần duy trì tinh thần tỉnh táo trước những biến động bên ngoài.',
              };
              const isMenh = selectedPalaceKey === 'MENH';
              const mainStars = palace.stars.filter((s: any) => s.isMain);
              const subStars = palace.stars.filter((s: any) => !s.isMain);

              return (
                <>
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-borderDark pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-accentGold font-bold">
                          Cung {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]})
                        </span>
                        {isMenh && (
                          <span className="px-1.5 py-0.5 bg-accentGold text-background text-[10px] font-bold">
                            MỆNH CHỦ
                          </span>
                        )}
                        {palace.isThan && (
                          <span className="px-1.5 py-0.5 border border-borderLight text-parchment text-[10px]">
                            THÂN CƯ
                          </span>
                        )}
                        {palace.isTriet && (
                          <span className="px-1.5 py-0.5 border border-cinnabar text-cinnabar text-[10px]">
                            TRIỆT
                          </span>
                        )}
                        {palace.isTuan && (
                          <span className="px-1.5 py-0.5 border border-stone text-stone text-[10px]">
                            TUẦN
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif text-parchment">
                        Cung {PALACE_VN[selectedPalaceKey]} — {info.meaning}
                      </h2>
                      {(() => {
                        const modalScore = calculatePalaceScore(selectedPalaceKey, palace);
                        return (
                          <div className="flex items-center gap-3 pt-1">
                            <span className="font-mono text-accentGold font-bold text-xs">
                              Đánh giá: {modalScore.score}/100 ({modalScore.rank})
                            </span>
                            <div className="w-24 sm:w-32 h-1.5 bg-background border border-borderDark overflow-hidden">
                              <div
                                className="h-full bg-accentGold transition-all duration-300"
                                style={{ width: `${Math.min(100, Math.max(0, modalScore.score))}%` }}
                              />
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <button
                      onClick={() => setSelectedPalaceKey(null)}
                      className="p-1.5 text-stone hover:text-parchment hover:bg-surfaceHover transition-colors border border-borderDark"
                      title="Đóng popup"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="space-y-5 text-xs">
                    {/* Beginner Explanation */}
                    <div className="p-4 bg-background border border-borderDark space-y-2">
                      <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Ý Nghĩa Cung {PALACE_VN[selectedPalaceKey]}:</span>
                      </div>
                      <p className="text-stone leading-relaxed text-xs">
                        {info.beginnerGuide}
                      </p>
                      <div className="pt-2 border-t border-borderDark flex flex-wrap gap-4 text-[11px] font-mono text-stone">
                        <span>Đại Hạn: {palace.daiHanStartAge} – {palace.daiHanEndAge} tuổi</span>
                        <span>•</span>
                        <span>Địa Chi: {BRANCH_VN[palace.branch]}</span>
                      </div>
                    </div>

                    {/* Main Stars Detail */}
                    {mainStars.length > 0 && (
                      <div className="space-y-3">
                        <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                          Các Sao Chính Tinh Tọa Thủ ({mainStars.length} sao):
                        </span>
                        <div className="space-y-3">
                          {mainStars.map((ms: any) => {
                            const starDetail = STAR_DETAILED_READINGS[ms.code.toUpperCase()] || {
                              title: `Sao ${ms.name}`,
                              nature: 'Chính diệu cai quản phẩm chất cốt lõi',
                              layman: 'Ảnh hưởng trực tiếp đến tư duy, cốt cách và phong thái hành sự trong đời sống.',
                              strengths: 'Giữ tâm đức trong sáng và phát huy điểm mạnh bẩm sinh.',
                              cautions: 'Tránh định kiến chủ quan và nôn nóng đốt cháy giai đoạn.',
                            };

                            return (
                              <div key={ms.code} className="p-4 bg-background border border-borderDark space-y-2">
                                <div className="flex items-center justify-between border-b border-borderDark pb-1.5">
                                  <span className="font-serif font-bold text-sm text-parchment">
                                    ★ {starDetail.title} ({ms.element})
                                  </span>
                                  <span className="text-[10px] font-mono text-accentGold">{starDetail.nature}</span>
                                </div>
                                <p className="text-stone leading-relaxed">
                                  {starDetail.layman}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-borderDark text-[11px]">
                                  <div className="text-stone">
                                    <strong className="text-parchment">Điểm mạnh:</strong> {starDetail.strengths}
                                  </div>
                                  <div className="text-stone">
                                    <strong className="text-cinnabar">Cần lưu tâm:</strong> {starDetail.cautions}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Sub Stars */}
                    {subStars.length > 0 && (
                      <div className="space-y-2">
                        <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                          Các Sao Phụ Tinh Hội Tụ:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {subStars.map((ss: any, idx: number) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 border text-[11px] font-mono ${
                                ss.code.startsWith('HOA_')
                                  ? 'border-cinnabar text-cinnabar'
                                  : 'border-borderDark text-stone bg-background'
                              }`}
                            >
                              {ss.name} ({ss.element})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Practical Life Advice */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3.5 bg-background border border-borderDark space-y-1">
                        <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                          Lời Khuyên Phát Triển
                        </span>
                        <p className="text-stone leading-relaxed text-[11px]">
                          {info.coreAdvice}
                        </p>
                      </div>
                      <div className="p-3.5 bg-background border border-borderDark space-y-1">
                        <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                          Điểm Cần Phòng Ngừa
                        </span>
                        <p className="text-stone leading-relaxed text-[11px]">
                          {info.challenges}
                        </p>
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedPalaceKey(null)}
                        className="px-5 py-2 bg-accentGold text-background font-mono text-xs uppercase tracking-wider font-bold hover:bg-parchment transition-colors border border-accentGold"
                      >
                        Đã Hiểu & Đóng Lại
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* POPUP / MODAL: THIÊN BÀN DETAIL */}
      {showThienBanModal && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider">
                  Cấu Trúc Khí Vận Tiên Thiên
                </span>
                <h2 className="text-xl font-serif text-parchment">Giải Nghĩa Thiên Bàn & Bát Tự</h2>
              </div>
              <button
                onClick={() => setShowThienBanModal(false)}
                className="p-1.5 text-stone hover:text-parchment hover:bg-surfaceHover transition-colors border border-borderDark"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  1. Cục Số ({result.metadata.cucDetail}):
                </span>
                <p className="text-stone leading-relaxed">
                  Trong Tử Vi, "Cục" biểu trưng cho môi trường và hoàn cảnh sống bao quanh. Tương quan giữa Cục và Bản Mệnh cho biết mức độ thuận lợi hay thách thức khi bạn dấn thân vào đời.
                </p>
              </div>

              <div className="p-3.5 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  2. Khí Chất Âm Dương ({result.facts.amDuongNamNu}):
                </span>
                <p className="text-stone leading-relaxed">
                  Xác định chiều tính của Đại hạn và mức độ hài hòa giữa tâm tính bên trong với các kỳ vọng xã hội.
                </p>
              </div>

              <div className="p-3.5 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  3. Mệnh Cư & Thân Cư:
                </span>
                <p className="text-stone leading-relaxed">
                  Cung Mệnh ngự tại {BRANCH_VN[result.facts.menhBranch]} chi phối bản tính bẩm sinh và tiền vận; Cung Thân ngự tại {BRANCH_VN[result.facts.thanBranch]} thể hiện nơi bạn gửi gắm khát vọng và sự chuyển biến tính cách khi trưởng thành.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowThienBanModal(false)}
                  className="px-5 py-2 bg-accentGold text-background font-mono text-xs uppercase tracking-wider font-bold hover:bg-parchment transition-colors border border-accentGold"
                >
                  Đã Rõ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
