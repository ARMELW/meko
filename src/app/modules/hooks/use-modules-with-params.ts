import { useModules } from './use-modules';
import { useModulesParams } from './use-modules-params';
import { useSession as useChildrenSession } from '@/services/session/store';

export const useModulesWithParams = () => {
  const sessionChild = useChildrenSession(state => state.selectedChild);
  const { params, updateParams, resetParams, setPage, setLimit } = useModulesParams();
  
  const modulesQuery = useModules(sessionChild?.id || '', params);

  const goToPage = (page: number) => {
    setPage(page);
  };

  const changeLimit = (limit: number) => {
    setLimit(limit);
    setPage(1); // Reset to first page when changing limit
  };

  const hasNextPage = modulesQuery.data?.pagination?.hasNext || false;
  const hasPrevPage = modulesQuery.data?.pagination?.hasPrev || false;
  const currentPage = params.page || 1;
  const totalPages = modulesQuery.data?.pagination?.totalPages || 0;

  return {
    ...modulesQuery,
    params,
    updateParams,
    resetParams,
    goToPage,
    changeLimit,
    hasNextPage,
    hasPrevPage,
    currentPage,
    totalPages,
    stats: modulesQuery.data?.stats
  };
};
