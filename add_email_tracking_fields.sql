ALTER TABLE public.appointments
ADD COLUMN IF NOT EXISTS confirmation_email_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS confirmation_email_sent_at TIMESTAMPTZ;
