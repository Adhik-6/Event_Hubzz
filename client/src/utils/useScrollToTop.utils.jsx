import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventStore } from '../stores/index.stores.js';

export const useScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const { activeStep } = useEventStore();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    setTimeout(() => {
      const element = document.getElementById(hash.slice(1));
      if (element) element.scrollIntoView();
    }, 0);
  }, [pathname, hash, activeStep]);
}
