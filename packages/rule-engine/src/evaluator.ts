import {
  ConditionNode,
  LeafCondition,
  BranchCondition,
  ConditionOperator,
  isBranchCondition,
} from '@mystic/core';

export interface ConditionTrace {
  field: string;
  operator: ConditionOperator | string;
  expected: unknown;
  actual: unknown;
  passed: boolean;
  message?: string;
}

export interface NodeEvaluationResult {
  passed: boolean;
  traces: ConditionTrace[];
}

export function getFactValue(facts: Record<string, unknown>, path: string): unknown {
  if (path in facts) {
    return facts[path];
  }

  const parts = path.split('.');
  let current: unknown = facts;

  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

export function evaluateLeaf(
  condition: LeafCondition,
  facts: Record<string, unknown>
): ConditionTrace {
  const actual = getFactValue(facts, condition.field);
  const expected = condition.value;
  let passed = false;
  let message: string | undefined;

  switch (condition.operator) {
    case ConditionOperator.EQUALS:
      passed = actual === expected;
      break;

    case ConditionOperator.NOT_EQUALS:
      passed = actual !== expected;
      break;

    case ConditionOperator.GREATER_THAN:
      passed = typeof actual === 'number' && typeof expected === 'number' && actual > expected;
      break;

    case ConditionOperator.GREATER_EQUAL:
      passed = typeof actual === 'number' && typeof expected === 'number' && actual >= expected;
      break;

    case ConditionOperator.LESS_THAN:
      passed = typeof actual === 'number' && typeof expected === 'number' && actual < expected;
      break;

    case ConditionOperator.LESS_EQUAL:
      passed = typeof actual === 'number' && typeof expected === 'number' && actual <= expected;
      break;

    case ConditionOperator.BETWEEN:
      if (Array.isArray(expected) && expected.length === 2 && typeof actual === 'number') {
        passed = actual >= expected[0] && actual <= expected[1];
      }
      break;

    case ConditionOperator.IN:
      if (Array.isArray(expected)) {
        passed = expected.includes(actual);
      }
      break;

    case ConditionOperator.NOT_IN:
      if (Array.isArray(expected)) {
        passed = !expected.includes(actual);
      }
      break;

    case ConditionOperator.CONTAINS:
      if (Array.isArray(actual)) {
        passed = actual.includes(expected);
      } else if (typeof actual === 'string' && typeof expected === 'string') {
        passed = actual.includes(expected);
      }
      break;

    case ConditionOperator.EXISTS:
      passed = condition.value === false
        ? actual === undefined || actual === null
        : actual !== undefined && actual !== null;
      break;

    case ConditionOperator.MATCHES:
      if (typeof actual === 'string' && typeof expected === 'string') {
        try {
          const regex = new RegExp(expected);
          passed = regex.test(actual);
        } catch (err) {
          passed = false;
          message = `Invalid regex pattern: ${expected}`;
        }
      }
      break;

    default:
      passed = false;
      message = `Unsupported operator: ${condition.operator}`;
  }

  return {
    field: condition.field,
    operator: condition.operator,
    expected,
    actual,
    passed,
    message,
  };
}

export function evaluateConditionNode(
  node: ConditionNode,
  facts: Record<string, unknown>
): NodeEvaluationResult {
  if (!isBranchCondition(node)) {
    const trace = evaluateLeaf(node, facts);
    return {
      passed: trace.passed,
      traces: [trace],
    };
  }

  const branch = node as BranchCondition;
  const childTraces: ConditionTrace[] = [];

  if (branch.combinator === 'AND') {
    let allPassed = true;
    for (const child of branch.conditions) {
      const childResult = evaluateConditionNode(child, facts);
      childTraces.push(...childResult.traces);
      if (!childResult.passed) {
        allPassed = false;
      }
    }
    return { passed: allPassed, traces: childTraces };
  }

  if (branch.combinator === 'OR') {
    let anyPassed = false;
    for (const child of branch.conditions) {
      const childResult = evaluateConditionNode(child, facts);
      childTraces.push(...childResult.traces);
      if (childResult.passed) {
        anyPassed = true;
      }
    }
    return { passed: anyPassed, traces: childTraces };
  }

  if (branch.combinator === 'NOT') {
    if (branch.conditions.length === 0) {
      return { passed: true, traces: [] };
    }
    const childResult = evaluateConditionNode(branch.conditions[0]!, facts);
    return {
      passed: !childResult.passed,
      traces: childResult.traces,
    };
  }

  return { passed: false, traces: [] };
}
