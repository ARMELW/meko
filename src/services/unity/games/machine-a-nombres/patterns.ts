import { MachineANombresMessageType } from './types';

export const MACHINE_A_NOMBRES_PATTERNS = [
  // Machine state patterns
  { pattern: /^set value (\d+)$/i, type: MachineANombresMessageType.SET_VALUE, hasNumericValue: true },
  { pattern: /^value changed (\d+)$/i, type: MachineANombresMessageType.VALUE_CHANGED, hasNumericValue: true },
  
  // Column manipulation patterns
  { pattern: /^add unit column (\d+)$/i, type: MachineANombresMessageType.ADD_UNIT, hasNumericValue: true },
  { pattern: /^subtract unit column (\d+)$/i, type: MachineANombresMessageType.SUBTRACT_UNIT, hasNumericValue: true },
  { pattern: /^lock column (\d+)$/i, type: MachineANombresMessageType.COLUMN_LOCKED, hasNumericValue: true },
  { pattern: /^unlock column (\d+)$/i, type: MachineANombresMessageType.COLUMN_UNLOCKED, hasNumericValue: true },
  
  // Phase/Learning patterns
  { pattern: /^phase changed (.+)$/i, type: MachineANombresMessageType.PHASE_CHANGED },
  { pattern: /^challenge started$/i, type: MachineANombresMessageType.CHALLENGE_STARTED },
  { pattern: /^challenge validated$/i, type: MachineANombresMessageType.CHALLENGE_VALIDATED },
  { pattern: /^challenge success$/i, type: MachineANombresMessageType.CHALLENGE_SUCCESS },
  { pattern: /^challenge failure$/i, type: MachineANombresMessageType.CHALLENGE_FAILURE },
  
  // Feedback patterns
  { pattern: /^instruction updated$/i, type: MachineANombresMessageType.INSTRUCTION_UPDATED },
  { pattern: /^feedback given$/i, type: MachineANombresMessageType.FEEDBACK_GIVEN },
  
  // Help system patterns
  { pattern: /^help requested$/i, type: MachineANombresMessageType.HELP_REQUESTED },
  { pattern: /^guided mode started$/i, type: MachineANombresMessageType.GUIDED_MODE_STARTED },
  { pattern: /^solution animation started$/i, type: MachineANombresMessageType.SOLUTION_ANIMATION_STARTED },
  
  // Game flow patterns
  { pattern: /^game initialized$/i, type: MachineANombresMessageType.GAME_INITIALIZED },
  { pattern: /^game completed$/i, type: MachineANombresMessageType.GAME_COMPLETED },
];
