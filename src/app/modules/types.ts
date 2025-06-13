import { z } from "zod";
import { moduleSchema, paginationSchema, statsSchema, modulesResponseSchema, gameSchema, lessonSchema, moduleDetailSchema } from "./schema";

export type Module = z.infer<typeof moduleSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type ModulesResponse = z.infer<typeof modulesResponseSchema>;

// Module detail types
export type Game = z.infer<typeof gameSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type ModuleDetail = z.infer<typeof moduleDetailSchema>;

// Service types
export type ModuleDetailResponse = ModuleDetail;

export interface ModulesQueryParams {
  page?: number;
  limit?: number;
}

export interface HasId {
  id: string;
}
