import EpisodeCard from '@/components/EpisodeCard';
import { getAllEpisodes } from '@/lib/data';

export const metadata = { title: 'Episodios — Disociando' };

export default async function EpisodesPage() {
  const episodes = await getAllEpisodes();
  return (
    <div className="container py-5">
      <h1 className="h2 mb-4">Todos los episodios</h1>
      <div className="row g-4">
        {episodes.map((ep) => (
          <div className="col-md-4" key={ep.slug}>
            <EpisodeCard episode={ep} />
          </div>
        ))}
      </div>
    </div>
  );
}
