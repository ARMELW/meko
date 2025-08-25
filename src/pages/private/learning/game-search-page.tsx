import { useState, useEffect } from 'react';
import { useGameSearch } from '@/app/game-search';
import { useSession } from '@/services/session';
import { Typography } from '@/components';
import { useQueryState, parseAsString } from 'nuqs';
import { LessonItem } from './module-detail-page';
import { useNavigate } from 'react-router';
import { GameSimulationModal } from '@/app/game-sessions/components/game-simulation-modal';
import { useTranslation } from 'react-i18next';

export default function GameSearchPage() {
    const { t } = useTranslation();
    const { selectedChild } = useSession();
    const childId = selectedChild?.id;
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [searchParam] = useQueryState('search', parseAsString.withDefault(''));
    const navigate = useNavigate();

    const [gameModalState, setGameModalState] = useState<{
        isOpen: boolean;
        gameId: string;
        gameTitle: string;
        moduleId?: string;
    }>({
        isOpen: false,
        gameId: '',
        gameTitle: '',
        moduleId: ''
    });


    const canSearch = !!childId && searchParam.trim() !== '';
    const { data, isLoading, error } = useGameSearch(
        canSearch ? childId : '',
        { search: searchParam, page, limit }
    );

    const handleGameClick = (gameId: string, gameTitle: string, moduleId?: string) => {
        setGameModalState({
            isOpen: true,
            gameId,
            gameTitle,
            moduleId
        });
    };

    const handleCloseModal = () => {
        setGameModalState({
            isOpen: false,
            gameId: '',
            gameTitle: '',
            moduleId: ''
        });
    };


    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => {
        if (data?.pagination?.hasNext) setPage((p) => p + 1);
    };

    useEffect(() => {
        if (searchParam.trim() === '') {
            navigate('/home', { replace: true });
        }
    }, [searchParam, navigate]);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Typography as="h3" weight="bold" className="text-2xl sm:text-3xl mb-2 uppercase">
                       {t('gameSearch.resultsFor', { search: searchParam, defaultValue: `Résultats pour "${searchParam}"` })}
                    </Typography>
                    <hr className="my-2 text-white" />
                </div>

                <div className="flex flex-col gap-6">
                    {isLoading && <Typography>{t('gameSearch.loading', 'Chargement...')}</Typography>}
                    {error && <Typography color="error">{t('gameSearch.error', 'Erreur lors du chargement')}</Typography>}
                    {data?.games?.length === 0 && <Typography>{t('gameSearch.noGames', 'Aucun jeu trouvé')}</Typography>}
                    {data?.games?.map((game) => (
                        <LessonItem 
                            key={game.id} 
                            gameId={game.id}
                            title={game.title} 
                            image={game.coverUrl} 
                            status={game.status} 
                            moduleTitle={game.moduleTitle}
                            lessonOrder={game.lessonOrder}
                            onGameClick={() => handleGameClick(game.id, game.title, game.moduleId)} 
                        />
                    ))}
                </div>

                {data?.pagination && data.pagination.totalPages > 1 && (
                  <footer className="flex justify-center items-center gap-4 p-4">
                      <button
                          className="px-4 py-2 bg-meko-blue-light-1 text-white rounded disabled:opacity-50"
                          onClick={handlePrev}
                          disabled={page === 1}
                      >
                          {t('gameSearch.prev', 'Précédent')}
                      </button>
                      <span className="text-white">
                        {t('gameSearch.page', { page: data.pagination.page, total: data.pagination.totalPages, defaultValue: `Page ${data.pagination.page} / ${data.pagination.totalPages}` })}
                      </span>
                      <button
                          className="px-4 py-2 bg-meko-blue-light-1 text-white rounded disabled:opacity-50"
                          onClick={handleNext}
                          disabled={!data?.pagination?.hasNext}
                      >
                          {t('gameSearch.next', 'Suivant')}
                      </button>
                  </footer>
                )}
            </div>

            {/* Modal de simulation de jeu */}
            <GameSimulationModal
                isOpen={gameModalState.isOpen}
                onClose={handleCloseModal}
                gameId={gameModalState.gameId}
                gameTitle={gameModalState.gameTitle}
                moduleId={gameModalState.moduleId}
            />
        </div>

    );
}
