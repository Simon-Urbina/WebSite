import Link from 'next/link';
import { getAllEpisodes } from '@/lib/data';
import EpisodeCard from '@/components/EpisodeCard';
import HeroBanner from '@/components/HeroBanner';

export default async function HomePage() {
  const episodes = await getAllEpisodes();
  const featured = episodes.slice(0, 3);
  return (
    <>
      <HeroBanner />

      <section className="container py-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h3 m-0">Episodios destacados</h2>
          <Link href="/episodes" className="link-primary">Ver todos</Link>
        </div>
        <div className="row g-4">
          {featured.map((ep) => (
            <div className="col-md-4" key={ep.slug}>
              <EpisodeCard episode={ep} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
