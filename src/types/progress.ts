export interface UserProgress {
  version: number;
  completedLessons: string[];
  completedExercises: string[];
  currentModule: string | null;
  lastActivity: string;
  totalQueriesExecuted: number;
  savedQueries: SavedQuery[];
}

export interface SavedQuery {
  id: string;
  name: string;
  sql: string;
  dataset: string;
  createdAt: string;
}

export const DEFAULT_PROGRESS: UserProgress = {
  version: 1,
  completedLessons: [],
  completedExercises: [],
  currentModule: null,
  lastActivity: new Date().toISOString(),
  totalQueriesExecuted: 0,
  savedQueries: [],
};
