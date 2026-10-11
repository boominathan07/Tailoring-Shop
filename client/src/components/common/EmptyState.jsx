import React from 'react';

const EmptyState = ({ message = 'No data found.', icon = 'inbox' }) => (
  <div className="py-20 flex flex-col items-center justify-center text-center text-on-surface-variant w-full h-full">
    <span className="material-symbols-outlined text-[48px] text-outline mb-4">{icon}</span>
    <p className="font-body-lg">{message}</p>
  </div>
);

export default EmptyState;
