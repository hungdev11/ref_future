'use client';

import React, { useState } from 'react';
import { Compass, AlertTriangle, ShieldCheck, ChevronRight, CheckCircle2, Info, RefreshCw } from 'lucide-react';

export default function AstrologyPage() {
  const [birthDate, setBirthDate] = useState('1990-07-25');
  const [birthTime, setBirthTime] = useState('08:30:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [latitude, setLatitude] = useState(21.0285);
  const [longitude, setLongitude] = useState(105.8542);
  const [timezoneOffset, setTimezoneOffset] = useState(420);
  const [houseSystem, setHouseSystem] = useState('PLACIDUS');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        birthDate,
        birthTime: isTimeUnknown ? undefined : birthTime,
        timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
        latitude: isTimeUnknown ? undefined : Number(latitude),
        longitude: isTimeUnknown ? undefined : Number(longitude),
        timezoneOffsetMinutes: Number(timezoneOffset),
        houseSystem,
      };

      const res = await fetch('/api/astrology/chart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Calculation failed');
      setResult(data);
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
        <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
          <Compass className="w-4 h-4" />
          <span>Western Astrology Engine (VSOP87 / ELP2000)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Lập Lá Số Chiêm Tinh Học Tây Phương</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Tính toán tọa độ hành tinh chính xác đến từng cung vị, đỉnh cung nhà và các góc chiếu. Tự động chuyển đổi sang chế độ thoái hóa (Degraded Mode) an toàn nếu thiếu giờ sinh.
        </p>
      </div>

      {/* Main Grid: Form + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6 h-fit">
          <form onSubmit={handleCalculate} className="space-y-4">
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

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="unknownTime"
                checked={isTimeUnknown}
                onChange={(e) => setIsTimeUnknown(e.target.checked)}
                className="rounded border-borderDark text-accentGold focus:ring-accentGold"
              />
              <label htmlFor="unknownTime" className="text-xs text-gray-400 cursor-pointer select-none">
                Chưa rõ giờ sinh chính xác (Degraded Mode)
              </label>
            </div>

            {!isTimeUnknown && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Giờ Sinh (Giờ : Phút : Giây)</label>
                  <input
                    type="time"
                    step="1"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    required={!isTimeUnknown}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Vĩ Độ (Latitude)</label>
                    <input
                      type="number"
                      step="any"
                      value={latitude}
                      onChange={(e) => setLatitude(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Kinh Độ (Longitude)</label>
                    <input
                      type="number"
                      step="any"
                      value={longitude}
                      onChange={(e) => setLongitude(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Hệ Thống Nhà (House System)</label>
                  <select
                    value={houseSystem}
                    onChange={(e) => setHouseSystem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
                  >
                    <option value="PLACIDUS">Placidus (Mặc định)</option>
                    <option value="WHOLE_SIGN">Whole Sign</option>
                    <option value="EQUAL">Equal</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Múi Giờ (Phút so với UTC)</label>
              <input
                type="number"
                value={timezoneOffset}
                onChange={(e) => setTimezoneOffset(Number(e.target.value))}
                placeholder="420 cho UTC+7"
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
              <span className="text-[11px] text-gray-500">420 phút = UTC+7 (Việt Nam)</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accentGold to-amber-600 text-background font-bold text-sm shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Đang tính toán thiên văn...
                </>
              ) : (
                'Tính Toán Lá Số Chiêm Tinh'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column: Chart Results */}
        <div className="lg:col-span-2 space-y-6">
          {!result && !loading && (
            <div className="p-12 rounded-2xl bg-surface/40 border border-borderDark/60 text-center space-y-3">
              <Compass className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-gray-400 font-medium">Chưa có kết quả</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Nhập thông tin ngày sinh và tọa độ để khởi chạy engine tính toán thiên văn VSOP87.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              {/* Degraded Alert if applicable */}
              {result.isDegraded && (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    Chế độ thoái hóa an toàn (Degraded Mode) được kích hoạt
                  </div>
                  <ul className="list-disc list-inside text-amber-300/80 space-y-0.5 pl-1">
                    {result.degradationReasons?.map((r: string, idx: number) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metadata strip */}
              <div className="p-4 rounded-xl bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300 font-mono">
                    Engine: WesternAstrology v{result.engineVersion} • Config: {result.configVersion}
                  </span>
                </div>
                <div className="text-gray-400 font-mono">
                  SHA-256: <span className="text-accentGold">{result.inputHash?.slice(0, 12)}...</span>
                </div>
              </div>

              {/* Planetary Positions */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>Tọa Độ Hành Tinh & Thiên Thể</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    ({Object.keys(result.facts.bodies).length} thiên thể)
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Thiên Thể</th>
                        <th className="py-2.5 px-3">Cung Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Độ Cung</th>
                        <th className="py-2.5 px-3">Kinh Độ Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Nhà</th>
                        <th className="py-2.5 px-3">Nghịch Hành</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {Object.entries(result.facts.bodies).map(([bodyName, pos]: [string, any]) => (
                        <tr key={bodyName} className="hover:bg-surfaceHover/50">
                          <td className="py-2 px-3 font-semibold text-white capitalize">{bodyName}</td>
                          <td className="py-2 px-3 text-amber-300 font-medium">{pos.sign}</td>
                          <td className="py-2 px-3 text-gray-300">{pos.signDegree.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-400">{pos.longitude.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-300">
                            {pos.houseNumber ? `Nhà ${pos.houseNumber}` : '—'}
                          </td>
                          <td className="py-2 px-3">
                            {pos.isRetrograde ? (
                              <span className="px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-500/30 text-[10px]">
                                Rx
                              </span>
                            ) : (
                              <span className="text-gray-500">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Houses (if available) */}
              {result.facts.houses && (
                <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Đỉnh 12 Cung Nhà ({result.metadata.houseSystem})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {result.facts.houses.map((h: any) => (
                      <div key={h.houseNumber} className="p-2.5 rounded-xl bg-background/60 border border-borderDark/60 text-xs">
                        <div className="text-gray-400 font-semibold">Nhà {h.houseNumber}</div>
                        <div className="text-amber-300 font-medium">{h.sign}</div>
                        <div className="text-[11px] text-gray-500">{h.cuspLongitude.toFixed(2)}°</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Major Aspects */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Góc Chiếu Chính (Major Aspects)</span>
                  <span className="text-[11px] font-normal text-gray-400">
                    {result.facts.aspects.length} góc chiếu
                  </span>
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Hành Tinh A</th>
                        <th className="py-2.5 px-3">Góc Chiếu</th>
                        <th className="py-2.5 px-3">Hành Tinh B</th>
                        <th className="py-2.5 px-3">Orb</th>
                        <th className="py-2.5 px-3">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {result.facts.aspects.map((asp: any, idx: number) => (
                        <tr key={idx} className="hover:bg-surfaceHover/50">
                          <td className="py-2 px-3 font-semibold text-white capitalize">{asp.bodyA}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-accentGold font-medium">
                              {asp.aspectType}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-semibold text-white capitalize">{asp.bodyB}</td>
                          <td className="py-2 px-3 text-gray-300">{asp.orb.toFixed(2)}°</td>
                          <td className="py-2 px-3 text-gray-400">
                            {asp.isApplying ? 'Applying' : 'Separating'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
