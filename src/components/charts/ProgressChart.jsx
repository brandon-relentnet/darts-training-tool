import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-base-100 shadow-xl card">
      <div className="card-body">
        <h3 className="text-primary card-title flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Progress Over Time
        </h3>
        <p className="opacity-70 text-sm mb-4">Your accuracy improvement across recent sessions</p>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--p))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="oklch(var(--p))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="oklch(var(--bc) / 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="session" 
              tick={{ fill: 'oklch(var(--bc) / 0.7)', fontSize: 12 }}
              axisLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
              tickLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: 'oklch(var(--bc) / 0.7)', fontSize: 12 }}
              axisLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
              tickLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
              label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'oklch(var(--bc) / 0.7)' } }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'oklch(var(--b1))',
                border: '2px solid oklch(var(--p) / 0.2)',
                borderRadius: '0.75rem',
                color: 'oklch(var(--bc))',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '12px 16px'
              }}
              labelStyle={{ color: 'oklch(var(--p))', fontWeight: 'bold', marginBottom: '4px' }}
              formatter={(value, name) => [`${value}%`, 'Accuracy']}
              labelFormatter={(label) => `Session ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="oklch(var(--p))" 
              strokeWidth={4}
              dot={{ 
                fill: "oklch(var(--p))", 
                strokeWidth: 3, 
                r: 8, 
                stroke: "oklch(var(--b1))"
              }}
              activeDot={{ 
                r: 10, 
                fill: "oklch(var(--p))", 
                stroke: "oklch(var(--b1))", 
                strokeWidth: 4 
              }}
              fill="url(#accuracyGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;