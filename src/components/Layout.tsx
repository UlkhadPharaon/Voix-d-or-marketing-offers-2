import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PlayCircle, Menu, X, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
// @ts-ignore
import logoImg from '../../logo/logo studio voix d\'or.png';

function Logo() {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="w-[40px] h-[40px] rounded-full border-2 border-primary flex items-center justify-center overflow-hidden bg-black-deep">
      {!imgError ? (
        <img 
          src={logoImg} 
          alt="Logo" 
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="font-heading text-primary font-bold text-[24px]">V</span>
      )}
    </div>
  );
}

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Offres', href: '/#offres' },
    { label: 'Exemples', href: '/portfolio' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-black-deep text-white flex flex-col font-sans selection:bg-primary selection:text-black-deep">
      {/* Navbar fixed */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[80px] flex items-center px-6 md:px-[40px] border-b border-primary/20 bg-black-deep/90 backdrop-blur-md`}
      >
        <div className="w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-[12px] z-50 group">
            <Logo />
            <div className="flex flex-col">
              <span className="font-heading text-[20px] tracking-[1px] uppercase text-white">Studio Voix d'Or</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[30px]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] uppercase tracking-[1px] text-gray-text hover:text-primary transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black-deep flex flex-col items-center justify-center space-y-8 pt-20 md:hidden border-b border-primary/20"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[20px] font-heading font-normal tracking-[1px] uppercase text-white hover:text-primary transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-black-deep text-white border-t border-primary/20 relative overflow-hidden">
        {/* Subtle Faso Dan Fani pattern background (using basic linear gradients to simulate) */}
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.03) 0px, rgba(212, 175, 55, 0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(0deg, rgba(212, 175, 55, 0.03) 0px, rgba(212, 175, 55, 0.03) 1px, transparent 1px, transparent 20px)' }}>
        </div>
        
        <div className="container mx-auto px-4 md:px-[40px] py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-[12px] mb-6">
                <Logo />
                <span className="font-heading text-[20px] tracking-[1px] uppercase">Studio Voix d'Or</span>
              </div>
              <p className="text-gray-text text-[14px] mb-6 max-w-sm leading-relaxed">
                Savoir rêver grand et l'accomplir.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-primary text-[14px] uppercase tracking-widest mb-6 font-bold">Navigation</h4>
              <ul className="space-y-4">
                <li><Link to="/#offres" className="text-gray-text hover:text-primary transition-colors text-[14px] uppercase tracking-[1px]">Offres</Link></li>
                <li><Link to="/portfolio" className="text-gray-text hover:text-primary transition-colors text-[14px] uppercase tracking-[1px]">Exemples Vidéos</Link></li>
                <li><Link to="/#faq" className="text-gray-text hover:text-primary transition-colors text-[14px] uppercase tracking-[1px]">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-text hover:text-primary transition-colors text-[14px] uppercase tracking-[1px]">Contact & Devis</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-primary text-[14px] uppercase tracking-widest mb-6 font-bold">Réseaux Sociaux</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-text hover:text-primary transition-colors text-[14px]">Instagram</a></li>
                <li><a href="#" className="text-gray-text hover:text-primary transition-colors text-[14px]">Facebook</a></li>
                <li><a href="#" className="text-gray-text hover:text-primary transition-colors text-[14px]">TikTok</a></li>
                <li><a href="#" className="text-gray-text hover:text-primary transition-colors text-[14px]">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-primary text-[14px] uppercase tracking-widest mb-6 font-bold">Contact</h4>
              <ul className="space-y-4 text-[14px] text-gray-text">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">📍</span> Ouagadougou, Burkina Faso
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">📱</span> WhatsApp : +226 44 90 66 29
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✉️</span> contact@voixdor.studio
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-primary/20 text-center text-gray-text text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Studio Voix d'Or. Tous droits réservés.</p>
            <div className="mt-4 md:mt-0 space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/22644906629" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-[20px] right-[20px] md:bottom-[30px] md:right-[40px] z-50 bg-[#25D366] text-white p-[14px] md:px-[24px] md:py-[12px] rounded-full md:rounded-[30px] flex items-center justify-center gap-0 md:gap-[10px] font-bold text-[14px] shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform group"
      >
        <svg className="w-[24px] h-[24px] md:w-[20px] md:h-[20px] fill-white shrink-0" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437-9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline">Discuter sur WhatsApp</span>
      </a>
    </div>
  );
}
