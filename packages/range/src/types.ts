import type Range from './index.js';

export type RangeEdgeType = 'open' | 'closed' | 'leftOpen' | 'rightOpen';

export interface RangeDescriptor {
  from?: number;
  to?: number;
  step?: number;
  type?: RangeEdgeType;
}

export type RangeCallback = (num: number, index: number, range: Range) => void;
