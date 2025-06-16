import React from 'react';

const StatsCard = ({ hits, throws, accuracy, label, currentPhaseIndex, totalPhases, completedPhases }) => {
  return (
    <div className="bg-base-100 shadow-xl card">
      <div className="p-4 card-body">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm card-title">Current Stats</h3>
        </div>
        <div className="gap-2 grid grid-cols-3">
          <div className="bg-base-200 p-3 rounded-lg stat">
            <div className="text-xs stat-title">Hits</div>
            <div className="text-success text-xl stat-value">{hits}</div>
          </div>
          <div className="bg-base-200 p-3 rounded-lg stat">
            <div className="text-xs stat-title">Throws</div>
            <div className="text-info text-xl stat-value">{throws}</div>
          </div>
          <div className="bg-base-200 p-3 rounded-lg stat">
            <div className="text-xs stat-title">Accuracy</div>
            <div className="text-primary text-xl stat-value">{accuracy}%</div>
          </div>
        </div>
        <div className="opacity-70 mt-2 text-xs text-center">
          {label === 'Current Phase' 
            ? `Phase ${currentPhaseIndex + 1} of ${totalPhases}`
            : `${completedPhases} completed + current phase`
          }
        </div>
      </div>
    </div>
  );
};

export default StatsCard;