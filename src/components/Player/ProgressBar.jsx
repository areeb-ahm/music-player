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

			<span style={{ color: 'var(--text-muted)' }} className="text-xs font-mono w-12 text-right shrink-0 tabular-nums">
				{formatTime(currentTime || 0)}
			</span>

			<div onClick={handleClick} className="progress-track flex-1 h-[6px] rounded-full cursor-pointer relative"
				style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
				<div className="h-full rounded-full transition-all relative"
					style={{
						width: percentage + '%',
						background: 'var(--accent-gradient)'
					}}>
					<div className="absolute right-0 top-1/2 w-4 h-4 rounded-full progress-thumb"
						style={{
							background: 'var(--accent-light)',
							transform: 'translate(50%, -50%) scale(0.8)',
							boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)'
						}} />
				</div>
			</div>

			<span style={{ color: 'var(--text-muted)' }} className="text-xs font-mono w-12 shrink-0 tabular-nums">
				{formatTime(duration || 0)}
			</span>

		</div>
	)
}
