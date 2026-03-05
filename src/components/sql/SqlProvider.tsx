'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { Database } from 'sql.js';
import { QueryResult } from '@/types/lesson';
import { createDatabase, loadDataset, executeQuery as execQuery, getSchemaInfo } from '@/lib/sql-engine';

interface SqlContextValue {
  db: Database | null;
  isLoading: boolean;
  error: string | null;
  initDatabase: (datasetName?: string) => Promise<void>;
  executeQuery: (sql: string) => QueryResult;
  resetDatabase: () => Promise<void>;
  schema: { name: string; columns: string[] }[];
  currentDataset: string | null;
}

const SqlContext = createContext<SqlContextValue | null>(null);

export function SqlProvider({ children, dataset }: { children: ReactNode; dataset?: string }) {
  const [db, setDb] = useState<Database | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<{ name: string; columns: string[] }[]>([]);
  const [currentDataset, setCurrentDataset] = useState<string | null>(dataset || null);
  const initRef = useRef(false);

  const initDatabase = useCallback(async (datasetName?: string) => {
    if (initRef.current && !datasetName) return;
    initRef.current = true;
    setIsLoading(true);
    setError(null);
    try {
      const newDb = await createDatabase();
      const dsName = datasetName || dataset;
      if (dsName) {
        await loadDataset(newDb, dsName);
        setCurrentDataset(dsName);
      }
      setDb(newDb);
      setSchema(getSchemaInfo(newDb));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inicializando base de datos');
    } finally {
      setIsLoading(false);
    }
  }, [dataset]);

  const runQuery = useCallback((sql: string): QueryResult => {
    if (!db) {
      return { columns: [], rows: [], rowCount: 0, error: 'Base de datos no inicializada' };
    }
    const result = execQuery(db, sql);
    if (!result.error) {
      setSchema(getSchemaInfo(db));
    }
    return result;
  }, [db]);

  const resetDatabase = useCallback(async () => {
    initRef.current = false;
    await initDatabase(currentDataset || undefined);
  }, [initDatabase, currentDataset]);

  return (
    <SqlContext.Provider
      value={{
        db,
        isLoading,
        error,
        initDatabase,
        executeQuery: runQuery,
        resetDatabase,
        schema,
        currentDataset,
      }}
    >
      {children}
    </SqlContext.Provider>
  );
}

export function useSql() {
  const context = useContext(SqlContext);
  if (!context) {
    throw new Error('useSql must be used within a SqlProvider');
  }
  return context;
}
