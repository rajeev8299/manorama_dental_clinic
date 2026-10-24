-- ==============================================================================
-- MANORAMA DENTAL CLINIC - COMPLETE SUPABASE SETUP SCRIPT
-- Run this complete script in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create 'contact_messages' table (for inquiries / leads)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    message TEXT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure nullable fields
ALTER TABLE public.contact_messages ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.contact_messages ALTER COLUMN message DROP NOT NULL;

-- 2. Create 'appointments' table (for patient booking)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    message TEXT NULL,
    status TEXT DEFAULT 'pending',
    confirmation_email_sent BOOLEAN DEFAULT FALSE,
    confirmation_email_sent_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create 'admin_users' table (authorizes users to view clinic dashboard)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 4. RLS for admin_users
DROP POLICY IF EXISTS "Users can read own admin status" ON public.admin_users;
CREATE POLICY "Users can read own admin status" 
ON public.admin_users 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- 5. RLS for contact_messages
-- Allow anonymous/public visitors to submit contact messages
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;
CREATE POLICY "Allow public insert to contact_messages" 
ON public.contact_messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated clinic admins to view and update contact inquiries
DROP POLICY IF EXISTS "Enable select for admins" ON public.contact_messages;
CREATE POLICY "Enable select for admins" 
ON public.contact_messages 
FOR SELECT 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Enable update for admins" ON public.contact_messages;
CREATE POLICY "Enable update for admins" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- 6. RLS for appointments
-- Allow public visitors to submit appointment bookings
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.appointments;
CREATE POLICY "Enable insert for everyone" 
ON public.appointments 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow authenticated clinic admins to view, update, and delete appointments
DROP POLICY IF EXISTS "Enable select for admins" ON public.appointments;
CREATE POLICY "Enable select for admins" 
ON public.appointments 
FOR SELECT 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Enable update for admins" ON public.appointments;
CREATE POLICY "Enable update for admins" 
ON public.appointments 
FOR UPDATE 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Enable delete for admins" ON public.appointments;
CREATE POLICY "Enable delete for admins" 
ON public.appointments 
FOR DELETE 
TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- 7. Reload schema cache for PostgREST
NOTIFY pgrst, 'reload schema';
