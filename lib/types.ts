export type Chapter = {
  title: string;
  startSec: number;
};

export type Episode = {
  slug: string;
  title: string;
  description: string;
  audioKey: string;
  youtubeId?: string;
  coverUrl: string;
  durationSec?: number;
  publishedAt: string; // ISO string
  chapters?: Chapter[];
};
