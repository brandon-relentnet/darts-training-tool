import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProgressChart = ({ data, isDarkMode = false }) => {
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Progress Over Time
        </h3>
        <p className="text-sm mb-4" style={{ color: theme.subText }}>Your accuracy improvement across recent sessions</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.grid} />
            <XAxis 
              dataKey="session" 
              tick={{ fill: theme.tickText, fontSize: 12 }}
              axisLine={{ stroke: theme.axis }}
              tickLine={{ stroke: theme.axis }}
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
              formatter={(value, name) => [`${value}%`, 'Accuracy']}
              labelFormatter={(label) => `Session ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="accuracy" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;