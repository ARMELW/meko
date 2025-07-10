import { Game } from '@/app/game-search/types';
import { Typography } from '@/components/atoms/typography/typography';
import { cn } from '@/utils/style';
import { useTranslation } from 'react-i18next';

interface GameSuggestionsProps {
  suggestions: Game[];
  isLoading: boolean;
  onSelectGame: (game: Game) => void;
  isVisible: boolean;
  searchTerm: string;
  selectedIndex?: number;
  onHover?: (index: number) => void;
}

export function GameSuggestions({ 
  suggestions, 
  isLoading, 
  onSelectGame, 
  isVisible,
  searchTerm,
  selectedIndex = -1,
  onHover
}: GameSuggestionsProps) {
  const { t } = useTranslation();

  if (!isVisible || (!isLoading && suggestions.length === 0)) {
    return null;
  }

  return (
    <div 
      className={cn(
        "absolute top-full left-0 right-0 mt-1 bg-meko-blue-flat border border-meko-blue-transparent-1 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto",
        !isVisible && "hidden"
      )}
      role="listbox"
      aria-label={t('common.search')}
    >
      {isLoading ? (
        <div className="p-3 flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-meko-blue-dark"></div>
          <Typography variant="small" className="ml-2 text-meko-blue-dark">
            {t('games.search.loading')}
          </Typography>
        </div>
      ) : (
        <>
          {suggestions.length > 0 ? (
            <ul className="py-1" role="none">
              {suggestions.map((game, index) => (
                <li
                  key={game.id}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={cn(
                    "px-3 py-2 cursor-pointer hover:bg-meko-blue-transparent-1 focus:bg-meko-blue-transparent-1 focus:outline-none transition-colors duration-200",
                    "border-b border-gray-100 last:border-b-0",
                    index === selectedIndex && "bg-meko-blue-transparent-1"
                  )}
                  onClick={() => onSelectGame(game)}
                  onMouseEnter={() => onHover?.(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectGame(game);
                    }
                  }}
                  tabIndex={0}
                >
                  <div className="flex items-start space-x-3">
                    {game.coverUrl && (
                      <img 
                        src={game.coverUrl} 
                        alt=""
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                        loading="lazy"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <Typography 
                        variant="small" 
                        className="font-medium text-meko-blue-dark truncate"
                      >
                        {highlightSearchTerm(game.title, searchTerm)}
                      </Typography>
                      {game.status === 'completed' && (
                        <div className="flex items-center mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                          <Typography variant="small" className="text-green-600">
                            {t('games.session.completed')}
                          </Typography>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center">
              <Typography variant="small" className="text-gray-500">
                {t('games.search.noResults')}
              </Typography>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Fonction utilitaire pour surligner le terme de recherche
function highlightSearchTerm(text: string, searchTerm: string): React.ReactNode {
  if (!searchTerm.trim()) return text;
  
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
  
  return parts.map((part, index) => 
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <mark key={index} className="bg-yellow-200 text-meko-blue-dark">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
