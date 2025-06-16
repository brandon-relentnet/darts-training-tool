import React from 'react';

const Timer = ({ isRunning, onToggle, seconds, isVisible }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-base-300 shadow-xl card">
      <div className="items-center p-4 text-center card-body">
        <div className="font-mono text-4xl countdown">
          <span style={{"--value": minutes}}></span>:
          <span style={{"--value": remainingSeconds}}></span>
        </div>
        <button 
          className={`btn ${isRunning ? 'btn-warning' : 'btn-success'}`}
          onClick={onToggle}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default Timer;