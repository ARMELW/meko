import { API_ENDPOINTS } from "@/config/api";
import { BaseServiceImpl } from "@/services/api/http";
import { Filter } from "@/types/filter";
import { Children, ChildrenPayload } from "./type";

export class ChildrenServiceImpl extends BaseServiceImpl<Children, ChildrenPayload> {
  protected endpoints = API_ENDPOINTS.children;
  protected serializeParams(filter: Filter): string {
    return '';
  }
}
export const childrenService = new ChildrenServiceImpl();