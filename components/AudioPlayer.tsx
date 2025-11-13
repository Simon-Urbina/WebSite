'use client';
import { useEffect, useRef, useState } from 'react';
import ReactHowler from 'react-howler';

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function AudioPlayer({ title, audioKey, slug }: { title: string; audioKey: string; slug: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [loading, setLoading] = useState(true);
  const howlerRef = useRef<ReactHowler>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/audio/presign?key=${encodeURIComponent(audioKey)}`)
      .then(async (r) => r.json())
      .then((data) => { if (active) setUrl(data.url || null); })
      .catch(() => { if (active) setUrl(null); })
      .finally(() => setLoading(false));
    return () => { active = false; };
  }, [audioKey]);

  useEffect(() => {
    const id = setInterval(() => {
      const inst = howlerRef.current as any;
      if (!inst || typeof inst.seek !== 'function') return;
      const current = inst.seek();
      if (typeof current === 'number') setSeek(current);
      // broadcast state for sticky player
      const detail = { title, slug, playing, seek: typeof current === 'number' ? current : 0, duration };
      window.dispatchEvent(new CustomEvent('player-state', { detail }));
    }, 500);
    return () => clearInterval(id);
  }, [title, slug, playing, duration]);

  useEffect(() => {
    fetch(`/api/views/incr?slug=${encodeURIComponent(slug)}`, { method: 'POST' }).catch(() => {});
  }, [slug]);

  useEffect(() => {
    const handler = (e: any) => {
      const s = Number(e.detail?.startSec ?? e.detail);
      const inst = howlerRef.current as any;
      if (inst && typeof inst.seek === 'function' && !Number.isNaN(s)) {
        inst.seek(s);
        setSeek(s);
      }
    };
    window.addEventListener('player-seek', handler as any);
    const toggle = () => setPlaying((p) => !p);
    window.addEventListener('player-toggle', toggle as any);
    return () => {
      window.removeEventListener('player-seek', handler as any);
      window.removeEventListener('player-toggle', toggle as any);
    };
  }, []);

  const onLoad = () => {
    const inst = howlerRef.current as any;
    const d = typeof inst?.duration === 'function' ? inst.duration() : 0;
    setDuration(d || 0);
    window.dispatchEvent(new CustomEvent('player-state', { detail: { title, slug, playing, seek, duration: d || 0 } }));
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    const inst = howlerRef.current as any;
    if (inst && typeof inst.seek === 'function') inst.seek(next);
    setSeek(next);
  };

  const disabled = !url || loading;

  return (
    <div className="border rounded p-3">
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-primary" onClick={() => setPlaying((p: boolean) => !p)} disabled={disabled} aria-label={playing ? 'Pausar' : 'Reproducir'}>
          {playing ? 'Pausa' : 'Play'}
        </button>
        <div className="flex-grow-1">
          <div className="small fw-semibold text-dark">{title}</div>
          <input type="range" className="form-range" min={0} max={Math.max(0, duration)} step={1} value={seek} onChange={onSeek} disabled={disabled} aria-label="Barra de progreso" />
          <div className="d-flex justify-content-between small text-secondary">
            <span>{formatTime(seek)}</span>
            <span>{formatTime(Math.max(0, duration - seek))}</span>
          </div>
        </div>
        <div style={{ width: 140 }}>
          <label className="form-label small m-0">Volumen</label>
          <input type="range" className="form-range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} aria-label="Volumen" />
        </div>
      </div>

      {url && (
        <ReactHowler
          ref={howlerRef}
          src={url}
          playing={playing}
          onLoad={onLoad}
          onEnd={() => setPlaying(false)}
          volume={volume}
          html5
        />
      )}
    </div>
  );
}
