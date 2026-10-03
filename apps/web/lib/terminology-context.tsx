'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TermDefinition {
  key: string;
  name: string;
  discipline: 'Tử Vi' | 'Thần Số Học' | 'Chiêm Tinh' | 'Tarot' | 'Chung';
  simpleExplanation: string;
  deepExplanation?: string;
  whyItMatters: string;
  practicalAdvice?: string;
}

export const TERMINOLOGY_CATALOG: Record<string, TermDefinition> = {
  // --- TỬ VI ---
  MENH: {
    key: 'MENH',
    name: 'Cung Mệnh',
    discipline: 'Tử Vi',
    simpleExplanation: 'Là "gốc rễ" của cả cuộc đời, thể hiện bản tính bẩm sinh, tư chất, hình dáng và sức chịu đựng của bạn trước sóng gió cuộc đời.',
    whyItMatters: 'Người xưa xem Cung Mệnh là nền móng, giống như sức chịu lực của một ngôi nhà: móng có vững thì nhà mới xây cao được.',
    practicalAdvice: 'Nếu Cung Mệnh sáng sủa, hãy tự tin phát huy; nếu gặp khó khăn, hãy rèn luyện tính kiên trì và tu dưỡng đạo đức để chuyển hung thành cát.',
  },
  THAN: {
    key: 'THAN',
    name: 'Cung Thân (Thân Cư)',
    discipline: 'Tử Vi',
    simpleExplanation: 'Là "nửa sau cuộc đời" (thường sau tuổi 30 hoặc sau khi lập gia đình), cho biết bạn sẽ dồn tâm sức vào đâu và tính cách thay đổi như thế nào khi trưởng thành.',
    whyItMatters: 'Mệnh là những gì trời phú khi sinh ra, còn Thân là thành quả bạn tự tay nỗ lực gây dựng.',
    practicalAdvice: 'Xem cung Thân ngự ở đâu (Tài, Quan, Phu Thê, Phúc Đức...) để biết trọng tâm phát triển sự nghiệp và gia đạo dài hạn.',
  },
  CUC: {
    key: 'CUC',
    name: 'Cục Số (Thủy Nhị Cục, Mộc Tam Cục...)',
    discipline: 'Tử Vi',
    simpleExplanation: 'Tượng trưng cho "môi trường xã hội bên ngoài" nơi bạn đang sống và mức độ dung dưỡng của hoàn cảnh đối với bạn.',
    whyItMatters: 'So sánh ngũ hành của Cục và Mệnh: Cục sinh Mệnh thì ra đời hay gặp quý nhân, Mệnh sinh Cục thì phải chịu vất vả cống hiến cho đời.',
  },
  TUAN_TRIET: {
    key: 'TUAN_TRIET',
    name: 'Tuần Không & Triệt Không',
    discipline: 'Tử Vi',
    simpleExplanation: 'Là hai bộ sao có tính năng "phanh lại" hoặc "đảo chiều". Triệt tác động mạnh trước 30 tuổi; Tuần giữ sự ổn định bền bỉ suốt cả đời.',
    whyItMatters: 'Gặp Tuần/Triệt không hẳn là xấu: sao xấu gặp Tuần/Triệt sẽ bị cản bớt tai họa, sao tốt gặp Tuần/Triệt thì cần nỗ lực gấp đôi mới gặt hái thành công.',
    practicalAdvice: 'Không nên bi quan nếu thấy cung có Tuần hoặc Triệt, đây chính là môi trường tôi luyện bản lĩnh thép của bạn.',
  },
  TAM_HOP: {
    key: 'TAM_HOP',
    name: 'Tam Hợp Chiếu',
    discipline: 'Tử Vi',
    simpleExplanation: 'Bộ 3 cung tạo thành một tam giác tương trợ lẫn nhau (ví dụ: Mệnh - Tài Bạch - Quan Lộc luôn hợp thành một thể thống nhất).',
    whyItMatters: 'Công việc (Quan) và tiền bạc (Tài) luôn tác động trực tiếp và qua lại với chính con người bạn (Mệnh).',
  },
  XUNG_CHIEU: {
    key: 'XUNG_CHIEU',
    name: 'Xung Chiếu (Thế Đối Đứng)',
    discipline: 'Tử Vi',
    simpleExplanation: 'Hai cung đối diện nhau 180 độ trên lá số (ví dụ: Mệnh nhìn thẳng sang Thiên Di - xã hội bên ngoài).',
    whyItMatters: 'Hoàn cảnh bên ngoài tốt hay xấu sẽ phản chiếu trực tiếp vào cảm xúc và vận hội của bạn.',
  },
  NAP_AM: {
    key: 'NAP_AM',
    name: 'Lục Thập Hoa Giáp Nạp Âm',
    discipline: 'Tử Vi',
    simpleExplanation: 'Cách kết hợp Thiên Can và Địa Chi để xác định bản mệnh ngũ hành cụ thể (ví dụ: Hải Trung Kim = Vàng dưới biển, Lộ Bàng Thổ = Đất ven đường).',
    whyItMatters: 'Giúp hiểu sâu sắc tính chất mềm hay cứng, tĩnh hay động của nguyên tố ngũ hành bạn mang trong người.',
  },
  CAN_LUONG: {
    key: 'CAN_LUONG',
    name: 'Cân Lượng (Cân Xương Tính Số)',
    discipline: 'Tử Vi',
    simpleExplanation: 'Phương pháp cổ truyền cộng gộp số chỉ của năm, tháng, ngày, giờ sinh để đoán khái lược độ thanh nhàn hay vất vả của cuộc đời.',
    whyItMatters: 'Mang tính tham khảo dân gian; người lượng thấp mà có chí lớn và tích đức thì hậu vận vẫn rất giàu sang sung túc.',
  },

  // --- THẦN SỐ HỌC ---
  LIFE_PATH: {
    key: 'LIFE_PATH',
    name: 'Số Chủ Đạo (Life Path)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Con số quan trọng nhất (chiếm 60% năng lượng), được tính từ tổng ngày tháng năm sinh. Đại diện cho bài học lớn nhất và con đường bạn sinh ra để đi.',
    whyItMatters: 'Hiểu số chủ đạo giúp bạn không bị lạc lối, biết thế mạnh cốt lõi và hướng đi đúng đắn nhất trong sự nghiệp.',
    practicalAdvice: 'Luôn giữ mình ở tần số tích cực của con số chủ đạo để phát huy tối đa tiềm năng cá nhân.',
  },
  EXPRESSION: {
    key: 'EXPRESSION',
    name: 'Số Sứ Mệnh (Expression)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Được tính từ toàn bộ chữ cái trong họ tên khai sinh. Đại diện cho tài năng bẩm sinh, phương thức bạn hành động và những gì bạn có thể cống hiến cho đời.',
    whyItMatters: 'Nếu Số Chủ Đạo là "con đường", thì Số Sứ Mệnh chính là "phương tiện" giúp bạn đi trên con đường đó.',
  },
  SOUL_URGE: {
    key: 'SOUL_URGE',
    name: 'Số Linh Hồn (Soul Urge)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Được tính từ các nguyên âm (A, E, I, O, U, Y). Phản ánh khao khát sâu kín nhất trong tim, điều làm bạn thực sự cảm thấy hạnh phúc và thanh thản.',
    whyItMatters: 'Rất nhiều người thành đạt nhưng vẫn thấy trống rỗng vì họ chưa đáp ứng được tiếng gọi của Số Linh Hồn.',
  },
  PERSONALITY: {
    key: 'PERSONALITY',
    name: 'Số Nhân Cách (Personality)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Được tính từ các phụ âm trong tên. Thể hiện "lớp áo xã hội", phong thái bề ngoài và ấn tượng đầu tiên bạn để lại cho người khác.',
    whyItMatters: 'Giúp bạn điều chỉnh phong thái ứng xử phù hợp trong giao tiếp, đàm phán và xây dựng thương hiệu cá nhân.',
  },
  MATURITY: {
    key: 'MATURITY',
    name: 'Số Trưởng Thành (Maturity Number)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Tổng của Số Chủ Đạo và Số Sứ Mệnh. Năng lượng này sẽ bừng nở mạnh mẽ nhất sau độ tuổi 35–40, đưa bạn đến độ chín của cuộc đời.',
    whyItMatters: 'Chỉ ra đích đến hậu vận viên mãn và lĩnh vực bạn sẽ gặt hái thành tựu bền vững nhất.',
  },
  PERSONAL_YEAR: {
    key: 'PERSONAL_YEAR',
    name: 'Năm Cá Nhân (Personal Year)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Chu kỳ 9 năm phát triển tự nhiên (từ số 1 đến số 9). Mỗi năm mang một bài toán và năng lượng riêng biệt.',
    whyItMatters: 'Biết trước năm nào nên gieo hạt (năm 1), năm nào nên bứt phá (năm 8), năm nào nên thanh lọc nghỉ ngơi (năm 9) để thuận theo tự nhiên.',
  },
  PINNACLE: {
    key: 'PINNACLE',
    name: '4 Đỉnh Cao Kim Tự Tháp',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Bốn cột mốc thành tựu lớn nhất trong đời người kéo dài suốt 27 năm trưởng thành (mỗi đỉnh kéo dài 9 năm).',
    whyItMatters: 'Chỉ rõ thời điểm vàng để nắm bắt cơ hội, đạt được bước ngoặt sự nghiệp rực rỡ nhất.',
  },
  KARMIC_DEBT: {
    key: 'KARMIC_DEBT',
    name: 'Chỉ Số Nợ Nghiệp (13/4, 14/5, 16/7, 19/1)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Những bài học thử thách lặp đi lặp lại do thói quen cũ chưa hoàn thành. Không phải hình phạt, mà là cơ hội để bạn trui rèn và bứt phá.',
    whyItMatters: 'Nhận diện nợ nghiệp giúp bạn không còn than thân trách phận, mà chủ động sửa đổi thói quen xấu để chuyển hóa vận mệnh.',
  },
  KARMIC_LESSON: {
    key: 'KARMIC_LESSON',
    name: 'Bài Học Nghiệp Quả (Chữ số còn thiếu)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Các chữ số từ 1 đến 9 không xuất hiện trong họ tên của bạn, tượng trưng cho những kỹ năng bẩm sinh bạn chưa có sẵn.',
    whyItMatters: 'Chỉ ra những phẩm chất cần chủ động học hỏi và rèn luyện thêm trong đời sống.',
  },
  MA_TRAN_3X3: {
    key: 'MA_TRAN_3X3',
    name: 'Biểu Đồ Ngày Sinh (Ma Trận 3x3)',
    discipline: 'Thần Số Học',
    simpleExplanation: 'Bản đồ sắp xếp các con số ngày sinh theo 3 trục: Thể chất (1-4-7), Tâm hồn (2-5-8), Thần trí (3-6-9).',
    whyItMatters: 'Cho thấy cấu trúc tự nhiên bên trong: bạn thiên về hành động thực tế, cảm xúc trực giác hay tư duy trừu tượng.',
  },

  // --- CHIÊM TINH HỌC ---
  BIG_3: {
    key: 'BIG_3',
    name: 'Bộ Ba Cốt Lõi (Big 3)',
    discipline: 'Chiêm Tinh',
    simpleExplanation: 'Gồm Cung Mặt Trời (Bản ngã), Cung Mặt Trăng (Nội tâm cảm xúc), và Cung Mọc (Vỏ bọc ngoại giao).',
    whyItMatters: 'Người ta thường chỉ biết cung Mặt Trời (cung hoàng đạo thông thường), nhưng sự kết hợp cả ba mới tạo nên bức tranh chân thực nhất về bạn.',
  },
  CUNG_MOC: {
    key: 'CUNG_MOC',
    name: 'Cung Mọc (Ascendant / Rising Sign)',
    discipline: 'Chiêm Tinh',
    simpleExplanation: 'Cung hoàng đạo mọc lên ở đường chân trời phía đông đúng vào khoảnh khắc bạn cất tiếng khóc chào đời.',
    whyItMatters: 'Quyết định diện mạo bên ngoài, bản năng tự vệ ban đầu và cách bạn tiếp cận với thế giới xung quanh.',
  },
  CUNG_NHA: {
    key: 'CUNG_NHA',
    name: '12 Cung Nhà (Houses)',
    discipline: 'Chiêm Tinh',
    simpleExplanation: '12 sân khấu của cuộc đời (Nhà 1: Bản thân, Nhà 2: Tiền bạc, Nhà 7: Hôn nhân, Nhà 10: Sự nghiệp...).',
    whyItMatters: 'Các hành tinh ngụ tại nhà nào sẽ tạo ra những sự kiện cụ thể thuộc lĩnh vực đời sống đó.',
  },

  // --- TAROT ---
  TAROT_AN_CHINH: {
    key: 'TAROT_AN_CHINH',
    name: '22 Lá Ẩn Chính (Major Arcana)',
    discipline: 'Tarot',
    simpleExplanation: 'Những lá bài mang số từ 0 (The Fool) đến 21 (The World). Thể hiện những bài học linh hồn lớn, bước ngoặt định mệnh và năng lượng vĩ mô.',
    whyItMatters: 'Khi trải bài xuất hiện nhiều lá Ẩn Chính, vấn đề của bạn đang chịu tác động của những bước ngoặt lớn không thể né tránh.',
  },
  TAROT_AN_PHU: {
    key: 'TAROT_AN_PHU',
    name: '56 Lá Ẩn Phụ (Minor Arcana)',
    discipline: 'Tarot',
    simpleExplanation: 'Gồm 4 bộ (Gậy - Lửa, Ly - Nước, Kiếm - Khí, Tiền - Đất). Thể hiện những sự việc, cảm xúc và hành động diễn ra hàng ngày.',
    whyItMatters: 'Chỉ ra chi tiết cụ thể bạn nên làm gì hoặc tránh điều gì trong thực tế ngắn hạn.',
  },
  TAROT_CHIEU_NGUOC: {
    key: 'TAROT_CHIEU_NGUOC',
    name: 'Lá Bài Chiều Ngược (Reversed)',
    discipline: 'Tarot',
    simpleExplanation: 'Lá bài xuất hiện ngược chiều không có nghĩa là điềm gở, mà phản ánh năng lượng bị tắc nghẽn, sự do dự bên trong hoặc lời cảnh báo cần cẩn trọng.',
    whyItMatters: 'Giúp bạn nhìn sâu vào những nỗi sợ vô thức để tháo gỡ nút thắt tâm lý.',
  },
};

interface TerminologyContextType {
  explainTermsMode: boolean;
  toggleExplainTermsMode: () => void;
  setExplainTermsMode: (enabled: boolean) => void;
  activeTerm: TermDefinition | null;
  openTermModal: (termKey: string) => void;
  closeTermModal: () => void;
}

const TerminologyContext = createContext<TerminologyContextType>({
  explainTermsMode: true,
  toggleExplainTermsMode: () => {},
  setExplainTermsMode: () => {},
  activeTerm: null,
  openTermModal: () => {},
  closeTermModal: () => {},
});

export function TerminologyProvider({ children }: { children: React.ReactNode }) {
  const [explainTermsMode, setExplainTermsModeState] = useState<boolean>(true);
  const [activeTerm, setActiveTerm] = useState<TermDefinition | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mysticos_explain_terms_mode');
      if (saved !== null) {
        setExplainTermsModeState(saved === 'true');
      }
    } catch {
      // ignore local storage errors
    }
  }, []);

  const setExplainTermsMode = (enabled: boolean) => {
    setExplainTermsModeState(enabled);
    try {
      localStorage.setItem('mysticos_explain_terms_mode', String(enabled));
    } catch {
      // ignore
    }
  };

  const toggleExplainTermsMode = () => {
    setExplainTermsMode(!explainTermsMode);
  };

  const openTermModal = (termKey: string) => {
    const term = TERMINOLOGY_CATALOG[termKey.toUpperCase()];
    if (term) {
      setActiveTerm(term);
    }
  };

  const closeTermModal = () => {
    setActiveTerm(null);
  };

  return (
    <TerminologyContext.Provider
      value={{
        explainTermsMode,
        toggleExplainTermsMode,
        setExplainTermsMode,
        activeTerm,
        openTermModal,
        closeTermModal,
      }}
    >
      {children}
      {/* Global Term Explanation Modal */}
      {activeTerm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-surface border border-accentGold/60 p-6 md:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-borderDark pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono border border-accentGold text-accentGold uppercase">
                  {activeTerm.discipline}
                </span>
                <h3 className="font-serif text-lg text-parchment font-semibold">
                  {activeTerm.name}
                </h3>
              </div>
              <button
                onClick={closeTermModal}
                className="text-stone hover:text-parchment p-1 border border-borderDark text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-stone">
              <div className="p-3 bg-background border border-borderDark space-y-1">
                <span className="font-mono text-accentGold text-[11px] uppercase tracking-wider block">
                  Giải Thích Bình Dân (Người Mới Cần Biết)
                </span>
                <p className="text-parchment">{activeTerm.simpleExplanation}</p>
              </div>

              <div className="space-y-1">
                <span className="font-mono text-stone text-[11px] uppercase tracking-wider block">
                  Tại Sao Chỉ Số / Thuật Ngữ Này Quan Trọng?
                </span>
                <p className="text-stone">{activeTerm.whyItMatters}</p>
              </div>

              {activeTerm.practicalAdvice && (
                <div className="p-3 bg-background border border-borderLight/40 text-[11px] space-y-1">
                  <span className="font-mono text-accentGold uppercase block">Lời Khuyên Thực Tế:</span>
                  <p className="text-parchment">{activeTerm.practicalAdvice}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={closeTermModal}
                className="px-4 py-1.5 bg-accentGold text-background font-mono text-xs font-bold hover:bg-parchment transition-colors"
              >
                Đã Hiểu & Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}
    </TerminologyContext.Provider>
  );
}

export function useTerminology() {
  return useContext(TerminologyContext);
}
