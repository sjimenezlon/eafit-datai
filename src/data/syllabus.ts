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
  {
    id: 'modulo-05',
    slug: 'diseno-normalizacion',
    title: 'Diseno de BD y Normalizacion',
    description: 'Modelo ER, formas normales (1FN-3FN-BCNF), CREATE TABLE avanzado con restricciones.',
    icon: '&#x1F4D0;',
    weekRange: [11, 11],
    dataset: 'ecommerce',
    order: 5,
    lessons: [],
  },
  {
    id: 'modulo-06',
    slug: 'indices-optimizacion',
    title: 'Indices y Optimizacion de Queries',
    description: 'Indices, EXPLAIN, planes de ejecucion y buenas practicas de rendimiento.',
    icon: '&#x2699;',
    weekRange: [12, 12],
    dataset: 'finanzas',
    order: 6,
    lessons: [],
  },
  {
    id: 'modulo-07',
    slug: 'transacciones-seguridad',
    title: 'Transacciones, ACID y Seguridad',
    description: 'Control transaccional, niveles de aislamiento, GRANT/REVOKE y seguridad en BD.',
    icon: '&#x1F6E1;',
    weekRange: [13, 13],
    dataset: 'finanzas',
    order: 7,
    lessons: [],
  },
  {
    id: 'modulo-08',
    slug: 'data-science-sql',
    title: 'SQL para Ciencia de Datos',
    description: 'Analisis de cohortes, funnels, retention, A/B testing y metricas de producto con SQL.',
    icon: '&#x1F680;',
    weekRange: [14, 14],
    dataset: 'streaming',
    order: 8,
    lessons: [],
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
