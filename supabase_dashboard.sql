-- ============================================================
--  Between Stars · Founder Dashboard — Supabase RPC
--  ดึงสถิติสรุปแบบปลอดภัย: เช็คอีเมล founder ก่อนคืนข้อมูล
--  วิธีใช้: Supabase → SQL Editor → วาง → Run (ครั้งเดียว)
--  ** ต้องรัน supabase_pageviews.sql ก่อน (สร้างตาราง page_views) **
-- ============================================================

create or replace function public.founder_stats()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := coalesce(auth.jwt() ->> 'email', '');
  result  json;
begin
  -- ปราการ: เฉพาะอีเมลผู้ก่อตั้งเท่านั้น (คนอื่นเรียกได้แต่จะโดนปฏิเสธ)
  if v_email <> 'cloundstory@gmail.com' then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select json_build_object(
    'total_views',    (select count(*) from page_views),
    'total_visitors', (select count(distinct vid) from page_views),
    'views_7d',       (select count(*) from page_views where ts > now() - interval '7 days'),
    'visitors_7d',    (select count(distinct vid) from page_views where ts > now() - interval '7 days'),
    'views_today',    (select count(*) from page_views
                        where ts >= (date_trunc('day', now() at time zone 'Asia/Bangkok')) at time zone 'Asia/Bangkok'),
    'by_day', (
      select coalesce(json_agg(json_build_object('day', day, 'views', views, 'visitors', visitors) order by day), '[]'::json)
      from (
        select date(ts at time zone 'Asia/Bangkok') as day,
               count(*) as views, count(distinct vid) as visitors
        from page_views
        where ts > now() - interval '30 days'
        group by 1
      ) q
    ),
    'by_path', (
      select coalesce(json_agg(json_build_object('path', path, 'views', views) order by views desc), '[]'::json)
      from (
        select coalesce(path, '(unknown)') as path, count(*) as views
        from page_views group by 1 order by 2 desc limit 12
      ) q
    ),
    'by_ref', (
      select coalesce(json_agg(json_build_object('source', source, 'views', views) order by views desc), '[]'::json)
      from (
        select coalesce(nullif(ref, ''), '(direct)') as source, count(*) as views
        from page_views group by 1 order by 2 desc limit 10
      ) q
    )
  ) into result;

  return result;
end;
$$;

-- เรียกได้เฉพาะผู้ล็อกอิน (anon เรียกไม่ได้เลย) — และในฟังก์ชันยังเช็คอีเมลซ้ำอีกชั้น
revoke all on function public.founder_stats() from public;
revoke all on function public.founder_stats() from anon;
grant execute on function public.founder_stats() to authenticated;
