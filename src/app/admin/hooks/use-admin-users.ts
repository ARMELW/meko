import { useEffect, useState } from 'react';
import { admin } from '@/app/auth';
import { AdminUser } from '../types';

function isUserArrayResponse(res: unknown): res is { users: AdminUser[] } {
  return !!res && typeof res === 'object' && Array.isArray((res as { users?: unknown }).users);
}

function isWrappedUserArrayResponse(res: unknown): res is { data: { users: AdminUser[] } } {
  return !!res && typeof res === 'object' && res !== null &&
    'data' in res &&
    typeof (res as { data?: unknown }).data === 'object' &&
    Array.isArray((res as { data?: { users?: unknown } }).data?.users);
}

export interface UseAdminUsersResult {
  users: AdminUser[];
  loading: boolean;
  error: string | null;
  setSearch: (s: string) => void;
  search: string;
  refetch: () => void;
  page: number;
  setPage: (p: number) => void;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function useAdminUsers(): UseAdminUsersResult {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  const fetchUsers = () => {
    setLoading(true);
    admin.listUsers({
      query: {
        searchField: search ? 'email' : undefined,
        searchOperator: search ? 'contains' : undefined,
        searchValue: search || undefined,
        limit,
        offset: (page - 1) * limit,
      }
    })
      .then((res) => {
        if (isUserArrayResponse(res)) setUsers(res.users);
        else if (isWrappedUserArrayResponse(res)) setUsers(res.data.users);
        else setUsers([]);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) setError(e.message);
        else setError('Erreur');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  // Si moins que limit users, il n'y a pas de page suivante
  const hasNextPage = users.length === limit;
  const hasPrevPage = page > 1;

  return {
    users,
    loading,
    error,
    setSearch,
    search,
    refetch: fetchUsers,
    page,
    setPage,
    limit,
    hasNextPage,
    hasPrevPage
  };
}
