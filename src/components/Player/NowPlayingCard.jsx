import { usePlayer } from '../../context/PlayerContext'

export default function NowPlayingCard() {
	const { currentTrack, isPlaying } = usePlayer()

	return (
		<div className="p-4 mx-3 mt-4 mb-2 rounded-2xl animate-fade-in"
			style={{
				background: 'var(--bg-card)',
				border: '1px solid var(--border)',
				boxShadow: isPlaying ? 'var(--shadow-glow)' : 'var(--shadow-sm)'
			}}>

			<div className={`now-playing-cover w-full aspect-square rounded-xl mb-3 relative ${isPlaying ? 'animate-glow-pulse' : ''}`}
				style={{
					background: currentTrack.cover,
					boxShadow: isPlaying ? '0 4px 20px rgba(0, 0, 0, 0.4)' : 'var(--shadow-sm)',
					transition: 'box-shadow 0.3s ease'
				}}>
				{isPlaying && (
					<div className="absolute bottom-2 right-2 flex items-end gap-[3px] h-4">
						<div className="w-[3px] rounded-full eq-bar-1" style={{ background: 'rgba(255,255,255,0.8)' }} />
						<div className="w-[3px] rounded-full eq-bar-2" style={{ background: 'rgba(255,255,255,0.8)' }} />
						<div className="w-[3px] rounded-full eq-bar-3" style={{ background: 'rgba(255,255,255,0.8)' }} />
					</div>
				)}
			</div>

			<p style={{ color: 'var(--text-primary)' }} className="font-bold text-base truncate">{currentTrack.title}</p>
			<p style={{ color: 'var(--text-secondary)' }} className="text-sm truncate mt-1">{currentTrack.artist}</p>

			{isPlaying && (
				<div className="flex items-center gap-2 mt-3 px-2.5 py-1.5 rounded-lg animate-slide-up"
					style={{ background: 'var(--accent-dim)' }}>
					<div className="flex items-end gap-[2px] h-3">
						<div className="w-[2px] rounded-full eq-bar-1" style={{ background: 'var(--accent-light)' }} />
						<div className="w-[2px] rounded-full eq-bar-2" style={{ background: 'var(--accent-light)' }} />
						<div className="w-[2px] rounded-full eq-bar-3" style={{ background: 'var(--accent-light)' }} />
						<div className="w-[2px] rounded-full eq-bar-4" style={{ background: 'var(--accent-light)' }} />
					</div>
					<span style={{ color: 'var(--accent-light)' }} className="text-[10px] font-semibold tracking-wider uppercase">Now Playing</span>
				</div>
			)}
		</div>
	)
}
