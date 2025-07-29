import {
  useModulesWithParams,
  LoadingDisplay,
  ErrorDisplay,
  EmptyDisplay,
  ModulesPagination
} from '@/app/modules';
import { CardModule } from '@/components/molecules/view/card-module';
import { SubscriptionRequiredGuard } from '@/routes/components/subscription-required-guard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: modulesData,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    goToPage,
    changeLimit
  } = useModulesWithParams();

  const handleModuleClick = (moduleId: string) => {
    navigate(`/learning/modules/${moduleId}`);
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
    <SubscriptionRequiredGuard>
      <div className="w-full home-wrapper px-2 sm:px-4 md:px-8 lg:px-16 xl:px-36">

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 p-2 sm:p-4">
          {modulesData.modules.map((module) => (
            <CardModule
              key={module.id}
              image={module.coverUrl}
              title={module.name}
              status={module.status}
              progress={module.status === 'in_progress' ? `${module.completedGames}/${module.totalGames}` : undefined}
              onClick={() => handleModuleClick(module.id)}
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
    </SubscriptionRequiredGuard>
  );
}

export { HomePage };
