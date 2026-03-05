export interface GlossaryTerm {
  term: string;
  definition: string;
  example?: string;
  category: string;
  level: 'basico' | 'intermedio' | 'avanzado';
}

export const glossary: GlossaryTerm[] = [
  // Conceptos basicos
  { term: 'BASE DE DATOS', definition: 'Coleccion organizada de datos estructurados almacenados electronicamente.', category: 'Conceptos', level: 'basico' },
  { term: 'SGBD', definition: 'Sistema de Gestion de Bases de Datos. Software que permite crear, mantener y administrar bases de datos.', example: 'PostgreSQL, MySQL, Oracle, SQL Server', category: 'Conceptos', level: 'basico' },
  { term: 'TABLA', definition: 'Estructura que organiza datos en filas y columnas. Tambien llamada relacion en el modelo relacional.', category: 'Conceptos', level: 'basico' },
  { term: 'FILA (TUPLA)', definition: 'Un registro individual dentro de una tabla. Representa una instancia de la entidad.', category: 'Conceptos', level: 'basico' },
  { term: 'COLUMNA (ATRIBUTO)', definition: 'Define un tipo de dato dentro de una tabla. Cada columna tiene un nombre y un tipo de dato.', category: 'Conceptos', level: 'basico' },
  { term: 'CLAVE PRIMARIA (PK)', definition: 'Columna o conjunto de columnas que identifica de forma unica cada fila de una tabla.', example: 'id INTEGER PRIMARY KEY', category: 'Conceptos', level: 'basico' },
  { term: 'CLAVE FORANEA (FK)', definition: 'Columna que referencia la clave primaria de otra tabla, estableciendo una relacion.', example: 'FOREIGN KEY (depto_id) REFERENCES departamentos(id)', category: 'Conceptos', level: 'basico' },
  { term: 'ESQUEMA', definition: 'Estructura logica de la base de datos: tablas, columnas, tipos de datos y relaciones.', category: 'Conceptos', level: 'basico' },

  // SELECT y filtros
  { term: 'SELECT', definition: 'Comando para extraer datos de una o mas tablas.', example: 'SELECT nombre, edad FROM estudiantes;', category: 'Comandos DML', level: 'basico' },
  { term: 'FROM', definition: 'Especifica la tabla o tablas de donde se extraen los datos.', example: 'SELECT * FROM cursos;', category: 'Comandos DML', level: 'basico' },
  { term: 'WHERE', definition: 'Filtra filas segun una condicion. Solo retorna filas que cumplan el criterio.', example: "WHERE edad > 20 AND ciudad = 'Medellin'", category: 'Comandos DML', level: 'basico' },
  { term: 'ORDER BY', definition: 'Ordena los resultados por una o mas columnas. ASC (ascendente) o DESC (descendente).', example: 'ORDER BY promedio DESC', category: 'Comandos DML', level: 'basico' },
  { term: 'LIMIT', definition: 'Restringe el numero de filas retornadas.', example: 'LIMIT 10', category: 'Comandos DML', level: 'basico' },
  { term: 'DISTINCT', definition: 'Elimina filas duplicadas del resultado.', example: 'SELECT DISTINCT ciudad FROM estudiantes;', category: 'Comandos DML', level: 'basico' },
  { term: 'AS (Alias)', definition: 'Renombra una columna o tabla en el resultado.', example: 'SELECT nombre AS estudiante FROM alumnos;', category: 'Comandos DML', level: 'basico' },

  // Operadores
  { term: 'AND / OR / NOT', definition: 'Operadores logicos para combinar condiciones en WHERE.', example: "WHERE edad > 20 AND ciudad = 'Bogota'", category: 'Operadores', level: 'basico' },
  { term: 'IN', definition: 'Verifica si un valor esta dentro de una lista.', example: "WHERE ciudad IN ('Medellin', 'Bogota', 'Cali')", category: 'Operadores', level: 'basico' },
  { term: 'BETWEEN', definition: 'Verifica si un valor esta dentro de un rango inclusivo.', example: 'WHERE edad BETWEEN 18 AND 25', category: 'Operadores', level: 'basico' },
  { term: 'LIKE', definition: 'Busca patrones en texto. % = cualquier secuencia, _ = un caracter.', example: "WHERE nombre LIKE 'S%'", category: 'Operadores', level: 'basico' },
  { term: 'IS NULL / IS NOT NULL', definition: 'Verifica si un valor es NULL (ausente) o no.', example: 'WHERE nota IS NOT NULL', category: 'Operadores', level: 'basico' },

  // Funciones agregadas
  { term: 'COUNT', definition: 'Cuenta el numero de filas o valores no-NULL.', example: 'SELECT COUNT(*) FROM estudiantes;', category: 'Funciones Agregadas', level: 'intermedio' },
  { term: 'SUM', definition: 'Suma todos los valores de una columna numerica.', example: 'SELECT SUM(creditos) FROM cursos;', category: 'Funciones Agregadas', level: 'intermedio' },
  { term: 'AVG', definition: 'Calcula el promedio de una columna numerica.', example: 'SELECT AVG(promedio) FROM estudiantes;', category: 'Funciones Agregadas', level: 'intermedio' },
  { term: 'MIN / MAX', definition: 'Retorna el valor minimo o maximo de una columna.', example: 'SELECT MIN(edad), MAX(edad) FROM estudiantes;', category: 'Funciones Agregadas', level: 'intermedio' },
  { term: 'GROUP BY', definition: 'Agrupa filas con valores iguales para aplicar funciones agregadas a cada grupo.', example: 'SELECT ciudad, COUNT(*) FROM estudiantes GROUP BY ciudad;', category: 'Funciones Agregadas', level: 'intermedio' },
  { term: 'HAVING', definition: 'Filtra grupos despues de GROUP BY. Similar a WHERE pero para grupos.', example: 'HAVING COUNT(*) > 5', category: 'Funciones Agregadas', level: 'intermedio' },

  // JOINs
  { term: 'INNER JOIN', definition: 'Combina filas de dos tablas donde la condicion se cumple en ambas.', example: 'SELECT * FROM a INNER JOIN b ON a.id = b.a_id;', category: 'JOINs', level: 'intermedio' },
  { term: 'LEFT JOIN', definition: 'Retorna todas las filas de la tabla izquierda y las coincidencias de la derecha. NULL si no hay match.', example: 'SELECT * FROM a LEFT JOIN b ON a.id = b.a_id;', category: 'JOINs', level: 'intermedio' },
  { term: 'CROSS JOIN', definition: 'Producto cartesiano: cada fila de A con cada fila de B.', example: 'SELECT * FROM a CROSS JOIN b;', category: 'JOINs', level: 'intermedio' },
  { term: 'SELF JOIN', definition: 'Una tabla unida consigo misma. Util para relaciones jerarquicas.', example: 'SELECT a.nombre, b.nombre AS jefe FROM emp a JOIN emp b ON a.jefe_id = b.id;', category: 'JOINs', level: 'intermedio' },

  // Subconsultas
  { term: 'SUBCONSULTA', definition: 'Consulta anidada dentro de otra consulta. Se ejecuta primero.', example: 'WHERE id IN (SELECT id FROM ...)', category: 'Subconsultas', level: 'intermedio' },
  { term: 'EXISTS', definition: 'Retorna TRUE si la subconsulta retorna al menos una fila.', example: 'WHERE EXISTS (SELECT 1 FROM inscripciones WHERE ...)', category: 'Subconsultas', level: 'intermedio' },

  // DDL
  { term: 'CREATE TABLE', definition: 'Crea una nueva tabla con columnas y tipos de datos definidos.', example: 'CREATE TABLE alumnos (id INT PRIMARY KEY, nombre TEXT);', category: 'Comandos DDL', level: 'basico' },
  { term: 'ALTER TABLE', definition: 'Modifica la estructura de una tabla existente.', example: 'ALTER TABLE alumnos ADD COLUMN email TEXT;', category: 'Comandos DDL', level: 'intermedio' },
  { term: 'DROP TABLE', definition: 'Elimina una tabla y todos sus datos permanentemente.', example: 'DROP TABLE IF EXISTS temp_datos;', category: 'Comandos DDL', level: 'intermedio' },

  // DML modificacion
  { term: 'INSERT INTO', definition: 'Agrega nuevas filas a una tabla.', example: "INSERT INTO alumnos (nombre) VALUES ('Ana');", category: 'Comandos DML', level: 'basico' },
  { term: 'UPDATE', definition: 'Modifica datos existentes en una tabla.', example: "UPDATE alumnos SET nombre = 'Ana Maria' WHERE id = 1;", category: 'Comandos DML', level: 'basico' },
  { term: 'DELETE', definition: 'Elimina filas de una tabla segun una condicion.', example: 'DELETE FROM alumnos WHERE id = 1;', category: 'Comandos DML', level: 'basico' },

  // Avanzado
  { term: 'VIEW', definition: 'Consulta almacenada como tabla virtual. No almacena datos, se ejecuta al consultarla.', example: 'CREATE VIEW v_activos AS SELECT * FROM alumnos WHERE activo = 1;', category: 'Avanzado', level: 'avanzado' },
  { term: 'INDEX', definition: 'Estructura que acelera las busquedas en una tabla a costa de mas espacio.', example: 'CREATE INDEX idx_nombre ON alumnos(nombre);', category: 'Avanzado', level: 'avanzado' },
  { term: 'TRANSACCION', definition: 'Conjunto de operaciones que se ejecutan como unidad atomica (todo o nada).', example: 'BEGIN; UPDATE ...; COMMIT;', category: 'Avanzado', level: 'avanzado' },
  { term: 'ACID', definition: 'Propiedades de transacciones: Atomicidad, Consistencia, Aislamiento, Durabilidad.', category: 'Avanzado', level: 'avanzado' },
  { term: 'WINDOW FUNCTION', definition: 'Funcion que opera sobre un conjunto de filas relacionadas sin colapsar los grupos.', example: 'ROW_NUMBER() OVER (PARTITION BY depto ORDER BY nota DESC)', category: 'Avanzado', level: 'avanzado' },
  { term: 'CTE (WITH)', definition: 'Common Table Expression. Subconsulta nombrada y reutilizable.', example: 'WITH top AS (SELECT ...) SELECT * FROM top;', category: 'Avanzado', level: 'avanzado' },
  { term: 'UNION', definition: 'Combina resultados de dos consultas eliminando duplicados. UNION ALL mantiene duplicados.', example: 'SELECT nombre FROM A UNION SELECT nombre FROM B;', category: 'Avanzado', level: 'avanzado' },
  { term: 'CASE WHEN', definition: 'Expresion condicional dentro de una consulta SQL.', example: "CASE WHEN nota >= 3.0 THEN 'Aprobado' ELSE 'Reprobado' END", category: 'Avanzado', level: 'intermedio' },
  { term: 'COALESCE', definition: 'Retorna el primer valor no-NULL de una lista de argumentos.', example: "COALESCE(telefono, 'Sin telefono')", category: 'Funciones', level: 'intermedio' },
  { term: 'NORMALIZACION', definition: 'Proceso de organizar tablas para minimizar redundancia. Formas normales: 1FN, 2FN, 3FN, BCNF.', category: 'Diseno', level: 'intermedio' },
  { term: 'MODELO ER', definition: 'Modelo Entidad-Relacion. Diagrama que representa entidades, atributos y relaciones.', category: 'Diseno', level: 'intermedio' },

  // Transacciones y concurrencia
  { term: 'MVCC', definition: 'Multi-Version Concurrency Control. Tecnica que mantiene multiples versiones de datos para permitir lecturas y escrituras concurrentes sin bloqueos.', example: 'PostgreSQL usa MVCC para que un SELECT no bloquee un UPDATE concurrente.', category: 'Avanzado', level: 'avanzado' },
  { term: 'WAL', definition: 'Write-Ahead Log. Registro de todas las modificaciones antes de aplicarlas al almacenamiento principal. Garantiza durabilidad y permite recovery.', example: 'PostgreSQL escribe en el WAL antes de confirmar un COMMIT.', category: 'Avanzado', level: 'avanzado' },
  { term: 'DEADLOCK', definition: 'Situacion donde dos o mas transacciones se bloquean mutuamente esperando recursos que la otra tiene. El SGBD detecta y cancela una para resolverlo.', example: 'Transaccion A bloquea tabla X y espera tabla Y; Transaccion B bloquea Y y espera X.', category: 'Avanzado', level: 'avanzado' },
  { term: 'NIVEL DE AISLAMIENTO', definition: 'Grado de proteccion entre transacciones concurrentes. De menor a mayor: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.', example: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;', category: 'Avanzado', level: 'avanzado' },
  { term: 'SAVEPOINT', definition: 'Punto de guardado dentro de una transaccion que permite hacer rollback parcial sin deshacer toda la transaccion.', example: 'SAVEPOINT sp1; ... ROLLBACK TO sp1;', category: 'Avanzado', level: 'avanzado' },

  // Indices y optimizacion
  { term: 'B-TREE', definition: 'Estructura de datos de arbol balanceado usada en la mayoria de indices. Eficiente para busquedas por igualdad, rango y ordenamiento.', example: 'CREATE INDEX idx_nombre ON usuarios(nombre); -- usa B-tree por defecto', category: 'Avanzado', level: 'avanzado' },
  { term: 'HASH INDEX', definition: 'Indice basado en funcion hash. Solo sirve para busquedas por igualdad exacta, mas rapido que B-tree para ese caso.', example: 'CREATE INDEX idx_email ON usuarios USING HASH (email);', category: 'Avanzado', level: 'avanzado' },
  { term: 'COVERING INDEX', definition: 'Indice que contiene todas las columnas necesarias para una consulta, evitando acceder a la tabla (index-only scan).', example: 'CREATE INDEX idx_cover ON ventas(producto_id, fecha) INCLUDE (monto);', category: 'Avanzado', level: 'avanzado' },
  { term: 'EXPLAIN', definition: 'Comando que muestra el plan de ejecucion de una consulta sin ejecutarla. Fundamental para optimizar queries.', example: 'EXPLAIN ANALYZE SELECT * FROM ventas WHERE monto > 1000;', category: 'Avanzado', level: 'avanzado' },
  { term: 'FULL TABLE SCAN', definition: 'Cuando el motor de BD recorre toda la tabla fila por fila. Ineficiente para tablas grandes; un indice puede evitarlo.', category: 'Avanzado', level: 'avanzado' },

  // Arquitectura de datos moderna
  { term: 'DATA LAKEHOUSE', definition: 'Arquitectura que combina la flexibilidad de un data lake (archivos como Parquet) con la confiabilidad de un data warehouse (SQL, ACID, esquema). Databricks y Snowflake lideran este modelo.', category: 'Plataformas', level: 'avanzado' },
  { term: 'DELTA LAKE', definition: 'Formato de almacenamiento open source creado por Databricks que agrega transacciones ACID, time travel y schema enforcement sobre archivos Parquet en un data lake.', category: 'Plataformas', level: 'avanzado' },
  { term: 'APACHE ICEBERG', definition: 'Formato de tabla abierto para datasets analiticos a gran escala. Soporta time travel, schema evolution y partitioning eficiente. Adoptado por Snowflake, Databricks, AWS y otros.', category: 'Plataformas', level: 'avanzado' },
  { term: 'OLAP', definition: 'Online Analytical Processing. Sistemas optimizados para consultas analiticas complejas sobre grandes volumenes de datos (data warehouses). Contrario a OLTP.', example: 'Snowflake, BigQuery y Redshift son sistemas OLAP.', category: 'Plataformas', level: 'intermedio' },
  { term: 'STAR SCHEMA', definition: 'Modelo de datos para data warehouses: una tabla de hechos central (ventas, transacciones) rodeada de tablas de dimensiones (producto, cliente, tiempo).', category: 'Diseno', level: 'avanzado' },
  { term: 'ETL / ELT', definition: 'Extract, Transform, Load (ETL) o Extract, Load, Transform (ELT). Procesos para mover datos de fuentes a un data warehouse. ELT es mas moderno: carga primero y transforma en el warehouse con SQL.', example: 'dbt es la herramienta mas popular para la T de ELT.', category: 'Plataformas', level: 'intermedio' },

  // IA y bases de datos
  { term: 'BASE DE DATOS VECTORIAL', definition: 'Base de datos especializada en almacenar y buscar vectores (embeddings). Encuentra los datos "mas similares" usando distancia coseno o euclidiana.', example: 'pgvector, Pinecone, Weaviate, Chroma', category: 'Plataformas', level: 'avanzado' },
  { term: 'EMBEDDING', definition: 'Representacion numerica de texto, imagenes u otros datos como un vector de numeros. Textos con significado similar producen vectores cercanos.', example: '"Perro" y "Cachorro" tendran embeddings cercanos; "Perro" y "Avion" estaran lejos.', category: 'Plataformas', level: 'avanzado' },
  { term: 'PGVECTOR', definition: 'Extension de PostgreSQL que agrega tipo de dato VECTOR y operadores de similitud. Permite busqueda semantica directamente en PostgreSQL.', example: "SELECT * FROM docs ORDER BY embedding <=> '[0.1, 0.2, ...]' LIMIT 5;", category: 'Plataformas', level: 'avanzado' },
  { term: 'RAG', definition: 'Retrieval-Augmented Generation. Patron de IA que busca documentos relevantes en una base de datos (vectorial) y los usa como contexto para generar respuestas con un LLM.', category: 'Plataformas', level: 'avanzado' },

  // Cloud y serverless
  { term: 'SERVERLESS DATABASE', definition: 'Base de datos que escala automaticamente y cobra por uso, sin necesidad de provisionar servidores. Puede escalar a cero cuando no hay carga.', example: 'Neon, PlanetScale, BigQuery, Aurora Serverless', category: 'Plataformas', level: 'intermedio' },
  { term: 'SCALE-TO-ZERO', definition: 'Capacidad de una base de datos serverless de apagar completamente el compute cuando no hay consultas, reduciendo el costo a solo almacenamiento.', example: 'Neon escala a cero y despierta en ~300ms cuando llega una consulta.', category: 'Plataformas', level: 'intermedio' },
];

export const glossaryCategories = [...new Set(glossary.map((t) => t.category))];
