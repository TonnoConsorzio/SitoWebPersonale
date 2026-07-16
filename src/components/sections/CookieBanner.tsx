import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookie exists
    const hasAccepted = document.cookie.split('; ').find(row => row.startsWith('cookie-accepted='));
    if (!hasAccepted) {
      // Small delay to not flash instantly
      const timeout = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleAccept = () => {
    // Set cookie for 365 days
    document.cookie = "cookie-accepted=true; max-age=" + (60*60*24*365) + "; path=/";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 md:p-6 animate-fade-rise">
      <div className="max-w-7xl mx-auto liquid-glass rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <p className="text-sm text-foreground">
          Questo sito usa cookie tecnici e di analisi.
        </p>
        <button 
          onClick={handleAccept}
          className="whitespace-nowrap bg-white/10 hover:bg-white/20 text-foreground px-6 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}
