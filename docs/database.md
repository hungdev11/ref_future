# Database Schema Specification

**Document Version:** 1.0.0  
**Database Engine:** PostgreSQL 15+  
**ORM:** Prisma ORM  

Refer to `apps/api/prisma/schema.prisma` for the active Prisma ORM code.
All schema entities have been verified with `prisma validate`:
- User, Profile, BirthData
- AstrologyChart, AstrologyPosition, AstrologyHouse, AstrologyAspect
- TuViChart, TuViPalace, TuViStarPlacement, TuViCycle
- NumerologyProfile, NumerologyResult, NumerologyCycle
- TarotDeck, TarotCard, TarotSpread, TarotSpreadPosition, TarotReading, TarotDraw
- RuleSet, Rule, RuleVersion, Interpretation, InterpretationBlock
- Reading, ReadingSection, ReadingRuleTrace, CompatibilityReport, AuditLog
