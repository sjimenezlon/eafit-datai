-- =============================================
-- Dataset: TiendaOnline.co - E-commerce Colombia
-- Contexto: Marketplace de tecnologia y hogar
-- =============================================

CREATE TABLE categorias (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  margen_objetivo REAL
);

INSERT INTO categorias VALUES
(1, 'Smartphones', 'Telefonos inteligentes y accesorios', 0.18),
(2, 'Computadores', 'Portatiles, desktops y componentes', 0.15),
(3, 'Audio', 'Audifonos, parlantes, microfonos', 0.25),
(4, 'Hogar Inteligente', 'Domotica, asistentes, camaras', 0.30),
(5, 'Gaming', 'Consolas, perifericos, sillas', 0.20),
(6, 'Electrodomesticos', 'Cocina, lavado, climatizacion', 0.12),
(7, 'Wearables', 'Relojes, bandas fitness, gafas', 0.28),
(8, 'Accesorios', 'Cables, cargadores, fundas, protectores', 0.45);

CREATE TABLE proveedores (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  pais TEXT,
  calificacion REAL,
  tiempo_entrega_dias INTEGER
);

INSERT INTO proveedores VALUES
(1, 'TechDistribucion SAS', 'Colombia', 4.5, 2),
(2, 'Samsung Colombia', 'Colombia', 4.8, 3),
(3, 'Apple Distribuidor Autorizado', 'USA', 4.9, 7),
(4, 'Xiaomi Latam', 'China', 4.2, 12),
(5, 'Lenovo Partners', 'China', 4.3, 10),
(6, 'LG Electronics Colombia', 'Colombia', 4.6, 3),
(7, 'Sony Distribucion', 'Japon', 4.7, 8),
(8, 'Logitech Andina', 'Suiza', 4.4, 5),
(9, 'JBL/Harman Colombia', 'Colombia', 4.3, 2),
(10, 'Whirlpool Latam', 'USA', 4.1, 6);

CREATE TABLE productos (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  categoria_id INTEGER,
  proveedor_id INTEGER,
  precio REAL NOT NULL,
  costo REAL NOT NULL,
  stock INTEGER DEFAULT 0,
  sku TEXT UNIQUE,
  peso_kg REAL,
  activo INTEGER DEFAULT 1,
  fecha_creacion TEXT,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

INSERT INTO productos VALUES
(1, 'Samsung Galaxy S24 Ultra 256GB', 1, 2, 5499000, 4399000, 45, 'SM-S24U-256', 0.23, 1, '2024-01-15'),
(2, 'iPhone 15 Pro Max 256GB', 1, 3, 6299000, 5299000, 30, 'APL-IP15PM-256', 0.22, 1, '2024-02-01'),
(3, 'Xiaomi Redmi Note 13 Pro', 1, 4, 1299000, 899000, 120, 'XI-RN13P', 0.19, 1, '2024-03-10'),
(4, 'Samsung Galaxy A15', 1, 2, 699000, 489000, 200, 'SM-GA15', 0.20, 1, '2024-01-20'),
(5, 'MacBook Air M3 13" 256GB', 2, 3, 5999000, 4999000, 25, 'APL-MBA-M3-256', 1.24, 1, '2024-03-08'),
(6, 'Lenovo IdeaPad Slim 3 15"', 2, 5, 2199000, 1699000, 60, 'LN-IPS3-15', 1.63, 1, '2024-02-15'),
(7, 'HP Victus 15 RTX 4060', 2, 5, 4299000, 3399000, 18, 'HP-VIC15-4060', 2.29, 1, '2024-04-01'),
(8, 'AirPods Pro 2 USB-C', 3, 3, 1149000, 849000, 80, 'APL-APP2-USBC', 0.05, 1, '2024-01-10'),
(9, 'Samsung Galaxy Buds3 Pro', 3, 2, 899000, 599000, 65, 'SM-GB3P', 0.05, 1, '2024-07-10'),
(10, 'JBL Charge 5', 3, 9, 649000, 389000, 90, 'JBL-CHG5', 0.96, 1, '2023-06-15'),
(11, 'Sony WH-1000XM5', 3, 7, 1799000, 1199000, 35, 'SNY-WH1KXM5', 0.25, 1, '2023-09-01'),
(12, 'Google Nest Hub 2', 4, 8, 449000, 289000, 40, 'GGL-NH2', 0.56, 1, '2023-11-20'),
(13, 'Ring Video Doorbell 4', 4, 8, 549000, 349000, 30, 'RNG-VDB4', 0.31, 1, '2024-01-05'),
(14, 'Alexa Echo Dot 5ta Gen', 4, 8, 249000, 149000, 150, 'AMZ-ED5', 0.30, 1, '2023-10-15'),
(15, 'PlayStation 5 Slim Digital', 5, 7, 2399000, 1899000, 22, 'SNY-PS5SD', 3.20, 1, '2024-01-15'),
(16, 'Nintendo Switch OLED', 5, 7, 1899000, 1399000, 15, 'NTD-SWOLED', 0.42, 1, '2023-07-01'),
(17, 'Silla Gamer Cougar Armor', 5, 1, 1299000, 799000, 25, 'CGR-ARM', 22.0, 1, '2024-02-20'),
(18, 'Teclado Logitech G Pro X', 5, 8, 549000, 349000, 55, 'LOG-GPROX', 0.98, 1, '2023-08-10'),
(19, 'Nevera Samsung 420L No Frost', 6, 2, 3299000, 2499000, 12, 'SM-NV420NF', 68.0, 1, '2024-01-20'),
(20, 'Lavadora LG 22kg Inverter', 6, 6, 2799000, 2099000, 8, 'LG-LV22INV', 72.0, 1, '2024-03-01'),
(21, 'Aire Acondicionado LG 12000BTU', 6, 6, 2199000, 1599000, 14, 'LG-AC12K', 35.0, 1, '2024-05-10'),
(22, 'Apple Watch Series 9 45mm', 7, 3, 2299000, 1799000, 28, 'APL-AW9-45', 0.04, 1, '2024-01-10'),
(23, 'Samsung Galaxy Watch 6 44mm', 7, 2, 1399000, 899000, 42, 'SM-GW6-44', 0.03, 1, '2024-02-01'),
(24, 'Xiaomi Smart Band 8', 7, 4, 179000, 89000, 300, 'XI-SB8', 0.03, 1, '2024-01-15'),
(25, 'Cargador USB-C 65W GaN', 8, 1, 129000, 49000, 500, 'TD-USBC65W', 0.12, 1, '2024-01-01'),
(26, 'Cable USB-C a Lightning 2m', 8, 1, 59000, 15000, 800, 'TD-USBCL-2M', 0.04, 1, '2024-01-01'),
(27, 'Funda iPhone 15 Silicona', 8, 1, 89000, 19000, 400, 'TD-FIP15-SIL', 0.03, 1, '2024-02-01'),
(28, 'Mouse Logitech MX Master 3S', 5, 8, 499000, 319000, 45, 'LOG-MXM3S', 0.14, 1, '2023-11-01'),
(29, 'Monitor Samsung 27" 4K', 2, 2, 1699000, 1199000, 20, 'SM-MON27-4K', 5.20, 1, '2024-04-15'),
(30, 'Aspiradora Robot Xiaomi', 4, 4, 1499000, 899000, 18, 'XI-ROBOT-ASP', 3.60, 1, '2024-06-01');

CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE,
  ciudad TEXT,
  departamento TEXT,
  telefono TEXT,
  tipo TEXT DEFAULT 'Regular',
  fecha_registro TEXT,
  total_compras REAL DEFAULT 0,
  puntos_fidelidad INTEGER DEFAULT 0
);

INSERT INTO clientes VALUES
(1, 'Camila Restrepo', 'camila.r@gmail.com', 'Medellin', 'Antioquia', '3001234567', 'Premium', '2023-01-15', 12580000, 1258),
(2, 'Juan David Lopez', 'jdlopez@hotmail.com', 'Bogota', 'Cundinamarca', '3109876543', 'Regular', '2023-03-22', 3450000, 345),
(3, 'Maria Alejandra Torres', 'matorres@gmail.com', 'Cali', 'Valle del Cauca', '3157894561', 'Premium', '2023-02-10', 8920000, 892),
(4, 'Santiago Giraldo', 'sgiraldo@outlook.com', 'Medellin', 'Antioquia', '3204567890', 'VIP', '2022-11-05', 25600000, 2560),
(5, 'Valentina Osorio', 'vosorio@gmail.com', 'Barranquilla', 'Atlantico', '3011112233', 'Regular', '2023-06-18', 1890000, 189),
(6, 'Andres Felipe Mejia', 'afmejia@yahoo.com', 'Medellin', 'Antioquia', '3123456789', 'Premium', '2023-01-30', 9750000, 975),
(7, 'Laura Vanessa Cardona', 'lvcardona@gmail.com', 'Pereira', 'Risaralda', '3178901234', 'Regular', '2023-08-12', 2100000, 210),
(8, 'Daniel Alejandro Velez', 'davelez@gmail.com', 'Bogota', 'Cundinamarca', '3005678901', 'VIP', '2022-09-20', 31200000, 3120),
(9, 'Isabella Munoz', 'imunoz@outlook.com', 'Bucaramanga', 'Santander', '3142345678', 'Regular', '2023-10-05', 899000, 90),
(10, 'Mateo Hernandez', 'mhernandez@gmail.com', 'Cartagena', 'Bolivar', '3196789012', 'Regular', '2023-07-25', 1650000, 165),
(11, 'Gabriela Salazar', 'gsalazar@gmail.com', 'Medellin', 'Antioquia', '3001239876', 'Premium', '2023-04-14', 7800000, 780),
(12, 'Nicolas Arango', 'narango@hotmail.com', 'Manizales', 'Caldas', '3112345678', 'Regular', '2023-09-01', 2340000, 234),
(13, 'Sara Botero', 'sbotero@gmail.com', 'Bogota', 'Cundinamarca', '3156781234', 'Premium', '2023-02-28', 6500000, 650),
(14, 'Felipe Zuluaga', 'fzuluaga@outlook.com', 'Medellin', 'Antioquia', '3209871234', 'Regular', '2023-11-15', 1200000, 120),
(15, 'Mariana Duque', 'mduque@gmail.com', 'Cali', 'Valle del Cauca', '3014567890', 'VIP', '2022-12-01', 18900000, 1890),
(16, 'Esteban Posada', 'eposada@gmail.com', 'Envigado', 'Antioquia', '3127654321', 'Regular', '2024-01-10', 549000, 55),
(17, 'Ana Maria Diaz', 'amdiaz@yahoo.com', 'Bogota', 'Cundinamarca', '3179012345', 'Premium', '2023-05-20', 5600000, 560),
(18, 'Sebastian Correa', 'scorrea@gmail.com', 'Medellin', 'Antioquia', '3003456789', 'Regular', '2023-12-08', 899000, 90),
(19, 'Juliana Hoyos', 'jhoyos@outlook.com', 'Armenia', 'Quindio', '3148765432', 'Regular', '2024-02-14', 179000, 18),
(20, 'Rafael Ibarra', 'ribarra@gmail.com', 'Bogota', 'Cundinamarca', '3191234567', 'Premium', '2023-03-10', 8100000, 810),
(21, 'Catalina Fernandez', 'cfernandez@gmail.com', 'Medellin', 'Antioquia', '3006543210', 'Regular', '2024-03-01', 329000, 33),
(22, 'Diego Ocampo', 'docampo@hotmail.com', 'Bogota', 'Cundinamarca', '3119876543', 'Regular', '2023-08-30', 1899000, 190),
(23, 'Paula Zapata', 'pzapata@gmail.com', 'Medellin', 'Antioquia', '3152109876', 'Premium', '2023-01-05', 11200000, 1120),
(24, 'Jorge Leal', 'jleal@outlook.com', 'Cali', 'Valle del Cauca', '3207890123', 'Regular', '2023-11-22', 2799000, 280),
(25, 'Renata Wolff', 'rwolff@gmail.com', 'Bogota', 'Cundinamarca', '3013210987', 'VIP', '2022-08-15', 28500000, 2850);

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  fecha TEXT NOT NULL,
  estado TEXT DEFAULT 'Pendiente',
  metodo_pago TEXT,
  subtotal REAL,
  descuento REAL DEFAULT 0,
  impuesto REAL,
  total REAL,
  direccion_envio TEXT,
  ciudad_envio TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

INSERT INTO pedidos VALUES
(1, 1, '2024-11-15', 'Entregado', 'Tarjeta Credito', 5499000, 274950, 989820, 6213870, 'Cra 43A #1-50 Apto 1201', 'Medellin'),
(2, 2, '2024-11-18', 'Entregado', 'PSE', 1299000, 0, 246810, 1545810, 'Calle 85 #15-20', 'Bogota'),
(3, 4, '2024-11-20', 'Entregado', 'Tarjeta Credito', 8298000, 829800, 1419060, 8887260, 'Cra 35 #8-15 Torre 2', 'Medellin'),
(4, 3, '2024-11-22', 'Entregado', 'Nequi', 649000, 0, 123310, 772310, 'Av 6N #25-10 Apto 502', 'Cali'),
(5, 8, '2024-11-25', 'Entregado', 'Tarjeta Credito', 12597000, 1259700, 2154390, 13491690, 'Calle 127 #7-80 Piso 3', 'Bogota'),
(6, 5, '2024-11-28', 'Entregado', 'Efecty', 699000, 0, 132810, 831810, 'Cra 54 #72-120', 'Barranquilla'),
(7, 1, '2024-12-01', 'Entregado', 'Tarjeta Credito', 2448000, 122400, 441960, 2767560, 'Cra 43A #1-50 Apto 1201', 'Medellin'),
(8, 6, '2024-12-03', 'Entregado', 'PSE', 2199000, 109950, 396810, 2485860, 'Calle 10 #32-45', 'Medellin'),
(9, 15, '2024-12-05', 'Entregado', 'Tarjeta Credito', 6299000, 629900, 1077330, 6746430, 'Av 2N #8-60 Casa 15', 'Cali'),
(10, 11, '2024-12-08', 'Entregado', 'Nequi', 1799000, 89950, 324810, 2033860, 'Cra 70 #44-20 Apto 801', 'Medellin'),
(11, 13, '2024-12-10', 'Entregado', 'Tarjeta Credito', 4299000, 214950, 775980, 4860030, 'Calle 93 #11-35', 'Bogota'),
(12, 7, '2024-12-12', 'Entregado', 'Daviplata', 1478000, 0, 280820, 1758820, 'Cra 13 #22-10', 'Pereira'),
(13, 25, '2024-12-14', 'Entregado', 'Tarjeta Credito', 7798000, 779800, 1335360, 8353560, 'Calle 100 #19-50 Piso 5', 'Bogota'),
(14, 10, '2024-12-16', 'Enviado', 'PSE', 1899000, 0, 360810, 2259810, 'Cra 3 #32-50 Apto 302', 'Cartagena'),
(15, 4, '2024-12-18', 'Enviado', 'Tarjeta Credito', 3798000, 189900, 685440, 4293540, 'Cra 35 #8-15 Torre 2', 'Medellin'),
(16, 17, '2024-12-20', 'Pendiente', 'Tarjeta Credito', 2299000, 114950, 414810, 2598860, 'Av Caracas #53-20', 'Bogota'),
(17, 9, '2024-12-22', 'Pendiente', 'Nequi', 179000, 0, 34010, 213010, 'Calle 36 #27-15', 'Bucaramanga'),
(18, 23, '2024-12-24', 'Entregado', 'Tarjeta Credito', 5999000, 599900, 1025910, 6425010, 'Cra 43A #14-85 Ofi 301', 'Medellin'),
(19, 20, '2024-12-26', 'Entregado', 'PSE', 3498000, 174900, 631440, 3954540, 'Calle 140 #10-25', 'Bogota'),
(20, 14, '2024-12-28', 'Cancelado', 'Nequi', 549000, 0, 104310, 653310, 'Calle 37Sur #27-50', 'Envigado'),
(21, 12, '2024-12-30', 'Entregado', 'Daviplata', 249000, 0, 47310, 296310, 'Cra 23 #65-10', 'Manizales'),
(22, 1, '2025-01-05', 'Entregado', 'Tarjeta Credito', 1149000, 57450, 207480, 1299030, 'Cra 43A #1-50 Apto 1201', 'Medellin'),
(23, 8, '2025-01-08', 'Entregado', 'Tarjeta Credito', 2399000, 239900, 410130, 2569230, 'Calle 127 #7-80 Piso 3', 'Bogota'),
(24, 16, '2025-01-10', 'Entregado', 'PSE', 549000, 0, 104310, 653310, 'Cra 48 #10Sur-25', 'Envigado'),
(25, 3, '2025-01-12', 'Enviado', 'Nequi', 2299000, 114950, 414810, 2598860, 'Av 6N #25-10 Apto 502', 'Cali'),
(26, 21, '2025-01-14', 'Pendiente', 'PSE', 329000, 0, 62510, 391510, 'Cra 65 #48-15', 'Medellin'),
(27, 6, '2025-01-15', 'Entregado', 'Tarjeta Credito', 1699000, 84950, 306720, 1920770, 'Calle 10 #32-45', 'Medellin'),
(28, 22, '2025-01-18', 'Entregado', 'Tarjeta Credito', 1899000, 0, 360810, 2259810, 'Calle 80 #30-15', 'Bogota'),
(29, 19, '2025-01-20', 'Pendiente', 'Nequi', 179000, 0, 34010, 213010, 'Cra 14 #10-20', 'Armenia'),
(30, 24, '2025-01-22', 'Entregado', 'Daviplata', 2799000, 139950, 505260, 3164310, 'Calle 5 #62-30', 'Cali');

CREATE TABLE detalle_pedidos (
  id INTEGER PRIMARY KEY,
  pedido_id INTEGER NOT NULL,
  producto_id INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  precio_unitario REAL NOT NULL,
  subtotal REAL NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

INSERT INTO detalle_pedidos VALUES
(1, 1, 1, 1, 5499000, 5499000),
(2, 2, 3, 1, 1299000, 1299000),
(3, 3, 2, 1, 6299000, 6299000),
(4, 3, 11, 1, 1799000, 1799000),
(5, 3, 27, 2, 89000, 178000),
(6, 4, 10, 1, 649000, 649000),
(7, 5, 5, 1, 5999000, 5999000),
(8, 5, 8, 1, 1149000, 1149000),
(9, 5, 22, 1, 2299000, 2299000),
(10, 5, 25, 3, 129000, 387000),
(11, 5, 26, 4, 59000, 236000),
(12, 6, 4, 1, 699000, 699000),
(13, 7, 9, 1, 899000, 899000),
(14, 7, 25, 2, 129000, 258000),
(15, 7, 24, 5, 179000, 895000),
(16, 7, 26, 2, 59000, 118000),
(17, 8, 6, 1, 2199000, 2199000),
(18, 9, 2, 1, 6299000, 6299000),
(19, 10, 11, 1, 1799000, 1799000),
(20, 11, 7, 1, 4299000, 4299000),
(21, 12, 3, 1, 1299000, 1299000),
(22, 12, 24, 1, 179000, 179000),
(23, 13, 1, 1, 5499000, 5499000),
(24, 13, 22, 1, 2299000, 2299000),
(25, 14, 16, 1, 1899000, 1899000),
(26, 15, 15, 1, 2399000, 2399000),
(27, 15, 18, 1, 549000, 549000),
(28, 15, 28, 1, 499000, 499000),
(29, 16, 22, 1, 2299000, 2299000),
(30, 17, 24, 1, 179000, 179000),
(31, 18, 5, 1, 5999000, 5999000),
(32, 19, 29, 1, 1699000, 1699000),
(33, 19, 11, 1, 1799000, 1799000),
(34, 20, 18, 1, 549000, 549000),
(35, 21, 14, 1, 249000, 249000),
(36, 22, 8, 1, 1149000, 1149000),
(37, 23, 15, 1, 2399000, 2399000),
(38, 24, 18, 1, 549000, 549000),
(39, 25, 22, 1, 2299000, 2299000),
(40, 26, 25, 2, 129000, 258000),
(41, 26, 26, 1, 59000, 59000),
(42, 27, 29, 1, 1699000, 1699000),
(43, 28, 16, 1, 1899000, 1899000),
(44, 29, 24, 1, 179000, 179000),
(45, 30, 20, 1, 2799000, 2799000);

CREATE TABLE resenas (
  id INTEGER PRIMARY KEY,
  producto_id INTEGER NOT NULL,
  cliente_id INTEGER NOT NULL,
  calificacion INTEGER CHECK(calificacion BETWEEN 1 AND 5),
  titulo TEXT,
  comentario TEXT,
  fecha TEXT,
  verificada INTEGER DEFAULT 1,
  FOREIGN KEY (producto_id) REFERENCES productos(id),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

INSERT INTO resenas VALUES
(1, 1, 1, 5, 'Increible telefono', 'La camara es espectacular, el zoom 100x realmente funciona. La bateria dura todo el dia.', '2024-11-20', 1),
(2, 1, 23, 4, 'Muy bueno pero caro', 'Excelente rendimiento pero el precio es elevado para el mercado colombiano.', '2024-12-18', 1),
(3, 2, 4, 5, 'El mejor iPhone', 'La integracion con el ecosistema Apple es perfecta. Titanio se siente premium.', '2024-11-25', 1),
(4, 2, 15, 5, 'Perfecto', 'Llego en perfecto estado, camara profesional.', '2024-12-08', 1),
(5, 3, 2, 4, 'Excelente relacion calidad-precio', 'Para el precio que tiene, el Redmi Note 13 Pro rinde muy bien. Camara decente.', '2024-11-22', 1),
(6, 3, 7, 3, 'Bueno pero con detalles', 'La pantalla es buena pero MIUI tiene mucha publicidad. Hay que desactivarla manualmente.', '2024-12-15', 1),
(7, 5, 8, 5, 'Maquina perfecta', 'El M3 vuela. Compile un proyecto enorme en segundos. Bateria de 18 horas reales.', '2024-11-28', 1),
(8, 5, 18, 5, 'Insuperable', 'Mejor portatil que he tenido. Silencioso, rapido, hermoso.', '2024-12-28', 1),
(9, 6, 6, 4, 'Buen portatil para el precio', 'Para tareas de oficina y universidad va perfecto. No esperes correr juegos pesados.', '2024-12-05', 1),
(10, 7, 13, 5, 'Bestia para gaming', 'Corre todo en alto. La RTX 4060 es una maravilla. Se calienta un poco pero normal.', '2024-12-13', 1),
(11, 8, 1, 4, 'Excelente sonido', 'Cancelacion de ruido brutal. El USB-C es muy practico.', '2025-01-08', 1),
(12, 10, 3, 5, 'Parlante indestructible', 'Lo lleve a la piscina y funciono perfecto. Sonido potente para su tamano.', '2024-11-25', 1),
(13, 11, 11, 5, 'Los mejores audifonos', 'Cancelacion de ruido perfecta. Los uso 8 horas al dia en la oficina.', '2024-12-10', 1),
(14, 14, 12, 4, 'Util en la cocina', 'Lo uso para poner musica y timers mientras cocino. Alexa responde bien.', '2024-12-31', 1),
(15, 15, 4, 5, 'Maquina de juegos', 'PS5 Slim es compacta y silenciosa. Carga rapida impresionante.', '2024-12-22', 1),
(16, 15, 8, 4, 'Muy buena pero pocos juegos exclusivos', 'Hardware excelente. Falta mas catalogo exclusivo.', '2025-01-10', 1),
(17, 16, 10, 5, 'Diversion portatil', 'Perfecto para viajes. La pantalla OLED es hermosa.', '2024-12-20', 1),
(18, 16, 22, 4, 'Genial pero ya vieja', 'Es divertida pero ya se siente un poco limitada en potencia.', '2025-01-20', 1),
(19, 20, 24, 4, 'Buena lavadora', 'Lava bien y es silenciosa. El inverter se nota en la cuenta de luz.', '2025-01-25', 1),
(20, 22, 13, 5, 'Complemento perfecto del iPhone', 'Monitoreo de salud excelente. La deteccion de caidas funciona.', '2024-12-12', 1),
(21, 24, 7, 5, 'Increible por el precio', 'Por 179mil pesos tienes monitoreo de sueno, pasos y notificaciones. Bateria de 15 dias.', '2024-12-16', 1),
(22, 24, 19, 4, 'Basica pero cumple', 'No esperes smartwatch de gama alta, pero para lo que cuesta es perfecta.', '2025-01-22', 1),
(23, 28, 4, 5, 'El mejor mouse', 'Ergonomico, preciso, bateria de meses. Lo uso para trabajo y diseño.', '2024-12-20', 1),
(24, 29, 6, 4, 'Buen monitor', 'Colores precisos y buena resolucion. El soporte podria ser mejor.', '2025-01-18', 1),
(25, 30, 11, 3, 'Regular', 'Aspira bien en superficies lisas pero se traba con las alfombras.', '2025-01-15', 0);

CREATE TABLE cupones (
  id INTEGER PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL,
  tipo TEXT NOT NULL,
  valor REAL NOT NULL,
  minimo_compra REAL,
  fecha_inicio TEXT,
  fecha_fin TEXT,
  usos_maximos INTEGER,
  usos_actuales INTEGER DEFAULT 0,
  activo INTEGER DEFAULT 1
);

INSERT INTO cupones VALUES
(1, 'BIENVENIDO10', 'porcentaje', 10, 500000, '2024-01-01', '2025-12-31', 1000, 234, 1),
(2, 'NAVIDAD2024', 'porcentaje', 15, 1000000, '2024-12-01', '2024-12-31', 500, 487, 0),
(3, 'ENVIOGRATIS', 'fijo', 25000, 200000, '2024-01-01', '2025-06-30', 2000, 890, 1),
(4, 'PREMIUM20', 'porcentaje', 20, 2000000, '2024-06-01', '2025-06-01', 200, 45, 1),
(5, 'BLACKFRIDAY', 'porcentaje', 25, 500000, '2024-11-29', '2024-12-02', 1000, 1000, 0),
(6, 'TECH50K', 'fijo', 50000, 300000, '2025-01-01', '2025-03-31', 300, 112, 1);
