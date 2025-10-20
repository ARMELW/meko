# Machine à Nombres - Unity Integration

This module provides Unity event integration for the "Machine à Nombres" educational game.

## Overview

The Machine à Nombres game is an interactive number learning application for children aged 5-6 years. This Unity integration allows the game to communicate with Unity WebGL components and emit standardized events that can be tracked and processed by the meko academy platform.

## Event Types

The game emits the following event types:

### Machine State Events
- **SET_VALUE**: Triggered when the machine's displayed value is set programmatically
- **VALUE_CHANGED**: Triggered whenever the total numeric value changes

### Column Manipulation Events
- **ADD_UNIT**: Triggered when a unit is added to a column (user clicks △)
- **SUBTRACT_UNIT**: Triggered when a unit is subtracted from a column (user clicks ∇)
- **COLUMN_LOCKED**: Triggered when a column is locked
- **COLUMN_UNLOCKED**: Triggered when a column is unlocked

### Phase/Learning Events
- **PHASE_CHANGED**: Triggered when the game phase changes (e.g., from intro to tutorial)
- **CHALLENGE_STARTED**: Triggered when a challenge begins
- **CHALLENGE_VALIDATED**: Triggered when user attempts to validate a challenge
- **CHALLENGE_SUCCESS**: Triggered on successful challenge completion
- **CHALLENGE_FAILURE**: Triggered on failed challenge attempt

### Feedback Events
- **INSTRUCTION_UPDATED**: Triggered when the instruction text is updated
- **FEEDBACK_GIVEN**: Triggered when feedback is provided to the user

### Help System Events
- **HELP_REQUESTED**: Triggered when the user requests help
- **GUIDED_MODE_STARTED**: Triggered when guided assistance mode starts
- **SOLUTION_ANIMATION_STARTED**: Triggered when solution animation begins

### Game Flow Events
- **GAME_INITIALIZED**: Triggered when the game is initialized
- **GAME_COMPLETED**: Triggered when the game is fully completed

## Message Structure

Each event message follows this structure:

```typescript
interface MachineANombresParsedMessage {
  type: MachineANombresMessageType;
  value?: string;
  numericValue?: number;
  columnIndex?: number;  // 0: units, 1: tens, 2: hundreds, 3: thousands
  phase?: string;
  success?: boolean;
  timestamp: number;
}
```

## Usage Example

### Listening to Events

```typescript
import { machineANombresEventBus } from '@/services/unity/games/machine-a-nombres';
import { MachineANombresMessageType } from '@/services/unity/games/machine-a-nombres/types';

// Listen for value changes
machineANombresEventBus.on(MachineANombresMessageType.VALUE_CHANGED, (message) => {
  console.log('Value changed to:', message.numericValue);
});

// Listen for phase changes
machineANombresEventBus.on(MachineANombresMessageType.PHASE_CHANGED, (message) => {
  console.log('Phase changed to:', message.phase);
});
```

### Emitting Events

The game automatically emits events through the Unity bridge. For manual event emission:

```typescript
import { 
  emitValueChanged, 
  emitPhaseChanged,
  emitAddUnit,
  emitSubtractUnit 
} from '@/app/game-sessions/test/unityBridge';

// Emit a value change
emitValueChanged(1234);

// Emit a phase change
emitPhaseChanged('challenge-unit-1');

// Emit column operations
emitAddUnit(0);  // Add to units column
emitSubtractUnit(1);  // Subtract from tens column
```

## Unity WebGL Communication

The bridge also supports communication with Unity WebGL:

```typescript
import { 
  changeCurrentValue,
  changeCurrentGoalList,
  lockUnitRoll,
  lockTenRoll,
  lockHundredRoll,
  lockThousandRoll
} from '@/app/game-sessions/test/unityBridge';

// Set displayed value in Unity
changeCurrentValue(322);  // Displays as 0322

// Set goal list
changeCurrentGoalList([544, 1352, 9871]);

// Lock/unlock columns
lockUnitRoll(true);  // Lock units column
lockTenRoll(false);  // Unlock tens column
```

## Column Locking Logic

The game implements intelligent column locking:

- **Unit (1s) locked**: Cannot increment/decrement by 1
- **Tens (10s) locked**: 
  - Cannot increment/decrement by 1 if next value not in range (min: x90, max: x99)
  - Cannot increment/decrement by 10
- **Hundreds (100s) locked**: Similar constraints for 1, 10, and 100
- **Thousands (1000s) locked**: Similar constraints for 1, 10, 100, and 1000

Multiple columns can be locked simultaneously, and locking includes animation feedback.

## Integration with Game Store

The game store automatically emits events on key state changes:

- `setPhase()`: Emits `PHASE_CHANGED`
- `setColumns()`: Emits `VALUE_CHANGED`
- `handleAdd()`: Emits `ADD_UNIT`
- `handleSubtract()`: Emits `SUBTRACT_UNIT`

## Registry

The game is registered in the Unity game registry:

```typescript
// src/services/unity/registry.ts
{
  name: 'machine-a-nombres',
  patterns: MACHINE_A_NOMBRES_PATTERNS,
  handlers: machineANombresHandlers,
  parse: parseMachineANombresMessage,
}
```

## Files

- `types.ts`: Event type definitions and message interfaces
- `patterns.ts`: Message pattern matching rules
- `event-bus.ts`: Event bus instance
- `parse.ts`: Message parsing logic
- `handlers.ts`: Event handlers
- `index.ts`: Module exports

## Related Files

- `/app/game-sessions/test/unityBridge.ts`: Unity communication bridge
- `/app/game-sessions/test/store.ts`: Game state management with event emissions
- `/app/game-sessions/test/MachineANombres.tsx`: Main game component
