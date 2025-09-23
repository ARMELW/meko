import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAssistantStore } from './assistantStore';
import { useAssistantContextStore } from '@/app/assistant/store';
import { countingMachineEventBus } from '@/services/unity/games/counting-machine/event-bus';
import { CountingMachineMessageType } from '@/services/unity/games/counting-machine/types';
import { getAssistantMessageLines } from '@/app/assistant/get-assistant-message-lines';
import { textToSpeechService } from '@/services/speech/text-to-speech';
import { playAudio } from '@/services/audio/play-audio';

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

const assistantBg = 'bg-meko-blue-light-1/30';

type CountingMachineAssistantProps = {
    sendMessage?: (gameObject: string, method: string, parameter: string) => void;
    completed: () => void;
};
export default function CountingMachineAssistant({ sendMessage,completed }: CountingMachineAssistantProps) {
    const [currentText, setCurrentText] = useState('');
    const { setAssistantReady, setIsLoading } = useAssistantStore();
    const { currentValue, goal, attempt, setCurrentValue, setGoal, incrementAttempt, resetAttempt } = useAssistantContextStore();
    const isCancelled = useRef(false);
    const isPlaying = useRef(false);
    const currentValueRef = useRef(currentValue);
    const goalRef = useRef(goal);
    const attemptRef = useRef(attempt);
    useEffect(() => { currentValueRef.current = currentValue; }, [currentValue]);
    useEffect(() => { goalRef.current = goal; }, [goal]);
    useEffect(() => { attemptRef.current = attempt; }, [attempt]);



    const speakAndWait = useCallback((text: string) => {
        return new Promise<void>((resolve) => {
            textToSpeechService.setCallbacks({
                onEnd: () => resolve(),
                onError: () => resolve(),
            });
            textToSpeechService.speak(text);
        });
    }, []);

    interface CountingMachineEvent {
        type: string;
        numericValue?: number;
        [key: string]: unknown;
    }
    const { setAssistantSpeaking } = useAssistantContextStore();
    const handleEvent = useCallback(async (msg: CountingMachineEvent) => {
        if (!msg?.type) return;
        const type = (Object.values(CountingMachineMessageType) as string[]).includes(msg.type)
            ? (msg.type as CountingMachineMessageType)
            : CountingMachineMessageType.UNKNOWN;
        isCancelled.current = false;
        isPlaying.current = true;
    setIsLoading(true);
    setAssistantSpeaking(type !== CountingMachineMessageType.SET_VALUE);
        if (type !== CountingMachineMessageType.SET_VALUE) {
            setCurrentText('');
        }
        let context: Record<string, unknown> = {
            gameInstruction: "Utilise les 4 rouleaux colorés pour composer le nombre demandé. Chaque rouleau contrôle une position :  milliers: 1000, centaines: 100, dizaines: 10, unités: 1. Clique sur + ou - (moins) pour faire tourner les rouleaux. Quand tu as le bon nombre, clique sur VALIDER !.",
            currentValue: currentValueRef.current,
            nextGoal: goalRef.current,
            attempt: attemptRef.current
        };

        console.log('context', context);
        if (type === CountingMachineMessageType.SET_VALUE) {
            if (msg?.numericValue !== currentValueRef.current) {
                setCurrentValue(msg?.numericValue);
                context = { ...context, currentValue: msg?.numericValue };
            }
        }
        if (type === CountingMachineMessageType.NEXT_GOAL) {
            const newGoal = typeof msg?.numericValue === 'number' ? msg.numericValue : Number(msg?.numericValue);
            let updated = false;
            setGoal(newGoal);
            context = { ...context, nextGoal: newGoal };
            updated = true;

            if (attemptRef.current !== 1) {
                resetAttempt();
                context = { ...context, attempt: 1 };
                updated = true;
            }
            if (!updated) {
                context = { ...context, nextGoal: goalRef.current, attempt: attemptRef.current };
            }
        }
        if (type === CountingMachineMessageType.WRONG_VALUE) {
            incrementAttempt();
            context = { ...context, attempt: attemptRef.current + 1 };
        }
        if(type === CountingMachineMessageType.DONE){
            completed();
        }
        if (type !== CountingMachineMessageType.SET_VALUE) {
            const lines = await getAssistantMessageLines({
                game: 'counting-machine',
                eventType: type,
                context,
                lang: 'fr',
                persona: 'Maître Rouleau, prof de maths expérimenté et cool, drôle, patient, toujours encourageant, adore les énigmes mathématiques et félicite chaque progrès avec enthousiasme.'
            });
            setIsLoading(false);
            setAssistantReady(true);
            if (lines.length > 0 && type === CountingMachineMessageType.ADD_GOAL) {
                await playAudio('/audio/perceuse.wav');
            }
            for (let i = 0; i < lines.length; i++) {
                if (isCancelled.current) break;
                setCurrentText('');
                const ttsPromise = speakAndWait(lines[i]);
                typewriterEffect(lines[i], setCurrentText, isCancelled, 24);
                await ttsPromise;
            }
        } else {
            setIsLoading(false);
        }
        isPlaying.current = false;
        setAssistantSpeaking(false);
    }, []);

    useEffect(() => {
        // Force la valeur Unity à 0000 au montage
        if (typeof sendMessage === 'function') {
            sendMessage('WebBridge', 'ReceiveStringMessageFromJs', 'SetValue0');
        }
        function onEvent(msg: CountingMachineEvent) {
            if (msg.type === CountingMachineMessageType.CORRECT_VALUE || msg.type === CountingMachineMessageType.INCREASE_VALUE || msg.type === CountingMachineMessageType.DECREASE_VALUE || msg.type === CountingMachineMessageType.UNKNOWN || msg.type === CountingMachineMessageType.VALID_BUTTON) {
                return;
            }
            if (isPlaying.current) return;
            handleEvent(msg);
        }
        (Object.values(CountingMachineMessageType) as string[]).forEach(typeStr => {
            const type = typeStr as CountingMachineMessageType;
            countingMachineEventBus.on(type, onEvent);
        });
        return () => {
            (Object.values(CountingMachineMessageType) as string[]).forEach(typeStr => {
                const type = typeStr as CountingMachineMessageType;
                countingMachineEventBus.off(type, onEvent);
            });
            isCancelled.current = true;
            textToSpeechService.stop();
            setCurrentValue(undefined);
            setGoal(0);
            resetAttempt();
        };
    }, []);

    return (
        <div className={`p-4 h-full rounded-lg ${assistantBg}  flex`}>
            <div className="text-lg font-medium text-white/85 min-h-[1.5em]">
                {currentText}
            </div>
        </div>
    );
}