'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import AIAdvisor from '@/components/AIAdvisor';
import { useBooking } from '@/components/providers/BookingProvider';

interface HeroSectionProps {
  label?: string;
  title?: string;
  description?: string;
  benefits?: { title: string; description: string }[];
  primaryButtonText?: string;
  primaryButtonHref?: string;
  backgroundImageUrl?: string;
  showAIAdvisor?: boolean;
}

export default function HeroSection({
  label = "Schweizer Handwerk & KI",
  title = "Ihr Parkett in Meisterhänden.",
  description = "Professionelle Parkettpflege mit modernster KI-Technik für eine sofortige Kostenschätzung. Präzision, die man sieht.",
  benefits = [
    { title: "KI-Analyse", description: "Sofortige Schadens- und Holzarten-Erkennung." },
    { title: "Staubfrei-Garantie", description: "Modernste Absaugtechnik für Ihr Zuhause." }
  ],
  primaryButtonText = "Unsere Leistungen",
  primaryButtonHref = "/parkettpflege",
  backgroundImageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCeQlyl_ZrejbSyV0FunoFKwjkjKCeGvMY0CVKnU_4UOB-wMPEUFxPaEpuoEiEPlWTqsHRBHt7RBIBjGD_V9XVd4aaNOhqW5kra7KEBuMWuKXU0Z93pk65SyPuGBA6koofeZTFytJWKy-XVBRKOQhaNR1AaiRM03RDkyrXRExayAqviHQUWUtMh6bKKjZ_v37zZ8R9kqqSpWXjLJjqVOHcVYyASFJLbqlMprHcV1j-0N1QFmNPc9znpBaYlzZEESAebodotlZOmU",
  showAIAdvisor = true
}: HeroSectionProps) {
  const { openBooking } = useBooking();

  return (
    <section className="relative min-h-[850px] flex items-center py-16" id="ai-analysis">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
            src={backgroundImageUrl} 
            alt="Hero background"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 wood-gradient"></div>
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] light-leak blur-[100px] rounded-full pointer-events-none"></div>
      </div>
      
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max-width mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Hero Content (Left) */}
          <div className="text-white">
            <span className="text-secondary-fixed font-label-md text-label-md tracking-widest uppercase mb-4 block">
              {label}
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
                {title}
            </h1>
            <p className="font-body-lg text-body-lg mb-8 text-white/90 max-w-xl">
                {description}
            </p>
            {benefits && benefits.length > 0 && (
              <div className="space-y-6 mb-10 hidden md:block">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="text-secondary-fixed w-6 h-6 shrink-0" />
                    <div>
                        <h4 className="font-label-md text-label-md mb-1">{benefit.title}</h4>
                        <p className="font-caption text-caption text-white/70">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
                <a className="border border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-label-md text-label-md text-center hover:bg-white/10 transition-all inline-block" href={primaryButtonHref}>
                    {primaryButtonText}
                </a>
            </div>
          </div>
          
          {/* AI Tool (Right) */}
          {showAIAdvisor && (
            <div className="relative animate-in slide-in-from-right-10 duration-1000 z-20">
              <AIAdvisor onOpenBooking={(diagnosis) => { openBooking(diagnosis); }} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
