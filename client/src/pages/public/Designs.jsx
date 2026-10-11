import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GalleryCard from '../../components/shared/GalleryCard';
import apiClient from '../../api/client';

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const tabs = ['All', 'Blouses', 'Bridal', 'Dresses', 'Custom'];
  
  // Note: Backend uses 'Bridal', 'Party Wear', 'Casual', 'Formal', 'Indo-Western'
  // We map the UI tabs to backend categories if possible, or fetch all and filter in frontend.
  // For maximum flexibility, we'll fetch all and filter in memory based on the tab semantics.

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await apiClient.get('/designs');
        if (response.data?.success) {
          const d = response.data.data;
          const designList = Array.isArray(d?.designs) ? d.designs : (Array.isArray(d) ? d : []);
          setDesigns(designList);
        }
      } catch (err) {
        setError('Failed to load designs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDesigns();
  }, []);

  const getFilteredDesigns = () => {
    return designs.filter(design => {
      // Search filter
      const searchMatch = !searchTerm || 
        design.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        design.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!searchMatch) return false;
      
      // Tab filter
      if (activeTab === 'All') return true;
      if (activeTab === 'Bridal' && design.category === 'Bridal') return true;
      if (activeTab === 'Blouses' && (design.category === 'Party Wear' || design.category === 'Casual')) return true; // Approximation for demo
      if (activeTab === 'Dresses' && (design.category === 'Formal' || design.category === 'Indo-Western')) return true;
      if (activeTab === 'Custom' && design.category === 'Indo-Western') return true; // Approximation
      
      return false; // Strict match if backend category perfectly aligns with tab, otherwise adjust above
    });
  };

  const filteredDesigns = getFilteredDesigns();

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 lg:py-16">
        
        {/* Top Editorial Header & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#DEDCCF]/60">
          <div className="max-w-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-container font-semibold">Our Designs</span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mt-2 tracking-tight">Find a Style You Love</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
              Explore our collection of blouse and dress designs, or bring us a reference and we'll create something perfectly suited to your style, posture, and fabric drape.
            </p>
          </div>
          
          {/* Search & Curated Count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[19px]">search</span>
              <input 
                className="w-full h-11 pl-10 pr-4 text-body-sm font-body-sm bg-surface-container-lowest border border-[#DEDCCF] rounded-[4px] text-on-surface placeholder:text-outline/70 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" 
                placeholder="Search cut, fabric, work..." 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="h-11 px-4 flex items-center justify-center bg-surface-container rounded-[4px] text-on-surface-variant font-label-md text-label-md whitespace-nowrap">
              <span>Showing {filteredDesigns.length} Curated Designs</span>
            </div>
          </div>
        </div>

        {/* Category Tabs Navigation */}
        <div className="pt-8 pb-4 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab 
                    ? "h-10 px-5 rounded-[4px] font-label-md text-label-md transition-all duration-150 bg-primary-container text-on-primary whitespace-nowrap"
                    : "h-10 px-5 rounded-[4px] font-label-md text-label-md transition-all duration-150 bg-surface-container-lowest text-on-surface-variant border border-[#DEDCCF] hover:text-on-surface hover:border-primary-container/40 whitespace-nowrap"
                  }
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-outline font-label-sm text-label-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span>Bespoke Handcrafted</span>
            </div>
          </div>
        </div>

        {/* Curated 3-Column Design Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 justify-items-center">
          {loading && <div className="col-span-full py-20 text-center text-on-surface-variant">Loading designs...</div>}
          {error && <div className="col-span-full py-20 text-center text-error">{error}</div>}
          {!loading && !error && filteredDesigns.length === 0 && (
            <div className="col-span-full py-20 text-center text-on-surface-variant font-body-lg">
              No designs found matching your criteria.
            </div>
          )}
          
          {filteredDesigns.map((design) => (
            <GalleryCard key={design._id} item={design} type="design" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Designs;
