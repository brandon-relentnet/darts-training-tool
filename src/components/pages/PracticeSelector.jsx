import React from 'react';
import { PRACTICE_CONFIGS } from '../../config/practiceConfigs';

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

export default PracticeSelector;