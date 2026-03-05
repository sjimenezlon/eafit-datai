export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  weekRange: [number, number];
  dataset: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: 'basico' | 'intermedio' | 'avanzado';
  estimatedMinutes: number;
  content: LessonSection[];
  exercises: Exercise[];
}

export interface LessonSection {
  type: 'theory' | 'code-example' | 'diagram' | 'tip' | 'warning';
  title?: string;
  content: string;
  code?: string;
}

export interface Exercise {
  id: string;
  instruction: string;
  initialQuery: string;
  hints: string[];
  expectedColumns?: string[];
  expectedRowCount?: number;
  requiredKeywords?: string[];
  forbiddenKeywords?: string[];
  solutionQuery: string;
}

export interface QueryResult {
  columns: string[];
  rows: (string | number | null)[][];
  rowCount: number;
  error?: string;
  executionTime?: number;
}
