import { usePlayer } from '../../context/PlayerContext'

export default function PlayerControls() {
	const { isPlaying, togglePlay, playNext, playPrev, repeatMode, toggleRepeat, isShuffled, toggleShuffle } = usePlayer()

	let repeatIcon = '↺'
	if (repeatMode === 'one') repeatIcon = '🔂'
	else if (repeatMode === 'all') repeatIcon = '🔁'

	return (
		<div className="flex items-center justify-center gap-1">

			<button onClick={toggleShuffle} className="control-btn w-10 h-10 rounded-lg text-xl"
				style={{ color: isShuffled ? 'var(--accent-light)' : 'var(--text-muted)' }}>⇄</button>

			<button onClick={playPrev} className="control-btn w-12 h-12 rounded-lg text-2xl"
				style={{ color: 'var(--text-secondary)' }}>⏮</button>

			<button onClick={togglePlay}
				className="play-btn w-14 h-14 rounded-full text-xl mx-2">
				<span className="text-white">{isPlaying ? '⏸' : '▶'}</span>
			</button>

			<button onClick={playNext} className="control-btn w-12 h-12 rounded-lg text-2xl"
				style={{ color: 'var(--text-secondary)' }}>⏭</button>

			<button onClick={toggleRepeat} className="control-btn w-10 h-10 rounded-lg text-xl"
				style={{ color: repeatMode !== 'none' ? 'var(--accent-light)' : 'var(--text-muted)' }}>{repeatIcon}</button>

		</div>
	)
}
