import { Filter } from '@/types/filter';
import {
    useQuery,
    keepPreviousData,
    QueryKey,
  } from '@tanstack/react-query';
import { BaseService } from '../api/http';
import { PaginatedResponse } from '@/types/pagination';
  
  export function useList<T>(
    queryKeys: { list: (filters: Filter) => QueryKey },
    service: Pick<BaseService<T, unknown>, 'list'>,
    filters: Filter
  ) {
    const { data, isLoading } = useQuery({
      queryKey: queryKeys.list(filters),
      queryFn: () => service.list(filters),
      placeholderData: keepPreviousData,
    });
  
    const pageSize = filters.pageSize || 10;
    const response = data as PaginatedResponse<T> | undefined;
    const items = response?.data ?? [];
    const total = typeof response?.meta?.pagination?.total === 'string' 
      ? parseInt(response.meta.pagination.total) 
      : response?.meta?.pagination?.total ?? 0;
    const totalPages = Math.ceil(total / pageSize);
  
    return {
      data: items,
      meta: {
        total,
        totalPages,
        pageSize,
        page: filters.page || 1
      },
      isLoading,
    };
  }