import React from 'react';
import { exportDataToFile } from '../../utils/dataUtils';

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

export default DataManager;