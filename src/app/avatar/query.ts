import { API_ENDPOINTS } from "@/config/api";
import { BaseServiceImpl } from "@/services/api/http";
import { Avatar, AvatarPayload } from "./types";

export class ChildrenServiceImpl extends BaseServiceImpl<Avatar, AvatarPayload> {
  protected endpoints = {
    base: API_ENDPOINTS.avatar.base,
    create: API_ENDPOINTS.avatar.base,
    select: (id: string) => `${API_ENDPOINTS.avatar.base}/children/${id}/avatar`,
    list: (qs: string) => `${API_ENDPOINTS.avatar.base}?${qs}`,
    detail: (id: string) => `${API_ENDPOINTS.avatar.base}/${id}`,
    update: (id: string) => `${API_ENDPOINTS.avatar.base}/${id}`,
    delete: (id: string) => `${API_ENDPOINTS.avatar.base}/${id}`,
  };
  protected serializeParams(): string {
    return '';
  }
}
export const childrenService = new ChildrenServiceImpl();