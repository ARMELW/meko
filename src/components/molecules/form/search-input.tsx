import { Input } from '@/components/atoms/forms/input';
import { useNavigate } from 'react-router';
import { useQueryState, parseAsString } from 'nuqs';
import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function SearchInput({ className = '' }: { className?: string }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastValueRef = useRef(search);

  useEffect(() => {
    if (search.trim() === '') {
      navigate('/home', { replace: true });
      return;
    }
    // Si la valeur a changé, lance le debounce
    if (lastValueRef.current !== search) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        navigate('/games/search?search=' + encodeURIComponent(search));
      }, 400);
      lastValueRef.current = search;
    }
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, navigate]);

  return (
    <Input
      type="text"
      size="small"
      name="search"
      placeholder={t('common.search')}
      className={"ml-4 w-48 lg:w-64 bg-meko-blue-transparent-2 text-white focus:border-meko-blue-light-1 focus:border-2 outline-none rounded-lg px-3 py-1 " + className}
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
  );
}
