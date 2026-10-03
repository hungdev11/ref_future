'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  X,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Layers,
  FileText,
} from 'lucide-react';
import {
  PERSONAL_YEAR_ASPECTS,
  calculatePersonalityGroups,
  calculateHollandCareerMatch,
  LIFE_PATH_EXTENDED_INFO,
  calculateBirthChart,
  detectKarmicDebts,
  detectMissingKarmicLessons,
  calculateAttitudeNumber,
  ATTITUDE_INTERPRETATIONS,
  evaluateLifePathExpressionHarmony,
  evaluateLifePathSoulHarmony,
  LIFE_PATH_INTERPRETATIONS,
  PERSONAL_YEAR_INTERPRETATIONS,
  PINNACLE_INTERPRETATIONS,
} from '@mystic/numerology-engine';
import { NumerologyFullReport } from './NumerologyFullReport';
import { TermTag } from '@/components/TermTag';
import { DateInput } from '@/components/DateInput';

export default function NumerologyPage() {
  const [fullName, setFullName] = useState('Nguyễn Văn Đức');
  const [birthDate, setBirthDate] = useState('1990-11-29');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'dashboard' | 'fullReport'>('dashboard');

  // Modal State for clicked items
  const [selectedItem, setSelectedItem] = useState<{
    category: string;
    title: string;
    value: string | number;
    beginnerGuide: string;
    details: string;
    advice: string;
    strengths?: string;
    challenges?: string;
  } | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSelectedItem(null);

    try {
      const res = await fetch('/api/numerology/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, birthDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Khảo cứu thất bại');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const lifePathVal = Number(result?.facts?.core?.LIFE_PATH?.value ?? 0);
  const expressionVal = Number(result?.facts?.core?.EXPRESSION?.value ?? 0);
  const soulUrgeVal = Number(result?.facts?.core?.SOUL_URGE?.value ?? 0);
  const personalityVal = Number(result?.facts?.core?.PERSONALITY?.value ?? 0);
  const maturityVal = Number(result?.facts?.core?.MATURITY?.value ?? 0);
  const personalYearVal = Number(result?.facts?.cycles?.personalYear?.value ?? result?.facts?.core?.PERSONAL_YEAR?.value ?? 0);
  const personalMonthVal = Number(result?.facts?.cycles?.personalMonth?.value ?? result?.facts?.core?.PERSONAL_MONTH?.value ?? 0);
  const personalDayVal = Number(result?.facts?.cycles?.personalDay?.value ?? result?.facts?.core?.PERSONAL_DAY?.value ?? 0);
  const birthdayVal = Number(result?.facts?.core?.BIRTHDAY?.value ?? 0);

  const birthDateStr = result?.facts?.birthDateIso || birthDate;
  const fullNameStr = result?.facts?.normalizedName || fullName;

  const personalityGroups = calculatePersonalityGroups(fullNameStr, birthDateStr);
  const birthChart = calculateBirthChart(birthDateStr);
  const karmicDebts = detectKarmicDebts(birthDateStr, lifePathVal);
  const karmicLessons = detectMissingKarmicLessons(fullNameStr);

  const lifePathInterp = LIFE_PATH_INTERPRETATIONS[lifePathVal] ?? {
    title: `Con Số Chủ Đạo ${lifePathVal}`,
    meaning: 'Năng lượng đặc thù chi phối con đường phát triển cá nhân của bạn.',
    layman: 'Bạn có những tố chất độc đáo đang chờ được khai phá và phát huy đúng môi trường.',
    mechanism: 'Tính toán theo chuẩn rút gọn tổng ngày tháng năm sinh Pythagoras.',
    advice: 'Lắng nghe trực giác và kiên trì rèn luyện bản lĩnh mỗi ngày.',
    strengths: 'Độc lập, kiên định, linh hoạt.',
    challenges: 'Cần duy trì sự cân bằng giữa nội tâm và ngoại cảnh.',
  };

  const personalYearInterp = PERSONAL_YEAR_INTERPRETATIONS[personalYearVal] ?? {
    theme: `Năm Cá Nhân Số ${personalYearVal}`,
    meaning: 'Giai đoạn chuyển biến trong chu kỳ 9 năm phát triển tự nhiên.',
    advice: 'Thuận theo tự nhiên và tập trung hoàn thành các mục tiêu quan trọng.',
  };

  return (
    <div className="space-y-8 py-2">
      {/* Editorial Header */}
      <div className="border-b border-borderDark pb-6 space-y-2">
        <div className="flex items-center gap-2 text-stone text-xs font-mono tracking-widest uppercase">
          <span className="text-accentGold">01</span>
          <span>/</span>
          <span>Thần Số Học Pythagoras</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-parchment font-normal tracking-tight">
          Bản Đồ Chỉ Số Cá Nhân & 4 Đỉnh Cao Đời Người
        </h1>
        <p className="text-xs sm:text-sm text-stone max-w-2xl leading-relaxed">
          Phân tích các rung động số học từ họ tên và ngày sinh theo quy chuẩn Pythagoras.
          <strong> Nhấp vào bất kỳ con số hoặc đỉnh cao nào dưới đây để mở bảng giải nghĩa chi tiết, bình dân và dễ hiểu nhất.</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Guide */}
        <div className="lg:col-span-4 p-5 bg-surface border border-borderDark space-y-5">
          <div className="text-xs font-mono text-accentGold uppercase tracking-wider border-b border-borderDark pb-2">
            Nhập Dữ Liệu Khảo Cứu
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Họ Và Tên Khai Sinh
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-borderDark text-parchment text-xs font-mono focus:outline-none focus:border-accentGold"
                placeholder="VD: Nguyễn Văn Đức"
              />
              <span className="text-[10px] text-stone/70 mt-1 block">
                Họ tên quyết định Số Sứ Mệnh, Linh Hồn và Bài Học Nghiệp Quả.
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone mb-1 uppercase tracking-wider">
                Ngày Sinh Dương Lịch <span className="text-stone/60 normal-case">(Ngày / Tháng / Năm)</span>
              </label>
              <DateInput
                value={birthDate}
                onChange={setBirthDate}
                required
              />
              <span className="text-[10px] text-stone/70 mt-1 block">
                Định dạng DD/MM/YYYY — Quyết định Số Chủ Đạo và 4 Đỉnh Cao Kim Tự Tháp.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accentGold text-background text-xs font-mono font-bold tracking-widest uppercase hover:bg-parchment transition-colors border border-accentGold disabled:opacity-50 mt-2"
            >
              {loading ? 'Đang Khảo Cứu...' : 'Khảo Cứu Thần Số Học →'}
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
              <span>Quy Tắc Đọc Chỉ Số</span>
            </div>
            <p className="text-stone text-[11px] leading-relaxed">
              Mỗi con số mang một tần số rung động riêng. <strong>Bạn chỉ cần nhấp vào con số bất kỳ</strong> để xem lời giải thích đời thường, điểm mạnh, thách thức và lời khuyên hành động.
            </p>
          </div>
        </div>

        {/* Right Column: Dashboard Result */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="p-16 border border-borderDark bg-surface text-center space-y-3">
              <div className="w-10 h-10 border border-borderLight mx-auto flex items-center justify-center text-stone font-serif text-lg">
                ✦
              </div>
              <h3 className="text-sm font-serif text-parchment">Bản Đồ Đang Chờ Khởi Tạo</h3>
              <p className="text-stone text-xs max-w-sm mx-auto leading-relaxed">
                Nhập họ tên và ngày sinh ở bảng bên trái để tra cứu toàn bộ bản đồ Thần Số Học.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Ledger Banner */}
              <div className="p-4 bg-surface border border-borderDark flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-accentGold" />
                  <span className="text-stone">
                    Khảo cứu cho: <strong className="text-parchment">{result.facts.normalizedName}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-accentGold underline">
                  Nhấp vào từng con số để xem luận giải chi tiết →
                </span>
              </div>

              {/* View Mode Switcher */}
              <div className="flex flex-wrap items-center gap-2 border-b border-borderDark pb-3">
                <button
                  type="button"
                  onClick={() => setViewMode('dashboard')}
                  className={`px-3.5 py-1.5 text-xs font-mono border transition-colors flex items-center gap-1.5 ${
                    viewMode === 'dashboard'
                      ? 'bg-accentGold text-background font-bold border-accentGold'
                      : 'bg-surface text-stone border-borderDark hover:text-parchment'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bàn Chỉ Số & Kim Tự Tháp</span>
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
                  <span>Báo Cáo Toàn Diện 5 Phần (100% Miễn Phí)</span>
                </button>
              </div>

              {viewMode === 'fullReport' ? (
                <NumerologyFullReport
                  result={result}
                  lifePathVal={lifePathVal}
                  expressionVal={expressionVal}
                  soulUrgeVal={soulUrgeVal}
                  personalityVal={personalityVal}
                  maturityVal={maturityVal}
                  personalYearVal={personalYearVal}
                  birthDateStr={birthDateStr}
                  fullNameStr={fullNameStr}
                  lifePathInterp={lifePathInterp}
                  personalYearInterp={personalYearInterp}
                  onSelectItem={setSelectedItem}
                />
              ) : (
                <>
                  {/* 1. Core Numbers Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-stone border-b border-borderDark pb-2">
                  <span className="text-parchment font-semibold">Bộ Sáu Chỉ Số Cốt Lõi</span>
                  <span className="text-accentGold text-[11px]">Nhấp xem chi tiết</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Life Path */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ CHỦ ĐẠO (LIFE PATH)',
                        title: `Số Chủ Đạo ${lifePathVal}: ${lifePathInterp.title}`,
                        value: lifePathVal,
                        beginnerGuide:
                          'Số Chủ Đạo là con số quan trọng nhất trong Thần Số Học (chiếm khoảng 60% năng lượng). Nó đại diện cho con đường đời bạn đi, bài học định mệnh và phẩm chất cốt lõi gắn liền với bạn từ khi sinh ra.',
                        details: lifePathInterp.layman,
                        advice: lifePathInterp.advice,
                        strengths: lifePathInterp.strengths,
                        challenges: lifePathInterp.challenges,
                      })
                    }
                    className="p-4 bg-surface border border-accentGold/80 hover:border-parchment transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-stone">Số Chủ Đạo</span>
                        {result.facts.core.LIFE_PATH?.isMasterNumber && (
                          <span className="px-1.5 py-0.2 text-[9px] bg-accentGold text-background font-bold">
                            MASTER
                          </span>
                        )}
                      </div>
                      <div className="text-3xl font-serif font-bold text-accentGold group-hover:text-parchment transition-colors">
                        {lifePathVal}
                      </div>
                      <p className="text-xs font-serif text-parchment font-medium line-clamp-1">
                        {lifePathInterp.title}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Số Chủ Đạo →
                    </span>
                  </div>

                  {/* Expression */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ SỨ MỆNH (EXPRESSION)',
                        title: `Số Sứ Mệnh ${expressionVal}: Năng Lực Bẩm Sinh & Khát Vọng`,
                        value: expressionVal,
                        beginnerGuide:
                          'Số Sứ Mệnh được tính từ tất cả chữ cái trong họ và tên. Nó đại diện cho tài năng thiên bẩm, phương thức bạn hành động và những gì bạn có thể đóng góp cho đời.',
                        details: `Với số Sứ Mệnh ${expressionVal}, bạn mang năng lượng tự nhiên để hiện thực hóa các mục tiêu đời sống qua phong thái hành sự đặc thù.`,
                        advice: 'Hãy phát huy tối đa sở trường của mình vào các công việc bạn yêu thích thay vì chạy theo khuôn mẫu của người khác.',
                        strengths: 'Khả năng biểu đạt, sự kiên định, tài năng bẩm sinh.',
                        challenges: 'Cần tránh việc tự ti hoặc lãng phí năng lượng vào những việc không đúng chuyên môn.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Sứ Mệnh</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {expressionVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Tài năng & Năng lực hành động</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Sứ Mệnh →
                    </span>
                  </div>

                  {/* Soul Urge */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ LINH HỒN (SOUL URGE)',
                        title: `Số Linh Hồn ${soulUrgeVal}: Tiếng Nói Của Trái Tim`,
                        value: soulUrgeVal,
                        beginnerGuide:
                          'Số Linh Hồn được tính từ các nguyên âm trong tên của bạn. Nó phản ánh khao khát sâu kín nhất trong tâm can, điều khiến bạn thực sự cảm thấy hạnh phúc và mãn nguyện.',
                        details: `Trái tim bạn tìm thấy sự bình an và trọn vẹn nhất khi được sống đúng với giá trị của con số ${soulUrgeVal}.`,
                        advice: 'Đừng bỏ quên những nhu cầu cảm xúc chân thật bên trong bạn giữa những bận rộn cơm áo gạo tiền thường nhật.',
                        strengths: 'Động lực nội tâm thuần khiết, trực giác cảm xúc.',
                        challenges: 'Dễ cảm thấy trống rỗng nếu công việc hiện tại không đáp ứng được lý tưởng của linh hồn.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Linh Hồn</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {soulUrgeVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Khao khát nội tâm sâu kín</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Linh Hồn →
                    </span>
                  </div>

                  {/* Personality */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ NHÂN CÁCH (PERSONALITY)',
                        title: `Số Nhân Cách ${personalityVal}: Ấn Tượng Ngoại Cảnh`,
                        value: personalityVal,
                        beginnerGuide:
                          'Số Nhân Cách được tính từ các phụ âm trong họ tên. Nó phản ánh cách người khác nhìn nhận bạn trong lần gặp đầu tiên, phong thái bên ngoài và lớp áo xã hội của bạn.',
                        details: `Bạn tạo cho người đối diện cảm giác về một con người mang năng lượng số ${personalityVal}.`,
                        advice: 'Hãy giữ cho hình ảnh bên ngoài luôn đồng điệu và chân thành với giá trị nội tâm bên trong.',
                        strengths: 'Sức hút xã hội, phong thái chuyên nghiệp.',
                        challenges: 'Tránh việc cố gồng mình tạo vỏ bọc giả tạo khiến người khác cảm thấy xa cách.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Nhân Cách</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {personalityVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Phong thái & Ấn tượng ban đầu</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Nhân Cách →
                    </span>
                  </div>

                  {/* Maturity */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ TRƯỞNG THÀNH (MATURITY)',
                        title: `Số Trưởng Thành ${maturityVal}: Vận Trình Sau 40 Tuổi`,
                        value: maturityVal,
                        beginnerGuide:
                          'Số Trưởng Thành là tổng hòa của Số Chủ Đạo và Số Sứ Mệnh. Năng lượng này sẽ thức tỉnh mạnh mẽ nhất sau độ tuổi 35–40, dẫn dắt bạn đến đỉnh cao cống hiến cuộc đời.',
                        details: `Càng nhiều tuổi, bạn sẽ càng cảm nhận rõ rệt ảnh hưởng của số ${maturityVal} trong tư duy và hành động.`,
                        advice: 'Chuẩn bị nội lực và tri thức từ tuổi trẻ để đón nhận giai đoạn hoàng kim viên mãn ở tuổi trung niên.',
                        strengths: 'Sự chín chắn, tích lũy kinh nghiệm, chiều sâu tư duy.',
                        challenges: 'Cần kiên nhẫn vượt qua những bỡ ngỡ giai đoạn chuyển giao tuổi trung niên.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Trưởng Thành</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {maturityVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Hướng đi hậu vận sau 40 tuổi</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Trưởng Thành →
                    </span>
                  </div>

                  {/* Birthday */}
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'SỐ NGÀY SINH (BIRTHDAY)',
                        title: `Số Ngày Sinh ${birthdayVal}: Món Quà Thiên Phú`,
                        value: birthdayVal,
                        beginnerGuide:
                          'Số Ngày Sinh phản ánh món quà đặc biệt hoặc năng khiếu bổ trợ mà bạn được ban tặng ngay khi chào đời để hỗ trợ cho con đường đời.',
                        details: `Năng lượng số ${birthdayVal} cung cấp cho bạn những phản xạ nhạy bén và tài lẻ trong các tình huống thực tiễn.`,
                        advice: 'Tận dụng món quà này như một công cụ đắc lực khi bắt đầu các dự án hoặc công việc mới.',
                        strengths: 'Phản ứng nhanh, tài năng bổ trợ bẩm sinh.',
                        challenges: 'Không nên ỷ lại vào năng khiếu mà quên rèn luyện kỷ luật.',
                      })
                    }
                    className="p-4 bg-surface border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-stone">Số Ngày Sinh</div>
                      <div className="text-3xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                        {birthdayVal}
                      </div>
                      <p className="text-xs font-serif text-stone line-clamp-1">Món quà năng khiếu bổ trợ</p>
                    </div>
                    <span className="text-[10px] font-mono text-accentGold group-hover:underline pt-2 border-t border-borderDark">
                      Chi tiết Ngày Sinh →
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Four Pinnacles Pyramid Mountain */}
              {(() => {
                const pinnaclesData = result?.facts?.cycles?.PINNACLES || (result?.facts?.pinnacles && result.facts.pinnacles.length >= 4 ? {
                  bases: result.facts.cycles?.bases ?? {
                    month: Number(birthDateStr.split('-')[1]) || 1,
                    day: Number(birthDateStr.split('-')[2]) || 1,
                    year: Number(birthDateStr.split('-')[0]) || 1990,
                  },
                  pinnacle1: result.facts.pinnacles[0],
                  pinnacle2: result.facts.pinnacles[1],
                  pinnacle3: result.facts.pinnacles[2],
                  pinnacle4: result.facts.pinnacles[3],
                } : null);

                if (!pinnaclesData) return null;

                return (
                  <div className="p-5 bg-surface border border-borderDark space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderDark pb-3 gap-2">
                      <div>
                        <h3 className="font-serif text-base text-parchment">
                          Bản Đồ 4 Đỉnh Cao Cuộc Đời (Kim Tự Tháp Pythagoras)
                        </h3>
                        <p className="text-xs text-stone">
                          4 cột mốc nở rộ thành tựu lớn nhất trong đời bạn. Nhấp vào đỉnh để xem chi tiết bài học.
                        </p>
                      </div>
                      <span className="text-xs font-mono text-accentGold">Chu Kỳ 27 Năm</span>
                    </div>

                    {/* SVG Pyramid */}
                    <div className="bg-background border border-borderDark p-4 overflow-x-auto flex justify-center">
                      <svg viewBox="0 0 600 240" className="w-full max-w-xl h-auto">
                        <polygon points="120,200 240,110 360,200" fill="none" stroke="#282724" strokeWidth="1.5" />
                        <polygon points="240,200 360,110 480,200" fill="none" stroke="#282724" strokeWidth="1.5" />
                        <line x1="240" y1="110" x2="360" y2="50" stroke="#3D3B35" strokeWidth="1.5" />
                        <line x1="360" y1="110" x2="360" y2="50" stroke="#3D3B35" strokeWidth="1.5" />
                        <line x1="120" y1="200" x2="360" y2="10" stroke="#BFA15F" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="480" y1="200" x2="360" y2="10" stroke="#BFA15F" strokeWidth="1.5" strokeDasharray="3 3" />

                        {/* Base nodes */}
                        <circle cx="120" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                        <text x="120" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                          {pinnaclesData.bases?.month}
                        </text>

                        <circle cx="240" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                        <text x="240" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                          {pinnaclesData.bases?.day}
                        </text>

                        <circle cx="360" cy="200" r="14" fill="#161614" stroke="#282724" strokeWidth="1.5" />
                        <text x="360" y="204" textAnchor="middle" fill="#9E9B91" fontSize="10" fontFamily="monospace">
                          {pinnaclesData.bases?.year}
                        </text>

                        {/* Peak 1 */}
                        <circle cx="240" cy="110" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="1.5" />
                        <text x="240" y="115" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                          {pinnaclesData.pinnacle1?.value}
                        </text>

                        {/* Peak 2 */}
                        <circle cx="360" cy="110" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="1.5" />
                        <text x="360" y="115" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                          {pinnaclesData.pinnacle2?.value}
                        </text>

                        {/* Peak 3 */}
                        <circle cx="360" cy="50" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="2" />
                        <text x="360" y="55" textAnchor="middle" fill="#BFA15F" fontSize="13" fontWeight="bold" fontFamily="serif">
                          {pinnaclesData.pinnacle3?.value}
                        </text>

                        {/* Peak 4 */}
                        <circle cx="360" cy="10" r="16" fill="#161614" stroke="#BFA15F" strokeWidth="2" />
                        <text x="360" y="15" textAnchor="middle" fill="#EDEAE2" fontSize="13" fontWeight="bold" fontFamily="serif">
                          {pinnaclesData.pinnacle4?.value}
                        </text>
                      </svg>
                    </div>

                    {/* 4 Peak Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        pinnaclesData.pinnacle1,
                        pinnaclesData.pinnacle2,
                        pinnaclesData.pinnacle3,
                        pinnaclesData.pinnacle4,
                      ].map((p: any) => {
                        if (!p) return null;
                        const ageDesc =
                          p.endAge === 99
                            ? `${p.startAge}t trở đi`
                            : `${p.startAge} - ${p.endAge} tuổi`;

                        const pInterp = PINNACLE_INTERPRETATIONS[p.value] ?? {
                          theme: `Đỉnh Cao Số ${p.value}`,
                          layman: `Giai đoạn đón nhận tần số rung động của số ${p.value}.`,
                          details: `Trong chu kỳ này, bạn đón nhận năng lượng của số ${p.value} để hoàn thiện bản lĩnh.`,
                          strengths: 'Cơ hội thăng tiến, mở rộng tầm ảnh hưởng.',
                          challenges: 'Cần vượt qua sức ì tâm lý và các biến động ngoại cảnh.',
                          advice: 'Kiên trì theo đuổi các mục tiêu dài hạn; tránh nôn nóng.',
                        };

                        return (
                          <div
                            key={p.pinnacleNumber}
                            onClick={() =>
                              setSelectedItem({
                                category: `ĐỈNH CAO SỐ ${p.pinnacleNumber} (${ageDesc})`,
                                title: `${pInterp.theme} (Số ${p.value})`,
                                value: p.value,
                                beginnerGuide: pInterp.layman,
                                details: pInterp.details,
                                strengths: pInterp.strengths,
                                challenges: pInterp.challenges,
                                advice: pInterp.advice,
                              })
                            }
                            className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-accentGold">Đỉnh {p.pinnacleNumber}</span>
                              <span className="text-stone">{ageDesc}</span>
                            </div>
                            <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                              {p.value}
                            </div>
                            <span className="text-[10px] font-mono text-accentGold group-hover:underline block pt-1 border-t border-borderDark">
                              Xem luận giải →
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* 3. Time Cycles & 9-Year Wave */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-borderDark pb-3 gap-2">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      Chu Kỳ 9 Năm & Năm Cá Nhân Hiện Tại
                    </h3>
                    <p className="text-xs text-stone">
                      Năm 2026 của bạn mang năng lượng Số {personalYearVal} — {personalYearInterp.theme}.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Làn Sóng Phát Triển</span>
                </div>

                {/* 9-Year Cycle visual wave */}
                <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs font-mono">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((yr) => {
                    const isCurrent = yr === personalYearVal;
                    return (
                      <div
                        key={yr}
                        className={`p-2.5 border transition-colors ${
                          isCurrent
                            ? 'bg-surfaceHover border-accentGold text-parchment font-bold'
                            : 'bg-background border-borderDark text-stone'
                        }`}
                      >
                        <div className="text-[10px] text-stone">Năm {2026 + (yr - personalYearVal)}</div>
                        <div className={`text-xl font-serif font-bold my-0.5 ${isCurrent ? 'text-accentGold' : 'text-parchment'}`}>
                          {yr}
                        </div>
                        <div className="text-[9px] truncate">
                          {yr === 1 && 'Khởi Đầu'}
                          {yr === 2 && 'Hợp Tác'}
                          {yr === 3 && 'Sáng Tạo'}
                          {yr === 4 && 'Kỷ Luật'}
                          {yr === 5 && 'Bứt Phá'}
                          {yr === 6 && 'Gia Đình'}
                          {yr === 7 && 'Trí Tuệ'}
                          {yr === 8 && 'Thu Hoạch'}
                          {yr === 9 && 'Tổng Kết'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 3 Time Cycle Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'NĂM CÁ NHÂN (PERSONAL YEAR)',
                        title: personalYearInterp.theme,
                        value: personalYearVal,
                        beginnerGuide:
                          'Năm Cá Nhân cho biết chủ đề trọng tâm và thời cơ của bạn trong năm hiện tại để bạn chủ động đón lành tránh dữ.',
                        details: personalYearInterp.meaning,
                        advice: personalYearInterp.advice,
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Năm Cá Nhân 2026</span>
                    <span className="text-xl font-serif font-bold text-accentGold block">Số {personalYearVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết năm →</span>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'THÁNG CÁ NHÂN (PERSONAL MONTH)',
                        title: `Tháng Cá Nhân Số ${personalMonthVal}`,
                        value: personalMonthVal,
                        beginnerGuide:
                          'Tháng Cá Nhân giúp bạn cân nhắc nhịp độ làm việc, quyết định chi tiêu hoặc ký kết hợp đồng trong tháng này.',
                        details: `Năng lượng tháng này chịu sự chi phối của số ${personalMonthVal}, bổ trợ cho chủ đề của Năm Cá Nhân số ${personalYearVal}.`,
                        advice: 'Giữ nhịp điệu sinh hoạt điều độ và tập trung hoàn thành các cam kết ngắn hạn.',
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Tháng Cá Nhân Hiện Tại</span>
                    <span className="text-xl font-serif font-bold text-parchment block">Số {personalMonthVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết tháng →</span>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedItem({
                        category: 'NGÀY CÁ NHÂN (PERSONAL DAY)',
                        title: `Ngày Cá Nhân Số ${personalDayVal}`,
                        value: personalDayVal,
                        beginnerGuide:
                          'Ngày Cá Nhân phản ánh tâm trạng và xu hướng tương tác xã hội của bạn trong ngày hôm nay.',
                        details: `Hôm nay mang năng lượng số ${personalDayVal}. Thích hợp cho việc điều chỉnh tâm thế và sắp xếp thứ tự ưu tiên.`,
                        advice: 'Hành động cẩn trọng, giữ tâm thế thoải mái và tích cực.',
                      })
                    }
                    className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                  >
                    <span className="text-[10px] font-mono text-stone uppercase block">Ngày Cá Nhân Hôm Nay</span>
                    <span className="text-xl font-serif font-bold text-parchment block">Số {personalDayVal}</span>
                    <span className="text-[10px] font-mono text-stone group-hover:underline block">Chi tiết ngày →</span>
                  </div>
                </div>
              </div>

              {/* 4. Karmic Debts & Karmic Lessons */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <h3 className="font-serif text-base text-parchment">
                    Khảo Cứu Nợ Nghiệp & Bài Học Linh Hồn
                  </h3>
                  <span className="text-xs font-mono text-stone">Thanh Lọc Năng Lượng</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Karmic Debts */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-accentGold uppercase tracking-wider block">
                      Chỉ Số Nợ Nghiệp (Karmic Debt)
                    </span>
                    {karmicDebts.length === 0 ? (
                      <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                        ✓ Không mang chỉ số nợ nghiệp lớn (13/4, 14/5, 16/7, 19/1). Trường năng lượng tự do phát triển.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {karmicDebts.map((kd) => (
                          <div key={kd.code} className="p-3 bg-background border border-cinnabar/60 space-y-1">
                            <span className="font-serif font-bold text-parchment block">
                              Nợ Nghiệp {kd.code}: {kd.name}
                            </span>
                            <p className="text-stone leading-relaxed text-[11px]">{kd.meaning}</p>
                            <span className="text-[11px] text-accentGold block pt-1">
                              <strong>Cách hóa giải:</strong> {kd.advice}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Karmic Lessons */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-accentGold uppercase tracking-wider block">
                      Bài Học Cần Bổ Sung (Karmic Lessons)
                    </span>
                    {karmicLessons.length === 0 ? (
                      <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                        ✓ Họ tên chứa đầy đủ các chữ số từ 1 đến 9, thể hiện bộ công cụ trải nghiệm tương đối trọn vẹn.
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {karmicLessons.map((kl) => (
                          <div key={kl.number} className="p-2.5 bg-background border border-borderDark flex items-center justify-between text-[11px]">
                            <span className="font-mono text-parchment">
                              Số {kl.number}: {kl.name}
                            </span>
                            <span className="text-[10px] font-mono text-stone">Cần rèn luyện</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Birth Chart 3x3 Grid */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      Biểu Đồ Ngày Sinh (Ma Trận 3x3)
                    </h3>
                    <p className="text-xs text-stone">
                      Sự phân bố các con số trên 3 trục: Thần Trí (3-6-9), Tâm Hồn (2-5-8), Thể Chất (1-4-7).
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Cấu Trúc Tự Nhiên</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* 3x3 Visual Matrix */}
                  <div className="md:col-span-5 flex justify-center">
                    <div className="grid grid-cols-3 gap-2 w-56 h-56 p-2 bg-background border border-borderDark">
                      {[
                        { num: 3, label: '3 (Trí Tuệ)' },
                        { num: 6, label: '6 (Sáng Tạo)' },
                        { num: 9, label: '9 (Nhân Đạo)' },
                        { num: 2, label: '2 (Tâm Hồn)' },
                        { num: 5, label: '5 (Tự Do)' },
                        { num: 8, label: '8 (Trí Tuệ)' },
                        { num: 1, label: '1 (Bản Ngã)' },
                        { num: 4, label: '4 (Kỷ Luật)' },
                        { num: 7, label: '7 (Trải Nghiệm)' },
                      ].map((cell) => {
                        const count = birthChart.matrixCounts[cell.num] || 0;
                        const hasNumber = count > 0;
                        return (
                          <div
                            key={cell.num}
                            className={`border flex flex-col items-center justify-center font-mono ${
                              hasNumber
                                ? 'bg-surface border-accentGold/70 text-parchment'
                                : 'bg-background border-borderDark text-stone/40'
                            }`}
                          >
                            <span className="text-xs text-stone/60">{cell.num}</span>
                            <span className="text-base font-bold font-serif">
                              {hasNumber ? String(cell.num).repeat(count) : '-'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Matrix Arrows Analysis */}
                  <div className="md:col-span-7 space-y-2 text-xs">
                    <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                      Các Mũi Tên Tính Cách Được Kích Hoạt:
                    </span>
                    {birthChart.arrows.length === 0 ? (
                      <p className="text-stone text-[11px] leading-relaxed">
                        Bạn không có mũi tên đầy đủ 3 con số hoặc mũi tên trống hoàn toàn. Năng lượng các con số phân bố độc lập.
                      </p>
                    ) : (
                      <div className="space-y-1.5">
                        {birthChart.arrows.map((ar, i) => (
                          <div
                            key={i}
                            className={`p-2.5 border text-[11px] space-y-0.5 ${
                              ar.type === 'strength'
                                ? 'bg-background border-accentGold/60 text-parchment'
                                : 'bg-background border-borderDark text-stone'
                            }`}
                          >
                            <div className="font-serif font-bold text-parchment">
                              {ar.name} ({ar.numbers.join('-')})
                            </div>
                            <p className="text-stone leading-relaxed">{ar.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 6. 9 Personality Trait Groups */}
              <div className="p-5 bg-surface border border-borderDark space-y-4">
                <div className="border-b border-borderDark pb-2 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base text-parchment">
                      9 Nhóm Tính Cách Bẩm Sinh
                    </h3>
                    <p className="text-xs text-stone">
                      Tỷ trọng phân bố các phẩm chất trong tính cách tự nhiên của bạn.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-accentGold">Cân Bằng Nội Tại</span>
                </div>

                <div className="space-y-3">
                  {personalityGroups.map((pg) => (
                    <div key={pg.id} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-parchment font-serif">
                          Nhóm {pg.id}: {pg.name}
                        </span>
                        <span className="text-accentGold font-bold">{pg.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-background border border-borderDark overflow-hidden">
                        <div
                          className="h-full bg-accentGold transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, pg.percentage))}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-stone leading-relaxed">{pg.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
      </div>
    </div>

      {/* POPUP / MODAL: DETAILED NUMEROLOGY INTERPRETATION */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-borderDark p-6 md:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-borderDark pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-parchment">
                  {selectedItem.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
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
                  <span>Giải Thích Thuật Ngữ Bình Dân:</span>
                </div>
                <p className="text-stone leading-relaxed text-xs">
                  {selectedItem.beginnerGuide}
                </p>
              </div>

              {/* Core Details */}
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Luận Giải Tính Cách & Năng Lực:
                </span>
                <p className="text-stone leading-relaxed whitespace-pre-line text-xs">
                  {selectedItem.details}
                </p>
              </div>

              {/* Strengths & Challenges */}
              {(selectedItem.strengths || selectedItem.challenges) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedItem.strengths && (
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        Thế Mạnh Nổi Bật
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">{selectedItem.strengths}</p>
                    </div>
                  )}
                  {selectedItem.challenges && (
                    <div className="p-3.5 bg-background border border-borderDark space-y-1">
                      <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                        Thách Thức Cần Vượt Qua
                      </span>
                      <p className="text-stone leading-relaxed text-[11px]">{selectedItem.challenges}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Actionable Advice */}
              <div className="p-4 bg-background border border-borderDark space-y-1.5">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Lời Khuyên Hành Động Thực Tế:
                </span>
                <p className="text-stone leading-relaxed text-xs">
                  {selectedItem.advice}
                </p>
              </div>

              {/* Close Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
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
