// Mock data - moved to separate file for better organization
export const mockAnnouncements = [
  {
    _id: '1',
    title: 'System Maintenance',
    content: 'System maintenance scheduled for Friday 2-4 AM.',
    date: '2025-07-01',
    priority: 'high' as const,
  },
  {
    _id: '2',
    title: 'New Features',
    content: 'Check out our new dashboard features!',
    date: '2025-06-28',
    priority: 'medium' as const,
  },
];

export const mockQuizzes = [
  {
    _id: '1',
    title: 'JavaScript Basics',
    description: 'Test your JavaScript knowledge.',
    questionCount: 15,
    duration: 30,
    difficulty: 'easy' as const,
    category: 'Programming',
  },
  {
    _id: '2',
    title: 'React Patterns',
    description: 'Advanced React concepts.',
    questionCount: 20,
    duration: 45,
    difficulty: 'hard' as const,
    category: 'Frontend',
  },
];
