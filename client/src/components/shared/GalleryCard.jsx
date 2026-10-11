import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GalleryCard = ({ item, type, showView = true }) => {
  const navigate = useNavigate();
  
  const isDesign = type === 'design';
  const isWork = type === 'work';

  const handleImageClick = () => {
    if (isDesign) navigate(`/designs/${item._id}`);
  };

  const imageSrc = item.images && item.images[0] ? item.images[0].url : '';
  const fallbackImg = 'https://placehold.co/600x800/f4f4f4/888888?text=Image+Unavailable';

  return (
    <article className="group flex flex-col bg-surface-container-lowest rounded-md overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgba(35,45,30,0.06)] border border-outline-variant/20 hover:border-outline-variant/50 w-full max-w-[360px] mx-auto">
      <div 
        className={`relative w-full aspect-[4/5] bg-surface-container overflow-hidden ${isDesign ? 'cursor-pointer' : ''}`}
        onClick={handleImageClick}
      >
        {imageSrc ? (
          <img 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" 
            src={imageSrc} 
            onError={(e) => { e.target.onerror = null; e.target.src = fallbackImg; }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-outline">
            <span className="material-symbols-outlined text-[48px]">image_not_supported</span>
          </div>
        )}
        
        {/* Top Left Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-[3px] text-on-surface font-label-sm text-[10px] tracking-[0.08em] uppercase shadow-sm">
          {item.category}
        </div>
        
        {/* Work Specific Bottom Overlay */}
        {isWork && (
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-label-sm text-label-sm flex items-center gap-1">
              {item.metadata?.fabric || 'Handcrafted'} {item.metadata?.timeSpent ? `· ${item.metadata.timeSpent}` : ''}
            </span>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <div>
          {isWork && item.referenceNumber && (
            <div className="flex items-center justify-end mb-1">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">Ref #{item.referenceNumber}</span>
            </div>
          )}
          <h2 className="font-headline-sm text-lg text-on-surface font-normal leading-snug group-hover:text-primary transition-colors line-clamp-1">
            {item.title}
          </h2>
          <p className={`font-body-sm text-sm text-on-surface-variant mt-1.5 leading-relaxed font-light ${isDesign ? 'line-clamp-2' : 'line-clamp-2'}`}>
            {item.description}
          </p>
        </div>
        
        {/* Footer Actions (Boutique Style) */}
        <div className="pt-3 mt-auto border-t border-outline-variant/20 flex items-center justify-between">
          {isDesign && (
            <>
              <div className="flex flex-col">
                <span className="font-label-sm text-[10px] uppercase tracking-[0.05em] text-outline-variant">Starting from</span>
                <span className="font-body-sm text-sm text-on-surface">₹2,000</span>
              </div>
              <div className="flex items-center gap-3">
                {showView && (
                  <Link 
                    to={`/designs/${item._id}`}
                    className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                  >
                    View <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </Link>
                )}
                <Link 
                  to="/contact"
                  className="font-label-sm text-xs uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  Enquire <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                </Link>
              </div>
            </>
          )}
          {isWork && (
            <>
              <Link 
                className="inline-flex items-center gap-1 font-label-sm text-xs uppercase tracking-wider text-primary hover:text-primary/80 transition-colors group/link" 
                to="/contact"
              >
                <span>Enquire Similar</span>
                <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-0.5 transition-transform">arrow_forward</span>
              </Link>
              {item.metadata?.specialDetail && (
                <span className="font-label-sm text-[10px] text-outline bg-surface-container px-2 py-0.5 rounded-[2px]">{item.metadata.specialDetail}</span>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default GalleryCard;
