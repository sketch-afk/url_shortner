"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { ElegantShape } from "@/components/ui/shape-landing-hero";

interface LinkItem {
  _id: string;
  originalUrl: string;
  slug: string;
  clicks: number;
  createdAt: string;
}

export default function DashboardClient({
  links: initialLinks,
  baseUrl,
}: {
  links: LinkItem[];
  baseUrl: string;
}) {
  const [links] = useState(initialLinks);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyToClipboard(slug: string, id: string) {
    await navigator.clipboard.writeText(`${baseUrl}/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="min-h-screen bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={500} height={120} rotate={12} gradient="from-indigo-500/[0.08]" className="left-[-5%] top-[10%]" />
        <ElegantShape delay={0.5} width={400} height={100} rotate={-15} gradient="from-rose-500/[0.08]" className="right-[-3%] bottom-[10%]" />
        <ElegantShape delay={0.4} width={200} height={60} rotate={-8} gradient="from-violet-500/[0.08]" className="left-[10%] bottom-[5%]" />
        <ElegantShape delay={0.6} width={150} height={40} rotate={20} gradient="from-amber-500/[0.08]" className="right-[15%] top-[15%]" />
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

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center gap-3">
          <Circle className="h-2 w-2 fill-rose-500/80" />
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>

        {links.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-dashed border-zinc-700 p-16 text-center"
          >
            <p className="text-lg text-zinc-300">No links yet.</p>
            <p className="mt-2 text-sm text-zinc-500">
              Go to the home page to create your first short link.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto rounded-xl border border-zinc-800"
          >
            <table className="min-w-full divide-y divide-zinc-800">
              <thead>
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Short URL
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Original URL
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Clicks
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {links.map((link) => (
                  <tr key={link._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/${link.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white/80 hover:text-white hover:underline"
                        >
                          /{link.slug}
                        </a>
                        <button
                          onClick={() => copyToClipboard(link.slug, link._id)}
                          className="rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                        >
                          {copiedId === link._id ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </td>
                    <td className="max-w-xs truncate px-4 py-4 text-sm text-zinc-400">
                      {link.originalUrl}
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-medium text-zinc-200">
                      {link.clicks}
                    </td>
                    <td className="px-4 py-4 text-right text-sm text-zinc-500">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
