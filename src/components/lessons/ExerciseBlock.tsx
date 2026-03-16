'use client';

import { useState, useCallback } from 'react';
import { Exercise, QueryResult } from '@/types/lesson';
import { useSql } from '@/components/sql/SqlProvider';
import SqlEditor from '@/components/sql/SqlEditor';
import ResultsTable from '@/components/sql/ResultsTable';
import { markExerciseComplete, isExerciseComplete, incrementQueryCount } from '@/lib/progress-store';

interface ExerciseBlockProps {
  exercise: Exercise;
  index: number;
}

export default function ExerciseBlock({ exercise, index }: ExerciseBlockProps) {
  const { executeQuery } = useSql();
  const [result, setResult] = useState<QueryResult | null>(null);
  const [hintLevel, setHintLevel] = useState(0);
  const [isCorrect, setIsCorrect] = useState(isExerciseComplete(exercise.id));
  const [feedback, setFeedback] = useState<string | null>(null);

  const validate = useCallback(
    (queryResult: QueryResult, userQuery: string) => {
      if (queryResult.error) return false;

      const upperQuery = userQuery.toUpperCase();

      // Check required keywords
      if (exercise.requiredKeywords) {
        for (const kw of exercise.requiredKeywords) {
          if (!upperQuery.includes(kw.toUpperCase())) {
            setFeedback(`Tu consulta debe incluir: ${kw}`);
            return false;
          }
        }
      }

      // Check forbidden keywords
      if (exercise.forbiddenKeywords) {
        for (const kw of exercise.forbiddenKeywords) {
          if (upperQuery.includes(kw.toUpperCase())) {
            setFeedback(`Tu consulta no debe usar: ${kw}`);
            return false;
          }
        }
      }

      // Check expected columns
      if (exercise.expectedColumns) {
        const resultCols = queryResult.columns.map((c) => c.toLowerCase());
        for (const col of exercise.expectedColumns) {
          if (!resultCols.includes(col.toLowerCase())) {
            setFeedback(`Falta la columna: ${col}`);
            return false;
          }
        }
      }

      // Check expected row count
      if (exercise.expectedRowCount !== undefined) {
        if (queryResult.rowCount !== exercise.expectedRowCount) {
          setFeedback(
            `Se esperan ${exercise.expectedRowCount} filas, tu consulta retornó ${queryResult.rowCount}`
          );
          return false;
        }
      }

      return true;
    },
    [exercise]
  );

  const handleExecute = useCallback(
    (query: string) => {
      const queryResult = executeQuery(query);
      setResult(queryResult);
      incrementQueryCount();

      if (queryResult.error) {
        setFeedback(null);
        setIsCorrect(false);
        return;
      }

      const valid = validate(queryResult, query);
      if (valid) {
        setIsCorrect(true);
        setFeedback(null);
        markExerciseComplete(exercise.id);
      }
    },
    [executeQuery, validate, exercise.id]
  );

  return (
    <div className="border border-[var(--border-color)] rounded-xl bg-[var(--bg-card)] p-5 my-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            isCorrect
              ? 'bg-[var(--success)]/20 text-[var(--success)]'
              : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
          }`}
        >
          {isCorrect ? '\u2713' : index + 1}
        </div>
        <h4 className="text-sm font-semibold text-[var(--text-heading)]">
          Ejercicio {index + 1}
        </h4>
        {isCorrect && (
          <span className="text-xs text-[var(--success)] ml-auto">Completado</span>
        )}
      </div>

      <p className="text-sm text-[var(--text-body)] mb-4">{exercise.instruction}</p>

      <SqlEditor
        initialValue={exercise.initialQuery}
        onExecute={handleExecute}
        height="120px"
      />

      {/* Feedback */}
      {feedback && !isCorrect && (
        <div className="mt-3 p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20 text-sm text-[var(--warning)]">
          {feedback}
        </div>
      )}

      {isCorrect && result && !result.error && (
        <div className="mt-3 p-3 rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20 text-sm text-[var(--success)]">
          ¡Correcto! Excelente trabajo.
        </div>
      )}

      <ResultsTable result={result} />

      {/* Hints */}
      {!isCorrect && (
        <div className="mt-4">
          {hintLevel < exercise.hints.length && (
            <button
              onClick={() => setHintLevel((prev) => prev + 1)}
              className="text-xs text-[var(--accent-blue)] hover:underline cursor-pointer"
            >
              {hintLevel === 0
                ? 'Necesito una pista'
                : hintLevel === 1
                ? 'Otra pista más'
                : 'Mostrar solución'}
            </button>
          )}
          {hintLevel > 0 && (
            <div className="mt-2 space-y-2">
              {exercise.hints.slice(0, hintLevel).map((hint, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-xs font-mono ${
                    i === exercise.hints.length - 1
                      ? 'bg-[var(--terminal-bg)] border border-[var(--terminal-border)] text-[var(--terminal-green)]'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="text-[var(--accent-blue)]">Pista {i + 1}:</span> {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
