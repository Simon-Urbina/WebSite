'use client';
import type { Chapter } from '@/lib/types';

export default function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const onClick = (start: number) => {
    window.dispatchEvent(new CustomEvent('player-seek', { detail: start }));
  };
  return (
    <div className="mb-4">
      <h2 className="h5">Capítulos</h2>
      <ul className="list-unstyled d-flex flex-wrap gap-2 m-0">
        {chapters.map((ch) => (
          <li key={ch.startSec}>
            <button className="chapter-button" onClick={() => onClick(ch.startSec)}>
              ⏱ {ch.title} ({Math.floor(ch.startSec/60)}:{String(ch.startSec%60).padStart(2,'0')})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
