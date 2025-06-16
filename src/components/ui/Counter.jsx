import React from 'react';

const Counter = ({ value, onChange, label, max }) => {
  return (
    <div className="bg-base-200 shadow-xl card rounded-2xl">
      <div className="items-center p-6 text-center card-body">
        <h3 className="text-primary card-title text-lg font-semibold">{label}</h3>
        <div className="flex items-center gap-4 w-full">
          <button 
            className="btn btn-circle btn-lg btn-error min-h-14 min-w-14 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => {
              onChange(Math.max(0, value - 1));
              if (navigator.vibrate) navigator.vibrate(25);
            }}
          >
            <span className="text-2xl font-bold">−</span>
          </button>
          <div className="form-control flex-1">
            <input 
              type="number" 
              value={value} 
              onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-bordered w-full font-bold text-3xl text-center input input-lg rounded-xl bg-base-100"
              inputMode="numeric"
            />
            {max && (
              <label className="label">
                <span className="label-text-alt text-center w-full opacity-70">/ {max}</span>
              </label>
            )}
          </div>
          <button 
            className="btn btn-circle btn-lg btn-success min-h-14 min-w-14 shadow-md hover:shadow-lg transition-shadow"
            onClick={() => {
              onChange(value + 1);
              if (navigator.vibrate) navigator.vibrate(25);
            }}
          >
            <span className="text-2xl font-bold">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;