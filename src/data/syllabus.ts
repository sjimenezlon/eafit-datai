import { Module } from '@/types/lesson';

export const syllabus: Module[] = [
  // ============================================================
  // MODULO 1: Subconsultas y Logica Condicional (E-commerce)
  // ============================================================
  {
    id: 'modulo-01',
    slug: 'subconsultas-y-logica',
    title: 'Subconsultas y Logica Condicional',
    description: 'Domina subconsultas escalares, de lista, correlacionadas y CASE WHEN con datos reales de un e-commerce colombiano.',
    icon: '&#x1F50D;',
    weekRange: [7, 7],
    dataset: 'ecommerce',
    order: 1,
    lessons: [
      {
        id: 'l-1-1', slug: 'subconsultas-en-where',
        title: 'Subconsultas en WHERE',
        description: 'Filtra datos usando el resultado de otra consulta. Caso: identificar productos estrella de TiendaOnline.co.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Que es una subconsulta?', content: 'Una <strong>subconsulta</strong> (subquery) es una consulta dentro de otra. Se ejecuta primero y su resultado alimenta la consulta exterior.<br><br><strong>Tipos principales:</strong><br>- <strong>Escalar:</strong> retorna un solo valor (una fila, una columna)<br>- <strong>De lista:</strong> retorna multiples valores (una columna)<br>- <strong>De tabla:</strong> retorna una tabla completa (multiples filas y columnas)<br>- <strong>Correlacionada:</strong> referencia datos de la consulta exterior' },
          { type: 'code-example', title: 'Subconsulta escalar: un solo valor', content: 'Encuentra productos con precio superior al promedio:', code: "-- Precio promedio de todos los productos\nSELECT ROUND(AVG(precio), 0) FROM productos;\n-- Resultado: ~2,086,000 COP\n\n-- Productos por encima del promedio\nSELECT nombre, precio\nFROM productos\nWHERE precio > (SELECT AVG(precio) FROM productos)\nORDER BY precio DESC;" },
          { type: 'code-example', title: 'Subconsulta de lista: multiples valores', content: 'Clientes que han hecho pedidos mayores a 5 millones:', code: "SELECT nombre, email, tipo\nFROM clientes\nWHERE id IN (\n  SELECT DISTINCT cliente_id\n  FROM pedidos\n  WHERE total > 5000000\n)\nORDER BY nombre;" },
          { type: 'tip', title: 'IN vs EXISTS', content: '<code>IN</code> es simple y legible. <code>EXISTS</code> es mas eficiente con tablas grandes porque se detiene al encontrar la primera coincidencia. En datasets pequeños la diferencia es minima.' },
        ],
        exercises: [
          {
            id: 'e-1-1-1',
            instruction: 'Encuentra todos los productos cuyo precio sea mayor al precio promedio de su propia categoria. Muestra nombre, precio y categoria_id. (Pista: necesitas una subconsulta correlacionada)',
            initialQuery: '-- Productos por encima del promedio de su categoria\n',
            hints: [
              'Necesitas comparar el precio de cada producto con el AVG de su categoria',
              'La subconsulta debe filtrar WHERE p2.categoria_id = p.categoria_id',
              'SELECT p.nombre, p.precio, p.categoria_id FROM productos p WHERE p.precio > (SELECT AVG(p2.precio) FROM productos p2 WHERE p2.categoria_id = p.categoria_id) ORDER BY p.categoria_id, p.precio DESC;',
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'AVG'],
            solutionQuery: 'SELECT p.nombre, p.precio, p.categoria_id FROM productos p WHERE p.precio > (SELECT AVG(p2.precio) FROM productos p2 WHERE p2.categoria_id = p.categoria_id) ORDER BY p.categoria_id, p.precio DESC;',
          },
          {
            id: 'e-1-1-2',
            instruction: 'Encuentra los clientes que NUNCA han hecho un pedido. Muestra nombre, email y fecha_registro. Usa NOT IN o NOT EXISTS.',
            initialQuery: '',
            hints: [
              'Necesitas encontrar clientes cuyo id NO esta en la tabla pedidos',
              'WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos)',
              'SELECT nombre, email, fecha_registro FROM clientes WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos) ORDER BY fecha_registro;',
            ],
            requiredKeywords: ['SELECT', 'NOT'],
            solutionQuery: 'SELECT nombre, email, fecha_registro FROM clientes WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos) ORDER BY fecha_registro;',
          },
        ],
      },
      {
        id: 'l-1-2', slug: 'subconsultas-en-from',
        title: 'Subconsultas en FROM (Tablas Derivadas)',
        description: 'Usa subconsultas como tablas temporales. Caso: analisis de ventas por categoria.',
        difficulty: 'intermedio', estimatedMinutes: 25,
        content: [
          { type: 'theory', title: 'Tablas derivadas', content: 'Puedes usar una subconsulta en el <code>FROM</code> como si fuera una tabla. Esto es util para:<br>- Calcular valores intermedios y luego filtrar sobre ellos<br>- Crear resumenes que alimentan otra consulta<br>- Evitar repetir expresiones complejas<br><br><strong>Importante:</strong> La subconsulta en FROM DEBE tener un alias.' },
          { type: 'code-example', title: 'Analisis de ventas por categoria', content: '', code: "-- Ventas totales por categoria\nSELECT\n  c.nombre AS categoria,\n  resumen.total_vendido,\n  resumen.num_productos_vendidos\nFROM (\n  SELECT\n    p.categoria_id,\n    SUM(dp.subtotal) AS total_vendido,\n    COUNT(DISTINCT dp.producto_id) AS num_productos_vendidos\n  FROM detalle_pedidos dp\n  JOIN productos p ON dp.producto_id = p.id\n  GROUP BY p.categoria_id\n) resumen\nJOIN categorias c ON resumen.categoria_id = c.id\nORDER BY resumen.total_vendido DESC;" },
        ],
        exercises: [
          {
            id: 'e-1-2-1',
            instruction: 'Calcula el ticket promedio (total promedio por pedido) de cada ciudad. Muestra ciudad_envio y ticket_promedio redondeado. Solo incluye ciudades con mas de 2 pedidos.',
            initialQuery: '',
            hints: [
              'Primero calcula el total por pedido por ciudad, luego promedia',
              'Puedes hacerlo con GROUP BY directo: GROUP BY ciudad_envio HAVING COUNT(*) > 2',
              "SELECT ciudad_envio, ROUND(AVG(total), 0) AS ticket_promedio, COUNT(*) AS num_pedidos FROM pedidos WHERE estado != 'Cancelado' GROUP BY ciudad_envio HAVING COUNT(*) > 2 ORDER BY ticket_promedio DESC;",
            ],
            requiredKeywords: ['AVG', 'GROUP BY', 'HAVING'],
            solutionQuery: "SELECT ciudad_envio, ROUND(AVG(total), 0) AS ticket_promedio, COUNT(*) AS num_pedidos FROM pedidos WHERE estado != 'Cancelado' GROUP BY ciudad_envio HAVING COUNT(*) > 2 ORDER BY ticket_promedio DESC;",
          },
        ],
      },
      {
        id: 'l-1-3', slug: 'case-when',
        title: 'CASE WHEN: Logica Condicional en SQL',
        description: 'Crea columnas calculadas con logica if/else. Caso: segmentacion de clientes y margen de productos.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'CASE WHEN', content: '<code>CASE WHEN</code> funciona como un if/else dentro de SQL. Puedes usarlo en SELECT, WHERE, ORDER BY y GROUP BY.<br><br><strong>Sintaxis:</strong><pre>CASE\n  WHEN condicion1 THEN resultado1\n  WHEN condicion2 THEN resultado2\n  ELSE resultado_default\nEND</pre>' },
          { type: 'code-example', title: 'Segmentar clientes por gasto', content: '', code: "SELECT\n  nombre,\n  total_compras,\n  CASE\n    WHEN total_compras >= 15000000 THEN 'Whale (>15M)'\n    WHEN total_compras >= 5000000 THEN 'Alto Valor (5-15M)'\n    WHEN total_compras >= 1000000 THEN 'Medio (1-5M)'\n    ELSE 'Bajo (<1M)'\n  END AS segmento\nFROM clientes\nORDER BY total_compras DESC;" },
          { type: 'code-example', title: 'Calcular margen por producto', content: '', code: "SELECT\n  nombre,\n  precio,\n  costo,\n  ROUND((precio - costo) * 100.0 / precio, 1) AS margen_pct,\n  CASE\n    WHEN (precio - costo) * 100.0 / precio >= 40 THEN 'Excelente'\n    WHEN (precio - costo) * 100.0 / precio >= 25 THEN 'Bueno'\n    WHEN (precio - costo) * 100.0 / precio >= 15 THEN 'Normal'\n    ELSE 'Bajo'\n  END AS calidad_margen\nFROM productos\nWHERE activo = 1\nORDER BY margen_pct DESC;" },
          { type: 'tip', title: 'Pensar como cientifico de datos', content: 'CASE WHEN es la herramienta fundamental para <strong>segmentacion</strong>. Los cientificos de datos segmentan clientes, productos, transacciones para encontrar patrones. Siempre preguntate: que categorias tienen sentido para el negocio?' },
        ],
        exercises: [
          {
            id: 'e-1-3-1',
            instruction: 'Clasifica cada pedido segun su total: "Micro" (<500K), "Pequeno" (500K-2M), "Mediano" (2M-5M), "Grande" (5M-10M), "Mega" (>10M). Muestra id del pedido, total, y la clasificacion. Excluye cancelados.',
            initialQuery: '',
            hints: [
              'Usa CASE WHEN con rangos sobre la columna total',
              "Filtra con WHERE estado != 'Cancelado'",
              "SELECT id, total, CASE WHEN total > 10000000 THEN 'Mega' WHEN total > 5000000 THEN 'Grande' WHEN total > 2000000 THEN 'Mediano' WHEN total > 500000 THEN 'Pequeno' ELSE 'Micro' END AS clasificacion FROM pedidos WHERE estado != 'Cancelado' ORDER BY total DESC;",
            ],
            requiredKeywords: ['CASE', 'WHEN', 'THEN'],
            solutionQuery: "SELECT id, total, CASE WHEN total > 10000000 THEN 'Mega' WHEN total > 5000000 THEN 'Grande' WHEN total > 2000000 THEN 'Mediano' WHEN total > 500000 THEN 'Pequeno' ELSE 'Micro' END AS clasificacion FROM pedidos WHERE estado != 'Cancelado' ORDER BY total DESC;",
          },
          {
            id: 'e-1-3-2',
            instruction: 'Cuenta cuantos productos hay en cada rango de precio: "Economico" (<500K), "Gama Media" (500K-2M), "Premium" (2M-5M), "Lujo" (>5M). Muestra el rango y el conteo.',
            initialQuery: '',
            hints: [
              'Usa CASE WHEN dentro de GROUP BY o como columna y luego agrupa',
              'GROUP BY la expresion CASE WHEN completa',
              "SELECT CASE WHEN precio > 5000000 THEN 'Lujo' WHEN precio > 2000000 THEN 'Premium' WHEN precio > 500000 THEN 'Gama Media' ELSE 'Economico' END AS rango, COUNT(*) AS total FROM productos GROUP BY rango ORDER BY MIN(precio) DESC;",
            ],
            requiredKeywords: ['CASE', 'COUNT', 'GROUP BY'],
            solutionQuery: "SELECT CASE WHEN precio > 5000000 THEN 'Lujo' WHEN precio > 2000000 THEN 'Premium' WHEN precio > 500000 THEN 'Gama Media' ELSE 'Economico' END AS rango, COUNT(*) AS total FROM productos GROUP BY rango ORDER BY MIN(precio) DESC;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 2: Manipulacion de Datos (DML) con E-commerce
  // ============================================================
  {
    id: 'modulo-02',
    slug: 'manipulacion-datos',
    title: 'INSERT, UPDATE, DELETE y Vistas',
    description: 'Modifica datos, crea vistas y administra un e-commerce real. Caso: gestion de inventario y pedidos.',
    icon: '&#x270F;',
    weekRange: [8, 8],
    dataset: 'ecommerce',
    order: 2,
    lessons: [
      {
        id: 'l-2-1', slug: 'insert-update-delete',
        title: 'INSERT, UPDATE y DELETE',
        description: 'Agrega, modifica y elimina datos. Caso: gestionar inventario y estados de pedidos.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Manipulacion de datos (DML)', content: '<strong>INSERT INTO</strong> agrega nuevas filas:<br><code>INSERT INTO tabla (col1, col2) VALUES (val1, val2);</code><br><br><strong>UPDATE</strong> modifica filas existentes:<br><code>UPDATE tabla SET col1 = val1 WHERE condicion;</code><br><br><strong>DELETE</strong> elimina filas:<br><code>DELETE FROM tabla WHERE condicion;</code><br><br><strong>ATENCION:</strong> UPDATE y DELETE sin WHERE afectan TODAS las filas. Siempre verifica tu WHERE antes de ejecutar.' },
          { type: 'warning', title: 'Regla de oro', content: 'Siempre escribe el WHERE primero. Antes de ejecutar un UPDATE o DELETE, haz un SELECT con el mismo WHERE para verificar que filas vas a afectar. En produccion, usa transacciones (BEGIN/COMMIT).' },
          { type: 'code-example', title: 'Ejemplos practicos', content: '', code: "-- Agregar un nuevo producto\nINSERT INTO productos (id, nombre, categoria_id, proveedor_id, precio, costo, stock, sku, activo, fecha_creacion)\nVALUES (31, 'Tablet Samsung Galaxy Tab S9', 2, 2, 2899000, 2199000, 15, 'SM-TABS9', 1, '2025-01-25');\n\n-- Actualizar stock despues de una venta\nUPDATE productos SET stock = stock - 1 WHERE id = 1;\n\n-- Desactivar productos sin stock\nUPDATE productos SET activo = 0 WHERE stock = 0;\n\n-- Cancelar pedidos pendientes antiguos\nUPDATE pedidos SET estado = 'Cancelado'\nWHERE estado = 'Pendiente' AND fecha < '2024-12-01';" },
        ],
        exercises: [
          {
            id: 'e-2-1-1',
            instruction: 'Inserta un nuevo cliente: id=26, nombre="Tu Nombre", email="tu@email.com", ciudad="Medellin", departamento="Antioquia", tipo="Regular", fecha_registro="2025-02-01". Luego consulta SELECT * FROM clientes WHERE id = 26;',
            initialQuery: "-- Inserta tu cliente y luego verificalo\n",
            hints: [
              'Usa INSERT INTO clientes (id, nombre, email, ciudad, departamento, tipo, fecha_registro) VALUES (...)',
              'Recuerda las comillas simples para textos',
              "INSERT INTO clientes (id, nombre, email, ciudad, departamento, tipo, fecha_registro) VALUES (26, 'Tu Nombre', 'tu@email.com', 'Medellin', 'Antioquia', 'Regular', '2025-02-01'); SELECT * FROM clientes WHERE id = 26;",
            ],
            requiredKeywords: ['INSERT', 'INTO', 'VALUES'],
            solutionQuery: "INSERT INTO clientes (id, nombre, email, ciudad, departamento, tipo, fecha_registro) VALUES (26, 'Estudiante EAFIT', 'estudiante@eafit.edu.co', 'Medellin', 'Antioquia', 'Regular', '2025-02-01'); SELECT * FROM clientes WHERE id = 26;",
          },
          {
            id: 'e-2-1-2',
            instruction: 'Actualiza todos los productos de la categoria 8 (Accesorios) subiendo el precio un 10%. Luego muestra los productos de esa categoria con su nuevo precio.',
            initialQuery: '',
            hints: [
              'UPDATE productos SET precio = precio * 1.10 WHERE categoria_id = 8',
              'Despues haz SELECT para verificar',
              "UPDATE productos SET precio = ROUND(precio * 1.10, 0) WHERE categoria_id = 8; SELECT nombre, precio FROM productos WHERE categoria_id = 8;",
            ],
            requiredKeywords: ['UPDATE', 'SET', 'WHERE'],
            solutionQuery: "UPDATE productos SET precio = ROUND(precio * 1.10, 0) WHERE categoria_id = 8; SELECT nombre, precio FROM productos WHERE categoria_id = 8;",
          },
        ],
      },
      {
        id: 'l-2-2', slug: 'vistas',
        title: 'CREATE VIEW: Consultas Reutilizables',
        description: 'Crea vistas para simplificar consultas complejas. Caso: dashboard de ventas.',
        difficulty: 'intermedio', estimatedMinutes: 25,
        content: [
          { type: 'theory', title: 'Que es una Vista?', content: 'Una <strong>vista (VIEW)</strong> es una consulta guardada con nombre. No almacena datos; cada vez que la consultas, ejecuta la consulta subyacente.<br><br><strong>Usos:</strong><br>- Simplificar consultas complejas que se repiten<br>- Ocultar complejidad (JOINs, calculos)<br>- Seguridad: dar acceso a datos filtrados<br>- Crear "tablas virtuales" para reportes' },
          { type: 'code-example', title: 'Vista de resumen de ventas', content: '', code: "-- Crear vista de ventas por producto\nCREATE VIEW vista_ventas_producto AS\nSELECT\n  p.nombre AS producto,\n  c.nombre AS categoria,\n  COUNT(dp.id) AS veces_vendido,\n  SUM(dp.cantidad) AS unidades_vendidas,\n  SUM(dp.subtotal) AS ingresos_totales,\n  ROUND(AVG(dp.precio_unitario), 0) AS precio_promedio_venta\nFROM detalle_pedidos dp\nJOIN productos p ON dp.producto_id = p.id\nJOIN categorias c ON p.categoria_id = c.id\nGROUP BY p.id, p.nombre, c.nombre;\n\n-- Ahora usarla es simple:\nSELECT * FROM vista_ventas_producto\nORDER BY ingresos_totales DESC\nLIMIT 10;" },
        ],
        exercises: [
          {
            id: 'e-2-2-1',
            instruction: 'Crea una vista llamada vista_clientes_vip que muestre nombre, email, ciudad, tipo y total_compras de clientes con total_compras > 5000000. Luego consultala con SELECT * FROM vista_clientes_vip.',
            initialQuery: '',
            hints: [
              'CREATE VIEW vista_clientes_vip AS SELECT ...',
              'Filtra con WHERE total_compras > 5000000',
              "CREATE VIEW vista_clientes_vip AS SELECT nombre, email, ciudad, tipo, total_compras FROM clientes WHERE total_compras > 5000000; SELECT * FROM vista_clientes_vip ORDER BY total_compras DESC;",
            ],
            requiredKeywords: ['CREATE', 'VIEW', 'SELECT'],
            solutionQuery: "CREATE VIEW vista_clientes_vip AS SELECT nombre, email, ciudad, tipo, total_compras FROM clientes WHERE total_compras > 5000000; SELECT * FROM vista_clientes_vip ORDER BY total_compras DESC;",
          },
        ],
      },
      {
        id: 'l-2-3', slug: 'operaciones-conjuntos',
        title: 'UNION, INTERSECT, EXCEPT',
        description: 'Combina resultados de multiples consultas. Caso: analisis cruzado de clientes y productos.',
        difficulty: 'intermedio', estimatedMinutes: 20,
        content: [
          { type: 'theory', title: 'Operaciones de conjuntos', content: '<code>UNION</code> combina resultados de dos SELECTs eliminando duplicados.<br><code>UNION ALL</code> combina SIN eliminar duplicados (mas rapido).<br><code>INTERSECT</code> retorna filas presentes en AMBAS consultas.<br><code>EXCEPT</code> retorna filas de la primera que NO estan en la segunda.<br><br><strong>Regla:</strong> Ambas consultas deben tener el mismo numero de columnas y tipos compatibles.' },
          { type: 'code-example', title: 'Ejemplo: Clientes de Medellin vs Bogota', content: '', code: "-- Ciudades donde hay clientes Premium O VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nUNION\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';\n\n-- Ciudades donde hay TANTO Premium COMO VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nINTERSECT\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';\n\n-- Ciudades con Premium pero SIN VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nEXCEPT\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';" },
        ],
        exercises: [
          {
            id: 'e-2-3-1',
            instruction: 'Encuentra los productos que han sido comprados (estan en detalle_pedidos) pero que NO tienen resena. Muestra solo el nombre del producto. Usa EXCEPT.',
            initialQuery: '',
            hints: [
              'Primer SELECT: productos comprados (via detalle_pedidos JOIN productos)',
              'Segundo SELECT: productos con resena (via resenas JOIN productos)',
              'SELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id EXCEPT SELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;',
            ],
            requiredKeywords: ['EXCEPT', 'SELECT'],
            solutionQuery: 'SELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id EXCEPT SELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;',
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 3: Window Functions (Finanzas)
  // ============================================================
  {
    id: 'modulo-03',
    slug: 'window-functions',
    title: 'Window Functions',
    description: 'La herramienta mas poderosa de SQL analitico. Rankings, acumulados y comparaciones con datos bancarios reales.',
    icon: '&#x26A1;',
    weekRange: [9, 9],
    dataset: 'finanzas',
    order: 3,
    lessons: [
      {
        id: 'l-3-1', slug: 'intro-window-functions',
        title: 'Introduccion a Window Functions',
        description: 'OVER, PARTITION BY y el concepto de "ventana". Caso: ranking de clientes bancarios.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Que son las Window Functions?', content: 'Las <strong>Window Functions</strong> calculan valores sobre un conjunto de filas <em>sin colapsar los grupos</em>. A diferencia de GROUP BY (que reduce filas), las window functions mantienen todas las filas y agregan una columna calculada.<br><br><strong>Sintaxis:</strong><br><code>funcion() OVER (PARTITION BY col ORDER BY col)</code><br><br><strong>Componentes:</strong><br>- <code>OVER()</code>: define que es una window function<br>- <code>PARTITION BY</code>: divide los datos en grupos (como GROUP BY pero sin colapsar)<br>- <code>ORDER BY</code>: ordena dentro de cada particion' },
          { type: 'code-example', title: 'ROW_NUMBER: Numerar filas', content: 'Asigna un numero secuencial a cada fila dentro de su particion:', code: "SELECT\n  nombre,\n  ciudad,\n  saldo,\n  ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY saldo DESC) AS ranking_ciudad\nFROM cuentas c\nJOIN clientes_banco cl ON c.cliente_id = cl.id\nWHERE c.tipo = 'Ahorros'\nORDER BY ciudad, ranking_ciudad;" },
          { type: 'code-example', title: 'RANK vs DENSE_RANK', content: '<code>RANK</code> deja huecos en empates (1,2,2,4). <code>DENSE_RANK</code> no (1,2,2,3).', code: "SELECT\n  nombre,\n  ingresos_mensuales,\n  RANK() OVER (ORDER BY ingresos_mensuales DESC) AS rank_con_huecos,\n  DENSE_RANK() OVER (ORDER BY ingresos_mensuales DESC) AS rank_sin_huecos\nFROM clientes_banco\nWHERE estado = 'Activo'\nLIMIT 15;" },
          { type: 'tip', title: 'Pensar como cientifico de datos', content: 'Window Functions son <strong>esenciales</strong> en ciencia de datos. Te permiten calcular rankings, percentiles, medias moviles, tasas de cambio y comparaciones periodo a periodo. Si dominas OVER/PARTITION BY, puedes responder el 80% de las preguntas analiticas de un negocio.' },
        ],
        exercises: [
          {
            id: 'e-3-1-1',
            instruction: 'Para cada transaccion, muestra el monto y calcula el monto acumulado (running total) por cuenta_origen_id, ordenado por fecha. Muestra cuenta_origen_id, fecha, monto y monto_acumulado. Limita a 30 filas.',
            initialQuery: '',
            hints: [
              'SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha)',
              'La clausula ORDER BY dentro de OVER crea un acumulado',
              "SELECT cuenta_origen_id, fecha, monto, SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_acumulado FROM transacciones WHERE estado = 'Completada' ORDER BY cuenta_origen_id, fecha LIMIT 30;",
            ],
            requiredKeywords: ['OVER', 'PARTITION BY', 'SUM'],
            solutionQuery: "SELECT cuenta_origen_id, fecha, monto, SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_acumulado FROM transacciones WHERE estado = 'Completada' ORDER BY cuenta_origen_id, fecha LIMIT 30;",
          },
        ],
      },
      {
        id: 'l-3-2', slug: 'lag-lead-analiticas',
        title: 'LAG, LEAD y Funciones Analiticas',
        description: 'Compara filas con sus vecinas. Caso: detectar patrones de transacciones y cambios periodo a periodo.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'LAG y LEAD', content: '<code>LAG(columna, n)</code> accede al valor de <strong>n filas ANTES</strong> en la particion.<br><code>LEAD(columna, n)</code> accede al valor de <strong>n filas DESPUES</strong>.<br><br>Son perfectas para:<br>- Comparar transacciones consecutivas<br>- Calcular diferencias entre periodos<br>- Detectar anomalias (saltos bruscos)' },
          { type: 'code-example', title: 'Detectar cambios en transacciones', content: '', code: "SELECT\n  fecha,\n  tipo,\n  monto,\n  LAG(monto) OVER (ORDER BY fecha) AS monto_anterior,\n  monto - LAG(monto) OVER (ORDER BY fecha) AS diferencia\nFROM transacciones\nWHERE cuenta_origen_id = 1\n  AND estado = 'Completada'\nORDER BY fecha\nLIMIT 15;" },
          { type: 'code-example', title: 'NTILE: Dividir en grupos iguales', content: '<code>NTILE(n)</code> divide las filas en n grupos de tamano igual. Ideal para percentiles y cuartiles.', code: "SELECT\n  nombre,\n  score_credito,\n  NTILE(4) OVER (ORDER BY score_credito DESC) AS cuartil\nFROM clientes_banco\nWHERE estado = 'Activo'\nORDER BY score_credito DESC;" },
        ],
        exercises: [
          {
            id: 'e-3-2-1',
            instruction: 'Divide a los clientes activos del banco en 3 segmentos (terciles) segun su score_credito. Muestra nombre, score_credito, y el segmento (1=mejor, 3=peor). Usa NTILE(3).',
            initialQuery: '',
            hints: [
              'NTILE(3) OVER (ORDER BY score_credito DESC)',
              'Filtra WHERE estado = "Activo"',
              "SELECT nombre, score_credito, NTILE(3) OVER (ORDER BY score_credito DESC) AS segmento FROM clientes_banco WHERE estado = 'Activo' ORDER BY score_credito DESC;",
            ],
            requiredKeywords: ['NTILE', 'OVER', 'ORDER BY'],
            solutionQuery: "SELECT nombre, score_credito, NTILE(3) OVER (ORDER BY score_credito DESC) AS segmento FROM clientes_banco WHERE estado = 'Activo' ORDER BY score_credito DESC;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 4: CTEs y SQL Analitico Avanzado (Finanzas + Streaming)
  // ============================================================
  {
    id: 'modulo-04',
    slug: 'ctes-sql-analitico',
    title: 'CTEs y SQL Analitico Avanzado',
    description: 'Common Table Expressions, consultas recursivas y analisis avanzado con datos de streaming y finanzas.',
    icon: '&#x1F9E0;',
    weekRange: [10, 10],
    dataset: 'finanzas',
    order: 4,
    lessons: [
      {
        id: 'l-4-1', slug: 'common-table-expressions',
        title: 'CTEs (WITH): Consultas Legibles y Poderosas',
        description: 'Escribe consultas complejas de forma legible. Caso: analisis de riesgo crediticio.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Que es un CTE?', content: 'Un <strong>CTE (Common Table Expression)</strong> es una subconsulta con nombre que defines al inicio de tu query con <code>WITH</code>. Es como crear una tabla temporal para esa consulta.<br><br><strong>Sintaxis:</strong><pre>WITH nombre_cte AS (\n  SELECT ...\n)\nSELECT * FROM nombre_cte;</pre><br><strong>Ventajas sobre subconsultas:</strong><br>- Mucho mas legible<br>- Reutilizable (puedes referenciarlo multiples veces)<br>- Puedes encadenar multiples CTEs' },
          { type: 'code-example', title: 'CTE encadenado: Analisis de riesgo', content: '', code: "-- Paso 1: Clasificar clientes por riesgo\n-- Paso 2: Sumar su exposicion crediticia\nWITH clientes_riesgo AS (\n  SELECT\n    cl.id,\n    cl.nombre,\n    cl.score_credito,\n    CASE\n      WHEN cl.score_credito >= 750 THEN 'Bajo'\n      WHEN cl.score_credito >= 500 THEN 'Medio'\n      ELSE 'Alto'\n    END AS nivel_riesgo\n  FROM clientes_banco cl\n  WHERE cl.estado = 'Activo'\n),\nexposicion AS (\n  SELECT\n    cliente_id,\n    SUM(saldo_pendiente) AS deuda_total,\n    COUNT(*) AS num_prestamos\n  FROM prestamos\n  WHERE estado IN ('Activo', 'Mora')\n  GROUP BY cliente_id\n)\nSELECT\n  cr.nombre,\n  cr.score_credito,\n  cr.nivel_riesgo,\n  COALESCE(e.deuda_total, 0) AS deuda_total,\n  COALESCE(e.num_prestamos, 0) AS num_prestamos\nFROM clientes_riesgo cr\nLEFT JOIN exposicion e ON cr.id = e.cliente_id\nORDER BY cr.score_credito ASC\nLIMIT 15;" },
          { type: 'tip', title: 'CTEs vs Subconsultas', content: 'Usa CTEs cuando la consulta tiene mas de 2 niveles de complejidad. La regla es: si tienes que pensar mas de 10 segundos para entender una subconsulta, conviertela en CTE.' },
        ],
        exercises: [
          {
            id: 'e-4-1-1',
            instruction: 'Usando CTEs, calcula para cada tipo de prestamo (Personal, Vivienda, etc.): el monto total aprobado, el saldo pendiente total, y el porcentaje de recuperacion (monto_desembolsado - saldo_pendiente) / monto_desembolsado * 100. Ordena por porcentaje de recuperacion.',
            initialQuery: "WITH resumen_prestamos AS (\n  -- Tu CTE aqui\n)\nSELECT * FROM resumen_prestamos;",
            hints: [
              'GROUP BY tipo dentro del CTE',
              'SUM(monto_aprobado), SUM(saldo_pendiente), y calcula el % de recuperacion',
              "WITH resumen_prestamos AS (SELECT tipo, SUM(monto_aprobado) AS total_aprobado, SUM(saldo_pendiente) AS total_pendiente, ROUND((SUM(monto_desembolsado) - SUM(saldo_pendiente)) * 100.0 / SUM(monto_desembolsado), 1) AS pct_recuperacion FROM prestamos GROUP BY tipo) SELECT * FROM resumen_prestamos ORDER BY pct_recuperacion DESC;",
            ],
            requiredKeywords: ['WITH', 'AS', 'SELECT'],
            solutionQuery: "WITH resumen_prestamos AS (SELECT tipo, SUM(monto_aprobado) AS total_aprobado, SUM(saldo_pendiente) AS total_pendiente, ROUND((SUM(monto_desembolsado) - SUM(saldo_pendiente)) * 100.0 / SUM(monto_desembolsado), 1) AS pct_recuperacion FROM prestamos GROUP BY tipo) SELECT * FROM resumen_prestamos ORDER BY pct_recuperacion DESC;",
          },
        ],
      },
      {
        id: 'l-4-2', slug: 'analisis-cohortes',
        title: 'Analisis de Cohortes y Patrones',
        description: 'Tecnicas de cientifico de datos aplicadas con SQL. Caso: analisis de comportamiento de clientes bancarios.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Pensar como cientifico de datos', content: 'Un <strong>analisis de cohortes</strong> agrupa usuarios por una caracteristica comun (ej: mes de registro) y compara su comportamiento a lo largo del tiempo.<br><br><strong>Preguntas tipicas:</strong><br>- Los clientes que abrieron cuenta en enero gastan mas que los de junio?<br>- Cual es el patron de transacciones por tipo de cuenta?<br>- Que canal genera mas actividad?' },
          { type: 'code-example', title: 'Analisis por canal de transaccion', content: '', code: "-- Volumen y monto por canal\nSELECT\n  canal,\n  COUNT(*) AS num_transacciones,\n  ROUND(AVG(monto), 0) AS monto_promedio,\n  SUM(monto) AS monto_total,\n  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones), 1) AS pct_del_total\nFROM transacciones\nWHERE estado = 'Completada'\nGROUP BY canal\nORDER BY num_transacciones DESC;" },
          { type: 'code-example', title: 'Top clientes con multiples metricas', content: '', code: "WITH metricas_cliente AS (\n  SELECT\n    cl.nombre,\n    cl.ciudad,\n    COUNT(t.id) AS num_transacciones,\n    SUM(t.monto) AS volumen_total,\n    ROUND(AVG(t.monto), 0) AS ticket_promedio,\n    MAX(t.fecha) AS ultima_actividad\n  FROM clientes_banco cl\n  JOIN cuentas cu ON cl.id = cu.cliente_id\n  JOIN transacciones t ON cu.id = t.cuenta_origen_id\n  WHERE t.estado = 'Completada'\n  GROUP BY cl.id, cl.nombre, cl.ciudad\n)\nSELECT\n  *,\n  RANK() OVER (ORDER BY volumen_total DESC) AS ranking\nFROM metricas_cliente\nORDER BY ranking\nLIMIT 10;" },
        ],
        exercises: [
          {
            id: 'e-4-2-1',
            instruction: 'Analiza las transacciones por tipo (Deposito, Retiro, Transferencia, etc.): muestra el tipo, cantidad de transacciones, monto total, monto promedio, y el porcentaje que representa cada tipo del total de transacciones completadas.',
            initialQuery: '',
            hints: [
              'GROUP BY tipo, y usa una subconsulta para el total general',
              'COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = "Completada")',
              "SELECT tipo, COUNT(*) AS cantidad, SUM(monto) AS monto_total, ROUND(AVG(monto), 0) AS monto_promedio, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = 'Completada'), 1) AS pct_del_total FROM transacciones WHERE estado = 'Completada' GROUP BY tipo ORDER BY cantidad DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'COUNT', 'SUM', 'AVG'],
            solutionQuery: "SELECT tipo, COUNT(*) AS cantidad, SUM(monto) AS monto_total, ROUND(AVG(monto), 0) AS monto_promedio, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = 'Completada'), 1) AS pct_del_total FROM transacciones WHERE estado = 'Completada' GROUP BY tipo ORDER BY cantidad DESC;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULOS FUTUROS (estructura lista)
  // ============================================================
  // ============================================================
  // MODULO 5: Diseno de BD y Normalizacion (E-commerce)
  // ============================================================
  {
    id: 'modulo-05',
    slug: 'diseno-normalizacion',
    title: 'Diseno de BD y Normalizacion',
    description: 'Modelo ER, formas normales (1FN-3FN-BCNF), CREATE TABLE avanzado con restricciones. Caso: disenar el esquema de TiendaOnline.co.',
    icon: '&#x1F4D0;',
    weekRange: [11, 11],
    dataset: 'ecommerce',
    order: 5,
    lessons: [
      {
        id: 'l-5-1', slug: 'modelo-entidad-relacion',
        title: 'Modelo Entidad-Relacion',
        description: 'Entidades, atributos, relaciones y cardinalidad. Caso: disenar el esquema de TiendaOnline.co desde cero.',
        difficulty: 'intermedio', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Que es el Modelo Entidad-Relacion?', content: 'El <strong>Modelo Entidad-Relacion (ER)</strong> es una herramienta visual para disenar bases de datos antes de escribir SQL.<br><br><strong>Componentes:</strong><br>- <strong>Entidad:</strong> Un objeto del mundo real (Cliente, Producto, Pedido)<br>- <strong>Atributo:</strong> Propiedad de una entidad (nombre, precio, fecha)<br>- <strong>Relacion:</strong> Conexion entre entidades (un Cliente HACE Pedidos)<br>- <strong>Cardinalidad:</strong> Cuantas instancias se relacionan (1:1, 1:N, N:M)' },
          { type: 'code-example', title: 'De ER a tablas SQL', content: 'Cada entidad se convierte en tabla, cada atributo en columna, y cada relacion en una clave foranea:', code: "-- Entidad: Cliente\nCREATE TABLE clientes (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  ciudad TEXT,\n  fecha_registro TEXT DEFAULT (date('now'))\n);\n\n-- Entidad: Producto\nCREATE TABLE productos (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  precio REAL NOT NULL CHECK (precio > 0),\n  categoria_id INTEGER,\n  FOREIGN KEY (categoria_id) REFERENCES categorias(id)\n);\n\n-- Relacion N:M -> Tabla intermedia\nCREATE TABLE detalle_pedidos (\n  id INTEGER PRIMARY KEY,\n  pedido_id INTEGER NOT NULL,\n  producto_id INTEGER NOT NULL,\n  cantidad INTEGER NOT NULL CHECK (cantidad > 0),\n  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),\n  FOREIGN KEY (producto_id) REFERENCES productos(id)\n);" },
          { type: 'tip', title: 'Cardinalidad en la practica', content: '<strong>1:1</strong> — Un empleado tiene un pasaporte.<br><strong>1:N</strong> — Un cliente hace muchos pedidos (FK en pedidos).<br><strong>N:M</strong> — Un pedido tiene muchos productos, un producto esta en muchos pedidos (tabla intermedia).<br><br>La mayoria de relaciones en un e-commerce son 1:N o N:M.' },
        ],
        exercises: [
          {
            id: 'e-5-1-1',
            instruction: 'Consulta las tablas del e-commerce para entender el esquema. Muestra las categorias con la cantidad de productos en cada una y ordena por cantidad descendente. Esto te ayuda a entender la relacion 1:N entre categorias y productos.',
            initialQuery: '-- Explora la relacion categorias -> productos\n',
            hints: [
              'Necesitas JOIN entre categorias y productos, luego GROUP BY',
              'SELECT c.nombre, COUNT(p.id) ... GROUP BY c.id',
              "SELECT c.nombre AS categoria, COUNT(p.id) AS num_productos FROM categorias c LEFT JOIN productos p ON c.id = p.categoria_id GROUP BY c.id, c.nombre ORDER BY num_productos DESC;",
            ],
            requiredKeywords: ['JOIN', 'GROUP BY', 'COUNT'],
            solutionQuery: "SELECT c.nombre AS categoria, COUNT(p.id) AS num_productos FROM categorias c LEFT JOIN productos p ON c.id = p.categoria_id GROUP BY c.id, c.nombre ORDER BY num_productos DESC;",
          },
          {
            id: 'e-5-1-2',
            instruction: 'Identifica la relacion N:M del esquema: muestra los 10 pedidos con mas productos distintos. Incluye id del pedido, nombre del cliente, fecha, y cantidad de productos distintos.',
            initialQuery: '',
            hints: [
              'Necesitas JOIN entre pedidos, detalle_pedidos y clientes',
              'COUNT(DISTINCT dp.producto_id) y GROUP BY pedido',
              "SELECT p.id AS pedido_id, c.nombre AS cliente, p.fecha, COUNT(DISTINCT dp.producto_id) AS productos_distintos FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id GROUP BY p.id, c.nombre, p.fecha ORDER BY productos_distintos DESC LIMIT 10;",
            ],
            requiredKeywords: ['JOIN', 'COUNT', 'GROUP BY'],
            solutionQuery: "SELECT p.id AS pedido_id, c.nombre AS cliente, p.fecha, COUNT(DISTINCT dp.producto_id) AS productos_distintos FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id GROUP BY p.id, c.nombre, p.fecha ORDER BY productos_distintos DESC LIMIT 10;",
          },
        ],
      },
      {
        id: 'l-5-2', slug: 'create-table-avanzado',
        title: 'CREATE TABLE Avanzado',
        description: 'Restricciones (PK, FK, UNIQUE, CHECK, DEFAULT), tipos de datos y ALTER TABLE. Caso: extender el esquema del e-commerce.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Restricciones (Constraints)', content: 'Las restricciones garantizan la <strong>integridad de los datos</strong>:<br><br>- <code>PRIMARY KEY</code>: Identifica cada fila de forma unica. No puede ser NULL.<br>- <code>FOREIGN KEY</code>: Establece relacion con otra tabla. Garantiza integridad referencial.<br>- <code>UNIQUE</code>: No permite valores duplicados en esa columna.<br>- <code>NOT NULL</code>: La columna no puede estar vacia.<br>- <code>CHECK</code>: Valida que el valor cumpla una condicion.<br>- <code>DEFAULT</code>: Valor por defecto si no se especifica.' },
          { type: 'code-example', title: 'Tabla con todas las restricciones', content: 'Creemos una tabla de cupones para el e-commerce:', code: "CREATE TABLE cupones (\n  id INTEGER PRIMARY KEY,\n  codigo TEXT UNIQUE NOT NULL,\n  descuento_pct REAL NOT NULL CHECK (descuento_pct > 0 AND descuento_pct <= 50),\n  monto_minimo REAL DEFAULT 0 CHECK (monto_minimo >= 0),\n  usos_maximos INTEGER DEFAULT 100,\n  usos_actuales INTEGER DEFAULT 0,\n  activo INTEGER DEFAULT 1 CHECK (activo IN (0, 1)),\n  fecha_inicio TEXT NOT NULL,\n  fecha_fin TEXT NOT NULL,\n  CHECK (fecha_fin > fecha_inicio)\n);\n\n-- Verificar la estructura\nSELECT sql FROM sqlite_master WHERE name = 'cupones';" },
          { type: 'code-example', title: 'ALTER TABLE: Modificar tablas existentes', content: '', code: "-- Agregar columna\nALTER TABLE productos ADD COLUMN peso_kg REAL;\n\n-- Renombrar tabla\nALTER TABLE cupones RENAME TO descuentos;\n\n-- En PostgreSQL tambien puedes:\n-- ALTER TABLE productos DROP COLUMN peso_kg;\n-- ALTER TABLE productos ALTER COLUMN precio SET NOT NULL;\n-- (SQLite tiene soporte limitado de ALTER TABLE)" },
          { type: 'warning', title: 'Limitaciones de SQLite', content: 'SQLite (que usamos en el laboratorio) tiene ALTER TABLE limitado: solo permite ADD COLUMN y RENAME. Para cambios mas complejos necesitas recrear la tabla. PostgreSQL y MySQL tienen ALTER TABLE mucho mas poderoso.' },
        ],
        exercises: [
          {
            id: 'e-5-2-1',
            instruction: 'Crea una tabla llamada "direcciones_envio" con: id (PK), cliente_id (FK a clientes), direccion (TEXT NOT NULL), ciudad (TEXT NOT NULL), departamento (TEXT), codigo_postal (TEXT), es_principal (INTEGER DEFAULT 0, CHECK 0 o 1). Luego inserta una direccion para el cliente 1 y consultala.',
            initialQuery: '-- Crea la tabla de direcciones\n',
            hints: [
              'CREATE TABLE direcciones_envio (id INTEGER PRIMARY KEY, ...)',
              'No olvides FOREIGN KEY (cliente_id) REFERENCES clientes(id)',
              "CREATE TABLE direcciones_envio (id INTEGER PRIMARY KEY, cliente_id INTEGER NOT NULL, direccion TEXT NOT NULL, ciudad TEXT NOT NULL, departamento TEXT, codigo_postal TEXT, es_principal INTEGER DEFAULT 0 CHECK (es_principal IN (0, 1)), FOREIGN KEY (cliente_id) REFERENCES clientes(id)); INSERT INTO direcciones_envio (id, cliente_id, direccion, ciudad, departamento, codigo_postal, es_principal) VALUES (1, 1, 'Calle 10 #43-12', 'Medellin', 'Antioquia', '050021', 1); SELECT * FROM direcciones_envio;",
            ],
            requiredKeywords: ['CREATE TABLE', 'PRIMARY KEY', 'FOREIGN KEY'],
            solutionQuery: "CREATE TABLE direcciones_envio (id INTEGER PRIMARY KEY, cliente_id INTEGER NOT NULL, direccion TEXT NOT NULL, ciudad TEXT NOT NULL, departamento TEXT, codigo_postal TEXT, es_principal INTEGER DEFAULT 0 CHECK (es_principal IN (0, 1)), FOREIGN KEY (cliente_id) REFERENCES clientes(id)); INSERT INTO direcciones_envio (id, cliente_id, direccion, ciudad, departamento, codigo_postal, es_principal) VALUES (1, 1, 'Calle 10 #43-12', 'Medellin', 'Antioquia', '050021', 1); SELECT * FROM direcciones_envio;",
          },
          {
            id: 'e-5-2-2',
            instruction: 'Agrega una columna "telefono" (TEXT) a la tabla clientes usando ALTER TABLE. Luego actualiza el telefono del cliente con id=1 a "3001234567" y muestra ese cliente.',
            initialQuery: '',
            hints: [
              'ALTER TABLE clientes ADD COLUMN telefono TEXT;',
              'Despues UPDATE clientes SET telefono = ... WHERE id = 1',
              "ALTER TABLE clientes ADD COLUMN telefono TEXT; UPDATE clientes SET telefono = '3001234567' WHERE id = 1; SELECT id, nombre, email, telefono FROM clientes WHERE id = 1;",
            ],
            requiredKeywords: ['ALTER TABLE', 'ADD COLUMN'],
            solutionQuery: "ALTER TABLE clientes ADD COLUMN telefono TEXT; UPDATE clientes SET telefono = '3001234567' WHERE id = 1; SELECT id, nombre, email, telefono FROM clientes WHERE id = 1;",
          },
        ],
      },
      {
        id: 'l-5-3', slug: 'normalizacion',
        title: 'Normalizacion (1FN-3FN-BCNF)',
        description: 'Dependencias funcionales, anomalias y proceso de normalizacion paso a paso. Caso: normalizar una tabla desnormalizada de pedidos.',
        difficulty: 'avanzado', estimatedMinutes: 40,
        content: [
          { type: 'theory', title: 'Por que normalizar?', content: 'Una tabla <strong>desnormalizada</strong> tiene datos redundantes que causan <strong>anomalias</strong>:<br><br>- <strong>Anomalia de insercion:</strong> No puedes insertar un dato sin insertar datos no relacionados<br>- <strong>Anomalia de actualizacion:</strong> Actualizar un dato requiere modificar multiples filas<br>- <strong>Anomalia de eliminacion:</strong> Eliminar un dato puede borrar informacion no relacionada<br><br>La <strong>normalizacion</strong> es el proceso de dividir tablas para eliminar estas anomalias.' },
          { type: 'theory', title: 'Formas Normales', content: '<strong>1FN (Primera Forma Normal):</strong><br>- Cada celda tiene un solo valor (atomico)<br>- No hay grupos repetidos<br><br><strong>2FN (Segunda Forma Normal):</strong><br>- Esta en 1FN<br>- Todos los atributos no-clave dependen de TODA la clave primaria (no de una parte)<br><br><strong>3FN (Tercera Forma Normal):</strong><br>- Esta en 2FN<br>- No hay dependencias transitivas (un atributo no-clave no depende de otro atributo no-clave)<br><br><strong>BCNF (Boyce-Codd):</strong><br>- Cada determinante es una clave candidata' },
          { type: 'code-example', title: 'Ejemplo: Tabla desnormalizada', content: 'Esta tabla de pedidos viola 3FN — tiene datos redundantes del cliente y producto:', code: "-- Tabla desnormalizada (mala practica)\nCREATE TABLE pedidos_flat (\n  pedido_id INTEGER,\n  fecha TEXT,\n  cliente_nombre TEXT,\n  cliente_email TEXT,\n  cliente_ciudad TEXT,\n  producto_nombre TEXT,\n  producto_precio REAL,\n  cantidad INTEGER\n);\n\n-- Si el cliente cambia de ciudad, hay que actualizar\n-- TODAS las filas de sus pedidos (anomalia de actualizacion)\n\n-- Solucion normalizada: tablas separadas\n-- clientes(id, nombre, email, ciudad)\n-- productos(id, nombre, precio)\n-- pedidos(id, fecha, cliente_id FK)\n-- detalle_pedidos(id, pedido_id FK, producto_id FK, cantidad)" },
          { type: 'tip', title: 'Regla practica de 3FN', content: 'Recuerda la regla: cada atributo no-clave debe depender de <strong>"la clave, toda la clave, y nada mas que la clave"</strong>. Si un dato se repite en multiples filas, probablemente debe ir en su propia tabla.' },
        ],
        exercises: [
          {
            id: 'e-5-3-1',
            instruction: 'El esquema del e-commerce ya esta normalizado. Demuestra que no hay redundancia: para cada proveedor, muestra su nombre, la cantidad de productos que suministra y la cantidad de categorias distintas de esos productos. Esto muestra la relacion limpia proveedor -> productos -> categorias.',
            initialQuery: '',
            hints: [
              'JOIN proveedores con productos, GROUP BY proveedor',
              'COUNT(DISTINCT p.categoria_id) para categorias distintas',
              "SELECT pr.nombre AS proveedor, COUNT(p.id) AS num_productos, COUNT(DISTINCT p.categoria_id) AS num_categorias FROM proveedores pr LEFT JOIN productos p ON pr.id = p.proveedor_id GROUP BY pr.id, pr.nombre ORDER BY num_productos DESC;",
            ],
            requiredKeywords: ['JOIN', 'GROUP BY', 'COUNT'],
            solutionQuery: "SELECT pr.nombre AS proveedor, COUNT(p.id) AS num_productos, COUNT(DISTINCT p.categoria_id) AS num_categorias FROM proveedores pr LEFT JOIN productos p ON pr.id = p.proveedor_id GROUP BY pr.id, pr.nombre ORDER BY num_productos DESC;",
          },
          {
            id: 'e-5-3-2',
            instruction: 'Crea una tabla desnormalizada "reporte_ventas_flat" con: pedido_id, fecha, cliente_nombre, producto_nombre, categoria_nombre, cantidad, subtotal. Insertale datos usando SELECT + JOIN desde las tablas normalizadas (INSERT INTO ... SELECT). Muestra los primeros 10 registros.',
            initialQuery: '',
            hints: [
              'CREATE TABLE reporte_ventas_flat AS SELECT ... es una forma rapida',
              'Necesitas JOIN entre pedidos, clientes, detalle_pedidos, productos y categorias',
              "CREATE TABLE reporte_ventas_flat AS SELECT p.id AS pedido_id, p.fecha, c.nombre AS cliente_nombre, pr.nombre AS producto_nombre, cat.nombre AS categoria_nombre, dp.cantidad, dp.subtotal FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id JOIN productos pr ON dp.producto_id = pr.id JOIN categorias cat ON pr.categoria_id = cat.id; SELECT * FROM reporte_ventas_flat LIMIT 10;",
            ],
            requiredKeywords: ['CREATE TABLE', 'SELECT', 'JOIN'],
            solutionQuery: "CREATE TABLE reporte_ventas_flat AS SELECT p.id AS pedido_id, p.fecha, c.nombre AS cliente_nombre, pr.nombre AS producto_nombre, cat.nombre AS categoria_nombre, dp.cantidad, dp.subtotal FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id JOIN productos pr ON dp.producto_id = pr.id JOIN categorias cat ON pr.categoria_id = cat.id; SELECT * FROM reporte_ventas_flat LIMIT 10;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 6: Indices y Optimizacion (Finanzas)
  // ============================================================
  {
    id: 'modulo-06',
    slug: 'indices-optimizacion',
    title: 'Indices y Optimizacion de Queries',
    description: 'Indices B-tree, EXPLAIN, planes de ejecucion y buenas practicas de rendimiento con datos bancarios.',
    icon: '&#x2699;',
    weekRange: [12, 12],
    dataset: 'finanzas',
    order: 6,
    lessons: [
      {
        id: 'l-6-1', slug: 'indices',
        title: 'Indices: Acelerando Consultas',
        description: 'B-tree, hash, parciales y compuestos. Caso: optimizar consultas de transacciones bancarias.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Que es un indice?', content: 'Un <strong>indice</strong> es una estructura de datos que acelera las busquedas en una tabla, similar al indice de un libro.<br><br><strong>Tipos principales:</strong><br>- <strong>B-tree</strong> (default): Ideal para =, <, >, BETWEEN, ORDER BY. El mas comun.<br>- <strong>Hash</strong>: Solo para busquedas exactas (=). Mas rapido que B-tree para igualdad.<br>- <strong>Compuesto</strong>: Indice sobre multiples columnas. El orden importa.<br>- <strong>Parcial</strong>: Indice solo sobre un subconjunto de filas (con WHERE).<br><br><strong>Trade-off:</strong> Los indices aceleran lecturas pero ralentizan escrituras (INSERT/UPDATE/DELETE) porque el indice tambien se actualiza.' },
          { type: 'code-example', title: 'Crear indices en el banco', content: '', code: "-- Indice simple: acelera busquedas por estado\nCREATE INDEX idx_transacciones_estado\nON transacciones(estado);\n\n-- Indice compuesto: acelera filtros por cuenta + fecha\nCREATE INDEX idx_trans_cuenta_fecha\nON transacciones(cuenta_origen_id, fecha);\n\n-- Indice parcial: solo transacciones completadas (las mas consultadas)\n-- (Nota: SQLite soporta indices parciales)\nCREATE INDEX idx_trans_completadas\nON transacciones(fecha, monto)\nWHERE estado = 'Completada';\n\n-- Ver indices existentes\nSELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL;" },
          { type: 'warning', title: 'Cuando NO crear indices', content: '<strong>No crees indices en:</strong><br>- Tablas pequenas (< 1000 filas): el scan es mas rapido<br>- Columnas con pocos valores distintos (ej: booleanos)<br>- Tablas con muchos INSERT/UPDATE/DELETE<br>- Si ya hay muchos indices en la tabla (cada uno cuesta espacio y tiempo de escritura)' },
        ],
        exercises: [
          {
            id: 'e-6-1-1',
            instruction: 'Crea un indice compuesto en la tabla transacciones sobre (tipo, estado) para acelerar filtros combinados. Luego usa el indice consultando transacciones de tipo "Transferencia" con estado "Completada", mostrando fecha, monto y canal. Limita a 15 filas.',
            initialQuery: '-- Crea el indice y luego usalo\n',
            hints: [
              'CREATE INDEX idx_nombre ON transacciones(tipo, estado);',
              'El SELECT usara automaticamente el indice si filtra por tipo y estado',
              "CREATE INDEX idx_trans_tipo_estado ON transacciones(tipo, estado); SELECT fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha DESC LIMIT 15;",
            ],
            requiredKeywords: ['CREATE INDEX', 'SELECT', 'WHERE'],
            solutionQuery: "CREATE INDEX idx_trans_tipo_estado ON transacciones(tipo, estado); SELECT fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha DESC LIMIT 15;",
          },
          {
            id: 'e-6-1-2',
            instruction: 'Lista todos los indices que existen actualmente en la base de datos (tabla sqlite_master, type = "index", donde sql no es NULL). Muestra el nombre del indice y su definicion SQL.',
            initialQuery: '',
            hints: [
              'SELECT name, sql FROM sqlite_master WHERE type = ...',
              "Filtra WHERE type = 'index' AND sql IS NOT NULL",
              "SELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL ORDER BY name;",
            ],
            requiredKeywords: ['SELECT', 'sqlite_master'],
            solutionQuery: "SELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL ORDER BY name;",
          },
        ],
      },
      {
        id: 'l-6-2', slug: 'explain-planes-ejecucion',
        title: 'EXPLAIN y Planes de Ejecucion',
        description: 'Leer un plan de ejecucion, identificar full scans y entender costos. Caso: optimizar queries lentos del banco.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'EXPLAIN QUERY PLAN', content: 'Antes de ejecutar una consulta, el motor SQL crea un <strong>plan de ejecucion</strong> que dice como va a encontrar los datos.<br><br><code>EXPLAIN QUERY PLAN SELECT ...</code><br><br><strong>Lo que debes buscar:</strong><br>- <code>SCAN TABLE</code>: Recorre TODA la tabla (lento en tablas grandes)<br>- <code>SEARCH TABLE ... USING INDEX</code>: Usa un indice (rapido)<br>- <code>USING COVERING INDEX</code>: El indice tiene todos los datos necesarios (optimo)<br><br>En PostgreSQL se usa <code>EXPLAIN ANALYZE SELECT ...</code> para ver tiempos reales.' },
          { type: 'code-example', title: 'Comparar con y sin indice', content: '', code: "-- Sin indice: SCAN TABLE (recorre todo)\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones WHERE canal = 'App Movil';\n\n-- Crear indice en canal\nCREATE INDEX idx_trans_canal ON transacciones(canal);\n\n-- Con indice: SEARCH USING INDEX (mucho mas rapido)\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones WHERE canal = 'App Movil';" },
          { type: 'tip', title: 'Regla del 80/20', content: 'El 80% de los problemas de performance se resuelven con:<br>1. Agregar el indice correcto<br>2. Evitar SELECT * (selecciona solo columnas necesarias)<br>3. Limitar resultados con LIMIT<br>4. Filtrar temprano con WHERE antes de hacer JOINs' },
        ],
        exercises: [
          {
            id: 'e-6-2-1',
            instruction: 'Usa EXPLAIN QUERY PLAN para ver como SQLite ejecuta esta consulta: SELECT * FROM transacciones WHERE monto > 5000000 AND estado = "Completada" ORDER BY fecha DESC. Observa si hace SCAN o SEARCH.',
            initialQuery: '-- Analiza el plan de ejecucion\n',
            hints: [
              'Simplemente agrega EXPLAIN QUERY PLAN antes del SELECT',
              'Observa si dice SCAN TABLE o SEARCH TABLE USING INDEX',
              "EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
            ],
            requiredKeywords: ['EXPLAIN', 'SELECT'],
            solutionQuery: "EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
          },
          {
            id: 'e-6-2-2',
            instruction: 'Crea un indice en transacciones(monto) y luego vuelve a ejecutar EXPLAIN QUERY PLAN para la misma consulta del ejercicio anterior. Compara si el plan cambio.',
            initialQuery: '',
            hints: [
              'CREATE INDEX idx_trans_monto ON transacciones(monto);',
              'Luego EXPLAIN QUERY PLAN SELECT ... la misma consulta',
              "CREATE INDEX idx_trans_monto ON transacciones(monto); EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
            ],
            requiredKeywords: ['CREATE INDEX', 'EXPLAIN'],
            solutionQuery: "CREATE INDEX idx_trans_monto ON transacciones(monto); EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
          },
        ],
      },
      {
        id: 'l-6-3', slug: 'buenas-practicas-performance',
        title: 'Buenas Practicas de Performance',
        description: 'Desnormalizacion estrategica, SELECT *, N+1, paginacion eficiente y tips de rendimiento.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Anti-patrones de rendimiento', content: '<strong>1. SELECT *:</strong> Trae todas las columnas aunque no las necesites. Desperdicia I/O y memoria.<br><br><strong>2. N+1 Queries:</strong> Hacer 1 query para listar items + N queries para detalles de cada uno. Solucion: usar JOIN.<br><br><strong>3. Funciones en WHERE:</strong> <code>WHERE UPPER(nombre) = \'ANA\'</code> no puede usar indice. Mejor: almacenar ya normalizado.<br><br><strong>4. OFFSET grande para paginacion:</strong> <code>OFFSET 100000</code> debe recorrer 100K filas antes de retornar. Mejor: paginacion por cursor (WHERE id > ultimo_id).' },
          { type: 'code-example', title: 'Paginacion eficiente vs ineficiente', content: '', code: "-- MALO: Offset grande (lento en paginas altas)\nSELECT * FROM transacciones\nORDER BY id\nLIMIT 10 OFFSET 10000;\n\n-- BUENO: Paginacion por cursor (siempre rapido)\nSELECT id, fecha, monto, tipo\nFROM transacciones\nWHERE id > 10000  -- ultimo id de la pagina anterior\nORDER BY id\nLIMIT 10;" },
          { type: 'code-example', title: 'Desnormalizacion estrategica', content: 'A veces guardar un dato redundante es mejor para performance:', code: "-- En vez de calcular total_compras cada vez:\n-- SELECT SUM(total) FROM pedidos WHERE cliente_id = 1\n\n-- Guardamos total_compras en la tabla clientes\n-- y lo actualizamos con cada pedido\nSELECT nombre, total_compras\nFROM clientes\nWHERE total_compras > 10000000\nORDER BY total_compras DESC;\n\n-- Esto es desnormalizacion estrategica:\n-- sacrificamos normalizacion por velocidad de lectura" },
          { type: 'tip', title: 'Checklist de optimizacion', content: '1. Selecciona solo las columnas que necesitas<br>2. Filtra lo antes posible (WHERE antes de JOIN si puedes)<br>3. Crea indices en columnas de WHERE, JOIN y ORDER BY frecuentes<br>4. Usa LIMIT siempre que puedas<br>5. Evita subconsultas correlacionadas cuando un JOIN funcione<br>6. Mide con EXPLAIN antes de optimizar' },
        ],
        exercises: [
          {
            id: 'e-6-3-1',
            instruction: 'Reescribe esta consulta ineficiente de forma optimizada: "SELECT * FROM transacciones WHERE UPPER(tipo) = \'TRANSFERENCIA\' ORDER BY fecha LIMIT 100". Selecciona solo id, fecha, monto, canal (no SELECT *), y usa el valor correcto de tipo sin UPPER.',
            initialQuery: '-- Reescribe de forma optimizada\n',
            hints: [
              'Cambia SELECT * por columnas especificas',
              'Cambia WHERE UPPER(tipo) = ... por WHERE tipo = "Transferencia"',
              "SELECT id, fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' ORDER BY fecha DESC LIMIT 100;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'LIMIT'],
            solutionQuery: "SELECT id, fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' ORDER BY fecha DESC LIMIT 100;",
          },
          {
            id: 'e-6-3-2',
            instruction: 'Implementa paginacion por cursor: muestra las transacciones con id > 50 ordenadas por id, limitadas a 10 filas. Muestra id, fecha, tipo y monto.',
            initialQuery: '',
            hints: [
              'WHERE id > 50 ORDER BY id LIMIT 10',
              'Esto es mas eficiente que OFFSET para paginas lejanas',
              "SELECT id, fecha, tipo, monto FROM transacciones WHERE id > 50 ORDER BY id LIMIT 10;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'],
            solutionQuery: "SELECT id, fecha, tipo, monto FROM transacciones WHERE id > 50 ORDER BY id LIMIT 10;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 7: Transacciones, ACID y Seguridad (Finanzas)
  // ============================================================
  {
    id: 'modulo-07',
    slug: 'transacciones-seguridad',
    title: 'Transacciones, ACID y Seguridad',
    description: 'Control transaccional, niveles de aislamiento, GRANT/REVOKE y seguridad en bases de datos. Caso: banca segura.',
    icon: '&#x1F6E1;',
    weekRange: [13, 13],
    dataset: 'finanzas',
    order: 7,
    lessons: [
      {
        id: 'l-7-1', slug: 'transacciones-acid',
        title: 'Transacciones y ACID',
        description: 'BEGIN/COMMIT/ROLLBACK, savepoints y atomicidad. Caso: transferencia bancaria segura.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Que es una transaccion?', content: 'Una <strong>transaccion</strong> es un grupo de operaciones SQL que se ejecutan como una <strong>unidad atomica</strong>: o todas se completan, o ninguna se aplica.<br><br><strong>ACID:</strong><br>- <strong>Atomicidad:</strong> Todo o nada. Si falla una parte, se deshace todo.<br>- <strong>Consistencia:</strong> La BD pasa de un estado valido a otro estado valido.<br>- <strong>Aislamiento:</strong> Transacciones concurrentes no se interfieren.<br>- <strong>Durabilidad:</strong> Una vez confirmada (COMMIT), los datos persisten aunque falle el sistema.' },
          { type: 'code-example', title: 'Transferencia bancaria segura', content: 'Sin transacciones, una falla entre el debito y credito deja dinero "perdido":', code: "-- Transferencia de 500,000 COP de cuenta 1 a cuenta 5\nBEGIN;\n\n-- Paso 1: Debitar de la cuenta origen\nUPDATE cuentas SET saldo = saldo - 500000\nWHERE id = 1 AND saldo >= 500000;\n\n-- Paso 2: Acreditar en la cuenta destino\nUPDATE cuentas SET saldo = saldo + 500000\nWHERE id = 5;\n\n-- Paso 3: Registrar la transaccion\nINSERT INTO transacciones (id, cuenta_origen_id, cuenta_destino_id, tipo, monto, fecha, estado, canal)\nVALUES (201, 1, 5, 'Transferencia', 500000, '2025-02-01', 'Completada', 'App Movil');\n\nCOMMIT;\n\n-- Verificar saldos\nSELECT id, tipo, saldo FROM cuentas WHERE id IN (1, 5);" },
          { type: 'code-example', title: 'ROLLBACK: Deshacer cambios', content: '', code: "-- Si algo sale mal, ROLLBACK deshace todo\nBEGIN;\nUPDATE cuentas SET saldo = saldo - 99999999 WHERE id = 1;\n-- Ups! Monto incorrecto, deshacemos\nROLLBACK;\n\n-- El saldo queda intacto\nSELECT id, saldo FROM cuentas WHERE id = 1;" },
          { type: 'warning', title: 'Siempre usar transacciones en banca', content: 'En sistemas financieros, TODA operacion que modifique datos debe estar dentro de una transaccion. Una transferencia sin transaccion puede dejar dinero perdido o duplicado si hay un fallo entre operaciones.' },
        ],
        exercises: [
          {
            id: 'e-7-1-1',
            instruction: 'Realiza una transferencia de 1,000,000 COP de la cuenta 3 a la cuenta 7 usando una transaccion. Debita de cuenta 3, acredita en cuenta 7, y verifica los saldos finales de ambas cuentas.',
            initialQuery: '-- Transferencia segura con transaccion\nBEGIN;\n',
            hints: [
              'UPDATE cuentas SET saldo = saldo - 1000000 WHERE id = 3',
              'UPDATE cuentas SET saldo = saldo + 1000000 WHERE id = 7',
              "BEGIN; UPDATE cuentas SET saldo = saldo - 1000000 WHERE id = 3; UPDATE cuentas SET saldo = saldo + 1000000 WHERE id = 7; COMMIT; SELECT id, tipo, saldo FROM cuentas WHERE id IN (3, 7);",
            ],
            requiredKeywords: ['BEGIN', 'UPDATE', 'COMMIT'],
            solutionQuery: "BEGIN; UPDATE cuentas SET saldo = saldo - 1000000 WHERE id = 3; UPDATE cuentas SET saldo = saldo + 1000000 WHERE id = 7; COMMIT; SELECT id, tipo, saldo FROM cuentas WHERE id IN (3, 7);",
          },
          {
            id: 'e-7-1-2',
            instruction: 'Inicia una transaccion, actualiza el saldo de la cuenta 1 a 0, verifica con SELECT que el saldo es 0, y luego haz ROLLBACK. Finalmente verifica que el saldo original se restauro.',
            initialQuery: '',
            hints: [
              'BEGIN; UPDATE ... ; SELECT ...; ROLLBACK; SELECT ...;',
              'El ROLLBACK deshace el UPDATE',
              "BEGIN; UPDATE cuentas SET saldo = 0 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; ROLLBACK; SELECT id, saldo FROM cuentas WHERE id = 1;",
            ],
            requiredKeywords: ['BEGIN', 'ROLLBACK', 'UPDATE'],
            solutionQuery: "BEGIN; UPDATE cuentas SET saldo = 0 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; ROLLBACK; SELECT id, saldo FROM cuentas WHERE id = 1;",
          },
        ],
      },
      {
        id: 'l-7-2', slug: 'aislamiento-concurrencia',
        title: 'Niveles de Aislamiento y Concurrencia',
        description: 'READ COMMITTED, REPEATABLE READ, SERIALIZABLE, problemas de concurrencia y MVCC.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Problemas de concurrencia', content: 'Cuando multiples usuarios acceden a la BD simultaneamente, pueden ocurrir:<br><br>- <strong>Dirty Read:</strong> Leer datos de una transaccion que aun no hizo COMMIT (puede hacer ROLLBACK)<br>- <strong>Non-Repeatable Read:</strong> Leer el mismo dato dos veces y obtener valores distintos (otro usuario lo modifico)<br>- <strong>Phantom Read:</strong> Una consulta retorna filas diferentes al ejecutarse dos veces (otro usuario inserto/elimino filas)' },
          { type: 'theory', title: 'Niveles de aislamiento', content: '<strong>READ UNCOMMITTED:</strong> Sin proteccion. Permite dirty reads. Casi nunca se usa.<br><br><strong>READ COMMITTED (default en PostgreSQL):</strong> Solo lee datos confirmados. Previene dirty reads.<br><br><strong>REPEATABLE READ (default en MySQL InnoDB):</strong> Las lecturas son consistentes dentro de la transaccion. Previene non-repeatable reads.<br><br><strong>SERIALIZABLE:</strong> Aislamiento total. Las transacciones se ejecutan como si fueran secuenciales. Mas seguro pero mas lento.' },
          { type: 'code-example', title: 'MVCC: Control de concurrencia', content: 'PostgreSQL usa MVCC (Multi-Version Concurrency Control):', code: "-- MVCC mantiene multiples versiones de cada fila\n-- Esto permite que lecturas y escrituras no se bloqueen\n\n-- Transaccion A (lector):\n-- BEGIN;\n-- SELECT saldo FROM cuentas WHERE id = 1;\n-- (ve la version antes de que B modifique)\n\n-- Transaccion B (escritor, simultanea):\n-- BEGIN;\n-- UPDATE cuentas SET saldo = saldo - 100000 WHERE id = 1;\n-- COMMIT;\n\n-- Transaccion A sigue viendo el saldo original\n-- hasta que haga COMMIT y empiece nueva transaccion\n\n-- En SQLite, el aislamiento es SERIALIZABLE por defecto\nSELECT * FROM cuentas LIMIT 5;" },
          { type: 'tip', title: 'En la practica', content: '<strong>READ COMMITTED</strong> es suficiente para el 90% de aplicaciones web.<br><strong>SERIALIZABLE</strong> se usa en sistemas financieros criticos donde la consistencia es mas importante que la velocidad.<br>SQLite usa un modelo simplificado: serializa todas las escrituras con un lock a nivel archivo.' },
        ],
        exercises: [
          {
            id: 'e-7-2-1',
            instruction: 'Simula un escenario de concurrencia: dentro de una transaccion, lee el saldo de la cuenta 1, luego haz un UPDATE del saldo, y vuelve a leer. Verifica que dentro de la misma transaccion los cambios son visibles. Haz COMMIT al final.',
            initialQuery: '',
            hints: [
              'BEGIN; SELECT saldo FROM cuentas WHERE id = 1; UPDATE ...; SELECT ...; COMMIT;',
              'Dentro de la misma transaccion siempre ves tus propios cambios',
              "BEGIN; SELECT id, saldo FROM cuentas WHERE id = 1; UPDATE cuentas SET saldo = saldo + 100000 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; COMMIT;",
            ],
            requiredKeywords: ['BEGIN', 'SELECT', 'UPDATE', 'COMMIT'],
            solutionQuery: "BEGIN; SELECT id, saldo FROM cuentas WHERE id = 1; UPDATE cuentas SET saldo = saldo + 100000 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; COMMIT;",
          },
        ],
      },
      {
        id: 'l-7-3', slug: 'seguridad-bd',
        title: 'Seguridad en Bases de Datos',
        description: 'GRANT/REVOKE, roles, Row-Level Security, SQL Injection, encriptacion y auditoria.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Control de acceso', content: '<strong>GRANT / REVOKE</strong> controlan quien puede hacer que:<br><code>GRANT SELECT ON clientes TO usuario_reportes;</code><br><code>REVOKE DELETE ON clientes FROM usuario_app;</code><br><br><strong>Roles:</strong> Agrupan permisos reutilizables:<br><code>CREATE ROLE analista;</code><br><code>GRANT SELECT ON ALL TABLES TO analista;</code><br><br><strong>Row-Level Security (RLS):</strong> Filtra filas automaticamente segun el usuario. Cada usuario solo ve sus datos. Supabase usa RLS extensivamente.' },
          { type: 'warning', title: 'SQL Injection: La vulnerabilidad #1', content: '<strong>SQL Injection</strong> es cuando un atacante inserta SQL malicioso a traves de inputs de usuario.<br><br><strong>VULNERABLE:</strong><br><code>"SELECT * FROM users WHERE email = \'" + userInput + "\'"</code><br>Si el usuario ingresa: <code>\' OR 1=1 --</code><br>La consulta se convierte en: <code>SELECT * FROM users WHERE email = \'\' OR 1=1 --\'</code><br>Y retorna TODOS los usuarios.<br><br><strong>SOLUCION:</strong> Siempre usar <strong>parametros preparados</strong>:<br><code>SELECT * FROM users WHERE email = $1</code><br>(Nunca concatenar inputs del usuario en SQL)' },
          { type: 'code-example', title: 'Auditoria: Rastrear cambios', content: 'En produccion, es fundamental saber quien hizo que:', code: "-- Tabla de auditoria para rastrear cambios\nCREATE TABLE auditoria_cuentas (\n  id INTEGER PRIMARY KEY,\n  cuenta_id INTEGER NOT NULL,\n  operacion TEXT NOT NULL,\n  saldo_antes REAL,\n  saldo_despues REAL,\n  monto REAL,\n  fecha TEXT DEFAULT (datetime('now')),\n  FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)\n);\n\n-- Registrar una operacion\nINSERT INTO auditoria_cuentas (id, cuenta_id, operacion, saldo_antes, saldo_despues, monto)\nSELECT\n  1,\n  id,\n  'Debito',\n  saldo AS saldo_antes,\n  saldo - 500000 AS saldo_despues,\n  500000\nFROM cuentas WHERE id = 1;\n\nSELECT * FROM auditoria_cuentas;" },
          { type: 'tip', title: 'Principio de minimo privilegio', content: 'Cada usuario o aplicacion debe tener SOLO los permisos que necesita:<br>- La app web: SELECT, INSERT, UPDATE (nunca DROP o DELETE masivo)<br>- El equipo de analytics: Solo SELECT<br>- El DBA: Todos los permisos<br>- El backup: Solo SELECT y COPY' },
        ],
        exercises: [
          {
            id: 'e-7-3-1',
            instruction: 'Crea una tabla de auditoria llamada "log_transacciones" con: id (PK), transaccion_id (INTEGER), accion (TEXT), detalle (TEXT), fecha (TEXT DEFAULT datetime now). Inserta un registro de auditoria para la transaccion id=1 con accion "Revision" y detalle "Verificacion manual de monto". Muestra el log.',
            initialQuery: '',
            hints: [
              "CREATE TABLE log_transacciones (id INTEGER PRIMARY KEY, transaccion_id INTEGER, accion TEXT, detalle TEXT, fecha TEXT DEFAULT (datetime('now')))",
              "INSERT INTO log_transacciones (id, transaccion_id, accion, detalle) VALUES ...",
              "CREATE TABLE log_transacciones (id INTEGER PRIMARY KEY, transaccion_id INTEGER NOT NULL, accion TEXT NOT NULL, detalle TEXT, fecha TEXT DEFAULT (datetime('now'))); INSERT INTO log_transacciones (id, transaccion_id, accion, detalle) VALUES (1, 1, 'Revision', 'Verificacion manual de monto'); SELECT * FROM log_transacciones;",
            ],
            requiredKeywords: ['CREATE TABLE', 'INSERT', 'SELECT'],
            solutionQuery: "CREATE TABLE log_transacciones (id INTEGER PRIMARY KEY, transaccion_id INTEGER NOT NULL, accion TEXT NOT NULL, detalle TEXT, fecha TEXT DEFAULT (datetime('now'))); INSERT INTO log_transacciones (id, transaccion_id, accion, detalle) VALUES (1, 1, 'Revision', 'Verificacion manual de monto'); SELECT * FROM log_transacciones;",
          },
          {
            id: 'e-7-3-2',
            instruction: 'Simula una consulta de auditoria: muestra las 10 transacciones de mayor monto con estado "Completada", junto al nombre del titular de la cuenta origen. Esto seria lo que un auditor revisaria para detectar operaciones sospechosas.',
            initialQuery: '',
            hints: [
              'JOIN transacciones con cuentas y clientes_banco',
              'ORDER BY monto DESC LIMIT 10',
              "SELECT t.id, t.fecha, t.tipo, t.monto, t.canal, cl.nombre AS titular FROM transacciones t JOIN cuentas cu ON t.cuenta_origen_id = cu.id JOIN clientes_banco cl ON cu.cliente_id = cl.id WHERE t.estado = 'Completada' ORDER BY t.monto DESC LIMIT 10;",
            ],
            requiredKeywords: ['JOIN', 'ORDER BY', 'LIMIT'],
            solutionQuery: "SELECT t.id, t.fecha, t.tipo, t.monto, t.canal, cl.nombre AS titular FROM transacciones t JOIN cuentas cu ON t.cuenta_origen_id = cu.id JOIN clientes_banco cl ON cu.cliente_id = cl.id WHERE t.estado = 'Completada' ORDER BY t.monto DESC LIMIT 10;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 8: SQL para Ciencia de Datos (Streaming)
  // ============================================================
  {
    id: 'modulo-08',
    slug: 'data-science-sql',
    title: 'SQL para Ciencia de Datos',
    description: 'Analisis de cohortes, funnels, metricas de producto y tendencias modernas con datos de una plataforma de streaming.',
    icon: '&#x1F680;',
    weekRange: [14, 14],
    dataset: 'streaming',
    order: 8,
    lessons: [
      {
        id: 'l-8-1', slug: 'analisis-cohortes-sql',
        title: 'Analisis de Cohortes con SQL',
        description: 'Agrupar usuarios por mes de registro y medir retencion. Caso: retencion de StreamCo.',
        difficulty: 'avanzado', estimatedMinutes: 40,
        content: [
          { type: 'theory', title: 'Que es un analisis de cohortes?', content: 'Un <strong>analisis de cohortes</strong> agrupa usuarios por una caracteristica comun (normalmente su mes/semana de registro) y mide su comportamiento a lo largo del tiempo.<br><br><strong>Preguntas que responde:</strong><br>- Los usuarios que se registraron en enero siguen activos en marzo?<br>- Cual cohorte tiene mejor retencion?<br>- El producto esta mejorando o empeorando para nuevos usuarios?<br><br>Es una de las herramientas MAS importantes en ciencia de datos de producto.' },
          { type: 'code-example', title: 'Cohortes por mes de registro', content: 'Agrupamos usuarios por su mes de registro y contamos cuantos estan en cada plan:', code: "SELECT\n  strftime('%Y-%m', fecha_registro) AS cohorte_mes,\n  plan_actual,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos\nFROM usuarios_streaming\nGROUP BY cohorte_mes, plan_actual\nORDER BY cohorte_mes, usuarios DESC;" },
          { type: 'code-example', title: 'Retencion por cohorte', content: 'Medimos la actividad de cada cohorte comparando registro vs ultima actividad:', code: "WITH cohortes AS (\n  SELECT\n    id,\n    strftime('%Y-%m', fecha_registro) AS cohorte,\n    strftime('%Y-%m', ultima_actividad) AS mes_actividad,\n    plan_actual,\n    estado\n  FROM usuarios_streaming\n)\nSELECT\n  cohorte,\n  COUNT(*) AS total_usuarios,\n  SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos,\n  ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion\nFROM cohortes\nGROUP BY cohorte\nORDER BY cohorte;" },
          { type: 'tip', title: 'Pensar como data scientist', content: 'En una empresa real, el analisis de cohortes se presenta asi:<br>1. Eje X: tiempo desde el registro (mes 0, mes 1, mes 2...)<br>2. Eje Y: cohortes (enero, febrero, marzo...)<br>3. Valores: % de retencion<br><br>Con SQL calculas los datos; con Python/Looker/Metabase haces la visualizacion.' },
        ],
        exercises: [
          {
            id: 'e-8-1-1',
            instruction: 'Analiza las cohortes de StreamCo: para cada mes de registro (cohorte), muestra cuantos usuarios se registraron, cuantos siguen activos, cuantos cancelaron, y el porcentaje de retencion. Ordena por cohorte.',
            initialQuery: '-- Analisis de cohortes de StreamCo\n',
            hints: [
              "strftime('%Y-%m', fecha_registro) AS cohorte",
              "SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) para contar activos",
              "SELECT strftime('%Y-%m', fecha_registro) AS cohorte, COUNT(*) AS registrados, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY cohorte ORDER BY cohorte;",
            ],
            requiredKeywords: ['GROUP BY', 'CASE', 'COUNT'],
            solutionQuery: "SELECT strftime('%Y-%m', fecha_registro) AS cohorte, COUNT(*) AS registrados, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY cohorte ORDER BY cohorte;",
          },
          {
            id: 'e-8-1-2',
            instruction: 'Compara la retencion por plan: para cada plan (Basico, Estandar, Premium), muestra total de usuarios, activos, cancelados y porcentaje de retencion. Cual plan retiene mejor?',
            initialQuery: '',
            hints: [
              'GROUP BY plan_actual en vez de por cohorte',
              "SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) para activos",
              "SELECT plan_actual, COUNT(*) AS total, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY plan_actual ORDER BY pct_retencion DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'CASE', 'ROUND'],
            solutionQuery: "SELECT plan_actual, COUNT(*) AS total, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY plan_actual ORDER BY pct_retencion DESC;",
          },
        ],
      },
      {
        id: 'l-8-2', slug: 'funnels-metricas-producto',
        title: 'Funnels y Metricas de Producto',
        description: 'Conversion, churn rate, LTV, engagement. Caso: metricas de la plataforma de streaming.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Metricas clave de producto', content: '<strong>Churn Rate:</strong> % de usuarios que cancelan en un periodo.<br><code>Churn = Cancelaciones / Total usuarios activos al inicio * 100</code><br><br><strong>LTV (Lifetime Value):</strong> Ingreso total esperado de un usuario.<br><code>LTV = Ingreso promedio mensual * Meses promedio activo</code><br><br><strong>Engagement:</strong> Que tan activos son los usuarios (contenidos vistos, tiempo de sesion, frecuencia).<br><br><strong>Conversion:</strong> % de usuarios que pasan de un estado a otro (trial -> pago, basico -> premium).' },
          { type: 'code-example', title: 'Metricas de engagement por plan', content: '', code: "SELECT\n  plan_actual,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos,\n  MIN(contenidos_vistos) AS min_contenidos,\n  MAX(contenidos_vistos) AS max_contenidos,\n  ROUND(AVG(JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro)), 0) AS avg_dias_activo\nFROM usuarios_streaming\nWHERE estado = 'Activo'\nGROUP BY plan_actual\nORDER BY avg_contenidos DESC;" },
          { type: 'code-example', title: 'Segmentacion por engagement', content: '', code: "WITH engagement AS (\n  SELECT\n    id,\n    nombre,\n    plan_actual,\n    contenidos_vistos,\n    NTILE(4) OVER (ORDER BY contenidos_vistos DESC) AS cuartil_engagement\n  FROM usuarios_streaming\n  WHERE estado = 'Activo'\n)\nSELECT\n  cuartil_engagement,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos,\n  MIN(contenidos_vistos) AS min_contenidos,\n  MAX(contenidos_vistos) AS max_contenidos\nFROM engagement\nGROUP BY cuartil_engagement\nORDER BY cuartil_engagement;" },
          { type: 'tip', title: 'El framework de metricas', content: 'Las empresas de producto usan el framework <strong>AARRR</strong> (Pirate Metrics):<br>1. <strong>Acquisition:</strong> Como llegan los usuarios?<br>2. <strong>Activation:</strong> Tuvieron una buena primera experiencia?<br>3. <strong>Retention:</strong> Regresan? (la metrica MAS importante)<br>4. <strong>Revenue:</strong> Pagan?<br>5. <strong>Referral:</strong> Invitan a otros?<br><br>SQL es la herramienta fundamental para medir cada una de estas metricas.' },
        ],
        exercises: [
          {
            id: 'e-8-2-1',
            instruction: 'Calcula el churn rate por plan: para cada plan, muestra el total de usuarios, los que cancelaron, y el porcentaje de churn. Tambien muestra el ingreso mensual del plan y estima el LTV (ingreso * promedio de meses activo de usuarios activos).',
            initialQuery: '-- Churn y LTV por plan\n',
            hints: [
              'Churn = cancelados / total * 100',
              'Para meses activo usa JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro) / 30',
              "SELECT plan_actual, ingreso_mensual, COUNT(*) AS total_usuarios, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS churn_rate, ROUND(ingreso_mensual * AVG(CASE WHEN estado = 'Activo' THEN (JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro)) / 30.0 END), 0) AS ltv_estimado FROM usuarios_streaming GROUP BY plan_actual, ingreso_mensual ORDER BY ltv_estimado DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'CASE', 'ROUND', 'AVG'],
            solutionQuery: "SELECT plan_actual, ingreso_mensual, COUNT(*) AS total_usuarios, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS churn_rate, ROUND(ingreso_mensual * AVG(CASE WHEN estado = 'Activo' THEN (JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro)) / 30.0 END), 0) AS ltv_estimado FROM usuarios_streaming GROUP BY plan_actual, ingreso_mensual ORDER BY ltv_estimado DESC;",
          },
          {
            id: 'e-8-2-2',
            instruction: 'Identifica los usuarios en riesgo de churn: usuarios activos que llevan mas de 30 dias sin actividad (fecha actual - ultima_actividad > 30). Muestra nombre, plan, contenidos vistos, ultima actividad y dias de inactividad. Ordena por dias de inactividad descendente.',
            initialQuery: '',
            hints: [
              "JULIANDAY('now') - JULIANDAY(ultima_actividad) para dias de inactividad",
              "WHERE estado = 'Activo' AND dias > 30",
              "SELECT nombre, plan_actual, contenidos_vistos, ultima_actividad, CAST(JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) AS INTEGER) AS dias_inactivo FROM usuarios_streaming WHERE estado = 'Activo' AND JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) > 30 ORDER BY dias_inactivo DESC;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'ORDER BY'],
            solutionQuery: "SELECT nombre, plan_actual, contenidos_vistos, ultima_actividad, CAST(JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) AS INTEGER) AS dias_inactivo FROM usuarios_streaming WHERE estado = 'Activo' AND JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) > 30 ORDER BY dias_inactivo DESC;",
          },
        ],
      },
      {
        id: 'l-8-3', slug: 'sql-ia-tendencias',
        title: 'SQL + IA y Tendencias Modernas',
        description: 'Bases de datos vectoriales, pgvector, RAG, natural language to SQL y la arquitectura lakehouse.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'El futuro de SQL', content: 'SQL no va a desaparecer — esta evolucionando:<br><br><strong>1. Natural Language to SQL:</strong> Herramientas como Vanna.ai, DuckDB + LLMs permiten preguntar en español y generar SQL automaticamente.<br><br><strong>2. Bases de datos vectoriales:</strong> Almacenan embeddings para busqueda semantica. pgvector extiende PostgreSQL con vectores.<br><br><strong>3. Lakehouse:</strong> Combina data lake (archivos como Parquet) con data warehouse (SQL). Databricks y Snowflake lideran este modelo.<br><br><strong>4. Serverless:</strong> Bases de datos que escalan a cero y cobran por uso (Neon, PlanetScale, Turso).' },
          { type: 'theory', title: 'Bases de datos vectoriales y RAG', content: '<strong>Embedding:</strong> Representacion numerica de texto/imagenes como vector de numeros (ej: [0.2, -0.5, 0.8, ...]). Textos similares tienen vectores cercanos.<br><br><strong>pgvector:</strong> Extension de PostgreSQL que agrega tipo VECTOR y operadores de similitud. Permite buscar los documentos "mas similares" a una pregunta.<br><br><strong>RAG (Retrieval-Augmented Generation):</strong><br>1. El usuario pregunta algo<br>2. SQL busca los documentos mas relevantes (busqueda vectorial)<br>3. Los documentos se envian al LLM como contexto<br>4. El LLM genera una respuesta informada<br><br>Muchos chatbots y asistentes de IA usan PostgreSQL + pgvector como su "memoria".' },
          { type: 'code-example', title: 'Analisis de tendencias en la plataforma', content: 'Aplicamos todo lo aprendido en un analisis integral:', code: "-- Dashboard ejecutivo: metricas clave de StreamCo\nWITH metricas AS (\n  SELECT\n    COUNT(*) AS total_usuarios,\n    SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos,\n    SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados,\n    SUM(ingreso_mensual) AS mrr_total,\n    ROUND(AVG(contenidos_vistos), 1) AS avg_engagement,\n    ROUND(AVG(CASE WHEN estado = 'Activo' THEN ingreso_mensual END), 0) AS arpu\n  FROM usuarios_streaming\n)\nSELECT\n  total_usuarios,\n  activos,\n  cancelados,\n  ROUND(cancelados * 100.0 / total_usuarios, 1) AS churn_pct,\n  mrr_total AS monthly_recurring_revenue,\n  avg_engagement AS avg_contenidos_vistos,\n  arpu AS avg_revenue_per_user\nFROM metricas;" },
          { type: 'tip', title: 'Tu camino desde aqui', content: 'Con los 8 modulos de este curso dominas SQL a nivel profesional. Los siguientes pasos:<br><br>1. <strong>Python + SQL:</strong> Usa pandas, SQLAlchemy para automatizar analisis<br>2. <strong>dbt:</strong> Framework para transformaciones SQL en produccion<br>3. <strong>Data Warehouse:</strong> Aprende Snowflake o BigQuery para datos masivos<br>4. <strong>BI Tools:</strong> Conecta SQL con Metabase, Looker o Superset<br>5. <strong>pgvector + RAG:</strong> Experimenta con busqueda semantica y LLMs<br><br>SQL es la habilidad #1 mas demandada en datos. Nunca dejara de ser relevante.' },
        ],
        exercises: [
          {
            id: 'e-8-3-1',
            instruction: 'Crea un dashboard ejecutivo completo de StreamCo usando CTEs: calcula total usuarios, MRR (Monthly Recurring Revenue = suma de ingresos mensuales de activos), ARPU (Average Revenue Per User = MRR / activos), churn rate, y avg engagement (contenidos vistos promedio de activos).',
            initialQuery: "-- Dashboard ejecutivo StreamCo\nWITH metricas AS (\n  -- Calcula las metricas clave\n)\nSELECT * FROM metricas;",
            hints: [
              "SUM(CASE WHEN estado = 'Activo' THEN ingreso_mensual ELSE 0 END) para MRR",
              'ARPU = MRR / cantidad de activos',
              "WITH metricas AS (SELECT COUNT(*) AS total_usuarios, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS usuarios_activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, SUM(CASE WHEN estado = 'Activo' THEN ingreso_mensual ELSE 0 END) AS mrr, ROUND(AVG(CASE WHEN estado = 'Activo' THEN contenidos_vistos END), 1) AS avg_engagement FROM usuarios_streaming) SELECT total_usuarios, usuarios_activos, cancelados, ROUND(cancelados * 100.0 / total_usuarios, 1) AS churn_rate, mrr, ROUND(mrr * 1.0 / usuarios_activos, 0) AS arpu, avg_engagement FROM metricas;",
            ],
            requiredKeywords: ['WITH', 'CASE', 'SUM', 'ROUND'],
            solutionQuery: "WITH metricas AS (SELECT COUNT(*) AS total_usuarios, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS usuarios_activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, SUM(CASE WHEN estado = 'Activo' THEN ingreso_mensual ELSE 0 END) AS mrr, ROUND(AVG(CASE WHEN estado = 'Activo' THEN contenidos_vistos END), 1) AS avg_engagement FROM usuarios_streaming) SELECT total_usuarios, usuarios_activos, cancelados, ROUND(cancelados * 100.0 / total_usuarios, 1) AS churn_rate, mrr, ROUND(mrr * 1.0 / usuarios_activos, 0) AS arpu, avg_engagement FROM metricas;",
          },
          {
            id: 'e-8-3-2',
            instruction: 'Analisis final: Combina todo lo aprendido. Usa CTEs y window functions para crear un ranking de usuarios por engagement (contenidos_vistos), mostrando nombre, plan, contenidos vistos, ingreso mensual, su ranking general, y su ranking dentro de su plan. Limita a los top 20.',
            initialQuery: '',
            hints: [
              'ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) para ranking general',
              'ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) para ranking por plan',
              "WITH ranking AS (SELECT nombre, plan_actual, contenidos_vistos, ingreso_mensual, ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) AS ranking_general, ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) AS ranking_plan FROM usuarios_streaming WHERE estado = 'Activo') SELECT * FROM ranking WHERE ranking_general <= 20 ORDER BY ranking_general;",
            ],
            requiredKeywords: ['WITH', 'OVER', 'ROW_NUMBER'],
            solutionQuery: "WITH ranking AS (SELECT nombre, plan_actual, contenidos_vistos, ingreso_mensual, ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) AS ranking_general, ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) AS ranking_plan FROM usuarios_streaming WHERE estado = 'Activo') SELECT * FROM ranking WHERE ranking_general <= 20 ORDER BY ranking_general;",
          },
        ],
      },
    ],
  },
];

export function getModule(slug: string): Module | undefined {
  return syllabus.find((m) => m.slug === slug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModule(moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { module: mod, lesson };
}

export function getAdjacentLessons(moduleSlug: string, lessonSlug: string) {
  const allLessons: { moduleSlug: string; lesson: { slug: string; title: string } }[] = [];
  for (const mod of syllabus) {
    for (const lesson of mod.lessons) {
      allLessons.push({ moduleSlug: mod.slug, lesson: { slug: lesson.slug, title: lesson.title } });
    }
  }
  const idx = allLessons.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.lesson.slug === lessonSlug
  );
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}
