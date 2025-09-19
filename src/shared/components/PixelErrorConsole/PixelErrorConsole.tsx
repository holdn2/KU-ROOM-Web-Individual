import { useEffect, useRef, useState } from "react";

// ===== types =====
type Level = "ERROR" | "WARN" | "HTTP" | "NETWORK";
interface Item {
  t: number;
  level: Level;
  msg: string;
}

export default function PixelErrorConsole() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // ---------- helpers ----------
  function push(level: Level, msg: string) {
    setItems((prev) => {
      const next = [...prev, { t: Date.now(), level, msg }];
      if (next.length > 300) next.shift(); // 메모리 제한
      return next;
    });
  }
  function fmtTime(t: number) {
    const d = new Date(t);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  // ---------- mount patches ----------
  useEffect(() => {
    // 1) console.error / warn 패치
    const origError = console.error;
    const origWarn = console.warn;

    console.error = (...args: unknown[]) => {
      push("ERROR", serialize(args));
      origError.apply(console, args as []);
    };
    console.warn = (...args: unknown[]) => {
      push("WARN", serialize(args));
      origWarn.apply(console, args as []);
    };

    // 2) window.onerror (런타임 에러)
    const onErr = (e: ErrorEvent) => {
      const where = e.filename
        ? ` at ${e.filename}:${e.lineno}:${e.colno}`
        : "";
      const stack =
        e.error && (e.error as { stack?: unknown })?.stack
          ? "\n" + String((e.error as { stack?: unknown }).stack)
          : "";
      push("ERROR", `${e.message}${where}${stack}`);
    };
    window.addEventListener("error", onErr);

    // 3) 미처리 Promise 에러
    const onRej = (e: PromiseRejectionEvent) => {
      push("ERROR", `UnhandledRejection: ${serialize([e.reason])}`);
    };
    window.addEventListener("unhandledrejection", onRej);

    // 4) fetch 패치 (HTTP 상태/네트워크 실패)
    const origFetch: typeof window.fetch = window.fetch.bind(window);
    type FetchArgs = Parameters<typeof window.fetch>; // [input, init?]
    (window as any).__origFetch__ = origFetch;

    window.fetch = (async (...args: FetchArgs) => {
      const url = getFetchUrl(args[0]);
      try {
        const res = await origFetch(...args);
        if (!res.ok) {
          push("HTTP", `HTTP ${res.status} ${res.statusText} - ${url}`);
        }
        return res;
      } catch (err) {
        push(
          "NETWORK",
          `FETCH FAILED - ${url}\n${String((err as any)?.message ?? err)}`
        );
        throw err;
      }
    }) as typeof window.fetch;

    // 5) XHR 패치 (라이브러리/구형 코드용)
    const OrigXHR = window.XMLHttpRequest;

    const PatchedXHR = function (this: XMLHttpRequest) {
      const xhr = new OrigXHR();

      let _method = "";
      let _url: string | URL = "";

      const origOpen: XMLHttpRequest["open"] = xhr.open;

      xhr.open = function (
        method: string,
        url: string | URL,
        async?: boolean,
        username?: string | null,
        password?: string | null
      ): void {
        _method = method;
        _url = url;
        // 안전하게 원본 호출
        return origOpen.call(
          xhr,
          method,
          url,
          async ?? true,
          username ?? null,
          password ?? null
        );
      };

      xhr.addEventListener("error", () => {
        push("NETWORK", `XHR ERROR - ${_method} ${_url}`);
      });
      xhr.addEventListener("abort", () => {
        push("NETWORK", `XHR ABORT - ${_method} ${_url}`);
      });
      xhr.addEventListener("load", () => {
        const status = xhr.status || 0;
        if (status < 200 || status >= 400) {
          push("HTTP", `XHR ${status} ${xhr.statusText} - ${_method} ${_url}`);
        }
      });

      return xhr;
    } as unknown as typeof XMLHttpRequest;

    (window as any).__OrigXHR__ = OrigXHR;
    (window as any).XMLHttpRequest = PatchedXHR;

    // cleanup
    return () => {
      console.error = origError;
      console.warn = origWarn;
      window.removeEventListener("error", onErr);
      window.removeEventListener("unhandledrejection", onRej);
      if ((window as any).__origFetch__) {
        window.fetch = (window as any).__origFetch__;
      }
      if ((window as any).__OrigXHR__) {
        (window as any).XMLHttpRequest = (window as any).__OrigXHR__;
      }
    };
  }, []);

  // 자동 스크롤
  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items, open]);

  // ---------- UI ----------
  return (
    <>
      {/* 토글 버튼 */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 10000,
          background: "#222",
          color: "#0f0",
          padding: "10px 16px",
          fontSize: "14px",
          fontFamily: "'Press Start 2P', monospace",
          border: "4px solid #0f0",
          borderRadius: "0px",
          boxShadow: "4px 4px 0px #0f0",
          cursor: "pointer",
        }}
      >
        {open ? "HIDE ERRORS" : "SHOW ERRORS"}
      </button>

      {/* 에러 패널 */}
      {open && (
        <div
          ref={listRef}
          style={{
            position: "fixed",
            bottom: "72px",
            left: 0,
            width: "100%",
            maxHeight: "260px",
            background: "#111",
            color: "#0f0",
            fontSize: "12px",
            fontFamily: "'Press Start 2P', monospace",
            overflowY: "auto",
            zIndex: 9999,
            padding: "8px",
            borderTop: "4px solid #0f0",
            boxShadow: "0 -4px 0 #0f0",
            whiteSpace: "pre-wrap",
          }}
        >
          {items.length === 0 ? (
            <div>📭 NO ERRORS</div>
          ) : (
            items.map((it, i) => (
              <div key={i} style={{ marginBottom: "6px" }}>
                <span style={{ opacity: 0.75 }}>
                  [{fmtTime(it.t)}] [{it.level}]
                </span>{" "}
                {it.msg}
              </div>
            ))
          )}

          {/* 액션 버튼 */}
          <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
            <button
              onClick={() => setItems([])}
              style={{
                background: "#222",
                color: "#0f0",
                padding: "6px 10px",
                fontSize: "12px",
                border: "3px solid #0f0",
                borderRadius: "0px",
                boxShadow: "3px 3px 0px #0f0",
                cursor: "pointer",
              }}
            >
              CLEAR
            </button>
            <button
              onClick={() => {
                const text = items
                  .map((it) => `[${fmtTime(it.t)}] [${it.level}] ${it.msg}`)
                  .join("\n");
                // clipboard가 없을 수도 있어 optional
                void navigator.clipboard?.writeText(text);
              }}
              style={{
                background: "#222",
                color: "#0f0",
                padding: "6px 10px",
                fontSize: "12px",
                border: "3px solid #0f0",
                borderRadius: "0px",
                boxShadow: "3px 3px 0px #0f0",
                cursor: "pointer",
              }}
            >
              COPY
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ===== util =====
function serialize(args: unknown[]): string {
  return args
    .map((a) => {
      if (a instanceof Error) {
        const e = a as Error & { stack?: unknown };
        return e.stack ? String(e.stack) : String(e.message ?? a);
      }
      if (typeof a === "object" && a !== null) {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");
}

type FetchInput = Parameters<typeof fetch>[0];
function getFetchUrl(input: FetchInput): string {
  try {
    if (typeof input === "string") return input;
    if (input instanceof URL) return input.toString();
    const req = input as Request;
    return req?.url || "(unknown)";
  } catch {
    return "(unknown)";
  }
}
