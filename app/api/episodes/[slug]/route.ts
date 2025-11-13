import { NextResponse } from 'next/server';
import { getEpisodeBySlug } from '@/lib/data';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const ep = await getEpisodeBySlug(params.slug);
  if (!ep) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ episode: ep });
}
