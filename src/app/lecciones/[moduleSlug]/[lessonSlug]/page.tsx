'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getLesson, getAdjacentLessons } from '@/data/syllabus';
import { SqlProvider, useSql } from '@/components/sql/SqlProvider';
import SchemaViewer from '@/components/sql/SchemaViewer';
import ExerciseBlock from '@/components/lessons/ExerciseBlock';
import LessonContent from '@/components/lessons/LessonContent';

function LessonInner() {
  const params = useParams();
  const moduleSlug = params.moduleSlug as string;
  const lessonSlug = params.lessonSlug as string;

  const data = getLesson(moduleSlug, lessonSlug);
  const { initDatabase, schema, isLoading } = useSql();

  useEffect(() => {
    initDatabase();
  }, [initDatabase]);

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl text-[var(--text-heading)] mb-2">Lección no encontrada</h1>
        <Link href="/lecciones" className="text-sm text-[var(--accent-blue)] hover:underline">
          Volver a lecciones
        </Link>
      </div>
    );
  }

  const { module: mod, lesson } = data;
  const { prev, next } = getAdjacentLessons(moduleSlug, lessonSlug);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse text-[var(--terminal-green)] font-mono text-sm">
          Inicializando base de datos...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      {/* Sidebar: Schema */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-20 border border-[var(--border-color)] rounded-xl bg-[var(--bg-card)] overflow-hidden">
          <div className="px-3 py-2 border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
            Dataset: {mod.dataset}
          </div>
          <SchemaViewer schema={schema} />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 max-w-3xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-4">
          <Link href="/lecciones" className="hover:text-[var(--accent-blue)]">Lecciones</Link>
          <span>/</span>
          <Link href={`/lecciones/${mod.slug}`} className="hover:text-[var(--accent-blue)]">
            {mod.title}
          </Link>
          <span>/</span>
          <span className="text-[var(--text-body)]">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                lesson.difficulty === 'basico'
                  ? 'bg-[var(--success)]/10 text-[var(--success)]'
                  : lesson.difficulty === 'intermedio'
                  ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]'
                  : 'bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]'
              }`}
            >
              {lesson.difficulty}
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              ~{lesson.estimatedMinutes} min
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-1">{lesson.title}</h1>
          <p className="text-sm text-[var(--text-muted)]">{lesson.description}</p>
        </div>

        {/* Lesson content sections */}
        {lesson.content.map((section, i) => (
          <LessonContent key={i} section={section} />
        ))}

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-[var(--text-heading)] mb-4">
              Ejercicios Prácticos
            </h2>
            {lesson.exercises.map((ex, i) => (
              <ExerciseBlock key={ex.id} exercise={ex} index={i} />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-[var(--border-color)]">
          {prev ? (
            <Link
              href={`/lecciones/${prev.moduleSlug}/${prev.lesson.slug}`}
              className="text-sm text-[var(--accent-blue)] hover:underline"
            >
              &larr; {prev.lesson.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/lecciones/${next.moduleSlug}/${next.lesson.slug}`}
              className="text-sm text-[var(--accent-blue)] hover:underline"
            >
              {next.lesson.title} &rarr;
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LessonPage() {
  const params = useParams();
  const moduleSlug = params.moduleSlug as string;
  const data = getLesson(moduleSlug, params.lessonSlug as string);
  const dataset = data?.module.dataset || 'universidad';

  return (
    <SqlProvider dataset={dataset}>
      <LessonInner />
    </SqlProvider>
  );
}
