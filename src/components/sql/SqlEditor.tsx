'use client';

import { useEffect, useRef, useCallback } from 'react';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { sql, SQLite } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from 'codemirror';

interface SqlEditorProps {
  initialValue?: string;
  onExecute: (query: string) => void;
  height?: string;
  readOnly?: boolean;
  schema?: Record<string, string[]>;
}

export default function SqlEditor({
  initialValue = '',
  onExecute,
  height = '150px',
  readOnly = false,
  schema,
}: SqlEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const handleExecute = useCallback(() => {
    if (viewRef.current) {
      const query = viewRef.current.state.doc.toString().trim();
      if (query) onExecute(query);
    }
  }, [onExecute]);

  useEffect(() => {
    if (!editorRef.current) return;

    const sqlConfig = schema
      ? sql({ dialect: SQLite, schema })
      : sql({ dialect: SQLite });

    const state = EditorState.create({
      doc: initialValue,
      extensions: [
        basicSetup,
        sqlConfig,
        oneDark,
        placeholder('-- Escribe tu consulta SQL aquí...\n-- Presiona Ctrl+Enter para ejecutar'),
        EditorView.theme({
          '&': { height, fontSize: '14px' },
          '.cm-scroller': { overflow: 'auto' },
          '.cm-content': { fontFamily: "'Geist Mono', 'Courier New', monospace" },
        }),
        keymap.of([
          {
            key: 'Ctrl-Enter',
            mac: 'Cmd-Enter',
            run: () => {
              handleExecute();
              return true;
            },
          },
        ]),
        EditorState.readOnly.of(readOnly),
      ],
    });

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [initialValue, height, readOnly, schema, handleExecute]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">SQL Editor</span>
        {!readOnly && (
          <button
            onClick={handleExecute}
            className="ml-auto px-3 py-1 text-xs rounded border transition-all
              border-[var(--terminal-green)] text-[var(--terminal-green)]
              hover:bg-[var(--terminal-green)] hover:text-[var(--terminal-bg)]
              font-mono cursor-pointer"
          >
            Ejecutar (Ctrl+Enter)
          </button>
        )}
      </div>
      <div ref={editorRef} />
    </div>
  );
}
