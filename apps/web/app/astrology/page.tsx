'use client';

import React, { useState } from 'react';
import { Compass, AlertTriangle, ShieldCheck, ChevronRight, CheckCircle2, Info, RefreshCw, Sparkles, BookOpen, Moon } from 'lucide-react';

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

              {/* Luận Giải Chi Tiết Bản Đồ Sao Dành Cho Độc Giả */}
              <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
                <div className="flex items-center justify-between border-b border-borderDark pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accentGold" />
                    <h3 className="text-lg font-bold text-white">Luận Giải Chi Tiết Bản Mệnh & Năng Lượng Cốt Lõi</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accentGold/10 border border-accentGold/30 text-accentGold font-medium">
                    Hệ Thống Tropical Ephemeris
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Sun Sign Analysis */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                        <span>☀️ Mặt Trời tại {result.facts.bodies.sun.sign} ({result.facts.bodies.sun.longitude.toFixed(2)}°): Bản Sắc Ý Thức & Ngọn Lửa Khát Vọng</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">Sun Sign</span>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed">
                      Mặt Trời là vị tinh tú trung tâm, đại diện cho bản ngã ý thức, ý chí tự chủ và sứ mệnh khẳng định cái tôi chân thực của bạn. Tại vị trí {result.facts.bodies.sun.sign}, nguồn năng lượng của bạn luôn hướng đến việc để lại dấu ấn riêng biệt, khát khao được cống hiến và tỏa sáng theo cách quang minh chính đại nhất.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn (Dễ Hiểu):</span>
                      <p className="text-gray-200 leading-relaxed">
                        Bạn có lòng tự trọng cao, tính cách hào sảng, làm việc gì cũng muốn làm đến nơi đến chốn và luôn mong muốn được mọi người xung quanh công nhận bằng năng lực thực chất.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1">
                      <span className="font-semibold text-indigo-300 block">🔍 Cơ Chế Vận Hành (Nguyên Tố & Phẩm Chất):</span>
                      <p className="text-gray-300 leading-relaxed">
                        Theo đúc kết của nhà chiêm tinh học kinh điển Robert Hand: Mặt Trời phản ánh nguồn sinh lực tự nhiên. Để năng lượng này phát triển lành mạnh, bạn cần một môi trường làm việc khuyến khích tính sáng tạo và sự tự chủ.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
                      <span className="font-semibold text-emerald-300 block">🎯 Lời Khuyên Hành Động Thực Tiễn:</span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        Học cách lắng nghe ý kiến đóng góp từ người khác với tâm thế khiêm nhường; sự đồng cảm và bao dung sẽ biến bạn thành một người dẫn đường thực thụ được muôn người kính trọng.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Planets in Signs (Robert Hand)</strong> & <strong className="text-gray-200">The Inner Sky (Steven Forrest)</strong></span>
                    </div>
                  </div>

                  {/* Moon Sign Analysis */}
                  <div className="p-5 rounded-xl bg-background/80 border border-borderDark space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                        <span>🌙 Mặt Trăng tại {result.facts.bodies.moon.sign}: Thế Giới Cảm Xúc Ẩn Kín & Nhu Cầu An Toàn Nội Tâm</span>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">Moon Sign</span>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed">
                      Mặt Trăng cai quản tiềm thức, trực giác và cách bạn phản ứng theo bản năng khi gặp áp lực. Dấu hiệu {result.facts.bodies.moon.sign} cho thấy nội tâm bạn là người giàu cảm xúc, có giác quan thứ 6 nhạy bén và cần một không gian bình yên để tái nạp năng lượng sau những xô bồ của cuộc sống.
                    </p>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                      <span className="font-semibold text-amber-300 block">💡 Ý Nghĩa Thực Tế Cho Bạn:</span>
                      <p className="text-gray-200 leading-relaxed">
                        Bạn rất quan tâm đến cảm xúc của những người thân cận. Hãy cho phép bản thân được bộc lộ sự yếu lòng khi cần, đừng gồng mình chịu đựng một mình.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surfaceHover border border-borderDark text-[11px] text-gray-400">
                      <BookOpen className="w-3.5 h-3.5 text-accentGold shrink-0" />
                      <span>Nguồn tham chiếu kinh điển: <strong className="text-gray-200">Planets in Signs - Luận Giải Vị Trí Mặt Trăng</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Guide for Users */}
      <section className="p-6 rounded-2xl bg-surface/70 border border-borderDark space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-400" />
          <span>Cẩm Nang Giải Mã Các Thành Tố Trong Lá Số Chiêm Tinh</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Mặt Trời, Mặt Trăng & Điểm Mọc</div>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Mặt Trời (Sun):</strong> Đại diện cho bản ngã cốt lõi, mục tiêu lý tưởng và nguồn sinh lực sống.
              <br />
              <strong className="text-white">Mặt Trăng (Moon):</strong> Phản ánh nhu cầu tiềm thức, cảm xúc sâu kín và thói quen bản năng.
              <br />
              <strong className="text-white">Điểm Mọc (Ascendant):</strong> Chiếc lăng kính qua đó bạn tiếp cận thế giới bên ngoài và ấn tượng đầu tiên bạn để lại cho người khác.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Hệ Thống 12 Cung Nhà (Houses)</div>
            <p className="text-gray-400 leading-relaxed">
              Mỗi cung nhà biểu thị một sân khấu cụ thể trong đời sống: Nhà 1 (Bản thân), Nhà 2 (Tài sản), Nhà 4 (Gia đình), Nhà 7 (Hôn nhân & Đối tác), Nhà 10 (Sự nghiệp & Danh vọng). Vị trí các hành tinh rơi vào nhà nào sẽ dồn năng lượng hoạt động vào lĩnh vực đó.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-background/50 border border-borderDark/40 space-y-1.5">
            <div className="font-bold text-amber-300 text-sm">Ý Nghĩa Các Góc Chiếu (Aspects)</div>
            <p className="text-gray-400 leading-relaxed">
              <strong className="text-white">Góc Hòa Hợp (Trine 120°, Sextile 60°):</strong> Dòng năng lượng trôi chảy thuận lợi, mang lại tài năng tự nhiên dễ phát huy.
              <br />
              <strong className="text-white">Góc Thử Thách (Square 90°, Opposition 180°):</strong> Tạo áp lực thúc đẩy sự trưởng thành và bài học rèn giũa ý chí kiên định.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
