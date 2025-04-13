import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if(hash) return undefined
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ,[pathname]);
}
