import { API_ENDPOINTS } from "@/config/api";
import { BaseServiceImpl } from "@/services/api/http";
import { Module } from "./types";

export class ModulesServiceImpl extends BaseServiceImpl<Module, never> {
  protected endpoints = {
    base: API_ENDPOINTS.modules.base,
    create: API_ENDPOINTS.modules.create,
    list: (qs: string) => `${API_ENDPOINTS.modules.base}?${qs}`,
    detail: (id: string) => `${API_ENDPOINTS.modules.base}/${id}`,
    update: (id: string) => API_ENDPOINTS.modules.update(id),
    delete: (id: string) => API_ENDPOINTS.modules.delete(id),
  };

  protected serializeParams(): string {
    return '';
  }
}

export const modulesServiceImpl = new ModulesServiceImpl();
