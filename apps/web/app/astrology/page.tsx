'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  BookOpen,
  Sun,
  Moon,
  X,
  HelpCircle,
  Flame,
  Globe,
  Wind,
  Droplets,
  Layers,
  ArrowRight,
} from 'lucide-react';

import {
  ZODIAC_VN,
  ZODIAC_ELEMENT,
  PLANET_NAMES_VN,
  PLANET_BEGINNER_GUIDES,
  SUN_SIGN_INTERPRETATIONS,
  MOON_SIGN_INTERPRETATIONS,
  ZODIAC_GLYPHS,
  PLANET_GLYPHS,
  HOUSE_INTERPRETATIONS,
} from '@mystic/astrology-engine';
import { DateInput } from '@/components/DateInput';

function getClockCoordinates(cx: number, cy: number, r: number, clockHour: number) {
  const phi = (clockHour * 30 * Math.PI) / 180;
  return {
    x: cx + r * Math.sin(phi),
    y: cy - r * Math.cos(phi),
  };
}

function getHouseClockHours(houseNumber: number) {
  const startRaw = (10 - houseNumber) % 12;
  const startHour = startRaw <= 0 ? startRaw + 12 : startRaw;

  const endRaw = (9 - houseNumber) % 12;
  const endHour = endRaw <= 0 ? endRaw + 12 : endRaw;

  const midRaw = (9.5 - houseNumber) % 12;
  const midHour = midRaw <= 0 ? midRaw + 12 : midRaw;

  return { startHour, endHour, midHour };
}

function createSectorPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startHour: number,
  endHour: number
) {
  const p1 = getClockCoordinates(cx, cy, rOuter, startHour);
  const p2 = getClockCoordinates(cx, cy, rOuter, endHour);
  const p3 = getClockCoordinates(cx, cy, rInner, endHour);
  const p4 = getClockCoordinates(cx, cy, rInner, startHour);

  return `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${rOuter} ${rOuter} 0 0 0 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)} A ${rInner} ${rInner} 0 0 1 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)} Z`;
}

const VIETNAM_CITIES: { name: string; lat: number; lng: number }[] = [
  { name: 'Hà Nội', lat: 21.0285, lng: 105.8542 },
  { name: 'TP. Hồ Chí Minh', lat: 10.8231, lng: 106.6297 },
  { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022 },
  { name: 'Hải Phòng', lat: 20.8449, lng: 106.6881 },
  { name: 'Cần Thơ', lat: 10.0452, lng: 105.7469 },
  { name: 'Nha Trang', lat: 12.2388, lng: 109.1967 },
  { name: 'Huế', lat: 16.4637, lng: 107.5909 },
  { name: 'Đà Lạt', lat: 11.9404, lng: 108.4583 },
  { name: 'Khác (Nhập tọa độ thủ công)', lat: 0, lng: 0 },
];

export default function AstrologyPage() {
  const [birthDate, setBirthDate] = useState('1990-07-25');
  const [birthTime, setBirthTime] = useState('08:30:00');
  const [isTimeUnknown, setIsTimeUnknown] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Hà Nội');
  const [latitude, setLatitude] = useState(21.0285);
  const [longitude, setLongitude] = useState(105.8542);
  const [timezoneOffset, setTimezoneOffset] = useState(420);
  const [houseSystem, setHouseSystem] = useState('PLACIDUS');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Modal State for clicked Astrology Item
  const [selectedAstroItem, setSelectedAstroItem] = useState<{
    category: string;
    title: string;
    sign: string;
    degree?: number;
    house?: number;
    beginnerGuide: string;
    layman: string;
    mechanism?: string;
    advice: string;
  } | null>(null);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const city = VIETNAM_CITIES.find((c) => c.name === cityName);
    if (city && city.lat !== 0) {
      setLatitude(city.lat);
      setLongitude(city.lng);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedAstroItem(null);

    try {
      const payload: any = {
        birthDate,
        timeAccuracy: isTimeUnknown ? 'UNKNOWN' : 'EXACT',
        timezoneOffsetMinutes: Number(timezoneOffset),
      };

      if (!isTimeUnknown) {
        payload.birthTime = birthTime;
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
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sunSignKey = result?.facts?.bodies?.sun?.sign ?? result?.facts?.bodies?.SUN?.sign ?? '';
  const moonSignKey = result?.facts?.bodies?.moon?.sign ?? result?.facts?.bodies?.MOON?.sign ?? '';
  const ascendantSignKey = result?.facts?.ascendant?.sign ?? '';

  const sunInterp = SUN_SIGN_INTERPRETATIONS[sunSignKey] ?? {
    meaning: 'Năng lượng bản ngã theo vị trí Mặt Trời.',
    layman: 'Cá tính tự nhiên của bạn đang tỏa sáng theo phong cách riêng.',
    mechanism: 'Hệ thống Hoàng Đạo Nhiệt Đới (Tropical Zodiac).',
    advice: 'Phát huy thế mạnh bản thân và kiên định với lý tưởng.',
  };

  const moonInterp = MOON_SIGN_INTERPRETATIONS[moonSignKey] ?? {
    meaning: 'Thế giới cảm xúc nội tâm theo vị trí Mặt Trăng.',
    layman: 'Nội tâm của bạn phản ứng tự nhiên với các biến động cảm xúc.',
    advice: 'Lắng nghe cảm xúc của chính mình và duy trì lối sống lành mạnh.',
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">03</span>
          <span>/</span>
          <span>Chiêm Tinh Học Tây Phương</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ Sao Cá Nhân & Bánh Xe 12 Cung Nhà
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Tính toán tọa độ 10 thiên thể và 12 cung địa bàn theo hệ tọa độ Hoàng Đạo. 
          <strong> Nhấn vào Mặt Trời, Mặt Trăng, Cung Mọc hay bất kỳ hành tinh nào để mở bảng giải nghĩa chi tiết, dễ hiểu nhất cho bạn.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2">
            Nhập Dữ Liệu Bản Đồ Sao
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={birthDate}
                onChange={setBirthDate}
                required
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="unknownTime"
                checked={isTimeUnknown}
                onChange={(e) => setIsTimeUnknown(e.target.checked)}
                className="rounded-sm border-borderDark text-accentGold focus:ring-accentGold"
              />
              <label htmlFor="unknownTime" className="text-xs font-mono text-stone cursor-pointer select-none">
                Chưa rõ giờ sinh chính xác (xem tổng quan)
              </label>
            </div>

            {!isTimeUnknown && (
              <>
                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Giờ Sinh
                  </label>
                  <input
                    type="time"
                    step="1"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    required={!isTimeUnknown}
                    className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Nơi Sinh (Thành phố)
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  >
                    {VIETNAM_CITIES.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCity === 'Khác (Nhập tọa độ thủ công)' && (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-background border border-borderDark">
                    <div>
                      <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Vĩ Độ</label>
                      <input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(Number(e.target.value))}
                        className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-stone mb-1 uppercase">Kinh Độ</label>
                      <input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(Number(e.target.value))}
                        className="w-full px-2 py-1 bg-surface border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Đang tính toán thiên văn...
                </>
              ) : (
                'Thiết Lập Bản Đồ Sao →'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-background border border-cinnabar text-cinnabar text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick instructions for beginners */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hướng Dẫn Cho Người Mới</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Bộ ba <strong>Mặt Trời, Mặt Trăng, Cung Mọc</strong> phản ánh bản ngã cốt lõi, cảm xúc nội tâm và phong thái bên ngoài. 
              <strong> Bạn chỉ cần nhấp vào từng thẻ</strong> để mở bảng giải nghĩa chi tiết và lời khuyên cân bằng cuộc sống.
            </p>
          </div>
        </div>

        {/* Right Column: Chart Results */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Bản Đồ Sao Đang Chờ Khởi Tạo</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập thông tin ngày sinh và nơi sinh bên trái để khởi tạo bản đồ sao cá nhân chi tiết.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Degraded Alert if applicable */}
              {result.isDegraded && (
                <div className="p-3.5 bg-background border border-accentGold text-stone text-xs space-y-1">
                  <div className="flex items-center gap-2 font-mono text-accentGold text-[11px] uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Lưu ý: Bạn chưa nhập giờ sinh chính xác
                  </div>
                  <p className="text-stone text-[11px] leading-relaxed">
                    Hệ thống chỉ giải mã vị trí các hành tinh theo ngày sinh. Cung Mọc (Ascendant) và 12 cung nhà được ẩn đi để không tạo ra các phán đoán thiếu căn cứ.
                  </p>
                </div>
              )}

              {/* Clean verification badge */}
              <div className="p-4 bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-stone">
                  <ShieldCheck className="w-4 h-4 text-accentGold" />
                  <span>Bản đồ sao cá nhân hóa chuẩn xác</span>
                </div>
                <span className="text-[11px] text-accentGold underline">
                  Nhấp vào hành tinh hoặc cung nhà để xem giải nghĩa chi tiết →
                </span>
              </div>

              {/* THE BIG THREE SUMMARY CARDS (Clickable to open Popup) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Sun Sign */}
                <div
                  onClick={() =>
                    setSelectedAstroItem({
                      category: 'CUNG MẶT TRỜI (SUN SIGN)',
                      title: `Mặt Trời Tại ${ZODIAC_VN[sunSignKey] ?? sunSignKey}`,
                      sign: ZODIAC_VN[sunSignKey] ?? sunSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.sun,
                      layman: sunInterp.layman,
                      mechanism: sunInterp.mechanism,
                      advice: sunInterp.advice,
                    })
                  }
                  className="p-4 bg-surface border border-accentGold/80 hover:border-parchment transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone flex items-center gap-1.5">
                        <Sun className="w-3.5 h-3.5 text-accentGold" />
                        Mặt Trời
                      </span>
                      <span className="text-[10px] text-stone">Bản Ngã</span>
                    </div>
                    <div className="text-lg font-serif font-bold text-accentGold group-hover:text-parchment transition-colors">
                      {ZODIAC_VN[sunSignKey] ?? sunSignKey}
                    </div>
                    <p className="text-xs text-stone line-clamp-1">{sunInterp.layman}</p>
                  </div>
                  <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                    Chi tiết Mặt Trời →
                  </span>
                </div>

                {/* 2. Moon Sign */}
                <div
                  onClick={() =>
                    setSelectedAstroItem({
                      category: 'CUNG MẶT TRĂNG (MOON SIGN)',
                      title: `Mặt Trăng Tại ${ZODIAC_VN[moonSignKey] ?? moonSignKey}`,
                      sign: ZODIAC_VN[moonSignKey] ?? moonSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.moon,
                      layman: moonInterp.layman,
                      advice: moonInterp.advice,
                    })
                  }
                  className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone flex items-center gap-1.5">
                        <Moon className="w-3.5 h-3.5 text-stone" />
                        Mặt Trăng
                      </span>
                      <span className="text-[10px] text-stone">Cảm Xúc</span>
                    </div>
                    <div className="text-lg font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                      {ZODIAC_VN[moonSignKey] ?? moonSignKey}
                    </div>
                    <p className="text-xs text-stone line-clamp-1">{moonInterp.layman}</p>
                  </div>
                  <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                    Chi tiết Mặt Trăng →
                  </span>
                </div>

                {/* 3. Ascendant */}
                <div
                  onClick={() => {
                    if (result.isDegraded || !ascendantSignKey) return;
                    setSelectedAstroItem({
                      category: 'CUNG MỌC (ASCENDANT / RISING)',
                      title: `Cung Mọc Tại ${ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey}`,
                      sign: ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey,
                      beginnerGuide: PLANET_BEGINNER_GUIDES.ascendant,
                      layman: `Cung Mọc ${ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey} định hình phong thái, ngoại hình và cách tiếp cận thế giới bên ngoài của bạn. Người khác thường ấn tượng với sự độc lập, tự tin và cách ứng xử đặc trưng của cung này khi mới tiếp xúc.`,
                      advice: 'Hãy sống đúng với thần thái tự nhiên của mình, đồng thời kết nối sâu với thế giới cảm xúc nội tâm bên trong.',
                    });
                  }}
                  className={`p-4 bg-surface border transition-colors space-y-2 flex flex-col justify-between ${
                    result.isDegraded
                      ? 'border-borderDark opacity-50'
                      : 'border-borderDark hover:border-accentGold cursor-pointer group'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-stone flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-stone" />
                        Cung Mọc
                      </span>
                      <span className="text-[10px] text-stone">Phong Thái</span>
                    </div>
                    <div className="text-lg font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                      {result.isDegraded ? 'Chưa rõ (Cần giờ sinh)' : ZODIAC_VN[ascendantSignKey] ?? ascendantSignKey}
                    </div>
                    <p className="text-xs text-stone line-clamp-1">
                      {result.isDegraded ? 'Cần giờ sinh để xác định' : 'Ấn tượng ban đầu & ngoại hình'}
                    </p>
                  </div>
                  {!result.isDegraded && (
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Cung Mọc →
                    </span>
                  )}
                </div>
              </div>

              {/* Planetary Positions Table (Each row is interactive) */}
              <div className="p-5 rounded-2xl bg-surface border border-borderDark space-y-3">
                <div className="flex items-center justify-between border-b border-borderDark pb-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span>Bảng Tọa Độ Các Hành Tinh</span>
                    <span className="text-[11px] font-normal text-gray-400">
                      ({Object.keys(result.facts.bodies).length} thiên thể)
                    </span>
                  </h3>
                  <span className="text-[11px] text-accentGold">Nhấp vào dòng để xem chi tiết</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 bg-background/50 border-b border-borderDark">
                      <tr>
                        <th className="py-2.5 px-3">Thiên Thể</th>
                        <th className="py-2.5 px-3">Cung Hoàng Đạo</th>
                        <th className="py-2.5 px-3">Độ Cung</th>
                        <th className="py-2.5 px-3">Nhà</th>
                        <th className="py-2.5 px-3 text-right">Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderDark/40">
                      {Object.entries(result.facts.bodies).map(([bodyName, pos]: [string, any]) => (
                        <tr
                          key={bodyName}
                          onClick={() => {
                            const nameVn = PLANET_NAMES_VN[bodyName.toLowerCase()] ?? bodyName;
                            const guide = PLANET_BEGINNER_GUIDES[bodyName.toLowerCase()] ?? 'Thiên thể chi phối một khía cạnh năng lượng đặc thù trong bản đồ sao.';
                            const signVn = ZODIAC_VN[pos.sign] ?? pos.sign;

                            setSelectedAstroItem({
                              category: `HÀNH TINH: ${nameVn.toUpperCase()}`,
                              title: `${nameVn} Tại ${signVn}`,
                              sign: signVn,
                              degree: pos.signDegree,
                              house: pos.houseNumber,
                              beginnerGuide: guide,
                              layman: `Vị trí ${nameVn} ngự tại ${signVn} thể hiện bạn biểu đạt khía cạnh này một cách ${
                                ZODIAC_ELEMENT[pos.sign] === 'FIRE'
                                  ? 'nhiệt huyết, chủ động và đầy đam mê.'
                                  : ZODIAC_ELEMENT[pos.sign] === 'EARTH'
                                  ? 'thực tế, kiên nhẫn và trọng sự an toàn vững bền.'
                                  : ZODIAC_ELEMENT[pos.sign] === 'AIR'
                                  ? 'thông minh, linh hoạt và giàu tư duy kết nối.'
                                  : 'sâu lắng, trực giác nhạy bén và giàu tình cảm.'
                              }`,
                              advice: 'Khai thác tối đa phẩm chất tích cực của cung hoàng đạo này trong các hoạt động thực tế thường nhật.',
                            });
                          }}
                          className="hover:bg-surfaceHover/80 cursor-pointer transition-colors group"
                        >
                          <td className="py-2.5 px-3 font-semibold text-white capitalize group-hover:text-accentGold">
                            {PLANET_NAMES_VN[bodyName.toLowerCase()] ?? bodyName}
                          </td>
                          <td className="py-2.5 px-3 text-amber-300 font-medium">
                            {ZODIAC_VN[pos.sign] ?? pos.sign}
                          </td>
                          <td className="py-2.5 px-3 text-gray-300">{pos.signDegree?.toFixed(2)}°</td>
                          <td className="py-2.5 px-3 text-gray-300">
                            {pos.houseNumber ? `Nhà ${pos.houseNumber}` : '—'}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="text-[10px] text-accentGold group-hover:underline">
                              Xem giải mã →
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Biểu Đồ Bánh Xe 12 Cung Nhà (Natal House Wheel Chart - Interactive SVG + Popup) */}
              {result.facts.houses && (
                <div className="p-5 md:p-6 rounded-3xl bg-surface border border-accentGold/40 space-y-6 shadow-xl shadow-amber-500/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-borderDark pb-3">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Compass className="w-5 h-5 text-accentGold" />
                        <span>Biểu Đồ Bánh Xe 12 Cung Nhà (Natal House Wheel)</span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        Phân định 12 lĩnh vực cuộc sống theo hệ thống <strong>{result.metadata?.houseSystem ?? 'Placidus'}</strong>. 
                        4 Trục then chốt: <strong>ASC (Cung Mọc)</strong> - <strong>DSC (Cung Lặn)</strong>, <strong>MC (Thiên Đỉnh)</strong> - <strong>IC (Thiên Để)</strong>.
                      </p>
                    </div>
                    <span className="self-start sm:self-auto text-[11px] px-3 py-1 font-mono bg-surface border-borderDark text-accentGold border border-accentGold/30 flex items-center gap-1.5 shrink-0">
                      <BookOpen className="w-3.5 h-3.5" />
                      Chạm vào Cung Nhà để mở Popup
                    </span>
                  </div>

                  {/* SVG Natal House Wheel Chart */}
                  <div className="flex justify-center py-2">
                    <div className="w-full max-w-[560px]">
                      <svg viewBox="0 0 640 640" className="w-full h-auto select-none overflow-visible">
                        <defs>
                          {/* Radial Glow for Wheel Center */}
                          <radialGradient id="wheelCenterGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#e2b342" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#0b1329" stopOpacity="0.0" />
                          </radialGradient>
                        </defs>

                        {/* Outer Background Border */}
                        <circle cx="320" cy="320" r="285" fill="#070c18" stroke="#334155" strokeWidth="2" />
                        <circle cx="320" cy="320" r="230" fill="none" stroke="#475569" strokeWidth="1.5" />
                        <circle cx="320" cy="320" r="75" fill="#0b1329" stroke="#334155" strokeWidth="1.5" />

                        {/* 12 House Sectors */}
                        {result.facts.houses.map((h: any) => {
                          const { startHour, endHour, midHour } = getHouseClockHours(h.houseNumber);
                          const houseInfo = HOUSE_INTERPRETATIONS[h.houseNumber];
                          const element = ZODIAC_ELEMENT[h.sign] ?? 'FIRE';
                          const glyph = ZODIAC_GLYPHS[h.sign] ?? '';
                          const signVn = ZODIAC_VN[h.sign] ?? h.sign;

                          // Resident planets in this house
                          const occupants = Object.entries(result.facts.bodies || {}).filter(
                            ([_, pos]: [string, any]) => pos.houseNumber === h.houseNumber
                          );

                          // Coordinates for labels
                          const outerLabelPos = getClockCoordinates(320, 320, 256, midHour);
                          const houseBadgePos = getClockCoordinates(320, 320, 160, midHour);
                          const planetsPos = getClockCoordinates(320, 320, 110, midHour);

                          // Element color palette
                          const elemColors = {
                            FIRE: { fill: 'rgba(239, 68, 68, 0.16)', border: '#f87171', text: '#fca5a5' },
                            EARTH: { fill: 'rgba(16, 185, 129, 0.16)', border: '#34d399', text: '#6ee7b7' },
                            AIR: { fill: 'rgba(6, 182, 212, 0.16)', border: '#22d3ee', text: '#7dd3fc' },
                            WATER: { fill: 'rgba(99, 102, 241, 0.16)', border: '#818cf8', text: '#a5b4fc' },
                          }[element];

                          const handleHouseClick = () => {
                            const occupantsDesc =
                              occupants.length > 0
                                ? `Hành tinh trú ngụ trong Nhà ${h.houseNumber}:\n` +
                                  occupants
                                    .map(([name, pos]: [string, any]) => {
                                      const vnName = PLANET_NAMES_VN[name.toLowerCase()] ?? name;
                                      const pGlyph = PLANET_GLYPHS[name.toLowerCase()] ?? '●';
                                      return `• ${pGlyph} ${vnName}: Tọa độ ${pos.signDegree?.toFixed(2)}° cung ${ZODIAC_VN[pos.sign] ?? pos.sign}`;
                                    })
                                    .join('\n')
                                : 'Cung nhà này không có hành tinh chính ngụ (Cung nhà trống). Trong chiêm tinh học phương Tây, cung nhà trống mang ý nghĩa lĩnh vực này diễn ra êm đềm, năng lượng được dẫn dắt bởi chủ tinh của cung hoàng đạo tại đỉnh nhà.';

                            setSelectedAstroItem({
                              category: `ĐỈNH CUNG NHÀ ${h.houseNumber} (${houseInfo?.latinName ?? ''})`,
                              title: `Nhà ${h.houseNumber} Tại ${signVn} (${h.cuspLongitude?.toFixed(2)}°)`,
                              sign: signVn,
                              degree: h.cuspLongitude,
                              house: h.houseNumber,
                              beginnerGuide: `${houseInfo?.beginnerGuide ?? ''}\n\n• Lĩnh vực cuộc sống chi phối: ${houseInfo?.domain ?? ''}`,
                              layman: `${houseInfo?.layman ?? ''}\n\n${occupantsDesc}\n\n• Chủ đề then chốt: ${houseInfo?.keyThemes ?? ''}`,
                              mechanism: `Đỉnh nhà (Cusp) ngự tại ${h.signDegree?.toFixed(2)}° ${signVn}. Hệ thống phân chia nhà: ${result.metadata?.houseSystem ?? 'Placidus'}.`,
                              advice: houseInfo?.advice ?? 'Khai thác tối đa nguồn lực tích cực của cung nhà này.',
                            });
                          };

                          return (
                            <g
                              key={h.houseNumber}
                              onClick={handleHouseClick}
                              className="cursor-pointer group focus:outline-none"
                              role="button"
                              tabIndex={0}
                            >
                              {/* Outer Rim: Zodiac Sign Slice */}
                              <path
                                d={createSectorPath(320, 320, 230, 285, startHour, endHour)}
                                fill={elemColors.fill}
                                stroke={elemColors.border}
                                strokeWidth="1"
                                className="group-hover:opacity-100 opacity-80 transition-opacity"
                              />

                              {/* Outer Rim Text: Glyph & Name */}
                              <text
                                x={outerLabelPos.x}
                                y={outerLabelPos.y + 4}
                                textAnchor="middle"
                                fill={elemColors.text}
                                fontSize="11"
                                fontWeight="bold"
                                className="pointer-events-none"
                              >
                                {glyph} {signVn.split(' ')[0]}
                              </text>

                              {/* Inner House Slice */}
                              <path
                                d={createSectorPath(320, 320, 75, 230, startHour, endHour)}
                                fill="#0f172a"
                                fillOpacity="0.45"
                                stroke="#334155"
                                strokeWidth="1"
                                className="group-hover:fill-accentGold/20 group-hover:stroke-accentGold transition-all duration-200"
                              />

                              {/* House Number Badge */}
                              <circle
                                cx={houseBadgePos.x}
                                cy={houseBadgePos.y}
                                r="13"
                                fill="#1e293b"
                                stroke={h.houseNumber % 3 === 1 ? '#e2b342' : '#64748b'}
                                strokeWidth="1.5"
                                className="group-hover:stroke-accentGold group-hover:scale-110 transition-all origin-center"
                              />
                              <text
                                x={houseBadgePos.x}
                                y={houseBadgePos.y + 4.5}
                                textAnchor="middle"
                                fill={h.houseNumber % 3 === 1 ? '#fbbf24' : '#cbd5e1'}
                                fontSize="11"
                                fontWeight="bold"
                                className="pointer-events-none"
                              >
                                {h.houseNumber}
                              </text>

                              {/* Resident Planet Glyphs */}
                              {occupants.length > 0 && (
                                <g>
                                  <text
                                    x={planetsPos.x}
                                    y={planetsPos.y + 5}
                                    textAnchor="middle"
                                    fill="#fbbf24"
                                    fontSize="14"
                                    fontWeight="bold"
                                    className="pointer-events-none drop-shadow"
                                  >
                                    {occupants.map(([b]) => PLANET_GLYPHS[b.toLowerCase()] ?? '●').join('')}
                                  </text>
                                </g>
                              )}
                            </g>
                          );
                        })}

                        {/* Cardinal Axes Lines (ASC-DSC, MC-IC) */}
                        {/* ASC - DSC Axis (9 o'clock to 3 o'clock) */}
                        <line x1="35" y1="320" x2="605" y2="320" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5,4" />
                        {/* ASC Marker Badge (Left - 9 o'clock) */}
                        <g transform="translate(10, 305)">
                          <rect width="52" height="30" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                          <text x="26" y="20" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="900">
                            ASC
                          </text>
                        </g>
                        {/* DSC Marker Badge (Right - 3 o'clock) */}
                        <g transform="translate(578, 305)">
                          <rect width="52" height="30" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                          <text x="26" y="20" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="900">
                            DSC
                          </text>
                        </g>

                        {/* MC - IC Axis (12 o'clock to 6 o'clock) */}
                        <line x1="320" y1="35" x2="320" y2="605" stroke="#e2b342" strokeWidth="2.5" strokeDasharray="5,4" />
                        {/* MC Marker Badge (Top - 12 o'clock) */}
                        <g transform="translate(294, 10)">
                          <rect width="52" height="30" rx="8" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
                          <text x="26" y="20" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="900">
                            MC
                          </text>
                        </g>
                        {/* IC Marker Badge (Bottom - 6 o'clock) */}
                        <g transform="translate(294, 600)">
                          <rect width="52" height="30" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                          <text x="26" y="20" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontWeight="900">
                            IC
                          </text>
                        </g>

                        {/* Center Hub */}
                        <circle cx="320" cy="320" r="58" fill="#0b1329" stroke="#e2b342" strokeWidth="2" />
                        <circle cx="320" cy="320" r="52" fill="url(#wheelCenterGlow)" />
                        <text x="320" y="310" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                          12 CUNG NHÀ
                        </text>
                        <text x="320" y="325" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="500">
                          {result.metadata?.houseSystem ?? 'PLACIDUS'}
                        </text>
                        <text x="320" y="340" textAnchor="middle" fill="#34d399" fontSize="9">
                          [Chạm vào Nhà]
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Companion 12 House Cards Grid */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="font-semibold text-gray-200">Danh Mục Chi Tiết 12 Cung Nhà</span>
                      <span>Nhấp vào thẻ để xem phân tích</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {result.facts.houses.map((h: any) => {
                        const houseInfo = HOUSE_INTERPRETATIONS[h.houseNumber];
                        const signVn = ZODIAC_VN[h.sign] ?? h.sign;
                        const glyph = ZODIAC_GLYPHS[h.sign] ?? '';
                        const occupants = Object.entries(result.facts.bodies || {}).filter(
                          ([_, pos]: [string, any]) => pos.houseNumber === h.houseNumber
                        );

                        const handleCardClick = () => {
                          const occupantsDesc =
                            occupants.length > 0
                              ? `Hành tinh trú ngụ trong Nhà ${h.houseNumber}:\n` +
                                occupants
                                  .map(([name, pos]: [string, any]) => {
                                    const vnName = PLANET_NAMES_VN[name.toLowerCase()] ?? name;
                                    const pGlyph = PLANET_GLYPHS[name.toLowerCase()] ?? '●';
                                    return `• ${pGlyph} ${vnName}: Tọa độ ${pos.signDegree?.toFixed(2)}° cung ${ZODIAC_VN[pos.sign] ?? pos.sign}`;
                                  })
                                  .join('\n')
                              : 'Cung nhà này không có hành tinh chính ngụ (Cung nhà trống). Trong chiêm tinh học phương Tây, cung nhà trống mang ý nghĩa lĩnh vực này diễn ra êm đềm, năng lượng được dẫn dắt bởi chủ tinh của cung hoàng đạo tại đỉnh nhà.';

                          setSelectedAstroItem({
                            category: `ĐỈNH CUNG NHÀ ${h.houseNumber} (${houseInfo?.latinName ?? ''})`,
                            title: `Nhà ${h.houseNumber} Tại ${signVn} (${h.cuspLongitude?.toFixed(2)}°)`,
                            sign: signVn,
                            degree: h.cuspLongitude,
                            house: h.houseNumber,
                            beginnerGuide: `${houseInfo?.beginnerGuide ?? ''}\n\n• Lĩnh vực cuộc sống chi phối: ${houseInfo?.domain ?? ''}`,
                            layman: `${houseInfo?.layman ?? ''}\n\n${occupantsDesc}\n\n• Chủ đề then chốt: ${houseInfo?.keyThemes ?? ''}`,
                            mechanism: `Đỉnh nhà (Cusp) ngự tại ${h.signDegree?.toFixed(2)}° ${signVn}. Hệ thống phân chia nhà: ${result.metadata?.houseSystem ?? 'Placidus'}.`,
                            advice: houseInfo?.advice ?? 'Khai thác tối đa nguồn lực tích cực của cung nhà này.',
                          });
                        };

                        return (
                          <div
                            key={h.houseNumber}
                            onClick={handleCardClick}
                            className="p-3 rounded-xl bg-background/60 border border-borderDark/70 hover:border-accentGold hover:bg-surfaceHover/80 transition-all cursor-pointer group space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white group-hover:text-accentGold transition-colors">
                                Nhà {h.houseNumber}
                              </span>
                              {h.houseNumber === 1 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                                  ASC
                                </span>
                              )}
                              {h.houseNumber === 4 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                                  IC
                                </span>
                              )}
                              {h.houseNumber === 7 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                                  DSC
                                </span>
                              )}
                              {h.houseNumber === 10 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                                  MC
                                </span>
                              )}
                            </div>

                            <div className="text-amber-300 font-medium text-xs flex items-center gap-1">
                              <span>{glyph}</span>
                              <span className="truncate">{signVn}</span>
                            </div>

                            <div className="text-[10px] text-gray-400 font-mono">
                              Đỉnh: {h.cuspLongitude?.toFixed(2)}°
                            </div>

                            {occupants.length > 0 ? (
                              <div className="text-[10px] text-accentGold font-medium truncate pt-0.5">
                                ★ {occupants.map(([b]) => PLANET_GLYPHS[b.toLowerCase()] ?? '●').join(' ')}{' '}
                                ({occupants.length} hành tinh)
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-500 pt-0.5">Cung trống</div>
                            )}

                            <span className="text-[9.5px] text-accentGold block pt-0.5 group-hover:underline">
                              Luận giải chi tiết →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* POPUP / MODAL: COMPREHENSIVE ASTROLOGY ITEM INTERPRETATION */}
      {selectedAstroItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider">
                  {selectedAstroItem.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-parchment">
                  {selectedAstroItem.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedAstroItem(null)}
                className="p-1.5 text-stone hover:text-parchment hover:bg-surfaceHover transition-colors border border-borderDark"
                title="Đóng popup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-xs">
              {/* Beginner Guide */}
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Giải Thích Dành Cho Người Mới Bắt Đầu:</span>
                </div>
                <p className="text-stone leading-relaxed text-xs whitespace-pre-line">
                  {selectedAstroItem.beginnerGuide}
                </p>
                {selectedAstroItem.degree && (
                  <div className="pt-2 text-[11px] font-mono text-stone border-t border-borderDark">
                    Tọa độ: <strong className="text-parchment">{selectedAstroItem.degree.toFixed(2)}°</strong>
                    {selectedAstroItem.house ? ` • Nằm tại Nhà ${selectedAstroItem.house}` : ''}
                  </div>
                )}
              </div>

              {/* Core Layman Meaning */}
              <div className="p-4 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Ý Nghĩa Thực Tế Cho Tính Cách & Cuộc Sống Của Bạn:
                </span>
                <p className="text-parchment leading-relaxed text-xs whitespace-pre-line font-normal">
                  {selectedAstroItem.layman}
                </p>
              </div>

              {/* Actionable Advice */}
              <div className="p-4 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  🎯 Lời Khuyên Cân Bằng & Phát Huy Năng Lượng:
                </span>
                <p className="text-stone leading-relaxed text-xs">
                  {selectedAstroItem.advice}
                </p>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedAstroItem(null)}
                  className="px-5 py-2 bg-accentGold text-background font-mono text-xs uppercase tracking-wider font-bold hover:bg-parchment transition-colors border border-accentGold"
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
