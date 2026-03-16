import Link from 'next/link';
import { syllabus, getModule } from '@/data/syllabus';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return syllabus.map((m) => ({ moduleSlug: m.slug }));
}

export default async function ModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  const mod = getModule(moduleSlug);
  if (!mod) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/lecciones" className="text-sm text-[var(--accent-blue)] hover:underline mb-4 block">
        &larr; Volver a Lecciones
      </Link>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-4xl" dangerouslySetInnerHTML={{ __html: mod.icon }} />
        <div>
          <div className="text-xs text-[var(--text-muted)]">
            Módulo {mod.order} &middot; Semanas {mod.weekRange[0]}-{mod.weekRange[1]} &middot; Dataset: {mod.dataset}
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-heading)]">{mod.title}</h1>
          <p className="text-sm text-[var(--text-muted)]">{mod.description}</p>
        </div>
      </div>

      {mod.lessons.length > 0 ? (
        <div className="space-y-3">
          {mod.lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/lecciones/${mod.slug}/${lesson.slug}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover"
            >
              <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm text-[var(--text-muted)] font-mono shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--text-heading)] text-sm">{lesson.title}</h3>
                <p className="text-xs text-[var(--text-muted)] truncate">{lesson.description}</p>
              </div>
              <div className="text-right shrink-0">
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
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  ~{lesson.estimatedMinutes} min &middot; {lesson.exercises.length} ejercicios
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg mb-2">Contenido en desarrollo</p>
          <p className="text-sm">Este módulo estará disponible próximamente.</p>
        </div>
      )}
    </div>
  );
}
