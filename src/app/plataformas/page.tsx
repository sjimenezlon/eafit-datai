import Link from 'next/link';
import { platforms, platformCategories } from '@/data/platforms';

export default function PlataformasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-2">
        Plataformas y SGBD Modernos
      </h1>
      <p className="text-sm text-[var(--text-muted)] mb-8">
        Conoce las bases de datos y plataformas mas relevantes de la industria en {new Date().getFullYear()}.
      </p>

      {platformCategories.map((cat) => {
        const catPlatforms = platforms.filter((p) => p.category === cat.key);
        if (catPlatforms.length === 0) return null;
        return (
          <section key={cat.key} className="mb-10">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: cat.color }}
            >
              {cat.label}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {catPlatforms.map((platform) => (
                <Link
                  key={platform.slug}
                  href={`/plataformas/${platform.slug}`}
                  className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-[var(--text-heading)]">{platform.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                      {platform.type}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
                    {platform.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {platform.pros.slice(0, 3).map((pro) => (
                      <span
                        key={pro}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)]"
                      >
                        {pro}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
