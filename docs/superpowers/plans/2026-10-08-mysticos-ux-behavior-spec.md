# MYSTICOS UI/UX & User Behavior Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai toàn diện 100 mục trong MYSTICOS Product UI/UX & User Behavior Specification: Chuẩn hóa 5 Domain Results (xóa triệt để hardcode dữ liệu), Nâng cấp Home & 5 luồng Input thành wizard 3 bước có xác nhận và loading ngữ cảnh, Bổ sung `/history`, `/settings`, `/analysis` và chuẩn hóa Navbar.

**Architecture:** Tiếp cận theo mô hình Core-Out. Chặng 1 sửa trực tiếp 5 Domain Results loại bỏ text/sao tĩnh; Chặng 2 xây dựng primitive dùng chung (ResultFooter, ContextualLoading, ConfirmationStep, HistoryStorage); Chặng 3 nâng cấp Home và 5 trang nhập liệu; Chặng 4 xây dựng 3 trang mới (`/history`, `/settings`, `/analysis`) và tích hợp Navbar.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Tailwind CSS, Lucide React, Vitest.

## Global Constraints

- Không rò rỉ bất kỳ mã định danh kỹ thuật (`SCEN_`, `SIG_CTX_`, `ruleId`, v.v.) ra HTML giao diện.
- Không hardcode tên sao, cung, vị trí nhà, hoặc kết luận tĩnh trong mã nguồn frontend.
- Giữ nguyên 100% độ tương thích với kiểu dữ liệu `DeepMysticosResult` và `MysticosResult`.
- Mọi câu lệnh thực thi phải bắt đầu bằng tiền tố `rtk`.
- Toàn bộ 132+ test suite hiện hữu phải pass 100%.

---

### Task 1: Khắc Phục Hardcode Dữ Liệu & Hoàn Thiện Tử Vi Result View

**Files:**
- Modify: `apps/web/components/domain-results/TuViResultView.tsx`
- Test: `apps/web/tests/tuvi-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult` từ `@mystic/core`.
- Produces: `TuViResultView` component render dynamic tam phương tứ chính, độ đầy đủ dữ liệu, curated palaces và timeline vận trình.

- [ ] **Step 1: Viết test kiểm tra không còn hardcode sao và hiển thị dynamic tam phương**

Tạo `apps/web/tests/tuvi-result-view.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TuViResultView } from '../components/domain-results/TuViResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('TuViResultView Dynamic Data', () => {
  it('does not render hardcoded Tham Lang or That Sat when chart does not have them', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Lá số có xu hướng phát triển bền vững.',
      summary: 'Tổng quan lá số',
      confidenceScore: 0.9,
      dataCompleteness: 'FULL',
      facts: [
        { key: 'menhBranch', value: 'NGO_HORSE' },
        { key: 'menhStar', value: 'TU_VI' },
        { key: 'thanBranch', value: 'THIN_DRAGON' },
        { key: 'thanPalaceRole', value: 'PHUC_DUC' },
        { key: 'taiBachStar', value: 'THIEN_PHU' },
        { key: 'quanLocStar', value: 'THIEN_TUONG' },
        { key: 'thienDiStar', value: 'THAI_DUONG' },
      ],
      interpretations: [],
      metadata: { school: 'Tử Vi Đẩu Số Toàn Thư' },
    } as any;

    const { container } = render(<TuViResultView result={mockResult} />);
    const html = container.innerHTML;
    // Should render dynamic stars
    expect(screen.getByText(/Thiên Phủ/i)).toBeDefined();
    expect(screen.getByText(/Thiên Tướng/i)).toBeDefined();
    // Should NOT render hardcoded old stars
    expect(html).not.toContain('Tham Lang');
    expect(html).not.toContain('Thất Sát');
  });

  it('renders data completeness badge properly', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tuvi',
      primaryResult: 'Test',
      summary: 'Test',
      confidenceScore: 0.8,
      dataCompleteness: 'PARTIAL',
      facts: [],
      metadata: { school: 'Tử Vi' },
    } as any;

    render(<TuViResultView result={mockResult} />);
    expect(screen.getByText(/Một phần/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận test fail do TuViResultView hiện tại còn hardcode Tham Lang**

Run: `rtk npx vitest run apps/web/tests/tuvi-result-view.test.tsx`
Expected: FAIL (tìm thấy 'Tham Lang' hoặc không tìm thấy 'Thiên Phủ').

- [ ] **Step 3: Cập nhật `TuViResultView.tsx` trích xuất động Tam Phương Tứ Chính, huy hiệu độ đầy đủ dữ liệu, curated palaces và timeline**

Chỉnh sửa `apps/web/components/domain-results/TuViResultView.tsx`:
1. Thêm huy hiệu `Độ đầy đủ dữ liệu: Đầy đủ` hoặc `Một phần` trên header.
2. Trích xuất sao hội chiếu từ `facts` (`taiBachStar`, `quanLocStar`, `thienDiStar` hoặc fallback an toàn dựa trên `rawPalaces`).
3. Nếu không có sao cụ thể cho Tam phương, hiển thị tên cung và "Chính tinh tọa thủ" trích xuất từ dữ liệu thay vì gán cứng Tham Lang, Thất Sát, Liêm Trinh, Thiên Tướng.
4. Bổ sung mục "Các Cung Đáng Chú Ý" (Mệnh, Quan, Tài, Di, Phúc) và Timeline Vận Trình (Đại hạn / Tiểu hạn nếu có trong facts).
5. Tích hợp `ResultFooter`.

- [ ] **Step 4: Chạy lại test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/tuvi-result-view.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/domain-results/TuViResultView.tsx apps/web/tests/tuvi-result-view.test.tsx
rtk git commit -m "feat(web): make TuViResultView fully dynamic with data completeness and timeline"
```

---

### Task 2: Khắc Phục Hardcode Text & Hoàn Thiện Chiêm Tinh Result View

**Files:**
- Modify: `apps/web/components/domain-results/AstrologyResultView.tsx`
- Test: `apps/web/tests/astrology-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult` với `sunHouse`, `moonHouse`, `ascendant`.
- Produces: `AstrologyResultView` với diễn giải Cung Nhà động và tương tác Big Three.

- [ ] **Step 1: Viết test kiểm tra diễn giải nhà động và tương tác Big Three**

Tạo `apps/web/tests/astrology-result-view.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AstrologyResultView } from '../components/domain-results/AstrologyResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('AstrologyResultView Dynamic House and Big Three', () => {
  it('renders dynamic text according to sun and moon houses', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'astrology',
      primaryResult: 'Bản đồ sao chú trọng sự tự do.',
      summary: 'Tổng quan chiêm tinh',
      confidenceScore: 0.9,
      facts: [
        { key: 'sun.sign', value: 'ARIES' },
        { key: 'moon.sign', value: 'TAURUS' },
        { key: 'ascendant', value: 'LEO' },
        { key: 'planets.sun.house', value: 4 },
        { key: 'planets.moon.house', value: 10 },
      ],
      metadata: { school: 'Modern Humanistic Astrology' },
    } as any;

    const { container } = render(<AstrologyResultView result={mockResult} />);
    // House 4 should talk about root/family/home, NOT house 11 social goals
    expect(screen.getByText(/Nhà 4/i)).toBeDefined();
    expect(screen.getByText(/Nhà 10/i)).toBeDefined();
    expect(container.innerHTML).not.toContain('hiện thực hóa mục tiêu xã hội');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/astrology-result-view.test.tsx`
Expected: FAIL (hiện tại AstrologyResultView hardcode text nhà 11).

- [ ] **Step 3: Cập nhật `AstrologyResultView.tsx` tạo hàm `getHouseLifeTheme(houseNumber)` động**

1. Tạo mapping diễn giải ngắn cho 12 cung Nhà:
   - Nhà 1: Bản thể, định hình phong thái và diện mạo cá nhân.
   - Nhà 2: Tài chính, nguồn lực vật chất và hệ giá trị cá nhân.
   - Nhà 3: Giao tiếp, tư duy logic, học hỏi và kết nối môi trường gần.
   - Nhà 4: Cội nguồn, gia đình, nền tảng tâm lý và không gian riêng tư.
   - Nhà 5: Sáng tạo, thể hiện bản thân, niềm vui và lãng mạn.
   - Nhà 6: Thói quen hàng ngày, lao động, sức khỏe và tính kỷ luật.
   - Nhà 7: Quan hệ đối tác, hôn nhân và cam kết bình đẳng.
   - Nhà 8: Chiều sâu nội tâm, chuyển hóa, nguồn lực chung và chia sẻ.
   - Nhà 9: Tri thức cao cấp, thế giới quan, khám phá và triết lý sống.
   - Nhà 10: Sự nghiệp, vị thế xã hội, công danh và lý tưởng cống hiến.
   - Nhà 11: Cộng đồng, mục tiêu lý tưởng, mạng lưới bạn bè và tương lai.
   - Nhà 12: Tiềm thức, sự tĩnh lặng, tái tạo nội lực và chiều sâu tinh thần.
2. Thêm phân tích cặp Big Three (Sun ↔ Moon: Ý chí và Cảm xúc; Sun ↔ Asc: Cốt cách và Cửa ngõ biểu hiện).
3. Bổ sung mục Vùng đời sống kích hoạt (Life Areas) và ResultFooter.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/astrology-result-view.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/domain-results/AstrologyResultView.tsx apps/web/tests/astrology-result-view.test.tsx
rtk git commit -m "feat(web): dynamic house interpretation and Big Three dynamics in AstrologyResultView"
```

---

### Task 3: Tái Cấu Trúc Thần Số Học Result View (Spec 28–34)

**Files:**
- Modify: `apps/web/components/domain-results/NumerologyResultView.tsx`
- Test: `apps/web/tests/numerology-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult` numerology.
- Produces: `NumerologyResultView` đưa điểm nổi bật lên đầu, số học làm evidence, bổ sung timeline 4 chu kỳ.

- [ ] **Step 1: Viết test cho NumerologyResultView kiểm tra thứ tự hiển thị và chu kỳ cuộc đời**

Tạo `apps/web/tests/numerology-result-view.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NumerologyResultView } from '../components/domain-results/NumerologyResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('NumerologyResultView Grammar', () => {
  it('renders primary reading before core numbers evidence', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'numerology',
      primaryResult: 'Điểm nổi bật nhất: Năng lực dẫn dắt kết hợp nội tâm tìm kiếm sự bình an.',
      summary: 'Tổng quan số học',
      confidenceScore: 0.9,
      facts: [
        { key: 'lifepath', value: 7 },
        { key: 'destiny', value: 1 },
      ],
      metadata: { school: 'Pythagorean System' },
    } as any;

    render(<NumerologyResultView result={mockResult} />);
    expect(screen.getByText(/Điểm nổi bật nhất/i)).toBeDefined();
    expect(screen.getByText(/CƠ SỞ CHỈ SỐ CỐT LÕI/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/numerology-result-view.test.tsx`
Expected: FAIL (chưa có nhãn "CƠ SỞ CHỈ SỐ CỐT LÕI").

- [ ] **Step 3: Cập nhật `NumerologyResultView.tsx` theo chuẩn Spec 28-34**

1. Đưa `Điểm nổi bật nhất` (Headline/Primary reading) lên phần trên cùng của Header.
2. Gom các con số cốt lõi (Life Path, Destiny, Soul, Personality, Maturity) vào khối Evidence "Cơ Sở Chỉ Số Cốt Lõi" với chú thích: Các con số dùng làm bằng chứng xác lập pattern.
3. Bổ sung mục "Chu Kỳ Đời Người & Năm Hiện Tại" (Life Cycles timeline).
4. Tích hợp `ResultFooter`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/numerology-result-view.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/domain-results/NumerologyResultView.tsx apps/web/tests/numerology-result-view.test.tsx
rtk git commit -m "feat(web): prioritize primary patterns and add cycle timeline in NumerologyResultView"
```

---

### Task 4: Hoàn Thiện Tarot Result View (Spec 48–54)

**Files:**
- Modify: `apps/web/components/domain-results/TarotResultView.tsx`
- Test: `apps/web/tests/tarot-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult` tarot.
- Produces: `TarotResultView` hiển thị chiều xuôi/ngược, câu hỏi phản tư (reflection), và thông điệp chính ngay đầu.

- [ ] **Step 1: Viết test cho TarotResultView kiểm tra mục Reflection và chiều lá bài**

Tạo `apps/web/tests/tarot-result-view.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TarotResultView } from '../components/domain-results/TarotResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('TarotResultView Reflection and Position', () => {
  it('renders reflection section and main answer', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'tarot',
      primaryResult: 'Thông điệp chính: Đánh giá lại trước khi tiếp tục.',
      summary: 'Trải bài gợi mở',
      confidenceScore: 0.9,
      facts: [
        { key: 'draw_0', value: 'MAJOR_0_FOOL' },
        { key: 'draw_0_reversed', value: false },
      ],
      inputSummary: { question: 'Tôi nên chú ý gì trong công việc?' },
      metadata: { school: 'Rider-Waite-Smith' },
    } as any;

    render(<TarotResultView result={mockResult} />);
    expect(screen.getByText(/THÔNG ĐIỆP CHÍNH/i)).toBeDefined();
    expect(screen.getByText(/ĐIỀU ĐÁNG SUY NGẪM/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/tarot-result-view.test.tsx`
Expected: FAIL (chưa có nhãn "ĐIỀU ĐÁNG SUY NGẪM").

- [ ] **Step 3: Cập nhật `TarotResultView.tsx`**

1. Khối "THÔNG ĐIỆP CHÍNH" đặt ngay dưới bối cảnh câu hỏi (Spec 49).
2. Hiển thị chiều lá bài: Chiều Xuôi (Upright) vs Chiều Ngược (Reversed) trích từ facts (Spec 50).
3. Bổ sung section "ĐIỀU ĐÁNG SUY NGẪM" (Reflection questions dựa trên các tension và pattern) (Spec 53).
4. Tích hợp `ResultFooter`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/tarot-result-view.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/domain-results/TarotResultView.tsx apps/web/tests/tarot-result-view.test.tsx
rtk git commit -m "feat(web): add main message, card orientation, and reflection section to TarotResultView"
```

---

### Task 5: Hoàn Thiện Compatibility Result View (Spec 57–63)

**Files:**
- Modify: `apps/web/components/domain-results/CompatibilityResultView.tsx`
- Test: `apps/web/tests/compatibility-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult` compatibility.
- Produces: `CompatibilityResultView` phân tích Dynamic 5 khía cạnh và tách bạch "Điều kết nối" vs "Điểm cần lưu ý".

- [ ] **Step 1: Viết test cho CompatibilityResultView kiểm tra 2 khối Kết Nối và Quản Lý Khác Biệt**

Tạo `apps/web/tests/compatibility-result-view.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CompatibilityResultView } from '../components/domain-results/CompatibilityResultView';
import type { DeepMysticosResult } from '@mystic/core';

describe('CompatibilityResultView Structure', () => {
  it('renders connection and care sections clearly without numerical percentage', () => {
    const mockResult: DeepMysticosResult = {
      domain: 'compatibility',
      primaryResult: 'Hai người có điểm kết nối mạnh ở tư duy nhưng cần chú ý nhịp điệu sinh hoạt.',
      summary: 'Tổng quan tương hợp',
      confidenceScore: 0.85,
      facts: [
        { key: 'personA.sunSign', value: 'KIM_NGUU' },
        { key: 'personB.sunSign', value: 'XU_NU' },
      ],
      inputSummary: {
        personA: { name: 'Người A' },
        personB: { name: 'Người B' },
        relationshipType: 'LOVE',
      },
      metadata: { school: 'Multi-System Synthesis' },
    } as any;

    const { container } = render(<CompatibilityResultView result={mockResult} />);
    expect(screen.getByText(/ĐIỀU GIÚP HAI NGƯỜI KẾT NỐI/i)).toBeDefined();
    expect(screen.getByText(/ĐIỂM CẦN ĐƯỢC QUẢN LÝ/i)).toBeDefined();
    // No percentage score on top
    expect(container.innerHTML).not.toContain('85%');
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/compatibility-result-view.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Cập nhật `CompatibilityResultView.tsx`**

1. Không hiển thị tỷ lệ % cảm tính (Spec 57, 59).
2. Xây dựng khối Dynamic Dimension theo mẫu: `A có xu hướng... / B có xu hướng... / Điểm kết nối... / Điểm khác biệt... / Khi kết hợp...` (Spec 59).
3. Tách biệt rõ ràng 2 section lớn: "ĐIỀU GIÚP HAI NGƯỜI KẾT NỐI" (Spec 61) và "ĐIỂM CẦN ĐƯỢC QUẢN LÝ" (Spec 62).
4. Tích hợp `ResultFooter`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/compatibility-result-view.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/domain-results/CompatibilityResultView.tsx apps/web/tests/compatibility-result-view.test.tsx
rtk git commit -m "feat(web): implement dynamic dimension syntax and connection/care sections in CompatibilityResultView"
```

---

### Task 6: Xây Dựng Các UI Primitives Dùng Chung (ResultFooter, ContextualLoading, ConfirmationStep)

**Files:**
- Create: `apps/web/components/primitives/ResultFooter.tsx`
- Create: `apps/web/components/primitives/ContextualLoading.tsx`
- Create: `apps/web/components/primitives/ConfirmationStep.tsx`
- Test: `apps/web/tests/shared-primitives.test.tsx`

**Interfaces:**
- `ResultFooter`: `{ topic: string; exploreLinks: { label: string; href: string }[] }`
- `ContextualLoading`: `{ steps: string[]; currentStepIndex: number; title: string }`
- `ConfirmationStep`: `{ title: string; items: { label: string; value: string }[]; onConfirm: () => void; onEdit: () => void; isSubmitting?: boolean }`

- [ ] **Step 1: Viết test cho 3 primitive components**

Tạo `apps/web/tests/shared-primitives.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResultFooter } from '../components/primitives/ResultFooter';
import { ContextualLoading } from '../components/primitives/ContextualLoading';
import { ConfirmationStep } from '../components/primitives/ConfirmationStep';

describe('Shared UX Primitives', () => {
  it('renders ResultFooter with topic and explore links', () => {
    render(
      <ResultFooter
        topic="Khảo Cứu Tử Vi"
        exploreLinks={[{ label: 'Xem Vận Trình Hiện Tại', href: '#timeline' }]}
      />
    );
    expect(screen.getByText(/Bạn vừa xem:/i)).toBeDefined();
    expect(screen.getByText(/Khảo Cứu Tử Vi/i)).toBeDefined();
    expect(screen.getByText(/Xem Vận Trình Hiện Tại/i)).toBeDefined();
  });

  it('renders ContextualLoading step messages', () => {
    render(
      <ContextualLoading
        title="Đang lập lá số"
        steps={['Xác định lịch pháp', 'Dựng 12 cung', 'Tổng hợp pattern']}
        currentStepIndex={1}
      />
    );
    expect(screen.getByText(/Đang lập lá số/i)).toBeDefined();
    expect(screen.getByText(/Dựng 12 cung/i)).toBeDefined();
  });

  it('renders ConfirmationStep with items and triggers confirm/edit', () => {
    const onConfirm = vi.fn();
    const onEdit = vi.fn();
    render(
      <ConfirmationStep
        title="Xác nhận dữ liệu khởi bàn"
        items={[
          { label: 'Họ tên', value: 'Nguyễn Văn A' },
          { label: 'Ngày sinh', value: '12/03/1995' },
        ]}
        onConfirm={onConfirm}
        onEdit={onEdit}
      />
    );
    expect(screen.getByText(/Nguyễn Văn A/i)).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: /Xác nhận/i }));
    expect(onConfirm).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Chỉnh sửa/i }));
    expect(onEdit).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/shared-primitives.test.tsx`
Expected: FAIL (files chưa tồn tại).

- [ ] **Step 3: Triển khai 3 component tại `apps/web/components/primitives/`**

1. Tạo `ResultFooter.tsx` (Spec 81): Hộp chân trang tóm tắt chủ đề vừa xem và các gợi ý "Khám phá tiếp".
2. Tạo `ContextualLoading.tsx` (Spec 14): Trình bày tiến trình từng chặng rõ ràng, phong cách typography cổ điển/tinh tế.
3. Tạo `ConfirmationStep.tsx` (Spec 13): Bảng đối chiếu thông tin người dùng vừa nhập trước khi kích hoạt tính toán, gồm nút `Xác nhận & Khởi tạo` và `Chỉnh sửa thông tin`.
4. Xuất các component từ `apps/web/components/primitives/index.ts`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/shared-primitives.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/primitives/ResultFooter.tsx apps/web/components/primitives/ContextualLoading.tsx apps/web/components/primitives/ConfirmationStep.tsx apps/web/components/primitives/index.ts apps/web/tests/shared-primitives.test.tsx
rtk git commit -m "feat(web): build ResultFooter, ContextualLoading, and ConfirmationStep primitives"
```

---

### Task 7: Quản Lý Lịch Sử LocalStorage & Tạo 3 Trang Mới (`/history`, `/settings`, `/analysis`)

**Files:**
- Create: `apps/web/lib/history-storage.ts`
- Create: `apps/web/app/history/page.tsx`
- Create: `apps/web/app/settings/page.tsx`
- Create: `apps/web/app/analysis/page.tsx`
- Test: `apps/web/tests/history-storage.test.ts`

**Interfaces:**
- `historyStorage`:
  - `saveHistoryItem(item: HistoryItem): void`
  - `getHistoryItems(domainFilter?: string): HistoryItem[]`
  - `toggleSaveItem(id: string): void`
  - `deleteHistoryItem(id: string): void`
  - `clearAllHistory(): void`

- [ ] **Step 1: Viết test cho `history-storage.ts`**

Tạo `apps/web/tests/history-storage.test.ts`:
```ts
import { describe, it, expect, beforeEach } from 'vitest';
import {
  saveHistoryItem,
  getHistoryItems,
  toggleSaveItem,
  deleteHistoryItem,
  clearAllHistory,
} from '../lib/history-storage';

describe('History Storage Utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and retrieves history items', () => {
    saveHistoryItem({
      id: 'test-1',
      timestamp: Date.now(),
      domain: 'tuvi',
      title: 'Lá Số Nguyễn Văn A',
      mainTheme: 'Nhu cầu ổn định và tự chủ',
      resultPayload: { domain: 'tuvi' } as any,
      isSaved: false,
    });

    const items = getHistoryItems();
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Lá Số Nguyễn Văn A');
  });

  it('filters history items by domain', () => {
    saveHistoryItem({
      id: '1', timestamp: Date.now(), domain: 'tuvi', title: 'Tử Vi', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });
    saveHistoryItem({
      id: '2', timestamp: Date.now(), domain: 'tarot', title: 'Tarot', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });

    expect(getHistoryItems('tuvi')).toHaveLength(1);
    expect(getHistoryItems('tarot')).toHaveLength(1);
    expect(getHistoryItems('astrology')).toHaveLength(0);
  });

  it('toggles saved status and deletes items', () => {
    saveHistoryItem({
      id: '1', timestamp: Date.now(), domain: 'tuvi', title: 'Tử Vi', mainTheme: '', resultPayload: {} as any, isSaved: false,
    });
    toggleSaveItem('1');
    expect(getHistoryItems()[0].isSaved).toBe(true);

    deleteHistoryItem('1');
    expect(getHistoryItems()).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/history-storage.test.ts`
Expected: FAIL (module chưa tồn tại).

- [ ] **Step 3: Tạo `apps/web/lib/history-storage.ts`**

Triển khai đầy đủ hàm thao tác trên `localStorage` với try/catch an toàn cho SSR.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/history-storage.test.ts`
Expected: PASS.

- [ ] **Step 5: Tạo 3 trang mới (`/history`, `/settings`, `/analysis`)**

1. `apps/web/app/history/page.tsx` (Spec 69–71):
   - Thanh lọc 6 nút: Tất cả, Tử Vi, Chiêm Tinh, Thần Số Học, Tarot, Tương Hợp.
   - Thẻ danh sách: Ngày + Domain badge + Tiêu đề + Main Theme.
   - Mở modal hoặc chuyển trang hiển thị lại kết quả mà không cần gọi API.
   - Nút Lưu / Bỏ lưu / Xóa.
2. `apps/web/app/settings/page.tsx` (Spec 72–73):
   - Danh sách thông tin cá nhân lưu cục bộ.
   - Nút xóa toàn bộ dữ liệu lịch sử và cache.
   - Thông điệp cam kết quyền riêng tư và minh bạch thuật toán.
3. `apps/web/app/analysis/page.tsx` (Spec 64–66):
   - Nạp các kết quả gần nhất từ 5 domain.
   - Trình bày 2 khu vực: "Chủ Đề Chung" (Shared Themes) và "Góc Nhìn Khác Biệt" (Divergence giữa các hệ thống).

- [ ] **Step 6: Commit**

Run:
```bash
rtk git add apps/web/lib/history-storage.ts apps/web/app/history/page.tsx apps/web/app/settings/page.tsx apps/web/app/analysis/page.tsx apps/web/tests/history-storage.test.ts
rtk git commit -m "feat(web): add history storage, /history, /settings, and /analysis cross-system pages"
```

---

### Task 8: Cập Nhật Global Navbar & Tái Thiết Trang Home (`/`)

**Files:**
- Modify: `apps/web/components/Navbar.tsx`
- Modify: `apps/web/app/page.tsx`
- Test: `apps/web/tests/home-and-navbar.test.tsx`

**Interfaces:**
- Navbar: Link sang `/history`, menu 5 domain đúng tên Spec 03.
- HomePage: Hero đúng Spec 05, 5 cards đúng Spec 06, Trust pipeline đúng Spec 08.

- [ ] **Step 1: Viết test cho Navbar và HomePage**

Tạo `apps/web/tests/home-and-navbar.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from '../components/Navbar';
import HomePage from '../app/page';

describe('Global Navigation and Home Page', () => {
  it('renders navbar links according to Spec 03 including History', () => {
    render(<Navbar />);
    expect(screen.getByText('Tử Vi')).toBeDefined();
    expect(screen.getByText('Tarot')).toBeDefined();
    expect(screen.getByText('Lịch Sử')).toBeDefined();
  });

  it('renders home page positioning and 5 modules according to Spec 05-06', () => {
    render(<HomePage />);
    expect(screen.getByText(/Khảo Cứu Vận Mệnh/i)).toBeDefined();
    expect(screen.getByText(/Bắt đầu khám phá/i)).toBeDefined();
    expect(screen.getByText(/Tìm hiểu MYSTICOS/i)).toBeDefined();
    expect(screen.getByText(/Đặt một câu hỏi và khám phá câu chuyện nổi lên từ trải bài/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/home-and-navbar.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Cập nhật `Navbar.tsx` và `page.tsx`**

1. Cập nhật `Navbar.tsx`:
   - Thêm nút `Lịch Sử` (`/history`).
   - Đổi nhãn menu: `Thần Số Học`, `Tử Vi`, `Chiêm Tinh`, `Tarot`, `Độ Tương Hợp`.
2. Cập nhật `apps/web/app/page.tsx`:
   - Hero: Tiêu đề thương hiệu và tuyên bố chủ đạo ngắn gọn theo Spec 05.
   - Nút bấm: `Bắt đầu khám phá` (Primary) và `Tìm hiểu MYSTICOS` (Secondary).
   - 5 Module cards: Sử dụng chính xác văn phong Spec 06.
   - Section Trust & Methodology: 5 bước tối giản `Dữ liệu → Tính toán → Đối chiếu tri thức → Phân tích pattern → Diễn giải`.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/home-and-navbar.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/components/Navbar.tsx apps/web/app/page.tsx apps/web/tests/home-and-navbar.test.tsx
rtk git commit -m "feat(web): align Navbar and Home page with Spec 03 and Spec 05-08"
```

---

### Task 9: Nâng Cấp Luồng Input 5 Domain Thành Wizard 3 Bước (Intro → Form/Confirm → Loading)

**Files:**
- Modify: `apps/web/app/tu-vi/page.tsx`
- Modify: `apps/web/app/astrology/page.tsx`
- Modify: `apps/web/app/numerology/page.tsx`
- Modify: `apps/web/app/tarot/page.tsx`
- Modify: `apps/web/app/compatibility/page.tsx`
- Test: `apps/web/tests/input-wizard-flows.test.tsx`

**Interfaces:**
- Mỗi page quản lý state: `step = 'INTRO' | 'FORM' | 'CONFIRM' | 'LOADING' | 'RESULT'`.
- Lưu kết quả vào `historyStorage` khi tính toán thành công.

- [ ] **Step 1: Viết test cho luồng Input Wizard**

Tạo `apps/web/tests/input-wizard-flows.test.tsx`:
```tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TuViPage from '../app/tu-vi/page';

describe('Tu Vi Input Wizard Flow', () => {
  it('shows intro and moves to form step upon clicking start', () => {
    render(<TuViPage />);
    // Initial landing state
    const startBtn = screen.getByRole('button', { name: /Lập lá số/i });
    expect(startBtn).toBeDefined();
    fireEvent.click(startBtn);
    // Should show form fields
    expect(screen.getByText(/Họ và tên/i)).toBeDefined();
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận fail**

Run: `rtk npx vitest run apps/web/tests/input-wizard-flows.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Cập nhật 5 file input page**

1. `apps/web/app/tu-vi/page.tsx`:
   - State `step`: `'INTRO'` → `'FORM_STEP_1'` (Tên, Ngày) → `'FORM_STEP_2'` (Giờ, Nơi sinh, Giới tính) → `'CONFIRM'` (Xác nhận) → `'LOADING'` (ContextualLoading) → `'RESULT'` (TuViResultView).
   - Tự động lưu kết quả vào `historyStorage`.
2. `apps/web/app/tarot/page.tsx`:
   - State: `'INTRO'` → `'QUESTION'` (Textarea lớn + gợi ý câu hỏi) → `'SPREAD'` (Chọn 1 lá, 3 lá, Celtic) → `'CONFIRM'` (Sơ đồ vị trí) → `'LOADING'` → `'RESULT'`.
3. `apps/web/app/astrology/page.tsx`:
   - Thêm Họ tên, chọn Không rõ giờ sinh hiển thị cảnh báo giới hạn. Wizard: Intro → Form → Confirm → Loading → Result.
4. `apps/web/app/numerology/page.tsx`:
   - Intro → Form (Tên khai sinh + Ngày) → Confirm → Loading → Result.
5. `apps/web/app/compatibility/page.tsx`:
   - Intro → Form (Tab Đối tượng A / Đối tượng B + Ngữ cảnh quan hệ) → Confirm → Loading → Result.

- [ ] **Step 4: Chạy test để xác nhận pass**

Run: `rtk npx vitest run apps/web/tests/input-wizard-flows.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
rtk git add apps/web/app/tu-vi/page.tsx apps/web/app/astrology/page.tsx apps/web/app/numerology/page.tsx apps/web/app/tarot/page.tsx apps/web/app/compatibility/page.tsx apps/web/tests/input-wizard-flows.test.tsx
rtk git commit -m "feat(web): implement 3-step progressive input wizard for all 5 domains"
```

---

### Task 10: Toàn Diện Kiểm Thử & Xác Nhận Hệ Thống (E2E & Zero-Leak Audit)

**Files:**
- Modify: `apps/web/tests/no-raw-tokens-leak.test.ts`
- Run: Toàn bộ test suite của dự án

- [ ] **Step 1: Cập nhật test `no-raw-tokens-leak.test.ts` bao phủ thêm các view và component mới**

Đảm bảo test render kiểm tra cả 5 domain results và không tìm thấy bất kỳ chuỗi rò rỉ token kỹ thuật nào.

- [ ] **Step 2: Chạy toàn bộ test suite dự án**

Run: `rtk npm test`
Expected: Tất cả test pass 100% không có lỗi.

- [ ] **Step 3: Kiểm tra TypeScript build**

Run: `rtk npm run build` (hoặc `rtk npx tsc --noEmit`)
Expected: Thành công không lỗi TypeScript.

- [ ] **Step 4: Commit hoàn tất**

Run:
```bash
rtk git add apps/web/tests/no-raw-tokens-leak.test.ts
rtk git commit -m "test(web): verify zero technical leaks and comprehensive UX coverage"
```
