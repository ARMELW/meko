// Service principal de reconnaissance vocale
export { speechToTextService } from './services/speech/speech-to-text';
export type { 
  SpeechToTextConfig, 
  SpeechResult, 
  SpeechToTextCallbacks 
} from './services/speech/speech-to-text';

// Service principal de synthèse vocale
export { textToSpeechService } from './services/speech/text-to-speech';
export type { 
  TextToSpeechConfig, 
  TextToSpeechCallbacks 
} from './services/speech/text-to-speech';

// Hook React pour la reconnaissance vocale
export { 
  useSpeechToText, 
  useVoiceRecognition 
} from './hooks/use-speech-to-text';
export type { 
  UseSpeechToTextOptions, 
  UseSpeechToTextReturn 
} from './hooks/use-speech-to-text';

// Hook React pour la synthèse vocale
export { 
  useTextToSpeech, 
  useVoiceReader 
} from './hooks/use-text-to-speech';
export type { 
  UseTextToSpeechOptions, 
  UseTextToSpeechReturn 
} from './hooks/use-text-to-speech';

// Composants prêts à l'emploi pour reconnaissance vocale
export { 
  VoiceRecognitionExample, 
  QuickVoiceInput 
} from './components/molecules/voice-recognition';

// Composants prêts à l'emploi pour synthèse vocale
export { 
  TextToSpeechExample, 
  SpeakButton,
  ReadableText 
} from './components/molecules/text-to-speech';

// Utilitaires simples pour usage direct
export { 
  voiceHelper, 
  listen, 
  speak,
  stopListening, 
  stopSpeaking,
  isVoiceSupported,
  isSpeechSupported 
} from './utils/voice-helper';
