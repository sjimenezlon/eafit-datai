import Link from 'next/link';
import { platforms } from '@/data/platforms';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return platforms.map((p) => ({ platformSlug: p.slug }));
}

export default async function PlatformPage({ params }: { params: Promise<{ platformSlug: string }> }) {
  const { platformSlug } = await params;
  const platform = platforms.find((p) => p.slug === platformSlug);
  if (!platform) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/plataformas" className="text-sm text-[var(--accent-blue)] hover:underline mb-4 block">
        &larr; Volver a Plataformas
      </Link>

      <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-1">{platform.name}</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">{platform.type}</p>

      <div className="prose-sm">
        <p className="text-[var(--text-body)] mb-6 leading-relaxed">{platform.description}</p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Pros */}
          <div className="p-4 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5">
            <h3 className="text-sm font-semibold text-[var(--success)] mb-3">Ventajas</h3>
            <ul className="space-y-2">
              {platform.pros.map((pro) => (
                <li key={pro} className="text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--success)] mt-0.5">&#x2713;</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          {/* Cons */}
          <div className="p-4 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5">
            <h3 className="text-sm font-semibold text-[var(--error)] mb-3">Desventajas</h3>
            <ul className="space-y-2">
              {platform.cons.map((con) => (
                <li key={con} className="text-xs text-[var(--text-body)] flex items-start gap-2">
                  <span className="text-[var(--error)] mt-0.5">&#x2717;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] mb-6">
          <h3 className="text-sm font-semibold text-[var(--accent-blue)] mb-2">Caso de Uso Ideal</h3>
          <p className="text-xs text-[var(--text-body)]">{platform.useCase}</p>
        </div>

        <a
          href={platform.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-blue)] hover:underline"
        >
          Visitar sitio oficial &rarr;
        </a>
      </div>
    </div>
  );
}
