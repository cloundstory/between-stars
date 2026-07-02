# ============================================================
#  Between Stars · Smoke test — เปิดทุกหน้า x 2 ภาษา แล้วจับ error
#  รัน:  python scripts/smoke.py        (หรือดับเบิลคลิก smoke.bat)
#  ต้องมี: pip install playwright  (ครั้งเดียว — ใช้ Edge ที่ติดตั้งอยู่แล้ว
#          ผ่าน channel="msedge" จึงไม่ต้องโหลดเบราว์เซอร์เพิ่ม)
#
#  ทำอะไร: เสิร์ฟไฟล์ในโฟลเดอร์นี้พร้อม CSP ชุดเดียวกับ vercel.json
#  (จะได้จับ CSP พังตั้งแต่ในเครื่อง) → เปิดแต่ละหน้า → fail ถ้ามี
#  console error / uncaught exception / โหลด resource ไม่ขึ้น
#  สำหรับ solar-system: คลิกผ่าน intro แล้วเช็คว่า canvas 3D ถูกสร้างจริง
# ============================================================
import http.server, json, pathlib, socketserver, sys, threading, time

ROOT = pathlib.Path(__file__).resolve().parent.parent
PORT = 8123

# CSP เดียวกับ vercel.json (ตัด upgrade-insecure-requests เพราะเทสต์บน http://localhost)
CSP = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
CSP = next(h["value"] for blk in CSP["headers"] for h in blk["headers"]
           if h["key"] == "Content-Security-Policy")
CSP = CSP.replace("; upgrade-insecure-requests", "")

PAGES = [
    ("/",                      "landing"),
    ("/?lang=en",              "landing EN"),
    ("/solar-system.html",     "app TH"),
    ("/solar-system.html?lang=en", "app EN"),
    ("/light-echo.html",       "light echo"),
    ("/credits.html",          "credits"),
    ("/privacy.html",          "privacy"),
    ("/dashboard.html",        "dashboard (login view)"),
]

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw): super().__init__(*a, directory=str(ROOT), **kw)
    def end_headers(self):
        self.send_header("Content-Security-Policy", CSP)
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()
    def guess_type(self, path):
        if str(path).endswith(".glb"):  return "model/gltf-binary"
        if str(path).endswith(".wasm"): return "application/wasm"
        return super().guess_type(path)
    def log_message(self, *a): pass  # เงียบ — ไม่ปนกับผลเทสต์

def main():
    from playwright.sync_api import sync_playwright

    srv = socketserver.ThreadingTCPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{PORT}"
    failures = []

    with sync_playwright() as p:
        browser = p.chromium.launch(
            channel="msedge", headless=True,
            args=["--enable-unsafe-swiftshader"])  # WebGL แบบ software ใน headless
        for path, label in PAGES:
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            errs = []
            page.on("console", lambda m, e=errs: e.append(f"console: {m.text}")
                    if m.type == "error" else None)
            page.on("pageerror", lambda ex, e=errs: e.append(f"pageerror: {ex}"))
            page.on("requestfailed", lambda r, e=errs: e.append(
                f"request failed: {r.url} ({r.failure})")
                if "supabase.co" not in r.url else None)  # analytics อาจโดน block ใน headless — ไม่ใช่บั๊กเว็บ
            try:
                page.goto(base + path, wait_until="load", timeout=45000)
                page.wait_for_timeout(2500)
                if path.startswith("/solar-system"):
                    page.mouse.click(640, 400)          # ผ่าน intro "แตะเพื่อเริ่ม"
                    page.wait_for_timeout(4000)
                    if not page.query_selector("canvas"):
                        errs.append("no <canvas> — 3D scene did not start")
            except Exception as ex:
                errs.append(f"navigation: {ex}")
            page.close()
            status = "OK " if not errs else "FAIL"
            print(f"[{status}] {label:24s} {path}")
            for e in errs[:8]:
                print(f"        - {e[:300]}")
            if errs:
                failures.append(label)
        browser.close()
    srv.shutdown()

    print()
    if failures:
        print(f"SMOKE FAILED: {len(failures)}/{len(PAGES)} pages -> {', '.join(failures)}")
        sys.exit(1)
    print(f"SMOKE PASSED: {len(PAGES)}/{len(PAGES)} pages clean")

if __name__ == "__main__":
    main()
