# MYSTICOS Screen-by-Screen UX / UI / Content / Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hoàn chỉnh toàn bộ Product Experience của MYSTICOS theo quy chuẩn 121 mục: biến Result Page thành sản phẩm cốt lõi (Core Product) theo 4 tầng (Read → Understand → Explore → Verify), loại bỏ hoàn toàn các chuỗi interpretation hard-coded, hỗ trợ tương tác không reload (Bottom Sheet / Side Panel / Interactive Nodes), đảm bảo 3 user archetypes và kiểm soát chất lượng dữ liệu / provenance.

**Architecture:** Kiến trúc Core-Out tách bạch nghiêm ngặt: Calculation & Knowledge Base → Interpretation Engine (`DeepMysticosResult`) → Page View Model Adapter → Pure UI Component. Giao diện chỉ đọc và biểu diễn, không tự diễn giải, không tự bổ sung text dự phòng; mọi insight đều kèm provenance (`why` / `evidence`).

**Tech Stack:** Next.js 14 App Router, TypeScript 5, Tailwind CSS, Lucide React, Vitest, `@mystic/core`, `@mystic/interpretation-engine`, `@mystic/knowledge-base`.

## Global Constraints

- **Tôn chỉ sản phẩm:** UI chỉ render, không tính toán hay diễn giải (Spec 2.1). Không wall-of-text, không badge dump (Spec 4).
- **Ngữ pháp 4 tầng:** Tầng 1 (Read: Main Story, Top Patterns), Tầng 2 (Understand: Why, Manifestation, Context), Tầng 3 (Explore: Relations, Scenarios, Palaces/Aspects/Cycles), Tầng 4 (Verify: Rules, Evidence, Sources, Technical) (Spec 5).
- **Không fallback rỗng:** `guidance === null` hoặc `tension === null` thì không render thẻ rỗng; không dùng text bịa đặt (Spec 88).
- **Provenance bắt buộc:** Mọi insight quan trọng truy vết về `interpretationId` → `patternId` → `signalIds` → `ruleId` → `claimId` → `sourceId` (Spec 109).
- **Không rò rỉ mã kỹ thuật:** Tuyệt đối không hiển thị `SCEN_`, `SIG_CTX_`, `RUL_`, `PHU_THE` raw tokens ra UI (Test `no-raw-tokens-leak.test.ts`).
- **Interactive Disclosure:** Nhấp vào yếu tố (Cung, Lá bài, Góc chiếu, Con số, Chiều tương hợp) mở Drawer/Sheet chi tiết không reload trang (Spec 26, 39, 46, 48, 59, 72).

---

### Task 1: Dọn Dẹp Toàn Bộ Hard-Coded Fallback Interpretation Trong Web Domain Results

**Files:**
- Modify: `apps/web/components/domain-results/CompatibilityResultView.tsx`
- Modify: `apps/web/components/domain-results/TuViResultView.tsx`
- Modify: `apps/web/components/domain-results/TarotResultView.tsx`
- Test: `apps/web/tests/no-raw-tokens-leak.test.ts`
- Test: `apps/web/tests/domain-views.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult.guidance`, `DeepMysticosResult.tensions`, `DeepMysticosResult.facts`
- Produces: UI hoàn toàn dựa vào data thực từ engine; không tự fallback các chuỗi text dài

- [ ] **Step 1: Viết test phát hiện fallback hard-coded trong CompatibilityResultView**
- [ ] **Step 2: Chạy test để xác nhận fail hoặc pass baseline**
- [ ] **Step 3: Xóa bỏ các fallback `effectiveContinueItems` và `effectiveAdjustItems` bịa đặt tại CompatibilityResultView.tsx**
- [ ] **Step 4: Chạy test kiểm tra không còn rò rỉ hoặc fallback tĩnh**
- [ ] **Step 5: Commit commit clean up**

---

### Task 2: Cải Tiến TuViResultView Theo Chuẩn Screen 1-11 & Cung Chức Interactive Sheet

**Files:**
- Modify: `apps/web/components/domain-results/TuViResultView.tsx`
- Modify: `apps/web/components/primitives/WhyDrawer.tsx`
- Create: `apps/web/components/primitives/PalaceDetailSheet.tsx`
- Test: `apps/web/tests/tuvi-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult`, `facts`, `rawPalaces`
- Produces: `PalaceDetailSheet` hiển thị vai trò, sao tọa thủ, tam phương tứ chính hội chiếu, và diễn giải tương ứng khi user click cung

- [ ] **Step 1: Viết test cho tương tác click vào Cung Mệnh / Cung Tài Bạch / 12 Cung mở PalaceDetailSheet**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Triển khai PalaceDetailSheet và tích hợp vào TuViResultView (Screen 4 & Screen 8)**
- [ ] **Step 4: Bổ sung Header Screen 1 chuẩn (Tên, Ngày sinh, Giờ, Nơi, Độ đầy đủ dữ liệu)**
- [ ] **Step 5: Chạy test tuvi-result-view.test.tsx**
- [ ] **Step 6: Commit commit tu vi result update**

---

### Task 3: Cải Tiến AstrologyResultView Theo Chuẩn Chart Signature, Big Three & Life Areas Filter

**Files:**
- Modify: `apps/web/components/domain-results/AstrologyResultView.tsx`
- Create: `apps/web/components/primitives/AspectDetailSheet.tsx`
- Test: `apps/web/tests/astrology-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult.facts`, `DeepMysticosResult.relationships`, `DeepMysticosResult.patterns`
- Produces: Chart Signature above-the-fold, Big Three click interaction, Top 5 Aspects + filter theo Life Area (Tình cảm, Sự nghiệp, Bản thân)

- [ ] **Step 1: Viết test cho click Life Area filter và click Aspect mở Detail Sheet**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Cập nhật AstrologyResultView và AspectDetailSheet**
- [ ] **Step 4: Chạy test astrology-result-view.test.tsx**
- [ ] **Step 5: Commit commit astrology update**

---

### Task 4: Cải Tiến NumerologyResultView Theo Chuẩn Core Story, Number Interactions & Cycles

**Files:**
- Modify: `apps/web/components/domain-results/NumerologyResultView.tsx`
- Create: `apps/web/components/primitives/NumberDetailSheet.tsx`
- Test: `apps/web/tests/numerology-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult.facts`, `DeepMysticosResult.patterns`, `DeepMysticosResult.tensions`
- Produces: Core Story mở đầu, Visual tương tác Life Path ↕ Expression ↕ Soul Urge, Life Cycles Timeline, NumberDetailSheet

- [ ] **Step 1: Viết test cho click Core Number mở NumberDetailSheet và tương tác chu kỳ cuộc đời**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Triển khai NumberDetailSheet và tích hợp vào NumerologyResultView**
- [ ] **Step 4: Chạy test numerology-result-view.test.tsx**
- [ ] **Step 5: Commit commit numerology update**

---

### Task 5: Cải Tiến TarotResultView Theo Chuẩn Question Context, Card Relationships & Reflection

**Files:**
- Modify: `apps/web/components/domain-results/TarotResultView.tsx`
- Create: `apps/web/components/primitives/CardDetailSheet.tsx`
- Test: `apps/web/tests/tarot-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult.inputSummary.question`, `facts`, `relationships`, `patterns`
- Produces: Question hero banner, Main Answer synthesis, Semantic modifier cho lá bài ngược, Interactive CardDetailSheet, Reflection questions từ pattern

- [ ] **Step 1: Viết test cho click card mở CardDetailSheet và hiển thị đúng chiều ngược theo semantic modifier**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Triển khai CardDetailSheet và tích hợp vào TarotResultView**
- [ ] **Step 4: Chạy test tarot-result-view.test.tsx**
- [ ] **Step 5: Commit commit tarot update**

---

### Task 6: Cải Tiến CompatibilityResultView Theo Chuẩn Không % Score, Dimension Focus & Scenario Deep Dive

**Files:**
- Modify: `apps/web/components/domain-results/CompatibilityResultView.tsx`
- Test: `apps/web/tests/compatibility-result-view.test.tsx`

**Interfaces:**
- Consumes: `DeepMysticosResult`, `facts`, `scenarios`, `tensions`
- Produces: Relationship Story (không %), Strongest Connection, Differences, Clickable Dimensions selector, Real-life Scenario cards

- [ ] **Step 1: Viết test cho click chọn Dimension và mở rộng Scenario chi tiết**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Hoàn thiện tương tác Dimension Focus và loại bỏ triệt để hard-coded text trong CompatibilityResultView**
- [ ] **Step 4: Chạy test compatibility-result-view.test.tsx**
- [ ] **Step 5: Commit commit compatibility update**

---

### Task 7: Sticky Sub-Navigation, Progressive Disclosure & Action Controls Cho Toàn Bộ Result Views

**Files:**
- Modify: `apps/web/components/MysticosResultViewer.tsx`
- Create: `apps/web/components/primitives/ResultStickyNav.tsx`
- Modify: `apps/web/components/primitives/ResultFooter.tsx`
- Test: `apps/web/tests/shared-primitives.test.tsx`

**Interfaces:**
- Consumes: Result DOM sections (`#overview`, `#patterns`, `#details`, `#evidence`)
- Produces: Sticky mini-nav (desktop) và dropdown selector (mobile), nút Lưu kết quả vào LocalStorage, nút Chia sẻ/Xuất

- [ ] **Step 1: Viết test kiểm tra ResultStickyNav và hành động lưu kết quả**
- [ ] **Step 2: Chạy test xác nhận fail**
- [ ] **Step 3: Xây dựng ResultStickyNav và tích hợp vào MysticosResultViewer**
- [ ] **Step 4: Chạy test shared-primitives.test.tsx**
- [ ] **Step 5: Commit commit sticky nav & actions**

---

### Task 8: Kiểm Thử Toàn Diện (End-to-End Test Suite, Permutation & Zero Leaks)

**Files:**
- Test: `apps/web/tests/no-raw-tokens-leak.test.ts`
- Test: `apps/web/tests/api-contracts.test.ts`
- Test: `apps/web/tests/input-wizard-flows.test.tsx`
- Test: All 43 test suites

- [ ] **Step 1: Chạy toàn bộ test suite `rtk npm run test`**
- [ ] **Step 2: Kiểm tra entity swap, position swap, missing data**
- [ ] **Step 3: Xác minh 100% test passing, 0 technical leak**
- [ ] **Step 4: Commit và tổng kết**
