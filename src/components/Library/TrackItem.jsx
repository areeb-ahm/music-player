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
      style={{
        background: isActive ? 'var(--accent-dim)' : 'transparent',
        borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent'
      }}
      className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-[color:var(--bg-hover)] transition-colors group rounded-r-lg"
    >

      <div className="w-8 text-center shrink-0">
        {isActive && isPlaying ? (
          <div className="flex items-end justify-center gap-1 h-4">
            <div className="w-0.5 h-3 bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-0.5 h-3 bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-0.5 h-3 bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        ) : isActive && !isPlaying ? (
          <div className="text-purple-400 text-sm">▶</div>
        ) : (
          <span style={{ color: 'var(--text-muted)' }} className="text-sm">{index + 1}</span>
        )}
      </div>

      <div className="w-10 h-10 rounded-lg shrink-0" style={{ background: track.cover }} />

      <div className="flex-1 min-w-0">
        <p style={{ color: isActive ? 'var(--accent-light)' : 'var(--text-primary)' }} className="text-sm font-medium truncate">{track.title}</p>
        <p style={{ color: 'var(--text-secondary)' }} className="text-xs truncate">{track.artist} · {track.album}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="px-2 py-0.5 rounded text-xs" style={{ background: 'var(--bg-hover)', color: 'var(--text-muted)' }}>{track.genre}</span>
        <span style={{ color: 'var(--text-muted)' }} className="text-xs font-mono">{formatTime ? formatTime(track.duration) : Math.floor(track.duration/60) + ':' + (track.duration%60 < 10 ? '0' + (track.duration%60) : track.duration%60)}</span>
      </div>

    </div>
  )
}
