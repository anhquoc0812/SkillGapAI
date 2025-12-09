-- Drop the overly permissive RLS policy that allows public access to password reset tokens
DROP POLICY IF EXISTS "Service role can manage tokens" ON password_reset_tokens;

-- Invalidate all existing tokens since they may have been exposed
UPDATE password_reset_tokens SET used = true;