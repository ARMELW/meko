import { PuzzleMessageType, PuzzleParsedMessage } from './types';
import { PUZZLE_PATTERNS } from './patterns';

export function parsePuzzleMessage(message: string): PuzzleParsedMessage | null {
  if (!message || typeof message !== 'string') return null;
  const normalizedMessage = message.toLowerCase().trim();
  if (!normalizedMessage) return null;
  for (const patternConfig of PUZZLE_PATTERNS) {
    const match = normalizedMessage.match(patternConfig.pattern);
    if (match) {
      const result: PuzzleParsedMessage = {
        type: patternConfig.type,
        timestamp: Date.now()
      };
      if (match[1]) {
        result.value = match[1];
      }
      return result;
    }
  }
  return {
    type: PuzzleMessageType.UNKNOWN,
    value: message,
    timestamp: Date.now()
  };
}
