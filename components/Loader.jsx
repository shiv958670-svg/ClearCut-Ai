'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const steps = [
  { label: 'Analyzing image...', pct: 15 },
  { label: 'Detecting subjects...', pct: 35 },
  { label: 'Removing background...', pct: 65 },
  { label: 'Refining edges...', pct: 85 },
  { label: 'Finalizing result...', pct: 95 },
];

export default function Loader({ progress }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx(i => {
        const next = i + 1;
        if (next >= steps.length) { clearInterval(interval); return i; }
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const displayPct = progress ?? steps[stepIdx].pct;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center gap-8 py-12 px-8"
    >
      {/* Orbital spinner */}
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            background: 'linear-gradient(135deg, #9b5de5, #00f5d4) border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
          }}
        />
        {/* Glow dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--accent-2)] shadow-[0_0_12px_rgba(0,245,212,0.8)]" />
        </motion.div>
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border border-[var(--accent)]/30"
          style={{
            borderTopColor: 'var(--accent)',
          }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl"
          >
            ✂️
          </motion.div>
        </div>
      </div>

      {/* Step label */}
      <div className="text-center">
        <motion.p
          key={stepIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[var(--text-primary)] font-body font-medium text-sm"
        >
          {steps[stepIdx].label}
        </motion.p>
        <p className="text-[var(--text-muted)] font-mono text-xs mt-1">
          This usually takes 5–10 seconds
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between mb-2">
          <span className="text-[var(--text-muted)] font-mono text-xs">Processing</span>
          <motion.span
            key={displayPct}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[var(--accent-2)] font-mono text-xs font-medium"
          >
            {displayPct}%
          </motion.span>
        </div>
        <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '5%' }}
            animate={{ width: `${displayPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #9b5de5, #00f5d4)',
              boxShadow: '0 0 8px rgba(0,245,212,0.5)',
            }}
          />
        </div>

        {/* Step dots */}
        <div className="flex justify-between mt-3">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              animate={i <= stepIdx ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                i <= stepIdx ? 'bg-[var(--accent-2)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
