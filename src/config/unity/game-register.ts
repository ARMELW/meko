import { countingMachineEventBus } from "@/services/unity/games/counting-machine/event-bus";
import { GameEventBusEntry } from "@/services/unity/events/setup-game-events";
import { CountingMachineMessageType } from "@/services/unity/games/counting-machine/types";
type CountingMachineEventMap = Record<string, unknown>;

export const GAME_EVENT_REGISTRY = {
  'counting-machine': {
    eventBus: countingMachineEventBus as GameEventBusEntry<CountingMachineEventMap>["eventBus"],
    MessageType: CountingMachineMessageType as Record<string, string>
  }
} as const;
