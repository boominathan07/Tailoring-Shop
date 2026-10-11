import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-3.5 sm:py-4 border-b border-outline-variant/30 gap-4">
          <h2 className="font-headline-sm text-headline-sm text-on-surface truncate pr-2">{title}</h2>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant transition-colors shrink-0 -mr-1.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
