-- =============================================
-- Dataset: BancoDigital - Banca Digital Colombia
-- Contexto: Sistema bancario digital colombiano
-- =============================================

CREATE TABLE sucursales (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  ciudad TEXT NOT NULL,
  departamento TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK(tipo IN ('Principal','Sucursal','Digital')),
  empleados_count INTEGER,
  fecha_apertura TEXT
);

CREATE TABLE clientes_banco (
  id INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL,
  cedula TEXT UNIQUE NOT NULL,
  email TEXT,
  telefono TEXT,
  ciudad TEXT,
  tipo_cuenta TEXT CHECK(tipo_cuenta IN ('Ahorros','Corriente','CDT')),
  fecha_apertura TEXT,
  estado TEXT CHECK(estado IN ('Activo','Inactivo','Bloqueado')),
  sucursal_id INTEGER REFERENCES sucursales(id),
  ingresos_mensuales REAL,
  score_credito INTEGER
);

CREATE TABLE cuentas (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes_banco(id),
  tipo TEXT CHECK(tipo IN ('Ahorros','Corriente','CDT')),
  numero_cuenta TEXT UNIQUE NOT NULL,
  saldo REAL,
  moneda TEXT CHECK(moneda IN ('COP','USD')),
  estado TEXT,
  fecha_apertura TEXT,
  tasa_interes REAL
);

CREATE TABLE transacciones (
  id INTEGER PRIMARY KEY,
  cuenta_origen_id INTEGER REFERENCES cuentas(id),
  cuenta_destino_id INTEGER REFERENCES cuentas(id),
  tipo TEXT CHECK(tipo IN ('Deposito','Retiro','Transferencia','Pago_Servicio','Compra_TC','Nomina')),
  monto REAL,
  fecha TEXT,
  descripcion TEXT,
  estado TEXT CHECK(estado IN ('Completada','Pendiente','Rechazada','Reversada')),
  canal TEXT CHECK(canal IN ('App','Web','Sucursal','ATM','POS'))
);

CREATE TABLE tarjetas (
  id INTEGER PRIMARY KEY,
  cuenta_id INTEGER REFERENCES cuentas(id),
  tipo TEXT CHECK(tipo IN ('Debito','Credito')),
  numero_tarjeta TEXT NOT NULL,
  cupo REAL,
  saldo_usado REAL,
  fecha_vencimiento TEXT,
  estado TEXT CHECK(estado IN ('Activa','Bloqueada','Vencida'))
);

CREATE TABLE prestamos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes_banco(id),
  tipo TEXT CHECK(tipo IN ('Personal','Vivienda','Vehiculo','Educativo','Libre_Inversion')),
  monto_aprobado REAL,
  monto_desembolsado REAL,
  tasa_anual REAL,
  plazo_meses INTEGER,
  cuota_mensual REAL,
  saldo_pendiente REAL,
  estado TEXT CHECK(estado IN ('Activo','Pagado','Mora','Reestructurado')),
  fecha_desembolso TEXT
);

-- =============================================
-- SUCURSALES (8 filas)
-- =============================================
INSERT INTO sucursales VALUES
(1,  'BancoDigital Sede Principal',   'Bogota',        'Cundinamarca',    'Principal', 320, '2015-03-10'),
(2,  'BancoDigital El Poblado',       'Medellin',      'Antioquia',       'Sucursal',  85,  '2016-06-15'),
(3,  'BancoDigital Unicentro Cali',   'Cali',          'Valle del Cauca', 'Sucursal',  62,  '2017-02-20'),
(4,  'BancoDigital Bocagrande',       'Cartagena',     'Bolivar',         'Sucursal',  48,  '2018-09-05'),
(5,  'BancoDigital Buenavista',       'Barranquilla',  'Atlantico',       'Sucursal',  55,  '2019-04-12'),
(6,  'BancoDigital Bucaramanga',      'Bucaramanga',   'Santander',       'Sucursal',  40,  '2020-01-18'),
(7,  'BancoDigital Pereira',          'Pereira',       'Risaralda',       'Sucursal',  35,  '2021-07-22'),
(8,  'BancoDigital Online',           'Bogota',        'Cundinamarca',    'Digital',   12,  '2022-11-01');

-- =============================================
-- CLIENTES (40 filas)
-- =============================================
INSERT INTO clientes_banco VALUES
(1,  'Andres Felipe Restrepo Gomez',    '1020451233', 'andresr@gmail.com',        '3104521233', 'Medellin',     'Ahorros',   '2019-03-14', 'Activo',    2, 7800000,  812),
(2,  'Maria Camila Torres Vega',        '1015782341', 'mcamilat@hotmail.com',      '3214782341', 'Bogota',       'Corriente', '2018-07-22', 'Activo',    1, 12500000, 748),
(3,  'Juan Sebastian Cardona Rios',     '1043892012', 'jscardona@gmail.com',       '3006712012', 'Cali',         'Ahorros',   '2020-01-10', 'Activo',    3, 4200000,  695),
(4,  'Valentina Ospina Herrera',        '1038541209', 'vospina@outlook.com',       '3184541209', 'Medellin',     'CDT',       '2017-11-05', 'Activo',    2, 9500000,  880),
(5,  'Diego Alejandro Ramirez Cruz',    '79451023',   'dramirez@gmail.com',        '3116451023', 'Bogota',       'Corriente', '2016-05-30', 'Activo',    1, 15000000, 921),
(6,  'Luisa Fernanda Mejia Zapata',     '1032891045', 'lfmejia@gmail.com',         '3204891045', 'Barranquilla', 'Ahorros',   '2021-08-17', 'Activo',    5, 3100000,  620),
(7,  'Carlos Eduardo Moreno Pena',      '91234567',   'cemoreno@empresa.com',      '3006234567', 'Bucaramanga',  'Corriente', '2015-12-03', 'Activo',    6, 8200000,  774),
(8,  'Ana Maria Vargas Suarez',         '1075412089', 'amvargas@gmail.com',        '3153412089', 'Pereira',      'Ahorros',   '2022-03-25', 'Activo',    7, 2800000,  589),
(9,  'Felipe Antonio Gutierrez Leon',   '1020987312', 'fagutierrez@gmail.com',     '3024987312', 'Cali',         'Ahorros',   '2020-09-11', 'Inactivo',  3, 2200000,  510),
(10, 'Sandra Patricia Lozano Mora',     '52789013',   'splozano@hotmail.com',      '3143789013', 'Bogota',       'CDT',       '2017-04-19', 'Activo',    1, 11000000, 856),
(11, 'Miguel Angel Alvarez Cano',       '1070234891', 'maalvarez@gmail.com',       '3166234891', 'Medellin',     'Ahorros',   '2021-06-08', 'Activo',    2, 3600000,  641),
(12, 'Paola Andrea Jimenez Castro',     '1057891234', 'pajimenez@gmail.com',       '3218891234', 'Cartagena',    'Ahorros',   '2019-10-14', 'Bloqueado', 4, 2500000,  320),
(13, 'Roberto Carlos Perez Montoya',    '98765432',   'rcperez@empresa.com',       '3107765432', 'Bogota',       'Corriente', '2014-08-27', 'Activo',    1, 18000000, 944),
(14, 'Daniela Sofia Rios Jaramillo',    '1004512378', 'dsrios@gmail.com',          '3196512378', 'Medellin',     'Ahorros',   '2023-01-15', 'Activo',    2, 2100000,  572),
(15, 'Sergio Ivan Salazar Pardo',       '1090789123', 'sisalazar@gmail.com',       '3123789123', 'Cali',         'Corriente', '2018-03-22', 'Activo',    3, 6700000,  710),
(16, 'Laura Milena Agudelo Reyes',      '1045678901', 'lmagudelo@outlook.com',     '3175678901', 'Pereira',      'Ahorros',   '2022-07-30', 'Activo',    7, 3900000,  663),
(17, 'Camilo Andres Hurtado Velez',     '1037456789', 'cahurtado@gmail.com',       '3049456789', 'Medellin',     'CDT',       '2020-05-18', 'Activo',    2, 13500000, 899),
(18, 'Natalia Gomez Arango',            '1002345678', 'ngomez@gmail.com',          '3229345678', 'Bogota',       'Ahorros',   '2023-04-02', 'Activo',    8, 2400000,  598),
(19, 'Alejandro Muñoz Barrera',         '1060123456', 'amunoz@gmail.com',          '3011123456', 'Barranquilla', 'Corriente', '2017-09-14', 'Bloqueado', 5, 4100000,  285),
(20, 'Isabel Cristina Palacios Vidal',  '1088901234', 'icpalacios@hotmail.com',    '3168901234', 'Cartagena',    'Ahorros',   '2021-12-05', 'Activo',    4, 5200000,  727),
(21, 'Jorge Armando Castillo Ruiz',     '72345678',   'jacastillo@empresa.com',    '3039345678', 'Barranquilla', 'Corriente', '2016-02-28', 'Activo',    5, 9800000,  803),
(22, 'Melissa Johana Trujillo Cano',    '1064789012', 'mjtrujillo@gmail.com',      '3189789012', 'Cali',         'Ahorros',   '2022-10-19', 'Activo',    3, 3300000,  614),
(23, 'Nicolas Esteban Bermudez Lago',   '1022567890', 'nebermudez@gmail.com',      '3051567890', 'Bogota',       'CDT',       '2019-06-07', 'Activo',    1, 14200000, 912),
(24, 'Carolina Ximena Florez Arce',     '1047890123', 'cxflorez@gmail.com',        '3134890123', 'Medellin',     'Ahorros',   '2021-03-16', 'Activo',    2, 4700000,  682),
(25, 'Esteban Carvajal Montiel',        '1084567890', 'ecarvajal@gmail.com',       '3197567890', 'Bogota',       'Ahorros',   '2020-11-23', 'Inactivo',  1, 2900000,  488),
(26, 'Adriana Lucia Osprey Mora',       '41234567',   'alosprey@hotmail.com',      '3072234567', 'Bucaramanga',  'Corriente', '2015-07-09', 'Activo',    6, 7600000,  758),
(27, 'Hernan David Cardenas Rueda',     '1025678901', 'hdcardenas@gmail.com',      '3150678901', 'Pereira',      'Ahorros',   '2022-05-31', 'Activo',    7, 3500000,  635),
(28, 'Luz Marina Pacheco Bernal',       '52123456',   'lmpacheco@gmail.com',       '3218123456', 'Bogota',       'CDT',       '2016-10-17', 'Activo',    1, 10500000, 841),
(29, 'Mauricio Leon Escobar Hoyos',     '1058234567', 'mlescobar@gmail.com',       '3031234567', 'Medellin',     'Corriente', '2018-12-04', 'Activo',    2, 5400000,  703),
(30, 'Gloria Esperanza Rios Vanegas',   '23456789',   'gerios@hotmail.com',        '3162456789', 'Cali',         'Ahorros',   '2017-05-26', 'Activo',    3, 3700000,  659),
(31, 'Jhon Freddy Morales Salinas',     '1091345678', 'jfmorales@gmail.com',       '3099345678', 'Cartagena',    'Ahorros',   '2023-02-14', 'Activo',    4, 2600000,  601),
(32, 'Tatiana Marcela Vega Correa',     '1009678901', 'tmvega@gmail.com',          '3176678901', 'Bogota',       'Ahorros',   '2021-09-08', 'Activo',    8, 3200000,  627),
(33, 'Andres Guillermo Zapata Nieto',   '1066901234', 'agzapata@empresa.com',      '3045901234', 'Medellin',     'Corriente', '2019-07-21', 'Activo',    2, 11200000, 867),
(34, 'Marcela Cristina Duque Reyes',    '43567890',   'mcduque@gmail.com',         '3128567890', 'Medellin',     'CDT',       '2018-04-30', 'Activo',    2, 8900000,  825),
(35, 'Oscar Javier Pineda Castro',      '1048123456', 'ojpineda@gmail.com',        '3205123456', 'Barranquilla', 'Ahorros',   '2022-08-12', 'Activo',    5, 2300000,  563),
(36, 'Viviana Paola Montes Sierra',     '1003456789', 'vpmontes@gmail.com',        '3087456789', 'Bogota',       'Ahorros',   '2023-06-03', 'Activo',    8, 2000000,  540),
(37, 'Edwin Mauricio Garzon Lopez',     '80123456',   'emgarzon@hotmail.com',      '3140123456', 'Bogota',       'Corriente', '2016-11-19', 'Bloqueado', 1, 5800000,  310),
(38, 'Manuela Alejandra Cifuentes Rios','1012789012', 'macifuentes@gmail.com',     '3213789012', 'Cali',         'Ahorros',   '2021-01-27', 'Activo',    3, 4500000,  671),
(39, 'Pablo Sebastian Torres Castaño',  '1074012345', 'pstorres@gmail.com',        '3058012345', 'Pereira',      'Ahorros',   '2020-06-15', 'Activo',    7, 3800000,  648),
(40, 'Juliana Beatriz Castro Mora',     '1017345678', 'jbcastro@gmail.com',        '3191345678', 'Bogota',       'CDT',       '2019-02-08', 'Activo',    1, 16500000, 958);

-- =============================================
-- CUENTAS (50 filas)
-- =============================================
INSERT INTO cuentas VALUES
(1,  1,  'Ahorros',   '2345-6001-0001', 12450000,   'COP', 'Activa',   '2019-03-14', 9.50),
(2,  2,  'Corriente', '2345-6002-0001', 8750000,    'COP', 'Activa',   '2018-07-22', 0.00),
(3,  3,  'Ahorros',   '2345-6003-0001', 3200000,    'COP', 'Activa',   '2020-01-10', 9.00),
(4,  4,  'CDT',       '2345-6004-0001', 45000000,   'COP', 'Activa',   '2017-11-05', 12.50),
(5,  5,  'Corriente', '2345-6005-0001', 32100000,   'COP', 'Activa',   '2016-05-30', 0.00),
(6,  5,  'Ahorros',   '2345-6005-0002', 18600000,   'COP', 'Activa',   '2018-02-14', 10.00),
(7,  6,  'Ahorros',   '2345-6006-0001', 1850000,    'COP', 'Activa',   '2021-08-17', 8.50),
(8,  7,  'Corriente', '2345-6007-0001', 14200000,   'COP', 'Activa',   '2015-12-03', 0.00),
(9,  8,  'Ahorros',   '2345-6008-0001', 950000,     'COP', 'Activa',   '2022-03-25', 8.50),
(10, 9,  'Ahorros',   '2345-6009-0001', 420000,     'COP', 'Inactiva', '2020-09-11', 8.00),
(11, 10, 'CDT',       '2345-6010-0001', 80000000,   'COP', 'Activa',   '2017-04-19', 13.00),
(12, 10, 'Ahorros',   '2345-6010-0002', 6700000,    'COP', 'Activa',   '2019-08-01', 9.50),
(13, 11, 'Ahorros',   '2345-6011-0001', 4100000,    'COP', 'Activa',   '2021-06-08', 9.00),
(14, 12, 'Ahorros',   '2345-6012-0001', 180000,     'COP', 'Bloqueada','2019-10-14', 8.00),
(15, 13, 'Corriente', '2345-6013-0001', 67500000,   'COP', 'Activa',   '2014-08-27', 0.00),
(16, 13, 'Ahorros',   '2345-6013-0002', 21300000,   'COP', 'Activa',   '2016-03-10', 10.00),
(17, 14, 'Ahorros',   '2345-6014-0001', 780000,     'COP', 'Activa',   '2023-01-15', 8.50),
(18, 15, 'Corriente', '2345-6015-0001', 9800000,    'COP', 'Activa',   '2018-03-22', 0.00),
(19, 16, 'Ahorros',   '2345-6016-0001', 5600000,    'COP', 'Activa',   '2022-07-30', 9.00),
(20, 17, 'CDT',       '2345-6017-0001', 120000000,  'COP', 'Activa',   '2020-05-18', 13.75),
(21, 17, 'Corriente', '2345-6017-0002', 15400000,   'COP', 'Activa',   '2021-01-09', 0.00),
(22, 18, 'Ahorros',   '2345-6018-0001', 1250000,    'COP', 'Activa',   '2023-04-02', 8.50),
(23, 19, 'Corriente', '2345-6019-0001', 320000,     'COP', 'Bloqueada','2017-09-14', 0.00),
(24, 20, 'Ahorros',   '2345-6020-0001', 11700000,   'COP', 'Activa',   '2021-12-05', 9.50),
(25, 21, 'Corriente', '2345-6021-0001', 23800000,   'COP', 'Activa',   '2016-02-28', 0.00),
(26, 22, 'Ahorros',   '2345-6022-0001', 3750000,    'COP', 'Activa',   '2022-10-19', 9.00),
(27, 23, 'CDT',       '2345-6023-0001', 95000000,   'COP', 'Activa',   '2019-06-07', 14.00),
(28, 23, 'Ahorros',   '2345-6023-0002', 9200000,    'COP', 'Activa',   '2020-11-15', 10.00),
(29, 24, 'Ahorros',   '2345-6024-0001', 7300000,    'COP', 'Activa',   '2021-03-16', 9.50),
(30, 25, 'Ahorros',   '2345-6025-0001', 650000,     'COP', 'Inactiva', '2020-11-23', 8.00),
(31, 26, 'Corriente', '2345-6026-0001', 17900000,   'COP', 'Activa',   '2015-07-09', 0.00),
(32, 27, 'Ahorros',   '2345-6027-0001', 4800000,    'COP', 'Activa',   '2022-05-31', 9.00),
(33, 28, 'CDT',       '2345-6028-0001', 60000000,   'COP', 'Activa',   '2016-10-17', 12.75),
(34, 28, 'Ahorros',   '2345-6028-0002', 8100000,    'COP', 'Activa',   '2018-06-22', 9.50),
(35, 29, 'Corriente', '2345-6029-0001', 6500000,    'COP', 'Activa',   '2018-12-04', 0.00),
(36, 30, 'Ahorros',   '2345-6030-0001', 5100000,    'COP', 'Activa',   '2017-05-26', 9.00),
(37, 31, 'Ahorros',   '2345-6031-0001', 1980000,    'COP', 'Activa',   '2023-02-14', 8.50),
(38, 32, 'Ahorros',   '2345-6032-0001', 3600000,    'COP', 'Activa',   '2021-09-08', 9.00),
(39, 33, 'Corriente', '2345-6033-0001', 28500000,   'COP', 'Activa',   '2019-07-21', 0.00),
(40, 33, 'Ahorros',   '2345-6033-0002', 14600000,   'COP', 'Activa',   '2020-04-05', 10.00),
(41, 34, 'CDT',       '2345-6034-0001', 55000000,   'COP', 'Activa',   '2018-04-30', 13.25),
(42, 35, 'Ahorros',   '2345-6035-0001', 1100000,    'COP', 'Activa',   '2022-08-12', 8.50),
(43, 36, 'Ahorros',   '2345-6036-0001', 850000,     'COP', 'Activa',   '2023-06-03', 8.00),
(44, 37, 'Corriente', '2345-6037-0001', 90000,      'COP', 'Bloqueada','2016-11-19', 0.00),
(45, 38, 'Ahorros',   '2345-6038-0001', 6200000,    'COP', 'Activa',   '2021-01-27', 9.00),
(46, 39, 'Ahorros',   '2345-6039-0001', 4400000,    'COP', 'Activa',   '2020-06-15', 9.00),
(47, 40, 'CDT',       '2345-6040-0001', 150000000,  'COP', 'Activa',   '2019-02-08', 14.00),
(48, 40, 'Corriente', '2345-6040-0002', 38700000,   'COP', 'Activa',   '2019-03-01', 0.00),
(49, 2,  'Ahorros',   '2345-6002-0002', 4200000,    'COP', 'Activa',   '2020-05-11', 9.00),
(50, 7,  'Ahorros',   '2345-6007-0002', 7300000,    'USD', 'Activa',   '2021-04-18', 2.50);

-- =============================================
-- TRANSACCIONES (150 filas)
-- =============================================

-- Enero 2024
INSERT INTO transacciones VALUES
(1,   1,   NULL, 'Nomina',         7800000,  '2024-01-05', 'Nomina enero - Empresa Accenture',             'Completada', 'Web'),
(2,   2,   NULL, 'Nomina',         12500000, '2024-01-05', 'Nomina enero - Ministerio TIC',                'Completada', 'Web'),
(3,   5,   NULL, 'Nomina',         15000000, '2024-01-05', 'Nomina enero - Grupo Bancolombia',             'Completada', 'Web'),
(4,   1,   7,   'Transferencia',   350000,   '2024-01-07', 'Transferencia Nequi amigo',                    'Completada', 'App'),
(5,   2,   NULL, 'Pago_Servicio',  85000,    '2024-01-08', 'Pago Netflix mensualidad',                     'Completada', 'App'),
(6,   5,   NULL, 'Pago_Servicio',  320000,   '2024-01-09', 'Pago EPM servicios publicos enero',            'Completada', 'Web'),
(7,   15,  NULL, 'Retiro',         2000000,  '2024-01-10', 'Retiro ATM Bancolombia Centro',                'Completada', 'ATM'),
(8,   3,   NULL, 'Pago_Servicio',  145000,   '2024-01-11', 'Pago Claro internet hogar',                    'Completada', 'App'),
(9,   8,   NULL, 'Nomina',         8200000,  '2024-01-05', 'Nomina enero - Suramericana',                  'Completada', 'Web'),
(10,  1,   NULL, 'Compra_TC',      180000,   '2024-01-12', 'Compra Exito supermercado',                    'Completada', 'POS'),
(11,  13,  NULL, 'Nomina',         18000000, '2024-01-05', 'Nomina enero - ISA Intercolombia',             'Completada', 'Web'),
(12,  25,  NULL, 'Pago_Servicio',  95000,    '2024-01-13', 'Pago Spotify + Family',                        'Completada', 'App'),
(13,  6,   NULL, 'Deposito',       500000,   '2024-01-14', 'Deposito efectivo sucursal',                   'Completada', 'Sucursal'),
(14,  7,   2,   'Transferencia',   1200000,  '2024-01-15', 'Pago arriendo oficina enero',                  'Completada', 'Web'),
(15,  15,  NULL, 'Compra_TC',      450000,   '2024-01-16', 'Compra Alkosto electrodomesticos',             'Completada', 'POS'),
(16,  18,  NULL, 'Deposito',       2400000,  '2024-01-17', 'Deposito inicial apertura cuenta',             'Completada', 'Sucursal'),
(17,  39,  NULL, 'Pago_Servicio',  67000,    '2024-01-18', 'Pago Rappi suscripcion Prime',                 'Completada', 'App'),
(18,  24,  NULL, 'Nomina',         5200000,  '2024-01-05', 'Nomina enero - Hotel Dann Carlton',            'Completada', 'Web'),
(19,  5,   16,  'Transferencia',   3000000,  '2024-01-19', 'Transferencia fondos inversion',               'Completada', 'Web'),
(20,  11,  NULL, 'Pago_Servicio',  210000,   '2024-01-20', 'Pago Gas Natural Fenosa',                      'Completada', 'App');

-- Febrero 2024
INSERT INTO transacciones VALUES
(21,  1,   NULL, 'Nomina',         7800000,  '2024-02-05', 'Nomina febrero - Empresa Accenture',           'Completada', 'Web'),
(22,  2,   NULL, 'Nomina',         12500000, '2024-02-05', 'Nomina febrero - Ministerio TIC',              'Completada', 'Web'),
(23,  5,   NULL, 'Nomina',         15000000, '2024-02-05', 'Nomina febrero - Grupo Bancolombia',           'Completada', 'Web'),
(24,  2,   NULL, 'Pago_Servicio',  220000,   '2024-02-06', 'Pago ETB internet y telefono',                 'Completada', 'Web'),
(25,  3,   1,   'Transferencia',   500000,   '2024-02-08', 'Apoyo economico familia',                      'Completada', 'App'),
(26,  15,  NULL, 'Retiro',         3000000,  '2024-02-09', 'Retiro ATM Davivienda Chapinero',              'Completada', 'ATM'),
(27,  6,   NULL, 'Pago_Servicio',  185000,   '2024-02-10', 'Pago Movistar plan datos',                     'Completada', 'App'),
(28,  8,   NULL, 'Compra_TC',      780000,   '2024-02-11', 'Compra Falabella ropa',                        'Completada', 'POS'),
(29,  13,  25,  'Transferencia',   5000000,  '2024-02-12', 'Pago contrato servicios consultoria',          'Completada', 'Web'),
(30,  9,   NULL, 'Retiro',         200000,   '2024-02-14', 'Retiro ATM Bogota',                            'Completada', 'ATM'),
(31,  21,  NULL, 'Nomina',         9800000,  '2024-02-05', 'Nomina febrero - Bavaria SA',                  'Completada', 'Web'),
(32,  1,   NULL, 'Pago_Servicio',  95000,    '2024-02-15', 'Pago Netflix mensualidad',                     'Completada', 'App'),
(33,  29,  NULL, 'Compra_TC',      340000,   '2024-02-16', 'Compra Rappi mercado domicilio',               'Completada', 'App'),
(34,  5,   NULL, 'Pago_Servicio',  850000,   '2024-02-18', 'Pago Codensa energia electrica',               'Completada', 'Web'),
(35,  16,  NULL, 'Deposito',       1500000,  '2024-02-19', 'Deposito ahorro programado',                   'Completada', 'App'),
(36,  11,  NULL, 'Nomina',         3600000,  '2024-02-05', 'Nomina febrero - Almacenes Exito',             'Completada', 'Web'),
(37,  26,  NULL, 'Compra_TC',      125000,   '2024-02-21', 'Compra Juan Valdez cafeteria',                 'Completada', 'POS'),
(38,  39,  NULL, 'Deposito',       3800000,  '2024-02-05', 'Nomina febrero - Empresa',                     'Completada', 'Web'),
(39,  2,   49,  'Transferencia',   800000,   '2024-02-22', 'Transferencia a cuenta ahorros personal',      'Completada', 'App'),
(40,  15,  NULL, 'Pago_Servicio',  560000,   '2024-02-23', 'Pago arriendo parqueadero mensual',            'Completada', 'Web');

-- Marzo 2024
INSERT INTO transacciones VALUES
(41,  1,   NULL, 'Nomina',         7800000,  '2024-03-05', 'Nomina marzo - Empresa Accenture',             'Completada', 'Web'),
(42,  13,  NULL, 'Nomina',         18000000, '2024-03-05', 'Nomina marzo - ISA Intercolombia',             'Completada', 'Web'),
(43,  5,   NULL, 'Retiro',         5000000,  '2024-03-07', 'Retiro sucursal principal',                    'Completada', 'Sucursal'),
(44,  7,   NULL, 'Compra_TC',      2100000,  '2024-03-08', 'Compra Homecenter muebles',                    'Completada', 'POS'),
(45,  3,   NULL, 'Pago_Servicio',  67000,    '2024-03-10', 'Pago Claro TV cable',                          'Completada', 'App'),
(46,  24,  NULL, 'Pago_Servicio',  420000,   '2024-03-11', 'Pago ACUEDUCTO Empresas Publicas',             'Completada', 'Web'),
(47,  29,  NULL, 'Nomina',         5400000,  '2024-03-05', 'Nomina marzo - Constructora Bolivar',          'Completada', 'Web'),
(48,  15,  NULL, 'Compra_TC',      1890000,  '2024-03-12', 'Compra Samsung Store telefono',                'Completada', 'POS'),
(49,  38,  NULL, 'Nomina',         4500000,  '2024-03-05', 'Nomina marzo - Cementos Argos',                'Completada', 'Web'),
(50,  21,  NULL, 'Retiro',         1500000,  '2024-03-14', 'Retiro ATM Barranquilla centro',               'Completada', 'ATM'),
(51,  1,   3,   'Transferencia',   200000,   '2024-03-15', 'Transferencia amigo Juan',                     'Completada', 'App'),
(52,  12,  NULL, 'Deposito',       350000,   '2024-03-16', 'Deposito efectivo',                            'Rechazada',  'Sucursal'),
(53,  5,   NULL, 'Pago_Servicio',  280000,   '2024-03-17', 'Pago DirecTV television',                      'Completada', 'Web'),
(54,  8,   NULL, 'Nomina',         8200000,  '2024-03-05', 'Nomina marzo - Suramericana',                  'Completada', 'Web'),
(55,  28,  NULL, 'Deposito',       11000000, '2024-03-18', 'Abono CDT vencimiento',                        'Completada', 'Sucursal'),
(56,  16,  NULL, 'Pago_Servicio',  89000,    '2024-03-20', 'Pago Disney+ suscripcion',                     'Completada', 'App'),
(57,  33,  NULL, 'Nomina',         11200000, '2024-03-05', 'Nomina marzo - Ecopetrol',                     'Completada', 'Web'),
(58,  25,  NULL, 'Retiro',         300000,   '2024-03-22', 'Retiro ATM',                                   'Completada', 'ATM'),
(59,  39,  NULL, 'Compra_TC',      230000,   '2024-03-23', 'Compra Ara supermercado',                      'Completada', 'POS'),
(60,  13,  NULL, 'Pago_Servicio',  1200000,  '2024-03-25', 'Pago seguro vehiculo Sura',                    'Completada', 'Web');

-- Abril 2024
INSERT INTO transacciones VALUES
(61,  1,   NULL, 'Nomina',         7800000,  '2024-04-05', 'Nomina abril - Empresa Accenture',             'Completada', 'Web'),
(62,  2,   NULL, 'Pago_Servicio',  185000,   '2024-04-06', 'Pago Spotify Premium familiar',                'Completada', 'App'),
(63,  5,   NULL, 'Nomina',         15000000, '2024-04-05', 'Nomina abril - Grupo Bancolombia',             'Completada', 'Web'),
(64,  7,   NULL, 'Retiro',         1000000,  '2024-04-08', 'Retiro ATM Medellin',                          'Completada', 'ATM'),
(65,  24,  6,   'Transferencia',   600000,   '2024-04-09', 'Transferencia a familiar',                     'Completada', 'App'),
(66,  15,  NULL, 'Compra_TC',      3400000,  '2024-04-10', 'Compra tiquetes Avianca Cartagena',            'Completada', 'Web'),
(67,  18,  NULL, 'Nomina',         2400000,  '2024-04-05', 'Nomina abril - Freelance',                     'Completada', 'Web'),
(68,  33,  NULL, 'Pago_Servicio',  680000,   '2024-04-11', 'Pago EDQ energia electrica Medellin',          'Completada', 'Web'),
(69,  3,   NULL, 'Deposito',       500000,   '2024-04-12', 'Deposito efectivo ventanilla',                 'Completada', 'Sucursal'),
(70,  39,  46,  'Transferencia',   1000000,  '2024-04-13', 'Transferencia cuenta propia ahorros',          'Completada', 'App'),
(71,  29,  NULL, 'Compra_TC',      450000,   '2024-04-15', 'Compra Farmatodo medicamentos',                'Completada', 'POS'),
(72,  21,  NULL, 'Nomina',         9800000,  '2024-04-05', 'Nomina abril - Bavaria SA',                    'Completada', 'Web'),
(73,  8,   NULL, 'Pago_Servicio',  320000,   '2024-04-16', 'Pago EPM gas domiciliario',                    'Completada', 'Web'),
(74,  11,  NULL, 'Retiro',         500000,   '2024-04-18', 'Retiro ATM Medellin Laureles',                 'Completada', 'ATM'),
(75,  5,   NULL, 'Pago_Servicio',  1500000,  '2024-04-20', 'Pago cuota prestamo vehiculo',                 'Completada', 'Web'),
(76,  13,  NULL, 'Retiro',         10000000, '2024-04-22', 'Retiro vacaciones Europa',                     'Completada', 'Sucursal'),
(77,  38,  NULL, 'Pago_Servicio',  145000,   '2024-04-23', 'Pago ETB hogar plan fibra',                    'Completada', 'App'),
(78,  46,  NULL, 'Deposito',       3800000,  '2024-04-05', 'Nomina abril - empresa',                       'Completada', 'Web'),
(79,  15,  NULL, 'Pago_Servicio',  890000,   '2024-04-24', 'Pago cuota condominio',                        'Completada', 'Web'),
(80,  1,   NULL, 'Compra_TC',      95000,    '2024-04-25', 'Compra Rappi restaurante',                     'Completada', 'App');

-- Mayo 2024
INSERT INTO transacciones VALUES
(81,  1,   NULL, 'Nomina',         7800000,  '2024-05-05', 'Nomina mayo - Empresa Accenture',              'Completada', 'Web'),
(82,  13,  NULL, 'Nomina',         18000000, '2024-05-05', 'Nomina mayo - ISA Intercolombia',              'Completada', 'Web'),
(83,  5,   NULL, 'Nomina',         15000000, '2024-05-05', 'Nomina mayo - Grupo Bancolombia',              'Completada', 'Web'),
(84,  7,   8,   'Transferencia',   2500000,  '2024-05-08', 'Pago factura servicios profesionales',         'Completada', 'Web'),
(85,  24,  NULL, 'Pago_Servicio',  85000,    '2024-05-09', 'Pago Netflix mensualidad',                     'Completada', 'App'),
(86,  3,   NULL, 'Retiro',         400000,   '2024-05-10', 'Retiro cajero automatico Cali',                'Completada', 'ATM'),
(87,  29,  NULL, 'Nomina',         5400000,  '2024-05-05', 'Nomina mayo - Constructora Bolivar',           'Completada', 'Web'),
(88,  15,  NULL, 'Compra_TC',      6800000,  '2024-05-11', 'Compra Ktronix TV 65 pulgadas',                'Completada', 'POS'),
(89,  21,  NULL, 'Pago_Servicio',  560000,   '2024-05-12', 'Pago Triple A acueducto Barranquilla',         'Completada', 'Web'),
(90,  38,  NULL, 'Nomina',         4500000,  '2024-05-05', 'Nomina mayo - Cementos Argos',                 'Completada', 'Web'),
(91,  11,  NULL, 'Pago_Servicio',  95000,    '2024-05-14', 'Pago Deezer musica',                           'Completada', 'App'),
(92,  5,   11,  'Transferencia',   1000000,  '2024-05-15', 'Prestamo personal amigo',                      'Completada', 'App'),
(93,  33,  NULL, 'Nomina',         11200000, '2024-05-05', 'Nomina mayo - Ecopetrol',                      'Completada', 'Web'),
(94,  2,   NULL, 'Pago_Servicio',  380000,   '2024-05-16', 'Pago seguro de vida Proteccion',               'Completada', 'Web'),
(95,  16,  NULL, 'Nomina',         3900000,  '2024-05-05', 'Nomina mayo - Pereira empresa',                'Completada', 'Web'),
(96,  39,  NULL, 'Compra_TC',      165000,   '2024-05-18', 'Compra D1 supermercado',                       'Completada', 'POS'),
(97,  8,   NULL, 'Retiro',         800000,   '2024-05-20', 'Retiro ATM Bucaramanga',                       'Completada', 'ATM'),
(98,  1,   NULL, 'Pago_Servicio',  210000,   '2024-05-22', 'Pago EE.PP Medellin energia',                  'Completada', 'Web'),
(99,  46,  NULL, 'Deposito',       3800000,  '2024-05-05', 'Nomina mayo - empresa',                        'Completada', 'Web'),
(100, 15,  NULL, 'Retiro',         2000000,  '2024-05-24', 'Retiro gastos personales',                     'Completada', 'ATM');

-- Junio 2024
INSERT INTO transacciones VALUES
(101, 1,   NULL, 'Nomina',         7800000,  '2024-06-05', 'Nomina junio - Empresa Accenture',             'Completada', 'Web'),
(102, 5,   NULL, 'Nomina',         15000000, '2024-06-05', 'Nomina junio - Grupo Bancolombia',             'Completada', 'Web'),
(103, 24,  NULL, 'Pago_Servicio',  560000,   '2024-06-07', 'Pago administracion apartamento',              'Completada', 'Web'),
(104, 7,   NULL, 'Compra_TC',      3200000,  '2024-06-08', 'Compra tiquetes Copa Airlines Cancun',         'Completada', 'Web'),
(105, 11,  3,   'Transferencia',   300000,   '2024-06-10', 'Transferencia Nequi amigo',                    'Completada', 'App'),
(106, 33,  NULL, 'Nomina',         11200000, '2024-06-05', 'Nomina junio - Ecopetrol',                     'Completada', 'Web'),
(107, 29,  NULL, 'Pago_Servicio',  145000,   '2024-06-11', 'Pago Tigo internet hogar',                     'Completada', 'App'),
(108, 38,  NULL, 'Pago_Servicio',  89000,    '2024-06-12', 'Pago Apple Music suscripcion',                 'Completada', 'App'),
(109, 13,  NULL, 'Retiro',         5000000,  '2024-06-14', 'Retiro gastos vacaciones',                     'Completada', 'Sucursal'),
(110, 21,  NULL, 'Compra_TC',      890000,   '2024-06-15', 'Compra Zapatos Bata',                          'Completada', 'POS'),
(111, 3,   NULL, 'Deposito',       700000,   '2024-06-17', 'Deposito efectivo ventanilla Cali',            'Completada', 'Sucursal'),
(112, 16,  NULL, 'Nomina',         3900000,  '2024-06-05', 'Nomina junio - empresa Pereira',               'Completada', 'Web'),
(113, 15,  NULL, 'Pago_Servicio',  2400000,  '2024-06-18', 'Pago impuesto predial Bogota',                 'Completada', 'Web'),
(114, 26,  NULL, 'Nomina',         7600000,  '2024-06-05', 'Nomina junio - Colpatria',                     'Completada', 'Web'),
(115, 5,   NULL, 'Pago_Servicio',  750000,   '2024-06-20', 'Pago cuota vehiculo Toyota',                   'Completada', 'Web'),
(116, 39,  NULL, 'Nomina',         3800000,  '2024-06-05', 'Nomina junio - empresa',                       'Completada', 'Web'),
(117, 1,   NULL, 'Compra_TC',      340000,   '2024-06-22', 'Compra Oma restaurante Medellin',              'Completada', 'POS'),
(118, 34,  NULL, 'Deposito',       8900000,  '2024-06-24', 'Deposito CDT renovacion',                      'Completada', 'Sucursal'),
(119, 8,   NULL, 'Pago_Servicio',  185000,   '2024-06-25', 'Pago Movistar plan familiar',                  'Completada', 'App'),
(120, 46,  NULL, 'Nomina',         3800000,  '2024-06-05', 'Nomina junio - empresa',                       'Completada', 'Web');

-- Julio - Septiembre 2024
INSERT INTO transacciones VALUES
(121, 1,   NULL, 'Nomina',         7800000,  '2024-07-05', 'Nomina julio - Empresa Accenture',             'Completada', 'Web'),
(122, 13,  NULL, 'Nomina',         18000000, '2024-07-05', 'Nomina julio - ISA Intercolombia',             'Completada', 'Web'),
(123, 5,   13,  'Transferencia',   10000000, '2024-07-10', 'Pago inversion conjunta',                      'Completada', 'Web'),
(124, 29,  NULL, 'Compra_TC',      1250000,  '2024-07-11', 'Compra Alkosto nevera',                        'Completada', 'POS'),
(125, 7,   NULL, 'Pago_Servicio',  320000,   '2024-07-12', 'Pago EPM gas agosto',                          'Completada', 'Web'),
(126, 24,  NULL, 'Retiro',         1200000,  '2024-07-15', 'Retiro ATM Cartagena vacaciones',              'Completada', 'ATM'),
(127, 33,  NULL, 'Nomina',         11200000, '2024-07-05', 'Nomina julio - Ecopetrol',                     'Completada', 'Web'),
(128, 21,  NULL, 'Pago_Servicio',  480000,   '2024-07-16', 'Pago ELECTRICARIBE energia',                   'Completada', 'Web'),
(129, 3,   NULL, 'Deposito',       4200000,  '2024-07-05', 'Nomina julio - empresa Cali',                  'Completada', 'Web'),
(130, 38,  NULL, 'Compra_TC',      675000,   '2024-07-18', 'Compra Linio electronico online',              'Completada', 'Web'),
(131, 11,  NULL, 'Nomina',         3600000,  '2024-08-05', 'Nomina agosto - Almacenes Exito',              'Completada', 'Web'),
(132, 16,  NULL, 'Nomina',         3900000,  '2024-08-05', 'Nomina agosto - empresa Pereira',              'Completada', 'Web'),
(133, 15,  NULL, 'Retiro',         4000000,  '2024-08-10', 'Retiro gastos varios',                         'Completada', 'Sucursal'),
(134, 5,   NULL, 'Pago_Servicio',  320000,   '2024-08-12', 'Pago EPM servicios publicos agosto',           'Completada', 'Web'),
(135, 7,   NULL, 'Nomina',         8200000,  '2024-08-05', 'Nomina agosto - Suramericana',                 'Completada', 'Web'),
(136, 26,  2,   'Transferencia',   2000000,  '2024-09-05', 'Transferencia negocio',                        'Completada', 'Web'),
(137, 33,  NULL, 'Compra_TC',      4500000,  '2024-09-08', 'Compra Apple MacBook Air',                     'Completada', 'POS'),
(138, 21,  NULL, 'Retiro',         1000000,  '2024-09-10', 'Retiro ATM Barranquilla',                      'Completada', 'ATM'),
(139, 1,   NULL, 'Pago_Servicio',  320000,   '2024-09-12', 'Pago EE.PP Medellin septiembre',               'Completada', 'Web'),
(140, 48,  NULL, 'Nomina',         16500000, '2024-09-05', 'Nomina septiembre - Avianca Holdings',         'Completada', 'Web');

-- Octubre - Diciembre 2024 y Enero 2025
INSERT INTO transacciones VALUES
(141, 48,  NULL, 'Nomina',         16500000, '2024-10-05', 'Nomina octubre - Avianca Holdings',            'Completada', 'Web'),
(142, 5,   NULL, 'Nomina',         15000000, '2024-10-05', 'Nomina octubre - Grupo Bancolombia',           'Completada', 'Web'),
(143, 15,  NULL, 'Compra_TC',      7900000,  '2024-10-12', 'Compra Samsung Galaxy S24 Ultra',              'Completada', 'POS'),
(144, 13,  NULL, 'Pago_Servicio',  1800000,  '2024-10-15', 'Pago seguro hogar Sura octubre',               'Completada', 'Web'),
(145, 1,   3,   'Transferencia',   150000,   '2024-10-18', 'Transferencia cuota cena amigos',              'Completada', 'App'),
(146, 33,  NULL, 'Nomina',         11200000, '2024-11-05', 'Nomina noviembre - Ecopetrol',                 'Completada', 'Web'),
(147, 48,  NULL, 'Pago_Servicio',  3500000,  '2024-11-10', 'Pago prima servicios empleada',                'Completada', 'Web'),
(148, 15,  NULL, 'Retiro',         8000000,  '2024-11-15', 'Retiro compras navidad anticipado',            'Completada', 'Sucursal'),
(149, 5,   NULL, 'Compra_TC',      2800000,  '2024-12-10', 'Compra Exito navidad regalos',                 'Completada', 'POS'),
(150, 1,   NULL, 'Deposito',       500000,   '2025-01-05', 'Deposito ahorro enero 2025',                   'Completada', 'App');

-- =============================================
-- TARJETAS (30 filas)
-- =============================================
INSERT INTO tarjetas VALUES
(1,  1,  'Debito',  '**** **** **** 4521', NULL,       0,         '2027-03-31', 'Activa'),
(2,  1,  'Credito', '**** **** **** 7834', 15000000,   4200000,   '2026-08-31', 'Activa'),
(3,  2,  'Debito',  '**** **** **** 2190', NULL,       0,         '2026-07-31', 'Activa'),
(4,  2,  'Credito', '**** **** **** 5567', 20000000,   8750000,   '2025-12-31', 'Activa'),
(5,  5,  'Debito',  '**** **** **** 8832', NULL,       0,         '2027-05-31', 'Activa'),
(6,  5,  'Credito', '**** **** **** 1145', 50000000,   12600000,  '2026-11-30', 'Activa'),
(7,  6,  'Debito',  '**** **** **** 3309', NULL,       0,         '2026-09-30', 'Activa'),
(8,  6,  'Credito', '**** **** **** 6678', 8000000,    3500000,   '2025-06-30', 'Activa'),
(9,  8,  'Debito',  '**** **** **** 7723', NULL,       0,         '2028-01-31', 'Activa'),
(10, 8,  'Credito', '**** **** **** 4456', 25000000,   9800000,   '2027-03-31', 'Activa'),
(11, 13, 'Debito',  '**** **** **** 9901', NULL,       0,         '2026-04-30', 'Activa'),
(12, 13, 'Credito', '**** **** **** 2234', 80000000,   15000000,  '2027-09-30', 'Activa'),
(13, 15, 'Debito',  '**** **** **** 5512', NULL,       0,         '2026-10-31', 'Activa'),
(14, 15, 'Credito', '**** **** **** 8845', 35000000,   22000000,  '2025-08-31', 'Activa'),
(15, 14, 'Bloqueada','**** **** **** 1123', NULL,       0,         '2024-05-31', 'Bloqueada'),
(16, 18, 'Debito',  '**** **** **** 3388', NULL,       0,         '2027-04-30', 'Activa'),
(17, 21, 'Debito',  '**** **** **** 4412', NULL,       0,         '2026-06-30', 'Activa'),
(18, 21, 'Credito', '**** **** **** 7789', 30000000,   11200000,  '2026-02-28', 'Activa'),
(19, 25, 'Debito',  '**** **** **** 6634', NULL,       0,         '2023-11-30', 'Vencida'),
(20, 26, 'Debito',  '**** **** **** 9967', NULL,       0,         '2027-07-31', 'Activa'),
(21, 26, 'Credito', '**** **** **** 2290', 22000000,   7300000,   '2026-05-31', 'Activa'),
(22, 29, 'Debito',  '**** **** **** 5523', NULL,       0,         '2026-12-31', 'Activa'),
(23, 33, 'Debito',  '**** **** **** 8856', NULL,       0,         '2027-07-31', 'Activa'),
(24, 33, 'Credito', '**** **** **** 1189', 45000000,   31000000,  '2026-09-30', 'Activa'),
(25, 37, 'Debito',  '**** **** **** 3312', NULL,       0,         '2024-11-30', 'Bloqueada'),
(26, 39, 'Debito',  '**** **** **** 6645', NULL,       0,         '2027-06-30', 'Activa'),
(27, 40, 'Debito',  '**** **** **** 7778', NULL,       0,         '2028-02-29', 'Activa'),
(28, 40, 'Credito', '**** **** **** 0001', 100000000,  28000000,  '2027-11-30', 'Activa'),
(29, 11, 'Debito',  '**** **** **** 8891', NULL,       0,         '2026-06-30', 'Activa'),
(30, 22, 'Debito',  '**** **** **** 2224', NULL,       0,         '2027-10-31', 'Activa');

-- =============================================
-- PRESTAMOS (20 filas)
-- =============================================
INSERT INTO prestamos VALUES
(1,  1,  'Personal',         15000000,  15000000,  22.50, 36,  540000,    8100000,   'Activo',         '2022-08-15'),
(2,  3,  'Educativo',         8000000,   8000000,  14.00, 48,  220000,    4400000,   'Activo',         '2022-03-10'),
(3,  5,  'Vehiculo',        95000000,  95000000,  18.00, 60, 2413000,   52000000,   'Activo',         '2021-06-20'),
(4,  7,  'Vivienda',       280000000, 280000000,  15.50, 180, 3850000,  210000000,  'Activo',         '2018-09-01'),
(5,  10, 'Libre_Inversion',  25000000,  25000000,  24.00, 24, 1285000,    6400000,   'Activo',         '2023-02-14'),
(6,  12, 'Personal',         6000000,   6000000,  28.00, 24,  340000,    4900000,   'Mora',           '2022-10-05'),
(7,  13, 'Vivienda',       450000000, 450000000,  13.50, 240, 5200000,  390000000,  'Activo',         '2017-04-15'),
(8,  15, 'Vehiculo',        65000000,  65000000,  17.50, 60, 1632000,   38000000,   'Activo',         '2021-11-08'),
(9,  17, 'Libre_Inversion',  40000000,  40000000,  21.00, 36, 1490000,   12000000,   'Activo',         '2022-01-20'),
(10, 19, 'Personal',        10000000,  10000000,  26.00, 24,  582000,    9800000,   'Mora',           '2023-07-12'),
(11, 21, 'Vehiculo',        78000000,  78000000,  18.50, 60, 2005000,   56000000,   'Activo',         '2022-05-18'),
(12, 23, 'Vivienda',       380000000, 380000000,  14.00, 240, 4750000,  330000000,  'Activo',         '2019-09-30'),
(13, 26, 'Libre_Inversion',  20000000,  20000000,  23.00, 36,  750000,   11200000,   'Activo',         '2023-04-10'),
(14, 29, 'Personal',        12000000,  12000000,  25.00, 24,  689000,    7800000,   'Activo',         '2023-08-22'),
(15, 33, 'Vehiculo',       110000000, 110000000,  16.00, 72, 2390000,   88000000,   'Activo',         '2022-03-01'),
(16, 34, 'Vivienda',       320000000, 320000000,  14.75, 180, 4310000,  295000000,  'Reestructurado', '2019-06-14'),
(17, 37, 'Personal',         8000000,   7500000,  28.00, 18,  510000,    7200000,   'Mora',           '2023-09-05'),
(18, 38, 'Educativo',       12000000,  12000000,  14.50, 60,  283000,    8500000,   'Activo',         '2021-08-30'),
(19, 40, 'Vivienda',       620000000, 620000000,  13.00, 300, 6850000,  580000000,  'Activo',         '2019-04-01'),
(20, 2,  'Libre_Inversion',  30000000,  30000000,  22.00, 36, 1090000,   22000000,   'Pagado',         '2021-01-15');
