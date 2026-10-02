# Tarot Engine Specification

**Document Version:** 1.0.0  
**Deck Standard:** Rider-Waite-Smith 78 cards  

- Seeded PRNG shuffle with Mulberry32.
- Spreads: 1-card, 3-card, 5-card, 10-card Celtic Cross.
- Dynamic admin-created spreads supported.
- Replay: Same seed + spread = identical draw.
