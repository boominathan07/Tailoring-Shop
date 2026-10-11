import React, { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';
import GalleryCard from '../../components/shared/GalleryCard';

const Home = () => {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const [loadingDesigns, setLoadingDesigns] = useState(true);

  useEffect(() => {
    const fetchFeaturedDesigns = async () => {
      try {
        const response = await apiClient.get('/designs');
          const approvedStatic = [
            { staticId: "home-static-1", _id: "fallback", title: "The Mehrunissa Zardozi Raw Silk", description: "Intricate bullion stitch, floral zardozi motifs, deep round back cut with handcrafted latkans.", category: "Bridal", images: [{ url: "/assets/images/static-asset-2.jpg" }] },
            { staticId: "home-static-2", _id: "fallback", title: "Noor Kalidar Chanderi Ensemble", description: "24-panel twirl silhouette, subtle gota borders, hand-tucked bodice, and cotton mulmul lining.", category: "Festive", images: [{ url: "/assets/images/static-asset-3.jpg" }] },
            { staticId: "home-static-3", _id: "fallback", title: "Mulberry Silk & Organza Trim", description: "Straight silhouette with sheer organza hem insets, scallop hand-embroidery, and relaxed pant cut.", category: "Casual", images: [{ url: "/assets/images/static-asset-5.jpg" }] }
          ];
          
          if (response.data.success && response.data.data.length > 0) {
            const realDesigns = response.data.data;
            const mapped = approvedStatic.map((item, index) => {
              return {
                ...item,
                _id: realDesigns[index % realDesigns.length]._id
              };
            });
            setFeaturedDesigns(mapped);
          } else {
            setFeaturedDesigns(approvedStatic);
          }
      } catch (err) {
        console.error('Failed to load featured designs:', err);
      } finally {
        setLoadingDesigns(false);
      }
    };
    fetchFeaturedDesigns();
  }, []);

  return (
    <main className="w-full"><div className="flex flex-col w-full">

<section className="w-full bg-surface py-8 lg:py-12 px-6 lg:px-12 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

<div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pr-2">
<div className="flex items-center gap-3">
<span className="w-8 h-[1px] bg-primary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Women's Tailoring &amp; Custom Stitching</span>
</div>
<h1 className="flex flex-col mb-5">
  <span className="font-display-lg text-[44px] sm:text-[52px] lg:text-[62px] text-on-surface font-normal tracking-[-0.02em] leading-[1.05]">Designed for you.</span>
  <span className="font-display-lg text-[40px] sm:text-[48px] lg:text-[58px] italic font-light text-primary/90 tracking-[-0.01em] leading-[1.1]">Stitched with care.</span>
</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-[460px] leading-relaxed">
          Custom blouses, dresses and alterations tailored to your style, fit and occasion.
        </p>
<div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
<a className="h-12 px-7 rounded-[4px] bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center justify-center transition-all duration-150 hover:bg-primary shadow-sm hover:shadow active:scale-[0.995]" href="#designs">
            Explore Designs
          </a>
<Link className="h-12 px-7 rounded-[4px] bg-surface-container-lowest text-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center justify-center transition-colors duration-150 hover:bg-surface-container shadow-sm" to="/contact">
            Custom Request
          </Link>
</div>
<div className="pt-3 flex flex-wrap items-center gap-6 text-on-surface-variant">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">straighten</span>
<span className="font-body-sm text-body-sm font-medium">14-Point Measurement</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span className="font-body-sm text-body-sm font-medium">In-Studio Trial Fitting</span>
</div>
</div>
</div>

<div className="lg:col-span-7 relative w-full">
<div className="relative bg-surface-container rounded-[6px] overflow-hidden shadow-md max-h-[340px] sm:max-h-[440px] lg:max-h-[500px]">
<img className="w-full h-[320px] sm:h-[420px] lg:h-[490px] object-cover" alt="Image" src="/assets/images/static-asset-1.jpg" />
<div className="absolute bottom-0 inset-x-0 bg-surface-container-lowest/95 backdrop-blur-sm px-5 py-4 flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Master Tailoring</span>
<span className="font-headline-sm text-[18px] sm:text-headline-sm text-on-surface">Handcrafted to your measurements</span>
</div>
</div>
</div>

<div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 bg-surface-container-lowest p-3.5 rounded-[4px] shadow-lg max-w-xs border border-outline-variant/30">
<span className="material-symbols-outlined text-primary text-[22px]">straighten</span>
<span className="font-body-sm text-body-sm text-on-surface">Precision pattern cutting &amp; individual trial fittings.</span>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-10 px-6 lg:px-12">
<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-[4px] bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[22px]">content_cut</span>
</div>
<div className="flex flex-col">
<h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Custom Fit</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Crafted specifically to your personal posture, bust apex, and drape lines.</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-[4px] bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[22px]">record_voice_over</span>
</div>
<div className="flex flex-col">
<h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Personal Attention</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Direct one-on-one consultation with our master pattern cutter throughout.</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-[4px] bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[22px]">verified</span>
</div>
<div className="flex flex-col">
<h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Quality Stitching</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Clean French seams, hand-rolled piping, and non-itch interior cotton lining.</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-[4px] bg-surface-container-highest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-[22px]">style</span>
</div>
<div className="flex flex-col">
<h4 className="font-label-lg text-label-lg text-on-surface uppercase tracking-wide">Made to Your Style</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Bring any neck design, sleeve preference, or reference photograph.</p>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 px-6 lg:px-12" id="designs">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
      <div>
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Atelier Portfolio</span>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Explore Our Designs</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
          Browse blouse and dress silhouettes for celebratory weddings, festive gatherings, and refined everyday occasions.
        </p>
      </div>
      <Link className="mt-4 md:mt-0 font-label-md text-label-md text-primary uppercase tracking-wider inline-flex items-center gap-1 hover:underline underline-offset-4" to="/contact">
        Custom Design Request <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </Link>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
      {loadingDesigns ? <div className="col-span-full py-10 text-center text-on-surface-variant">Loading designs...</div> : featuredDesigns.map(design => (
        <GalleryCard key={design.staticId || design._id} item={design} type="design" showView={false} />
      ))}
    </div>
  </div>
</section>

<section className="w-full bg-surface-container-low py-20 px-6 lg:px-12" id="services">
<div className="max-w-7xl mx-auto">
<div className="max-w-2xl mb-14">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Services &amp; Specialities</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">What We Stitch</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
          From intricate bridal blouses to everyday contemporary staples, drafted with anatomical precision and finished by hand.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">apparel</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">4–6 Days</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Blouse Stitching</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Classic katori, princess cut, padded, and high-neck patterns. Seamless fit with comfortable armhole shaping and no shoulder slips.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Starting from ₹850</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">auto_awesome</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">7–12 Days</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Bridal Blouse</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Heavy zardozi embroidery, aari threadwork, internal bustier boning, and reinforced neck piping tailored to match your wedding sari.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Starting from ₹3,200</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">draw</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">5–7 Days</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Designer Blouse</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Backless cuts, sweetheart necklines, hand-stitched potli buttons, artisanal fabric tassels, and geometric cutwork accents.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Starting from ₹1,850</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">styler</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">5–8 Days</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Dress &amp; Kurta Stitching</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              A-line suits, 24-kali anarkalis, tiered occasion gowns, and co-ord sets finished with hand-slip stitches and breathable lining.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Starting from ₹1,400</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">design_services</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">Timeline by Design</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Custom Stitching</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Bring your raw unstitched fabric or send us reference pictures from Instagram or Pinterest. We handle drafting, cutting, and styling.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Custom Estimate</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-[6px] flex flex-col justify-between shadow-sm hover:shadow transition-shadow">
<div>
<div className="flex items-center justify-between mb-4">
<span className="material-symbols-outlined text-primary text-[28px]">tune</span>
<span className="font-label-sm text-label-sm px-2.5 py-1 bg-surface-container rounded-[2px] text-on-surface-variant">2–3 Days</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Alterations &amp; Fit Correction</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
              Shoulder lift corrections, armhole opening adjustments, waist tapering, cup repositioning, and hem refinements for existing garments.
            </p>
</div>
<div className="mt-6 pt-4 flex items-center justify-between">
<span className="font-label-md text-label-md text-primary font-semibold">Starting from ₹350</span>
<Link className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface hover:text-primary" to="/contact">Enquire Service</Link>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container py-20 px-6 lg:px-12" id="custom-request">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-6 relative">
<div className="bg-surface-container-lowest rounded-[6px] overflow-hidden shadow-sm">
<img className="w-full aspect-[4/3] object-cover" alt="Image" src="/assets/images/static-asset-6.jpg" />
</div>
<div className="absolute -bottom-4 right-4 bg-surface-container-lowest py-3 px-5 rounded-[4px] shadow-md hidden sm:block">
<span className="font-label-sm text-label-sm text-primary font-semibold tracking-wide uppercase">WhatsApp Response: Under 3 Hours</span>
</div>
</div>
<div className="lg:col-span-6 flex flex-col space-y-6">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Bespoke Atelier Service</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Have a design in mind?</h2>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">Share your reference design with us. We'll discuss the details, fitting and stitching requirements with you.</p>
<div className="space-y-3 pt-2">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Bring your own fabric or let us assist with fabric sourcing guidance</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Individual pattern drafting tailored specifically to your silhouette</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
<span className="font-body-md text-body-md text-on-surface">Direct WhatsApp consultation with fabric cut options and exact estimates</span>
</div>
</div>
<div className="pt-4 flex flex-wrap items-center gap-4">
<a className="h-12 px-7 rounded-[4px] bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-2 transition-all hover:bg-primary" href="https://wa.me/917639189075" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Us Your Photo
          </a>
<a className="h-12 px-6 rounded-[4px] bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider inline-flex items-center justify-center transition-colors hover:bg-surface-container-high" href="#contact">
            Book Studio Fitting
          </a>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 px-6 lg:px-12 " id="our-work">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-10">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Craft Gallery</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Our Work</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">A selection of blouses, dresses and custom pieces created at Guru Tailoring.</p>
</div>

<div className="mt-6 md:mt-0 flex flex-wrap gap-2" id="portfolio-filters">
<button className="portfolio-filter-btn px-4 py-1.5 rounded-[4px] text-label-sm font-label-sm uppercase tracking-wider bg-primary text-on-primary" data-category="all">All</button>
<button className="portfolio-filter-btn px-4 py-1.5 rounded-[4px] text-label-sm font-label-sm uppercase tracking-wider bg-surface-container text-on-surface-variant hover:text-on-surface" data-category="blouses">Blouses</button>
<button className="portfolio-filter-btn px-4 py-1.5 rounded-[4px] text-label-sm font-label-sm uppercase tracking-wider bg-surface-container text-on-surface-variant hover:text-on-surface" data-category="bridal">Bridal</button>
<button className="portfolio-filter-btn px-4 py-1.5 rounded-[4px] text-label-sm font-label-sm uppercase tracking-wider bg-surface-container text-on-surface-variant hover:text-on-surface" data-category="dresses">Dresses</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-7 bg-surface-container-lowest rounded-[6px] overflow-hidden shadow-sm flex flex-col justify-between">
<div className="relative aspect-[16/11] overflow-hidden">
<img className="w-full h-full object-cover" alt="Image" src="/assets/images/static-asset-7.jpg" />
</div>
<div className="p-6 flex items-center justify-between">
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Golden Zardozi Neckline on Raw Silk</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tailored for an intimate winter wedding ceremony.</p>
</div>
<span className="font-label-sm text-label-sm text-primary font-semibold">Handcrafted Atelier</span>
</div>
</div>

<div className="md:col-span-5 flex flex-col gap-6">
<div className="bg-surface-container-lowest rounded-[6px] overflow-hidden shadow-sm flex flex-col">
<div className="relative aspect-[16/9] overflow-hidden">
<img className="w-full h-full object-cover" alt="Image" src="/assets/images/static-asset-8.jpg" />
</div>
<div className="p-4 flex items-center justify-between">
<span className="font-body-md text-body-md font-medium text-on-surface">Piped Seams &amp; Fabric Potli Accents</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Detailing</span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-[6px] overflow-hidden shadow-sm flex flex-col">
<div className="relative aspect-[16/9] overflow-hidden">
<img className="w-full h-full object-cover" alt="Image" src="/assets/images/static-asset-9.jpg" />
</div>
<div className="p-4 flex items-center justify-between">
<span className="font-body-md text-body-md font-medium text-on-surface">Kalidar Chanderi Ensemble</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Festive</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-20 px-6 lg:px-12">
<div className="max-w-7xl mx-auto">
<div className="text-center max-w-2xl mx-auto mb-16">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">The Atelier Process</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">From Idea to Finished Stitching</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Choose your design, discuss your requirements, and we'll take care of the stitching.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">

<div className="flex flex-col items-start bg-surface-container-lowest p-6 rounded-[6px] shadow-sm relative">
<span className="font-display-lg text-display-lg text-surface-tint/20 font-serif leading-none">01</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-4">Choose a Design</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            Browse our curated studio lookbook or bring reference pictures, sketches, and your favorite fabric.
          </p>
</div>

<div className="flex flex-col items-start bg-surface-container-lowest p-6 rounded-[6px] shadow-sm relative">
<span className="font-display-lg text-display-lg text-surface-tint/20 font-serif leading-none">02</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-4">Consultation &amp; Fit</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            We guide you on neckline depths, sleeve cuts, padding, and record 14 anatomical measurements.
          </p>
</div>

<div className="flex flex-col items-start bg-surface-container-lowest p-6 rounded-[6px] shadow-sm relative">
<span className="font-display-lg text-display-lg text-surface-tint/20 font-serif leading-none">03</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-4">Precision Stitching</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            Master pattern cutters hand-draft paper patterns, cut along grainlines, and construct reinforced seams.
          </p>
</div>

<div className="flex flex-col items-start bg-surface-container-lowest p-6 rounded-[6px] shadow-sm relative">
<span className="font-display-lg text-display-lg text-surface-tint/20 font-serif leading-none">04</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface mt-4">Trial &amp; Delivery</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
            Try on your finished piece in our private fitting booth. Any minor adjustments are completed promptly.
          </p>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 px-6 lg:px-12 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
<div className="lg:col-span-5 flex flex-col space-y-4">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Generational Craft</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Tailoring That Starts With You</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          We believe women's bespoke tailoring is an intimate art. Rather than rushing factory batches, each garment at Guru Tailoring is cut individually to celebrate your posture and comfort.
        </p>
<div className="pt-4 flex flex-col gap-3">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">thumb_up</span>
<span className="font-body-md text-body-md text-on-surface font-medium">12+ Years Specializing in South Indian Handloom &amp; Silk</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">handshake</span>
<span className="font-body-md text-body-md text-on-surface font-medium">Direct Master Cutter Access — No Untrained Assistants</span>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-[20px]">history</span>
<span className="font-body-md text-body-md text-on-surface font-medium">On-Time Handover Guaranteed for Your Event Date</span>
</div>
</div>
</div>
<div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
<div className="p-6 bg-surface-container-low rounded-[6px]">
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Clean Interior Finish</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            No exposed threads or harsh lining fabric that prickles sensitive skin. Every seam is piped or French-enclosed.
          </p>
</div>
<div className="p-6 bg-surface-container-low rounded-[6px]">
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">No Shoulder Drop Guarantee</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Backless and wide-neck designs are engineered with anchor stays and anatomical shoulder angling so straps stay securely up.
          </p>
</div>
<div className="p-6 bg-surface-container-low rounded-[6px]">
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Complimentary Fit Trials</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Every bridal and high-end piece includes up to two in-studio fit check sessions before final press and handover.
          </p>
</div>
<div className="p-6 bg-surface-container-low rounded-[6px]">
<h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Custom Necklines &amp; Doris</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Handcrafted fabric piping, self-fabric latkans, custom coin work, and authentic zari edge dori loops included.
          </p>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-20 px-6 lg:px-12">
<div className="max-w-7xl mx-auto">
<div className="text-center max-w-2xl mx-auto mb-14">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Customer Experiences</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">What Our Customers Say</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
          Genuine feedback from women who trust us with their wedding trousseaus and everyday silhouettes.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

<div className="bg-surface-container-lowest p-8 rounded-[6px] shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-primary mb-4"><span className="text-[18px] tracking-widest" style={{ color: "#C9A227" }}>★★★★★</span></div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
              "Very happy with the fitting and finishing. The bridal blouse came out exactly how I wanted from my Pinterest reference, especially the intricate neck cutwork and potli buttons."
            </p>
</div>
<div className="mt-6 pt-4 flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Priya S.</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bridal Raw Silk Blouse</span>
</div>
</div>

<div className="bg-surface-container-lowest p-8 rounded-[6px] shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-primary mb-4"><span className="text-[18px] tracking-widest" style={{ color: "#C9A227" }}>★★★★★</span></div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
              "Finding someone who understands handloom silk grain is rare. Guru Tailoring handled my mother's vintage Kanjeevaram sari fabric with immense care and precision."
            </p>
</div>
<div className="mt-6 pt-4 flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Ananya R.</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Silk Blouse &amp; Kurta Set</span>
</div>
</div>

<div className="bg-surface-container-lowest p-8 rounded-[6px] shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-1 text-primary mb-4"><span className="text-[18px] tracking-widest" style={{ color: "#C9A227" }}>★★★★★</span></div>
<p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
              "The trial fitting made all the difference. Zero shoulder drop, perfectly structured cups, and extremely comfortable to dance in during my sister's wedding reception."
            </p>
</div>
<div className="mt-6 pt-4 flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Meera K.</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Festive Kalidar Suit</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 px-6 lg:px-12 " id="contact">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

<div className="lg:col-span-6 flex flex-col space-y-6">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Visit The Atelier</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Visit Guru Tailoring</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Walk into our studio with your fabrics, sample blouses, or ideas. We'll take detailed measurements and explore necklines over a fresh cup of filter coffee.
          </p>
</div>
<div className="space-y-4 pt-2">
<div className="flex items-start gap-4">
<div className="w-9 h-9 rounded-[4px] bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Studio Location</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">1/236 Pillayar Kovil Street,<br/>Vadakku Illandai Kulam,<br/>Tamil Nadu - 628953</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-9 h-9 rounded-[4px] bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Studio Fitting Hours</span>
<p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Tuesday – Sunday: 10:30 AM – 7:30 PM<br/>
<span className="text-on-surface-variant italic">Mondays closed for studio pattern drafting &amp; fabric pre-washing</span>
</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="w-9 h-9 rounded-[4px] bg-surface-container flex items-center justify-center shrink-0 mt-0.5">
<span className="material-symbols-outlined text-primary text-[20px]">phone_in_talk</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">Direct Atelier Line</span>
<a className="font-body-md text-body-md text-primary font-medium hover:underline underline-offset-4 mt-0.5" href="tel:+917639189075">+91 76391 89075</a>
</div>
</div>
</div>
<div className="pt-2 flex flex-wrap gap-4"><a className="h-11 px-6 rounded-[4px] bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary-container transition-all active:scale-[0.995]" href="tel:+917639189075"><span className="material-symbols-outlined text-[18px]">call</span>Call</a><a className="h-11 px-6 rounded-[4px] bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-2 hover:bg-primary transition-all active:scale-[0.995]" href="https://wa.me/917639189075" rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-[18px]">chat</span>WhatsApp</a><a className="h-11 px-6 rounded-[4px] bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-2 hover:bg-surface-container-high transition-all active:scale-[0.995]" href="https://maps.google.com" rel="noopener noreferrer" target="_blank"><span className="material-symbols-outlined text-[18px]">directions</span>Get Directions</a></div>
</div>

<div className="lg:col-span-6 flex flex-col justify-center">
<div className="w-full h-80 lg:h-96 rounded-[6px] overflow-hidden bg-surface-container shadow-sm relative" style={{ backgroundImage: "url('/assets/images/static-asset-10.jpg')" }}>
<div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 via-transparent to-transparent flex items-end p-6">
<div className="bg-surface/95 backdrop-blur-sm p-4 rounded-[4px] shadow-md flex items-center justify-between w-full">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">Atelier Neighborhood</span>
<span className="font-body-md text-body-md text-on-surface font-medium">Vadakku Illandai Kulam, Tamil Nadu</span>
</div>
<span className="material-symbols-outlined text-primary text-[24px]">pin_drop</span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-high py-16 px-6 lg:px-12">
<div className="max-w-4xl mx-auto text-center flex flex-col items-center">
<span className="w-12 h-[1px] bg-primary mb-4"></span>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Have something special in mind?</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mt-3 leading-relaxed">
        Tell us what you would like to stitch. We will guide you with design advice, neckline recommendations, and transparent pricing.
      </p>
<div className="mt-8 flex flex-wrap justify-center gap-4">
<Link className="h-12 px-8 rounded-[4px] bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider inline-flex items-center justify-center hover:bg-primary-container shadow-sm" to="/contact">
          Make an Enquiry
        </Link>
<a className="h-12 px-8 rounded-[4px] bg-surface-container-lowest text-on-surface font-label-md text-label-md uppercase tracking-wider inline-flex items-center gap-2 hover:bg-surface-container" href="https://wa.me/917639189075" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px] text-primary">chat</span>
          WhatsApp Guru Tailoring
        </a>
</div>
</div>
</section>
</div>
</main>
  );
};

export default Home;
