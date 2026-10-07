'use client';

import React, { useState } from 'react';
import {
  Compass,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  Info,
} from 'lucide-react';
import type { MysticosResult } from '@mystic/core';
import { DateInput } from '@/components/DateInput';
import { MysticosResultViewer } from '@/components/MysticosResultViewer';

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
  const [result, setResult] = useState<MysticosResult | null>(null);
  const [isDegraded, setIsDegraded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const canonicalResult: MysticosResult = data.data || data.mysticosResult;
      setResult(canonicalResult);
      setIsDegraded(Boolean(data.isDegraded || isTimeUnknown));
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
          <span className="text-accentGold">01</span>
          <span>/</span>
          <span>Chiêm Tinh Học Tây Phương Cổ Điển</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ Sao Cá Nhân (Natal Chart)
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Tính toán tọa độ hành tinh và cung nhà dựa trên Swiss Ephemeris. Luận giải tất định
          theo chuẩn chiêm tinh cổ điển, tập trung vào bản chất hành vi và phát triển cá nhân.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1: Input Form */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            <span>Thông Số Ngày Giờ & Tọa Độ</span>
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

            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
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

              {isTimeUnknown && (
                <div className="p-3 bg-background border border-accentGold/40 text-stone text-[11px] space-y-1">
                  <div className="font-mono text-accentGold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3 h-3" />
                    <span>Chế độ bảo toàn (Degraded Mode)</span>
                  </div>
                  <p className="leading-relaxed">
                    Hệ thống sẽ tính tọa độ các hành tinh theo ngày sinh. Cung Mọc (Ascendant) và 12 cung địa bàn sẽ được ẩn để bảo đảm tính tất định, tránh phỏng đoán sai lệch.
                  </p>
                </div>
              )}
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

                <div>
                  <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                    Hệ Thống Cung Nhà (House System)
                  </label>
                  <select
                    value={houseSystem}
                    onChange={(e) => setHouseSystem(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                  >
                    <option value="PLACIDUS">Placidus (Tiêu chuẩn)</option>
                    <option value="WHOLE_SIGN">Whole Sign (Mỗi cung một nhà)</option>
                    <option value="KOCH">Koch</option>
                    <option value="EQUAL">Equal House</option>
                  </select>
                </div>
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

          {/* Guide Note */}
          <div className="p-3.5 bg-background border border-borderDark space-y-2 text-xs">
            <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Chuẩn Xác & Minh Bạch</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Mọi vị trí thiên thể đều được tính toán theo tọa độ thiên văn thực tế. Không suy diễn mập mờ, không gán ghép định kiến.
            </p>
          </div>
        </div>

        {/* Step 2: Editorial Result View */}
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

          {isDegraded && result && (
            <div className="p-4 bg-surface border border-accentGold/60 text-stone text-xs space-y-1">
              <div className="flex items-center gap-2 font-mono text-accentGold text-[11px] uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>Chế độ bảo toàn khi thiếu giờ sinh (Degraded Mode)</span>
              </div>
              <p className="text-stone text-[11px] leading-relaxed">
                Hệ thống chỉ phân tích vị trí các hành tinh theo ngày sinh. Cung Mọc và các cung nhà được ẩn để đảm bảo tính tất định trung thực.
              </p>
            </div>
          )}

          {/* Editorial Result Presentation */}
          {result && <MysticosResultViewer result={result} />}
        </div>
      </div>
    </div>
  );
}
