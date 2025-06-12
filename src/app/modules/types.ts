import { z } from "zod";
import { moduleSchema, paginationSchema, statsSchema, modulesResponseSchema } from "./schema";

export type Module = z.infer<typeof moduleSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type ModulesResponse = z.infer<typeof modulesResponseSchema>;

export interface ModulesQueryParams {
  page?: number;
  limit?: number;
}

export interface HasId {
  id: string;
}
