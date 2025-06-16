import React from 'react';

const SummaryStats = ({ totalSessions, avgAccuracy, totalTime, bestSession, isDarkMode = false }) => {
  const theme = {
    bg: isDarkMode ? '#1f2937' : '#ffffff',
    titleText: isDarkMode ? '#d1d5db' : '#6b7280',
    valueText: isDarkMode ? '#f3f4f6' : '#1f2937',
    descText: isDarkMode ? '#9ca3af' : '#6b7280'
  };

  return (
    <div className="shadow-xl w-full stats stats-vertical lg:stats-horizontal" style={{ backgroundColor: theme.bg }}>
      <div className="stat">
        <div className="text-blue-600 stat-figure">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div className="stat-title" style={{ color: theme.titleText }}>Total Sessions</div>
        <div className="stat-value" style={{ color: theme.valueText }}>{totalSessions}</div>
        <div className="stat-desc" style={{ color: theme.descText }}>Practice sessions completed</div>
      </div>
      
      <div className="stat">
        <div className="text-green-600 stat-figure">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <div className="stat-title" style={{ color: theme.titleText }}>Average Accuracy</div>
        <div className="stat-value" style={{ color: theme.valueText }}>{Math.round(avgAccuracy)}%</div>
        <div className="stat-desc" style={{ color: theme.descText }}>Across all sessions</div>
      </div>
      
      <div className="stat">
        <div className="text-purple-600 stat-figure">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div className="stat-title" style={{ color: theme.titleText }}>Total Practice Time</div>
        <div className="stat-value" style={{ color: theme.valueText }}>{Math.round(totalTime / 60)}m</div>
        <div className="stat-desc" style={{ color: theme.descText }}>Minutes practiced</div>
      </div>
      
      <div className="stat">
        <div className="text-yellow-600 stat-figure">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z"/>
          </svg>
        </div>
        <div className="stat-title" style={{ color: theme.titleText }}>Best Session</div>
        <div className="stat-value" style={{ color: theme.valueText }}>
          {Math.round(bestSession)}%
        </div>
        <div className="stat-desc" style={{ color: theme.descText }}>Personal best accuracy</div>
      </div>
    </div>
  );
};

export default SummaryStats;