export enum PuzzleMessageType {
  PUZZLE_SOLVED = 'puzzleSolved',
  HINT_USED = 'hintUsed',
  DONE = 'done',
  UNKNOWN = 'unknown'
}

export interface PuzzleParsedMessage {
  type: PuzzleMessageType;
  value?: string;
  timestamp?: number;
}
