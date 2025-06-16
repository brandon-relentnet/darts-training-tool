// Data persistence utilities
export const generateUserId = () => {
  return 'dart_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const getUserId = () => {
  let userId = localStorage.getItem('dartUserId');
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem('dartUserId', userId);
  }
  return userId;
};

export const exportDataToFile = (sessions, userId) => {
  const data = {
    userId,
    sessions,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dart-practice-${userId}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};