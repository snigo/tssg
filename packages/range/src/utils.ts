import { getScale, round } from '@tssg/precise';

import { RangeEdgeType } from './types.js';

export function normalizeRangeStart(start: number | undefined) {
  const numeric = Number(start);
  if (start == null || Number.isNaN(numeric)) return -Infinity;
  return numeric;
}

export function normalizeRangeEnd(end: number | undefined) {
  const numeric = Number(end);
  if (end == null || Number.isNaN(numeric)) return Infinity;
  return numeric;
}

export function normalizeRangeStep(step: number | undefined) {
  const numeric = Number(step);
  if (step == null || !Number.isFinite(numeric) || numeric === 0) {
    return undefined;
  }
  return Math.abs(numeric);
}

export function getRangeScale(start: number, step = 1) {
  return Math.max(getScale(start), getScale(step));
}

export function getRangeLength(
  from: number,
  to: number,
  step: number | undefined,
  scale: number,
  fromInclusive: boolean,
  toInclusive: boolean,
) {
  if (!step) return Infinity;
  const diff = Math.abs(to - from);
  const isBalanced = round(diff / step, scale) % 1 === 0;
  const increment =
    Number(fromInclusive) + Number(isBalanced && toInclusive) - 1;
  return Math.ceil(diff / step) + increment;
}

export function assertValidType(type: RangeEdgeType) {
  if (!['open', 'closed', 'leftOpen', 'rightOpen'].includes(type)) {
    throw new SyntaxError(`Unknown RangeEdgeType: ${type}.`);
  }
}
