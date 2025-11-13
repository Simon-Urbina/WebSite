import { NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

  const driver = (process.env.STORAGE_DRIVER || 'public').toLowerCase();

  if (driver === 'public') {
    const base = process.env.PUBLIC_AUDIO_BASE_URL || '';
    const url = `${base.replace(/\/$/, '')}/${key}`;
    return NextResponse.json({ url });
  }

  if (driver === 'bunny') {
    const pull = process.env.BUNNY_PULL_ZONE_URL || '';
    if (!pull) return NextResponse.json({ error: 'BUNNY_PULL_ZONE_URL not set' }, { status: 500 });
    const url = `${pull.replace(/\/$/, '')}/${key}`;
    return NextResponse.json({ url });
  }

  if (driver === 'r2') {
    const domain = process.env.R2_PUBLIC_DOMAIN || '';
    if (!domain) return NextResponse.json({ error: 'R2_PUBLIC_DOMAIN not set (use a public bucket domain)' }, { status: 500 });
    const url = `${domain.replace(/\/$/, '')}/${key}`;
    return NextResponse.json({ url });
  }

  if (driver === 's3') {
    const region = process.env.AWS_S3_REGION;
    const bucket = process.env.AWS_S3_BUCKET;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if (!region || !bucket || !accessKeyId || !secretAccessKey) {
      return NextResponse.json({ error: 'Missing AWS S3 env vars' }, { status: 500 });
    }
    const client = new S3Client({ region, credentials: { accessKeyId, secretAccessKey } });
    const cmd = new GetObjectCommand({ Bucket: bucket, Key: key });
    const url = await getSignedUrl(client, cmd, { expiresIn: 900 }); // 15 min
    return NextResponse.json({ url });
  }

  return NextResponse.json({ error: 'Unsupported STORAGE_DRIVER' }, { status: 400 });
}
