import { PuzzleMessageType } from './types';

export const PUZZLE_PATTERNS = [
  { pattern: /^puzzle solved$/, type: PuzzleMessageType.PUZZLE_SOLVED },
  { pattern: /^hint used$/, type: PuzzleMessageType.HINT_USED },
  { pattern: /^done$/, type: PuzzleMessageType.DONE },
];
