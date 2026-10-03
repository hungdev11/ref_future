'use client';

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Compass,
  Moon,
  Hash,
  BookOpen,
  X,
  Info,
  BarChart3,
  Scale,
  Zap,
} from 'lucide-react';

export default function ComprehensiveReadingPage() {
  const [fullName, setFullName] = useState('Nguyễn Gia Huy');
  const [birthDate, setBirthDate] = useState('1990-07-25');
  const [birthTime, setBirthTime] = useState('08:30:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [latitude, setLatitude] = useState(21.0285);
  const [longitude, setLongitude] = useState(105.8542);
  const [timezoneOffset, setTimezoneOffset] = useState(420);

  const [loading, setLoading] = useState(false);
  const [readingResult, setReadingResult] = useState<any>(null);
  const [calcFacts, setCalcFacts] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Section popup modal state
  const [activeSectionModal, setActiveSectionModal] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setReadingResult(null);

    try {
      // 1. Run Western Astrology
      const astroRes = await fetch('/api/astrology/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthDate,
          birthTime: isTimeUnknown ? undefined : birthTime,
          timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
          latitude: isTimeUnknown ? undefined : Number(latitude),
          longitude: isTimeUnknown ? undefined : Number(longitude),
          timezoneOffsetMinutes: Number(timezoneOffset),
        }),
      }).then((r) => r.json());

      if (astroRes.error) throw new Error(`Chiêm tinh: ${astroRes.error}`);

      // 2. Run Numerology
      const numRes = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          birthDate,
        }),
      }).then((r) => r.json());

      if (numRes.error) throw new Error(`Thần số học: ${numRes.error}`);

      // 3. Run Tử Vi (if birth time known)
      let tuviRes: any = null;
      const degradationWarnings: string[] = [];
      if (!isTimeUnknown) {
        tuviRes = await fetch('/api/tuvi/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            solarDate: birthDate,
            birthTime,
            gender,
            timezoneOffsetMinutes: Number(timezoneOffset),
          }),
        }).then((r) => r.json());
      } else {
        degradationWarnings.push(
          'Thiếu giờ sinh chính xác: Cung Mệnh và 12 cung Tử Vi được lược bỏ để đảm bảo độ tin cậy tuyệt đối.'
        );
      }

      // 4. Run Tarot Draw
      const tarotSeed = `seed_${fullName}_${birthDate}`;
      const tarotRes = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadCode: 'SPREAD_1_CARD',
          seed: tarotSeed,
        }),
      }).then((r) => r.json());

      const drawnCard = tarotRes.facts?.positions?.[0];
      const cardName = drawnCard?.card?.name ?? 'The Fool';
      const cardOrientation = drawnCard?.isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)';

      // 5. Aggregate Dot-Notated Facts
      const aggregatedFacts: Record<string, any> = {
        fullName,
        userName: fullName,
        birthDate,
        birthTime: isTimeUnknown ? 'Chưa xác định' : birthTime,
        genderText: gender === 'FEMALE' ? 'Nữ' : 'Nam',
        ...(astroRes.dotNotatedFacts ?? {}),
        ...(numRes.dotNotatedFacts ?? {}),
        ...(tuviRes?.dotNotatedFacts ?? {}),
        ...(tarotRes?.dotNotatedFacts ?? {}),
        'tarot.spread.position_1.card_name': cardName,
        'tarot.spread.position_1.orientation': cardOrientation,
      };

      setCalcFacts({
        astrology: astroRes,
        numerology: numRes,
        tuvi: tuviRes,
        tarot: tarotRes,
        aggregatedFacts,
      });

      // Tự động suy luận độ sâu phù hợp nhất dựa trên mức độ đầy đủ của thông tin
      const inferredDepth = isTimeUnknown
        ? 'MEDIUM'
        : Boolean(latitude && longitude && birthTime)
        ? 'DEEP'
        : 'DETAILED';

      // 6. Generate Reading via Interpretation Engine
      const readingRes = await fetch('/api/readings/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          readingType: 'COMPREHENSIVE_READING',
          dotNotatedFacts: aggregatedFacts,
          inputSnapshot: {
            fullName,
            birthDate,
            birthTime: isTimeUnknown ? null : birthTime,
            gender,
            isTimeUnknown,
          },
          depth: inferredDepth,
          isDegraded: isTimeUnknown || astroRes.isDegraded,
          degradationWarnings: [
            ...(astroRes.degradationReasons ?? []),
            ...degradationWarnings,
          ],
        }),
      }).then((r) => r.json());

      if (readingRes.error) throw new Error(`Luận giải: ${readingRes.error}`);
      setReadingResult(readingRes);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accentGold font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Luận Giải Vận Mệnh Cá Nhân Hóa Đa Phương Pháp</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Báo Cáo Tổng Hợp Vận Mệnh Toàn Diện</h1>
        <p className="text-sm text-gray-400 max-w-3xl">
          Tổng hợp tinh hoa 4 môn phái: Chiêm Tinh Tây Phương, Tử Vi Đẩu Số, Thần Số Học và Tarot.
          Mỗi thông điệp được cá nhân hóa riêng biệt cho lá số của bạn với ngôn từ mạch lạc, dễ hiểu và thực tế.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Họ và Tên Đầy Đủ</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh (Dương Lịch)</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Giới Tính</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-borderDark/60">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-gray-300">Giờ Sinh</label>
                <label className="flex items-center gap-1.5 text-[11px] text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTimeUnknown}
                    onChange={(e) => setIsTimeUnknown(e.target.checked)}
                    className="rounded border-borderDark text-accentGold focus:ring-accentGold"
                  />
                  <span>Không rõ giờ sinh</span>
                </label>
              </div>
              <input
                type="time"
                step="1"
                disabled={isTimeUnknown}
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold disabled:opacity-40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Tọa Độ Địa Lý (Vĩ độ, Kinh độ)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="any"
                  disabled={isTimeUnknown}
                  value={latitude}
                  onChange={(e) => setLatitude(Number(e.target.value))}
                  placeholder="Vĩ độ"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold disabled:opacity-40"
                />
                <input
                  type="number"
                  step="any"
                  disabled={isTimeUnknown}
                  value={longitude}
                  onChange={(e) => setLongitude(Number(e.target.value))}
                  placeholder="Kinh độ"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold disabled:opacity-40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Múi Giờ</label>
              <input
                type="number"
                value={timezoneOffset}
                onChange={(e) => setTimezoneOffset(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
              <span className="text-[11px] text-gray-500">420 phút = GMT+7</span>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-accentGold via-amber-400 to-amber-600 text-background font-bold text-sm shadow-xl shadow-accentGold/20 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Đang khởi tạo báo cáo đa hệ thống...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Xem Luận Giải Chi Tiết Cho Tôi
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Reading Output Container */}
      {readingResult && (
        <div className="space-y-8 animate-fadeIn">
          {/* Degraded Alert Banner */}
          {readingResult.isDegraded && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                Lưu ý: Báo cáo vận hành theo chế độ bảo vệ dữ liệu (Không có giờ sinh)
              </div>
              <p className="text-amber-300/90 leading-relaxed">
                Hệ thống chỉ tổng hợp các yếu tố ngày sinh độc lập (Hành tinh, Thần số học và Bài Tarot). Cung Mọc và Lá số Tử Vi được ẩn đi để không tạo ra các luận giải sai lệch.
              </p>
            </div>
          )}

          {/* Core Profile Snapshot Pill */}
          {calcFacts && (
            <div className="p-5 rounded-2xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Mặt Trời: <strong>{calcFacts.astrology?.facts?.bodies?.SUN?.sign ?? calcFacts.astrology?.facts?.bodies?.sun?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Mặt Trăng: <strong>{calcFacts.astrology?.facts?.bodies?.MOON?.sign ?? calcFacts.astrology?.facts?.bodies?.moon?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Số Chủ Đạo: <strong>{calcFacts.numerology?.facts?.core?.LIFE_PATH?.value ?? calcFacts.numerology?.facts?.core?.life_path?.value ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lá Bài Duyên Khởi: <strong>{calcFacts.tarot?.facts?.positions?.[0]?.card?.name ?? '—'}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cá nhân hóa chuẩn xác</span>
              </div>
            </div>
          )}

          {/* Trait Profile Visualizer (6 Domains) */}
          {readingResult.traitScores && readingResult.traitScores.length > 0 && (
            <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
              <div className="flex items-center justify-between border-b border-borderDark/60 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <BarChart3 className="w-5 h-5 text-accentGold" />
                  <span>Biểu Đồ Năng Lượng & Thiên Hướng Tính Cách Nổi Bật</span>
                </div>
                <span className="text-xs text-gray-400">
                  Điểm số tổng hợp từ lá số thực tế của bạn
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readingResult.traitScores.slice(0, 9).map((ts: any) => {
                  const pct = Math.round(ts.normalizedScore * 100);
                  const isHigh = pct >= 65;
                  const isLow = pct <= 35;

                  return (
                    <div
                      key={ts.trait}
                      className="p-3.5 rounded-xl bg-background/60 border border-borderDark/60 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-200">{ts.trait}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isHigh
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : isLow
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'bg-surface text-gray-300 border border-borderDark'
                          }`}
                        >
                          {ts.level}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-surface border border-borderDark overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHigh
                              ? 'bg-gradient-to-r from-amber-500 to-accentGold'
                              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-400">
                        <span className="capitalize">Phương diện: {ts.domain}</span>
                        <span className="font-mono font-semibold text-white">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Syntheses / Inner Paradoxes */}
          {readingResult.activeSyntheses && readingResult.activeSyntheses.length > 0 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 via-surface to-surface border border-indigo-500/30 space-y-4">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-base">
                <Scale className="w-5 h-5 text-indigo-400" />
                <span>Nghịch Lý Nội Tâm & Chìa Khóa Cân Bằng Của Riêng Bạn</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Những nét tính cách tưởng chừng đối lập song song tồn tại trong con người bạn. Thấu hiểu điều này giúp bạn làm chủ cảm xúc và đưa ra quyết định sáng suốt hơn.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {readingResult.activeSyntheses.map((syn: any) => (
                  <div
                    key={syn.contradictionId}
                    className="p-4 rounded-xl bg-background/80 border border-indigo-500/30 space-y-2 text-xs"
                  >
                    <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{syn.synthesisTitle}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      {syn.synthesisDescription}
                    </p>
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] text-emerald-200">
                      <strong>💡 Lời khuyên chuyển hóa:</strong> {syn.advice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rendered Reading Sections */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-accentGold" />
                Các Mục Luận Giải Toàn Diện
              </h2>
              <span className="text-xs text-gray-400">
                Nhấn vào từng mục bên dưới để đọc toàn văn luận giải
              </span>
            </div>

            {readingResult.sections.length === 0 ? (
              <div className="p-8 rounded-2xl bg-surface text-center space-y-2 text-gray-400">
                <Info className="w-8 h-8 mx-auto text-gray-500" />
                <p>Không có nội dung luận giải phù hợp với thông tin đã nhập.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {readingResult.sections.map((section: any) => (
                  <div
                    key={`${section.sectionOrder}-${section.sourceRuleCode}`}
                    onClick={() => setActiveSectionModal(section)}
                    className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3 hover:border-accentGold/60 transition-all cursor-pointer hover:scale-[1.01] shadow-lg group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-borderDark/60 pb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-accentGold/10 border border-accentGold/30 text-accentGold text-[11px] font-bold uppercase tracking-wider">
                          {section.domain}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          Phần #{section.sectionOrder}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-accentGold transition-colors">
                        {section.title}
                      </h3>

                      {/* Outside Card: Clean, concise 1-2 sentence preview only */}
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {section.laymanSummary ?? section.renderedText.split('.')[0] + '.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-borderDark/40 flex items-center justify-between">
                      <span className="text-xs text-accentGold font-semibold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                        <Sparkles className="w-3.5 h-3.5" />
                        Đọc toàn bộ luận giải chi tiết →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* POPUP / MODAL: SECTION DETAILED INTERPRETATION */}
      {activeSectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-accentGold/50 shadow-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-accentGold/10 border border-accentGold/30 text-accentGold text-xs font-bold uppercase">
                  {activeSectionModal.domain}
                </span>
                <h2 className="text-lg md:text-xl font-extrabold text-white">
                  {activeSectionModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveSectionModal(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              {/* Full Personalized Narrative Text (NO duplicate layman box here!) */}
              <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line space-y-3">
                {activeSectionModal.renderedText}
              </div>

              {/* Actionable Advice (Practical takeaway for layman) */}
              {activeSectionModal.actionableAdvice && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lời Khuyên Thực Tiễn Dành Cho Bạn</span>
                  </div>
                  <p className="text-emerald-100 leading-relaxed pl-5">{activeSectionModal.actionableAdvice}</p>
                </div>
              )}

              <div className="pt-2 flex justify-end border-t border-borderDark/60">
                <button
                  type="button"
                  onClick={() => setActiveSectionModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-accentGold text-background font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Đã Hiểu & Đóng Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
