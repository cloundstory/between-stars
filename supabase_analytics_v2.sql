-- ============================================================
--  Between Stars · Analytics v2 — device/lang/new + events + dwell
--  วิธีใช้: Supabase → SQL Editor → วาง → Run (ครั้งเดียว)
--  ** ต้องรัน supabase_pageviews.sql มาก่อน (มีตาราง page_views) **
--  ปลอดภัย: ทุกตาราง INSERT-only สำหรับ anon, อ่านสรุปได้เฉพาะ founder ผ่าน RPC
-- ============================================================

-- 1) เพิ่มคอลัมน์ใหม่ใน page_views (ของเดิมเป็น null ได้ ไม่กระทบข้อมูลเก่า)
alter table public.page_views add column if not exists device  text;  -- mobile/tablet/desktop
alter table public.page_views add column if not exists lang    text;  -- th/en/...
alter table public.page_views add column if not exists is_new  boolean;-- ผู้เข้าชมใหม่ของเครื่องนี้

-- 2) ตาราง events — เก็บ "ชื่อการกระทำ" เท่านั้น ไม่มีเนื้อหาที่ผู้ใช้เขียน
--    (_dwell = เวลาบนหน้าเป็นวินาที เก็บใน val)
create table if not exists public.events (
  id   bigint generated always as identity primary key,
  ts   timestamptz not null default now(),
  vid  text,    -- รหัสสุ่มนิรนาม (ไม่ผูกตัวตน)
  name text,    -- เช่น chronos_open, capture, share, golden_save, mood_save, lightecho, _dwell
  path text,
  val  integer  -- ค่าตัวเลข (ใช้กับ _dwell = วินาที)
);
create index if not exists events_ts_idx   on public.events (ts);
create index if not exists events_name_idx on public.events (name);

alter table public.events enable row level security;
drop policy if exists "anon can insert event" on public.events;
create policy "anon can insert event"
  on public.events for insert to anon with check (true);

-- 3) อัปเดต RPC สรุปสถิติ (founder เท่านั้น) — เพิ่ม device/lang/new-return/events/dwell
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
  if v_email <> 'cloundstory@gmail.com' then
    raise exception 'forbidden' using errcode = '42501';
  end if;

  select json_build_object(
    'total_views',       (select count(*) from page_views),
    'total_visitors',    (select count(distinct vid) from page_views),
    'views_7d',          (select count(*) from page_views where ts > now() - interval '7 days'),
    'visitors_7d',       (select count(distinct vid) from page_views where ts > now() - interval '7 days'),
    'views_today',       (select count(*) from page_views
                           where ts >= (date_trunc('day', now() at time zone 'Asia/Bangkok')) at time zone 'Asia/Bangkok'),
    'new_visitors',      (select count(distinct vid) from page_views where is_new is true),
    'returning_visitors',(select count(distinct vid) from page_views where coalesce(is_new,false) = false),
    'avg_dwell',         (select round(avg(val))::int from events where name = '_dwell' and val is not null),
    'median_dwell',      (select percentile_cont(0.5) within group (order by val)::int from events where name = '_dwell' and val is not null),
    'by_day', (
      select coalesce(json_agg(json_build_object('day', day, 'views', views, 'visitors', visitors) order by day), '[]'::json)
      from (
        select date(ts at time zone 'Asia/Bangkok') as day,
               count(*) as views, count(distinct vid) as visitors
        from page_views where ts > now() - interval '30 days' group by 1
      ) q
    ),
    'by_path', (
      select coalesce(json_agg(json_build_object('path', path, 'views', views) order by views desc), '[]'::json)
      from (select coalesce(path,'(unknown)') as path, count(*) as views
            from page_views group by 1 order by 2 desc limit 12) q
    ),
    'by_ref', (
      select coalesce(json_agg(json_build_object('source', source, 'views', views) order by views desc), '[]'::json)
      from (select coalesce(nullif(ref,''),'(direct)') as source, count(*) as views
            from page_views group by 1 order by 2 desc limit 10) q
    ),
    'by_device', (
      select coalesce(json_agg(json_build_object('source', device, 'views', views) order by views desc), '[]'::json)
      from (select coalesce(nullif(device,''),'(unknown)') as device, count(*) as views
            from page_views group by 1 order by 2 desc) q
    ),
    'by_lang', (
      select coalesce(json_agg(json_build_object('source', lang, 'views', views) order by views desc), '[]'::json)
      from (select coalesce(nullif(lang,''),'(unknown)') as lang, count(*) as views
            from page_views group by 1 order by 2 desc limit 8) q
    ),
    'top_events', (
      select coalesce(json_agg(json_build_object('name', name, 'count', c) order by c desc), '[]'::json)
      from (select name, count(*) as c from events
            where name not like '\_%' group by 1 order by 2 desc limit 15) q
    ),
    -- funnel: เข้าใคร่ครวญ → เขียนห้วงใจ (นับ vid ไม่ซ้ำ; wrote = คนที่ทั้งเข้าใคร่ครวญ "และ" เขียน)
    'funnel', json_build_object(
      'entered', (select count(distinct vid) from events where name = 'contemplate_enter'),
      'wrote',   (select count(distinct vid) from events e where e.name = 'mood_save'
                    and exists (select 1 from events c where c.vid = e.vid and c.name = 'contemplate_enter')),
      'opened_guide', (select count(distinct vid) from events where name = 'guide_open')
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.founder_stats() from public;
revoke all on function public.founder_stats() from anon;
grant execute on function public.founder_stats() to authenticated;
