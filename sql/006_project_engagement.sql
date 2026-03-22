ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS viewed_by text[] NOT NULL DEFAULT '{}';

-- Record a unique view by fingerprint
CREATE OR REPLACE FUNCTION public.project_record_view(
  p_slug text,
  p_fingerprint text
)
RETURNS TABLE(views integer) AS $$
BEGIN
  UPDATE public.projects
  SET views = views + 1,
      viewed_by = array_append(viewed_by, p_fingerprint)
  WHERE slug = p_slug
    AND NOT (viewed_by @> ARRAY[p_fingerprint]);

  RETURN QUERY
  SELECT views FROM public.projects WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add a like once per fingerprint
CREATE OR REPLACE FUNCTION public.project_add_like(
  p_slug text,
  p_fingerprint text
)
RETURNS TABLE(like_count integer, liked boolean) AS $$
DECLARE
  already_liked boolean;
BEGIN
  SELECT (liked_by @> ARRAY[p_fingerprint]) INTO already_liked
  FROM public.projects
  WHERE slug = p_slug;

  IF NOT already_liked THEN
    UPDATE public.projects
    SET like_count = like_count + 1,
        liked_by = array_append(liked_by, p_fingerprint)
    WHERE slug = p_slug;
  END IF;

  RETURN QUERY
  SELECT like_count, NOT already_liked
  FROM public.projects
  WHERE slug = p_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add a comment with fingerprint
CREATE OR REPLACE FUNCTION public.project_add_comment(
  p_slug text,
  p_fingerprint text,
  p_message text
)
RETURNS TABLE(comment jsonb) AS $$
DECLARE
  new_comment jsonb;
BEGIN
  new_comment := jsonb_build_object(
    'id', gen_random_uuid(),
    'fingerprint', p_fingerprint,
    'message', p_message,
    'created_at', now()
  );

  UPDATE public.projects
  SET comments = comments || jsonb_build_array(new_comment)
  WHERE slug = p_slug;

  RETURN QUERY SELECT new_comment;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Allow public execute on engagement functions
GRANT EXECUTE ON FUNCTION public.project_record_view(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.project_add_like(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.project_add_comment(text, text, text) TO anon, authenticated;
