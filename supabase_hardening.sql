-- ============================================================
--  Between Stars · Hardening — กันกลั่นแกล้ง/สแปม + ล็อก profiles
--  วิธีใช้: Supabase → SQL Editor → วาง → Run (ครั้งเดียว, รันซ้ำได้ปลอดภัย)
--  ครอบคลุม 4 เรื่อง:
--   1) profiles ต้องอ่าน/เขียนได้เฉพาะเจ้าของ (เก็บ mood journal — sensitive ที่สุด)
--   2) letter_report นับ "คน" ไม่ใช่ "ครั้ง" — คนเดียวกดรัว ๆ ซ่อนคำฝากคนอื่นไม่ได้อีก
--   3) letter_reply เป็น atomic — สองคนตอบพร้อมกันจะสำเร็จแค่คนเดียว
--   4) เพดานความยาวฝั่ง DB (analytics/letters) — client ตัดอยู่แล้ว แต่คนยิง REST ตรงข้ามได้
-- ============================================================

-- ── 1) profiles: owner-only (สร้างถ้ายังไม่มี + ล้าง policy เก่าทั้งหมดแล้ววางใหม่) ──
create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

do $$ declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'public' and tablename = 'profiles' loop
    execute format('drop policy %I on public.profiles', p.policyname);
  end loop;
end $$;

create policy "own profile select" on public.profiles
  for select to authenticated using (id = auth.uid());
create policy "own profile insert" on public.profiles
  for insert to authenticated with check (id = auth.uid());
create policy "own profile update" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
-- ไม่มี policy สำหรับ anon เลย = anon แตะ profiles ไม่ได้ทุกกรณี

-- ── 2) letter_report: dedup ต่อ (คำฝาก, ผู้รายงาน) ──
create table if not exists public.letter_reports (
  letter_id bigint not null references public.letters(id) on delete cascade,
  reporter  text   not null,     -- sig นิรนามของผู้กดรายงาน (ไม่ผูกตัวตน)
  ts        timestamptz not null default now(),
  primary key (letter_id, reporter)
);
alter table public.letter_reports enable row level security;
-- ไม่มี policy ใด ๆ — ทุกอย่างเข้าผ่าน RPC (security definer) เท่านั้น

-- ต้อง drop ตัวเก่า (1 อาร์กิวเมนต์) ก่อน ไม่งั้นชนกับตัวใหม่ที่มี default param
drop function if exists public.letter_report(bigint);

create or replace function public.letter_report(p_id bigint, p_sig text default null)
returns void language plpgsql security definer set search_path = public as $$
declare
  v_reporter text := left(coalesce(nullif(trim(p_sig), ''), 'anon'), 80);
  v_count    int;
begin
  insert into letter_reports(letter_id, reporter) values (p_id, v_reporter)
  on conflict do nothing;                          -- คนเดิมกดซ้ำ = ไม่นับเพิ่ม
  select count(*) into v_count from letter_reports where letter_id = p_id;
  -- hidden แบบ one-way: ซ่อนแล้วไม่ถูก "ปลดซ่อน" โดย report (founder ปลดได้ผ่าน letter_moderate)
  update letters set reports = v_count, hidden = (hidden or v_count >= 3)
   where id = p_id;
end; $$;

revoke all on function public.letter_report(bigint, text) from public;
grant execute on function public.letter_report(bigint, text) to anon;

-- ── 3) letter_reply: update เดียวจบ (กัน race ตอบพร้อมกัน) + จำกัดความยาว sig ──
create or replace function public.letter_reply(p_id bigint, p_text text, p_sig text)
returns boolean language plpgsql security definer set search_path = public as $$
declare v_rows int;
begin
  if char_length(coalesce(p_text, '')) = 0 or char_length(p_text) > 200 then
    return false;
  end if;
  update letters
     set replies = replies || jsonb_build_object(
       'text', left(p_text, 200),
       'sig',  left(coalesce(p_sig, ''), 80),
       't',    (extract(epoch from now()) * 1000)::bigint)
   where id = p_id and not hidden and jsonb_array_length(replies) = 0;
  get diagnostics v_rows = row_count;
  return v_rows = 1;                               -- ตอบได้ 1 ครั้งต่อคำฝาก (atomic)
end; $$;

-- ── 4) เพดานความยาวฝั่ง DB ──
-- letters: text มี check 200 อยู่แล้ว แต่ sig/cid ยังไม่มีเพดาน
drop policy if exists "insert letter" on public.letters;
create policy "insert letter" on public.letters
  for insert to anon
  with check (
    pub = true and hidden = false and reports = 0
    and replies = '[]'::jsonb
    and char_length(text) between 1 and 200
    and char_length(coalesce(sig, '')) <= 80
    and char_length(coalesce(cid, '')) <= 60
  );

drop policy if exists "anon can insert pageview" on public.page_views;
create policy "anon can insert pageview" on public.page_views
  for insert to anon
  with check (
    char_length(coalesce(path,   '')) <= 120
    and char_length(coalesce(ref,    '')) <= 120
    and char_length(coalesce(vid,    '')) <= 60
    and char_length(coalesce(device, '')) <= 12
    and char_length(coalesce(lang,   '')) <= 8
  );

drop policy if exists "anon can insert event" on public.events;
create policy "anon can insert event" on public.events
  for insert to anon
  with check (
    char_length(coalesce(name, '')) <= 40
    and char_length(coalesce(path, '')) <= 120
    and char_length(coalesce(vid,  '')) <= 60
    and coalesce(val, 0) between -1000000 and 1000000
  );

-- ============================================================
--  ตรวจผลหลังรัน (คิวรีดูเฉย ๆ):
--  select tablename, policyname, roles, cmd from pg_policies
--  where schemaname = 'public' order by tablename, policyname;
--  → profiles ต้องมีแค่ 3 นโยบาย (select/insert/update, role = authenticated)
-- ============================================================
