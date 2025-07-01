import { Card, CardContent, Typography } from '@/components';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <Card className="max-w-xs cursor-pointer" onClick={onClick}>
      <CardContent className="p-2.5">
        <img
          src={game.coverUrl}
          alt={game.title}
          className="w-full aspect-square rounded-lg"
        />
        <div className="flex flex-col items-center pt-4 pb-2">
          <Typography
            align="center"
            styleCase="uppercase"
            color="default"
            weight="bold"
            className="truncate px-2"
          >
            {game.title}
          </Typography>
          <Typography variant="small" className="text-gray-500 mt-1">
            {game.moduleTitle}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
