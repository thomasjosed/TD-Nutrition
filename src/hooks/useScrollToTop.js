/**
 * useScrollToTop — Custom Hook
 * Detecta el scroll para mostrar el botón "volver arriba"
 */

import { useState, useEffect } from 'react';

export function useScrollToTop(threshold = 300) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { visible, scrollToTop };
}
