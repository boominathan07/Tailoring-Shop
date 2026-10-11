import { useState, useEffect } from 'react';
import GalleryCard from '../../components/shared/GalleryCard';
import apiClient from '../../api/client';

const Work = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Works');

  const filters = ['All Works', 'Blouses', 'Bridal Dresses', 'Custom', 'Alterations'];

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await apiClient.get('/works');
        if (response.data.success) {
          const d = response.data.data;
          setWorks(d.works || d);
        }
      } catch (err) {
        setError('Failed to load portfolio works.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  const getFilteredWorks = () => {
    if (activeFilter === 'All Works') return works;
    if (activeFilter === 'Blouses') return works.filter(work => work.category === 'Blouse');
    if (activeFilter === 'Bridal Dresses') return works.filter(work => work.category === 'Bridal' || work.category === 'Dress');
    if (activeFilter === 'Custom') return works.filter(work => work.category === 'Other');
    if (activeFilter === 'Alterations') return works.filter(work => work.category === 'Alteration');
    
    return works.filter(work => work.category === activeFilter);
  };

  const filteredWorks = getFilteredWorks();

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Page Identification */}
      <section className="w-full bg-surface-bright pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <span className="text-outline-variant text-xs">/</span>
            <span aria-current="page" className="text-on-surface font-semibold">Our Work</span>
          </nav>
        </div>
      </section>

      {/* Compact Editorial Header */}
      <section className="w-full bg-surface-bright pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl flex flex-col gap-3">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
              Archive & Lookbook
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Made with Care, Stitch by Stitch
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl leading-relaxed">
              A look at some of the bridal blouses, everyday silks, festive kurtis, and delicate heirloom alterations bespoke-drafted and hand-finished inside our Vadakku Illandai Kulam atelier.
            </p>
          </div>
          
          {/* Filter Controls & Garment Counter Bar */}
          <div className="mt-8 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 pb-2 md:pb-0">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative filter-tab whitespace-nowrap px-4 py-2 text-label-md font-label-md rounded transition-all ${
                    activeFilter === filter 
                    ? 'bg-primary-container text-on-tertiary shadow-sm' 
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {/* Invisible placeholder locks width to max state */}
                  <div className="flex items-center gap-1.5 opacity-0 pointer-events-none" aria-hidden="true">
                    <span className="material-symbols-outlined text-[15px]">check</span>
                    <span>{filter}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5">
                    {activeFilter === filter && <span className="material-symbols-outlined text-[15px]">check</span>}
                    <span>{filter}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 self-start md:self-auto font-label-md text-label-md text-on-surface-variant bg-surface-container-low px-3.5 py-1.5 rounded">
              <span className="material-symbols-outlined text-primary text-[17px]">inventory_2</span>
              <span>Showing <span className="font-semibold text-on-surface">{filteredWorks.length}</span> {activeFilter === 'All Works' ? 'completed garments' : activeFilter}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid Section */}
      <section className="w-full bg-surface py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading && <div className="py-20 text-center text-on-surface-variant">Loading portfolio works...</div>}
          {error && <div className="py-20 text-center text-error">{error}</div>}
          {!loading && !error && filteredWorks.length === 0 && (
             <div className="py-20 text-center text-on-surface-variant font-body-lg">
               No works found matching this category.
             </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredWorks.map((work) => (
              <GalleryCard key={work._id} item={work} type="work" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Work;
