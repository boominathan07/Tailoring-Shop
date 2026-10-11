import React from 'react';

const MetricCard = ({ title, count, subtitle }) => (
  <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden">
    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
    <div className="flex items-center justify-between">
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">{title}</span>
    </div>
    <div className="mt-4 flex items-baseline gap-2">
      <span className="font-headline-lg text-headline-lg text-on-surface font-semibold leading-none">
        {count}
      </span>
    </div>
    <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p>
  </div>
);

export default MetricCard;
