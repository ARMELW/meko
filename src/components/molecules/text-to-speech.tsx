import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { useState } from 'react';

export function TextToSpeechExample() {
  const [text, setText] = useState('Bonjour, ceci est un test de synthèse vocale !');
  const {
    speak,
    pause,
    resume,
    stop,
    speaking,
    paused,
    isSupported,
    voices
  } = useTextToSpeech({
    config: {
      language: 'fr-FR',
      rate: 1,
      pitch: 1,
      volume: 1
    },
    onStart: () => console.log('Lecture démarrée'),
    onEnd: () => console.log('Lecture terminée'),
    onError: (error) => console.error('Erreur:', error)
  });

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded-md">
        <p className="text-red-700">
          La synthèse vocale n'est pas supportée par votre navigateur.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Synthèse Vocale</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Texte à lire :
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md resize-none"
          placeholder="Saisissez le texte à faire lire..."
        />
      </div>

      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => speak(text)}
            disabled={!text.trim() || speaking}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            🔊 Lire
          </button>
          
          <button
            onClick={paused ? resume : pause}
            disabled={!speaking}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {paused ? '▶️ Reprendre' : '⏸️ Pause'}
          </button>
          
          <button
            onClick={stop}
            disabled={!speaking}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            ⏹️ Arrêter
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className={`w-3 h-3 rounded-full ${
            speaking 
              ? paused 
                ? 'bg-yellow-500' 
                : 'bg-green-500 animate-pulse' 
              : 'bg-gray-300'
          }`} />
          <span className="text-sm text-gray-600">
            {speaking 
              ? paused 
                ? 'En pause' 
                : 'En cours de lecture...' 
              : 'Prêt à lire'
            }
          </span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Voix disponibles : {voices.length}
        </label>
        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
          {voices
            .filter(voice => voice.lang.startsWith('fr'))
            .map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

// Composant simple pour lecture de texte
export function SpeakButton({ 
  text, 
  children = "🔊 Lire",
  className = "px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
}: { 
  text: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { speak, speaking } = useTextToSpeech();

  return (
    <button
      onClick={() => speak(text)}
      disabled={speaking || !text.trim()}
      className={`${className} disabled:opacity-50`}
      title="Faire lire ce texte"
    >
      {speaking ? '🔊...' : children}
    </button>
  );
}

// Composant pour rendre n'importe quel texte "lisible"
export function ReadableText({ 
  children,
  showButton = true,
  autoSpeak = false
}: { 
  children: string;
  showButton?: boolean;
  autoSpeak?: boolean;
}) {
  const { speak, speaking } = useTextToSpeech({
    onStart: () => console.log(`Lecture: "${children.substring(0, 50)}..."`),
  });

  const handleSpeak = () => speak(children);

  // Auto-speak si demandé
  if (autoSpeak && !speaking) {
    setTimeout(handleSpeak, 100);
  }

  return (
    <span className="relative group">
      {children}
      {showButton && (
        <button
          onClick={handleSpeak}
          disabled={speaking}
          className="ml-2 p-1 text-blue-500 hover:text-blue-700 disabled:opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Faire lire ce texte"
        >
          🔊
        </button>
      )}
    </span>
  );
}
