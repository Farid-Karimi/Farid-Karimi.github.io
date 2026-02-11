import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main container (body or layout wrapper)
    window.scrollTo(0, 0);
    
    // Also try scrolling the main layout element if it has its own overflow
    const mainEl = document.querySelector('main');
    if (mainEl) {
        mainEl.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;