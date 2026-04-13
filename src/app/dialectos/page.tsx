'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  engines,
  operations,
  categories,
  trends2026,
  type EngineId,
  type DialectOperation,
} from '@/data/dialects';

const DEFAULT_ENGINES: EngineId[] = ['postgresql', 'mysql', 'sqlserver', 'oracle'];

export default function DialectosPage() {
  const [selectedCategory, setSelectedCategory] = useState<DialectOperation['category'] | 'todas'>('todas');
  const [selectedEngines, setSelectedEngines] = useState<EngineId[]>(DEFAULT_ENGINES);
  const [activeOp, setActiveOp] = useState<string>(operations[0].id);

  const filteredOps = useMemo(
    () =>
      selectedCategory === 'todas'
        ? operations
        : operations.filter((o) => o.category === selectedCategory),
    [selectedCategory]
  );

  const current = operations.find((o) => o.id === activeOp) ?? operations[0];

  const toggleEngine = (id: EngineId) => {
    setSelectedEngines((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <section className="mb-10">
        <div className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] border border-[var(--accent-purple)]/20">
          Comparador de dialectos SQL
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)] mb-3 tracking-tight">
          La misma pregunta, <span className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] bg-clip-text text-transparent">distintos dialectos</span>
        </h1>
        <p className="text-sm text-[var(--text-muted)] max-w-3xl">
          SQL es un estándar, pero cada motor lo implementa un poco distinto. Aquí puedes ver
          la misma consulta expresada en PostgreSQL, MySQL, SQL Server, Oracle, SQLite, BigQuery,
          Snowflake, DuckDB y MongoDB — lado a lado — para que entiendas exactamente dónde
          se parecen y dónde duelen las diferencias.
        </p>
      </section>

      {/* Engine selector */}
      <section className="mb-6">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Motores a comparar
        </div>
        <div className="flex flex-wrap gap-2">
          {engines.map((e) => {
            const active = selectedEngines.includes(e.id);
            return (
              <button
                key={e.id}
                onClick={() => toggleEngine(e.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                  active
                    ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border-[var(--accent-blue)]/40'
                    : 'text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent-blue)]/40'
                }`}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                  style={{ backgroundColor: e.color }}
                />
                {e.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Category tabs */}
      <section className="mb-4">
        <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
          Categoría
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('todas')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
              selectedCategory === 'todas'
                ? 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] border-[var(--accent-purple)]/40'
                : 'text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent-purple)]/40'
            }`}
          >
            Todas ({operations.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] border-[var(--accent-purple)]/40'
                  : 'text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent-purple)]/40'
              }`}
            >
              <span className="mr-1">{c.icon}</span>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-[260px_1fr] gap-6 mb-16">
        {/* Operation list */}
        <aside className="space-y-1">
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Operación
          </div>
          {filteredOps.map((op) => (
            <button
              key={op.id}
              onClick={() => setActiveOp(op.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-xs transition-all cursor-pointer ${
                activeOp === op.id
                  ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] border-l-2 border-[var(--accent-blue)]'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-body)]'
              }`}
            >
              {op.title}
            </button>
          ))}
        </aside>

        {/* Comparison panel */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--text-heading)] mb-1">{current.title}</h2>
            <p className="text-sm text-[var(--text-muted)]">{current.problem}</p>
            {current.note && (
              <div className="mt-3 p-3 rounded-lg border border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/5 text-xs text-[var(--text-body)]">
                <span className="font-semibold text-[var(--accent-blue)]">Nota: </span>
                {current.note}
              </div>
            )}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {engines
              .filter((e) => selectedEngines.includes(e.id))
              .map((engine) => {
                const variant = current.variants[engine.id];
                return (
                  <div
                    key={engine.id}
                    className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: engine.color }}
                      />
                      <span className="text-xs font-semibold text-[var(--text-heading)]">
                        {engine.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] ml-auto uppercase">
                        {engine.family}
                      </span>
                    </div>
                    <div className="p-3">
                      {variant ? (
                        <pre className="text-[11px] leading-relaxed text-[var(--text-body)] font-mono whitespace-pre-wrap break-words">
                          {variant.code}
                        </pre>
                      ) : (
                        <p className="text-[11px] text-[var(--text-muted)] italic">
                          No aplica directamente en este motor.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {selectedEngines.length === 0 && (
            <div className="text-center py-12 text-xs text-[var(--text-muted)]">
              Selecciona al menos un motor arriba para ver las consultas.
            </div>
          )}
        </div>
      </div>

      {/* Trends 2026 */}
      <section className="mb-16">
        <div className="mb-6">
          <div className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20">
            Contexto abril 2026
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-2">
            Lo que todo administrador de BD debe dominar hoy
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-3xl">
            Más allá de la sintaxis, el rol del DBA cambió radicalmente entre 2020 y 2026. Estos
            son los temas que hoy no puedes ignorar si trabajas con datos en producción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {trends2026.map((t) => (
            <article
              key={t.title}
              className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] font-semibold uppercase tracking-wider">
                  {t.tag}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[var(--text-heading)] mb-2">{t.title}</h3>
              <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">{t.body}</p>
              <p className="text-xs text-[var(--text-body)] leading-relaxed">
                <span className="font-semibold text-[var(--accent-blue)]">Por qué importa: </span>
                {t.why}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-10 border-t border-[var(--border-color)]">
        <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2">
          ¿Listo para practicar?
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Prueba tus consultas en el laboratorio o revisa las plataformas disponibles.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/laboratorio"
            className="px-5 py-2 bg-[var(--accent-blue)] text-white rounded-lg font-medium text-xs hover:opacity-90 transition-opacity"
          >
            Abrir Laboratorio
          </Link>
          <Link
            href="/plataformas"
            className="px-5 py-2 border border-[var(--border-color)] text-[var(--text-body)] rounded-lg font-medium text-xs hover:border-[var(--accent-blue)] transition-colors"
          >
            Ver Plataformas
          </Link>
        </div>
      </section>
    </div>
  );
}
