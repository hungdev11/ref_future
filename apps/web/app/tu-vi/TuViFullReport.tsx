'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Award,
  Moon,
  Compass,
  ArrowRight,
} from 'lucide-react';
import {
  STEM_VN,
  BRANCH_VN,
  PALACE_VN,
  PALACE_INFO,
  calculateCanLuong,
  calculatePalaceScore,
  evaluateMenhCucRelation,
  STAR_DETAILED_READINGS,
  generateTuViHolisticSynthesis,
} from '@/lib/tuvi-interpretations';
import { TermTag } from '@/components/TermTag';

interface TuViFullReportProps {
  result: any;
  onSelectPalace: (palaceKey: string) => void;
  onOpenThienBan: () => void;
}

export function TuViFullReport({
  result,
  onSelectPalace,
  onOpenThienBan,
}: TuViFullReportProps) {
  // Collapsible state for each section - Default ALL CLOSED
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: false,
    sec2: false,
    sec3: false,
    sec4: false,
    sec5: false,
    sec6: false,
    sec7: false,
    sec8: false,
    sec9: false,
    sec10: false,
    sec11: false,
    sec12: false,
    sec13: false,
    sec14: false,
    sec15: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    for (let i = 1; i <= 15; i++) allOpen[`sec${i}`] = true;
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    for (let i = 1; i <= 15; i++) allClosed[`sec${i}`] = false;
    setOpenSections(allClosed);
  };

  const canLuong = calculateCanLuong(
    result.facts.yearStem,
    result.facts.yearBranch,
    result.metadata.lunarMonth,
    result.metadata.lunarDay,
    result.facts.hourBranch
  );

  const menhCuc = evaluateMenhCucRelation(
    result.metadata.cucDetail,
    result.metadata.yearNapAm?.elementVn || 'Kim'
  );

  const palaceOrder: { key: string; num: number; title: string }[] = [
    { key: 'MENH', num: 2, title: 'CUNG MỆNH (CỐT CÁCH & BẢN NGÃ)' },
    { key: 'PHU_MAU', num: 3, title: 'CUNG PHỤ MẪU (PHÚC ẤM GIA ĐÌNH)' },
    { key: 'PHUC_DUC', num: 4, title: 'CUNG PHÚC ĐỨC (TÂM HỒN & TỔ TIÊN)' },
    { key: 'DIEN_TRACH', num: 5, title: 'CUNG ĐIỀN TRẠCH (NHÀ CỬA & TÀI SẢN)' },
    { key: 'QUAN_LOC', num: 6, title: 'CUNG QUAN LỘC (SỰ NGHIỆP & CÔNG DANH)' },
    { key: 'NO_BOC', num: 7, title: 'CUNG NÔ BỘC (BẠN BÈ & QUAN HỆ XÃ GIAO)' },
    { key: 'THIEN_DI', num: 8, title: 'CUNG THIÊN DI (XUẤT NGOẠI & PHƯƠNG XA)' },
    { key: 'TAT_ACH', num: 9, title: 'CUNG TẬT ÁCH (SỨC KHỎE & THỂ TRẠNG)' },
    { key: 'TAI_BACH', num: 10, title: 'CUNG TÀI BẠCH (DÒNG TIỀN & TÀI LỘC)' },
    { key: 'TU_TUC', num: 11, title: 'CUNG TỬ TỨC (ĐƯỜNG CON CÁI)' },
    { key: 'PHU_THE', num: 12, title: 'CUNG PHU THÊ (TÌNH DUYÊN & HÔN NHÂN)' },
    { key: 'HUYNH_DE', num: 13, title: 'CUNG HUYNH ĐỆ (ANH CHỊ EM RUỘT THỊT)' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Report Global Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-surface border border-borderDark text-xs font-mono">
        <div className="flex items-center gap-2 text-stone">
          <Award className="w-4 h-4 text-accentGold" />
          <span>
            Báo Cáo Tử Vi Toàn Diện 14 Mục • Dương Lịch:{' '}
            <strong className="text-parchment">{result.metadata.solarDate}</strong>
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
          MỤC 1: TỔNG QUAN THIÊN BÀN & BÁT TỰ NGUYÊN BẢN
      ======================================================== */}
      <div className="bg-surface border border-borderDark overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('sec1')}
          className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
              01
            </span>
            <div>
              <h2 className="font-serif text-lg text-parchment font-semibold">
                Mục 1 • Tổng Quan Thiên Bàn & Bát Tự Nguyên Bản
              </h2>
              <p className="text-xs text-stone">
                Cấu trúc nạp âm ngũ hành, Cục số dung dưỡng và tương quan Âm Dương Nam Nữ.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-stone text-xs font-mono">
            <span>{openSections.sec1 ? 'Thu gọn' : 'Mở rộng'}</span>
            {openSections.sec1 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {openSections.sec1 && (
          <div className="p-5 md:p-6 space-y-5 text-xs leading-relaxed text-stone border-t border-borderDark/40">
            {/* Clickable Ledger Banner */}
            <div
              onClick={onOpenThienBan}
              className="p-4 bg-background border border-accentGold/60 hover:border-parchment transition-colors cursor-pointer group space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-accentGold uppercase tracking-wider">
                  Bát Tự Khảo Cứu (Nhấp xem giải nghĩa Thiên Bàn →)
                </span>
                <span className="text-[11px] font-mono text-accentGold underline">
                  Xem chi tiết Thiên Bàn ↗
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone font-mono">
                <div>
                  <span className="text-[10px] text-stone/60 block">NĂM SINH ÂM LỊCH</span>
                  <span className="text-sm font-serif font-bold text-parchment">
                    {STEM_VN[result.facts.yearStem]} {BRANCH_VN[result.facts.yearBranch]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone/60 block">BẢN MỆNH NẠP ÂM</span>
                  <span className="text-sm font-serif font-bold text-parchment">
                    <TermTag termKey="NAP_AM">{result.metadata.yearNapAm?.menh}</TermTag>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone/60 block">CỤC SỐ DUNG DƯỠNG</span>
                  <span className="text-sm font-serif font-bold text-parchment">
                    <TermTag termKey="CUC">{result.metadata.cucDetail}</TermTag>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone/60 block">MỆNH / THÂN CƯ</span>
                  <span className="text-sm font-serif font-bold text-accentGold">
                    Mệnh {BRANCH_VN[result.facts.menhBranch]} • Thân {BRANCH_VN[result.facts.thanBranch]}
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Tương Quan Mệnh & Cục: {menhCuc.relationVn}
                </span>
                <p className="text-stone leading-relaxed text-[11px]">{menhCuc.description}</p>
                <span className="text-[11px] text-accentGold block pt-1">
                  <strong>Khuyên dùng:</strong> {menhCuc.advice}
                </span>
              </div>

              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  <TermTag termKey="CAN_LUONG">Cân Lượng Chỉ Viên Thiện Cương: {canLuong.totalText}</TermTag>
                </span>
                <p className="text-stone italic text-[11px] leading-relaxed">"{canLuong.poem}"</p>
                <p className="text-stone text-[11px] leading-relaxed">{canLuong.meaning}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          MỤC 2 ĐẾN 13: 12 CUNG VỊ CHI TIẾT
      ======================================================== */}
      {palaceOrder.map((item) => {
        const palace = result.facts.palaces?.[item.key];
        if (!palace) return null;

        const info = PALACE_INFO[item.key] ?? {
          meaning: 'Vận trình tương ứng của đời sống',
          beginnerGuide: 'Cung này phản ánh những khía cạnh quan trọng chi phối dòng chảy số mệnh của bạn.',
          coreAdvice: 'Hành động cẩn trọng và giữ vững sự chính trực.',
          challenges: 'Cần duy trì tinh thần tỉnh táo trước những biến động bên ngoài.',
        };
        const score = calculatePalaceScore(item.key, palace);
        const mainStars = palace.stars.filter((s: any) => s.isMain);
        const subStars = palace.stars.filter((s: any) => !s.isMain);
        const secKey = `sec${item.num}`;
        const isOpen = openSections[secKey] ?? true;

        return (
          <div key={item.key} className="bg-surface border border-borderDark overflow-hidden">
            {/* Accordion Header */}
            <button
              type="button"
              onClick={() => toggleSection(secKey)}
              className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
                  {String(item.num).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-lg text-parchment font-semibold">
                      Mục {item.num} • {item.title}
                    </h2>
                    <span className="text-xs font-mono text-accentGold">
                      Cung {BRANCH_VN[palace.branch]}
                    </span>
                    {palace.isThan && (
                      <span className="px-1.5 py-0.2 border border-borderLight text-parchment text-[10px] font-mono">
                        THÂN CƯ
                      </span>
                    )}
                    {palace.isTriet && (
                      <span className="px-1.5 py-0.2 border border-cinnabar text-cinnabar text-[10px] font-mono">
                        TRIỆT
                      </span>
                    )}
                    {palace.isTuan && (
                      <span className="px-1.5 py-0.2 border border-stone text-stone text-[10px] font-mono">
                        TUẦN
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone">{info.meaning}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-stone text-xs font-mono">
                <span>{isOpen ? 'Thu gọn' : 'Mở rộng'}</span>
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {/* Accordion Content */}
            {isOpen && (
              <div className="p-5 md:p-6 space-y-5 text-xs leading-relaxed text-stone border-t border-borderDark/40">
                {/* Palace Clickable Card */}
                <div
                  onClick={() => onSelectPalace(item.key)}
                  className="p-4 bg-background border border-borderDark hover:border-accentGold transition-colors cursor-pointer group space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-borderDark pb-2">
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-parchment font-serif font-bold text-sm">
                        {PALACE_VN[item.key] ?? item.key} tại {BRANCH_VN[palace.branch]} ({STEM_VN[palace.stem]})
                      </span>
                      <span>•</span>
                      <span>Đại hạn: {palace.daiHanStartAge}-{palace.daiHanEndAge} tuổi</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-mono text-accentGold font-bold text-xs block">
                          Đánh giá: {score.score}/100 ({score.rank})
                        </span>
                        <span className="text-stone text-[10px] underline group-hover:text-accentGold transition-colors">
                          Xem popup chi tiết →
                        </span>
                      </div>
                      <div className="w-16 sm:w-24 h-1.5 bg-surface border border-borderDark/60 overflow-hidden">
                        <div
                          className="h-full bg-accentGold transition-all duration-300"
                          style={{ width: `${Math.min(100, Math.max(0, score.score))}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stars overview */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-stone uppercase">Chính Tinh:</span>
                      {mainStars.length === 0 ? (
                        <span className="text-stone italic text-[11px]">Vô Chính Diệu (mượn cung đối xung)</span>
                      ) : (
                        mainStars.map((ms: any) => (
                          <span
                            key={ms.code}
                            className="px-2 py-0.5 bg-surface border border-accentGold/60 text-parchment font-serif text-[11px] font-medium"
                          >
                            ★ {ms.name} ({ms.element})
                          </span>
                        ))
                      )}
                    </div>

                    {subStars.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-mono text-stone uppercase">Phụ Tinh:</span>
                        {subStars.map((ss: any, idx: number) => (
                          <span
                            key={idx}
                            className={`px-1.5 py-0.2 border text-[10px] font-mono ${
                              ss.code.startsWith('HOA_')
                                ? 'border-cinnabar text-cinnabar'
                                : 'border-borderDark text-stone'
                            }`}
                          >
                            {ss.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-stone leading-relaxed text-[11px]">{info.beginnerGuide}</p>
                </div>

                {/* Practical Advice & Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 bg-background border border-borderDark space-y-1">
                    <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                      Lời Khuyên Hành Động Thực Tế:
                    </span>
                    <p className="text-stone text-[11px] leading-relaxed">{info.coreAdvice}</p>
                  </div>
                  <div className="p-3.5 bg-background border border-borderDark space-y-1">
                    <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                      Nguy Cơ & Điểm Cần Phòng Ngừa:
                    </span>
                    <p className="text-stone text-[11px] leading-relaxed">{info.challenges}</p>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => onSelectPalace(item.key)}
                    className="px-4 py-1.5 bg-background border border-borderDark hover:border-accentGold text-stone hover:text-parchment font-mono text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Mở Bảng Luận Giải Chi Tiết Cung {PALACE_VN[item.key]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ========================================================
          MỤC 14: LUẬN VẬN HẠN NĂM HIỆN TẠI & THÁNG HIỆN TẠI
      ======================================================== */}
      {(() => {
        const currentYear = new Date().getFullYear();
        const stemsList = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const branchesList = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const curStem = stemsList[(currentYear - 4) % 10] || 'Bính';
        const curBranch = branchesList[(currentYear - 4) % 12] || 'Ngọ';
        const curYearName = `${curStem} ${curBranch}`;
        const synthesis = generateTuViHolisticSynthesis(result);

        return (
          <>
            <div className="bg-surface border border-borderDark overflow-hidden">
              <button
                type="button"
                onClick={() => toggleSection('sec14')}
                className="w-full p-5 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 border border-accentGold/60 flex items-center justify-center font-mono text-xs text-accentGold font-bold">
                    14
                  </span>
                  <div>
                    <h2 className="font-serif text-lg text-parchment font-semibold">
                      Mục 14 • Luận Vận Hạn Năm Hiện Tại ({currentYear} {curYearName}) & Lưu Nguyệt
                    </h2>
                    <p className="text-xs text-stone">
                      Khảo cứu lưu niên Thái Tuế, thời cơ hành động và những cạm bẫy cần phòng tránh.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-stone text-xs font-mono">
                  <span>{openSections.sec14 ? 'Thu gọn' : 'Mở rộng'}</span>
                  {openSections.sec14 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {openSections.sec14 && (
                <div className="p-5 md:p-6 space-y-4 text-xs leading-relaxed text-stone border-t border-borderDark/40">
                  <p className="text-stone leading-relaxed">
                    Năm {currentYear} ({curYearName}) kích hoạt sự vận động mạnh mẽ của trục lưu niên. Khảo cứu tương quan với bản mệnh, đây là thời điểm cần tập trung củng cố nội lực, tối ưu hóa các quy trình chuyên môn và duy trì sự kiểm soát chặt chẽ đối với dòng tiền.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 bg-background border border-borderDark space-y-2">
                      <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                        ✨ Những Việc Nên Làm Trong Năm {currentYear}:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-stone leading-relaxed text-[11px]">
                        <li>Tập trung phát huy đòn bẩy chuyên môn cốt lõi, không dàn trải sang các mảng chưa nắm vững.</li>
                        <li>Duy trì lối sống kỷ luật, chú trọng sức khỏe và kiểm soát các cam kết pháp lý.</li>
                        <li>Tận dụng các cơ hội hợp tác có tính chất minh bạch và giá trị thực tế dài hạn.</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-background border border-borderDark space-y-2">
                      <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                        ⚠️ Những Việc Cần Tránh Trong Năm {currentYear}:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-stone leading-relaxed text-[11px]">
                        <li>Tránh các quyết định đầu tư lướt sóng, mạo hiểm dựa trên cảm xúc nhất thời.</li>
                        <li>Tránh tham gia vào các tranh luận thị phi không mang lại giá trị công việc.</li>
                        <li>Không nên cho vay mượn hoặc đứng tên bảo lãnh tài chính thiếu cơ chế ràng buộc.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================
                MỤC 15: TỔNG LUẬN MÓC NỐI VẬN MỆNH & CHIẾN LƯỢC ĐỜI NGƯỜI
            ======================================================== */}
            <div className="bg-surface border-2 border-accentGold/60 overflow-hidden shadow-lg shadow-black/30">
              <button
                type="button"
                onClick={() => toggleSection('sec15')}
                className="w-full p-5 md:p-6 flex items-center justify-between bg-surface hover:bg-surfaceHover transition-colors border-b border-borderDark text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-accentGold text-background font-mono text-xs flex items-center justify-center font-bold">
                    15
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-accentGold">
                        Tổng Luận Móc Nối Toàn Diện
                      </span>
                    </div>
                    <h2 className="font-serif text-lg md:text-xl text-parchment font-semibold">
                      Mục 15 • Phân Tích Móc Nối Vận Mệnh & Bản Thiết Kế Đời Người
                    </h2>
                    <p className="text-xs text-stone">
                      Tổng hợp đa tầng: Cách Cục Mệnh Tài Quan × Trục Mệnh Thân × Tương Tác Mệnh Cục × Tứ Hóa & Tuần Triệt.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-stone text-xs font-mono">
                  <span>{openSections.sec15 ? 'Thu gọn' : 'Mở rộng'}</span>
                  {openSections.sec15 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {openSections.sec15 && (
                <div className="p-5 md:p-6 space-y-6 text-xs text-stone border-t border-borderDark/60 bg-surface/90">
                  {/* 1. Cách Cục Mệnh Tài Quan */}
                  <div className="p-4 bg-background border border-borderDark space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accentGold" />
                      <span className="font-mono text-accentGold text-xs uppercase tracking-wider font-semibold">
                        1. Khung Xương Sống: {synthesis.cachCuc.name}
                      </span>
                    </div>
                    <p className="text-parchment leading-relaxed">{synthesis.cachCuc.nature}</p>
                    <p className="text-stone leading-relaxed">{synthesis.cachCuc.description}</p>
                    <div className="pt-1 text-[11px] text-accentGold font-mono">
                      <strong>Vai Trò Cốt Lõi:</strong> {synthesis.cachCuc.coreRole}
                    </div>
                  </div>

                  {/* 2. Trục Mệnh - Thân Timeline */}
                  <div className="p-4 bg-background border border-borderDark space-y-3">
                    <span className="font-mono text-accentGold text-xs uppercase tracking-wider block font-semibold">
                      2. Lộ Trình Chuyển Dịch Tiền Vận vs Hậu Vận (Mốc Chuyển Giao: {synthesis.menhThanTimeline.transitionAge} Tuổi)
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-surface border border-borderDark/60 space-y-1">
                        <strong className="text-parchment block">Giai Đoạn Tiền Vận (Mệnh):</strong>
                        <p className="leading-relaxed">{synthesis.menhThanTimeline.menhPhase}</p>
                      </div>
                      <div className="p-3 bg-surface border border-borderDark/60 space-y-1">
                        <strong className="text-parchment block">Giai Đoạn Hậu Vận ({synthesis.menhThanTimeline.thanPalaceName}):</strong>
                        <p className="leading-relaxed">{synthesis.menhThanTimeline.thanPhase}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-stone italic border-l-2 border-accentGold/60 pl-3">
                      💡 {synthesis.menhThanTimeline.timelineAdvice}
                    </p>
                  </div>

                  {/* 3. Tương Tác Mệnh - Cục */}
                  <div className="p-4 bg-background border border-borderDark space-y-2">
                    <span className="font-mono text-accentGold text-xs uppercase tracking-wider block font-semibold">
                      3. Thiên Thời & Môi Trường: {synthesis.menhCucInteraction.relationTitle}
                    </span>
                    <p className="text-stone leading-relaxed">{synthesis.menhCucInteraction.mechanism}</p>
                    <p className="text-[11px] text-parchment font-mono">
                      <strong>Sách Lược Tương Thích:</strong> {synthesis.menhCucInteraction.strategicPost}
                    </p>
                  </div>

                  {/* 4. Tứ Hóa: Đòn Bẩy & Điểm Nghẽn Nghiệp Lực */}
                  <div className="space-y-2">
                    <span className="font-mono text-accentGold text-xs uppercase tracking-wider block font-semibold">
                      4. Tứ Hóa Tọa Thủ: Định Vị Đòn Bẩy & Bài Học Trưởng Thành
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-background border border-emerald-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-emerald-400 font-bold text-xs">✨ HÓA LỘC ({synthesis.tuHoaAxes.loc.star})</span>
                          <span className="text-[10px] font-mono text-stone">Cung {synthesis.tuHoaAxes.loc.palaceName}</span>
                        </div>
                        <p className="text-[11px] text-stone leading-relaxed">{synthesis.tuHoaAxes.loc.meaning}</p>
                      </div>

                      <div className="p-3 bg-background border border-amber-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-amber-400 font-bold text-xs">⚡ HÓA QUYỀN ({synthesis.tuHoaAxes.quyen.star})</span>
                          <span className="text-[10px] font-mono text-stone">Cung {synthesis.tuHoaAxes.quyen.palaceName}</span>
                        </div>
                        <p className="text-[11px] text-stone leading-relaxed">{synthesis.tuHoaAxes.quyen.meaning}</p>
                      </div>

                      <div className="p-3 bg-background border border-blue-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-blue-400 font-bold text-xs">🛡️ HÓA KHOA ({synthesis.tuHoaAxes.khoa.star})</span>
                          <span className="text-[10px] font-mono text-stone">Cung {synthesis.tuHoaAxes.khoa.palaceName}</span>
                        </div>
                        <p className="text-[11px] text-stone leading-relaxed">{synthesis.tuHoaAxes.khoa.meaning}</p>
                      </div>

                      <div className="p-3 bg-background border border-rose-500/30 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-rose-400 font-bold text-xs">⚠️ HÓA KỴ ({synthesis.tuHoaAxes.ky.star})</span>
                          <span className="text-[10px] font-mono text-stone">Cung {synthesis.tuHoaAxes.ky.palaceName}</span>
                        </div>
                        <p className="text-[11px] text-stone leading-relaxed">{synthesis.tuHoaAxes.ky.meaning}</p>
                      </div>
                    </div>
                  </div>

                  {/* 5. Cửa Ải Tuần Triệt */}
                  <div className="p-4 bg-background border border-borderDark space-y-1">
                    <span className="font-mono text-accentGold text-xs uppercase tracking-wider block font-semibold">
                      5. Cửa Ải Thử Thách: Tuần Không & Triệt Không
                    </span>
                    <p className="text-stone leading-relaxed text-xs">{synthesis.tuanTrietGates.analysis}</p>
                  </div>

                  {/* 6. Bản Thiết Kế Hành Động Cốt Lõi */}
                  <div className="p-4 bg-accentGold/10 border border-accentGold/40 space-y-3">
                    <span className="font-serif text-base text-parchment font-semibold block">
                      Chiến Lược Đời Người & Nguyên Tắc Bất Biến
                    </span>
                    <div className="space-y-2 text-xs leading-relaxed">
                      <p>
                        <strong className="text-accentGold">Đòn Bẩy Thành Công Số 1:</strong>{' '}
                        <span className="text-parchment">{synthesis.finalActionBlueprint.primaryLeverage}</span>
                      </p>
                      <p>
                        <strong className="text-cinnabar">Điểm Mù Cần Phòng Thủ:</strong>{' '}
                        <span className="text-parchment">{synthesis.finalActionBlueprint.criticalBlindspot}</span>
                      </p>
                      <p>
                        <strong className="text-stone">Phương Châm Dẫn Đường:</strong>{' '}
                        <span className="text-stone italic">{synthesis.finalActionBlueprint.masterPrinciple}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      })()}
    </div>
  );
}
