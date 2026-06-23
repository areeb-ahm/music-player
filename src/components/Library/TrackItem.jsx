import { usePlayer } from '../../context/PlayerContext'

export default function TrackItem({ track, index }) {
  const { currentTrack, isPlaying, play, pause, formatTime } = usePlayer()
  const isActive = currentTrack?.id === track.id

  const handleClick = () => {
    if (isActive && isPlaying) {
      pause()
    } else {
      play(track)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`track-row ${isActive ? 'active' : ''} flex items-center gap-6 px-10 py-4 cursor-pointer group`}
    >

      <div className="w-8 text-center shrink-0">
        {isActive && isPlaying ? (
          <div className="flex items-end justify-center gap-[2px] h-4">
            <div className="w-[3px] rounded-full eq-bar-1" style={{ background: 'var(--accent-light)' }} />
            <div className="w-[3px] rounded-full eq-bar-2" style={{ background: 'var(--accent-light)' }} />
            <div className="w-[3px] rounded-full eq-bar-3" style={{ background: 'var(--accent-light)' }} />
          </div>
        ) : isActive && !isPlaying ? (
          <div style={{ color: 'var(--accent-light)' }} className="text-base">▶</div>
        ) : (
          <span style={{ color: 'var(--text-muted)' }} className="text-base group-hover:hidden">{index + 1}</span>
        )}
        {!isActive && (
          <span className="text-base hidden group-hover:block" style={{ color: 'var(--text-secondary)' }}>▶</span>
        )}
      </div>

      <div className="w-12 h-12 rounded-lg shrink-0 shadow-md transition-transform group-hover:scale-105"
        style={{ background: track.cover, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }} />

      <div className="flex-1 min-w-0">
        <p style={{ color: isActive ? 'var(--accent-light)' : 'var(--text-primary)' }}
          className="text-base font-bold truncate transition-colors">{track.title}</p>
        <p style={{ color: 'var(--text-secondary)' }} className="text-sm truncate mt-1">
          {track.artist} <span style={{ color: 'var(--text-muted)' }}>·</span> {track.album}
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase"
          style={{ background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
          {track.genre}
        </span>
        <span style={{ color: 'var(--text-muted)' }} className="text-sm font-mono w-12 text-right">
          {formatTime ? formatTime(track.duration) : Math.floor(track.duration / 60) + ':' + (track.duration % 60 < 10 ? '0' + (track.duration % 60) : track.duration % 60)}
        </span>
      </div>

    </div>
  )
}
