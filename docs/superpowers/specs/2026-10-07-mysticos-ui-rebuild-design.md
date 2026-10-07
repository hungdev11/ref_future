# Tái Thiết Toàn Diện UI/UX Mysticos: Đơn Giản Hóa Cho Người Dùng & Dọn Dẹp Mã Thừa

- **Date**: 2026-10-07
- **Status**: Approved
- **Reference**: `docs/design.md`, `docs/ui.md`, `AGENTS.md`, `prompt/design_rule.md`

---

## 1. Mục Tiêu & Triết Lý Cốt Lõi

Triển khai tái thiết UI/UX cho toàn bộ ứng dụng MYSTICOS theo chỉ đạo tại `docs/design.md` và `docs/ui.md`:
- **"Engine có thể phức tạp. UI không được phức tạp theo."**
- **"Ẩn độ phức tạp, không ẩn độ sâu."**
- **"Data exists ≠ Data deserves screen space."**
- **"Xóa trực tiếp các mã nguồn thừa / legacy không còn sử dụng."**

Mục tiêu là đưa người dùng đến ngay kết quả dễ hiểu, có thứ tự ưu tiên, trả lời trọn vẹn 5 câu hỏi trọng yếu trong vài giây đầu tiên:
1. Kết quả chính là gì?
2. Nó có ý nghĩa gì?
3. Điều gì đáng chú ý nhất?
4. Nó có thể biểu hiện như thế nào trong đời sống?
5. Tôi nên làm gì / chú ý điều gì?

Phần lý giải sâu ("Vì sao?") và chi tiết kỹ thuật/tọa độ gốc được tổ chức dạng **Progressive Disclosure (Mở rộng theo nhu cầu)**, không chiếm dụng không gian mặc định.

---

## 2. Phân Cấp Dữ Liệu 3 Lớp (Data Classification)

1. **Lớp A — User-Facing (Hiển thị mặc định)**:
   - Kết quả chính (Headline & Summary súc tích 1–3 câu).
   - Điểm nổi bật nhất (Top 3 chủ đề / pattern có trọng số cao nhất).
   - Biểu hiện đời sống thực tế (2–4 gạch đầu dòng cụ thể).
   - Điểm cần lưu ý (Tension / điểm nghẽn / cơ hội).
   - Lời khuyên hành động thực tế (Việc tiếp tục vs Việc dừng/điều chỉnh).
2. **Lớp B — Optional Explanation (Thu gọn mặc định)**:
   - Panel "Vì sao hệ thống đưa ra kết quả này?".
   - Tóm tắt mối liên hệ giữa các tín hiệu và quy tắc kích hoạt.
   - Thư tịch cổ và nguồn gốc dẫn chứng S0/S1.
3. **Lớp C — Internal Engine (Tuyệt đối không hiển thị ở màn hình chính)**:
   - Rule IDs (`RUL_...`), Claim IDs (`CLM_...`), Signal IDs (`SIG_...`).
   - Điểm số nội bộ (`0.85`, `0.92`, `priority`, `contextFit`).
   - Thời gian tính toán mili-giây, số lượng rule đánh giá.
   - Bảng phần trăm giả khoa học (`83% hợp nhau`).

---

## 3. Kiến Trúc Adapter & View Model (`apps/web/lib/result-adapter.ts`)

Adapter đảm nhiệm vai trò **Editorial Judgment**, chuyển đổi `MysticosResult` thành `UserFacingResult`:

```ts
export interface UserFacingTheme {
  id: string;
  title: string;
  description: string;
  relevance: 'primary' | 'secondary';
}

export interface UserFacingManifestation {
  context: string;
  detail: string;
}

export interface UserFacingTension {
  dynamic: string;
  resolution: string;
}

export interface UserFacingGuidance {
  priority: 'IMMEDIATE' | 'STRATEGIC' | 'REFLECTIVE';
  continueItems: string[];
  adjustOrStopItems: string[];
  rationale: string;
}

export interface UserFacingResult {
  domain: string;
  domainTitle: string;
  domainNumber: string;
  school: string;
  
  // Level 1: Kết quả chính
  headline: string;
  summary: string;
  
  // Level 2: Top 3 chủ đề nổi bật nhất
  keyThemes: UserFacingTheme[];
  
  // Level 3: Biểu hiện thực tế
  manifestations: UserFacingManifestation[];
  
  // Level 4: Điểm cần lưu ý
  tensions: UserFacingTension[];
  
  // Level 5: Gợi ý hành động
  guidance: UserFacingGuidance[];
  
  // Level 6 & 7: Progressive disclosure payload
  rawResult: MysticosResult;
}
```

---

## 4. Cấu Trúc Component Hướng Người Dùng (`apps/web/components/result/`)

Tạo thư mục component chuyên biệt tại `apps/web/components/result/`:

1. `<ResultHero />`:
   - Tiêu đề domain, trường phái chuẩn.
   - Headline lớn font Serif (`Lora`).
   - Tóm tắt 1–3 câu font Sans (`Be Vietnam Pro`) dễ hiểu, không thần bí hóa hay fatalistic.
2. `<KeyThemes />`:
   - Hiển thị tối đa 3 chủ đề quan trọng nhất được tuyển chọn.
   - Mỗi chủ đề gồm tiêu đề súc tích và giải thích ngắn 1–2 câu.
3. `<HowItMayManifest />`:
   - Nhóm 2–4 biểu hiện thực tế trong đời sống (công việc, quan hệ, tâm lý).
4. `<WatchFor />`:
   - Điểm xung đột hoặc xu hướng cần cân bằng, đi kèm hướng giải tỏa.
5. `<PracticalGuidance />`:
   - Phân định rõ 2 cột/khối: *Nên tiếp tục phát huy* và *Cần điều chỉnh hoặc dừng lại*.
6. `<WhyThisResult />`:
   - Nút bấm thu gọn/mở rộng trang nhã: "✦ Vì sao tôi nhận được kết quả này?".
   - Khi mở, hiển thị chuỗi lập luận tự nhiên dẫn chứng thư tịch cổ và cơ sở học thuật.
7. `<TechnicalDetails />`:
   - Nút bấm phụ: "Khám phá chi tiết chuyên môn & tọa độ".
   - Hiển thị dữ liệu thiên văn, vị trí các cung, bảng sao, hệ số quy chuẩn.

`<MysticosResultViewer />` làm vai trò wrapper gom 7 component trên vào một luồng kể chuyện mạch lạc duy nhất (`One Screen = One Story`), độ rộng tối đa `max-w-3xl mx-auto`.

---

## 5. Dọn Dẹp Mã Thừa (Purge Legacy)

Xóa trực tiếp hai file báo cáo cũ chứa văn bản hardcoded không liên kết với Knowledge Base:
- `apps/web/app/numerology/NumerologyFullReport.tsx` (55.7 KB)
- `apps/web/app/tu-vi/TuViFullReport.tsx` (32.6 KB)

---

## 6. Thiết Kế Các Trang Chuyên Biệt

1. **Trang Chủ (`/`)**:
   - Tinh giản hero: Giới thiệu tôn chỉ khảo cứu minh bạch, khoa học cổ điển.
   - 5 thẻ chức năng dẫn lối đến 5 domain với 1 CTA rõ ràng.
2. **5 Trang Khảo Cứu (`/tarot`, `/astrology`, `/tu-vi`, `/numerology`, `/compatibility`)**:
   - Form nhập liệu gọn gàng: Chỉ hỏi đúng thông tin cần thiết.
   - Hiển thị thông báo minh bạch khi dữ liệu bị giới hạn (ví dụ: chưa có giờ sinh chính xác).
   - Trả về giao diện `<MysticosResultViewer />` đồng nhất.

---

## 7. Tiêu Chuẩn Thẩm Mỹ & Thiết Kế (Editorial Guidelines)

- **Màu sắc**:
  - Background: `#111110` (Than chì)
  - Surface: `#161614` (Văn khố)
  - Text chính: `#EDEAE2` (Parchment)
  - Muted text: `#9E9B91` (Đá stone)
  - Viền mỏng 1px: `#282724`
  - Accent Gold: `#BFA15F`
  - Cinnabar Red: `#BD3A2B` (Chỉ dùng cho cảnh báo / số đặc biệt)
- **Kiểu chữ**:
  - Heading: Font Serif (`Lora`)
  - Nội dung: Font Sans (`Be Vietnam Pro`)
  - Ký hiệu / Mã / Tọa độ: Font Monospace (`JetBrains Mono`)
- **Hình khối**:
  - Radius 0px cho khung, 2-4px cho nút bấm. Không dùng hình viên thuốc (pill) phồng to.
  - Không gradient AI tím xanh, không neon, không glassmorphism.
