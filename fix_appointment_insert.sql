-- Fix: Allow public users to submit appointments

-- 1. Safely drop the existing policy if it exists (in case it was broken/restricted)
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.appointments;

-- 2. Create the correct policy that allows both anon and authenticated users to insert
-- 'FOR INSERT TO public' means any role (including anon) can insert rows.
CREATE POLICY "Enable insert for everyone" ON public.appointments 
FOR INSERT TO public 
WITH CHECK (true);
