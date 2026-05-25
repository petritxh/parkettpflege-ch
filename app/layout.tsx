import type {Metadata} from 'next';
import { Manrope, EB_Garamond } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
});

export const metadata: Metadata = {
  title: 'Parkettpflege.ch | Die führende Plattform für Parkett in der Schweiz',
  description: 'Professionelle Parkettpflege, Reinigung, Schleifen, Ölen & Reparaturen in Zürich, Zug, Luzern. AI-gestützte Beratung für makellose Holzböden.',
  openGraph: {
    title: 'Parkettpflege.ch | Die führende Plattform für Parkett',
    description: 'Professionelle Parkettpflege, Reinigung, Schleifen, Ölen & Reparaturen in Zürich, Zug, Luzern. AI-gestützte Beratung für makellose Holzböden.',
    url: 'https://parkett-pflege.ch',
    siteName: 'Parkettpflege.ch',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU',
        width: 1200,
        height: 630,
        alt: 'Perfekt aufbereitetes Parkett',
      },
    ],
    locale: 'de_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parkettpflege.ch | Die Plattform für Parkett',
    description: 'Professionelle Parkettpflege, Reinigung, Schleifen, Ölen in der Schweiz.',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="de" className={`${manrope.variable} ${ebGaramond.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans antialiased text-on-surface bg-background" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
