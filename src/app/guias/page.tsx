import Link from 'next/link';

const guides = [
  {
    slug: 'pensar-antes-de-escribir',
    title: 'Pensar Antes de Escribir SQL',
    description: 'Metodologia de 5 pasos para abordar cualquier problema SQL como cientifico de datos.',
    steps: 5,
    difficulty: 'basico' as const,
  },
  {
    slug: 'optimizar-consultas',
    title: 'Optimizar Consultas SQL',
    description: 'Guia practica para identificar y corregir consultas lentas.',
    steps: 7,
    difficulty: 'avanzado' as const,
  },
  {
    slug: 'disenar-esquema',
    title: 'Disenar un Esquema desde Cero',
    description: 'Como ir de un problema del mundo real a un diagrama ER y tablas normalizadas.',
    steps: 6,
    difficulty: 'intermedio' as const,
  },
  {
    slug: 'joins-sin-miedo',
    title: 'JOINs sin Miedo',
    description: 'Domina todos los tipos de JOIN con ejemplos visuales y progresivos.',
    steps: 4,
    difficulty: 'intermedio' as const,
  },
  {
    slug: 'window-functions',
    title: 'Window Functions: La Herramienta Secreta',
    description: 'Aprende a usar ROW_NUMBER, RANK, LAG, LEAD y transforma tu SQL analitico.',
    steps: 5,
    difficulty: 'avanzado' as const,
  },
];

export default function GuiasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-2">Guias Paso a Paso</h1>
      <p className="text-sm text-[var(--text-muted)] mb-8">
        Guias practicas para mejorar tu programacion SQL y pensar como cientifico de datos.
      </p>

      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guias/${guide.slug}`}
            className="flex items-center gap-4 p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover block"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-[var(--text-heading)] text-sm">{guide.title}</h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    guide.difficulty === 'basico'
                      ? 'bg-[var(--success)]/10 text-[var(--success)]'
                      : guide.difficulty === 'intermedio'
                      ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]'
                      : 'bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]'
                  }`}
                >
                  {guide.difficulty}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">{guide.description}</p>
            </div>
            <div className="text-xs text-[var(--text-muted)] shrink-0">
              {guide.steps} pasos
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
