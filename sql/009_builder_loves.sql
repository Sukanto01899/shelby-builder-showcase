CREATE TABLE IF NOT EXISTS public.builder_loves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  builder_id uuid NOT NULL REFERENCES public.builders(id) ON DELETE CASCADE,
  fingerprint text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (builder_id, fingerprint)
);

CREATE INDEX IF NOT EXISTS builder_loves_builder_id_idx
  ON public.builder_loves (builder_id);

CREATE INDEX IF NOT EXISTS builder_loves_fingerprint_idx
  ON public.builder_loves (fingerprint);

CREATE OR REPLACE FUNCTION public.builder_add_love(
  p_builder_id uuid,
  p_fingerprint text
)
RETURNS TABLE(love_count integer, liked boolean) AS $$
DECLARE
  already_loved boolean;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM public.builder_loves
    WHERE builder_id = p_builder_id AND fingerprint = p_fingerprint
  ) INTO already_loved;

  IF NOT already_loved THEN
    INSERT INTO public.builder_loves (builder_id, fingerprint)
    VALUES (p_builder_id, p_fingerprint)
    ON CONFLICT DO NOTHING;
  END IF;

  SELECT COUNT(*)::integer INTO love_count
  FROM public.builder_loves
  WHERE builder_id = p_builder_id;

  RETURN QUERY SELECT love_count, NOT already_loved;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.builder_has_loved(
  p_builder_id uuid,
  p_fingerprint text
)
RETURNS TABLE(liked boolean) AS $$
BEGIN
  RETURN QUERY
  SELECT EXISTS(
    SELECT 1
    FROM public.builder_loves
    WHERE builder_id = p_builder_id AND fingerprint = p_fingerprint
  );
END;
$$ LANGUAGE plpgsql;

GRANT SELECT, INSERT ON public.builder_loves TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.builder_add_love(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.builder_has_loved(uuid, text) TO anon, authenticated;
