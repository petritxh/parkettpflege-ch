import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import CTABanner from '@/components/sections/CTABanner';
import { homepageContent } from '@/data/homepage-content';

export const metadata: Metadata = {
  title: 'Parkett-Blog & Ratgeber | Tipps, Trends & Pflege | parkett-pflege.ch',
  description: 'Fachartikel und Anleitungen zur Parkettpflege im Raum Zürich. Erfahren Sie, wie Sie Wasserflecken entfernen, Kratzer reparieren und Ihr Parkett richtig pflegen.',
  alternates: {
    canonical: 'https://parkett-pflege.ch/blog',
  },
};

export default function BlogPage() {
  const guides = homepageContent.guides.list;
  const problems = homepageContent.problemCases.list;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Parkett-Blog von parkett-pflege.ch',
    description: 'Fachberichte, Pflegeanleitungen und Lösungen für typische Parkettprobleme im Raum Zürich.',
    publisher: {
      '@type': 'LocalBusiness',
      name: 'Parkett-Pflege.ch',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU'
    },
    blogPost: [
      ...guides.map((g) => ({
        '@type': 'BlogPosting',
        headline: g.title,
        description: g.text,
        url: `https://parkett-pflege.ch${g.href}`,
      })),
      ...problems.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.text,
        url: `https://parkett-pflege.ch${p.href}`,
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection 
        label="Parkett-Wissen"
        title="Parkett-Blog: Tipps, Trends & Werterhalt"
        description="Fundiertes Fachwissen, verständliche Anleitungen und bewährte Praxistipps von Schweizer Parkett-Experten. Lernen Sie, wie Sie Ihren edlen Holzboden dauerhaft schützen und aufbereiten."
        backgroundImageUrl={undefined}
        showAIAdvisor={true}
        primaryButtonText="Kostenrechner nutzen"
        primaryButtonHref="/tools/parkett-kostenrechner"
      />

      {/* Breadcrumbs */}
      <nav className="py-4 px-margin-mobile md:px-margin-desktop bg-surface border-b border-outline-variant/30 text-xs max-w-container-max-width mx-auto">
        <div className="flex gap-2 text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <span>/</span>
          <span className="text-on-surface font-medium">Blog</span>
        </div>
      </nav>

      {/* Main Grid Section */}
      <section className="py-16 md:py-24 bg-surface text-on-surface">
        <div className="max-w-container-max-width mx-auto px-margin-mobile md:px-margin-desktop space-y-16">
          
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline-md text-3xl font-bold">Wissen für den perfekten Werterhalt</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Ein Parkettboden erzählt Geschichten und hat Seele. Damit die Oberfläche über Jahre hinweg schön und strapazierfähig bleibt, bedarf es der richtigen Pflege. In unserem Blog finden Sie ausführliche Berichte zu den wichtigsten Themen – von der schnellen Hilfe bei akuten Wasserflecken bis zum fundierten Vergleich zwischen Ölen und Versiegeln.
            </p>
          </div>

          {/* Guides Section */}
          <div className="space-y-8">
            <h2 className="font-headline-sm text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Exklusive Ratgeber & Anleitungen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] hover:border-secondary/20"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest block">Ratgeber</span>
                    <h3 className="font-headline-sm text-xl font-bold text-on-surface">{item.title}</h3>
                    <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">{item.text}</p>
                  </div>
                  <div className="pt-6 border-t border-outline-variant/10 mt-6">
                    <Link 
                      href={item.href}
                      className="inline-flex items-center gap-1.5 font-bold text-sm text-primary hover:text-primary-hover group"
                    >
                      <span>Artikel lesen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Cases Section */}
          <div className="space-y-8 pt-8">
            <h2 className="font-headline-sm text-2xl font-bold text-on-surface border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Häufige Parkettprobleme & Lösungen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-6 border border-outline-variant/30 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:border-secondary/20"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] text-secondary font-bold uppercase tracking-widest block">Problemfall</span>
                    <h3 className="font-headline-sm text-lg font-bold text-on-surface">{item.title}</h3>
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{item.text}</p>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/10 mt-4">
                    <Link 
                      href={item.href}
                      className="inline-flex items-center gap-1 font-bold text-xs text-primary hover:text-primary-hover group"
                    >
                      <span>Lösung ansehen</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <CTABanner />
    </>
  );
}
