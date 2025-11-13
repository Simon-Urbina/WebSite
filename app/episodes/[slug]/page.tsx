import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEpisodeBySlug } from '@/lib/data';
import AudioPlayer from '@/components/AudioPlayer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import ChapterList from '@/components/ChapterList';

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Params }) {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) return { title: 'Episodio — Disociando' };
  return { title: `${episode.title} — Disociando`, description: episode.description };
}

export default async function EpisodeDetail({ params }: { params: Params }) {
  const episode = await getEpisodeBySlug(params.slug);
  if (!episode) return notFound();

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-4">
          <Image src={episode.coverUrl} alt={`Portada de ${episode.title}`} className="rounded" width={600} height={600} />
        </div>
        <div className="col-md-8">
          <h1 className="h2 mb-2">{episode.title}</h1>
          <p className="text-secondary">{episode.description}</p>

          <div className="mb-3">
            <AudioPlayer title={episode.title} audioKey={episode.audioKey} slug={episode.slug} />
          </div>

          {episode.chapters?.length ? (
            <ChapterList chapters={episode.chapters} />
          ) : null}

          {episode.youtubeId ? (
            <div className="mb-4">
              <YouTubeEmbed youtubeId={episode.youtubeId} title={episode.title} />
            </div>
          ) : null}

          <section>
            <h2 className="h5">Transcripción</h2>
            <p className="text-secondary">Transcripción próximamente.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
