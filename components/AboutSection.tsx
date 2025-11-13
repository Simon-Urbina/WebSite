"use client";
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-md-6">
          <motion.h2 className="h3 mb-3" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>Sobre el proyecto</motion.h2>
          <motion.p className="text-secondary mb-3" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.05, duration: 0.5 }}>
            Disociando es un podcast universitario del Semillero PIXELES (USTA Tunja) que explora la cultura digital, el diseño y la creatividad con mirada joven y crítica.
          </motion.p>
          <motion.p className="text-secondary" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}>
            Buscamos inspirar a la comunidad con conversaciones sobre tecnología, arte y comunicación visual. Episodios cortos, ideas claras y estética cuidada.
          </motion.p>
        </div>
        <div className="col-md-6">
          <motion.div className="about-tile" initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="ratio ratio-16x9 rounded-4 bg-gradient" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
