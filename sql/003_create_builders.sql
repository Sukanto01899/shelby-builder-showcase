CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.builders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  name text NOT NULL,
  github_url text NOT NULL,
  x_profile_url text NOT NULL,
  email text NOT NULL,
  love text,
  discord_username text NOT NULL,

  CONSTRAINT builders_name_not_empty CHECK (length(trim(name)) > 0),
  CONSTRAINT builders_github_url_not_empty CHECK (length(trim(github_url)) > 0),
  CONSTRAINT builders_x_profile_url_not_empty CHECK (length(trim(x_profile_url)) > 0),
  CONSTRAINT builders_email_not_empty CHECK (length(trim(email)) > 0),
  CONSTRAINT builders_discord_username_not_empty CHECK (length(trim(discord_username)) > 0)
);

CREATE INDEX IF NOT EXISTS builders_created_at_idx
  ON public.builders (created_at DESC);

CREATE INDEX IF NOT EXISTS builders_email_idx
  ON public.builders (email);

CREATE INDEX IF NOT EXISTS builders_discord_username_idx
  ON public.builders (discord_username);

CREATE OR REPLACE FUNCTION public.set_builders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_builders_updated_at ON public.builders;
CREATE TRIGGER set_builders_updated_at
BEFORE UPDATE ON public.builders
FOR EACH ROW
EXECUTE FUNCTION public.set_builders_updated_at();
