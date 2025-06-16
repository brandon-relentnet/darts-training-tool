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
    <div className="space-y-6">
      {/* User ID Info Card */}
      <div className="alert alert-info rounded-2xl shadow-lg border-0">
        <div className="bg-info/20 p-3 rounded-full">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-lg">Your User ID: {userId}</div>
          <div className="text-sm font-medium opacity-80">Save this ID to sync data across devices</div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-4">
        {/* Export Data Card */}
        <div className="bg-base-100 shadow-xl card rounded-2xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="card-title text-lg font-bold">Export Your Data</h3>
                <p className="opacity-70 text-sm font-medium">Download your practice sessions as a JSON file</p>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-lg rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => exportDataToFile(sessions, userId)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Data
            </button>
          </div>
        </div>

        {/* Import Data Card */}
        <div className="bg-base-100 shadow-xl card rounded-2xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <div>
                <h3 className="card-title text-lg font-bold">Import Data</h3>
                <p className="opacity-70 text-sm font-medium">Upload a previously exported JSON file</p>
              </div>
            </div>
            <div className="form-control">
              <input 
                type="file" 
                accept=".json"
                onChange={handleFileImport}
                className="file-input file-input-bordered file-input-lg rounded-xl bg-base-200 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Clear Data Card */}
        <div className="bg-base-100 shadow-xl card rounded-2xl border border-base-300">
          <div className="card-body p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-error/20 p-3 rounded-full">
                <svg className="w-6 h-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="card-title text-lg font-bold text-error">Clear All Data</h3>
                <p className="opacity-70 text-sm font-medium">Permanently delete all practice sessions</p>
              </div>
            </div>
            <button 
              className="btn btn-outline btn-error btn-lg rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => {
                if (confirm('⚠️ Clear all data? This cannot be undone!\n\nThis will permanently delete all your practice sessions and cannot be recovered.')) {
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
      </div>
    </div>
  );
};

export default DataManager;