-- ============================================================
-- StreamCo - Plataforma Colombiana de Streaming
-- Dataset para ejercicios de SQL en Data Science
-- ============================================================

-- ============================================================
-- TABLA: planes
-- ============================================================

CREATE TABLE IF NOT EXISTS planes (
    id                INTEGER PRIMARY KEY,
    nombre            TEXT NOT NULL,
    precio_mensual    INTEGER NOT NULL,
    max_dispositivos  INTEGER NOT NULL,
    calidad_video     TEXT NOT NULL,
    descargas_offline INTEGER NOT NULL
);

INSERT INTO planes VALUES (1, 'Basico',    17900, 1, 'HD',     0);
INSERT INTO planes VALUES (2, 'Estandar',  29900, 2, 'FullHD', 15);
INSERT INTO planes VALUES (3, 'Premium',   44900, 4, '4K',     30);
INSERT INTO planes VALUES (4, 'Familiar',  54900, 6, '4K',     50);

-- ============================================================
-- TABLA: usuarios
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id               INTEGER PRIMARY KEY,
    nombre           TEXT NOT NULL,
    email            TEXT NOT NULL UNIQUE,
    ciudad           TEXT NOT NULL,
    fecha_nacimiento TEXT NOT NULL,
    genero           TEXT NOT NULL,
    plan_id          INTEGER NOT NULL REFERENCES planes(id),
    fecha_registro   TEXT NOT NULL,
    estado           TEXT NOT NULL,
    metodo_pago      TEXT NOT NULL
);

INSERT INTO usuarios VALUES (1,  'Valentina Rios',        'v.rios@gmail.com',         'Medellín',       '1995-03-14', 'F',  3, '2022-01-15', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (2,  'Sebastián Morales',     'sebas.morales@hotmail.com','Bogotá',         '1990-07-22', 'M',  2, '2022-02-03', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (3,  'Camila Torres',         'cami.torres@gmail.com',    'Cali',           '1998-11-05', 'F',  1, '2022-02-18', 'Cancelado', 'Nequi');
INSERT INTO usuarios VALUES (4,  'Andrés Gutiérrez',      'andres.g@yahoo.com',       'Barranquilla',   '1987-04-30', 'M',  4, '2022-03-07', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (5,  'Mariana Ospina',        'mariana.ospina@gmail.com', 'Bogotá',         '2000-09-19', 'F',  2, '2022-03-22', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (6,  'Felipe Herrera',        'felipe.h@gmail.com',       'Medellín',       '1993-01-08', 'M',  3, '2022-04-10', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (7,  'Laura Jiménez',         'laura.jimenez@outlook.com','Pereira',        '1996-06-25', 'F',  2, '2022-04-28', 'Pausado',   'PSE');
INSERT INTO usuarios VALUES (8,  'Diego Vargas',          'diego.vargas@gmail.com',   'Cartagena',      '1983-12-03', 'M',  1, '2022-05-14', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (9,  'Sofía Ramírez',         'sofia.ramirez@gmail.com',  'Bogotá',         '2001-02-17', 'F',  4, '2022-05-30', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (10, 'Mateo Castro',          'mateo.castro@hotmail.com', 'Manizales',      '1994-08-11', 'M',  2, '2022-06-15', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (11, 'Isabella Mendez',       'isa.mendez@gmail.com',     'Cali',           '1999-05-28', 'F',  3, '2022-07-02', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (12, 'Juan David Pérez',      'jd.perez@gmail.com',       'Bogotá',         '1991-10-16', 'M',  2, '2022-07-19', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (13, 'Sara Londoño',          'sara.londono@gmail.com',   'Medellín',       '1997-03-04', 'F',  1, '2022-08-05', 'Cancelado', 'Nequi');
INSERT INTO usuarios VALUES (14, 'Alejandro Ruiz',        'alex.ruiz@outlook.com',    'Bucaramanga',    '1988-07-21', 'M',  4, '2022-08-22', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (15, 'Natalia Gómez',         'nati.gomez@gmail.com',     'Bogotá',         '2002-01-09', 'F',  2, '2022-09-08', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (16, 'Carlos Martínez',       'carlos.m@gmail.com',       'Medellín',       '1986-11-14', 'M',  3, '2022-09-25', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (17, 'Daniela Suárez',        'dani.suarez@gmail.com',    'Cali',           '1995-04-07', 'F',  2, '2022-10-12', 'Pausado',   'Tarjeta');
INSERT INTO usuarios VALUES (18, 'Tomás Acosta',          'tomas.acosta@hotmail.com', 'Bogotá',         '1992-09-29', 'M',  1, '2022-10-29', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (19, 'Valeria Cano',          'vale.cano@gmail.com',      'Barranquilla',   '1998-06-18', 'F',  4, '2022-11-15', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (20, 'Nicolás Pardo',         'nico.pardo@gmail.com',     'Medellín',       '1990-02-26', 'M',  2, '2022-11-30', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (21, 'Luciana Álvarez',       'luci.alvarez@gmail.com',   'Bogotá',         '2003-08-13', 'F',  3, '2023-01-10', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (22, 'Esteban Córdoba',       'esteban.c@outlook.com',    'Manizales',      '1989-05-02', 'M',  2, '2023-01-27', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (23, 'Gabriela Patiño',       'gabi.patino@gmail.com',    'Cali',           '1996-12-20', 'F',  1, '2023-02-13', 'Cancelado', 'Tarjeta');
INSERT INTO usuarios VALUES (24, 'Ricardo Salcedo',       'ricar.salcedo@gmail.com',  'Bogotá',         '1984-03-08', 'M',  4, '2023-02-28', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (25, 'Andrea Restrepo',       'andrea.r@gmail.com',       'Medellín',       '1993-10-15', 'F',  2, '2023-03-17', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (26, 'Mauricio Blanco',       'mauri.blanco@hotmail.com', 'Pereira',        '1987-07-04', 'M',  3, '2023-04-03', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (27, 'Juliana Vega',          'juli.vega@gmail.com',      'Cartagena',      '2000-11-22', 'F',  2, '2023-04-20', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (28, 'Hernán Montoya',        'hernan.m@gmail.com',       'Bogotá',         '1982-06-11', 'M',  1, '2023-05-07', 'Pausado',   'Tarjeta');
INSERT INTO usuarios VALUES (29, 'Alejandra Niño',        'ale.nino@gmail.com',       'Bucaramanga',    '1997-01-30', 'F',  4, '2023-05-24', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (30, 'Samuel Bernal',         'samuel.b@outlook.com',     'Bogotá',         '1994-09-07', 'M',  2, '2023-06-10', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (31, 'Catalina Leal',         'cata.leal@gmail.com',      'Medellín',       '1999-04-24', 'F',  3, '2023-06-27', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (32, 'Óscar Fuentes',         'oscar.fuentes@gmail.com',  'Cali',           '1991-12-13', 'M',  2, '2023-07-14', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (33, 'Manuela Cardona',       'manu.cardona@gmail.com',   'Bogotá',         '2002-05-01', 'F',  1, '2023-07-31', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (34, 'Iván Quintero',         'ivan.q@hotmail.com',       'Barranquilla',   '1986-02-19', 'M',  4, '2023-08-17', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (35, 'Verónica Zapata',       'vero.zapata@gmail.com',    'Medellín',       '1995-08-06', 'F',  2, '2023-09-03', 'Cancelado', 'PSE');
INSERT INTO usuarios VALUES (36, 'Javier Escobar',        'javi.escobar@gmail.com',   'Bogotá',         '1988-11-25', 'M',  3, '2023-09-20', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (37, 'Adriana Cruz',          'adri.cruz@outlook.com',    'Cali',           '1993-07-14', 'F',  2, '2023-10-07', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (38, 'Pablo Medina',          'pablo.m@gmail.com',        'Bogotá',         '2001-03-03', 'M',  1, '2023-10-24', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (39, 'Cristina Agudelo',      'cris.agudelo@gmail.com',   'Manizales',      '1997-10-21', 'F',  4, '2023-11-10', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (40, 'Rodrigo Hoyos',         'rodri.hoyos@gmail.com',    'Medellín',       '1985-05-09', 'M',  2, '2023-11-27', 'Pausado',   'Tarjeta');
INSERT INTO usuarios VALUES (41, 'Xiomara Ortiz',         'xiomara.o@gmail.com',      'Bogotá',         '2003-02-16', 'F',  3, '2023-12-14', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (42, 'Luis Miguel Torres',    'lm.torres@hotmail.com',    'Cartagena',      '1990-09-03', 'M',  2, '2024-01-08', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (43, 'Paola Castellanos',     'paola.cas@gmail.com',      'Bogotá',         '1996-06-22', 'F',  1, '2024-01-25', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (44, 'Giovanny Ríos',         'giova.rios@gmail.com',     'Pereira',        '1983-12-11', 'M',  4, '2024-02-11', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (45, 'Tatiana Mora',          'tati.mora@outlook.com',    'Bogotá',         '1998-04-28', 'F',  2, '2024-02-28', 'Activo',    'PSE');
INSERT INTO usuarios VALUES (46, 'Ernesto Varón',         'ernes.varon@gmail.com',    'Cali',           '1992-01-17', 'M',  3, '2024-03-15', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (47, 'Melissa Arango',        'meli.arango@gmail.com',    'Medellín',       '2000-08-04', 'F',  2, '2024-04-01', 'Activo',    'Nequi');
INSERT INTO usuarios VALUES (48, 'Fabián Chaparro',       'fabian.ch@gmail.com',      'Bucaramanga',    '1989-05-23', 'M',  1, '2024-04-18', 'Cancelado', 'PSE');
INSERT INTO usuarios VALUES (49, 'Nathalie Duque',        'nath.duque@gmail.com',     'Bogotá',         '1994-11-10', 'F',  4, '2024-05-05', 'Activo',    'Tarjeta');
INSERT INTO usuarios VALUES (50, 'Santiago Mejía',        'santi.mejia@gmail.com',    'Medellín',       '2002-07-29', 'NB', 3, '2024-05-22', 'Activo',    'Nequi');

-- ============================================================
-- TABLA: generos
-- ============================================================

CREATE TABLE IF NOT EXISTS generos (
    id     INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL
);

INSERT INTO generos VALUES (1,  'Accion');
INSERT INTO generos VALUES (2,  'Comedia');
INSERT INTO generos VALUES (3,  'Drama');
INSERT INTO generos VALUES (4,  'Terror');
INSERT INTO generos VALUES (5,  'Ciencia Ficcion');
INSERT INTO generos VALUES (6,  'Documental');
INSERT INTO generos VALUES (7,  'Romance');
INSERT INTO generos VALUES (8,  'Animacion');
INSERT INTO generos VALUES (9,  'Thriller');
INSERT INTO generos VALUES (10, 'Musical');

-- ============================================================
-- TABLA: contenido
-- ============================================================

CREATE TABLE IF NOT EXISTS contenido (
    id                   INTEGER PRIMARY KEY,
    titulo               TEXT NOT NULL,
    tipo                 TEXT NOT NULL,
    genero_id            INTEGER NOT NULL REFERENCES generos(id),
    duracion_min         INTEGER,
    temporadas           INTEGER,
    anio_lanzamiento     INTEGER NOT NULL,
    pais_origen          TEXT NOT NULL,
    idioma_original      TEXT NOT NULL,
    calificacion_promedio REAL NOT NULL,
    es_original          INTEGER NOT NULL DEFAULT 0
);

-- Peliculas internacionales y latinoamericanas
INSERT INTO contenido VALUES (1,  'El Último Vuelo',             'Pelicula',    1,  118, NULL, 2021, 'Colombia',   'Español',  7.8, 1);
INSERT INTO contenido VALUES (2,  'Noche sin Regreso',           'Pelicula',    9,  104, NULL, 2020, 'Argentina',  'Español',  7.2, 0);
INSERT INTO contenido VALUES (3,  'Paraíso Perdido',             'Pelicula',    3,  132, NULL, 2022, 'Colombia',   'Español',  8.1, 1);
INSERT INTO contenido VALUES (4,  'Código Rojo',                 'Pelicula',    1,   98, NULL, 2019, 'Estados Unidos', 'Inglés', 6.9, 0);
INSERT INTO contenido VALUES (5,  'La Fiesta del Olvido',        'Pelicula',    2,   95, NULL, 2021, 'México',     'Español',  7.4, 0);
INSERT INTO contenido VALUES (6,  'Marea Alta',                  'Pelicula',    4,  101, NULL, 2023, 'Colombia',   'Español',  7.6, 1);
INSERT INTO contenido VALUES (7,  'Más Allá del Horizonte',      'Pelicula',    5,  145, NULL, 2022, 'Estados Unidos', 'Inglés', 8.3, 0);
INSERT INTO contenido VALUES (8,  'Carnaval de Sombras',         'Pelicula',    4,  108, NULL, 2020, 'México',     'Español',  6.7, 0);
INSERT INTO contenido VALUES (9,  'El Tiempo que Queda',         'Pelicula',    7,  115, NULL, 2021, 'España',     'Español',  7.9, 0);
INSERT INTO contenido VALUES (10, 'Río Profundo',                'Pelicula',    3,  127, NULL, 2023, 'Brasil',     'Portugués',8.0, 0);
INSERT INTO contenido VALUES (11, 'Gravity Falls: La Película',  'Pelicula',    8,   92, NULL, 2022, 'Estados Unidos', 'Inglés', 8.5, 0);
INSERT INTO contenido VALUES (12, 'Cumbia Eterna',               'Pelicula',    10, 105, NULL, 2022, 'Colombia',   'Español',  7.1, 1);
INSERT INTO contenido VALUES (13, 'La Sombra del Cóndor',        'Pelicula',    9,  119, NULL, 2021, 'Colombia',   'Español',  7.5, 1);
INSERT INTO contenido VALUES (14, 'Invasión Total',              'Pelicula',    5,  137, NULL, 2023, 'Corea del Sur', 'Coreano', 8.2, 0);
INSERT INTO contenido VALUES (15, 'Recuerdos del Mar',           'Pelicula',    7,  112, NULL, 2020, 'Chile',      'Español',  7.3, 0);
INSERT INTO contenido VALUES (16, 'Sinfonía Urbana',             'Pelicula',    10, 100, NULL, 2023, 'Colombia',   'Español',  6.8, 1);
INSERT INTO contenido VALUES (17, 'El Infiltrado',               'Pelicula',    9,  123, NULL, 2022, 'Francia',    'Francés',  8.0, 0);
INSERT INTO contenido VALUES (18, 'Tormentas de Arena',          'Pelicula',    1,  109, NULL, 2021, 'Marruecos',  'Árabe',    7.0, 0);

-- Series
INSERT INTO contenido VALUES (19, 'La Fiscalía',                 'Serie',       9,  NULL, 3, 2021, 'Colombia',   'Español',  8.6, 1);
INSERT INTO contenido VALUES (20, 'Barrio Norte',                'Serie',       3,  NULL, 2, 2022, 'Argentina',  'Español',  8.0, 0);
INSERT INTO contenido VALUES (21, 'Código Fuente',               'Serie',       5,  NULL, 2, 2023, 'Colombia',   'Español',  8.4, 1);
INSERT INTO contenido VALUES (22, 'Las Chicas del Valle',        'Serie',       2,  NULL, 4, 2020, 'Colombia',   'Español',  7.8, 1);
INSERT INTO contenido VALUES (23, 'Dark Signal',                 'Serie',       4,  NULL, 1, 2022, 'Alemania',   'Alemán',   8.7, 0);
INSERT INTO contenido VALUES (24, 'Bajo la Luna',                'Serie',       7,  NULL, 3, 2021, 'México',     'Español',  7.5, 0);
INSERT INTO contenido VALUES (25, 'Los Ingenieros',              'Serie',       3,  NULL, 2, 2023, 'Colombia',   'Español',  7.9, 1);
INSERT INTO contenido VALUES (26, 'Mundos Paralelos',            'Serie',       5,  NULL, 1, 2022, 'España',     'Español',  8.1, 0);
INSERT INTO contenido VALUES (27, 'Pacífico Sur',                'Serie',       1,  NULL, 2, 2023, 'Colombia',   'Español',  8.3, 1);
INSERT INTO contenido VALUES (28, 'El Clan Sinclair',            'Serie',       9,  NULL, 3, 2021, 'Reino Unido','Inglés',   8.8, 0);
INSERT INTO contenido VALUES (29, 'Ritmo y Sabor',               'Serie',       10, NULL, 2, 2022, 'Colombia',   'Español',  7.2, 1);
INSERT INTO contenido VALUES (30, 'Anomalía',                    'Serie',       5,  NULL, 1, 2023, 'Colombia',   'Español',  8.0, 1);

-- Documentales
INSERT INTO contenido VALUES (31, 'Colombia Salvaje',            'Documental',  6,   87, NULL, 2021, 'Colombia',   'Español',  8.9, 1);
INSERT INTO contenido VALUES (32, 'La Ruta del Café',            'Documental',  6,   74, NULL, 2022, 'Colombia',   'Español',  8.2, 1);
INSERT INTO contenido VALUES (33, 'Océanos: El Último Recurso',  'Documental',  6,   98, NULL, 2022, 'Francia',    'Francés',  8.5, 0);
INSERT INTO contenido VALUES (34, 'Mentes Extraordinarias',      'Documental',  6,   82, NULL, 2021, 'Estados Unidos', 'Inglés', 7.8, 0);
INSERT INTO contenido VALUES (35, 'El Sonido de los Andes',      'Documental',  6,   68, NULL, 2023, 'Colombia',   'Español',  8.0, 1);
INSERT INTO contenido VALUES (36, 'Fútbol: Sangre y Gloria',     'Documental',  6,   91, NULL, 2022, 'Brasil',     'Portugués',8.3, 0);
INSERT INTO contenido VALUES (37, 'Cuántica: El Universo Íntimo','Documental',  6,   79, NULL, 2020, 'Estados Unidos', 'Inglés', 8.1, 0);
INSERT INTO contenido VALUES (38, 'Amazonia en Llamas',          'Documental',  6,   95, NULL, 2021, 'Brasil',     'Portugués',8.7, 0);
INSERT INTO contenido VALUES (39, 'Maestros de la Cocina Latina','Documental',  6,   72, NULL, 2023, 'Colombia',   'Español',  7.6, 1);
INSERT INTO contenido VALUES (40, 'El Acuerdo',                  'Documental',  6,  105, NULL, 2022, 'Colombia',   'Español',  8.4, 1);

-- ============================================================
-- TABLA: reproducciones
-- ============================================================

CREATE TABLE IF NOT EXISTS reproducciones (
    id               INTEGER PRIMARY KEY,
    usuario_id       INTEGER NOT NULL REFERENCES usuarios(id),
    contenido_id     INTEGER NOT NULL REFERENCES contenido(id),
    fecha            TEXT NOT NULL,
    duracion_vista_min INTEGER NOT NULL,
    completado       INTEGER NOT NULL DEFAULT 0,
    dispositivo      TEXT NOT NULL,
    hora_inicio      TEXT NOT NULL
);

-- Usuario 1 (Valentina) - binge-watcher de series, prefiere Smart_TV noche
INSERT INTO reproducciones VALUES (1,   1, 19, '2024-01-05', 52, 1, 'Smart_TV',    '21:30');
INSERT INTO reproducciones VALUES (2,   1, 19, '2024-01-05', 50, 1, 'Smart_TV',    '22:30');
INSERT INTO reproducciones VALUES (3,   1, 19, '2024-01-06', 51, 1, 'Smart_TV',    '20:45');
INSERT INTO reproducciones VALUES (4,   1, 19, '2024-01-07', 49, 1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (5,   1, 21, '2024-01-20', 55, 1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (6,   1, 21, '2024-01-20', 53, 1, 'Smart_TV',    '23:00');
INSERT INTO reproducciones VALUES (7,   1,  3, '2024-02-10', 132,1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (8,   1, 31, '2024-02-18', 87, 1, 'Computador',  '11:30');

-- Usuario 2 (Sebastián) - variado, usa múltiples dispositivos
INSERT INTO reproducciones VALUES (9,   2, 28, '2023-11-10', 55, 1, 'Computador',  '09:15');
INSERT INTO reproducciones VALUES (10,  2, 28, '2023-11-11', 52, 1, 'Computador',  '09:00');
INSERT INTO reproducciones VALUES (11,  2,  4, '2023-11-15', 98, 1, 'Smart_TV',    '21:45');
INSERT INTO reproducciones VALUES (12,  2, 20, '2023-12-01', 48, 1, 'Celular',     '19:30');
INSERT INTO reproducciones VALUES (13,  2, 33, '2024-01-08', 98, 1, 'Tablet',      '16:00');
INSERT INTO reproducciones VALUES (14,  2,  7, '2024-01-22', 145,1, 'Smart_TV',    '20:30');

-- Usuario 4 (Andrés) - fan de acción y documentales, tardes
INSERT INTO reproducciones VALUES (15,  4,  1, '2023-08-03', 118,1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (16,  4, 27, '2023-08-10', 44, 1, 'Tablet',      '17:30');
INSERT INTO reproducciones VALUES (17,  4, 27, '2023-08-11', 42, 1, 'Tablet',      '17:45');
INSERT INTO reproducciones VALUES (18,  4, 36, '2023-09-02', 91, 1, 'Computador',  '10:00');
INSERT INTO reproducciones VALUES (19,  4, 38, '2023-09-15', 95, 1, 'Computador',  '11:00');
INSERT INTO reproducciones VALUES (20,  4, 14, '2023-10-01', 137,1, 'Smart_TV',    '22:00');

-- Usuario 5 (Mariana) - series colombianas, celular en trayecto mañana
INSERT INTO reproducciones VALUES (21,  5, 22, '2023-06-05', 38, 1, 'Celular',     '07:30');
INSERT INTO reproducciones VALUES (22,  5, 22, '2023-06-06', 40, 1, 'Celular',     '07:45');
INSERT INTO reproducciones VALUES (23,  5, 22, '2023-06-07', 37, 1, 'Celular',     '07:30');
INSERT INTO reproducciones VALUES (24,  5, 29, '2023-07-10', 35, 1, 'Celular',     '08:00');
INSERT INTO reproducciones VALUES (25,  5, 29, '2023-07-11', 33, 1, 'Celular',     '07:50');
INSERT INTO reproducciones VALUES (26,  5, 12, '2023-08-01', 62, 0, 'Celular',     '13:00');
INSERT INTO reproducciones VALUES (27,  5, 32, '2023-09-14', 74, 1, 'Tablet',      '15:30');

-- Usuario 6 (Felipe) - cinéfilo, películas completas tarde/noche
INSERT INTO reproducciones VALUES (28,  6,  9, '2023-05-20', 115,1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (29,  6, 10, '2023-06-04', 127,1, 'Smart_TV',    '20:30');
INSERT INTO reproducciones VALUES (30,  6, 17, '2023-07-01', 123,1, 'Smart_TV',    '21:30');
INSERT INTO reproducciones VALUES (31,  6, 15, '2023-08-12', 112,1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (32,  6,  2, '2023-09-08', 104,1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (33,  6, 13, '2023-10-15', 119,1, 'Smart_TV',    '21:15');

-- Usuario 9 (Sofía) - plan familiar, Smart_TV, series completas
INSERT INTO reproducciones VALUES (34,  9, 23, '2024-02-01', 51, 1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (35,  9, 23, '2024-02-01', 49, 1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (36,  9, 23, '2024-02-02', 52, 1, 'Smart_TV',    '21:30');
INSERT INTO reproducciones VALUES (37,  9, 23, '2024-02-02', 50, 1, 'Smart_TV',    '22:30');
INSERT INTO reproducciones VALUES (38,  9, 28, '2024-02-15', 55, 1, 'Smart_TV',    '20:45');
INSERT INTO reproducciones VALUES (39,  9, 28, '2024-02-15', 53, 1, 'Smart_TV',    '21:45');
INSERT INTO reproducciones VALUES (40,  9, 40, '2024-03-01', 105,1, 'Computador',  '14:00');

-- Usuario 10 (Mateo) - madrugador, mezcla contenido
INSERT INTO reproducciones VALUES (41, 10, 37, '2023-10-05', 79, 1, 'Tablet',      '06:30');
INSERT INTO reproducciones VALUES (42, 10, 34, '2023-10-12', 82, 1, 'Tablet',      '06:45');
INSERT INTO reproducciones VALUES (43, 10, 25, '2023-11-03', 44, 1, 'Computador',  '07:00');
INSERT INTO reproducciones VALUES (44, 10, 25, '2023-11-04', 46, 1, 'Computador',  '06:55');
INSERT INTO reproducciones VALUES (45, 10,  5, '2023-12-01', 95, 1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (46, 10, 11, '2024-01-10', 92, 1, 'Smart_TV',    '19:30');

-- Usuario 11 (Isabella) - series de drama, noche
INSERT INTO reproducciones VALUES (47, 11, 20, '2023-09-01', 50, 1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (48, 11, 20, '2023-09-02', 48, 1, 'Smart_TV',    '22:15');
INSERT INTO reproducciones VALUES (49, 11, 24, '2023-09-20', 40, 1, 'Smart_TV',    '21:30');
INSERT INTO reproducciones VALUES (50, 11, 24, '2023-09-21', 42, 1, 'Smart_TV',    '21:45');
INSERT INTO reproducciones VALUES (51, 11, 24, '2023-09-22', 39, 1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (52, 11,  9, '2023-10-10', 115,1, 'Smart_TV',    '21:00');

-- Usuario 12 (Juan David) - contenido abandonado / parcialmente visto
INSERT INTO reproducciones VALUES (53, 12,  8, '2023-07-04', 22, 0, 'Celular',     '23:00');
INSERT INTO reproducciones VALUES (54, 12, 26, '2023-07-10', 18, 0, 'Celular',     '22:45');
INSERT INTO reproducciones VALUES (55, 12, 30, '2023-08-05', 55, 1, 'Computador',  '15:00');
INSERT INTO reproducciones VALUES (56, 12, 30, '2023-08-06', 52, 1, 'Computador',  '15:30');
INSERT INTO reproducciones VALUES (57, 12, 21, '2023-09-15', 30, 0, 'Celular',     '23:30');
INSERT INTO reproducciones VALUES (58, 12,  6, '2023-10-20', 101,1, 'Smart_TV',    '21:00');

-- Usuario 14 (Alejandro) - plan familiar, toda la familia
INSERT INTO reproducciones VALUES (59, 14, 11, '2023-12-24', 92, 1, 'Smart_TV',    '18:00');
INSERT INTO reproducciones VALUES (60, 14,  5, '2023-12-25', 95, 1, 'Smart_TV',    '16:30');
INSERT INTO reproducciones VALUES (61, 14, 22, '2024-01-05', 40, 1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (62, 14, 22, '2024-01-06', 38, 1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (63, 14, 31, '2024-01-20', 87, 1, 'Computador',  '11:00');
INSERT INTO reproducciones VALUES (64, 14, 32, '2024-02-03', 74, 1, 'Tablet',      '10:30');

-- Usuario 15 (Natalia) - celular, contenido corto, mediodía
INSERT INTO reproducciones VALUES (65, 15, 39, '2024-01-15', 72, 1, 'Celular',     '12:00');
INSERT INTO reproducciones VALUES (66, 15, 35, '2024-01-22', 68, 1, 'Celular',     '12:30');
INSERT INTO reproducciones VALUES (67, 15, 29, '2024-02-01', 33, 1, 'Celular',     '12:15');
INSERT INTO reproducciones VALUES (68, 15, 29, '2024-02-02', 35, 1, 'Celular',     '12:00');
INSERT INTO reproducciones VALUES (69, 15, 16, '2024-02-10', 45, 0, 'Celular',     '13:00');

-- Usuario 16 (Carlos) - clásico usuario de tarde-noche, Smart_TV
INSERT INTO reproducciones VALUES (70, 16, 19, '2023-05-10', 52, 1, 'Smart_TV',    '22:30');
INSERT INTO reproducciones VALUES (71, 16, 19, '2023-05-11', 50, 1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (72, 16, 19, '2023-05-12', 51, 1, 'Smart_TV',    '21:45');
INSERT INTO reproducciones VALUES (73, 16,  1, '2023-06-02', 118,1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (74, 16, 27, '2023-07-15', 46, 1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (75, 16, 27, '2023-07-16', 44, 1, 'Smart_TV',    '21:15');

-- Usuario 19 (Valeria) - plan familiar, mezcla dispositivos
INSERT INTO reproducciones VALUES (76, 19, 22, '2023-06-10', 42, 1, 'Tablet',      '16:00');
INSERT INTO reproducciones VALUES (77, 19, 22, '2023-06-11', 40, 1, 'Tablet',      '16:30');
INSERT INTO reproducciones VALUES (78, 19, 12, '2023-07-04', 105,1, 'Smart_TV',    '19:00');
INSERT INTO reproducciones VALUES (79, 19, 39, '2023-08-15', 72, 1, 'Computador',  '11:00');
INSERT INTO reproducciones VALUES (80, 19, 40, '2023-09-20', 105,1, 'Smart_TV',    '21:00');

-- Usuario 20 (Nicolás) - usuario casual, fin de semana
INSERT INTO reproducciones VALUES (81, 20,  7, '2023-09-02', 145,1, 'Smart_TV',    '20:00');
INSERT INTO reproducciones VALUES (82, 20, 14, '2023-10-07', 100,0, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (83, 20, 28, '2023-11-04', 55, 1, 'Computador',  '10:00');
INSERT INTO reproducciones VALUES (84, 20, 28, '2023-11-04', 52, 1, 'Computador',  '11:00');

-- Usuario 21 (Luciana) - joven, celular y tablet, romance y animación
INSERT INTO reproducciones VALUES (85, 21, 11, '2024-01-06', 92, 1, 'Tablet',      '15:00');
INSERT INTO reproducciones VALUES (86, 21,  9, '2024-01-14', 115,1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (87, 21, 15, '2024-01-28', 90, 0, 'Celular',     '19:30');
INSERT INTO reproducciones VALUES (88, 21, 24, '2024-02-10', 42, 1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (89, 21, 24, '2024-02-11', 40, 1, 'Smart_TV',    '21:30');

-- Usuario 24 (Ricardo) - plan premium, cine de autor
INSERT INTO reproducciones VALUES (90, 24, 10, '2023-08-05', 127,1, 'Smart_TV',    '21:00');
INSERT INTO reproducciones VALUES (91, 24, 17, '2023-09-01', 123,1, 'Smart_TV',    '22:00');
INSERT INTO reproducciones VALUES (92, 24, 38, '2023-10-14', 95, 1, 'Computador',  '10:30');
INSERT INTO reproducciones VALUES (93, 24, 33, '2023-11-20', 98, 1, 'Computador',  '11:00');
INSERT INTO reproducciones VALUES (94, 24,  3, '2023-12-10', 132,1, 'Smart_TV',    '20:30');

-- Usuario 25 (Andrea) - series colombianas, Nequi, mañanas
INSERT INTO reproducciones VALUES (95,  25, 25, '2023-10-01', 44, 1, 'Celular',    '08:30');
INSERT INTO reproducciones VALUES (96,  25, 25, '2023-10-02', 46, 1, 'Celular',    '08:15');
INSERT INTO reproducciones VALUES (97,  25, 19, '2023-10-20', 52, 1, 'Celular',    '08:00');
INSERT INTO reproducciones VALUES (98,  25, 19, '2023-10-21', 50, 1, 'Celular',    '08:30');
INSERT INTO reproducciones VALUES (99,  25, 32, '2023-11-05', 74, 1, 'Tablet',     '14:00');

-- Usuario 26 (Mauricio) - aficionado a thrillers y sci-fi
INSERT INTO reproducciones VALUES (100, 26, 21, '2023-11-03', 55, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (101, 26, 21, '2023-11-04', 53, 1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (102, 26, 30, '2023-12-01', 52, 1, 'Computador', '15:00');
INSERT INTO reproducciones VALUES (103, 26, 30, '2023-12-02', 50, 1, 'Computador', '15:30');
INSERT INTO reproducciones VALUES (104, 26,  2, '2024-01-07', 104,1, 'Smart_TV',   '22:00');

-- Usuario 27 (Juliana) - romántica, usa tablet en casa
INSERT INTO reproducciones VALUES (105, 27,  9, '2023-12-01', 115,1, 'Tablet',     '20:00');
INSERT INTO reproducciones VALUES (106, 27, 15, '2023-12-15', 112,1, 'Tablet',     '21:00');
INSERT INTO reproducciones VALUES (107, 27, 24, '2024-01-10', 42, 1, 'Tablet',     '20:30');
INSERT INTO reproducciones VALUES (108, 27, 24, '2024-01-11', 40, 1, 'Tablet',     '20:45');
INSERT INTO reproducciones VALUES (109, 27, 24, '2024-01-12', 41, 1, 'Tablet',     '21:00');

-- Usuario 29 (Alejandra) - plan familiar, diverso
INSERT INTO reproducciones VALUES (110, 29, 19, '2023-09-05', 52, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (111, 29, 19, '2023-09-06', 50, 1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (112, 29, 27, '2023-10-01', 46, 1, 'Computador', '16:00');
INSERT INTO reproducciones VALUES (113, 29, 27, '2023-10-02', 44, 1, 'Computador', '16:30');
INSERT INTO reproducciones VALUES (114, 29, 31, '2023-11-10', 87, 1, 'Smart_TV',   '19:00');

-- Usuario 30 (Samuel) - uso mixto, mucho móvil
INSERT INTO reproducciones VALUES (115, 30, 26, '2023-12-02', 55, 1, 'Celular',    '22:00');
INSERT INTO reproducciones VALUES (116, 30, 26, '2023-12-03', 52, 1, 'Celular',    '22:15');
INSERT INTO reproducciones VALUES (117, 30,  6, '2024-01-03', 101,1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (118, 30, 13, '2024-01-20', 119,1, 'Smart_TV',   '22:00');

-- Usuario 31 (Catalina) - usuario activo, series premium
INSERT INTO reproducciones VALUES (119, 31, 28, '2024-01-01', 55, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (120, 31, 28, '2024-01-02', 53, 1, 'Smart_TV',   '22:30');
INSERT INTO reproducciones VALUES (121, 31, 28, '2024-01-03', 50, 1, 'Smart_TV',   '21:45');
INSERT INTO reproducciones VALUES (122, 31, 23, '2024-01-20', 51, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (123, 31, 23, '2024-01-21', 49, 1, 'Smart_TV',   '22:15');
INSERT INTO reproducciones VALUES (124, 31,  3, '2024-02-05', 132,1, 'Smart_TV',   '21:00');

-- Usuario 32 (Óscar) - usuario con contenido abandonado
INSERT INTO reproducciones VALUES (125, 32, 18, '2023-11-05', 30, 0, 'Celular',    '23:00');
INSERT INTO reproducciones VALUES (126, 32,  8, '2023-11-12', 25, 0, 'Celular',    '23:30');
INSERT INTO reproducciones VALUES (127, 32, 22, '2023-12-01', 42, 1, 'Smart_TV',   '20:00');
INSERT INTO reproducciones VALUES (128, 32, 22, '2023-12-02', 38, 1, 'Smart_TV',   '20:30');
INSERT INTO reproducciones VALUES (129, 32, 36, '2024-01-08', 91, 1, 'Computador', '10:00');

-- Usuario 33 (Manuela) - joven, animación y comedia
INSERT INTO reproducciones VALUES (130, 33, 11, '2024-02-10', 92, 1, 'Tablet',     '15:00');
INSERT INTO reproducciones VALUES (131, 33,  5, '2024-02-17', 95, 1, 'Tablet',     '16:00');
INSERT INTO reproducciones VALUES (132, 33, 16, '2024-02-24', 55, 0, 'Celular',    '13:30');

-- Usuario 34 (Iván) - plan familiar, fan de documentales
INSERT INTO reproducciones VALUES (133, 34, 31, '2024-01-12', 87, 1, 'Smart_TV',   '20:00');
INSERT INTO reproducciones VALUES (134, 34, 32, '2024-01-19', 74, 1, 'Smart_TV',   '20:30');
INSERT INTO reproducciones VALUES (135, 34, 38, '2024-01-26', 95, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (136, 34, 33, '2024-02-02', 98, 1, 'Smart_TV',   '20:45');
INSERT INTO reproducciones VALUES (137, 34, 40, '2024-02-09', 105,1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (138, 34, 37, '2024-02-16', 79, 1, 'Smart_TV',   '21:30');

-- Usuario 36 (Javier) - thriller y ciencia ficción, noche
INSERT INTO reproducciones VALUES (139, 36,  2, '2024-01-05', 104,1, 'Smart_TV',   '22:30');
INSERT INTO reproducciones VALUES (140, 36, 13, '2024-01-19', 119,1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (141, 36, 21, '2024-02-03', 55, 1, 'Computador', '21:00');
INSERT INTO reproducciones VALUES (142, 36, 21, '2024-02-04', 53, 1, 'Computador', '21:30');
INSERT INTO reproducciones VALUES (143, 36, 14, '2024-02-18', 137,1, 'Smart_TV',   '21:00');

-- Usuario 37 (Adriana) - contenido colombiano, Tarjeta
INSERT INTO reproducciones VALUES (144, 37, 19, '2024-01-08', 52, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (145, 37, 19, '2024-01-09', 50, 1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (146, 37, 22, '2024-01-22', 40, 1, 'Tablet',     '20:00');
INSERT INTO reproducciones VALUES (147, 37, 22, '2024-01-23', 38, 1, 'Tablet',     '20:15');
INSERT INTO reproducciones VALUES (148, 37, 12, '2024-02-05', 105,1, 'Smart_TV',   '20:30');

-- Usuario 39 (Cristina) - plan familiar, mezcla géneros
INSERT INTO reproducciones VALUES (149, 39, 25, '2024-01-15', 46, 1, 'Computador', '09:00');
INSERT INTO reproducciones VALUES (150, 39, 25, '2024-01-16', 44, 1, 'Computador', '09:15');
INSERT INTO reproducciones VALUES (151, 39, 35, '2024-01-29', 68, 1, 'Tablet',     '11:00');
INSERT INTO reproducciones VALUES (152, 39,  1, '2024-02-10', 118,1, 'Smart_TV',   '21:00');

-- Usuario 41 (Xiomara) - usuario joven, celular
INSERT INTO reproducciones VALUES (153, 41, 29, '2024-01-20', 35, 1, 'Celular',    '08:00');
INSERT INTO reproducciones VALUES (154, 41, 29, '2024-01-21', 33, 1, 'Celular',    '08:15');
INSERT INTO reproducciones VALUES (155, 41, 16, '2024-02-01', 100,1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (156, 41, 12, '2024-02-15', 105,1, 'Smart_TV',   '20:30');

-- Usuario 42 (Luis Miguel) - variado, Cartagena, noches calurosas
INSERT INTO reproducciones VALUES (157, 42,  4, '2024-02-01', 98, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (158, 42,  1, '2024-02-08', 118,1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (159, 42, 30, '2024-02-15', 52, 1, 'Computador', '20:00');
INSERT INTO reproducciones VALUES (160, 42, 30, '2024-02-16', 50, 1, 'Computador', '20:30');

-- Usuario 44 (Giovanny) - plan familiar, tardes libres
INSERT INTO reproducciones VALUES (161, 44, 36, '2024-02-03', 91, 1, 'Smart_TV',   '15:00');
INSERT INTO reproducciones VALUES (162, 44, 34, '2024-02-10', 82, 1, 'Tablet',     '16:00');
INSERT INTO reproducciones VALUES (163, 44, 19, '2024-02-17', 52, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (164, 44, 19, '2024-02-18', 50, 1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (165, 44, 27, '2024-03-01', 46, 1, 'Smart_TV',   '20:00');

-- Usuario 45 (Tatiana) - usuaria activa, noche con PSE
INSERT INTO reproducciones VALUES (166, 45, 20, '2024-02-05', 50, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (167, 45, 20, '2024-02-06', 48, 1, 'Smart_TV',   '22:30');
INSERT INTO reproducciones VALUES (168, 45, 24, '2024-02-20', 42, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (169, 45,  9, '2024-03-01', 115,1, 'Smart_TV',   '21:30');

-- Usuario 46 (Ernesto) - películas internacionales, plan premium
INSERT INTO reproducciones VALUES (170, 46,  7, '2024-02-09', 145,1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (171, 46, 10, '2024-02-16', 127,1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (172, 46, 17, '2024-02-23', 123,1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (173, 46, 14, '2024-03-02', 137,1, 'Smart_TV',   '20:30');

-- Usuario 47 (Melissa) - mezcla comedia y romance
INSERT INTO reproducciones VALUES (174, 47,  5, '2024-03-01', 95, 1, 'Tablet',     '20:00');
INSERT INTO reproducciones VALUES (175, 47, 15, '2024-03-05', 80, 0, 'Celular',    '21:00');
INSERT INTO reproducciones VALUES (176, 47, 29, '2024-03-08', 35, 1, 'Celular',    '08:30');

-- Usuario 49 (Nathalie) - plan familiar, series completas
INSERT INTO reproducciones VALUES (177, 49, 28, '2024-03-02', 55, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (178, 49, 28, '2024-03-03', 53, 1, 'Smart_TV',   '21:30');
INSERT INTO reproducciones VALUES (179, 49, 21, '2024-03-09', 55, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (180, 49, 21, '2024-03-10', 53, 1, 'Smart_TV',   '22:30');
INSERT INTO reproducciones VALUES (181, 49,  3, '2024-03-15', 132,1, 'Smart_TV',   '20:30');

-- Usuario 50 (Santiago) - joven, Nequi, todo en celular
INSERT INTO reproducciones VALUES (182, 50, 30, '2024-03-01', 52, 1, 'Celular',    '23:00');
INSERT INTO reproducciones VALUES (183, 50, 30, '2024-03-02', 50, 1, 'Celular',    '23:15');
INSERT INTO reproducciones VALUES (184, 50, 21, '2024-03-08', 45, 0, 'Celular',    '22:30');
INSERT INTO reproducciones VALUES (185, 50, 16, '2024-03-12', 100,1, 'Smart_TV',   '21:00');

-- Reproducciones adicionales para variedad estadística
INSERT INTO reproducciones VALUES (186,  8, 31, '2023-09-10', 87, 1, 'Smart_TV',   '20:00');
INSERT INTO reproducciones VALUES (187, 18,  6, '2023-07-15', 101,1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (188, 22, 26, '2024-01-25', 55, 1, 'Computador', '10:00');
INSERT INTO reproducciones VALUES (189, 38, 33, '2024-02-20', 98, 1, 'Tablet',     '14:30');
INSERT INTO reproducciones VALUES (190, 43, 35, '2024-03-10', 68, 1, 'Celular',    '12:00');
INSERT INTO reproducciones VALUES (191,  2,  6, '2024-02-28', 101,1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (192, 16, 21, '2024-03-05', 55, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (193, 16, 21, '2024-03-06', 53, 1, 'Smart_TV',   '22:30');
INSERT INTO reproducciones VALUES (194, 25, 21, '2024-03-10', 52, 1, 'Celular',    '08:00');
INSERT INTO reproducciones VALUES (195,  9, 19, '2024-03-12', 52, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (196,  9, 19, '2024-03-12', 50, 1, 'Smart_TV',   '22:00');
INSERT INTO reproducciones VALUES (197, 36, 30, '2024-03-15', 52, 1, 'Computador', '20:00');
INSERT INTO reproducciones VALUES (198, 41,  7, '2024-03-16', 100,0, 'Smart_TV',   '23:00');
INSERT INTO reproducciones VALUES (199, 31, 19, '2024-03-18', 52, 1, 'Smart_TV',   '21:00');
INSERT INTO reproducciones VALUES (200, 50, 27, '2024-03-19', 44, 1, 'Celular',    '22:00');

-- ============================================================
-- TABLA: suscripciones
-- ============================================================

CREATE TABLE IF NOT EXISTS suscripciones (
    id          INTEGER PRIMARY KEY,
    usuario_id  INTEGER NOT NULL REFERENCES usuarios(id),
    plan_id     INTEGER NOT NULL REFERENCES planes(id),
    fecha_inicio TEXT NOT NULL,
    fecha_fin    TEXT,
    estado       TEXT NOT NULL,
    monto_pagado REAL NOT NULL
);

-- Usuarios activos con suscripción única vigente
INSERT INTO suscripciones VALUES (1,  1,  3, '2022-01-15', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (2,  2,  2, '2022-02-03', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (3,  4,  4, '2022-03-07', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (4,  5,  2, '2022-03-22', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (5,  6,  3, '2022-04-10', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (6,  8,  1, '2022-05-14', NULL,         'Activa',    17900.00);
INSERT INTO suscripciones VALUES (7,  9,  4, '2022-05-30', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (8,  10, 2, '2022-06-15', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (9,  11, 3, '2022-07-02', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (10, 12, 2, '2022-07-19', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (11, 14, 4, '2022-08-22', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (12, 15, 2, '2022-09-08', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (13, 16, 3, '2022-09-25', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (14, 18, 1, '2022-10-29', NULL,         'Activa',    17900.00);
INSERT INTO suscripciones VALUES (15, 19, 4, '2022-11-15', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (16, 20, 2, '2022-11-30', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (17, 21, 3, '2023-01-10', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (18, 22, 2, '2023-01-27', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (19, 24, 4, '2023-02-28', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (20, 25, 2, '2023-03-17', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (21, 26, 3, '2023-04-03', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (22, 27, 2, '2023-04-20', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (23, 29, 4, '2023-05-24', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (24, 30, 2, '2023-06-10', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (25, 31, 3, '2023-06-27', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (26, 32, 2, '2023-07-14', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (27, 33, 1, '2023-07-31', NULL,         'Activa',    17900.00);
INSERT INTO suscripciones VALUES (28, 34, 4, '2023-08-17', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (29, 36, 3, '2023-09-20', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (30, 37, 2, '2023-10-07', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (31, 38, 1, '2023-10-24', NULL,         'Activa',    17900.00);
INSERT INTO suscripciones VALUES (32, 39, 4, '2023-11-10', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (33, 41, 3, '2023-12-14', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (34, 42, 2, '2024-01-08', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (35, 43, 1, '2024-01-25', NULL,         'Activa',    17900.00);
INSERT INTO suscripciones VALUES (36, 44, 4, '2024-02-11', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (37, 45, 2, '2024-02-28', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (38, 46, 3, '2024-03-15', NULL,         'Activa',    44900.00);
INSERT INTO suscripciones VALUES (39, 47, 2, '2024-04-01', NULL,         'Activa',    29900.00);
INSERT INTO suscripciones VALUES (40, 49, 4, '2024-05-05', NULL,         'Activa',    54900.00);
INSERT INTO suscripciones VALUES (41, 50, 3, '2024-05-22', NULL,         'Activa',    44900.00);

-- Usuarios que cambiaron de plan (historial)
INSERT INTO suscripciones VALUES (42,  1,  1, '2021-08-15', '2022-01-14', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (43,  6,  1, '2021-11-10', '2022-04-09', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (44,  9,  2, '2022-01-10', '2022-05-29', 'Cancelada', 29900.00);
INSERT INTO suscripciones VALUES (45, 14,  2, '2022-03-01', '2022-08-21', 'Cancelada', 29900.00);
INSERT INTO suscripciones VALUES (46, 16,  2, '2022-06-01', '2022-09-24', 'Cancelada', 29900.00);

-- Suscripciones canceladas (usuarios que se fueron)
INSERT INTO suscripciones VALUES (47,  3,  1, '2022-02-18', '2022-09-30', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (48, 13,  1, '2022-08-05', '2023-02-28', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (49, 23,  1, '2023-02-13', '2023-10-31', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (50, 35,  2, '2023-09-03', '2024-01-31', 'Cancelada', 29900.00);
INSERT INTO suscripciones VALUES (51, 48,  1, '2024-04-18', '2024-09-30', 'Cancelada', 17900.00);

-- Suscripciones pausadas
INSERT INTO suscripciones VALUES (52,  7,  2, '2022-04-28', '2023-06-30', 'Pausada',   29900.00);
INSERT INTO suscripciones VALUES (53, 17,  2, '2022-10-12', '2023-08-31', 'Pausada',   29900.00);
INSERT INTO suscripciones VALUES (54, 28,  1, '2023-05-07', '2023-12-31', 'Pausada',   17900.00);
INSERT INTO suscripciones VALUES (55, 40,  2, '2023-11-27', '2024-05-31', 'Pausada',   29900.00);

-- Upgrades recientes (plan anterior cancelado, nuevo activo)
INSERT INTO suscripciones VALUES (56, 20,  1, '2021-05-01', '2022-11-29', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (57, 25,  1, '2022-10-01', '2023-03-16', 'Cancelada', 17900.00);
INSERT INTO suscripciones VALUES (58, 39,  2, '2023-05-01', '2023-11-09', 'Cancelada', 29900.00);
INSERT INTO suscripciones VALUES (59, 31,  2, '2022-12-01', '2023-06-26', 'Cancelada', 29900.00);
INSERT INTO suscripciones VALUES (60, 46,  2, '2023-09-01', '2024-03-14', 'Cancelada', 29900.00);
