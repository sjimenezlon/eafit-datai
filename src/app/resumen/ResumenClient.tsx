'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

// ==============================================================
// RESUMEN INTEGRAL — Sistemas de Gestión de Bases de Datos
// Una sola pieza, muy interactiva, pensada para 3-6 horas de estudio.
// ==============================================================

type SectionId =
  | 'intro'
  | 'sql'
  | 'er'
  | 'norm'
  | 'joins'
  | 'avanzado'
  | 'indices'
  | 'acid'
  | 'modelos'
  | 'rag'
  | 'plataformas'
  | 'espacios'
  | 'gestion'
  | 'tendencias'
  | 'quiz'
  | 'cierre';

const SECTIONS: { id: SectionId; label: string; minutes: number; icon: string }[] = [
  { id: 'intro', label: 'Introducción', minutes: 10, icon: '◎' },
  { id: 'sql', label: 'SQL desde cero', minutes: 35, icon: '⌘' },
  { id: 'er', label: 'Entidad-Relación', minutes: 25, icon: '◇' },
  { id: 'norm', label: 'Normalización', minutes: 25, icon: '▦' },
  { id: 'joins', label: 'JOINs visuales', minutes: 20, icon: '⇆' },
  { id: 'avanzado', label: 'SQL avanzado', minutes: 30, icon: 'λ' },
  { id: 'indices', label: 'Índices y planes', minutes: 25, icon: '⚡' },
  { id: 'acid', label: 'ACID y transacciones', minutes: 20, icon: '⎔' },
  { id: 'modelos', label: 'Modelos de datos', minutes: 30, icon: '⌬' },
  { id: 'rag', label: 'RAG y vectores', minutes: 30, icon: '✦' },
  { id: 'plataformas', label: 'Plataformas', minutes: 35, icon: '◉' },
  { id: 'espacios', label: 'Espacios: misma lógica', minutes: 35, icon: '▣' },
  { id: 'gestion', label: 'Gestión de proyectos', minutes: 20, icon: '⌗' },
  { id: 'tendencias', label: 'Tendencias 2026', minutes: 20, icon: '➚' },
  { id: 'quiz', label: 'Quiz final', minutes: 15, icon: '?' },
  { id: 'cierre', label: 'Cierre', minutes: 5, icon: '✓' },
];

export default function ResumenClient() {
  const [active, setActive] = useState<SectionId>('intro');
  const [completed, setCompleted] = useState<Set<SectionId>>(new Set());
  const totalMinutes = SECTIONS.reduce((acc, s) => acc + s.minutes, 0);
  const progress = Math.round((completed.size / SECTIONS.length) * 100);

  // Observer: marca la sección activa al hacer scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id as SectionId);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleDone = (id: SectionId) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Header totalMinutes={totalMinutes} progress={progress} />

      <div className="grid lg:grid-cols-[240px_1fr] gap-8 mt-8">
        <TableOfContents active={active} completed={completed} />

        <div className="space-y-20">
          <Intro onDone={() => toggleDone('intro')} done={completed.has('intro')} />
          <SQLBasico onDone={() => toggleDone('sql')} done={completed.has('sql')} />
          <EntidadRelacion onDone={() => toggleDone('er')} done={completed.has('er')} />
          <Normalizacion onDone={() => toggleDone('norm')} done={completed.has('norm')} />
          <JoinsVisuales onDone={() => toggleDone('joins')} done={completed.has('joins')} />
          <SQLAvanzado onDone={() => toggleDone('avanzado')} done={completed.has('avanzado')} />
          <Indices onDone={() => toggleDone('indices')} done={completed.has('indices')} />
          <ACID onDone={() => toggleDone('acid')} done={completed.has('acid')} />
          <ModelosDatos onDone={() => toggleDone('modelos')} done={completed.has('modelos')} />
          <RAG onDone={() => toggleDone('rag')} done={completed.has('rag')} />
          <Plataformas onDone={() => toggleDone('plataformas')} done={completed.has('plataformas')} />
          <Espacios onDone={() => toggleDone('espacios')} done={completed.has('espacios')} />
          <GestionProyectos onDone={() => toggleDone('gestion')} done={completed.has('gestion')} />
          <Tendencias onDone={() => toggleDone('tendencias')} done={completed.has('tendencias')} />
          <Quiz onDone={() => toggleDone('quiz')} done={completed.has('quiz')} />
          <Cierre onDone={() => toggleDone('cierre')} done={completed.has('cierre')} completed={completed.size} />
        </div>
      </div>
    </div>
  );
}

// ==============================================================
// HEADER + TOC
// ==============================================================

function Header({ totalMinutes, progress }: { totalMinutes: number; progress: number }) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return (
    <header className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] p-8 md:p-14">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 15% 10%, rgba(59,130,246,0.25), transparent 45%), radial-gradient(circle at 85% 90%, rgba(236,72,153,0.2), transparent 45%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.12), transparent 60%), linear-gradient(135deg, #1a1d28, #0f1117)'
      }} />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }} />

      <div className="relative">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] border border-[var(--accent-blue)]/40 backdrop-blur-sm">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent-blue)] opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--accent-blue)]" />
          </span>
          <span className="font-mono tracking-wider">LECCIÓN INTEGRADORA · AUTOGUIADA</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-heading)] mb-4 tracking-tight leading-[1.05]">
          Todo lo que es un{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] bg-clip-text text-transparent">
              Sistema de Gestión de Bases de Datos
            </span>
            <span className="absolute -inset-x-2 -inset-y-1 blur-2xl opacity-30 bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] -z-10" />
          </span>
        </h1>
        <p className="text-base md:text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">
          Un recorrido único por SQL, modelado, normalización, índices, transacciones, modelos de datos,
          RAG, plataformas modernas, gestión de proyectos y tendencias. Pensado para estudiarse de una
          sentada (3-6 horas) o por bloques.
        </p>
        <div className="flex flex-wrap gap-3 mt-8 text-xs">
          <Stat label="Duración" value={`${h}h ${m}m`} />
          <Stat label="Secciones" value={String(SECTIONS.length)} />
          <Stat label="Visuales interactivos" value="40+" />
          <Stat label="Plataformas" value="20" />
          <Stat label="Espacios" value="6" />
        </div>
        <div className="mt-7">
          <div className="flex justify-between text-xs text-[var(--text-muted)] mb-2">
            <span className="font-mono tracking-wider uppercase">Progreso del resumen</span>
            <span className="font-mono font-semibold text-[var(--text-body)]">{progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[var(--bg-tertiary)] overflow-hidden border border-[var(--border-color)]">
            <div
              className="h-full bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-purple)] to-[var(--accent-pink)] transition-all duration-700 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-2.5 rounded-lg bg-[var(--bg-tertiary)]/60 border border-[var(--border-color)] backdrop-blur-sm hover:border-[var(--accent-blue)]/50 transition-colors">
      <div className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] font-mono">{label}</div>
      <div className="text-base font-bold text-[var(--text-heading)] font-mono">{value}</div>
    </div>
  );
}

function TableOfContents({ active, completed }: { active: SectionId; completed: Set<SectionId> }) {
  return (
    <aside className="lg:sticky lg:top-20 h-fit">
      <div className="rounded-xl border border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-secondary)] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--accent-blue)] to-transparent" />
          <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-[0.2em] font-mono">
            Contenido
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-[var(--accent-blue)] to-transparent" />
        </div>
        <nav className="space-y-0.5">
          {SECTIONS.map((s, i) => {
            const isActive = active === s.id;
            const isDone = completed.has(s.id);
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--accent-blue)]/20 to-transparent text-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r bg-[var(--accent-blue)]" />
                )}
                <span className={`w-5 h-5 flex items-center justify-center rounded text-[9px] font-mono font-bold shrink-0 border ${
                  isDone ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]' :
                  isActive ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]' :
                  'border-[var(--border-color)] text-[var(--text-muted)]'
                }`}>
                  {isDone ? '✓' : i + 1}
                </span>
                <span className="truncate">{s.label}</span>
                <span className="ml-auto text-[9px] text-[var(--text-muted)] font-mono shrink-0">{s.minutes}m</span>
              </a>
            );
          })}
        </nav>
        <div className="mt-3 pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>Avance</span>
            <span className="text-[var(--text-heading)]">{completed.size}/{SECTIONS.length}</span>
          </div>
          <div className="h-1 rounded-full bg-[var(--bg-tertiary)] mt-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-pink)] transition-all" style={{ width: `${(completed.size / SECTIONS.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </aside>
  );
}

// ==============================================================
// Helpers de UI
// ==============================================================

function Section({
  id,
  title,
  subtitle,
  kicker,
  children,
  onDone,
  done,
}: {
  id: SectionId;
  title: string;
  subtitle: string;
  kicker: string;
  children: React.ReactNode;
  onDone: () => void;
  done: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[var(--border-color)] relative">
        <div className="absolute -top-px left-0 h-px w-20 bg-gradient-to-r from-[var(--accent-blue)] to-transparent" />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-8 bg-[var(--accent-blue)]" />
            <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--accent-blue)] font-mono font-semibold">{kicker}</div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--text-heading)] tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base text-[var(--text-muted)] mt-3 max-w-3xl leading-relaxed">{subtitle}</p>
        </div>
        <button
          onClick={onDone}
          className={`shrink-0 text-xs px-3 py-1.5 rounded-md border transition-all font-mono ${
            done
              ? 'bg-[var(--success)]/15 border-[var(--success)]/50 text-[var(--success)] shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]'
          }`}
        >
          {done ? '✓ Completado' : 'Marcar como leído'}
        </button>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-xl border border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-secondary)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </div>
  );
}

function CodeBlock({ code, lang = 'sql' }: { code: string; lang?: string }) {
  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="terminal-title">{lang}</span>
      </div>
      <pre className="terminal-body text-xs overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: highlight(code, lang) }} />
      </pre>
    </div>
  );
}

function highlight(code: string, lang: string) {
  if (lang !== 'sql' && lang !== 'python' && lang !== 'js') {
    return escapeHtml(code);
  }
  let html = escapeHtml(code);
  if (lang === 'sql') {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN',
      'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
      'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'AS', 'AND', 'OR', 'NOT', 'IN', 'EXISTS',
      'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'DISTINCT', 'LIMIT', 'OFFSET', 'UNION',
      'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'WITH', 'OVER', 'PARTITION BY', 'BEGIN',
      'COMMIT', 'ROLLBACK', 'SAVEPOINT', 'INDEX', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES',
      'CONSTRAINT', 'CHECK', 'UNIQUE', 'DEFAULT', 'NULL', 'NOT NULL',
    ];
    keywords.sort((a, b) => b.length - a.length);
    for (const kw of keywords) {
      const re = new RegExp(`\\b${kw.replace(/ /g, '\\s+')}\\b`, 'gi');
      html = html.replace(re, `<span style="color:#ff79c6;font-weight:600">${kw}</span>`);
    }
    // Strings
    html = html.replace(/'([^']*)'/g, `<span style="color:#f1fa8c">'$1'</span>`);
    // Numbers
    html = html.replace(/\b(\d+)\b/g, `<span style="color:#bd93f9">$1</span>`);
    // Comments
    html = html.replace(/--([^\n]*)/g, `<span style="color:#6272a4;font-style:italic">--$1</span>`);
    // Functions
    const funcs = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'COALESCE', 'NULLIF'];
    for (const f of funcs) {
      const re = new RegExp(`\\b${f}\\b`, 'g');
      html = html.replace(re, `<span style="color:#8be9fd">${f}</span>`);
    }
  } else if (lang === 'python') {
    const keywords = ['def', 'import', 'from', 'as', 'return', 'for', 'in', 'if', 'else', 'class', 'with'];
    for (const kw of keywords) {
      html = html.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:#ff79c6">${kw}</span>`);
    }
    html = html.replace(/"([^"]*)"/g, `<span style="color:#f1fa8c">"$1"</span>`);
    html = html.replace(/#([^\n]*)/g, `<span style="color:#6272a4">#$1</span>`);
  }
  return html;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function Callout({ kind, title, children }: { kind: 'tip' | 'warn' | 'info'; title: string; children: React.ReactNode }) {
  const colors = {
    tip: { bg: 'rgba(16,185,129,0.08)', bd: 'rgba(16,185,129,0.35)', tx: 'var(--success)' },
    warn: { bg: 'rgba(245,158,11,0.08)', bd: 'rgba(245,158,11,0.35)', tx: 'var(--warning)' },
    info: { bg: 'rgba(59,130,246,0.08)', bd: 'rgba(59,130,246,0.35)', tx: 'var(--accent-blue)' },
  }[kind];
  return (
    <div
      className="rounded-lg p-4 text-xs"
      style={{ background: colors.bg, border: `1px solid ${colors.bd}` }}
    >
      <div className="font-semibold mb-1" style={{ color: colors.tx }}>{title}</div>
      <div className="text-[var(--text-body)] leading-relaxed">{children}</div>
    </div>
  );
}

// ==============================================================
// S0 — INTRO
// ==============================================================

function Intro({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [ruta, setRuta] = useState<'rapida' | 'completa' | 'profunda'>('completa');
  return (
    <Section
      id="intro"
      kicker="Punto de partida"
      title="¿Para qué existen las bases de datos?"
      subtitle="Antes de una sola línea de SQL, definamos el problema que resuelven y el mapa mental que usaremos."
      onDone={onDone}
      done={done}
    >
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">El problema</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
            Cuando una organización empieza a crecer, empieza a acumular información: clientes, pedidos,
            productos, pagos, eventos, sensores, conversaciones. Si esa información vive dispersa en archivos
            de Excel, emails, PDFs y libretas, es imposible:
          </p>
          <ul className="text-xs text-[var(--text-body)] space-y-1 list-disc list-inside">
            <li>Consultarla sin errores (¿qué cliente compró cuánto el mes pasado?)</li>
            <li>Actualizarla sin perder el histórico</li>
            <li>Compartirla entre personas sin generar copias divergentes</li>
            <li>Protegerla de fallas, borrados y fraudes</li>
            <li>Escalarla a millones de registros</li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">La solución</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
            Un <strong className="text-[var(--accent-blue)]">Sistema de Gestión de Bases de Datos (SGBD)</strong>{' '}
            es el software que organiza, protege, indexa y sirve esa información. Es el órgano vital de
            casi cualquier aplicación moderna.
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
            {['Definir', 'Insertar', 'Consultar', 'Actualizar', 'Proteger', 'Escalar'].map((v) => (
              <div
                key={v}
                className="px-2 py-3 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-body)]"
              >
                {v}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-4">
          El viaje que harás en este resumen
        </h3>
        <JourneyMap />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">Elige tu ritmo</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {([
            { key: 'rapida', h: 'Pasada rápida', t: '1h 30m', d: 'Hero + intros + plataformas + tendencias. Para un vistazo ejecutivo.' },
            { key: 'completa', h: 'Lectura completa', t: '3h 30m', d: 'Todas las secciones, todos los visuales, saltando los ejercicios opcionales.' },
            { key: 'profunda', h: 'Estudio profundo', t: '5h 30m', d: 'Todo + escribir en un cuaderno el ejemplo ER propio, resolver el quiz sin ayuda, explorar cada plataforma.' },
          ] as const).map((r) => (
            <button
              key={r.key}
              onClick={() => setRuta(r.key)}
              className={`text-left p-4 rounded-lg border transition-all ${
                ruta === r.key
                  ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10'
                  : 'border-[var(--border-color)] hover:border-[var(--accent-blue)]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-[var(--text-heading)]">{r.h}</div>
                <div className="text-[10px] font-mono text-[var(--accent-purple)]">{r.t}</div>
              </div>
              <div className="text-xs text-[var(--text-muted)] leading-relaxed">{r.d}</div>
            </button>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function JourneyMap() {
  const layers = [
    { k: 'Fundamentos', items: ['SQL', 'Entidad-Relación', 'Normalización', 'JOINs'], color: '#3b82f6' },
    { k: 'Interno del motor', items: ['Índices', 'ACID', 'Planes de ejecución'], color: '#8b5cf6' },
    { k: 'Arquitectura', items: ['OLTP / OLAP', 'NoSQL', 'Lakehouse', 'Vectoriales'], color: '#ec4899' },
    { k: 'Aplicación', items: ['RAG', 'Plataformas', 'Espacios', 'Tendencias'], color: '#10b981' },
  ];
  return (
    <div className="relative">
      {/* Línea conectora */}
      <div className="hidden md:block absolute top-4 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] via-[#ec4899] to-[#10b981] opacity-40" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {layers.map((l, i) => (
          <div key={l.k} className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="relative w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${l.color}, ${l.color}88)`,
                  boxShadow: `0 0 15px ${l.color}66`,
                }}
              >
                {i + 1}
                <span className="absolute inset-0 rounded-full opacity-30 animate-pulse" style={{ background: l.color }} />
              </span>
              <span className="text-sm font-bold text-[var(--text-heading)]">{l.k}</span>
            </div>
            <div className="rounded-lg p-3 space-y-1.5" style={{ background: `${l.color}0a`, border: `1px solid ${l.color}33` }}>
              {l.items.map((it) => (
                <div key={it} className="text-xs text-[var(--text-body)] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: l.color }} />
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==============================================================
// S1 — SQL DESDE CERO
// ==============================================================

function SQLBasico({ onDone, done }: { onDone: () => void; done: boolean }) {
  return (
    <Section
      id="sql"
      kicker="Módulo 1"
      title="SQL desde cero: hablarle al motor"
      subtitle="SQL es un lenguaje declarativo: dices QUÉ quieres, el motor decide CÓMO. Aquí están las cinco familias de instrucciones que dominarás."
      onDone={onDone}
      done={done}
    >
      <SQLFamilies />
      <LiveTable />
      <SelectFlow />
      <Callout kind="tip" title="Orden lógico vs orden de escritura">
        Aunque escribimos <code>SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY</code>, el motor{' '}
        <strong>ejecuta</strong> en otro orden:{' '}
        <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</code>. Por eso un alias de
        SELECT no se puede usar en WHERE.
      </Callout>
    </Section>
  );
}

function SQLFamilies() {
  const [tab, setTab] = useState<'ddl' | 'dml' | 'dql' | 'dcl' | 'tcl'>('dql');
  const families: Record<string, { name: string; color: string; desc: string; cmds: { c: string; ex: string }[] }> = {
    ddl: {
      name: 'DDL — Definir',
      color: 'var(--accent-blue)',
      desc: 'Define la estructura: tablas, columnas, índices, vistas.',
      cmds: [
        { c: 'CREATE TABLE', ex: 'CREATE TABLE clientes (\n  id INT PRIMARY KEY,\n  nombre VARCHAR(80) NOT NULL,\n  email VARCHAR(120) UNIQUE,\n  creado_en TIMESTAMP DEFAULT NOW()\n);' },
        { c: 'ALTER TABLE', ex: 'ALTER TABLE clientes ADD COLUMN telefono VARCHAR(20);' },
        { c: 'DROP TABLE', ex: 'DROP TABLE clientes;' },
      ],
    },
    dml: {
      name: 'DML — Modificar',
      color: 'var(--accent-purple)',
      desc: 'Inserta, actualiza y borra datos dentro de las tablas.',
      cmds: [
        { c: 'INSERT', ex: "INSERT INTO clientes (id, nombre, email)\nVALUES (1, 'María Gómez', 'maria@correo.co');" },
        { c: 'UPDATE', ex: "UPDATE clientes\nSET telefono = '3001234567'\nWHERE id = 1;" },
        { c: 'DELETE', ex: 'DELETE FROM clientes WHERE id = 1;' },
      ],
    },
    dql: {
      name: 'DQL — Consultar',
      color: 'var(--success)',
      desc: 'La instrucción más usada: SELECT. El 90% del tiempo de un analista.',
      cmds: [
        { c: 'SELECT simple', ex: 'SELECT nombre, email\nFROM clientes\nWHERE creado_en >= NOW() - INTERVAL 30 DAY\nORDER BY creado_en DESC;' },
        { c: 'SELECT con agregación', ex: 'SELECT pais, COUNT(*) AS clientes\nFROM clientes\nGROUP BY pais\nORDER BY clientes DESC;' },
      ],
    },
    dcl: {
      name: 'DCL — Controlar',
      color: 'var(--warning)',
      desc: 'Otorga y revoca permisos. Cuida quién puede hacer qué.',
      cmds: [
        { c: 'GRANT', ex: 'GRANT SELECT, INSERT ON clientes TO analista;' },
        { c: 'REVOKE', ex: 'REVOKE INSERT ON clientes FROM analista;' },
      ],
    },
    tcl: {
      name: 'TCL — Transaccional',
      color: 'var(--accent-pink)',
      desc: 'Agrupa operaciones en un bloque atómico (todo o nada).',
      cmds: [
        { c: 'BEGIN / COMMIT', ex: 'BEGIN;\nUPDATE cuenta SET saldo = saldo - 100 WHERE id = 1;\nUPDATE cuenta SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT;' },
        { c: 'ROLLBACK', ex: 'BEGIN;\nDELETE FROM pedidos;\n-- ¡Oops!\nROLLBACK;' },
      ],
    },
  };
  const current = families[tab];
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[var(--text-heading)]">
          Las 5 familias de instrucciones SQL
        </h3>
        <span className="text-[10px] text-[var(--text-muted)]">Haz clic en cada pestaña</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(families).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setTab(k as 'ddl' | 'dml' | 'dql' | 'dcl' | 'tcl')}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              tab === k ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            }`}
            style={
              tab === k
                ? { background: v.color, borderColor: v.color }
                : { borderColor: 'var(--border-color)' }
            }
          >
            {v.name}
          </button>
        ))}
      </div>
      <div className="text-xs text-[var(--text-muted)] mb-3">{current.desc}</div>
      <div className="grid md:grid-cols-2 gap-3">
        {current.cmds.map((c) => (
          <div key={c.c}>
            <div className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color: current.color }}>
              {c.c}
            </div>
            <CodeBlock code={c.ex} />
          </div>
        ))}
      </div>
    </Card>
  );
}

function LiveTable() {
  const allRows = useMemo(
    () => [
      { id: 1, nombre: 'María Gómez', pais: 'Colombia', plan: 'Pro', gasto: 480000 },
      { id: 2, nombre: 'Andrés Ruiz', pais: 'México', plan: 'Free', gasto: 0 },
      { id: 3, nombre: 'Laura Vidal', pais: 'Colombia', plan: 'Team', gasto: 1200000 },
      { id: 4, nombre: 'Pedro Ariza', pais: 'Chile', plan: 'Pro', gasto: 520000 },
      { id: 5, nombre: 'Sofía Peña', pais: 'Colombia', plan: 'Pro', gasto: 760000 },
      { id: 6, nombre: 'Juan Ibarra', pais: 'México', plan: 'Team', gasto: 980000 },
      { id: 7, nombre: 'Ana Rendón', pais: 'Colombia', plan: 'Free', gasto: 0 },
      { id: 8, nombre: 'Tomás Luna', pais: 'Chile', plan: 'Pro', gasto: 650000 },
    ],
    []
  );
  const [cols, setCols] = useState<string[]>(['nombre', 'pais', 'plan', 'gasto']);
  const [paisFilter, setPaisFilter] = useState<string>('todos');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [limit, setLimit] = useState(5);

  const filtered = allRows
    .filter((r) => paisFilter === 'todos' || r.pais === paisFilter)
    .sort((a, b) => (order === 'asc' ? a.gasto - b.gasto : b.gasto - a.gasto))
    .slice(0, limit);

  const query = `SELECT ${cols.length === 4 ? '*' : cols.join(', ')}\nFROM clientes${
    paisFilter !== 'todos' ? `\nWHERE pais = '${paisFilter}'` : ''
  }\nORDER BY gasto ${order.toUpperCase()}\nLIMIT ${limit};`;

  const toggleCol = (c: string) => {
    setCols((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
        Constructor visual: arma tu primer SELECT
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Cambia los controles y mira cómo se transforma el SQL y la tabla resultante.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="space-y-3">
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                Columnas a mostrar
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['nombre', 'pais', 'plan', 'gasto'].map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleCol(c)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      cols.includes(c)
                        ? 'bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] border-[var(--accent-blue)]/50'
                        : 'border-[var(--border-color)] text-[var(--text-muted)]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                WHERE pais =
              </label>
              <select
                value={paisFilter}
                onChange={(e) => setPaisFilter(e.target.value)}
                className="mt-1 w-full text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md px-2 py-1.5 text-[var(--text-body)]"
              >
                <option value="todos">(sin filtro)</option>
                <option value="Colombia">Colombia</option>
                <option value="México">México</option>
                <option value="Chile">Chile</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  ORDER BY gasto
                </label>
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
                  className="mt-1 w-full text-xs bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md px-2 py-1.5"
                >
                  <option value="desc">DESC (mayor → menor)</option>
                  <option value="asc">ASC (menor → mayor)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                  LIMIT
                </label>
                <input
                  type="range"
                  min={1}
                  max={8}
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="w-full mt-3"
                />
                <div className="text-[10px] text-[var(--text-muted)] mt-1">{limit} filas</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <CodeBlock code={query} />
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Resultado
          </div>
          <div className="overflow-hidden rounded-lg border border-[var(--border-color)]">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[var(--bg-tertiary)]">
                  {cols.map((c) => (
                    <th key={c} className="text-left px-3 py-2 font-semibold text-[var(--text-heading)] uppercase text-[10px] tracking-wider">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : 'bg-[var(--bg-secondary)]'}>
                    {cols.map((c) => (
                      <td key={c} className="px-3 py-2 text-[var(--text-body)] font-mono">
                        {c === 'gasto'
                          ? '$' + r[c as keyof typeof r].toLocaleString('es-CO')
                          : String(r[c as keyof typeof r])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-2">
            {filtered.length} filas · ejecutado en el navegador
          </div>
        </div>
      </div>
    </Card>
  );
}

function SelectFlow() {
  const steps = [
    { k: 'FROM', d: 'El motor trae las tablas base' },
    { k: 'WHERE', d: 'Filtra fila por fila' },
    { k: 'GROUP BY', d: 'Agrupa filas con mismo valor' },
    { k: 'HAVING', d: 'Filtra grupos enteros' },
    { k: 'SELECT', d: 'Proyecta columnas, calcula expresiones' },
    { k: 'ORDER BY', d: 'Ordena el resultado' },
    { k: 'LIMIT', d: 'Recorta las primeras N filas' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
        El pipeline lógico del SELECT
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Cada fase recibe el resultado de la anterior. Entender este orden evita el 80% de los errores de
        SQL.
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        {steps.map((s, i) => (
          <div key={s.k} className="flex items-center gap-2">
            <div className="px-3 py-2 rounded-md border border-[var(--border-color)] bg-[var(--bg-tertiary)] min-w-[120px]">
              <div className="text-xs font-mono font-semibold text-[var(--accent-blue)]">{s.k}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{s.d}</div>
            </div>
            {i < steps.length - 1 && <span className="text-[var(--text-muted)]">→</span>}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ==============================================================
// S2 — ENTIDAD RELACIÓN
// ==============================================================

function EntidadRelacion({ onDone, done }: { onDone: () => void; done: boolean }) {
  return (
    <Section
      id="er"
      kicker="Módulo 2"
      title="Modelo Entidad-Relación: el plano antes del código"
      subtitle="Antes de CREATE TABLE, dibujas entidades (sustantivos), atributos (propiedades) y relaciones (verbos). Si el modelo está mal, ningún índice lo salva."
      onDone={onDone}
      done={done}
    >
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="text-xs text-[var(--accent-blue)] mb-1 font-mono">Entidad</div>
          <div className="text-sm font-semibold text-[var(--text-heading)] mb-2">Sustantivo</div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Un objeto del mundo real del que quiero guardar datos. Cada entidad se vuelve una tabla:
            Cliente, Pedido, Producto, Factura.
          </p>
        </Card>
        <Card>
          <div className="text-xs text-[var(--accent-purple)] mb-1 font-mono">Atributo</div>
          <div className="text-sm font-semibold text-[var(--text-heading)] mb-2">Propiedad</div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Cada dato de la entidad: nombre, fecha, precio. Se vuelve una columna. Uno o varios forman
            la <strong>llave primaria</strong>.
          </p>
        </Card>
        <Card>
          <div className="text-xs text-[var(--accent-pink)] mb-1 font-mono">Relación</div>
          <div className="text-sm font-semibold text-[var(--text-heading)] mb-2">Verbo</div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Cómo se conectan dos entidades: un cliente <em>hace</em> pedidos, un pedido <em>contiene</em>{' '}
            productos. Se implementa con llaves foráneas.
          </p>
        </Card>
      </div>

      <ERDiagram />
      <Cardinalidades />

      <Callout kind="info" title="Traducción ER → SQL">
        <strong>1:N</strong> → la llave foránea va en el lado "N" (muchos pedidos por cliente: pedidos.cliente_id).
        <br />
        <strong>N:M</strong> → se crea una <strong>tabla puente</strong> (detalle_pedido entre pedido y producto).
        <br />
        <strong>1:1</strong> → rara; la llave foránea suele ser también única, o se fusionan las tablas.
      </Callout>
    </Section>
  );
}

function ERDiagram() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
        Diagrama ER de un e-commerce
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Pasa el cursor sobre cada entidad o relación para ver el detalle.
      </p>
      <div className="bg-[var(--bg-secondary)] rounded-lg p-6 overflow-x-auto">
        <svg viewBox="0 0 900 380" className="w-full min-w-[700px]" style={{ maxHeight: 420 }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 Z" fill="#6b7280" />
            </marker>
          </defs>

          {/* Relaciones (líneas) */}
          <line x1="180" y1="100" x2="350" y2="100" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="265" y="90" textAnchor="middle" fontSize="11" fill="#9ca3af">hace (1:N)</text>

          <line x1="450" y1="160" x2="450" y2="240" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="510" y="205" textAnchor="middle" fontSize="11" fill="#9ca3af">contiene (N:M)</text>

          <line x1="550" y1="290" x2="720" y2="290" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="635" y="280" textAnchor="middle" fontSize="11" fill="#9ca3af">refiere a</text>

          <line x1="720" y1="260" x2="720" y2="180" stroke="#6b7280" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />
          <text x="760" y="220" fontSize="11" fill="#9ca3af">tiene</text>

          {/* Entidades */}
          <Entity x={40} y={40} w={140} h={120} name="Cliente" pk="id" attrs={['nombre', 'email', 'pais']} hover={hover} setHover={setHover} color="#3b82f6" />
          <Entity x={350} y={40} w={200} h={120} name="Pedido" pk="id" attrs={['fecha', 'total', 'cliente_id (FK)']} hover={hover} setHover={setHover} color="#8b5cf6" />
          <Entity x={350} y={240} w={200} h={120} name="DetallePedido" pk="id" attrs={['pedido_id (FK)', 'producto_id (FK)', 'cantidad', 'subtotal']} hover={hover} setHover={setHover} color="#ec4899" />
          <Entity x={720} y={240} w={160} h={120} name="Producto" pk="id" attrs={['nombre', 'precio', 'categoria_id (FK)']} hover={hover} setHover={setHover} color="#10b981" />
          <Entity x={720} y={60} w={160} h={120} name="Categoria" pk="id" attrs={['nombre', 'descripcion']} hover={hover} setHover={setHover} color="#f59e0b" />
        </svg>
      </div>
    </Card>
  );
}

function Entity({
  x, y, w, h, name, pk, attrs, hover, setHover, color,
}: {
  x: number; y: number; w: number; h: number;
  name: string; pk: string; attrs: string[];
  hover: string | null; setHover: (s: string | null) => void;
  color: string;
}) {
  const active = hover === name;
  return (
    <g
      onMouseEnter={() => setHover(name)}
      onMouseLeave={() => setHover(null)}
      style={{ cursor: 'pointer' }}
    >
      <rect x={x} y={y} width={w} height={h} rx="8"
        fill={active ? `${color}22` : '#1e2231'}
        stroke={color}
        strokeWidth={active ? 2 : 1}
      />
      <rect x={x} y={y} width={w} height="26" rx="8" fill={color} />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize="12" fontWeight="700" fill="white">
        {name}
      </text>
      <text x={x + 10} y={y + 45} fontSize="10" fill="#fbbf24" fontFamily="monospace">
        🔑 {pk}
      </text>
      {attrs.map((a, i) => (
        <text key={a} x={x + 10} y={y + 62 + i * 14} fontSize="10" fill="#e5e7eb" fontFamily="monospace">
          · {a}
        </text>
      ))}
    </g>
  );
}

function Cardinalidades() {
  const rows = [
    {
      t: '1 : 1',
      ej: 'Persona ↔ Pasaporte',
      d: 'Cada persona tiene un pasaporte; cada pasaporte pertenece a una persona.',
      sql: 'CREATE TABLE pasaporte (\n  id INT PRIMARY KEY,\n  persona_id INT UNIQUE REFERENCES persona(id),\n  numero VARCHAR(20)\n);',
    },
    {
      t: '1 : N',
      ej: 'Cliente → Pedidos',
      d: 'Un cliente tiene muchos pedidos; un pedido tiene un solo cliente.',
      sql: 'CREATE TABLE pedido (\n  id INT PRIMARY KEY,\n  cliente_id INT REFERENCES cliente(id),\n  fecha DATE, total DECIMAL\n);',
    },
    {
      t: 'N : M',
      ej: 'Estudiante ↔ Curso',
      d: 'Un estudiante toma muchos cursos; un curso tiene muchos estudiantes.',
      sql: 'CREATE TABLE matricula (\n  estudiante_id INT REFERENCES estudiante(id),\n  curso_id INT REFERENCES curso(id),\n  PRIMARY KEY (estudiante_id, curso_id)\n);',
    },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-4">
        Las tres cardinalidades que verás todos los días
      </h3>
      <div className="grid md:grid-cols-3 gap-3">
        {rows.map((r) => (
          <div key={r.t} className="rounded-lg border border-[var(--border-color)] p-3 bg-[var(--bg-tertiary)]/30">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-lg font-bold text-[var(--accent-blue)]">{r.t}</span>
              <span className="text-xs text-[var(--text-muted)]">{r.ej}</span>
            </div>
            <p className="text-xs text-[var(--text-body)] mb-3 leading-relaxed">{r.d}</p>
            <CodeBlock code={r.sql} />
          </div>
        ))}
      </div>
    </Card>
  );
}

// ==============================================================
// S3 — NORMALIZACIÓN
// ==============================================================

function Normalizacion({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      label: '0FN · Datos crudos',
      desc: 'Una tabla con listas dentro de celdas y datos repetidos. Imposible de consultar bien.',
      problems: ['Múltiples productos en una celda', 'Datos de cliente repetidos', 'Imposible filtrar por producto'],
      color: '#ef4444',
      rows: [
        { pedido: 'P-1001', cliente: 'María Gómez (maria@correo.co)', productos: 'Laptop, Mouse, Teclado', total: 4800 },
        { pedido: 'P-1002', cliente: 'Andrés Ruiz (andres@correo.co)', productos: 'Monitor', total: 1200 },
        { pedido: 'P-1003', cliente: 'María Gómez (maria@correo.co)', productos: 'Cable USB, Hub', total: 180 },
      ],
    },
    {
      label: '1FN · Atomicidad',
      desc: 'Cada celda tiene un solo valor. Eliminamos listas: una fila por producto por pedido.',
      problems: ['Datos de cliente aún repetidos', 'No sabemos cuánto cuesta cada producto por sí solo'],
      color: '#f59e0b',
      rows: [
        { pedido: 'P-1001', cliente: 'María Gómez (maria@correo.co)', producto: 'Laptop', total: 4500 },
        { pedido: 'P-1001', cliente: 'María Gómez (maria@correo.co)', producto: 'Mouse', total: 120 },
        { pedido: 'P-1001', cliente: 'María Gómez (maria@correo.co)', producto: 'Teclado', total: 180 },
        { pedido: 'P-1002', cliente: 'Andrés Ruiz (andres@correo.co)', producto: 'Monitor', total: 1200 },
      ],
    },
    {
      label: '2FN · Sin dependencias parciales',
      desc: 'Los atributos no-clave dependen de toda la llave, no de parte. Separamos productos de pedidos.',
      problems: ['Datos de cliente aún se repiten en cada fila de pedido'],
      color: '#3b82f6',
      tables: [
        { name: 'pedidos', rows: [{ id: 'P-1001', cliente: 'María G.' }, { id: 'P-1002', cliente: 'Andrés R.' }] },
        { name: 'detalle', rows: [{ pedido: 'P-1001', producto: 'Laptop', cantidad: 1 }, { pedido: 'P-1001', producto: 'Mouse', cantidad: 1 }] },
        { name: 'productos', rows: [{ id: 'Laptop', precio: 4500 }, { id: 'Mouse', precio: 120 }] },
      ],
    },
    {
      label: '3FN · Sin dependencias transitivas',
      desc: 'Ningún atributo no-clave depende de otro no-clave. El cliente (nombre, email) se mueve a su propia tabla.',
      problems: [],
      color: '#10b981',
      tables: [
        { name: 'clientes', rows: [{ id: 1, nombre: 'María Gómez', email: 'maria@correo.co' }, { id: 2, nombre: 'Andrés Ruiz', email: 'andres@correo.co' }] },
        { name: 'pedidos', rows: [{ id: 'P-1001', cliente_id: 1, fecha: '2026-04-10' }, { id: 'P-1002', cliente_id: 2, fecha: '2026-04-11' }] },
        { name: 'detalle', rows: [{ pedido_id: 'P-1001', producto_id: 'Laptop', cantidad: 1 }] },
        { name: 'productos', rows: [{ id: 'Laptop', precio: 4500 }] },
      ],
    },
  ];
  const current = steps[step];
  return (
    <Section
      id="norm"
      kicker="Módulo 3"
      title="Normalización: eliminar redundancia paso a paso"
      subtitle="Un mismo dato nunca debería vivir en dos sitios a la vez. La normalización son reglas para lograrlo sin perder información."
      onDone={onDone}
      done={done}
    >
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--text-heading)]">
            Recorre las formas normales
          </h3>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-8 h-8 rounded-md text-xs font-mono font-semibold border transition-all ${
                  step === i
                    ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                    : 'text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-body)]'
                }`}
              >
                {i}FN
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold" style={{ background: `${current.color}33`, color: current.color }}>
            {current.label}
          </span>
        </div>
        <p className="text-xs text-[var(--text-body)] leading-relaxed mb-4">{current.desc}</p>

        {current.rows && (
          <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] mb-4">
            <table className="w-full text-xs">
              <thead className="bg-[var(--bg-tertiary)]">
                <tr>
                  {Object.keys(current.rows[0]).map((k) => (
                    <th key={k} className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--text-heading)]">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.rows.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
                    {Object.values(r).map((v, j) => (
                      <td key={j} className="px-3 py-2 font-mono text-[var(--text-body)]">
                        {String(v)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {current.tables && (
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {current.tables.map((t) => (
              <div key={t.name} className="rounded-lg border border-[var(--border-color)] overflow-hidden">
                <div className="px-3 py-2 bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] text-xs font-mono font-semibold">
                  {t.name}
                </div>
                <table className="w-full text-[11px]">
                  <thead className="bg-[var(--bg-tertiary)]">
                    <tr>
                      {Object.keys(t.rows[0]).map((k) => (
                        <th key={k} className="text-left px-2 py-1 text-[var(--text-muted)] uppercase tracking-wider">
                          {k}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r, i) => (
                      <tr key={i}>
                        {Object.values(r).map((v, j) => (
                          <td key={j} className="px-2 py-1 font-mono text-[var(--text-body)]">
                            {String(v)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {current.problems.length > 0 ? (
          <Callout kind="warn" title="Problemas que aún quedan">
            <ul className="list-disc list-inside space-y-1">
              {current.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Callout>
        ) : (
          <Callout kind="tip" title="Modelo saludable">
            Llegaste a 3FN: sin redundancia, sin anomalías de actualización. Para el 90% de los casos
            transaccionales, esto es suficiente.
          </Callout>
        )}
      </Card>

      <Callout kind="info" title="Más allá de 3FN">
        Existen BCFN, 4FN y 5FN. Son raras en la práctica. En cambio, en entornos analíticos es común{' '}
        <strong>desnormalizar</strong> (star schema, tablas anchas) para acelerar queries de lectura.
      </Callout>
    </Section>
  );
}

// ==============================================================
// S4 — JOINs visuales
// ==============================================================

function JoinsVisuales({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [kind, setKind] = useState<'inner' | 'left' | 'right' | 'full' | 'cross'>('inner');
  const types = {
    inner: {
      name: 'INNER JOIN',
      d: 'Solo filas que hacen match en ambas tablas.',
      sql: 'SELECT c.nombre, p.total\nFROM clientes c\nINNER JOIN pedidos p ON p.cliente_id = c.id;',
    },
    left: {
      name: 'LEFT JOIN',
      d: 'Todas las filas de la izquierda, con NULL si no hay match a la derecha.',
      sql: 'SELECT c.nombre, p.total\nFROM clientes c\nLEFT JOIN pedidos p ON p.cliente_id = c.id;',
    },
    right: {
      name: 'RIGHT JOIN',
      d: 'Todas las filas de la derecha, con NULL si no hay match a la izquierda.',
      sql: 'SELECT c.nombre, p.total\nFROM clientes c\nRIGHT JOIN pedidos p ON p.cliente_id = c.id;',
    },
    full: {
      name: 'FULL OUTER JOIN',
      d: 'Todas las filas de ambos lados; NULL donde no haya match.',
      sql: 'SELECT c.nombre, p.total\nFROM clientes c\nFULL JOIN pedidos p ON p.cliente_id = c.id;',
    },
    cross: {
      name: 'CROSS JOIN',
      d: 'Producto cartesiano: cada fila izquierda con cada fila derecha. Úsalo con cuidado.',
      sql: 'SELECT c.nombre, p.dia\nFROM clientes c\nCROSS JOIN dias p;',
    },
  };
  return (
    <Section
      id="joins"
      kicker="Módulo 4"
      title="JOINs, visto con diagramas de Venn"
      subtitle="Un JOIN combina filas de dos tablas por una condición. La diferencia entre los 5 tipos es qué pasa con las filas que no encuentran pareja."
      onDone={onDone}
      done={done}
    >
      <Card>
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(types) as Array<keyof typeof types>).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
                kind === k
                  ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                  : 'text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-body)]'
              }`}
            >
              {types[k].name}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <VennDiagram kind={kind} />
            <p className="text-xs text-[var(--text-body)] mt-3 leading-relaxed">{types[kind].d}</p>
          </div>
          <div>
            <CodeBlock code={types[kind].sql} />
            <JoinResultTable kind={kind} />
          </div>
        </div>
      </Card>

      <Callout kind="tip" title="Regla práctica">
        Si vienes de SQL y estás seguro de que debería haber datos pero no los ves, empieza cambiando el
        INNER por LEFT. Muchas veces el "match" falla por NULL o por un tipo de dato distinto.
      </Callout>
    </Section>
  );
}

function VennDiagram({ kind }: { kind: 'inner' | 'left' | 'right' | 'full' | 'cross' }) {
  const highlight = {
    inner: { left: false, right: false, inter: true },
    left: { left: true, right: false, inter: true },
    right: { left: false, right: true, inter: true },
    full: { left: true, right: true, inter: true },
    cross: { left: true, right: true, inter: true },
  }[kind];
  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg p-4 flex justify-center">
      <svg viewBox="0 0 300 180" className="w-full" style={{ maxHeight: 200 }}>
        <defs>
          <mask id="leftOnly">
            <rect width="300" height="180" fill="black" />
            <circle cx="115" cy="90" r="70" fill="white" />
            <circle cx="185" cy="90" r="70" fill="black" />
          </mask>
          <mask id="rightOnly">
            <rect width="300" height="180" fill="black" />
            <circle cx="185" cy="90" r="70" fill="white" />
            <circle cx="115" cy="90" r="70" fill="black" />
          </mask>
          <mask id="intersection">
            <rect width="300" height="180" fill="black" />
            <circle cx="115" cy="90" r="70" fill="white" />
            <circle cx="185" cy="90" r="70" fill="white" />
          </mask>
        </defs>

        {highlight.left && (
          <rect width="300" height="180" fill="#3b82f6" mask="url(#leftOnly)" opacity="0.7" />
        )}
        {highlight.right && (
          <rect width="300" height="180" fill="#8b5cf6" mask="url(#rightOnly)" opacity="0.7" />
        )}
        {highlight.inter && (
          <rect width="300" height="180" fill="#ec4899" mask="url(#intersection)" opacity="0.9" />
        )}

        <circle cx="115" cy="90" r="70" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="185" cy="90" r="70" fill="none" stroke="#8b5cf6" strokeWidth="2" />

        <text x="80" y="94" fill="white" fontSize="12" fontWeight="700" textAnchor="middle">A</text>
        <text x="220" y="94" fill="white" fontSize="12" fontWeight="700" textAnchor="middle">B</text>
      </svg>
    </div>
  );
}

function JoinResultTable({ kind }: { kind: 'inner' | 'left' | 'right' | 'full' | 'cross' }) {
  const data = {
    inner: [
      { cliente: 'María', total: 4800 },
      { cliente: 'Andrés', total: 1200 },
    ],
    left: [
      { cliente: 'María', total: 4800 },
      { cliente: 'Andrés', total: 1200 },
      { cliente: 'Laura', total: null },
    ],
    right: [
      { cliente: 'María', total: 4800 },
      { cliente: 'Andrés', total: 1200 },
      { cliente: null, total: 999 },
    ],
    full: [
      { cliente: 'María', total: 4800 },
      { cliente: 'Andrés', total: 1200 },
      { cliente: 'Laura', total: null },
      { cliente: null, total: 999 },
    ],
    cross: [
      { cliente: 'María', total: 4800 },
      { cliente: 'María', total: 1200 },
      { cliente: 'Andrés', total: 4800 },
      { cliente: 'Andrés', total: 1200 },
      { cliente: 'Laura', total: 4800 },
      { cliente: 'Laura', total: 1200 },
    ],
  }[kind];
  return (
    <div className="mt-3 rounded-lg border border-[var(--border-color)] overflow-hidden">
      <div className="px-3 py-1.5 bg-[var(--bg-tertiary)] text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
        Resultado
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th className="text-left px-3 py-1.5 text-[10px] text-[var(--text-muted)]">cliente</th>
            <th className="text-left px-3 py-1.5 text-[10px] text-[var(--text-muted)]">total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
              <td className="px-3 py-1.5 font-mono text-[var(--text-body)]">
                {r.cliente ?? <span className="text-[var(--warning)] italic">NULL</span>}
              </td>
              <td className="px-3 py-1.5 font-mono text-[var(--text-body)]">
                {r.total ?? <span className="text-[var(--warning)] italic">NULL</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ==============================================================
// S5 — SQL Avanzado: Subconsultas, CTEs, Window Functions
// ==============================================================

function SQLAvanzado({ onDone, done }: { onDone: () => void; done: boolean }) {
  return (
    <Section
      id="avanzado"
      kicker="Módulo 5"
      title="SQL avanzado: las tres armas del analista"
      subtitle="Con subconsultas, CTEs y window functions puedes expresar preguntas que antes necesitaban código externo. Es la diferencia entre un analista y un ingeniero de datos."
      onDone={onDone}
      done={done}
    >
      <Subqueries />
      <CTEs />
      <WindowFunctions />

      <Callout kind="tip" title="Cuándo usar cada una">
        <strong>Subconsulta</strong>: filtrar por un valor derivado de otra tabla.
        <br />
        <strong>CTE</strong>: partir una consulta larga en pasos con nombre (y permitir recursión).
        <br />
        <strong>Window function</strong>: calcular rankings, promedios móviles, diferencias con la fila
        anterior — sin perder el detalle.
      </Callout>
    </Section>
  );
}

function Subqueries() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">Subconsultas</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Una consulta dentro de otra. Se ejecuta primero y alimenta la externa.
      </p>
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-blue)] mb-1">Escalar (un valor)</div>
          <CodeBlock code={"SELECT nombre, precio\nFROM productos\nWHERE precio > (\n  SELECT AVG(precio)\n  FROM productos\n);"} />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-blue)] mb-1">De lista (IN / EXISTS)</div>
          <CodeBlock code={"SELECT nombre\nFROM clientes\nWHERE id IN (\n  SELECT cliente_id\n  FROM pedidos\n  WHERE total > 5000000\n);"} />
        </div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-blue)] mb-1">Correlacionada</div>
          <CodeBlock code={"SELECT p.nombre, p.precio\nFROM productos p\nWHERE p.precio > (\n  SELECT AVG(p2.precio)\n  FROM productos p2\n  WHERE p2.categoria_id = p.categoria_id\n);"} />
        </div>
      </div>
    </Card>
  );
}

function CTEs() {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">CTEs (Common Table Expressions)</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Tablas temporales con nombre que viven solo dentro de la consulta. Hacen SQL legible y permiten
        recursión.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">CTE simple</div>
          <CodeBlock code={"WITH ventas_mes AS (\n  SELECT cliente_id, SUM(total) AS total_mes\n  FROM pedidos\n  WHERE fecha >= '2026-04-01'\n  GROUP BY cliente_id\n)\nSELECT c.nombre, v.total_mes\nFROM clientes c\nJOIN ventas_mes v ON v.cliente_id = c.id\nORDER BY v.total_mes DESC\nLIMIT 10;"} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">CTE recursivo (jerarquía)</div>
          <CodeBlock code={"WITH RECURSIVE jerarquia AS (\n  SELECT id, nombre, jefe_id, 1 AS nivel\n  FROM empleados\n  WHERE jefe_id IS NULL\n  UNION ALL\n  SELECT e.id, e.nombre, e.jefe_id, j.nivel + 1\n  FROM empleados e\n  JOIN jerarquia j ON e.jefe_id = j.id\n)\nSELECT * FROM jerarquia\nORDER BY nivel, nombre;"} />
        </div>
      </div>
    </Card>
  );
}

function WindowFunctions() {
  const rows = [
    { empleado: 'María', region: 'Norte', ventas: 4800, rank: 1, total_region: 6000, diff: 2000 },
    { empleado: 'Pedro', region: 'Norte', ventas: 1200, rank: 2, total_region: 6000, diff: -1200 },
    { empleado: 'Laura', region: 'Sur', ventas: 5200, rank: 1, total_region: 8400, diff: 2100 },
    { empleado: 'Ana', region: 'Sur', ventas: 3200, rank: 2, total_region: 8400, diff: -400 },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">Window functions</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Calculan algo <strong>sin colapsar filas</strong>. Cada fila ve un "vecindario" (la ventana) y
        calcula ranking, acumulado, diferencia con la anterior, etc.
      </p>
      <CodeBlock code={"SELECT\n  empleado, region, ventas,\n  RANK() OVER (PARTITION BY region ORDER BY ventas DESC) AS rank,\n  SUM(ventas) OVER (PARTITION BY region) AS total_region,\n  ventas - AVG(ventas) OVER (PARTITION BY region) AS diff\nFROM ventas_q1;"} />
      <div className="mt-4 overflow-x-auto rounded-lg border border-[var(--border-color)]">
        <table className="w-full text-xs">
          <thead className="bg-[var(--bg-tertiary)]">
            <tr>
              {['empleado', 'region', 'ventas', 'rank', 'total_region', 'diff'].map((h) => (
                <th key={h} className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--text-heading)]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
                <td className="px-3 py-2 text-[var(--text-body)]">{r.empleado}</td>
                <td className="px-3 py-2 text-[var(--text-body)]">{r.region}</td>
                <td className="px-3 py-2 font-mono text-[var(--text-body)]">{r.ventas}</td>
                <td className="px-3 py-2 font-mono text-[var(--accent-purple)]">{r.rank}</td>
                <td className="px-3 py-2 font-mono text-[var(--accent-blue)]">{r.total_region}</td>
                <td className={`px-3 py-2 font-mono ${r.diff >= 0 ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                  {r.diff > 0 ? '+' : ''}{r.diff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ==============================================================
// S6 — ÍNDICES
// ==============================================================

function Indices({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [conIndice, setConIndice] = useState(false);
  const filasEscaneadas = conIndice ? 1 : 1000000;
  const tiempo = conIndice ? 2 : 1800;
  return (
    <Section
      id="indices"
      kicker="Módulo 6"
      title="Índices: por qué tu consulta es lenta (o no)"
      subtitle="Un índice es una copia ordenada de una o más columnas, guardada en una estructura que permite búsquedas logarítmicas (B-tree). Sin índices, el motor escanea toda la tabla."
      onDone={onDone}
      done={done}
    >
      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
          Simulador: mismo query, con y sin índice
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Tabla con 1 millón de pedidos. Consulta: "dame los pedidos del cliente 7".
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setConIndice(false)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              !conIndice ? 'bg-[var(--error)]/20 border-[var(--error)] text-[var(--error)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            Sin índice
          </button>
          <button
            onClick={() => setConIndice(true)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              conIndice ? 'bg-[var(--success)]/20 border-[var(--success)] text-[var(--success)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            Con índice en cliente_id
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeBlock code={
              conIndice
                ? "-- 1. Crear índice\nCREATE INDEX idx_pedidos_cliente\n  ON pedidos(cliente_id);\n\n-- 2. La misma consulta\nSELECT * FROM pedidos\nWHERE cliente_id = 7;\n\n-- Plan:\n-- Index Seek on idx_pedidos_cliente"
                : "-- Sin índice\nSELECT * FROM pedidos\nWHERE cliente_id = 7;\n\n-- Plan:\n-- Seq Scan (lee TODA la tabla)"
            } />
          </div>
          <div>
            <div className="space-y-3">
              <BarMetric label="Filas escaneadas" value={filasEscaneadas} max={1000000} color={conIndice ? '#10b981' : '#ef4444'} unit="filas" />
              <BarMetric label="Tiempo" value={tiempo} max={1800} color={conIndice ? '#10b981' : '#ef4444'} unit="ms" />
              <BarMetric label="Bloques leídos" value={conIndice ? 4 : 15000} max={15000} color={conIndice ? '#10b981' : '#ef4444'} unit="blocks" />
            </div>
            <div className="mt-4 text-xs text-[var(--text-muted)]">
              {conIndice
                ? 'El motor salta directo al cliente 7. Con un B-tree de 1M filas, eso son ~20 comparaciones.'
                : 'El motor lee cada una de las 1M filas para comprobar si cliente_id = 7.'}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">Tipos de índices</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { n: 'B-tree', d: 'Default. Bueno para igualdad, rango, ORDER BY, LIKE \'texto%\'.', c: '#3b82f6' },
            { n: 'Hash', d: 'Solo igualdad, extremadamente rápido pero sin rangos.', c: '#8b5cf6' },
            { n: 'GIN / GiST', d: 'Para arrays, JSON, texto completo, datos geoespaciales.', c: '#ec4899' },
            { n: 'HNSW (vector)', d: 'Para búsqueda por similitud en embeddings. pgvector, Pinecone.', c: '#10b981' },
          ].map((t) => (
            <div key={t.n} className="rounded-lg border p-3" style={{ borderColor: `${t.c}55` }}>
              <div className="text-xs font-mono font-semibold mb-1" style={{ color: t.c }}>{t.n}</div>
              <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{t.d}</div>
            </div>
          ))}
        </div>
      </Card>

      <Callout kind="warn" title="El índice no es gratis">
        Cada índice acelera las lecturas pero ralentiza las escrituras (INSERT/UPDATE/DELETE), ocupa
        espacio y debe mantenerse. Regla práctica: indexa columnas que aparecen en WHERE, JOIN y ORDER
        BY de consultas frecuentes. No indexes columnas con poca cardinalidad (sexo, estado).
      </Callout>
    </Section>
  );
}

function BarMetric({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit: string }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-[var(--text-muted)]">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>
          {value.toLocaleString()} {unit}
        </span>
      </div>
      <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ==============================================================
// S7 — ACID
// ==============================================================

function ACID({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [run, setRun] = useState(false);
  const [sinTx, setSinTx] = useState(true);

  return (
    <Section
      id="acid"
      kicker="Módulo 7"
      title="Transacciones y ACID: el pacto del SGBD contigo"
      subtitle="Una transacción es un bloque de instrucciones que viaja como un todo. Los motores relacionales garantizan cuatro propiedades que impiden que tu dinero desaparezca."
      onDone={onDone}
      done={done}
    >
      <div className="grid md:grid-cols-4 gap-3">
        {[
          { l: 'A', n: 'Atomicidad', d: 'Todo o nada. Si una operación falla, el grupo entero se deshace.', c: '#3b82f6' },
          { l: 'C', n: 'Consistencia', d: 'La BD pasa de un estado válido a otro válido (respeta reglas y restricciones).', c: '#8b5cf6' },
          { l: 'I', n: 'Aislamiento', d: 'Dos transacciones concurrentes no deberían ensuciarse mutuamente.', c: '#ec4899' },
          { l: 'D', n: 'Durabilidad', d: 'Una vez confirmado (COMMIT), los datos sobreviven a fallos de energía.', c: '#10b981' },
        ].map((x) => (
          <Card key={x.l} className="text-center">
            <div
              className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center text-xl font-bold"
              style={{ background: `${x.c}22`, color: x.c, border: `1px solid ${x.c}55` }}
            >
              {x.l}
            </div>
            <div className="text-xs font-semibold text-[var(--text-heading)] mb-1">{x.n}</div>
            <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{x.d}</div>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
          Simulador: transferencia bancaria
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Juan le envía $100 a María. Si la segunda operación falla a medio camino, ¿qué pasa?
        </p>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSinTx(true)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              sinTx ? 'bg-[var(--error)]/20 border-[var(--error)] text-[var(--error)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            Sin transacción
          </button>
          <button
            onClick={() => setSinTx(false)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              !sinTx ? 'bg-[var(--success)]/20 border-[var(--success)] text-[var(--success)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            Con transacción (BEGIN / COMMIT)
          </button>
          <button
            onClick={() => setRun((r) => !r)}
            className="ml-auto text-xs px-3 py-1.5 rounded-md border border-[var(--accent-blue)] text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/10"
          >
            {run ? '↺ Reset' : '▶ Simular fallo'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <CodeBlock code={
              sinTx
                ? "-- Sin transacción\nUPDATE cuentas\n  SET saldo = saldo - 100\n  WHERE id = 'juan';\n\n-- ✗ Sistema falla aquí\n\nUPDATE cuentas\n  SET saldo = saldo + 100\n  WHERE id = 'maria';"
                : "-- Con transacción\nBEGIN;\n  UPDATE cuentas\n    SET saldo = saldo - 100\n    WHERE id = 'juan';\n\n  -- ✗ Sistema falla aquí\n\n  UPDATE cuentas\n    SET saldo = saldo + 100\n    WHERE id = 'maria';\nCOMMIT;"
            } />
          </div>
          <div className="space-y-3">
            <AccountState name="Juan" before={500} after={run ? 400 : 500} ok={!sinTx || !run} />
            <AccountState name="María" before={200} after={run && !sinTx ? 200 : (run && sinTx ? 200 : 200)} ok />
            <div className={`text-xs p-3 rounded-lg border ${
              !run ? 'border-[var(--border-color)] bg-[var(--bg-tertiary)]' :
              sinTx ? 'border-[var(--error)]/40 bg-[var(--error)]/10 text-[var(--error)]' :
              'border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]'
            }`}>
              {!run && 'Estado inicial: Juan 500, María 200.'}
              {run && sinTx && '⚠ $100 desaparecieron del sistema. Juan perdió su dinero, María no lo recibió.'}
              {run && !sinTx && '✓ ROLLBACK automático. Los saldos vuelven al estado original. El sistema es consistente.'}
            </div>
          </div>
        </div>
      </Card>

      <IsolationLevels />
    </Section>
  );
}

function AccountState({ name, before, after, ok }: { name: string; before: number; after: number; ok: boolean }) {
  const delta = after - before;
  return (
    <div className="rounded-lg border border-[var(--border-color)] p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold text-[var(--text-heading)]">
        {name[0]}
      </div>
      <div className="flex-1">
        <div className="text-xs text-[var(--text-heading)] font-semibold">{name}</div>
        <div className="text-[10px] text-[var(--text-muted)]">Saldo actual</div>
      </div>
      <div className="text-right">
        <div className={`text-sm font-mono font-semibold ${ok ? 'text-[var(--text-heading)]' : 'text-[var(--error)]'}`}>
          ${after}
        </div>
        {delta !== 0 && (
          <div className={`text-[10px] font-mono ${delta < 0 ? 'text-[var(--error)]' : 'text-[var(--success)]'}`}>
            {delta > 0 ? '+' : ''}{delta}
          </div>
        )}
      </div>
    </div>
  );
}

function IsolationLevels() {
  const levels = [
    { n: 'READ UNCOMMITTED', d: 'Ve cambios no confirmados de otras tx. Puede haber dirty reads.', risk: 'Alto' },
    { n: 'READ COMMITTED', d: 'Solo ve cambios ya confirmados. Default en PostgreSQL y Oracle.', risk: 'Medio' },
    { n: 'REPEATABLE READ', d: 'Lee los mismos datos dentro de una tx aunque otra haga UPDATE.', risk: 'Bajo' },
    { n: 'SERIALIZABLE', d: 'Como si las tx se ejecutaran una tras otra. Máxima garantía, más lento.', risk: 'Muy bajo' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
        Niveles de aislamiento (la "I" de ACID en detalle)
      </h3>
      <div className="grid md:grid-cols-4 gap-2">
        {levels.map((l, i) => (
          <div key={l.n} className="rounded-lg border border-[var(--border-color)] p-3">
            <div className="text-[10px] text-[var(--text-muted)] mb-1">Nivel {i + 1}</div>
            <div className="text-xs font-mono font-semibold text-[var(--accent-blue)] mb-2">{l.n}</div>
            <div className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2">{l.d}</div>
            <div className="text-[10px]">
              Riesgo de anomalía: <span className="text-[var(--warning)]">{l.risk}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ==============================================================
// S8 — MODELOS DE DATOS
// ==============================================================

function ModelosDatos({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [model, setModel] = useState<'relacional' | 'documento' | 'columnar' | 'grafo' | 'clave' | 'vector' | 'serie'>('relacional');
  const models = {
    relacional: {
      name: 'Relacional',
      ej: 'PostgreSQL, MySQL, Oracle',
      d: 'Datos en tablas con esquema fijo, relaciones con llaves foráneas, SQL.',
      uso: 'Transaccional (OLTP): e-commerce, banca, ERP.',
      viz: (
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {['clientes', 'pedidos'].map((t) => (
            <div key={t} className="rounded border border-[var(--accent-blue)]/40 overflow-hidden">
              <div className="bg-[var(--accent-blue)]/20 px-2 py-1 text-[var(--accent-blue)] font-mono">{t}</div>
              <table className="w-full">
                <tbody>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className={i % 2 ? 'bg-[var(--bg-tertiary)]/30' : ''}>
                      <td className="px-2 py-1 font-mono text-[var(--text-body)]">{i + 1}</td>
                      <td className="px-2 py-1 font-mono text-[var(--text-muted)]">lorem</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ),
    },
    documento: {
      name: 'Documento (NoSQL)',
      ej: 'MongoDB, Firestore, CouchDB',
      d: 'Datos como documentos JSON/BSON anidados, sin esquema fijo.',
      uso: 'Catálogos, contenidos dinámicos, prototipos ágiles.',
      viz: (
        <div className="text-[10px] font-mono bg-[var(--bg-tertiary)] rounded p-2 text-[var(--text-body)]">
          <div className="text-[var(--accent-purple)]">{'{'}</div>
          <div className="pl-3">&quot;_id&quot;: <span className="text-[var(--success)]">&quot;abc123&quot;</span>,</div>
          <div className="pl-3">&quot;cliente&quot;: <span className="text-[var(--success)]">&quot;María&quot;</span>,</div>
          <div className="pl-3">&quot;items&quot;: [</div>
          <div className="pl-6">{'{'} &quot;p&quot;: &quot;Laptop&quot;, &quot;q&quot;: <span className="text-[var(--accent-blue)]">1</span> {'}'},</div>
          <div className="pl-6">{'{'} &quot;p&quot;: &quot;Mouse&quot;, &quot;q&quot;: <span className="text-[var(--accent-blue)]">2</span> {'}'}</div>
          <div className="pl-3">]</div>
          <div className="text-[var(--accent-purple)]">{'}'}</div>
        </div>
      ),
    },
    columnar: {
      name: 'Columnar (OLAP)',
      ej: 'Snowflake, BigQuery, Redshift, Databricks',
      d: 'Datos almacenados por columna, optimizado para agregaciones sobre millones de filas.',
      uso: 'Analítica, BI, data warehousing, reportes.',
      viz: (
        <div className="space-y-1 text-[10px] font-mono">
          {['fecha', 'producto', 'cantidad', 'total'].map((c, i) => {
            const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
            return (
              <div key={c} className="flex items-center gap-1">
                <div className="w-16 text-[var(--text-muted)]">{c}</div>
                <div className="flex-1 flex gap-[1px]">
                  {Array.from({ length: 18 }).map((_, j) => (
                    <div key={j} className="h-4 flex-1 rounded-sm" style={{ background: colors[i] + '88' }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    grafo: {
      name: 'Grafo',
      ej: 'Neo4j, Neptune, Memgraph',
      d: 'Nodos y aristas. Ideal para datos altamente conectados: redes sociales, fraude, recomendación.',
      uso: 'Detección de fraude, redes de contactos, conocimiento.',
      viz: (
        <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: 140 }}>
          <line x1="30" y1="60" x2="90" y2="30" stroke="#6b7280" />
          <line x1="30" y1="60" x2="90" y2="90" stroke="#6b7280" />
          <line x1="90" y1="30" x2="160" y2="60" stroke="#6b7280" />
          <line x1="90" y1="90" x2="160" y2="60" stroke="#6b7280" />
          <circle cx="30" cy="60" r="16" fill="#3b82f6" />
          <circle cx="90" cy="30" r="16" fill="#8b5cf6" />
          <circle cx="90" cy="90" r="16" fill="#ec4899" />
          <circle cx="160" cy="60" r="16" fill="#10b981" />
          <text x="30" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">A</text>
          <text x="90" y="34" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">B</text>
          <text x="90" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">C</text>
          <text x="160" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">D</text>
        </svg>
      ),
    },
    clave: {
      name: 'Clave-Valor',
      ej: 'Redis, DynamoDB, Memcached',
      d: 'Acceso ultra rápido por llave. Sin esquema, sin joins. Normalmente en memoria.',
      uso: 'Cache, sesiones, contadores, colas.',
      viz: (
        <div className="space-y-1 text-[10px] font-mono">
          {[
            ['user:123:session', 'tok_a3x9…'],
            ['cart:456', '[{p:7,q:2}]'],
            ['rate:api:789', '42'],
            ['leaderboard', 'zset:…'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 p-1 rounded bg-[var(--bg-tertiary)]/40">
              <span className="text-[var(--accent-blue)]">{k}</span>
              <span className="text-[var(--text-muted)]">=</span>
              <span className="text-[var(--success)] truncate">{v}</span>
            </div>
          ))}
        </div>
      ),
    },
    vector: {
      name: 'Vectorial',
      ej: 'pgvector, Pinecone, Weaviate, Qdrant',
      d: 'Guarda vectores de N dimensiones (embeddings) y busca por similitud (distancia coseno).',
      uso: 'Búsqueda semántica, RAG, recomendación por similitud.',
      viz: (
        <div className="text-[10px] font-mono bg-[var(--bg-tertiary)] rounded p-2">
          <div className="text-[var(--text-muted)]">// &quot;pizza margherita&quot; →</div>
          <div className="text-[var(--accent-blue)] break-all">
            [0.21, -0.45, 0.88, 0.12, -0.67, …]
          </div>
          <div className="text-[var(--text-muted)] mt-1">// &quot;pizza napolitana&quot; → dist 0.03</div>
          <div className="text-[var(--text-muted)]">// &quot;ensalada césar&quot; → dist 0.78</div>
        </div>
      ),
    },
    serie: {
      name: 'Series de tiempo',
      ej: 'TimescaleDB, InfluxDB, Prometheus',
      d: 'Optimizado para eventos indexados por tiempo: sensores, métricas, logs.',
      uso: 'IoT, observabilidad, monitoreo financiero.',
      viz: (
        <svg viewBox="0 0 200 80" className="w-full" style={{ maxHeight: 100 }}>
          <polyline
            points="0,60 15,55 30,48 45,52 60,40 75,30 90,35 105,25 120,32 135,20 150,28 165,18 180,24 195,10"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          <line x1="0" y1="70" x2="200" y2="70" stroke="#374151" />
        </svg>
      ),
    },
  };

  const current = models[model];

  return (
    <Section
      id="modelos"
      kicker="Módulo 8"
      title="Modelos de datos: no todo es una tabla"
      subtitle="Los datos tienen formas distintas. Escoger el modelo correcto es escoger qué tipo de preguntas vas a poder responder barato."
      onDone={onDone}
      done={done}
    >
      <OLTPvsOLAP />

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-4">
          Selector de modelos
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(models) as Array<keyof typeof models>).map((k) => (
            <button
              key={k}
              onClick={() => setModel(k)}
              className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
                model === k
                  ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                  : 'text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-body)]'
              }`}
            >
              {models[k].name}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
              Cómo se ven los datos
            </div>
            <div className="rounded-lg border border-[var(--border-color)] p-3 bg-[var(--bg-secondary)]">
              {current.viz}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-heading)] mb-1">{current.name}</h4>
            <div className="text-[10px] font-mono text-[var(--accent-purple)] mb-3">{current.ej}</div>
            <p className="text-xs text-[var(--text-body)] mb-3 leading-relaxed">{current.d}</p>
            <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">Se usa para</div>
            <div className="text-xs text-[var(--text-body)]">{current.uso}</div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

function OLTPvsOLAP() {
  const rows = [
    ['Propósito', 'Operar el negocio día a día', 'Analizar el negocio'],
    ['Usuarios', 'Aplicación, miles concurrentes', 'Analistas, BI, data scientists'],
    ['Operaciones', 'INSERT / UPDATE / SELECT simples', 'SELECT agregados sobre millones'],
    ['Latencia', 'ms', 'Segundos a minutos'],
    ['Almacenamiento', 'Por fila (row-store)', 'Por columna (column-store)'],
    ['Normalización', '3FN (sin redundancia)', 'Star schema (desnormalizado)'],
    ['Ejemplos', 'PostgreSQL, MySQL, Oracle', 'Snowflake, BigQuery, Databricks'],
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
        OLTP vs OLAP: las dos caras de toda arquitectura de datos
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        OLTP opera el negocio. OLAP lo analiza. Suelen vivir en motores distintos y conectarse por un
        pipeline de ETL/ELT.
      </p>
      <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--bg-tertiary)]">
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--text-muted)]"></th>
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--accent-blue)]">OLTP</th>
              <th className="text-left px-3 py-2 text-[10px] uppercase tracking-wider text-[var(--accent-purple)]">OLAP</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
                <td className="px-3 py-2 font-semibold text-[var(--text-heading)] text-[11px]">{r[0]}</td>
                <td className="px-3 py-2 text-[var(--text-body)] text-[11px]">{r[1]}</td>
                <td className="px-3 py-2 text-[var(--text-body)] text-[11px]">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

// ==============================================================
// S9 — RAG
// ==============================================================

function RAG({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [step, setStep] = useState(0);
  const [pregunta, setPregunta] = useState('¿Cuál es la política de devoluciones?');

  const docs = [
    { id: 1, texto: 'La política de devoluciones permite retornos dentro de 30 días con recibo.', sim: 0.92 },
    { id: 2, texto: 'Los horarios de atención son de lunes a viernes de 9 a 18.', sim: 0.21 },
    { id: 3, texto: 'Para devoluciones, contacte servicio al cliente en el chat.', sim: 0.81 },
    { id: 4, texto: 'Los productos se despachan en 3 días hábiles a nivel nacional.', sim: 0.18 },
  ];

  return (
    <Section
      id="rag"
      kicker="Módulo 9"
      title="RAG: cuando la base de datos se casa con la IA"
      subtitle="Retrieval-Augmented Generation es la técnica que permite que un LLM responda con los datos de tu organización sin haber sido entrenado con ellos. La base de datos vectorial es el corazón."
      onDone={onDone}
      done={done}
    >
      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
          El pipeline de RAG, paso a paso
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          El usuario pregunta en lenguaje natural. El sistema busca los documentos más relevantes en una
          base vectorial y se los entrega al LLM para que redacte la respuesta.
        </p>

        <div className="grid md:grid-cols-5 gap-2 mb-6">
          {['Pregunta', 'Embedding', 'Búsqueda vectorial', 'Contexto', 'LLM responde'].map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`text-left p-3 rounded-lg border transition-all ${
                step >= i ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10' : 'border-[var(--border-color)]'
              }`}
            >
              <div className="text-[10px] text-[var(--text-muted)]">Paso {i + 1}</div>
              <div className="text-xs font-semibold text-[var(--text-heading)]">{s}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
              Pregunta del usuario
            </label>
            <input
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              className="mt-1 w-full text-sm bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-md px-3 py-2 text-[var(--text-body)]"
            />
          </div>

          {step >= 1 && (
            <div className="rounded-lg border border-[var(--accent-purple)]/40 bg-[var(--accent-purple)]/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[var(--accent-purple)] mb-2">
                Paso 2 · Convertir pregunta a vector (embedding)
              </div>
              <div className="text-[11px] font-mono text-[var(--text-body)] break-all">
                [0.12, -0.88, 0.45, 0.23, -0.77, 0.91, -0.34, ... ] <span className="text-[var(--text-muted)]">(1536 dims)</span>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-2">
                Modelo de embeddings (ej: text-embedding-3-small, all-MiniLM, etc.) convierte texto en
                un vector de N dimensiones que representa el "significado".
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="rounded-lg border border-[var(--accent-blue)]/40 bg-[var(--accent-blue)]/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[var(--accent-blue)] mb-2">
                Paso 3 · Buscar los k documentos más similares en la BD vectorial
              </div>
              <CodeBlock code={"-- Con pgvector (PostgreSQL)\nSELECT id, texto,\n  1 - (embedding <=> $1) AS similitud\nFROM documentos\nORDER BY embedding <=> $1\nLIMIT 3;"} />
              <div className="mt-3 space-y-1">
                {docs
                  .sort((a, b) => b.sim - a.sim)
                  .map((d) => (
                    <div key={d.id} className="flex items-center gap-2 text-[11px]">
                      <div className="w-8 text-right font-mono text-[var(--text-muted)]">{d.id}</div>
                      <div className="flex-1 truncate text-[var(--text-body)]">{d.texto}</div>
                      <div className="w-12 text-right font-mono" style={{ color: d.sim > 0.5 ? '#10b981' : '#6b7280' }}>
                        {d.sim.toFixed(2)}
                      </div>
                      <div className="w-20 h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${d.sim * 100}%`,
                            background: d.sim > 0.5 ? '#10b981' : '#6b7280',
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="rounded-lg border border-[var(--accent-pink)]/40 bg-[var(--accent-pink)]/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[var(--accent-pink)] mb-2">
                Paso 4 · Construir el prompt con el contexto recuperado
              </div>
              <div className="text-[11px] font-mono bg-[var(--bg-tertiary)] rounded p-2 leading-relaxed">
                <div className="text-[var(--accent-purple)]">SYSTEM:</div>
                <div className="text-[var(--text-body)]">Responde usando SOLO el contexto.</div>
                <div className="text-[var(--accent-purple)] mt-2">CONTEXTO:</div>
                <div className="text-[var(--text-body)]">
                  [1] La política de devoluciones permite retornos dentro de 30 días con recibo.
                  <br />
                  [2] Para devoluciones, contacte servicio al cliente en el chat.
                </div>
                <div className="text-[var(--accent-purple)] mt-2">PREGUNTA:</div>
                <div className="text-[var(--text-body)]">{pregunta}</div>
              </div>
            </div>
          )}

          {step >= 4 && (
            <div className="rounded-lg border border-[var(--success)]/40 bg-[var(--success)]/10 p-3">
              <div className="text-[10px] uppercase tracking-wider text-[var(--success)] mb-2">
                Paso 5 · Respuesta del LLM (con citas)
              </div>
              <div className="text-sm text-[var(--text-body)] leading-relaxed">
                Puedes devolver productos dentro de los <strong>30 días</strong> posteriores a la compra,
                siempre que tengas el recibo [1]. Para iniciar el proceso, contacta a servicio al
                cliente a través del chat [2].
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-color)] text-[var(--text-muted)]"
              disabled={step === 0}
            >
              ← Anterior
            </button>
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="text-xs px-3 py-1.5 rounded-md bg-[var(--accent-blue)] text-white"
              disabled={step === 4}
            >
              Siguiente →
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
          Embeddings: del texto al vector
        </h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Un embedding es una forma de "colocar" un texto en un espacio de N dimensiones donde frases
          parecidas quedan cerca.
        </p>
        <EmbeddingSpace />
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
          Cuatro opciones para montar una BD vectorial
        </h3>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { n: 'pgvector', d: 'Extensión de PostgreSQL. Tu BD de siempre + vectores. Ideal para empezar.', c: '#3b82f6' },
            { n: 'Pinecone', d: 'Servicio managed puro vectorial. Latencia baja, escala automática.', c: '#8b5cf6' },
            { n: 'Weaviate', d: 'Open source con esquema, híbrido (vectorial + keyword). GraphQL.', c: '#ec4899' },
            { n: 'Qdrant', d: 'Open source en Rust, rápido, con filtros ricos y self-host.', c: '#10b981' },
          ].map((x) => (
            <div key={x.n} className="rounded-lg border p-3" style={{ borderColor: `${x.c}55` }}>
              <div className="text-xs font-semibold mb-1" style={{ color: x.c }}>{x.n}</div>
              <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{x.d}</div>
            </div>
          ))}
        </div>
      </Card>

      <Callout kind="info" title="Por qué RAG y no solo fine-tuning">
        RAG es más barato (no reentrenas el modelo), más fresco (los datos se actualizan instantáneamente),
        más auditable (sabes qué documentos usó) y te deja controlar los permisos fila a fila. Fine-tuning
        es complementario, no sustituto.
      </Callout>
    </Section>
  );
}

function EmbeddingSpace() {
  const points = [
    { t: 'pizza margherita', x: 80, y: 70, c: '#ef4444' },
    { t: 'pizza napolitana', x: 90, y: 85, c: '#ef4444' },
    { t: 'pasta carbonara', x: 120, y: 95, c: '#ef4444' },
    { t: 'ensalada césar', x: 180, y: 60, c: '#10b981' },
    { t: 'ensalada griega', x: 200, y: 75, c: '#10b981' },
    { t: 'jugo de naranja', x: 280, y: 150, c: '#3b82f6' },
    { t: 'agua mineral', x: 310, y: 140, c: '#3b82f6' },
    { t: 'vino tinto', x: 340, y: 165, c: '#3b82f6' },
  ];
  return (
    <div className="bg-[var(--bg-secondary)] rounded-lg p-3">
      <svg viewBox="0 0 400 220" className="w-full" style={{ maxHeight: 260 }}>
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2d3748" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="220" fill="url(#grid)" />

        {/* Clusters */}
        <ellipse cx="95" cy="85" rx="50" ry="30" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeOpacity="0.3" strokeDasharray="4 4" />
        <ellipse cx="190" cy="68" rx="35" ry="22" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.3" strokeDasharray="4 4" />
        <ellipse cx="310" cy="150" rx="45" ry="25" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeOpacity="0.3" strokeDasharray="4 4" />

        {points.map((p) => (
          <g key={p.t}>
            <circle cx={p.x} cy={p.y} r="5" fill={p.c} />
            <text x={p.x + 8} y={p.y + 3} fontSize="9" fill="#e5e7eb">{p.t}</text>
          </g>
        ))}

        <text x="50" y="30" fontSize="10" fill="#ef4444" fontWeight="600">Comida caliente</text>
        <text x="170" y="30" fontSize="10" fill="#10b981" fontWeight="600">Ensaladas</text>
        <text x="270" y="195" fontSize="10" fill="#3b82f6" fontWeight="600">Bebidas</text>
      </svg>
      <div className="text-[10px] text-[var(--text-muted)] mt-2">
        Representación simplificada en 2D. En realidad son 768-3072 dimensiones. Frases similares
        quedan cerca; el motor usa distancia coseno o euclídea para buscar.
      </div>
    </div>
  );
}

// ==============================================================
// S10 — PLATAFORMAS con "previews"
// ==============================================================

function Plataformas({ onDone, done }: { onDone: () => void; done: boolean }) {
  const [cat, setCat] = useState<'todas' | 'relacional' | 'analitica' | 'nube' | 'nosql' | 'vector' | 'edge'>('todas');

  const platforms = [
    { slug: 'postgres', name: 'PostgreSQL', cat: 'relacional', color: '#336791', tagline: 'El relacional open source más completo', note: 'Base de Supabase, Neon, AlloyDB. Soporte ACID + JSON + pgvector.' },
    { slug: 'mysql', name: 'MySQL', cat: 'relacional', color: '#4479A1', tagline: 'El más popular por volumen', note: 'WordPress, Airbnb, Uber. Fácil y rápido para lecturas.' },
    { slug: 'oracle', name: 'Oracle Database', cat: 'relacional', color: '#F80000', tagline: '#1 en enterprise', note: 'Banca, telco, ERP. 23ai: vectores + JSON duality.' },
    { slug: 'sqlserver', name: 'SQL Server', cat: 'relacional', color: '#CC2927', tagline: 'El estándar Microsoft', note: 'T-SQL, Power BI, Azure. Fuerte en banca y gobierno.' },

    { slug: 'snowflake', name: 'Snowflake', cat: 'analitica', color: '#29B5E8', tagline: 'Data Cloud multi-cloud', note: 'Compute y storage separados. Cortex AI integrado.' },
    { slug: 'databricks', name: 'Databricks', cat: 'analitica', color: '#FF3621', tagline: 'Lakehouse abierto', note: 'Delta Lake + Spark + MLflow. Adquirió Neon.' },
    { slug: 'bigquery', name: 'BigQuery', cat: 'analitica', color: '#669DF6', tagline: 'Serverless warehouse de Google', note: '1TB gratis/mes. BigQuery ML. Gemini integrado.' },
    { slug: 'redshift', name: 'Amazon Redshift', cat: 'analitica', color: '#8C4FFF', tagline: 'Warehouse de AWS', note: 'Zero-ETL desde Aurora. Spectrum consulta S3.' },

    { slug: 'supabase', name: 'Supabase', cat: 'nube', color: '#3ECF8E', tagline: 'Alternativa open source a Firebase', note: 'PostgreSQL real + Auth + Storage + Realtime.' },
    { slug: 'neon', name: 'Neon', cat: 'nube', color: '#00E699', tagline: 'PostgreSQL serverless', note: 'Scale-to-zero y branching tipo Git. Ahora Databricks.' },
    { slug: 'planetscale', name: 'PlanetScale', cat: 'nube', color: '#f0f0ea', tagline: 'MySQL escalable con Vitess', note: 'Schema branching, zero-downtime migrations.' },
    { slug: 'cockroach', name: 'CockroachDB', cat: 'nube', color: '#6933FF', tagline: 'SQL distribuido global', note: 'Sobrevive caídas de regiones. Compatible PostgreSQL wire.' },

    { slug: 'mongodb', name: 'MongoDB Atlas', cat: 'nosql', color: '#00ED64', tagline: 'La BD de documentos más popular', note: 'Atlas Vector Search. Esquema flexible.' },
    { slug: 'redis', name: 'Redis', cat: 'nosql', color: '#DC382D', tagline: 'Almacén en memoria', note: 'Cache, sessions, streams. Fork: Valkey.' },
    { slug: 'dynamo', name: 'DynamoDB', cat: 'nosql', color: '#4053D6', tagline: 'Clave-valor de AWS', note: 'Latencia sub-ms a cualquier escala.' },

    { slug: 'pgvector', name: 'pgvector', cat: 'vector', color: '#0092DB', tagline: 'Vectores dentro de PostgreSQL', note: 'Extensión open source. HNSW. Ideal para empezar RAG.' },
    { slug: 'pinecone', name: 'Pinecone', cat: 'vector', color: '#000000', tagline: 'Managed vector DB', note: 'Enfoque puro IA. Serverless con pay-per-use.' },
    { slug: 'weaviate', name: 'Weaviate', cat: 'vector', color: '#17A3B8', tagline: 'Open source híbrida', note: 'Vectorial + keyword + GraphQL.' },
    { slug: 'qdrant', name: 'Qdrant', cat: 'vector', color: '#DC244C', tagline: 'Vectorial en Rust', note: 'Filtros ricos, self-host fácil, performance.' },

    { slug: 'turso', name: 'Turso', cat: 'edge', color: '#4FF8D2', tagline: 'SQLite en el edge', note: 'libSQL. Embedded replicas locales, 30+ regiones.' },
    { slug: 'd1', name: 'Cloudflare D1', cat: 'edge', color: '#F6821F', tagline: 'SQLite en Workers', note: 'Integración profunda con Cloudflare Workers.' },
  ];

  const cats = [
    { k: 'todas', l: 'Todas' },
    { k: 'relacional', l: 'Relacionales' },
    { k: 'analitica', l: 'Analítica / Lakehouse' },
    { k: 'nube', l: 'Nube / Serverless' },
    { k: 'nosql', l: 'NoSQL' },
    { k: 'vector', l: 'Vectoriales' },
    { k: 'edge', l: 'Edge' },
  ];

  const filtered = platforms.filter((p) => cat === 'todas' || p.cat === cat);

  return (
    <Section
      id="plataformas"
      kicker="Módulo 10"
      title="Plataformas: el panorama que vas a vivir"
      subtitle="Un recorrido visual por 20 plataformas reales. Cada una con su preview de interfaz y su 'para qué'."
      onDone={onDone}
      done={done}
    >
      <Card>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c.k}
              onClick={() => setCat(c.k as 'todas' | 'relacional' | 'analitica' | 'nube' | 'nosql' | 'vector' | 'edge')}
              className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
                cat === c.k
                  ? 'bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]'
                  : 'text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-body)]'
              }`}
            >
              {c.l}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PlatformCard key={p.slug} p={p} />
        ))}
      </div>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
          Cómo elegir: árbol de decisión rápido
        </h3>
        <DecisionTree />
      </Card>
    </Section>
  );
}

function PlatformCard({ p }: { p: { slug: string; name: string; cat: string; color: string; tagline: string; note: string } }) {
  const isHighlight = p.slug === 'postgres' || p.slug === 'mongodb';
  return (
    <div
      className="relative rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderColor: isHighlight ? `${p.color}66` : 'var(--border-color)',
        background: 'var(--bg-card)',
        boxShadow: isHighlight ? `0 8px 24px ${p.color}22, 0 0 0 1px ${p.color}22` : '0 4px 16px rgba(0,0,0,0.15)',
      }}
    >
      {isHighlight && (
        <div className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wider" style={{ background: p.color }}>
          Destacado
        </div>
      )}
      <PlatformPreview slug={p.slug} color={p.color} name={p.name} />
      <div className="p-4 relative">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.color}66, transparent)` }} />
        <div className="flex items-baseline justify-between mb-1.5">
          <div className="text-sm font-bold text-[var(--text-heading)]">{p.name}</div>
          <div className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ color: p.color, background: `${p.color}15` }}>
            {p.cat}
          </div>
        </div>
        <div className="text-xs text-[var(--text-muted)] mb-2 italic">{p.tagline}</div>
        <div className="text-[11px] text-[var(--text-body)] leading-relaxed">{p.note}</div>
      </div>
    </div>
  );
}

function PlatformPreview({ slug, color, name }: { slug: string; color: string; name: string }) {
  // Mini mocks de UI distintivos de cada plataforma
  if (slug === 'postgres') {
    return (
      <div className="h-36 p-3 flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #336791 0%, #1e3f5c 100%)' }}>
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, white, transparent 70%)' }} />
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
              <path d="M20.9 11.1c-.5-1.5-1.6-2.4-3-2.4-.7 0-1.4.2-2 .5.1-1 .1-2-.1-2.9-.4-1.6-1.4-2.8-2.7-3.3-1.3-.5-2.8-.3-4 .6-1.2.8-2 2.2-2.2 3.7-.1.9-.1 1.8 0 2.6-.3-.2-.7-.3-1.1-.4-1.5-.1-2.8.7-3.5 2-.6 1.3-.4 2.8.5 4 .9 1.2 2.3 1.7 3.6 1.5z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">PostgreSQL</div>
            <div className="text-[9px] text-white/60 font-mono">v17.2 · ACID · MVCC</div>
          </div>
        </div>
        <div className="font-mono text-[9px] text-white/90 leading-snug bg-black/25 rounded p-1.5 mt-auto">
          <div><span className="text-[#8be9fd]">SELECT</span> nombre, total</div>
          <div><span className="text-[#8be9fd]">FROM</span> pedidos p</div>
          <div><span className="text-[#8be9fd]">JOIN</span> clientes c <span className="text-[#8be9fd]">ON</span> ...</div>
          <div className="text-[#50fa7b]">↳ 1,248 rows · 42 ms</div>
        </div>
      </div>
    );
  }
  if (slug === 'pgvector') {
    return (
      <div className="h-36 p-3 flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #336791 0%, #0092DB 100%)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[11px] font-bold text-white">pgvector</div>
          <div className="text-[9px] text-white/70 font-mono">ext · PG 17</div>
        </div>
        <div className="font-mono text-[9px] text-white/90 bg-black/25 rounded p-1.5">
          <div><span className="text-[#ff79c6]">CREATE INDEX</span> ON items</div>
          <div className="pl-2"><span className="text-[#ff79c6]">USING</span> hnsw (emb vector_cosine_ops);</div>
          <div className="mt-1"><span className="text-[#ff79c6]">SELECT</span> * <span className="text-[#ff79c6]">FROM</span> items</div>
          <div className="pl-2"><span className="text-[#ff79c6]">ORDER BY</span> emb &lt;=&gt; $1 <span className="text-[#ff79c6]">LIMIT</span> 5;</div>
        </div>
        <div className="mt-auto flex items-end gap-0.5 h-5">
          {[40, 70, 30, 85, 50, 65, 45, 75, 35, 90, 55].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-white/40" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'mysql') {
    return (
      <div className="h-32 p-3 flex flex-col justify-between bg-gradient-to-br from-[#4479A1] to-[#00758F]">
        <div className="text-[10px] font-mono text-white/90">mysql&gt;</div>
        <div className="font-mono text-[10px] text-white/90">
          SHOW TABLES;<br />
          +-----------+<br />
          | pedidos   |<br />
          | clientes  |<br />
          +-----------+
        </div>
      </div>
    );
  }
  if (slug === 'oracle') {
    return (
      <div className="h-32 p-3 flex flex-col justify-center items-center bg-gradient-to-br from-[#F80000] to-[#A00000]">
        <div className="text-xl font-bold text-white tracking-widest">ORACLE</div>
        <div className="text-[10px] text-white/80 mt-1">Database 23ai</div>
      </div>
    );
  }
  if (slug === 'sqlserver') {
    return (
      <div className="h-32 p-3 flex flex-col justify-between bg-gradient-to-br from-[#CC2927] to-[#A02020]">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/40" />
          <div className="w-2 h-2 bg-white/60" />
          <div className="w-2 h-2 bg-white/80" />
        </div>
        <div>
          <div className="text-[10px] text-white/80 font-mono">SSMS · Query</div>
          <div className="font-mono text-[10px] text-white">
            SELECT TOP 10 * FROM<br />dbo.Orders ORDER BY ...
          </div>
        </div>
      </div>
    );
  }
  if (slug === 'snowflake') {
    return (
      <div className="h-32 p-3 flex flex-col bg-gradient-to-br from-[#29B5E8] to-[#005F93]">
        <div className="flex items-center gap-2 mb-2">
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M10 2L12 6L16 6L13 9L14 13L10 11L6 13L7 9L4 6L8 6Z" fill="white"/></svg>
          <div className="text-xs font-semibold text-white">Snowflake</div>
        </div>
        <div className="text-[10px] text-white/80 mb-1">Warehouses · COMPUTE_WH</div>
        <div className="flex gap-1 items-end h-10">
          {[40, 60, 45, 80, 55, 70, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-white/40" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'databricks') {
    return (
      <div className="h-32 p-3 flex flex-col bg-gradient-to-br from-[#FF3621] to-[#A82010]">
        <div className="text-xs font-semibold text-white mb-1">Databricks</div>
        <div className="text-[10px] text-white/80 mb-2">Lakehouse · main.default</div>
        <div className="space-y-1">
          {['bronze.raw_events', 'silver.clean_users', 'gold.ltv_model'].map((t) => (
            <div key={t} className="text-[10px] font-mono text-white/90 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white" />
              {t}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (slug === 'bigquery') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#4285F4] via-[#669DF6] to-[#34A853]">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            <div className="w-1.5 h-3 bg-[#4285F4] rounded-sm" />
            <div className="w-1.5 h-3 bg-[#EA4335] rounded-sm" />
            <div className="w-1.5 h-3 bg-[#FBBC04] rounded-sm" />
            <div className="w-1.5 h-3 bg-[#34A853] rounded-sm" />
          </div>
          <div className="text-xs font-semibold text-white">BigQuery</div>
        </div>
        <div className="bg-white/15 rounded p-2 font-mono text-[9px] text-white">
          #standardSQL<br />
          SELECT country,<br />
          &nbsp;&nbsp;COUNT(*) as users<br />
          FROM `ds.events`
        </div>
      </div>
    );
  }
  if (slug === 'redshift') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#8C4FFF] to-[#4B2A95]">
        <div className="text-xs font-semibold text-white mb-2">AWS Redshift</div>
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square rounded-sm bg-white/30 border border-white/50" />
          ))}
        </div>
        <div className="text-[10px] text-white/70 mt-2">8 compute nodes · ra3.xlarge</div>
      </div>
    );
  }
  if (slug === 'supabase') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#1C1C1C] to-[#0A2E1E] relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-[#3ECF8E] flex items-center justify-center text-[10px] text-black font-bold">S</div>
          <div className="text-xs font-semibold text-white">supabase</div>
        </div>
        <div className="space-y-1 text-[10px] font-mono">
          <div className="text-[#3ECF8E]">→ Database</div>
          <div className="pl-3 text-white/80">&nbsp; auth.users</div>
          <div className="pl-3 text-white/80">&nbsp; public.posts</div>
          <div className="text-white/60 mt-1">Realtime: ON</div>
        </div>
      </div>
    );
  }
  if (slug === 'neon') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#00E699] via-[#0F766E] to-[#064E3B]">
        <div className="text-xs font-semibold text-white mb-2">Neon</div>
        <div className="text-[10px] font-mono text-white/90 mb-2">branches:</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-white">
            <div className="w-2 h-2 rounded-full bg-white" /> main
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/80 pl-4">
            <div className="w-2 h-2 rounded-full bg-white/60" /> preview-PR-42
          </div>
          <div className="flex items-center gap-2 text-[10px] text-white/80 pl-4">
            <div className="w-2 h-2 rounded-full bg-white/60" /> dev-santiago
          </div>
        </div>
      </div>
    );
  }
  if (slug === 'planetscale') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A]">
        <div className="text-xs font-semibold text-white mb-2">PlanetScale</div>
        <div className="text-[10px] font-mono text-white/80">$ pscale branch create</div>
        <div className="text-[10px] font-mono text-white/60 ml-4">add-posts-table</div>
        <div className="text-[10px] font-mono text-[#10b981] mt-2">✓ branch created</div>
        <div className="text-[10px] font-mono text-white/80 mt-2">$ pscale deploy-request</div>
      </div>
    );
  }
  if (slug === 'cockroach') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#6933FF] to-[#3A1A8C]">
        <div className="text-xs font-semibold text-white mb-2">CockroachDB</div>
        <div className="relative h-16">
          {[{x:'20%',y:'30%'},{x:'60%',y:'20%'},{x:'80%',y:'60%'},{x:'30%',y:'70%'},{x:'70%',y:'80%'}].map((n,i) => (
            <div key={i} className="absolute w-3 h-3 rounded-full bg-white/80 border-2 border-white" style={{ left: n.x, top: n.y }} />
          ))}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 60">
            <line x1="20" y1="18" x2="60" y2="12" stroke="white" strokeOpacity="0.3" />
            <line x1="60" y1="12" x2="80" y2="36" stroke="white" strokeOpacity="0.3" />
            <line x1="20" y1="18" x2="30" y2="42" stroke="white" strokeOpacity="0.3" />
            <line x1="30" y1="42" x2="70" y2="48" stroke="white" strokeOpacity="0.3" />
          </svg>
        </div>
        <div className="text-[10px] text-white/70">3 regions · 5 nodes</div>
      </div>
    );
  }
  if (slug === 'mongodb') {
    return (
      <div className="h-36 p-3 flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #001E2B 0%, #00684A 100%)' }}>
        <div className="absolute -right-4 -top-4 opacity-30">
          <svg viewBox="0 0 24 24" width="60" height="60" fill="#00ED64">
            <path d="M12 2c-.4 3.5 1 6.9 2.9 9.6 1.5 2.2 2.1 4.8 1.4 7.4-.6 2.1-2.1 3.9-4.3 4.7v-2.3c.1-2.3.6-4.5 1.3-6.6.4-1.2.3-2.5-.3-3.7-.5-1.1-1.2-2.1-2-3-.6-.6-1.3-1.2-1.8-1.9-1.4-2-1.7-4.5-.8-6.7.3-.8.9-1.5 1.6-2 .3.2.7.3 1 .5z" />
          </svg>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#00ED64]/20 flex items-center justify-center border border-[#00ED64]/40">
            <svg viewBox="0 0 24 24" width="14" height="16" fill="#00ED64">
              <path d="M12 2c-.4 3.5 1 6.9 2.9 9.6 1.5 2.2 2.1 4.8 1.4 7.4-.6 2.1-2.1 3.9-4.3 4.7v-2.3c.1-2.3.6-4.5 1.3-6.6z" />
            </svg>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">MongoDB Atlas</div>
            <div className="text-[9px] text-white/60 font-mono">Document · BSON · v8.0</div>
          </div>
        </div>
        <div className="font-mono text-[9px] text-white/90 bg-black/30 rounded p-1.5 mt-auto">
          <div className="text-[#00ED64]">db.pedidos.aggregate([</div>
          <div className="pl-2">&#123; <span className="text-[#fbbf24]">$match</span>: &#123; pais: <span className="text-[#bd93f9]">&apos;CO&apos;</span> &#125; &#125;,</div>
          <div className="pl-2">&#123; <span className="text-[#fbbf24]">$group</span>: &#123; _id: &apos;$user&apos;, t: &#123;$sum:&apos;$total&apos;&#125; &#125; &#125;</div>
          <div className="text-[#00ED64]">]);</div>
          <div className="text-[#50fa7b] mt-0.5">↳ 340 docs · 38 ms</div>
        </div>
      </div>
    );
  }
  if (slug === 'redis') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#DC382D] to-[#8B1A10]">
        <div className="text-xs font-semibold text-white mb-2">Redis</div>
        <div className="font-mono text-[10px] text-white/90">
          127.0.0.1:6379&gt; SET session:1 &quot;xyz&quot;<br />
          OK<br />
          127.0.0.1:6379&gt; GET session:1<br />
          <span className="text-[#FFC]">&quot;xyz&quot;</span>
        </div>
      </div>
    );
  }
  if (slug === 'dynamo') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#4053D6] to-[#1E2A6B]">
        <div className="text-xs font-semibold text-white mb-2">DynamoDB</div>
        <div className="bg-white/10 rounded p-2 text-[10px] font-mono text-white">
          PK: user#123<br />
          SK: order#2026-01<br />
          total: 4800
        </div>
      </div>
    );
  }
  if (slug === 'pinecone') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#000000] to-[#1A1A1A]">
        <div className="text-xs font-semibold text-white mb-2">🌲 Pinecone</div>
        <div className="relative h-14">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-white/60"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
          ))}
          <div className="absolute w-3 h-3 rounded-full bg-[#10b981] border-2 border-white" style={{ left: '45%', top: '40%' }} />
        </div>
        <div className="text-[10px] text-white/60 mt-1">index: products · 1M vecs</div>
      </div>
    );
  }
  if (slug === 'weaviate') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#17A3B8] to-[#0E6270]">
        <div className="text-xs font-semibold text-white mb-2">Weaviate</div>
        <div className="font-mono text-[9px] text-white/90">
          {'{'}<br />
          &nbsp;Get {'{'} Article(<br />
          &nbsp;&nbsp;nearText: {'{'} concepts: [&quot;AI&quot;] {'}'}<br />
          &nbsp;) {'{'} title _additional {'{'} distance {'}'} {'}'} {'}'}<br />
          {'}'}
        </div>
      </div>
    );
  }
  if (slug === 'qdrant') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#DC244C] to-[#8A1630]">
        <div className="text-xs font-semibold text-white mb-2">Qdrant</div>
        <div className="font-mono text-[9px] text-white/90">
          POST /collections/prods/points/search<br />
          {'{'}<br />
          &nbsp;&nbsp;vector: [0.1, 0.2, ...],<br />
          &nbsp;&nbsp;limit: 5,<br />
          &nbsp;&nbsp;filter: {'{'} category: &quot;pizza&quot; {'}'}<br />
          {'}'}
        </div>
      </div>
    );
  }
  if (slug === 'turso') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#4FF8D2] via-[#1E7060] to-[#0A3024]">
        <div className="text-xs font-semibold text-white mb-2">Turso</div>
        <div className="grid grid-cols-6 gap-1 mt-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-square rounded bg-white/30 border border-white/50" />
          ))}
        </div>
        <div className="text-[10px] text-white/70 mt-1">12 edge replicas · libSQL</div>
      </div>
    );
  }
  if (slug === 'd1') {
    return (
      <div className="h-32 p-3 bg-gradient-to-br from-[#F6821F] to-[#B34F08]">
        <div className="text-xs font-semibold text-white mb-1">Cloudflare D1</div>
        <div className="text-[10px] text-white/80 mb-2">Global SQLite for Workers</div>
        <div className="font-mono text-[10px] text-white/90">
          env.DB.prepare(<br />
          &nbsp;&nbsp;&quot;SELECT * FROM users&quot;<br />
          ).all()
        </div>
      </div>
    );
  }
  return (
    <div className="h-32 flex items-center justify-center" style={{ background: color }}>
      <div className="text-sm font-bold text-white">{name}</div>
    </div>
  );
}

function DecisionTree() {
  return (
    <div className="text-xs">
      <div className="space-y-3">
        <TreeNode q="¿Necesitas búsqueda por similitud (IA/RAG)?" yes="pgvector (si ya tienes Postgres), Pinecone/Qdrant/Weaviate (managed)" />
        <TreeNode q="¿Cargas analíticas sobre millones/billones de filas?" yes="Snowflake, BigQuery, Databricks" />
        <TreeNode q="¿App transaccional con usuarios y pedidos?" yes="PostgreSQL (Supabase / Neon / RDS) o MySQL" />
        <TreeNode q="¿Documentos flexibles sin esquema fijo?" yes="MongoDB Atlas, Firestore" />
        <TreeNode q="¿Cache, sesiones, rate limiting?" yes="Redis (Upstash, Redis Cloud)" />
        <TreeNode q="¿Aplicación global multi-región con alta disponibilidad?" yes="CockroachDB, Spanner" />
        <TreeNode q="¿App edge / mobile / local-first?" yes="Turso, Cloudflare D1, SQLite" />
      </div>
    </div>
  );
}

function TreeNode({ q, yes }: { q: string; yes: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full border-2 border-[var(--accent-blue)] flex items-center justify-center text-[8px] text-[var(--accent-blue)] font-bold">
        ?
      </div>
      <div className="flex-1">
        <div className="text-[var(--text-body)]">{q}</div>
        <div className="text-[var(--success)] mt-0.5 flex items-center gap-1">
          <span>→</span>
          <span>{yes}</span>
        </div>
      </div>
    </div>
  );
}

// ==============================================================
// S11 — GESTIÓN DE PROYECTOS
// ==============================================================

function GestionProyectos({ onDone, done }: { onDone: () => void; done: boolean }) {
  return (
    <Section
      id="gestion"
      kicker="Módulo 11"
      title="Gestión de proyectos de datos"
      subtitle="Escribir SQL es el 20% del trabajo real. El otro 80% es gobernanza, pipelines, calidad, documentación y equipo."
      onDone={onDone}
      done={done}
    >
      <ModernDataStack />
      <Roles />
      <CicloVida />

      <Callout kind="info" title="Gobernanza = dueño, calidad, linaje, acceso">
        Un dato tiene dueño (data steward), reglas de calidad (tests en dbt / Great Expectations),
        linaje (de qué fuente viene y a qué dashboards va a parar) y permisos granulares (RLS, IAM).
        Sin esto, todo se vuelve un pantano.
      </Callout>
    </Section>
  );
}

function ModernDataStack() {
  const layers = [
    { n: 'Fuentes', items: ['App DBs', 'APIs', 'Archivos', 'Eventos'], c: '#3b82f6' },
    { n: 'Ingesta', items: ['Fivetran', 'Airbyte', 'Kafka', 'Debezium'], c: '#8b5cf6' },
    { n: 'Almacenamiento', items: ['Snowflake', 'BigQuery', 'Databricks', 'S3 / Iceberg'], c: '#ec4899' },
    { n: 'Transformación', items: ['dbt', 'Dataform', 'SQLMesh', 'Spark'], c: '#f59e0b' },
    { n: 'Semántica', items: ['Cube', 'LookML', 'Semantic Layer', 'dbt metrics'], c: '#14b8a6' },
    { n: 'Consumo', items: ['Looker', 'Tableau', 'Power BI', 'Notebooks', 'Apps'], c: '#10b981' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-1">
        Modern Data Stack: de la fuente al dashboard
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        El pipeline canónico de los últimos años. Cada capa tiene varias opciones y se encadenan con ELT.
      </p>
      <div className="grid md:grid-cols-6 gap-2">
        {layers.map((l, i) => (
          <div key={l.n} className="relative">
            <div className="text-[10px] text-[var(--text-muted)] mb-1">Capa {i + 1}</div>
            <div className="rounded-lg border p-2" style={{ borderColor: `${l.c}55`, background: `${l.c}0f` }}>
              <div className="text-xs font-semibold mb-2" style={{ color: l.c }}>{l.n}</div>
              <div className="space-y-1">
                {l.items.map((it) => (
                  <div key={it} className="text-[10px] font-mono text-[var(--text-body)] truncate">
                    {it}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Roles() {
  const roles = [
    { n: 'Data Engineer', d: 'Diseña pipelines, ingesta, orquestación (Airflow, Dagster).', e: 'Python, SQL, Spark, Kafka' },
    { n: 'Analytics Engineer', d: 'Modela dbt, define métricas, tests, documentación.', e: 'SQL, dbt, Git' },
    { n: 'Data Analyst', d: 'Explora, responde preguntas, construye dashboards.', e: 'SQL, Tableau/Looker, estadística' },
    { n: 'Data Scientist', d: 'Modelos predictivos, experimentos, ML.', e: 'Python, SQL, scikit-learn, notebooks' },
    { n: 'ML / AI Engineer', d: 'Pone modelos en producción, evalúa drift.', e: 'Python, Docker, MLflow, RAG' },
    { n: 'Data Governance', d: 'Calidad, linaje, permisos, compliance.', e: 'Collibra, Atlan, políticas' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
        Roles en un equipo de datos
      </h3>
      <div className="grid md:grid-cols-3 gap-3">
        {roles.map((r) => (
          <div key={r.n} className="rounded-lg border border-[var(--border-color)] p-3">
            <div className="text-xs font-semibold text-[var(--accent-blue)] mb-1">{r.n}</div>
            <div className="text-[11px] text-[var(--text-body)] mb-2 leading-relaxed">{r.d}</div>
            <div className="text-[10px] font-mono text-[var(--text-muted)]">{r.e}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CicloVida() {
  const phases = [
    { n: 'Entender', d: 'Pregunta de negocio, stakeholders, métricas clave.' },
    { n: 'Modelar', d: 'ER, normalización, decisiones de OLTP vs OLAP.' },
    { n: 'Ingresar', d: 'Conectores, schemas, CDC, seeds.' },
    { n: 'Transformar', d: 'dbt: staging → intermediate → marts.' },
    { n: 'Validar', d: 'Tests de calidad, freshness, uniqueness, not-null.' },
    { n: 'Entregar', d: 'Dashboards, APIs, modelos, alertas.' },
    { n: 'Operar', d: 'Monitoreo, costo, performance, incidentes.' },
    { n: 'Evolucionar', d: 'Refactor, deprecación, nuevas fuentes.' },
  ];
  return (
    <Card>
      <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
        Ciclo de vida de un proyecto de datos
      </h3>
      <div className="relative">
        <div className="grid md:grid-cols-4 gap-2">
          {phases.map((p, i) => (
            <div key={p.n} className="rounded-lg border border-[var(--border-color)] p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-xs font-semibold text-[var(--text-heading)]">{p.n}</span>
              </div>
              <div className="text-[11px] text-[var(--text-muted)] leading-relaxed">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ==============================================================
// S12 — TENDENCIAS 2026
// ==============================================================

function Tendencias({ onDone, done }: { onDone: () => void; done: boolean }) {
  const trends = [
    { n: 'Lakehouse abierto', d: 'Iceberg, Delta, Hudi como formatos abiertos. Los warehouses consumen lake storage.', heat: 95, icon: '◆' },
    { n: 'Text-to-SQL', d: 'El usuario pregunta en español, el LLM genera SQL. Cortex, Gemini in BigQuery, Oracle Select AI.', heat: 90, icon: '💬' },
    { n: 'Bases vectoriales nativas', d: 'Todo SGBD serio agrega pgvector o su equivalente. RAG se normaliza.', heat: 92, icon: '✦' },
    { n: 'Zero-ETL', d: 'Aurora → Redshift, DynamoDB → OpenSearch sin pipelines. Streaming incremental built-in.', heat: 80, icon: '⚡' },
    { n: 'Data Mesh / Contracts', d: 'Dominios dueños de sus productos de datos. Contratos versionados entre equipos.', heat: 70, icon: '◎' },
    { n: 'Real-time / Streaming', d: 'ClickHouse, Apache Pinot, Materialize. Dashboards que se mueven cada segundo.', heat: 75, icon: '~' },
    { n: 'Serverless DBs', d: 'Neon, Aurora Serverless, D1. Scale-to-zero y branching.', heat: 85, icon: '☁' },
    { n: 'AI-native DBs', d: 'Oracle 23ai, SQL Server 2025, MongoDB Atlas: embeddings y LLM integrados.', heat: 88, icon: '✱' },
    { n: 'Open source resiliente', d: 'Cambios de licencia (Redis→Valkey, ES→OpenSearch). Forks vivos y vigilados.', heat: 60, icon: '◈' },
    { n: 'Data + Privacy by design', d: 'RLS, Queryable Encryption, diferencial privacy en warehouses.', heat: 72, icon: '🔒' },
  ];
  return (
    <Section
      id="tendencias"
      kicker="Módulo 12"
      title="Tendencias 2026: hacia dónde corre la industria"
      subtitle="Las diez fuerzas que están cambiando cómo se almacenan, consultan y gobiernan los datos."
      onDone={onDone}
      done={done}
    >
      <div className="grid md:grid-cols-2 gap-3">
        {trends.map((t) => (
          <div key={t.n} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] text-lg flex items-center justify-center font-bold">
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[var(--text-heading)]">{t.n}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-pink)]"
                      style={{ width: `${t.heat}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">{t.heat}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{t.d}</p>
          </div>
        ))}
      </div>

      <Callout kind="info" title="Lo transversal">
        Todas las tendencias convergen en dos ideas: <strong>abrir</strong> (formatos, catálogos,
        interoperabilidad) e <strong>integrar IA</strong> en el motor. El SGBD del 2026 no es una caja
        negra con SQL, es una plataforma que razona con tus datos.
      </Callout>
    </Section>
  );
}

// ==============================================================
// S13 — QUIZ FINAL
// ==============================================================

function Quiz({ onDone, done }: { onDone: () => void; done: boolean }) {
  const questions = [
    {
      q: '¿Qué estructura de datos usa por defecto un índice B-tree?',
      opts: ['Una lista enlazada', 'Un árbol balanceado ordenado', 'Un hashmap', 'Una matriz'],
      a: 1,
    },
    {
      q: 'En un modelo ER, ¿cómo se implementa típicamente una relación N:M?',
      opts: ['Con una llave foránea', 'Con una tabla puente / intermedia', 'Con un índice compuesto', 'Con una vista materializada'],
      a: 1,
    },
    {
      q: '¿Cuál de las siguientes NO es una propiedad ACID?',
      opts: ['Atomicidad', 'Consistencia', 'Idempotencia', 'Durabilidad'],
      a: 2,
    },
    {
      q: 'Tienes 1M de filas y siempre filtras por cliente_id. ¿Qué haces primero?',
      opts: ['Normalizar', 'Crear un índice en cliente_id', 'Cambiar a NoSQL', 'Subir el hardware'],
      a: 1,
    },
    {
      q: 'Una base de datos columnar es ideal para:',
      opts: ['Inserts frecuentes en aplicaciones web', 'Agregaciones sobre millones de filas', 'Cache de sesiones', 'Documentos JSON anidados'],
      a: 1,
    },
    {
      q: 'En RAG, el "retrieval" consiste en:',
      opts: [
        'Entrenar un modelo con tus documentos',
        'Buscar los documentos más similares a la pregunta en una BD vectorial',
        'Ejecutar SQL contra el LLM',
        'Generar embeddings del dataset entero en cada pregunta',
      ],
      a: 1,
    },
    {
      q: '¿Qué devuelve un LEFT JOIN entre clientes (3 filas) y pedidos (2 filas, con 1 match)?',
      opts: ['2 filas', '3 filas', '5 filas', '6 filas'],
      a: 1,
    },
    {
      q: 'Para dashboards analíticos sobre un lakehouse, la herramienta más natural es:',
      opts: ['Redis', 'Databricks SQL / Snowflake', 'DynamoDB', 'SQLite'],
      a: 1,
    },
  ];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = submitted ? Object.entries(answers).filter(([k, v]) => questions[Number(k)].a === v).length : 0;

  return (
    <Section
      id="quiz"
      kicker="Pon a prueba lo aprendido"
      title="Quiz final de integración"
      subtitle="Ocho preguntas que cubren todo lo visto. Responde sin mirar atrás."
      onDone={onDone}
      done={done}
    >
      <Card>
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={i} className="rounded-lg border border-[var(--border-color)] p-3">
              <div className="text-xs font-semibold text-[var(--text-heading)] mb-2">
                {i + 1}. {q.q}
              </div>
              <div className="space-y-1">
                {q.opts.map((o, j) => {
                  const isSelected = answers[i] === j;
                  const isCorrect = submitted && j === q.a;
                  const isWrong = submitted && isSelected && j !== q.a;
                  return (
                    <button
                      key={j}
                      onClick={() => !submitted && setAnswers({ ...answers, [i]: j })}
                      disabled={submitted}
                      className={`w-full text-left text-xs px-3 py-2 rounded-md border transition-all ${
                        isCorrect
                          ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]'
                          : isWrong
                          ? 'border-[var(--error)] bg-[var(--error)]/10 text-[var(--error)]'
                          : isSelected
                          ? 'border-[var(--accent-blue)] bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]'
                          : 'border-[var(--border-color)] text-[var(--text-body)] hover:border-[var(--accent-blue)]/60'
                      }`}
                    >
                      <span className="font-mono mr-2">{String.fromCharCode(65 + j)}.</span>
                      {o}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {submitted && (
              <div className="text-sm">
                <span className="text-[var(--text-muted)]">Puntaje: </span>
                <span
                  className={`font-bold text-lg ${
                    score >= 6 ? 'text-[var(--success)]' : score >= 4 ? 'text-[var(--warning)]' : 'text-[var(--error)]'
                  }`}
                >
                  {score} / {questions.length}
                </span>
                <span className="ml-3 text-xs text-[var(--text-muted)]">
                  {score >= 7 ? 'Excelente' : score >= 5 ? 'Vas bien, repasa las que fallaste' : 'Vuelve a las secciones correspondientes'}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {submitted && (
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-color)] text-[var(--text-muted)]"
              >
                Reintentar
              </button>
            )}
            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted || Object.keys(answers).length < questions.length}
              className="text-xs px-3 py-1.5 rounded-md bg-[var(--accent-blue)] text-white disabled:opacity-40"
            >
              Calificar
            </button>
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ==============================================================
// S14 — CIERRE
// ==============================================================

function Cierre({ onDone, done, completed }: { onDone: () => void; done: boolean; completed: number }) {
  return (
    <Section
      id="cierre"
      kicker="Cierre"
      title="Lo que ya sabes"
      subtitle="Un mapa mental corto de lo que acabas de recorrer. Si puedes explicarle esta página a alguien más en 20 minutos, el resumen cumplió su función."
      onDone={onDone}
      done={done}
    >
      <Card>
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] mb-4">
            <div className="text-3xl font-bold text-white">{completed}/{SECTIONS.length}</div>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-heading)] mb-2">
            {completed === SECTIONS.length ? '¡Recorrido completo!' : 'Sigue avanzando'}
          </h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
            {completed === SECTIONS.length
              ? 'Has cubierto los 15 bloques. Lo más importante ahora: traduce esto a un proyecto propio.'
              : `Te faltan ${SECTIONS.length - completed} secciones por marcar. Vuelve a la parte superior para continuar.`}
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
          Los 10 conceptos que tienes que poder explicar con tus palabras
        </h3>
        <div className="grid md:grid-cols-2 gap-2">
          {[
            'Por qué existe un SGBD y no solo archivos',
            'La diferencia entre DDL, DML y DQL',
            'Cómo traduces un ER a tablas (1:N, N:M)',
            'Qué garantiza cada letra de ACID',
            'Cuándo un índice ayuda y cuándo estorba',
            'Cuándo usar Postgres vs Snowflake vs MongoDB',
            'Qué es un embedding y por qué importa',
            'Los 5 pasos de un pipeline RAG',
            'Qué hace dbt y dónde vive en el stack',
            'Por qué el lakehouse es la arquitectura dominante',
          ].map((c, i) => (
            <div key={c} className="flex items-center gap-2 text-xs text-[var(--text-body)]">
              <span className="w-5 h-5 rounded bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] text-[10px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {c}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-semibold text-[var(--text-heading)] mb-3">
          Para seguir aprendiendo dentro de la plataforma
        </h3>
        <div className="grid md:grid-cols-3 gap-2 text-xs">
          <a href="/lecciones" className="rounded-lg border border-[var(--border-color)] p-3 hover:border-[var(--accent-blue)] transition-all">
            <div className="font-semibold text-[var(--text-heading)]">📚 Lecciones</div>
            <div className="text-[var(--text-muted)] mt-1">8 módulos con ejercicios prácticos.</div>
          </a>
          <a href="/laboratorio" className="rounded-lg border border-[var(--border-color)] p-3 hover:border-[var(--accent-blue)] transition-all">
            <div className="font-semibold text-[var(--text-heading)]">⌘ Laboratorio</div>
            <div className="text-[var(--text-muted)] mt-1">Editor SQL con datasets reales.</div>
          </a>
          <a href="/plataformas" className="rounded-lg border border-[var(--border-color)] p-3 hover:border-[var(--accent-blue)] transition-all">
            <div className="font-semibold text-[var(--text-heading)]">◉ Plataformas</div>
            <div className="text-[var(--text-muted)] mt-1">Ficha detallada de cada SGBD.</div>
          </a>
        </div>
      </Card>
    </Section>
  );
}

// ==============================================================
// S10.5 — ESPACIOS: misma lógica, distintas interfaces
// ==============================================================

function Espacios({ onDone, done }: { onDone: () => void; done: boolean }) {
  return (
    <Section
      id="espacios"
      kicker="Módulo 11"
      title="Espacios: cómo se ve por dentro cada plataforma"
      subtitle="Aunque los logos, sintaxis y dashboards cambien, la lógica conceptual es casi siempre la misma: guardas datos, los consultas por clave, filtras, agrupas, ordenas. Una vez entiendes eso, cambiar de herramienta es aprender un dialecto."
      onDone={onDone}
      done={done}
    >
      <PostgresVsMongo />
      <DialectTranslator />
      <WorkspaceMockups />
      <LogicaUnificada />
    </Section>
  );
}

// ---- Postgres vs Mongo: la MISMA pregunta, dos mundos ----

function PostgresVsMongo() {
  const questions = [
    {
      k: 'lectura',
      label: 'Leer los 3 últimos pedidos del cliente 42',
      sql: `SELECT id, fecha, total\nFROM pedidos\nWHERE cliente_id = 42\nORDER BY fecha DESC\nLIMIT 3;`,
      mongo: `db.pedidos.find(\n  { cliente_id: 42 }\n)\n.sort({ fecha: -1 })\n.limit(3);`,
    },
    {
      k: 'insert',
      label: 'Insertar un pedido nuevo',
      sql: `INSERT INTO pedidos\n  (cliente_id, total, fecha)\nVALUES\n  (42, 4800, NOW())\nRETURNING id;`,
      mongo: `db.pedidos.insertOne({\n  cliente_id: 42,\n  total: 4800,\n  fecha: new Date()\n});`,
    },
    {
      k: 'update',
      label: 'Marcar un pedido como pagado',
      sql: `UPDATE pedidos\nSET estado = 'pagado'\nWHERE id = 1001;`,
      mongo: `db.pedidos.updateOne(\n  { _id: 1001 },\n  { $set: { estado: 'pagado' } }\n);`,
    },
    {
      k: 'agregacion',
      label: 'Total vendido por país en abril',
      sql: `SELECT pais, SUM(total) AS ventas\nFROM pedidos\nWHERE fecha >= '2026-04-01'\nGROUP BY pais\nORDER BY ventas DESC;`,
      mongo: `db.pedidos.aggregate([\n  { $match: {\n    fecha: { $gte: ISODate('2026-04-01') }\n  }},\n  { $group: {\n    _id: '$pais',\n    ventas: { $sum: '$total' }\n  }},\n  { $sort: { ventas: -1 } }\n]);`,
    },
    {
      k: 'join',
      label: 'Nombre del cliente + sus pedidos',
      sql: `SELECT c.nombre, p.id, p.total\nFROM clientes c\nJOIN pedidos p\n  ON p.cliente_id = c.id\nWHERE c.pais = 'CO';`,
      mongo: `db.clientes.aggregate([\n  { $match: { pais: 'CO' } },\n  { $lookup: {\n    from: 'pedidos',\n    localField: '_id',\n    foreignField: 'cliente_id',\n    as: 'pedidos'\n  }}\n]);`,
    },
  ];
  const [q, setQ] = useState(0);
  const current = questions[q];

  return (
    <Card>
      <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-heading)] mb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-[#336791] to-[#00ED64] flex items-center justify-center text-white text-[10px] font-bold">⇄</span>
            PostgreSQL ⇄ MongoDB: la misma pregunta, dos mundos
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Relacional vs documento. Distinta sintaxis, misma intención.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {questions.map((qq, i) => (
          <button
            key={qq.k}
            onClick={() => setQ(i)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all ${
              q === i
                ? 'bg-gradient-to-r from-[#336791]/20 to-[#00ED64]/20 text-[var(--text-heading)] border-[var(--accent-blue)]'
                : 'text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-body)]'
            }`}
          >
            {qq.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <PlatformPanel
          brand="PostgreSQL"
          logo={<PgElephantLogo />}
          color="#336791"
          tag="Relacional · Tablas · SQL"
          code={current.sql}
          lang="sql"
        />
        <PlatformPanel
          brand="MongoDB"
          logo={<MongoLeafLogo />}
          color="#00ED64"
          tag="Documental · Colecciones · MQL"
          code={current.mongo}
          lang="js"
        />
      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-2 text-[11px]">
        <ComparePill k="Estructura" pg="Tabla con esquema fijo" mg="Colección de documentos JSON" />
        <ComparePill k="Llave primaria" pg="PRIMARY KEY (numérica)" mg="_id (ObjectId por defecto)" />
        <ComparePill k="Relacionar" pg="JOIN por llave foránea" mg="$lookup o documentos embebidos" />
        <ComparePill k="Filtrar" pg="WHERE columna = valor" mg="{ campo: valor }" />
        <ComparePill k="Agregar" pg="GROUP BY + SUM/AVG/COUNT" mg="aggregate([$group, $sum])" />
        <ComparePill k="Transacciones" pg="BEGIN/COMMIT nativo" mg="session.withTransaction (desde 4.0)" />
      </div>
    </Card>
  );
}

function PlatformPanel({ brand, logo, color, tag, code, lang }: { brand: string; logo: React.ReactNode; color: string; tag: string; code: string; lang: string }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${color}55`, boxShadow: `0 0 20px ${color}15` }}>
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${color}33, ${color}0a)`, borderBottom: `1px solid ${color}33` }}>
        <div className="shrink-0">{logo}</div>
        <div className="flex-1">
          <div className="text-sm font-bold" style={{ color }}>{brand}</div>
          <div className="text-[10px] text-[var(--text-muted)] font-mono">{tag}</div>
        </div>
      </div>
      <div className="p-0">
        <CodeBlock code={code} lang={lang} />
      </div>
    </div>
  );
}

function ComparePill({ k, pg, mg }: { k: string; pg: string; mg: string }) {
  return (
    <div className="rounded-lg border border-[var(--border-color)] p-2.5 bg-[var(--bg-tertiary)]/40">
      <div className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">{k}</div>
      <div className="flex items-start gap-1.5">
        <div className="w-1 h-1 mt-1 rounded-full shrink-0" style={{ background: '#336791' }} />
        <div className="text-[var(--text-body)] leading-tight">{pg}</div>
      </div>
      <div className="flex items-start gap-1.5 mt-1">
        <div className="w-1 h-1 mt-1 rounded-full shrink-0" style={{ background: '#00ED64' }} />
        <div className="text-[var(--text-body)] leading-tight">{mg}</div>
      </div>
    </div>
  );
}

function PgElephantLogo() {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #336791, #1e3f5c)' }}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
        <path d="M20.9 11.1c-.5-1.5-1.6-2.4-3-2.4-.7 0-1.4.2-2 .5.1-1 .1-2-.1-2.9-.4-1.6-1.4-2.8-2.7-3.3-1.3-.5-2.8-.3-4 .6-1.2.8-2 2.2-2.2 3.7-.1.9-.1 1.8 0 2.6-.3-.2-.7-.3-1.1-.4-1.5-.1-2.8.7-3.5 2-.6 1.3-.4 2.8.5 4 .9 1.2 2.3 1.7 3.6 1.5-.2.5-.3 1.1-.2 1.7.2 1.2 1 2.3 2.1 2.8 1.1.5 2.4.4 3.5-.2.2.6.5 1.2 1 1.6 1 1 2.3 1.3 3.6 1 1.3-.3 2.3-1.2 2.8-2.5.2-.5.3-1 .3-1.6.5.2 1 .3 1.5.2 1.3-.2 2.3-1.1 2.7-2.3.5-1.3.2-2.7-.8-3.8z" />
      </svg>
    </div>
  );
}

function MongoLeafLogo() {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00ED64, #006B2E)' }}>
      <svg viewBox="0 0 24 24" width="18" height="22" fill="white">
        <path d="M12 2c-.4 3.5 1 6.9 2.9 9.6 1.5 2.2 2.1 4.8 1.4 7.4-.6 2.1-2.1 3.9-4.3 4.7v-2.3c.1-2.3.6-4.5 1.3-6.6.4-1.2.3-2.5-.3-3.7-.5-1.1-1.2-2.1-2-3-.6-.6-1.3-1.2-1.8-1.9-1.4-2-1.7-4.5-.8-6.7.3-.8.9-1.5 1.6-2 .3.2.7.3 1 .5 1-.2 1.4 2.4 1 4z" opacity=".9" />
      </svg>
    </div>
  );
}

// ---- Traductor de dialectos: 4 lenguajes, misma pregunta ----

function DialectTranslator() {
  const [q] = useState('Top 5 productos más vendidos');
  return (
    <Card>
      <h3 className="text-base font-bold text-[var(--text-heading)] mb-1">
        El mismo "top 5" escrito en 4 mundos distintos
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-5">
        Pregunta: <strong className="text-[var(--text-body)]">{q}</strong>. Observa cómo el qué es idéntico; lo único que cambia es la envoltura.
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        <DialectCard
          brand="PostgreSQL"
          color="#336791"
          lang="sql"
          code={`SELECT producto_id,\n  SUM(cantidad) AS unidades\nFROM detalle_pedidos\nGROUP BY producto_id\nORDER BY unidades DESC\nLIMIT 5;`}
        />
        <DialectCard
          brand="MongoDB"
          color="#00ED64"
          lang="js"
          code={`db.detalle_pedidos.aggregate([\n  { $group: {\n      _id: '$producto_id',\n      unidades: { $sum: '$cantidad' }\n  }},\n  { $sort: { unidades: -1 } },\n  { $limit: 5 }\n]);`}
        />
        <DialectCard
          brand="Snowflake SQL"
          color="#29B5E8"
          lang="sql"
          code={`SELECT producto_id,\n  SUM(cantidad) AS unidades\nFROM detalle_pedidos\nGROUP BY producto_id\nQUALIFY ROW_NUMBER()\n  OVER (ORDER BY unidades DESC) <= 5;`}
        />
        <DialectCard
          brand="Redis (sorted set)"
          color="#DC382D"
          lang="js"
          code={`// Al registrar venta:\nZINCRBY ventas:producto 1 "SKU-42"\n\n// Top 5:\nZREVRANGE ventas:producto\n  0 4 WITHSCORES\n// → ["SKU-42", "87", "SKU-3", "64", ...]`}
        />
      </div>
      <Callout kind="tip" title="La lección">
        La decisión de qué motor usar casi nunca es por sintaxis. Es por el modelo de datos
        (relacional / documento / clave-valor / columnar), la escala, la latencia, el costo y el
        ecosistema. El SQL lo aprendes una vez.
      </Callout>
    </Card>
  );
}

function DialectCard({ brand, color, lang, code }: { brand: string; color: string; lang: string; code: string }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${color}55` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ background: `linear-gradient(90deg, ${color}22, transparent)`, borderBottom: `1px solid ${color}33` }}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
          <div className="text-xs font-semibold" style={{ color }}>{brand}</div>
        </div>
        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{lang}</div>
      </div>
      <CodeBlock code={code} lang={lang} />
    </div>
  );
}

// ---- Workspace Mockups (pgAdmin, Mongo Compass, Snowsight, Supabase Studio, Atlas Search, Redis Insight) ----

function WorkspaceMockups() {
  const [view, setView] = useState<'pgadmin' | 'compass' | 'snowsight' | 'supabase' | 'atlas' | 'insight'>('pgadmin');

  const views = {
    pgadmin: { label: 'pgAdmin', brand: 'PostgreSQL', color: '#336791' },
    compass: { label: 'MongoDB Compass', brand: 'MongoDB', color: '#00ED64' },
    snowsight: { label: 'Snowsight', brand: 'Snowflake', color: '#29B5E8' },
    supabase: { label: 'Supabase Studio', brand: 'Supabase', color: '#3ECF8E' },
    atlas: { label: 'Atlas Search', brand: 'MongoDB Atlas', color: '#00ED64' },
    insight: { label: 'Redis Insight', brand: 'Redis', color: '#DC382D' },
  };

  return (
    <Card>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-[var(--text-heading)] mb-1">
            Los espacios reales donde vive el trabajo
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Cada plataforma tiene un "estudio" propio. Cambia la pestaña y fíjate que los bloques son
            parecidos: explorador de datos, editor, resultados, métricas.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {(Object.keys(views) as Array<keyof typeof views>).map((k) => (
          <button
            key={k}
            onClick={() => setView(k)}
            className={`text-xs px-3 py-1.5 rounded-md border transition-all flex items-center gap-2 ${
              view === k ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
            }`}
            style={
              view === k
                ? { background: views[k].color, borderColor: views[k].color, boxShadow: `0 0 12px ${views[k].color}55` }
                : { borderColor: 'var(--border-color)' }
            }
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: view === k ? 'white' : views[k].color }} />
            {views[k].label}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden border border-[var(--border-color)]" style={{ boxShadow: `0 8px 30px ${views[view].color}20` }}>
        {view === 'pgadmin' && <PgAdminMock />}
        {view === 'compass' && <CompassMock />}
        {view === 'snowsight' && <SnowsightMock />}
        {view === 'supabase' && <SupabaseMock />}
        {view === 'atlas' && <AtlasSearchMock />}
        {view === 'insight' && <RedisInsightMock />}
      </div>

      <div className="mt-3 text-[11px] text-[var(--text-muted)] flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse" />
        Los mockups son recreaciones simplificadas para comparar estructura; cada herramienta real tiene muchas más opciones.
      </div>
    </Card>
  );
}

// ========= MOCK: pgAdmin =========
function PgAdminMock() {
  return (
    <div className="bg-white text-gray-800" style={{ minHeight: 400 }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f4f4f4] border-b border-gray-300">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
        </div>
        <div className="text-[11px] text-gray-600 ml-2 font-semibold">pgAdmin 4 · PostgreSQL 17</div>
      </div>
      {/* Menu bar */}
      <div className="px-3 py-1 bg-[#ebf0f5] border-b border-gray-300 text-[11px] text-gray-700 flex gap-4">
        <span>File</span><span>Object</span><span>Tools</span><span>Help</span>
      </div>
      {/* Body */}
      <div className="grid grid-cols-[220px_1fr] min-h-[360px]">
        {/* Sidebar */}
        <div className="bg-[#f7f9fb] border-r border-gray-300 p-2 text-[11px]">
          <div className="text-gray-500 uppercase tracking-wider text-[9px] mb-1">Servers</div>
          <TreeLine icon="🖥" label="Local (5432)" open />
          <TreeLine icon="🗄" label="postgres" indent={1} open />
          <TreeLine icon="📁" label="Schemas" indent={2} open />
          <TreeLine icon="📁" label="public" indent={3} open highlight />
          <TreeLine icon="📂" label="Tables (4)" indent={4} open />
          <TreeLine icon="🧾" label="clientes" indent={5} />
          <TreeLine icon="🧾" label="pedidos" indent={5} active />
          <TreeLine icon="🧾" label="productos" indent={5} />
          <TreeLine icon="🧾" label="detalle_pedidos" indent={5} />
          <TreeLine icon="📂" label="Views (2)" indent={4} />
          <TreeLine icon="📂" label="Indexes (6)" indent={4} />
          <TreeLine icon="📂" label="Functions" indent={4} />
        </div>
        {/* Main */}
        <div className="flex flex-col">
          {/* Tabs */}
          <div className="bg-[#f7f9fb] border-b border-gray-300 px-2 flex items-end gap-0 text-[11px]">
            <div className="px-3 py-1.5 border-t-2 border-t-[#336791] bg-white">Query</div>
            <div className="px-3 py-1.5 text-gray-500">Data</div>
            <div className="px-3 py-1.5 text-gray-500">Dependencies</div>
          </div>
          {/* Query area */}
          <div className="p-3 bg-white font-mono text-[11px] border-b border-gray-200">
            <div className="text-gray-400 italic">-- Pedidos recientes por cliente</div>
            <div><span className="text-[#0000ff]">SELECT</span> c.nombre, <span className="text-[#9c27b0]">COUNT</span>(p.id) <span className="text-[#0000ff]">AS</span> pedidos,</div>
            <div className="pl-4"><span className="text-[#9c27b0]">SUM</span>(p.total) <span className="text-[#0000ff]">AS</span> total</div>
            <div><span className="text-[#0000ff]">FROM</span> clientes c</div>
            <div><span className="text-[#0000ff]">JOIN</span> pedidos p <span className="text-[#0000ff]">ON</span> p.cliente_id = c.id</div>
            <div><span className="text-[#0000ff]">WHERE</span> p.fecha {'>='} <span className="text-[#e91e63]">&apos;2026-04-01&apos;</span></div>
            <div><span className="text-[#0000ff]">GROUP BY</span> c.nombre</div>
            <div><span className="text-[#0000ff]">ORDER BY</span> total <span className="text-[#0000ff]">DESC</span></div>
            <div><span className="text-[#0000ff]">LIMIT</span> <span className="text-[#2196f3]">10</span>;</div>
          </div>
          {/* Results */}
          <div className="flex-1 bg-white">
            <div className="text-[10px] text-gray-500 px-3 py-1 bg-[#f7f9fb] border-b border-gray-200 flex items-center gap-4">
              <span className="text-green-600">✓ 10 rows</span>
              <span>·</span>
              <span>Query returned successfully in 42 ms</span>
            </div>
            <table className="w-full text-[10px] border-collapse">
              <thead>
                <tr className="bg-[#f7f9fb] text-gray-700">
                  <th className="text-left px-3 py-1 border-b border-gray-200">nombre</th>
                  <th className="text-left px-3 py-1 border-b border-gray-200">pedidos</th>
                  <th className="text-left px-3 py-1 border-b border-gray-200">total</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  ['María Gómez', 14, 6480000],
                  ['Andrés Ruiz', 9, 4120000],
                  ['Laura Vidal', 7, 3890000],
                  ['Pedro Ariza', 6, 2540000],
                  ['Sofía Peña', 5, 2310000],
                ].map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9fafb]'}>
                    <td className="px-3 py-1 border-b border-gray-100">{r[0]}</td>
                    <td className="px-3 py-1 border-b border-gray-100">{r[1]}</td>
                    <td className="px-3 py-1 border-b border-gray-100 font-mono">${(r[2] as number).toLocaleString('es-CO')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeLine({ icon, label, indent = 0, open, active, highlight }: { icon: string; label: string; indent?: number; open?: boolean; active?: boolean; highlight?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1 py-0.5 px-1 rounded text-[11px] ${
        active ? 'bg-[#336791]/20 text-[#1a3f5c] font-semibold' : highlight ? 'text-gray-800 font-semibold' : 'text-gray-700'
      }`}
      style={{ paddingLeft: `${indent * 10 + 4}px` }}
    >
      <span className="text-gray-400 text-[8px]">{open ? '▼' : '▶'}</span>
      <span>{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}

// ========= MOCK: MongoDB Compass =========
function CompassMock() {
  return (
    <div className="bg-[#f5f6f7] text-gray-800" style={{ minHeight: 400 }}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0f1b0a] border-b border-gray-800">
        <div className="w-5 h-5 rounded bg-[#00ED64] flex items-center justify-center">
          <svg width="10" height="12" viewBox="0 0 24 24" fill="#0f1b0a"><path d="M12 2c-.4 3.5 1 6.9 2.9 9.6C16.4 13.8 17 16.4 16.3 19c-.6 2.1-2.1 3.9-4.3 4.7v-2.3c.1-2.3.6-4.5 1.3-6.6z" /></svg>
        </div>
        <div className="text-[11px] text-white font-semibold">MongoDB Compass · cluster0.mongodb.net</div>
      </div>
      <div className="grid grid-cols-[200px_1fr] min-h-[360px]">
        {/* Sidebar */}
        <div className="bg-[#1c2022] text-gray-300 p-2 text-[11px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 px-1">Databases</div>
          <div className="flex items-center gap-1 py-1 px-1 text-white">
            <span className="text-[8px]">▼</span>
            <span>🗃</span>
            <span className="font-semibold">shop</span>
          </div>
          <div className="pl-5 text-gray-400">
            <div className="py-0.5">▸ clientes</div>
            <div className="py-0.5 text-[#00ED64] font-semibold bg-[#00ED64]/10 rounded px-1">▼ pedidos</div>
            <div className="py-0.5">▸ productos</div>
            <div className="py-0.5">▸ resenas</div>
          </div>
          <div className="mt-3 text-[9px] text-gray-500 uppercase tracking-wider mb-1 px-1">Collection</div>
          <div className="px-1 space-y-1 text-[10px]">
            <div className="text-gray-400">Documents <span className="text-white font-mono">1.2k</span></div>
            <div className="text-gray-400">Size <span className="text-white font-mono">480 KB</span></div>
            <div className="text-gray-400">Indexes <span className="text-white font-mono">3</span></div>
          </div>
        </div>
        {/* Main */}
        <div className="flex flex-col bg-white">
          {/* Tabs */}
          <div className="bg-[#f5f6f7] border-b border-gray-200 px-3 flex items-end text-[11px]">
            <div className="px-3 py-1.5 text-gray-500">Documents</div>
            <div className="px-3 py-1.5 border-b-2 border-b-[#00ED64] bg-white font-semibold">Aggregations</div>
            <div className="px-3 py-1.5 text-gray-500">Schema</div>
            <div className="px-3 py-1.5 text-gray-500">Indexes</div>
            <div className="px-3 py-1.5 text-gray-500">Validation</div>
          </div>
          {/* Pipeline stages */}
          <div className="p-3 space-y-2">
            {[
              { stage: '$match', color: '#00ED64', body: `{ fecha: { $gte: ISODate('2026-04-01') } }` },
              { stage: '$group', color: '#3b82f6', body: `{ _id: '$cliente_id', total: { $sum: '$total' }, n: { $sum: 1 } }` },
              { stage: '$sort', color: '#f59e0b', body: `{ total: -1 }` },
              { stage: '$limit', color: '#ec4899', body: `10` },
            ].map((s) => (
              <div key={s.stage} className="rounded border border-gray-200 bg-white overflow-hidden">
                <div className="px-3 py-1 bg-gray-50 border-b border-gray-200 flex items-center gap-2 text-[10px]">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                  <span className="font-mono font-semibold text-gray-700">{s.stage}</span>
                  <span className="ml-auto text-gray-400">STAGE</span>
                </div>
                <div className="px-3 py-2 font-mono text-[10px] text-gray-800">{s.body}</div>
              </div>
            ))}
          </div>
          {/* Output preview */}
          <div className="border-t border-gray-200 bg-[#0f1b0a]/5 px-3 py-2">
            <div className="text-[10px] text-gray-500 mb-1 font-mono">OUTPUT (preview)</div>
            <div className="font-mono text-[10px] text-gray-700 space-y-0.5">
              <div>{'{'} _id: ObjectId(&quot;...42&quot;), total: <span className="text-[#9c27b0]">6480000</span>, n: <span className="text-[#9c27b0]">14</span> {'}'}</div>
              <div>{'{'} _id: ObjectId(&quot;...17&quot;), total: <span className="text-[#9c27b0]">4120000</span>, n: <span className="text-[#9c27b0]">9</span> {'}'}</div>
              <div>{'{'} _id: ObjectId(&quot;...31&quot;), total: <span className="text-[#9c27b0]">3890000</span>, n: <span className="text-[#9c27b0]">7</span> {'}'}</div>
              <div className="text-gray-400">// 10 documents (0.038 s)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========= MOCK: Snowsight =========
function SnowsightMock() {
  return (
    <div className="bg-[#eef2f6] text-gray-800" style={{ minHeight: 400 }}>
      <div className="flex items-center gap-3 px-3 py-2 bg-white border-b border-gray-200">
        <svg width="18" height="18" viewBox="0 0 20 20"><path d="M10 2L12 6L16 6L13 9L14 13L10 11L6 13L7 9L4 6L8 6Z" fill="#29B5E8" /></svg>
        <div className="text-[11px] font-semibold text-gray-700">Snowsight · ACCOUNTADMIN · COMPUTE_WH</div>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Running
        </div>
      </div>
      <div className="grid grid-cols-[180px_1fr]" style={{ minHeight: 360 }}>
        <div className="bg-white border-r border-gray-200 p-2 text-[11px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Databases</div>
          <div className="space-y-0.5">
            <div className="pl-1 text-gray-700">▸ SNOWFLAKE_SAMPLE</div>
            <div className="pl-1 text-gray-800 font-semibold">▼ SHOP_DB</div>
            <div className="pl-4 text-gray-600">▼ PUBLIC</div>
            <div className="pl-7 text-[#29B5E8] font-semibold bg-[#29B5E8]/10 rounded px-1">📊 PEDIDOS_FACT</div>
            <div className="pl-7 text-gray-600">📋 CLIENTES_DIM</div>
            <div className="pl-7 text-gray-600">📋 PRODUCTOS_DIM</div>
          </div>
          <div className="mt-3 text-[9px] text-gray-500 uppercase tracking-wider mb-1">Warehouses</div>
          <div className="text-[10px] space-y-0.5">
            <div className="px-2 py-1 rounded bg-[#29B5E8]/10 text-[#0B5A82] font-semibold">◆ COMPUTE_WH · XS</div>
            <div className="px-2 py-1 text-gray-500">◇ ANALYTICS_WH · L</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="p-3 bg-white border-b border-gray-200 font-mono text-[11px]">
            <div className="text-gray-400">-- Pedidos por mes con window function</div>
            <div><span className="text-[#0B5A82] font-bold">SELECT</span> DATE_TRUNC(<span className="text-[#e91e63]">&apos;month&apos;</span>, fecha) <span className="text-[#0B5A82]">AS</span> mes,</div>
            <div className="pl-4"><span className="text-[#9c27b0]">SUM</span>(total) <span className="text-[#0B5A82]">AS</span> ventas,</div>
            <div className="pl-4"><span className="text-[#9c27b0]">SUM</span>(total) <span className="text-[#0B5A82]">OVER</span> (<span className="text-[#0B5A82]">ORDER BY</span> DATE_TRUNC(<span className="text-[#e91e63]">&apos;month&apos;</span>, fecha)) <span className="text-[#0B5A82]">AS</span> acum</div>
            <div><span className="text-[#0B5A82] font-bold">FROM</span> pedidos_fact</div>
            <div><span className="text-[#0B5A82] font-bold">GROUP BY</span> <span className="text-[#2196f3]">1</span> <span className="text-[#0B5A82]">ORDER BY</span> <span className="text-[#2196f3]">1</span>;</div>
          </div>
          {/* Chart area */}
          <div className="flex-1 bg-white p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-semibold text-gray-700">Ventas acumuladas · 2026</div>
              <div className="flex gap-1 text-[10px]">
                <div className="px-2 py-0.5 rounded bg-gray-100 text-gray-500">Table</div>
                <div className="px-2 py-0.5 rounded bg-[#29B5E8] text-white font-semibold">Chart</div>
              </div>
            </div>
            <svg viewBox="0 0 400 140" className="w-full h-32">
              <defs>
                <linearGradient id="snowflakeArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#29B5E8" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#29B5E8" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid */}
              {[0, 1, 2, 3].map((i) => <line key={i} x1="30" y1={20 + i * 30} x2="395" y2={20 + i * 30} stroke="#e5e7eb" strokeDasharray="2 3" />)}
              {/* Bars (ventas mensuales) */}
              {[60, 45, 80, 50, 90, 65, 75, 85, 55, 95, 70, 100].map((h, i) => (
                <rect key={i} x={35 + i * 30} y={130 - h} width="18" height={h} fill="#29B5E8" opacity="0.3" rx="2" />
              ))}
              {/* Line (acumulado) */}
              <polyline
                points="45,120 75,100 105,80 135,70 165,55 195,45 225,38 255,28 285,22 315,17 345,12 375,8"
                fill="none"
                stroke="#29B5E8"
                strokeWidth="2.5"
              />
              <path
                d="M 45,120 L 75,100 L 105,80 L 135,70 L 165,55 L 195,45 L 225,38 L 255,28 L 285,22 L 315,17 L 345,12 L 375,8 L 375,130 L 45,130 Z"
                fill="url(#snowflakeArea)"
              />
              {/* Labels */}
              {['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                <text key={i} x={45 + i * 30} y="138" fontSize="8" fill="#9ca3af" textAnchor="middle">{m}</text>
              ))}
            </svg>
            <div className="text-[10px] text-gray-500 mt-1 flex gap-3">
              <span>● Ventas mensuales</span>
              <span>— Acumulado</span>
              <span className="ml-auto text-green-600">Query: 0.4 s · 1 credit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========= MOCK: Supabase Studio =========
function SupabaseMock() {
  return (
    <div className="bg-[#1c1c1c] text-gray-200" style={{ minHeight: 400 }}>
      <div className="flex items-center gap-3 px-3 py-2 bg-[#0e0e0e] border-b border-gray-800">
        <div className="w-5 h-5 rounded bg-[#3ECF8E] flex items-center justify-center text-black text-[10px] font-bold">S</div>
        <div className="text-[11px] font-semibold">supabase · shop-api · production</div>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" /> Connected
        </div>
      </div>
      <div className="grid grid-cols-[60px_180px_1fr]" style={{ minHeight: 360 }}>
        {/* Icon sidebar */}
        <div className="bg-[#0e0e0e] border-r border-gray-800 py-3 flex flex-col items-center gap-3 text-lg">
          {[
            { i: '🏠', on: false },
            { i: '📊', on: true },
            { i: '🔐', on: false },
            { i: '📦', on: false },
            { i: '⚡', on: false },
            { i: '🔍', on: false },
            { i: '⚙', on: false },
          ].map((x, i) => (
            <div key={i} className={`w-8 h-8 rounded-md flex items-center justify-center text-sm ${x.on ? 'bg-[#3ECF8E]/20 text-[#3ECF8E]' : 'text-gray-500 hover:text-gray-300'}`}>
              {x.i}
            </div>
          ))}
        </div>
        {/* Table list */}
        <div className="bg-[#1c1c1c] border-r border-gray-800 p-2 text-[11px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-2 px-1">Table Editor</div>
          <div className="space-y-0.5">
            <div className="px-2 py-1 rounded bg-[#3ECF8E]/10 text-[#3ECF8E] font-semibold flex items-center gap-1.5"><span>◇</span> pedidos <span className="ml-auto text-[9px] text-gray-500">1.2k</span></div>
            <div className="px-2 py-1 rounded text-gray-400 flex items-center gap-1.5"><span>◇</span> clientes <span className="ml-auto text-[9px] text-gray-500">340</span></div>
            <div className="px-2 py-1 rounded text-gray-400 flex items-center gap-1.5"><span>◇</span> productos <span className="ml-auto text-[9px] text-gray-500">87</span></div>
            <div className="px-2 py-1 rounded text-gray-400 flex items-center gap-1.5"><span>◇</span> resenas <span className="ml-auto text-[9px] text-gray-500">2.8k</span></div>
          </div>
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-4 mb-1 px-1">Policies (RLS)</div>
          <div className="px-2 py-1 text-[10px] text-gray-400 flex items-center gap-1">
            <span className="text-green-400">●</span> enabled
          </div>
        </div>
        {/* Main */}
        <div className="flex flex-col">
          <div className="px-3 py-2 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#3ECF8E] font-semibold">public.pedidos</span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-400">1,248 rows</span>
            </div>
            <div className="flex gap-1.5 text-[10px]">
              <button className="px-2 py-1 rounded border border-gray-700 text-gray-300">+ Insert row</button>
              <button className="px-2 py-1 rounded bg-[#3ECF8E] text-black font-semibold">Definition</button>
            </div>
          </div>
          <table className="w-full text-[10px]">
            <thead className="bg-[#0e0e0e] text-gray-400">
              <tr>
                {['id', 'cliente_id', 'fecha', 'total', 'estado', 'pais'].map((h) => (
                  <th key={h} className="text-left px-3 py-1.5 border-r border-gray-800 font-mono">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              {[
                [1001, 42, '2026-04-22', 480000, 'pagado', 'CO'],
                [1002, 17, '2026-04-22', 120000, 'pagado', 'MX'],
                [1003, 31, '2026-04-21', 980000, 'pendiente', 'CL'],
                [1004, 42, '2026-04-21', 340000, 'pagado', 'CO'],
                [1005, 55, '2026-04-20', 2340000, 'pagado', 'CO'],
                [1006, 17, '2026-04-20', 190000, 'cancelado', 'MX'],
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-[#1c1c1c]' : 'bg-[#252525]'}>
                  {r.map((c, j) => (
                    <td key={j} className="px-3 py-1.5 border-r border-gray-800/50 text-gray-200">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Realtime strip */}
          <div className="mt-auto px-3 py-2 border-t border-gray-800 bg-[#0e0e0e] flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1.5 text-[#3ECF8E]">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-[#3ECF8E] opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3ECF8E]" />
              </span>
              Realtime ON
            </span>
            <span className="text-gray-500">· pg_notify · channel: pedidos</span>
            <span className="ml-auto text-gray-500">RLS policies: 3 · JWT auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========= MOCK: MongoDB Atlas Search =========
function AtlasSearchMock() {
  return (
    <div className="bg-[#13232f] text-gray-200" style={{ minHeight: 400 }}>
      <div className="flex items-center gap-3 px-3 py-2 bg-[#0a151c] border-b border-[#1a3449]">
        <div className="w-5 h-5 rounded bg-[#00ED64] flex items-center justify-center text-black text-[10px] font-bold">M</div>
        <div className="text-[11px] font-semibold">MongoDB Atlas · Cluster0 · Vector Search</div>
      </div>
      <div className="grid grid-cols-[220px_1fr]" style={{ minHeight: 360 }}>
        <div className="bg-[#0e1a24] border-r border-[#1a3449] p-2 text-[11px]">
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 px-1">Search Indexes</div>
          <div className="px-2 py-1.5 rounded bg-[#00ED64]/10 text-[#00ED64] text-[10px]">
            <div className="font-semibold">products_vector</div>
            <div className="text-gray-500 text-[9px]">vectorSearch · 1536 dims · cosine</div>
          </div>
          <div className="px-2 py-1.5 rounded text-gray-400 text-[10px] mt-1">
            <div>products_text</div>
            <div className="text-gray-500 text-[9px]">search · lucene</div>
          </div>
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mt-3 mb-1 px-1">Stats</div>
          <div className="px-2 text-[10px] space-y-0.5 text-gray-400">
            <div>Documents <span className="text-white">124,380</span></div>
            <div>Index size <span className="text-white">780 MB</span></div>
            <div>Build time <span className="text-white">~2 min</span></div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="p-3 border-b border-[#1a3449]">
            <div className="text-[11px] text-gray-400 mb-1 font-mono">Semantic query</div>
            <div className="bg-[#0a151c] border border-[#1a3449] rounded px-3 py-2 text-[12px] font-mono text-[#00ED64]">
              &quot;audífonos con buena cancelación de ruido para trabajar&quot;
            </div>
          </div>
          <div className="p-3 bg-[#0a151c] font-mono text-[10px] border-b border-[#1a3449]">
            <div className="text-gray-500">// Aggregation pipeline</div>
            <div>{'{'}</div>
            <div className="pl-3"><span className="text-[#00ED64]">$vectorSearch</span>: {'{'}</div>
            <div className="pl-6">index: <span className="text-[#fbbf24]">&apos;products_vector&apos;</span>,</div>
            <div className="pl-6">path: <span className="text-[#fbbf24]">&apos;embedding&apos;</span>,</div>
            <div className="pl-6">queryVector: [<span className="text-[#60a5fa]">0.12, -0.88, 0.45, ...</span>],</div>
            <div className="pl-6">numCandidates: <span className="text-[#a78bfa]">200</span>,</div>
            <div className="pl-6">limit: <span className="text-[#a78bfa]">5</span></div>
            <div className="pl-3">{'}'}</div>
            <div>{'}'}</div>
          </div>
          <div className="flex-1 p-3">
            <div className="text-[10px] text-gray-500 mb-2">RESULTS · sorted by similarity</div>
            <div className="space-y-1.5">
              {[
                { t: 'Sony WH-1000XM5 Wireless', score: 0.94, cat: 'Audio' },
                { t: 'Bose QuietComfort 45', score: 0.91, cat: 'Audio' },
                { t: 'Apple AirPods Pro 2', score: 0.88, cat: 'Audio' },
                { t: 'Sennheiser Momentum 4', score: 0.85, cat: 'Audio' },
                { t: 'Anker Space Q45', score: 0.78, cat: 'Audio' },
              ].map((r, i) => (
                <div key={i} className="rounded bg-[#0e1a24] border border-[#1a3449] px-3 py-1.5 flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#00ED64]/20 flex items-center justify-center text-[10px] text-[#00ED64] font-bold">{i + 1}</div>
                  <div className="flex-1 text-[11px] text-white">{r.t}</div>
                  <div className="text-[10px] text-gray-500">{r.cat}</div>
                  <div className="w-24 h-1.5 rounded-full bg-[#1a3449] overflow-hidden">
                    <div className="h-full bg-[#00ED64]" style={{ width: `${r.score * 100}%` }} />
                  </div>
                  <div className="text-[10px] font-mono text-[#00ED64] w-10 text-right">{r.score.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========= MOCK: Redis Insight =========
function RedisInsightMock() {
  return (
    <div className="bg-[#1c1b20] text-gray-200" style={{ minHeight: 400 }}>
      <div className="flex items-center gap-3 px-3 py-2 bg-[#0c0b0f] border-b border-gray-800">
        <div className="w-5 h-5 rounded bg-[#DC382D] flex items-center justify-center">
          <div className="text-white text-[11px] font-black">R</div>
        </div>
        <div className="text-[11px] font-semibold">Redis Insight · localhost:6379 · db0</div>
        <div className="ml-auto text-[10px] text-gray-400">1.8 MB / 2 GB · 1,240 keys</div>
      </div>
      <div className="grid grid-cols-[200px_1fr] min-h-[360px]">
        <div className="bg-[#14131a] border-r border-gray-800 p-2 text-[11px]">
          <div className="px-2 py-1 rounded border border-gray-700 flex items-center gap-2 mb-2">
            <span className="text-gray-500">🔍</span>
            <span className="text-gray-500 text-[10px]">session:*</span>
          </div>
          <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">Key Tree</div>
          <div className="space-y-0.5 text-[10px]">
            {[
              { k: 'session:user:42', t: 'HASH', color: '#fbbf24', on: true },
              { k: 'session:user:17', t: 'HASH', color: '#fbbf24' },
              { k: 'cart:42', t: 'JSON', color: '#a78bfa' },
              { k: 'rate:api:42', t: 'STRING', color: '#60a5fa' },
              { k: 'leaderboard:daily', t: 'ZSET', color: '#34d399' },
              { k: 'queue:emails', t: 'STREAM', color: '#f87171' },
            ].map((x) => (
              <div key={x.k} className={`px-2 py-1 rounded flex items-center gap-2 ${x.on ? 'bg-[#DC382D]/10 text-white' : 'text-gray-400'}`}>
                <span className="px-1 py-0.5 rounded text-[8px] font-mono font-bold" style={{ background: `${x.color}22`, color: x.color }}>{x.t}</span>
                <span className="truncate">{x.k}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-3 py-2 border-b border-gray-800">
            <div className="text-[11px] text-[#DC382D] font-semibold">session:user:42 <span className="text-gray-500">· HASH · TTL 1h 23m</span></div>
          </div>
          <div className="p-3 border-b border-gray-800">
            <table className="w-full text-[10px]">
              <thead className="text-gray-500">
                <tr>
                  <th className="text-left py-1">field</th>
                  <th className="text-left py-1">value</th>
                </tr>
              </thead>
              <tbody className="font-mono text-gray-200">
                {[
                  ['user_id', '42'],
                  ['email', 'maria@correo.co'],
                  ['role', 'admin'],
                  ['last_seen', '2026-04-22T14:32:10Z'],
                  ['device', 'iPhone · iOS 19.2'],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-gray-800">
                    <td className="py-1 text-[#DC382D]">{r[0]}</td>
                    <td className="py-1">{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1 p-3 bg-[#0c0b0f] font-mono text-[10px]">
            <div className="text-gray-500 mb-1">// CLI</div>
            <div className="text-gray-300">127.0.0.1:6379&gt; <span className="text-[#fbbf24]">HGETALL</span> session:user:42</div>
            <div className="text-[#60a5fa] pl-4">1) &quot;user_id&quot; 2) &quot;42&quot;</div>
            <div className="text-[#60a5fa] pl-4">3) &quot;email&quot; 4) &quot;maria@correo.co&quot;</div>
            <div className="text-[#60a5fa] pl-4">...</div>
            <div className="text-gray-300 mt-2">127.0.0.1:6379&gt; <span className="text-[#fbbf24]">EXPIRE</span> session:user:42 3600</div>
            <div className="text-[#34d399] pl-4">(integer) 1</div>
            <div className="text-gray-500 mt-1">· Ping 0.3 ms · Ops/sec: 12,480</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Lógica unificada: la revelación ----

function LogicaUnificada() {
  const ops = [
    { op: 'Guardar algo nuevo', sql: 'INSERT INTO ...', mongo: 'insertOne({...})', redis: 'SET key val', graph: 'CREATE (n:Node)' },
    { op: 'Leer por clave', sql: 'SELECT ... WHERE id=7', mongo: 'findOne({_id: 7})', redis: 'GET key', graph: 'MATCH (n {id: 7})' },
    { op: 'Actualizar un campo', sql: 'UPDATE ... SET ...', mongo: 'updateOne({$set:...})', redis: 'HSET key f v', graph: 'SET n.prop = v' },
    { op: 'Borrar', sql: 'DELETE FROM ...', mongo: 'deleteOne({...})', redis: 'DEL key', graph: 'DELETE n' },
    { op: 'Filtrar un conjunto', sql: 'WHERE pais = ...', mongo: '{ pais: ... }', redis: 'SCAN + MATCH', graph: 'WHERE n.pais = ...' },
    { op: 'Agregar / agrupar', sql: 'GROUP BY + SUM', mongo: '$group + $sum', redis: 'ZINCRBY + ZRANGE', graph: 'RETURN count(n)' },
  ];
  return (
    <Card>
      <h3 className="text-base font-bold text-[var(--text-heading)] mb-1">
        La matriz de operaciones: lo que importa aprender
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        6 operaciones. 4 paradigmas. Distinto vestido, mismos huesos. Esta tabla es el mapa mental que
        hay que llevarse.
      </p>
      <div className="overflow-x-auto rounded-xl border border-[var(--border-color)]">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-[var(--bg-tertiary)]">
              <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">Operación</th>
              <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider" style={{ color: '#336791' }}>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#336791' }} />SQL</div>
              </th>
              <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider" style={{ color: '#00ED64' }}>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ED64' }} />MongoDB</div>
              </th>
              <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider" style={{ color: '#DC382D' }}>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#DC382D' }} />Redis</div>
              </th>
              <th className="text-left px-3 py-2.5 text-[10px] uppercase tracking-wider" style={{ color: '#4d8fff' }}>
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4d8fff' }} />Cypher (grafo)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {ops.map((r, i) => (
              <tr key={r.op} className={i % 2 === 0 ? 'bg-[var(--bg-card)]' : ''}>
                <td className="px-3 py-2.5 font-semibold text-[var(--text-heading)]">{r.op}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-[var(--text-body)]">{r.sql}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-[var(--text-body)]">{r.mongo}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-[var(--text-body)]">{r.redis}</td>
                <td className="px-3 py-2.5 font-mono text-[11px] text-[var(--text-body)]">{r.graph}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout kind="info" title="El único concepto que de verdad hay que dominar">
        <strong>Clave → valor.</strong> Toda base de datos, por más sofisticada que parezca, almacena algo
        bajo una identidad y te deja traerlo de vuelta. Lo que cambia es la forma del "algo" (fila, documento,
        vector, nodo) y las herramientas que te da para filtrarlo, combinarlo y resumirlo.
      </Callout>
    </Card>
  );
}
