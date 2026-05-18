'use client';

import { Heart, Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center">
              <Scissors className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
            </div>
            <span>ClearCut</span>
            <span className="opacity-40">—</span>
            <span>AI Background Remover</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <a
              href="https://www.remove.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-2)] hover:underline"
            >
              remove.bg
            </a>
            <span className="opacity-40 mx-1">·</span>
            <span>Built with</span>
            <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400 mx-0.5" />
            <span>using Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
