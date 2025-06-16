import React from 'react';
import { PRACTICE_CONFIGS } from '../../config/practiceConfigs';

const PracticeSelector = ({ onSelectPractice }) => {
  const getDifficultyColor = (key) => {
    switch(key) {
      case 'short': return 'badge-success';
      case 'medium': return 'badge-warning'; 
      case 'long': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const getDifficultyIcon = (key) => {
    switch(key) {
      case 'short': return '⚡';
      case 'medium': return '🔥';
      case 'long': return '💪';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="space-y-8 mx-auto max-w-lg p-4 pb-20">
        <div className="hero py-8">
          <div className="text-center hero-content">
            <div className="space-y-4">
              <div className="text-7xl animate-pulse">🎯</div>
              <h1 className="font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dart Practice
              </h1>
              <p className="text-lg opacity-80 font-medium">
                Choose your training session
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(PRACTICE_CONFIGS).map(([key, config]) => (
            <div 
              key={key} 
              className="bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] card rounded-2xl border border-base-300"
            >
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getDifficultyIcon(key)}</span>
                    <div>
                      <h3 className="text-primary card-title text-xl font-bold">{config.name}</h3>
                      <p className="opacity-70 text-base-content font-medium">{config.duration}</p>
                    </div>
                  </div>
                  <div className={`badge ${getDifficultyColor(key)} badge-lg font-semibold`}>
                    {config.phases.length} phases
                  </div>
                </div>
                
                <div className="bg-base-200 p-4 rounded-xl mb-4">
                  <p className="opacity-80 text-sm font-medium leading-relaxed">
                    {config.phases.map(p => p.name).join(' → ')}
                  </p>
                </div>

                <button 
                  className="btn-block btn btn-primary btn-lg rounded-xl font-semibold text-lg min-h-14 shadow-md hover:shadow-lg transition-all"
                  onClick={() => onSelectPractice(key)}
                >
                  <span>Start Practice</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeSelector;