-- 1. Create a table to store authorized admin users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid references auth.users not null primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Secure the admin_users table itself
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own admin status" ON public.admin_users FOR SELECT TO authenticated USING (auth.uid() = id);

-- 2. Update RLS on contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
-- (Assuming insert policy for public is already there)
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.contact_messages;

CREATE POLICY "Enable select for admins" ON public.contact_messages FOR SELECT TO authenticated USING (auth.uid() IN (SELECT id FROM public.admin_users));
CREATE POLICY "Enable update for admins" ON public.contact_messages FOR UPDATE TO authenticated USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- 3. Update RLS on appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable select for authenticated users only" ON public.appointments;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.appointments;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.appointments;

CREATE POLICY "Enable select for admins" ON public.appointments FOR SELECT TO authenticated USING (auth.uid() IN (SELECT id FROM public.admin_users));
CREATE POLICY "Enable update for admins" ON public.appointments FOR UPDATE TO authenticated USING (auth.uid() IN (SELECT id FROM public.admin_users));
CREATE POLICY "Enable delete for admins" ON public.appointments FOR DELETE TO authenticated USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Enable insert for anyone (anon and authenticated) so the public website can submit appointments
CREATE POLICY "Enable insert for everyone" ON public.appointments FOR INSERT TO public WITH CHECK (true);
