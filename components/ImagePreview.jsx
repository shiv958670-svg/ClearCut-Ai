'use client';

import { motion } from 'framer-motion';
import { Download, RotateCcw, ZoomIn, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ImagePreview({ original, result, onReset }) {
  const [activeView, setActiveView] = useState('split'); // 'split' | 'result' | 'original'
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = result;
      link.download = `clearcut-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Image downloaded!');
    } catch {
      toast.error('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-5"
    >
      {/* Success badge */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="flex items-center justify-center"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Check className="w-3.5 h-3.5" />
          <span className="text-xs font-mono font-medium">Background removed successfully</span>
        </div>
      </motion.div>

      {/* View toggle */}
      <div className="flex items-center justify-center">
        <div className="glass-card rounded-full p-1 flex gap-1">
          {[
            { key: 'split', label: 'Compare' },
            { key: 'original', label: 'Original' },
            { key: 'result', label: 'Result' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveView(key)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 cursor-pointer
                ${activeView === key
                  ? 'bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Image display */}
      <motion.div
        layout
        className={`grid gap-4 ${activeView === 'split' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}
      >
        {/* Original */}
        {(activeView === 'split' || activeView === 'original') && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--text-muted)]">Original</span>
              <ZoomIn className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            </div>
            <div className="p-3">
              <img
                src={original}
                alt="Original"
                className="w-full rounded-xl object-contain max-h-72"
              />
            </div>
          </motion.div>
        )}

        {/* Result */}
        {(activeView === 'split' || activeView === 'result') && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-[var(--border)] flex items-center justify-between">
              <span className="text-xs font-mono text-[var(--accent-2)]">Processed</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)] animate-pulse" />
                <span className="text-[10px] font-mono text-[var(--text-muted)]">PNG</span>
              </div>
            </div>
            <div className="p-3">
              <div className="checker-bg rounded-xl overflow-hidden">
                <img
                  src={result}
                  alt="Background removed"
                  className="w-full object-contain max-h-72"
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 py-3.5 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2.5 text-white cursor-pointer relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #00c4a8)',
            boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
          }}
        >
          {downloading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
              />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PNG
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="flex-1 py-3.5 rounded-xl font-body font-medium text-sm flex items-center justify-center gap-2.5 glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer border border-[var(--border)]"
        >
          <RotateCcw className="w-4 h-4" />
          Try another image
        </motion.button>
      </div>
    </motion.div>
  );
}
