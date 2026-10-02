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

  // Inspector modal state
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <span>Multi-Engine Synthesized Reading • 100% Deterministic</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Báo Cáo Luận Giải Toàn Diện Đa Hệ Thống</h1>
        <p className="text-sm text-gray-400 max-w-3xl">
          Tích hợp 4 trụ cột: Chiêm Tinh Tây Phương, Tử Vi Đẩu Số, Thần Số Học Pythagoras và Tarot. Mọi câu chữ đều được
          kết xuất từ Rule Engine và Knowledge Base chuẩn mực với cơ chế minh giải nguồn gốc (Traceability) chi tiết.
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
                  <span>Sun: <strong>{calcFacts.astrology?.facts?.bodies?.sun?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                  <Moon className="w-3.5 h-3.5" />
                  <span>Moon: <strong>{calcFacts.astrology?.facts?.bodies?.moon?.sign ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Life Path: <strong>{calcFacts.numerology?.facts?.core?.life_path?.value ?? '—'}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Tarot: <strong>{calcFacts.tarot?.facts?.positions?.[0]?.card?.name ?? '—'}</strong></span>
                </div>
              </div>

              <div className="text-gray-400 text-xs font-mono">
                SHA-256: <span className="text-accentGold">{readingResult.inputHash?.slice(0, 10)}...</span>
              </div>
            </div>
          )}

          {/* Rendered Reading Sections */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-accentGold" />
                Các Mục Luận Giải Chuẩn Hóa
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
              <div className="grid grid-cols-1 gap-6">
                {readingResult.sections.map((section: any) => (
                  <div
                    key={`${section.sectionOrder}-${section.sourceRuleCode}`}
                    className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4 hover:border-accentGold/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderDark/60 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-accentGold/10 border border-accentGold/30 text-accentGold text-[11px] font-bold uppercase tracking-wider">
                          {section.domain}
                        </span>
                        <h3 className="text-base font-bold text-white">{section.title}</h3>
                      </div>

                      {/* "Why this result?" Button */}
                      <button
                        onClick={() => openInspector(section)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surfaceHover border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/40 text-xs font-medium transition-colors"
                      >
                        <Search className="w-3.5 h-3.5 text-purple-400" />
                        Tại sao có kết quả này?
                      </button>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {section.renderedText}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-borderDark/40">
                      <span>Rule: <code className="text-gray-400 font-mono">{section.sourceRuleCode}</code></span>
                      <span>Target: <code className="text-gray-400 font-mono">{section.interpretationId}</code></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* "Why this result?" Inspector Modal */}
      {isModalOpen && selectedSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface border border-purple-500/50 shadow-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Truy Xuất Nguồn Gốc Luận Giải (Traceability)</h3>
                  <p className="text-xs text-gray-400">Minh giải chuỗi logic toán học đằng sau kết quả</p>
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
                    <span>Điều Kiện AST Đã Thỏa Mãn</span>
                  </h4>

                  {(() => {
                    const trace = readingResult.ruleTraces.find(
                      (t: any) => t.ruleCode === selectedSection.sourceRuleCode
                    );
                    if (!trace || !trace.conditionsEvaluated) {
                      return <p className="text-gray-500">Quy tắc cơ sở khớp theo trọng số mặc định.</p>;
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
                              Toán tử: <span className="text-white">{cond.operator}</span> | Giá trị kỳ vọng: <span className="text-accentGold">{JSON.stringify(cond.expectedValue)}</span>
                            </div>
                            <div className="text-gray-500">
                              Giá trị thực tế trong lá số: <span className="text-purple-300">{JSON.stringify(cond.actualValue)}</span>
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
