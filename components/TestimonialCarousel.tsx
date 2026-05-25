'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { TestimonialItem } from '@/data/testimonials';

interface Props {
  testimonials: TestimonialItem[];
}

export default function TestimonialCarousel({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, testimonials.length]);

  const nextSlide = () => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (!testimonials || testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0
      };
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-12">
      {/* Testimonial Container */}
      <div className="relative h-[350px] sm:h-[300px] overflow-hidden rounded-[2rem] bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center p-8 md:p-12 shadow-sm">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 md:p-16 w-full h-full"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="font-body-lg text-lg md:text-xl text-on-surface mb-8 italic max-w-2xl leading-relaxed">
              &quot;{testimonials[currentIndex].text}&quot;
            </blockquote>

            {/* Author Info */}
            <div>
              <div className="font-headline-sm text-base md:text-lg mb-1">{testimonials[currentIndex].name}</div>
              <div className="font-label-md text-sm text-on-surface-variant uppercase tracking-widest">{testimonials[currentIndex].role}</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface text-on-surface rounded-full flex items-center justify-center shadow-md border border-outline-variant/30 hover:bg-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary z-10 hidden sm:flex"
        aria-label="Vorherige Bewertung"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface text-on-surface rounded-full flex items-center justify-center shadow-md border border-outline-variant/30 hover:bg-surface-variant hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary z-10 hidden sm:flex"
        aria-label="Nächste Bewertung"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === i ? 'bg-secondary w-8' : 'bg-outline-variant/50 hover:bg-outline-variant'
            }`}
            aria-label={`Gehe zu Bewertung ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
