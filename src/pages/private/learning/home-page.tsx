import {
  useModulesWithParams,
  LoadingDisplay,
  ErrorDisplay,
  EmptyDisplay,
  ModulesPagination
} from '@/app/modules';
import { CardModule } from '@/components/molecules/view/card-module';
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();
  const {
    data: modulesData,
    isLoading,
    error,
    stats,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    changeLimit
  } = useModulesWithParams();

  const mapModuleStatusToCardStatus = (status: string) => {
    const statusMap = {
      'not_started': t('modules.status.not_started') as 'À DÉCOUVRIR',
      'in_progress': t('modules.status.in_progress') as 'EN COURS',
      'completed': t('modules.status.completed') as 'TERMINÉ',
    };
    return (statusMap[status as keyof typeof statusMap] || t('modules.status.not_started')) as 'À DÉCOUVRIR' | 'EN COURS' | 'TERMINÉ';
  };

  if (isLoading) {
    return <LoadingDisplay message={t('modules.loading')} />;
  }

  if (error) {
    return <ErrorDisplay message={t('modules.error')} />;
  }

  if (!modulesData?.modules || modulesData.modules.length === 0) {
    return <EmptyDisplay message={t('modules.noModules')} />;
  }

  return (
    <div className="w-full home-wrapper px-36">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {modulesData.modules.map((module) => (
          <CardModule
            key={module.id}
            image={module.coverUrl}
            title={module.name}
            status={mapModuleStatusToCardStatus(module.status)}
            progress={module.status === 'in_progress' ? `${module.completedGames}/${module.totalGames}` : undefined}
          />
        ))}
      </div>

      {modulesData.pagination && (
        <ModulesPagination
          pagination={modulesData.pagination}
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          onPageChange={goToPage}
          onLimitChange={changeLimit}
        />
      )}
    </div>
  );
}

export { HomePage };
