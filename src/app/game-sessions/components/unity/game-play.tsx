import { GamePlayApiResponse } from '@/app/game-sessions/hooks/use-game-play-api';
import { UnityGameView } from '@/app/game-sessions/components/unity/unity-game-view';
type GamePlayProps = {
  game: GamePlayApiResponse;
  start: () => Promise<void>;
}
export default function GamePlay({ game, start }: GamePlayProps) {


  return <UnityGameView game={game.name} config={{
    loaderUrl: game.loaderUrl,
    dataUrl: game.dataUrl,
    frameworkUrl: game.frameworkUrl,
    codeUrl: game.codeUrl,
    streamingAssetsUrl: game.streamingAssetsUrl,
  }}
    info={{
      title: game.title,
      coverUrl: game.coverUrl || '',
    }}
    start={start}
  />;
}
