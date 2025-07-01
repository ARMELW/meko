import { z } from "zod";
import { gameSearchSchema } from "./schema";

export type GameSearchParams = z.infer<typeof gameSearchSchema>;

export type Game = {
  id: string;
  title: string;
  file: string;
  coverUrl: string;
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  moduleId: string;
  moduleTitle: string;
  moduleDescription: string;
  status: "available" | "completed" | "blocked" | "in_progress";
  prerequisitesMet: boolean;
  hasPrerequisites: boolean;
  prerequisitesCount: number;
  completedPrerequisites: number;
  canStart: boolean;
  completedAt: string | null;
  lastPlayedAt: string | null;
  totalSessions: number;
  bestScore: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
};

export type GameSearchResponse = {
  success: boolean;
  games: Game[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};
