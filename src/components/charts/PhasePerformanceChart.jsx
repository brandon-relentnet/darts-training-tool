import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PhasePerformanceChart = ({ data, isDarkMode = false }) => {
  if (!data || data.length === 0) return null;

  const theme = {
    bg: isDarkMode ? '#1f2937' : '#ffffff',
    cardText: isDarkMode ? '#f3f4f6' : '#1f2937',
    subText: isDarkMode ? '#9ca3af' : '#6b7280',
    grid: isDarkMode ? '#374151' : '#e5e7eb',
    axis: isDarkMode ? '#6b7280' : '#d1d5db',
    tickText: isDarkMode ? '#d1d5db' : '#6b7280',
    tooltipBg: isDarkMode ? '#374151' : '#ffffff',
    tooltipBorder: isDarkMode ? '#6b7280' : '#d1d5db',
    tooltipText: isDarkMode ? '#f3f4f6' : '#374151'
  };

  return (
    <div className="shadow-xl card" style={{ backgroundColor: theme.bg }}>
      <div className="card-body">
        <h3 className="card-title flex items-center gap-2" style={{ color: theme.cardText }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Phase Performance
        </h3>
        <p className="text-sm mb-4" style={{ color: theme.subText }}>Average accuracy by practice phase type</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis 
              dataKey="phase" 
              tick={{ fill: theme.tickText, fontSize: 11 }}
              axisLine={{ stroke: theme.axis }}
              tickLine={{ stroke: theme.axis }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: theme.tickText, fontSize: 12 }}
              axisLine={{ stroke: theme.axis }}
              tickLine={{ stroke: theme.axis }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: theme.tooltipBg,
                border: `1px solid ${theme.tooltipBorder}`,
                borderRadius: '8px',
                color: theme.tooltipText,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [`${value}%`, 'Average Accuracy']}
              labelFormatter={(label) => `${label} Phase`}
            />
            <Bar 
              dataKey="accuracy" 
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PhasePerformanceChart;