import { usePlayer } from '../../context/PlayerContext'

export default function VolumeControl() {
	const { volume, isMuted, setVolumeLevel, toggleMute } = usePlayer()

	const effectiveVolume = isMuted ? 0 : volume

	let volumeIcon = '🔊'
	if (effectiveVolume === 0 || isMuted) volumeIcon = '🔇'
	else if (effectiveVolume < 0.4) volumeIcon = '🔈'
	else if (effectiveVolume < 0.7) volumeIcon = '🔉'

	return (
		<div className="flex items-center gap-2">
			<button onClick={toggleMute} style={{ color: 'var(--text-secondary)' }} className="text-base hover:text-white transition-colors cursor-pointer w-6 text-center">{volumeIcon}</button>
			<input
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={effectiveVolume}
				onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
				className="w-20 h-1 accent-purple-500 cursor-pointer"
				style={{ accentColor: 'var(--accent)' }}
			/>
		</div>
	)
}

