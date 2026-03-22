CREATE OR REPLACE FUNCTION public.project_has_liked(
  p_slug text,
  p_fingerprint text
)
RETURNS TABLE(liked boolean) AS $$
BEGIN
  RETURN QUERY
  SELECT (public.projects.liked_by @> ARRAY[p_fingerprint])
  FROM public.projects
  WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

GRANT EXECUTE ON FUNCTION public.project_has_liked(text, text) TO anon, authenticated;
