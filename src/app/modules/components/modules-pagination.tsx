import { Pagination } from '../types';

interface ModulesPaginationProps {
  pagination: Pagination;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

export function ModulesPagination({
  pagination,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  onLimitChange
}: ModulesPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className="px-4 py-2 bg-meko-blue-transparent-1 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-meko-blue-transparent-2 transition-colors"
      >
        Précédent
      </button>
      
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber;
          if (totalPages <= 5) {
            pageNumber = i + 1;
          } else if (currentPage <= 3) {
            pageNumber = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
          } else {
            pageNumber = currentPage - 2 + i;
          }
          
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                pageNumber === currentPage
                  ? 'bg-meko-blue-light-1 text-meko-blue-darker'
                  : 'bg-meko-blue-transparent-1 text-white hover:bg-meko-blue-transparent-2'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-meko-blue-transparent-1 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-meko-blue-transparent-2 transition-colors"
      >
        Suivant
      </button>

      <div className="flex items-center gap-2 ml-4">
        <span className="text-white text-sm">Afficher:</span>
        <select
          value={pagination.limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-1 bg-meko-blue-transparent-1 text-white rounded border border-meko-blue-light-1 text-sm focus:outline-none focus:ring-2 focus:ring-meko-blue-light-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Total info */}
      <div className="text-white text-sm ml-4">
        {pagination.total} résultats au total
      </div>
    </div>
  );
}
