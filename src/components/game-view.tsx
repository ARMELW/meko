import { useCallback } from 'react';
import { GameViewUI } from './game-view-ui';
import { useUnityLoader } from '@/app/game-sessions/hooks/use-unity-loader';

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