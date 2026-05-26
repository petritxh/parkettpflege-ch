'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, Mail, FileText, Settings2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    offerIntroTemplate: '',
    offerFooterTemplate: '',
    emailOfferLinkTemplate: '',
    emailConfirmationTemplate: '',
    emailOrderConfirmationTemplate: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings({
            offerIntroTemplate: data.offerIntroTemplate || '',
            offerFooterTemplate: data.offerFooterTemplate || '',
            emailOfferLinkTemplate: data.emailOfferLinkTemplate || '',
            emailConfirmationTemplate: data.emailConfirmationTemplate || '',
            emailOrderConfirmationTemplate: data.emailOrderConfirmationTemplate || ''
          });
        }
      } catch (error) {
        console.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      alert('Einstellungen erfolgreich gespeichert.');
    } catch (error) {
      alert('Fehler beim Speichern.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-500" /></div>;
  }

  return (
    <div className="max-w-4xl space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Einstellungen</h1>
          <p className="text-gray-500">Verwalten Sie Ihre Textvorlagen für Offerten und E-Mails.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-3 rounded-xl font-label-md uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Speichern
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Offerten Vorlagen */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/50 border border-gray-100/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">HTML Offerten Vorlagen</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Intro Text (Standard)</label>
              <textarea 
                name="offerIntroTemplate"
                value={settings.offerIntroTemplate}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
              <p className="text-xs text-gray-400 mt-2">Variablen: {'{KUNDE_NAME}'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Footer / Bedingungen</label>
              <textarea 
                name="offerFooterTemplate"
                value={settings.offerFooterTemplate}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
            </div>
          </div>
        </motion.div>

        {/* Email Vorlagen */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/50 border border-gray-100/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">E-Mail Vorlagen</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Offerten-Link & PIN</label>
              <textarea 
                name="emailOfferLinkTemplate"
                value={settings.emailOfferLinkTemplate}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
              <p className="text-xs text-gray-400 mt-2">Variablen: {'{KUNDE_NAME}'}, {'{LINK}'}, {'{PIN}'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Bestätigung nach Annahme</label>
              <textarea 
                name="emailConfirmationTemplate"
                value={settings.emailConfirmationTemplate}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
              <p className="text-xs text-gray-400 mt-2">Variablen: {'{KUNDE_NAME}'}, {'{OFFER_ID}'}</p>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Auftragsbestätigung (Nach Annahme)</label>
              <textarea 
                name="emailOrderConfirmationTemplate"
                value={settings.emailOrderConfirmationTemplate}
                onChange={handleChange}
                rows={5}
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              />
              <p className="text-xs text-gray-400 mt-2">Variablen: {'{KUNDE_NAME}'}, {'{OFFER_ID}'}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
