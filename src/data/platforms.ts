export interface Platform {
  slug: string;
  name: string;
  type: string;
  description: string;
  pros: string[];
  cons: string[];
  useCase: string;
  website: string;
  category: 'relacional' | 'nosql' | 'nube' | 'analitica';
}

export const platforms: Platform[] = [
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    type: 'SGBD Relacional Open Source',
    description: 'El SGBD relacional open source mas avanzado del mundo. Soporta JSON, extensiones, y cumplimiento ACID completo. Es la opcion preferida para proyectos serios.',
    pros: ['Open source y gratuito', 'Extensiones poderosas (PostGIS, TimescaleDB)', 'Soporte completo de SQL estandar', 'Excelente para datos complejos y JSON'],
    cons: ['Curva de aprendizaje en administracion', 'Consumo de memoria en instalaciones grandes'],
    useCase: 'Aplicaciones web, APIs, sistemas empresariales, datos geoespaciales.',
    website: 'https://postgresql.org',
    category: 'relacional',
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    type: 'SGBD Relacional',
    description: 'El SGBD mas popular del mundo. Simple, rapido y confiable. Usado por Facebook, Twitter y muchas aplicaciones web.',
    pros: ['Muy popular, gran comunidad', 'Facil de aprender', 'Rapido para lecturas', 'Replicacion sencilla'],
    cons: ['Menos funciones avanzadas que PostgreSQL', 'Propiedad de Oracle'],
    useCase: 'Aplicaciones web, WordPress, e-commerce, startups.',
    website: 'https://mysql.com',
    category: 'relacional',
  },
  {
    slug: 'sql-server',
    name: 'SQL Server',
    type: 'SGBD Relacional Empresarial',
    description: 'SGBD de Microsoft. Integrado con el ecosistema Azure y herramientas Microsoft. Potente para BI y reporting.',
    pros: ['Integracion con Microsoft/Azure', 'SQL Server Management Studio', 'Excelente para BI', 'Soporte empresarial'],
    cons: ['Licencias costosas', 'Principalmente Windows'],
    useCase: 'Empresas con ecosistema Microsoft, BI, reporting.',
    website: 'https://microsoft.com/sql-server',
    category: 'relacional',
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    type: 'Base de Datos NoSQL (Documentos)',
    description: 'Base de datos de documentos JSON. Flexible, sin esquema fijo. Ideal para datos semi-estructurados y prototipado rapido.',
    pros: ['Esquema flexible', 'Escalamiento horizontal', 'Consultas ricas en JSON', 'Atlas (servicio en la nube)'],
    cons: ['No tiene JOINs tradicionales', 'Consistencia eventual por defecto', 'Puede generar redundancia'],
    useCase: 'Aplicaciones moviles, IoT, catalogs de productos, prototipado rapido.',
    website: 'https://mongodb.com',
    category: 'nosql',
  },
  {
    slug: 'redis',
    name: 'Redis',
    type: 'Base de Datos en Memoria (Key-Value)',
    description: 'Almacen de datos en memoria ultra-rapido. Ideal para cache, sesiones y datos en tiempo real.',
    pros: ['Extremadamente rapido (in-memory)', 'Estructuras de datos ricas', 'Pub/Sub para tiempo real', 'Persistencia opcional'],
    cons: ['Limitado por RAM', 'No es base de datos principal', 'Consultas limitadas'],
    useCase: 'Cache, sesiones, colas de mensajes, leaderboards, tiempo real.',
    website: 'https://redis.io',
    category: 'nosql',
  },
  {
    slug: 'supabase',
    name: 'Supabase',
    type: 'Backend-as-a-Service (PostgreSQL)',
    description: 'Alternativa open source a Firebase. PostgreSQL con API REST automatica, autenticacion, storage y tiempo real incluido.',
    pros: ['PostgreSQL real bajo el capo', 'API REST automatica', 'Auth, storage y realtime incluidos', 'Dashboard visual'],
    cons: ['Limites en plan gratuito', 'Dependencia del servicio'],
    useCase: 'Startups, MVPs, aplicaciones full-stack, proyectos rapidos.',
    website: 'https://supabase.com',
    category: 'nube',
  },
  {
    slug: 'planetscale',
    name: 'PlanetScale',
    type: 'MySQL Serverless en la Nube',
    description: 'MySQL en la nube con branching de esquema (como Git para bases de datos). Escalamiento automatico y sin downtime.',
    pros: ['Branching de esquema', 'Escalamiento automatico', 'Deploy sin downtime', 'Compatible con MySQL'],
    cons: ['No soporta foreign keys a nivel motor', 'Modelo de precios puede ser caro'],
    useCase: 'SaaS, aplicaciones que necesitan escalar, equipos grandes.',
    website: 'https://planetscale.com',
    category: 'nube',
  },
  {
    slug: 'neon',
    name: 'Neon',
    type: 'PostgreSQL Serverless',
    description: 'PostgreSQL serverless con branching, autoscaling y storage separado de compute. El futuro de PostgreSQL en la nube.',
    pros: ['PostgreSQL completo', 'Branching de bases de datos', 'Scale-to-zero (ahorra costos)', 'Integracion con Vercel'],
    cons: ['Servicio relativamente nuevo', 'Cold starts posibles'],
    useCase: 'Proyectos Vercel/Next.js, desarrollo, preview environments.',
    website: 'https://neon.tech',
    category: 'nube',
  },
  {
    slug: 'bigquery',
    name: 'Google BigQuery',
    type: 'Data Warehouse en la Nube',
    description: 'Data warehouse serverless de Google. Diseñado para analisis masivos con SQL estandar sobre petabytes de datos.',
    pros: ['SQL estandar', 'Escala a petabytes', 'Serverless, sin administracion', 'Integracion con ecosistema Google'],
    cons: ['Costoso para consultas frecuentes', 'No es para OLTP', 'Latencia alta para consultas pequeñas'],
    useCase: 'Analitica de datos masivos, BI, machine learning, data science.',
    website: 'https://cloud.google.com/bigquery',
    category: 'analitica',
  },
  {
    slug: 'snowflake',
    name: 'Snowflake',
    type: 'Data Cloud Platform',
    description: 'Plataforma de datos en la nube. Separa compute de storage para escalamiento independiente. Lider en data warehousing.',
    pros: ['Separacion compute/storage', 'Multi-cloud', 'Data sharing entre organizaciones', 'Near-zero maintenance'],
    cons: ['Costoso', 'Requiere conocimiento cloud', 'No es open source'],
    useCase: 'Data warehousing empresarial, data mesh, analitica avanzada.',
    website: 'https://snowflake.com',
    category: 'analitica',
  },
];

export const platformCategories = [
  { key: 'relacional', label: 'Relacionales', color: 'var(--accent-blue)' },
  { key: 'nosql', label: 'NoSQL', color: 'var(--accent-purple)' },
  { key: 'nube', label: 'Nube / Serverless', color: 'var(--success)' },
  { key: 'analitica', label: 'Analitica / Data Warehouse', color: 'var(--warning)' },
];
