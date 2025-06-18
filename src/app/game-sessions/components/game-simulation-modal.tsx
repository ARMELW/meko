import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Card, CardContent, Typography } from '@/components';
import { LoadingButton } from '@/components/atoms/actions/loading-button';
import { useGameSession } from '../hooks/use-game-session';
import { useSession as useChildrenSession } from '@/services/session/store';
import type { GameSession } from '../types';

interface GameQuestion {
  id: number;
  num1: number;
  num2: number;
  correctAnswer: number;
  options: number[];
  userAnswer?: number;
  isCorrect?: boolean;
}

interface GameState {
  questions: GameQuestion[];
  currentQuestionIndex: number;
  score: number;
  totalAttempts: number;
  startTime: number;
  isGameStarted: boolean;
  isGameCompleted: boolean;
}

interface GameSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle?: string;
}

// Générer une addition simple (2 nombres entre 1 et 10)
const generateAddition = (id: number): GameQuestion => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = num1 + num2;
  
  // 2 réponses incorrectes
  const wrongAnswers: number[] = [];
  while (wrongAnswers.length < 2) {
    const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    if (wrongAnswer !== correctAnswer && wrongAnswer > 0 && !wrongAnswers.includes(wrongAnswer)) {
      wrongAnswers.push(wrongAnswer);
    }
  }
  
  // Mélanger les 3 options
  const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
  
  return {
    id,
    num1,
    num2,
    correctAnswer,
    options
  };
};

// Générer 5 questions
const generateQuestions = (): GameQuestion[] => {
  return Array.from({ length: 5 }, (_, index) => generateAddition(index + 1));
};

export function GameSimulationModal({
  isOpen,
  onClose,
  gameId,
  gameTitle = 'Jeu d\'additions'
}: GameSimulationModalProps) {
  const { selectedChild } = useChildrenSession();
  const { startSession, saveProgress, completeSession, abandonSession } = useGameSession();

  const [currentSession, setCurrentSession] = useState<GameSession | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    totalAttempts: 0,
    startTime: 0,
    isGameStarted: false,
    isGameCompleted: false
  });

  const [displayedTime, setDisplayedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.isGameStarted && !gameState.isGameCompleted) {
      interval = setInterval(() => {
        const currentTime = Math.floor((performance.now() - gameState.startTime) / 1000);
        setDisplayedTime(currentTime);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.isGameStarted, gameState.isGameCompleted, gameState.startTime]);

  const initializeGame = () => {
    const questions = generateQuestions();
    setGameState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      totalAttempts: 0,
      startTime: performance.now(),
      isGameStarted: true,
      isGameCompleted: false
    });
    // Réinitialiser le temps affiché
    setDisplayedTime(0);
  };

  const handleStartSession = async () => {
    if (!selectedChild) return;

    try {
      const result = await startSession.mutateAsync({
        childId: selectedChild.id,
        gameId
      });

      if (result.success && result.data) {
        setCurrentSession(result.data);
        initializeGame();
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const handleAnswerSelect = (selectedAnswer: number) => {
    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const updatedQuestions = [...gameState.questions];
    updatedQuestions[gameState.currentQuestionIndex] = {
      ...currentQuestion,
      userAnswer: selectedAnswer,
      isCorrect
    };

    setGameState(prev => ({
      ...prev,
      questions: updatedQuestions,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalAttempts: prev.totalAttempts + 1
    }));

    setTimeout(() => {
      if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          isGameCompleted: true
        }));
      }
    }, 1500);
  };

  const handleSaveProgress = async () => {
    if (!currentSession || !selectedChild) return;

    try {
      const timeSpent = Math.floor((performance.now() - gameState.startTime) / 1000);
      await saveProgress.mutateAsync({
        childId: selectedChild.id,
        sessionId: currentSession.id,
        data: {
          score: gameState.score,
          data: {
            progress: ((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100,
            currentQuestion: gameState.currentQuestionIndex + 1,
            timeSpent
          }
        }
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleCompleteSession = async () => {
    if (!currentSession || !selectedChild) return;

    try {
      const timeSpent = Math.floor((performance.now() - gameState.startTime) / 1000);
      await completeSession.mutateAsync({
        sessionId: currentSession.id,
        data: {
          score: gameState.score,
          timeSpent
        }
      });
      
      setGameState({
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        totalAttempts: 0,
        startTime: 0,
        isGameStarted: false,
        isGameCompleted: false
      });
      setCurrentSession(null);
    } catch (error) {
      console.error('Error completing session:', error);
    }
  };

  const handleAbandonSession = async () => {
    if (!currentSession) return;

    try {
      await abandonSession.mutateAsync({
        sessionId: currentSession.id
      });
      
      setCurrentSession(null);
      setGameState({
        questions: [],
        currentQuestionIndex: 0,
        score: 0,
        totalAttempts: 0,
        startTime: 0,
        isGameStarted: false,
        isGameCompleted: false
      });
    } catch (error) {
      console.error('Error abandoning session:', error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const hasAnswered = currentQuestion?.userAnswer !== undefined;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Typography as="h2" weight="bold" className="text-xl">
              {gameTitle}
            </Typography>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Écran d'accueil */}
          {!gameState.isGameStarted && !currentSession && (
            <div className="text-center flex flex-col py-8">
              <Typography className="mb-4">
                Résolvez 5 additions simples
              </Typography>
              <LoadingButton
                onClick={handleStartSession}
                loading={startSession.isPending}
              >
                Commencer
              </LoadingButton>
            </div>
          )}

          {/* Jeu en cours */}
          {gameState.isGameStarted && !gameState.isGameCompleted && currentQuestion && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="flex justify-between items-center bg-purple-500 p-3 rounded">
                <Typography className="text-sm">
                  Question {gameState.currentQuestionIndex + 1}/5
                </Typography>
                <Typography className="text-sm">
                  Score: {gameState.score} | Temps: <span className="transition-all duration-300 font-mono">{displayedTime}</span>s
                </Typography>
              </div>

              {/* Question */}
              <div className="text-center py-6">
                <Typography className="text-3xl font-bold mb-4">
                  {currentQuestion.num1} + {currentQuestion.num2} = ?
                </Typography>
                
                {/* Réponses */}
                <div className="flex gap-3 justify-center">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = hasAnswered && currentQuestion.userAnswer === option;
                    const isCorrect = option === currentQuestion.correctAnswer;
                    
                    let buttonClass = "px-6 py-3 text-lg font-semibold rounded ";
                    
                    if (hasAnswered) {
                      if (isSelected) {
                        buttonClass += isCorrect 
                          ? "bg-green-500 text-white" 
                          : "bg-red-500 text-white";
                      } else if (isCorrect) {
                        buttonClass += "bg-green-500 text-white";
                      } else {
                        buttonClass += "bg-gray-300 text-gray-600";
                      }
                    } else {
                      buttonClass += "bg-blue-500 hover:bg-blue-600 text-white";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !hasAnswered && handleAnswerSelect(option)}
                        disabled={hasAnswered}
                        className={buttonClass}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {hasAnswered && (
                  <div className="mt-4">
                    {currentQuestion.isCorrect ? (
                      <Typography className="text-green-600 font-semibold">
                        Correct !
                      </Typography>
                    ) : (
                      <Typography className="text-red-600">
                        Incorrect. Réponse: {currentQuestion.correctAnswer}
                      </Typography>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleSaveProgress}
                  disabled={saveProgress.isPending}
                  className="px-4 py-2 bg-gray-500 text-white rounded text-sm"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={handleAbandonSession}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm"
                >
                  Quitter
                </button>
              </div>
            </div>
          )}

          {/* Fin du jeu */}
          {gameState.isGameCompleted && (
            <div className="text-center py-8">
              <Typography className="text-2xl font-bold mb-4">
                Jeu terminé !
              </Typography>
              
              <div className="bg-purple-500 p-4 rounded mb-6">
                <Typography className="text-xl mb-2">
                  Score: {gameState.score}/5
                </Typography>
                <Typography className="text-sm text-gray-600">
                  Temps: <span className="transition-all duration-300 font-mono">{displayedTime}</span>s | Essais: {gameState.totalAttempts}
                </Typography>
              </div>

              <div className="flex gap-3 justify-center">
                <LoadingButton
                  onClick={handleCompleteSession}
                  className="bg-green-500 hover:bg-green-600 text-white"
                  loading={completeSession.isPending}
                >
                  Terminer
                </LoadingButton>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
