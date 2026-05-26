'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Fehler beim Login');
      }
    } catch (err) {
      setError('Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-lowest p-4 relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full bg-surface/80 backdrop-blur-md rounded-3xl shadow-xl border border-outline-variant/30 p-8 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display-sm text-display-sm text-on-surface mb-2">Admin Login</h1>
          <p className="font-body-sm text-on-surface-variant">Bitte geben Sie das Administrator-Passwort ein, um fortzufahren.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl px-4 py-3 font-body-md text-sm focus:ring-2 focus:ring-primary/50 outline-none transition text-center tracking-widest placeholder:tracking-normal shadow-inner"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-error/10 text-error text-center rounded-lg font-body-sm text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-primary to-[#2a5a3b] text-white py-3.5 rounded-xl font-label-md text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
            Anmelden
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="font-label-md text-xs text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
            Zurück zur Webseite
          </Link>
        </div>
      </div>
    </div>
  );
}
