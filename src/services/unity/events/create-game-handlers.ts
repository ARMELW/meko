/**
 * Génère un objet de handlers pour un event bus Unity typé.
 * Chaque handler émet simplement le message sur l'event bus.
 */
export function createGameHandlers<TType extends string, TPayload>(
  eventBus: { emit: (type: TType, msg: TPayload) => void },
  types: Record<string, TType>
) {
  return Object.fromEntries(
    Object.values(types).map(type => [
      type,
      (msg: TPayload) => eventBus.emit(type, msg)
    ])
  ) as Record<TType, (msg: TPayload) => void>;
}
