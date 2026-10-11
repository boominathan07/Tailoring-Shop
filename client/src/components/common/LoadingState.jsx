import React from 'react';

const LoadingState = ({ message = 'Loading...' }) => (
  <div className="py-20 flex flex-col items-center justify-center text-on-surface-variant w-full h-full min-h-[50vh]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
    <p>{message}</p>
  </div>
);

export default LoadingState;
