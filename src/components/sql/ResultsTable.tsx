'use client';

import { QueryResult } from '@/types/lesson';

interface ResultsTableProps {
  result: QueryResult | null;
}

export default function ResultsTable({ result }: ResultsTableProps) {
  if (!result) {
    return (
      <div className="terminal-window mt-4">
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <span className="terminal-title">Resultados</span>
        </div>
        <div className="terminal-body text-[var(--text-muted)] text-sm py-8 text-center">
          Ejecuta una consulta para ver los resultados aqui
        </div>
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="terminal-window mt-4">
        <div className="terminal-header">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
          <span className="terminal-title">Error</span>
        </div>
        <div className="terminal-body">
          <div className="flex items-start gap-2 text-[var(--error)]">
            <span className="text-lg">&#x2717;</span>
            <div>
              <p className="font-bold text-sm">Error en la consulta</p>
              <p className="text-sm mt-1 opacity-80">{result.error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-window mt-4">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">Resultados</span>
        <span className="ml-auto text-xs text-[var(--text-muted)] font-mono">
          {result.rowCount} fila{result.rowCount !== 1 ? 's' : ''} &middot; {result.executionTime}ms
        </span>
      </div>
      {result.columns.length === 0 ? (
        <div className="terminal-body text-sm text-[var(--terminal-cyan)]">
          &#x2713; Consulta ejecutada correctamente (sin resultados para mostrar)
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono">
            <thead>
              <tr className="bg-[var(--bg-tertiary)]">
                <th className="px-3 py-2 text-left text-xs text-[var(--text-muted)] border-b border-[var(--terminal-border)] w-10">
                  #
                </th>
                {result.columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2 text-left text-xs text-[var(--terminal-cyan)] border-b border-[var(--terminal-border)] whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.slice(0, 100).map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-[var(--border-color)] hover:bg-[var(--terminal-glow)] transition-colors"
                >
                  <td className="px-3 py-1.5 text-[var(--text-muted)] text-xs">{i + 1}</td>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-1.5 text-[var(--terminal-green)] whitespace-nowrap">
                      {cell === null ? (
                        <span className="text-[var(--text-muted)] italic">NULL</span>
                      ) : (
                        String(cell)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {result.rowCount > 100 && (
            <div className="text-center py-2 text-xs text-[var(--text-muted)]">
              Mostrando 100 de {result.rowCount} filas
            </div>
          )}
        </div>
      )}
    </div>
  );
}
