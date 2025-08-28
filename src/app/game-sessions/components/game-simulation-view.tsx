import { Card, CardContent, Typography } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import GamePlay from '@/app/game-sessions/components/unity/game-play';
import { GamePlayApiResponse } from '../hooks/use-game-play-api';

interface GameSimulationViewProps {
    isOpen: boolean;
    onClose: () => void;
    game: GamePlayApiResponse;
    gameState: any;
    displayedTime: number;
    handleStartSession: () => void;
    handleCompleteSession: () => void;
    handleAbandonSession: () => void;
    completeSessionPending: boolean;
}

export function GameSimulationView({
    isOpen,
    onClose,
    game,
    gameState,
    displayedTime,
    handleCompleteSession,
    completeSessionPending
}: GameSimulationViewProps) {


    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-6">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <GamePlay game={game} />
                    </div>

                    {gameState.isGameCompleted && (
                        <div className="text-center py-8">
                            <Typography className="text-2xl font-bold mb-4">
                                Jeu terminé !
                            </Typography>

                            <div className="bg-purple-500 p-4 rounded mb-6">
                                <Typography className="text-xl mb-2 mx-2">
                                    Score: {gameState.score}/5
                                </Typography>
                                <Typography className="text-sm text-gray-600 mx-2">
                                    Temps: <span className="transition-all duration-300 font-mono">{displayedTime}</span>s | Essais: {gameState.totalAttempts}
                                </Typography>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <LoadingButton
                                    onClick={handleCompleteSession}
                                    loading={completeSessionPending}
                                >
                                    Terminer
                                </LoadingButton>
                                <LoadingButton
                                    variant="secondary"
                                    onClick={onClose}
                                >
                                    Fermer
                                </LoadingButton>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
