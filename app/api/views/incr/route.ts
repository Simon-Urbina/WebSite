import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';

const mem = globalThis as unknown as { __views?: Map<string, number>; __rl?: Map<string, number> };
if (!mem.__views) mem.__views = new Map();
if (!mem.__rl) mem.__rl = new Map();

const redis = (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
  ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! })
  : null;

function getIp() {
  const h = headers();
  const xff = h.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const ip = h.get('x-real-ip') || h.get('cf-connecting-ip') || '0.0.0.0';
  return ip;
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 });

  const c = cookies();
  const cookieName = `viewed_${slug}`;
  const already = c.get(cookieName)?.value === '1';

  const ttlDays = Number(process.env.VIEW_COOKIE_TTL_DAYS || 3);
  const max = Number(process.env.RATE_LIMIT_MAX || 20);
  const windowSec = Number(process.env.RATE_LIMIT_WINDOW_SEC || 60);

  const ip = getIp();
  const win = Math.floor(Date.now() / (windowSec * 1000));
  const rlKey = `${ip}:${win}`;
  const used = (mem.__rl!.get(rlKey) || 0) + 1;
  mem.__rl!.set(rlKey, used);
  if (used > max) return NextResponse.json({ error: 'Rate limited' }, { status: 429 });

  const key = `views:${slug}`;
  let count: number | null = null;

  if (!already) {
    if (redis) {
      // atomic increment in Redis
      count = await redis.incr<number>(key);
    } else {
      const cur = mem.__views!.get(key) || 0;
      count = cur + 1;
      mem.__views!.set(key, count);
    }
    c.set(cookieName, '1', { httpOnly: false, sameSite: 'lax', maxAge: ttlDays * 24 * 60 * 60, path: '/' });
  } else {
    if (redis) {
      const got = await redis.get<number>(key);
      count = Number(got || 0);
    } else {
      count = mem.__views!.get(key) || 0;
    }
  }

  return NextResponse.json({ views: count ?? 0 });
}
