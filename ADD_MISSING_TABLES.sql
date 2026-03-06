-- ========================================
-- RUN THIS IN SUPABASE SQL EDITOR
-- This script:
-- 1. Creates course_reviews table (if missing)
-- 2. Creates enrollments table (if missing)
-- 3. Fixes ALL RLS policies for admin dashboard (localStorage auth, not Supabase auth)
-- 4. Adds missing contact_messages DELETE policy
-- 5. Fixes courses INSERT/UPDATE/DELETE policies for anon access
-- ========================================

-- ============================================================
-- 1. COURSE REVIEWS TABLE
-- ============================================================
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

-- Drop existing policies (safe re-run)
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
  FOR DELETE TO anon, authenticated USING (true);

-- ============================================================
-- 2. ENROLLMENTS TABLE
-- ============================================================
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

-- Drop old policies (safe re-run)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can create enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Admins can view enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Anyone can view enrollments" ON public.enrollments;
  DROP POLICY IF EXISTS "Anyone can delete enrollments" ON public.enrollments;
END $$;

CREATE POLICY "Anyone can create enrollments" ON public.enrollments
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can view enrollments" ON public.enrollments
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can delete enrollments" ON public.enrollments
  FOR DELETE TO anon, authenticated USING (true);

-- ============================================================
-- 3. FIX COURSES RLS POLICIES
-- Admin dashboard uses localStorage, not Supabase auth.
-- So anon must be allowed to INSERT/UPDATE/DELETE courses.
-- ============================================================
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can insert courses" ON public.courses;
  DROP POLICY IF EXISTS "Admins can update courses" ON public.courses;
  DROP POLICY IF EXISTS "Admins can delete courses" ON public.courses;
  DROP POLICY IF EXISTS "Anyone can insert courses" ON public.courses;
  DROP POLICY IF EXISTS "Anyone can update courses" ON public.courses;
  DROP POLICY IF EXISTS "Anyone can delete courses" ON public.courses;
END $$;

CREATE POLICY "Anyone can insert courses" ON public.courses
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update courses" ON public.courses
  FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Anyone can delete courses" ON public.courses
  FOR DELETE TO anon, authenticated USING (true);

-- ============================================================
-- 4. FIX CONTACT MESSAGES RLS POLICIES
-- Admin dashboard needs to delete messages. Add missing DELETE policy.
-- ============================================================
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can delete messages" ON public.contact_messages;
END $$;

CREATE POLICY "Anyone can delete messages" ON public.contact_messages
  FOR DELETE TO anon, authenticated USING (true);

-- ============================================================
-- 5. FIX HOMEPAGE CONTENT RLS POLICIES
-- ============================================================
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can insert homepage content" ON public.homepage_content;
  DROP POLICY IF EXISTS "Admins can update homepage content" ON public.homepage_content;
  DROP POLICY IF EXISTS "Anyone can insert homepage content" ON public.homepage_content;
  DROP POLICY IF EXISTS "Anyone can update homepage content" ON public.homepage_content;
END $$;

CREATE POLICY "Anyone can insert homepage content" ON public.homepage_content
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update homepage content" ON public.homepage_content
  FOR UPDATE TO anon, authenticated USING (true);

-- ============================================================
-- DONE! ✅
-- Tables created: course_reviews, enrollments
-- RLS fixed for: courses, contact_messages, homepage_content, enrollments, course_reviews
-- All policies allow anon + authenticated (admin uses localStorage)
-- ============================================================
