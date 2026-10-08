# Thiết Kế Chi Tiết Triển Khai MYSTICOS UI/UX & User Behavior Specification

- **Date**: 2026-10-08
- **Status**: Approved
- **Reference**: `MYSTICOS — PRODUCT UI/UX & USER BEHAVIOR SPECIFICATION` (100 Sections)

---

## 1. Mục Tiêu & Triết Lý

Thiết kế toàn bộ giao diện và hành vi tương tác của MYSTICOS theo tôn chỉ:
> **"Engine có thể rất phức tạp. Người dùng không cần nhìn thấy sự phức tạp đó. Người dùng cần hiểu được kết quả, vì sao có kết quả, nó liên quan gì đến mình, và nên làm gì tiếp theo."**

Hệ thống bao gồm 5 domain:
1. Thần Số Học
2. Tử Vi Đẩu Số
3. Chiêm Tinh
4. Tarot
5. Độ Tương Hợp

---

## 2. Phân Tách 3 Chặng Triển Khai (Core-Out Architecture)

### Chặng 1: Chuẩn Hóa Ngữ Pháp & Xóa Bỏ Dữ Liệu Tĩnh Trong 5 Domain Results

#### 1.1. Tử Vi Đẩu Số (`TuViResultView.tsx`)
- **Khắc phục lỗi dữ liệu**:
  - Xóa bỏ toàn bộ hardcode text tại trục Tam Phương Tứ Chính: Thay thế các chuỗi tĩnh `Tham Lang`, `Thất Sát`, `Liêm Trinh, Thiên Tướng` và cung `Tuất, Dần, Tý` bằng dữ liệu hội chiếu động trích xuất từ `facts` hoặc `rawPalaces`.
  - Hiển thị huy hiệu độ đầy đủ dữ liệu: `Độ đầy đủ: Đầy đủ / Một phần` (Spec 15).
- **Cấu trúc ngữ pháp kết quả (Spec 91)**:
  - Header: Trục Mệnh - Thân động.
  - Điểm nổi bật nhất (Primary reading / Main story) trước khi vào chi tiết.
  - Section "Các cung đáng chú ý" (Curated Palaces): Chọn lọc 3–5 cung có relevance cao hoặc có Tứ Hóa kích hoạt thay vì dump cả 12 cung (Spec 20).
  - 12 Cung Explorer: Cho phép click từng cung xem vai trò, cấu trúc chính, tam phương xung chiếu và diễn giải (Spec 21).
  - Vận trình Timeline: Trình bày Đại Hạn / Lưu Niên hiện tại và chủ đề giai đoạn (Spec 23-24).
  - Result Footer: "Bạn vừa xem: [Chủ đề] → Khám phá tiếp" (Spec 81).

#### 1.2. Chiêm Tinh (`AstrologyResultView.tsx`)
- **Khắc phục lỗi dữ liệu**:
  - Xóa bỏ text tĩnh cố định tại Nhà 11 và Nhà 1. Triển khai component sinh diễn giải Nhà động (`getHouseDescription(houseNumber)`) dựa trên vị trí thực tế của Sun và Moon trong chart.
- **Cấu trúc ngữ pháp kết quả (Spec 91)**:
  - Chart Signature: Nổi bật cấu trúc bản đồ sao trước danh sách hành tinh (Spec 37).
  - Big Three: Mặt Trời, Mặt Trăng, Cung Mọc kèm phân tích tương tác cặp (Sun ↔ Moon, Moon ↔ Asc, Sun ↔ Asc) (Spec 38).
  - Vùng đời sống kích hoạt (Life Areas): Chỉ hiển thị các cung nhà có hành tinh tụ hội mạnh (Spec 41).
  - Technical Chart Explorer: Thu gọn mặc định dạng progressive disclosure cho người dùng chuyên sâu (Spec 42).
  - Result Footer.

#### 1.3. Thần Số Học (`NumerologyResultView.tsx`)
- **Cấu trúc ngữ pháp kết quả (Spec 28, 91)**:
  - Header: Đưa Điểm nổi bật nhất lên đầu; chuyển các thẻ con số cốt lõi thành bằng chứng (evidence) phía sau (Spec 28).
  - Number Interactions & Tension: Giữ khối tương tác giằng co nội tâm (Spec 30).
  - Life Cycles Timeline: Bổ sung 4 giai đoạn chu kỳ cuộc đời (Spec 31).
  - Giai đoạn hiện tại (Current Cycle / Personal Year): Trình bày cơ hội và điểm cần lưu ý (Spec 32).
  - Result Footer.

#### 1.4. Tarot (`TarotResultView.tsx`)
- **Cấu trúc ngữ pháp kết quả (Spec 48–54, 91)**:
  - Header: Trọng tâm câu hỏi và bối cảnh trải bài (Spec 48).
  - Thông điệp chính (Main Answer): Trình bày thông điệp cốt lõi ngay đầu (Spec 49).
  - Card Positions: Hiển thị rõ vai trò vị trí, chiều xuôi/ngược (orientation) và ngữ cảnh câu hỏi (Spec 50).
  - Card Relationships & Story: Phân tích tương tác giữa các lá bài (reinforcement, contrast, tension, transition) (Spec 51–52).
  - Điều đáng suy ngẫm (Reflection Questions): Câu hỏi phản tư dẫn xuất từ pattern (Spec 53).
  - Result Footer.

#### 1.5. Độ Tương Hợp (`CompatibilityResultView.tsx`)
- **Cấu trúc ngữ pháp kết quả (Spec 57–63, 91)**:
  - Header: Tổng quan mối quan hệ (điểm kết nối mạnh vs khác biệt đáng chú ý, không dùng % điểm số) (Spec 57).
  - Dimensions Dynamic: Trình bày từng chiều kích theo cấu trúc chuẩn: `A có xu hướng... / B có xu hướng... / Điểm kết nối... / Điểm khác biệt... / Khi kết hợp...` (Spec 59).
  - Tình huống thực tế (Real-life Scenarios): Ứng xử khi tranh luận, ra quyết định, tài chính... (Spec 60).
  - Hai khối tách biệt: "Điều giúp hai người kết nối" (Spec 61) và "Điểm cần được quản lý" (Spec 62).
  - Result Footer.

---

### Chặng 2: Tái Cấu Trúc Trang Home & Luồng Input 3 Bước

#### 2.1. Trang Home (`/`) (Spec 05–08)
- Định vị thương hiệu: MYSTICOS — Khảo Cứu Vận Mệnh.
- Main Statement: "Khám phá các mô hình và xu hướng trong ngày sinh, lá số, bản đồ sao và trải bài của bạn."
- Nút bấm kép: `Bắt đầu khám phá` (Primary) và `Tìm hiểu MYSTICOS` (Secondary).
- 5 Module Cards: Đồng bộ copy súc tích theo Spec 06.
- Trust & Methodology: Pipeline 5 bước `Dữ liệu → Tính toán → Đối chiếu tri thức → Phân tích pattern → Diễn giải`.

#### 2.2. Luồng Input 3 Bước Từng Domain (Spec 09–14, 27, 35, 44–47, 55–56)
Thay thế layout form cố định bằng luồng wizard 3 trạng thái:
1. **Landing Intro (Spec 10)**: Trả lời 5 câu hỏi cốt lõi trước khi nhập liệu.
2. **Form Nhập & Xác Nhận**:
   - **Tử Vi**: Bước 1 (Tên + Ngày sinh) → Bước 2 (Giờ sinh + Nơi sinh + Giới tính) → Bước 3 (Màn hình xác nhận thông tin).
   - **Tarot**: Textarea câu hỏi + Câu hỏi gợi ý → Chọn Spread trực quan → Xem trước sơ đồ vị trí lá trước khi rút.
   - **Chiêm Tinh**: Họ tên, Ngày, Giờ, Tọa độ/Thành phố. Cảnh báo rõ ràng giới hạn khi chọn "Không rõ giờ sinh".
   - **Thần Số Học**: Tên khai sinh + Ngày sinh, chuẩn hóa dữ liệu.
   - **Độ Tương Hợp**: Tab Đối tượng A / Đối tượng B, chọn Ngữ cảnh mối quan hệ (Tình cảm, Công việc, Bạn bè, Gia đình), Xác nhận đối chiếu.
3. **Loading Theo Ngữ Cảnh (Spec 14)**:
   - Hiển thị chuỗi thông điệp tiến trình tương ứng với thao tác backend.

---

### Chặng 3: Tính Năng Toàn Cục & Quản Lý Dữ Liệu Client

#### 3.1. Quản Lý Lịch Sử (`/history`, Spec 69–71)
- Module lưu trữ `historyStore.ts` trên `localStorage`.
- Giao diện lọc theo 6 tiêu chí: `Tất cả` | `Tử Vi` | `Chiêm Tinh` | `Thần Số Học` | `Tarot` | `Tương Hợp`.
- Thao tác: Xem lại tức thì (không cần gọi lại API), Lưu yêu thích, Xóa từng mục, Xóa tất cả.

#### 3.2. Khảo Cứu Đa Hệ Thống (`/analysis`, Spec 64–66)
- Tự động nạp các kết quả gần nhất từ lịch sử (nếu có từ 2 domain trở lên).
- Trình bày 2 mục chính:
  - Chủ đề chung (Shared Themes): Các xu hướng xuất hiện đồng thời ở nhiều hệ quy chiếu.
  - Góc nhìn khác biệt (Divergence): Nêu rõ điểm khác biệt và bổ trợ lẫn nhau, không gượng ép xóa bỏ mâu thuẫn.

#### 3.3. Cài Đặt & Quyền Riêng Tư (`/settings`, Spec 72–73)
- Bảng kê minh bạch các thông tin được lưu trong trình duyệt.
- Nút bấm xóa toàn bộ dữ liệu cá nhân cục bộ.

#### 3.4. Global Navigation (`Navbar.tsx`)
- Bổ sung nút `Lịch sử` (`/history`).
- Chuẩn hóa nhãn menu theo Spec 03.

---

## 3. Tiêu Chí Nghiệm Thu (Definition of Done)

- [ ] Toàn bộ 132+ test suite hiện tại tiếp tục pass 100%.
- [ ] Không rò rỉ bất kỳ mã ID kỹ thuật nào (`SCEN_`, `SIG_CTX_`, `ruleId`) ra giao diện người dùng.
- [ ] Không còn bất kỳ đoạn text tĩnh hoặc tên sao/cung hardcode nào trong 5 Result Views.
- [ ] Trang Home, 5 Input flows, 5 Result views, `/history`, `/settings`, `/analysis` hoạt động trơn tru.
- [ ] Kiểm thử với 2 bộ input khác nhau tạo ra trải nghiệm đọc khác biệt rõ rệt (Spec 95).
