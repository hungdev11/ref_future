# MYSTICOS — Architectural & Design Rules

## 1. DESIGN SYSTEM SPECIFICATION (CRITICAL)
Tất cả các giao diện, component, bảng biểu và trang báo cáo trong dự án Mysticos BẮT BUỘC tuân thủ nghiêm ngặt theo quy chuẩn thiết kế tại `.agents/rules/design_rule.md` và `prompt/design_rule.md`:

- **Phong cách thị giác**: Editorial, archival, restrained, mang đậm tính con người và thư tịch cổ điển. TUYỆT ĐỐI KHÔNG làm giao diện trông như AI-generated, generic SaaS, neon-on-dark, glassmorphism hay gradient tím xanh.
- **Bảng màu chuẩn**:
  - Background: `#111110` (Than chì / giấy ép sẫm màu)
  - Surface: `#161614` (Bề mặt lưu trữ văn khố)
  - Text chính: `#EDEAE2` (Màu giấy cổ parchment)
  - Muted / Metadata: `#9E9B91` (Màu đá stone)
  - Đường kẻ / Viền: `#282724` / `#383631` (Hairline graticule)
  - Accent Gold: `#BFA15F` (Vàng kim cổ điển / thước đo thiên văn, sử dụng < 5%)
  - Cinnabar Red: `#BD3A2B` (Màu chu sa ấn tín, dùng cực kỳ hạn chế cho số đặc biệt/cảnh báo)
- **Kiểu chữ (Typography)**:
  - Heading & Tiêu đề: Font Serif (`Lora`, Georgia)
  - Nội dung & Giao diện: Font Sans-serif (`Be Vietnam Pro`)
  - Số liệu, ngày giờ, tọa độ thiên văn, mã số: Font Monospace (`JetBrains Mono`)
- **Hình khối (Shape & Borders)**:
  - Radius: Cực kỳ hạn chế (0px cho khung/khối chính, 2-4px cho nút/input). Không dùng hình viên thuốc (pill) tròn vo phồng to.
  - Viền mỏng 1px sắc sảo, bề mặt phẳng.
- **Thang bậc thông tin (Information Hierarchy)**:
  Mọi màn hình kết quả phải tuân theo thứ tự 5 tầng:
  1. RAW DATA (Dữ liệu đầu vào & Công thức)
  2. CALCULATED RESULT (Số liệu / Tọa độ / Lá số chính xác)
  3. PATTERN & EVIDENCE (Mối tương quan, tam phương tứ chính, góc chiếu, chu kỳ)
  4. INTERPRETATION (Diễn giải tường minh, giải thích nguồn gốc vì sao)
  5. PRACTICAL GUIDANCE (Lời khuyên hành động thực tế đời thường)

## 2. NGUYÊN TẮC HỆ THỐNG DETERMINISTIC (NO AI / LLM)
Toàn bộ các module theo `prompt/`:
1. `prompt/thansohoc.md` (Thần Số Học Pythagoras Deterministic Engine)
2. `prompt/tuvi.md` (Tử Vi Đẩu Số Deterministic Engine)
3. `prompt/chiemtinh.md` (Chiêm Tinh Tây Phương Deterministic Engine)
4. `prompt/tarot.md` (Tarot Deterministic Interpretation Engine)
5. `prompt/tuonghop.md` (Độ Tương Hợp Multi-System Engine)

- Tuyệt đối không dùng AI / LLM / Gemini / OpenAI / prompt ngẫu nhiên lúc người dùng tra cứu.
- Cùng Input + Cùng Rule Version = Cùng Output 100%.
- Không dùng điểm số cảm tính vô nghĩa (như 59/100).
- Mọi nhận định đều phải truy nguyên được từ công thức hoặc dữ liệu thiên văn / thư tịch chuẩn.
