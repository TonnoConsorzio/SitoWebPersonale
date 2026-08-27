import { ArrowUpRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHomeCopy } from '../hooks/useHomeCopy';
import { BrandMark } from './BrandMark';

export function ConstructionNotice() {
  const copy = useHomeCopy().notice;
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const closingRef = useRef(false);
  const gatePanelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 480;
    closeTimer.current = window.setTimeout(() => setOpen(false), duration);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    gatePanelRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  if (!open) return null;

  return (
    <div className={`construction-gate${closing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="construction-gate-title" aria-describedby="construction-gate-copy">
      <div ref={gatePanelRef} className="construction-gate__panel" tabIndex={-1}>
        <div className="construction-gate__copy">
          <div className="construction-gate__brand"><BrandMark size={46} /><span>alessiobellan.it</span></div>
          <h1 id="construction-gate-title">{copy.title}</h1>
          <p id="construction-gate-copy" className="construction-gate__message">{copy.copy}</p>
          <button type="button" className="construction-gate__enter" onClick={close}>
            <span>{copy.enter}</span><ArrowUpRight size={19} aria-hidden="true" />
          </button>
        </div>
        <div className="construction-gate__status" aria-label={`${copy.holiday} ${copy.returnDate}`}>
          <span className="construction-gate__status-label">{copy.holidayLabel}</span>
          <div className="construction-gate__status-period">
            <strong>24–30</strong>
            <span className="construction-gate__status-month">agosto</span>
          </div>
          <span className="construction-gate__status-return">{copy.returnDate}</span>
        </div>
      </div>
    </div>
  );
}
