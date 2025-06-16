import React, { useState, useEffect } from 'react';
import PracticeSelector from './components/pages/PracticeSelector';
import PhaseScreen from './components/pages/PhaseScreen';
import StatsAndData from './components/pages/StatsAndData';
import ThemeSelector from './components/ui/ThemeSelector';
import { getUserId } from './utils/dataUtils';
import { PRACTICE_CONFIGS } from './config/practiceConfigs';

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
    <div className="min-h-screen">
      {currentView === 'selector' && (
        <div className="animate-in fade-in duration-300">
          <div className="bg-base-100 navbar shadow-lg">
            <div className="flex-1">
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                🎯 Dart Tracker
              </span>
            </div>
            <div className="flex-none gap-2">
              <ThemeSelector />
              <button 
                className="btn btn-ghost rounded-xl hover:bg-base-200 transition-all duration-200"
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
        <div className="animate-in slide-in-from-right duration-300">
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
        </div>
      )}

      {currentView === 'stats' && (
        <div className="animate-in slide-in-from-left duration-300">
          <StatsAndData 
            sessions={sessions} 
            onBack={() => setCurrentView('selector')}
            onImport={handleImportData}
            onClear={handleClearData}
            userId={userId}
            setCurrentView={setCurrentView}
          />
        </div>
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