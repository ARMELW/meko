import { GameEventHandlersParams, GameEventListener } from "@/services/unity/events/game-event-listener";

export class CountingMachineEventListener extends GameEventListener {
    constructor(params: GameEventHandlersParams) {
        super(params);
    }

    onWrongValue(_msg: unknown) {
        console.log('it wrong');
     }
    onDone(_msg: unknown) { return this.params.handleCompleteSession(); }

    getListeners() {
        return {
            WRONG_VALUE: this.onWrongValue.bind(this),
            DONE: this.onDone.bind(this)
        };
    }
}
