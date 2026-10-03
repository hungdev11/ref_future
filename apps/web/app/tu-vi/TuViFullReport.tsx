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
  // Collapsible state for each of the 14 sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true,
    sec5: true,
    sec6: true,
    sec7: true,
    sec8: true,
    sec9: true,
    sec10: true,
    sec11: true,
    sec12: true,
    sec13: true,
    sec14: true,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    for (let i = 1; i <= 14; i++) allOpen[`sec${i}`] = true;
    setOpenSections(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    for (let i = 1; i <= 14; i++) allClosed[`sec${i}`] = false;
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
          MỤC 14: LUẬN VẬN HẠN NĂM 2026 (BÍNH NGỌ) VÀ THÁNG HIỆN TẠI
      ======================================================== */}
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
                Mục 14 • Luận Vận Hạn Năm Hiện Tại (2026 Bính Ngọ) & Tháng Hiện Tại
              </h2>
              <p className="text-xs text-stone">
                Khảo cứu lưu niên Thái Tuế, cơ hội thăng tiến và những việc nên làm / cần tránh.
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
              Năm 2026 Bính Ngọ mang nạp âm Thiên Hà Thủy. Trong lá số của bạn, vận hạn năm nay mang lại những cơ hội bứt phá nhưng đòi hỏi sự cẩn trọng trong các quyết định tài chính và quan hệ đối ngoại.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  ✨ Những Việc Nên Làm Trong Năm 2026:
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone leading-relaxed text-[11px]">
                  <li>Tập trung củng cố kiến thức chuyên môn cốt lõi và mở rộng liên minh làm việc.</li>
                  <li>Duy trì lối sống điều độ, rèn luyện thể thao và tích đức thiện tâm.</li>
                  <li>Tận dụng các cơ hội công tác hoặc giao tế bên ngoài để nâng cao uy tín.</li>
                </ul>
              </div>

              <div className="p-4 bg-background border border-borderDark space-y-2">
                <span className="font-mono text-cinnabar text-[11px] uppercase tracking-wider block">
                  ⚠️ Những Việc Cần Tránh Trong Năm 2026:
                </span>
                <ul className="list-disc list-inside space-y-1 text-stone leading-relaxed text-[11px]">
                  <li>Tránh tham gia các canh bạc đầu tư rủi ro thiếu kiểm chứng thông tin.</li>
                  <li>Kiềm chế tính nóng giận, cẩn thận lời ăn tiếng nói trong các buổi tranh luận.</li>
                  <li>Không nên cho vay mượn tiền bạc không có cam kết rõ ràng.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
