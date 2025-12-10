-- Drop the unused password_reset_tokens table
-- This table was part of a legacy OTP-based password reset system
-- The application now uses Supabase's built-in auth.resetPasswordForEmail method
DROP TABLE IF EXISTS public.password_reset_tokens;