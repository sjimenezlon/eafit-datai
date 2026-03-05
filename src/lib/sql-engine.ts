import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { QueryResult } from '@/types/lesson';

let SQL: SqlJsStatic | null = null;

export async function initSQL(): Promise<SqlJsStatic> {
  if (SQL) return SQL;
  SQL = await initSqlJs({
    locateFile: () => '/sql-wasm.wasm',
  });
  return SQL;
}

export async function createDatabase(seedSQL?: string): Promise<Database> {
  const sql = await initSQL();
  const db = new sql.Database();
  if (seedSQL) {
    db.run(seedSQL);
  }
  return db;
}

export async function loadDataset(db: Database, datasetName: string): Promise<void> {
  const response = await fetch(`/datasets/${datasetName}.sql`);
  if (!response.ok) throw new Error(`Dataset ${datasetName} not found`);
  const sql = await response.text();
  db.run(sql);
}

export function executeQuery(db: Database, sql: string): QueryResult {
  const start = performance.now();
  try {
    const results = db.exec(sql);
    const executionTime = Math.round((performance.now() - start) * 100) / 100;

    if (results.length === 0) {
      return {
        columns: [],
        rows: [],
        rowCount: 0,
        executionTime,
      };
    }

    const result = results[0];
    return {
      columns: result.columns,
      rows: result.values as (string | number | null)[][],
      rowCount: result.values.length,
      executionTime,
    };
  } catch (error) {
    return {
      columns: [],
      rows: [],
      rowCount: 0,
      error: error instanceof Error ? error.message : 'Error desconocido',
      executionTime: Math.round((performance.now() - start) * 100) / 100,
    };
  }
}

export function getSchemaInfo(db: Database): { name: string; columns: string[] }[] {
  const tables = db.exec(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
  );
  if (tables.length === 0) return [];

  return tables[0].values.map((row) => {
    const tableName = row[0] as string;
    const colInfo = db.exec(`PRAGMA table_info("${tableName}")`);
    const columns = colInfo.length > 0
      ? colInfo[0].values.map((col) => `${col[1]} (${col[2]})`)
      : [];
    return { name: tableName, columns: columns as string[] };
  });
}
