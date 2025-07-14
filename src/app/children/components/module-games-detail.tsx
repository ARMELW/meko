import React from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components';
import GameStatus from './game-status';
import { Lesson } from '../hooks/use-module-games';

export interface ModuleGamesDetailProps {
  lessons: Lesson[];
  isLoading?: boolean;
}

const ModuleGamesDetail: React.FC<ModuleGamesDetailProps> = ({ 
  lessons, 
  isLoading 
}) => {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-6 h-6 border-2 border-meko-blue-light-1 border-t-transparent rounded-full animate-spin" />
        <Typography className="ml-2">Chargement...</Typography>
      </div>
    );
  }

  if (!lessons?.length) {
    return (
      <Typography color="secondary" className="text-center py-4">
        Aucun jeu disponible
      </Typography>
    );
  }

  return (
    <div className="w-full">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="mb-4 last:mb-0">
          <Typography weight="bold" className="text-sm border-b border-meko-blue-light-1 pb-1 mb-2">
            Leçon {index + 1}
          </Typography>
          
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 p-2"></TableHead>
                <TableHead className="p-2">Nom du jeu</TableHead>
                <TableHead className="text-center p-2">Statut</TableHead>
                <TableHead className="text-center p-2">Date de completion</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default ModuleGamesDetail;
