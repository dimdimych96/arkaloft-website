import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AIConsultant } from './components/AIConsultant';
import { ScrollToTop } from './components/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center bg-background-off-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <AIConsultant />
      <ScrollToTop />
      <SpeedInsights />
    </div>
  );
}

export default App;
