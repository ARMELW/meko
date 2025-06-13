import { ModuleCard } from "./components/module-card";

export { ModuleCard };
export { useModules } from './hooks/use-modules';
export { useModuleDetail } from './hooks/use-module-detail';
export { useModulesParams } from './hooks/use-modules-params';
export { useModulesWithParams } from './hooks/use-modules-with-params';
export { ModulesService } from './service';
export { ErrorDisplay, LoadingDisplay, EmptyDisplay } from './components/display-states';
export { ModulesPagination } from './components/modules-pagination';
export type { 
  Module, 
  ModulesResponse, 
  ModuleDetailResponse,
  ModuleDetail,
  Game,
  Lesson,
  Stats, 
  Pagination, 
  ModulesQueryParams 
} from './types';
