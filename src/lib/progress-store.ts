import { UserProgress, DEFAULT_PROGRESS } from '@/types/progress';

const STORAGE_KEY = 'eafit-datai-progress';

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PROGRESS;
    return JSON.parse(stored) as UserProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.lastActivity = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable
  }
}

export function markLessonComplete(lessonId: string): void {
  const progress = getProgress();
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId);
    saveProgress(progress);
  }
}

export function markExerciseComplete(exerciseId: string): void {
  const progress = getProgress();
  if (!progress.completedExercises.includes(exerciseId)) {
    progress.completedExercises.push(exerciseId);
    saveProgress(progress);
  }
}

export function incrementQueryCount(): void {
  const progress = getProgress();
  progress.totalQueriesExecuted += 1;
  saveProgress(progress);
}

export function isLessonComplete(lessonId: string): boolean {
  return getProgress().completedLessons.includes(lessonId);
}

export function isExerciseComplete(exerciseId: string): boolean {
  return getProgress().completedExercises.includes(exerciseId);
}
