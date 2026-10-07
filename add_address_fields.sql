-- Run this in your Supabase SQL editor to add the new columns
ALTER TABLE public.contact_messages 
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS state text,
ADD COLUMN IF NOT EXISTS pincode text;
