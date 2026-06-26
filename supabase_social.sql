-- ============================================================
--  Between Stars · Social Phase 1 — shared "คำฝาก / letters"
--  ทำให้คำฝากเป็น cross-user จริง: คน A ฝาก → คน B เจอผ่านดาวตก → ตอบกลับ → คน A เห็น
--  วิธีใช้: Supabase → SQL Editor → วาง → Run (ครั้งเดียว)
--  ปลอดภัย: เก็บแค่ text + sig นิรนาม + เวลา (ไม่มี PII, ไม่ผูก auth uid)
--  moderation: badwords กรองฝั่ง client + report ถึงเกณฑ์ซ่อนอัตโนมัติ + founder ลบได้
-- ============================================================

create table if not exists public.letters (
  id      bigint generated always as identity primary key,
  cid     text,                                            -- client id (อ้างอิงคำฝากของตัวเอง)
  text    text    not null check (char_length(text) <= 200),
  sig     text,                                            -- รหัสนิรนาม (Signal) ไม่ผูกตัวตน/อีเมล
  pub     boolean not null default true,
  replies jsonb   not null default '[]'::jsonb,
  reports int     not null default 0,
  hidden  boolean not null default false,
  ts      timestamptz not null default now()
);
create index if not exists letters_ts_idx  on public.letters (ts desc);
create index if not exists letters_sig_idx on public.letters (sig);

alter table public.letters enable row level security;

-- อ่านได้เฉพาะคำฝากสาธารณะ ที่ยังไม่ถูกซ่อน และ report ไม่ถึงเกณฑ์
drop policy if exists "read public letters" on public.letters;
create policy "read public letters" on public.letters
  for select to anon
  using (pub = true and hidden = false and reports < 3);

-- เพิ่มคำฝากใหม่ได้ (บังคับให้เป็นสาธารณะ/ยังไม่ถูกซ่อน/ยังไม่มี report/ยังไม่มีคำตอบ)
drop policy if exists "insert letter" on public.letters;
create policy "insert letter" on public.letters
  for insert to anon
  with check (
    pub = true and hidden = false and reports = 0
    and replies = '[]'::jsonb
    and char_length(text) between 1 and 200
  );

-- ตอบกลับ + report ทำผ่าน RPC (anon แก้แถวตรง ๆ ไม่ได้ — กันโกง)
create or replace function public.letter_reply(p_id bigint, p_text text, p_sig text)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if char_length(coalesce(p_text,'')) = 0 or char_length(p_text) > 200 then return false; end if;
  select jsonb_array_length(replies) into n from letters where id = p_id and not hidden;
  if n is null or n >= 1 then return false; end if;     -- ตอบได้ 1 ครั้งต่อคำฝาก
  update letters
     set replies = replies || jsonb_build_object(
       'text', left(p_text,200), 'sig', p_sig,
       't', (extract(epoch from now())*1000)::bigint)
   where id = p_id;
  return true;
end; $$;

create or replace function public.letter_report(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  update letters
     set reports = reports + 1,
         hidden  = (reports + 1 >= 3)                     -- ถึง 3 รายงาน → ซ่อนอัตโนมัติ
   where id = p_id;
end; $$;

-- founder ลบ/ซ่อนถาวร (เช็กอีเมลผู้ก่อตั้ง)
create or replace function public.letter_moderate(p_id bigint, p_hide boolean)
returns void language plpgsql security definer set search_path = public as $$
begin
  if coalesce(auth.jwt() ->> 'email','') <> 'cloundstory@gmail.com' then
    raise exception 'forbidden' using errcode = '42501';
  end if;
  update letters set hidden = p_hide where id = p_id;
end; $$;

revoke all on function public.letter_reply(bigint,text,text)  from public;
revoke all on function public.letter_report(bigint)           from public;
grant  execute on function public.letter_reply(bigint,text,text) to anon;
grant  execute on function public.letter_report(bigint)          to anon;
grant  execute on function public.letter_moderate(bigint,boolean) to authenticated;
