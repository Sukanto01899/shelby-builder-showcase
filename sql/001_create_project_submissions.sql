CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.project_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  project_name text NOT NULL,
  project_description text NOT NULL,
  category text NOT NULL,
  tech_stack text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  github_repo_url text NOT NULL,
  thumbnail_url text NOT NULL,
  guideline_video_url text,
  live_url text NOT NULL,
  builder_x_profile_url text NOT NULL,
  builder_discord_username text NOT NULL,

  CONSTRAINT project_name_not_empty CHECK (length(trim(project_name)) > 0),
  CONSTRAINT project_description_not_empty CHECK (length(trim(project_description)) > 0),
  CONSTRAINT category_not_empty CHECK (length(trim(category)) > 0),
  CONSTRAINT github_repo_url_not_empty CHECK (length(trim(github_repo_url)) > 0),
  CONSTRAINT thumbnail_url_not_empty CHECK (length(trim(thumbnail_url)) > 0),
  CONSTRAINT live_url_not_empty CHECK (length(trim(live_url)) > 0),
  CONSTRAINT builder_x_profile_url_not_empty CHECK (length(trim(builder_x_profile_url)) > 0),
  CONSTRAINT builder_discord_username_not_empty CHECK (length(trim(builder_discord_username)) > 0)
);

CREATE INDEX IF NOT EXISTS project_submissions_created_at_idx
  ON public.project_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS project_submissions_category_idx
  ON public.project_submissions (category);

CREATE INDEX IF NOT EXISTS project_submissions_tags_idx
  ON public.project_submissions USING GIN (tags);

CREATE OR REPLACE FUNCTION public.set_project_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_project_submissions_updated_at ON public.project_submissions;
CREATE TRIGGER set_project_submissions_updated_at
BEFORE UPDATE ON public.project_submissions
FOR EACH ROW
EXECUTE FUNCTION public.set_project_submissions_updated_at();

-- Row Level Security
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (anon or authenticated)
CREATE POLICY project_submissions_insert_anyone
ON public.project_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read
CREATE POLICY project_submissions_select_admin
ON public.project_submissions
FOR SELECT
TO authenticated
USING ((auth.jwt() ->> 'role') = 'admin');
