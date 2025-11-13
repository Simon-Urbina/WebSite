import type { Episode } from './types';

const episodes: Episode[] = [
  {
    slug: 'bienvenida-disociando',
    title: 'Bienvenida a Disociando',
    description: 'Presentación del podcast del Semillero PIXELES — USTA Tunja: cultura digital, ciencia y creatividad.',
    audioKey: 'bienvenida.mp3',
    youtubeId: 'dQw4w9WgXcQ',
    coverUrl: '/covers/ep1.svg',
    durationSec: 320,
    publishedAt: new Date().toISOString(),
    chapters: [
      { title: 'Intro', startSec: 0 },
      { title: 'Quiénes somos', startSec: 60 },
      { title: 'Qué escucharás', startSec: 180 }
    ]
  },
  {
    slug: 'cibercultura-y-aprendizaje',
    title: 'Cibercultura y aprendizaje',
    description: 'Conversamos sobre prácticas digitales universitarias y cómo aprendemos en red.',
    audioKey: 'cibercultura.mp3',
    youtubeId: '5qap5aO4i9A',
    coverUrl: '/covers/ep2.svg',
    durationSec: 1860,
    publishedAt: new Date(Date.now() - 1000*60*60*24*7).toISOString(),
    chapters: [
      { title: 'Contexto', startSec: 0 },
      { title: 'Casos', startSec: 420 },
      { title: 'Conclusiones', startSec: 1740 }
    ]
  },
  {
    slug: 'tecnologia-y-etica',
    title: 'Tecnología y ética',
    description: 'Dilemas éticos de la IA, privacidad y diseño responsable.',
    audioKey: 'etica.mp3',
    youtubeId: '9bZkp7q19f0',
    coverUrl: '/covers/ep3.svg',
    durationSec: 2400,
    publishedAt: new Date(Date.now() - 1000*60*60*24*14).toISOString(),
    chapters: [
      { title: 'Privacidad', startSec: 300 },
      { title: 'Sesgos', startSec: 900 },
      { title: 'Futuro', startSec: 2100 }
    ]
  }
];

export async function getAllEpisodes(): Promise<Episode[]> {
  return episodes
    .slice()
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
  return episodes.find((e) => e.slug === slug);
}

export async function getPublicAudioUrlForRss(audioKey: string): Promise<string> {
  const base = process.env.PUBLIC_AUDIO_BASE_URL || 'https://example-cdn.yourdomain.com/audio';
  return `${base.replace(/\/$/, '')}/${audioKey}`;
}
