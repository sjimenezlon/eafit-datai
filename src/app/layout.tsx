import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eafit - DatAI | SQL & Bases de Datos',
  description:
    'Plataforma interactiva para aprender SQL y Sistemas de Gestion de Bases de Datos. Practica con datos reales, lecciones progresivas y pensamiento de cientifico de datos.',
  keywords: ['SQL', 'bases de datos', 'SGBD', 'EAFIT', 'aprender SQL', 'data science'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-56px)]">{children}</main>
      </body>
    </html>
  );
}
