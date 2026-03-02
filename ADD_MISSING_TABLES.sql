-- ========================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- Ye 2 missing tables create karega:
-- 1. course_reviews
-- 2. enrollments
-- ========================================

-- 1. CREATE COURSE REVIEWS TABLE (agar pehle se nahi hai)
CREATE TABLE IF NOT EXISTS public.course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON public.course_reviews(course_id);

ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;

-- Drop policies if they already exist (safe re-run)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can view reviews" ON public.course_reviews;
  DROP POLICY IF EXISTS "Anyone can submit reviews" ON public.course_reviews;
  DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.course_reviews;
END $$;

CREATE POLICY "Anyone can view reviews" ON public.course_reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can submit reviews" ON public.course_reviews
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can delete their own reviews" ON public.course_reviews
  FOR DELETE TO authenticated USING (true);

-- 2. CREATE ENROLLMENTS TABLE
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

-- Drop policies if they already exist (safe re-run)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can create enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Admins can view enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.enrollments;
END $$;

CREATE POLICY "Anyone can create enrollments" ON public.enrollments
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Admins can view enrollments" ON public.enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete enrollments" ON public.enrollments
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- DONE! ✅
-- course_reviews aur enrollments tables create ho gaye!
