import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SiteNotice = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or rejected
    const consent = localStorage.getItem('guru_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('guru_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('guru_cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none flex justify-center">
      <div 
        className="pointer-events-auto w-full max-w-4xl bg-surface-container-high/95 backdrop-blur-md border border-outline-variant/30 rounded-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:px-8 md:py-6"
        role="dialog" 
        aria-label="Cookie Consent"
      >
        <div className="flex flex-col gap-1.5 md:pr-4 flex-1">
          <p className="font-body-sm md:font-body-md text-on-surface text-sm md:text-base leading-relaxed text-center md:text-left">
            We use cookies to ensure you get the best experience on our website. This includes essential functionality and saving your preferences.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
            <Link to="/privacy" className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:underline underline-offset-4">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-outline-variant/50"></span>
            <Link to="/terms" className="font-label-sm text-xs text-on-surface-variant hover:text-primary transition-colors focus:outline-none focus:underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={handleReject}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-[4px] border border-outline-variant text-on-surface font-label-md text-sm uppercase tracking-wider hover:bg-surface-variant transition-colors focus:ring-2 focus:ring-primary/50 outline-none"
            aria-label="Reject Cookies"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-[4px] bg-primary text-on-primary font-label-md text-sm uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm focus:ring-2 focus:ring-primary/50 outline-none"
            aria-label="Accept Cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteNotice;
