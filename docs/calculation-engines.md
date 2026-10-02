# Calculation Engines Specification

**Document Version:** 1.0.0  

All engines implement `ICalculationEngine<TInput, TConfig, TFacts>`:
- `hashInput()`: SHA-256 hash of input + version.
- `validateInput()`: Boundary checks.
- `calculate()`: Pure astronomical / mathematical calculations.
- Degraded mode for unknown birth time.
