import { Outlet, Link, useLocation, ScrollRestoration } from 'react-router-dom';
import { useState } from 'react';
import Footer from './Footer';
import SiteNotice from '../shared/SiteNotice';
import { useAuth } from '../../contexts/AuthContext';

const PublicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    // Exact match for home, startsWith for others
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Designs', path: '/designs' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/work' },
    { name: 'Custom Request', path: '/custom' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-outline-variant/10">
        <div className="w-full px-margin-mobile lg:px-margin">
          <div className="h-16 md:h-[72px] max-w-7xl mx-auto flex items-center justify-between gap-gutter">
          <div className="flex flex-col">
            <Link to="/" className="group block">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight block">Guru Tailoring</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase block mt-[-2px]">
                Women's Tailoring & Custom Stitching
              </span>
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center gap-space-lg">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={isActive(link.path) 
                  ? "transition-colors text-on-surface text-sm font-medium border-b-2 border-primary-container pb-1"
                  : "text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
                }
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-space-md">
            <Link 
              to={user ? '/account' : '/login'} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest/40 border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/60 hover:backdrop-blur-md hover:border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-95 transition-all duration-200"
              title={user ? 'My Account' : 'Sign In'}
              aria-label={user ? 'My Account' : 'Sign In'}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </Link>
            <Link 
              to="/contact" 
              className="hidden sm:inline-flex items-center justify-center h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary transition-colors shadow-[0_2px_6px_-1px_rgba(37,37,34,0.06)] active:scale-[0.995]"
            >
              Enquire
            </Link>
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low/60 hover:backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-95 transition-all duration-200 ml-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
          </div>
        </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(37,37,34,0.06)] px-6 py-6 border-t border-outline-variant/30 max-h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={isActive(link.path)
                    ? "h-11 flex items-center font-body-md text-body-md text-[#5F6F52] font-semibold px-3 rounded-lg bg-surface-container border-l-2 border-[#5F6F52]"
                    : "h-11 flex items-center font-body-md text-body-md text-on-surface-variant hover:text-on-surface px-3 rounded-lg hover:bg-surface-container-low"
                  }
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-6 flex flex-col gap-3 border-t border-outline-variant/20">
              <a 
                className="h-12 flex items-center justify-center gap-2 rounded-[4px] bg-surface-container-low text-on-surface font-label-md text-label-md tracking-wider uppercase hover:bg-surface-container transition-colors" 
                href="https://wa.me/917639189075" 
                target="_blank" 
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                WhatsApp Consultation
              </a>
              <Link 
                to="/custom" 
                className="h-12 flex items-center justify-center rounded-[4px] bg-primary-container text-on-primary font-label-md text-label-md tracking-wider uppercase hover:bg-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Studio Fitting
              </Link>
            </div>
          </div>
        )}
      </header>
      
      <main className="w-full pt-16 md:pt-[72px] bg-surface min-h-[calc(100vh-20rem)]">
        <Outlet />
      </main>

      <Footer />
      <SiteNotice />
      <ScrollRestoration />
    </div>
  );
};

export default PublicLayout;
