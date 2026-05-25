'use client';

import React, { createContext, useContext, useState } from 'react';
import BookingModal from '@/components/BookingModal';

interface BookingContextType {
  openBooking: (diagnosis?: any) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const openBooking = (aiDiagnosis?: any) => {
    if (aiDiagnosis) setDiagnosis(aiDiagnosis);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
    setTimeout(() => setDiagnosis(null), 300); // Clear after animation
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <BookingModal isOpen={isOpen} onClose={closeBooking} aiDiagnosis={diagnosis} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
