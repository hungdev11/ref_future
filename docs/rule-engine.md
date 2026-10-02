# Deterministic Rule Engine Specification

**Document Version:** 1.0.0  

1. Pure function evaluation on facts.
2. Specificity scoring formula:
   $$\text{Specificity} = \sum_{c \in \text{Conditions}} \text{Weight}(c)$$
3. Rank Score formula:
   $$\text{RankScore} = (\text{Priority} \times 1000) + \text{SpecificityScore}$$
4. Simulator output provides matched rules and skipped rules with condition failure reasons.
