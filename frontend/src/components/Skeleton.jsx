import React from 'react';

export const Skeleton = ({ className = '', rounded = 'rounded-md' }) => {
  return <div className={`skeleton-shimmer ${rounded} ${className}`} />;
};

export const CardSkeleton = () => {
  return (
    <div className="card space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );
};

export const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="card flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
