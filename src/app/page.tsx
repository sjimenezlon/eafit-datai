import Link from 'next/link';
import { syllabus } from '@/data/syllabus';

export default function Home() {
  const totalLessons = syllabus.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalExercises = syllabus.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.exercises.length, 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-16 relative">
        <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/20">
          Plataforma Interactiva de Aprendizaje
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-heading)] mb-4 tracking-tight">
          Eafit - <span className="bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] bg-clip-text text-transparent">DatAI</span>
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-8">
          Aprende SQL y Sistemas de Gestión de Bases de Datos con práctica real.
          Escribe consultas, ve resultados al instante y piensa como científico de datos.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/lecciones"
            className="px-6 py-3 bg-[var(--accent-blue)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Comenzar Lecciones
          </Link>
          <Link
            href="/laboratorio"
            className="px-6 py-3 border border-[var(--border-color)] text-[var(--text-body)] rounded-lg font-medium text-sm hover:border-[var(--accent-blue)] transition-colors"
          >
            Abrir Laboratorio SQL
          </Link>
          <Link
            href="/dialectos"
            className="px-6 py-3 border border-[var(--accent-purple)]/40 text-[var(--accent-purple)] rounded-lg font-medium text-sm hover:bg-[var(--accent-purple)]/10 transition-colors"
          >
            Comparar Dialectos
          </Link>
        </div>

        {/* Resumen integrador */}
        <div className="mt-10 max-w-3xl mx-auto">
          <Link
            href="/resumen"
            className="group block rounded-xl border border-[var(--accent-pink)]/30 bg-gradient-to-r from-[var(--accent-blue)]/10 via-[var(--accent-purple)]/10 to-[var(--accent-pink)]/10 p-5 hover:border-[var(--accent-pink)]/60 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-pink)] flex items-center justify-center text-2xl text-white">
                ★
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] font-semibold">
                    NUEVO
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    Lección integradora · 3-6h
                  </span>
                </div>
                <h3 className="text-sm md:text-base font-bold text-[var(--text-heading)] mt-1">
                  Resumen integral: todo un Sistema de Gestión de Bases de Datos
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  SQL, Entidad-Relación, normalización, índices, ACID, modelos de datos, RAG,
                  plataformas, gestión y tendencias — en una sola pieza interactiva.
                </p>
              </div>
              <div className="text-[var(--accent-pink)] group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mt-12">
          <div>
            <div className="text-2xl font-bold text-[var(--text-heading)]">{syllabus.length}</div>
            <div className="text-xs text-[var(--text-muted)]">Módulos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--text-heading)]">{totalLessons}+</div>
            <div className="text-xs text-[var(--text-muted)]">Lecciones</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--text-heading)]">{totalExercises}+</div>
            <div className="text-xs text-[var(--text-muted)]">Ejercicios</div>
          </div>
        </div>
      </section>

      {/* Terminal Preview */}
      <section className="mb-16">
        <div className="terminal-window max-w-2xl mx-auto">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="terminal-title">sql-editor</span>
          </div>
          <div className="terminal-body text-sm">
            <div className="text-[var(--text-muted)]">-- Analiza ventas del e-commerce en tu navegador</div>
            <div className="mt-1">
              <span className="text-[#ff79c6]">SELECT</span>{' '}
              <span className="text-[var(--terminal-cyan)]">c.nombre</span> <span className="text-[#ff79c6]">AS</span> categoria,
            </div>
            <div>
              {'  '}<span className="text-[var(--terminal-cyan)]">SUM</span>(dp.subtotal) <span className="text-[#ff79c6]">AS</span> ingresos
            </div>
            <div>
              <span className="text-[#ff79c6]">FROM</span>{' '}
              <span className="text-[#f1fa8c]">detalle_pedidos</span> dp
            </div>
            <div>
              <span className="text-[#ff79c6]">JOIN</span>{' '}
              <span className="text-[#f1fa8c]">productos</span> p <span className="text-[#ff79c6]">ON</span> dp.producto_id = p.id
            </div>
            <div>
              <span className="text-[#ff79c6]">JOIN</span>{' '}
              <span className="text-[#f1fa8c]">categorias</span> c <span className="text-[#ff79c6]">ON</span> p.categoria_id = c.id
            </div>
            <div>
              <span className="text-[#ff79c6]">GROUP BY</span> c.nombre{' '}
              <span className="text-[#ff79c6]">ORDER BY</span> ingresos <span className="text-[#ff79c6]">DESC</span>;
            </div>
            <div className="mt-3 text-[var(--success)] text-xs">&#x2713; 8 categorias analizadas (1.8ms)</div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-2">Módulos del Curso</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Contenido progresivo con casos comerciales reales: e-commerce, banca digital y streaming.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {syllabus.map((mod) => (
            <Link
              key={mod.id}
              href={mod.lessons.length > 0 ? `/lecciones/${mod.slug}` : '#'}
              className={`p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover block ${
                mod.lessons.length === 0 ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-2xl"
                  dangerouslySetInnerHTML={{ __html: mod.icon }}
                />
                <div>
                  <div className="text-xs text-[var(--text-muted)]">
                    Módulo {mod.order}
                  </div>
                  <h3 className="font-semibold text-[var(--text-heading)] text-sm">
                    {mod.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted)] mb-3">{mod.description}</p>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                <span>{mod.lessons.length} lecciones</span>
                <span>&middot;</span>
                <span>{mod.lessons.reduce((a, l) => a + l.exercises.length, 0)} ejercicios</span>
                {mod.lessons.length === 0 && (
                  <>
                    <span>&middot;</span>
                    <span className="text-[var(--warning)]">Próximamente</span>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--text-heading)] mb-6">
          Cómo funciona
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Aprende la teoría',
              desc: 'Cada lección explica conceptos con ejemplos claros y visuales antes de practicar.',
              icon: '&#x1F4D6;',
            },
            {
              title: 'Practica con datos reales',
              desc: 'Escribe SQL contra datasets comerciales reales: e-commerce, banca digital, streaming.',
              icon: '&#x1F4BB;',
            },
            {
              title: 'Piensa como científico de datos',
              desc: 'No solo aprendes sintaxis: aprendes a formular preguntas y analizar datos.',
              icon: '&#x1F9E0;',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <span
                className="text-3xl block mb-3"
                dangerouslySetInnerHTML={{ __html: feature.icon }}
              />
              <h3 className="font-semibold text-[var(--text-heading)] text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
        <p>Eafit - DatAI &middot; Sistemas de Gestión de Bases de Datos &middot; Universidad EAFIT</p>
        <p className="mt-1">Creado por Santiago Jiménez Londoño</p>
      </footer>
    </div>
  );
}
