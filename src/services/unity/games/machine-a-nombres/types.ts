export enum MachineANombresMessageType {
  // Machine state events
  SET_VALUE = 'setValue',
  VALUE_CHANGED = 'valueChanged',
  
  // Column manipulation events
  ADD_UNIT = 'addUnit',
  SUBTRACT_UNIT = 'subtractUnit',
  COLUMN_LOCKED = 'columnLocked',
  COLUMN_UNLOCKED = 'columnUnlocked',
  
  // Phase/Learning events
  PHASE_CHANGED = 'phaseChanged',
  CHALLENGE_STARTED = 'challengeStarted',
  CHALLENGE_VALIDATED = 'challengeValidated',
  CHALLENGE_SUCCESS = 'challengeSuccess',
  CHALLENGE_FAILURE = 'challengeFailure',
  
  // Feedback events
  INSTRUCTION_UPDATED = 'instructionUpdated',
  FEEDBACK_GIVEN = 'feedbackGiven',
  
  // Help system events
  HELP_REQUESTED = 'helpRequested',
  GUIDED_MODE_STARTED = 'guidedModeStarted',
  SOLUTION_ANIMATION_STARTED = 'solutionAnimationStarted',
  
  // Game flow events
  GAME_INITIALIZED = 'gameInitialized',
  GAME_COMPLETED = 'gameCompleted',
  
  UNKNOWN = 'unknown'
}

export interface MachineANombresParsedMessage {
  type: MachineANombresMessageType;
  value?: string;
  numericValue?: number;
  columnIndex?: number;
  phase?: string;
  success?: boolean;
  timestamp: number;
}
