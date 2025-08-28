export interface GameEventHandlersParams {
    handleCompleteSession: () => Promise<void>;
    handleAbandonSession: () => Promise<void>;
}
export abstract class GameEventListener {
    protected readonly params: GameEventHandlersParams;
    constructor(params: GameEventHandlersParams) {
        this.params = params;
    }
    abstract getListeners(): Record<string, (msg: unknown) => void>;
}