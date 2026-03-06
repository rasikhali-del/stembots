-- Create contact messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Anyone can insert contact messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only admins can view contact messages
CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR SELECT TO authenticated USING (is_admin(auth.uid()));

-- Only admins can delete contact messages
CREATE POLICY "Admins can delete contact messages" ON contact_messages
  FOR DELETE TO authenticated USING (is_admin(auth.uid()));