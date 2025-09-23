import React, { useState, useRef } from 'react';
import { CountingMachineMessageType } from '@/services/unity/games/counting-machine/types';
import { getAssistantMessageLines } from '@/app/assistant/get-assistant-message-lines';
import { textToSpeechService } from '@/services/speech/text-to-speech';

const typeOptions = Object.values(CountingMachineMessageType);

function typewriterEffect(text: string, setText: (t: string) => void, isCancelled: { current: boolean }, speed = 24): Promise<void> {
  return new Promise(resolve => {
    let i = 0;
    setText('');
    function next() {
      if (isCancelled.current) return resolve();
      setText(text.slice(0, i));
      if (i < text.length) {
        i++;
        setTimeout(next, speed);
      } else {
        setText(text);
        resolve();
      }
    }
    next();
  });
}

export interface MaitreCountingMachineDemoProps {
  className?: string;
  style?: React.CSSProperties;
  typewriterSpeed?: number;
  cardTitle?: string;
}

const defaultCardTitle = 'Test Maître Counting Machine';

export default function MaitreCountingMachineDemo({
  className = '',
  style = {},
  typewriterSpeed = 24,
  cardTitle = defaultCardTitle
}: MaitreCountingMachineDemoProps) {
  const [eventType, setEventType] = useState<CountingMachineMessageType>(CountingMachineMessageType.ADD_GOAL);
  const [attempt, setAttempt] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState<string>('');
  const isCancelled = useRef(false);

  const handleTest = async () => {
    if (isPlaying) return;
    setCurrentText('');
    setIsPlaying(true);
    isCancelled.current = false;
    let lines: string[] = [];
    const context: Record<string, unknown> = {
      gameInstruction: "Utilise les 4 rouleaux colorés pour composer le nombre demandé. Chaque rouleau contrôle une position : rouge = milliers, orange = centaines, vert = dizaines, bleu = unités. Clique sur + ou - pour faire tourner les rouleaux. Quand tu as le bon nombre, clique sur VALIDER ! Effets magiques et sons rigolos t’accompagnent."
    };
    if (eventType === CountingMachineMessageType.WRONG_VALUE) context.attempt = attempt;
    lines = await getAssistantMessageLines({
      game: 'counting-machine',
      eventType,
      context,
      lang: 'fr',
      persona: 'Maître Rouleau, vieux magicien des chiffres, drôle, patient, toujours encourageant, adore les énigmes et félicite chaque progrès.'
    });
    for (let i = 0; i < lines.length; i++) {
      if (isCancelled.current) break;
      setCurrentText('');
      // Lancer TTS et typewriter en même temps
      const ttsPromise = speakAndWait(lines[i]);
      typewriterEffect(lines[i], setCurrentText, isCancelled, typewriterSpeed);
      await ttsPromise;
    }
    setIsPlaying(false);
  };

  const speakAndWait = (text: string) => {
    return new Promise<void>((resolve) => {
      textToSpeechService.setCallbacks({
        onEnd: () => resolve(),
        onError: () => resolve(),
      });
      textToSpeechService.speak(text);
    });
  };

  const handleCancel = () => {
    isCancelled.current = true;
    textToSpeechService.stop();
    setIsPlaying(false);
  };

  return (
    <div
      className={`meko-card max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-meko-blue-light-1 ${className}`}
      style={style}
    >
      <h1 className="text-2xl font-bold mb-4 text-meko-blue-darker text-center">
        {cardTitle}
      </h1>
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-meko-blue-darker">Type d'événement</label>
          <select
            className="w-full border rounded p-2 focus:ring-meko-blue focus:border-meko-blue"
            value={eventType}
            onChange={e => setEventType(e.target.value as CountingMachineMessageType)}
            disabled={isPlaying}
          >
            {typeOptions.map(type => (
              <option key={type} value={type}>{type === CountingMachineMessageType.ADD_GOAL ? 'Présentation / Intro (ADD_GOAL)' : type}</option>
            ))}
          </select>
        </div>
        {eventType === CountingMachineMessageType.WRONG_VALUE && (
          <div>
            <label className="block mb-1 text-meko-blue-darker">Tentative (attempt)</label>
            <input
              type="number"
              min={1}
              value={attempt}
              onChange={e => setAttempt(Number(e.target.value))}
              className="w-full border rounded p-2 focus:ring-meko-blue focus:border-meko-blue"
              disabled={isPlaying}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 mb-4 justify-center">
        <button
          className="px-4 py-2 bg-meko-blue-darker text-white rounded hover:bg-meko-blue-light-1 disabled:opacity-50 transition"
          onClick={handleTest}
          disabled={isPlaying}
        >
          {isPlaying ? 'Lecture en cours...' : 'Tester'}
        </button>
        {isPlaying && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={handleCancel}
          >
            Stop
          </button>
        )}
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-2 text-meko-blue-darker">Message retourné :</h2>
        <div className="bg-meko-blue-light-1/30 rounded p-4 min-h-[3rem] flex items-center text-lg font-medium animate-fade-in text-left border border-meko-blue-light-1">
          {currentText}
        </div>
      </div>
    </div>
  );
}
