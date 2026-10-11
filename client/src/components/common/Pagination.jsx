import React from 'react';

const Pagination = ({ page, totalPages, setPage, disabled = false }) => {
  if (totalPages <= 1) return null;

  // Calculate page numbers to show
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const isNearCurrent = (p) => {
    if (totalPages <= 3) return true;
    if (page === 1) return p <= 3;
    if (page === totalPages) return p >= totalPages - 2;
    return Math.abs(p - page) <= 1;
  };

  return (
    <div className="py-3 px-3 sm:px-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/30 gap-2">
      <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">
        Showing Page <span className="font-medium text-on-surface">{page}</span> of {totalPages}
      </span>
      <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <button
          disabled={page === 1 || disabled}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-2.5 sm:px-3 py-1.5 rounded-md text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 font-label-md text-label-md flex items-center gap-1 shrink-0"
          aria-label="Previous Page"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="flex items-center gap-1 overflow-x-auto max-w-full justify-center">
          {startPage > 1 && (
            <>
              <button
                disabled={disabled}
                onClick={() => setPage(1)}
                className={`hidden sm:flex w-8 h-8 rounded-md items-center justify-center font-label-md text-label-md transition-colors disabled:opacity-40 ${page === 1 ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
              >
                1
              </button>
              {startPage > 2 && <span className="hidden sm:inline text-on-surface-variant px-1">...</span>}
            </>
          )}

          {pages.map(p => {
            const showOnMobile = isNearCurrent(p);
            return (
              <button
                disabled={disabled}
                key={p}
                onClick={() => setPage(p)}
                className={`${showOnMobile ? 'flex' : 'hidden sm:flex'} w-7 h-7 sm:w-8 sm:h-8 rounded-md items-center justify-center text-xs sm:text-label-md font-label-md transition-colors disabled:opacity-40 shrink-0 ${page === p ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface hover:bg-surface-container'}`}
              >
                {p}
              </button>
            );
          })}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="hidden sm:inline text-on-surface-variant px-1">...</span>}
              <button
                disabled={disabled}
                onClick={() => setPage(totalPages)}
                className={`hidden sm:flex w-8 h-8 rounded-md items-center justify-center font-label-md text-label-md transition-colors disabled:opacity-40 ${page === totalPages ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          disabled={page === totalPages || disabled}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          className="px-2.5 sm:px-3 py-1.5 rounded-md text-on-surface hover:bg-surface-container transition-colors disabled:opacity-40 font-label-md text-label-md flex items-center gap-1 shrink-0"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
