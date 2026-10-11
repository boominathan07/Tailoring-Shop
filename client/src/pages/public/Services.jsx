import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../api/client';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get('/services');
        const data = response.data;
        
        if (data.success) {
          const d = data.data;
          setServices(d.services || d);
        } else {
          setError(data.message || 'Failed to fetch services');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  return (
    <main className="w-full">
      <div className="flex flex-col w-full">
        {/* SECTION 1: COMPACT EDITORIAL INTRODUCTION */}
        <section className="w-full px-6 lg:px-12 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1px] bg-primary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary">Our Services</span>
            </div>
            <h1 className="font-display-lg text-display-lg-mobile lg:text-display-lg text-on-surface tracking-tight leading-tight">
              Tailoring for Every Occasion
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 leading-relaxed">
              From everyday blouses to bridal pieces and custom outfits, we stitch garments to your style, measurements and occasion.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-[4px] bg-surface-container text-tertiary">
              <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
              <span className="font-label-md text-label-md text-on-surface">Every cut is drafted individually on brown craft paper to your 14-point body measurements.</span>
            </div>
          </div>
          </div>
        </section>

        {/* SECTION 2: THE FEATURED TAILORING SERVICES GRID */}
        <section className="w-full px-6 lg:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
            </div>
          ) : error ? (
            <div className="bg-error-container text-on-error-container p-4 rounded text-center">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.length === 0 ? (
                <div className="col-span-full text-center py-10 font-body-lg text-on-surface-variant">
                  No services available right now.
                </div>
              ) : (
                services.map((service) => (
                  <article key={service._id} className="flex flex-col rounded-[6px] bg-surface-container-lowest shadow-[0_2px_8px_rgba(37,37,34,0.03)] hover:shadow-[0_6px_20px_rgba(37,37,34,0.06)] transition-all duration-300 group">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[6px] bg-surface-container">
                      {service.image?.url ? (
                        <img 
                          alt={service.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                          loading="lazy" 
                          src={service.image.url} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container-high">
                          <span className="material-symbols-outlined text-4xl text-outline-variant">imagesmode</span>
                        </div>
                      )}

                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-[4px] bg-surface/90 backdrop-blur-sm text-on-surface font-label-sm text-label-sm uppercase tracking-wider">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h2 className="font-headline-sm text-headline-sm text-on-surface">{service.name}</h2>
                          <span className="font-label-lg text-label-lg text-primary shrink-0">
                            {service.pricingType === 'enquiry' ? 'On Consultation' : `From ₹${service.startingPrice}`}
                          </span>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-5 bg-surface-container-lowest flex flex-col gap-3">
                        <span className="font-body-sm text-body-sm text-outline italic">
                          *Final pricing may vary depending on design and customization.
                        </span>
                        <div className="flex items-center gap-2.5 pt-1">
                          <Link 
                            to={`/services/${service.slug}`}
                            className="flex-1 inline-flex items-center justify-center h-10 px-4 rounded-[4px] bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors"
                          >
                            View Service
                          </Link>
                          <a 
                            aria-label={`Enquire on WhatsApp about ${service.name}`} 
                            className="inline-flex items-center justify-center h-10 px-3.5 rounded-[4px] bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors" 
                            href={`https://wa.me/917639189075?text=Hi%20Guru%20Tailoring%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(service.name)}%20service.`}
                            rel="noopener noreferrer" 
                            target="_blank" 
                            title="Direct WhatsApp enquiry"
                          >
                            <span className="material-symbols-outlined text-[19px]">chat</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {/* Editorial Pricing Note */}
          <div className="mt-10 p-5 rounded-[4px] bg-surface-container-low flex items-start gap-3.5 max-w-4xl mx-auto">
            <span className="material-symbols-outlined text-outline text-[20px] shrink-0 mt-0.5">info</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              <strong className="font-medium text-on-surface">Note:</strong> Tailoring prices reflect master-cutter drafting and trial fitting. Final pricing depends on fabric delicacy, lining grade, embroidery complexity, and delivery urgency.
            </p>
          </div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS */}
        <section className="w-full bg-surface-container-low py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary mb-2">Our Process</span>
              <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface tracking-tight">How It Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3">
                A transparent, stress-free bespoke journey from first consultation to final fitting.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              <div className="p-6 rounded-[6px] bg-surface-container-lowest shadow-[0_1px_4px_rgba(37,37,34,0.02)] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-label-lg text-label-lg font-semibold text-primary">01</span>
                    <span className="w-8 h-8 rounded-[4px] bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">checkroom</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Choose a Service</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Browse our catalogue or bring a reference photo of the silhouette you desire.
                  </p>
                </div>
                <div className="w-full h-1 bg-surface-container mt-6 rounded-full overflow-hidden">
                  <div className="w-1/4 h-full bg-primary"></div>
                </div>
              </div>
              <div className="p-6 rounded-[6px] bg-surface-container-lowest shadow-[0_1px_4px_rgba(37,37,34,0.02)] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-label-lg text-label-lg font-semibold text-primary">02</span>
                    <span className="w-8 h-8 rounded-[4px] bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">forum</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Discuss Requirements</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Share fabric specifics, neck preferences, and occasion dates via studio visit or WhatsApp.
                  </p>
                </div>
                <div className="w-full h-1 bg-surface-container mt-6 rounded-full overflow-hidden">
                  <div className="w-2/4 h-full bg-primary"></div>
                </div>
              </div>
              <div className="p-6 rounded-[6px] bg-surface-container-lowest shadow-[0_1px_4px_rgba(37,37,34,0.02)] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-label-lg text-label-lg font-semibold text-primary">03</span>
                    <span className="w-8 h-8 rounded-[4px] bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">square_foot</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Confirm Price & Size</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Master cutter records your 14-point measurements and confirms a transparent estimate.
                  </p>
                </div>
                <div className="w-full h-1 bg-surface-container mt-6 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary"></div>
                </div>
              </div>
              <div className="p-6 rounded-[6px] bg-surface-container-lowest shadow-[0_1px_4px_rgba(37,37,34,0.02)] flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-label-lg text-label-lg font-semibold text-primary">04</span>
                    <span className="w-8 h-8 rounded-[4px] bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">We Stitch Garment</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Crafted with comfort gussets, non-itch lining, and inspected during your trial fitting.
                  </p>
                </div>
                <div className="w-full h-1 bg-surface-container mt-6 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY CHOOSE GURU TAILORING */}
        <section className="w-full px-6 lg:px-12 py-16 lg:py-24">
          <div className="max-w-2xl mb-12">
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary mb-2 block">Our Craft Principles</span>
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface tracking-tight">
              Bespoke Standards in Every Seam
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[6px] bg-surface-container-low flex flex-col justify-start">
              <div className="w-10 h-10 rounded-[4px] bg-surface-container-lowest flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">person_outline</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Personal Attention</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 leading-relaxed">
                Direct consultation with the master cutter who drafts your individual garment.
              </p>
            </div>
            <div className="p-6 rounded-[6px] bg-surface-container-low flex flex-col justify-start">
              <div className="w-10 h-10 rounded-[4px] bg-surface-container-lowest flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">straighten</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Custom Measurements</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 leading-relaxed">
                14 anatomical measurements to guarantee balanced clavicle drape and zero armhole gaping.
              </p>
            </div>
            <div className="p-6 rounded-[6px] bg-surface-container-low flex flex-col justify-start">
              <div className="w-10 h-10 rounded-[4px] bg-surface-container-lowest flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">tune</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Design Flexibility</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 leading-relaxed">
                Every sleeve length, back cutout, potli button, and neck height can be freely customized.
              </p>
            </div>
            <div className="p-6 rounded-[6px] bg-surface-container-low flex flex-col justify-start">
              <div className="w-10 h-10 rounded-[4px] bg-surface-container-lowest flex items-center justify-center text-primary mb-5 shadow-sm">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Careful Finishing</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2.5 leading-relaxed">
                Breathable pure cotton lining, hand-rolled piping, and overlocked internal seams for comfort against sensitive skin.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: CUSTOM REQUEST CTA */}
        <section className="w-full px-6 lg:px-12 pb-16">
        <div className="max-w-7xl mx-auto rounded-[8px] bg-surface-container-low p-8 lg:p-12 shadow-[0_2px_12px_rgba(37,37,34,0.03)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col items-start">
                <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary mb-2">
                  Bespoke Reference Stitching
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface tracking-tight">
                  Looking for something different?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-3 leading-relaxed max-w-2xl">
                  Have a specific outfit, reference image or special requirement? Tell us what you have in mind and we'll examine fabric drape, neckline feasibility, and discuss how we can adapt it for you.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full">
                <Link className="inline-flex items-center justify-center h-12 px-6 rounded-[4px] bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-all text-center shadow-sm" to="/custom-request">
                  Request a Custom Design
                </Link>
                <a className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[4px] bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container transition-colors text-center" href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring%2C%20I%20have%20a%20custom%20tailoring%20enquiry." rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: LOCAL STUDIO VISIT & CONTACT STRIP */}
        <section className="w-full bg-surface-container-high py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex flex-col max-w-xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">Guru Tailoring Studio</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  1/236 Pillayar Kovil Street, Vadakku Illandai Kulam, Tamil Nadu - 628953
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-on-surface-variant font-body-sm text-body-sm">
                  <span><strong className="font-medium text-on-surface">Hours:</strong> Tue – Sun: 10:30 AM – 7:30 PM</span>
                  <span><strong className="font-medium text-on-surface">Sunday:</strong> By Appointment</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a className="inline-flex items-center gap-2 h-10 px-4 rounded-[4px] bg-surface-container-lowest text-on-surface hover:text-primary font-label-md text-label-md uppercase tracking-wider transition-colors shadow-sm" href="tel:+917639189075">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Studio
                </a>
                <a className="inline-flex items-center gap-2 h-10 px-4 rounded-[4px] bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm" href="https://wa.me/917639189075" rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp Tailor
                </a>
                <a className="inline-flex items-center gap-2 h-10 px-4 rounded-[4px] bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-low transition-colors" href="https://maps.google.com/?q=Vadakku+Illandai+Kulam+Tamil+Nadu+628953" rel="noopener noreferrer" target="_blank">
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Services;
