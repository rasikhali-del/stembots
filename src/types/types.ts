export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  age_group: string;
  category: 'Robotics' | 'Coding' | 'AI' | 'Leadership';
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface HomepageContent {
  id: string;
  section_id: string;
  content: string;
  updated_at: string;
}
