import React, { useState, useEffect, useRef } from 'react';
import Timer from '../ui/Timer';
import StatsCard from '../ui/StatsCard';
import TrackingInterface from '../ui/TrackingInterface';

const PhaseScreen = ({ 
  phase, 
  onComplete, 
  onBack, 
  isTimerVisible, 
  onToggleTimer, 
  currentSession, 
  currentPhaseIndex, 
  totalPhases 
}) => {
  const [hits, setHits] = useState(0);
  const [throws, setThrows] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [trackingMode, setTrackingMode] = useState('auto');
  const [statsView, setStatsView] = useState('phase');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Reset phase stats when phase changes
  useEffect(() => {
    setHits(0);
    setThrows(0);
    setSeconds(0);
    setIsRunning(false);
  }, [currentPhaseIndex]);

  const handleComplete = () => {
    setIsRunning(false);
    const accuracy = throws > 0 ? (hits / throws) * 100 : 0;
    onComplete({
      phaseId: phase.id,
      hits,
      throws,
      accuracy,
      duration: seconds
    });
  };

  const accuracy = throws > 0 ? Math.round((hits / throws) * 100) : 0;

  // Calculate session totals from completed phases only
  const sessionTotals = currentSession.phases.reduce((acc, phase) => {
    acc.hits += phase.hits || 0;
    acc.throws += phase.throws || 0;
    return acc;
  }, { hits: 0, throws: 0 });

  // Session stats include current phase
  const sessionStats = {
    hits: sessionTotals.hits + hits,
    throws: sessionTotals.throws + throws,
    accuracy: (sessionTotals.throws + throws) > 0 ? Math.round(((sessionTotals.hits + hits) / (sessionTotals.throws + throws)) * 100) : 0
  };

  // Choose which stats to display
  const displayStats = statsView === 'phase' 
    ? { hits, throws, accuracy, label: 'Current Phase' }
    : { hits: sessionStats.hits, throws: sessionStats.throws, accuracy: sessionStats.accuracy, label: 'Full Session' };

  return (
    <div className="bg-base-200 p-4 min-h-screen">
      <div className="space-y-4 mx-auto max-w-md">
        {/* Header */}
        <div className="bg-base-100 rounded-box navbar">
          <div className="navbar-start">
            <button className="btn btn-ghost btn-circle" onClick={onBack}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="navbar-center">
            <span className="font-bold text-lg">🎯 {phase.name}</span>
          </div>
          <div className="navbar-end">
            <button 
              className="btn btn-ghost btn-sm"
              onClick={onToggleTimer}
            >
              {isTimerVisible ? 'Hide Timer' : 'Timer'}
            </button>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="bg-base-100 shadow-xl card">
          <div className="p-4 card-body">
            <div className="flex justify-center items-center gap-4">
              <span className="font-medium text-sm">Tracking Mode:</span>
              <div className="join">
                <button 
                  className={`btn btn-sm join-item ${trackingMode === 'auto' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setTrackingMode('auto')}
                >
                  Auto
                </button>
                <button 
                  className={`btn btn-sm join-item ${trackingMode === 'manual' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setTrackingMode('manual')}
                >
                  Manual
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Info */}
        <div className="alert alert-info">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <div className="font-bold">{phase.description}</div>
            <div className="text-sm">Suggested: {phase.suggestedThrows} throws</div>
          </div>
        </div>

        {/* Timer */}
        <Timer 
          isRunning={isRunning}
          onToggle={() => setIsRunning(!isRunning)}
          seconds={seconds}
          isVisible={isTimerVisible}
        />

        {/* Current Stats - Always Visible */}
        <div className="bg-base-100 shadow-xl card">
          <div className="p-4 card-body">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm card-title">Current Stats</h3>
              <div className="join">
                <button 
                  className={`btn btn-xs join-item ${statsView === 'phase' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setStatsView('phase')}
                >
                  Phase
                </button>
                <button 
                  className={`btn btn-xs join-item ${statsView === 'session' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setStatsView('session')}
                >
                  Session
                </button>
              </div>
            </div>
            <div className="gap-2 grid grid-cols-3">
              <div className="bg-base-200 p-3 rounded-lg stat">
                <div className="text-xs stat-title">Hits</div>
                <div className="text-success text-xl stat-value">{displayStats.hits}</div>
              </div>
              <div className="bg-base-200 p-3 rounded-lg stat">
                <div className="text-xs stat-title">Throws</div>
                <div className="text-info text-xl stat-value">{displayStats.throws}</div>
              </div>
              <div className="bg-base-200 p-3 rounded-lg stat">
                <div className="text-xs stat-title">Accuracy</div>
                <div className="text-primary text-xl stat-value">{displayStats.accuracy}%</div>
              </div>
            </div>
            <div className="opacity-70 mt-2 text-xs text-center">
              {statsView === 'phase' 
                ? `Phase ${currentPhaseIndex + 1} of ${totalPhases}`
                : `${currentSession.phases.length} completed + current phase`
              }
            </div>
          </div>
        </div>

        {/* Tracking Interface */}
        <TrackingInterface 
          trackingMode={trackingMode}
          hits={hits}
          throws={throws}
          setHits={setHits}
          setThrows={setThrows}
        />

        {/* Complete Button */}
        <button 
          className="btn-block btn btn-primary btn-lg"
          onClick={handleComplete}
          disabled={throws === 0}
        >
          Complete Phase
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhaseScreen;