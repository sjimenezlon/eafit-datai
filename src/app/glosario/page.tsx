'use client';

import { useState, useMemo } from 'react';
import { glossary, glossaryCategories } from '@/data/glossary';

export default function GlosarioPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return glossary.filter((term) => {
      const matchSearch = !search ||
        term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !activeCategory || term.category === activeCategory;
      const matchLevel = !activeLevel || term.level === activeLevel;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [search, activeCategory, activeLevel]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[var(--text-heading)] mb-2">Glosario SQL</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Referencia rapida de {glossary.length} terminos de SQL y bases de datos.
      </p>

      {/* Search and filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar termino..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-body)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] w-64"
        />
        <div className="flex gap-1 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              !activeCategory
                ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]'
                : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-body)]'
            }`}
          >
            Todos
          </button>
          {glossaryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-body)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {(['basico', 'intermedio', 'avanzado'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setActiveLevel(activeLevel === level ? null : level)}
              className={`px-2 py-1 rounded text-[10px] transition-colors cursor-pointer ${
                activeLevel === level
                  ? level === 'basico'
                    ? 'bg-[var(--success)]/15 text-[var(--success)]'
                    : level === 'intermedio'
                    ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]'
                    : 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs text-[var(--text-muted)] mb-4">
        {filtered.length} termino{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Terms grid */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((term) => (
          <div
            key={term.term}
            className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--accent-blue)]/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-mono font-bold text-sm text-[var(--terminal-green)]">
                {term.term}
              </h3>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  term.level === 'basico'
                    ? 'bg-[var(--success)]/10 text-[var(--success)]'
                    : term.level === 'intermedio'
                    ? 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]'
                    : 'bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]'
                }`}
              >
                {term.level}
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-2">{term.definition}</p>
            {term.example && (
              <div className="bg-[var(--terminal-bg)] rounded p-2 text-xs font-mono text-[var(--terminal-cyan)] overflow-x-auto">
                {term.example}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
