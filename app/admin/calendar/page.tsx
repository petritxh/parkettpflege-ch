'use client';

import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/lib/types/crm';
import { Loader2, Calendar as CalendarIcon, Clock, CheckCircle2, XCircle, ChevronRight, AlertCircle, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/admin/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CalendarEvent['status']) => {
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setEvents(events.map(e => e.id === id ? { ...e, status: newStatus } : e));
      }
    } catch (e) {
      alert('Fehler beim Aktualisieren.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eintrag wirklich löschen?')) return;
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setEvents(events.filter(e => e.id !== id));
      }
    } catch (e) {
      alert('Fehler beim Löschen.');
    }
  };

  const getStatusColor = (status: CalendarEvent['status']) => {
    switch(status) {
      case 'Geplant': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Abgeschlossen': return 'bg-green-100 text-green-700 border-green-200';
      case 'Storniert': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>;
  }

  // Gruppiere nach Datum
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  const sortedDates = Object.keys(groupedEvents).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="max-w-4xl space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Auftrags-Kalender</h1>
          <p className="text-gray-500">Ihre gebuchten und geplanten Parkett-Arbeiten in der Übersicht.</p>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
          <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900">Noch keine Termine</h3>
          <p className="text-gray-500 mt-2">Wenn Kunden Offerten annehmen, erscheinen die Aufträge automatisch hier.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sortedDates.map((date) => {
            const dateObj = new Date(date);
            const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
            const isToday = date === new Date().toISOString().split('T')[0];
            
            return (
              <motion.div 
                key={date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
              >
                <div className={`px-6 py-4 border-b border-gray-100 flex items-center gap-3 ${isToday ? 'bg-primary/5' : 'bg-gray-50'}`}>
                  <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold ${isToday ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-900 shadow-sm'}`}>
                    <span className="text-xs font-normal uppercase tracking-widest opacity-80 leading-none mb-1">
                      {dateObj.toLocaleDateString('de-CH', { weekday: 'short' })}
                    </span>
                    <span className="text-lg leading-none">
                      {dateObj.getDate()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {dateObj.toLocaleDateString('de-CH', { month: 'long', year: 'numeric' })}
                      {isToday && <span className="ml-3 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">Heute</span>}
                    </h3>
                    {isPast && !isToday && <p className="text-xs text-gray-400">Vergangen</p>}
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {groupedEvents[date].map((event) => (
                    <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                          {(event.startTime || event.endTime) && (
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {event.startTime || '?'} - {event.endTime || '?'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{event.title}</h4>
                        
                        {event.notes && (
                          <div className="mt-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2 text-sm text-amber-900">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span className="whitespace-pre-wrap">{event.notes}</span>
                          </div>
                        )}
                        
                        <div className="mt-4 flex gap-4 text-sm font-medium">
                           {event.offerId && (
                             <Link href={`/admin/offers/${event.offerId}`} className="text-primary hover:underline flex items-center gap-1">
                               Offerte ansehen <ChevronRight className="w-3 h-3" />
                             </Link>
                           )}
                           {event.leadId && (
                             <Link href={`/admin/leads/${event.leadId}`} className="text-primary hover:underline flex items-center gap-1">
                               Lead ansehen <ChevronRight className="w-3 h-3" />
                             </Link>
                           )}
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col gap-2 shrink-0">
                         <select 
                           value={event.status}
                           onChange={(e) => handleStatusChange(event.id, e.target.value as any)}
                           className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
                         >
                           <option value="Geplant">Geplant</option>
                           <option value="Abgeschlossen">Abgeschlossen</option>
                           <option value="Storniert">Storniert</option>
                         </select>
                         <button 
                           onClick={() => handleDelete(event.id)}
                           className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium flex justify-center items-center gap-1"
                         >
                           <Trash2 className="w-4 h-4" /> Löschen
                         </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
