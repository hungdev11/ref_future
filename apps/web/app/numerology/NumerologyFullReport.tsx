'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Star,
  Compass,
  Heart,
  Briefcase,
  Grid,
  ShieldAlert,
  Sparkles,
  Award,
  CheckCircle,
} from 'lucide-react';
import {
  PERSONAL_YEAR_ASPECTS,
  calculateHollandCareerMatch,
  LIFE_PATH_EXTENDED_INFO,
  calculateBirthChart,
  detectKarmicDebts,
  detectMissingKarmicLessons,
  calculateAttitudeNumber,
  ATTITUDE_INTERPRETATIONS,
  evaluateLifePathExpressionHarmony,
  evaluateLifePathSoulHarmony,
} from '@/lib/numerology-interpretations';
import { TermTag } from '@/components/TermTag';

interface NumerologyFullReportProps {
  result: any;
  lifePathVal: number;
  expressionVal: number;
  soulUrgeVal: number;
  personalityVal: number;
  maturityVal: number;
  personalYearVal: number;
  birthDateStr: string;
  fullNameStr: string;
  lifePathInterp: any;
  personalYearInterp: any;
  onSelectItem: (item: {
    category: string;
    title: string;
    value: string | number;
    beginnerGuide: string;
    details: string;
    advice: string;
    strengths?: string;
    challenges?: string;
  }) => void;
}

export function NumerologyFullReport({
  result,
  lifePathVal,
  expressionVal,
  soulUrgeVal,
  personalityVal,
  maturityVal,
  personalYearVal,
  birthDateStr,
  fullNameStr,
  lifePathInterp,
  personalYearInterp,
  onSelectItem,
}: NumerologyFullReportProps) {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    secA: true,
    secB: true,
    secC: true,
    secD: true,
    secE: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setOpenSections({ secA: true, secB: true, secC: true, secD: true, secE: true });
  };

  const collapseAll = () => {
    setOpenSections({ secA: false, secB: false, secC: false, secD: false, secE: false });
  };

  const birthChart = calculateBirthChart(birthDateStr);
  const karmicDebts = detectKarmicDebts(birthDateStr, lifePathVal);
  const karmicLessons = detectMissingKarmicLessons(fullNameStr);
  const hollandMatch = calculateHollandCareerMatch(lifePathVal, expressionVal, soulUrgeVal);
  const lifePathExtended = LIFE_PATH_EXTENDED_INFO[lifePathVal] || {
    celebrities: ['Albert Einstein', 'Leonardo da Vinci', 'Isaac Newton'],
    compatibleNumbers: [{ num: 3, reason: 'Mang lại sự sáng tạo và niềm vui.' }],
    incompatibleNumbers: [{ num: 1, reason: 'Dễ nảy sinh cạnh tranh cái tôi.' }],
    loveStyle: 'Chân thành, sâu sắc và tôn trọng tự do của đối phương.',
    cycle1Title: 'Gieo Hạt Bản Lĩnh',
    cycle1Meaning: 'Rèn luyện nội lực và tích lũy kiến thức thực tế.',
    cycle2Title: 'Khẳng Định Vị Thế',
    cycle2Meaning: 'Đạt được thành tựu và vị trí chuyên môn vững vàng.',
    cycle3Title: 'Viên Mãn Cống Hiến',
    cycle3Meaning: 'Truyền cảm hứng và phụng sự cộng đồng.',
  };

  const attitudeNum = calculateAttitudeNumber(birthDateStr);
  const attitudeInterp = ATTITUDE_INTERPRETATIONS[attitudeNum] || {
    title: `Thái Độ Số ${attitudeNum}`,
    meaning: 'Cách bạn phản ứng tự nhiên với những biến cố bất ngờ.',
    advice: 'Bình tâm và giữ vững sự sáng suốt trong mọi tình huống.',
  };

  const expressionHarmony = evaluateLifePathExpressionHarmony(lifePathVal, expressionVal);
  const soulHarmony = evaluateLifePathSoulHarmony(lifePathVal, soulUrgeVal);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Report Global Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface border border-borderDark text-xs font-mono">
        <div className="flex items-center gap-2 text-stone">
          <Award className="w-4 h-4 text-accentGold" />
          <span>
            Báo Cáo Toàn Diện 5 Phần • Dành cho{' '}
            <strong className="text-parchment">{fullNameStr}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-stone">Thao tác nhanh:</span>
          <button
            type="button"
            onClick={expandAll}
            className="text-[11px] text-accentGold hover:underline"
          >
            Mở rộng tất cả
          </button>
          <span className="text-stone/40">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[11px] text-stone hover:text-parchment hover:underline"
          >
            Thu gọn tất cả
          </button>
        </div>
      </div>

      {/* ========================================================
          PHẦN A: TỔNG QUAN VẬN SỐ & XU HƯỚNG TƯƠNG LAI
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleSection('secA')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              A
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Phần A • Tổng Quan Vận Số, Chu Kỳ 9 Năm & 4 Đỉnh Cao Đời Người
              </h2>
              <p className="text-xs text-stone">
                Khảo cứu quỹ đạo hình sin 9 năm và các cột mốc thu hoạch thành tựu Pythagoras.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.secA ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.secA ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Accordion Content */}
        {openSections.secA && (
          <div className="p-5 md:p-6 space-y-6 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            {/* 1. Chu Kỳ 9 Năm */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-borderDark pb-2">
                <div className="flex items-center gap-2 font-mono text-accentGold text-[11px] uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>
                    1. Chu Kỳ 9 Năm: Bạn Đang Ở{' '}
                    <TermTag termKey="PERSONAL_YEAR">Năm Cá Nhân Số {personalYearVal}</TermTag>
                  </span>
                </div>
                <span className="text-[10px] text-stone">Nhấp vào từng năm để xem chi tiết →</span>
              </div>
              <p className="text-stone">
                Theo Pythagoras, vận số đời người lặp lại mỗi 9 năm như một làn sóng hình sin. Đoạn biểu đồ đi lên là lúc bứt phá, mở rộng; đoạn đi xuống là lúc nên tập trung củng cố nội lực và chiêm nghiệm sâu sắc.
              </p>

              {/* Year Wave Cards */}
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((yr) => {
                  const isCurrent = yr === personalYearVal;
                  const yrInterp = PERSONAL_YEAR_ASPECTS[yr] ?? {
                    theme: `Năm ${yr}`,
                    career: 'Phát triển chuyên môn.',
                    finance: 'Cân bằng tài chính.',
                    love: 'Gắn kết gia đình.',
                    learning: 'Học hỏi và rèn luyện nội tâm.',
                  };

                  return (
                    <div
                      key={yr}
                      onClick={() =>
                        onSelectItem({
                          category: `CHU KỲ 9 NĂM (NĂM ${2026 + (yr - personalYearVal)})`,
                          title: `Năm Cá Nhân Số ${yr}: ${yrInterp.theme}`,
                          value: yr,
                          beginnerGuide:
                            'Năm Cá Nhân cho biết trọng tâm vũ trụ khuyến khích bạn tập trung vào trong năm đó.',
                          details: `Năm số ${yr} mang năng lượng: ${yrInterp.theme}.\n• Sự nghiệp: ${yrInterp.career}\n• Tài chính: ${yrInterp.finance}\n• Tình cảm: ${yrInterp.love}\n• Học hỏi & Tâm trí: ${yrInterp.learning}`,
                          advice: 'Thuận theo dòng chảy năng lượng của năm để không bị tiêu hao thể lực vô ích.',
                        })
                      }
                      className={`p-3 border transition-colors cursor-pointer group ${
                        isCurrent
                          ? 'bg-surface border-accentGold text-parchment'
                          : 'bg-background border-borderDark text-stone hover:border-stone'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-stone">
                        Năm {2026 + (yr - personalYearVal)}
                      </div>
                      <div
                        className={`text-2xl font-serif font-bold my-1 ${
                          isCurrent ? 'text-accentGold' : 'text-parchment'
                        }`}
                      >
                        {yr}
                      </div>
                      <div className="text-[10px] line-clamp-1">
                        {yr === 1 && 'Khởi Đầu'}
                        {yr === 2 && 'Hợp Tác'}
                        {yr === 3 && 'Sáng Tạo'}
                        {yr === 4 && 'Kỷ Luật'}
                        {yr === 5 && 'Bứt Phá'}
                        {yr === 6 && 'Gia Đình'}
                        {yr === 7 && 'Trí Tuệ'}
                        {yr === 8 && 'Thành Quả'}
                        {yr === 9 && 'Tổng Kết'}
                      </div>
                      {isCurrent && (
                        <span className="inline-block mt-1 px-1.5 py-0.2 bg-accentGold text-background text-[9px] font-bold font-mono">
                          HIỆN TẠI
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Bốn Đỉnh Cao Kim Tự Tháp */}
            {result.facts.cycles?.PINNACLES && (
              <div className="space-y-3 pt-3 border-t border-borderDark">
                <div className="flex items-center justify-between border-b border-borderDark pb-2">
                  <div className="font-mono text-accentGold text-[11px] uppercase tracking-wider">
                    2. <TermTag termKey="PINNACLE">Bản Đồ 4 Đỉnh Cao Cuộc Đời (Chu Kỳ 27 Năm)</TermTag>
                  </div>
                  <span className="text-[10px] text-stone">Nhấp vào từng đỉnh để xem chi tiết →</span>
                </div>
                <p className="text-stone">
                  Bốn đỉnh cao kim tự tháp đại diện cho 4 giai đoạn chín muồi thành tựu lớn nhất trong đời người (mỗi đỉnh kéo dài 9 năm).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    result.facts.cycles.PINNACLES.pinnacle1,
                    result.facts.cycles.PINNACLES.pinnacle2,
                    result.facts.cycles.PINNACLES.pinnacle3,
                    result.facts.cycles.PINNACLES.pinnacle4,
                  ].map((p: any) => {
                    if (!p) return null;
                    const ageDesc =
                      p.endAge === 99
                        ? `${p.startAge}t trở đi`
                        : `${p.startAge} - ${p.endAge} tuổi`;

                    return (
                      <div
                        key={p.pinnacleNumber}
                        onClick={() =>
                          onSelectItem({
                            category: `ĐỈNH CAO SỐ ${p.pinnacleNumber} (${ageDesc})`,
                            title: `Đỉnh Cao Số ${p.value}: Cột Mốc Thành Tựu`,
                            value: p.value,
                            beginnerGuide:
                              'Mỗi đỉnh cao kéo dài khoảng 9 năm, mang lại những cơ hội và bài học đặc thù để hoàn thiện nhân cách và tích lũy thành quả.',
                            details: `Trong giai đoạn này, bạn đón nhận tần số rung động của số ${p.value}. Đây là lúc vũ trụ tạo điều kiện cho bạn tỏa sáng ở lĩnh vực này.`,
                            advice: 'Kiên trì theo đuổi các mục tiêu dài hạn; tránh nôn nóng bỏ dở giữa chừng.',
                            strengths: 'Cơ hội thăng tiến, mở rộng tầm ảnh hưởng.',
                            challenges: 'Cần vượt qua sức ì tâm lý và các biến động ngoại cảnh.',
                          })
                        }
                        className="p-3.5 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-stone">Đỉnh {p.pinnacleNumber}</span>
                          <span className="text-accentGold">{ageDesc}</span>
                        </div>
                        <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                          Số {p.value}
                        </div>
                        <p className="text-[11px] text-stone">Nhấp xem luận giải chi tiết →</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          PHẦN B: PHÂN TÍCH ĐƯỜNG ĐỜI (SỐ CHỦ ĐẠO)
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleSection('secB')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              B
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Phần B • Con Đường Đời (Số Chủ Đạo) & 3 Chu Kỳ Vận Mệnh
              </h2>
              <p className="text-xs text-stone">
                Phân tích chuyên sâu con số quan trọng nhất (chiếm 60% năng lượng cuộc đời).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.secB ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.secB ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {openSections.secB && (
          <div className="p-5 md:p-6 space-y-6 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            {/* Clickable Life Path Banner */}
            <div
              onClick={() =>
                onSelectItem({
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
              className="p-5 bg-background border border-accentGold/80 hover:border-parchment transition-colors cursor-pointer group space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone uppercase block">
                    <TermTag termKey="LIFE_PATH">Chỉ Số Đường Đời Cốt Lõi</TermTag>
                  </span>
                  <h3 className="text-xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                    Số Chủ Đạo {lifePathVal}: {lifePathInterp.title}
                  </h3>
                </div>
                <div className="text-4xl font-serif font-bold text-accentGold">{lifePathVal}</div>
              </div>
              <p className="text-stone leading-relaxed">{lifePathInterp.layman}</p>
              <span className="text-[11px] font-mono text-accentGold underline block">
                Nhấp xem toàn bộ chi tiết phân tích, điểm mạnh, thách thức và lời khuyên →
              </span>
            </div>

            {/* 3 Giai Đoạn Vận Mệnh */}
            <div className="space-y-3 pt-2 border-t border-borderDark">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                Ba Giai Đoạn Trưởng Thành Đời Người:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 bg-background border border-borderDark space-y-1">
                  <span className="text-[10px] font-mono text-stone block">Giai đoạn 1 (Thuở Nhỏ - 27 tuổi)</span>
                  <span className="font-serif font-bold text-parchment block">{lifePathExtended.cycle1Title}</span>
                  <p className="text-[11px] text-stone leading-relaxed">{lifePathExtended.cycle1Meaning}</p>
                </div>
                <div className="p-4 bg-background border border-borderDark space-y-1">
                  <span className="text-[10px] font-mono text-accentGold block">Giai đoạn 2 (28 - 54 tuổi)</span>
                  <span className="font-serif font-bold text-parchment block">{lifePathExtended.cycle2Title}</span>
                  <p className="text-[11px] text-stone leading-relaxed">{lifePathExtended.cycle2Meaning}</p>
                </div>
                <div className="p-4 bg-background border border-borderDark space-y-1">
                  <span className="text-[10px] font-mono text-stone block">Giai đoạn 3 (Sau 55 tuổi)</span>
                  <span className="font-serif font-bold text-parchment block">{lifePathExtended.cycle3Title}</span>
                  <p className="text-[11px] text-stone leading-relaxed">{lifePathExtended.cycle3Meaning}</p>
                </div>
              </div>
            </div>

            {/* Tương Hợp & Danh Nhân */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-borderDark">
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Cặp Số Hòa Hợp & Cần Nhường Nhịn:
                </span>
                <div className="space-y-1.5 text-[11px]">
                  {lifePathExtended.compatibleNumbers.map((c) => (
                    <div key={c.num} className="text-stone">
                      ✓ <strong className="text-parchment">Hợp Số {c.num}:</strong> {c.reason}
                    </div>
                  ))}
                  {lifePathExtended.incompatibleNumbers.map((c) => (
                    <div key={c.num} className="text-stone">
                      ⚠ <strong className="text-cinnabar">Cần nhường nhịn Số {c.num}:</strong> {c.reason}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Danh Nhân Thế Giới Cùng Số Chủ Đạo:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {lifePathExtended.celebrities.map((celeb, idx) => (
                    <span key={idx} className="px-2 py-1 bg-surface border border-borderDark text-[11px] text-stone">
                      {celeb}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          PHẦN C: PHÂN TÍCH SỨ MỆNH & NĂNG LƯỢNG NỘI TÂM
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleSection('secC')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              C
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Phần C • Sứ Mệnh Cuộc Đời & Căn Cốt Tâm Linh
              </h2>
              <p className="text-xs text-stone">
                Khám phá Số Sứ Mệnh, Số Linh Hồn, Số Nhân Cách và Số Trưởng Thành sau tuổi 40.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.secC ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.secC ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {openSections.secC && (
          <div className="p-5 md:p-6 space-y-6 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {/* Expression */}
              <div
                onClick={() =>
                  onSelectItem({
                    category: 'SỐ SỨ MỆNH (EXPRESSION)',
                    title: `Số Sứ Mệnh ${expressionVal}: Năng Lực Bẩm Sinh`,
                    value: expressionVal,
                    beginnerGuide:
                      'Số Sứ Mệnh được tính từ tất cả chữ cái trong họ và tên. Nó đại diện cho tài năng thiên bẩm, phương thức bạn hành động và những gì bạn có thể đóng góp cho đời.',
                    details: `Với số Sứ Mệnh ${expressionVal}, bạn mang năng lượng tự nhiên để hiện thực hóa các mục tiêu đời sống qua phong thái hành sự đặc thù.`,
                    advice: 'Hãy phát huy tối đa sở trường của mình vào các công việc bạn yêu thích thay vì chạy theo khuôn mẫu của người khác.',
                  })
                }
                className="p-4 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="text-[10px] font-mono text-stone">
                  <TermTag termKey="EXPRESSION">Số Sứ Mệnh</TermTag>
                </div>
                <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                  {expressionVal}
                </div>
                <p className="text-[11px] text-stone">Tài năng & Năng lực hành động →</p>
              </div>

              {/* Soul Urge */}
              <div
                onClick={() =>
                  onSelectItem({
                    category: 'SỐ LINH HỒN (SOUL URGE)',
                    title: `Số Linh Hồn ${soulUrgeVal}: Tiếng Nói Nội Tâm`,
                    value: soulUrgeVal,
                    beginnerGuide:
                      'Số Linh Hồn được tính từ các nguyên âm trong tên của bạn. Nó phản ánh khao khát sâu kín nhất trong tâm can, điều khiến bạn thực sự cảm thấy hạnh phúc và mãn nguyện.',
                    details: `Trái tim bạn tìm thấy sự bình an và trọn vẹn nhất khi được sống đúng với giá trị của con số ${soulUrgeVal}.`,
                    advice: 'Đừng bỏ quên những nhu cầu cảm xúc chân thật bên trong bạn giữa những bận rộn cơm áo gạo tiền thường nhật.',
                  })
                }
                className="p-4 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="text-[10px] font-mono text-stone">
                  <TermTag termKey="SOUL_URGE">Số Linh Hồn</TermTag>
                </div>
                <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                  {soulUrgeVal}
                </div>
                <p className="text-[11px] text-stone">Khao khát sâu kín trong tim →</p>
              </div>

              {/* Personality */}
              <div
                onClick={() =>
                  onSelectItem({
                    category: 'SỐ NHÂN CÁCH (PERSONALITY)',
                    title: `Số Nhân Cách ${personalityVal}: Lớp Áo Xã Hội`,
                    value: personalityVal,
                    beginnerGuide:
                      'Số Nhân Cách được tính từ các phụ âm trong họ tên. Nó phản ánh cách người khác nhìn nhận bạn trong lần gặp đầu tiên, phong thái bên ngoài và lớp áo xã hội của bạn.',
                    details: `Bạn tạo cho người đối diện cảm giác về một con người mang năng lượng số ${personalityVal}.`,
                    advice: 'Hãy giữ cho hình ảnh bên ngoài luôn đồng điệu và chân thành với giá trị nội tâm bên trong.',
                  })
                }
                className="p-4 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="text-[10px] font-mono text-stone">
                  <TermTag termKey="PERSONALITY">Số Nhân Cách</TermTag>
                </div>
                <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                  {personalityVal}
                </div>
                <p className="text-[11px] text-stone">Ấn tượng ngoại giao ban đầu →</p>
              </div>

              {/* Maturity */}
              <div
                onClick={() =>
                  onSelectItem({
                    category: 'SỐ TRƯỞNG THÀNH (MATURITY)',
                    title: `Số Trưởng Thành ${maturityVal}: Vận Mệnh Sau 40 Tuổi`,
                    value: maturityVal,
                    beginnerGuide:
                      'Số Trưởng Thành là tổng hòa của Số Chủ Đạo và Số Sứ Mệnh. Năng lượng này sẽ thức tỉnh mạnh mẽ nhất sau độ tuổi 35–40, dẫn dắt bạn đến đỉnh cao cống hiến cuộc đời.',
                    details: `Càng nhiều tuổi, bạn sẽ càng cảm nhận rõ rệt ảnh hưởng của số ${maturityVal} trong tư duy và hành động.`,
                    advice: 'Hãy bắt đầu chuẩn bị hành trang chuyên môn và vốn sống để đón nhận sứ mệnh lớn sau tuổi 40.',
                  })
                }
                className="p-4 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1.5"
              >
                <div className="text-[10px] font-mono text-stone">
                  <TermTag termKey="MATURITY">Số Trưởng Thành</TermTag>
                </div>
                <div className="text-2xl font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                  {maturityVal}
                </div>
                <p className="text-[11px] text-stone">Vận trình nở rộ hậu vận →</p>
              </div>
            </div>

            {/* Đánh Giá Hòa Hợp */}
            <div className="p-4 bg-background border border-borderDark space-y-3">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                Đánh Giá Sự Hòa Hợp Giữa Bản Mệnh & Hành Động:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="space-y-1">
                  <strong className="text-parchment">Đường Đời & Sứ Mệnh:</strong>
                  <p className="text-stone leading-relaxed">{expressionHarmony.description}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-parchment">Đường Đời & Linh Hồn:</strong>
                  <p className="text-stone leading-relaxed">{soulHarmony.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          PHẦN D: BẢN ĐỒ NĂNG LỰC & MA TRẬN 3X3 NGÀY SINH
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleSection('secD')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              D
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Phần D • Bản Đồ Năng Lực, Ma Trận 3x3 Ngày Sinh & Nhóm Nghề Holland
              </h2>
              <p className="text-xs text-stone">
                Khảo cứu cấu trúc 3 trục Thể chất - Tâm hồn - Thần trí và các mũi tên cá tính.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.secD ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.secD ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {openSections.secD && (
          <div className="p-5 md:p-6 space-y-6 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* 3x3 Matrix Grid */}
              <div className="md:col-span-5 flex justify-center">
                <div className="grid grid-cols-3 gap-2 w-56 h-56 p-2 bg-background border border-borderDark">
                  {[
                    { num: 3, label: 'Trí Tuệ' },
                    { num: 6, label: 'Sáng Tạo' },
                    { num: 9, label: 'Nhân Đạo' },
                    { num: 2, label: 'Tâm Hồn' },
                    { num: 5, label: 'Tự Do' },
                    { num: 8, label: 'Trí Tuệ' },
                    { num: 1, label: 'Bản Ngã' },
                    { num: 4, label: 'Kỷ Luật' },
                    { num: 7, label: 'Trải Nghiệm' },
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
              <div className="md:col-span-7 space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Các Mũi Tên Tính Cách Được Kích Hoạt:
                </span>
                {birthChart.arrows.length === 0 ? (
                  <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                    Các con số phân bố độc lập, tính cách đa chiều và linh hoạt điều chỉnh theo hoàn cảnh.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {birthChart.arrows.map((ar, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          onSelectItem({
                            category: 'MŨI TÊN TÍNH CÁCH (PYTHAGORAS)',
                            title: ar.title,
                            value: ar.numbers.join('-'),
                            beginnerGuide:
                              'Mũi tên được hình thành khi 3 con số trên cùng một hàng ngang, dọc hoặc chéo xuất hiện đồng thời (hoặc cùng vắng mặt).',
                            details: ar.description,
                            advice: ar.advice,
                          })
                        }
                        className="p-3 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-1"
                      >
                        <div className="flex items-center justify-between font-mono text-[11px]">
                          <span className="font-serif font-bold text-parchment group-hover:text-accentGold transition-colors">
                            {ar.title}
                          </span>
                          <span
                            className={
                              ar.type === 'strength' ? 'text-accentGold' : 'text-stone'
                            }
                          >
                            {ar.type === 'strength' ? '★ Mũi Tên Sức Mạnh' : '○ Mũi Tên Trống'}
                          </span>
                        </div>
                        <p className="text-stone leading-relaxed text-[11px]">{ar.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Holland Career Recommendations */}
            <div className="space-y-3 pt-3 border-t border-borderDark">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                Định Hướng Nghề Nghiệp Phù Hợp Tần Số Năng Lượng (Holland):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-background border border-borderDark space-y-2">
                  <strong className="text-parchment block">Nhóm Ngành Phù Hợp Nhất:</strong>
                  <ul className="list-disc list-inside space-y-1 text-stone">
                    {hollandMatch.topGroups.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-background border border-borderDark space-y-2">
                  <strong className="text-parchment block">Các Công Việc Kiến Nghị:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {hollandMatch.recommendedCareers.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-surface border border-borderDark text-[11px] text-stone">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          PHẦN E: KHẢO CỨU NỢ NGHIỆP & LỜI KHUYÊN HÀNH ĐỘNG
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        {/* Accordion Header */}
        <button
          type="button"
          onClick={() => toggleSection('secE')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              E
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Phần E • Khảo Cứu Nợ Nghiệp, Bài Học Nghiệp Quả & Lời Khuyên Hành Động
              </h2>
              <p className="text-xs text-stone">
                Thanh lọc các bài học thử thách và kế hoạch hành động 3 bước chuyển hóa số mệnh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.secE ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.secE ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {openSections.secE && (
          <div className="p-5 md:p-6 space-y-6 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            {/* Karmic Debts */}
            <div className="space-y-3">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                <TermTag termKey="KARMIC_DEBT">Chỉ Số Nợ Nghiệp (Karmic Debt 13/4, 14/5, 16/7, 19/1):</TermTag>
              </span>
              {karmicDebts.length === 0 ? (
                <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                  ✓ Bạn không mang chỉ số nợ nghiệp lớn. Trường năng lượng tự do phát triển theo ý chí tự lập.
                </div>
              ) : (
                <div className="space-y-2">
                  {karmicDebts.map((kd) => (
                    <div
                      key={kd.code}
                      onClick={() =>
                        onSelectItem({
                          category: 'CHỈ SỐ NỢ NGHIỆP',
                          title: `Nợ Nghiệp ${kd.code}: ${kd.name}`,
                          value: kd.code,
                          beginnerGuide:
                            'Nợ nghiệp không phải là hình phạt, mà là bài học cũ cần được bạn chú tâm giải quyết rốt ráo trong đời này.',
                          details: kd.meaning,
                          advice: kd.advice,
                        })
                      }
                      className="p-3 bg-background border border-cinnabar/60 hover:border-cinnabar transition-colors cursor-pointer group space-y-1"
                    >
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
            <div className="space-y-3 pt-2 border-t border-borderDark">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                <TermTag termKey="KARMIC_LESSON">Bài Học Nghiệp Quả Cần Bổ Sung (Karmic Lessons):</TermTag>
              </span>
              {karmicLessons.length === 0 ? (
                <div className="p-3 bg-background border border-borderDark text-stone text-[11px]">
                  ✓ Họ tên chứa đầy đủ các chữ số từ 1 đến 9, thể hiện bộ công cụ trải nghiệm phong phú.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {karmicLessons.map((kl) => (
                    <div key={kl.number} className="p-2.5 bg-background border border-borderDark space-y-0.5">
                      <span className="font-mono text-parchment font-semibold block">
                        Thiếu Số {kl.number}: {kl.name}
                      </span>
                      <span className="text-[10px] text-stone">Phẩm chất cần chủ động rèn luyện trong công việc.</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3-Step Action Plan */}
            <div className="p-4 bg-background border border-borderDark space-y-3 pt-3">
              <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                Kế Hoạch Hành Động 3 Bước Chuyển Hóa Số Mệnh:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 bg-surface border border-borderDark space-y-1">
                  <strong className="text-parchment block">1. Nhận Thức Bản Thân</strong>
                  <p className="text-stone">
                    Sống đúng với tần số tích cực của Số Chủ Đạo {lifePathVal}, không tự ti và không gượng ép bản thân theo khuôn mẫu người khác.
                  </p>
                </div>
                <div className="p-3 bg-surface border border-borderDark space-y-1">
                  <strong className="text-parchment block">2. Thuận Theo Chu Kỳ</strong>
                  <p className="text-stone">
                    Tận dụng năng lượng Năm Cá Nhân Số {personalYearVal} để sắp xếp mục tiêu trọng tâm; biết lúc nào nên tiến và lúc nào nên dưỡng sức.
                  </p>
                </div>
                <div className="p-3 bg-surface border border-borderDark space-y-1">
                  <strong className="text-parchment block">3. Tích Phước Cải Mệnh</strong>
                  <p className="text-stone">
                    Dùng tài năng của Số Sứ Mệnh {expressionVal} để phụng sự xã hội. Lòng nhân hậu và sự chính trực là chiếc chìa khóa vạn năng vượt qua mọi thử thách.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
