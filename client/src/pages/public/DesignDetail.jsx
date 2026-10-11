import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiClient from '../../api/client';

const DesignDetail = () => {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await apiClient.get(`/designs/${id}`);
        if (response.data.success) {
          setDesign(response.data.data);
          if (response.data.data.images && response.data.data.images.length > 0) {
            setMainImage(response.data.data.images[0].url);
          }
        }
      } catch (err) {
        setError('Failed to load design details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesign();
  }, [id]);

  if (loading) return <div className="py-20 text-center text-on-surface-variant font-body-lg">Loading design...</div>;
  if (error) return <div className="py-20 text-center text-error font-body-lg">{error}</div>;
  if (!design) return <div className="py-20 text-center text-on-surface-variant font-body-lg">Design not found.</div>;

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb */}
      <section className="w-full bg-surface-container-low/60 border-b border-outline-variant/40">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <Link to="/designs" className="hover:text-primary transition-colors">Designs</Link>
            <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
            <span className="text-on-surface font-semibold tracking-normal normal-case">{design.title}</span>
          </nav>
        </div>
      </section>

      {/* Editorial Main Presentation */}
      <section className="w-full py-space-lg lg:py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-gutter lg:gap-12 items-start">
            
            {/* Left: Interactive Gallery */}
            <div className="flex flex-col gap-4 w-full">
              <div className="relative w-full aspect-[4/5] max-h-[340px] md:max-h-[400px] lg:max-h-none mx-auto bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/50 shadow-sm group">
                {mainImage ? (
                  <img 
                    alt={design.title} 
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.02]" 
                    src={mainImage} 
                    fetchpriority="high"
                    loading="eager"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-[64px]">image_not_supported</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface font-semibold">Master Cutter Sample</span>
                </div>
              </div>

              {/* Thumbnails */}
              {design.images && design.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {design.images.map((img, idx) => (
                    <button 
                      key={img._id || idx}
                      className={`thumbnail-btn flex flex-col items-center gap-2 p-1.5 rounded-lg border-2 transition-all duration-200 text-left cursor-pointer ${mainImage === img.url ? 'border-primary-container bg-surface-container-lowest' : 'border-transparent bg-surface-container-lowest hover:border-outline-variant'}`}
                      onClick={() => setMainImage(img.url)}
                      type="button"
                    >
                      <div className="w-full aspect-[4/3] rounded overflow-hidden bg-surface-container-low">
                        <img alt="Thumbnail" className="w-full h-full object-cover object-top hover:scale-105 transition-transform" src={img.url} loading="lazy" />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Editorial Content & Specs */}
            <div className="flex flex-col">
              {/* Category Eyebrow */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">{design.category}</span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-medium">Design Details</span>
                {!design.isPublished && (
                  <>
                    <span className="text-outline-variant">•</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-error font-medium">Unpublished</span>
                  </>
                )}
              </div>

              {/* Main Title */}
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-normal tracking-tight mb-3">
                {design.title}
              </h1>

              {/* Price & Atelier Pricing Note */}
              <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg p-4 mb-6 shadow-sm">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Starting from</span>
                  <span className="font-headline-md text-headline-md text-primary font-normal">₹2,000</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant ml-1">(Handcrafted Stitching)</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Final pricing is estimated based on your selected fabric structure, chest-to-waist drafting, inner padding preference, and custom enhancements.
                </p>
              </div>

              {/* Short Atelier Description */}
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6 font-normal whitespace-pre-wrap">
                {design.description}
              </p>

              {/* Design Details 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-surface-container-low rounded border border-outline-variant/40 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Fabric</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{design.metadata?.fabric || 'Custom'}</span>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded border border-outline-variant/40 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Neckline</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{design.metadata?.neckline || 'Custom'}</span>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded border border-outline-variant/40 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Sleeves</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">{design.metadata?.sleeveType || 'Custom'}</span>
                </div>
                <div className="p-3.5 bg-surface-container-low rounded border border-outline-variant/40 flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-1">Stitching Style</span>
                  <span className="font-body-md text-body-md font-semibold text-on-surface">14-Point Bespoke Fit</span>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                <a 
                  href={`https://wa.me/917639189075?text=Hi%20Guru%20Tailoring%2C%20I%20am%20interested%20in%20the%20${design.title}%20and%20would%20like%20to%20discuss%20stitching%20and%20pricing.`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-12 px-6 rounded bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp Us Directly
                </a>
              </div>

              {/* Tags */}
              {design.tags && design.tags.length > 0 && (
                <div className="pt-6 border-t border-outline-variant/40">
                  <h3 className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {design.tags.map((tag, idx) => (
                      <span key={idx} className="bg-surface-container px-3 py-1 rounded text-on-surface font-body-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignDetail;
