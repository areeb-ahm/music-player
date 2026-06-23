import { usePlayer } from '../../context/PlayerContext'

export default function SearchBar() {
	const { searchQuery, setSearchQuery } = usePlayer()

	return (
		<div className="relative">
			<span style={{ color: 'var(--text-muted)' }} className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔍</span>
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search tracks, artists, albums..."
				style={{
					background: 'var(--bg-card)',
					border: '1px solid var(--border)',
					color: 'var(--text-primary)'
				}}
				className="search-input w-full pl-12 pr-12 py-3 rounded-2xl text-base font-medium focus:outline-none placeholder-[color:var(--text-muted)]"
			/>
			{searchQuery && (
				<button onClick={() => setSearchQuery('')}
					className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors cursor-pointer hover:bg-[color:var(--bg-hover)]"
					style={{ color: 'var(--text-muted)' }}>
					✕
				</button>
			)}
		</div>
	)
}
