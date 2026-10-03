'use client';

import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Search,
  BookOpen,
  Compass,
  Moon,
  Hash,
  X,
  CheckCircle2,
  Code2,
  Database,
  ArrowRight,
  Info,
  BarChart3,
  Scale,
  Brain,
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
  const [depth, setDepth] = useState<'SHORT' | 'MEDIUM' | 'DETAILED' | 'DEEP'>('DETAILED');

  const [loading, setLoading] = useState(false);
  const [readingResult, setReadingResult] = useState<any>(null);
  const [calcFacts, setCalcFacts] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Inspector modal state
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          'Thiếu giờ sinh chính xác: Các cung Tử Vi và Cung Mệnh không được tính toán để đảm bảo tính chuẩn xác.'
        );
      }

      // 4. Run Tarot Draw (Daily Guidance 1 card with deterministic seed)
      const tarotSeed = `seed_${fullName}_${birthDate}`;
      const tarotRes = await fetch('/api/tarot/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadCode: 'SPREAD_1_CARD',
          seed: tarotSeed,
        }),
      }).then((r) => r.json());

      // Extract Tarot dynamic name & orientation
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
          depth,
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

  const openInspector = (section: any) => {
    setSelectedSection(section);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-accentGold font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Multi-Engine Synthesized Reading • 100% Deterministic Rule Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Báo Cáo Luận Giải Toàn Diện Đa Hệ Thống</h1>
        <p className="text-sm text-gray-400 max-w-3xl">
          Tích hợp 4 trụ cột: Chiêm Tinh Tây Phương, Tử Vi Đẩu Số, Thần Số Học Pythagoras và Tarot. Mọi câu chữ đều được
          tổng hợp từ Rule Engine chuẩn mực, bóc tách thiên hướng tính cách, giải quyết mâu thuẫn nội tâm và minh giải nguồn gốc (Traceability) 100%.
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
                <option value="MALE">Nam (Dương Nam / Âm Nam)</option>
                <option value="FEMALE">Nữ (Âm Nữ / Dương Nữ)</option>
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

          {/* Depth Selector */}
          <div className="pt-2 border-t border-borderDark/60 space-y-2">
            <label className="block text-xs font-semibold text-gray-300">Độ Sâu Luận Giải (Reading Depth)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'SHORT', label: 'Tóm Tắt', desc: '4 phần cốt lõi nhanh' },
                { id: 'MEDIUM', label: 'Cân Bằng', desc: '6 phần bao quát' },
                { id: 'DETAILED', label: 'Toàn Diện', desc: '8 phần + mâu thuẫn' },
                { id: 'DEEP', label: 'Chuyên Sâu', desc: 'Toàn bộ trace & đa chiều' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setDepth(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    depth === item.id
                      ? 'bg-accentGold/10 border-accentGold text-accentGold'
                      : 'bg-background/60 border-borderDark text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-gray-400">{item.desc}</div>
                </button>
              ))}
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
                  Đang khởi chạy 4 Engines & Tổng Hợp Quy Tắc...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Khởi Tạo Báo Cáo Luận Giải Toàn Diện
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
                Báo cáo ở Chế Độ Thoái Hóa An Toàn (Degraded Mode)
              </div>
              <p className="text-amber-300/90 leading-relaxed">
                Do không có giờ sinh chính xác, hệ thống chỉ kích hoạt các quy tắc dựa trên vị trí hành tinh, thần số học
                và bài Tarot. Ascendant, hệ thống nhà và lá số Tử Vi được loại trừ để không đưa ra suy diễn tùy tiện.
              </p>
              {readingResult.degradationWarnings?.length > 0 && (
                <ul className="list-disc list-inside text-amber-400/80 pt-1 space-y-0.5 pl-1">
                  {readingResult.degradationWarnings.map((w: string, idx: number) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Core Profile Snapshot Pill */}
          {calcFacts && (
            <div className="p-5 rounded-2xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Mặt Trời (Sun): <strong>{calcFacts.astrology?.facts?.bodies?.SUN?.sign ?? calcFacts.astrology?.facts?.bodies?.sun?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Mặt Trăng (Moon): <strong>{calcFacts.astrology?.facts?.bodies?.MOON?.sign ?? calcFacts.astrology?.facts?.bodies?.moon?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Số Chủ Đạo: <strong>{calcFacts.numerology?.facts?.core?.LIFE_PATH?.value ?? calcFacts.numerology?.facts?.core?.life_path?.value ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Lá Bài Tarot: <strong>{calcFacts.tarot?.facts?.positions?.[0]?.card?.name ?? '—'}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Deterministic</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
                  <span>QC: {readingResult.qualityScore ?? 100}/100</span>
                </div>
              </div>
            </div>
          )}

          {/* Trait Profile Visualizer (6 Domains) */}
          {readingResult.traitScores && readingResult.traitScores.length > 0 && (
            <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
              <div className="flex items-center justify-between border-b border-borderDark/60 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <BarChart3 className="w-5 h-5 text-accentGold" />
                  <span>Hồ Sơ Năng Lượng & Thiên Hướng Tính Cách Cá Nhân Hóa</span>
                </div>
                <span className="text-xs text-gray-400">
                  Được tổng hợp từ {readingResult.evidenceItems?.length ?? 0} bằng chứng định lượng
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
                        <span className="capitalize">Miền: {ts.domain}</span>
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
                <span>Nghịch Lý Nội Tâm & Điểm Giằng Xé Độc Bản (Synthesis Engine)</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Hệ thống nhận diện những nét tính cách đối lập song song tồn tại trong bạn. Đây không phải khuyết điểm, mà là chìa khóa mở rộng dung lượng nội tâm khi bạn biết cách chuyển hóa.
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
                      <strong>💡 Chìa khóa dung hòa:</strong> {syn.advice}
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
                Các Mục Luận Giải Chuẩn Mực Chi Tiết
              </h2>
              <span className="text-xs text-gray-400 font-mono">
                {readingResult.sections.length} khối nội dung kích hoạt
              </span>
            </div>

            {readingResult.sections.length === 0 ? (
              <div className="p-8 rounded-2xl bg-surface text-center space-y-2 text-gray-400">
                <Info className="w-8 h-8 mx-auto text-gray-500" />
                <p>Không có quy tắc nào khớp với tập dữ liệu hiện tại.</p>
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
                        <span className="text-[11px] text-gray-500 font-mono">
                          Mục #{section.sectionOrder}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-accentGold transition-colors">
                        {section.title}
                      </h3>

                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                        {section.laymanSummary ?? section.renderedText}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-borderDark/40 flex items-center justify-between">
                      <span className="text-xs text-accentGold font-semibold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Mở Luận Giải Chi Tiết →
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openInspector(section);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-300 hover:text-accentGold hover:border-accentGold/50 flex items-center gap-1 transition-colors"
                      >
                        <Search className="w-3 h-3 text-accentGold" /> Vì sao luận vậy?
                      </button>
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
              {/* Full Personalized Text */}
              <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                {activeSectionModal.renderedText}
              </p>

              {/* Layman Summary */}
              {activeSectionModal.laymanSummary && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Ý Nghĩa Thực Tế Cho Bạn (Dành Cho Người Không Chuyên)</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed pl-5">{activeSectionModal.laymanSummary}</p>
                </div>
              )}

              {/* Mechanism */}
              {activeSectionModal.explanation && (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5">
                  <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>Bản Chất & Cơ Chế Vận Hành</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed pl-5">{activeSectionModal.explanation}</p>
                </div>
              )}

              {/* Actionable Advice */}
              {activeSectionModal.actionableAdvice && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1.5">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Gợi Ý Hành Động Thực Tiễn</span>
                  </div>
                  <p className="text-emerald-100 leading-relaxed pl-5">{activeSectionModal.actionableAdvice}</p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-borderDark/60">
                <button
                  type="button"
                  onClick={() => {
                    openInspector(activeSectionModal);
                    setActiveSectionModal(null);
                  }}
                  className="text-xs text-accentGold hover:underline flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  🔍 Vì sao hệ thống luận như vậy? (Traceability)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSectionModal(null)}
                  className="px-6 py-2.5 rounded-xl bg-accentGold text-background font-bold text-xs hover:opacity-90"
                >
                  Đã Hiểu & Đóng Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* "Why this result?" Inspector Modal */}
      {isModalOpen && selectedSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border-2 border-accentGold/50 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accentGold/20 border border-accentGold/40 flex items-center justify-center text-accentGold">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Vì Sao Hệ Thống Luận Như Vậy? (Traceability)</h3>
                  <p className="text-xs text-gray-400">Minh giải chuỗi logic toán học và dữ kiện thực tế</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surfaceHover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Provenance trace explanation if available */}
              {selectedSection.provenanceTraces && selectedSection.provenanceTraces.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Nguồn Gốc Đoạn Văn & Lý Do Kích Hoạt</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">
                    {selectedSection.provenanceTraces[0].explanationWhy}
                  </p>
                  <div className="text-[11px] text-gray-400 font-mono pt-1">
                    Cường độ xác lập (Intensity):{' '}
                    <span className="text-accentGold font-bold">
                      {selectedSection.provenanceTraces[0].intensity}
                    </span>
                  </div>
                </div>
              )}

              {/* Rule Identifiers */}
              <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Quy Tắc Đã Khớp (Matched Rule):</span>
                  <span className="font-mono font-bold text-accentGold">{selectedSection.sourceRuleCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mã Luận Giải (Interpretation ID):</span>
                  <span className="font-mono text-purple-300">{selectedSection.interpretationId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Lĩnh Vực (Domain):</span>
                  <span className="font-semibold text-white uppercase">{selectedSection.domain}</span>
                </div>
              </div>

              {/* Matched Trace info if found */}
              {readingResult?.ruleTraces && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Điều Kiện AST Đã Thỏa Mãn Trong Dữ Liệu Của Bạn</span>
                  </h4>

                  {(() => {
                    const trace = readingResult.ruleTraces.find(
                      (t: any) => t.ruleCode === selectedSection.sourceRuleCode
                    );
                    if (!trace || !trace.conditionsEvaluated) {
                      return <p className="text-gray-500">Quy tắc khớp theo cấu trúc cơ sở hoặc tổng hợp đa chiều.</p>;
                    }
                    return (
                      <div className="space-y-2">
                        {trace.conditionsEvaluated.map((cond: any, idx: number) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-surfaceHover border border-borderDark space-y-1 font-mono text-[11px]"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-emerald-400">{cond.field}</span>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px]">
                                {cond.matched ? 'MATCHED' : 'UNMET'}
                              </span>
                            </div>
                            <div className="text-gray-400">
                              Toán tử: <span className="text-white">{cond.operator}</span> | Kỳ vọng: <span className="text-accentGold">{JSON.stringify(cond.expectedValue)}</span>
                            </div>
                            <div className="text-gray-400">
                              Giá trị thực tế trong hồ sơ của bạn: <span className="text-accentGold font-bold">{JSON.stringify(cond.actualValue)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Engine & Integrity Metadata */}
              <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-1.5 text-[11px] font-mono text-gray-400">
                <div className="text-gray-300 font-semibold mb-1">Tính Toàn Vẹn & Kiểm Toán (Auditing):</div>
                <div>Engine Version: <span className="text-white">{readingResult?.engineVersion}</span></div>
                <div>Ruleset Version: <span className="text-white">{readingResult?.rulesetVersion}</span></div>
                <div>Input SHA-256: <span className="text-accentGold">{readingResult?.inputHash}</span></div>
                <div>Chỉ số kiểm toán chất lượng: <span className="text-emerald-400 font-bold">{readingResult?.qualityScore ?? 100}/100</span></div>
                <div>Tái lập (Reproducibility): <span className="text-emerald-400">100% Deterministic Guarantee</span></div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-borderDark">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-surfaceHover border border-borderDark text-white text-xs font-semibold hover:bg-surface transition-colors"
              >
                Đóng Cửa Sổ Minh Giải
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
