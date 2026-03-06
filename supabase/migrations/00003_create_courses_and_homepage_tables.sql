-- Create courses table
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
('Robotics', 'Learn the basics of robotics, including building and programming simple robots. This course covers mechanical design, sensors, motors, and programming logic to bring your creations to life.', '8-17 years', 'Robotics', '/images/robotics.jpg'),
('Artificial Intelligence', 'Discover the world of Artificial Intelligence! Learn about machine learning, neural networks, and create your first AI project that can think and make decisions.', '10-18 years', 'Artificial Intelligence', '/images/AI.jpg'),
('Arts', 'Explore your creativity through digital art, design thinking, and hands-on artistic projects that blend technology with imagination to create stunning visual experiences.', '8-16 years', 'Arts', NULL),
('Coding', 'Learn the fundamentals of programming and how to build websites and applications. This course introduces logical thinking, problem-solving, and modern programming technologies used in the software development industry.', '8-18 years', 'Coding', '/images/python.png'),
('Leadership / Entrepreneurship / Public Speaking', 'Develop essential leadership, entrepreneurship, and public speaking skills through collaborative projects, team-based challenges, and real-world scenarios that prepare you for success.', '10-18 years', 'Leadership', '/images/leadership.jpg');

-- Insert default homepage content
INSERT INTO public.homepage_content (section_id, content) VALUES
('hero_title', 'Empowering Young Minds Through STEM Education'),
('hero_subtitle', 'Discover the exciting world of Science, Technology, Engineering, and Mathematics through hands-on learning and innovative programs.'),
('about_mission', 'At Stembots, we believe every child has the potential to become a future innovator. Our mission is to inspire and educate young minds through engaging STEM programs that combine creativity, critical thinking, and hands-on learning.'),
('about_vision', 'We envision a world where every child has access to quality STEM education, empowering them to solve real-world problems and shape the future of technology.');