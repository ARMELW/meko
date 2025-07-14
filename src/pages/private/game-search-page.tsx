import { useState, useEffect } from 'react';
import { useGameSearch } from '@/app/game-search';
import { useSession } from '@/services/session';
import { Typography } from '@/components';
import { useQueryState, parseAsString } from 'nuqs';
import { LessonItem } from './learning/module-detail-page';
import { useNavigate } from 'react-router';

export default function GameSearchPage() {
    const { selectedChild } = useSession();
    const childId = selectedChild?.id;
    const [page, setPage] = useState(1);
    const [limit] = useState(20);
    const [searchParam] = useQueryState('search', parseAsString.withDefault(''));
    const navigate = useNavigate();


    const canSearch = !!childId && searchParam.trim() !== '';
    const { data, isLoading, error } = useGameSearch(
        canSearch ? childId : '',
        { search: searchParam, page, limit }
    );


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
                    <Typography as="h3" weight="bold" className="text-3xl mb-2 uppercase">
                       {`Résultats pour "${searchParam}"`}
                    </Typography>
                    <hr className="my-2 text-white" />
                </div>

                <div className="flex flex-col gap-6">
                    {isLoading && <Typography>Chargement...</Typography>}
                    {error && <Typography color="error">Erreur lors du chargement</Typography>}
                    {data?.games?.length === 0 && <Typography>Aucun jeu trouvé</Typography>}
                    {data?.games?.map((game) => (
                        <LessonItem 
                            key={game.id} 
                            gameId={game.id}
                            title={game.title} 
                            image={game.coverUrl} 
                            status={game.status} 
                            moduleTitle={game.moduleTitle}
                            lessonOrder={game.lessonOrder}
                            onGameClick={() => {

                            }} 
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
                          Précédent
                      </button>
                      <span className="text-white">
                        Page {data.pagination.page} / {data.pagination.totalPages}
                      </span>
                      <button
                          className="px-4 py-2 bg-meko-blue-light-1 text-white rounded disabled:opacity-50"
                          onClick={handleNext}
                          disabled={!data?.pagination?.hasNext}
                      >
                          Suivant
                      </button>
                  </footer>
                )}
            </div>
        </div>

    );
}
