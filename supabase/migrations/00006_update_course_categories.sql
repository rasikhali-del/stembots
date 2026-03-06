-- Update course categories:
-- Rename 'AI' -> 'Artificial Intelligence'
-- Add 'Arts' as a new category
-- Keep 'Robotics', 'Coding', 'Leadership'
-- Consolidate to exactly 5 courses (one per category)

-- Step 1: Drop the old CHECK constraint
ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_category_check;

-- Step 2: Update existing AI courses to the new name
UPDATE public.courses SET category = 'Artificial Intelligence' WHERE category = 'AI';

-- Step 3: Add the new CHECK constraint with all 5 categories
ALTER TABLE public.courses ADD CONSTRAINT courses_category_check 
  CHECK (category IN ('Robotics', 'Artificial Intelligence', 'Arts', 'Coding', 'Leadership'));

-- Step 4: Remove all old courses and insert the 5 clean courses
DELETE FROM public.courses;

INSERT INTO public.courses (title, description, age_group, category, image_url) VALUES
('Robotics', 'Learn the basics of robotics, including building and programming simple robots. This course covers mechanical design, sensors, motors, and programming logic to bring your creations to life.', '8-17 years', 'Robotics', '/images/robotics.jpg'),
('Artificial Intelligence', 'Discover the world of Artificial Intelligence! Learn about machine learning, neural networks, and create your first AI project that can think and make decisions.', '10-18 years', 'Artificial Intelligence', '/images/AI.jpg'),
('Arts', 'Explore your creativity through digital art, design thinking, and hands-on artistic projects that blend technology with imagination to create stunning visual experiences.', '8-16 years', 'Arts', NULL),
('Coding', 'Learn the fundamentals of programming and how to build websites and applications. This course introduces logical thinking, problem-solving, and modern programming technologies used in the software development industry.', '8-18 years', 'Coding', '/images/python.png'),
('Leadership / Entrepreneurship / Public Speaking', 'Develop essential leadership, entrepreneurship, and public speaking skills through collaborative projects, team-based challenges, and real-world scenarios that prepare you for success.', '10-18 years', 'Leadership', '/images/leadership.jpg');