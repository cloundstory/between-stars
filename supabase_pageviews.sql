-- ============================================================
--  Between Stars · Pageview Counter — Supabase setup
--  วิธีใช้: เปิด Supabase → SQL Editor → วาง SQL นี้ → Run (ครั้งเดียว)
-- ============================================================

-- 1) ตารางเก็บยอดเข้าชม (ข้อมูลนิรนามล้วน ไม่มีข้อมูลส่วนตัว)
create table if not exists public.page_views (
  id   bigint generated always as identity primary key,
  ts   timestamptz not null default now(),
  path text,           -- หน้าที่เปิด เช่น /index.html
  ref  text,           -- โดเมนต้นทาง (host เท่านั้น) เช่น google.com
  vid  text            -- รหัสสุ่มนิรนาม — ใช้นับเครื่องที่ไม่ซ้ำ ไม่ผูกตัวตน
);

-- ดัชนีช่วยให้สรุปตามวัน/หน้าได้เร็ว
create index if not exists page_views_ts_idx   on public.page_views (ts);
create index if not exists page_views_path_idx on public.page_views (path);

-- 2) เปิด RLS — อนุญาตเฉพาะ "เพิ่มข้อมูล" จากผู้ไม่ล็อกอิน (anon)
--    ไม่เปิด SELECT ให้ใคร → ผู้เข้าชมอ่านสถิติของกันไม่ได้ มีแค่คุณ (dashboard) ที่ดูได้
alter table public.page_views enable row level security;

drop policy if exists "anon can insert pageview" on public.page_views;
create policy "anon can insert pageview"
  on public.page_views
  for insert
  to anon
  with check (true);


-- ============================================================
--  ดูสถิติ — รัน query เหล่านี้ใน SQL Editor เมื่อไหร่ก็ได้
-- ============================================================

-- ยอดรวมทั้งหมด + จำนวนเครื่องที่ไม่ซ้ำ
-- select count(*) as views, count(distinct vid) as visitors from public.page_views;

-- รายวัน (เวลาไทย)
-- select date(ts at time zone 'Asia/Bangkok') as day,
--        count(*) as views, count(distinct vid) as visitors
-- from public.page_views group by 1 order by 1 desc;

-- หน้าที่นิยมสุด
-- select path, count(*) as views from public.page_views group by 1 order by 2 desc;

-- ที่มา (referrer) — ว่าคนมาจากไหน
-- select coalesce(nullif(ref,''),'(ตรง/ไม่ระบุ)') as source, count(*)
-- from public.page_views group by 1 order by 2 desc;

-- 7 วันล่าสุด
-- select count(*) as views, count(distinct vid) as visitors
-- from public.page_views where ts > now() - interval '7 days';
