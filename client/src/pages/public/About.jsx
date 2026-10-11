import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className="w-full"><div className="flex flex-col w-full">

<section className="w-full px-margin-mobile lg:px-margin pt-space-md lg:pt-space-lg pb-space-lg">
  <div className="max-w-7xl mx-auto">
    <nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md uppercase tracking-wider mb-space-md">
      <a className="hover:text-primary transition-colors" data-path="home" href="#">Home</a>
      <span className="text-outline-variant">/</span>
      <span aria-current="page" className="text-on-surface font-semibold">About</span>
    </nav>
    <div className="max-w-3xl">
      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold block mb-space-xs">About Guru Tailoring</span>
      <h1 className="font-headline-lg text-headline-lg lg:text-display-lg text-on-surface tracking-tight mb-space-sm">
        Tailoring Made Around You
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
        From everyday stitching to special-occasion outfits, Guru Tailoring creates garments around each customer's measurements, preferences and style.
      </p>
    </div>
  </div>
</section>

<section className="w-full px-margin-mobile lg:px-margin py-space-lg lg:py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-center">

<div className="lg:col-span-6 flex flex-col justify-center">
<div className="relative bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
<img alt="Master female tailor pinning fabric on wooden cutting table with measuring tape and shears" className="w-full h-[380px] sm:h-[460px] lg:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.01]" src="/assets/images/static-asset-11.jpg" />
<div className="p-space-md bg-surface-container-low/95 backdrop-blur-sm">
<p className="font-body-sm text-body-sm text-on-surface-variant italic">
              Master pattern cutting and individual fabric pinning at our Vadakku Illandai Kulam workshop.
            </p>
</div>
</div>
</div>

<div className="lg:col-span-6 flex flex-col justify-center">
<div className="inline-flex items-center gap-space-xs mb-space-xs">
<span className="w-2 h-2 rounded-full bg-primary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-medium">Craftsmanship &amp; Dialogue</span>
</div>
<h2 className="font-headline-md text-headline-md lg:text-headline-lg text-on-surface mb-space-md tracking-tight">
          Personal Attention, From Design to Stitching
        </h2>
<div className="flex flex-col gap-space-md text-on-surface-variant font-body-md text-body-md leading-relaxed">
<p className="">
            Every garment starts with understanding what the customer wants. We discuss the design, measurements, fit and finishing details before stitching begins.
          </p>
<p className="">
            Whether you bring a reference design or choose from our collection, the goal is to create something that feels right for you.
          </p>
</div>
<div className="mt-space-lg p-space-md lg:p-space-lg bg-surface-container-low rounded-xl relative shadow-sm">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[24px] mt-0.5 shrink-0">architecture</span>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold block mb-1">Direct Atelier Dialogue</span>
<p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                A direct conversation with your tailor. We take the time to check neckline heights, sleeve comfort, armhole ease, and internal seam allowances so your garment fits naturally.
              </p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="max-w-2xl mb-space-lg lg:mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold block mb-space-xs">Our Process</span>
<h2 className="font-headline-md text-headline-md lg:text-headline-lg text-on-surface tracking-tight mb-space-xs">
          How We Work
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
          A simple, collaborative approach to bespoke tailoring with no guesswork.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
<div>
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-md text-headline-md text-primary font-medium">01</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">chat</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Understand Your Requirement</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              We start by discussing the occasion, the fabric you have or need, and the silhouette you envision.
            </p>
</div>
<div className="mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Initial Discovery</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
<div>
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-md text-headline-md text-primary font-medium">02</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">palette</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Discuss Design &amp; Fit</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              We review neckline choices, back closures, sleeve lengths, and piping or embroidery preferences in detail.
            </p>
</div>
<div className="mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Silhouette &amp; Edge</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
<div>
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-md text-headline-md text-primary font-medium">03</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">straighten</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Confirm Measurements &amp; Price</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Accurate body measurements are taken with the specific garment in mind, accompanied by upfront, clear pricing.
            </p>
</div>
<div className="mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Precision Fit</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform duration-200">
<div>
<div className="flex items-center justify-between mb-space-md">
<span className="font-headline-md text-headline-md text-primary font-medium">04</span>
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">check_circle</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">Stitch &amp; Finish</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Cut individually, sewn with reinforced interior seams, and finished with care before your trial and pickup.
            </p>
</div>
<div className="mt-space-md pt-space-xs">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Handcrafted Delivery</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-margin-mobile lg:px-margin py-space-xl">
<div className="max-w-2xl mb-space-lg lg:mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold block mb-space-xs">Our Principles</span>
<h2 className="font-headline-md text-headline-md lg:text-headline-lg text-on-surface tracking-tight mb-space-xs">
        What Matters to Us
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant">
        Honest craftsmanship rooted in comfort, longevity, and personal care.
      </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md lg:gap-space-lg">

<div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-primary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">tune</span>
<span className="font-label-md text-label-md uppercase tracking-wider font-semibold">Principle 01</span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface mb-space-xs">Personal Measurements</h3>
<p className="font-body-md text-body-md text-primary font-medium italic mb-space-sm">
            "Measurements are taken with the garment and fit in mind."
          </p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Every cut accounts for your unique posture, shoulder slope, and drape preferences rather than standard sizing grids.
          </p>
</div>
</div>

<div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-primary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
<span className="font-label-md text-label-md uppercase tracking-wider font-semibold">Principle 02</span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface mb-space-xs">Thoughtful Fit</h3>
<p className="font-body-md text-body-md text-primary font-medium italic mb-space-sm">
            "We discuss how you prefer the garment to sit and feel."
          </p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Ensuring breathability, armhole comfort, and non-slip shoulder alignment so you stay comfortable through long days.
          </p>
</div>
</div>

<div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-primary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">draw</span>
<span className="font-label-md text-label-md uppercase tracking-wider font-semibold">Principle 03</span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface mb-space-xs">Design Flexibility</h3>
<p className="font-body-md text-body-md text-primary font-medium italic mb-space-sm">
            "Reference designs can be adapted to your preferences."
          </p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Whether from a photo, sketch, or heirloom piece, we tailor elements like cutouts, borders, and sleeves to suit your saree.
          </p>
</div>
</div>

<div className="p-space-lg bg-surface-container-lowest rounded-xl shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-primary mb-space-sm">
<span className="material-symbols-outlined text-[20px]">verified</span>
<span className="font-label-md text-label-md uppercase tracking-wider font-semibold">Principle 04</span>
</div>
<h3 className="font-headline-md text-headline-sm lg:text-headline-md text-on-surface mb-space-xs">Careful Finishing</h3>
<p className="font-body-md text-body-md text-primary font-medium italic mb-space-sm">
            "We pay attention to the final details before the garment is ready."
          </p>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Clean blind hemming, micro-piped edges, friction-free interior linings, and generous 1.5-inch expansion margins.
          </p>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-stretch">

<div className="lg:col-span-6 flex flex-col justify-between bg-surface-container-lowest p-space-lg lg:p-space-xl rounded-xl shadow-sm">
<div>
<div className="inline-flex items-center gap-space-xs mb-space-xs">
<span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Local Workshop</span>
</div>
<h2 className="font-headline-md text-headline-md lg:text-headline-lg text-on-surface tracking-tight mb-space-sm">
              Visit Guru Tailoring
            </h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
              Located in Vadakku Illandai Kulam, our workshop welcomes you for in-person measurement sessions, fabric consultation, and fitting trials.
            </p>
<div className="space-y-space-md">
<div className="p-space-md bg-surface-container-low rounded-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1">Studio Address</span>
<p className="font-body-md text-body-md text-on-surface leading-snug font-medium">
                  1/236 Pillayar Kovil Street,<br/>
                  Vadakku Illandai Kulam,<br/>
                  Tamil Nadu – 628953
                </p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="p-space-sm bg-surface-container-low rounded-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1">Operating Hours</span>
<p className="font-body-sm text-body-sm text-on-surface">Mon – Sat: 10:00 AM – 8:00 PM</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Sunday: By Consultation</p>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant block mb-1">Direct Line</span>
<a className="font-body-sm text-body-sm font-medium text-primary hover:text-surface-tint block" href="tel:+917639189075">
                    +91 76391 89075
                  </a>
<span className="font-label-sm text-label-sm text-on-surface-variant">Calls &amp; Inquiries</span>
</div>
</div>
</div>
</div>

<div className="mt-space-lg flex flex-wrap gap-space-sm">
<a className="inline-flex items-center justify-center gap-space-xs px-space-md h-12 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider rounded transition-all hover:bg-surface-tint active:scale-[0.995]" href="tel:+917639189075">
<span className="material-symbols-outlined text-[18px]">call</span>
<span className="">Call Directly</span>
</a>
<a className="inline-flex items-center justify-center gap-space-xs px-space-md h-12 bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider rounded transition-colors hover:bg-surface-container-high active:scale-[0.995]" href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring,%20I'd%20like%20to%20visit%20your%20workshop%20for%20tailoring." rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span className="">WhatsApp Us</span>
</a>
<a className="inline-flex items-center justify-center gap-space-xs px-space-md h-12 bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider rounded transition-colors hover:text-on-surface hover:bg-surface-container-high" href="https://maps.google.com/?q=Pillayar+Kovil+Street+Vadakku+Illandai+Kulam+Tamil+Nadu+628953" rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">directions</span>
<span className="">Get Directions</span>
</a>
</div>
</div>

<div className="lg:col-span-6 flex flex-col">
<div className="relative w-full h-[380px] lg:h-full min-h-[360px] rounded-xl overflow-hidden shadow-sm bg-surface-container" alt="Image" data-location="Pillayar Kovil Street, Vadakku Illandai Kulam, Tamil Nadu, India" style={{ backgroundImage: "url('/assets/images/static-asset-12.jpg')" }}>

<div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent flex flex-col justify-end p-space-md lg:p-space-lg text-on-primary">
<div className="bg-surface/95 text-on-surface p-space-md rounded-lg shadow-md max-w-sm backdrop-blur-sm">
<div className="flex items-start gap-space-sm">
<span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[18px]">styler</span>
</span>
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Guru Tailoring Atelier</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Pillayar Kovil Street, Vadakku Illandai Kulam</p>
<p className="font-label-sm text-label-sm text-primary font-medium mt-space-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">pin_drop</span>
                      Opposite Pillayar Kovil temple lane
                    </p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full px-margin-mobile lg:px-margin py-space-xl">
        <div className="max-w-7xl mx-auto bg-primary text-on-primary rounded-xl p-space-lg lg:p-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-md relative overflow-hidden">

<div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-on-primary/5 pointer-events-none"></div>
<div className="max-w-2xl relative z-10 text-left">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed block mb-space-xs">Bespoke Inquiries</span>
<h2 className="font-headline-md text-headline-md lg:text-headline-lg tracking-tight mb-space-xs">
          Have Something Specific in Mind?
        </h2>
<p className="font-body-md text-body-md text-on-primary/90 leading-relaxed">
          Bring us your reference design or tell us what you're looking for. We'll discuss the possibilities with you.
        </p>
</div>
<div className="flex flex-col sm:flex-row gap-space-sm w-full lg:w-auto relative z-10 shrink-0">
<a className="h-12 px-space-lg bg-surface text-on-surface font-label-md text-label-md uppercase tracking-wider rounded flex items-center justify-center transition-all hover:bg-surface-container-low active:scale-[0.995]" data-path="custom-request" href="#">
          Request a Custom Design
        </a>
<a className="h-12 px-space-lg bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider rounded flex items-center justify-center gap-space-xs transition-colors hover:bg-surface-tint active:scale-[0.995]" href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring,%20I'd%20like%20to%20discuss%20a%20custom%20blouse%20or%20garment%20design." rel="noopener noreferrer" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span className="">WhatsApp Us</span>
</a>
</div>
</div>
</section>
</div></main>
  );
};

export default About;
