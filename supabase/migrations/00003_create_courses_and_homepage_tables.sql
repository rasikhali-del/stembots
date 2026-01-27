-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  age_group TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Robotics', 'Coding', 'AI', 'Leadership')),
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create homepage content table
CREATE TABLE public.homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert courses" ON courses
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update courses" ON courses
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete courses" ON courses
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- Homepage content policies
CREATE POLICY "Anyone can view homepage content" ON homepage_content
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admins can insert homepage content" ON homepage_content
  FOR INSERT TO authenticated WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update homepage content" ON homepage_content
  FOR UPDATE TO authenticated USING (is_admin(auth.uid()));

-- Insert sample courses
INSERT INTO public.courses (title, description, age_group, category, image_url) VALUES
('Introduction to Robotics', 'Learn the basics of robotics, including building and programming simple robots. Perfect for beginners!', '8-12 years', 'Robotics', '/images/robotics.jpg'),
('Advanced Robot Programming', 'Take your robotics skills to the next level with advanced programming techniques and complex builds.', '13-17 years', 'Robotics', '/images/robotics.jpg'),
('Python for Kids', 'Start your coding journey with Python! Learn programming fundamentals through fun projects and games.', '10-14 years', 'Coding', '/images/python.png'),
('Web Development Basics', 'Create your own websites! Learn HTML, CSS, and JavaScript to build interactive web pages.', '12-16 years', 'Coding', '/images/web development.jpg'),
('Introduction to AI', 'Discover the world of Artificial Intelligence! Learn about machine learning and create your first AI project.', '14-18 years', 'AI', '/images/AI.jpg'),
('AI and Machine Learning', 'Dive deep into AI concepts, neural networks, and build intelligent applications.', '15-18 years', 'AI', '/images/ai.jpg'),
('Leadership and Teamwork', 'Develop essential leadership skills through collaborative projects and team-based challenges.', '10-16 years', 'Leadership', '/images/leadership.jpg'),
('Electronics and Circuits', 'Learn about electricity, circuits, and build your own electronic projects with our STEM kit.', '11-15 years', 'Leadership', '/images/leadership.webp');

-- Insert default homepage content
INSERT INTO public.homepage_content (section_id, content) VALUES
('hero_title', 'Empowering Young Minds Through STEM Education'),
('hero_subtitle', 'Discover the exciting world of Science, Technology, Engineering, and Mathematics through hands-on learning and innovative programs.'),
('about_mission', 'At Stembots, we believe every child has the potential to become a future innovator. Our mission is to inspire and educate young minds through engaging STEM programs that combine creativity, critical thinking, and hands-on learning.'),
('about_vision', 'We envision a world where every child has access to quality STEM education, empowering them to solve real-world problems and shape the future of technology.');