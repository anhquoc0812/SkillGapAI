-- Add custom_skills column to profiles table to store user's selected skills
ALTER TABLE public.profiles 
ADD COLUMN custom_skills TEXT[] DEFAULT '{}';

-- Remove main_language column as it's being replaced by custom_skills
-- Commenting out for now in case you want to keep it for backward compatibility
-- ALTER TABLE public.profiles DROP COLUMN main_language;