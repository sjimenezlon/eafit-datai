'use client';

import { useState } from 'react';

interface SchemaViewerProps {
  schema: { name: string; columns: string[] }[];
}

export default function SchemaViewer({ schema }: SchemaViewerProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  if (schema.length === 0) {
    return (
      <div className="text-sm text-[var(--text-muted)] p-4">
        No hay tablas cargadas
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <h3 className="text-xs uppercase tracking-wider text-[var(--text-muted)] px-3 py-2 font-semibold">
        Esquema de Base de Datos
      </h3>
      {schema.map((table) => (
        <div key={table.name}>
          <button
            onClick={() => toggle(table.name)}
            className="w-full flex items-center gap-2 px-3 py-1.5 text-sm
              hover:bg-[var(--bg-tertiary)] transition-colors text-left cursor-pointer"
          >
            <span className="text-[var(--terminal-cyan)] text-xs">
              {expanded[table.name] ? '&#x25BC;' : '&#x25B6;'}
            </span>
            <span className="text-[var(--terminal-green)] font-mono text-xs">
              {table.name}
            </span>
            <span className="text-[var(--text-muted)] text-xs ml-auto">
              {table.columns.length} cols
            </span>
          </button>
          {expanded[table.name] && (
            <div className="pl-8 pb-1">
              {table.columns.map((col) => (
                <div key={col} className="text-xs text-[var(--text-muted)] py-0.5 font-mono">
                  {col}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
