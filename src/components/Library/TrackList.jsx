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

			<div style={{ borderBottom: '1px solid var(--border)' }} className="flex items-center gap-4 px-4 py-2 sticky top-0 bg-[color:var(--bg-base)]">
				<div className="w-8" />
				<div className="w-10" />
				<p style={{ color: 'var(--text-muted)' }} className="flex-1 text-xs uppercase tracking-wider">Title</p>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-wider w-20 text-right">Genre</p>
				<p style={{ color: 'var(--text-muted)' }} className="text-xs uppercase tracking-wider w-12 text-right">Time</p>
			</div>

			{filtered.length === 0 ? (
				<div className="py-20 text-center">
					<p className="text-4xl mb-3">🎵</p>
					<p style={{ color: 'var(--text-secondary)' }} className="text-sm">No tracks match your search</p>
				</div>
			) : (
				filtered.map((track, i) => <TrackItem key={track.id} track={track} index={i} />)
			)}

		</div>
	)
}

