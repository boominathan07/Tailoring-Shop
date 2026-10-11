import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low text-on-surface border-t border-outline-variant/20">
      <div className="w-full px-6 lg:px-12 pt-16 pb-10">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 lg:gap-8 pb-12 border-b border-outline-variant/30">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col md:w-[35%] lg:w-[30%]">
            <span className="font-headline-sm text-headline-sm text-on-surface font-normal mb-2">
              Guru Tailoring
            </span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mb-4">
              Bespoke Women's Atelier
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-sm">
              Bespoke women's tailoring &amp; handcrafted custom stitching studio.
              Thoughtfully drafted, precisely stitched to your unique measurements.
            </p>
            <div className="mt-6 flex items-center">
              <a
                className="inline-flex items-center gap-2 font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200 py-1"
                href="https://instagram.com/gurutailoring"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  photo_camera
                </span>
                <span>@gurutailoring</span>
              </a>
            </div>
          </div>
          
          {/* Column 2: Navigation */}
          <div className="flex flex-col md:w-auto">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-5 font-semibold">
              Studio Navigation
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/designs"
              >
                Designs
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/services"
              >
                Services
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/work"
              >
                Our Work
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/contact"
              >
                Custom Request
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/about"
              >
                About
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                to="/contact"
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Column 3: Contact Details */}
          <div className="flex flex-col gap-5 md:w-[40%] lg:w-[33.33%] shrink-0">
            <h3 className="font-label-md text-label-md uppercase tracking-wider text-on-surface mb-1 font-semibold">
              Studio &amp; Consultation
            </h3>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Atelier Address
                </span>
                <span className="font-body-md text-body-md text-on-surface mt-1">
                  1/236 Pillayar Kovil Street, Vadakku Illandai Kulam, Tamil Nadu - 628953
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                call
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Phone
                </span>
                <a
                  className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors duration-200 duration-200 mt-1"
                  href="tel:+917639189075"
                >
                  +91 76391 89075
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                forum
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  WhatsApp Direct
                </span>
                <a
                  className="font-body-md text-body-md text-primary hover:underline underline-offset-4 hover:text-primary/80 transition-colors duration-200 mt-1"
                  href="https://wa.me/917639189075"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Chat with Tailor
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                schedule
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Fitting Hours
                </span>
                <span className="font-body-md text-body-md text-on-surface mt-1">
                  Tue - Sun: 10:30 AM - 7:30 PM (Sun: By Appointment)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-left">
            &copy; {new Date().getFullYear()} Guru Tailoring. Handcrafted with care. All rights reserved.
          </p>
          <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant text-center md:text-right">
            Urban Bespoke Stitching &amp; Patterns
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
