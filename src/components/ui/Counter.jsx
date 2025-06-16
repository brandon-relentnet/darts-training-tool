import React from 'react';

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

export default Counter;