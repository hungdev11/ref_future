# Mysticos Knowledge Base Coverage & Source Statistics

**Status:** Architecture Specification  
**Authority:** Section 2, Section 3, Section 4 (`prompt/source.md`), Section 16 (`prompt/result.md`)  
**Package:** `@mystic/knowledge-base`  

---

## 1. Overview & Source Level Standards

The Mysticos Knowledge Base is structured according to a strict academic-grade hierarchy of evidentiary sources:
- **Level S0 (Primary Classical / Canonical):** Ancient manuscripts, first editions, authorial foundational texts (e.g. Ptolemy's *Tetrabiblos*, A.E. Waite's *The Pictorial Key to the Tarot*, *Tử Vi Đẩu Số Toàn Thư*).
- **Level S1 (Standard Academic Commentary):** Recognized authoritative treatises and modern standard reference works (e.g. Robert Hand's *Planets in Aspect*, Vương Đình Chi's *Trung Châu Môn*).
- **Level S2 (Peer-Reviewed Analytical Works):** Modern analytical research (e.g. Matthew Oliver Goodwin's *Numerology: The Complete Guide*).
- **Level S3 (Synthesized Traditional Manuals):** Multi-tradition manuals and cross-school compendia.
- **Level S4 (Contemporary Practice / Edge Cases):** Contemporary observations and practical case records.

---

## 2. Quantitative Knowledge Base Statistics

| Metric | Tarot | Astrology | Tu Vi | Numerology | Compatibility | Platform Total |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Source Records** | 3 | 3 | 3 | 3 | Cross-domain | **12** |
| **Atomic Claims** | 5 | 6 | 5 | 5 | 0 (Derived) | **21** |
| **Catalog Rules** | 3 | 3 | 3 | 3 | 3 | **15** |
| **Doctrinal Conflicts** | 1 | 1 | 1 | 1 | 0 | **4** |
| **Semantic Profiles** | 78 cards | 12 signs, 10 planets | 14 stars, 12 palaces | 12 numbers | Cross-domain | **126 entities** |

---

## 3. Registered Sources by Domain

### 3.1 Tarot
- `SRC_TAROT_WAITE_1911`: *The Pictorial Key to the Tarot* (Arthur Edward Waite, 1911) — Level S0
- `SRC_TAROT_MATHERS_1888`: *The Tarot: Its Occult Signification* (S.L. MacGregor Mathers, 1888) — Level S1
- `SRC_TAROT_POLLACK_1980`: *Seventy-Eight Degrees of Wisdom* (Rachel Pollack, 1980) — Level S1

### 3.2 Astrology
- `SRC_ASTRO_PTOLEMY_TETRABIBLOS`: *Tetrabiblos* (Claudius Ptolemy, 2nd Century CE) — Level S0
- `SRC_ASTRO_HAND_1976`: *Planets in Aspect: Understanding Your Chariot* (Robert Hand, 1976) — Level S1
- `SRC_ASTRO_LILLY_1647`: *Christian Astrology* (William Lilly, 1647) — Level S0

### 3.3 Tử Vi Đẩu Số
- `SRC_TUVI_TOAN_THU`: *Tử Vi Đẩu Số Toàn Thư* (Trần Đoàn / La Hồng Tiên) — Level S0
- `SRC_TUVI_TOAN_TAP`: *Tử Vi Đẩu Số Toàn Tập* (Trần Đoàn / Quán Lăng Đại Thừa Sơn Nhân) — Level S0
- `SRC_TUVI_TRUNG_CHAU_VUONG_DINH_CHI`: *Trung Châu Phái Tử Vi Đẩu Số Toàn Tập* (Vương Đình Chi) — Level S1

### 3.4 Thần Số Học (Numerology)
- `SRC_NUM_PYTHAGORAS`: *Theologoumena Arithmeticae* (Iamblichus / Nicomachus of Gerasa) — Level S0
- `SRC_NUM_GOODWIN`: *Numerology: The Complete Guide* (Matthew Oliver Goodwin, 1981) — Level S1
- `SRC_NUM_CAMPBELL`: *Your Days Are Numbered* (Florence Campbell, 1931) — Level S1

---

## 4. Source Conflict Resolution Strategy

Mysticos explicitly models doctrinal divergencies rather than flattening them:
1. `CONF_TAROT_LOVERS_MEANING`: Lovers card duality (Marriage vs Choice). Resolution: `school_specific`.
2. `CONF_TUVI_CAN_CANH_TU_HOA`: Can Canh Tứ Hóa debate (Nam Phái Nhật Vũ Đồng Âm vs Trung Châu Nhật Vũ Âm Đồng). Resolution: `keep_separate`.
3. `CONF_ASTRO_PLUTO_RULERSHIP`: Scorpio ruler (Classical Mars vs Modern Pluto). Resolution: `prefer_primary`.
4. `CONF_NUM_PYTHAGORAS_VS_MODERN`: Number 5 significance (Sacred Marriage vs Freedom). Resolution: `school_specific`.

---

## 5. Knowledge Base Expansion Gaps

1. **Hellenistic Timing Techniques:** Need sources on Profections and Zodiacal Releasing (Valens' *Anthology*).
2. **Tu Vi Phi Tinh (Flying Stars):** Need systematic encoding of 18 Tứ Hóa biến hóa rules.
3. **Marseille Tarot Heritage:** Need primary sources from Nicolas Conver (1760) for historical Tarot reading engine.
4. **Chaldean Numerology System:** Formalizing Cheiro's *Book of Numbers* as a distinct school.
