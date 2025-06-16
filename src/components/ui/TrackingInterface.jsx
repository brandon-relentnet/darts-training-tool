import React from 'react';
import Counter from './Counter';

const TrackingInterface = ({ trackingMode, hits, throws, setHits, setThrows }) => {
  if (trackingMode === 'auto') {
    return (
      <div className="space-y-6">
        <button 
          className="active:brightness-110 w-full min-h-20 sm:min-h-24 md:min-h-32 text-xl sm:text-2xl active:scale-95 transition-all duration-150 btn btn-success btn-lg rounded-2xl shadow-lg hover:shadow-xl border-0"
          onClick={() => {
            setHits(hits + 1);
            setThrows(throws + 1);
            // Enhanced haptic feedback
            if (navigator.vibrate) navigator.vibrate([30, 10, 30]);
          }}
        >
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="bg-success-content/20 p-3 rounded-full">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold">HIT</span>
            <span className="opacity-80 text-sm font-medium">+1 Hit, +1 Throw</span>
          </div>
        </button>
        <button 
          className="active:brightness-110 w-full min-h-20 sm:min-h-24 md:min-h-32 text-xl sm:text-2xl active:scale-95 transition-all duration-150 btn btn-error btn-lg rounded-2xl shadow-lg hover:shadow-xl border-0"
          onClick={() => {
            setThrows(throws + 1);
            // Different haptic pattern for miss
            if (navigator.vibrate) navigator.vibrate([50, 20, 50]);
          }}
        >
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="bg-error-content/20 p-3 rounded-full">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="font-bold">MISS</span>
            <span className="opacity-80 text-sm font-medium">+1 Throw</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Counter 
        label="Hits" 
        value={hits} 
        onChange={setHits}
        max={throws}
      />
      <Counter 
        label="Total Throws" 
        value={throws} 
        onChange={setThrows}
      />
    </div>
  );
};

export default TrackingInterface;