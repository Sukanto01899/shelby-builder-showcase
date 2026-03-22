CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  title text NOT NULL,
  description text NOT NULL,
  like_count integer NOT NULL DEFAULT 0,
  liked_by text[] NOT NULL DEFAULT '{}',
  comments jsonb NOT NULL DEFAULT '[]'::jsonb,
  builder_id uuid NOT NULL REFERENCES public.builders(id) ON DELETE RESTRICT,
  status text NOT NULL DEFAULT 'draft',
  rating numeric(3,2),
  views integer NOT NULL DEFAULT 0,
  verified boolean NOT NULL DEFAULT false,
  http_enabled boolean NOT NULL DEFAULT true,
  live_url text,
  github_repo_url text,
  thumbnail_url text,
  guideline_video_url text,
  category text NOT NULL,
  tech_stack text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  slug text NOT NULL UNIQUE,

  CONSTRAINT projects_title_not_empty CHECK (length(trim(title)) > 0),
  CONSTRAINT projects_description_not_empty CHECK (length(trim(description)) > 0),
  CONSTRAINT projects_category_not_empty CHECK (length(trim(category)) > 0),
  CONSTRAINT projects_status_not_empty CHECK (length(trim(status)) > 0)
);

CREATE INDEX IF NOT EXISTS projects_builder_id_idx
  ON public.projects (builder_id);

CREATE INDEX IF NOT EXISTS projects_category_idx
  ON public.projects (category);

CREATE INDEX IF NOT EXISTS projects_status_idx
  ON public.projects (status);

CREATE INDEX IF NOT EXISTS projects_created_at_idx
  ON public.projects (created_at DESC);

CREATE INDEX IF NOT EXISTS projects_tags_idx
  ON public.projects USING GIN (tags);

CREATE INDEX IF NOT EXISTS projects_tech_stack_idx
  ON public.projects USING GIN (tech_stack);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_projects_updated_at ON public.projects;
CREATE TRIGGER set_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.set_projects_updated_at();

-- slug generation
CREATE OR REPLACE FUNCTION public.slugify_project_title(input text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  slug := lower(trim(input));
  slug := regexp_replace(slug, '[^a-z0-9]+', '-', 'g');
  slug := regexp_replace(slug, '(^-+|-+$)', '', 'g');
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION public.set_project_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug text;
BEGIN
  base_slug := public.slugify_project_title(NEW.title);
  IF base_slug = '' THEN
    base_slug := 'project';
  END IF;

  NEW.slug := base_slug || '-' || substring(encode(gen_random_bytes(4), 'hex') from 1 for 8);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_project_slug ON public.projects;
CREATE TRIGGER set_project_slug
BEFORE INSERT ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.set_project_slug();

-- Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY projects_select_public
ON public.projects
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can insert
CREATE POLICY projects_insert_admin
ON public.projects
FOR INSERT
TO authenticated
WITH CHECK ((auth.jwt() ->> 'role') = 'admin');
