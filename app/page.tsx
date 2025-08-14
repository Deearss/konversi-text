"use client";
import { useState } from "react";
import { ArrowRight, Sparkles, Type } from "lucide-react";
import { BarLoader } from "react-spinners";

type Mode = "CAPITALIZE";

export default function Home() {
  const [input, setInput] = useState("");
  const [mode] = useState<Mode>("CAPITALIZE");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const endpoint = API_BASE ? `${API_BASE}/convert` : "/api/convert";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, mode }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `Request failed: ${res.status}`);
      }
      const data = (await res.json()) as { output: string };
      setResult(data.output);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <main className="w-full max-w-md">
        <header className="mb-10 text-center">
          <div className="inline-block mb-4 p-3 bg-card rounded-2xl cute-shadow">
            <Sparkles size={32} style={{ color: "var(--color-primary)" }} />
          </div>
          <h1 className="text-4xl font-bold gradient-text">
            Konversi Teks Ajaib
          </h1>
          <p className="opacity-70 mt-2">Ubah teks biasa jadi luar biasa!</p>
        </header>

        <div className="relative bg-card rounded-2xl p-6 sm:p-8 cute-shadow">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-1.5 bg-primary rounded-full"
            style={{ backgroundColor: "var(--color-primary)" }}
          />
          <form onSubmit={onSubmit}>
            <label
              htmlFor="text"
              className="block text-sm font-semibold mb-2 opacity-80"
            >
              Teks Asli
            </label>
            <input
              id="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ketik sesuatu yang imut..."
              className="w-full resize-y rounded-xl border-2 focus:outline-none focus:ring-2 p-4 text-base transition-all"
              style={
                {
                  borderColor: "var(--color-border)",
                  backgroundColor: "rgba(var(--color-input), 0.5)",
                  "--tw-ring-color": "rgba(var(--color-primary), 0.5)",
                } as React.CSSProperties
              }
            />

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type size={16} className="opacity-60" />
                <span className="text-sm font-medium opacity-80">Mode:</span>
                <span
                  className="px-3 py-1 text-xs font-bold rounded-full"
                  style={{
                    backgroundColor: "rgba(var(--color-primary), 0.1)",
                    color: "var(--color-primary)",
                  }}
                >
                  {mode}
                </span>
              </div>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl text-primary-foreground px-6 py-3 text-base font-bold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-transform active:scale-95"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                }}
              >
                {loading ? (
                  "Mengubah..."
                ) : (
                  <>
                    Ubah <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 h-20">
          {loading && (
            <div
              className="w-full flex flex-col items-center justify-center text-sm"
              style={{ color: "var(--color-primary)" }}
            >
              <BarLoader color="var(--color-primary)" width="100%" />
              <p className="mt-2 animate-pulse">Menyulap kata-katamu...</p>
            </div>
          )}
          {error && (
            <div
              className="p-4 rounded-xl text-center font-medium"
              style={{
                backgroundColor: "rgba(var(--color-secondary), 0.1)",
                color: "var(--color-secondary)",
              }}
            >
              {error}
            </div>
          )}
          {result && (
            <div
              className="p-5 rounded-2xl cute-shadow text-center"
              style={{ backgroundColor: "rgba(var(--color-primary), 0.1)" }}
            >
              <h2
                className="text-sm font-bold mb-2"
                style={{ color: "var(--color-primary)" }}
              >
                Hasilnya!
              </h2>
              <p className="text-xl font-bold break-words">{result}</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center text-xs opacity-50">
          <div className="space-x-1">
            <span>Dibuat oleh</span>
            <a
              target="_blank"
              className="text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200 ease-in-out font-semibold"
              href="https://github.com/4DYDD"
            >
              4dydd
            </a>
            <span>&</span>
            <a
              target="_blank"
              className="text-blue-600 hover:underline hover:underline-offset-4 transition-all duration-200 ease-in-out font-semibold"
              href="https://github.com/Ryanz1511"
            >
              Ryanz1511
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
