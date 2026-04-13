import { Module } from '@/types/lesson';

export const syllabus: Module[] = [
  // ============================================================
  // MÓDULO 1: Subconsultas y Lógica Condicional (E-commerce)
  // ============================================================
  {
    id: 'modulo-01',
    slug: 'subconsultas-y-logica',
    title: 'Subconsultas y Lógica Condicional',
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
          { type: 'theory', title: 'Qué es una subconsulta?', content: 'Una <strong>subconsulta</strong> (subquery) es una consulta dentro de otra. Se ejecuta primero y su resultado alimenta la consulta exterior.<br><br><strong>Tipos principales:</strong><br>- <strong>Escalar:</strong> retorna un solo valor (una fila, una columna)<br>- <strong>De lista:</strong> retorna múltiples valores (una columna)<br>- <strong>De tabla:</strong> retorna una tabla completa (múltiples filas y columnas)<br>- <strong>Correlacionada:</strong> referencia datos de la consulta exterior' },
          { type: 'code-example', title: 'Subconsulta escalar: un solo valor', content: 'Encuentra productos con precio superior al promedio:', code: "-- Precio promedio de todos los productos\nSELECT ROUND(AVG(precio), 0) FROM productos;\n-- Resultado: ~2,086,000 COP\n\n-- Productos por encima del promedio\nSELECT nombre, precio\nFROM productos\nWHERE precio > (SELECT AVG(precio) FROM productos)\nORDER BY precio DESC;" },
          { type: 'code-example', title: 'Subconsulta de lista: múltiples valores', content: 'Clientes que han hecho pedidos mayores a 5 millones:', code: "SELECT nombre, email, tipo\nFROM clientes\nWHERE id IN (\n  SELECT DISTINCT cliente_id\n  FROM pedidos\n  WHERE total > 5000000\n)\nORDER BY nombre;" },
          { type: 'tip', title: 'IN vs EXISTS', content: '<code>IN</code> es simple y legible. <code>EXISTS</code> es más eficiente con tablas grandes porque se detiene al encontrar la primera coincidencia. En datasets pequeños la diferencia es mínima.' },
          { type: 'theory', title: 'Paso a paso: Construir una subconsulta', content: 'Vamos a construir una subconsulta paso a paso. El objetivo es encontrar los productos que cuestan más que el promedio de su categoría.<br><br><strong>Paso 1:</strong> Primero, entendemos los datos con un SELECT simple.<br><strong>Paso 2:</strong> Luego calculamos el valor que necesitamos (el promedio).<br><strong>Paso 3:</strong> Finalmente, usamos ese cálculo como subconsulta en el WHERE.' },
          { type: 'code-example', title: 'Paso 1: Explorar los datos', content: 'Siempre empieza con un SELECT simple para entender qué tienes:', code: "-- Paso 1: Ver los productos y sus precios\nSELECT nombre, precio, categoria_id\nFROM productos\nWHERE activo = 1\nORDER BY precio DESC\nLIMIT 10;" },
          { type: 'code-example', title: 'Paso 2: Calcular el valor de referencia', content: 'Ahora calculamos el precio promedio general:', code: "-- Paso 2: Cuál es el precio promedio?\nSELECT ROUND(AVG(precio), 0) AS precio_promedio\nFROM productos\nWHERE activo = 1;\n-- Resultado: un valor como ~2,086,000" },
          { type: 'code-example', title: 'Paso 3: Combinar con subconsulta', content: 'Usamos el resultado del Paso 2 como filtro en el WHERE:', code: "-- Paso 3: Productos por encima del promedio\nSELECT nombre, precio, categoria_id\nFROM productos\nWHERE activo = 1\n  AND precio > (\n    SELECT AVG(precio)\n    FROM productos\n    WHERE activo = 1\n  )\nORDER BY precio DESC;" },
          { type: 'tip', title: 'Regla de oro para subconsultas', content: '<strong>Siempre construye de adentro hacia afuera.</strong> Primero escribe y prueba la subconsulta sola. Cuando funcione, envuélvela en la consulta exterior. Esto evita errores y te ayuda a entender cada parte.' },
        ],
        exercises: [
          {
            id: 'e-1-1-1',
            instruction: 'Encuentra todos los productos cuyo precio sea mayor al precio promedio de su propia categoría. Muestra nombre, precio y categoria_id. (Pista: necesitas una subconsulta correlacionada)',
            initialQuery: '-- Productos por encima del promedio de su categoría\n',
            hints: [
              'Necesitas comparar el precio de cada producto con el AVG de su categoría',
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
              'Necesitas encontrar clientes cuyo id NO está en la tabla pedidos',
              'WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos)',
              'SELECT nombre, email, fecha_registro FROM clientes WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos) ORDER BY fecha_registro;',
            ],
            requiredKeywords: ['SELECT', 'NOT'],
            solutionQuery: 'SELECT nombre, email, fecha_registro FROM clientes WHERE id NOT IN (SELECT DISTINCT cliente_id FROM pedidos) ORDER BY fecha_registro;',
          },
          {
            id: 'e-1-1-3',
            instruction: 'Encuentra los productos que tienen una calificación promedio de reseñas superior al promedio general de calificaciones. Muestra el nombre del producto y su calificación promedio (redondeada a 1 decimal). Ordena de mayor a menor.',
            initialQuery: '-- Productos con reseñas por encima del promedio general\n',
            hints: [
              'Necesitas calcular el AVG(calificacion) por producto y compararlo con el AVG(calificacion) general de la tabla reseñas',
              'Usa GROUP BY producto_id y HAVING AVG(calificacion) > (SELECT AVG(calificacion) FROM resenas)',
              "SELECT p.nombre, ROUND(AVG(r.calificacion), 1) AS calificacion_promedio FROM resenas r JOIN productos p ON r.producto_id = p.id GROUP BY p.id, p.nombre HAVING AVG(r.calificacion) > (SELECT AVG(calificacion) FROM resenas) ORDER BY calificacion_promedio DESC;",
            ],
            requiredKeywords: ['SELECT', 'AVG', 'HAVING'],
            solutionQuery: "SELECT p.nombre, ROUND(AVG(r.calificacion), 1) AS calificacion_promedio FROM resenas r JOIN productos p ON r.producto_id = p.id GROUP BY p.id, p.nombre HAVING AVG(r.calificacion) > (SELECT AVG(calificacion) FROM resenas) ORDER BY calificacion_promedio DESC;",
          },
          {
            id: 'e-1-1-4',
            instruction: 'Encuentra los proveedores que suministran al menos un producto cuyo precio sea mayor a 3,000,000. Muestra nombre del proveedor, país y calificación. Usa una subconsulta con IN.',
            initialQuery: '',
            hints: [
              'La subconsulta debe buscar proveedor_id en productos WHERE precio > 3000000',
              'SELECT nombre, pais, calificacion FROM proveedores WHERE id IN (SELECT ...)',
              "SELECT nombre, pais, calificacion FROM proveedores WHERE id IN (SELECT DISTINCT proveedor_id FROM productos WHERE precio > 3000000) ORDER BY calificacion DESC;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'IN'],
            solutionQuery: "SELECT nombre, pais, calificacion FROM proveedores WHERE id IN (SELECT DISTINCT proveedor_id FROM productos WHERE precio > 3000000) ORDER BY calificacion DESC;",
          },
        ],
      },
      {
        id: 'l-1-2', slug: 'subconsultas-en-from',
        title: 'Subconsultas en FROM (Tablas Derivadas)',
        description: 'Usa subconsultas como tablas temporales. Caso: análisis de ventas por categoría.',
        difficulty: 'intermedio', estimatedMinutes: 25,
        content: [
          { type: 'theory', title: 'Tablas derivadas', content: 'Puedes usar una subconsulta en el <code>FROM</code> como si fuera una tabla. Esto es útil para:<br>- Calcular valores intermedios y luego filtrar sobre ellos<br>- Crear resúmenes que alimentan otra consulta<br>- Evitar repetir expresiones complejas<br><br><strong>Importante:</strong> La subconsulta en FROM DEBE tener un alias.' },
          { type: 'code-example', title: 'Análisis de ventas por categoría', content: '', code: "-- Ventas totales por categoria\nSELECT\n  c.nombre AS categoria,\n  resumen.total_vendido,\n  resumen.num_productos_vendidos\nFROM (\n  SELECT\n    p.categoria_id,\n    SUM(dp.subtotal) AS total_vendido,\n    COUNT(DISTINCT dp.producto_id) AS num_productos_vendidos\n  FROM detalle_pedidos dp\n  JOIN productos p ON dp.producto_id = p.id\n  GROUP BY p.categoria_id\n) resumen\nJOIN categorias c ON resumen.categoria_id = c.id\nORDER BY resumen.total_vendido DESC;" },
          { type: 'theory', title: 'Paso a paso: Construir una tabla derivada', content: 'Las tablas derivadas se construyen de adentro hacia afuera. Vamos a crear un reporte que muestre los clientes con más pedidos y su gasto total.<br><br><strong>Paso 1:</strong> Crear el resumen interno (la subconsulta).<br><strong>Paso 2:</strong> Verificar que la subconsulta funciona sola.<br><strong>Paso 3:</strong> Usarla como tabla en el FROM de la consulta exterior.' },
          { type: 'code-example', title: 'Paso 1: Crear el resumen interno', content: 'Primero, calculamos las métricas que necesitamos por cliente:', code: "-- Paso 1: Resumen de pedidos por cliente (esto será nuestra tabla derivada)\nSELECT\n  cliente_id,\n  COUNT(*) AS num_pedidos,\n  SUM(total) AS gasto_total,\n  ROUND(AVG(total), 0) AS ticket_promedio\nFROM pedidos\nWHERE estado != 'Cancelado'\nGROUP BY cliente_id;" },
          { type: 'code-example', title: 'Paso 2: Envolver en consulta exterior', content: 'Ahora usamos ese resultado como tabla y hacemos JOIN con clientes para obtener nombres:', code: "-- Paso 2: Usar la subconsulta como tabla derivada\nSELECT\n  cl.nombre,\n  cl.ciudad,\n  resumen.num_pedidos,\n  resumen.gasto_total,\n  resumen.ticket_promedio\nFROM (\n  SELECT\n    cliente_id,\n    COUNT(*) AS num_pedidos,\n    SUM(total) AS gasto_total,\n    ROUND(AVG(total), 0) AS ticket_promedio\n  FROM pedidos\n  WHERE estado != 'Cancelado'\n  GROUP BY cliente_id\n) resumen\nJOIN clientes cl ON resumen.cliente_id = cl.id\nORDER BY resumen.gasto_total DESC\nLIMIT 10;" },
          { type: 'warning', title: 'No olvides el alias', content: 'Toda subconsulta en el FROM <strong>necesita un alias</strong>. Sin alias obtienes un error de sintaxis. El alias es el nombre que le das a la tabla derivada: <code>FROM (...) <strong>resumen</strong></code>.' },
        ],
        exercises: [
          {
            id: 'e-1-2-1',
            instruction: 'Calcula el ticket promedio (total promedio por pedido) de cada ciudad. Muestra ciudad_envio y ticket_promedio redondeado. Solo incluye ciudades con más de 2 pedidos.',
            initialQuery: '',
            hints: [
              'Primero calcula el total por pedido por ciudad, luego promedia',
              'Puedes hacerlo con GROUP BY directo: GROUP BY ciudad_envio HAVING COUNT(*) > 2',
              "SELECT ciudad_envio, ROUND(AVG(total), 0) AS ticket_promedio, COUNT(*) AS num_pedidos FROM pedidos WHERE estado != 'Cancelado' GROUP BY ciudad_envio HAVING COUNT(*) > 2 ORDER BY ticket_promedio DESC;",
            ],
            requiredKeywords: ['AVG', 'GROUP BY', 'HAVING'],
            solutionQuery: "SELECT ciudad_envio, ROUND(AVG(total), 0) AS ticket_promedio, COUNT(*) AS num_pedidos FROM pedidos WHERE estado != 'Cancelado' GROUP BY ciudad_envio HAVING COUNT(*) > 2 ORDER BY ticket_promedio DESC;",
          },
          {
            id: 'e-1-2-2',
            instruction: 'Usando una tabla derivada, encuentra el producto más vendido (mayor cantidad total) de cada categoría. Muestra el nombre de la categoría, nombre del producto y la cantidad total vendida. (Pista: primero calcula las ventas por producto, luego encuentra el máximo por categoría).',
            initialQuery: '-- Producto top por categoría usando tabla derivada\n',
            hints: [
              'La tabla derivada debe calcular SUM(dp.cantidad) agrupada por producto_id y categoria_id',
              'Luego necesitas filtrar para quedarte solo con el producto de mayor venta por categoría. Puedes usar otra subconsulta o simplemente ordenar y analizar.',
              "SELECT c.nombre AS categoria, p.nombre AS producto, ventas.total_vendido FROM (SELECT p.categoria_id, dp.producto_id, SUM(dp.cantidad) AS total_vendido FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id GROUP BY p.categoria_id, dp.producto_id) ventas JOIN productos p ON ventas.producto_id = p.id JOIN categorias c ON ventas.categoria_id = c.id WHERE ventas.total_vendido = (SELECT MAX(v2.total_vendido) FROM (SELECT p2.categoria_id, dp2.producto_id, SUM(dp2.cantidad) AS total_vendido FROM detalle_pedidos dp2 JOIN productos p2 ON dp2.producto_id = p2.id GROUP BY p2.categoria_id, dp2.producto_id) v2 WHERE v2.categoria_id = ventas.categoria_id) ORDER BY ventas.total_vendido DESC;",
            ],
            requiredKeywords: ['SELECT', 'FROM', 'SUM', 'GROUP BY'],
            solutionQuery: "SELECT c.nombre AS categoria, p.nombre AS producto, ventas.total_vendido FROM (SELECT p.categoria_id, dp.producto_id, SUM(dp.cantidad) AS total_vendido FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id GROUP BY p.categoria_id, dp.producto_id) ventas JOIN productos p ON ventas.producto_id = p.id JOIN categorias c ON ventas.categoria_id = c.id WHERE ventas.total_vendido = (SELECT MAX(v2.total_vendido) FROM (SELECT p2.categoria_id, dp2.producto_id, SUM(dp2.cantidad) AS total_vendido FROM detalle_pedidos dp2 JOIN productos p2 ON dp2.producto_id = p2.id GROUP BY p2.categoria_id, dp2.producto_id) v2 WHERE v2.categoria_id = ventas.categoria_id) ORDER BY ventas.total_vendido DESC;",
          },
          {
            id: 'e-1-2-3',
            instruction: 'Crea un reporte que muestre por cada proveedor: nombre, número de productos activos, precio promedio de sus productos, y el total de unidades vendidas de sus productos. Usa una tabla derivada para las ventas. Ordena por total de unidades vendidas descendente.',
            initialQuery: '',
            hints: [
              'La tabla derivada debe calcular SUM(cantidad) agrupada por producto_id desde detalle_pedidos',
              'Luego haz JOIN con productos y proveedores, usando GROUP BY proveedor',
              "SELECT pv.nombre AS proveedor, COUNT(DISTINCT p.id) AS productos_activos, ROUND(AVG(p.precio), 0) AS precio_promedio, COALESCE(SUM(ventas.unidades), 0) AS total_unidades_vendidas FROM proveedores pv JOIN productos p ON pv.id = p.proveedor_id AND p.activo = 1 LEFT JOIN (SELECT producto_id, SUM(cantidad) AS unidades FROM detalle_pedidos GROUP BY producto_id) ventas ON p.id = ventas.producto_id GROUP BY pv.id, pv.nombre ORDER BY total_unidades_vendidas DESC;",
            ],
            requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'GROUP BY'],
            solutionQuery: "SELECT pv.nombre AS proveedor, COUNT(DISTINCT p.id) AS productos_activos, ROUND(AVG(p.precio), 0) AS precio_promedio, COALESCE(SUM(ventas.unidades), 0) AS total_unidades_vendidas FROM proveedores pv JOIN productos p ON pv.id = p.proveedor_id AND p.activo = 1 LEFT JOIN (SELECT producto_id, SUM(cantidad) AS unidades FROM detalle_pedidos GROUP BY producto_id) ventas ON p.id = ventas.producto_id GROUP BY pv.id, pv.nombre ORDER BY total_unidades_vendidas DESC;",
          },
        ],
      },
      {
        id: 'l-1-3', slug: 'case-when',
        title: 'CASE WHEN: Lógica Condicional en SQL',
        description: 'Crea columnas calculadas con lógica if/else. Caso: segmentación de clientes y margen de productos.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'CASE WHEN', content: '<code>CASE WHEN</code> funciona como un if/else dentro de SQL. Puedes usarlo en SELECT, WHERE, ORDER BY y GROUP BY.<br><br><strong>Sintaxis:</strong><pre>CASE\n  WHEN condicion1 THEN resultado1\n  WHEN condicion2 THEN resultado2\n  ELSE resultado_default\nEND</pre>' },
          { type: 'code-example', title: 'Segmentar clientes por gasto', content: '', code: "SELECT\n  nombre,\n  total_compras,\n  CASE\n    WHEN total_compras >= 15000000 THEN 'Whale (>15M)'\n    WHEN total_compras >= 5000000 THEN 'Alto Valor (5-15M)'\n    WHEN total_compras >= 1000000 THEN 'Medio (1-5M)'\n    ELSE 'Bajo (<1M)'\n  END AS segmento\nFROM clientes\nORDER BY total_compras DESC;" },
          { type: 'code-example', title: 'Calcular margen por producto', content: '', code: "SELECT\n  nombre,\n  precio,\n  costo,\n  ROUND((precio - costo) * 100.0 / precio, 1) AS margen_pct,\n  CASE\n    WHEN (precio - costo) * 100.0 / precio >= 40 THEN 'Excelente'\n    WHEN (precio - costo) * 100.0 / precio >= 25 THEN 'Bueno'\n    WHEN (precio - costo) * 100.0 / precio >= 15 THEN 'Normal'\n    ELSE 'Bajo'\n  END AS calidad_margen\nFROM productos\nWHERE activo = 1\nORDER BY margen_pct DESC;" },
          { type: 'tip', title: 'Pensar como científico de datos', content: 'CASE WHEN es la herramienta fundamental para <strong>segmentación</strong>. Los científicos de datos segmentan clientes, productos, transacciones para encontrar patrones. Siempre pregúntate: qué categorías tienen sentido para el negocio?' },
          { type: 'theory', title: 'Paso a paso: Segmentar clientes para un reporte', content: 'Vamos a construir un reporte de negocio paso a paso. El objetivo: segmentar clientes por frecuencia de compra y valor, creando un análisis RFM simplificado.<br><br><strong>Paso 1:</strong> Obtener datos base del cliente.<br><strong>Paso 2:</strong> Agregar la lógica CASE WHEN para segmentar.<br><strong>Paso 3:</strong> Combinar CASE WHEN con GROUP BY para contar por segmento.' },
          { type: 'code-example', title: 'Paso 1: Datos base', content: 'Primero veamos los datos que tenemos de clientes:', code: "-- Paso 1: Explorar datos de clientes\nSELECT nombre, tipo, total_compras, puntos_fidelidad\nFROM clientes\nORDER BY total_compras DESC\nLIMIT 10;" },
          { type: 'code-example', title: 'Paso 2: Agregar segmentación', content: 'Ahora creamos los segmentos basados en total_compras y tipo:', code: "-- Paso 2: Segmentar cada cliente\nSELECT\n  nombre,\n  tipo,\n  total_compras,\n  CASE\n    WHEN tipo = 'VIP' AND total_compras >= 10000000 THEN 'Champion'\n    WHEN tipo IN ('VIP', 'Premium') THEN 'Leal'\n    WHEN total_compras >= 5000000 THEN 'Potencial Alto'\n    WHEN total_compras >= 1000000 THEN 'Promesa'\n    ELSE 'Nuevo/Bajo'\n  END AS segmento_rfm\nFROM clientes\nORDER BY total_compras DESC;" },
          { type: 'code-example', title: 'Paso 3: Reporte agrupado', content: 'Finalmente, contamos cuántos clientes hay en cada segmento:', code: "-- Paso 3: Reporte de distribución por segmento\nSELECT\n  CASE\n    WHEN tipo = 'VIP' AND total_compras >= 10000000 THEN 'Champion'\n    WHEN tipo IN ('VIP', 'Premium') THEN 'Leal'\n    WHEN total_compras >= 5000000 THEN 'Potencial Alto'\n    WHEN total_compras >= 1000000 THEN 'Promesa'\n    ELSE 'Nuevo/Bajo'\n  END AS segmento,\n  COUNT(*) AS num_clientes,\n  ROUND(AVG(total_compras), 0) AS compra_promedio,\n  SUM(total_compras) AS compras_totales\nFROM clientes\nGROUP BY segmento\nORDER BY compras_totales DESC;" },
          { type: 'tip', title: 'CASE WHEN + GROUP BY = reportes poderosos', content: 'Combinar CASE WHEN con GROUP BY es una de las técnicas más usadas en análisis de datos. Te permite crear <strong>reportes de distribución</strong> personalizados: cuántos clientes, productos o pedidos caen en cada categoría que tú defines.' },
        ],
        exercises: [
          {
            id: 'e-1-3-1',
            instruction: 'Clasifica cada pedido según su total: "Micro" (<500K), "Pequeno" (500K-2M), "Mediano" (2M-5M), "Grande" (5M-10M), "Mega" (>10M). Muestra id del pedido, total, y la clasificacion. Excluye cancelados.',
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
            instruction: 'Cuenta cuántos productos hay en cada rango de precio: "Economico" (<500K), "Gama Media" (500K-2M), "Premium" (2M-5M), "Lujo" (>5M). Muestra el rango y el conteo.',
            initialQuery: '',
            hints: [
              'Usa CASE WHEN dentro de GROUP BY o como columna y luego agrupa',
              'GROUP BY la expresion CASE WHEN completa',
              "SELECT CASE WHEN precio > 5000000 THEN 'Lujo' WHEN precio > 2000000 THEN 'Premium' WHEN precio > 500000 THEN 'Gama Media' ELSE 'Economico' END AS rango, COUNT(*) AS total FROM productos GROUP BY rango ORDER BY MIN(precio) DESC;",
            ],
            requiredKeywords: ['CASE', 'COUNT', 'GROUP BY'],
            solutionQuery: "SELECT CASE WHEN precio > 5000000 THEN 'Lujo' WHEN precio > 2000000 THEN 'Premium' WHEN precio > 500000 THEN 'Gama Media' ELSE 'Economico' END AS rango, COUNT(*) AS total FROM productos GROUP BY rango ORDER BY MIN(precio) DESC;",
          },
          {
            id: 'e-1-3-3',
            instruction: 'Crea un reporte de rendimiento por método de pago. Para cada metodo_pago de la tabla pedidos, muestra: el método, número de pedidos, total vendido, y una columna "rendimiento" que diga "Excelente" si el promedio por pedido > 5M, "Bueno" si > 2M, o "Regular" en otro caso. Excluye pedidos cancelados.',
            initialQuery: '-- Reporte de rendimiento por método de pago\n',
            hints: [
              'Usa GROUP BY metodo_pago y aplica CASE WHEN sobre AVG(total)',
              'Puedes usar CASE WHEN AVG(total) > 5000000 THEN ... dentro del SELECT',
              "SELECT metodo_pago, COUNT(*) AS num_pedidos, SUM(total) AS total_vendido, CASE WHEN AVG(total) > 5000000 THEN 'Excelente' WHEN AVG(total) > 2000000 THEN 'Bueno' ELSE 'Regular' END AS rendimiento FROM pedidos WHERE estado != 'Cancelado' GROUP BY metodo_pago ORDER BY total_vendido DESC;",
            ],
            requiredKeywords: ['CASE', 'WHEN', 'GROUP BY', 'AVG'],
            solutionQuery: "SELECT metodo_pago, COUNT(*) AS num_pedidos, SUM(total) AS total_vendido, CASE WHEN AVG(total) > 5000000 THEN 'Excelente' WHEN AVG(total) > 2000000 THEN 'Bueno' ELSE 'Regular' END AS rendimiento FROM pedidos WHERE estado != 'Cancelado' GROUP BY metodo_pago ORDER BY total_vendido DESC;",
          },
          {
            id: 'e-1-3-4',
            instruction: 'Crea un resumen de inventario que clasifique cada producto por nivel de stock: "Critico" (stock < 5), "Bajo" (5-15), "Normal" (16-30), "Alto" (>30). Muestra el nivel, cantidad de productos en ese nivel, y el valor total de inventario (precio * stock) de ese grupo. Solo productos activos.',
            initialQuery: '',
            hints: [
              'Usa CASE WHEN sobre stock para crear los niveles y luego GROUP BY',
              'El valor de inventario es SUM(precio * stock) por cada grupo',
              "SELECT CASE WHEN stock < 5 THEN 'Critico' WHEN stock <= 15 THEN 'Bajo' WHEN stock <= 30 THEN 'Normal' ELSE 'Alto' END AS nivel_stock, COUNT(*) AS num_productos, SUM(precio * stock) AS valor_inventario FROM productos WHERE activo = 1 GROUP BY nivel_stock ORDER BY MIN(stock);",
            ],
            requiredKeywords: ['CASE', 'WHEN', 'GROUP BY', 'SUM'],
            solutionQuery: "SELECT CASE WHEN stock < 5 THEN 'Critico' WHEN stock <= 15 THEN 'Bajo' WHEN stock <= 30 THEN 'Normal' ELSE 'Alto' END AS nivel_stock, COUNT(*) AS num_productos, SUM(precio * stock) AS valor_inventario FROM productos WHERE activo = 1 GROUP BY nivel_stock ORDER BY MIN(stock);",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MÓDULO 2: Manipulación de Datos (DML) con E-commerce
  // ============================================================
  {
    id: 'modulo-02',
    slug: 'manipulacion-datos',
    title: 'INSERT, UPDATE, DELETE y Vistas',
    description: 'Modifica datos, crea vistas y administra un e-commerce real. Caso: gestión de inventario y pedidos.',
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
          { type: 'theory', title: 'Manipulación de datos (DML)', content: '<strong>INSERT INTO</strong> agrega nuevas filas:<br><code>INSERT INTO tabla (col1, col2) VALUES (val1, val2);</code><br><br><strong>UPDATE</strong> modifica filas existentes:<br><code>UPDATE tabla SET col1 = val1 WHERE condición;</code><br><br><strong>DELETE</strong> elimina filas:<br><code>DELETE FROM tabla WHERE condición;</code><br><br><strong>ATENCIÓN:</strong> UPDATE y DELETE sin WHERE afectan TODAS las filas. Siempre verifica tu WHERE antes de ejecutar.' },
          { type: 'warning', title: 'Regla de oro', content: 'Siempre escribe el WHERE primero. Antes de ejecutar un UPDATE o DELETE, haz un SELECT con el mismo WHERE para verificar que filas vas a afectar. En producción, usa transacciones (BEGIN/COMMIT).' },
          { type: 'code-example', title: 'Ejemplos prácticos', content: '', code: "-- Agregar un nuevo producto\nINSERT INTO productos (id, nombre, categoria_id, proveedor_id, precio, costo, stock, sku, activo, fecha_creacion)\nVALUES (31, 'Tablet Samsung Galaxy Tab S9', 2, 2, 2899000, 2199000, 15, 'SM-TABS9', 1, '2025-01-25');\n\n-- Actualizar stock después de una venta\nUPDATE productos SET stock = stock - 1 WHERE id = 1;\n\n-- Desactivar productos sin stock\nUPDATE productos SET activo = 0 WHERE stock = 0;\n\n-- Cancelar pedidos pendientes antiguos\nUPDATE pedidos SET estado = 'Cancelado'\nWHERE estado = 'Pendiente' AND fecha < '2024-12-01';" },
          { type: 'theory', title: 'Paso a paso: Verificar antes de modificar', content: 'La regla más importante del DML: <strong>siempre verifica con SELECT antes de ejecutar UPDATE o DELETE</strong>. Veamos el flujo completo para actualizar precios de una categoría.' },
          { type: 'code-example', title: 'Paso 1: SELECT de verificación', content: 'Primero veamos qué filas vamos a afectar:', code: "-- Paso 1: SIEMPRE haz SELECT primero con el mismo WHERE\nSELECT id, nombre, precio, costo\nFROM productos\nWHERE categoria_id = 1 AND activo = 1;\n-- Revisa: son estas las filas que quieres modificar?" },
          { type: 'code-example', title: 'Paso 2: Ejecutar UPDATE', content: 'Solo cuando estemos seguros del WHERE, ejecutamos el UPDATE:', code: "-- Paso 2: Subir precio 15% a productos de categoria 1\nUPDATE productos\nSET precio = ROUND(precio * 1.15, 0)\nWHERE categoria_id = 1 AND activo = 1;" },
          { type: 'code-example', title: 'Paso 3: Verificar resultado', content: 'Después del UPDATE, verificamos que los cambios sean correctos:', code: "-- Paso 3: Verificar que el cambio se aplicó bien\nSELECT id, nombre, precio, costo,\n  ROUND((precio - costo) * 100.0 / precio, 1) AS nuevo_margen_pct\nFROM productos\nWHERE categoria_id = 1 AND activo = 1;" },
          { type: 'tip', title: 'Flujo seguro: SELECT -> UPDATE -> SELECT', content: 'En producción, los profesionales siempre siguen este flujo:<br>1. <code>SELECT</code> con el WHERE para ver qué filas se afectarán<br>2. <code>UPDATE/DELETE</code> con el mismo WHERE<br>3. <code>SELECT</code> de nuevo para confirmar los cambios<br><br>Mejor aun: usa <code>BEGIN</code> y <code>COMMIT</code> (transacciones) para poder hacer <code>ROLLBACK</code> si algo sale mal.' },
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
            instruction: 'Actualiza todos los productos de la categoría 8 (Accesorios) subiendo el precio un 10%. Luego muestra los productos de esa categoría con su nuevo precio.',
            initialQuery: '',
            hints: [
              'UPDATE productos SET precio = precio * 1.10 WHERE categoria_id = 8',
              'Después haz SELECT para verificar',
              "UPDATE productos SET precio = ROUND(precio * 1.10, 0) WHERE categoria_id = 8; SELECT nombre, precio FROM productos WHERE categoria_id = 8;",
            ],
            requiredKeywords: ['UPDATE', 'SET', 'WHERE'],
            solutionQuery: "UPDATE productos SET precio = ROUND(precio * 1.10, 0) WHERE categoria_id = 8; SELECT nombre, precio FROM productos WHERE categoria_id = 8;",
          },
          {
            id: 'e-2-1-3',
            instruction: 'Gestiona el sistema de cupones: Inserta un nuevo cupón con id=11, código="EAFIT2025", tipo="porcentaje", valor=15, minimo_compra=500000, fecha_inicio="2025-03-01", fecha_fin="2025-06-30", usos_maximos=100, usos_actuales=0, activo=1. Luego muestra todos los cupones activos ordenados por fecha_fin.',
            initialQuery: '-- Gestión de cupones\n',
            hints: [
              'INSERT INTO cupones (id, codigo, tipo, valor, ...) VALUES (...)',
              'Después haz SELECT * FROM cupones WHERE activo = 1 ORDER BY fecha_fin',
              "INSERT INTO cupones (id, codigo, tipo, valor, minimo_compra, fecha_inicio, fecha_fin, usos_maximos, usos_actuales, activo) VALUES (11, 'EAFIT2025', 'porcentaje', 15, 500000, '2025-03-01', '2025-06-30', 100, 0, 1); SELECT * FROM cupones WHERE activo = 1 ORDER BY fecha_fin;",
            ],
            requiredKeywords: ['INSERT', 'INTO', 'VALUES', 'SELECT'],
            solutionQuery: "INSERT INTO cupones (id, codigo, tipo, valor, minimo_compra, fecha_inicio, fecha_fin, usos_maximos, usos_actuales, activo) VALUES (11, 'EAFIT2025', 'porcentaje', 15, 500000, '2025-03-01', '2025-06-30', 100, 0, 1); SELECT * FROM cupones WHERE activo = 1 ORDER BY fecha_fin;",
          },
          {
            id: 'e-2-1-4',
            instruction: 'Simula una devolución: Cambia el estado del pedido con id=3 a "Devuelto". Luego incrementa el stock de cada producto de ese pedido según la cantidad comprada (usa los datos de detalle_pedidos). Finalmente muestra el pedido y los productos afectados con su nuevo stock.',
            initialQuery: '',
            hints: [
              'Primero UPDATE pedidos SET estado para el pedido 3. Luego necesitas UPDATE productos usando datos de detalle_pedidos.',
              'Para actualizar stock: UPDATE productos SET stock = stock + (SELECT cantidad FROM detalle_pedidos WHERE pedido_id = 3 AND producto_id = productos.id) WHERE id IN (SELECT producto_id FROM detalle_pedidos WHERE pedido_id = 3)',
              "UPDATE pedidos SET estado = 'Devuelto' WHERE id = 3; UPDATE productos SET stock = stock + (SELECT cantidad FROM detalle_pedidos WHERE pedido_id = 3 AND producto_id = productos.id) WHERE id IN (SELECT producto_id FROM detalle_pedidos WHERE pedido_id = 3); SELECT p.id, p.nombre, p.stock, dp.cantidad AS cantidad_devuelta FROM productos p JOIN detalle_pedidos dp ON p.id = dp.producto_id WHERE dp.pedido_id = 3;",
            ],
            requiredKeywords: ['UPDATE', 'SET', 'WHERE'],
            solutionQuery: "UPDATE pedidos SET estado = 'Devuelto' WHERE id = 3; UPDATE productos SET stock = stock + (SELECT cantidad FROM detalle_pedidos WHERE pedido_id = 3 AND producto_id = productos.id) WHERE id IN (SELECT producto_id FROM detalle_pedidos WHERE pedido_id = 3); SELECT p.id, p.nombre, p.stock, dp.cantidad AS cantidad_devuelta FROM productos p JOIN detalle_pedidos dp ON p.id = dp.producto_id WHERE dp.pedido_id = 3;",
          },
        ],
      },
      {
        id: 'l-2-2', slug: 'vistas',
        title: 'CREATE VIEW: Consultas Reutilizables',
        description: 'Crea vistas para simplificar consultas complejas. Caso: dashboard de ventas.',
        difficulty: 'intermedio', estimatedMinutes: 25,
        content: [
          { type: 'theory', title: 'Qué es una Vista?', content: 'Una <strong>vista (VIEW)</strong> es una consulta guardada con nombre. No almacena datos; cada vez que la consultas, ejecuta la consulta subyacente.<br><br><strong>Usos:</strong><br>- Simplificar consultas complejas que se repiten<br>- Ocultar complejidad (JOINs, cálculos)<br>- Seguridad: dar acceso a datos filtrados<br>- Crear "tablas virtuales" para reportes' },
          { type: 'code-example', title: 'Vista de resumen de ventas', content: '', code: "-- Crear vista de ventas por producto\nCREATE VIEW vista_ventas_producto AS\nSELECT\n  p.nombre AS producto,\n  c.nombre AS categoria,\n  COUNT(dp.id) AS veces_vendido,\n  SUM(dp.cantidad) AS unidades_vendidas,\n  SUM(dp.subtotal) AS ingresos_totales,\n  ROUND(AVG(dp.precio_unitario), 0) AS precio_promedio_venta\nFROM detalle_pedidos dp\nJOIN productos p ON dp.producto_id = p.id\nJOIN categorias c ON p.categoria_id = c.id\nGROUP BY p.id, p.nombre, c.nombre;\n\n-- Ahora usarla es simple:\nSELECT * FROM vista_ventas_producto\nORDER BY ingresos_totales DESC\nLIMIT 10;" },
          { type: 'theory', title: 'Paso a paso: Crear y usar una vista de dashboard', content: 'Vamos a construir una vista de dashboard de ventas paso a paso. Primero creamos la consulta, la probamos, y luego la convertimos en vista.<br><br><strong>Paso 1:</strong> Escribir la consulta compleja.<br><strong>Paso 2:</strong> Verificar que devuelve los datos correctos.<br><strong>Paso 3:</strong> Envolverla en CREATE VIEW.<br><strong>Paso 4:</strong> Usarla como si fuera una tabla.' },
          { type: 'code-example', title: 'Paso 1-2: Escribir y probar la consulta', content: 'Primero escribimos la consulta que queremos guardar como vista:', code: "-- Paso 1-2: La consulta que sera nuestra vista\nSELECT\n  pe.id AS pedido_id,\n  cl.nombre AS cliente,\n  cl.ciudad,\n  pe.fecha,\n  pe.estado,\n  pe.metodo_pago,\n  pe.total,\n  COUNT(dp.id) AS num_items,\n  SUM(dp.cantidad) AS unidades_totales\nFROM pedidos pe\nJOIN clientes cl ON pe.cliente_id = cl.id\nJOIN detalle_pedidos dp ON pe.id = dp.pedido_id\nGROUP BY pe.id, cl.nombre, cl.ciudad, pe.fecha, pe.estado, pe.metodo_pago, pe.total\nORDER BY pe.fecha DESC\nLIMIT 10;\n-- Verificamos: se ven bien los datos?" },
          { type: 'code-example', title: 'Paso 3-4: Crear y usar la vista', content: 'Ahora convertimos la consulta en una vista reutilizable:', code: "-- Paso 3: Crear la vista (quitamos ORDER BY y LIMIT)\nCREATE VIEW vista_dashboard_pedidos AS\nSELECT\n  pe.id AS pedido_id,\n  cl.nombre AS cliente,\n  cl.ciudad,\n  pe.fecha,\n  pe.estado,\n  pe.metodo_pago,\n  pe.total,\n  COUNT(dp.id) AS num_items,\n  SUM(dp.cantidad) AS unidades_totales\nFROM pedidos pe\nJOIN clientes cl ON pe.cliente_id = cl.id\nJOIN detalle_pedidos dp ON pe.id = dp.pedido_id\nGROUP BY pe.id, cl.nombre, cl.ciudad, pe.fecha,\n  pe.estado, pe.metodo_pago, pe.total;\n\n-- Paso 4: Ahora usarla es super simple!\nSELECT * FROM vista_dashboard_pedidos\nWHERE estado = 'Entregado'\nORDER BY total DESC\nLIMIT 5;" },
          { type: 'tip', title: 'Vistas como capa de abstracción', content: 'Las vistas son perfectas para:<br>- <strong>Dashboard:</strong> crea una vista con los JOINs complejos y luego filtra fácilmente<br>- <strong>Seguridad:</strong> comparte la vista (sin datos sensibles) en vez de la tabla completa<br>- <strong>Mantenimiento:</strong> si cambia la lógica, solo actualizas la vista, no cada consulta' },
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
          {
            id: 'e-2-2-2',
            instruction: 'Crea una vista llamada vista_dashboard_ventas que muestre por cada categoría: nombre de la categoría, número de productos vendidos (distintos), total de ingresos, y calificación promedio de reseñas. Luego consulta la vista ordenada por ingresos descendente.',
            initialQuery: '-- Vista de dashboard de ventas por categoría\n',
            hints: [
              'Necesitas JOIN entre categorías, productos, detalle_pedidos y reseñas. Usa LEFT JOIN para reseñas porque no todos los productos tienen.',
              'CREATE VIEW vista_dashboard_ventas AS SELECT c.nombre, COUNT(DISTINCT dp.producto_id), SUM(dp.subtotal), AVG(r.calificacion) ...',
              "CREATE VIEW vista_dashboard_ventas AS SELECT c.nombre AS categoria, COUNT(DISTINCT dp.producto_id) AS productos_vendidos, SUM(dp.subtotal) AS ingresos_totales, ROUND(AVG(r.calificacion), 1) AS calificacion_promedio FROM categorias c JOIN productos p ON c.id = p.categoria_id LEFT JOIN detalle_pedidos dp ON p.id = dp.producto_id LEFT JOIN resenas r ON p.id = r.producto_id GROUP BY c.id, c.nombre; SELECT * FROM vista_dashboard_ventas ORDER BY ingresos_totales DESC;",
            ],
            requiredKeywords: ['CREATE', 'VIEW', 'JOIN', 'GROUP BY'],
            solutionQuery: "CREATE VIEW vista_dashboard_ventas AS SELECT c.nombre AS categoria, COUNT(DISTINCT dp.producto_id) AS productos_vendidos, SUM(dp.subtotal) AS ingresos_totales, ROUND(AVG(r.calificacion), 1) AS calificacion_promedio FROM categorias c JOIN productos p ON c.id = p.categoria_id LEFT JOIN detalle_pedidos dp ON p.id = dp.producto_id LEFT JOIN resenas r ON p.id = r.producto_id GROUP BY c.id, c.nombre; SELECT * FROM vista_dashboard_ventas ORDER BY ingresos_totales DESC;",
          },
          {
            id: 'e-2-2-3',
            instruction: 'Crea una vista llamada vista_inventario_alerta que muestre productos con stock menor a 10 unidades: nombre del producto, nombre de la categoría, stock actual, precio, y nombre del proveedor. Luego consúltala para ver los productos críticos.',
            initialQuery: '',
            hints: [
              'Necesitas JOIN entre productos, categorias y proveedores, con WHERE stock < 10 AND activo = 1',
              'CREATE VIEW vista_inventario_alerta AS SELECT p.nombre, c.nombre AS categoria, p.stock, p.precio, pv.nombre AS proveedor ...',
              "CREATE VIEW vista_inventario_alerta AS SELECT p.nombre AS producto, c.nombre AS categoria, p.stock, p.precio, pv.nombre AS proveedor FROM productos p JOIN categorias c ON p.categoria_id = c.id JOIN proveedores pv ON p.proveedor_id = pv.id WHERE p.stock < 10 AND p.activo = 1; SELECT * FROM vista_inventario_alerta ORDER BY stock ASC;",
            ],
            requiredKeywords: ['CREATE', 'VIEW', 'JOIN', 'WHERE'],
            solutionQuery: "CREATE VIEW vista_inventario_alerta AS SELECT p.nombre AS producto, c.nombre AS categoria, p.stock, p.precio, pv.nombre AS proveedor FROM productos p JOIN categorias c ON p.categoria_id = c.id JOIN proveedores pv ON p.proveedor_id = pv.id WHERE p.stock < 10 AND p.activo = 1; SELECT * FROM vista_inventario_alerta ORDER BY stock ASC;",
          },
        ],
      },
      {
        id: 'l-2-3', slug: 'operaciones-conjuntos',
        title: 'UNION, INTERSECT, EXCEPT',
        description: 'Combina resultados de múltiples consultas. Caso: análisis cruzado de clientes y productos.',
        difficulty: 'intermedio', estimatedMinutes: 20,
        content: [
          { type: 'theory', title: 'Operaciones de conjuntos', content: '<code>UNION</code> combina resultados de dos SELECTs eliminando duplicados.<br><code>UNION ALL</code> combina SIN eliminar duplicados (más rápido).<br><code>INTERSECT</code> retorna filas presentes en AMBAS consultas.<br><code>EXCEPT</code> retorna filas de la primera que NO están en la segunda.<br><br><strong>Regla:</strong> Ambas consultas deben tener el mismo número de columnas y tipos compatibles.' },
          { type: 'code-example', title: 'Ejemplo: Clientes de Medellin vs Bogota', content: '', code: "-- Ciudades donde hay clientes Premium O VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nUNION\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';\n\n-- Ciudades donde hay TANTO Premium COMO VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nINTERSECT\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';\n\n-- Ciudades con Premium pero SIN VIP\nSELECT ciudad FROM clientes WHERE tipo = 'Premium'\nEXCEPT\nSELECT ciudad FROM clientes WHERE tipo = 'VIP';" },
          { type: 'theory', title: 'Paso a paso: Comparar conjuntos de datos', content: 'Las operaciones de conjuntos son poderosas para responder preguntas de negocio como: "Quiénes compran pero no dejan reseñas?" o "Qué productos son populares en compras Y en reseñas?".<br><br><strong>Paso 1:</strong> Define cada conjunto (consulta) por separado.<br><strong>Paso 2:</strong> Verifica que ambos tengan las mismas columnas.<br><strong>Paso 3:</strong> Combina con la operación adecuada.' },
          { type: 'code-example', title: 'Paso 1: Definir los dos conjuntos', content: 'Queremos comparar: productos comprados vs productos con reseñas.', code: "-- Conjunto A: Productos que han sido comprados\nSELECT DISTINCT p.nombre\nFROM detalle_pedidos dp\nJOIN productos p ON dp.producto_id = p.id;\n-- Resultado: lista de productos comprados\n\n-- Conjunto B: Productos que tienen resenas\nSELECT DISTINCT p.nombre\nFROM resenas r\nJOIN productos p ON r.producto_id = p.id;\n-- Resultado: lista de productos con resena" },
          { type: 'code-example', title: 'Paso 2-3: Comparar los conjuntos', content: 'Ahora aplicamos las tres operaciones para obtener diferentes perspectivas:', code: "-- UNION: Todos los productos con actividad (compra O resena)\nSELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id\nUNION\nSELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;\n\n-- INTERSECT: Productos comprados Y con resena\nSELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id\nINTERSECT\nSELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;\n\n-- EXCEPT: Productos comprados pero SIN resena\nSELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id\nEXCEPT\nSELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;" },
          { type: 'tip', title: 'UNION vs UNION ALL', content: '<code>UNION</code> elimina duplicados (más lento). <code>UNION ALL</code> mantiene todos los resultados (más rápido). Usa <code>UNION ALL</code> cuando sabes que no habrá duplicados o cuando los necesitas, por ejemplo para crear un log consolidado de diferentes tablas.' },
        ],
        exercises: [
          {
            id: 'e-2-3-1',
            instruction: 'Encuentra los productos que han sido comprados (están en detalle_pedidos) pero que NO tienen reseña. Muestra solo el nombre del producto. Usa EXCEPT.',
            initialQuery: '',
            hints: [
              'Primer SELECT: productos comprados (vía detalle_pedidos JOIN productos)',
              'Segundo SELECT: productos con reseña (vía reseñas JOIN productos)',
              'SELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id EXCEPT SELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;',
            ],
            requiredKeywords: ['EXCEPT', 'SELECT'],
            solutionQuery: 'SELECT DISTINCT p.nombre FROM detalle_pedidos dp JOIN productos p ON dp.producto_id = p.id EXCEPT SELECT DISTINCT p.nombre FROM resenas r JOIN productos p ON r.producto_id = p.id;',
          },
          {
            id: 'e-2-3-2',
            instruction: 'Crea un reporte unificado de "actividad de clientes" usando UNION ALL. La primera consulta debe mostrar cliente_id, nombre del cliente, "Pedido" como tipo_actividad y la fecha del pedido. La segunda debe mostrar cliente_id, nombre del cliente, "Reseña" como tipo_actividad y la fecha de la reseña. Ordena por fecha descendente y limita a 20 filas.',
            initialQuery: '-- Log unificado de actividad de clientes\n',
            hints: [
              'Cada SELECT debe tener las mismas 4 columnas: cliente_id, nombre, tipo_actividad, fecha',
              'Primer SELECT: pedidos JOIN clientes. Segundo SELECT: reseñas JOIN clientes. Luego UNION ALL.',
              "SELECT p.cliente_id, c.nombre, 'Pedido' AS tipo_actividad, p.fecha FROM pedidos p JOIN clientes c ON p.cliente_id = c.id UNION ALL SELECT r.cliente_id, c.nombre, 'Resena' AS tipo_actividad, r.fecha FROM resenas r JOIN clientes c ON r.cliente_id = c.id ORDER BY fecha DESC LIMIT 20;",
            ],
            requiredKeywords: ['UNION ALL', 'SELECT', 'JOIN'],
            solutionQuery: "SELECT p.cliente_id, c.nombre, 'Pedido' AS tipo_actividad, p.fecha FROM pedidos p JOIN clientes c ON p.cliente_id = c.id UNION ALL SELECT r.cliente_id, c.nombre, 'Resena' AS tipo_actividad, r.fecha FROM resenas r JOIN clientes c ON r.cliente_id = c.id ORDER BY fecha DESC LIMIT 20;",
          },
          {
            id: 'e-2-3-3',
            instruction: 'Encuentra las ciudades donde hay clientes que han hecho pedidos por más de 5 millones PERO donde NO hay clientes de tipo VIP. Usa EXCEPT. Muestra solo el nombre de la ciudad.',
            initialQuery: '',
            hints: [
              'Conjunto A: ciudades con pedidos grandes. Conjunto B: ciudades con clientes VIP',
              "Usa EXCEPT entre dos SELECT DISTINCT de ciudades con condiciones diferentes",
              "SELECT DISTINCT cl.ciudad FROM pedidos p JOIN clientes cl ON p.cliente_id = cl.id WHERE p.total > 5000000 EXCEPT SELECT DISTINCT ciudad FROM clientes WHERE tipo = 'VIP';",
            ],
            requiredKeywords: ['EXCEPT', 'SELECT', 'DISTINCT'],
            solutionQuery: "SELECT DISTINCT cl.ciudad FROM pedidos p JOIN clientes cl ON p.cliente_id = cl.id WHERE p.total > 5000000 EXCEPT SELECT DISTINCT ciudad FROM clientes WHERE tipo = 'VIP';",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MÓDULO 3: Window Functions (Finanzas)
  // ============================================================
  {
    id: 'modulo-03',
    slug: 'window-functions',
    title: 'Window Functions',
    description: 'La herramienta más poderosa de SQL analítico. Rankings, acumulados y comparaciones con datos bancarios reales.',
    icon: '&#x26A1;',
    weekRange: [9, 9],
    dataset: 'finanzas',
    order: 3,
    lessons: [
      {
        id: 'l-3-1', slug: 'intro-window-functions',
        title: 'Introducción a Window Functions',
        description: 'OVER, PARTITION BY y el concepto de "ventana". Caso: ranking de clientes bancarios.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Qué son las Window Functions?', content: 'Las <strong>Window Functions</strong> calculan valores sobre un conjunto de filas <em>sin colapsar los grupos</em>. A diferencia de GROUP BY (que reduce filas), las window functions mantienen todas las filas y agregan una columna calculada.<br><br><strong>Sintaxis:</strong><br><code>función() OVER (PARTITION BY col ORDER BY col)</code><br><br><strong>Componentes:</strong><br>- <code>OVER()</code>: define que es una window function<br>- <code>PARTITION BY</code>: divide los datos en grupos (como GROUP BY pero sin colapsar)<br>- <code>ORDER BY</code>: ordena dentro de cada partición' },
          { type: 'code-example', title: 'ROW_NUMBER: Numerar filas', content: 'Asigna un número secuencial a cada fila dentro de su partición:', code: "SELECT\n  nombre,\n  ciudad,\n  saldo,\n  ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY saldo DESC) AS ranking_ciudad\nFROM cuentas c\nJOIN clientes_banco cl ON c.cliente_id = cl.id\nWHERE c.tipo = 'Ahorros'\nORDER BY ciudad, ranking_ciudad;" },
          { type: 'code-example', title: 'RANK vs DENSE_RANK', content: '<code>RANK</code> deja huecos en empates (1,2,2,4). <code>DENSE_RANK</code> no (1,2,2,3).', code: "SELECT\n  nombre,\n  ingresos_mensuales,\n  RANK() OVER (ORDER BY ingresos_mensuales DESC) AS rank_con_huecos,\n  DENSE_RANK() OVER (ORDER BY ingresos_mensuales DESC) AS rank_sin_huecos\nFROM clientes_banco\nWHERE estado = 'Activo'\nLIMIT 15;" },
          { type: 'theory', title: 'GROUP BY vs OVER: La diferencia clave (paso a paso)', content: 'Con <code>GROUP BY</code>, las filas se <strong>colapsan</strong> en una sola fila por grupo. Con <code>OVER</code>, cada fila se <strong>mantiene</strong> y se le agrega el cálculo del grupo al lado.<br><br><strong>Paso 1:</strong> Imagina que tienes 50 clientes en 5 ciudades.<br><strong>Paso 2:</strong> <code>SELECT ciudad, COUNT(*) FROM clientes_banco GROUP BY ciudad</code> te da <strong>5 filas</strong> (una por ciudad).<br><strong>Paso 3:</strong> <code>SELECT nombre, ciudad, COUNT(*) OVER (PARTITION BY ciudad) FROM clientes_banco</code> te da <strong>50 filas</strong>, cada una con el conteo de su ciudad al lado.<br><br>Piensa en OVER como una columna calculada que "mira" a su grupo sin destruir el detalle.' },
          { type: 'code-example', title: 'Comparación directa: GROUP BY vs OVER', content: 'Observa cómo GROUP BY colapsa filas pero OVER las mantiene:', code: "-- GROUP BY: una fila por ciudad (colapsa)\nSELECT\n  ciudad,\n  COUNT(*) AS total_clientes,\n  ROUND(AVG(ingresos_mensuales), 0) AS ingreso_promedio\nFROM clientes_banco\nWHERE estado = 'Activo'\nGROUP BY ciudad;\n\n-- OVER: todas las filas, con el cálculo al lado\nSELECT\n  nombre,\n  ciudad,\n  ingresos_mensuales,\n  COUNT(*) OVER (PARTITION BY ciudad) AS total_en_mi_ciudad,\n  ROUND(AVG(ingresos_mensuales) OVER (PARTITION BY ciudad), 0) AS promedio_mi_ciudad\nFROM clientes_banco\nWHERE estado = 'Activo'\nORDER BY ciudad, ingresos_mensuales DESC;" },
          { type: 'code-example', title: 'SUM OVER: Totales sin perder detalle', content: 'Calcula el saldo total por tipo de cuenta, manteniendo cada cuenta visible:', code: "SELECT\n  cl.nombre,\n  c.tipo,\n  c.saldo,\n  SUM(c.saldo) OVER (PARTITION BY c.tipo) AS saldo_total_tipo,\n  ROUND(c.saldo * 100.0 / SUM(c.saldo) OVER (PARTITION BY c.tipo), 2) AS pct_del_tipo\nFROM cuentas c\nJOIN clientes_banco cl ON c.cliente_id = cl.id\nWHERE c.estado = 'Activa'\nORDER BY c.tipo, c.saldo DESC;" },
          { type: 'tip', title: 'Pensar como científico de datos', content: 'Window Functions son <strong>esenciales</strong> en ciencia de datos. Te permiten calcular rankings, percentiles, medias móviles, tasas de cambio y comparaciones período a período. Si dominas OVER/PARTITION BY, puedes responder el 80% de las preguntas analíticas de un negocio.' },
          { type: 'warning', title: 'Cuidado con PARTITION BY vs ORDER BY en OVER', content: '<code>PARTITION BY</code> define los grupos (como GROUP BY). <code>ORDER BY</code> dentro de OVER define el orden para funciones acumulativas.<br><br><strong>Paso a paso:</strong><br>1. <code>SUM(monto) OVER (PARTITION BY cuenta_id)</code> = total completo del grupo en cada fila.<br>2. <code>SUM(monto) OVER (PARTITION BY cuenta_id ORDER BY fecha)</code> = acumulado progresivo fila a fila.<br><br>La diferencia es sutil pero crítica: con ORDER BY obtienes un running total, sin el obtienes el gran total repetido.' },
        ],
        exercises: [
          {
            id: 'e-3-1-1',
            instruction: 'Para cada transacción, muestra el monto y calcula el monto acumulado (running total) por cuenta_origen_id, ordenado por fecha. Muestra cuenta_origen_id, fecha, monto y monto_acumulado. Limita a 30 filas.',
            initialQuery: '',
            hints: [
              'SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha)',
              'La cláusula ORDER BY dentro de OVER crea un acumulado',
              "SELECT cuenta_origen_id, fecha, monto, SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_acumulado FROM transacciones WHERE estado = 'Completada' ORDER BY cuenta_origen_id, fecha LIMIT 30;",
            ],
            requiredKeywords: ['OVER', 'PARTITION BY', 'SUM'],
            solutionQuery: "SELECT cuenta_origen_id, fecha, monto, SUM(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_acumulado FROM transacciones WHERE estado = 'Completada' ORDER BY cuenta_origen_id, fecha LIMIT 30;",
          },
          {
            id: 'e-3-1-2',
            instruction: 'Crea un ranking de clientes activos por ciudad según sus ingresos mensuales. Muestra nombre, ciudad, ingresos_mensuales y el ranking dentro de su ciudad (1 = mayor ingreso). Usa ROW_NUMBER y filtra solo el Top 3 de cada ciudad usando una subconsulta.',
            initialQuery: '-- Ranking de clientes por ciudad\n',
            hints: [
              'Necesitas ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY ingresos_mensuales DESC)',
              'Para filtrar el Top 3, envuelve la consulta en una subconsulta y filtra WHERE ranking <= 3',
              "SELECT * FROM (SELECT nombre, ciudad, ingresos_mensuales, ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY ingresos_mensuales DESC) AS ranking FROM clientes_banco WHERE estado = 'Activo') sub WHERE ranking <= 3 ORDER BY ciudad, ranking;",
            ],
            requiredKeywords: ['ROW_NUMBER', 'OVER', 'PARTITION BY'],
            solutionQuery: "SELECT * FROM (SELECT nombre, ciudad, ingresos_mensuales, ROW_NUMBER() OVER (PARTITION BY ciudad ORDER BY ingresos_mensuales DESC) AS ranking FROM clientes_banco WHERE estado = 'Activo') sub WHERE ranking <= 3 ORDER BY ciudad, ranking;",
          },
          {
            id: 'e-3-1-3',
            instruction: 'Para cada cuenta activa, muestra el nombre del cliente, tipo de cuenta, saldo, y que porcentaje representa ese saldo del total de saldos de su mismo tipo de cuenta. Usa SUM() OVER con PARTITION BY tipo. Redondea a 2 decimales. Ordena por tipo y porcentaje descendente. Limita a 20 filas.',
            initialQuery: '',
            hints: [
              'Necesitas SUM(c.saldo) OVER (PARTITION BY c.tipo) para obtener el total por tipo',
              'El porcentaje es: ROUND(c.saldo * 100.0 / SUM(c.saldo) OVER (PARTITION BY c.tipo), 2)',
              "SELECT cl.nombre, c.tipo, c.saldo, ROUND(c.saldo * 100.0 / SUM(c.saldo) OVER (PARTITION BY c.tipo), 2) AS pct_del_tipo FROM cuentas c JOIN clientes_banco cl ON c.cliente_id = cl.id WHERE c.estado = 'Activa' ORDER BY c.tipo, pct_del_tipo DESC LIMIT 20;",
            ],
            requiredKeywords: ['SUM', 'OVER', 'PARTITION BY'],
            solutionQuery: "SELECT cl.nombre, c.tipo, c.saldo, ROUND(c.saldo * 100.0 / SUM(c.saldo) OVER (PARTITION BY c.tipo), 2) AS pct_del_tipo FROM cuentas c JOIN clientes_banco cl ON c.cliente_id = cl.id WHERE c.estado = 'Activa' ORDER BY c.tipo, pct_del_tipo DESC LIMIT 20;",
          },
        ],
      },
      {
        id: 'l-3-2', slug: 'lag-lead-analíticas',
        title: 'LAG, LEAD y Funciones Analíticas',
        description: 'Compara filas con sus vecinas. Caso: detectar patrones de transacciones y cambios período a período.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'LAG y LEAD', content: '<code>LAG(columna, n)</code> accede al valor de <strong>n filas ANTES</strong> en la partición.<br><code>LEAD(columna, n)</code> accede al valor de <strong>n filas DESPUES</strong>.<br><br>Son perfectas para:<br>- Comparar transacciones consecutivas<br>- Calcular diferencias entre períodos<br>- Detectar anomalías (saltos bruscos)' },
          { type: 'code-example', title: 'Detectar cambios en transacciones', content: '', code: "SELECT\n  fecha,\n  tipo,\n  monto,\n  LAG(monto) OVER (ORDER BY fecha) AS monto_anterior,\n  monto - LAG(monto) OVER (ORDER BY fecha) AS diferencia\nFROM transacciones\nWHERE cuenta_origen_id = 1\n  AND estado = 'Completada'\nORDER BY fecha\nLIMIT 15;" },
          { type: 'theory', title: 'LAG paso a paso: Detectar patrones de transacciones', content: '<strong>Paso 1:</strong> LAG(monto) OVER (ORDER BY fecha) toma el monto de la fila anterior (ordenada por fecha).<br><strong>Paso 2:</strong> La primera fila no tiene anterior, así que LAG devuelve NULL.<br><strong>Paso 3:</strong> Puedes dar un valor por defecto: <code>LAG(monto, 1, 0)</code> devuelve 0 si no hay fila anterior.<br><strong>Paso 4:</strong> Combinado con PARTITION BY, puedes comparar transacciones consecutivas <em>dentro de cada cuenta</em>.<br><br>Esto es fundamental para detectar anomalías: si una transacción es 10x mayor que la anterior, podría ser fraude.' },
          { type: 'code-example', title: 'LAG con PARTITION BY: Patron por cuenta', content: 'Compara cada transacción con la anterior de la misma cuenta:', code: "SELECT\n  cuenta_origen_id,\n  fecha,\n  tipo,\n  monto,\n  LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_anterior,\n  CASE\n    WHEN LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) IS NULL THEN 'Primera'\n    WHEN monto > LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) * 5 THEN 'Anomalia!'\n    ELSE 'Normal'\n  END AS patron\nFROM transacciones\nWHERE estado = 'Completada'\nORDER BY cuenta_origen_id, fecha\nLIMIT 20;" },
          { type: 'code-example', title: 'FIRST_VALUE y LAST_VALUE', content: '<code>FIRST_VALUE</code> toma el primer valor de la ventana. <code>LAST_VALUE</code> toma el último (ojo: necesita ROWS BETWEEN para funcionar bien).', code: "SELECT\n  nombre,\n  ciudad,\n  ingresos_mensuales,\n  FIRST_VALUE(nombre) OVER (PARTITION BY ciudad ORDER BY ingresos_mensuales DESC) AS mejor_ingreso_ciudad,\n  FIRST_VALUE(ingresos_mensuales) OVER (PARTITION BY ciudad ORDER BY ingresos_mensuales DESC) AS mayor_ingreso\nFROM clientes_banco\nWHERE estado = 'Activo'\nORDER BY ciudad, ingresos_mensuales DESC;" },
          { type: 'code-example', title: 'NTILE: Dividir en grupos iguales', content: '<code>NTILE(n)</code> divide las filas en n grupos de tamaño igual. Ideal para percentiles y cuartiles.', code: "SELECT\n  nombre,\n  score_credito,\n  NTILE(4) OVER (ORDER BY score_credito DESC) AS cuartil\nFROM clientes_banco\nWHERE estado = 'Activo'\nORDER BY score_credito DESC;" },
          { type: 'tip', title: 'Cuándo usar cada función analítica', content: '<strong>LAG/LEAD:</strong> Comparar con filas vecinas (período anterior/siguiente).<br><strong>FIRST_VALUE/LAST_VALUE:</strong> Comparar con el mejor/peor del grupo.<br><strong>NTILE:</strong> Segmentar en percentiles o cuartiles.<br><strong>ROW_NUMBER/RANK:</strong> Rankings y Top-N.' },
        ],
        exercises: [
          {
            id: 'e-3-2-1',
            instruction: 'Divide a los clientes activos del banco en 3 segmentos (terciles) según su score_credito. Muestra nombre, score_credito, y el segmento (1=mejor, 3=peor). Usa NTILE(3).',
            initialQuery: '',
            hints: [
              'NTILE(3) OVER (ORDER BY score_credito DESC)',
              'Filtra WHERE estado = "Activo"',
              "SELECT nombre, score_credito, NTILE(3) OVER (ORDER BY score_credito DESC) AS segmento FROM clientes_banco WHERE estado = 'Activo' ORDER BY score_credito DESC;",
            ],
            requiredKeywords: ['NTILE', 'OVER', 'ORDER BY'],
            solutionQuery: "SELECT nombre, score_credito, NTILE(3) OVER (ORDER BY score_credito DESC) AS segmento FROM clientes_banco WHERE estado = 'Activo' ORDER BY score_credito DESC;",
          },
          {
            id: 'e-3-2-2',
            instruction: 'Para cada transacción completada de la cuenta 1, muestra la fecha, el monto, el monto de la transacción anterior (LAG) y la diferencia entre ambos. Ordena por fecha. Usa LAG con PARTITION BY cuenta_origen_id.',
            initialQuery: '-- Detectar patrones con LAG\n',
            hints: [
              'LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) te da el monto anterior',
              'La diferencia es: monto - LAG(monto) OVER (...)',
              "SELECT fecha, tipo, monto, LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_anterior, monto - LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS diferencia FROM transacciones WHERE cuenta_origen_id = 1 AND estado = 'Completada' ORDER BY fecha;",
            ],
            requiredKeywords: ['LAG', 'OVER', 'ORDER BY'],
            solutionQuery: "SELECT fecha, tipo, monto, LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS monto_anterior, monto - LAG(monto) OVER (PARTITION BY cuenta_origen_id ORDER BY fecha) AS diferencia FROM transacciones WHERE cuenta_origen_id = 1 AND estado = 'Completada' ORDER BY fecha;",
          },
          {
            id: 'e-3-2-3',
            instruction: 'Calcula el crecimiento mes a mes del volumen de transacciones completadas. Agrupa por mes (strftime("%Y-%m", fecha)), calcula el total de transacciones y monto por mes, y usa LAG para mostrar el monto del mes anterior y el porcentaje de crecimiento. Ordena por mes.',
            initialQuery: '',
            hints: [
              'Primero agrupa por mes con GROUP BY strftime("%Y-%m", fecha), luego usa LAG sobre el resultado',
              'Puedes usar una subconsulta o CTE para primero agregar por mes y luego aplicar LAG',
              "SELECT mes, num_transacciones, monto_total, LAG(monto_total) OVER (ORDER BY mes) AS monto_mes_anterior, ROUND((monto_total - LAG(monto_total) OVER (ORDER BY mes)) * 100.0 / LAG(monto_total) OVER (ORDER BY mes), 1) AS pct_crecimiento FROM (SELECT strftime('%Y-%m', fecha) AS mes, COUNT(*) AS num_transacciones, SUM(monto) AS monto_total FROM transacciones WHERE estado = 'Completada' GROUP BY strftime('%Y-%m', fecha)) sub ORDER BY mes;",
            ],
            requiredKeywords: ['LAG', 'OVER', 'GROUP BY'],
            solutionQuery: "SELECT mes, num_transacciones, monto_total, LAG(monto_total) OVER (ORDER BY mes) AS monto_mes_anterior, ROUND((monto_total - LAG(monto_total) OVER (ORDER BY mes)) * 100.0 / LAG(monto_total) OVER (ORDER BY mes), 1) AS pct_crecimiento FROM (SELECT strftime('%Y-%m', fecha) AS mes, COUNT(*) AS num_transacciones, SUM(monto) AS monto_total FROM transacciones WHERE estado = 'Completada' GROUP BY strftime('%Y-%m', fecha)) sub ORDER BY mes;",
          },
        ],
      },
      {
        id: 'l-3-3', slug: 'frames-agregaciones-moviles',
        title: 'Frames y Agregaciones Móviles',
        description: 'Running totals, promedios móviles y ROWS BETWEEN. Caso: detectar tendencias de saldo y transacciones del banco.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Qué es un frame?', content: 'Un <strong>frame</strong> es el conjunto exacto de filas sobre el que opera una window function dentro de la partición. Por defecto, cuando usas <code>ORDER BY</code> en OVER, el frame es "desde el inicio hasta la fila actual" (RANGE UNBOUNDED PRECEDING), pero puedes definirlo explícitamente con <code>ROWS BETWEEN</code>.<br><br><strong>Sintaxis:</strong><pre>SUM(col) OVER (\n  ORDER BY fecha\n  ROWS BETWEEN n PRECEDING AND m FOLLOWING\n)</pre><br><strong>Palabras clave:</strong><br>- <code>UNBOUNDED PRECEDING</code>: desde la primera fila<br>- <code>CURRENT ROW</code>: la fila actual<br>- <code>n PRECEDING/FOLLOWING</code>: n filas antes/después' },
          { type: 'code-example', title: 'Running total: saldo acumulado', content: 'Calcular el saldo acumulado de transacciones día a día:', code: "SELECT\n  fecha,\n  tipo,\n  monto,\n  SUM(monto) OVER (\n    ORDER BY fecha\n    ROWS UNBOUNDED PRECEDING\n  ) AS saldo_acumulado\nFROM transacciones\nWHERE cuenta_origen_id = 1\n  AND estado = 'Completada'\nORDER BY fecha\nLIMIT 20;" },
          { type: 'code-example', title: 'Promedio móvil de 7 días', content: 'Los promedios móviles suavizan las variaciones y revelan tendencias:', code: "SELECT\n  fecha,\n  monto,\n  ROUND(AVG(monto) OVER (\n    ORDER BY fecha\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ), 0) AS promedio_movil_7d\nFROM transacciones\nWHERE estado = 'Completada'\n  AND tipo = 'Transferencia'\nORDER BY fecha;" },
          { type: 'tip', title: 'ROWS vs RANGE', content: '<code>ROWS</code> cuenta filas físicas (1, 2, 3 filas antes). <code>RANGE</code> trabaja con valores lógicos (ej: "todas las filas con la misma fecha"). En el 90% de los casos querrás <code>ROWS</code>, más predecible e intuitivo.' },
          { type: 'theory', title: 'Paso a paso: Construir un reporte de tendencias', content: 'Vamos a construir un reporte con múltiples métricas móviles en un solo query.<br><br><strong>Paso 1:</strong> Agregar las transacciones por día.<br><strong>Paso 2:</strong> Calcular el running total (acumulado).<br><strong>Paso 3:</strong> Agregar el promedio móvil de 7 días.<br><strong>Paso 4:</strong> Comparar contra el promedio móvil para detectar anomalías.' },
          { type: 'code-example', title: 'Reporte completo de tendencias', content: '', code: "WITH ventas_diarias AS (\n  SELECT\n    fecha,\n    COUNT(*) AS num_trans,\n    SUM(monto) AS monto_dia\n  FROM transacciones\n  WHERE estado = 'Completada'\n  GROUP BY fecha\n)\nSELECT\n  fecha,\n  monto_dia,\n  SUM(monto_dia) OVER (\n    ORDER BY fecha\n    ROWS UNBOUNDED PRECEDING\n  ) AS acumulado,\n  ROUND(AVG(monto_dia) OVER (\n    ORDER BY fecha\n    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n  ), 0) AS promedio_7d,\n  ROUND(\n    (monto_dia - AVG(monto_dia) OVER (\n      ORDER BY fecha\n      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    )) * 100.0 /\n    AVG(monto_dia) OVER (\n      ORDER BY fecha\n      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n    ), 1\n  ) AS desviacion_pct\nFROM ventas_diarias\nORDER BY fecha;" },
          { type: 'tip', title: 'Detectar anomalías con frames', content: 'Un uso poderoso de los frames es detectar días "anormales": si el valor de un día se desvía más del 50% del promedio móvil reciente, probablemente sea una anomalía que merece investigar. Esta es una técnica clásica en fraud detection y monitoring.' },
        ],
        exercises: [
          {
            id: 'e-3-3-1',
            instruction: 'Calcula el saldo acumulado de transacciones completadas por fecha para la cuenta_origen_id = 2. Muestra fecha, tipo, monto y el saldo acumulado. Ordena por fecha.',
            initialQuery: '-- Running total de la cuenta 2\n',
            hints: [
              'SUM(monto) OVER (ORDER BY fecha ROWS UNBOUNDED PRECEDING)',
              'Filtra WHERE cuenta_origen_id = 2 AND estado = "Completada"',
              "SELECT fecha, tipo, monto, SUM(monto) OVER (ORDER BY fecha ROWS UNBOUNDED PRECEDING) AS saldo_acumulado FROM transacciones WHERE cuenta_origen_id = 2 AND estado = 'Completada' ORDER BY fecha;",
            ],
            requiredKeywords: ['SUM', 'OVER', 'ROWS'],
            solutionQuery: "SELECT fecha, tipo, monto, SUM(monto) OVER (ORDER BY fecha ROWS UNBOUNDED PRECEDING) AS saldo_acumulado FROM transacciones WHERE cuenta_origen_id = 2 AND estado = 'Completada' ORDER BY fecha;",
          },
          {
            id: 'e-3-3-2',
            instruction: 'Calcula el promedio móvil de 3 transacciones (la actual y las 2 anteriores) del monto de transferencias completadas. Muestra fecha, monto, y promedio_movil_3. Ordena por fecha.',
            initialQuery: '',
            hints: [
              'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW',
              "WHERE tipo = 'Transferencia' AND estado = 'Completada'",
              "SELECT fecha, monto, ROUND(AVG(monto) OVER (ORDER BY fecha ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS promedio_movil_3 FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha;",
            ],
            requiredKeywords: ['AVG', 'OVER', 'ROWS', 'PRECEDING'],
            solutionQuery: "SELECT fecha, monto, ROUND(AVG(monto) OVER (ORDER BY fecha ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 0) AS promedio_movil_3 FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha;",
          },
          {
            id: 'e-3-3-3',
            instruction: 'Para cada cliente_banco activo, calcula el porcentaje que representa su ingreso_mensual dentro del total de su ciudad. Muestra nombre, ciudad, ingreso_mensual y pct_ciudad. Usa SUM como window function con PARTITION BY ciudad.',
            initialQuery: '',
            hints: [
              'SUM(ingreso_mensual) OVER (PARTITION BY ciudad) para el total por ciudad',
              'ingreso_mensual * 100.0 / SUM(...) OVER (PARTITION BY ciudad)',
              "SELECT nombre, ciudad, ingreso_mensual, ROUND(ingreso_mensual * 100.0 / SUM(ingreso_mensual) OVER (PARTITION BY ciudad), 2) AS pct_ciudad FROM clientes_banco WHERE estado = 'Activo' ORDER BY ciudad, pct_ciudad DESC;",
            ],
            requiredKeywords: ['SUM', 'OVER', 'PARTITION BY'],
            solutionQuery: "SELECT nombre, ciudad, ingreso_mensual, ROUND(ingreso_mensual * 100.0 / SUM(ingreso_mensual) OVER (PARTITION BY ciudad), 2) AS pct_ciudad FROM clientes_banco WHERE estado = 'Activo' ORDER BY ciudad, pct_ciudad DESC;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 4: CTEs y SQL Analítico Avanzado (Finanzas + Streaming)
  // ============================================================
  {
    id: 'modulo-04',
    slug: 'ctes-sql-analitico',
    title: 'CTEs y SQL Analítico Avanzado',
    description: 'Common Table Expressions, consultas recursivas y análisis avanzado con datos de streaming y finanzas.',
    icon: '&#x1F9E0;',
    weekRange: [10, 10],
    dataset: 'finanzas',
    order: 4,
    lessons: [
      {
        id: 'l-4-1', slug: 'common-table-expressions',
        title: 'CTEs (WITH): Consultas Legibles y Poderosas',
        description: 'Escribe consultas complejas de forma legible. Caso: análisis de riesgo crediticio.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Qué es un CTE?', content: 'Un <strong>CTE (Common Table Expression)</strong> es una subconsulta con nombre que defines al inicio de tu query con <code>WITH</code>. Es como crear una tabla temporal para esa consulta.<br><br><strong>Sintaxis:</strong><pre>WITH nombre_cte AS (\n  SELECT ...\n)\nSELECT * FROM nombre_cte;</pre><br><strong>Ventajas sobre subconsultas:</strong><br>- Mucho más legible<br>- Reutilizable (puedes referenciarlo múltiples veces)<br>- Puedes encadenar múltiples CTEs' },
          { type: 'code-example', title: 'CTE encadenado: Análisis de riesgo', content: '', code: "-- Paso 1: Clasificar clientes por riesgo\n-- Paso 2: Sumar su exposicion crediticia\nWITH clientes_riesgo AS (\n  SELECT\n    cl.id,\n    cl.nombre,\n    cl.score_credito,\n    CASE\n      WHEN cl.score_credito >= 750 THEN 'Bajo'\n      WHEN cl.score_credito >= 500 THEN 'Medio'\n      ELSE 'Alto'\n    END AS nivel_riesgo\n  FROM clientes_banco cl\n  WHERE cl.estado = 'Activo'\n),\nexposicion AS (\n  SELECT\n    cliente_id,\n    SUM(saldo_pendiente) AS deuda_total,\n    COUNT(*) AS num_prestamos\n  FROM prestamos\n  WHERE estado IN ('Activo', 'Mora')\n  GROUP BY cliente_id\n)\nSELECT\n  cr.nombre,\n  cr.score_credito,\n  cr.nivel_riesgo,\n  COALESCE(e.deuda_total, 0) AS deuda_total,\n  COALESCE(e.num_prestamos, 0) AS num_prestamos\nFROM clientes_riesgo cr\nLEFT JOIN exposicion e ON cr.id = e.cliente_id\nORDER BY cr.score_credito ASC\nLIMIT 15;" },
          { type: 'tip', title: 'CTEs vs Subconsultas', content: 'Usa CTEs cuando la consulta tiene más de 2 niveles de complejidad. La regla es: si tienes que pensar más de 10 segundos para entender una subconsulta, conviértela en CTE.' },
          { type: 'theory', title: 'Construir un multi-CTE paso a paso', content: '<strong>Paso 1:</strong> Identifica las "capas" de tu análisis. Ejemplo: quieres saber que clientes de alto riesgo tienen prestamos en mora.<br><strong>Paso 2:</strong> Escribe el primer CTE con la capa más básica (ej: clasificar clientes).<br><strong>Paso 3:</strong> Agrega un segundo CTE con la siguiente capa (ej: agregar datos de prestamos).<br><strong>Paso 4:</strong> En el SELECT final, combina los CTEs con JOIN.<br><br><strong>Regla de oro:</strong> Cada CTE debe hacer UNA sola cosa. Si un CTE hace dos cosas, divídelo en dos.' },
          { type: 'code-example', title: 'Multi-CTE paso a paso: Análisis de cartera', content: 'Construyamos un reporte de cartera en 3 pasos:', code: "-- CTE 1: Resumen por sucursal\nWITH cartera_sucursal AS (\n  SELECT\n    s.nombre AS sucursal,\n    s.ciudad,\n    COUNT(DISTINCT p.id) AS num_prestamos,\n    SUM(p.monto_aprobado) AS total_aprobado,\n    SUM(p.saldo_pendiente) AS total_pendiente\n  FROM sucursales s\n  JOIN clientes_banco cl ON cl.sucursal_id = s.id\n  JOIN prestamos p ON p.cliente_id = cl.id\n  GROUP BY s.id, s.nombre, s.ciudad\n),\n-- CTE 2: Calcular indicadores\nindicadores AS (\n  SELECT\n    *,\n    ROUND((total_aprobado - total_pendiente) * 100.0 / total_aprobado, 1) AS pct_recuperado,\n    ROUND(total_pendiente * 1.0 / num_prestamos, 0) AS pendiente_promedio\n  FROM cartera_sucursal\n)\n-- Paso final: Mostrar con ranking\nSELECT\n  sucursal,\n  ciudad,\n  num_prestamos,\n  total_pendiente,\n  pct_recuperado,\n  RANK() OVER (ORDER BY pct_recuperado DESC) AS ranking_recuperacion\nFROM indicadores\nORDER BY ranking_recuperacion;" },
          { type: 'theory', title: 'CTEs Recursivos: El concepto', content: 'Un <strong>CTE recursivo</strong> se referencia a si mismo. Es útil para recorrer jerarquías (organigramas, categorias anidadas) o generar series.<br><br><strong>Estructura:</strong><pre>WITH RECURSIVE nombre AS (\n  -- Caso base (anchor)\n  SELECT ... \n  UNION ALL\n  -- Caso recursivo (se referencia a si mismo)\n  SELECT ... FROM nombre WHERE condición_parada\n)\nSELECT * FROM nombre;</pre><br><strong>Importante:</strong> Siempre necesitas una condición de parada para evitar bucles infinitos.' },
          { type: 'code-example', title: 'CTE Recursivo: Generar serie de meses', content: 'Genera una serie de meses para análisis temporal (útil cuando algunos meses no tienen datos):', code: "-- Generar los últimos 6 meses\nWITH RECURSIVE meses AS (\n  SELECT date('2024-07-01') AS mes\n  UNION ALL\n  SELECT date(mes, '+1 month')\n  FROM meses\n  WHERE mes < '2024-12-01'\n)\nSELECT\n  m.mes,\n  COALESCE(COUNT(t.id), 0) AS num_transacciones,\n  COALESCE(SUM(t.monto), 0) AS monto_total\nFROM meses m\nLEFT JOIN transacciones t\n  ON strftime('%Y-%m', t.fecha) = strftime('%Y-%m', m.mes)\n  AND t.estado = 'Completada'\nGROUP BY m.mes\nORDER BY m.mes;" },
          { type: 'warning', title: 'Limitaciones de CTEs recursivos', content: 'En SQLite, los CTEs recursivos funcionan pero hay un límite por defecto de 1000 iteraciones. Para análisis de datos normales esto es más que suficiente. En producción, usa CTEs recursivos con precaución y siempre incluye una condición de parada clara.' },
        ],
        exercises: [
          {
            id: 'e-4-1-1',
            instruction: 'Usando CTEs, calcula para cada tipo de prestamo (Personal, Vivienda, etc.): el monto total aprobado, el saldo pendiente total, y el porcentaje de recuperación (monto_desembolsado - saldo_pendiente) / monto_desembolsado * 100. Ordena por porcentaje de recuperación.',
            initialQuery: "WITH resumen_prestamos AS (\n  -- Tu CTE aqui\n)\nSELECT * FROM resumen_prestamos;",
            hints: [
              'GROUP BY tipo dentro del CTE',
              'SUM(monto_aprobado), SUM(saldo_pendiente), y calcula el % de recuperación',
              "WITH resumen_prestamos AS (SELECT tipo, SUM(monto_aprobado) AS total_aprobado, SUM(saldo_pendiente) AS total_pendiente, ROUND((SUM(monto_desembolsado) - SUM(saldo_pendiente)) * 100.0 / SUM(monto_desembolsado), 1) AS pct_recuperación FROM prestamos GROUP BY tipo) SELECT * FROM resumen_prestamos ORDER BY pct_recuperación DESC;",
            ],
            requiredKeywords: ['WITH', 'AS', 'SELECT'],
            solutionQuery: "WITH resumen_prestamos AS (SELECT tipo, SUM(monto_aprobado) AS total_aprobado, SUM(saldo_pendiente) AS total_pendiente, ROUND((SUM(monto_desembolsado) - SUM(saldo_pendiente)) * 100.0 / SUM(monto_desembolsado), 1) AS pct_recuperación FROM prestamos GROUP BY tipo) SELECT * FROM resumen_prestamos ORDER BY pct_recuperación DESC;",
          },
          {
            id: 'e-4-1-2',
            instruction: 'Construye un análisis de portafolio de prestamos usando múltiples CTEs. CTE 1 (resumen_cliente): para cada cliente, calcula número de prestamos, monto total aprobado y saldo pendiente total. CTE 2 (clasificacion): agrega una columna "nivel_deuda" basada en saldo pendiente (>50M: "Critico", >20M: "Alto", >5M: "Medio", resto: "Bajo"). SELECT final: muestra nombre, num_prestamos, saldo_pendiente, nivel_deuda. Ordena por saldo pendiente DESC. Limita a 15.',
            initialQuery: "WITH resumen_cliente AS (\n  -- Paso 1: Resumen por cliente\n),\nclasificacion AS (\n  -- Paso 2: Clasificar nivel de deuda\n)\n-- Paso 3: Resultado final\nSELECT * FROM clasificacion;",
            hints: [
              'En resumen_cliente: JOIN clientes_banco con prestamos, GROUP BY cliente_id',
              'En clasificacion: SELECT *, CASE WHEN saldo_pendiente > 50000000 THEN "Critico" ... END AS nivel_deuda FROM resumen_cliente',
              "WITH resumen_cliente AS (SELECT cl.id, cl.nombre, COUNT(p.id) AS num_prestamos, SUM(p.monto_aprobado) AS total_aprobado, SUM(p.saldo_pendiente) AS saldo_pendiente FROM clientes_banco cl JOIN prestamos p ON cl.id = p.cliente_id GROUP BY cl.id, cl.nombre), clasificacion AS (SELECT *, CASE WHEN saldo_pendiente > 50000000 THEN 'Critico' WHEN saldo_pendiente > 20000000 THEN 'Alto' WHEN saldo_pendiente > 5000000 THEN 'Medio' ELSE 'Bajo' END AS nivel_deuda FROM resumen_cliente) SELECT nombre, num_prestamos, saldo_pendiente, nivel_deuda FROM clasificacion ORDER BY saldo_pendiente DESC LIMIT 15;",
            ],
            requiredKeywords: ['WITH', 'CASE', 'WHEN'],
            solutionQuery: "WITH resumen_cliente AS (SELECT cl.id, cl.nombre, COUNT(p.id) AS num_prestamos, SUM(p.monto_aprobado) AS total_aprobado, SUM(p.saldo_pendiente) AS saldo_pendiente FROM clientes_banco cl JOIN prestamos p ON cl.id = p.cliente_id GROUP BY cl.id, cl.nombre), clasificacion AS (SELECT *, CASE WHEN saldo_pendiente > 50000000 THEN 'Critico' WHEN saldo_pendiente > 20000000 THEN 'Alto' WHEN saldo_pendiente > 5000000 THEN 'Medio' ELSE 'Bajo' END AS nivel_deuda FROM resumen_cliente) SELECT nombre, num_prestamos, saldo_pendiente, nivel_deuda FROM clasificacion ORDER BY saldo_pendiente DESC LIMIT 15;",
          },
          {
            id: 'e-4-1-3',
            instruction: 'Usa un CTE recursivo para generar una serie de meses de 2024-01 a 2024-12. Luego haz LEFT JOIN con transacciones completadas para mostrar cada mes, el número de transacciones y el monto total (usa COALESCE para meses sin datos). Ordena por mes.',
            initialQuery: "WITH RECURSIVE meses AS (\n  -- Tu serie de meses aqui\n)\nSELECT * FROM meses;",
            hints: [
              'El caso base es SELECT date("2024-01-01") AS mes. El recursivo es SELECT date(mes, "+1 month") FROM meses WHERE mes < "2024-12-01"',
              'Haz LEFT JOIN transacciones ON strftime("%Y-%m", fecha) = strftime("%Y-%m", mes)',
              "WITH RECURSIVE meses AS (SELECT date('2024-01-01') AS mes UNION ALL SELECT date(mes, '+1 month') FROM meses WHERE mes < '2024-12-01') SELECT strftime('%Y-%m', m.mes) AS período, COALESCE(COUNT(t.id), 0) AS num_transacciones, COALESCE(SUM(t.monto), 0) AS monto_total FROM meses m LEFT JOIN transacciones t ON strftime('%Y-%m', t.fecha) = strftime('%Y-%m', m.mes) AND t.estado = 'Completada' GROUP BY m.mes ORDER BY m.mes;",
            ],
            requiredKeywords: ['WITH', 'RECURSIVE', 'COALESCE'],
            solutionQuery: "WITH RECURSIVE meses AS (SELECT date('2024-01-01') AS mes UNION ALL SELECT date(mes, '+1 month') FROM meses WHERE mes < '2024-12-01') SELECT strftime('%Y-%m', m.mes) AS período, COALESCE(COUNT(t.id), 0) AS num_transacciones, COALESCE(SUM(t.monto), 0) AS monto_total FROM meses m LEFT JOIN transacciones t ON strftime('%Y-%m', t.fecha) = strftime('%Y-%m', m.mes) AND t.estado = 'Completada' GROUP BY m.mes ORDER BY m.mes;",
          },
        ],
      },
      {
        id: 'l-4-2', slug: 'análisis-cohortes',
        title: 'Análisis de Cohortes y Patrones',
        description: 'Técnicas de científico de datos aplicadas con SQL. Caso: análisis de comportamiento de clientes bancarios.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Pensar como científico de datos', content: 'Un <strong>análisis de cohortes</strong> agrupa usuarios por una característica común (ej: mes de registro) y compara su comportamiento a lo largo del tiempo.<br><br><strong>Preguntas típicas:</strong><br>- Los clientes que abrieron cuenta en enero gastan más que los de junio?<br>- Cuál es el patron de transacciones por tipo de cuenta?<br>- Qué canal genera más actividad?' },
          { type: 'code-example', title: 'Análisis por canal de transacción', content: '', code: "-- Volumen y monto por canal\nSELECT\n  canal,\n  COUNT(*) AS num_transacciones,\n  ROUND(AVG(monto), 0) AS monto_promedio,\n  SUM(monto) AS monto_total,\n  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones), 1) AS pct_del_total\nFROM transacciones\nWHERE estado = 'Completada'\nGROUP BY canal\nORDER BY num_transacciones DESC;" },
          { type: 'code-example', title: 'Top clientes con múltiples metricas', content: '', code: "WITH metricas_cliente AS (\n  SELECT\n    cl.nombre,\n    cl.ciudad,\n    COUNT(t.id) AS num_transacciones,\n    SUM(t.monto) AS volumen_total,\n    ROUND(AVG(t.monto), 0) AS ticket_promedio,\n    MAX(t.fecha) AS ultima_actividad\n  FROM clientes_banco cl\n  JOIN cuentas cu ON cl.id = cu.cliente_id\n  JOIN transacciones t ON cu.id = t.cuenta_origen_id\n  WHERE t.estado = 'Completada'\n  GROUP BY cl.id, cl.nombre, cl.ciudad\n)\nSELECT\n  *,\n  RANK() OVER (ORDER BY volumen_total DESC) AS ranking\nFROM metricas_cliente\nORDER BY ranking\nLIMIT 10;" },
          { type: 'theory', title: 'Análisis de cohortes paso a paso', content: '<strong>Paso 1: Definir la cohorte.</strong> Agrupa clientes por una característica común. Ejemplo: mes en que abrieron su cuenta (strftime("%Y-%m", fecha_apertura)).<br><br><strong>Paso 2: Medir comportamiento.</strong> Para cada cohorte, calcula metricas como número de transacciones, monto total, etc.<br><br><strong>Paso 3: Comparar cohortes.</strong> Compara las metricas entre cohortes para identificar tendencias.<br><br><strong>Paso 4: Sacar conclusiones.</strong> Los clientes que abrieron cuenta en cierto período son más activos? Hay estacionalidad?' },
          { type: 'code-example', title: 'Cohortes por mes de apertura', content: 'Analiza el comportamiento de clientes agrupados por su mes de apertura de cuenta:', code: "WITH cohortes AS (\n  SELECT\n    strftime('%Y-%m', cl.fecha_apertura) AS cohorte,\n    COUNT(DISTINCT cl.id) AS clientes_en_cohorte,\n    COUNT(t.id) AS total_transacciones,\n    COALESCE(SUM(t.monto), 0) AS volumen_total\n  FROM clientes_banco cl\n  LEFT JOIN cuentas cu ON cl.id = cu.cliente_id\n  LEFT JOIN transacciones t ON cu.id = t.cuenta_origen_id\n    AND t.estado = 'Completada'\n  WHERE cl.estado = 'Activo'\n  GROUP BY strftime('%Y-%m', cl.fecha_apertura)\n)\nSELECT\n  cohorte,\n  clientes_en_cohorte,\n  total_transacciones,\n  ROUND(total_transacciones * 1.0 / clientes_en_cohorte, 1) AS transacciones_por_cliente,\n  ROUND(volumen_total * 1.0 / clientes_en_cohorte, 0) AS volumen_por_cliente\nFROM cohortes\nORDER BY cohorte;" },
          { type: 'tip', title: 'Patrones comunes en cohortes bancarios', content: '<strong>Estacionalidad:</strong> Más aperturas de cuenta en enero (propósitos de año nuevo) y septiembre (vuelta al trabajo).<br><strong>Actividad decreciente:</strong> Cohortes más antiguas suelen ser menos activas (clientes que abandonan).<br><strong>Segmentacion por canal:</strong> Clientes que llegaron por App vs Sucursal tienen comportamiento diferente.' },
        ],
        exercises: [
          {
            id: 'e-4-2-1',
            instruction: 'Analiza las transacciones por tipo (Depósito, Retiro, Transferencia, etc.): muestra el tipo, cantidad de transacciones, monto total, monto promedio, y el porcentaje que representa cada tipo del total de transacciones completadas.',
            initialQuery: '',
            hints: [
              'GROUP BY tipo, y usa una subconsulta para el total general',
              'COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = "Completada")',
              "SELECT tipo, COUNT(*) AS cantidad, SUM(monto) AS monto_total, ROUND(AVG(monto), 0) AS monto_promedio, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = 'Completada'), 1) AS pct_del_total FROM transacciones WHERE estado = 'Completada' GROUP BY tipo ORDER BY cantidad DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'COUNT', 'SUM', 'AVG'],
            solutionQuery: "SELECT tipo, COUNT(*) AS cantidad, SUM(monto) AS monto_total, ROUND(AVG(monto), 0) AS monto_promedio, ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM transacciones WHERE estado = 'Completada'), 1) AS pct_del_total FROM transacciones WHERE estado = 'Completada' GROUP BY tipo ORDER BY cantidad DESC;",
          },
          {
            id: 'e-4-2-2',
            instruction: 'Realiza un análisis de cohortes: agrupa los clientes activos por el mes de apertura de su cuenta (strftime("%Y-%m", fecha_apertura) como cohorte). Para cada cohorte, muestra: número de clientes, numero total de transacciones completadas (via cuentas y transacciones), y transacciones promedio por cliente. Ordena por cohorte.',
            initialQuery: '-- Análisis de cohortes por mes de apertura\n',
            hints: [
              'Necesitas JOIN clientes_banco -> cuentas -> transacciones. Agrupa por strftime("%Y-%m", cl.fecha_apertura)',
              'Usa LEFT JOIN para incluir cohortes sin transacciones. Divide total_transacciones / clientes para el promedio',
              "WITH cohortes AS (SELECT strftime('%Y-%m', cl.fecha_apertura) AS cohorte, COUNT(DISTINCT cl.id) AS num_clientes, COUNT(t.id) AS total_transacciones FROM clientes_banco cl LEFT JOIN cuentas cu ON cl.id = cu.cliente_id LEFT JOIN transacciones t ON cu.id = t.cuenta_origen_id AND t.estado = 'Completada' WHERE cl.estado = 'Activo' GROUP BY strftime('%Y-%m', cl.fecha_apertura)) SELECT cohorte, num_clientes, total_transacciones, ROUND(total_transacciones * 1.0 / num_clientes, 1) AS transacciones_por_cliente FROM cohortes ORDER BY cohorte;",
            ],
            requiredKeywords: ['WITH', 'GROUP BY', 'JOIN'],
            solutionQuery: "WITH cohortes AS (SELECT strftime('%Y-%m', cl.fecha_apertura) AS cohorte, COUNT(DISTINCT cl.id) AS num_clientes, COUNT(t.id) AS total_transacciones FROM clientes_banco cl LEFT JOIN cuentas cu ON cl.id = cu.cliente_id LEFT JOIN transacciones t ON cu.id = t.cuenta_origen_id AND t.estado = 'Completada' WHERE cl.estado = 'Activo' GROUP BY strftime('%Y-%m', cl.fecha_apertura)) SELECT cohorte, num_clientes, total_transacciones, ROUND(total_transacciones * 1.0 / num_clientes, 1) AS transacciones_por_cliente FROM cohortes ORDER BY cohorte;",
          },
          {
            id: 'e-4-2-3',
            instruction: 'Analiza la actividad de clientes por canal de transacción (App, Web, Sucursal, ATM, POS). Para cada cliente activo, determina su canal más usado (el canal con más transacciones). Muestra: canal_principal, número de clientes que lo prefieren, y el promedio de transacciones totales de esos clientes. Usa CTEs y window functions.',
            initialQuery: '',
            hints: [
              'CTE 1: Para cada cliente, cuenta transacciones por canal. CTE 2: Usa ROW_NUMBER para encontrar el canal top de cada cliente',
              'Filtra WHERE ranking = 1 para quedarte con el canal principal de cada cliente, luego agrupa por canal',
              "WITH uso_canal AS (SELECT cl.id AS cliente_id, t.canal, COUNT(*) AS num_transacciones FROM clientes_banco cl JOIN cuentas cu ON cl.id = cu.cliente_id JOIN transacciones t ON cu.id = t.cuenta_origen_id WHERE t.estado = 'Completada' AND cl.estado = 'Activo' GROUP BY cl.id, t.canal), canal_principal AS (SELECT cliente_id, canal, num_transacciones, ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY num_transacciones DESC) AS ranking FROM uso_canal) SELECT canal AS canal_principal, COUNT(*) AS num_clientes, ROUND(AVG(num_transacciones), 1) AS promedio_transacciones FROM canal_principal WHERE ranking = 1 GROUP BY canal ORDER BY num_clientes DESC;",
            ],
            requiredKeywords: ['WITH', 'ROW_NUMBER', 'OVER'],
            solutionQuery: "WITH uso_canal AS (SELECT cl.id AS cliente_id, t.canal, COUNT(*) AS num_transacciones FROM clientes_banco cl JOIN cuentas cu ON cl.id = cu.cliente_id JOIN transacciones t ON cu.id = t.cuenta_origen_id WHERE t.estado = 'Completada' AND cl.estado = 'Activo' GROUP BY cl.id, t.canal), canal_principal AS (SELECT cliente_id, canal, num_transacciones, ROW_NUMBER() OVER (PARTITION BY cliente_id ORDER BY num_transacciones DESC) AS ranking FROM uso_canal) SELECT canal AS canal_principal, COUNT(*) AS num_clientes, ROUND(AVG(num_transacciones), 1) AS promedio_transacciones FROM canal_principal WHERE ranking = 1 GROUP BY canal ORDER BY num_clientes DESC;",
          },
        ],
      },
      {
        id: 'l-4-3', slug: 'ctes-recursivos',
        title: 'CTEs Recursivos: Jerarquías y Series Temporales',
        description: 'Recorrer organigramas, generar series de fechas y resolver problemas que requieren iteración. Caso: análisis temporal y jerárquico.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Qué resuelve un CTE recursivo?', content: 'Los CTEs recursivos son la única forma en SQL estándar de resolver problemas <strong>iterativos</strong>: recorrer una jerarquía (jefe → subordinados → sub-subordinados), generar secuencias (fechas, números), o calcular pagos amortizados.<br><br><strong>Anatomía:</strong><br>1. <strong>Caso base</strong> (anchor): la primera fila o primer nivel.<br>2. <strong>UNION ALL</strong>: une el anchor con el caso recursivo.<br>3. <strong>Caso recursivo</strong>: se refiere al CTE mismo y genera la siguiente iteración.<br>4. <strong>Condición de parada</strong>: WHERE que evita el bucle infinito.' },
          { type: 'code-example', title: 'Generar una serie de fechas', content: 'El caso más útil: crear una tabla de fechas sin tenerla en la BD.', code: "-- Genera un registro por cada día de enero 2025\nWITH RECURSIVE dias AS (\n  -- Caso base: primera fecha\n  SELECT date('2025-01-01') AS dia\n  UNION ALL\n  -- Recursivo: suma un día\n  SELECT date(dia, '+1 day')\n  FROM dias\n  WHERE dia < '2025-01-31'\n)\nSELECT dia FROM dias;" },
          { type: 'code-example', title: 'Reporte denso con fechas completas', content: 'Usa la serie para mostrar todos los días, incluso los que no tienen transacciones:', code: "WITH RECURSIVE dias AS (\n  SELECT date('2024-07-01') AS dia\n  UNION ALL\n  SELECT date(dia, '+1 day') FROM dias\n  WHERE dia < '2024-07-31'\n)\nSELECT\n  d.dia,\n  COALESCE(COUNT(t.id), 0) AS num_trans,\n  COALESCE(SUM(t.monto), 0) AS monto_total\nFROM dias d\nLEFT JOIN transacciones t\n  ON t.fecha = d.dia\n  AND t.estado = 'Completada'\nGROUP BY d.dia\nORDER BY d.dia;" },
          { type: 'theory', title: 'Recorrer jerarquías: cadenas de referencias', content: 'Un CTE recursivo puede seguir una cadena de referencias (FK hacia la misma tabla). Ejemplo clásico: un organigrama donde cada empleado apunta a su jefe. El CTE empieza en una persona y sigue "subiendo" (o "bajando") hasta llegar al tope.<br><br><strong>Sintaxis pseudo:</strong><pre>WITH RECURSIVE jerarquia AS (\n  SELECT id, nombre, jefe_id, 1 AS nivel\n  FROM empleados WHERE id = :raiz\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id, j.nivel + 1\n  FROM empleados e\n  JOIN jerarquia j ON e.jefe_id = j.id\n)\nSELECT * FROM jerarquia;</pre>' },
          { type: 'code-example', title: 'Serie numérica con acumulado', content: 'Generar una tabla de números 1 a 12 y calcular su acumulado:', code: "WITH RECURSIVE numeros(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 1\n  FROM numeros\n  WHERE n < 12\n)\nSELECT\n  n AS mes,\n  n * 100000 AS monto_proyectado,\n  SUM(n * 100000) OVER (ORDER BY n) AS acumulado\nFROM numeros;" },
          { type: 'warning', title: 'Siempre una condición de parada', content: 'Un CTE recursivo sin WHERE que limite la iteración es un <strong>bucle infinito</strong>. SQLite corta a 1000 iteraciones por defecto, pero PostgreSQL no — puedes bloquear tu servidor. <strong>Regla:</strong> siempre incluye una condición WHERE en el caso recursivo que eventualmente sea falsa.' },
          { type: 'tip', title: 'Cuándo usar CTE recursivo vs otra herramienta', content: 'Usa CTE recursivo cuando: (a) necesitas seguir una cadena de longitud desconocida, (b) necesitas generar una serie. Evítalo cuando: (a) la profundidad es fija (usa varios JOINs), (b) ya tienes la serie como tabla (calendario, dim_fecha), (c) puedes resolverlo con window functions más simples.' },
        ],
        exercises: [
          {
            id: 'e-4-3-1',
            instruction: 'Usando un CTE recursivo, genera una serie de los últimos 7 días empezando en "2024-12-25" y terminando en "2024-12-31". Muestra cada día en una fila.',
            initialQuery: '-- Serie de 7 dias\nWITH RECURSIVE ',
            hints: [
              "Caso base: SELECT date('2024-12-25') AS dia",
              "Recursivo: SELECT date(dia, '+1 day') FROM dias WHERE dia < '2024-12-31'",
              "WITH RECURSIVE dias AS (SELECT date('2024-12-25') AS dia UNION ALL SELECT date(dia, '+1 day') FROM dias WHERE dia < '2024-12-31') SELECT dia FROM dias;",
            ],
            requiredKeywords: ['WITH RECURSIVE', 'UNION ALL'],
            solutionQuery: "WITH RECURSIVE dias AS (SELECT date('2024-12-25') AS dia UNION ALL SELECT date(dia, '+1 day') FROM dias WHERE dia < '2024-12-31') SELECT dia FROM dias;",
          },
          {
            id: 'e-4-3-2',
            instruction: 'Genera una tabla de números del 1 al 20 con un CTE recursivo y multiplica cada número por 50000 para mostrar un monto proyectado. Columnas: n, monto_proyectado.',
            initialQuery: '',
            hints: [
              'SELECT 1 como caso base, SELECT n + 1 como recursivo',
              'WHERE n < 20 como parada',
              'WITH RECURSIVE numeros(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM numeros WHERE n < 20) SELECT n, n * 50000 AS monto_proyectado FROM numeros;',
            ],
            requiredKeywords: ['WITH RECURSIVE', 'UNION ALL'],
            solutionQuery: 'WITH RECURSIVE numeros(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM numeros WHERE n < 20) SELECT n, n * 50000 AS monto_proyectado FROM numeros;',
          },
          {
            id: 'e-4-3-3',
            instruction: 'Usa un CTE recursivo para generar los 12 meses del 2024 (primer día de cada mes, del 2024-01-01 al 2024-12-01). Después, con LEFT JOIN contra transacciones, muestra cuántas transacciones completadas hubo en cada mes (usa strftime para comparar). Columnas: mes, num_transacciones. Ordena por mes.',
            initialQuery: '',
            hints: [
              "Caso base: SELECT date('2024-01-01')",
              "Recursivo: date(mes, '+1 month') WHERE mes < '2024-12-01'",
              "WITH RECURSIVE meses AS (SELECT date('2024-01-01') AS mes UNION ALL SELECT date(mes, '+1 month') FROM meses WHERE mes < '2024-12-01') SELECT m.mes, COUNT(t.id) AS num_transacciones FROM meses m LEFT JOIN transacciones t ON strftime('%Y-%m', t.fecha) = strftime('%Y-%m', m.mes) AND t.estado = 'Completada' GROUP BY m.mes ORDER BY m.mes;",
            ],
            requiredKeywords: ['WITH RECURSIVE', 'LEFT JOIN', 'GROUP BY'],
            solutionQuery: "WITH RECURSIVE meses AS (SELECT date('2024-01-01') AS mes UNION ALL SELECT date(mes, '+1 month') FROM meses WHERE mes < '2024-12-01') SELECT m.mes, COUNT(t.id) AS num_transacciones FROM meses m LEFT JOIN transacciones t ON strftime('%Y-%m', t.fecha) = strftime('%Y-%m', m.mes) AND t.estado = 'Completada' GROUP BY m.mes ORDER BY m.mes;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULOS FUTUROS (estructura lista)
  // ============================================================
  // ============================================================
  // MODULO 5: Diseño de BD y Normalización (E-commerce)
  // ============================================================
  {
    id: 'modulo-05',
    slug: 'diseno-normalización',
    title: 'Diseño de BD y Normalización',
    description: 'Modelo ER, formas normales (1FN-3FN-BCNF), CREATE TABLE avanzado con restricciones. Caso: diseñar el esquema de TiendaOnline.co.',
    icon: '&#x1F4D0;',
    weekRange: [11, 11],
    dataset: 'ecommerce',
    order: 5,
    lessons: [
      {
        id: 'l-5-1', slug: 'modelo-entidad-relación',
        title: 'Modelo Entidad-Relación',
        description: 'Entidades, atributos, relaciónes y cardinalidad. Caso: diseñar el esquema de TiendaOnline.co desde cero.',
        difficulty: 'intermedio', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Qué es el Modelo Entidad-Relación?', content: 'El <strong>Modelo Entidad-Relación (ER)</strong> es una herramienta visual para diseñar bases de datos antes de escribir SQL.<br><br><strong>Componentes:</strong><br>- <strong>Entidad:</strong> Un objeto del mundo real (Cliente, Producto, Pedido)<br>- <strong>Atributo:</strong> Propiedad de una entidad (nombre, precio, fecha)<br>- <strong>Relación:</strong> Conexion entre entidades (un Cliente HACE Pedidos)<br>- <strong>Cardinalidad:</strong> Cuántas instancias se relaciónan (1:1, 1:N, N:M)' },
          { type: 'code-example', title: 'De ER a tablas SQL', content: 'Cada entidad se convierte en tabla, cada atributo en columna, y cada relación en una clave foránea:', code: "-- Entidad: Cliente\nCREATE TABLE clientes (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  ciudad TEXT,\n  fecha_registro TEXT DEFAULT (date('now'))\n);\n\n-- Entidad: Producto\nCREATE TABLE productos (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  precio REAL NOT NULL CHECK (precio > 0),\n  categoria_id INTEGER,\n  FOREIGN KEY (categoria_id) REFERENCES categorias(id)\n);\n\n-- Relación N:M -> Tabla intermedia\nCREATE TABLE detalle_pedidos (\n  id INTEGER PRIMARY KEY,\n  pedido_id INTEGER NOT NULL,\n  producto_id INTEGER NOT NULL,\n  cantidad INTEGER NOT NULL CHECK (cantidad > 0),\n  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),\n  FOREIGN KEY (producto_id) REFERENCES productos(id)\n);" },
          { type: 'tip', title: 'Cardinalidad en la práctica', content: '<strong>1:1</strong> — Un empleado tiene un pasaporte.<br><strong>1:N</strong> — Un cliente hace muchos pedidos (FK en pedidos).<br><strong>N:M</strong> — Un pedido tiene muchos productos, un producto esta en muchos pedidos (tabla intermedia).<br><br>La mayoria de relaciónes en un e-commerce son 1:N o N:M.' },
          { type: 'theory', title: 'Paso a paso: Identificar entidades y relaciónes del e-commerce', content: 'Vamos a aplicar el proceso de modelado ER al caso de TiendaOnline.co:<br><br><strong>Paso 1 - Identificar entidades:</strong> Del requerimiento extraemos: Categoria, Proveedor, Producto, Cliente, Pedido, DetallePedido, Resena, Cupon. Cada una representa un objeto del negocio.<br><br><strong>Paso 2 - Definir atributos clave:</strong><br>- productos: id, nombre, precio, costo, stock, sku, peso_kg, activo, fecha_creacion<br>- clientes: id, nombre, email, ciudad, departamento, telefono, tipo, fecha_registro, total_compras, puntos_fidelidad<br>- pedidos: id, fecha, estado, método_pago, subtotal, descuento, impuesto, total<br><br><strong>Paso 3 - Mapear relaciónes:</strong><br>- categorias (1) --> (N) productos: cada producto pertenece a una categoria<br>- proveedores (1) --> (N) productos: cada producto tiene un proveedor<br>- clientes (1) --> (N) pedidos: cada pedido pertenece a un cliente<br>- pedidos (N) <--> (M) productos: relación muchos a muchos resuelta con detalle_pedidos<br>- productos (1) --> (N) resenas y clientes (1) --> (N) resenas' },
          { type: 'code-example', title: 'Diagrama ER del e-commerce', content: 'Representación textual del modelo ER de TiendaOnline.co con sus relaciónes y cardinalidades:', code: "-- DIAGRAMA ER DE TIENDAONLINE.CO\n-- ================================\n--\n-- categorias (1) ----< (N) productos\n--   PK: id                  PK: id\n--   nombre                  nombre, precio, costo, stock\n--   descripción             FK: categoria_id, proveedor_id\n--   margen_objetivo         sku, peso_kg, activo\n--\n-- proveedores (1) ----< (N) productos\n--   PK: id\n--   nombre, pais, calificacion, tiempo_entrega_dias\n--\n-- clientes (1) ---< (N) pedidos (1) ---< (N) detalle_pedidos\n--   PK: id             PK: id                 PK: id\n--   nombre, email      FK: cliente_id          FK: pedido_id\n--   ciudad, tipo       fecha, estado           FK: producto_id\n--   total_compras      método_pago, total      cantidad, subtotal\n--\n-- productos (1) ----< (N) detalle_pedidos  [resuelve N:M]\n-- productos (1) ----< (N) resenas\n-- clientes  (1) ----< (N) resenas\n-- cupones (entidad independiente: codigo, tipo, valor, fechas)\n\n-- Verificar las tablas del esquema real:\nSELECT name FROM sqlite_master\nWHERE type = 'table' ORDER BY name;" },
          { type: 'tip', title: 'Notación de cardinalidad en diagramas', content: 'En diagramas ER profesionales se usa notacion de pata de gallo (crow foot). La regla de oro: la FK siempre va en el lado "muchos" de la relación. Por eso <code>categoria_id</code> esta en productos (muchos productos por categoria), no al reves.' },
        ],
        exercises: [
          {
            id: 'e-5-1-1',
            instruction: 'Consulta las tablas del e-commerce para entender el esquema. Muestra las categorias con la cantidad de productos en cada una y ordena por cantidad descendente. Esto te ayuda a entender la relación 1:N entre categorias y productos.',
            initialQuery: '-- Explora la relación categorias -> productos\n',
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
            instruction: 'Identifica la relación N:M del esquema: muestra los 10 pedidos con más productos distintos. Incluye id del pedido, nombre del cliente, fecha, y cantidad de productos distintos.',
            initialQuery: '',
            hints: [
              'Necesitas JOIN entre pedidos, detalle_pedidos y clientes',
              'COUNT(DISTINCT dp.producto_id) y GROUP BY pedido',
              "SELECT p.id AS pedido_id, c.nombre AS cliente, p.fecha, COUNT(DISTINCT dp.producto_id) AS productos_distintos FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id GROUP BY p.id, c.nombre, p.fecha ORDER BY productos_distintos DESC LIMIT 10;",
            ],
            requiredKeywords: ['JOIN', 'COUNT', 'GROUP BY'],
            solutionQuery: "SELECT p.id AS pedido_id, c.nombre AS cliente, p.fecha, COUNT(DISTINCT dp.producto_id) AS productos_distintos FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id GROUP BY p.id, c.nombre, p.fecha ORDER BY productos_distintos DESC LIMIT 10;",
          },
          {
            id: 'e-5-1-3',
            instruction: 'Explora las claves foráneas del esquema: muestra todos los productos junto con el nombre de su categoria y el nombre de su proveedor. Incluye producto id, nombre del producto, precio, nombre de la categoria, y nombre del proveedor. Ordena por categoria y luego por precio descendente. Esto demuestra como las FK conectan las entidades del modelo ER.',
            initialQuery: '-- Explorar las relaciónes FK del esquema\n',
            hints: [
              'Necesitas dos JOINs: uno con categorias y otro con proveedores',
              'SELECT p.id, p.nombre, c.nombre AS categoria, pr.nombre AS proveedor ... JOIN categorias c ON ... JOIN proveedores pr ON ...',
              "SELECT p.id, p.nombre AS producto, p.precio, c.nombre AS categoria, pr.nombre AS proveedor FROM productos p JOIN categorias c ON p.categoria_id = c.id JOIN proveedores pr ON p.proveedor_id = pr.id ORDER BY c.nombre, p.precio DESC;",
            ],
            requiredKeywords: ['SELECT', 'JOIN', 'ORDER BY'],
            solutionQuery: "SELECT p.id, p.nombre AS producto, p.precio, c.nombre AS categoria, pr.nombre AS proveedor FROM productos p JOIN categorias c ON p.categoria_id = c.id JOIN proveedores pr ON p.proveedor_id = pr.id ORDER BY c.nombre, p.precio DESC;",
          },
        ],
      },
      {
        id: 'l-5-2', slug: 'create-table-avanzado',
        title: 'CREATE TABLE Avanzado',
        description: 'Restricciones (PK, FK, UNIQUE, CHECK, DEFAULT), tipos de datos y ALTER TABLE. Caso: extender el esquema del e-commerce.',
        difficulty: 'intermedio', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Restricciones (Constraints)', content: 'Las restricciones garantizan la <strong>integridad de los datos</strong>:<br><br>- <code>PRIMARY KEY</code>: Identifica cada fila de forma única. No puede ser NULL.<br>- <code>FOREIGN KEY</code>: Establece relación con otra tabla. Garantiza integridad referencial.<br>- <code>UNIQUE</code>: No permite valores duplicados en esa columna.<br>- <code>NOT NULL</code>: La columna no puede estar vacia.<br>- <code>CHECK</code>: Valida que el valor cumpla una condición.<br>- <code>DEFAULT</code>: Valor por defecto si no se especifica.' },
          { type: 'code-example', title: 'Tabla con todas las restricciones', content: 'Creemos una tabla de cupones para el e-commerce:', code: "CREATE TABLE cupones (\n  id INTEGER PRIMARY KEY,\n  codigo TEXT UNIQUE NOT NULL,\n  descuento_pct REAL NOT NULL CHECK (descuento_pct > 0 AND descuento_pct <= 50),\n  monto_minimo REAL DEFAULT 0 CHECK (monto_minimo >= 0),\n  usos_maximos INTEGER DEFAULT 100,\n  usos_actuales INTEGER DEFAULT 0,\n  activo INTEGER DEFAULT 1 CHECK (activo IN (0, 1)),\n  fecha_inicio TEXT NOT NULL,\n  fecha_fin TEXT NOT NULL,\n  CHECK (fecha_fin > fecha_inicio)\n);\n\n-- Verificar la estructura\nSELECT sql FROM sqlite_master WHERE name = 'cupones';" },
          { type: 'code-example', title: 'ALTER TABLE: Modificar tablas existentes', content: '', code: "-- Agregar columna\nALTER TABLE productos ADD COLUMN peso_kg REAL;\n\n-- Renombrar tabla\nALTER TABLE cupones RENAME TO descuentos;\n\n-- En PostgreSQL también puedes:\n-- ALTER TABLE productos DROP COLUMN peso_kg;\n-- ALTER TABLE productos ALTER COLUMN precio SET NOT NULL;\n-- (SQLite tiene soporte limitado de ALTER TABLE)" },
          { type: 'warning', title: 'Limitaciones de SQLite', content: 'SQLite (que usamos en el laboratorio) tiene ALTER TABLE limitado: solo permite ADD COLUMN y RENAME. Para cambios más complejos necesitas recrear la tabla. PostgreSQL y MySQL tienen ALTER TABLE mucho más poderoso.' },
          { type: 'theory', title: 'Paso a paso: Construir una tabla con restricciones', content: 'Vamos a diseñar una tabla de movimientos de inventario paso a paso, aplicando cada tipo de restriccion:<br><br><strong>Paso 1 - Definir columnas básicas:</strong> Identifica que datos necesitas: id, producto_id, tipo de movimiento, cantidad, fecha, responsable.<br><br><strong>Paso 2 - Agregar PRIMARY KEY:</strong> El id sera la clave primaria.<br><br><strong>Paso 3 - Agregar FOREIGN KEY:</strong> producto_id debe referenciar a productos(id) para garantizar integridad referencial.<br><br><strong>Paso 4 - Agregar NOT NULL:</strong> Las columnas obligatorias (producto_id, tipo, cantidad, fecha) no pueden ser nulas.<br><br><strong>Paso 5 - Agregar CHECK:</strong> La cantidad debe ser positiva. El tipo debe ser "Entrada" o "Salida".<br><br><strong>Paso 6 - Agregar DEFAULT:</strong> La fecha puede tener un valor por defecto de "hoy".' },
          { type: 'code-example', title: 'Tabla construida paso a paso con restricciones', content: 'Aplicando cada restriccion progresivamente:', code: "-- Tabla de movimientos de inventario con TODAS las restricciones\nCREATE TABLE movimientos_inventario (\n  id INTEGER PRIMARY KEY,\n  -- FK: referencia a productos\n  producto_id INTEGER NOT NULL,\n  -- CHECK: solo valores válidos\n  tipo TEXT NOT NULL CHECK (tipo IN ('Entrada', 'Salida')),\n  -- CHECK: cantidad positiva\n  cantidad INTEGER NOT NULL CHECK (cantidad > 0),\n  -- DEFAULT: fecha automática\n  fecha TEXT NOT NULL DEFAULT (date('now')),\n  -- Campo opcional\n  responsable TEXT,\n  notas TEXT,\n  -- FK constraint\n  FOREIGN KEY (producto_id) REFERENCES productos(id)\n);\n\n-- Insertar un movimiento de prueba\nINSERT INTO movimientos_inventario\n  (id, producto_id, tipo, cantidad, responsable)\nVALUES (1, 1, 'Entrada', 10, 'Admin');\n\nSELECT * FROM movimientos_inventario;" },
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
              'Después UPDATE clientes SET telefono = ... WHERE id = 1',
              "ALTER TABLE clientes ADD COLUMN telefono TEXT; UPDATE clientes SET telefono = '3001234567' WHERE id = 1; SELECT id, nombre, email, telefono FROM clientes WHERE id = 1;",
            ],
            requiredKeywords: ['ALTER TABLE', 'ADD COLUMN'],
            solutionQuery: "ALTER TABLE clientes ADD COLUMN telefono TEXT; UPDATE clientes SET telefono = '3001234567' WHERE id = 1; SELECT id, nombre, email, telefono FROM clientes WHERE id = 1;",
          },
          {
            id: 'e-5-2-3',
            instruction: 'Crea una tabla "valoraciones_proveedores" con: id (PK), proveedor_id (FK a proveedores, NOT NULL), puntuación (INTEGER NOT NULL, CHECK entre 1 y 10), fecha_evaluación (TEXT, DEFAULT fecha actual), criterio (TEXT, CHECK que sea "Calidad", "Precio" o "Entrega"), comentario (TEXT). Inserta 2 valoraciones para el proveedor 1 y muestralas.',
            initialQuery: '-- Tabla de valoraciones con CHECK y DEFAULT\n',
            hints: [
              'Usa CHECK (puntuación >= 1 AND puntuación <= 10) y CHECK (criterio IN (...))',
              "DEFAULT (date('now')) para la fecha automática",
              "CREATE TABLE valoraciones_proveedores (id INTEGER PRIMARY KEY, proveedor_id INTEGER NOT NULL, puntuación INTEGER NOT NULL CHECK (puntuación >= 1 AND puntuación <= 10), fecha_evaluación TEXT DEFAULT (date('now')), criterio TEXT CHECK (criterio IN ('Calidad', 'Precio', 'Entrega')), comentario TEXT, FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)); INSERT INTO valoraciones_proveedores (id, proveedor_id, puntuación, criterio, comentario) VALUES (1, 1, 9, 'Calidad', 'Excelente calidad de componentes'); INSERT INTO valoraciones_proveedores (id, proveedor_id, puntuación, criterio, comentario) VALUES (2, 1, 7, 'Entrega', 'A veces demora 1-2 días más'); SELECT * FROM valoraciones_proveedores;",
            ],
            requiredKeywords: ['CREATE TABLE', 'CHECK', 'DEFAULT'],
            solutionQuery: "CREATE TABLE valoraciones_proveedores (id INTEGER PRIMARY KEY, proveedor_id INTEGER NOT NULL, puntuación INTEGER NOT NULL CHECK (puntuación >= 1 AND puntuación <= 10), fecha_evaluación TEXT DEFAULT (date('now')), criterio TEXT CHECK (criterio IN ('Calidad', 'Precio', 'Entrega')), comentario TEXT, FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)); INSERT INTO valoraciones_proveedores (id, proveedor_id, puntuación, criterio, comentario) VALUES (1, 1, 9, 'Calidad', 'Excelente calidad de componentes'); INSERT INTO valoraciones_proveedores (id, proveedor_id, puntuación, criterio, comentario) VALUES (2, 1, 7, 'Entrega', 'A veces demora 1-2 días más'); SELECT * FROM valoraciones_proveedores;",
          },
        ],
      },
      {
        id: 'l-5-3', slug: 'normalización',
        title: 'Normalización (1FN-3FN-BCNF)',
        description: 'Dependencias funcionales, anomalías y proceso de normalización paso a paso. Caso: normalizar una tabla desnormalizada de pedidos.',
        difficulty: 'avanzado', estimatedMinutes: 40,
        content: [
          { type: 'theory', title: 'Por qué normalizar?', content: 'Una tabla <strong>desnormalizada</strong> tiene datos redundantes que causan <strong>anomalías</strong>:<br><br>- <strong>Anomalía de inserción:</strong> No puedes insertar un dato sin insertar datos no relacionados<br>- <strong>Anomalía de actualización:</strong> Actualizar un dato requiere modificar múltiples filas<br>- <strong>Anomalía de eliminación:</strong> Eliminar un dato puede borrar información no relacionada<br><br>La <strong>normalización</strong> es el proceso de dividir tablas para eliminar estas anomalías.' },
          { type: 'theory', title: 'Formas Normales', content: '<strong>1FN (Primera Forma Normal):</strong><br>- Cada celda tiene un solo valor (atómico)<br>- No hay grupos repetidos<br><br><strong>2FN (Segunda Forma Normal):</strong><br>- Esta en 1FN<br>- Todos los atributos no-clave dependen de TODA la clave primaria (no de una parte)<br><br><strong>3FN (Tercera Forma Normal):</strong><br>- Esta en 2FN<br>- No hay dependencias transitivas (un atributo no-clave no depende de otro atributo no-clave)<br><br><strong>BCNF (Boyce-Codd):</strong><br>- Cada determinante es una clave candidata' },
          { type: 'code-example', title: 'Ejemplo: Tabla desnormalizada', content: 'Esta tabla de pedidos viola 3FN — tiene datos redundantes del cliente y producto:', code: "-- Tabla desnormalizada (mala práctica)\nCREATE TABLE pedidos_flat (\n  pedido_id INTEGER,\n  fecha TEXT,\n  cliente_nombre TEXT,\n  cliente_email TEXT,\n  cliente_ciudad TEXT,\n  producto_nombre TEXT,\n  producto_precio REAL,\n  cantidad INTEGER\n);\n\n-- Si el cliente cambia de ciudad, hay que actualizar\n-- TODAS las filas de sus pedidos (anomalía de actualización)\n\n-- Solución normalizada: tablas separadas\n-- clientes(id, nombre, email, ciudad)\n-- productos(id, nombre, precio)\n-- pedidos(id, fecha, cliente_id FK)\n-- detalle_pedidos(id, pedido_id FK, producto_id FK, cantidad)" },
          { type: 'tip', title: 'Regla práctica de 3FN', content: 'Recuerda la regla: cada atributo no-clave debe depender de <strong>"la clave, toda la clave, y nada más que la clave"</strong>. Si un dato se repite en múltiples filas, probablemente debe ir en su propia tabla.' },
          { type: 'theory', title: 'Paso a paso: Proceso de normalización', content: 'Vamos a normalizar una tabla desnormalizada paso a paso:<br><br><strong>Tabla original (sin normalizar):</strong><br><code>pedido_completo(pedido_id, fecha, cliente_nombre, cliente_email, cliente_ciudad, producto_nombre, producto_precio, categoria_nombre, cantidad)</code><br><br><strong>Paso 1 - Verificar 1FN:</strong> Cada celda tiene un solo valor? Si hay listas (ej: "producto1, producto2"), separar en filas individuales. En este caso ya cumple 1FN.<br><br><strong>Paso 2 - Aplicar 2FN:</strong> Identificar dependencias parciales. cliente_nombre depende solo del cliente (no del par pedido_id + producto). Separar: tabla clientes(id, nombre, email, ciudad).<br><br><strong>Paso 3 - Aplicar 3FN:</strong> Eliminar dependencias transitivas. categoria_nombre depende de producto (transitiva). Separar: tabla categorias(id, nombre) y productos(id, nombre, precio, categoria_id).<br><br><strong>Resultado:</strong> 5 tablas limpias: clientes, categorias, productos, pedidos, detalle_pedidos.' },
          { type: 'code-example', title: 'Comparación: query normalizado vs desnormalizado', content: 'Veamos cómo se ven las consultas en ambos esquemas. El normalizado requiere JOINs pero evita anomalías:', code: "-- DESNORMALIZADO: datos redundantes, consulta simple\n-- SELECT cliente_nombre, SUM(cantidad * producto_precio)\n-- FROM pedido_completo\n-- GROUP BY cliente_nombre;\n-- Problema: si el cliente cambia de nombre, hay que\n-- actualizar TODAS las filas de sus pedidos\n\n-- NORMALIZADO: sin redundancia, usa JOINs\nSELECT c.nombre AS cliente,\n  SUM(dp.cantidad * dp.precio_unitario) AS total_gastado\nFROM clientes c\nJOIN pedidos p ON c.id = p.cliente_id\nJOIN detalle_pedidos dp ON p.id = dp.pedido_id\nGROUP BY c.id, c.nombre\nORDER BY total_gastado DESC\nLIMIT 10;\n-- Ventaja: el nombre del cliente esta en UN solo lugar" },
        ],
        exercises: [
          {
            id: 'e-5-3-1',
            instruction: 'El esquema del e-commerce ya esta normalizado. Demuestra que no hay redundancia: para cada proveedor, muestra su nombre, la cantidad de productos que suministra y la cantidad de categorias distintas de esos productos. Esto muestra la relación limpia proveedor -> productos -> categorias.',
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
              'CREATE TABLE reporte_ventas_flat AS SELECT ... es una forma rápida',
              'Necesitas JOIN entre pedidos, clientes, detalle_pedidos, productos y categorias',
              "CREATE TABLE reporte_ventas_flat AS SELECT p.id AS pedido_id, p.fecha, c.nombre AS cliente_nombre, pr.nombre AS producto_nombre, cat.nombre AS categoria_nombre, dp.cantidad, dp.subtotal FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id JOIN productos pr ON dp.producto_id = pr.id JOIN categorias cat ON pr.categoria_id = cat.id; SELECT * FROM reporte_ventas_flat LIMIT 10;",
            ],
            requiredKeywords: ['CREATE TABLE', 'SELECT', 'JOIN'],
            solutionQuery: "CREATE TABLE reporte_ventas_flat AS SELECT p.id AS pedido_id, p.fecha, c.nombre AS cliente_nombre, pr.nombre AS producto_nombre, cat.nombre AS categoria_nombre, dp.cantidad, dp.subtotal FROM pedidos p JOIN clientes c ON p.cliente_id = c.id JOIN detalle_pedidos dp ON p.id = dp.pedido_id JOIN productos pr ON dp.producto_id = pr.id JOIN categorias cat ON pr.categoria_id = cat.id; SELECT * FROM reporte_ventas_flat LIMIT 10;",
          },
          {
            id: 'e-5-3-3',
            instruction: 'Compara una consulta sobre tablas normalizadas vs una tabla desnormalizada. Primero, usando las tablas normalizadas, calcula el ingreso total por categoria (SUM de detalle_pedidos.subtotal) con JOINs entre categorias, productos y detalle_pedidos. Luego, consulta lo mismo desde la tabla reporte_ventas_flat (SUM de subtotal GROUP BY categoria_nombre). Ejecuta ambas consultas separadas por punto y coma y compara los resultados.',
            initialQuery: '-- Consulta normalizada vs desnormalizada\n',
            hints: [
              'Primera consulta: JOIN categorias -> productos -> detalle_pedidos, GROUP BY categoria',
              'Segunda consulta: SELECT categoria_nombre, SUM(subtotal) FROM reporte_ventas_flat GROUP BY categoria_nombre',
              "SELECT cat.nombre AS categoria, SUM(dp.subtotal) AS ingreso_total FROM categorias cat JOIN productos pr ON cat.id = pr.categoria_id JOIN detalle_pedidos dp ON pr.id = dp.producto_id GROUP BY cat.id, cat.nombre ORDER BY ingreso_total DESC; SELECT categoria_nombre AS categoria, SUM(subtotal) AS ingreso_total FROM reporte_ventas_flat GROUP BY categoria_nombre ORDER BY ingreso_total DESC;",
            ],
            requiredKeywords: ['SELECT', 'SUM', 'GROUP BY', 'JOIN'],
            solutionQuery: "SELECT cat.nombre AS categoria, SUM(dp.subtotal) AS ingreso_total FROM categorias cat JOIN productos pr ON cat.id = pr.categoria_id JOIN detalle_pedidos dp ON pr.id = dp.producto_id GROUP BY cat.id, cat.nombre ORDER BY ingreso_total DESC; SELECT categoria_nombre AS categoria, SUM(subtotal) AS ingreso_total FROM reporte_ventas_flat GROUP BY categoria_nombre ORDER BY ingreso_total DESC;",
          },
        ],
      },
    ],
  },

  // ============================================================
  // MODULO 6: Índices y Optimización (Finanzas)
  // ============================================================
  {
    id: 'modulo-06',
    slug: 'indices-optimizacion',
    title: 'Índices y Optimización de Queries',
    description: 'Índices B-tree, EXPLAIN, planes de ejecución y buenas prácticas de rendimiento con datos bancarios.',
    icon: '&#x2699;',
    weekRange: [12, 12],
    dataset: 'finanzas',
    order: 6,
    lessons: [
      {
        id: 'l-6-1', slug: 'indices',
        title: 'Índices: Acelerando Consultas',
        description: 'B-tree, hash, parciales y compuestos. Caso: optimizar consultas de transacciones bancarias.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: '¿Qué es un índice?', content: 'Un <strong>índice</strong> es una estructura de datos que acelera las búsquedas en una tabla, similar al índice de un libro.<br><br><strong>Tipos principales:</strong><br>- <strong>B-tree</strong> (default): Ideal para =, <, >, BETWEEN, ORDER BY. El más común.<br>- <strong>Hash</strong>: Solo para búsquedas exactas (=). Más rápido que B-tree para igualdad.<br>- <strong>Compuesto</strong>: Índice sobre múltiples columnas. El orden importa.<br>- <strong>Parcial</strong>: Índice solo sobre un subconjunto de filas (con WHERE).<br><br><strong>Trade-off:</strong> Los índices aceleran lecturas pero ralentizan escrituras (INSERT/UPDATE/DELETE) porque el índice también se actualiza.' },
          { type: 'code-example', title: 'Crear índices en el banco', content: '', code: "-- Índice simple: acelera búsquedas por estado\nCREATE INDEX idx_transacciones_estado\nON transacciones(estado);\n\n-- Índice compuesto: acelera filtros por cuenta + fecha\nCREATE INDEX idx_trans_cuenta_fecha\nON transacciones(cuenta_origen_id, fecha);\n\n-- Índice parcial: solo transacciones completadas (las más consultadas)\n-- (Nota: SQLite soporta índices parciales)\nCREATE INDEX idx_trans_completadas\nON transacciones(fecha, monto)\nWHERE estado = 'Completada';\n\n-- Ver índices existentes\nSELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL;" },
          { type: 'warning', title: 'Cuándo NO crear índices', content: '<strong>No crees índices en:</strong><br>- Tablas pequeñas (< 1000 filas): el scan es más rápido<br>- Columnas con pocos valores distintos (ej: booleanos)<br>- Tablas con muchos INSERT/UPDATE/DELETE<br>- Si ya hay muchos índices en la tabla (cada uno cuesta espacio y tiempo de escritura)' },
          { type: 'theory', title: 'Paso a paso: Crear y verificar un índice', content: 'Vamos a crear un índice paso a paso y verificar que funciona:<br><br><strong>Paso 1 - Identificar la consulta lenta:</strong> Busca consultas con WHERE, JOIN u ORDER BY frecuentes. Ejemplo: filtrar transacciones por cuenta y fecha es muy común en un banco.<br><br><strong>Paso 2 - Ver el plan SIN índice:</strong> Usa EXPLAIN QUERY PLAN para confirmar que hace SCAN TABLE (recorre toda la tabla).<br><br><strong>Paso 3 - Crear el índice:</strong> Elige las columnas en el orden correcto. En índices compuestos, la columna más selectiva va primero.<br><br><strong>Paso 4 - Verificar con EXPLAIN:</strong> Ejecuta EXPLAIN QUERY PLAN de nuevo. Debe decir SEARCH USING INDEX en vez de SCAN TABLE.<br><br><strong>Paso 5 - Confirmar índices existentes:</strong> Consulta sqlite_master para ver todos los índices de la tabla.' },
          { type: 'code-example', title: 'Ejemplo completo: Crear y verificar índice', content: 'Paso a paso con transacciones bancarias:', code: "-- Paso 1: Consulta que queremos optimizar\n-- Buscar transacciones por cuenta y rango de fechas\n-- SELECT * FROM transacciones\n-- WHERE cuenta_origen_id = 5 AND fecha > '2024-06-01';\n\n-- Paso 2: Ver plan SIN índice\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones\nWHERE cuenta_origen_id = 5 AND fecha > '2024-06-01';\n-- Resultado: SCAN TABLE transacciones (lento)\n\n-- Paso 3: Crear índice compuesto\nCREATE INDEX idx_trans_cuenta_fecha\nON transacciones(cuenta_origen_id, fecha);\n\n-- Paso 4: Ver plan CON índice\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones\nWHERE cuenta_origen_id = 5 AND fecha > '2024-06-01';\n-- Resultado: SEARCH TABLE USING INDEX (rápido)\n\n-- Paso 5: Confirmar índices\nSELECT name, sql FROM sqlite_master\nWHERE type = 'index' AND tbl_name = 'transacciones'\nAND sql IS NOT NULL;" },
        ],
        exercises: [
          {
            id: 'e-6-1-1',
            instruction: 'Crea un índice compuesto en la tabla transacciones sobre (tipo, estado) para acelerar filtros combinados. Luego usa el índice consultando transacciones de tipo "Transferencia" con estado "Completada", mostrando fecha, monto y canal. Limita a 15 filas.',
            initialQuery: '-- Crea el índice y luego úsalo\n',
            hints: [
              'CREATE INDEX idx_nombre ON transacciones(tipo, estado);',
              'El SELECT usará automáticamente el índice si filtra por tipo y estado',
              "CREATE INDEX idx_trans_tipo_estado ON transacciones(tipo, estado); SELECT fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha DESC LIMIT 15;",
            ],
            requiredKeywords: ['CREATE INDEX', 'SELECT', 'WHERE'],
            solutionQuery: "CREATE INDEX idx_trans_tipo_estado ON transacciones(tipo, estado); SELECT fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' AND estado = 'Completada' ORDER BY fecha DESC LIMIT 15;",
          },
          {
            id: 'e-6-1-2',
            instruction: 'Lista todos los índices que existen actualmente en la base de datos (tabla sqlite_master, type = "index", donde sql no es NULL). Muestra el nombre del índice y su definición SQL.',
            initialQuery: '',
            hints: [
              'SELECT name, sql FROM sqlite_master WHERE type = ...',
              "Filtra WHERE type = 'index' AND sql IS NOT NULL",
              "SELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL ORDER BY name;",
            ],
            requiredKeywords: ['SELECT', 'sqlite_master'],
            solutionQuery: "SELECT name, sql FROM sqlite_master WHERE type = 'index' AND sql IS NOT NULL ORDER BY name;",
          },
          {
            id: 'e-6-1-3',
            instruction: 'Crea un índice compuesto en la tabla prestamos sobre (cliente_id, estado) para optimizar consultas de préstamos por cliente y estado. Luego úsalo: muestra todos los préstamos activos del cliente_id = 3, incluyendo tipo, monto_aprobado, saldo_pendiente y tasa_anual. Finalmente, verifica con EXPLAIN QUERY PLAN que el índice se está usando.',
            initialQuery: '-- Índice compuesto en prestamos\n',
            hints: [
              'CREATE INDEX idx_prestamos_cliente_estado ON prestamos(cliente_id, estado);',
              'Luego SELECT ... WHERE cliente_id = 3 AND estado = "Activo"',
              "CREATE INDEX idx_prestamos_cliente_estado ON prestamos(cliente_id, estado); SELECT tipo, monto_aprobado, saldo_pendiente, tasa_anual FROM prestamos WHERE cliente_id = 3 AND estado = 'Activo'; EXPLAIN QUERY PLAN SELECT tipo, monto_aprobado, saldo_pendiente, tasa_anual FROM prestamos WHERE cliente_id = 3 AND estado = 'Activo';",
            ],
            requiredKeywords: ['CREATE INDEX', 'SELECT', 'WHERE'],
            solutionQuery: "CREATE INDEX idx_prestamos_cliente_estado ON prestamos(cliente_id, estado); SELECT tipo, monto_aprobado, saldo_pendiente, tasa_anual FROM prestamos WHERE cliente_id = 3 AND estado = 'Activo'; EXPLAIN QUERY PLAN SELECT tipo, monto_aprobado, saldo_pendiente, tasa_anual FROM prestamos WHERE cliente_id = 3 AND estado = 'Activo';",
          },
        ],
      },
      {
        id: 'l-6-2', slug: 'explain-planes-ejecucion',
        title: 'EXPLAIN y Planes de Ejecución',
        description: 'Leer un plan de ejecución, identificar full scans y entender costos. Caso: optimizar queries lentos del banco.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'EXPLAIN QUERY PLAN', content: 'Antes de ejecutar una consulta, el motor SQL crea un <strong>plan de ejecución</strong> que dice cómo va a encontrar los datos.<br><br><code>EXPLAIN QUERY PLAN SELECT ...</code><br><br><strong>Lo que debes buscar:</strong><br>- <code>SCAN TABLE</code>: Recorre TODA la tabla (lento en tablas grandes)<br>- <code>SEARCH TABLE ... USING INDEX</code>: Usa un índice (rápido)<br>- <code>USING COVERING INDEX</code>: El índice tiene todos los datos necesarios (óptimo)<br><br>En PostgreSQL se usa <code>EXPLAIN ANALYZE SELECT ...</code> para ver tiempos reales.' },
          { type: 'code-example', title: 'Comparar con y sin índice', content: '', code: "-- Sin índice: SCAN TABLE (recorre todo)\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones WHERE canal = 'App';\n\n-- Crear índice en canal\nCREATE INDEX idx_trans_canal ON transacciones(canal);\n\n-- Con índice: SEARCH USING INDEX (mucho más rápido)\nEXPLAIN QUERY PLAN\nSELECT * FROM transacciones WHERE canal = 'App';" },
          { type: 'tip', title: 'Regla del 80/20', content: 'El 80% de los problemas de performance se resuelven con:<br>1. Agregar el índice correcto<br>2. Evitar SELECT * (selecciona solo columnas necesarias)<br>3. Limitar resultados con LIMIT<br>4. Filtrar temprano con WHERE antes de hacer JOINs' },
          { type: 'theory', title: 'Paso a paso: Leer un plan de ejecución', content: 'El plan de ejecución te dice EXACTAMENTE cómo el motor SQL va a buscar tus datos. Aprende a leerlo:<br><br><strong>Paso 1 - Ejecutar EXPLAIN QUERY PLAN:</strong> Ponlo antes de cualquier SELECT para ver el plan sin ejecutar la consulta.<br><br><strong>Paso 2 - Buscar SCAN vs SEARCH:</strong><br>- <code>SCAN TABLE nombre</code> = recorre TODA la tabla fila por fila (lento en tablas grandes)<br>- <code>SEARCH TABLE nombre USING INDEX idx</code> = usa un índice para ir directo (rápido)<br>- <code>USING COVERING INDEX</code> = el índice tiene TODOS los datos necesarios, ni siquiera necesita ir a la tabla (óptimo)<br><br><strong>Paso 3 - Identificar operaciones costosas:</strong> Si ves SCAN en una tabla grande, necesitas un índice. Si ves TEMP B-TREE para ORDER BY, un índice en esa columna lo eliminaría.<br><br><strong>Paso 4 - Crear el índice y comparar:</strong> Ejecuta EXPLAIN de nuevo después de crear el índice. El plan debe cambiar de SCAN a SEARCH.' },
          { type: 'code-example', title: 'Lectura detallada de un plan', content: 'Veamos cómo leer un plan con JOIN:', code: "-- Plan para una consulta con JOIN\nEXPLAIN QUERY PLAN\nSELECT t.fecha, t.monto, cl.nombre\nFROM transacciones t\nJOIN cuentas cu ON t.cuenta_origen_id = cu.id\nJOIN clientes_banco cl ON cu.cliente_id = cl.id\nWHERE t.tipo = 'Transferencia'\n  AND t.monto > 1000000;\n\n-- El plan mostrará algo como:\n-- SCAN TABLE transacciones AS t\n-- SEARCH TABLE cuentas AS cu USING INTEGER PRIMARY KEY\n-- SEARCH TABLE clientes_banco AS cl USING INTEGER PRIMARY KEY\n--\n-- Interpretación:\n-- 1. Escanea TODA transacciones (no hay índice en tipo+monto)\n-- 2. Para cada fila, busca en cuentas por PK (rápido)\n-- 3. Para cada cuenta, busca en clientes_banco por PK (rápido)\n-- Cuello de botella: el SCAN de transacciones" },
        ],
        exercises: [
          {
            id: 'e-6-2-1',
            instruction: 'Usa EXPLAIN QUERY PLAN para ver cómo SQLite ejecuta esta consulta: SELECT * FROM transacciones WHERE monto > 5000000 AND estado = "Completada" ORDER BY fecha DESC. Observa si hace SCAN o SEARCH.',
            initialQuery: '-- Analiza el plan de ejecución\n',
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
            instruction: 'Crea un índice en transacciones(monto) y luego vuelve a ejecutar EXPLAIN QUERY PLAN para la misma consulta del ejercicio anterior. Compara si el plan cambió.',
            initialQuery: '',
            hints: [
              'CREATE INDEX idx_trans_monto ON transacciones(monto);',
              'Luego EXPLAIN QUERY PLAN SELECT ... la misma consulta',
              "CREATE INDEX idx_trans_monto ON transacciones(monto); EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
            ],
            requiredKeywords: ['CREATE INDEX', 'EXPLAIN'],
            solutionQuery: "CREATE INDEX idx_trans_monto ON transacciones(monto); EXPLAIN QUERY PLAN SELECT * FROM transacciones WHERE monto > 5000000 AND estado = 'Completada' ORDER BY fecha DESC;",
          },
          {
            id: 'e-6-2-3',
            instruction: 'Compara los planes de ejecución de dos consultas equivalentes. Consulta A: usa una subconsulta correlacionada para encontrar clientes con saldo total > 10M (SELECT nombre FROM clientes_banco WHERE (SELECT SUM(saldo) FROM cuentas WHERE cliente_id = clientes_banco.id) > 10000000). Consulta B: usa JOIN + GROUP BY + HAVING para lo mismo. Ejecuta EXPLAIN QUERY PLAN para ambas y compara.',
            initialQuery: '-- Compara planes de dos consultas equivalentes\n',
            hints: [
              'EXPLAIN QUERY PLAN SELECT ... para la subconsulta correlacionada',
              'EXPLAIN QUERY PLAN SELECT cl.nombre FROM clientes_banco cl JOIN cuentas cu ON cl.id = cu.cliente_id GROUP BY cl.id HAVING SUM(cu.saldo) > 10000000',
              "EXPLAIN QUERY PLAN SELECT nombre FROM clientes_banco WHERE (SELECT SUM(saldo) FROM cuentas WHERE cliente_id = clientes_banco.id) > 10000000; EXPLAIN QUERY PLAN SELECT cl.nombre, SUM(cu.saldo) AS saldo_total FROM clientes_banco cl JOIN cuentas cu ON cl.id = cu.cliente_id GROUP BY cl.id, cl.nombre HAVING SUM(cu.saldo) > 10000000;",
            ],
            requiredKeywords: ['EXPLAIN', 'SELECT', 'SUM'],
            solutionQuery: "EXPLAIN QUERY PLAN SELECT nombre FROM clientes_banco WHERE (SELECT SUM(saldo) FROM cuentas WHERE cliente_id = clientes_banco.id) > 10000000; EXPLAIN QUERY PLAN SELECT cl.nombre, SUM(cu.saldo) AS saldo_total FROM clientes_banco cl JOIN cuentas cu ON cl.id = cu.cliente_id GROUP BY cl.id, cl.nombre HAVING SUM(cu.saldo) > 10000000;",
          },
        ],
      },
      {
        id: 'l-6-3', slug: 'buenas-practicas-performance',
        title: 'Buenas Prácticas de Performance',
        description: 'Desnormalización estratégica, SELECT *, N+1, paginación eficiente y tips de rendimiento.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Anti-patrones de rendimiento', content: '<strong>1. SELECT *:</strong> Trae todas las columnas aunque no las necesites. Desperdicia I/O y memoria.<br><br><strong>2. N+1 Queries:</strong> Hacer 1 query para listar items + N queries para detalles de cada uno. Solución: usar JOIN.<br><br><strong>3. Funciones en WHERE:</strong> <code>WHERE UPPER(nombre) = \'ANA\'</code> no puede usar índice. Mejor: almacenar ya normalizado.<br><br><strong>4. OFFSET grande para paginación:</strong> <code>OFFSET 100000</code> debe recorrer 100K filas antes de retornar. Mejor: paginación por cursor (WHERE id > ultimo_id).' },
          { type: 'code-example', title: 'Paginación eficiente vs ineficiente', content: '', code: "-- MALO: Offset grande (lento en páginas altas)\nSELECT * FROM transacciones\nORDER BY id\nLIMIT 10 OFFSET 10000;\n\n-- BUENO: Paginación por cursor (siempre rápido)\nSELECT id, fecha, monto, tipo\nFROM transacciones\nWHERE id > 10000  -- último id de la página anterior\nORDER BY id\nLIMIT 10;" },
          { type: 'code-example', title: 'Desnormalización estratégica', content: 'A veces guardar un dato redundante es mejor para performance:', code: "-- En vez de calcular total_compras cada vez:\n-- SELECT SUM(total) FROM pedidos WHERE cliente_id = 1\n\n-- Guardamos total_compras en la tabla clientes\n-- y lo actualizamos con cada pedido\nSELECT nombre, total_compras\nFROM clientes\nWHERE total_compras > 10000000\nORDER BY total_compras DESC;\n\n-- Esto es desnormalización estratégica:\n-- sacrificamos normalización por velocidad de lectura" },
          { type: 'tip', title: 'Checklist de optimización', content: '1. Selecciona solo las columnas que necesitas<br>2. Filtra lo antes posible (WHERE antes de JOIN si puedes)<br>3. Crea índices en columnas de WHERE, JOIN y ORDER BY frecuentes<br>4. Usa LIMIT siempre que puedas<br>5. Evita subconsultas correlacionadas cuando un JOIN funcione<br>6. Mide con EXPLAIN antes de optimizar' },
          { type: 'theory', title: 'Paso a paso: Optimizar una consulta lenta', content: 'Sigamos un proceso sistemático para optimizar una consulta lenta:<br><br><strong>Paso 1 - Identificar la consulta problemática:</strong> En un banco, la consulta más frecuente es buscar transacciones recientes de un cliente por canal.<br><br><strong>Paso 2 - Analizar con EXPLAIN:</strong> Ejecutar EXPLAIN QUERY PLAN para ver dónde está el cuello de botella. Normalmente será un SCAN TABLE.<br><br><strong>Paso 3 - Eliminar SELECT *:</strong> Seleccionar solo las columnas necesarias reduce I/O.<br><br><strong>Paso 4 - Agregar índice estratégico:</strong> Crear índice en las columnas del WHERE y ORDER BY.<br><br><strong>Paso 5 - Reescribir JOINs ineficientes:</strong> Si hay subconsultas correlacionadas, convertirlas a JOIN. Si hay N+1 queries, consolidar en uno solo.<br><br><strong>Paso 6 - Verificar mejora:</strong> Ejecutar EXPLAIN de nuevo y confirmar que cambió de SCAN a SEARCH.' },
          { type: 'code-example', title: 'Optimización completa de una consulta', content: 'De una consulta lenta a una optimizada:', code: "-- ANTES: Consulta lenta (3 anti-patrones)\n-- 1. SELECT * (trae todo)\n-- 2. Subconsulta correlacionada (N+1)\n-- 3. Sin índice\n\n-- SELECT * FROM transacciones t\n-- WHERE t.cuenta_origen_id IN (\n--   SELECT id FROM cuentas\n--   WHERE cliente_id = (\n--     SELECT id FROM clientes_banco WHERE nombre = 'Carlos Mendez'\n--   )\n-- );\n\n-- DESPUÉS: Consulta optimizada\n-- 1. Solo columnas necesarias\n-- 2. JOINs en vez de subconsultas\n-- 3. Con índice\nSELECT t.fecha, t.tipo, t.monto, t.canal, t.estado\nFROM transacciones t\nJOIN cuentas cu ON t.cuenta_origen_id = cu.id\nJOIN clientes_banco cl ON cu.cliente_id = cl.id\nWHERE cl.nombre = 'Carlos Mendez'\nORDER BY t.fecha DESC\nLIMIT 20;\n\n-- El JOIN es más eficiente que subconsultas anidadas\n-- porque el optimizador puede elegir el mejor plan" },
          { type: 'code-example', title: 'N+1 vs JOIN: El anti-patrón más común', content: 'El problema N+1 ocurre cuando haces 1 query para listar + N queries para detalles:', code: "-- ANTI-PATRÓN N+1 (pseudocódigo):\n-- Query 1: SELECT id FROM sucursales (10 resultados)\n-- Query 2: SELECT COUNT(*) FROM clientes_banco WHERE sucursal_id = 1\n-- Query 3: SELECT COUNT(*) FROM clientes_banco WHERE sucursal_id = 2\n-- ... (10 queries adicionales!)\n\n-- SOLUCIÓN: Un solo JOIN con GROUP BY\nSELECT\n  s.nombre AS sucursal,\n  s.ciudad,\n  COUNT(cl.id) AS num_clientes,\n  ROUND(AVG(cl.ingresos_mensuales), 0) AS ingreso_promedio\nFROM sucursales s\nLEFT JOIN clientes_banco cl ON s.id = cl.sucursal_id\nGROUP BY s.id, s.nombre, s.ciudad\nORDER BY num_clientes DESC;\n-- 1 solo query en vez de 11!" },
        ],
        exercises: [
          {
            id: 'e-6-3-1',
            instruction: 'Reescribe esta consulta ineficiente de forma optimizada: "SELECT * FROM transacciones WHERE UPPER(tipo) = \'TRANSFERENCIA\' ORDER BY fecha LIMIT 100". Selecciona solo id, fecha, monto, canal (no SELECT *), y usa el valor correcto de tipo sin UPPER.',
            initialQuery: '-- Reescribe de forma optimizada\n',
            hints: [
              'Cambia SELECT * por columnas específicas',
              'Cambia WHERE UPPER(tipo) = ... por WHERE tipo = "Transferencia"',
              "SELECT id, fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' ORDER BY fecha DESC LIMIT 100;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'LIMIT'],
            solutionQuery: "SELECT id, fecha, monto, canal FROM transacciones WHERE tipo = 'Transferencia' ORDER BY fecha DESC LIMIT 100;",
          },
          {
            id: 'e-6-3-2',
            instruction: 'Implementa paginación por cursor: muestra las transacciones con id > 50 ordenadas por id, limitadas a 10 filas. Muestra id, fecha, tipo y monto.',
            initialQuery: '',
            hints: [
              'WHERE id > 50 ORDER BY id LIMIT 10',
              'Esto es más eficiente que OFFSET para páginas lejanas',
              "SELECT id, fecha, tipo, monto FROM transacciones WHERE id > 50 ORDER BY id LIMIT 10;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'],
            solutionQuery: "SELECT id, fecha, tipo, monto FROM transacciones WHERE id > 50 ORDER BY id LIMIT 10;",
          },
          {
            id: 'e-6-3-3',
            instruction: 'Resuelve un problema N+1: en vez de consultar cada sucursal individualmente, escribe UNA sola consulta con JOIN que muestre para cada sucursal: nombre, ciudad, número de clientes activos, número de cuentas totales, y suma total de saldos. Ordena por suma de saldos descendente.',
            initialQuery: '-- Resolver N+1 con un solo JOIN\n',
            hints: [
              'Necesitas JOIN sucursales -> clientes_banco -> cuentas, con GROUP BY sucursal',
              'Filtra clientes activos con WHERE cl.estado = "Activo"',
              "SELECT s.nombre AS sucursal, s.ciudad, COUNT(DISTINCT cl.id) AS clientes_activos, COUNT(cu.id) AS num_cuentas, COALESCE(SUM(cu.saldo), 0) AS saldo_total FROM sucursales s LEFT JOIN clientes_banco cl ON s.id = cl.sucursal_id AND cl.estado = 'Activo' LEFT JOIN cuentas cu ON cl.id = cu.cliente_id GROUP BY s.id, s.nombre, s.ciudad ORDER BY saldo_total DESC;",
            ],
            requiredKeywords: ['SELECT', 'JOIN', 'GROUP BY', 'SUM'],
            solutionQuery: "SELECT s.nombre AS sucursal, s.ciudad, COUNT(DISTINCT cl.id) AS clientes_activos, COUNT(cu.id) AS num_cuentas, COALESCE(SUM(cu.saldo), 0) AS saldo_total FROM sucursales s LEFT JOIN clientes_banco cl ON s.id = cl.sucursal_id AND cl.estado = 'Activo' LEFT JOIN cuentas cu ON cl.id = cu.cliente_id GROUP BY s.id, s.nombre, s.ciudad ORDER BY saldo_total DESC;",
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
          { type: 'theory', title: '¿Qué es una transacción?', content: 'Una <strong>transacción</strong> es un grupo de operaciones SQL que se ejecutan como una <strong>unidad atómica</strong>: o todas se completan, o ninguna se aplica.<br><br><strong>ACID:</strong><br>- <strong>Atomicidad:</strong> Todo o nada. Si falla una parte, se deshace todo.<br>- <strong>Consistencia:</strong> La BD pasa de un estado válido a otro estado válido.<br>- <strong>Aislamiento:</strong> Transacciones concurrentes no se interfieren.<br>- <strong>Durabilidad:</strong> Una vez confirmada (COMMIT), los datos persisten aunque falle el sistema.' },
          { type: 'code-example', title: 'Transferencia bancaria segura', content: 'Sin transacciones, una falla entre el débito y crédito deja dinero "perdido":', code: "-- Transferencia de 500,000 COP de cuenta 1 a cuenta 5\nBEGIN;\n\n-- Paso 1: Debitar de la cuenta origen\nUPDATE cuentas SET saldo = saldo - 500000\nWHERE id = 1 AND saldo >= 500000;\n\n-- Paso 2: Acreditar en la cuenta destino\nUPDATE cuentas SET saldo = saldo + 500000\nWHERE id = 5;\n\n-- Paso 3: Registrar la transacción\nINSERT INTO transacciones (id, cuenta_origen_id, cuenta_destino_id, tipo, monto, fecha, estado, canal)\nVALUES (201, 1, 5, 'Transferencia', 500000, '2025-02-01', 'Completada', 'App');\n\nCOMMIT;\n\n-- Verificar saldos\nSELECT id, tipo, saldo FROM cuentas WHERE id IN (1, 5);" },
          { type: 'code-example', title: 'ROLLBACK: Deshacer cambios', content: '', code: "-- Si algo sale mal, ROLLBACK deshace todo\nBEGIN;\nUPDATE cuentas SET saldo = saldo - 99999999 WHERE id = 1;\n-- Ups! Monto incorrecto, deshacemos\nROLLBACK;\n\n-- El saldo queda intacto\nSELECT id, saldo FROM cuentas WHERE id = 1;" },
          { type: 'warning', title: 'Siempre usar transacciones en banca', content: 'En sistemas financieros, TODA operación que modifique datos debe estar dentro de una transacción. Una transferencia sin transacción puede dejar dinero perdido o duplicado si hay un fallo entre operaciones.' },
          { type: 'theory', title: 'Paso a paso: Transacción con verificación en cada etapa', content: 'Vamos a construir una transacción bancaria completa paso a paso, verificando el estado en cada etapa para entender cómo funciona la atomicidad.<br><br><strong>Paso 1:</strong> Verificar saldos ANTES de operar.<br><strong>Paso 2:</strong> Iniciar la transacción y debitar.<br><strong>Paso 3:</strong> Verificar que el débito fue correcto.<br><strong>Paso 4:</strong> Acreditar y registrar la operación.<br><strong>Paso 5:</strong> Verificar saldos DESPUÉS y confirmar con COMMIT.' },
          { type: 'code-example', title: 'Paso 1: Verificar estado inicial', content: 'Siempre revisa los saldos antes de operar:', code: "-- Paso 1: Ver saldos actuales de las cuentas involucradas\nSELECT id, cliente_id, tipo, saldo\nFROM cuentas\nWHERE id IN (1, 5)\nORDER BY id;" },
          { type: 'code-example', title: 'Pasos 2-5: Transacción completa con verificaciones', content: 'Ejecutamos la transacción verificando en cada paso:', code: "-- Paso 2: Iniciar transacción y debitar\nBEGIN;\nUPDATE cuentas SET saldo = saldo - 750000\nWHERE id = 1 AND saldo >= 750000;\n\n-- Paso 3: Verificar débito (dentro de la transacción)\nSELECT id, saldo FROM cuentas WHERE id = 1;\n\n-- Paso 4: Acreditar cuenta destino\nUPDATE cuentas SET saldo = saldo + 750000 WHERE id = 5;\n\n-- Paso 5: Verificar ambas cuentas y confirmar\nSELECT id, saldo FROM cuentas WHERE id IN (1, 5);\nCOMMIT;" },
          { type: 'code-example', title: 'SAVEPOINT: Puntos de guardado parciales', content: 'SAVEPOINT permite deshacer parte de una transacción sin cancelarla completa:', code: "-- SAVEPOINT permite rollback parcial\nBEGIN;\n\nUPDATE cuentas SET saldo = saldo - 200000 WHERE id = 2;\nSAVEPOINT despues_debito;\n\nUPDATE cuentas SET saldo = saldo + 200000 WHERE id = 99;\n-- Ups! Deshacemos SOLO esta operación\nROLLBACK TO despues_debito;\n\nUPDATE cuentas SET saldo = saldo + 200000 WHERE id = 3;\nCOMMIT;\nSELECT id, saldo FROM cuentas WHERE id IN (2, 3);" },
          { type: 'tip', title: 'Cuándo usar SAVEPOINT', content: 'SAVEPOINT es ideal cuando una transacción tiene múltiples pasos y quieres manejar errores parciales sin perder todo el trabajo previo. En banca, se usa para reintentar operaciones fallidas dentro de la misma transacción.' },
        ],
        exercises: [
          {
            id: 'e-7-1-1',
            instruction: 'Realiza una transferencia de 1,000,000 COP de la cuenta 3 a la cuenta 7 usando una transacción. Debita de cuenta 3, acredita en cuenta 7, y verifica los saldos finales de ambas cuentas.',
            initialQuery: '-- Transferencia segura con transacción\nBEGIN;\n',
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
            instruction: 'Inicia una transacción, actualiza el saldo de la cuenta 1 a 0, verifica con SELECT que el saldo es 0, y luego haz ROLLBACK. Finalmente verifica que el saldo original se restauró.',
            initialQuery: '',
            hints: [
              'BEGIN; UPDATE ... ; SELECT ...; ROLLBACK; SELECT ...;',
              'El ROLLBACK deshace el UPDATE',
              "BEGIN; UPDATE cuentas SET saldo = 0 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; ROLLBACK; SELECT id, saldo FROM cuentas WHERE id = 1;",
            ],
            requiredKeywords: ['BEGIN', 'ROLLBACK', 'UPDATE'],
            solutionQuery: "BEGIN; UPDATE cuentas SET saldo = 0 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; ROLLBACK; SELECT id, saldo FROM cuentas WHERE id = 1;",
          },
          {
            id: 'e-7-1-3',
            instruction: 'Simula una operación bancaria multi-paso usando SAVEPOINT: Inicia una transacción, debita 300,000 de la cuenta 2, crea un SAVEPOINT, intenta acreditar 300,000 a la cuenta 2 misma (error lógico), haz ROLLBACK TO al savepoint, acredita 300,000 a la cuenta 4, y confirma. Verifica saldos de cuentas 2 y 4.',
            initialQuery: '-- Operación multi-paso con SAVEPOINT\nBEGIN;\n',
            hints: [
              'Usa SAVEPOINT nombre_punto; después del débito',
              'ROLLBACK TO nombre_punto; deshace solo hasta el savepoint',
              "BEGIN; UPDATE cuentas SET saldo = saldo - 300000 WHERE id = 2; SAVEPOINT punto_seguro; UPDATE cuentas SET saldo = saldo + 300000 WHERE id = 2; ROLLBACK TO punto_seguro; UPDATE cuentas SET saldo = saldo + 300000 WHERE id = 4; COMMIT; SELECT id, tipo, saldo FROM cuentas WHERE id IN (2, 4);",
            ],
            requiredKeywords: ['BEGIN', 'SAVEPOINT', 'ROLLBACK TO', 'COMMIT'],
            solutionQuery: "BEGIN; UPDATE cuentas SET saldo = saldo - 300000 WHERE id = 2; SAVEPOINT punto_seguro; UPDATE cuentas SET saldo = saldo + 300000 WHERE id = 2; ROLLBACK TO punto_seguro; UPDATE cuentas SET saldo = saldo + 300000 WHERE id = 4; COMMIT; SELECT id, tipo, saldo FROM cuentas WHERE id IN (2, 4);",
          },
        ],
      },
      {
        id: 'l-7-2', slug: 'aislamiento-concurrencia',
        title: 'Niveles de Aislamiento y Concurrencia',
        description: 'READ COMMITTED, REPEATABLE READ, SERIALIZABLE, problemas de concurrencia y MVCC.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'Problemas de concurrencia', content: 'Cuando múltiples usuarios acceden a la BD simultáneamente, pueden ocurrir:<br><br>- <strong>Dirty Read:</strong> Leer datos de una transacción que aún no hizo COMMIT (puede hacer ROLLBACK)<br>- <strong>Non-Repeatable Read:</strong> Leer el mismo dato dos veces y obtener valores distintos (otro usuario lo modificó)<br>- <strong>Phantom Read:</strong> Una consulta retorna filas diferentes al ejecutarse dos veces (otro usuario insertó/eliminó filas)' },
          { type: 'theory', title: 'Niveles de aislamiento', content: '<strong>READ UNCOMMITTED:</strong> Sin protección. Permite dirty reads. Casi nunca se usa.<br><br><strong>READ COMMITTED (default en PostgreSQL):</strong> Solo lee datos confirmados. Previene dirty reads.<br><br><strong>REPEATABLE READ (default en MySQL InnoDB):</strong> Las lecturas son consistentes dentro de la transacción. Previene non-repeatable reads.<br><br><strong>SERIALIZABLE:</strong> Aislamiento total. Las transacciones se ejecutan como si fueran secuenciales. Más seguro pero más lento.' },
          { type: 'code-example', title: 'MVCC: Control de concurrencia', content: 'PostgreSQL usa MVCC (Multi-Version Concurrency Control):', code: "-- MVCC mantiene múltiples versiones de cada fila\n-- Esto permite que lecturas y escrituras no se bloqueen\n\n-- Transacción A (lector):\n-- BEGIN;\n-- SELECT saldo FROM cuentas WHERE id = 1;\n-- (ve la versión antes de que B modifique)\n\n-- Transacción B (escritor, simultánea):\n-- BEGIN;\n-- UPDATE cuentas SET saldo = saldo - 100000 WHERE id = 1;\n-- COMMIT;\n\n-- Transacción A sigue viendo el saldo original\n-- hasta que haga COMMIT y empiece nueva transacción\n\n-- En SQLite, el aislamiento es SERIALIZABLE por defecto\nSELECT * FROM cuentas LIMIT 5;" },
          { type: 'tip', title: 'En la práctica', content: '<strong>READ COMMITTED</strong> es suficiente para el 90% de aplicaciones web.<br><strong>SERIALIZABLE</strong> se usa en sistemas financieros críticos donde la consistencia es más importante que la velocidad.<br>SQLite usa un modelo simplificado: serializa todas las escrituras con un lock a nivel archivo.' },
          { type: 'theory', title: 'Ejemplos prácticos de aislamiento', content: 'Veamos cómo se comporta el aislamiento con un ejemplo concreto del banco. Dentro de una transacción, siempre ves tus propios cambios, pero otros usuarios no los ven hasta el COMMIT.' },
          { type: 'code-example', title: 'Lecturas consistentes dentro de transacción', content: 'Dentro de una transacción, tus lecturas reflejan tus propias escrituras:', code: "-- Verificamos que nuestra transacción ve sus propios cambios\nBEGIN;\n\n-- Leemos el saldo original\nSELECT id, saldo FROM cuentas WHERE id = 1;\n\n-- Hacemos un depósito\nUPDATE cuentas SET saldo = saldo + 500000 WHERE id = 1;\n\n-- Nuestra transacción VE el nuevo saldo\nSELECT id, saldo FROM cuentas WHERE id = 1;\n\n-- Pero si hacemos ROLLBACK, todo se revierte\nROLLBACK;\n\n-- El saldo original se mantiene\nSELECT id, saldo FROM cuentas WHERE id = 1;" },
          { type: 'code-example', title: 'Tabla de aislamiento vs problemas', content: 'Resumen de qué previene cada nivel:', code: "-- Tabla resumen (conceptual)\nSELECT\n  'READ UNCOMMITTED' AS nivel, 'Ninguno' AS previene,\n  'Permite dirty reads, non-repeatable, phantom' AS problemas\nUNION ALL SELECT\n  'READ COMMITTED', 'Dirty Reads',\n  'Permite non-repeatable reads, phantom reads'\nUNION ALL SELECT\n  'REPEATABLE READ', 'Dirty + Non-Repeatable',\n  'Permite phantom reads'\nUNION ALL SELECT\n  'SERIALIZABLE', 'Todos',\n  'Más lento pero totalmente seguro';" },
        ],
        exercises: [
          {
            id: 'e-7-2-1',
            instruction: 'Simula un escenario de concurrencia: dentro de una transacción, lee el saldo de la cuenta 1, luego haz un UPDATE del saldo, y vuelve a leer. Verifica que dentro de la misma transacción los cambios son visibles. Haz COMMIT al final.',
            initialQuery: '',
            hints: [
              'BEGIN; SELECT saldo FROM cuentas WHERE id = 1; UPDATE ...; SELECT ...; COMMIT;',
              'Dentro de la misma transacción siempre ves tus propios cambios',
              "BEGIN; SELECT id, saldo FROM cuentas WHERE id = 1; UPDATE cuentas SET saldo = saldo + 100000 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; COMMIT;",
            ],
            requiredKeywords: ['BEGIN', 'SELECT', 'UPDATE', 'COMMIT'],
            solutionQuery: "BEGIN; SELECT id, saldo FROM cuentas WHERE id = 1; UPDATE cuentas SET saldo = saldo + 100000 WHERE id = 1; SELECT id, saldo FROM cuentas WHERE id = 1; COMMIT;",
          },
          {
            id: 'e-7-2-2',
            instruction: 'Demuestra la consistencia transaccional: dentro de una transacción, haz dos depósitos de 250,000 a la cuenta 3 (dos UPDATEs separados), luego verifica que el saldo aumentó exactamente 500,000. Haz ROLLBACK al final para no alterar los datos.',
            initialQuery: '-- Consistencia: dos depósitos en una transacción\n',
            hints: [
              'Primero lee el saldo, luego haz dos UPDATE sumando 250000 cada uno',
              'Al final, SELECT debe mostrar saldo_original + 500000. Usa ROLLBACK para no guardar.',
              "BEGIN; SELECT id, saldo AS saldo_antes FROM cuentas WHERE id = 3; UPDATE cuentas SET saldo = saldo + 250000 WHERE id = 3; UPDATE cuentas SET saldo = saldo + 250000 WHERE id = 3; SELECT id, saldo AS saldo_despues FROM cuentas WHERE id = 3; ROLLBACK;",
            ],
            requiredKeywords: ['BEGIN', 'UPDATE', 'SELECT', 'ROLLBACK'],
            solutionQuery: "BEGIN; SELECT id, saldo AS saldo_antes FROM cuentas WHERE id = 3; UPDATE cuentas SET saldo = saldo + 250000 WHERE id = 3; UPDATE cuentas SET saldo = saldo + 250000 WHERE id = 3; SELECT id, saldo AS saldo_despues FROM cuentas WHERE id = 3; ROLLBACK;",
          },
        ],
      },
      {
        id: 'l-7-3', slug: 'seguridad-bd',
        title: 'Seguridad en Bases de Datos',
        description: 'GRANT/REVOKE, roles, Row-Level Security, SQL Injection, encriptación y auditoría.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Control de acceso', content: '<strong>GRANT / REVOKE</strong> controlan quién puede hacer qué:<br><code>GRANT SELECT ON clientes TO usuario_reportes;</code><br><code>REVOKE DELETE ON clientes FROM usuario_app;</code><br><br><strong>Roles:</strong> Agrupan permisos reutilizables:<br><code>CREATE ROLE analista;</code><br><code>GRANT SELECT ON ALL TABLES TO analista;</code><br><br><strong>Row-Level Security (RLS):</strong> Filtra filas automáticamente según el usuario. Cada usuario solo ve sus datos. Supabase usa RLS extensivamente.' },
          { type: 'warning', title: 'SQL Injection: La vulnerabilidad #1', content: '<strong>SQL Injection</strong> es cuando un atacante inserta SQL malicioso a través de inputs de usuario.<br><br><strong>VULNERABLE:</strong><br><code>"SELECT * FROM users WHERE email = \'" + userInput + "\'"</code><br>Si el usuario ingresa: <code>\' OR 1=1 --</code><br>La consulta se convierte en: <code>SELECT * FROM users WHERE email = \'\' OR 1=1 --\'</code><br>Y retorna TODOS los usuarios.<br><br><strong>SOLUCIÓN:</strong> Siempre usar <strong>parámetros preparados</strong>:<br><code>SELECT * FROM users WHERE email = $1</code><br>(Nunca concatenar inputs del usuario en SQL)' },
          { type: 'code-example', title: 'SQL Injection: Ejemplos educativos', content: 'Veamos cómo funciona SQL injection y cómo prevenirlo:', code: "-- EJEMPLO: Login bypass\n-- Código vulnerable: query = 'SELECT * FROM users WHERE user=' + input\n-- Si el atacante ingresa: ' OR '1'='1' --\n-- Resultado: retorna TODOS los usuarios\n\n-- EJEMPLO: Extracción de datos via UNION\n-- Un atacante puede inyectar UNION SELECT para\n-- extraer datos de otras tablas (cédulas, emails)\n\n-- PREVENCIÓN: Siempre usar parámetros preparados\n-- PostgreSQL: SELECT * FROM users WHERE email = $1\n-- MySQL: SELECT * FROM users WHERE email = ?\n-- Python: cursor.execute('SELECT ... WHERE email = %s', (email,))\n\n-- Verificar datos sensibles en nuestro banco\nSELECT COUNT(*) AS total_clientes FROM clientes_banco;" },
          { type: 'code-example', title: 'Auditoría: Rastrear cambios', content: 'En producción, es fundamental saber quién hizo qué:', code: "-- Tabla de auditoría para rastrear cambios\nCREATE TABLE auditoria_cuentas (\n  id INTEGER PRIMARY KEY,\n  cuenta_id INTEGER NOT NULL,\n  operacion TEXT NOT NULL,\n  saldo_antes REAL,\n  saldo_despues REAL,\n  monto REAL,\n  fecha TEXT DEFAULT (datetime('now')),\n  FOREIGN KEY (cuenta_id) REFERENCES cuentas(id)\n);\n\n-- Registrar una operación\nINSERT INTO auditoria_cuentas (id, cuenta_id, operacion, saldo_antes, saldo_despues, monto)\nSELECT\n  1,\n  id,\n  'Debito',\n  saldo AS saldo_antes,\n  saldo - 500000 AS saldo_despues,\n  500000\nFROM cuentas WHERE id = 1;\n\nSELECT * FROM auditoria_cuentas;" },
          { type: 'code-example', title: 'Concepto de Trigger para auditoría', content: 'Un TRIGGER ejecuta código automáticamente cuando ocurre un evento en una tabla:', code: "-- Concepto de trigger (sintaxis PostgreSQL)\n-- Se dispara automáticamente con cada UPDATE:\n--\n-- CREATE TRIGGER audit_saldo_cambio\n-- AFTER UPDATE ON cuentas\n-- FOR EACH ROW\n-- WHEN (OLD.saldo != NEW.saldo)\n-- EXECUTE FUNCTION registrar_cambio_saldo();\n--\n-- En SQLite podemos simular manualmente:\n-- 1. Guardar saldo antes\n-- 2. Hacer el UPDATE\n-- 3. Registrar en auditoría\nSELECT id, saldo AS saldo_actual FROM cuentas WHERE id = 1;" },
          { type: 'tip', title: 'Principio de mínimo privilegio', content: 'Cada usuario o aplicación debe tener SOLO los permisos que necesita:<br>- La app web: SELECT, INSERT, UPDATE (nunca DROP o DELETE masivo)<br>- El equipo de analytics: Solo SELECT<br>- El DBA: Todos los permisos<br>- El backup: Solo SELECT y COPY' },
        ],
        exercises: [
          {
            id: 'e-7-3-1',
            instruction: 'Crea una tabla de auditoría llamada "log_transacciones" con: id (PK), transaccion_id (INTEGER), accion (TEXT), detalle (TEXT), fecha (TEXT DEFAULT datetime now). Inserta un registro de auditoría para la transacción id=1 con accion "Revision" y detalle "Verificacion manual de monto". Muestra el log.',
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
            instruction: 'Simula una consulta de auditoría: muestra las 10 transacciones de mayor monto con estado "Completada", junto al nombre del titular de la cuenta origen. Esto sería lo que un auditor revisaría para detectar operaciones sospechosas.',
            initialQuery: '',
            hints: [
              'JOIN transacciones con cuentas y clientes_banco',
              'ORDER BY monto DESC LIMIT 10',
              "SELECT t.id, t.fecha, t.tipo, t.monto, t.canal, cl.nombre AS titular FROM transacciones t JOIN cuentas cu ON t.cuenta_origen_id = cu.id JOIN clientes_banco cl ON cu.cliente_id = cl.id WHERE t.estado = 'Completada' ORDER BY t.monto DESC LIMIT 10;",
            ],
            requiredKeywords: ['JOIN', 'ORDER BY', 'LIMIT'],
            solutionQuery: "SELECT t.id, t.fecha, t.tipo, t.monto, t.canal, cl.nombre AS titular FROM transacciones t JOIN cuentas cu ON t.cuenta_origen_id = cu.id JOIN clientes_banco cl ON cu.cliente_id = cl.id WHERE t.estado = 'Completada' ORDER BY t.monto DESC LIMIT 10;",
          },
          {
            id: 'e-7-3-3',
            instruction: 'Crea una tabla "audit_saldos" con: id (PK), cuenta_id (INTEGER NOT NULL), operacion (TEXT NOT NULL), saldo_antes (REAL), saldo_despues (REAL), monto_cambio (REAL), fecha (TEXT DEFAULT datetime now). Simula un trigger manual: registra en audit_saldos el cambio de sumar 1,000,000 a la cuenta 5 (capturando saldo antes y después con INSERT...SELECT), luego haz el UPDATE, y muestra el registro de auditoría.',
            initialQuery: '-- Simula un trigger de auditoría manual\n',
            hints: [
              'CREATE TABLE audit_saldos, luego INSERT INTO audit_saldos ... SELECT para capturar el saldo actual',
              'Usa INSERT ... SELECT que lea el saldo actual de cuentas para registrar el saldo_antes',
              "CREATE TABLE audit_saldos (id INTEGER PRIMARY KEY, cuenta_id INTEGER NOT NULL, operacion TEXT NOT NULL, saldo_antes REAL, saldo_despues REAL, monto_cambio REAL, fecha TEXT DEFAULT (datetime('now'))); INSERT INTO audit_saldos (id, cuenta_id, operacion, saldo_antes, saldo_despues, monto_cambio) SELECT 1, id, 'Deposito', saldo, saldo + 1000000, 1000000 FROM cuentas WHERE id = 5; UPDATE cuentas SET saldo = saldo + 1000000 WHERE id = 5; SELECT * FROM audit_saldos;",
            ],
            requiredKeywords: ['CREATE TABLE', 'INSERT', 'UPDATE', 'SELECT'],
            solutionQuery: "CREATE TABLE audit_saldos (id INTEGER PRIMARY KEY, cuenta_id INTEGER NOT NULL, operacion TEXT NOT NULL, saldo_antes REAL, saldo_despues REAL, monto_cambio REAL, fecha TEXT DEFAULT (datetime('now'))); INSERT INTO audit_saldos (id, cuenta_id, operacion, saldo_antes, saldo_despues, monto_cambio) SELECT 1, id, 'Deposito', saldo, saldo + 1000000, 1000000 FROM cuentas WHERE id = 5; UPDATE cuentas SET saldo = saldo + 1000000 WHERE id = 5; SELECT * FROM audit_saldos;",
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
    description: 'Análisis de cohortes, funnels, métricas de producto y tendencias modernas con datos de una plataforma de streaming.',
    icon: '&#x1F680;',
    weekRange: [14, 14],
    dataset: 'streaming',
    order: 8,
    lessons: [
      {
        id: 'l-8-1', slug: 'analisis-cohortes-sql',
        title: 'Análisis de Cohortes con SQL',
        description: 'Agrupar usuarios por mes de registro y medir retención. Caso: retención de StreamCo.',
        difficulty: 'avanzado', estimatedMinutes: 40,
        content: [
          { type: 'theory', title: '¿Qué es un análisis de cohortes?', content: 'Un <strong>análisis de cohortes</strong> agrupa usuarios por una característica común (normalmente su mes/semana de registro) y mide su comportamiento a lo largo del tiempo.<br><br><strong>Preguntas que responde:</strong><br>- Los usuarios que se registraron en enero siguen activos en marzo?<br>- ¿Cuál cohorte tiene mejor retención?<br>- El producto está mejorando o empeorando para nuevos usuarios?<br><br>Es una de las herramientas MÁS importantes en ciencia de datos de producto.' },
          { type: 'code-example', title: 'Cohortes por mes de registro', content: 'Agrupamos usuarios por su mes de registro y contamos cuántos están en cada plan:', code: "SELECT\n  strftime('%Y-%m', fecha_registro) AS cohorte_mes,\n  plan_actual,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos\nFROM usuarios_streaming\nGROUP BY cohorte_mes, plan_actual\nORDER BY cohorte_mes, usuarios DESC;" },
          { type: 'code-example', title: 'Retención por cohorte', content: 'Medimos la actividad de cada cohorte comparando registro vs última actividad:', code: "WITH cohortes AS (\n  SELECT\n    id,\n    strftime('%Y-%m', fecha_registro) AS cohorte,\n    strftime('%Y-%m', ultima_actividad) AS mes_actividad,\n    plan_actual,\n    estado\n  FROM usuarios_streaming\n)\nSELECT\n  cohorte,\n  COUNT(*) AS total_usuarios,\n  SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos,\n  ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion\nFROM cohortes\nGROUP BY cohorte\nORDER BY cohorte;" },
          { type: 'tip', title: 'Pensar como data scientist', content: 'En una empresa real, el análisis de cohortes se presenta así:<br>1. Eje X: tiempo desde el registro (mes 0, mes 1, mes 2...)<br>2. Eje Y: cohortes (enero, febrero, marzo...)<br>3. Valores: % de retención<br><br>Con SQL calculas los datos; con Python/Looker/Metabase haces la visualización.' },
          { type: 'theory', title: 'Paso a paso: Construir una matriz de cohortes', content: 'Vamos a construir una matriz de cohortes completa paso a paso.<br><br><strong>Paso 1:</strong> Identificar la cohorte de cada usuario (mes de registro).<br><strong>Paso 2:</strong> Calcular métricas de actividad por cohorte.<br><strong>Paso 3:</strong> Enriquecer con datos de engagement y revenue.' },
          { type: 'code-example', title: 'Paso 1: Asignar cohorte a cada usuario', content: 'Primero identificamos la cohorte de cada usuario:', code: "-- Cada usuario pertenece a la cohorte de su mes de registro\nSELECT\n  id, nombre,\n  strftime('%Y-%m', fecha_registro) AS cohorte,\n  estado, plan_actual\nFROM usuarios_streaming\nORDER BY cohorte, nombre\nLIMIT 15;" },
          { type: 'code-example', title: 'Pasos 2-3: Matriz de cohortes con métricas', content: 'Construimos la matriz cruzando cohorte con engagement:', code: "WITH cohorte_data AS (\n  SELECT\n    strftime('%Y-%m', fecha_registro) AS cohorte,\n    estado, contenidos_vistos, ingreso_mensual,\n    CAST((JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro)) / 30 AS INTEGER) AS meses_activo\n  FROM usuarios_streaming\n)\nSELECT\n  cohorte,\n  COUNT(*) AS total,\n  SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos,\n  ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos,\n  ROUND(AVG(meses_activo), 1) AS avg_meses_activo,\n  SUM(CASE WHEN estado = 'Activo' THEN ingreso_mensual ELSE 0 END) AS mrr_cohorte\nFROM cohorte_data\nGROUP BY cohorte\nORDER BY cohorte;" },
        ],
        exercises: [
          {
            id: 'e-8-1-1',
            instruction: 'Analiza las cohortes de StreamCo: para cada mes de registro (cohorte), muestra cuántos usuarios se registraron, cuántos siguen activos, cuántos cancelaron, y el porcentaje de retención. Ordena por cohorte.',
            initialQuery: '-- Análisis de cohortes de StreamCo\n',
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
            instruction: 'Compara la retención por plan: para cada plan (Basico, Estandar, Premium), muestra total de usuarios, activos, cancelados y porcentaje de retención. ¿Cuál plan retiene mejor?',
            initialQuery: '',
            hints: [
              'GROUP BY plan_actual en vez de por cohorte',
              "SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) para activos",
              "SELECT plan_actual, COUNT(*) AS total, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY plan_actual ORDER BY pct_retencion DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'CASE', 'ROUND'],
            solutionQuery: "SELECT plan_actual, COUNT(*) AS total, SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos, SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados, ROUND(SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_retencion FROM usuarios_streaming GROUP BY plan_actual ORDER BY pct_retencion DESC;",
          },
          {
            id: 'e-8-1-3',
            instruction: 'Análisis de engagement por cohorte usando la tabla reproducciones: para cada mes de registro del usuario (cohorte), calcula el total de reproducciones, el promedio de minutos vistos por reproducción, y el porcentaje de reproducciones completadas. Usa JOIN entre reproducciones y usuarios.',
            initialQuery: '-- Engagement por cohorte desde reproducciones\n',
            hints: [
              'JOIN reproducciones r ON u.id = r.usuario_id, luego GROUP BY cohorte del usuario',
              "strftime('%Y-%m', u.fecha_registro) AS cohorte y AVG(r.duracion_vista_min)",
              "SELECT strftime('%Y-%m', u.fecha_registro) AS cohorte, COUNT(r.id) AS total_reproducciones, ROUND(AVG(r.duracion_vista_min), 1) AS avg_min_vistos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.id), 1) AS pct_completado FROM usuarios u JOIN reproducciones r ON u.id = r.usuario_id GROUP BY cohorte ORDER BY cohorte;",
            ],
            requiredKeywords: ['JOIN', 'GROUP BY', 'AVG', 'CASE'],
            solutionQuery: "SELECT strftime('%Y-%m', u.fecha_registro) AS cohorte, COUNT(r.id) AS total_reproducciones, ROUND(AVG(r.duracion_vista_min), 1) AS avg_min_vistos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.id), 1) AS pct_completado FROM usuarios u JOIN reproducciones r ON u.id = r.usuario_id GROUP BY cohorte ORDER BY cohorte;",
          },
        ],
      },
      {
        id: 'l-8-2', slug: 'funnels-metricas-producto',
        title: 'Funnels y Métricas de Producto',
        description: 'Conversión, churn rate, LTV, engagement. Caso: métricas de la plataforma de streaming.',
        difficulty: 'avanzado', estimatedMinutes: 35,
        content: [
          { type: 'theory', title: 'Métricas clave de producto', content: '<strong>Churn Rate:</strong> % de usuarios que cancelan en un período.<br><code>Churn = Cancelaciones / Total usuarios activos al inicio * 100</code><br><br><strong>LTV (Lifetime Value):</strong> Ingreso total esperado de un usuario.<br><code>LTV = Ingreso promedio mensual * Meses promedio activo</code><br><br><strong>Engagement:</strong> Qué tan activos son los usuarios (contenidos vistos, tiempo de sesión, frecuencia).<br><br><strong>Conversión:</strong> % de usuarios que pasan de un estado a otro (trial -> pago, basico -> premium).' },
          { type: 'code-example', title: 'Métricas de engagement por plan', content: '', code: "SELECT\n  plan_actual,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos,\n  MIN(contenidos_vistos) AS min_contenidos,\n  MAX(contenidos_vistos) AS max_contenidos,\n  ROUND(AVG(JULIANDAY(ultima_actividad) - JULIANDAY(fecha_registro)), 0) AS avg_dias_activo\nFROM usuarios_streaming\nWHERE estado = 'Activo'\nGROUP BY plan_actual\nORDER BY avg_contenidos DESC;" },
          { type: 'code-example', title: 'Segmentación por engagement', content: '', code: "WITH engagement AS (\n  SELECT\n    id,\n    nombre,\n    plan_actual,\n    contenidos_vistos,\n    NTILE(4) OVER (ORDER BY contenidos_vistos DESC) AS cuartil_engagement\n  FROM usuarios_streaming\n  WHERE estado = 'Activo'\n)\nSELECT\n  cuartil_engagement,\n  COUNT(*) AS usuarios,\n  ROUND(AVG(contenidos_vistos), 1) AS avg_contenidos,\n  MIN(contenidos_vistos) AS min_contenidos,\n  MAX(contenidos_vistos) AS max_contenidos\nFROM engagement\nGROUP BY cuartil_engagement\nORDER BY cuartil_engagement;" },
          { type: 'tip', title: 'El framework de métricas', content: 'Las empresas de producto usan el framework <strong>AARRR</strong> (Pirate Metrics):<br>1. <strong>Acquisition:</strong> ¿Cómo llegan los usuarios?<br>2. <strong>Activation:</strong> ¿Tuvieron una buena primera experiencia?<br>3. <strong>Retention:</strong> ¿Regresan? (la métrica MÁS importante)<br>4. <strong>Revenue:</strong> ¿Pagan?<br>5. <strong>Referral:</strong> ¿Invitan a otros?<br><br>SQL es la herramienta fundamental para medir cada una de estas métricas.' },
          { type: 'theory', title: 'Paso a paso: Funnel AARRR con SQL', content: 'Vamos a construir un funnel AARRR completo para StreamCo, midiendo cada etapa del ciclo de vida del usuario.<br><br><strong>Paso 1:</strong> Acquisition - cuántos se registraron.<br><strong>Paso 2:</strong> Activation - cuántos vieron al menos 1 contenido.<br><strong>Paso 3:</strong> Retention - cuántos siguen activos.<br><strong>Paso 4:</strong> Revenue - cuántos tienen plan de pago.' },
          { type: 'code-example', title: 'Funnel AARRR completo', content: 'Construimos el funnel midiendo la conversión entre cada etapa:', code: "WITH funnel AS (\n  SELECT\n    COUNT(*) AS total_registrados,\n    SUM(CASE WHEN contenidos_vistos > 0 THEN 1 ELSE 0 END) AS activados,\n    SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS retenidos,\n    SUM(CASE WHEN estado = 'Activo' AND plan_actual != 'Basico' THEN 1 ELSE 0 END) AS monetizados\n  FROM usuarios_streaming\n)\nSELECT\n  total_registrados AS acquisition,\n  activados AS activation,\n  ROUND(activados * 100.0 / total_registrados, 1) AS pct_activacion,\n  retenidos AS retention,\n  ROUND(retenidos * 100.0 / activados, 1) AS pct_retencion,\n  monetizados AS revenue,\n  ROUND(monetizados * 100.0 / retenidos, 1) AS pct_monetizacion\nFROM funnel;" },
        ],
        exercises: [
          {
            id: 'e-8-2-1',
            instruction: 'Calcula el churn rate por plan: para cada plan, muestra el total de usuarios, los que cancelaron, y el porcentaje de churn. También muestra el ingreso mensual del plan y estima el LTV (ingreso * promedio de meses activo de usuarios activos).',
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
            instruction: 'Identifica los usuarios en riesgo de churn: usuarios activos que llevan más de 30 días sin actividad (fecha actual - ultima_actividad > 30). Muestra nombre, plan, contenidos vistos, última actividad y días de inactividad. Ordena por días de inactividad descendente.',
            initialQuery: '',
            hints: [
              "JULIANDAY('now') - JULIANDAY(ultima_actividad) para dias de inactividad",
              "WHERE estado = 'Activo' AND dias > 30",
              "SELECT nombre, plan_actual, contenidos_vistos, ultima_actividad, CAST(JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) AS INTEGER) AS dias_inactivo FROM usuarios_streaming WHERE estado = 'Activo' AND JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) > 30 ORDER BY dias_inactivo DESC;",
            ],
            requiredKeywords: ['SELECT', 'WHERE', 'ORDER BY'],
            solutionQuery: "SELECT nombre, plan_actual, contenidos_vistos, ultima_actividad, CAST(JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) AS INTEGER) AS dias_inactivo FROM usuarios_streaming WHERE estado = 'Activo' AND JULIANDAY('2025-02-01') - JULIANDAY(ultima_actividad) > 30 ORDER BY dias_inactivo DESC;",
          },
          {
            id: 'e-8-2-3',
            instruction: 'Analiza el engagement por dispositivo: usando la tabla reproducciones, muestra para cada dispositivo el total de reproducciones, el promedio de minutos vistos, el porcentaje de contenidos completados, y el número de usuarios distintos. Ordena por total de reproducciones descendente.',
            initialQuery: '-- Engagement por dispositivo\n',
            hints: [
              'GROUP BY dispositivo en la tabla reproducciones',
              'COUNT(DISTINCT usuario_id) para usuarios únicos por dispositivo',
              "SELECT r.dispositivo, COUNT(*) AS total_reproducciones, COUNT(DISTINCT r.usuario_id) AS usuarios_unicos, ROUND(AVG(r.duracion_vista_min), 1) AS avg_min_vistos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_completado FROM reproducciones r GROUP BY r.dispositivo ORDER BY total_reproducciones DESC;",
            ],
            requiredKeywords: ['GROUP BY', 'COUNT', 'AVG', 'CASE'],
            solutionQuery: "SELECT r.dispositivo, COUNT(*) AS total_reproducciones, COUNT(DISTINCT r.usuario_id) AS usuarios_unicos, ROUND(AVG(r.duracion_vista_min), 1) AS avg_min_vistos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS pct_completado FROM reproducciones r GROUP BY r.dispositivo ORDER BY total_reproducciones DESC;",
          },
        ],
      },
      {
        id: 'l-8-3', slug: 'sql-ia-tendencias',
        title: 'SQL + IA y Tendencias Modernas',
        description: 'Bases de datos vectoriales, pgvector, RAG, natural language to SQL y la arquitectura lakehouse.',
        difficulty: 'avanzado', estimatedMinutes: 30,
        content: [
          { type: 'theory', title: 'El futuro de SQL', content: 'SQL no va a desaparecer — está evolucionando:<br><br><strong>1. Natural Language to SQL:</strong> Herramientas como Vanna.ai, DuckDB + LLMs permiten preguntar en español y generar SQL automáticamente.<br><br><strong>2. Bases de datos vectoriales:</strong> Almacenan embeddings para búsqueda semántica. pgvector extiende PostgreSQL con vectores.<br><br><strong>3. Lakehouse:</strong> Combina data lake (archivos como Parquet) con data warehouse (SQL). Databricks y Snowflake lideran este modelo.<br><br><strong>4. Serverless:</strong> Bases de datos que escalan a cero y cobran por uso (Neon, PlanetScale, Turso).' },
          { type: 'theory', title: 'Bases de datos vectoriales y RAG', content: '<strong>Embedding:</strong> Representación numérica de texto/imágenes como vector de números (ej: [0.2, -0.5, 0.8, ...]). Textos similares tienen vectores cercanos.<br><br><strong>pgvector:</strong> Extensión de PostgreSQL que agrega tipo VECTOR y operadores de similitud. Permite buscar los documentos "más similares" a una pregunta.<br><br><strong>RAG (Retrieval-Augmented Generation):</strong><br>1. El usuario pregunta algo<br>2. SQL busca los documentos más relevantes (búsqueda vectorial)<br>3. Los documentos se envían al LLM como contexto<br>4. El LLM genera una respuesta informada<br><br>Muchos chatbots y asistentes de IA usan PostgreSQL + pgvector como su "memoria".' },
          { type: 'code-example', title: 'Análisis de tendencias en la plataforma', content: 'Aplicamos todo lo aprendido en un análisis integral:', code: "-- Dashboard ejecutivo: métricas clave de StreamCo\nWITH metricas AS (\n  SELECT\n    COUNT(*) AS total_usuarios,\n    SUM(CASE WHEN estado = 'Activo' THEN 1 ELSE 0 END) AS activos,\n    SUM(CASE WHEN estado = 'Cancelado' THEN 1 ELSE 0 END) AS cancelados,\n    SUM(ingreso_mensual) AS mrr_total,\n    ROUND(AVG(contenidos_vistos), 1) AS avg_engagement,\n    ROUND(AVG(CASE WHEN estado = 'Activo' THEN ingreso_mensual END), 0) AS arpu\n  FROM usuarios_streaming\n)\nSELECT\n  total_usuarios,\n  activos,\n  cancelados,\n  ROUND(cancelados * 100.0 / total_usuarios, 1) AS churn_pct,\n  mrr_total AS monthly_recurring_revenue,\n  avg_engagement AS avg_contenidos_vistos,\n  arpu AS avg_revenue_per_user\nFROM metricas;" },
          { type: 'code-example', title: 'Análisis de contenido con tablas normalizadas', content: 'Usando reproducciones y contenido para análisis avanzado:', code: "-- Top contenidos más populares con engagement\nSELECT\n  c.titulo, c.tipo,\n  g.nombre AS genero,\n  c.calificacion_promedio,\n  COUNT(r.id) AS total_reproducciones,\n  COUNT(DISTINCT r.usuario_id) AS viewers_unicos,\n  ROUND(AVG(r.duracion_vista_min), 1) AS avg_min_vistos,\n  ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.id), 1) AS tasa_completado\nFROM reproducciones r\nJOIN contenido c ON r.contenido_id = c.id\nJOIN generos g ON c.genero_id = g.id\nGROUP BY c.id, c.titulo, c.tipo, g.nombre, c.calificacion_promedio\nORDER BY total_reproducciones DESC\nLIMIT 15;" },
          { type: 'code-example', title: 'SQL para recomendaciones de contenido', content: 'Un sistema de recomendación básico con SQL -- filtrado colaborativo:', code: "-- Usuarios que vieron contenido 1 también vieron...\nWITH fans AS (\n  SELECT DISTINCT usuario_id\n  FROM reproducciones\n  WHERE contenido_id = 1 AND completado = 1\n),\notros AS (\n  SELECT\n    r.contenido_id, c.titulo, c.tipo,\n    g.nombre AS genero,\n    COUNT(DISTINCT r.usuario_id) AS fans_que_vieron\n  FROM reproducciones r\n  JOIN contenido c ON r.contenido_id = c.id\n  JOIN generos g ON c.genero_id = g.id\n  WHERE r.usuario_id IN (SELECT usuario_id FROM fans)\n    AND r.contenido_id != 1\n    AND r.completado = 1\n  GROUP BY r.contenido_id, c.titulo, c.tipo, g.nombre\n)\nSELECT * FROM otros\nORDER BY fans_que_vieron DESC\nLIMIT 10;" },
          { type: 'tip', title: 'Tu camino desde aquí', content: 'Con los 8 módulos de este curso dominas SQL a nivel profesional. Los siguientes pasos:<br><br>1. <strong>Python + SQL:</strong> Usa pandas, SQLAlchemy para automatizar análisis<br>2. <strong>dbt:</strong> Framework para transformaciones SQL en producción<br>3. <strong>Data Warehouse:</strong> Aprende Snowflake o BigQuery para datos masivos<br>4. <strong>BI Tools:</strong> Conecta SQL con Metabase, Looker o Superset<br>5. <strong>pgvector + RAG:</strong> Experimenta con búsqueda semántica y LLMs<br><br>SQL es la habilidad #1 más demandada en datos. Nunca dejará de ser relevante.' },
        ],
        exercises: [
          {
            id: 'e-8-3-1',
            instruction: 'Crea un dashboard ejecutivo completo de StreamCo usando CTEs: calcula total usuarios, MRR (Monthly Recurring Revenue = suma de ingresos mensuales de activos), ARPU (Average Revenue Per User = MRR / activos), churn rate, y avg engagement (contenidos vistos promedio de activos).',
            initialQuery: "-- Dashboard ejecutivo StreamCo\nWITH metricas AS (\n  -- Calcula las métricas clave\n)\nSELECT * FROM metricas;",
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
            instruction: 'Análisis final: Combina todo lo aprendido. Usa CTEs y window functions para crear un ranking de usuarios por engagement (contenidos_vistos), mostrando nombre, plan, contenidos vistos, ingreso mensual, su ranking general, y su ranking dentro de su plan. Limita a los top 20.',
            initialQuery: '',
            hints: [
              'ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) para ranking general',
              'ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) para ranking por plan',
              "WITH ranking AS (SELECT nombre, plan_actual, contenidos_vistos, ingreso_mensual, ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) AS ranking_general, ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) AS ranking_plan FROM usuarios_streaming WHERE estado = 'Activo') SELECT * FROM ranking WHERE ranking_general <= 20 ORDER BY ranking_general;",
            ],
            requiredKeywords: ['WITH', 'OVER', 'ROW_NUMBER'],
            solutionQuery: "WITH ranking AS (SELECT nombre, plan_actual, contenidos_vistos, ingreso_mensual, ROW_NUMBER() OVER (ORDER BY contenidos_vistos DESC) AS ranking_general, ROW_NUMBER() OVER (PARTITION BY plan_actual ORDER BY contenidos_vistos DESC) AS ranking_plan FROM usuarios_streaming WHERE estado = 'Activo') SELECT * FROM ranking WHERE ranking_general <= 20 ORDER BY ranking_general;",
          },
          {
            id: 'e-8-3-3',
            instruction: 'Crea una consulta de recomendacion de contenido: usando las tablas reproducciones y contenido, encuentra los 10 contenidos con mejor relacion entre calificacion promedio y tasa de completado. Muestra titulo, tipo, genero (de la tabla generos), calificacion_promedio, total de reproducciones, viewers unicos y tasa de completado. Solo incluye contenidos con al menos 3 reproducciones.',
            initialQuery: '-- Sistema de recomendacion basado en datos\n',
            hints: [
              'JOIN reproducciones con contenido y generos, luego GROUP BY contenido',
              'HAVING COUNT(r.id) >= 3 para filtrar contenidos con suficientes reproducciones',
              "SELECT c.titulo, c.tipo, g.nombre AS genero, c.calificacion_promedio, COUNT(r.id) AS total_reproducciones, COUNT(DISTINCT r.usuario_id) AS viewers_unicos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.id), 1) AS tasa_completado FROM reproducciones r JOIN contenido c ON r.contenido_id = c.id JOIN generos g ON c.genero_id = g.id GROUP BY c.id, c.titulo, c.tipo, g.nombre, c.calificacion_promedio HAVING COUNT(r.id) >= 3 ORDER BY c.calificacion_promedio DESC, tasa_completado DESC LIMIT 10;",
            ],
            requiredKeywords: ['JOIN', 'GROUP BY', 'HAVING', 'CASE'],
            solutionQuery: "SELECT c.titulo, c.tipo, g.nombre AS genero, c.calificacion_promedio, COUNT(r.id) AS total_reproducciones, COUNT(DISTINCT r.usuario_id) AS viewers_unicos, ROUND(SUM(CASE WHEN r.completado = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(r.id), 1) AS tasa_completado FROM reproducciones r JOIN contenido c ON r.contenido_id = c.id JOIN generos g ON c.genero_id = g.id GROUP BY c.id, c.titulo, c.tipo, g.nombre, c.calificacion_promedio HAVING COUNT(r.id) >= 3 ORDER BY c.calificacion_promedio DESC, tasa_completado DESC LIMIT 10;",
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
