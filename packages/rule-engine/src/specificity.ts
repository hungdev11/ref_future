import {
  ConditionNode,
  ConditionOperator,
  isBranchCondition,
  LeafCondition,
} from '@mystic/core';

export function calculateSpecificityScore(node: ConditionNode): number {
  if (!isBranchCondition(node)) {
    return scoreLeaf(node);
  }

  let total = 0;
  for (const child of node.conditions) {
    total += calculateSpecificityScore(child);
  }

  if (node.combinator === 'AND' && node.conditions.length > 1) {
    total += 5 * (node.conditions.length - 1);
  }

  return total;
}

function scoreLeaf(leaf: LeafCondition): number {
  let score = 10;

  if (leaf.operator === ConditionOperator.BETWEEN || leaf.operator === ConditionOperator.IN) {
    score = 15;
  }

  if (leaf.field.includes('.aspect') || leaf.field.includes('.orb')) {
    score += 15;
  }

  if (leaf.field.startsWith('cross.')) {
    score += 30;
  }

  return score;
}
