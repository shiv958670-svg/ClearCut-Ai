'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, X, FileImage, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const MAX_SIZE = 12 * 1024 * 1024; // 12MB

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadBox({ onUpload, loading }) {
  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const onDrop = useCallback((accepted, rejected) => {
    if (rejected.length > 0) {
      const err = rejected[0].errors[0];
      if (err.code === 'file-too-large') {
        toast.error('File too large. Max 12MB allowed.');
      } else if (err.code === 'file-invalid-type') {
        toast.error('Invalid file type. Please upload JPG or PNG.');
      } else {
        toast.error('Invalid file. Please try another image.');
      }
      return;
    }
    if (accepted.length === 0) return;

    const file = accepted[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      setFileInfo({ name: file.name, size: file.size, type: file.type });
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1,
    maxSize: MAX_SIZE,
    disabled: loading,
  });

  const clearImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setFileInfo(null);
  };

  const handleProcess = () => {
    if (!preview) {
      toast.error('Please select an image first.');
      return;
    }
    onUpload(preview, fileInfo);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`
          relative rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragActive && !isDragReject ? 'ring-2 ring-[var(--accent-2)] scale-[1.01]' : ''}
          ${isDragReject ? 'ring-2 ring-red-500' : ''}
          ${loading ? 'cursor-not-allowed opacity-60' : ''}
          ${!preview ? 'min-h-[280px]' : ''}
          glass-card
        `}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Image preview */}
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-72 object-contain rounded-2xl"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <p className="text-white text-sm font-body">Click or drop to change</p>
                </div>
              </div>

              {/* File info bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                    <FileImage className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[var(--text-primary)] truncate max-w-[200px]">
                      {fileInfo?.name}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] font-mono">
                      {formatBytes(fileInfo?.size)} · {fileInfo?.type?.split('/')[1]?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearImage}
                  className="w-7 h-7 rounded-full bg-[var(--bg-secondary)] hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-[var(--text-muted)]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[280px] p-8 text-center"
            >
              {/* Upload icon */}
              <motion.div
                animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-6 relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 border border-[var(--border)] flex items-center justify-center">
                  <Upload className="w-7 h-7 text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-[var(--accent)]/10"
                />
              </motion.div>

              <div className="space-y-2">
                <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {isDragActive
                    ? isDragReject
                      ? 'Invalid file type'
                      : 'Release to upload'
                    : 'Drop your image here'}
                </p>
                <p className="text-sm text-[var(--text-muted)] font-body">
                  or{' '}
                  <span className="text-[var(--accent)] hover:underline cursor-pointer font-medium">
                    browse files
                  </span>
                </p>
              </div>

              {/* File type badges */}
              <div className="flex items-center gap-2 mt-6">
                {['JPG', 'PNG', 'WEBP'].map((type) => (
                  <span
                    key={type}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {type}
                  </span>
                ))}
                <span className="text-[10px] text-[var(--text-muted)] font-mono">· Max 12MB</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag overlay */}
        {isDragActive && !isDragReject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[var(--accent)]/10 rounded-2xl border-2 border-dashed border-[var(--accent-2)] pointer-events-none flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-10 h-10 text-[var(--accent-2)]" />
              <p className="text-[var(--accent-2)] font-medium text-sm">Drop it!</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Process button */}
      <AnimatePresence>
        {preview && !loading && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProcess}
            className="w-full py-4 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2.5 text-white relative overflow-hidden group cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #9b5de5 50%, #00c4a8 100%)',
              backgroundSize: '200% 200%',
              boxShadow: '0 4px 24px rgba(124,58,237,0.4)',
            }}
          >
            {/* Shimmer */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
            <Zap className="w-4 h-4" fill="currentColor" strokeWidth={0} />
            Remove Background
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
