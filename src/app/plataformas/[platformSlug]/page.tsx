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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/plataformas" className="text-sm text-[var(--accent-blue)] hover:underline mb-4 block">
        &larr; Volver a Plataformas
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-[var(--text-heading)]">{platform.name}</h1>
          {platform.isNew && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">
              NUEVO
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
          <span>{platform.type}</span>
          <span className="text-[var(--border-color)]">|</span>
          <span>Fundado: {platform.founded}</span>
          <span className="text-[var(--border-color)]">|</span>
          <a href={platform.website} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-blue)] hover:underline">
            Sitio oficial &rarr;
          </a>
        </div>
      </div>

      {/* Que es */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">¿Qué es {platform.name}?</h2>
        <p className="text-sm text-[var(--text-body)] leading-relaxed">{platform.description}</p>
      </section>

      {/* Arquitectura */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">Arquitectura</h2>
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <p className="text-xs text-[var(--text-body)] leading-relaxed whitespace-pre-line">{platform.architecture}</p>
        </div>
      </section>

      {/* Caracteristicas Clave */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">Características Clave</h2>
        <div className="grid md:grid-cols-2 gap-2">
          {platform.keyFeatures.map((feature) => (
            <div key={feature} className="flex items-start gap-2 p-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)]">
              <span className="text-[var(--accent-blue)] mt-0.5 shrink-0">&#x25B8;</span>
              <span className="text-xs text-[var(--text-body)]">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SQL en esta plataforma */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">SQL en {platform.name}</h2>
        <div className="p-4 rounded-xl border border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/5">
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.sqlSupport}</p>
        </div>
      </section>

      {/* Pros / Cons */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5">
          <h3 className="text-sm font-semibold text-[var(--success)] mb-3">Ventajas</h3>
          <ul className="space-y-2">
            {platform.pros.map((pro) => (
              <li key={pro} className="text-xs text-[var(--text-body)] flex items-start gap-2">
                <span className="text-[var(--success)] mt-0.5 shrink-0">&#x2713;</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-xl border border-[var(--error)]/20 bg-[var(--error)]/5">
          <h3 className="text-sm font-semibold text-[var(--error)] mb-3">Desventajas</h3>
          <ul className="space-y-2">
            {platform.cons.map((con) => (
              <li key={con} className="text-xs text-[var(--text-body)] flex items-start gap-2">
                <span className="text-[var(--error)] mt-0.5 shrink-0">&#x2717;</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Novedades 2025-2026 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">Novedades 2025-2026</h2>
        <div className="p-4 rounded-xl border border-[var(--warning)]/20 bg-[var(--warning)]/5">
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.recentNews}</p>
        </div>
      </section>

      {/* Caso de uso + Ecosistema */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <h3 className="text-sm font-semibold text-[var(--accent-blue)] mb-2">Caso de Uso Ideal</h3>
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.useCase}</p>
        </div>
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <h3 className="text-sm font-semibold text-[var(--accent-purple)] mb-2">Ecosistema</h3>
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.ecosystem}</p>
        </div>
      </div>

      {/* Modelo de Precios */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">Modelo de Precios</h2>
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.pricing}</p>
        </div>
      </section>

      {/* Posicion en el Mercado */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-[var(--text-heading)] mb-3">Posición en el Mercado</h2>
        <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
          <p className="text-xs text-[var(--text-body)] leading-relaxed">{platform.marketPosition}</p>
        </div>
      </section>
    </div>
  );
}
