# Architecture Specification: Deterministic Mystical Platform

**Document Version:** 1.0.0  
**Status:** Approved  
**Author:** Software Architecture & Engineering Team  
**Scope:** Core Architecture, Data Flow, Layering, Deterministic Invariants, Security, Scalability  

---

## 1. Executive Summary & Core Invariant

The platform is a multi-discipline deterministic analytical engine covering:
1. **Western Astrology** (Tropical, Sidereal, Multi-House Systems, Aspects, Transits)
2. **Eastern Astrology / Tử Vi Đẩu Số** (Vietnamese Astronomical Lunar Calendar, Can Chi, 12 Palaces, Chính Tinh, Phụ Tinh, Tứ Hóa, Đại/Tiểu Hạn)
3. **Numerology** (Pythagorean System, Vietnamese diacritic normalization, Master Numbers 11/22/33)
4. **Tarot** (Rider-Waite-Smith 78-card deck, Seeded PRNG shuffle, Dynamic Spreads)

### The Determinism Invariant

$$\text{Reading} = f(\text{Input}, \text{ConfigVersion}, \text{EngineVersion}, \text{RuleVersion}, \text{KnowledgeVersion})$$

Given the identical tuple $(\text{Input}, C, E, R, K)$, the system **must produce byte-for-byte identical calculated facts, matched rule lists, and rendered interpretation text blocks**. 

* **ZERO Generative AI / LLM:** No OpenAI, Anthropic, Gemini, or any stochastic text generation in calculations, rule selections, or readings.
* **Traceable Lineage:** Every single paragraph, sentence, and recommendation presented to the end-user must link to a specific rule ID and underlying astronomical/mathematical fact.
* **Degraded Mode on Incomplete Data:** If birth time is approximate or unknown, the system must explicitly calculate only time-invariant bodies, completely disable house cusps and Ascendant, and render data-completeness warnings.

---

## 2. High-Level System Architecture

The system follows a strict **Hexagonal / Clean Architecture** with unidirectional data flow through seven distinct, decoupled layers:

```
User -> Frontend (Next.js 15) -> API Layer (NestJS/Node REST) 
     -> Calculation Engines (Pure Astro, Tử Vi, Numerology, Tarot) 
     -> Fact Aggregator (Chuẩn hóa Dictionary phẳng dot-notation)
     -> Deterministic Rule Engine (AST, Specificity, Conflict Resolver)
     -> Knowledge Base & Safe Template Engine
     -> Result Composer & Traceability Logger ("Why this result?")
     -> Output Reading
```

---

## 3. Layer Separation of Concerns

1. **Calculation Engines NEVER interpret.**  
   *Astrology Engine calculates degrees, signs, houses, and aspect angles ($120.4^\circ$). It never outputs phrases like "You are emotional".*
2. **Rule Engine NEVER calculates astronomical or numerological math.**  
   *Rule Engine strictly operates on pre-calculated facts passed in via the Fact Aggregator.*
3. **Knowledge Base NEVER makes decisions.**  
   *Knowledge Base stores structured textual blocks categorized by themes, domains, and tokens. It never decides which block applies.*
4. **Template Engine NEVER fetches data.**  
   *Template Engine takes a template string and a resolved dictionary of values, performing substitution with escaping.*

---

## 4. Caching & Performance Architecture

$$\text{CacheKey} = \text{SHA256}(\text{InputPayload} + \text{EngineVersion} + \text{ConfigVersion} + \text{RulesetVersion})$$
