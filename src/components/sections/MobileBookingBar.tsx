import { useEffect, useState } from 'react';
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-primary p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <a href="#contatti" className="flex min-h-12 items-center justify-center border-2 border-foreground bg-foreground px-4 py-3 text-center text-sm font-bold text-primary">Raccontami il problema</a>
    </div>
  );
}
