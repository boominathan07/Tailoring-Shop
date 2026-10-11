import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../../api/client';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await apiClient.get(`/services/slug/${slug}`);
        const data = response.data;
        
        if (data.success) {
          setService(data.data);
        } else {
          setError(data.message || 'Service not found');
        }
      } catch (err) {
        setError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center py-20">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl text-error mb-4">{error || 'Service not found'}</h1>
          <Link to="/services" className="text-primary hover:underline">Return to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full"><div className="flex flex-col w-full">

        {/* Top Breadcrumb */}
        <div className="w-full bg-surface-container-low/60 border-b border-outline-variant/30">
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-2 flex items-center justify-between">
            <nav className="flex items-center space-x-1 font-label-md text-label-md text-on-surface-variant">
              <Link className="hover:text-primary transition-colors" to="/">Home</Link>
              <span className="text-outline-variant">/</span>
              <Link className="hover:text-primary transition-colors" to="/services">Services</Link>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface font-semibold">{service.name}</span>
            </nav>
            <div className="hidden sm:flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
              <span>Atelier Order Code: SRV-{service._id.toString().slice(-4).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Hero / Service Introduction */}
        <section className="w-full px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded bg-surface-container-low shadow-sm">
                {service.image?.url ? (
                  <img 
                    alt={service.name} 
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-[1.02]" 
                    src={service.image.url} 
                    fetchpriority="high"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] flex items-center justify-center bg-surface-container-high">
                    <span className="material-symbols-outlined text-6xl text-outline-variant">imagesmode</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-3 py-1.5 rounded text-on-surface text-[12px] font-label-sm tracking-wide">
                  Drafted on Organic Raw Silk · Single Needle Finish
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 mt-2 bg-surface-container-low p-2 rounded">
                <div className="text-center">
                  <span className="block font-headline-sm text-headline-sm text-primary">14</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Drafting Points</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline-sm text-headline-sm text-primary">2.5"</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Inside Margin</span>
                </div>
                <div className="text-center">
                  <span className="block font-headline-sm text-headline-sm text-primary">100%</span>
                  <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Cotton Lined</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-start">
              <span className="font-label-sm text-label-sm tracking-widest text-primary-container uppercase font-semibold">{service.category}</span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1 tracking-tight">{service.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 p-4 bg-surface-container-low rounded border-l-2 border-primary-container text-left flex flex-col items-start justify-start w-full">
                <div className="flex flex-wrap items-baseline justify-start gap-1 text-left">
                  <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider text-left">Drafting & Stitching</span>
                  <span className="font-headline-sm text-headline-sm text-primary ml-2">
                    {service.pricingType === 'enquiry' ? 'On Consultation' : `From ₹${service.startingPrice}`}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-left">
                  Final pricing may vary depending on design intricacy, neck complexity, fabric stiffness, and custom embellishments.
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface rounded font-label-md text-label-md">
                  <span className="material-symbols-outlined text-primary text-[18px]">straighten</span>
                  <span>14-Point Body Measurements</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface rounded font-label-md text-label-md">
                  <span className="material-symbols-outlined text-primary text-[18px]">architecture</span>
                  <span>Individual Craft Paper Pattern</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface rounded font-label-md text-label-md">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <span>Zero Armhole Gaping Guarantee</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-6">
                <Link to={`/contact?service=${encodeURIComponent(service.name)}`} className="h-12 px-6 bg-primary-container text-on-primary font-label-lg text-label-lg rounded hover:bg-primary transition-all duration-200 flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                  <span>Enquire About This Service</span>
                </Link>
                <a 
                  className="h-12 px-6 bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-lg text-label-lg rounded flex items-center justify-center gap-2" 
                  href={`https://wa.me/917639189075?text=Hi%20Guru%20Tailoring%2C%20I%27m%20interested%20in%20your%20${encodeURIComponent(service.name)}%20service.`}
                  rel="noopener noreferrer" 
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">chat</span>
                  <span>WhatsApp Us</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">storefront</span>
                <span>In-studio fittings available in Vadakku Illandai Kulam & Kovilpatti taluk</span>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included in Every Stitch */}
        {service.includedItems && service.includedItems.length > 0 && (
          <section className="w-full bg-surface-container-low py-10">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="max-w-2xl">
                <span className="font-label-sm text-label-sm tracking-widest text-primary-container uppercase font-semibold">Standard Atelier Protocol</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">What's Included in Every Stitch</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">Every garment is individually drafted from scratch with master-cutter precision.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {service.includedItems.map((item, index) => (
                  <div key={index} className="bg-surface p-4 rounded flex flex-col shadow-sm">
                    <div className="w-9 h-9 rounded bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Make It Your Own */}
        {service.customizationAvailable && (
          <section className="w-full px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
              <div className="max-w-2xl">
                <span className="font-label-sm text-label-sm tracking-widest text-primary-container uppercase font-semibold">Personalized Bespoke Details</span>
                <h2 className="font-headline-md text-headline-md text-on-surface mt-1">Make It Your Own</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  {service.customizationDetails || "Every parameter is customizable prior to cutting."}
                </p>
              </div>
              <div className="text-right">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">Consultation Included</span>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ServiceDetail;
