import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, onClose, duration]);

  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'info';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success': return 'text-primary';
      case 'error': return 'text-error';
      case 'info': return 'text-secondary';
      default: return 'text-primary';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 mx-auto sm:mx-0 w-auto max-w-sm sm:max-w-md sm:min-w-[250px] z-[100] bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded shadow-lg font-body-md animate-fade-in flex items-center gap-3">
      <span className={`material-symbols-outlined text-[20px] shrink-0 ${getColor()}`}>
        {getIcon()}
      </span>
      <span className="flex-1 min-w-0 break-words">{message}</span>
      <button onClick={onClose} className="p-1 hover:bg-inverse-surface/80 rounded-full flex items-center justify-center text-inverse-on-surface/70 hover:text-inverse-on-surface transition-colors shrink-0" aria-label="Close notification">
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};

export default Toast;
