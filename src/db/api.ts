import { supabase } from './supabase';
import type { Course, ContactMessage, HomepageContent, Profile } from '@/types';

// Courses API
export const coursesApi = {
  getAll: async (): Promise<Course[]> => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  getByCategory: async (category: string): Promise<Course[]> => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  update: async (id: string, updates: Partial<Course>): Promise<void> => {
    const { error } = await supabase
      .from('courses')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) throw error;
  },

  create: async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<void> => {
    const { error } = await supabase
      .from('courses')
      .insert([course]);
    
    if (error) throw error;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Contact Messages API
export const contactApi = {
  create: async (message: Omit<ContactMessage, 'id' | 'created_at'>): Promise<void> => {
    const { error } = await supabase
      .from('contact_messages')
      .insert([message]);
    
    if (error) throw error;
  },

  getAll: async (): Promise<ContactMessage[]> => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Homepage Content API
export const homepageApi = {
  getAll: async (): Promise<HomepageContent[]> => {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*');
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  getBySection: async (sectionId: string): Promise<HomepageContent | null> => {
    const { data, error } = await supabase
      .from('homepage_content')
      .select('*')
      .eq('section_id', sectionId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  update: async (sectionId: string, content: string): Promise<void> => {
    const { error } = await supabase
      .from('homepage_content')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('section_id', sectionId);
    
    if (error) throw error;
  }
};

// Profiles API
export const profilesApi = {
  getCurrent: async (): Promise<Profile | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  getAll: async (): Promise<Profile[]> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  },

  updateRole: async (id: string, role: 'user' | 'admin'): Promise<void> => {
    const { error } = await supabase
      .from('profiles')
      .update({ role, updated_at: new Date().toISOString() })
      .eq('id', id);
    
    if (error) throw error;
  }
};
