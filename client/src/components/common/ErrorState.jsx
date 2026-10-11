import React from 'react';

const ErrorState = ({ message = 'An error occurred.', retryFn = null }) => (
  <div className="py-20 flex flex-col items-center justify-center text-center w-full h-full">
    <span className="material-symbols-outlined text-[48px] text-error mb-4">error</span>
    <p className="text-error font-body-lg mb-4">{message}</p>
    {retryFn && (
      <button 
        onClick={retryFn}
        className="px-4 py-2 bg-error-container text-on-error-container rounded-md font-label-md hover:bg-error hover:text-on-error transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
