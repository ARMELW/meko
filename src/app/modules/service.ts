import { ModulesResponse, ModulesQueryParams, ModuleDetailResponse } from './types';
import { modulesServiceImpl } from './api';
import { API_ENDPOINTS } from '@/config/api';

export const ModulesService = {
  getChildModules: async (childId: string, params: ModulesQueryParams = {}): Promise<ModulesResponse> => {
    const queryString = new URLSearchParams({
      page: (params.page || 1).toString(),
      limit: (params.limit || 10).toString()
    }).toString();

    const endpoint = API_ENDPOINTS.modules.list(childId, queryString);
    const response = await modulesServiceImpl.get<ModulesResponse>(endpoint);
    return response;
  },

  getModuleDetail: async (childId: string, moduleId: string): Promise<ModuleDetailResponse> => {
    const endpoint = API_ENDPOINTS.modules.detail(childId, moduleId);
    const response = await modulesServiceImpl.get<ModuleDetailResponse>(endpoint);
    
    return response;
  }
};
