import Link from 'next/link';

const guidesContent: Record<string, { title: string; intro: string; steps: { title: string; content: string; code?: string }[] }> = {
  'pensar-antes-de-escribir': {
    title: 'Pensar Antes de Escribir SQL',
    intro: 'Los mejores científicos de datos no empiezan escribiendo código. Empiezan pensando. Esta guía te enseña una metodología de 5 pasos que transforma cómo abordas cualquier problema SQL.',
    steps: [
      {
        title: 'Paso 1: Entender el problema',
        content: 'Antes de tocar el teclado, pregúntate: ¿Qué pregunta estoy respondiendo? ¿Quién necesita esta información? ¿Cuál es la decisión que depende de este dato? Escribe la pregunta en lenguaje natural antes de pensar en SQL. Si no puedes explicarla en una frase, todavía no la entiendes.',
      },
      {
        title: 'Paso 2: Identificar las tablas',
        content: '¿Qué tablas contienen los datos que necesitas? Dibuja mentalmente (o físicamente) las relaciones. ¿Cuáles son las claves que las conectan? Esto es clave para decidir qué JOINs necesitas y en qué orden.',
      },
      {
        title: 'Paso 3: Visualizar el resultado',
        content: 'Imagina la tabla resultado antes de escribir. ¿Cuántas columnas tendrá? ¿Qué representará cada fila? ¿Una fila por cliente, por pedido, por mes? Esto te dice qué necesitas en SELECT y cómo agrupar.',
      },
      {
        title: 'Paso 4: Construir incrementalmente',
        content: 'No escribas toda la consulta de una vez. Empieza con un SELECT básico, ejecuta, verifica. Agrega JOIN, ejecuta, verifica. Agrega WHERE, ejecuta, verifica. Cada paso te acerca al resultado sin perder el control.',
        code: '-- Paso 1: Ver los datos base\nSELECT * FROM estudiantes LIMIT 5;\n\n-- Paso 2: Agregar JOIN\nSELECT e.nombre, d.nombre AS depto\nFROM estudiantes e\nJOIN departamentos d ON e.departamento_id = d.id\nLIMIT 5;\n\n-- Paso 3: Agregar filtro y agrupación\nSELECT d.nombre, COUNT(*), ROUND(AVG(e.promedio), 2)\nFROM estudiantes e\nJOIN departamentos d ON e.departamento_id = d.id\nGROUP BY d.nombre\nORDER BY AVG(e.promedio) DESC;',
      },
      {
        title: 'Paso 5: Validar y comunicar',
        content: 'Verifica que el resultado tiene sentido. ¿Los números son razonables? ¿Hay NULLs inesperados? ¿El total cuadra con lo que esperabas? Finalmente, nombra tus columnas con alias claros para que cualquier persona entienda el resultado sin leer el SQL.',
      },
    ],
  },

  'optimizar-consultas': {
    title: 'Optimizar Consultas SQL',
    intro: 'Una consulta lenta no siempre es un problema de SQL — a veces es de datos, de índices, de red o de modelo. Esta guía te da un procedimiento reproducible de 7 pasos para diagnosticar y corregir consultas lentas en producción.',
    steps: [
      {
        title: 'Paso 1: Medir, no adivinar',
        content: 'Nunca optimices por intuición. Ejecuta la consulta con métricas: tiempo total, filas devueltas, IO. Si no tienes un número antes, no podrás saber si mejoraste después. En PostgreSQL usa EXPLAIN (ANALYZE, BUFFERS); en MySQL, EXPLAIN ANALYZE; en SQL Server, "Include Actual Execution Plan" (Ctrl+M).',
        code: '-- PostgreSQL\nEXPLAIN (ANALYZE, BUFFERS)\nSELECT c.nombre, SUM(p.total) AS gastado\nFROM clientes c\nJOIN pedidos p ON p.cliente_id = c.id\nWHERE p.fecha >= \'2026-01-01\'\nGROUP BY c.nombre\nORDER BY gastado DESC\nLIMIT 20;',
      },
      {
        title: 'Paso 2: Leer el plan de ejecución',
        content: 'El plan muestra cómo el motor ejecuta tu consulta. Busca estos enemigos: Seq Scan sobre tablas grandes (cuando esperabas un índice), Nested Loop con muchas iteraciones, Hash Join con spill a disco, y estimaciones de filas muy alejadas del número real. Una diferencia 10x entre "rows estimated" y "rows actual" suele significar estadísticas desactualizadas.',
      },
      {
        title: 'Paso 3: Verificar índices',
        content: 'Las columnas en WHERE, JOIN y ORDER BY son candidatas a índice. Regla clave: un índice en (a, b, c) sirve para WHERE a, WHERE a AND b, WHERE a AND b AND c — pero NO para WHERE b solo. Índices compuestos siguen el principio "leftmost prefix".',
        code: '-- Antes: seq scan sobre pedidos\nSELECT * FROM pedidos\nWHERE cliente_id = 42 AND fecha >= \'2026-01-01\';\n\n-- Índice correcto\nCREATE INDEX idx_pedidos_cliente_fecha\nON pedidos (cliente_id, fecha);\n\n-- Para queries por fecha sola, otro índice:\nCREATE INDEX idx_pedidos_fecha ON pedidos (fecha);',
      },
      {
        title: 'Paso 4: Evitar funciones sobre columnas indexadas',
        content: 'Envolver una columna en una función normalmente desactiva el índice. WHERE YEAR(fecha) = 2026 no usa el índice en fecha. Reescribe a WHERE fecha >= \'2026-01-01\' AND fecha < \'2027-01-01\'. Lo mismo con LOWER(email) o CAST(id AS TEXT) — a menos que crees un índice funcional.',
      },
      {
        title: 'Paso 5: Reducir antes de unir',
        content: 'Filtra y agrega lo más pronto posible. Si vas a unir una tabla grande con otra pequeña, filtra la grande primero con una subconsulta o CTE. Menos filas en el JOIN = menos trabajo. Evita SELECT *: trae solo las columnas que realmente usas.',
        code: '-- Lento: une todo y luego filtra\nSELECT c.nombre, COUNT(*)\nFROM clientes c\nJOIN pedidos p ON p.cliente_id = c.id\nWHERE p.total > 1000000\nGROUP BY c.nombre;\n\n-- Mejor: reduce primero\nSELECT c.nombre, t.n\nFROM clientes c\nJOIN (\n  SELECT cliente_id, COUNT(*) AS n\n  FROM pedidos\n  WHERE total > 1000000\n  GROUP BY cliente_id\n) t ON t.cliente_id = c.id;',
      },
      {
        title: 'Paso 6: Cuidado con N+1 y paginación profunda',
        content: 'N+1: si tu ORM ejecuta una consulta por cada registro de una lista, son mil queries en vez de una. Usa JOIN o IN (...). Paginación profunda: LIMIT 20 OFFSET 10000 obliga al motor a leer 10020 filas. En producción, usa "keyset pagination" (WHERE id > ultimo_id_visto ORDER BY id LIMIT 20).',
      },
      {
        title: 'Paso 7: Actualizar estadísticas y reconsiderar el modelo',
        content: 'Si el plan usa estimaciones incorrectas, ejecuta ANALYZE (PostgreSQL), UPDATE STATISTICS (SQL Server) o ANALYZE TABLE (MySQL). Si después de todo nada ayuda, quizá el problema no es la query — es el modelo. Considera desnormalización táctica, vistas materializadas o tablas de agregados precomputadas para reportes pesados.',
      },
    ],
  },

  'disenar-esquema': {
    title: 'Diseñar un Esquema desde Cero',
    intro: 'Diseñar un buen esquema es 80% del trabajo de un backend. Un mal modelo hace que cada query se vuelva una pesadilla. Esta guía de 6 pasos te lleva de un problema real a un esquema normalizado y listo para crecer.',
    steps: [
      {
        title: 'Paso 1: Listar las entidades del negocio',
        content: 'Habla con el cliente (o contigo mismo) y lista los sustantivos importantes: Cliente, Producto, Pedido, Categoría, Proveedor. Cada sustantivo importante probablemente se convierta en una tabla. No te preocupes aún por columnas — solo por las entidades.',
      },
      {
        title: 'Paso 2: Identificar relaciones y cardinalidad',
        content: '¿Cómo se conectan? Un cliente tiene muchos pedidos (1:N). Un pedido tiene muchos productos, y un producto está en muchos pedidos (N:M → necesita tabla intermedia "detalle_pedido"). Un producto pertenece a una categoría (N:1). Dibuja esto como diagrama ER — papel o herramientas como dbdiagram.io o Drawio sirven.',
      },
      {
        title: 'Paso 3: Definir columnas y tipos',
        content: 'Para cada tabla, lista los atributos. Sé específico con los tipos: VARCHAR(255) no es lo mismo que TEXT; NUMERIC(10,2) para dinero; TIMESTAMPTZ para fechas con zona horaria; BOOLEAN para banderas. Nunca uses FLOAT para dinero. Nunca uses VARCHAR para booleanos ("Si"/"No").',
        code: 'CREATE TABLE clientes (\n  id         BIGSERIAL    PRIMARY KEY,\n  email      VARCHAR(255) NOT NULL UNIQUE,\n  nombre     VARCHAR(100) NOT NULL,\n  telefono   VARCHAR(20),\n  activo     BOOLEAN      NOT NULL DEFAULT TRUE,\n  creado_en  TIMESTAMPTZ  NOT NULL DEFAULT NOW()\n);\n\nCREATE TABLE productos (\n  id            BIGSERIAL     PRIMARY KEY,\n  sku           VARCHAR(50)   NOT NULL UNIQUE,\n  nombre        VARCHAR(200)  NOT NULL,\n  precio        NUMERIC(10,2) NOT NULL CHECK (precio >= 0),\n  stock         INTEGER       NOT NULL DEFAULT 0,\n  categoria_id  BIGINT        NOT NULL REFERENCES categorias(id)\n);',
      },
      {
        title: 'Paso 4: Normalizar (hasta la 3FN)',
        content: '1FN: cada celda tiene un solo valor — sin listas separadas por comas. 2FN: todos los atributos dependen de la clave primaria completa. 3FN: ningún atributo depende de otro atributo no-clave. Regla práctica: si ves el mismo dato repetido en muchas filas, probablemente debe ir en su propia tabla con un FK.',
      },
      {
        title: 'Paso 5: Agregar restricciones (constraints)',
        content: 'Tu base de datos debe poder decir "no". Usa NOT NULL para campos obligatorios, UNIQUE para identificadores únicos, CHECK para reglas de dominio (precio >= 0, edad BETWEEN 0 AND 120), y FOREIGN KEY con ON DELETE adecuado (CASCADE para datos dependientes, RESTRICT para proteger). Las restricciones son la primera línea de defensa de la integridad.',
      },
      {
        title: 'Paso 6: Planear índices y evolución',
        content: 'Añade índices en: (a) claves foráneas, (b) columnas de búsqueda frecuente, (c) columnas de ORDER BY común. No sobre-indexes: cada índice ralentiza INSERTs. Finalmente, piensa cómo evolucionará el esquema: usa migraciones versionadas (Prisma Migrate, Flyway, Alembic) desde el día uno. Un esquema sin migraciones es deuda técnica que crece cada día.',
        code: '-- Índices razonables para clientes + pedidos\nCREATE INDEX idx_pedidos_cliente_id ON pedidos (cliente_id);\nCREATE INDEX idx_pedidos_fecha      ON pedidos (fecha DESC);\nCREATE INDEX idx_clientes_email     ON clientes (LOWER(email));',
      },
    ],
  },

  'joins-sin-miedo': {
    title: 'JOINs sin Miedo',
    intro: 'Los JOINs son el corazón del SQL relacional y también la fuente #1 de errores sutiles. Esta guía de 4 pasos te enseña a razonar visualmente sobre cada tipo de JOIN para que nunca más tengas que adivinar.',
    steps: [
      {
        title: 'Paso 1: Entender qué es un JOIN',
        content: 'Un JOIN combina filas de dos tablas basándose en una condición. El resultado es una nueva tabla virtual donde cada fila es una combinación. Piensa en dos conjuntos A y B: el JOIN decide qué partes de la intersección y qué partes exclusivas se conservan.',
      },
      {
        title: 'Paso 2: INNER JOIN — solo lo que coincide',
        content: 'INNER JOIN devuelve solo las filas donde existe coincidencia en ambas tablas. Si un cliente no tiene pedidos, no aparece. Es el más común y el más seguro — pero puedes perder datos sin darte cuenta si tu pregunta debería incluir también los "huérfanos".',
        code: '-- Clientes que SÍ tienen pedidos\nSELECT c.nombre, COUNT(p.id) AS pedidos\nFROM clientes c\nINNER JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.nombre;',
      },
      {
        title: 'Paso 3: LEFT / RIGHT JOIN — preservar un lado',
        content: 'LEFT JOIN devuelve TODAS las filas de la tabla izquierda, y las columnas de la derecha quedan en NULL si no hay coincidencia. Úsalo cuando preguntas algo como "todos los clientes, hayan comprado o no". RIGHT JOIN es el espejo; en la práctica casi nadie lo usa — se prefiere cambiar el orden y usar LEFT. Truco: para encontrar filas sin coincidencia, LEFT JOIN + WHERE derecha IS NULL.',
        code: '-- Todos los clientes, incluso los que nunca compraron\nSELECT c.nombre, COUNT(p.id) AS pedidos\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nGROUP BY c.nombre;\n\n-- Clientes SIN pedidos (anti-join)\nSELECT c.*\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id\nWHERE p.id IS NULL;',
      },
      {
        title: 'Paso 4: FULL OUTER y CROSS — los raros pero útiles',
        content: 'FULL OUTER JOIN conserva todo: coincidencias + huérfanos de ambos lados. Útil para reconciliar dos fuentes de datos (sistema A vs sistema B). CROSS JOIN multiplica todo contra todo (producto cartesiano) — raro, pero perfecto para generar combinaciones como "todos los productos × todos los meses" y luego completar con LEFT JOIN de ventas reales. Advertencia: un CROSS JOIN accidental sobre tablas grandes explota en millones de filas.',
        code: '-- Reporte denso: producto × mes con ventas (o 0)\nSELECT p.nombre, m.mes, COALESCE(SUM(v.total), 0) AS ventas\nFROM productos p\nCROSS JOIN (SELECT generate_series(1,12) AS mes) m\nLEFT JOIN ventas v\n  ON v.producto_id = p.id\n AND EXTRACT(MONTH FROM v.fecha) = m.mes\nGROUP BY p.nombre, m.mes;',
      },
    ],
  },

  'window-functions': {
    title: 'Window Functions: La Herramienta Secreta',
    intro: 'Las window functions son SQL en "modo experto". Permiten hacer rankings, totales móviles, comparaciones con filas vecinas y análisis temporal — todo sin subconsultas ni self-joins. Si dominas esto, saltas varios niveles en tu carrera de analista.',
    steps: [
      {
        title: 'Paso 1: ¿Qué es una window function?',
        content: 'Una window function opera sobre un conjunto de filas relacionadas con la fila actual — la "ventana". A diferencia de GROUP BY, no colapsa las filas: devuelves el mismo número de filas de entrada, pero con columnas adicionales calculadas sobre un grupo. Son parte del estándar SQL:2003 y funcionan en PostgreSQL, MySQL 8+, SQL Server, Oracle, SQLite 3.25+, BigQuery y todos los motores modernos.',
        code: '-- Sintaxis general\nfuncion() OVER (\n  [PARTITION BY columna]   -- grupos independientes\n  [ORDER BY columna]       -- orden dentro del grupo\n  [ROWS ...]               -- rango de filas (frame)\n)',
      },
      {
        title: 'Paso 2: Rankings — ROW_NUMBER, RANK, DENSE_RANK',
        content: 'Las tres numeran filas dentro de una partición, pero manejan los empates distinto. ROW_NUMBER: 1,2,3,4 siempre único. RANK: 1,2,2,4 (salta posiciones al empatar). DENSE_RANK: 1,2,2,3 (no salta). Elige según la pregunta: "¿quién es el top 3 por departamento?" típicamente usa ROW_NUMBER + WHERE rn <= 3.',
        code: '-- Top 3 estudiantes por departamento\nSELECT * FROM (\n  SELECT e.nombre, e.departamento, e.promedio,\n    ROW_NUMBER() OVER (\n      PARTITION BY e.departamento\n      ORDER BY e.promedio DESC\n    ) AS puesto\n  FROM estudiantes e\n) t\nWHERE puesto <= 3;',
      },
      {
        title: 'Paso 3: LAG y LEAD — mirar atrás y adelante',
        content: 'LAG(col) devuelve el valor de la fila anterior; LEAD(col) el de la siguiente. Perfectos para calcular crecimiento, diferencias temporales o detectar cambios de estado. LAG(valor, 1, 0) permite especificar un default cuando no hay fila previa.',
        code: '-- Crecimiento mensual de ventas vs mes anterior\nSELECT mes, total,\n  LAG(total) OVER (ORDER BY mes) AS mes_previo,\n  total - LAG(total) OVER (ORDER BY mes) AS diferencia,\n  ROUND(\n    100.0 * (total - LAG(total) OVER (ORDER BY mes))\n    / LAG(total) OVER (ORDER BY mes),\n  2) AS pct_crecimiento\nFROM ventas_mensuales\nORDER BY mes;',
      },
      {
        title: 'Paso 4: Agregaciones móviles (running totals)',
        content: 'SUM, AVG, COUNT también son window functions cuando llevan OVER. Con una cláusula ROWS puedes crear totales acumulados o promedios móviles. "ROWS UNBOUNDED PRECEDING" = desde el inicio hasta la fila actual. "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW" = últimos 7 días.',
        code: '-- Total acumulado + promedio móvil de 7 días\nSELECT fecha, ventas,\n  SUM(ventas) OVER (\n    ORDER BY fecha\n    ROWS UNBOUNDED PRECEDING\n  ) AS acumulado,\n  AVG(ventas) OVER (\n    ORDER BY fecha\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ) AS promedio_7d\nFROM ventas_diarias;',
      },
      {
        title: 'Paso 5: NTILE y percentiles',
        content: 'NTILE(n) divide las filas ordenadas en n grupos aproximadamente iguales — perfecto para cuartiles, deciles o segmentación de clientes. PERCENT_RANK y CUME_DIST dan percentiles más exactos. Úsalo para responder "¿en qué cuartil de gasto está cada cliente?" sin hacer subconsultas complicadas.',
        code: '-- Segmentar clientes en cuartiles de gasto\nSELECT nombre, total_gastado,\n  NTILE(4) OVER (ORDER BY total_gastado DESC) AS cuartil\nFROM (\n  SELECT c.nombre, SUM(p.total) AS total_gastado\n  FROM clientes c\n  JOIN pedidos p ON p.cliente_id = c.id\n  GROUP BY c.nombre\n) t;',
      },
    ],
  },

  'transacciones-commit': {
    title: 'Transacciones: COMMIT, ROLLBACK y la regla ACID',
    intro: 'Cada vez que modificas datos, estás usando una transacción — lo sepas o no. Entender COMMIT, ROLLBACK, niveles de aislamiento y la regla ACID es la diferencia entre un sistema confiable y uno que pierde dinero de clientes sin que nadie se dé cuenta. Esta guía de 6 pasos te da el modelo mental completo.',
    steps: [
      {
        title: 'Paso 1: ¿Qué es una transacción?',
        content: 'Una transacción es una unidad de trabajo: un grupo de instrucciones SQL que deben ejecutarse como un todo — o todas, o ninguna. El ejemplo clásico: una transferencia bancaria tiene dos UPDATEs (restar en una cuenta, sumar en otra). Si el servidor se cae después del primero, el dinero desapareció. La transacción garantiza que ambos se aplican, o ninguno.',
        code: 'BEGIN;\n\nUPDATE cuentas\nSET saldo = saldo - 500000\nWHERE id = 1;\n\nUPDATE cuentas\nSET saldo = saldo + 500000\nWHERE id = 2;\n\nCOMMIT;  -- Todo o nada',
      },
      {
        title: 'Paso 2: COMMIT y ROLLBACK',
        content: 'BEGIN (o START TRANSACTION) abre una transacción. COMMIT persiste todos los cambios — solo en este momento otros usuarios los ven. ROLLBACK descarta todo lo hecho desde BEGIN. Regla de oro: siempre que abras BEGIN manualmente, asegúrate de tener un COMMIT o ROLLBACK al final. Una transacción abierta bloquea recursos y puede paralizar tu sistema.',
        code: 'BEGIN;\n\nINSERT INTO pedidos (cliente_id, total)\nVALUES (42, 150000);\n\n-- Si algo sale mal:\nROLLBACK;\n\n-- Si todo está bien:\nCOMMIT;',
      },
      {
        title: 'Paso 3: ACID — las 4 garantías',
        content: 'Atomicidad: todo o nada (lo que vimos con COMMIT/ROLLBACK). Consistencia: la transacción lleva la BD de un estado válido a otro — las restricciones (CHECK, FK, UNIQUE) se respetan. Aislamiento: transacciones concurrentes no se ven a medias. Durabilidad: una vez hecho COMMIT, los datos sobreviven a un corte de luz (gracias al write-ahead log). Todo motor relacional moderno ofrece ACID; los NoSQL históricamente sacrificaban alguno por rendimiento, aunque hoy muchos (MongoDB 4+) también son ACID.',
      },
      {
        title: 'Paso 4: SAVEPOINTs — transacciones anidadas',
        content: 'Dentro de una transacción puedes crear SAVEPOINTs: puntos a los que puedes revertir sin descartar todo. Útil en scripts largos donde quieres aislar pasos riesgosos. Piénsalos como "checkpoints" de videojuego dentro de tu transacción.',
        code: 'BEGIN;\n\nINSERT INTO clientes (email, nombre)\nVALUES (\'a@x.com\', \'Ana\');\n\nSAVEPOINT antes_pedido;\n\nINSERT INTO pedidos (cliente_id, total)\nVALUES (currval(\'clientes_id_seq\'), -100); -- error!\n\nROLLBACK TO SAVEPOINT antes_pedido;\n-- El cliente se mantiene, el pedido no\n\nCOMMIT;',
      },
      {
        title: 'Paso 5: Niveles de aislamiento',
        content: 'Dos transacciones concurrentes pueden pisarse. Los niveles de aislamiento deciden cuánto se ven entre sí, y cada nivel trae problemas distintos. READ UNCOMMITTED: ves cambios no confirmados (dirty reads) — casi nunca se usa. READ COMMITTED: solo ves datos ya confirmados (default en PostgreSQL, Oracle, SQL Server). REPEATABLE READ: si lees la misma fila dos veces, ves el mismo valor (default en MySQL/InnoDB). SERIALIZABLE: las transacciones parecen ejecutarse en serie — máximo aislamiento, menor concurrencia. Cambiarlo: SET TRANSACTION ISOLATION LEVEL SERIALIZABLE.',
      },
      {
        title: 'Paso 6: Bloqueos y deadlocks',
        content: 'Para garantizar aislamiento, los motores usan locks. SELECT ... FOR UPDATE bloquea las filas leídas hasta el COMMIT, evitando que otra transacción las modifique. Cuidado con deadlocks: dos transacciones esperándose mutuamente. Reglas anti-deadlock: (1) siempre acceder a las tablas en el mismo orden, (2) mantener las transacciones cortas, (3) no abrir diálogos con el usuario dentro de una transacción abierta, (4) manejar el error de deadlock y reintentar. La transacción más corta es siempre la mejor transacción.',
        code: '-- Bloqueo explícito para evitar race conditions\nBEGIN;\n\nSELECT saldo FROM cuentas\nWHERE id = 1\nFOR UPDATE;   -- nadie más puede modificar esta fila\n\nUPDATE cuentas\nSET saldo = saldo - 500000\nWHERE id = 1;\n\nCOMMIT;',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(guidesContent).map((slug) => ({ guideSlug: slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ guideSlug: string }> }) {
  const { guideSlug } = await params;
  const guide = guidesContent[guideSlug];

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-xl text-[var(--text-heading)] mb-2">Guía en desarrollo</h1>
        <p className="text-sm text-[var(--text-muted)] mb-4">Esta guía estará disponible próximamente.</p>
        <Link href="/guias" className="text-sm text-[var(--accent-blue)] hover:underline">
          Volver a Guías
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/guias" className="text-sm text-[var(--accent-blue)] hover:underline mb-4 block">
        &larr; Volver a Guías
      </Link>

      <h1 className="text-2xl font-bold text-[var(--text-heading)] mb-3">{guide.title}</h1>
      <p className="text-sm text-[var(--text-body)] mb-8 leading-relaxed">{guide.intro}</p>

      <div className="space-y-6">
        {guide.steps.map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-blue)]/15 flex items-center justify-center text-sm font-bold text-[var(--accent-blue)] shrink-0 mt-1">
              {i + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--text-heading)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text-body)] mb-3 leading-relaxed">{step.content}</p>
              {step.code && (
                <div className="terminal-window">
                  <div className="terminal-header">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                    <span className="terminal-title">ejemplo.sql</span>
                  </div>
                  <pre className="terminal-body text-sm overflow-x-auto whitespace-pre-wrap">{step.code}</pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
