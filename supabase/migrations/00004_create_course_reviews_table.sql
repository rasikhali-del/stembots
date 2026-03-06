-- Create course_reviews table
CREATE TABLE public.course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on course_id for faster queries
CREATE INDEX idx_course_reviews_course_id ON public.course_reviews(course_id);

-- Enable RLS
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view reviews" ON course_reviews
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can submit reviews" ON course_reviews
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Users can delete their own reviews" ON course_reviews
  FOR DELETE TO authenticated USING (true);
