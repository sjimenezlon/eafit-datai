'use client';

import { useState, useCallback } from 'react';
import { LessonSection, QueryResult } from '@/types/lesson';
import { useSql } from '@/components/sql/SqlProvider';
import ResultsTable from '@/components/sql/ResultsTable';

export default function LessonContent({ section }: { section: LessonSection }) {
  const { executeQuery } = useSql();
  const [demoResult, setDemoResult] = useState<QueryResult | null>(null);

  const runDemo = useCallback(() => {
    if (section.code) {
      const statements = section.code
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s && !s.startsWith('--'));
      let lastResult = null;
      for (const stmt of statements) {
        lastResult = executeQuery(stmt + ';');
        if (lastResult.error) break;
      }
      if (lastResult) setDemoResult(lastResult);
    }
  }, [section.code, executeQuery]);

  if (section.type === 'theory') {
    return (
      <div className="mb-6">
        {section.title && (
          <h3 className="text-base font-semibold text-[var(--text-heading)] mb-2">
            {section.title}
          </h3>
        )}
        <div
          className="text-sm text-[var(--text-body)] leading-relaxed [&_code]:bg-[var(--terminal-bg)] [&_code]:text-[var(--terminal-green)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_strong]:text-[var(--text-heading)] [&_em]:text-[var(--accent-blue)]"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    );
  }

  if (section.type === 'code-example') {
    return (
      <div className="mb-6">
        {section.title && (
          <h3 className="text-base font-semibold text-[var(--text-heading)] mb-2">
            {section.title}
          </h3>
        )}
        {section.content && (
          <p
            className="text-sm text-[var(--text-body)] mb-3"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        )}
        {section.code && (
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="terminal-title">ejemplo.sql</span>
              <button
                onClick={runDemo}
                className="ml-auto px-3 py-1 text-xs rounded border transition-all cursor-pointer
                  border-[var(--terminal-green)] text-[var(--terminal-green)]
                  hover:bg-[var(--terminal-green)] hover:text-[var(--terminal-bg)]
                  font-mono"
              >
                Ejecutar
              </button>
            </div>
            <pre className="terminal-body text-sm overflow-x-auto whitespace-pre-wrap">
              {section.code}
            </pre>
          </div>
        )}
        {demoResult && <ResultsTable result={demoResult} />}
      </div>
    );
  }

  if (section.type === 'tip') {
    return (
      <div className="mb-6 p-4 rounded-lg border-l-4 border-[var(--accent-blue)] bg-[var(--accent-blue)]/5">
        {section.title && (
          <h4 className="text-sm font-semibold text-[var(--accent-blue)] mb-1">{section.title}</h4>
        )}
        <div
          className="text-sm text-[var(--text-body)] [&_strong]:text-[var(--text-heading)] [&_code]:bg-[var(--terminal-bg)] [&_code]:text-[var(--terminal-green)] [&_code]:px-1 [&_code]:rounded [&_code]:text-xs"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    );
  }

  if (section.type === 'warning') {
    return (
      <div className="mb-6 p-4 rounded-lg border-l-4 border-[var(--warning)] bg-[var(--warning)]/5">
        {section.title && (
          <h4 className="text-sm font-semibold text-[var(--warning)] mb-1">{section.title}</h4>
        )}
        <div
          className="text-sm text-[var(--text-body)] [&_strong]:text-[var(--text-heading)] [&_code]:bg-[var(--terminal-bg)] [&_code]:text-[var(--terminal-green)] [&_code]:px-1 [&_code]:rounded [&_code]:text-xs"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    );
  }

  if (section.type === 'diagram') {
    return (
      <div className="mb-6 p-5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-center">
        {section.title && (
          <h4 className="text-sm font-semibold text-[var(--accent-purple)] mb-2">{section.title}</h4>
        )}
        <div
          className="text-sm text-[var(--text-body)] font-mono"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    );
  }

  return null;
}
