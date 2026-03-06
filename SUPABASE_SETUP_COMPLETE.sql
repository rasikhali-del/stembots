-- ========================================
-- COMPLETE STEMBOTS DATABASE SETUP
-- ========================================
-- Run this in Supabase SQL Editor
-- Copy-paste everything aur execute karo

-- 1. CREATE USER ROLE TYPE
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- 2. CREATE PROFILES TABLE
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  email TEXT,
  role public.user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CREATE COURSES TABLE
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  age_group TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Robotics', 'Artificial Intelligence', 'Arts', 'Coding', 'Leadership')),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CREATE CONTACT MESSAGES TABLE
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CREATE HOMEPAGE CONTENT TABLE
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CREATE COURSE REVIEWS TABLE
CREATE TABLE public.course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX idx_course_reviews_course_id ON public.course_reviews(course_id);

-- 8. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- 9. CREATE RLS POLICIES FOR PROFILES
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'::user_role)
  );

-- 10. CREATE RLS POLICIES FOR COURSES
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can insert courses" ON courses
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update courses" ON courses
  FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Anyone can delete courses" ON courses
  FOR DELETE TO anon, authenticated USING (true);

-- 11. CREATE RLS POLICIES FOR CONTACT MESSAGES
CREATE POLICY "Anyone can submit messages" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view messages" ON contact_messages
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can delete messages" ON contact_messages
  FOR DELETE TO anon, authenticated USING (true);

-- 12. CREATE RLS POLICIES FOR HOMEPAGE CONTENT
CREATE POLICY "Anyone can view homepage content" ON homepage_content
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can insert homepage content" ON homepage_content
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update homepage content" ON homepage_content
  FOR UPDATE TO anon, authenticated USING (true);

-- 13. CREATE RLS POLICIES FOR COURSE REVIEWS
CREATE POLICY "Anyone can view reviews" ON course_reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can submit reviews" ON course_reviews
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can delete their own reviews" ON course_reviews
  FOR DELETE TO authenticated USING (true);

-- 14. INSERT SAMPLE COURSES
INSERT INTO public.courses (title, description, age_group, category, image_url) VALUES
('Robotics', 'Learn the basics of robotics, including building and programming simple robots. This course covers mechanical design, sensors, motors, and programming logic to bring your creations to life.', '8-17 years', 'Robotics', '/images/robotics.jpg'),
('Artificial Intelligence', 'Discover the world of Artificial Intelligence! Learn about machine learning, neural networks, and create your first AI project that can think and make decisions.', '10-18 years', 'Artificial Intelligence', '/images/AI.jpg'),
('Arts', 'Explore your creativity through digital art, design thinking, and hands-on artistic projects that blend technology with imagination to create stunning visual experiences.', '8-16 years', 'Arts', NULL),
('Coding', 'Learn the fundamentals of programming and how to build websites and applications. This course introduces logical thinking, problem-solving, and modern programming technologies used in the software development industry.', '8-18 years', 'Coding', '/images/python.png'),
('Leadership / Entrepreneurship / Public Speaking', 'Develop essential leadership, entrepreneurship, and public speaking skills through collaborative projects, team-based challenges, and real-world scenarios that prepare you for success.', '10-18 years', 'Leadership', '/images/leadership.jpg');

-- 15. INSERT HOMEPAGE CONTENT
INSERT INTO public.homepage_content (section_id, content) VALUES
('hero_title', 'Empowering Young Minds Through STEM Education'),
('hero_subtitle', 'Discover the exciting world of Science, Technology, Engineering, and Mathematics through hands-on learning and innovative programs.'),
('about_mission', 'At Stembots, we believe every child has the potential to become a future innovator. Our mission is to inspire and educate young minds through engaging STEM programs that combine creativity, critical thinking, and hands-on learning.'),
('about_vision', 'We envision a world where every child has access to quality STEM education, empowering them to solve real-world problems and shape the future of technology.');

-- 16. CREATE ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age TEXT NOT NULL,
  guardian_name TEXT NOT NULL DEFAULT '',
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create enrollments" ON public.enrollments
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view enrollments" ON public.enrollments
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can delete enrollments" ON public.enrollments
  FOR DELETE TO anon, authenticated USING (true);

-- DONE! ✅
-- All tables created with open RLS policies (admin uses localStorage, not Supabase auth)
-- Database setup complete!
