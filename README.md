# Disociando — Podcast (USTA Tunja · Semillero PIXELES)

Next.js + TypeScript + Bootstrap UI for a colorful, modern, and accessible podcast site.

## Stack
- Next.js (App Router) + TypeScript
- UI: Bootstrap/react-bootstrap, next/image, next/font (Poppins + Inter)
- Audio: react-howler (Howler.js)
- Video: react-player (lazy)
- Animations: Framer Motion (with optional GSAP/Lottie dynamic imports)
- Views: Upstash Redis (with in-memory fallback for dev)
- RSS: `/rss.xml` dynamic route

## Quick start
1. Node.js 18+
2. Copy env file:
   ```bash
   cp .env.example .env.local
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open http://localhost:3000

## Environment variables
See `.env.example`. Important ones:
- `NEXT_PUBLIC_SITE_URL`: canonical origin used in RSS and links.
- `PUBLIC_AUDIO_BASE_URL`: public CDN/base URL for audio files used by RSS enclosures.
- `STORAGE_DRIVER`: `public` (default), `s3`, `r2`, or `bunny` for `/api/audio/presign`.
- `UPSTASH_REDIS_*`: optional for view counting.

## Audio presign endpoint
Client uses `/api/audio/presign?key=<audio_key>` to obtain a short‑lived URL for the web player. Examples to adapt:
- S3: Create a GetObject presigned URL with `@aws-sdk/s3-request-presigner`.
- Cloudflare R2: If behind a public domain, skip presign and return direct public object URL.
- Bunny: Use pull zone public URL for playback; private storage access is not needed for public episodes.

Why RSS uses public URLs: Podcast apps download via the `enclosure` URL. Presigned URLs expire and will break older readers or re-downloads. Serve RSS with stable public URLs (CDN) and use presigned links only for the in-site player when needed.

## Views counter `/api/views/incr`
- POST with `?slug=<episode-slug>` increments and returns `{ views }`.
- Protection basics:
  - Cookie TTL (`VIEW_COOKIE_TTL_DAYS`) avoids duplicate counts.
  - Simple rate limit per IP (`RATE_LIMIT_MAX` per `RATE_LIMIT_WINDOW_SEC`).
  - Upstash Redis if configured, else in-memory (development only).

## Data model (suggested, Postgres)
```
Table episodes {
  id uuid [pk]
  slug text [unique]
  title text
  description text
  audio_key text
  youtube_id text
  cover_url text
  duration_sec int
  published_at timestamptz
  transcript text
}

Table episode_chapters {
  id uuid [pk]
  episode_id uuid [ref: > episodes.id]
  title text
  start_sec int
}

Table views {
  id bigserial [pk]
  episode_slug text
  count int
  day date
}
```
Seed data is provided in `lib/data.ts` with 3 example episodes.

## Pages and components
- Home: hero with featured episodes, microinteractions.
- Episodes list: grid of cards.
- Episode detail: audio player (Howler), chapters (click to seek), YouTube embed (lazy).
- Sticky mobile player: basic bar appears while playing.

## Performance & a11y
- `next/image` optimized images, `react-player` lazy.
- `next/font` for Poppins and Inter.
- Alt text on images, labels on controls, transcripts stub on details page.

## Optional adaptations
- External podcast host: point `PUBLIC_AUDIO_BASE_URL` to your CDN/host.
- Replace Redis with Postgres: increment a `views` table keyed by `episode_slug` within a transaction and set a cookie.
- Analytics: Vercel Analytics or Plausible; add in `app/layout.tsx` via dynamic import.

## Deploy (Vercel)
1. Push this repo to Git.
2. Import into Vercel.
3. Set `.env` values (at least `NEXT_PUBLIC_SITE_URL` and `PUBLIC_AUDIO_BASE_URL`).
4. Deploy. Routes:
   - `/` home
   - `/episodes` list
   - `/episodes/[slug]` detail
   - `/api/episodes`, `/api/episodes/[slug]`
   - `/api/audio/presign`, `/api/views/incr`
   - `/rss.xml`

