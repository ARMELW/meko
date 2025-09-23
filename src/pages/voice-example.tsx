import { useState } from 'react';
import { 
  speak, 
  stopSpeaking, 
  useTextToSpeech, 
  SpeakButton, 
  ReadableText,
  TextToSpeechExample
} from '@/speech';
import { PersonaConfigurator } from '../components/molecules/persona-configurator';

export function VoiceExamplePage() {
  const [customText, setCustomText] = useState('Bonjour ! Ceci est un exemple de synthèse vocale.');
  const [gameTime, setGameTime] = useState(125); // 2 minutes 5 secondes
  
  const { speak: speakHook, speaking, stop } = useTextToSpeech({
    config: {
      rate: 1,
      pitch: 1,
      volume: 0.8
    },
    onStart: () => console.log('Lecture démarrée'),
    onEnd: () => console.log('Lecture terminée')
  });

  // Exemples de textes pour les jeux
  const gameTexts = {
    welcome: "Bienvenue dans le jeu Meko Academy ! Prépare-toi à apprendre en t'amusant.",
    instructions: "Clique sur les chiffres dans l'ordre croissant pour gagner des points.",
    timeWarning: "Attention ! Il te reste moins d'une minute pour terminer.",
    success: "Félicitations ! Tu as réussi le niveau avec un excellent score.",
    gameOver: "Temps écoulé ! N'hésite pas à réessayer pour améliorer ton score."
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes > 1 ? 's' : ''} et ${remainingSeconds} seconde${remainingSeconds > 1 ? 's' : ''}`;
  };

  const speakTime = () => {
    const timeText = `Temps écoulé : ${formatTime(gameTime)}`;
    speak(timeText);
  };

  const speakCustomText = () => {
    speakHook(customText);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Exemples de Synthèse Vocale
          </h1>
          <p className="text-gray-600">
            Découvre comment faire parler ton application web
          </p>
        </header>

        {/* Persona Configuration */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm mr-2">P</span>
            Configuration du Professeur
          </h2>
          <PersonaConfigurator />
        </section>

        {/* Exemple 1: Fonction simple speak() */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2">1</span>
            Fonction simple <code className="bg-gray-100 px-2 py-1 rounded ml-2">speak()</code>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Textes de jeu :</h3>
              <div className="space-y-2">
                {Object.entries(gameTexts).map(([key, text]) => (
                  <button
                    key={key}
                    onClick={() => speak(text)}
                    className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded border transition-colors"
                  >
                    <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="text-sm text-gray-600 truncate">{text}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Temps de jeu :</h3>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-2xl font-mono mb-2">
                  {Math.floor(gameTime / 60).toString().padStart(2, '0')}:
                  {(gameTime % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={speakTime}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    🔊 Dire le temps
                  </button>
                  <button
                    onClick={() => setGameTime(prev => prev + 30)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    +30s
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-sm">
              <strong>Code :</strong> <code>speak("Votre texte ici")</code>
            </p>
          </div>
        </section>

        {/* Exemple 2: Hook useTextToSpeech */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2">2</span>
            Hook React <code className="bg-gray-100 px-2 py-1 rounded ml-2">useTextToSpeech</code>
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Texte personnalisé :</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded resize-none"
                placeholder="Saisissez votre texte..."
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={speakCustomText}
                disabled={speaking || !customText.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {speaking ? '🔊 En cours...' : '🔊 Lire'}
              </button>
              
              <button
                onClick={stop}
                disabled={!speaking}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                ⏹️ Arrêter
              </button>
              
              <button
                onClick={stopSpeaking}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                🔇 Tout arrêter
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-400">
            <p className="text-sm">
              <strong>Code :</strong> <code>const {`{ speak, speaking, stop }`} = useTextToSpeech()</code>
            </p>
          </div>
        </section>

        {/* Exemple 3: Composants prêts à l'emploi */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibent mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm mr-2">3</span>
            Composants prêts à l'emploi
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">SpeakButton :</h3>
              <div className="flex flex-wrap gap-2">
                <SpeakButton 
                  text="Ceci est un bouton qui parle !"
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  🎤 Bouton parlant
                </SpeakButton>
                
                <SpeakButton 
                  text="Instructions: Trouve tous les objets cachés dans cette image"
                >
                  📢 Instructions
                </SpeakButton>
                
                <SpeakButton 
                  text="Bravo ! Tu as terminé ce niveau avec succès."
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  🎉 Félicitations
                </SpeakButton>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">ReadableText :</h3>
              <div className="space-y-2 p-4 bg-gray-50 rounded">
                <p>
                  <ReadableText showButton={true}>
                    Voici un texte qui peut être lu automatiquement. 
                    Survole-le pour voir apparaître le bouton de lecture.
                  </ReadableText>
                </p>
                
                <p>
                  <ReadableText showButton={true}>
                    Les instructions du jeu : Clique sur les formes qui correspondent 
                    à la couleur demandée. Tu as 60 secondes pour en trouver le maximum !
                  </ReadableText>
                </p>
                
                <p>
                  <ReadableText showButton={false} autoSpeak={false}>
                    Ce texte n'a pas de bouton de lecture visible, 
                    mais peut être configuré pour se lire automatiquement.
                  </ReadableText>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-purple-50 border-l-4 border-purple-400">
            <p className="text-sm">
              <strong>Code :</strong> <code>{`<SpeakButton text="Mon texte">Bouton</SpeakButton>`}</code>
              <br />
              <strong>Code :</strong> <code>{`<ReadableText>Mon texte lisible</ReadableText>`}</code>
            </p>
          </div>
        </section>

        {/* Exemple 4: Interface complète */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm mr-2">4</span>
            Interface complète
          </h2>
          
          <TextToSpeechExample />

          <div className="mt-4 p-3 bg-orange-50 border-l-4 border-orange-400">
            <p className="text-sm">
              <strong>Composant :</strong> <code>{`<TextToSpeechExample />`}</code>
            </p>
          </div>
        </section>

        {/* Guide d'utilisation */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Guide d'utilisation</h2>
          
          <div className="prose max-w-none">
            <h3>Installation dans vos composants :</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`import { speak, useTextToSpeech, SpeakButton } from '@/speech';

// Utilisation simple
speak("Mon message");

// Dans un composant React
function MonComposant() {
  const { speak, speaking } = useTextToSpeech();
  
  return (
    <button onClick={() => speak("Hello !")}>
      {speaking ? "🔊..." : "Parler"}
    </button>
  );
}

// Bouton prêt à l'emploi
<SpeakButton text="Message à lire">
  🔊 Écouter
</SpeakButton>`}
            </pre>

            <h3>Cas d'usage pour les jeux :</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Instructions :</strong> Lire les règles du jeu</li>
              <li><strong>Feedback :</strong> Annoncer les succès/échecs</li>
              <li><strong>Temps :</strong> Annoncer le temps écoulé</li>
              <li><strong>Score :</strong> Lire le score actuel</li>
              <li><strong>Accessibilité :</strong> Aide pour les malvoyants</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
