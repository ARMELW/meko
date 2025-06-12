const prefix = 'api';
export const API_ENDPOINTS = {

  children: {
    base: `${prefix}/v1/children`,
    create: `${prefix}/v1/children`,
    list: (qs: string) => `${prefix}/v1/parents/children?${qs}`,
    detail: (id: string) => `${prefix}/v1/children/${id}`,
    update: (id: string) => `${prefix}/v1/children/${id}`,
    delete: (id: string) => `${prefix}/v1/children/${id}`,
    requestDelete:(id:string) => `${prefix}/v1/children/${id}/request-delete`,
    verifyDelete:(id:string) => `${prefix}/v1/children/${id}`,
    select(id: string): string {
      return `${prefix}/v1/children/${id}/avatar`
    }
  },
  avatar: {
    base: `${prefix}/v1/avatars`,
  },
  modules: {
    base: `${prefix}/v1/modules`,
    list: (childId: string, qs: string) => `${prefix}/v1/children/${childId}/modules?${qs}`,
    detail: (id: string) => `${prefix}/v1/modules/${id}`,
    create: `${prefix}/v1/modules`,
    update: (id: string) => `${prefix}/v1/modules/${id}`,
    delete: (id: string) => `${prefix}/v1/modules/${id}`
  }
} as const;
