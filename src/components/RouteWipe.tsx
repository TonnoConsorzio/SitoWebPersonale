import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function RouteWipe() {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setActive(true);
    const timeout = window.setTimeout(() => setActive(false), 420);
    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return <div className={`route-wipe ${active ? 'is-active' : ''}`} aria-hidden="true" />;
}
