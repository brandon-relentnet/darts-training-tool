// Statistics calculation utilities
export const calculateChartData = (sessions) => {
  return sessions.slice(-10).map((session, index) => ({
    session: `S${sessions.length - 9 + index}`,
    accuracy: Math.round(session.avgAccuracy || 0),
    duration: Math.round((session.totalDuration || 0) / 60)
  }));
};

export const calculatePhaseStats = (sessions) => {
  const phaseStats = sessions.flatMap(session => session.phases || [])
    .reduce((acc, phase) => {
      if (!acc[phase.phaseId]) {
        acc[phase.phaseId] = { total: 0, count: 0 };
      }
      acc[phase.phaseId].total += phase.accuracy || 0;
      acc[phase.phaseId].count += 1;
      return acc;
    }, {});

  return Object.entries(phaseStats).map(([phase, data]) => ({
    phase: phase.replace('-', ' ').toUpperCase(),
    accuracy: Math.round(data.total / data.count)
  }));
};

export const calculateSessionTotals = (sessions) => {
  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((acc, session) => acc + (session.totalDuration || 0), 0);
  const avgAccuracy = sessions.length > 0 
    ? sessions.reduce((acc, session) => acc + (session.avgAccuracy || 0), 0) / sessions.length 
    : 0;
  const bestSession = sessions.length > 0 
    ? Math.max(...sessions.map(s => s.avgAccuracy || 0))
    : 0;

  return {
    totalSessions,
    totalTime,
    avgAccuracy,
    bestSession
  };
};