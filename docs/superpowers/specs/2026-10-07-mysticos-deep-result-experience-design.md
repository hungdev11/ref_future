# Tái Thiết Trải Nghiệm Khảo Cứu Sâu Mysticos: User Intent × Depth Reasoning × Domain Result Grammar

- **Date**: 2026-10-07
- **Status**: Approved
- **Reference**: `prompt/master_result_experience.md`, `docs/design.md`, `docs/ui.md`, `AGENTS.md`, `prompt/design_rule.md`

---

## 1. Mục Tiêu & Triết Lý Cốt Lõi

Khắc phục triệt để vấn đề "kết quả ngắn, đồng dạng, khuôn mẫu" bằng việc xây dựng trải nghiệm khảo cứu sâu mang tính cá nhân hóa cao:
1. **"Result không được có một template duy nhất"**: Mỗi domain (Tarot, Tử Vi, Chiêm Tinh, Thần Số Học, Độ Tương Hợp) sở hữu cấu trúc ngữ pháp kết quả (Result Grammar) riêng biệt.
2. **"Không làm kết quả dài đều giả tạo — làm sâu tầng lý luận"**: Áp dụng `ResultDepthEngine` phân tầng từ DEPTH 1 (súc tích) đến DEPTH 5 (phân tích sâu toàn diện + bối cảnh + kịch bản + phản ứng). Điểm trọng tâm phân tích sâu, điểm phụ ngắn gọn.
3. **"Main Story không hardcode"**: Tự động tổng hợp cốt truyện trung tâm xuyên suốt từ sự hội tụ của dữ kiện, ngữ nghĩa, góc hợp và bối cảnh câu hỏi.
4. **"Phản ứng linh hoạt với câu hỏi (Question-Reactive)"**: Cùng một trải bài nhưng câu hỏi khác nhau sẽ bẻ hướng trọng số phân tích và cấu trúc câu trả lời khác nhau.
5. **"Kịch bản đời sống thực tế (Real-Life Scenarios)"**: Thay vì lời khuyên chung chung, sinh kịch bản cụ thể: *Khi tranh luận*, *Khi quyết định tài chính*, *Khi công việc biến động*, *Khi cần không gian riêng*.
6. **"Dẫn dắt tự nhiên & Câu hỏi tiếp theo (Next Question Engine)"**: Đề xuất câu hỏi khám phá tiếp theo ăn khớp với điểm nghẽn của quẻ/lá số.

---

## 2. Mô Hình Dữ Liệu `DeepMysticosResult` (`@mystic/core/src/types/result.ts`)

Mở rộng hợp đồng chuẩn của hệ thống:

```ts
export type ResultDepth = 'DEPTH_1' | 'DEPTH_2' | 'DEPTH_3' | 'DEPTH_4' | 'DEPTH_5';

export interface MainStory {
  headline: string;
  narrative: string;
  centralTension?: string;
  focalEntity?: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  trigger: string;
  patternIds: string[];
  likelyDynamic: string;
  tension?: string;
  constructiveResponse: string;
  evidenceIds: string[];
}

export interface DeepInterpretation extends Interpretation {
  depth: ResultDepth;
  explanation: string;
  constructiveExpression?: string;
  tension?: string;
  contextFitScore: number;
}

export interface NextSuggestedQuestion {
  question: string;
  context: string;
  targetDomain: string;
}

export interface DeepMysticosResult extends MysticosResult {
  mainStory: MainStory;
  primaryPatterns: Pattern[];
  secondaryPatterns: Pattern[];
  scenarios: Scenario[];
  deepInterpretations: DeepInterpretation[];
  nextQuestions?: NextSuggestedQuestion[];
}
```

---

## 3. Các Engine Suy Luận Chuyên Sâu (`@mystic/interpretation-engine`)

### 3.1. ResultDepthEngine
- Xác định độ sâu dựa trên:
  `priority = importance × specificity × evidenceStrength × contextFit × interactionStrength`.
- **DEPTH 1**: 1 câu chốt yếu điểm.
- **DEPTH 2**: 1 đoạn ngắn + 2 điểm lưu ý.
- **DEPTH 3**: Ý nghĩa cốt lõi + Vì sao xuất hiện + Biểu hiện thực tế.
- **DEPTH 4**: Phân tích toàn diện + Lực cản/Giằng co (Tension) + Khung bối cảnh.
- **DEPTH 5**: Luận giải sâu sắc + Tương tác đa chiều + Kịch bản đời thực + Chứng cứ thư tịch cổ.

### 3.2. MainStoryEngine
- Phân tích hợp lực giữa các tín hiệu:
  - Tarot: Tương tác chuỗi lá bài (`Card A → Card B → Card C`) và câu hỏi cụ thể.
  - Astrology: Hợp lực Bộ Ba (Mặt Trời, Mặt Trăng, Cung Mọc) và các góc hợp chủ đạo.
  - Tử Vi: Trục Mệnh - Thân kết hợp Tứ Hóa và đại hạn đang xét.
  - Numerology: Sự giao thoa giữa Số Đường Đời, Số Sứ Mệnh và Năm Cá Nhân.
  - Compatibility: Động lực kéo hai người lại gần nhau vs Điểm ma sát bản năng.

### 3.3. QuestionReactiveEngine
- Nhận diện mục tiêu câu hỏi (ví dụ: *Nghề nghiệp*, *Tình duyên*, *Tài chính*, *Định hướng cá nhân*).
- Điều chỉnh trọng số kích hoạt tín hiệu và ngữ cảnh diễn giải. Cùng 1 lá 7 Pentacles nhưng câu hỏi công việc sẽ bàn về chi phí cơ hội / đầu tư dự án; câu hỏi tình cảm bàn về thời gian tìm hiểu và sự kiên nhẫn bồi đắp.

### 3.4. ScenarioEngine
- Dự phóng các tình huống đời sống cụ thể dựa trên tổ hợp tín hiệu đối cực:
  - *Khi tranh luận và bất đồng quan điểm*.
  - *Khi đứng trước quyết định tài chính quan trọng*.
  - *Khi một trong hai người cần khoảng lùi và không gian riêng*.
  - *Khi đối mặt áp lực thay đổi môi trường làm việc*.

---

## 4. Ngữ Pháp Kết Quả Riêng Từng Domain (Domain Result Grammar)

### 4.1. Tarot Result Grammar (`<TarotResultView />`)
1. **Câu hỏi & Trọng tâm trải bài**: Nhắc lại câu hỏi và ý nghĩa của spread được chọn.
2. **Cốt truyện tổng thể (Main Story)**: Câu trả lời trực diện không vòng vo.
3. **Tiến trình các lá bài (Story Arc & Card Interactions)**:
   - Từng lá bài theo vị trí kèm vai trò của nó trong câu chuyện tổng.
   - Mối quan hệ tương tác giữa các lá: Tương trợ, đối lập, chuyển tiếp, hóa giải.
4. **Kịch bản thực tế (Scenario)**: Biểu hiện trong hoàn cảnh câu hỏi.
5. **Điểm cần cân nhắc & Lời khuyên hành động**: Tiếp tục vs Điều chỉnh.
6. **Câu hỏi gợi ý tiếp theo (Next Question)**: Gợi ý đào sâu tự nhiên.

### 4.2. Numerology Result Grammar (`<NumerologyResultView />`)
1. **Chân dung cốt lõi**: Năng lượng chủ đạo từ sự hội tụ của các chỉ số.
2. **Tương tác giữa các con số (Number Interactions)**:
   - Sự cộng hưởng và giằng co nội tâm (ví dụ: Số 1 độc lập gặp Số 2 cần hòa hợp).
3. **Chu kỳ & Bối cảnh thời điểm**: Ý nghĩa của Năm cá nhân và 4 Đỉnh cao.
4. **Ứng dụng thực tế đời sống**: Lời khuyên phát triển và bài học rèn luyện.

### 4.3. Astrology Result Grammar (`<AstrologyResultView />`)
1. **Dấu ấn bản đồ sao (Chart Signature)**: Phân bố nguyên tố (Lửa, Đất, Khí, Nước) và tính chất (Tiên phong, Kiên định, Biến chuyển).
2. **Bộ Ba Quyền Lực (Big Three Dynamics)**:
   - Mặt Trời (Bản thể) ↔ Mặt Trăng (Nhu cầu cảm xúc) ↔ Cung Mọc (Cách bộc lộ ra ngoài).
3. **Các góc hợp quan trọng nhất (Ranked Aspects)**: Top 3–5 góc chiếu thực sự có ý nghĩa và orb chặt nhất.
4. **Vùng đời sống được kích hoạt**: Các nhà (Houses) hội tụ nhiều năng lượng.
5. **Hệ quả thực tế & Định hướng phát triển**.

### 4.4. Tử Vi Result Grammar (`<TuViResultView />`)
1. **Khí chất cốt lõi Mệnh & Thân**: Tương quan ngũ hành, cục và phong thái.
2. **Thế đứng Tam Phương Tứ Chính**: Phối hợp liên cung Mệnh - Tài - Quan - Di.
3. **Tứ Hóa & Tinh diệu kích hoạt**: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ.
4. **Vận hạn đang xét**: Đại hạn / Tiểu hạn kích hoạt những cung chức nào.
5. **Khám phá 12 cung chức chi tiết (Exploration Layer)**: Mở rộng theo nhu cầu.

### 4.5. Compatibility Result Grammar (`<CompatibilityResultView />`)
1. **Động lực chính của mối quan hệ**: Điểm hút nhau tự nhiên vs Khác biệt bản năng.
2. **Ma trận tương tác theo chiều kích**: Cảm xúc, Giao tiếp, Giá trị sống, Cam kết.
3. **Kịch bản thực tế (Real-Life Scenarios)**:
   - *Khi xảy ra tranh luận*: Cách ứng xử của A và B, giải pháp hóa giải.
   - *Khi ra quyết định tài chính / cuộc sống*.
4. **Nguyên tắc bồi đắp mối quan hệ lâu dài**.

---

## 5. Thư Viện UI Primitives Biên Tập (`apps/web/components/primitives/`)

- `<InsightBlock depth={depth} />`: Khối nhận định tự co giãn theo độ sâu (Depth 1 đến 5).
- `<PatternStory />`: Khối tự sự trình bày mạch diễn biến chính (Story Arc).
- `<CardInteractionBlock />`: Hiển thị quan hệ giữa các lá bài (A ➔ B ➔ C).
- `<ScenarioBlock />`: Hộp tình huống thực tế (*Khi tranh luận*, *Khi tiền bạc*,...).
- `<TensionBlock />`: Hộp phân cực 2 lực đối kháng nội tâm và hướng giải quyết.
- `<NextQuestionBlock />`: Gợi ý câu hỏi đào sâu tiếp theo dựa trên quẻ.
- `<WhyDrawer />`: Khối minh bạch truy vết mở rộng tới thư tịch cổ S0/S1.

---

## 6. Kiểm Thử Chất Lượng & Regression Test Suite

1. **Question Swap Test**: Cùng 3 lá bài, đổi câu hỏi "Có nên đổi việc?" vs "Tại sao bế tắc?" ➔ Output, narrative và guidance phải thay đổi thực sự.
2. **Position Swap Test**: 7 Pentacles ở "Hiện tại" vs "Lời khuyên" ➔ Diễn giải khác biệt hoàn toàn.
3. **Entity Swap Test**: Đổi lá bài / Cung sao / Con số ➔ Luận giải, pattern, kịch bản thay đổi.
4. **Combination Swap Test**: Cặp (7 Pentacles + 8 Cups) vs (7 Pentacles + Star) ➔ Cốt truyện biến đổi từ "rời bỏ" sang "thắp lại hy vọng".
5. **Depth Differentiation Test**: Kiểm tra tỷ lệ phân tầng độ dài (không dài đều giả tạo).
