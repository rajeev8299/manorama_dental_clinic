-- Make email and message fields optional for Contact form submissions
ALTER TABLE public.contact_messages
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN message DROP NOT NULL;
