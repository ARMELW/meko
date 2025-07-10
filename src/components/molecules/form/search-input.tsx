import { Input } from '@/components/atoms/forms/input';
import { useNavigate } from 'react-router';
import { useQueryState, parseAsString } from 'nuqs';
import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@/hooks/use-debounce';
import { useGameSuggestions, Game } from '@/app/game-search';
import { GameSuggestions } from '@/app/game-search/components/game-suggestions';
import { useSession } from '@/services/session/store';

export function SearchInput({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const [inputValue, setInputValue] = useState(search);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionChild = useSession(state => state.selectedChild);
  
  const debouncedQuery = useDebounce(inputValue, 300);
  const { suggestions, isLoading } = useGameSuggestions(
    sessionChild?.id || '', 
    debouncedQuery, 
    !!sessionChild && debouncedQuery.length >= 2
  );

  // Synchroniser l'input avec l'URL
  useEffect(() => {
    if (!isNavigating) {
      setInputValue(search);
    }
  }, [search, isNavigating]);

  // Gérer les clics à l'extérieur pour fermer les suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Montrer les suggestions avec un petit délai
  useEffect(() => {
    if (debouncedQuery.length >= 2 && !isNavigating) {
      const timer = setTimeout(() => {
        setShowSuggestions(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (debouncedQuery.length < 2) {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  }, [debouncedQuery, isNavigating]);

  // Fonction pour lancer la recherche manuellement
  const performSearch = (searchTerm: string) => {
    if (searchTerm.trim() === '') {
      navigate('/home', { replace: true });
      setSearch('');
      return;
    }

    setIsSearching(true);
    setIsNavigating(true);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setSearch(searchTerm);
    navigate('/games/search?search=' + encodeURIComponent(searchTerm));
    inputRef.current?.blur();
    
    // Reset après navigation
    setTimeout(() => {
      setIsNavigating(false);
      setIsSearching(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsNavigating(false);
    setSelectedIndex(-1);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleInputFocus = () => {
    if (inputValue.trim().length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (game: Game) => {
    setInputValue(game.title);
    performSearch(game.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Gérer Entrée pour la recherche manuelle
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0 && selectedIndex >= 0) {
        // Si une suggestion est sélectionnée, l'utiliser
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        // Sinon, lancer la recherche avec le texte actuel
        performSearch(inputValue);
      }
      return;
    }

    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
      return;
    }

    // Navigation dans les suggestions uniquement si elles sont visibles
    if (!showSuggestions || !suggestions.length) {
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative ml-4">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          size="small"
          name="search"
          autoComplete='off'
          disabled={isSearching}
          placeholder={t('common.search')}
          className={`w-48 lg:w-64 bg-meko-blue-transparent-2 text-white focus:border-meko-blue-light-1 focus:border-2 outline-none rounded-lg px-3 py-1 ${(isLoading || isSearching) ? 'pr-8' : ''} ${isSearching ? 'opacity-75 cursor-not-allowed' : ''} ${className}`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
        
        {/* Loader à droite du champ */}
        {(isLoading || isSearching) && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </div>
        )}
      </div>
      
      {showSuggestions && inputValue.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1">
          <GameSuggestions
            suggestions={suggestions || []}
            isLoading={isLoading}
            onSelectGame={handleSuggestionClick}
            isVisible={showSuggestions}
            searchTerm={debouncedQuery}
            selectedIndex={selectedIndex}
            onHover={setSelectedIndex}
          />
        </div>
      )}
    </div>
  );
}
