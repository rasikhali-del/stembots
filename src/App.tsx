import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import LoadingScreen from '@/components/common/LoadingScreen';

import routes from './routes';

import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RouteGuard } from '@/components/common/RouteGuard';
import { Toaster } from '@/components/ui/toaster';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top immediately on page load/reload
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Lock body scroll during loading
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      // Unlock body scroll and scroll to top after loading
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={isLoading ? 'loading-page-blur' : ''}>
      {isLoading && <LoadingScreen />}
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <RouteGuard>
              <ScrollToTop />
              <IntersectObserver />
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
            </RouteGuard>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
};

export default App;
