import { usePlayer } from '../../context/PlayerContext'

export default function ProgressBar() {
	const { currentTime, duration, seek } = usePlayer()

	const formatTime = (s) => {
		const m = Math.floor(s / 60)
		const sec = Math.floor(s % 60)
		return m + ':' + (sec < 10 ? '0' + sec : sec)
	}

	const percentage = duration ? (currentTime / duration) * 100 : 0

	const handleClick = (e) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const clickX = e.clientX - rect.left
		const ratio = clickX / rect.width
		seek(ratio * duration)
	}

	return (
		<div className="flex items-center gap-3 w-full">

			<span style={{ color: 'var(--text-muted)' }} className="text-xs font-mono w-10 text-right shrink-0">{formatTime(currentTime || 0)}</span>

			<div onClick={handleClick} className="flex-1 h-1 rounded-full cursor-pointer group relative" style={{ background: 'var(--bg-hover)' }}>
				<div className="h-full rounded-full transition-all" style={{ width: percentage + '%', background: 'var(--accent)' }} />
				<div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ left: `calc(${percentage}% - 6px)`, background: 'var(--accent-light)' }} />
			</div>

			<span style={{ color: 'var(--text-muted)' }} className="text-xs font-mono w-10 shrink-0">{formatTime(duration || 0)}</span>

		</div>
	)
}

