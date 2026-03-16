import Link from 'next/link';
import { syllabus } from '@/data/syllabus';

export default function LeccionesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-2">Lecciones</h1>
      <p className="text-sm text-[var(--text-muted)] mb-8">
        8 módulos con casos comerciales reales. Avanza a tu propio ritmo.
      </p>

      <div className="space-y-6">
        {syllabus.map((mod) => (
          <div
            key={mod.id}
            className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-card)] overflow-hidden"
          >
            {/* Module header */}
            <div className="p-5 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl"
                  dangerouslySetInnerHTML={{ __html: mod.icon }}
                />
                <div className="flex-1">
                  <div className="text-xs text-[var(--text-muted)] mb-0.5">
                    Módulo {mod.order} &middot; Dataset: {mod.dataset}
                  </div>
                  <h2 className="font-bold text-[var(--text-heading)]">{mod.title}</h2>
                </div>
                <div className="text-right text-xs text-[var(--text-muted)]">
                  <div>{mod.lessons.length} lecciones</div>
                  <div>Dataset: {mod.dataset}</div>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-2">{mod.description}</p>
            </div>

            {/* Lessons list */}
            {mod.lessons.length > 0 ? (
              <div className="divide-y divide-[var(--border-color)]">
                {mod.lessons.map((lesson, idx) => (
                  <Link
                    key={lesson.id}
                    href={`/lecciones/${mod.slug}/${lesson.slug}`}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xs text-[var(--text-muted)] font-mono shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[var(--text-heading)] font-medium">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] truncate">
                        {lesson.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
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
                        {lesson.exercises.length} ej.
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-5 py-4 text-sm text-[var(--text-muted)] italic">
                Contenido en desarrollo - Próximamente disponible
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
