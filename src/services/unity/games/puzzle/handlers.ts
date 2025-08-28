import { PuzzleMessageType, PuzzleParsedMessage } from './types';
import EventBus from '../../event-bus';



export const puzzleEventBus = new EventBus<Record<PuzzleMessageType, PuzzleParsedMessage>>();
export const puzzleHandlers: Record<PuzzleMessageType, (msg: PuzzleParsedMessage) => void> =
  Object.fromEntries(
    Object.values(PuzzleMessageType).map(type => [
      type,
      (msg: PuzzleParsedMessage) => puzzleEventBus.emit(type, msg)
    ])
  ) as Record<PuzzleMessageType, (msg: PuzzleParsedMessage) => void>;
