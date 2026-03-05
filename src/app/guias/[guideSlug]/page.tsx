import Link from 'next/link';

const guidesContent: Record<string, { title: string; intro: string; steps: { title: string; content: string; code?: string }[] }> = {
  'pensar-antes-de-escribir': {
    title: 'Pensar Antes de Escribir SQL',
    intro: 'Los mejores cientificos de datos no empiezan escribiendo codigo. Empiezan pensando. Esta guia te ensena una metodologia de 5 pasos que transforma como abordas cualquier problema SQL.',
    steps: [
      {
        title: 'Paso 1: Entender el problema',
        content: 'Antes de tocar el teclado, preguntate: Que pregunta estoy respondiendo? Quien necesita esta informacion? Cual es la decision que depende de este dato? Escribe la pregunta en lenguaje natural antes de pensar en SQL.',
      },
      {
        title: 'Paso 2: Identificar las tablas',
        content: 'Que tablas contienen los datos que necesitas? Dibuja mentalmente (o fisicamente) las relaciones. Cuales son las claves que las conectan?',
      },
      {
        title: 'Paso 3: Visualizar el resultado',
        content: 'Imagina la tabla resultado antes de escribir. Cuantas columnas tendra? Que representara cada fila? Esto te dice que necesitas en SELECT y como agrupar.',
      },
      {
        title: 'Paso 4: Construir incrementalmente',
        content: 'No escribas toda la consulta de una vez. Empieza con un SELECT basico, ejecuta, verifica. Agrega JOIN, ejecuta, verifica. Agrega WHERE, ejecuta, verifica. Cada paso te acerca al resultado.',
        code: '-- Paso 1: Ver los datos base\nSELECT * FROM estudiantes LIMIT 5;\n\n-- Paso 2: Agregar JOIN\nSELECT e.nombre, d.nombre AS depto\nFROM estudiantes e\nJOIN departamentos d ON e.departamento_id = d.id\nLIMIT 5;\n\n-- Paso 3: Agregar filtro y agrupacion\nSELECT d.nombre, COUNT(*), ROUND(AVG(e.promedio), 2)\nFROM estudiantes e\nJOIN departamentos d ON e.departamento_id = d.id\nGROUP BY d.nombre\nORDER BY AVG(e.promedio) DESC;',
      },
      {
        title: 'Paso 5: Validar y comunicar',
        content: 'Verifica que el resultado tiene sentido. Los numeros son razonables? Hay NULLs inesperados? Finalmente, nombra tus columnas con alias claros para que cualquier persona entienda el resultado.',
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
        <h1 className="text-xl text-[var(--text-heading)] mb-2">Guia en desarrollo</h1>
        <p className="text-sm text-[var(--text-muted)] mb-4">Esta guia estara disponible proximamente.</p>
        <Link href="/guias" className="text-sm text-[var(--accent-blue)] hover:underline">
          Volver a Guias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/guias" className="text-sm text-[var(--accent-blue)] hover:underline mb-4 block">
        &larr; Volver a Guias
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
