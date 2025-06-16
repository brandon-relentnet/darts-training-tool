import React from 'react';
import Counter from './Counter';

const TrackingInterface = ({ trackingMode, hits, throws, setHits, setThrows }) => {
  if (trackingMode === 'auto') {
    return (
      <div className="space-y-4">
        <button 
          className="active:brightness-110 w-full h-32 text-2xl active:scale-95 transition-all duration-200 btn btn-success btn-lg"
          onClick={() => {
            setHits(hits + 1);
            setThrows(throws + 1);
            // Haptic feedback if available
            if (navigator.vibrate) navigator.vibrate(50);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>HIT</span>
            <span className="opacity-70 text-sm">+1 Hit, +1 Throw</span>
          </div>
        </button>
        <button 
          className="active:brightness-110 w-full h-32 text-2xl active:scale-95 transition-all duration-200 btn btn-error btn-lg"
          onClick={() => {
            setThrows(throws + 1);
            // Haptic feedback if available
            if (navigator.vibrate) navigator.vibrate(100);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span>MISS</span>
            <span className="opacity-70 text-sm">+1 Throw</span>
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