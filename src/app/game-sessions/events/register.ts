import { GameEventHandlersParams, GameEventListener } from "@/services/unity/events/game-event-listener";
import { CountingMachineEventListener } from "./listeners/count-machine-listener";

export function createGameEventListener(game: string, params: GameEventHandlersParams): GameEventListener | null {
    switch (game) {
        case 'counting-machine':
            return new CountingMachineEventListener(params);
        default:
            return null;
    }
}
