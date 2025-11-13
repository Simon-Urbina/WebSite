"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const items = [
  { src: '/covers/ep1.svg', alt: 'Portada episodio 1' },
  { src: '/covers/ep2.svg', alt: 'Portada episodio 2' },
  { src: '/covers/ep3.svg', alt: 'Portada episodio 3' },
  { src: '/covers/ep2.svg', alt: 'Portada episodio 2 alt' },
  { src: '/covers/ep3.svg', alt: 'Portada episodio 3 alt' },
  { src: '/covers/ep1.svg', alt: 'Portada episodio 1 alt' }
];

export default function GallerySection() {
  return (
    <section className="container py-5">
      <motion.h2 className="h3 mb-4" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>Galería visual</motion.h2>
      <div className="row g-3">
        {items.map((it, i) => (
          <div key={i} className="col-6 col-md-4">
            <motion.div className="gallery-item rounded-3 overflow-hidden" initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.03 }} whileHover={{ scale: 1.02 }}>
              <Image src={it.src} alt={it.alt} width={800} height={800} className="w-100 h-auto" />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
