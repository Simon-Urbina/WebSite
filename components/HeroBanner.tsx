"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <section className="hero py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <motion.h1 className="display-5 fw-bold text-dark mb-3" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
              Disociando
            </motion.h1>
            <motion.p className="lead text-secondary" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
              Universidad Santo Tomás de Aquino — Seccional Tunja — Semillero PIXELES. Conversaciones sobre cultura digital, ciencia y creatividad.
            </motion.p>
            <motion.div className="d-flex gap-3 mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Link className="btn btn-primary" href="/episodes">Ver episodios</Link>
              <Link className="btn btn-outline-secondary" href="/rss.xml">RSS</Link>
            </motion.div>
          </div>
          <div className="col-md-6 text-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
              <Image src="/logo.svg" alt="Logo Disociando" width={280} height={280} priority />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
