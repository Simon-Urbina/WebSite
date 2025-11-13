"use client";
import { motion } from 'framer-motion';

const links = [
  { href: 'https://open.spotify.com/', label: 'Spotify' },
  { href: 'https://podcasts.apple.com/', label: 'Apple Podcasts' },
  { href: 'https://www.youtube.com/', label: 'YouTube' },
  { href: '/rss.xml', label: 'RSS' }
];

export default function PlatformsSection() {
  return (
    <section className="container py-5">
      <motion.h2 className="h3 mb-3" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>Escúchanos</motion.h2>
      <motion.p className="text-secondary mb-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>Estamos disponibles (o pronto) en tus plataformas favoritas.</motion.p>
      <div className="d-flex flex-wrap gap-3">
        {links.map((l, i) => (
          <motion.div key={l.href} initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
            <a className="btn btn-soft" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener' : undefined}>{l.label}</a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
