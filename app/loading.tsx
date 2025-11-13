"use client";
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '40vh' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="d-flex align-items-center gap-2"
      >
        <motion.span
          className="rounded-circle"
          style={{ width: 10, height: 10, background: 'var(--brand-primary)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
        />
        <motion.span
          className="rounded-circle"
          style={{ width: 10, height: 10, background: 'var(--brand-accent)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.15 }}
        />
        <motion.span
          className="rounded-circle"
          style={{ width: 10, height: 10, background: 'var(--brand-pink)' }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
