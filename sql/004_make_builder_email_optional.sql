ALTER TABLE public.project_submissions
ALTER COLUMN builder_email DROP NOT NULL;

ALTER TABLE public.builders
ALTER COLUMN email DROP NOT NULL;
