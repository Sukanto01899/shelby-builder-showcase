CREATE OR REPLACE FUNCTION public.builder_toggle_love(
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

  IF already_loved THEN
    DELETE FROM public.builder_loves
    WHERE builder_id = p_builder_id AND fingerprint = p_fingerprint;
  ELSE
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

GRANT EXECUTE ON FUNCTION public.builder_toggle_love(uuid, text) TO anon, authenticated;
