// Enhanced Mock Data for Admin Panel Demo

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  role: 'employee' | 'temporary' | 'administrator';
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
  expiresAt?: string; // Only for temporary users
}

export interface Video {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  youtubeUrl: string;
  uploadDate: string;
  views: number;
  featured: boolean;
  tempAccess: boolean; // Available for temporary users
  thumbnail?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  videoCount: number;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  temporaryUsers: number;
  totalVideos: number;
  tempAccessVideos: number;
  totalViews: number;
}

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@bounceboom.com',
    username: 'john_coach',
    role: 'employee',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@temp.com',
    username: 'temp_sarah',
    role: 'temporary',
    status: 'active',
    createdAt: '2024-01-18',
    lastLogin: '2024-01-19',
    expiresAt: '2024-01-25'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@bounceboom.com',
    username: 'admin_mike',
    role: 'administrator',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-01-20'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@bounceboom.com',
    username: 'emily_pro',
    role: 'employee',
    status: 'active',
    createdAt: '2024-01-12',
    lastLogin: '2024-01-18'
  },
  {
    id: 5,
    name: 'Carlos Martinez',
    email: 'carlos.martinez@temp.com',
    username: 'temp_carlos',
    role: 'temporary',
    status: 'active',
    createdAt: '2024-01-16',
    lastLogin: '2024-01-17',
    expiresAt: '2024-01-23'
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@bounceboom.com',
    username: 'lisa_coach',
    role: 'employee',
    status: 'inactive',
    createdAt: '2024-01-08',
    lastLogin: '2024-01-14'
  }
];

// Mock Categories Data
export const mockCategories: Category[] = [
  {
    id: 'technique',
    name: 'Technique',
    description: 'Proper form and technique training',
    videoCount: 15
  },
  {
    id: 'safety',
    name: 'Safety Protocols',
    description: 'Court safety and injury prevention',
    videoCount: 8
  },
  {
    id: 'rules',
    name: 'Rules & Regulations',
    description: 'Official game rules and tournament regulations',
    videoCount: 10
  },
  {
    id: 'equipment',
    name: 'Equipment Care',
    description: 'Maintenance and proper use of equipment',
    videoCount: 7
  },
  {
    id: 'customer',
    name: 'Customer Service',
    description: 'Customer interaction and service excellence',
    videoCount: 9
  },
  {
    id: 'business',
    name: 'Business Operations',
    description: 'Court management and business procedures',
    videoCount: 6
  }
];

// Mock Videos Data
export const mockVideos: Video[] = [
  {
    id: 1,
    title: 'Proper Tennis Serve Technique',
    description: 'Learn the fundamentals of an effective tennis serve, including grip, stance, and follow-through.',
    category: 'technique',
    duration: '12:30',
    youtubeUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
    uploadDate: '2024-01-15',
    views: 145,
    featured: true,
    tempAccess: true
  },
  {
    id: 2,
    title: 'Pickleball Court Safety Guidelines',
    description: 'Essential safety protocols and best practices for pickleball court management.',
    category: 'safety',
    duration: '8:15',
    youtubeUrl: 'https://youtube.com/watch?v=example2',
    uploadDate: '2024-01-12',
    views: 89,
    featured: false,
    tempAccess: true
  },
  {
    id: 3,
    title: 'Customer Interaction Best Practices',
    description: 'How to provide exceptional customer service and handle difficult situations.',
    category: 'customer',
    duration: '15:45',
    youtubeUrl: 'https://youtube.com/watch?v=example3',
    uploadDate: '2024-01-10',
    views: 203,
    featured: true,
    tempAccess: false
  },
  {
    id: 4,
    title: 'Equipment Maintenance Checklist',
    description: 'Daily, weekly, and monthly maintenance procedures for court equipment.',
    category: 'equipment',
    duration: '6:20',
    youtubeUrl: 'https://youtube.com/watch?v=example4',
    uploadDate: '2024-01-08',
    views: 67,
    featured: false,
    tempAccess: true
  },
  {
    id: 5,
    title: 'Tennis Tournament Rules Overview',
    description: 'Comprehensive guide to official tennis tournament rules and regulations.',
    category: 'rules',
    duration: '18:30',
    youtubeUrl: 'https://youtube.com/watch?v=example5',
    uploadDate: '2024-01-05',
    views: 134,
    featured: false,
    tempAccess: false
  },
  {
    id: 6,
    title: 'Advanced Pickleball Strategies',
    description: 'Professional-level strategies and tactics for competitive pickleball.',
    category: 'technique',
    duration: '22:15',
    youtubeUrl: 'https://youtube.com/watch?v=example6',
    uploadDate: '2024-01-03',
    views: 98,
    featured: true,
    tempAccess: true
  },
  {
    id: 7,
    title: 'Emergency Response Procedures',
    description: 'How to handle medical emergencies and accidents on the court.',
    category: 'safety',
    duration: '11:45',
    youtubeUrl: 'https://youtube.com/watch?v=example7',
    uploadDate: '2024-01-01',
    views: 156,
    featured: false,
    tempAccess: false
  },
  {
    id: 8,
    title: 'Court Booking System Training',
    description: 'Step-by-step guide to using the court reservation system.',
    category: 'business',
    duration: '9:30',
    youtubeUrl: 'https://youtube.com/watch?v=example8',
    uploadDate: '2023-12-28',
    views: 87,
    featured: false,
    tempAccess: true
  }
];

// Mock Admin Stats
export const mockAdminStats: AdminStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === 'active').length,
  temporaryUsers: mockUsers.filter(u => u.role === 'temporary').length,
  totalVideos: mockVideos.length,
  tempAccessVideos: mockVideos.filter(v => v.tempAccess).length,
  totalViews: mockVideos.reduce((total, video) => total + video.views, 0)
};

// Helper Functions
export const getUsersByRole = (role?: string) => {
  if (!role || role === 'all') return mockUsers;
  return mockUsers.filter(user => user.role === role);
};

export const getVideosByCategory = (category?: string) => {
  if (!category || category === 'all') return mockVideos;
  return mockVideos.filter(video => video.category === category);
};

export const getTempAccessVideos = () => {
  return mockVideos.filter(video => video.tempAccess);
};

export const searchUsers = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockUsers.filter(user =>
    user.name.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.username.toLowerCase().includes(lowercaseQuery)
  );
};

export const searchVideos = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockVideos.filter(video =>
    video.title.toLowerCase().includes(lowercaseQuery) ||
    video.description.toLowerCase().includes(lowercaseQuery) ||
    video.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Mock data mutation functions (for demo purposes)
export const addUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
  const newUser: User = {
    ...userData,
    id: Math.max(...mockUsers.map(u => u.id)) + 1,
    createdAt: new Date().toISOString().split('T')[0],
    lastLogin: 'Never'
  };
  mockUsers.push(newUser);
  return newUser;
};

export const updateUser = (id: number, updates: Partial<User>) => {
  const userIndex = mockUsers.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  }
  return null;
};

export const deleteUser = (id: number) => {
  const userIndex = mockUsers.findIndex(u => u.id === id);
  if (userIndex !== -1) {
    return mockUsers.splice(userIndex, 1)[0];
  }
  return null;
};

export const addVideo = (videoData: Omit<Video, 'id' | 'uploadDate' | 'views'>) => {
  const newVideo: Video = {
    ...videoData,
    id: Math.max(...mockVideos.map(v => v.id)) + 1,
    uploadDate: new Date().toISOString().split('T')[0],
    views: 0
  };
  mockVideos.push(newVideo);
  return newVideo;
};

export const updateVideo = (id: number, updates: Partial<Video>) => {
  const videoIndex = mockVideos.findIndex(v => v.id === id);
  if (videoIndex !== -1) {
    mockVideos[videoIndex] = { ...mockVideos[videoIndex], ...updates };
    return mockVideos[videoIndex];
  }
  return null;
};

export const deleteVideo = (id: number) => {
  const videoIndex = mockVideos.findIndex(v => v.id === id);
  if (videoIndex !== -1) {
    return mockVideos.splice(videoIndex, 1)[0];
  }
  return null;
};