-- Enable RLS and setup admin access for contact_messages
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Note: The insert policy for public was already created in create_contact_messages_table.sql
-- CREATE POLICY "Enable insert for anyone" ON public.contact_messages FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users only" ON public.contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" ON public.contact_messages FOR UPDATE TO authenticated USING (true);


-- Enable RLS and setup access for appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anyone" ON public.appointments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON public.appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" ON public.appointments FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.appointments FOR DELETE TO authenticated USING (true);
