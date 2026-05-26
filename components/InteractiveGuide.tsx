'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, AlertTriangle, Package, ExternalLink } from 'lucide-react';
import { Product } from '@/data/products';
import { servicePackages } from '@/data/packages';
import { useBooking } from '@/components/providers/BookingProvider';
import Image from 'next/image';
import { useEffect } from 'react';

const QUESTIONS = [
  {
    id: 'woodType',
    question: 'Welche Holzart hat Ihr Parkett?',
    options: [
      { label: 'Eiche', value: 'eiche' },
      { label: 'Buche oder Ahorn (Helles Holz)', value: 'buche_ahorn' },
      { label: 'Nussbaum (Dunkles Holz)', value: 'nussbaum' },
      { label: 'Weiss nicht / Andere', value: 'andere' },
    ]
  },
  {
    id: 'age',
    question: 'Wie alt ist das Parkett ungefähr (bzw. die letzte Überarbeitung)?',
    options: [
      { label: '0 - 5 Jahre', value: 'neu' },
      { label: '5 - 15 Jahre', value: 'mittel' },
      { label: 'Über 15 Jahre', value: 'alt' },
    ]
  },
  {
    id: 'usage',
    question: 'Wie stark wird der Boden beansprucht?',
    options: [
      { label: 'Gering (z.B. Schlafzimmer)', value: 'gering' },
      { label: 'Normal (z.B. Wohnzimmer)', value: 'normal' },
      { label: 'Stark (z.B. Flur, Eingang, Gewerbe)', value: 'stark' },
      { label: 'Haustiere vorhanden', value: 'haustiere' },
    ]
  },
  {
    id: 'damage',
    question: 'Welche Schäden oder Abnutzungserscheinungen sehen Sie?',
    options: [
      { label: 'Keine, möchte nur pflegen', value: 'keine' },
      { label: 'Oberflächliche, feine Kratzer', value: 'fein' },
      { label: 'Tiefe Kratzer / Dellen', value: 'tief' },
      { label: 'Wasserschäden / Dunkle Flecken', value: 'wasser' },
      { label: 'Matter Glanz / Deutliche Laufstrassen', value: 'laufstrassen' },
    ]
  }
];

export default function InteractiveGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { openBooking } = useBooking();
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => setAllProducts(data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const isAnswered = !!answers[currentQuestion.id];

  const generateRecommendations = () => {
    const damage = answers.damage;
    const usage = answers.usage;
    const wood = answers.woodType;
    const age = answers.age;
    
    let recommendation = {
      title: 'Ihre persönliche Pflege- & Reparaturempfehlung',
      cleaning: 'Verwenden Sie eine ph-neutrale Holzbodenseife oder speziellen Parkettreiniger ohne aggressive Zusätze. Wischen Sie nur nebelfeucht.',
      care: 'Regelmässiges Auffrischen mit passendem Pflegeöl oder Polish (bei lackierten Böden) alle 6-12 Monate.',
      repair: '',
      service: 'Parkett Refresh',
      packageId: 'parkett-refresh',
      serviceLink: '#services'
    };

    if (damage === 'tief' || damage === 'wasser') {
      recommendation.title = 'Professionelle Aufbereitung empfohlen';
      recommendation.repair = 'Tiefe Kratzer und Wasserschäden können selten durch oberflächliche Pflege behoben werden. Ein partielles oder vollständiges Abschleifen ist erforderlich.';
      recommendation.service = 'Parkett Renovation';
      recommendation.packageId = 'parkett-renovation';
      recommendation.care = 'Nach dem Schleifen empfiehlt sich bei Ihrer Beanspruchung (' + (usage === 'stark' || usage === 'haustiere' ? 'Hohe Beanspruchung' : 'Normale Beanspruchung') + ') eine widerstandsfähige 2K-Versiegelung oder ein High-Solid-Öl.';
    } else if (damage === 'laufstrassen') {
      recommendation.title = 'Intensivreinigung & Neuaufbau';
      recommendation.repair = 'Laufstrassen deuten auf eine abgenutzte Schutzschicht hin. Oft reicht eine maschinelle Intensivreinigung mit anschliessender Neu-Ölung aus, ohne tief schleifen zu müssen.';
      recommendation.service = 'Parkett Intensiv';
      recommendation.packageId = 'parkett-intensiv';
    } else if (damage === 'fein') {
       recommendation.repair = 'Feine Kratzer lassen sich oft gut mit Polierpads und einem geeigneten Auffrischungs-Öl oder Refresher kaschieren.';
    } else if (damage === 'keine') {
       recommendation.repair = 'Ihr Boden ist gut in Schuss! Fokussieren Sie sich auf Werterhalt durch regelmässige, korrekte Reinigung.';
    }

    if (wood === 'buche_ahorn') {
       recommendation.cleaning += ' Wichtig bei Buche & Ahorn: Vermeiden Sie stehende Nässe absolut, da diese Hölzer sehr stark auf Feuchtigkeit reagieren und quellen.';
    }

    if (age === 'alt' && (damage === 'tief' || damage === 'wasser')) {
       recommendation.repair += ' Da Ihr Boden bereits älter ist, raten wir zu einer professionellen Begutachtung. Wir messen die verbleibende Holznutzschicht, um sicherzustellen, dass noch genug Material für einen Abschliff vorhanden ist.';
    }

    return recommendation;
  };

  const recommendedProducts = showResult ? allProducts.filter(product => {
    const matchesWood = product.suitableFor.woodTypes.includes('alle') || product.suitableFor.woodTypes.includes(answers.woodType);
    const matchesDamage = product.suitableFor.damageTypes.includes('alle') || product.suitableFor.damageTypes.includes(answers.damage);
    return matchesWood && matchesDamage;
  }) : [];

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] border border-outline-variant/30 overflow-hidden shadow-sm">
      <div className="p-8 md:p-12 relative h-full flex flex-col justify-center">
        
        {!showResult ? (
          <div>
            <div className="mb-8">
              <span className="text-secondary font-label-md text-[10px] tracking-widest uppercase mb-2 block">Interaktiver Parkett-Ratgeber</span>
              <h3 className="font-headline-sm text-2xl md:text-headline-sm">Frage {currentStep + 1} von {QUESTIONS.length}</h3>
              
              {/* Progress Bar */}
              <div className="w-full bg-surface-variant h-1.5 rounded-full mt-6 overflow-hidden">
                <div 
                  className="bg-secondary h-full transition-all duration-500 ease-out"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[200px]"
              >
                <h4 className="font-headline-sm text-xl mb-6">{currentQuestion.question}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelect(currentQuestion.id, option.value)}
                      className={`text-left px-5 py-4 rounded-xl border transition-all ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-secondary bg-secondary/5 text-on-surface ring-1 ring-secondary'
                          : 'border-outline-variant/50 bg-surface hover:border-secondary/50 hover:bg-surface-variant/50 text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      <span className="font-label-md text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-outline-variant/30">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Zurück
              </button>
              
              <button
                onClick={handleNext}
                disabled={!isAnswered}
                className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-lg font-label-md text-xs uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {currentStep === QUESTIONS.length - 1 ? 'Zur Analyse' : 'Weiter'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full"
          >
            {(() => {
              const rec = generateRecommendations();
              return (
                <>
                  <div className="mb-8">
                    <span className="text-secondary font-label-md text-[10px] tracking-widest uppercase mb-2 block">Ihre Diagnose</span>
                    <h3 className="font-headline-sm text-2xl md:text-[28px] mb-3">{rec.title}</h3>
                    <p className="text-on-surface-variant font-body-sm text-sm">Basierend auf Ihren Angaben haben wir folgende Empfehlungen für Ihren Parkettboden zusammengestellt.</p>
                  </div>

                  <div className="space-y-4 flex-grow mb-8">
                    {/* Reinigung & Pflege */}
                    <div className="bg-surface rounded-xl p-5 border border-outline-variant/30 flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-label-md text-sm uppercase tracking-widest mb-1.5 font-bold">Basis Empfehlung</h4>
                        <p className="font-body-sm text-sm text-on-surface-variant mb-2">{rec.cleaning}</p>
                        <p className="font-body-sm text-sm text-on-surface-variant">{rec.care}</p>
                      </div>
                    </div>

                    {/* Reparatur */}
                    {rec.repair && (
                      <div className="bg-surface rounded-xl p-5 border border-outline-variant/30 flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                          <AlertTriangle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-label-md text-sm uppercase tracking-widest mb-1.5 font-bold">Reparatur-Hinweis</h4>
                          <p className="font-body-sm text-sm text-on-surface-variant">{rec.repair}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NEU: Produktempfehlungen */}
                  {recommendedProducts.length > 0 && (
                    <div className="mb-10">
                      <h4 className="font-headline-sm text-lg mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-secondary" /> 
                        Unsere Produktempfehlungen für Ihren Boden
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {recommendedProducts.map(product => (
                          <div key={product.id} className="bg-surface rounded-xl border border-outline-variant/30 p-4 flex flex-col group hover:shadow-md transition-shadow">
                             <div className="flex gap-4 items-start mb-3">
                               <div className="w-16 h-16 relative rounded-lg overflow-hidden shrink-0 bg-surface-container-lowest border border-outline-variant/20">
                                 <Image src={product.imageUrl} alt={product.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                               </div>
                               <div>
                                 <span className="text-[10px] uppercase tracking-wider text-secondary font-bold mb-1 block">{product.category}</span>
                                 <h5 className="font-medium text-sm leading-tight">{product.name}</h5>
                               </div>
                             </div>
                             <p className="text-xs text-on-surface-variant mb-4 flex-grow">{product.shortDescription}</p>
                             
                             <button className="w-full text-xs font-label-md uppercase tracking-widest font-bold text-secondary bg-secondary/5 hover:bg-secondary/10 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                               Produkt ansehen <ExternalLink className="w-3 h-3" />
                             </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-outline-variant/30 gap-4">
                     <button
                        onClick={() => {
                          setCurrentStep(0);
                          setAnswers({});
                          setShowResult(false);
                        }}
                        className="font-label-md text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" /> Neu starten
                      </button>

                    <button 
                      onClick={() => openBooking({ service: rec.service })}
                      className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-xl font-label-md text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Profi-Service anfragen <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}
