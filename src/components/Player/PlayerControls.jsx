import { usePlayer } from '../../context/PlayerContext'

export default function PlayerControls() {
	const { isPlaying, togglePlay, playNext, playPrev, repeatMode, toggleRepeat, isShuffled, toggleShuffle } = usePlayer()

	const base = "cursor-pointer transition-colors p-2 rounded-lg"
	const secondary = base + " text-xl hover:text-white"

	let repeatIcon = '↺'
	if (repeatMode === 'one') repeatIcon = '🔂'
	else if (repeatMode === 'all') repeatIcon = '🔁'

	return (
		<div className="flex items-center justify-center gap-2">

			<button onClick={toggleShuffle} className={secondary} style={{ color: isShuffled ? 'var(--accent)' : 'var(--text-muted)' }}>⇄</button>

			<button onClick={playPrev} style={{ color: 'var(--text-secondary)' }} className={secondary + " hover:scale-105 active:scale-95"}>⏮</button>

			<button onClick={togglePlay} className="cursor-pointer w-11 h-11 rounded-full flex items-center justify-center text-lg hover:opacity-90 active:scale-95 transition-all" style={{ background: 'var(--accent)' }}>{isPlaying ? '⏸' : '▶'}</button>

			<button onClick={playNext} style={{ color: 'var(--text-secondary)' }} className={secondary + " hover:scale-105 active:scale-95"}>⏭</button>

			<button onClick={toggleRepeat} className={secondary} style={{ color: repeatMode !== 'none' ? 'var(--accent)' : 'var(--text-muted)' }}>{repeatIcon}</button>

		</div>
	)
}

