import { machineANombresEventBus } from '@/services/unity/games/machine-a-nombres/event-bus';
import { MachineANombresMessageType } from '@/services/unity/games/machine-a-nombres/types';

/**
 * Unity Bridge for Machine à Nombres
 * This module provides communication between the React game and Unity WebGL
 */

// Unity instance type (will be set by Unity WebGL)
declare global {
  interface Window {
    unityInstance?: {
      SendMessage: (objectName: string, methodName: string, value: string) => void;
    };
    onUnityMessage?: (message: string) => void;
  }
}

/**
 * Send a value change to Unity
 * @param value - The numeric value to display (e.g., 322 will display as 0322)
 */
export function changeCurrentValue(value: number): void {
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `SetValue${value}`);
  }
  
  // Emit event to local event bus
  machineANombresEventBus.emit(MachineANombresMessageType.SET_VALUE, {
    type: MachineANombresMessageType.SET_VALUE,
    value: value.toString(),
    numericValue: value,
    timestamp: Date.now()
  } as any);
}

/**
 * Send the goal list to Unity
 * @param goals - Array of numeric goals
 * Example: [544, 1352, 9871] -> "ChangeList544/1352/9871"
 */
export function changeCurrentGoalList(goals: number[]): void {
  const goalString = goals.join('/');
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `ChangeList${goalString}`);
  }
}

/**
 * Column locking logic:
 * - Unit (1s) locked: cannot increment/decrement by 1
 * - Tens (10s) locked: cannot increment/decrement by 1 if next value not in range (min: x90, max: x99)
 *   cannot increment/decrement by 10
 * - Hundreds (100s) locked: similar constraints for 1, 10, and 100
 * - Thousands (1000s) locked: similar constraints for 1, 10, 100, and 1000
 * Multiple columns can be locked simultaneously
 */

/**
 * Lock or unlock the thousands column (1000s)
 */
export function lockThousandRoll(locked: boolean): void {
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `LockThousand:${locked ? 1 : 0}`);
  }
  
  // Emit event to local event bus
  const eventType = locked ? MachineANombresMessageType.COLUMN_LOCKED : MachineANombresMessageType.COLUMN_UNLOCKED;
  machineANombresEventBus.emit(eventType, {
    type: eventType,
    columnIndex: 3, // Thousands column
    timestamp: Date.now()
  } as any);
}

/**
 * Lock or unlock the hundreds column (100s)
 */
export function lockHundredRoll(locked: boolean): void {
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `LockHundred:${locked ? 1 : 0}`);
  }
  
  // Emit event to local event bus
  const eventType = locked ? MachineANombresMessageType.COLUMN_LOCKED : MachineANombresMessageType.COLUMN_UNLOCKED;
  machineANombresEventBus.emit(eventType, {
    type: eventType,
    columnIndex: 2, // Hundreds column
    timestamp: Date.now()
  } as any);
}

/**
 * Lock or unlock the tens column (10s)
 */
export function lockTenRoll(locked: boolean): void {
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `LockTen:${locked ? 1 : 0}`);
  }
  
  // Emit event to local event bus
  const eventType = locked ? MachineANombresMessageType.COLUMN_LOCKED : MachineANombresMessageType.COLUMN_UNLOCKED;
  machineANombresEventBus.emit(eventType, {
    type: eventType,
    columnIndex: 1, // Tens column
    timestamp: Date.now()
  } as any);
}

/**
 * Lock or unlock the units column (1s)
 */
export function lockUnitRoll(locked: boolean): void {
  if (typeof window.unityInstance !== 'undefined') {
    window.unityInstance.SendMessage('WebBridge', 'ReceiveStringMessageFromJs', `LockUnit:${locked ? 1 : 0}`);
  }
  
  // Emit event to local event bus
  const eventType = locked ? MachineANombresMessageType.COLUMN_LOCKED : MachineANombresMessageType.COLUMN_UNLOCKED;
  machineANombresEventBus.emit(eventType, {
    type: eventType,
    columnIndex: 0, // Units column
    timestamp: Date.now()
  } as any);
}

/**
 * Emit a column add event
 */
export function emitAddUnit(columnIndex: number): void {
  machineANombresEventBus.emit(MachineANombresMessageType.ADD_UNIT, {
    type: MachineANombresMessageType.ADD_UNIT,
    columnIndex,
    timestamp: Date.now()
  } as any);
}

/**
 * Emit a column subtract event
 */
export function emitSubtractUnit(columnIndex: number): void {
  machineANombresEventBus.emit(MachineANombresMessageType.SUBTRACT_UNIT, {
    type: MachineANombresMessageType.SUBTRACT_UNIT,
    columnIndex,
    timestamp: Date.now()
  } as any);
}

/**
 * Emit a phase change event
 */
export function emitPhaseChanged(phase: string): void {
  machineANombresEventBus.emit(MachineANombresMessageType.PHASE_CHANGED, {
    type: MachineANombresMessageType.PHASE_CHANGED,
    phase,
    value: phase,
    timestamp: Date.now()
  } as any);
}

/**
 * Emit a value changed event
 */
export function emitValueChanged(value: number): void {
  machineANombresEventBus.emit(MachineANombresMessageType.VALUE_CHANGED, {
    type: MachineANombresMessageType.VALUE_CHANGED,
    numericValue: value,
    value: value.toString(),
    timestamp: Date.now()
  } as any);
}

/**
 * Handle incoming messages from Unity
 */
if (typeof window !== 'undefined') {
  window.onUnityMessage = function(message: string) {
    console.log("[UnityBridge] Message from Unity:", message);
    
    // Parse and emit the message through the event bus
    // The message will be parsed by the parseMachineANombresMessage function
    // which is registered in the Unity game registry
  };
}
