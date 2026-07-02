# ============================================================
#  Between Stars · Deep verify — เทสต์เชิงลึกกว่า smoke.py
#  รัน:  python scripts/verify.py   (ใช้ Edge ในเครื่องผ่าน Playwright เหมือน smoke)
#
#  Part A: คลิกไล่ทุกฟีเจอร์ 2 ภาษา (โหลด sync.js จริง = อ่าน cloud ได้ แต่ stub
#          bsEvent กัน event เทสต์ปนเข้า analytics และไม่กดอะไรที่เขียนขึ้น cloud)
#  Part B: เทสต์พฤติกรรม 4 ฟีเจอร์แบบ local-only (บล็อก sync.js → ศูนย์การเขียน cloud):
#          คำฝาก cast + daily limit · ห้วงใจ เลือก/reroll/เซฟ ·
#          resonance โพสต์ + like ซ้ำไม่นับ · golden record ผนึก + เปิดดู voice box
#  Part C: เช็คน้ำหนักสุ่มคำฝากจริง vs seed (pickLetter ต้องเจอจริง >35% เมื่อมีจริง 1 ฉบับ)
# ============================================================
import http.server, json, pathlib, socketserver, sys, threading

sys.stdout.reconfigure(encoding="utf-8")
ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = 8124

CSP = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
CSP = next(h["value"] for blk in CSP["headers"] for h in blk["headers"]
           if h["key"] == "Content-Security-Policy").replace("; upgrade-insecure-requests", "")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=str(ROOT), **kw)
    def end_headers(self):
        self.send_header("Content-Security-Policy", CSP); super().end_headers()
    def guess_type(self, path):
        if str(path).endswith(".glb"): return "model/gltf-binary"
        if str(path).endswith(".wasm"): return "application/wasm"
        return super().guess_type(path)
    def log_message(self, *a): pass

FAILURES = []

def section(browser, name, local_only=False):
    """เปิดหน้า app พร้อมเก็บ error; คืน (page, errs, step)"""
    pg = browser.new_page(viewport={"width": 1280, "height": 800})
    errs = []
    if local_only:
        pg.route("**/sync.js", lambda r: r.abort())
    pg.on("console", lambda m: errs.append("console: " + m.text)
          if m.type == "error" and "Failed to load resource" not in m.text else None)
    pg.on("pageerror", lambda ex: errs.append("pageerror: " + str(ex)))
    pg.add_init_script("Object.defineProperty(window,'bsEvent',{value:()=>{},writable:false});")

    def step(label, fn, expect=True):
        try:
            r = fn(); pg.wait_for_timeout(700)
            ok = (r == expect) if expect is not True else bool(r) or r is None
            print(f"  [{'OK ' if ok else 'FAIL'}] {name}: {label}" + ("" if ok else f"  (got {r!r})"))
            if not ok: FAILURES.append(f"{name}/{label}")
        except Exception as ex:
            print(f"  [FAIL] {name}: {label}\n         {str(ex)[:200]}")
            FAILURES.append(f"{name}/{label}")
    return pg, errs, step

def boot(pg, step, lang="th"):
    pg.goto(f"http://127.0.0.1:{PORT}/solar-system.html?lang={lang}", wait_until="load")
    pg.wait_for_timeout(3000)
    step("intro tap", lambda: pg.mouse.click(640, 400)); pg.wait_for_timeout(1800)

def contemplate(pg, step):
    step("contemplate mode", lambda: pg.evaluate("document.getElementById('modeBtn').click()"))
    pg.wait_for_timeout(1800)

def finish(name, pg, errs):
    pg.close()
    for e in errs[:6]: print(f"    ! {e[:220]}")
    if errs: FAILURES.append(f"{name}/console")

def part_a(browser, lang):
    name = f"clickthrough-{lang}"
    pg, errs, step = section(browser, name)
    boot(pg, step, lang)
    step("open nav planet", lambda: pg.evaluate("document.querySelectorAll('#nav .row')[3].click()"))
    step("eclipse solar",   lambda: pg.evaluate("document.getElementById('evSolar').click()"))
    contemplate(pg, step)
    for label, el in [("mood journal", "moodBtn"), ("star echo", "echoBtn"), ("black hole", "bhBtn")]:
        step("open " + label, lambda el=el: pg.evaluate(f"document.getElementById('{el}').click()"))
        step("close " + label, lambda: pg.keyboard.press("Escape"))
    step("open guide", lambda: pg.evaluate(
        "[...document.querySelectorAll('button,a')].find(x=>/คู่มือ|Guide/i.test(x.textContent)).click()"))
    step("close guide", lambda: pg.keyboard.press("Escape"))
    finish(name, pg, errs)

def part_b(browser):
    name = "behavior"
    pg, errs, step = section(browser, name, local_only=True)
    boot(pg, step); contemplate(pg, step)

    # ── คำฝาก: cast + daily limit ──
    step("letters: open write", lambda: pg.evaluate("document.getElementById('writeBtn').click()"))
    pg.evaluate("document.getElementById('msgInput').value='คำฝากจากชุดเทสต์'")
    step("letters: cast", lambda: pg.evaluate("document.getElementById('sendPub').click()"))
    pg.wait_for_timeout(800)
    step("letters: stored 1", lambda: pg.evaluate(
        "JSON.parse(localStorage.getItem('spaceLetters')||'[]').length"), expect=1)
    step("letters: stat shows", lambda: pg.evaluate(
        "document.getElementById('letterStat').textContent.includes('ฝากไว้กับดาว 1')"))
    pg.wait_for_timeout(1500)   # รอ timeout ปิด panel ของ cast แรกก่อน
    step("letters: open write again", lambda: pg.evaluate("document.getElementById('writeBtn').click()"))
    pg.evaluate("document.getElementById('msgInput').value='ฉบับที่สองวันเดียวกัน'")
    step("letters: 2nd cast blocked", lambda: (
        pg.evaluate("document.getElementById('sendPub').click()"),
        pg.wait_for_timeout(400),
        pg.evaluate("JSON.parse(localStorage.getItem('spaceLetters')).length"))[-1], expect=1)

    # ── ห้วงใจ: เลือก / reroll / เซฟ ──
    step("mood: open", lambda: pg.evaluate("document.getElementById('moodBtn').click()"))
    step("mood: pick chip", lambda: pg.evaluate(
        "document.querySelector('#moodChips span,#moodChips div,#moodChips button').click()"))
    q1 = pg.evaluate("document.getElementById('moodQ').textContent")
    step("mood: reroll differs", lambda: pg.evaluate(
        "document.getElementById('moodReroll').click()") or
        pg.evaluate("document.getElementById('moodQ').textContent") != q1)
    pg.evaluate("document.getElementById('moodNote').value='บันทึกจากชุดเทสต์'")
    step("mood: save", lambda: pg.evaluate("document.getElementById('moodSave').click()"))
    pg.wait_for_timeout(800)
    step("mood: saved today", lambda: pg.evaluate(
        "Object.keys(JSON.parse(localStorage.getItem('moodJournal')||'{}')).length"), expect=1)
    step("mood: close", lambda: pg.keyboard.press("Escape"))

    # ── resonance: โพสต์ + like ซ้ำไม่นับ ──
    step("res: select planet", lambda: pg.evaluate("document.querySelectorAll('#nav .row')[3].click()"))
    pg.wait_for_timeout(1000)
    step("res: open board", lambda: pg.evaluate("document.getElementById('iResBtn').click()"))
    pg.evaluate("document.getElementById('resTextarea').value='เสียงสะท้อนจากชุดเทสต์'")
    step("res: post", lambda: pg.evaluate("document.getElementById('resSubmit').click()"))
    pg.wait_for_timeout(600)
    step("res: on board", lambda: pg.evaluate(
        "Object.values(JSON.parse(localStorage.getItem('resonanceBoard')||'{}'))[0][0].text.includes('ชุดเทสต์')"))
    step("res: like", lambda: pg.evaluate("document.querySelector('#resBody .ract').click()"))
    step("res: like dedup", lambda: (
        pg.evaluate("document.querySelector('#resBody .ract').click()"),
        pg.wait_for_timeout(300),
        pg.evaluate("Object.values(JSON.parse(localStorage.getItem('resonanceBoard')))[0][0].likes"))[-1], expect=1)
    step("res: close", lambda: pg.keyboard.press("Escape"))

    # ── golden record: ผนึก + เปิด voice box ผ่าน Voyager 1 ──
    pg.evaluate("document.getElementById('grTextarea').value='ถึงห้วงดาว จากชุดเทสต์'")
    step("gr: seal", lambda: pg.evaluate("document.getElementById('grSubmit').click()"))
    pg.wait_for_timeout(600)
    step("gr: keys set", lambda: pg.evaluate(
        "!!localStorage.getItem('goldenRecord') && JSON.parse(localStorage.getItem('grPool')).length===1"))
    step("gr: select voyager1", lambda: pg.evaluate(
        "(()=>{const el=[...document.querySelectorAll('button,div')].find(x=>x.children.length<4&&/วอยเอเจอร์ 1|Voyager 1/.test(x.textContent)&&x.onclick);if(!el)return false;el.click();return true;})()"))
    pg.wait_for_timeout(1200)
    step("gr: open overlay", lambda: pg.evaluate("document.getElementById('iGrBtn').click()"))
    pg.wait_for_timeout(600)
    step("gr: own msg shown", lambda: pg.evaluate(
        "document.getElementById('grVoiceMsg').textContent.includes('จากชุดเทสต์')"))
    finish(name, pg, errs)

def part_c(browser):
    """pickLetter ต้องถ่วงน้ำหนักให้คำฝากจริงเหนือ seed (คาด ~65% เมื่อมีจริง 1 ฉบับ)"""
    name = "pick-weight"
    pg, errs, step = section(browser, name, local_only=True)
    pg.goto(f"http://127.0.0.1:{PORT}/credits.html", wait_until="load")
    pg.evaluate("localStorage.clear();localStorage.setItem('spaceLetters',JSON.stringify("
                "[{id:'r1',text:'ของจริง',t:Date.now(),pub:true,sig:'OTHER',replies:[]}]))")
    share = pg.evaluate("""
      import('/js/letters.js').then(m=>{
        let real=0; for(let i=0;i<80;i++){const p=m.pickLetter(); if(p && !String(p.id).startsWith('seed_')) real++;}
        return real/80;
      })""")
    step(f"real share {share:.0%} > 35%", lambda: share > 0.35)
    finish(name, pg, errs)

def main():
    from playwright.sync_api import sync_playwright
    srv = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True,
                                    args=["--enable-unsafe-swiftshader"])
        part_a(browser, "th")
        part_a(browser, "en")
        part_b(browser)
        part_c(browser)
        browser.close()
    srv.shutdown()
    print()
    if FAILURES:
        print(f"VERIFY FAILED: {len(FAILURES)} -> {', '.join(FAILURES[:10])}")
        sys.exit(1)
    print("VERIFY PASSED: click-through x2 langs + 4 feature behaviors + pick weighting")

if __name__ == "__main__":
    main()
