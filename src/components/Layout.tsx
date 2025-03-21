import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // Remove a barra inicial e converte para título
    const pageName = location.pathname.slice(1) || 'home';
    const formattedPageName = pageName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    trackPageView(formattedPageName);
    
    // Scroll para o topo quando mudar de página
    window.scrollTo(0, 0);
  }, [location, trackPageView]);

  return <>{children}</>;
}; 