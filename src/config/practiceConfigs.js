// Practice configurations
export const PRACTICE_CONFIGS = {
  short: {
    name: 'Short Practice',
    duration: '15-20 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 15, description: 'Hit your favorite numbers (20s, bull)' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 20, description: 'Practice doubles 16, 20, bull' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 30, description: 'Single and double 20s' }
    ]
  },
  medium: {
    name: 'Medium Practice',
    duration: '30-40 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 20, description: 'Hit your favorite numbers' },
      { id: 'around-world', name: 'Around the World', suggestedThrows: 40, description: 'Numbers 1-20, hit twice if you miss' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 30, description: 'Doubles 1-20, then bull' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 40, description: 'Heavy focus on 20s' }
    ]
  },
  long: {
    name: 'Full Practice',
    duration: '45-60 min',
    phases: [
      { id: 'warmup', name: 'Warm-Up', suggestedThrows: 25, description: 'Hit your favorite numbers' },
      { id: 'around-world', name: 'Around the World', suggestedThrows: 50, description: 'Numbers 1-20, hit twice if you miss' },
      { id: 'doubles', name: 'Doubles', suggestedThrows: 40, description: 'Doubles 1-20, then bull' },
      { id: 'triples', name: 'Triples', suggestedThrows: 30, description: 'Triple 20, 19, 14, 13' },
      { id: 'game-practice', name: 'Game Practice', suggestedThrows: 60, description: 'Play 501/301 or practice finishes' },
      { id: 'twenties', name: '20s Focus', suggestedThrows: 50, description: 'Heavy focus on single and double 20s' }
    ]
  }
};