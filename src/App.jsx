import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Data persistence utilities
const generateUserId = () => {
  return 'dart_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

const getUserId = () => {
  let userId = localStorage.getItem('dartUserId');
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem('dartUserId', userId);
  }
  return userId;
};

const exportDataToFile = (sessions, userId) => {
  const data = {
    userId,
    sessions,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dart-practice-${userId}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Practice configurations
const PRACTICE_CONFIGS = {
  short: {
    name: 'Short Practice',
    duration: '15-20 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 15, description: 'Hit your favorite numbers (20s, bull)' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 20, description: 'Practice doubles 16, 20, bull' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 30, description: 'Single and double 20s' }
    ]
  },
  medium: {
    name: 'Medium Practice',
    duration: '30-40 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 20, description: 'Hit your favorite numbers' },
      { id: 'around-world', name: 'Around the World', suggestedThrows: 40, description: 'Numbers 1-20, hit twice if you miss' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 30, description: 'Doubles 1-20, then bull' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 40, description: 'Heavy focus on 20s' }
    ]
  },
  long: {
    name: 'Full Practice',
    duration: '45-60 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 25, description: 'Hit your favorite numbers' },
      { id: 'around-world', name: 'Around the World', suggestedThrows: 50, description: 'Numbers 1-20, hit twice if you miss' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 40, description: 'Doubles 1-20, then bull' },
      { id: 'triples', name: 'Triples', suggestedThrows: 30, description: 'Triple 20, 19, 14, 13' },
      { id: 'game-practice', name: 'Game Practice', suggestedThrows: 60, description: 'Play 501/301 or practice finishes' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 50, description: 'Heavy focus on single and double 20s' }
    ]
  }
};

// Counter Component
const Counter = ({ value, onChange, label, max }) => {
  return (
    <div className="bg-base-200 shadow-xl card">
      <div className="items-center p-4 text-center card-body">
        <h3 className="text-primary card-title">{label}</h3>
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-circle btn-lg btn-error"
            onClick={() => onChange(Math.max(0, value - 1))}
          >
            <span className="text-2xl">−</span>
          </button>
          <div className="form-control">
            <input 
              type="number" 
              value={value} 
              onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-bordered w-20 font-bold text-2xl text-center input input-lg"
            />
            {max && <label className="label"><span className="label-text-alt">/ {max}</span></label>}
          </div>
          <button 
            className="btn btn-circle btn-lg btn-success"
            onClick={() => onChange(value + 1)}
          >
            <span className="text-2xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Timer Component
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

// Phase Screen Component
const PhaseScreen = ({ phase, onComplete, onBack, isTimerVisible, onToggleTimer, currentSession, currentPhaseIndex, totalPhases }) => {
  const [hits, setHits] = useState(0);
  const [throws, setThrows] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [trackingMode, setTrackingMode] = useState('auto'); // 'auto' or 'manual'
  const [statsView, setStatsView] = useState('phase'); // 'phase' or 'session'
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
        {trackingMode === 'auto' ? (
          // Auto Mode - Simple Hit/Miss buttons with better feedback
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
        ) : (
          // Manual Mode - Counters
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
        )}

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

// Practice Selector Component
const PracticeSelector = ({ onSelectPractice }) => {
  return (
    <div className="bg-base-200 p-4 min-h-screen">
      <div className="space-y-6 mx-auto max-w-md">
        <div className="hero">
          <div className="text-center hero-content">
            <div>
              <h1 className="font-bold text-5xl">🎯</h1>
              <h2 className="font-bold text-3xl">Dart Practice</h2>
              <p className="py-2">Choose your practice session</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(PRACTICE_CONFIGS).map(([key, config]) => (
            <div key={key} className="bg-base-100 shadow-xl hover:shadow-2xl transition-shadow card">
              <div className="card-body">
                <h3 className="text-primary card-title">{config.name}</h3>
                <p className="opacity-70 text-base-content">{config.duration}</p>
                <div className="badge-outline badge">{config.phases.length} phases</div>
                <div className="opacity-60 text-sm">
                  {config.phases.map(p => p.name).join(' → ')}
                </div>
                <div className="justify-end card-actions">
                  <button 
                    className="btn-block btn btn-primary"
                    onClick={() => onSelectPractice(key)}
                  >
                    Start Practice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Combined Stats & Data Component
const StatsAndData = ({ sessions, onBack, onImport, onClear, userId }) => {
  const [activeTab, setActiveTab] = useState('stats');
  
  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((acc, session) => acc + (session.totalDuration || 0), 0);
  const avgAccuracy = sessions.length > 0 
    ? sessions.reduce((acc, session) => acc + (session.avgAccuracy || 0), 0) / sessions.length 
    : 0;

  const chartData = sessions.slice(-10).map((session, index) => ({
    session: `S${sessions.length - 9 + index}`,
    accuracy: Math.round(session.avgAccuracy || 0),
    duration: Math.round((session.totalDuration || 0) / 60)
  }));

  const phaseStats = sessions.flatMap(session => session.phases || [])
    .reduce((acc, phase) => {
      if (!acc[phase.phaseId]) {
        acc[phase.phaseId] = { total: 0, count: 0 };
      }
      acc[phase.phaseId].total += phase.accuracy || 0;
      acc[phase.phaseId].count += 1;
      return acc;
    }, {});

  const phaseChartData = Object.entries(phaseStats).map(([phase, data]) => ({
    phase: phase.replace('-', ' ').toUpperCase(),
    accuracy: Math.round(data.total / data.count)
  }));

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
            {/* Summary Stats */}
            <div className="shadow w-full stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="text-primary stat-figure">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="stat-title">Total Sessions</div>
                <div className="text-primary stat-value">{totalSessions}</div>
              </div>
              
              <div className="stat">
                <div className="text-secondary stat-figure">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div className="stat-title">Average Accuracy</div>
                <div className="text-secondary stat-value">{Math.round(avgAccuracy)}%</div>
              </div>
              
              <div className="stat">
                <div className="text-accent stat-figure">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="stat-title">Total Practice Time</div>
                <div className="text-accent stat-value">{Math.round(totalTime / 60)}m</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Best Session</div>
                <div className="stat-value">
                  {sessions.length > 0 ? Math.round(Math.max(...sessions.map(s => s.avgAccuracy || 0))) : 0}%
                </div>
              </div>
            </div>

            {/* Progress Chart */}
            {chartData.length > 0 && (
              <div className="bg-base-100 shadow-xl card">
                <div className="card-body">
                  <h3 className="text-primary card-title">Progress Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--bc) / 0.2)" />
                      <XAxis 
                        dataKey="session" 
                        tick={{ fill: 'oklch(var(--bc))' }}
                        axisLine={{ stroke: 'oklch(var(--bc) / 0.3)' }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fill: 'oklch(var(--bc))' }}
                        axisLine={{ stroke: 'oklch(var(--bc) / 0.3)' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'oklch(var(--b1))',
                          border: '1px solid oklch(var(--bc) / 0.2)',
                          borderRadius: '0.5rem',
                          color: 'oklch(var(--bc))'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="oklch(var(--p))" 
                        strokeWidth={3}
                        dot={{ fill: "oklch(var(--p))", strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Phase Performance */}
            {phaseChartData.length > 0 && (
              <div className="bg-base-100 shadow-xl card">
                <div className="card-body">
                  <h3 className="text-primary card-title">Phase Performance</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={phaseChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--bc) / 0.2)" />
                      <XAxis 
                        dataKey="phase" 
                        tick={{ fill: 'oklch(var(--bc))' }}
                        axisLine={{ stroke: 'oklch(var(--bc) / 0.3)' }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        tick={{ fill: 'oklch(var(--bc))' }}
                        axisLine={{ stroke: 'oklch(var(--bc) / 0.3)' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'oklch(var(--b1))',
                          border: '1px solid oklch(var(--bc) / 0.2)',
                          borderRadius: '0.5rem',
                          color: 'oklch(var(--bc))'
                        }}
                      />
                      <Bar dataKey="accuracy" fill="oklch(var(--s))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
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

const DataManager = ({ sessions, onImport, onClear, userId }) => {
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.sessions && Array.isArray(data.sessions)) {
          onImport(data.sessions, data.userId);
        } else {
          alert('Invalid file format');
        }
      } catch (error) {
        alert('Error reading file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="alert alert-info">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <div>
          <div className="font-bold">Your User ID: {userId}</div>
          <div className="text-sm">Save this ID to sync data across devices</div>
        </div>
      </div>

      <div className="gap-4 grid">
        <button 
          className="btn btn-primary"
          onClick={() => exportDataToFile(sessions, userId)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Data
        </button>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Import Data File</span>
          </label>
          <input 
            type="file" 
            accept=".json"
            onChange={handleFileImport}
            className="file-input-bordered file-input"
          />
        </div>

        <button 
          className="btn-outline btn btn-error"
          onClick={() => {
            if (confirm('Clear all data? This cannot be undone!')) {
              onClear();
            }
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Clear All Data
        </button>
      </div>
    </div>
  );
};
const DartTracker = () => {
  const [currentView, setCurrentView] = useState('selector');
  const [currentPractice, setCurrentPractice] = useState(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('dartSessions');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSession, setCurrentSession] = useState({
    phases: [],
    startTime: null,
    practiceType: null
  });
  const [isTimerVisible, setIsTimerVisible] = useState(true);
  const userId = getUserId();

  // Save sessions to localStorage
  useEffect(() => {
    localStorage.setItem('dartSessions', JSON.stringify(sessions));
  }, [sessions]);

  const handleSelectPractice = (practiceKey) => {
    const practice = PRACTICE_CONFIGS[practiceKey];
    setCurrentPractice(practice);
    setCurrentPhaseIndex(0);
    setCurrentSession({
      phases: [],
      startTime: Date.now(),
      practiceType: practiceKey
    });
    setCurrentView('practice');
  };

  const handlePhaseComplete = (phaseData) => {
    const newSession = {
      ...currentSession,
      phases: [...currentSession.phases, phaseData]
    };
    setCurrentSession(newSession);

    // Check if this was the last phase
    if (currentPhaseIndex >= currentPractice.phases.length - 1) {
      // Complete the session
      const totalDuration = Math.floor((Date.now() - newSession.startTime) / 1000);
      const avgAccuracy = newSession.phases.reduce((acc, phase) => acc + (phase.accuracy || 0), 0) / newSession.phases.length;
      
      const completedSession = {
        ...newSession,
        totalDuration,
        avgAccuracy,
        completedAt: new Date().toISOString(),
        id: Date.now()
      };

      setSessions(prev => [...prev, completedSession]);
      
      // Show completion alert
      alert(`🎯 Practice Complete!\nAccuracy: ${Math.round(avgAccuracy)}%\nTime: ${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`);
      setCurrentView('selector');
      setCurrentPractice(null);
      setCurrentPhaseIndex(0);
      setCurrentSession({ phases: [], startTime: null, practiceType: null });
    } else {
      // Move to next phase
      setCurrentPhaseIndex(prev => prev + 1);
    }
  };

  const handleBackFromPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(prev => prev - 1);
    } else {
      setCurrentView('selector');
      setCurrentPractice(null);
      setCurrentSession({ phases: [], startTime: null, practiceType: null });
    }
  };

  const handleImportData = (importedSessions, importedUserId) => {
    if (importedUserId && importedUserId !== userId) {
      const shouldMerge = confirm(
        `This data is from a different user (${importedUserId}). ` +
        `Do you want to merge it with your current data?`
      );
      
      if (shouldMerge) {
        setSessions(prev => [...prev, ...importedSessions]);
      } else {
        setSessions(importedSessions);
      }
    } else {
      setSessions(importedSessions);
    }
  };

  const handleClearData = () => {
    setSessions([]);
    localStorage.removeItem('dartSessions');
  };

  const currentPhase = currentPractice?.phases[currentPhaseIndex];

  return (
    <div className="min-h-screen" data-theme="dark">
      {currentView === 'selector' && (
        <div>
          <div className="bg-base-100 navbar">
            <div className="flex-1">
              <span className="font-bold text-xl">🎯 Dart Tracker</span>
            </div>
            <div className="flex-none">
              <button 
                className="btn btn-ghost"
                onClick={() => setCurrentView('stats')}
              >
                📊 Stats & Data
              </button>
            </div>
          </div>
          <PracticeSelector onSelectPractice={handleSelectPractice} />
        </div>
      )}

      {currentView === 'practice' && currentPhase && (
        <PhaseScreen
          phase={currentPhase}
          onComplete={handlePhaseComplete}
          onBack={handleBackFromPhase}
          isTimerVisible={isTimerVisible}
          onToggleTimer={() => setIsTimerVisible(!isTimerVisible)}
          currentSession={currentSession}
          currentPhaseIndex={currentPhaseIndex}
          totalPhases={currentPractice?.phases.length || 0}
        />
      )}

      {currentView === 'stats' && (
        <StatsAndData 
          sessions={sessions} 
          onBack={() => setCurrentView('selector')}
          onImport={handleImportData}
          onClear={handleClearData}
          userId={userId}
        />
      )}

      {/* Progress indicator for practice */}
      {currentView === 'practice' && currentPractice && (
        <div className="btm-nav btm-nav-xs">
          {currentPractice.phases.map((_, index) => (
            <button 
              key={index}
              className={`${index === currentPhaseIndex ? 'active' : ''} ${index < currentPhaseIndex ? 'text-success' : ''}`}
            >
              {index < currentPhaseIndex ? '✓' : index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DartTracker;