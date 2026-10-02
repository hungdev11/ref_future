'use client';

import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, User, Info } from 'lucide-react';

export default function CompatibilityPage() {
  // Person A
  const [nameA, setNameA] = useState('Nguyễn Văn An');
  const [dateA, setDateA] = useState('1992-05-15');
  const [genderA, setGenderA] = useState<'MALE' | 'FEMALE'>('MALE');

  // Person B
  const [nameB, setNameB] = useState('Trần Thị Bình');
  const [dateB, setDateB] = useState('1994-10-20');
  const [genderB, setGenderB] = useState<'MALE' | 'FEMALE'>('FEMALE');

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Calculate Astro & Numerology for Person A
      const [resAstroA, resNumA, resAstroB, resNumB] = await Promise.all([
        fetch('/api/astrology/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthDate: dateA, timeAccuracy: 'UNKNOWN' }),
        }).then((r) => r.json()),
        fetch('/api/numerology/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: nameA, birthDate: dateA }),
        }).then((r) => r.json()),
        fetch('/api/astrology/chart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ birthDate: dateB, timeAccuracy: 'UNKNOWN' }),
        }).then((r) => r.json()),
        fetch('/api/numerology/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName: nameB, birthDate: dateB }),
        }).then((r) => r.json()),
      ]);

      if (resAstroA.error || resNumA.error || resAstroB.error || resNumB.error) {
        throw new Error('Tính toán tương hợp thất bại. Vui lòng kiểm tra lại thông tin ngày sinh.');
      }

      const sunA = resAstroA.facts?.bodies?.sun?.sign ?? 'N/A';
      const moonA = resAstroA.facts?.bodies?.moon?.sign ?? 'N/A';
      const lpA = resNumA.facts?.core?.life_path?.value ?? 'N/A';
      const exprA = resNumA.facts?.core?.expression?.value ?? 'N/A';

      const sunB = resAstroB.facts?.bodies?.sun?.sign ?? 'N/A';
      const moonB = resAstroB.facts?.bodies?.moon?.sign ?? 'N/A';
      const lpB = resNumB.facts?.core?.life_path?.value ?? 'N/A';
      const exprB = resNumB.facts?.core?.expression?.value ?? 'N/A';

      setAnalysis({
        personA: { name: nameA, sun: sunA, moon: moonA, lifePath: lpA, expression: exprA },
        personB: { name: nameB, sun: sunB, moon: moonB, lifePath: lpB, expression: exprB },
      });
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
        <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
          <HeartHandshake className="w-4 h-4" />
          <span>Multi-Discipline Compatibility Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Đối Chiếu Tương Hợp Đa Hệ Thống</h1>
        <p className="text-sm text-gray-400 max-w-2xl">
          Phân tích độ tương thích giữa hai người dựa trên Chiêm Tinh Học và Thần Số Học. 
          Không sử dụng điểm số phần trăm giả tạo — toàn bộ phân tích dựa trên cấu trúc nguyên tố và số học minh bạch.
        </p>
      </div>

      <form onSubmit={handleCompare} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Person A */}
          <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <User className="w-4 h-4" />
              <span>Đối Tượng A</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Họ và Tên</label>
              <input
                type="text"
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh (Dương Lịch)</label>
              <input
                type="date"
                value={dateA}
                onChange={(e) => setDateA(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Giới Tính</label>
              <select
                value={genderA}
                onChange={(e) => setGenderA(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
              </select>
            </div>
          </div>

          {/* Person B */}
          <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <User className="w-4 h-4" />
              <span>Đối Tượng B</span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Họ và Tên</label>
              <input
                type="text"
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Ngày Sinh (Dương Lịch)</label>
              <input
                type="date"
                value={dateB}
                onChange={(e) => setDateB(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Giới Tính</label>
              <select
                value={genderB}
                onChange={(e) => setGenderB(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-borderDark text-white text-sm focus:outline-none focus:border-accentGold"
              >
                <option value="FEMALE">Nữ</option>
                <option value="MALE">Nam</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-sm shadow-lg shadow-pink-500/20 hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Đang đối chiếu dữ liệu hai người...
              </>
            ) : (
              <>
                <HeartHandshake className="w-5 h-5" />
                Khởi Chạy Đối Chiếu Tương Hợp
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {analysis && (
        <div className="space-y-6 pt-4">
          <div className="p-6 rounded-2xl bg-surface border border-borderDark space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accentGold" />
              Bảng Tổng Hợp Đối Chiếu Năng Lượng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
                <div className="font-bold text-amber-400 text-sm">{analysis.personA.name}</div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Mặt Trời (Sun Sign): <span className="text-white font-semibold">{analysis.personA.sun}</span></div>
                  <div>Mặt Trăng (Moon Sign): <span className="text-white font-semibold">{analysis.personA.moon}</span></div>
                  <div>Số Chủ Đạo (Life Path): <span className="text-accentGold font-bold">{analysis.personA.lifePath}</span></div>
                  <div>Số Sứ Mệnh (Expression): <span className="text-emerald-400 font-semibold">{analysis.personA.expression}</span></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/60 border border-borderDark space-y-2">
                <div className="font-bold text-indigo-400 text-sm">{analysis.personB.name}</div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div>Mặt Trời (Sun Sign): <span className="text-white font-semibold">{analysis.personB.sun}</span></div>
                  <div>Mặt Trăng (Moon Sign): <span className="text-white font-semibold">{analysis.personB.moon}</span></div>
                  <div>Số Chủ Đạo (Life Path): <span className="text-accentGold font-bold">{analysis.personB.lifePath}</span></div>
                  <div>Số Sứ Mệnh (Expression): <span className="text-emerald-400 font-semibold">{analysis.personB.expression}</span></div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surfaceHover/60 border border-borderDark space-y-2 text-xs text-gray-300">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                Minh Bạch Về Nguyên Tắc Tương Hợp
              </div>
              <p className="leading-relaxed text-gray-400">
                Hệ thống xác định tương thích thông qua nguyên tắc hài hòa nguyên tố (Lửa, Đất, Khí, Nước trong Chiêm Tinh) và nhịp điệu chu kỳ số học (Life Path & Expression). Không đưa ra một tỷ lệ phần trăm tùy tiện nào mà giúp cả hai nhìn rõ điểm tựa thấu hiểu và các bài học cần tương trợ lẫn nhau.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
