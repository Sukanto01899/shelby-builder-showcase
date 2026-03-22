ALTER TABLE public.builders
ADD COLUMN IF NOT EXISTS image_url text;

CREATE INDEX IF NOT EXISTS builders_image_url_idx
  ON public.builders (image_url);
