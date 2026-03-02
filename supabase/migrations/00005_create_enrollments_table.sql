-- Create enrollments table for course enrollment requests
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

-- Enable RLS
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert enrollments (public enrollment form)
CREATE POLICY "Anyone can create enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (true);

-- Only admins can view enrollments
CREATE POLICY "Admins can view enrollments" ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Only admins can delete enrollments
CREATE POLICY "Admins can delete enrollments" ON public.enrollments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
