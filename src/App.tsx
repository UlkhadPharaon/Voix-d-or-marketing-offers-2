import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { Contact } from '@/pages/Contact';
import { Portfolio } from '@/pages/Portfolio';
import { NotFound } from '@/pages/NotFound';
import { ThemeProvider } from '@/components/ThemeProvider';
import { OpeningAnimation } from '@/components/OpeningAnimation';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <OpeningAnimation />
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

