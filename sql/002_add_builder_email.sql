ALTER TABLE public.project_submissions
ADD COLUMN IF NOT EXISTS builder_email text;

ALTER TABLE public.project_submissions
ALTER COLUMN builder_email SET NOT NULL;

CREATE INDEX IF NOT EXISTS project_submissions_builder_email_idx
  ON public.project_submissions (builder_email);
