'use client';
import { useEffect, useState } from 'react';

type PlayerState = {
  title: string;
  slug?: string;
  playing: boolean;
  seek: number;
  duration: number;
};

export default function StickyPlayer() {
  const [state, setState] = useState<PlayerState | null>(null);

  useEffect(() => {
    const onState = (e: Event) => {
      const detail = (e as CustomEvent).detail as PlayerState;
      setState(detail);
    };
    window.addEventListener('player-state', onState as any);
    return () => window.removeEventListener('player-state', onState as any);
  }, []);

  if (!state || (!state.playing && state.seek <= 0)) return null;

  const progress = state.duration > 0 ? (state.seek / state.duration) * 100 : 0;

  return (
    <div className="sticky-player d-md-none">
      <div className="container py-2">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('player-toggle'))}>
            {state.playing ? 'Pausa' : 'Play'}
          </button>
          <div className="flex-grow-1 text-truncate small">{state.title}</div>
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
      </div>
    </div>
  );
}
