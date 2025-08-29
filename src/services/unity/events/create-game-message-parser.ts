/**
 * Génère un parseur de message générique pour un jeu Unity.
 * @param patterns Liste des patterns à matcher
 * @param unknownType Valeur à utiliser pour le type UNKNOWN
 * @returns Fonction de parsing typée
 */
export function createGameMessageParser<TType extends string, TParsed extends { type: TType; timestamp: number }>(
  patterns: Array<{ pattern: RegExp; type: TType; hasNumericValue?: boolean }>,
  unknownType: TType
) {
  return function parse(message: string): TParsed | null {
    if (!message || typeof message !== 'string') return null;
    const normalizedMessage = message.toLowerCase().trim();
    if (!normalizedMessage) return null;
    for (const patternConfig of patterns) {
      const match = normalizedMessage.match(patternConfig.pattern);
      if (match) {
        const result = {
          type: patternConfig.type,
          timestamp: Date.now()
        } as Record<string, unknown>;
        if (match[1]) {
          result.value = match[1];
          if (patternConfig.hasNumericValue && /^\d+$/.test(match[1])) {
            const numericValue = parseInt(match[1], 10);
            if (!isNaN(numericValue)) {
              result.numericValue = numericValue;
            }
          }
        }
        return result as unknown as TParsed;
      }
    }
    return {
      type: unknownType,
      value: message,
      timestamp: Date.now()
    } as unknown as TParsed;
  };
}
