import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PhasePerformanceChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-base-100 shadow-xl card">
      <div className="card-body">
        <h3 className="text-primary card-title flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Phase Performance
        </h3>
        <p className="opacity-70 text-sm mb-4">Average accuracy by practice phase type</p>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="oklch(var(--s))" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="oklch(var(--s))" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="oklch(var(--bc) / 0.1)" 
              vertical={false}
            />
            <XAxis 
              dataKey="phase" 
              tick={{ fill: 'oklch(var(--bc) / 0.7)', fontSize: 11 }}
              axisLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
              tickLine={{ stroke: 'oklch(var(--bc) / 0.2)' }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
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
                border: '2px solid oklch(var(--s) / 0.3)',
                borderRadius: '0.75rem',
                color: 'oklch(var(--bc))',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                padding: '12px 16px'
              }}
              labelStyle={{ color: 'oklch(var(--s))', fontWeight: 'bold', marginBottom: '4px' }}
              formatter={(value, name) => [`${value}%`, 'Average Accuracy']}
              labelFormatter={(label) => `${label} Phase`}
            />
            <Bar 
              dataKey="accuracy" 
              fill="url(#barGradient)"
              stroke="oklch(var(--s))"
              strokeWidth={2}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhasePerformanceChart;