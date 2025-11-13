import { getAllEpisodes, getPublicAudioUrlForRss } from '@/lib/data';

export const runtime = 'nodejs';

function escapeXml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const episodes = await getAllEpisodes();

  const items = await Promise.all(episodes.map(async (ep) => {
    const audioUrl = await getPublicAudioUrlForRss(ep.audioKey);
    return `\n    <item>\n      <title>${escapeXml(ep.title)}</title>\n      <link>${site}/episodes/${ep.slug}</link>\n      <guid>${site}/episodes/${ep.slug}</guid>\n      <pubDate>${new Date(ep.publishedAt).toUTCString()}</pubDate>\n      <description>${escapeXml(ep.description)}</description>\n      <enclosure url="${audioUrl}" length="0" type="audio/mpeg"/>\n    </item>`;
  }));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Disociando — Podcast</title>\n    <link>${site}</link>\n    <description>Podcast del Semillero PIXELES — USTA Tunja.</description>\n    ${items.join('\n')}\n  </channel>\n</rss>`;

  return new Response(rss, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
