import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layout } from '@/components/Layout';
import { ThemeProvider } from '@/components/ThemeProvider';
import { OpeningAnimation } from '@/components/OpeningAnimation';
import { SmoothScroll, ScrollManager } from '@/components/SmoothScroll';

// Route-level code splitting — each page loads on demand.
const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })));
const Demarrer = lazy(() => import('@/pages/Demarrer').then((m) => ({ default: m.Demarrer })));
const Exemples = lazy(() => import('@/pages/Exemples').then((m) => ({ default: m.Exemples })));
const Securite = lazy(() => import('@/pages/Securite').then((m) => ({ default: m.Securite })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));
const MentionsLegales = lazy(() =>
  import('@/pages/MentionsLegales').then((m) => ({ default: m.MentionsLegales }))
);
const Confidentialite = lazy(() =>
  import('@/pages/Confidentialite').then((m) => ({ default: m.Confidentialite }))
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="demarrer" element={<Demarrer />} />
          <Route path="contact" element={<Navigate to="/demarrer" replace />} />
          <Route path="portfolio" element={<Navigate to="/exemples" replace />} />
          <Route path="exemples" element={<Exemples />} />
          <Route path="securite" element={<Securite />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function RouteLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-label="Chargement de la page">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SmoothScroll />
      <BrowserRouter>
        <ScrollManager />
        <OpeningAnimation />
        <Suspense fallback={<RouteLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
