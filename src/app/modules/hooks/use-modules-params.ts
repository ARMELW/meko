import { useQueryState, parseAsInteger } from 'nuqs';
import { ModulesQueryParams } from '../types';

export const useModulesParams = () => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState('limit', parseAsInteger.withDefault(10));

  const params: ModulesQueryParams = {
    page,
    limit
  };

  const updateParams = (newParams: Partial<ModulesQueryParams>) => {
    if (newParams.page !== undefined) {
      setPage(newParams.page);
    }
    if (newParams.limit !== undefined) {
      setLimit(newParams.limit);
    }
  };

  const resetParams = () => {
    setPage(1);
    setLimit(10);
  };

  return {
    params,
    updateParams,
    resetParams,
    setPage,
    setLimit
  };
};
