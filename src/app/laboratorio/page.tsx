'use client';

import { useEffect, useState, useCallback } from 'react';
import { SqlProvider, useSql } from '@/components/sql/SqlProvider';
import SqlEditor from '@/components/sql/SqlEditor';
import ResultsTable from '@/components/sql/ResultsTable';
import SchemaViewer from '@/components/sql/SchemaViewer';
import { QueryResult } from '@/types/lesson';
import { incrementQueryCount } from '@/lib/progress-store';

const DATASETS = [
  { name: 'ecommerce', label: 'TiendaOnline.co', description: 'Productos, pedidos, clientes, resenas — E-commerce colombiano' },
  { name: 'finanzas', label: 'BancoDigital', description: 'Cuentas, transacciones, prestamos, tarjetas — Banca digital' },
  { name: 'streaming', label: 'StreamCo', description: 'Usuarios, contenido, reproducciones, suscripciones — Streaming' },
  { name: 'universidad', label: 'Universidad EAFIT', description: 'Estudiantes, cursos, profesores, inscripciones' },
];

function LabWithSql() {
  const { initDatabase, schema, isLoading, resetDatabase, currentDataset, executeQuery } = useSql();
  const [result, setResult] = useState<QueryResult | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    initDatabase();
  }, [initDatabase]);

  const handleExecute = useCallback(
    (query: string) => {
      const r = executeQuery(query);
      setResult(r);
      incrementQueryCount();
      setHistory((prev) => [query, ...prev.slice(0, 19)]);
    },
    [executeQuery]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse text-[var(--terminal-green)] font-mono text-sm">
          Cargando base de datos...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
      <aside className="hidden lg:block w-60 shrink-0">
        <div className="sticky top-20 space-y-4">
          <div className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-card)] p-4">
            <h3 className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
              Dataset Activo
            </h3>
            {DATASETS.map((ds) => (
              <button
                key={ds.name}
                onClick={() => {
                  if (currentDataset !== ds.name) {
                    initDatabase(ds.name);
                    setResult(null);
                    setHistory([]);
                  }
                }}
                className={`w-full text-left p-2 rounded-lg text-xs mb-1 cursor-pointer transition-colors ${
                  currentDataset === ds.name
                    ? 'bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/30 text-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <div className="font-medium">{ds.label}</div>
                <div className="text-[10px] opacity-70">{ds.description}</div>
              </button>
            ))}
            <button
              onClick={resetDatabase}
              className="mt-2 w-full text-xs py-1.5 border border-[var(--border-color)] rounded-lg text-[var(--text-muted)] hover:text-[var(--error)] hover:border-[var(--error)] transition-colors cursor-pointer"
            >
              Reiniciar Base de Datos
            </button>
          </div>
          <div className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-card)] overflow-hidden">
            <SchemaViewer schema={schema} />
          </div>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-1">Laboratorio SQL</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Sandbox libre. Escribe cualquier consulta SQL y ve los resultados al instante.
          </p>
        </div>

        <SqlEditor onExecute={handleExecute} height="200px" />
        <ResultsTable result={result} />

        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-2">
              Historial de consultas
            </h3>
            <div className="space-y-1">
              {history.map((q, i) => (
                <div
                  key={i}
                  className="text-xs font-mono text-[var(--text-muted)] p-2 rounded bg-[var(--bg-tertiary)] truncate"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LaboratorioPage() {
  return (
    <SqlProvider dataset="ecommerce">
      <LabWithSql />
    </SqlProvider>
  );
}
