"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroGeometric, ElegantShape } from "@/components/ui/shape-landing-hero";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, customSlug: customSlug || undefined }),
    });

    const data = await res.json();

    if (res.ok) {
      setResult(data.shortUrl);
      setUrl("");
      setCustomSlug("");
    } else {
      setError(data.error ?? "Something went wrong");
    }

    setLoading(false);
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030303]">
        <p className="text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

        <div className="absolute inset-0 overflow-hidden">
          <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-indigo-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />
          <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-rose-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />
          <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-violet-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />
          <ElegantShape
            delay={0.6}
            width={200}
            height={60}
            rotate={20}
            gradient="from-amber-500/[0.15]"
            className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />
          <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-cyan-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
            >
              <span className="text-sm text-white/60 tracking-wide">URL Shortener</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.4, 0.25, 1] as const }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  Shorten, Share
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  and Track
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.4, 0.25, 1] as const }}
            >
              <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Shorten your links, share them anywhere, and track their performance.
                Sign in to get started.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] as const }}
              className="flex items-center justify-center gap-4"
            >
              <Link
                href="/auth/signin"
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-[#030303] hover:bg-white/90"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-medium text-white/80 hover:bg-white/[0.05]"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={400} height={100} rotate={8} gradient="from-indigo-500/[0.08]" className="left-[-5%] top-[10%]" />
        <ElegantShape delay={0.5} width={300} height={80} rotate={-10} gradient="from-rose-500/[0.08]" className="right-[-3%] bottom-[20%]" />
      </div>

      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
        <span className="text-lg font-bold text-white">URL Shortener</span>
        <button
          onClick={() => signOut()}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:bg-white/[0.05] cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      <main className="relative z-10 flex flex-1 items-start justify-center px-4 pt-12">
        <div className="w-full max-w-lg">
          <h1 className="mb-2 text-center text-4xl font-bold tracking-tight text-white">
            Shorten a URL
          </h1>
          <p className="mb-8 text-center text-sm text-zinc-400">
            Paste a long URL and get a short, shareable link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url"
                required
                className="block w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
              />
            </div>

            <div>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="Custom slug (optional)"
                maxLength={32}
                pattern="^[a-zA-Z0-9_-]*$"
                className="block w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
              />
              {customSlug && (
                <p className="mt-1 text-xs text-zinc-500">
                  Your link will be: {process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"}/{customSlug}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-white px-4 py-3 text-sm font-medium text-[#030303] hover:bg-white/90 disabled:opacity-50"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-400">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </div>
          )}

          {result && (
            <div className="mt-6 rounded-xl border border-zinc-700 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Your shortened URL
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 truncate text-sm font-medium text-white/80 hover:underline"
                >
                  {result}
                </a>
                <button
                  onClick={copyToClipboard}
                  className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/[0.05]"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
