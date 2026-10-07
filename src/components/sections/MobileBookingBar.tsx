import { useEffect, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (value) => setVisible(value > 420));

  useEffect(() => setVisible(scrollY.get() > 420), [scrollY]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-foreground bg-primary p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <a href="#contatti" className="flex min-h-12 items-center justify-center border-2 border-foreground bg-foreground px-4 py-3 text-center text-sm font-bold text-primary">Raccontami il problema</a>
    </div>
  );
}
