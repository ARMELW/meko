import { useCallback, useEffect } from 'react';
import { GameViewUI } from './game-view-ui';
import { useUnityLoader } from '@/app/game-sessions/hooks/use-unity-loader';
import { unityEventBus, UnityMessageType } from '@/services/unity/helpers';
import confetti from 'canvas-confetti';

interface PlayGameProps {
    Id?: string;
    Name?: string;
    open?: boolean;
    onClose?: () => void;
}

const GameView: React.FC<PlayGameProps> = ({ Name, open = true, onClose }) => {

    const { unityProvider, isLoaded, currentValue, currentGoalList } = useUnityLoader({
        name: Name || '',
        goalList: ['100', '200']
    });
    const handleWrongAnswer = useCallback(() => {
        console.log('oops, fauxxxxxx');
    }, [])
    const handleEndGame = useCallback(() => {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
        });
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 60,
                spread: 100,
                origin: { x: 0, y: 0.7 },
                colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
            });
            confetti({
                particleCount: 80,
                angle: 120,
                spread: 100,
                origin: { x: 1, y: 0.7 },
                colors: ['#2563eb', '#38bdf8', '#fbbf24', '#22c55e', '#ef4444'],
            });
        }, 400);
    }, [])
    const handleCorrectAnswer = useCallback(() => {
        console.log('correct answer');
    }, [])
    const eventHandlers = [
        { event: UnityMessageType.WRONG_VALUE, handler: handleWrongAnswer },
        { event: UnityMessageType.DONE, handler: handleEndGame },
        { event: UnityMessageType.CORRECT_VALUE, handler: handleCorrectAnswer }
    ] as const;

    useEffect(() => {
        eventHandlers.forEach(({ event, handler }) => {
            unityEventBus.on(event, handler);
        });

        return () => {
            eventHandlers.forEach(({ event, handler }) => {
                unityEventBus.off(event, handler);
            });
        };
    }, []);

    const handleExit = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose])

    return (
        <GameViewUI
            unityProvider={unityProvider}
            isLoaded={isLoaded}
            currentValue={currentValue}
            currentGoalList={currentGoalList}
            onClose={handleExit}
            open={open}
        />
    );
};

export default GameView;