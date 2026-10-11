import React, { useState } from 'react';
import apiClient from '../../api/client';
import { Link, useSearchParams } from 'react-router-dom';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: searchParams.get('service') ? `Hi Guru Tailoring, I am interested in your ${searchParams.get('service')} service and would like to know more.` : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post('/enquiries', {
        ...formData,
        source: 'Website',
      });
      setIsSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit enquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full"><div className="flex flex-col w-full">

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-8 sm:pt-12 pb-20">
          {/* Breadcrumb & Header */}
          <section className="max-w-4xl mb-12 sm:mb-16">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-on-surface-variant font-label-md text-label-md mb-6">
              <Link to="/" className="hover:text-on-surface transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">home</span>
                <span>Home</span>
              </Link>
              <span className="text-outline-variant font-light select-none">/</span>
              <span className="text-primary font-medium tracking-wide">Contact</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-container font-semibold">Contact Desk</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg sm:text-display-lg text-on-surface tracking-tight mb-4 font-normal">
              Let's Talk About Your Next Outfit
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl font-normal">
              Have a question about stitching, a design, measurements or a custom request? Get in touch with Guru Tailoring.
            </p>
          </section>

          {/* Contact Options */}
          <section className="mb-14 sm:mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="group bg-surface-container-lowest rounded-xl p-7 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-2xl">call</span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold mb-1">
                    Direct Telephone
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-normal">
                    Direct Phone Call
                  </h2>
                  <p className="font-headline-sm text-headline-sm text-primary tracking-tight font-medium mb-3">
                    +91 76391 89075
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6">
                    Direct atelier telephone line for instant answers regarding fittings, timelines, and ongoing commissions.
                  </p>
                </div>
                <a href="tel:7639189075" className="h-12 w-full px-6 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  <span>Call Guru Tailoring</span>
                </a>
              </div>
              <div className="group bg-surface-container-lowest rounded-xl p-7 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-2xl">chat</span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold mb-1">
                    Instant Messaging
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-normal">
                    WhatsApp Atelier
                  </h2>
                  <p className="font-headline-sm text-headline-sm text-primary tracking-tight font-medium mb-3">
                    +91 76391 89075
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6">
                    Send reference photos, ask questions about cuts and silhouettes, or discuss design concepts directly on WhatsApp.
                  </p>
                </div>
                <a href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring,%20I'd%20like%20to%20know%20more%20about%20your%20tailoring%20services." target="_blank" rel="noopener noreferrer" className="h-12 w-full px-6 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  <span>WhatsApp Us</span>
                </a>
              </div>
              <div className="group bg-surface-container-lowest rounded-xl p-7 lg:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container mb-6 group-hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold mb-1">
                    Atelier Location
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-normal">
                    Physical Atelier
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface font-medium leading-snug mb-3">
                    1/236 Pillayar Kovil Street,<br />Vadakku Illandai Kulam
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-6">
                    Located in Vadakku Illandai Kulam, Tamil Nadu (628953) for quiet in-person measurements and custom fit appointments.
                  </p>
                </div>
                <a href="https://maps.google.com/?q=1/236+Pillayar+Kovil+Street,+Vadakku+Illandai+Kulam,+Tamil+Nadu+628953" target="_blank" rel="noopener noreferrer" className="h-12 w-full px-6 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99]">
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </section>

          {/* Form & Map Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-7 sm:p-10 shadow-sm relative">
              {!isSuccess ? (
                <>
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Consultation Desk</span>
                    </div>
                    <h2 className="font-headline-md text-headline-md text-on-surface font-normal mb-2">
                      Send Us a Message
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Leave your details and enquiry below. We will get back to you directly on your phone.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 placeholder:text-outline-variant focus:bg-surface-bright border border-surface-variant focus:border-primary"
                        placeholder="e.g. Priya Sundaram"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        Phone / WhatsApp Number <span className="text-error">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 placeholder:text-outline-variant focus:bg-surface-bright border border-surface-variant focus:border-primary"
                        placeholder="+91 98765 43210"
                      />
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        We will reach out to discuss your silhouette, timeline, and fabric preferences.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        Message / Requirements <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 placeholder:text-outline-variant focus:bg-surface-bright resize-y border border-surface-variant focus:border-primary"
                        placeholder="Tell us what you'd like to stitch, ask about a design or check measurement requirements..."
                      ></textarea>
                    </div>
                    {error && (
                      <div className="p-3 bg-error-container text-on-error-container rounded-lg text-sm">
                        {error}
                      </div>
                    )}
                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 px-8 rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99] disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        <span>{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                      </button>
                      <a href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring,%20I'd%20like%20to%20make%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="h-12 px-6 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200">
                        <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                        <span>WhatsApp Instead</span>
                      </a>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-2">
                      <span className="material-symbols-outlined text-[16px] text-primary-container">lock</span>
                      <span>Your contact details are respected and handled directly by our master tailor.</span>
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-8 px-4 text-center flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-3xl">check_circle</span>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold mb-2">Message Sent</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-normal mb-3">
                    Message Received
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you. We've received your message and will contact you using the phone number you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSuccess(false)}
                    className="h-11 px-6 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">refresh</span>
                    <span>Send Another Note</span>
                  </button>
                </div>
              )}
            </div>

            {/* Map/Address */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl p-7 lg:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-normal">
                    Visit Guru Tailoring
                  </h2>
                  <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
                    Open Atelier
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container text-xl mt-0.5">location_on</span>
                    <div className="font-body-md text-body-md text-on-surface leading-relaxed">
                      <strong className="font-semibold block text-on-surface">1/236 Pillayar Kovil Street</strong>
                      Vadakku Illandai Kulam,<br />
                      Tamil Nadu — 628953
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-container text-xl">call</span>
                    <a href="tel:7639189075" className="font-body-md text-body-md text-primary font-medium hover:underline">
                      +91 76391 89075
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-container text-xl">schedule</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Mon – Sat: 10:00 AM – 8:00 PM <span className="text-outline-variant">|</span> Sun: 11:00 AM – 5:00 PM
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href="tel:7639189075" className="h-9 px-3.5 rounded bg-surface-container-low hover:bg-surface-container text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors">
                    <span className="material-symbols-outlined text-[15px]">call</span>
                    <span>Call</span>
                  </a>
                  <a href="https://wa.me/917639189075?text=Hi%20Guru%20Tailoring,%20I'd%20like%20to%20visit%20your%20atelier." target="_blank" rel="noopener noreferrer" className="h-9 px-3.5 rounded bg-surface-container-low hover:bg-surface-container text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors">
                    <span className="material-symbols-outlined text-[15px]">forum</span>
                    <span>WhatsApp</span>
                  </a>
                  <a href="https://maps.google.com/?q=1/236+Pillayar+Kovil+Street,+Vadakku+Illandai+Kulam,+Tamil+Nadu+628953" target="_blank" rel="noopener noreferrer" className="h-9 px-3.5 rounded bg-primary-container hover:bg-primary text-surface-container-lowest font-label-sm text-label-sm uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors ml-auto">
                    <span className="material-symbols-outlined text-[15px]">directions</span>
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-6 relative overflow-hidden">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-xl">event_available</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-normal mb-1.5">
                      Planning a Visit?
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      If you'd like to discuss a design, measurements or stitching requirements in person, you can contact us before visiting so we can dedicate uninterrupted time for your consultation.
                    </p>
                    <div className="mt-4 pt-3 flex items-center gap-4">
                      <a href="tel:7639189075" className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold hover:text-on-surface transition-colors flex items-center gap-1">
                        <span>Call Atelier</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                      <span className="text-outline-variant font-light">•</span>
                      <a href="https://wa.me/917639189075" target="_blank" rel="noopener noreferrer" className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold hover:text-on-surface transition-colors flex items-center gap-1">
                        <span>WhatsApp Message</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
