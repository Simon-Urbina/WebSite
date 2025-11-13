import Link from 'next/link';
import Image from 'next/image';
import type { Episode } from '@/lib/types';

export default function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <div className="card h-100 border-0 shadow-sm card-episode">
      <Image src={episode.coverUrl} alt={`Portada de ${episode.title}`} className="card-img-top" width={800} height={800} />
      <div className="card-body">
        <h3 className="h5 card-title">{episode.title}</h3>
        <p className="card-text text-secondary">{episode.description}</p>
      </div>
      <div className="card-footer bg-white border-0 pt-0 pb-3 px-3">
        <Link className="btn btn-outline-primary w-100" href={`/episodes/${episode.slug}`}>Escuchar</Link>
      </div>
    </div>
  );
}
