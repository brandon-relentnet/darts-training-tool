import React, { useState } from 'react';
import SummaryStats from '../charts/SummaryStats';
import ProgressChart from '../charts/ProgressChart';
import PhasePerformanceChart from '../charts/PhasePerformanceChart';
import DataManager from './DataManager';
import { calculateChartData, calculatePhaseStats, calculateSessionTotals } from '../../utils/statsUtils';

const StatsAndData = ({ sessions, onBack, onImport, onClear, userId, setCurrentView }) => {
  const [activeTab, setActiveTab] = useState('stats');
  
  const { totalSessions, totalTime, avgAccuracy, bestSession } = calculateSessionTotals(sessions);
  const chartData = calculateChartData(sessions);
  const phaseChartData = calculatePhaseStats(sessions);

  return (
    <div className="bg-base-200 p-4 min-h-screen">
      <div className="space-y-6 mx-auto max-w-6xl">
        <div className="bg-base-100 rounded-box navbar">
          <div className="navbar-start">
            <button className="btn btn-ghost btn-circle" onClick={onBack}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="navbar-center">
            <span className="font-bold text-xl">📊 Stats & Data</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs tabs-boxed">
          <button 
            className={`tab tab-lg ${activeTab === 'stats' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            📊 Statistics
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'data' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('data')}
          >
            💾 Data Management
          </button>
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {sessions.length === 0 ? (
              /* Empty State */
              <div className="bg-base-100 shadow-xl card">
                <div className="items-center p-8 text-center card-body">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">No Practice Data Yet</h3>
                  <p className="text-base-content/70 mb-6">
                    Complete your first practice session to see your stats and progress charts here.
                  </p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setCurrentView('selector')}
                  >
                    Start Your First Practice
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <SummaryStats 
                  totalSessions={totalSessions}
                  avgAccuracy={avgAccuracy}
                  totalTime={totalTime}
                  bestSession={bestSession}
                />

                {/* Progress Chart */}
                <ProgressChart data={chartData} />

                {/* Phase Performance */}
                <PhasePerformanceChart data={phaseChartData} />
              </>
            )}
          </div>
        )}

        {/* Data Management Tab */}
        {activeTab === 'data' && (
          <div className="space-y-6 mx-auto max-w-md">
            <DataManager 
              sessions={sessions}
              onImport={onImport}
              onClear={onClear}
              userId={userId}
            />

            <div className="shadow w-full stats">
              <div className="stat">
                <div className="stat-title">Sessions Stored</div>
                <div className="text-primary stat-value">{sessions.length}</div>
                <div className="stat-desc">
                  {sessions.length > 0 && `Last: ${new Date(sessions[sessions.length - 1]?.completedAt).toLocaleDateString()}`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsAndData;