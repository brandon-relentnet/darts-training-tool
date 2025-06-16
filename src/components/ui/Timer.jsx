import React from 'react';

const Timer = ({ isRunning, onToggle, seconds, isVisible }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-gradient-to-br from-base-100 to-base-200 shadow-xl card rounded-2xl border border-base-300">
      <div className="items-center p-6 text-center card-body">
        <div className="bg-base-300/50 p-4 rounded-2xl mb-4">
          <div className="font-mono text-5xl countdown font-bold">
            <span style={{"--value": minutes}}></span>:
            <span style={{"--value": remainingSeconds}}></span>
          </div>
        </div>
        <button 
          className={`btn btn-lg rounded-xl font-semibold min-h-12 px-8 shadow-md hover:shadow-lg transition-all ${
            isRunning 
              ? 'btn-warning text-warning-content' 
              : 'btn-success text-success-content'
          }`}
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            {isRunning ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Start</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Timer;