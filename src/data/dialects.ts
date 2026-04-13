export type EngineId =
  | 'postgresql'
  | 'mysql'
  | 'sqlserver'
  | 'oracle'
  | 'sqlite'
  | 'bigquery'
  | 'snowflake'
  | 'duckdb'
  | 'mongodb';

export interface EngineMeta {
  id: EngineId;
  name: string;
  color: string;
  family: 'relacional' | 'nube' | 'embebida' | 'nosql';
}

export const engines: EngineMeta[] = [
  { id: 'postgresql', name: 'PostgreSQL', color: '#336791', family: 'relacional' },
  { id: 'mysql',      name: 'MySQL',      color: '#00758f', family: 'relacional' },
  { id: 'sqlserver',  name: 'SQL Server', color: '#a91d22', family: 'relacional' },
  { id: 'oracle',     name: 'Oracle',     color: '#f80000', family: 'relacional' },
  { id: 'sqlite',     name: 'SQLite',     color: '#003b57', family: 'embebida' },
  { id: 'bigquery',   name: 'BigQuery',   color: '#4285f4', family: 'nube' },
  { id: 'snowflake',  name: 'Snowflake',  color: '#29b5e8', family: 'nube' },
  { id: 'duckdb',     name: 'DuckDB',     color: '#fff000', family: 'embebida' },
  { id: 'mongodb',    name: 'MongoDB',    color: '#13aa52', family: 'nosql' },
];

export interface DialectOperation {
  id: string;
  title: string;
  category: 'basico' | 'paginacion' | 'fechas' | 'texto' | 'json' | 'analitica' | 'ddl' | 'avanzado';
  problem: string;
  note?: string;
  variants: Partial<Record<EngineId, { code: string; note?: string }>>;
}

export const operations: DialectOperation[] = [
  // ===================== BÁSICO =====================
  {
    id: 'limit-top',
    title: 'Limitar filas (TOP N)',
    category: 'basico',
    problem: 'Obtener los 10 clientes más recientes.',
    note: 'La cláusula estándar SQL:2008 es FETCH FIRST … ROWS ONLY, pero casi nadie la usa. Cada motor inventó su propia sintaxis antes del estándar.',
    variants: {
      postgresql: { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nLIMIT 10;' },
      mysql:      { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nLIMIT 10;' },
      sqlserver:  { code: 'SELECT TOP 10 *\nFROM clientes\nORDER BY creado_en DESC;' },
      oracle:     { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nFETCH FIRST 10 ROWS ONLY;' },
      sqlite:     { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nLIMIT 10;' },
      bigquery:   { code: 'SELECT *\nFROM `proyecto.dataset.clientes`\nORDER BY creado_en DESC\nLIMIT 10;' },
      snowflake:  { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nLIMIT 10;' },
      duckdb:     { code: 'SELECT *\nFROM clientes\nORDER BY creado_en DESC\nLIMIT 10;' },
      mongodb:    { code: 'db.clientes\n  .find({})\n  .sort({ creado_en: -1 })\n  .limit(10);' },
    },
  },

  // ===================== PAGINACIÓN =====================
  {
    id: 'pagination',
    title: 'Paginación (página 3, 20 filas)',
    category: 'paginacion',
    problem: 'Mostrar la tercera página de productos ordenados por nombre, 20 por página.',
    note: 'Usar OFFSET es lento en tablas grandes. En producción, preferir "keyset pagination" (WHERE id > ultimo_id) cuando sea posible.',
    variants: {
      postgresql: { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;' },
      mysql:      { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;\n-- También válido: LIMIT 40, 20' },
      sqlserver:  { code: 'SELECT *\nFROM productos\nORDER BY nombre\nOFFSET 40 ROWS\nFETCH NEXT 20 ROWS ONLY;' },
      oracle:     { code: 'SELECT *\nFROM productos\nORDER BY nombre\nOFFSET 40 ROWS\nFETCH NEXT 20 ROWS ONLY;' },
      sqlite:     { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;' },
      bigquery:   { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;' },
      snowflake:  { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;' },
      duckdb:     { code: 'SELECT *\nFROM productos\nORDER BY nombre\nLIMIT 20 OFFSET 40;' },
      mongodb:    { code: 'db.productos\n  .find({})\n  .sort({ nombre: 1 })\n  .skip(40)\n  .limit(20);' },
    },
  },

  // ===================== FECHAS =====================
  {
    id: 'fecha-actual',
    title: 'Fecha/hora actual',
    category: 'fechas',
    problem: 'Insertar un registro con la fecha y hora actuales.',
    variants: {
      postgresql: { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', NOW());\n-- También: CURRENT_TIMESTAMP" },
      mysql:      { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', NOW());" },
      sqlserver:  { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', GETDATE());\n-- También: SYSDATETIME()" },
      oracle:     { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', SYSDATE);\n-- Con zona horaria: SYSTIMESTAMP" },
      sqlite:     { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', datetime('now'));" },
      bigquery:   { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', CURRENT_TIMESTAMP());" },
      snowflake:  { code: "INSERT INTO logs (mensaje, creado_en)\nVALUES ('hola', CURRENT_TIMESTAMP());" },
      duckdb:     { code: "INSERT INTO logs VALUES ('hola', NOW());" },
      mongodb:    { code: "db.logs.insertOne({\n  mensaje: 'hola',\n  creado_en: new Date()\n});" },
    },
  },
  {
    id: 'diferencia-dias',
    title: 'Diferencia entre fechas (en días)',
    category: 'fechas',
    problem: '¿Cuántos días pasaron entre la compra y hoy?',
    variants: {
      postgresql: { code: "SELECT CURRENT_DATE - fecha_compra AS dias\nFROM pedidos;" },
      mysql:      { code: "SELECT DATEDIFF(CURDATE(), fecha_compra) AS dias\nFROM pedidos;" },
      sqlserver:  { code: "SELECT DATEDIFF(day, fecha_compra, GETDATE()) AS dias\nFROM pedidos;" },
      oracle:     { code: "SELECT TRUNC(SYSDATE - fecha_compra) AS dias\nFROM pedidos;" },
      sqlite:     { code: "SELECT julianday('now') - julianday(fecha_compra) AS dias\nFROM pedidos;" },
      bigquery:   { code: "SELECT DATE_DIFF(CURRENT_DATE(), fecha_compra, DAY) AS dias\nFROM pedidos;" },
      snowflake:  { code: "SELECT DATEDIFF(day, fecha_compra, CURRENT_DATE()) AS dias\nFROM pedidos;" },
      duckdb:     { code: "SELECT DATE_DIFF('day', fecha_compra, CURRENT_DATE) AS dias\nFROM pedidos;" },
      mongodb:    { code: "db.pedidos.aggregate([{\n  $project: {\n    dias: {\n      $dateDiff: {\n        startDate: '$fecha_compra',\n        endDate: '$$NOW',\n        unit: 'day'\n      }\n    }\n  }\n}]);" },
    },
  },
  {
    id: 'fecha-formato',
    title: 'Formatear fecha (YYYY-MM)',
    category: 'fechas',
    problem: 'Agrupar ventas por mes en formato "2026-04".',
    variants: {
      postgresql: { code: "SELECT TO_CHAR(fecha, 'YYYY-MM') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
      mysql:      { code: "SELECT DATE_FORMAT(fecha, '%Y-%m') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
      sqlserver:  { code: "SELECT FORMAT(fecha, 'yyyy-MM') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY FORMAT(fecha, 'yyyy-MM');" },
      oracle:     { code: "SELECT TO_CHAR(fecha, 'YYYY-MM') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY TO_CHAR(fecha, 'YYYY-MM');" },
      sqlite:     { code: "SELECT strftime('%Y-%m', fecha) AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
      bigquery:   { code: "SELECT FORMAT_DATE('%Y-%m', fecha) AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
      snowflake:  { code: "SELECT TO_VARCHAR(fecha, 'YYYY-MM') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
      duckdb:     { code: "SELECT strftime(fecha, '%Y-%m') AS mes,\n       SUM(total)\nFROM ventas\nGROUP BY mes;" },
    },
  },

  // ===================== TEXTO =====================
  {
    id: 'concat',
    title: 'Concatenar cadenas',
    category: 'texto',
    problem: 'Unir nombre y apellido en un "nombre completo".',
    note: 'El operador estándar SQL es ||, pero MySQL lo ignora por defecto (lo interpreta como OR lógico).',
    variants: {
      postgresql: { code: "SELECT nombre || ' ' || apellido AS completo\nFROM usuarios;\n-- También: CONCAT(nombre, ' ', apellido)" },
      mysql:      { code: "SELECT CONCAT(nombre, ' ', apellido) AS completo\nFROM usuarios;\n-- || es OR en MySQL (salvo PIPES_AS_CONCAT)" },
      sqlserver:  { code: "SELECT nombre + ' ' + apellido AS completo\nFROM usuarios;\n-- Mejor: CONCAT(nombre,' ',apellido) (maneja NULL)" },
      oracle:     { code: "SELECT nombre || ' ' || apellido AS completo\nFROM usuarios;" },
      sqlite:     { code: "SELECT nombre || ' ' || apellido AS completo\nFROM usuarios;" },
      bigquery:   { code: "SELECT CONCAT(nombre, ' ', apellido) AS completo\nFROM usuarios;" },
      snowflake:  { code: "SELECT nombre || ' ' || apellido AS completo\nFROM usuarios;" },
      duckdb:     { code: "SELECT nombre || ' ' || apellido AS completo\nFROM usuarios;" },
      mongodb:    { code: "db.usuarios.aggregate([{\n  $project: {\n    completo: { $concat: ['$nombre',' ','$apellido'] }\n  }\n}]);" },
    },
  },
  {
    id: 'substring',
    title: 'Substring y longitud',
    category: 'texto',
    problem: 'Obtener los primeros 3 caracteres del código de producto.',
    variants: {
      postgresql: { code: 'SELECT SUBSTRING(codigo FROM 1 FOR 3),\n       LENGTH(codigo)\nFROM productos;' },
      mysql:      { code: 'SELECT SUBSTRING(codigo, 1, 3),\n       CHAR_LENGTH(codigo)\nFROM productos;' },
      sqlserver:  { code: 'SELECT SUBSTRING(codigo, 1, 3),\n       LEN(codigo)\nFROM productos;' },
      oracle:     { code: 'SELECT SUBSTR(codigo, 1, 3),\n       LENGTH(codigo)\nFROM productos;' },
      sqlite:     { code: 'SELECT SUBSTR(codigo, 1, 3),\n       LENGTH(codigo)\nFROM productos;' },
      bigquery:   { code: 'SELECT SUBSTR(codigo, 1, 3),\n       LENGTH(codigo)\nFROM productos;' },
      snowflake:  { code: 'SELECT SUBSTR(codigo, 1, 3),\n       LENGTH(codigo)\nFROM productos;' },
      duckdb:     { code: 'SELECT SUBSTR(codigo, 1, 3),\n       LENGTH(codigo)\nFROM productos;' },
    },
  },

  // ===================== JSON =====================
  {
    id: 'json-extract',
    title: 'Extraer un campo de JSON',
    category: 'json',
    problem: 'Dada una columna `metadata` (JSON), obtener el valor de la clave `color`.',
    variants: {
      postgresql: { code: "SELECT metadata->>'color' AS color\nFROM productos;\n-- -> devuelve JSON, ->> devuelve texto" },
      mysql:      { code: "SELECT JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.color')) AS color\nFROM productos;\n-- También: metadata->>'$.color'" },
      sqlserver:  { code: "SELECT JSON_VALUE(metadata, '$.color') AS color\nFROM productos;" },
      oracle:     { code: "SELECT JSON_VALUE(metadata, '$.color') AS color\nFROM productos;" },
      sqlite:     { code: "SELECT metadata->>'color' AS color\nFROM productos;\n-- Requiere SQLite 3.38+" },
      bigquery:   { code: "SELECT JSON_VALUE(metadata, '$.color') AS color\nFROM productos;" },
      snowflake:  { code: "SELECT metadata:color::string AS color\nFROM productos;" },
      duckdb:     { code: "SELECT metadata->>'color' AS color\nFROM productos;" },
      mongodb:    { code: "db.productos.find(\n  {},\n  { color: '$metadata.color' }\n);" },
    },
  },

  // ===================== ANALÍTICA / WINDOW =====================
  {
    id: 'running-total',
    title: 'Total acumulado (running total)',
    category: 'analitica',
    problem: 'Calcular el total acumulado de ventas por fecha.',
    note: 'Window functions son estándar SQL:2003 y funcionan igual en casi todos los motores modernos. MySQL las soporta desde 8.0 (2018).',
    variants: {
      postgresql: { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (\n         ORDER BY fecha\n         ROWS UNBOUNDED PRECEDING\n       ) AS acumulado\nFROM ventas;' },
      mysql:      { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (\n         ORDER BY fecha\n         ROWS UNBOUNDED PRECEDING\n       ) AS acumulado\nFROM ventas;' },
      sqlserver:  { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (\n         ORDER BY fecha\n         ROWS UNBOUNDED PRECEDING\n       ) AS acumulado\nFROM ventas;' },
      oracle:     { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (\n         ORDER BY fecha\n       ) AS acumulado\nFROM ventas;' },
      sqlite:     { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (\n         ORDER BY fecha\n       ) AS acumulado\nFROM ventas;\n-- Desde SQLite 3.25' },
      bigquery:   { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (ORDER BY fecha) AS acumulado\nFROM ventas;' },
      snowflake:  { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (ORDER BY fecha) AS acumulado\nFROM ventas;' },
      duckdb:     { code: 'SELECT fecha,\n       total,\n       SUM(total) OVER (ORDER BY fecha) AS acumulado\nFROM ventas;' },
    },
  },
  {
    id: 'top-por-grupo',
    title: 'Top-N por grupo',
    category: 'analitica',
    problem: 'Los 3 productos más vendidos por categoría.',
    variants: {
      postgresql: { code: 'SELECT *\nFROM (\n  SELECT p.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY categoria_id\n      ORDER BY vendidos DESC\n    ) AS rn\n  FROM productos p\n) t\nWHERE rn <= 3;' },
      mysql:      { code: 'SELECT *\nFROM (\n  SELECT p.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY categoria_id\n      ORDER BY vendidos DESC\n    ) AS rn\n  FROM productos p\n) t\nWHERE rn <= 3;' },
      sqlserver:  { code: 'WITH ranked AS (\n  SELECT p.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY categoria_id\n      ORDER BY vendidos DESC\n    ) AS rn\n  FROM productos p\n)\nSELECT * FROM ranked WHERE rn <= 3;' },
      oracle:     { code: 'SELECT *\nFROM productos\nMATCH_RECOGNIZE (...)\n-- O con ROW_NUMBER + subquery:\n-- WHERE rn <= 3' },
      bigquery:   { code: 'SELECT * EXCEPT(rn) FROM (\n  SELECT p.*,\n    ROW_NUMBER() OVER (\n      PARTITION BY categoria_id\n      ORDER BY vendidos DESC\n    ) AS rn\n  FROM productos p\n)\nWHERE rn <= 3;' },
      snowflake:  { code: 'SELECT * FROM productos\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY categoria_id\n  ORDER BY vendidos DESC\n) <= 3;\n-- QUALIFY es azúcar sintáctica genial' },
      duckdb:     { code: 'SELECT * FROM productos\nQUALIFY ROW_NUMBER() OVER (\n  PARTITION BY categoria_id\n  ORDER BY vendidos DESC\n) <= 3;' },
    },
  },

  // ===================== DDL / UPSERT =====================
  {
    id: 'auto-increment',
    title: 'Clave primaria auto-incremental',
    category: 'ddl',
    problem: 'Crear una tabla con ID auto-incremental.',
    variants: {
      postgresql: { code: 'CREATE TABLE usuarios (\n  id BIGSERIAL PRIMARY KEY,\n  email TEXT NOT NULL\n);\n-- Moderno: id BIGINT GENERATED ALWAYS AS IDENTITY' },
      mysql:      { code: 'CREATE TABLE usuarios (\n  id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  email VARCHAR(255) NOT NULL\n);' },
      sqlserver:  { code: 'CREATE TABLE usuarios (\n  id BIGINT IDENTITY(1,1) PRIMARY KEY,\n  email NVARCHAR(255) NOT NULL\n);' },
      oracle:     { code: 'CREATE TABLE usuarios (\n  id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email VARCHAR2(255) NOT NULL\n);' },
      sqlite:     { code: 'CREATE TABLE usuarios (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  email TEXT NOT NULL\n);' },
      bigquery:   { code: '-- BigQuery no tiene auto-increment.\n-- Usa GENERATE_UUID() o ROW_NUMBER al cargar:\nCREATE TABLE usuarios (\n  id STRING DEFAULT GENERATE_UUID(),\n  email STRING\n);' },
      snowflake:  { code: 'CREATE TABLE usuarios (\n  id NUMBER AUTOINCREMENT START 1 INCREMENT 1,\n  email STRING\n);' },
      duckdb:     { code: 'CREATE SEQUENCE seq_usuarios;\nCREATE TABLE usuarios (\n  id BIGINT DEFAULT nextval(\'seq_usuarios\') PRIMARY KEY,\n  email TEXT\n);' },
    },
  },
  {
    id: 'upsert',
    title: 'UPSERT (insertar o actualizar)',
    category: 'ddl',
    problem: 'Insertar un usuario; si el email ya existe, actualizar el nombre.',
    note: 'Esta es una de las diferencias más dolorosas entre motores. Memorizar la forma de tu motor ahorra horas.',
    variants: {
      postgresql: { code: "INSERT INTO usuarios (email, nombre)\nVALUES ('a@x.com', 'Ana')\nON CONFLICT (email)\nDO UPDATE SET nombre = EXCLUDED.nombre;" },
      mysql:      { code: "INSERT INTO usuarios (email, nombre)\nVALUES ('a@x.com', 'Ana')\nON DUPLICATE KEY UPDATE\n  nombre = VALUES(nombre);" },
      sqlserver:  { code: "MERGE usuarios AS t\nUSING (VALUES ('a@x.com','Ana')) AS s(email,nombre)\n  ON t.email = s.email\nWHEN MATCHED THEN\n  UPDATE SET nombre = s.nombre\nWHEN NOT MATCHED THEN\n  INSERT (email, nombre) VALUES (s.email, s.nombre);" },
      oracle:     { code: "MERGE INTO usuarios t\nUSING (SELECT 'a@x.com' email, 'Ana' nombre FROM dual) s\n  ON (t.email = s.email)\nWHEN MATCHED THEN UPDATE SET t.nombre = s.nombre\nWHEN NOT MATCHED THEN\n  INSERT (email, nombre) VALUES (s.email, s.nombre);" },
      sqlite:     { code: "INSERT INTO usuarios (email, nombre)\nVALUES ('a@x.com', 'Ana')\nON CONFLICT(email)\nDO UPDATE SET nombre = excluded.nombre;" },
      bigquery:   { code: "MERGE usuarios t\nUSING (SELECT 'a@x.com' email, 'Ana' nombre) s\n  ON t.email = s.email\nWHEN MATCHED THEN UPDATE SET nombre = s.nombre\nWHEN NOT MATCHED THEN\n  INSERT (email, nombre) VALUES (s.email, s.nombre);" },
      snowflake:  { code: "MERGE INTO usuarios t\nUSING (SELECT 'a@x.com' email, 'Ana' nombre) s\n  ON t.email = s.email\nWHEN MATCHED THEN UPDATE SET nombre = s.nombre\nWHEN NOT MATCHED THEN\n  INSERT (email, nombre) VALUES (s.email, s.nombre);" },
      duckdb:     { code: "INSERT INTO usuarios (email, nombre)\nVALUES ('a@x.com', 'Ana')\nON CONFLICT (email)\nDO UPDATE SET nombre = excluded.nombre;" },
      mongodb:    { code: "db.usuarios.updateOne(\n  { email: 'a@x.com' },\n  { $set: { nombre: 'Ana' } },\n  { upsert: true }\n);" },
    },
  },

  // ===================== AVANZADO =====================
  {
    id: 'cte-recursivo',
    title: 'CTE recursivo (jerarquías)',
    category: 'avanzado',
    problem: 'Obtener todos los subordinados de un empleado.',
    variants: {
      postgresql: { code: 'WITH RECURSIVE sub AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados\n  WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;' },
      mysql:      { code: 'WITH RECURSIVE sub AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;\n-- Desde MySQL 8.0' },
      sqlserver:  { code: 'WITH sub AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;\n-- RECURSIVE es implícito en SQL Server' },
      oracle:     { code: '-- Opción 1: CTE recursivo\nWITH sub (id, nombre, jefe_id) AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;\n\n-- Opción 2 clásica de Oracle:\nSELECT id, nombre\nFROM empleados\nSTART WITH id = 1\nCONNECT BY PRIOR id = jefe_id;' },
      sqlite:     { code: 'WITH RECURSIVE sub AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;' },
      bigquery:   { code: 'WITH RECURSIVE sub AS (\n  SELECT id, nombre, jefe_id\n  FROM empleados WHERE id = 1\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id\n  FROM empleados e\n  JOIN sub ON e.jefe_id = sub.id\n)\nSELECT * FROM sub;' },
    },
  },
  {
    id: 'full-text',
    title: 'Búsqueda full-text',
    category: 'avanzado',
    problem: 'Buscar "camiseta roja" en el nombre y descripción de productos.',
    variants: {
      postgresql: { code: "SELECT *\nFROM productos\nWHERE to_tsvector('spanish', nombre||' '||descripcion)\n      @@ plainto_tsquery('spanish', 'camiseta roja');" },
      mysql:      { code: "SELECT *\nFROM productos\nWHERE MATCH(nombre, descripcion)\n      AGAINST('camiseta roja' IN NATURAL LANGUAGE MODE);\n-- Requiere índice FULLTEXT" },
      sqlserver:  { code: "SELECT *\nFROM productos\nWHERE CONTAINS((nombre, descripcion), '\"camiseta\" AND \"roja\"');\n-- Requiere Full-Text Index" },
      oracle:     { code: "SELECT *\nFROM productos\nWHERE CONTAINS(descripcion, 'camiseta AND roja') > 0;\n-- Oracle Text (CTXSYS)" },
      sqlite:     { code: "-- Tabla virtual FTS5:\nCREATE VIRTUAL TABLE productos_fts\n  USING fts5(nombre, descripcion);\nSELECT * FROM productos_fts\nWHERE productos_fts MATCH 'camiseta roja';" },
      bigquery:   { code: "SELECT *\nFROM productos\nWHERE SEARCH(descripcion, 'camiseta roja');" },
    },
  },
  {
    id: 'busqueda-vectorial',
    title: 'Búsqueda vectorial / semántica (IA)',
    category: 'avanzado',
    problem: 'Encontrar los 5 productos más similares a un embedding dado.',
    note: 'La búsqueda vectorial es el nuevo estándar de facto para apps con LLMs (RAG). En 2026 prácticamente todos los motores serios ya la soportan.',
    variants: {
      postgresql: { code: "-- Extensión pgvector\nSELECT id, nombre,\n  embedding <=> '[0.1,0.2,...]'::vector AS distancia\nFROM productos\nORDER BY distancia\nLIMIT 5;\n-- <-> L2, <=> coseno, <#> producto interno" },
      mysql:      { code: "-- MySQL 9.0+ (HeatWave) soporta VECTOR\nSELECT id, nombre,\n  DISTANCE(embedding, STRING_TO_VECTOR('[0.1,0.2,...]'), 'COSINE') AS d\nFROM productos\nORDER BY d\nLIMIT 5;" },
      sqlserver:  { code: "-- SQL Server 2025 soporta el tipo VECTOR\nSELECT TOP 5 id, nombre,\n  VECTOR_DISTANCE('cosine', embedding, CAST('[0.1,0.2,...]' AS VECTOR(1536))) AS d\nFROM productos\nORDER BY d;" },
      oracle:     { code: "-- Oracle 23ai (AI Vector Search)\nSELECT id, nombre\nFROM productos\nORDER BY VECTOR_DISTANCE(embedding, :q, COSINE)\nFETCH FIRST 5 ROWS ONLY;" },
      sqlite:     { code: "-- Extensión sqlite-vec\nSELECT rowid, distance\nFROM vec_productos\nWHERE embedding MATCH '[0.1,0.2,...]'\nORDER BY distance\nLIMIT 5;" },
      bigquery:   { code: "SELECT base.id, base.nombre, distance\nFROM VECTOR_SEARCH(\n  TABLE productos,\n  'embedding',\n  (SELECT [0.1, 0.2, ...] AS embedding),\n  top_k => 5,\n  distance_type => 'COSINE'\n);" },
      snowflake:  { code: "SELECT id, nombre,\n  VECTOR_COSINE_SIMILARITY(embedding, [0.1,0.2,...]::VECTOR(FLOAT,1536)) AS sim\nFROM productos\nORDER BY sim DESC\nLIMIT 5;" },
      duckdb:     { code: "-- Extensión vss\nSELECT id, nombre,\n  array_cosine_similarity(embedding, [0.1,0.2,...]::FLOAT[1536]) AS sim\nFROM productos\nORDER BY sim DESC\nLIMIT 5;" },
      mongodb:    { code: "db.productos.aggregate([{\n  $vectorSearch: {\n    index: 'emb_idx',\n    path: 'embedding',\n    queryVector: [0.1, 0.2, ...],\n    numCandidates: 100,\n    limit: 5\n  }\n}]);" },
    },
  },
  {
    id: 'explain',
    title: 'EXPLAIN / plan de ejecución',
    category: 'avanzado',
    problem: 'Ver cómo el motor planea ejecutar una consulta.',
    variants: {
      postgresql: { code: 'EXPLAIN (ANALYZE, BUFFERS)\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
      mysql:      { code: 'EXPLAIN ANALYZE\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
      sqlserver:  { code: "SET STATISTICS XML ON;\nSELECT * FROM pedidos WHERE cliente_id = 42;\n-- O en SSMS: Ctrl+M 'Include Actual Execution Plan'" },
      oracle:     { code: 'EXPLAIN PLAN FOR\nSELECT * FROM pedidos WHERE cliente_id = 42;\nSELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);' },
      sqlite:     { code: 'EXPLAIN QUERY PLAN\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
      bigquery:   { code: '-- En la consola: panel "Execution details"\n-- O programáticamente con dry_run:\n#standardSQL\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
      snowflake:  { code: 'EXPLAIN USING TEXT\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
      duckdb:     { code: 'EXPLAIN ANALYZE\nSELECT * FROM pedidos WHERE cliente_id = 42;' },
    },
  },
];

export const categories: { id: DialectOperation['category']; label: string; icon: string }[] = [
  { id: 'basico',    label: 'Básico',          icon: '◆' },
  { id: 'paginacion',label: 'Paginación',      icon: '▦' },
  { id: 'fechas',    label: 'Fechas y tiempo', icon: '◷' },
  { id: 'texto',     label: 'Texto',           icon: 'T' },
  { id: 'json',      label: 'JSON',            icon: '{}' },
  { id: 'analitica', label: 'Analítica',       icon: '▤' },
  { id: 'ddl',       label: 'DDL y UPSERT',    icon: '⚙' },
  { id: 'avanzado',  label: 'Avanzado',        icon: '★' },
];

export interface Trend2026 {
  title: string;
  tag: string;
  body: string;
  why: string;
}

export const trends2026: Trend2026[] = [
  {
    tag: 'IA',
    title: 'Búsqueda vectorial nativa (pgvector, VECTOR en SQL Server 2025, Oracle 23ai)',
    body: 'En 2026 el tipo VECTOR es parte natural del SQL. Los motores relacionales han absorbido la funcionalidad de las bases de datos vectoriales dedicadas. pgvector en PostgreSQL domina el ecosistema open source y Neon (ahora parte de Databricks) lo expone como servicio serverless.',
    why: 'Toda app con LLM necesita RAG. Como DBA ya no puedes ignorar embeddings, índices HNSW/IVFFlat, ni cómo balancear recall vs latencia.',
  },
  {
    tag: 'Lakehouse',
    title: 'Apache Iceberg como formato de tabla universal',
    body: 'Snowflake, Databricks, BigQuery, DuckDB y Redshift ya leen y escriben Iceberg. La frontera entre "data warehouse" y "data lake" prácticamente desapareció: una sola copia de los datos, consultada por múltiples motores.',
    why: 'Entender Iceberg (y sus primos Delta/Hudi) es tan fundamental hoy como entender índices hace 10 años. Cambia por completo cómo se diseñan pipelines.',
  },
  {
    tag: 'DuckDB',
    title: 'DuckDB: SQL analítico embebido',
    body: 'DuckDB llegó a la 1.x estable en 2024 y para 2026 es la herramienta por defecto para analizar Parquet/CSV localmente o en el navegador (DuckDB-WASM). Lee directamente de S3, GCS y Iceberg sin ETL.',
    why: 'Cambia la regla "primero cargar, luego analizar". Ideal para notebooks, pipelines de desarrollo y dashboards embebidos.',
  },
  {
    tag: 'Serverless',
    title: 'PostgreSQL serverless (Neon, Supabase, Aurora DSQL)',
    body: 'Aurora DSQL (AWS) y Neon popularizaron el modelo de PostgreSQL con separación compute/storage, scale-to-zero y branching como Git. Supabase consolidó el modelo BaaS. Ya no tiene sentido aprovisionar servidores para la mayoría de apps.',
    why: 'Cambia la forma de pensar costos y capacity planning. Conocer cold starts, connection pooling (pgbouncer, Supavisor) y branching es esencial.',
  },
  {
    tag: 'Seguridad',
    title: 'Row-Level Security (RLS) como estándar',
    body: 'Con Supabase, PostgreSQL RLS pasó de feature exótica a mecanismo principal de autorización en apps multi-tenant. SQL Server y Oracle llevan años con esto; ahora también MySQL HeatWave y Snowflake (Row Access Policies).',
    why: 'Permite llevar la autorización hasta la base de datos y no confiar solo en el código de la app. Reduce superficie de ataque.',
  },
  {
    tag: 'MCP',
    title: 'Model Context Protocol (MCP) para bases de datos',
    body: 'Anthropic publicó MCP en 2024 y en 2026 casi todos los motores tienen servidor MCP oficial (Postgres, SQLite, BigQuery, Snowflake, MongoDB). Permite a agentes de IA leer esquemas y ejecutar consultas con permisos controlados.',
    why: 'Cambia cómo los equipos integran IA con sus datos. Como DBA ahora gestionas también accesos para agentes — no solo para humanos y apps.',
  },
  {
    tag: 'Observabilidad',
    title: 'pg_stat_statements, Query Store, Performance Schema',
    body: 'La observabilidad de consultas dejó de ser opcional. Herramientas como pganalyze, Datadog DBM, SolarWinds DPA y el propio Query Store (SQL Server) te dicen qué consulta está degradando el sistema en tiempo real.',
    why: 'Un DBA moderno no depende de logs — mide p95, p99, wait events y relaciona consulta → plan → recurso.',
  },
  {
    tag: 'Datos+IA',
    title: 'Text-to-SQL y asistentes NL→SQL',
    body: 'Snowflake Cortex, BigQuery Data Canvas, SQL Server Copilot y Supabase AI convierten lenguaje natural en SQL. Para 2026 son parte del workflow cotidiano — pero requieren metadata limpia (descripciones de tablas y columnas) para funcionar bien.',
    why: 'Tu rol como DBA cambia: documentar el esquema y curar el catálogo es ahora directamente una tarea de enablement de IA.',
  },
  {
    tag: 'Escala',
    title: 'Sharding declarativo: Citus, Vitess, PlanetScale, YugabyteDB',
    body: 'Escalar horizontalmente ya no requiere reescribir la app. Citus (PostgreSQL), Vitess (MySQL) y Yugabyte (Postgres-compatible) ofrecen sharding transparente.',
    why: 'Conocer las limitaciones (JOINs cross-shard, transacciones distribuidas) es clave para diseñar esquemas que escalen.',
  },
  {
    tag: 'Compliance',
    title: 'Privacidad por diseño: cifrado, auditoría y retención',
    body: 'Cifrado en reposo y en tránsito, pgaudit, TDE, políticas de retención automática, data masking dinámico y Always Encrypted son requisitos mínimos en sectores regulados.',
    why: 'Con la Ley 1581 (Colombia), GDPR y la nueva AI Act europea, la BD es el primer punto de responsabilidad legal.',
  },
];
