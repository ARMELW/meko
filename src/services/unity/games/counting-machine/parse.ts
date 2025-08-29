import { CountingMachineMessageType, CountingMachineParsedMessage } from './types';
import { COUNTING_MACHINE_PATTERNS } from './patterns';

export function parseCountingMachineMessage(message: string): CountingMachineParsedMessage | null {
  if (!message || typeof message !== 'string') return null;
  const normalizedMessage = message.toLowerCase().trim();
  if (!normalizedMessage) return null;
  for (const patternConfig of COUNTING_MACHINE_PATTERNS) {
    const match = normalizedMessage.match(patternConfig.pattern);
    if (match) {
      const result: CountingMachineParsedMessage = {
        type: patternConfig.type,
        timestamp: Date.now()
      };
      if (match[1]) {
        result.value = match[1];
        if (patternConfig.hasNumericValue && /^\d+$/.test(match[1])) {
          const numericValue = parseInt(match[1], 10);
          if (!isNaN(numericValue)) {
            result.numericValue = numericValue;
          }
        }
      }
      return result;
    }
  }
  return {
    type: CountingMachineMessageType.UNKNOWN,
    value: message,
    timestamp: Date.now()
  };
}
