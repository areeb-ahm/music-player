import { usePlayer } from '../../context/PlayerContext'

export default function NowPlayingCard() {
	const { currentTrack, isPlaying } = usePlayer()

	return (
		<div
			className="p-4 mx-3 mb-4 rounded-xl"
			style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
		>
			<div
				className={`w-full aspect-square rounded-lg mb-3 ${isPlaying ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[var(--bg-card)] animate-pulse' : ''}`}
				style={{ background: currentTrack.cover }}
			/>

			<p style={{ color: 'var(--text-primary)' }} className="font-semibold text-sm truncate">{currentTrack.title}</p>
			<p style={{ color: 'var(--text-secondary)' }} className="text-xs truncate mt-0.5">{currentTrack.artist}</p>

			{isPlaying && (
				<div className="flex items-center gap-1.5 mt-2">
					<div className="w-1 h-3 bg-purple-400 rounded animate-bounce" style={{ animationDelay: '0ms' }} />
					<div className="w-1 h-3 bg-purple-400 rounded animate-bounce" style={{ animationDelay: '150ms' }} />
					<div className="w-1 h-3 bg-purple-400 rounded animate-bounce" style={{ animationDelay: '300ms' }} />
					<span style={{ color: 'var(--text-muted)' }} className="text-xs ml-1">Now Playing</span>
				</div>
			)}
		</div>
	)
}
