-- 1. Create the contact_messages table if it does not exist
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

-- 2. Ensure email and message are nullable (in case table existed but was strict)
ALTER TABLE public.contact_messages ALTER COLUMN email DROP NOT NULL;
ALTER TABLE public.contact_messages ALTER COLUMN message DROP NOT NULL;

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. Create an INSERT policy for anonymous/public users
-- Drop first to avoid errors if it already exists
DROP POLICY IF EXISTS "Allow public insert to contact_messages" ON public.contact_messages;

CREATE POLICY "Allow public insert to contact_messages" 
ON public.contact_messages 
FOR INSERT 
TO public, anon
WITH CHECK (true);

-- 5. Force schema cache refresh for PostgREST
NOTIFY pgrst, 'reload schema';
