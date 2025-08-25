import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import GameStatus from './game-status';
import { Lesson } from '../hooks/use-module-games';
import { GameSimulationModal } from '@/app/game-sessions/components/game-simulation-modal';
import { LoadingButton } from '@/components/atoms/actions/loading-button';

export interface ModuleGamesDetailProps {
  lessons: Lesson[];
  isLoading?: boolean;
}

const ModuleGamesDetail: React.FC<ModuleGamesDetailProps> = ({ 
  lessons, 
  isLoading 
}) => {
  const { t } = useTranslation();
  const [gameModalState, setGameModalState] = useState<{
    isOpen: boolean;
    gameId: string;
    gameTitle: string;
  }>({
    isOpen: false,
    gameId: '',
    gameTitle: ''
  });

  const handleGameClick = (gameId: string, gameTitle: string) => {
    setGameModalState({
      isOpen: true,
      gameId,
      gameTitle
    });
  };

  const handleCloseModal = () => {
    setGameModalState({
      isOpen: false,
      gameId: '',
      gameTitle: ''
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-6 h-6 border-2 border-meko-blue-light-1 border-t-transparent rounded-full animate-spin" />
  <Typography className="ml-2">{t('modules.error')}</Typography>
      </div>
    );
  }

  if (!lessons?.length) {
    return (
      <Typography color="secondary" className="text-center py-4">
  {t('modules.noModules')}
      </Typography>
    );
  }

  return (
    <div className="w-full">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="mb-4 last:mb-0">
          <Typography weight="bold" className="text-sm border-b border-meko-blue-light-1 pb-1 mb-2">
            {t('modules.detail.lessonLabel', 'Leçon')} {index + 1}
          </Typography>
          
          {/* Desktop / tablet table */}
          <div className="hidden sm:block">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 p-2"></TableHead>
                  <TableHead className="p-2">{t('modules.detail.gameName', 'Nom du jeu')}</TableHead>
                  <TableHead className="text-center p-2">{t('modules.detail.status', 'Statut')}</TableHead>
                  <TableHead className="text-center p-2">{t('modules.detail.completedAt', 'Terminé le')}</TableHead>
                  <TableHead className="text-center p-2">{t('modules.detail.action', 'Action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lesson.games.map((game) => (
                  <TableRow key={game.id} className="hover:bg-meko-blue-transparent-1/30">
                    <TableCell className="p-2">
                      <img
                        src={game.coverUrl}
                        alt={game.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </TableCell>
                    <TableCell className="p-2">
                      <Typography weight="bold" variant="small">
                        {game.title}
                      </Typography>
                    </TableCell>
                    <TableCell className="text-center p-2">
                      <div className="flex justify-center">
                        <GameStatus 
                          status={game.status} 
                          size="small"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center p-2">
                      {game.completedAt ? (
                        <Typography variant="small" color="secondary">
                          {new Date(game.completedAt).toLocaleDateString()}
                        </Typography>
                      ) : (
                        <Typography variant="small" color="secondary">
                          -
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell className="text-center p-2">
                      <LoadingButton
                        onClick={() => handleGameClick(game.id, game.title)}
                        disabled={game.status === 'blocked'}
                        size="small"
                        className="text-xs"
                      >
                        {t('modules.detail.launch', 'Lancer')}
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="block sm:hidden space-y-3">
            {lesson.games.map((game) => (
              <div key={game.id} className="bg-meko-blue-transparent-3 rounded-xl shadow-sm p-3">
                <div className="flex items-start gap-3">
                  <img src={game.coverUrl} alt={game.title} className="w-12 h-12 rounded-md object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Typography weight="bold" variant="small" className="truncate">
                      {game.title}
                    </Typography>
                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <GameStatus status={game.status} size="small" />
                        
                      </div>
                      <div className="ml-auto text-right text-xs text-slate-500">
                        {game.completedAt ? new Date(game.completedAt).toLocaleDateString() : '-'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <LoadingButton
                    onClick={() => handleGameClick(game.id, game.title)}
                    disabled={game.status === 'blocked'}
                    className="w-full"
                  >
                    {t('modules.detail.launch', 'Lancer')}
                  </LoadingButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal de simulation de jeu */}
      <GameSimulationModal
        isOpen={gameModalState.isOpen}
        onClose={handleCloseModal}
        gameId={gameModalState.gameId}
        gameTitle={gameModalState.gameTitle}
      />
    </div>
  );
};

export default ModuleGamesDetail;
