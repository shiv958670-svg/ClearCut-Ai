'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import UploadBox from '../components/UploadBox';
import ImagePreview from '../components/ImagePreview';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import { Sparkles, Shield, Zap, ImageIcon } from 'lucide-react';

let isProcessing = false;

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'AI-powered removal in under 10 seconds',
    color: '#fee440',
  },
  {
    icon: Shield,
    title: 'Pixel Perfect',
    desc: 'Sharp edges, zero artifacts',
    color: '#00f5d4',
  },
  {
    icon: ImageIcon,
    title: 'HD Quality',
    desc: 'Full-resolution PNG output',
    color: '#9b5de5',
  },
];

export default function Home() {
  const [state, setState] = useState('idle'); // 'idle' | 'loading' | 'done'
  const [original, setOriginal] = useState(null);
  const [result, setResult] = useState(null);

const handleUpload = async (dataUrl, fileInfo) => {

  if (isProcessing) return;
  isProcessing = true;

  try {
    const isPremium = localStorage.getItem("premium");

    if (!isPremium) {
      let count = Number(localStorage.getItem("usage") || 0);

      if (count >= 3) {
        alert("Free limit reached! Upgrade to Pro");
        return;
      }

      localStorage.setItem("usage", count + 1);
    }

    // ✅ अब UI update करो
    setOriginal(dataUrl);
    setState('loading');

    // 👇 तुम्हारा API call यहाँ
    // await fetch(...)

    // जब success हो जाए
    setState('done');

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
    setState('error');
  } finally {
    isProcessing = false; // 🔥 हमेशा reset होगा
  }
};
    try {
      // Convert base64 to blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();

      const formData = new FormData();
      formData.append('image', blob, fileInfo?.name || 'image.png');

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Background removal failed.');
      }

      setResult(data.image);
      setState('done');
      toast.success('Background removed! 🎉');
    } catch (err) {
      setState('idle');
      toast.error(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setState('idle');
    setOriginal(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* BG decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-[0.15] dark:opacity-[0.08] blur-3xl"
          style={{ background: 'radial-gradient(circle, #9b5de5, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-[0.12] dark:opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(circle, #00f5d4, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] dark:opacity-[0.03] blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        />
      </div>

      <main className="flex-1 pt-28 pb-10 px-4 sm:px-6 relative">
        {/* Hero */}
        <AnimatePresence>
          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-12 max-w-2xl mx-auto"
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[var(--border)] mb-6"
              >
                <Sparkles className="w-3 h-3 text-[var(--accent-2)]" />
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Powered by remove.bg AI
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-4"
              >
                Remove{' '}
                <span className="gradient-text italic">backgrounds</span>
                <br />
                in seconds.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[var(--text-secondary)] font-body text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
              >
                Upload any photo and our AI will cleanly cut out the background — no skills required.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mt-7"
              >
                {features.map(({ icon: Icon, title, desc, color }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl glass-card border border-[var(--border)]"
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}20` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-medium text-[var(--text-primary)]">{title}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <UploadBox onUpload={handleUpload} loading={false} />
              </motion.div>
            )}

            {state === 'loading' && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-2xl max-w-lg mx-auto"
              >
                <Loader />
              </motion.div>
            )}

            {state === 'done' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ImagePreview
                  original={original}
                  result={result}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* How it works — shown only on idle */}
        <AnimatePresence>
          {state === 'idle' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto mt-16"
            >
              <p className="text-center text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-6">
                How it works
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { step: '01', label: 'Upload', desc: 'Drop your JPG or PNG' },
                  { step: '02', label: 'Process', desc: 'AI removes the background' },
                  { step: '03', label: 'Download', desc: 'Get your PNG instantly' },
                ].map(({ step, label, desc }, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-8 h-8 rounded-lg glass-card border border-[var(--border)] flex items-center justify-center mx-auto mb-3">
                      <span className="text-[10px] font-mono font-bold text-[var(--accent)]">{step}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
