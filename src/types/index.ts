export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

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
  category: 'Robotics' | 'Artificial Intelligence' | 'Arts' | 'Coding' | 'Leadership';
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

export interface CourseReview {
  id: string;
  course_id: string;
  student_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  course_id: string;
  student_name: string;
  email: string;
  phone: string;
  age: string;
  guardian_name: string;
  message: string | null;
  created_at: string;
}

