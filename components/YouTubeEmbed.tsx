'use client';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function YouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <div className="ratio ratio-16x9 rounded overflow-hidden">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${youtubeId}`}
        width="100%"
        height="100%"
        controls
        light
        config={{ youtube: { playerVars: { modestbranding: 1 } } }}
        title={title}
      />
    </div>
  );
}
