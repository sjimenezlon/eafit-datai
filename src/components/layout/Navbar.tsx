'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Inicio', icon: '&#x2302;' },
  { href: '/lecciones', label: 'Lecciones', icon: '&#x1F4DA;' },
  { href: '/laboratorio', label: 'Laboratorio', icon: '&#x2318;' },
  { href: '/glosario', label: 'Glosario', icon: '&#x1F4D6;' },
  { href: '/plataformas', label: 'Plataformas', icon: '&#x2601;' },
  { href: '/dialectos', label: 'Dialectos', icon: '&#x21C6;' },
  { href: '/guias', label: 'Guías', icon: '&#x1F9ED;' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-secondary)]/95 backdrop-blur-sm border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-sm">
              D
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[var(--text-heading)] leading-tight">
                Eafit - DatAI
              </span>
              <span className="text-[10px] text-[var(--text-muted)] leading-tight">
                SQL &amp; Bases de Datos
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
                    ${isActive
                      ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-body)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-body)] cursor-pointer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-3 border-t border-[var(--border-color)] pt-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm transition-all
                    ${isActive
                      ? 'bg-[var(--accent-blue)]/15 text-[var(--accent-blue)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-body)]'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
