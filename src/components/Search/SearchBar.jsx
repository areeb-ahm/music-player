import { usePlayer } from '../../context/PlayerContext'

export default function SearchBar() {
	const { searchQuery, setSearchQuery } = usePlayer()

	return (
		<div className="relative">
			<span style={{ color: 'var(--text-muted)' }} className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">🔍</span>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search tracks, artists, albums..."
				style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
				className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-[color:var(--text-muted)]"
			/>
			{searchQuery && (
				<span onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm hover:text-white cursor-pointer">×</span>
			)}
		</div>
	)
}

