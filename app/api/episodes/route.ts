import { NextResponse } from 'next/server';
import { getAllEpisodes } from '@/lib/data';

export async function GET() {
  const items = await getAllEpisodes();
  return NextResponse.json({ episodes: items });
}
