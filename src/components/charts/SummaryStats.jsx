import React from 'react';

const SummaryStats = ({ totalSessions, avgAccuracy, totalTime, bestSession }) => {
  return (
    <div className="shadow-xl w-full stats stats-vertical lg:stats-horizontal">
      <div className="stat bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="text-primary stat-figure">
          <div className="bg-primary/20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div className="stat-title text-primary/80 font-medium">Total Sessions</div>
        <div className="text-primary stat-value text-4xl font-bold">{totalSessions}</div>
        <div className="stat-desc text-primary/60">Practice sessions completed</div>
      </div>
      
      <div className="stat bg-gradient-to-br from-secondary/10 to-secondary/5">
        <div className="text-secondary stat-figure">
          <div className="bg-secondary/20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
        <div className="stat-title text-secondary/80 font-medium">Average Accuracy</div>
        <div className="text-secondary stat-value text-4xl font-bold">{Math.round(avgAccuracy)}%</div>
        <div className="stat-desc text-secondary/60">Across all sessions</div>
      </div>
      
      <div className="stat bg-gradient-to-br from-accent/10 to-accent/5">
        <div className="text-accent stat-figure">
          <div className="bg-accent/20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
        <div className="stat-title text-accent/80 font-medium">Total Practice Time</div>
        <div className="text-accent stat-value text-4xl font-bold">{Math.round(totalTime / 60)}m</div>
        <div className="stat-desc text-accent/60">Minutes practiced</div>
      </div>
      
      <div className="stat bg-gradient-to-br from-success/10 to-success/5">
        <div className="text-success stat-figure">
          <div className="bg-success/20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z"/>
            </svg>
          </div>
        </div>
        <div className="stat-title text-success/80 font-medium">Best Session</div>
        <div className="text-success stat-value text-4xl font-bold">
          {Math.round(bestSession)}%
        </div>
        <div className="stat-desc text-success/60">Personal best accuracy</div>
      </div>
    </div>
  );
};

export default SummaryStats;