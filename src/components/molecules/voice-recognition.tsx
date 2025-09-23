import { useSpeechToText } from '@/hooks/use-speech-to-text';

export function VoiceRecognitionExample() {
  const {
    transcript,
    isListening,
    isSupported,
    confidence,
    error,
    start,
    stop,
    reset
  } = useSpeechToText({
    config: {
      language: 'fr-FR',
      continuous: true,
      interimResults: true
    },
    onResult: (result) => {
      console.log('Résultat vocal:', result);
    },
    onError: (error) => {
      console.error('Erreur reconnaissance vocale:', error);
    }
  });

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded-md">
        <p className="text-red-700">
          La reconnaissance vocale n'est pas supportée par votre navigateur.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Reconnaissance Vocale</h2>
      
      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <button
            onClick={start}
            disabled={isListening}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isListening ? 'En écoute...' : 'Démarrer'}
          </button>
          
          <button
            onClick={stop}
            disabled={!isListening}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Arrêter
          </button>
          
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
          <span className="text-sm text-gray-600">
            {isListening ? 'Microphone actif' : 'Microphone inactif'}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Transcription :
        </label>
        <textarea
          value={transcript}
          readOnly
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 resize-none"
          placeholder="Parlez dans le microphone..."
        />
      </div>

      {confidence > 0 && (
        <div className="mb-4">
          <span className="text-sm text-gray-600">
            Confiance : {Math.round(confidence * 100)}%
          </span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded-md">
          <p className="text-sm text-red-700">Erreur : {error}</p>
        </div>
      )}
    </div>
  );
}

// Composant simple pour usage direct
export function QuickVoiceInput({ 
  onTranscript, 
  placeholder = "Cliquez et parlez..." 
}: { 
  onTranscript?: (text: string) => void;
  placeholder?: string;
}) {
  const { transcript, isListening, start, stop, reset } = useSpeechToText({
    config: { language: 'fr-FR' },
    onResult: (result) => {
      if (result.isFinal && onTranscript) {
        onTranscript(result.transcript);
      }
    }
  });

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isListening ? stop : start}
        className={`p-2 rounded-full ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
        title={isListening ? 'Arrêter l\'écoute' : 'Commencer l\'écoute'}
      >
        <svg 
          className="w-4 h-4" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          {isListening ? (
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a2 2 0 113.333 2.157A2 2 0 019 10.5V7H8z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          )}
        </svg>
      </button>
      
      <input
        type="text"
        value={transcript}
        readOnly
        placeholder={placeholder}
        className="flex-1 p-2 border border-gray-300 rounded-md bg-gray-50"
      />
      
      {transcript && (
        <button
          onClick={reset}
          className="p-2 text-gray-500 hover:text-gray-700"
          title="Effacer"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}
