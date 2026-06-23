import { usePlayer } from '../../context/PlayerContext'
import TrackItem from './TrackItem'

export default function TrackList() {
	const { tracks, searchQuery, selectedGenre } = usePlayer()

	let filtered = tracks || []
	const q = searchQuery ? searchQuery.trim().toLowerCase() : ''
	if (q) {
		filtered = filtered.filter((t) => {
			return (
				t.title.toLowerCase().includes(q) ||
				t.artist.toLowerCase().includes(q) ||
				t.album.toLowerCase().includes(q)
			)
		})
	}
	if (selectedGenre && selectedGenre !== 'All') {
		filtered = filtered.filter((t) => t.genre === selectedGenre)
	}

	return (
		<div className="flex-1 overflow-y-auto">

			<div className="flex items-center gap-4 px-8 py-3.5 sticky top-0 z-10"
				style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)' }}>
				<div className="w-8" />
				<div className="w-10" />
				<p style={{ color: 'var(--text-muted)' }} className="flex-1 text-xs uppercase tracking-[0.15em] font-bold">Title</p>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-[0.15em] font-bold w-24 text-right">Genre</p>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-[0.15em] font-bold w-12 text-right">Time</p>
			</div>

			{filtered.length === 0 ? (
				<div className="py-24 text-center animate-fade-in">
					<p className="text-5xl mb-4">🎵</p>
					<p style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium">No tracks match your search</p>
					<p style={{ color: 'var(--text-muted)' }} className="text-xs mt-1">Try a different keyword</p>
				</div>
			) : (
				<div className="py-1">
					{filtered.map((track, i) => <TrackItem key={track.id} track={track} index={i} />)}
				</div>
			)}

		</div>
	)
}
