import React, { useState, useRef } from 'react';
import apiClient from '../../api/client';
import { Link } from 'react-router-dom';

const CustomRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    garmentType: 'Blouse',
    requirements: '',
    preferredDate: '',
  });
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const garmentTypes = ['Blouse', 'Dress', 'Bridal', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 5) {
        setError('Maximum 5 reference images allowed.');
        return;
      }
      setImages((prev) => [...prev, ...selectedFiles]);
      setError(null);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) submitData.append(key, formData[key]);
      });
      
      images.forEach((img) => {
        submitData.append('images', img);
      });

      await apiClient.post('/custom-requests', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setIsSuccess(true);
      setFormData({ 
        name: '', 
        phone: '', 
        garmentType: 'Blouse', 
        requirements: '', 
        preferredDate: '' 
      });
      setImages([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit custom request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full"><div className="flex flex-col w-full">

        <div className="w-full px-6 lg:px-12 pt-8 sm:pt-12 pb-20">
          <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb & Header */}
          <section className="max-w-4xl mb-12 sm:mb-16">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-on-surface-variant font-label-md text-label-md mb-6">
              <Link to="/" className="hover:text-on-surface transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">home</span>
                <span>Home</span>
              </Link>
              <span className="text-outline-variant font-light select-none">/</span>
              <span className="text-primary font-medium tracking-wide">Custom Request</span>
            </nav>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-container"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-primary-container font-semibold">Bespoke Process</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg sm:text-display-lg text-on-surface tracking-tight mb-4 font-normal">
              Request a Custom Design
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl font-normal">
              Have a specific silhouette or design in mind? Share your inspiration, reference images, and requirements. We'll consult with you to craft it exactly to your measure.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="max-w-7xl mx-auto lg:col-span-8 bg-surface-container-lowest rounded-2xl p-7 sm:p-10 shadow-sm relative">
              {!isSuccess ? (
                <>
                  <div className="mb-8 border-b border-surface-variant pb-6">
                    <h2 className="font-headline-md text-headline-md text-on-surface font-normal mb-2">
                      Your Details & Requirements
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Please provide as much detail as possible to help us understand your vision.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                          placeholder="Your Name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                          Phone / WhatsApp <span className="text-error">*</span>
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
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="garmentType" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                          Garment Type <span className="text-error">*</span>
                        </label>
                        <select
                          id="garmentType"
                          name="garmentType"
                          required
                          value={formData.garmentType}
                          onChange={handleChange}
                          className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 border border-surface-variant focus:border-primary"
                        >
                          {garmentTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="preferredDate" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                          Preferred Delivery Date
                        </label>
                        <input
                          id="preferredDate"
                          name="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="w-full h-12 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 border border-surface-variant focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="requirements" className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        Design Requirements <span className="text-error">*</span>
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        required
                        rows="6"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="w-full p-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all duration-200 placeholder:text-outline-variant focus:bg-surface-bright resize-y border border-surface-variant focus:border-primary"
                        placeholder="Describe the fabric, cut, embroidery, occasion, or any specific details you are looking for..."
                      ></textarea>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <label className="block font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold">
                        Reference Images (Max 5)
                      </label>
                      <div className="flex flex-wrap gap-4">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-surface-variant group">
                            <img 
                              src={URL.createObjectURL(img)} 
                              alt={`Reference ${idx + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              aria-label={`Remove reference image ${idx + 1}`}
                              className="absolute top-1 right-1 w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-error text-on-error flex items-center justify-center shadow-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100 transition-opacity active:scale-95"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </div>
                        ))}
                        
                        {images.length < 5 && (
                          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer relative">
                            <span className="material-symbols-outlined text-outline">add_photo_alternate</span>
                            <input 
                              type="file"
                              accept="image/*"
                              multiple
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={handleImageChange}
                              ref={fileInputRef}
                            />
                          </div>
                        )}
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Upload sketches, Pinterest screenshots, or photos of similar outfits for reference.
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-error-container text-on-error-container rounded-lg text-sm font-medium">
                        {error}
                      </div>
                    )}
                    
                    <div className="pt-6 border-t border-surface-variant">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-12 px-8 w-full sm:w-auto rounded-lg bg-primary-container hover:bg-primary text-surface-container-lowest font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99] disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-[18px]">design_services</span>
                        <span>{isSubmitting ? 'Submitting Request...' : 'Submit Custom Request'}</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center animate-fade-in">
                  <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-[40px]">check_circle</span>
                  </div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold mb-2">Request Received</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-normal mb-4">
                    Your Custom Request is Confirmed
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto mb-10 leading-relaxed">
                    Thank you for sharing your vision with us. Our master tailor will review your requirements and reference images, and we will contact you shortly to discuss measurements, fabrics, and pricing.
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="h-11 px-6 rounded-lg border border-outline-variant hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider font-semibold transition-colors"
                    >
                      Submit Another
                    </button>
                    <Link
                      to="/"
                      className="h-11 px-6 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center transition-colors"
                    >
                      Return Home
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <div className="bg-surface-container-low rounded-2xl p-7 lg:p-8 shadow-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6">The Custom Process</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-label-md text-label-md font-bold text-primary shrink-0">1</div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface mb-1">Submit Request</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Share your ideas and inspiration with us through this form.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-label-md text-label-md font-bold text-primary shrink-0">2</div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface mb-1">Consultation</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">We'll contact you to discuss fabrics, take measurements, and confirm details.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-label-md text-label-md font-bold text-primary shrink-0">3</div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface mb-1">Crafting</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Our master tailors begin drafting your unique pattern and stitching.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-label-md text-label-md font-bold text-primary shrink-0">4</div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface mb-1">Fitting & Delivery</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Try on your garment. We'll make final adjustments before handover.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 lg:p-8 flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-4xl text-primary-container mb-4">forum</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Need Help?</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                  If you're not sure how to describe your requirements, just reach out to us on WhatsApp directly.
                </p>
                <a href="https://wa.me/917639189075" target="_blank" rel="noopener noreferrer" className="h-11 px-6 w-full rounded-lg bg-surface-container-low hover:bg-surface-container text-primary-container font-label-md text-label-md uppercase tracking-wider font-semibold inline-flex items-center justify-center gap-2 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </section>
        </div>
        </div>
      </div>
    </main>
  );
};

export default CustomRequest;
