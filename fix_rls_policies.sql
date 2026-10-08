-- Fix RLS for contact_messages to avoid infinite recursion or 500 errors
DROP POLICY IF EXISTS "Enable select for admins" ON public.contact_messages;
DROP POLICY IF EXISTS "Enable update for admins" ON public.contact_messages;

CREATE POLICY "Enable select for admins" ON public.contact_messages 
FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Enable update for admins" ON public.contact_messages 
FOR UPDATE TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Fix RLS for appointments to avoid infinite recursion or 500 errors
DROP POLICY IF EXISTS "Enable select for admins" ON public.appointments;
DROP POLICY IF EXISTS "Enable update for admins" ON public.appointments;
DROP POLICY IF EXISTS "Enable delete for admins" ON public.appointments;

CREATE POLICY "Enable select for admins" ON public.appointments 
FOR SELECT TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Enable update for admins" ON public.appointments 
FOR UPDATE TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

CREATE POLICY "Enable delete for admins" ON public.appointments 
FOR DELETE TO authenticated 
USING (EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid()));

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
