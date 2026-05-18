'use client';

import { useTheme } from './ThemeProvider';
import { Sun, Moon, Scissors, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="glass-card border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-400 flex items-center justify-center shadow-neon-purple">
                <Scissors className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--accent-2)] rounded-full animate-pulse" />
            </div>
            <div>
              <span className="font-display text-[1.1rem] font-bold tracking-tight text-[var(--text-primary)]">
                ClearCut
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[var(--accent-2)]" />
                <span className="text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest">
                  AI Powered
                </span>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.remove.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              remove.bg API
            </a>

            <div className="w-px h-4 bg-[var(--border)] hidden sm:block" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="glass-card rounded-full p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
